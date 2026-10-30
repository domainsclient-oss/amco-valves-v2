'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { ExternalLink, Eye, EyeOff, FileText, LayoutTemplate, Loader2, MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { BlogPostEditor } from '@/components/admin/BlogPostEditor';
import { ArticleEditor } from '@/components/admin/ArticleEditor';
import { HOME_CONTENT_COLLECTION } from '@/lib/home-content';
import { BLOG_INDEX_SLUG, ORIGINAL_ARTICLES, blogIndexDefaults, articleContentDocId, resolveArticleContent, type OriginalArticleSlug } from '@/lib/blog-articles';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { revalidateBlog } from '@/app/actions/revalidate-content';
import {
  BLOG_IMAGES_COLLECTION,
  BLOG_POSTS_COLLECTION,
  blogImageUrl,
  formatBlogDate,
  blogPostImageIds,
  newBlogPost,
  toBlogPost,
  type BlogPost,
} from '@/lib/blog';

type Status = 'draft' | 'published';

function StatusLabel({ status }: { status: Status }) {
  return status === 'published' ? (
    <span className="text-green-700 font-semibold">Published</span>
  ) : (
    <span className="text-amber-700 font-semibold">Draft</span>
  );
}

/** The "⋯" menu on a blog row: view, move to draft / publish, and optionally delete. */
function RowMenu({
  status,
  viewHref,
  onToggleStatus,
  onDelete,
}: {
  status: Status;
  viewHref: string;
  onToggleStatus: () => void;
  onDelete?: () => void;
}) {
  return (
    // Non-modal: a modal menu that opens a confirmation popup can leave the page unclickable.
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost" className="px-2" aria-label="More actions">
          <MoreHorizontal className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 rounded-xl">
        {status === 'published' && (
          <DropdownMenuItem asChild>
            <Link href={viewHref} target="_blank" className="cursor-pointer">
              <ExternalLink className="size-4 mr-2" /> View on website
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={onToggleStatus} className="cursor-pointer">
          {status === 'published' ? (
            <>
              <EyeOff className="size-4 mr-2" /> Move to draft
            </>
          ) : (
            <>
              <Eye className="size-4 mr-2" /> Publish
            </>
          )}
        </DropdownMenuItem>
        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={onDelete} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
              <Trash2 className="size-4 mr-2" /> Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function BlogManager() {
  const db = useFirestore();
  const { toast } = useToast();

  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editing, setEditing] = useState<{ post: BlogPost; isNew: boolean } | null>(null);
  const [editingArticle, setEditingArticle] = useState<OriginalArticleSlug | null>(null);
  const [editingBlogPage, setEditingBlogPage] = useState(false);
  // Card details of the original articles, including any saved edits.
  const [originals, setOriginals] = useState(() =>
    ORIGINAL_ARTICLES.map((a) => ({
      slug: a.slug,
      image: a.defaults.card.image as string,
      title: a.defaults.card.heading,
      date: a.defaults.card.date,
      category: a.defaults.card.category,
      status: 'published' as Status,
    })),
  );
  // Confirmation popups opened from the row menus (they outlive the menu).
  const [confirmDraft, setConfirmDraft] = useState<{ title: string; run: () => Promise<void> } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<BlogPost | null>(null);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, BLOG_POSTS_COLLECTION));
      setPosts(snap.docs.map((d) => toBlogPost(d.id, d.data())).sort((a, b) => b.date.localeCompare(a.date)));
      setLoadError(null);
    } catch (err: any) {
      setLoadError(err?.message ?? 'Could not load the blog posts.');
    }

    const loaded = await Promise.all(
      ORIGINAL_ARTICLES.map(async (a) => {
        const snap = await getDoc(doc(db, HOME_CONTENT_COLLECTION, articleContentDocId(a.slug))).catch(() => null);
        const c = resolveArticleContent(a.defaults, snap?.exists() ? snap.data() : null);
        const status: Status = snap?.exists() && snap.data().status === 'draft' ? 'draft' : 'published';
        return { slug: a.slug, image: c.card.image as string, title: c.card.heading, date: c.card.date, category: c.card.category, status };
      }),
    );
    setOriginals(loaded);
  }, [db]);

  useEffect(() => {
    load();
  }, [load]);

  if (editingBlogPage) {
    return (
      <ArticleEditor
        slug={BLOG_INDEX_SLUG}
        defaults={blogIndexDefaults as Record<string, unknown>}
        onBack={() => setEditingBlogPage(false)}
        heading="Edit blog page"
        viewHref="/blog"
        viewLabel="View blog page"
        intro="The text on the main blog page (/blog). The post cards are listed automatically from your articles and posts."
        sectionTitles={{ hero: 'Page header', posts: 'Posts list', cta: 'Call to action box' }}
        tabLabels={{ hero: 'Header', posts: 'Posts list', cta: 'Call to action' }}
      />
    );
  }

  if (editingArticle) {
    const article = ORIGINAL_ARTICLES.find((a) => a.slug === editingArticle)!;
    return (
      <ArticleEditor
        slug={article.slug}
        defaults={article.defaults as Record<string, unknown>}
        onBack={() => {
          setEditingArticle(null);
          load();
        }}
      />
    );
  }

  if (editing) {
    return (
      <BlogPostEditor
        initialPost={editing.post}
        isNew={editing.isNew}
        onBack={() => {
          setEditing(null);
          load();
        }}
      />
    );
  }

  const setPostStatus = async (post: BlogPost, status: Status) => {
    if (status === 'published' && (!post.title.trim() || !post.slug.trim())) {
      toast({ variant: 'destructive', title: 'Add a title first', description: 'Open the post with Edit to add a title and web address before publishing.' });
      return;
    }
    try {
      await updateDoc(doc(db, BLOG_POSTS_COLLECTION, post.id), { status, updatedAt: serverTimestamp() });
      await revalidateBlog([post.slug]).catch(() => {});
      setPosts((list) => list?.map((p) => (p.id === post.id ? { ...p, status } : p)) ?? null);
      toast({ title: status === 'published' ? 'Post published' : 'Moved to draft', description: status === 'published' ? `Live at /blog/${post.slug}` : 'It is no longer visible on the website.' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Could not change the status', description: err?.message });
    }
  };

  const setArticleStatus = async (slug: string, status: Status) => {
    try {
      await setDoc(doc(db, HOME_CONTENT_COLLECTION, articleContentDocId(slug)), { status, updatedAt: serverTimestamp() }, { merge: true });
      await revalidateBlog([slug]).catch(() => {});
      setOriginals((list) => list.map((a) => (a.slug === slug ? { ...a, status } : a)));
      toast({ title: status === 'published' ? 'Article published' : 'Moved to draft', description: status === 'published' ? `Live at /blog/${slug}` : 'It is no longer visible on the website.' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Could not change the status', description: err?.message });
    }
  };

  const handleDelete = async (post: BlogPost) => {
    try {
      await deleteDoc(doc(db, BLOG_POSTS_COLLECTION, post.id));
      // Clean up the post's photos; a failure here only leaves unused images behind.
      const imageIds = blogPostImageIds(post);
      await Promise.all(imageIds.map((id) => deleteDoc(doc(db, BLOG_IMAGES_COLLECTION, id)).catch(() => {})));
      await revalidateBlog([post.slug]).catch(() => {});
      setPosts((list) => list?.filter((p) => p.id !== post.id) ?? null);
      toast({ title: 'Post deleted' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Delete failed', description: err?.message });
    }
  };

  return (
    <div className="pb-24">
      <AdminHeader
        title="Blog Posts"
        description="Share your work with photos and detailed product descriptions."
        actions={
          <Button
            variant="secondary"
            className="font-bold"
            onClick={() => setEditing({ post: newBlogPost(doc(collection(db, BLOG_POSTS_COLLECTION)).id), isNew: true })}
          >
            <Plus className="size-4 mr-1" /> New post
          </Button>
        }
      />

      <main className="px-6 lg:px-10 py-8">
        <p className="mb-8 text-sm text-foreground/60">
          Everything here appears on the <Link href="/blog" target="_blank" className="text-secondary font-semibold hover:underline">blog page</Link>.
        </p>

        <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/50 mb-3">Blog page</h2>
        <div className="p-4 rounded-3xl bg-white border border-border shadow-sm flex flex-wrap items-center gap-4 mb-10">
          <div className="w-28 aspect-[16/10] rounded-2xl bg-primary/5 shrink-0 flex items-center justify-center">
            <LayoutTemplate className="size-7 text-secondary" />
          </div>
          <div className="flex-1 min-w-[12rem]">
            <p className="font-bold text-primary leading-snug">Main blog page</p>
            <p className="text-xs text-foreground/50 mt-1">/blog · header, posts heading and call-to-action box</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="ghost" asChild>
              <Link href="/blog" target="_blank">
                <ExternalLink className="size-4 mr-1" /> View
              </Link>
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditingBlogPage(true)}>
              <Pencil className="size-4 mr-1" /> Edit
            </Button>
          </div>
        </div>

        <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/50 mb-3">Original articles</h2>
        <div className="space-y-4 mb-10">
          {originals.map((article) => (
            <div key={article.slug} className="p-4 rounded-3xl bg-white border border-border shadow-sm flex flex-wrap items-center gap-4">
              <div className="w-28 aspect-[16/10] rounded-2xl overflow-hidden bg-background shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-[12rem]">
                <p className="font-bold text-primary leading-snug">{article.title}</p>
                <p className="text-xs text-foreground/50 mt-1">
                  <StatusLabel status={article.status} />
                  {' · '}
                  {article.date}
                  {article.category && ` · ${article.category}`}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1">
                <Button size="sm" variant="outline" onClick={() => setEditingArticle(article.slug)}>
                  <Pencil className="size-4 mr-1" /> Edit
                </Button>
                <RowMenu
                  status={article.status}
                  viewHref={`/blog/${article.slug}`}
                  onToggleStatus={() =>
                    article.status === 'published'
                      ? setConfirmDraft({ title: article.title, run: () => setArticleStatus(article.slug, 'draft') })
                      : setArticleStatus(article.slug, 'published')
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/50 mb-3">Your posts</h2>
        {loadError ? (
          <div className="p-8 rounded-3xl bg-white border border-border text-center">
            <p className="text-destructive font-semibold">Could not load the blog posts.</p>
            <p className="text-sm text-foreground/60 mt-2">{loadError}</p>
            <p className="text-sm text-foreground/60 mt-1">Check that the latest Firestore rules are published.</p>
          </div>
        ) : !posts ? (
          <div className="py-24 flex justify-center">
            <Loader2 className="size-8 animate-spin text-secondary" />
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white border border-dashed border-border text-center">
            <FileText className="size-10 text-secondary mx-auto mb-4" />
            <p className="font-semibold text-primary">No posts yet</p>
            <p className="text-sm text-foreground/60 mt-1">Click "New post" to write your first one.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 rounded-3xl bg-white border border-border shadow-sm flex flex-wrap items-center gap-4">
                <div className="w-28 aspect-[16/10] rounded-2xl overflow-hidden bg-background shrink-0 flex items-center justify-center">
                  {post.coverImageId ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={blogImageUrl(post.coverImageId)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <FileText className="size-6 text-foreground/30" />
                  )}
                </div>
                <div className="flex-1 min-w-[12rem]">
                  <p className="font-bold text-primary leading-snug">{post.title || 'Untitled post'}</p>
                  <p className="text-xs text-foreground/50 mt-1">
                    <StatusLabel status={post.status} />
                    {' · '}
                    {formatBlogDate(post.date)}
                    {post.category && ` · ${post.category}`}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <Button size="sm" variant="outline" onClick={() => setEditing({ post, isNew: false })}>
                    <Pencil className="size-4 mr-1" /> Edit
                  </Button>
                  <RowMenu
                    status={post.status}
                    viewHref={`/blog/${post.slug}`}
                    onToggleStatus={() =>
                      post.status === 'published'
                        ? setConfirmDraft({ title: post.title || 'Untitled post', run: () => setPostStatus(post, 'draft') })
                        : setPostStatus(post, 'published')
                    }
                    onDelete={() => setConfirmDelete(post)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <ConfirmDialog
          open={!!confirmDraft}
          onOpenChange={(open) => !open && setConfirmDraft(null)}
          title="Move to draft?"
          description={
            <>
              <strong className="text-primary">{confirmDraft?.title}</strong> will be taken off the website: its card disappears from the blog page and its page
              will no longer open. You can publish it again any time.
            </>
          }
          confirmLabel="Move to draft"
          icon={EyeOff}
          onConfirm={() => confirmDraft?.run()}
        />
        <ConfirmDialog
          open={!!confirmDelete}
          onOpenChange={(open) => !open && setConfirmDelete(null)}
          title="Delete this post?"
          description={
            <>
              <strong className="text-primary">{confirmDelete?.title || 'Untitled post'}</strong> and its photos will be permanently deleted
              {confirmDelete?.status === 'published' ? ' and removed from the website' : ''}. This cannot be undone.
            </>
          }
          confirmLabel="Delete post"
          onConfirm={() => (confirmDelete ? handleDelete(confirmDelete) : undefined)}
        />
      </main>
    </div>
  );
}
