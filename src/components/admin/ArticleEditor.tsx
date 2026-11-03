'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ArrowLeft, ExternalLink, Loader2, RotateCcw, Save } from 'lucide-react';
import { useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { ContentForm, cleanContent } from '@/components/admin/ContentForm';
import { Button } from '@/components/ui/button';
import { revalidateBlog } from '@/app/actions/revalidate-content';
import { HOME_CONTENT_COLLECTION } from '@/lib/home-content';
import { articleContentDocId, resolveArticleContent } from '@/lib/blog-articles';

/** Card titles for each part of the original articles, in page order. */
const SECTION_TITLES: Record<string, string> = {
  card: 'Blog card',
  seo: 'SEO (title, description, keywords and share image)',
  hero: 'Article header',
  intro: 'Introduction',
  valveTypes: 'Valve types',
  butterfly: 'Butterfly valves',
  checkValves: 'Check valves',
  knifeGate: 'Knife gate valves',
  diaphragm: 'Diaphragm valves',
  checklist: 'Checklist: five details to confirm',
  maintenance: 'Maintenance costs',
  solutions: 'AMCO solutions',
  planning: 'Planning & call to action',
  whatAre: 'What are PFA and FEP lined valves?',
  difference: 'Difference & comparison table',
  whenPfa: 'When to consider PFA',
  whenFep: 'When to consider FEP',
  questions: 'Five questions to ask',
  construction: 'Complete valve construction',
  cta: 'Call to action box',
  faq: 'Frequently asked questions',
  sidebar: 'Sidebar',
};

/** Short tab names (the full title is shown above each section's fields). */
const TAB_LABELS: Record<string, string> = {
  card: 'Blog card',
  seo: 'SEO',
  hero: 'Header',
  intro: 'Introduction',
  valveTypes: 'Valve types',
  butterfly: 'Butterfly',
  checkValves: 'Check valves',
  knifeGate: 'Knife gate',
  diaphragm: 'Diaphragm',
  checklist: 'Checklist',
  maintenance: 'Maintenance',
  solutions: 'AMCO solutions',
  planning: 'Call to action',
  whatAre: 'PFA & FEP basics',
  difference: 'Comparison table',
  whenPfa: 'When PFA',
  whenFep: 'When FEP',
  questions: 'Five questions',
  construction: 'Construction',
  cta: 'Call to action',
  faq: 'FAQ',
  sidebar: 'Sidebar',
};

/** Edits the text of one of the original, hand-designed articles. */
export function ArticleEditor<T extends Record<string, unknown>>({
  slug,
  defaults,
  onBack,
  heading = 'Edit article',
  viewHref = `/blog/${slug}`,
  viewLabel = 'View article',
  intro = 'This article has its own design: you can change its text and replace its photos here, and the layout stays the same. Photos are in the Blog card, Header and the section where they appear on the page.',
  sectionTitles,
  tabLabels,
}: {
  slug: string;
  defaults: T;
  onBack: () => void;
  heading?: string;
  viewHref?: string;
  viewLabel?: string;
  intro?: string;
  /** Overrides for the default section and tab names. */
  sectionTitles?: Record<string, string>;
  tabLabels?: Record<string, string>;
}) {
  const db = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const contentRef = doc(db, HOME_CONTENT_COLLECTION, articleContentDocId(slug));

  const [content, setContent] = useState<T | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);

  useEffect(() => {
    getDoc(contentRef)
      .then((snap) => setContent(resolveArticleContent(defaults, snap.exists() ? snap.data() : null)))
      .catch((err) => setLoadError(err?.message ?? 'Could not load the article.'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, slug]);

  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const update = (next: T) => {
    setContent(next);
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);
    try {
      const cleaned = cleanContent(content);
      // Merge so the draft/published status (set from the posts list) is kept.
      await setDoc(contentRef, { ...cleaned, updatedAt: serverTimestamp(), updatedBy: user?.email ?? user?.uid ?? null }, { merge: true });
      setContent(cleaned);
      setIsDirty(false);
      await revalidateBlog([slug]).catch(() => {});
      toast({ title: 'Saved', description: 'The article has been updated on the website.' });
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Save failed',
        description: err?.code === 'permission-denied' ? 'This account is not allowed to edit content.' : err?.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const title = content && typeof (content.hero as { title?: unknown })?.title === 'string' ? (content.hero as { title: string }).title : slug;

  return (
    <div className="pb-24">
      <AdminHeader
        title={heading}
        description={title}
        actions={
          <>
            {isDirty && <span className="text-xs font-semibold text-secondary">Unsaved changes</span>}
            <Button variant="secondary" className="font-bold" onClick={handleSave} disabled={isSaving || !isDirty || !content}>
              {isSaving ? <Loader2 className="size-4 mr-1 animate-spin" /> : <Save className="size-4 mr-1" />}
              {isDirty ? 'Save changes' : 'All changes saved'}
            </Button>
          </>
        }
      />

      <main className="px-6 lg:px-10 py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => (isDirty ? setConfirmLeave(true) : onBack())}>
            <ArrowLeft className="size-4 mr-1" /> All posts
          </Button>
          <Link href={viewHref} target="_blank" className="inline-flex items-center gap-1 text-sm text-secondary font-semibold hover:underline">
            {viewLabel} <ExternalLink className="size-3.5" />
          </Link>
          <ConfirmDialog
            open={confirmLeave}
            onOpenChange={setConfirmLeave}
            title="Discard unsaved changes?"
            description="You have changes to this article that haven't been saved. If you go back now, they will be lost."
            confirmLabel="Discard changes"
            onConfirm={onBack}
          />
        </div>

        <p className="text-sm text-foreground/60">
          {intro}
        </p>

        {loadError ? (
          <div className="p-8 rounded-3xl bg-white border border-border text-center">
            <p className="text-destructive font-semibold">Could not load the article.</p>
            <p className="text-sm text-foreground/60 mt-2">{loadError}</p>
            <p className="text-sm text-foreground/60 mt-1">Check that the latest Firestore rules are published.</p>
          </div>
        ) : !content ? (
          <div className="py-24 flex justify-center">
            <Loader2 className="size-8 animate-spin text-secondary" />
          </div>
        ) : (
          <>
            <ContentForm value={content} defaults={defaults} sectionTitles={{ ...SECTION_TITLES, ...sectionTitles }} tabLabels={{ ...TAB_LABELS, ...tabLabels }} onChange={update} />

            <div className="mt-12 p-6 rounded-3xl border border-dashed border-border bg-white flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-primary">Restore original text</p>
                <p className="text-sm text-foreground/60">Loads this article's original text into the editor. Nothing changes until you save.</p>
              </div>
              <ConfirmDialog
                title="Restore original text?"
                description="All of this article's text will be reset to the original, replacing your edits in the editor. Nothing changes on the website until you click &quot;Save changes&quot;."
                confirmLabel="Restore original"
                icon={RotateCcw}
                onConfirm={() => update(defaults)}
                trigger={
                  <Button variant="outline">
                    <RotateCcw className="size-4 mr-1" /> Restore original
                  </Button>
                }
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
