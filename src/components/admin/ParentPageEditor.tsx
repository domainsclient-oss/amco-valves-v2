'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowLeft, ArrowUp, ExternalLink, Eye, EyeOff, Loader2, Plus, RotateCcw, Save, X } from 'lucide-react';
import { useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Field, Section } from '@/components/admin/fields';
import { SeoFields } from '@/components/admin/SeoFields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { revalidateParentPages } from '@/app/actions/revalidate-content';
import { builtInParentPage, isBuiltInParent, parentSlugPattern, type ParentPage } from '@/lib/parent-pages';
import type { FamilyChild } from '@/lib/product-families';
import {
  cleanParentPage,
  facetKeyFor,
  suggestParentSlug,
  updateParentPages,
  withPage,
  type CategoryOption,
} from '@/components/admin/parent-pages-admin';

const TABS = [
  { key: 'details', label: 'Details' },
  { key: 'products', label: 'Products' },
  { key: 'filters', label: 'Filters' },
  { key: 'guide', label: 'Selection guide' },
  { key: 'faqs', label: 'FAQs' },
  { key: 'seo', label: 'SEO' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

function move<T>(items: T[], index: number, direction: -1 | 1) {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function RowButtons({ index, count, onMove, onRemove, removeLabel }: { index: number; count: number; onMove: (d: -1 | 1) => void; onRemove?: () => void; removeLabel: string }) {
  return (
    <div className="flex shrink-0">
      <Button type="button" size="icon" variant="ghost" className="size-8" onClick={() => onMove(-1)} disabled={index === 0} aria-label="Move up">
        <ArrowUp className="size-4" />
      </Button>
      <Button type="button" size="icon" variant="ghost" className="size-8" onClick={() => onMove(1)} disabled={index === count - 1} aria-label="Move down">
        <ArrowDown className="size-4" />
      </Button>
      {onRemove && (
        <Button type="button" size="icon" variant="ghost" className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={onRemove} aria-label={removeLabel}>
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}

/** Product rows: the page's saved rows first, then the category's other products. */
function productRows(page: ParentPage, category: CategoryOption | undefined): FamilyChild[] {
  const saved = page.children;
  const known = new Set(saved.map((c) => c.slug));
  const others = (category?.products ?? []).filter((p) => !known.has(p.slug)).map((p) => ({ slug: p.slug, group: '', attrs: {} }));
  return [...saved, ...others];
}

/** Creates or edits one parent page. */
export function ParentPageEditor({
  initial,
  isNew,
  categories,
  takenSlugs,
  onBack,
  onSaved,
}: {
  initial: ParentPage;
  isNew: boolean;
  categories: CategoryOption[];
  /** Addresses already used by products or other parent pages. */
  takenSlugs: Set<string>;
  onBack: () => void;
  onSaved: (page: ParentPage) => void;
}) {
  const db = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const [page, setPage] = useState<ParentPage>(() => ({ ...initial, children: productRows(initial, categories.find((c) => c.title === initial.category)) }));
  const [tab, setTab] = useState<TabKey>('details');
  const [isDirty, setIsDirty] = useState(isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
  const [newFacet, setNewFacet] = useState('');

  const builtIn = isBuiltInParent(initial.slug) && !isNew;
  const category = categories.find((c) => c.title === page.category);
  const productInfo = useMemo(() => new Map(categories.flatMap((c) => c.products.map((p) => [p.slug, { ...p, category: c.label }] as const))), [categories]);

  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const update = (patch: Partial<ParentPage>) => {
    setPage((p) => ({ ...p, ...patch }));
    setIsDirty(true);
  };

  const setCategory = (title: string) => {
    const next = categories.find((c) => c.title === title);
    // Keep rows already set up for products of the new category; list its other products after them.
    const inCategory = new Set(next?.products.map((p) => p.slug) ?? []);
    const kept = page.children.filter((c) => inCategory.has(c.slug) && (c.group || Object.keys(c.attrs).length || c.hidden));
    update({ category: title, children: productRows({ ...page, children: kept }, next) });
  };

  const setChild = (i: number, patch: Partial<FamilyChild>) => update({ children: page.children.map((c, j) => (j === i ? { ...c, ...patch } : c)) });

  const slugError = (() => {
    if (!isNew) return '';
    const slug = page.slug.trim();
    if (!slug) return 'Enter a web address.';
    if (!parentSlugPattern.test(slug)) return 'Use lower-case letters, numbers and single hyphens, e.g. "lined-valves".';
    if (takenSlugs.has(slug)) return 'This address is already used by a product or another parent page.';
    return '';
  })();

  const problems = [
    !page.title.trim() && 'Add a page title (Details).',
    !page.category && 'Choose the menu category (Details).',
    slugError && `Web address: ${slugError}`,
  ].filter(Boolean) as string[];

  const handleSave = async () => {
    if (problems.length) {
      toast({ variant: 'destructive', title: 'Check the page details', description: problems.join(' ') });
      setTab('details');
      return;
    }
    setIsSaving(true);
    try {
      // Every product row is saved, so the order set here is kept.
      const cleaned = cleanParentPage(page);
      await updateParentPages(db, user?.email ?? user?.uid ?? null, (saved) => {
        if (isNew && saved.pages.some((p) => p.slug === cleaned.slug)) throw new Error('Another parent page already uses this web address.');
        return withPage(saved, cleaned);
      });
      setIsDirty(false);
      await revalidateParentPages([cleaned.slug]).catch(() => {});
      toast({
        title: 'Saved',
        description: cleaned.status === 'published' ? `Live at /products/${cleaned.slug}` : 'Saved as a draft: not shown on the website yet.',
      });
      onSaved(cleaned);
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

  const includedCount = page.children.filter((c) => !c.hidden).length;

  return (
    <div className="pb-24">
      <AdminHeader
        title={isNew ? 'New parent page' : 'Edit parent page'}
        description={page.title || 'Untitled parent page'}
        actions={
          <>
            {isDirty && <span className="text-xs font-semibold text-secondary">Unsaved changes</span>}
            <Button variant="secondary" className="font-bold" onClick={handleSave} disabled={isSaving || !isDirty}>
              {isSaving ? <Loader2 className="size-4 mr-1 animate-spin" /> : <Save className="size-4 mr-1" />}
              {isDirty ? (isNew ? 'Create page' : 'Save changes') : 'All changes saved'}
            </Button>
          </>
        }
      />

      <main className="px-6 lg:px-10 py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => (isDirty ? setConfirmLeave(true) : onBack())}>
            <ArrowLeft className="size-4 mr-1" /> All parent pages
          </Button>
          {!isNew && page.status === 'published' && (
            <Link href={`/products/${page.slug}`} target="_blank" className="inline-flex items-center gap-1 text-sm text-secondary font-semibold hover:underline">
              View page <ExternalLink className="size-3.5" />
            </Link>
          )}
          <ConfirmDialog
            open={confirmLeave}
            onOpenChange={setConfirmLeave}
            title="Discard unsaved changes?"
            description="You have changes to this parent page that haven't been saved. If you go back now, they will be lost."
            confirmLabel="Discard changes"
            onConfirm={onBack}
          />
        </div>

        <div className="rounded-2xl bg-white border border-border shadow-sm">
          <div role="tablist" aria-label="Parent page editor" className="flex overflow-x-auto px-2">
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
                {t.key === 'products' && <span className="ml-1.5 text-xs text-foreground/40">{includedCount}</span>}
                {t.key === 'filters' && <span className="ml-1.5 text-xs text-foreground/40">{page.facets.length}</span>}
                {t.key === 'faqs' && <span className="ml-1.5 text-xs text-foreground/40">{page.faqs.length}</span>}
                <span className={cn('absolute left-3 right-3 bottom-0 h-[3px] rounded-t-full', tab === t.key ? 'bg-secondary' : 'bg-transparent')} />
              </button>
            ))}
          </div>
        </div>

        {tab === 'details' && (
          <>
            <Section title="Page" description="The heading and introduction at the top of the page.">
              <Field
                label="Page title"
                value={page.title}
                onChange={(title) => update({ title, ...(isNew && !slugTouched ? { slug: suggestParentSlug(title) } : {}) })}
                hint='Plural, e.g. "Knife Edge Gate Valves".'
              />
              <div className="space-y-2">
                <Label className="text-primary font-semibold">Web address</Label>
                <div className="flex items-center rounded-md bg-background">
                  <span className="pl-3 text-sm text-foreground/50 whitespace-nowrap">/products/</span>
                  <Input
                    value={page.slug}
                    disabled={!isNew}
                    onChange={(e) => {
                      setSlugTouched(true);
                      update({ slug: e.target.value.toLowerCase().replace(/\s+/g, '-') });
                    }}
                    className="bg-transparent border-none pl-0.5"
                  />
                </div>
                <p className={cn('text-xs', slugError ? 'text-destructive' : 'text-foreground/50')}>
                  {isNew ? slugError || 'Set once when the page is created.' : 'The address can’t be changed after the page is created.'}
                </p>
              </div>
              <Field label="Product name (singular)" value={page.singular} onChange={(singular) => update({ singular })} hint='Lower case, used in sentences, e.g. "knife edge gate valve".' />
              <Field label="Introduction" value={page.intro} onChange={(intro) => update({ intro })} multiline />
              <Field label="Overview panel heading" value={page.chooseBy} onChange={(chooseBy) => update({ chooseBy })} hint='The dark panel next to the introduction, e.g. "Choose by flow direction, connection and seat type."' />
            </Section>

            <Section title="Menu category and status" description="The products of this menu category are listed on the page, and its orange title in the Products menu links here.">
              <div className="space-y-2">
                <Label className="text-primary font-semibold">Menu category</Label>
                <select
                  value={page.category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 rounded-md bg-background px-3 text-sm border-none focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Choose a category…</option>
                  {categories.map((c) => (
                    <option key={c.title} value={c.title}>
                      {c.label}
                      {c.hidden ? ' (hidden in the menu)' : ''} · {c.products.length} product{c.products.length === 1 ? '' : 's'}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-foreground/50">If two published pages use the same category, the menu title links to the first one in the list.</p>
              </div>
              <div className="space-y-2">
                <Label className="text-primary font-semibold">Status</Label>
                <div className="flex flex-wrap gap-2">
                  {(['published', 'draft'] as const).map((s) => (
                    <Button key={s} type="button" variant={page.status === s ? 'default' : 'outline'} size="sm" onClick={() => update({ status: s })}>
                      {s === 'published' ? <Eye className="size-4 mr-1" /> : <EyeOff className="size-4 mr-1" />}
                      {s === 'published' ? 'Published' : 'Draft'}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-foreground/50">Draft pages are not on the website and the menu title doesn't link to them.</p>
              </div>
            </Section>
          </>
        )}

        {tab === 'products' && (
          <Section
            title="Products"
            description="Product cards on the page, in this order. Untick a product to leave it off. The badge and attributes appear on each card and in the filters; product names, sizes and photos come from each product page."
          >
            {!page.category ? (
              <p className="text-sm text-foreground/60">Choose the menu category on the Details tab first.</p>
            ) : (
              <div className="space-y-3">
                {page.children.map((child, i) => {
                  const info = productInfo.get(child.slug);
                  const inCategory = category?.products.some((p) => p.slug === child.slug);
                  return (
                    <div key={child.slug} className={cn('rounded-2xl border border-border p-4 space-y-3', child.hidden ? 'bg-background/60 opacity-70' : 'bg-background')}>
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={!child.hidden}
                          onChange={(e) => setChild(i, { hidden: !e.target.checked })}
                          className="mt-1 size-4 accent-[hsl(var(--secondary))]"
                          aria-label={`Show ${info?.name ?? child.slug} on the page`}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-primary leading-snug">{info?.name ?? child.slug}</p>
                          <p className="text-xs text-foreground/50 mt-0.5 break-all">
                            /products/{child.slug}
                            {info?.note ? ` · ${info.note}` : ''}
                            {!inCategory && ' · not in this category'}
                          </p>
                        </div>
                        <RowButtons
                          index={i}
                          count={page.children.length}
                          onMove={(d) => update({ children: move(page.children, i, d) })}
                          onRemove={inCategory ? undefined : () => update({ children: page.children.filter((_, j) => j !== i) })}
                          removeLabel="Remove product"
                        />
                      </div>
                      {!child.hidden && (
                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 pl-7">
                          <Input value={child.group} onChange={(e) => setChild(i, { group: e.target.value })} placeholder="Badge, e.g. Uni-directional" aria-label="Badge" className="bg-white border-border h-9 text-sm" />
                          {page.facets.map((f) => (
                            <Input
                              key={f.key}
                              value={child.attrs[f.key] ?? ''}
                              onChange={(e) => setChild(i, { attrs: { ...child.attrs, [f.key]: e.target.value } })}
                              placeholder={f.label}
                              aria-label={f.label}
                              className="bg-white border-border h-9 text-sm"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                {!page.children.length && <p className="text-sm text-foreground/60">This category has no products yet.</p>}
                <p className="text-xs text-foreground/50">
                  Empty badge: the product's sub-category is used. Products added to this category later appear on the page automatically, after these.
                </p>
              </div>
            )}
          </Section>
        )}

        {tab === 'filters' && (
          <Section title="Filters and attributes" description="Each attribute becomes a filter above the product grid, a row on the product cards and a column in the comparison table. Set each product's value on the Products tab.">
            <div className="space-y-2">
              {page.facets.map((f, i) => (
                <div key={f.key} className="flex items-center gap-2 p-2 rounded-xl bg-background">
                  <div className="grid gap-2 flex-1 md:grid-cols-2">
                    <Input
                      value={f.label}
                      onChange={(e) => update({ facets: page.facets.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)) })}
                      placeholder="Name, e.g. End connection"
                      aria-label="Attribute name"
                      className="bg-white border-border font-semibold"
                    />
                    <Input
                      value={f.plural}
                      onChange={(e) => update({ facets: page.facets.map((x, j) => (j === i ? { ...x, plural: e.target.value } : x)) })}
                      placeholder='Filter "All …" text, e.g. connections'
                      aria-label="Plural for the filter"
                      className="bg-white border-border"
                    />
                  </div>
                  <ConfirmDialog
                    title="Remove this attribute?"
                    description={
                      <>
                        <strong className="text-primary">{f.label || 'This attribute'}</strong> and its values on every product card will be removed after you save.
                      </>
                    }
                    confirmLabel="Remove"
                    onConfirm={() => update({ facets: page.facets.filter((_, j) => j !== i) })}
                    trigger={
                      <Button type="button" size="icon" variant="ghost" className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10" aria-label="Remove attribute">
                        <X className="size-4" />
                      </Button>
                    }
                  />
                  <RowButtons index={i} count={page.facets.length} onMove={(d) => update({ facets: move(page.facets, i, d) })} removeLabel="" />
                </div>
              ))}
            </div>
            <form
              className="flex flex-wrap gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const label = newFacet.trim();
                if (!label) return;
                const key = facetKeyFor(label, page.facets.map((f) => f.key));
                update({ facets: [...page.facets, { key, label, plural: `${label.toLowerCase()} options` }] });
                setNewFacet('');
              }}
            >
              <Input value={newFacet} onChange={(e) => setNewFacet(e.target.value)} placeholder="New attribute, e.g. Seat type" className="max-w-xs bg-background border-none" />
              <Button type="submit" variant="outline" size="sm" className="h-10" disabled={!newFacet.trim()}>
                <Plus className="size-4 mr-1" /> Add attribute
              </Button>
            </form>
          </Section>
        )}

        {tab === 'guide' && (
          <Section title="How to choose the right configuration" description="Cards in the selection guide section. Leave empty to hide the section.">
            <div className="space-y-4">
              {page.guide.map((card, i) => {
                const setCard = (patch: Partial<typeof card>) => update({ guide: page.guide.map((g, j) => (j === i ? { ...g, ...patch } : g)) });
                return (
                  <div key={i} className="rounded-2xl border border-border bg-background p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="flex-1 space-y-2">
                        <Input value={card.title} onChange={(e) => setCard({ title: e.target.value })} placeholder="Card heading" aria-label="Card heading" className="bg-white border-border font-semibold" />
                        <Input value={card.intro} onChange={(e) => setCard({ intro: e.target.value })} placeholder="Short introduction" aria-label="Card introduction" className="bg-white border-border" />
                      </div>
                      <RowButtons
                        index={i}
                        count={page.guide.length}
                        onMove={(d) => update({ guide: move(page.guide, i, d) })}
                        onRemove={() => update({ guide: page.guide.filter((_, j) => j !== i) })}
                        removeLabel="Remove card"
                      />
                    </div>
                    <div className="space-y-2 pl-3 border-l-2 border-secondary/30">
                      {card.points.map((p, k) => (
                        <div key={k} className="flex items-center gap-2">
                          <div className="grid gap-2 flex-1 md:grid-cols-[14rem_1fr]">
                            <Input
                              value={p.term}
                              onChange={(e) => setCard({ points: card.points.map((x, j) => (j === k ? { ...x, term: e.target.value } : x)) })}
                              placeholder="Bold term"
                              aria-label="Bold term"
                              className="bg-white border-border h-9 text-sm font-semibold"
                            />
                            <Input
                              value={p.text}
                              onChange={(e) => setCard({ points: card.points.map((x, j) => (j === k ? { ...x, text: e.target.value } : x)) })}
                              placeholder="Explanation"
                              aria-label="Explanation"
                              className="bg-white border-border h-9 text-sm"
                            />
                          </div>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => setCard({ points: card.points.filter((_, j) => j !== k) })}
                            aria-label="Remove point"
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="ghost" size="sm" onClick={() => setCard({ points: [...card.points, { term: '', text: '' }] })}>
                        <Plus className="size-4 mr-1" /> Add point
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => update({ guide: [...page.guide, { title: '', intro: '', points: [{ term: '', text: '' }] }] })}>
              <Plus className="size-4 mr-1" /> Add card
            </Button>
          </Section>
        )}

        {tab === 'faqs' && (
          <Section
            title="FAQs"
            description="Questions shown first in the FAQ section. Questions about the filter options and what to send for a quotation are added automatically after these."
          >
            <div className="space-y-3">
              {page.faqs.map((faq, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-2xl bg-background">
                  <div className="flex-1 space-y-2">
                    <Input
                      value={faq.q}
                      onChange={(e) => update({ faqs: page.faqs.map((f, j) => (j === i ? { ...f, q: e.target.value } : f)) })}
                      placeholder="Question"
                      aria-label="Question"
                      className="bg-white border-border font-semibold"
                    />
                    <textarea
                      value={faq.a}
                      onChange={(e) => update({ faqs: page.faqs.map((f, j) => (j === i ? { ...f, a: e.target.value } : f)) })}
                      placeholder="Answer"
                      aria-label="Answer"
                      className="w-full min-h-[80px] rounded-md border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <RowButtons
                    index={i}
                    count={page.faqs.length}
                    onMove={(d) => update({ faqs: move(page.faqs, i, d) })}
                    onRemove={() => update({ faqs: page.faqs.filter((_, j) => j !== i) })}
                    removeLabel="Remove question"
                  />
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => update({ faqs: [...page.faqs, { q: '', a: '' }] })}>
              <Plus className="size-4 mr-1" /> Add question
            </Button>
          </Section>
        )}

        {tab === 'seo' && (
          <SeoFields
            value={{ title: page.seo.title, description: page.seo.description, keywords: page.seo.keywords, image: page.seo.image ?? '' }}
            onChange={(seo) => update({ seo })}
            defaults={{ title: page.title ? `${page.title} | AMCO Valves` : undefined, description: page.intro.slice(0, 160) || undefined }}
          />
        )}

        {builtIn && (
          <div className="mt-12 p-6 rounded-3xl border border-dashed border-border bg-white flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-primary">Restore original page</p>
              <p className="text-sm text-foreground/60">Loads this page's original content into the editor. Nothing changes until you save.</p>
            </div>
            <ConfirmDialog
              title="Restore original page?"
              description="All of this page's text, products, filters, guide, FAQs and SEO settings will be reset to the original in the editor. Nothing changes on the website until you click &quot;Save changes&quot;."
              confirmLabel="Restore original"
              icon={RotateCcw}
              onConfirm={() => {
                const original = builtInParentPage(initial.slug);
                if (!original) return;
                setPage({ ...original, children: productRows(original, categories.find((c) => c.title === original.category)) });
                setIsDirty(true);
              }}
              trigger={
                <Button variant="outline">
                  <RotateCcw className="size-4 mr-1" /> Restore original
                </Button>
              }
            />
          </div>
        )}
      </main>
    </div>
  );
}

