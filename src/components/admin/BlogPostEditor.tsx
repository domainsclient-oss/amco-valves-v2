'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { ArrowLeft, ExternalLink, Loader2, Plus } from 'lucide-react';
import { useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ButtonField, Field, Section } from '@/components/admin/fields';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { BlogBlocksEditor } from '@/components/admin/BlogBlocksEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { revalidateBlog } from '@/app/actions/revalidate-content';
import { BLOG_POSTS_COLLECTION, RESERVED_BLOG_SLUGS, slugify, type BlogPost, type BlogSidebar } from '@/lib/blog';

const TABS = [
  { key: 'details', label: 'Post details' },
  { key: 'content', label: 'Content' },
  { key: 'sidebar', label: 'Sidebar' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

/** Trims the main fields and drops empty sidebar links before saving. Blocks are saved as edited. */
function cleanForSave(post: BlogPost): BlogPost {
  return {
    ...post,
    title: post.title.trim(),
    slug: slugify(post.slug),
    category: post.category.trim(),
    excerpt: post.excerpt.trim(),
    sidebar: {
      ...post.sidebar,
      links: { ...post.sidebar.links, items: post.sidebar.links.items.filter((l) => l.label.trim() || l.href.trim()) },
    },
  };
}

/** A titled card with an on/off switch for one sidebar box. */
function SidebarBox({
  title,
  description,
  enabled,
  onToggle,
  children,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white border border-border shadow-sm">
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border">
        <div>
          <p className="font-bold text-primary">{title}</p>
          <p className="text-xs text-foreground/50">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-foreground/50">{enabled ? 'Shown' : 'Hidden'}</span>
          <Switch checked={enabled} onCheckedChange={onToggle} aria-label={`Show ${title}`} />
        </div>
      </div>
      <div className={cn('p-6 space-y-4', !enabled && 'opacity-50')}>{children}</div>
    </div>
  );
}

export function BlogPostEditor({ initialPost, isNew, onBack }: { initialPost: BlogPost; isNew: boolean; onBack: () => void }) {
  const db = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();

  const [post, setPost] = useState(initialPost);
  const [tab, setTab] = useState<TabKey>('details');
  const [exists, setExists] = useState(!isNew);
  const [savedSlug, setSavedSlug] = useState(initialPost.slug);
  // The slug follows the title until it's edited by hand.
  const [slugEdited, setSlugEdited] = useState(!!initialPost.slug);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);

  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const update = (patch: Partial<BlogPost>) => {
    setPost((p) => ({ ...p, ...patch }));
    setIsDirty(true);
  };

  const updateSidebar = <K extends keyof BlogSidebar>(box: K, patch: Partial<BlogSidebar[K]>) =>
    update({ sidebar: { ...post.sidebar, [box]: { ...post.sidebar[box], ...patch } } });

  const save = async (status: BlogPost['status']) => {
    const cleaned = { ...cleanForSave(post), status };

    if (!cleaned.title) {
      setTab('details');
      toast({ variant: 'destructive', title: 'Add a title first' });
      return;
    }
    if (!cleaned.slug || RESERVED_BLOG_SLUGS.includes(cleaned.slug)) {
      setTab('details');
      toast({ variant: 'destructive', title: 'Choose a different web address', description: 'This address is empty or already used by another page.' });
      return;
    }

    setIsSaving(true);
    try {
      const sameSlug = await getDocs(query(collection(db, BLOG_POSTS_COLLECTION), where('slug', '==', cleaned.slug)));
      if (sameSlug.docs.some((d) => d.id !== post.id)) {
        setTab('details');
        toast({ variant: 'destructive', title: 'Web address already in use', description: 'Another post already uses this address. Please change it.' });
        return;
      }

      const { id, ...data } = cleaned;
      // Full replace (no merge) so fields from the old post format don't linger.
      await setDoc(doc(db, BLOG_POSTS_COLLECTION, id), {
        ...data,
        updatedAt: serverTimestamp(),
        updatedBy: user?.email ?? user?.uid ?? null,
        ...(exists ? {} : { createdAt: serverTimestamp() }),
      });

      await revalidateBlog([cleaned.slug, savedSlug]).catch(() => {});
      setPost(cleaned);
      setExists(true);
      setSavedSlug(cleaned.slug);
      setSlugEdited(true);
      setIsDirty(false);
      toast({
        title: status === 'published' ? 'Post published' : 'Draft saved',
        description: status === 'published' ? `Live at /blog/${cleaned.slug}` : 'Not visible on the website until you publish it.',
      });
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Save failed',
        description: err?.code === 'permission-denied' ? 'This account is not allowed to edit the blog.' : err?.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const isPublished = exists && post.status === 'published';
  const handleBack = () => (isDirty ? setConfirmLeave(true) : onBack());
  const { expert, info, links } = post.sidebar;

  return (
    <div className="pb-24">
      <AdminHeader
        title={exists ? 'Edit post' : 'New post'}
        description={post.title || 'Untitled post'}
        actions={
          <>
            {isDirty && <span className="text-xs font-semibold text-secondary">Unsaved changes</span>}
            {isPublished ? (
              <>
                <Button variant="outline" onClick={() => save('draft')} disabled={isSaving}>
                  Unpublish
                </Button>
                <Button variant="secondary" className="font-bold" onClick={() => save('published')} disabled={isSaving || !isDirty}>
                  {isSaving && <Loader2 className="size-4 mr-1 animate-spin" />}
                  {isDirty ? 'Update post' : 'Published'}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => save('draft')} disabled={isSaving}>
                  Save draft
                </Button>
                <Button variant="secondary" className="font-bold" onClick={() => save('published')} disabled={isSaving}>
                  {isSaving && <Loader2 className="size-4 mr-1 animate-spin" />}
                  Publish
                </Button>
              </>
            )}
          </>
        }
      />

      <main className="px-6 lg:px-10 py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="size-4 mr-1" /> All posts
          </Button>
          <ConfirmDialog
            open={confirmLeave}
            onOpenChange={setConfirmLeave}
            title="Discard unsaved changes?"
            description="You have changes to this post that haven't been saved. If you go back now, they will be lost."
            confirmLabel="Discard changes"
            onConfirm={onBack}
          />
          <div className="flex items-center gap-3 text-sm">
            <span className={isPublished ? 'text-green-700 font-semibold' : 'text-foreground/50 font-semibold'}>
              {isPublished ? '● Published' : '○ Draft'}
            </span>
            {isPublished && (
              <Link href={`/blog/${savedSlug}`} target="_blank" className="inline-flex items-center gap-1 text-secondary font-semibold hover:underline">
                View post <ExternalLink className="size-3.5" />
              </Link>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-border shadow-sm">
          <div role="tablist" aria-label="Post editor" className="flex overflow-x-auto px-2">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  'relative shrink-0 px-5 py-3.5 text-sm whitespace-nowrap transition-colors',
                  tab === t.key ? 'text-primary font-semibold' : 'text-foreground/55 font-medium hover:text-primary',
                )}
              >
                {t.label}
                {t.key === 'content' && <span className="ml-1.5 text-xs text-foreground/40">{post.blocks.length}</span>}
                <span className={cn('absolute left-3 right-3 bottom-0 h-[3px] rounded-t-full', tab === t.key ? 'bg-secondary' : 'bg-transparent')} />
              </button>
            ))}
          </div>
        </div>

        {tab === 'details' && (
          <>
          <Section title="Post details" description="Shown on the blog list card and at the top of the post.">
            <Field
              label="Title"
              value={post.title}
              onChange={(title) => update({ title, ...(slugEdited ? {} : { slug: slugify(title) }) })}
            />
            <div className="space-y-2">
              <Label className="text-primary font-semibold">Web address</Label>
              <div className="flex items-center rounded-md bg-background overflow-hidden">
                <span className="pl-3 text-sm text-foreground/50 whitespace-nowrap">/blog/</span>
                <Input
                  value={post.slug}
                  onChange={(e) => {
                    setSlugEdited(true);
                    update({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') });
                  }}
                  className="bg-background border-none pl-1"
                />
              </div>
              {isPublished && post.slug !== savedSlug && (
                <p className="text-xs text-destructive">Changing the address of a published post breaks links already shared.</p>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Category" value={post.category} onChange={(category) => update({ category })} hint='e.g. "Project Showcase" or "Product Guide".' />
              <div className="space-y-2">
                <Label className="text-primary font-semibold">Date</Label>
                <Input type="date" value={post.date} onChange={(e) => update({ date: e.target.value })} className="bg-background border-none" />
              </div>
            </div>
            <Field label="Short summary" value={post.excerpt} onChange={(excerpt) => update({ excerpt })} multiline hint="2–3 sentences shown on the blog card and under the title." />
            <ImageUpload label="Cover photo" imageId={post.coverImageId} onChange={(coverImageId) => update({ coverImageId })} />
          </Section>

          <Section title="Blog card" description="The heading and description on this post's card on the blog page.">
            <Field
              label="Card heading"
              value={post.cardTitle}
              onChange={(cardTitle) => update({ cardTitle })}
              hint={post.cardTitle ? 'Shown on the card instead of the post title.' : `Empty: the card shows the post title${post.title ? ` "${post.title}"` : ''}.`}
            />
            <Field
              label="Card description"
              value={post.cardDescription}
              onChange={(cardDescription) => update({ cardDescription })}
              multiline
              hint={post.cardDescription ? 'Shown on the card instead of the short summary.' : 'Empty: the card shows the short summary.'}
            />
          </Section>
          </>
        )}

        {tab === 'content' && (
          <>
            <p className="text-sm text-foreground/60">
              Build the article from blocks, in the order they appear on the page. Each block uses the same design as the original articles.
            </p>
            <BlogBlocksEditor blocks={post.blocks} onChange={(blocks) => update({ blocks })} />
          </>
        )}

        {tab === 'sidebar' && (
          <div className="space-y-6">
            <p className="text-sm text-foreground/60">The boxes shown next to the article on large screens (below it on phones). A "More articles" link is always shown last.</p>

            <SidebarBox title="Contact box" description="Light box with a message icon and a button." enabled={expert.enabled} onToggle={(enabled) => updateSidebar('expert', { enabled })}>
              <Field label="Title" value={expert.title} onChange={(title) => updateSidebar('expert', { title })} />
              <Field label="Text" value={expert.text} onChange={(text) => updateSidebar('expert', { text })} multiline />
              <div className="md:max-w-xl">
                <ButtonField label="Button" value={expert.button} onChange={(button) => updateSidebar('expert', { button })} />
              </div>
            </SidebarBox>

            <SidebarBox title="Info card" description="Dark blue card with an info icon." enabled={info.enabled} onToggle={(enabled) => updateSidebar('info', { enabled })}>
              <Field label="Title" value={info.title} onChange={(title) => updateSidebar('info', { title })} />
              <Field label="Text" value={info.text} onChange={(text) => updateSidebar('info', { text })} multiline />
            </SidebarBox>

            <SidebarBox title="Links box" description="A list of links, e.g. related products." enabled={links.enabled} onToggle={(enabled) => updateSidebar('links', { enabled })}>
              <Field label="Title" value={links.title} onChange={(title) => updateSidebar('links', { title })} />
              <div className="space-y-2">
                <Label className="text-primary font-semibold">Links</Label>
                {links.items.map((link, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Input
                      value={link.label}
                      onChange={(e) => updateSidebar('links', { items: links.items.map((l, j) => (j === i ? { ...l, label: e.target.value } : l)) })}
                      placeholder="Label, e.g. Lined Ball Valves"
                      className="bg-background border-none"
                    />
                    <Input
                      value={link.href}
                      onChange={(e) => updateSidebar('links', { items: links.items.map((l, j) => (j === i ? { ...l, href: e.target.value } : l)) })}
                      placeholder="/products/... or /#products"
                      className="bg-background border-none"
                    />
                    <ConfirmDialog
                      title="Remove this link?"
                      description={
                        <>
                          <strong className="text-primary">{link.label || 'This link'}</strong> will be removed from the links box.
                        </>
                      }
                      confirmLabel="Remove link"
                      onConfirm={() => updateSidebar('links', { items: links.items.filter((_, j) => j !== i) })}
                      trigger={
                        <Button type="button" size="sm" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0">
                          Remove
                        </Button>
                      }
                    />
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => updateSidebar('links', { items: [...links.items, { label: '', href: '' }] })}>
                  <Plus className="size-4 mr-1" /> Add link
                </Button>
              </div>
            </SidebarBox>
          </div>
        )}
      </main>
    </div>
  );
}
