'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Eye, EyeOff, LayoutGrid, Loader2, MoreHorizontal, Pencil, Plus, RotateCcw, Search, Trash2, X } from 'lucide-react';
import { useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { ParentPageEditor } from '@/components/admin/ParentPageEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { revalidateParentPages } from '@/app/actions/revalidate-content';
import { builtInParentPage, isBuiltInParent, newParentPage, resolveParentPages, type ParentPage, type SavedParentPages } from '@/lib/parent-pages';
import {
  loadCategoryOptions,
  loadSavedParentPages,
  reservedParentSlugs,
  updateParentPages,
  withPage,
  type CategoryOption,
} from '@/components/admin/parent-pages-admin';

function StatusLabel({ status }: { status: ParentPage['status'] }) {
  return status === 'published' ? <span className="text-green-700 font-semibold">Published</span> : <span className="text-amber-700 font-semibold">Draft</span>;
}

/** Admin "Parent Pages": the product family pages listing a menu category's products. */
export function ParentPageManager() {
  const db = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const by = user?.email ?? user?.uid ?? null;

  const [saved, setSaved] = useState<SavedParentPages | null>(null);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [customSlugs, setCustomSlugs] = useState<string[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editing, setEditing] = useState<{ page: ParentPage; isNew: boolean } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<ParentPage | null>(null);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    try {
      const [pages, options] = await Promise.all([loadSavedParentPages(db), loadCategoryOptions(db)]);
      setSaved(pages);
      setCategories(options.categories);
      setCustomSlugs(options.customSlugs);
      setLoadError(null);
    } catch (err: any) {
      setLoadError(err?.message ?? 'Could not load the parent pages.');
    }
  }, [db]);

  useEffect(() => {
    load();
  }, [load]);

  const pages = useMemo(() => (saved ? resolveParentPages(saved) : []), [saved]);
  const categoryLabel = (title: string) => categories.find((c) => c.title === title)?.label ?? title;
  const productCount = (page: ParentPage) => {
    const hidden = new Set(page.children.filter((c) => c.hidden).map((c) => c.slug));
    const slugs = new Set([...page.children.map((c) => c.slug), ...(categories.find((c) => c.title === page.category)?.products.map((p) => p.slug) ?? [])]);
    return [...slugs].filter((s) => !hidden.has(s)).length;
  };

  const takenSlugs = useMemo(() => new Set([...reservedParentSlugs(customSlugs), ...pages.map((p) => p.slug), ...(saved?.deleted ?? [])]), [customSlugs, pages, saved]);

  const run = async (change: (s: SavedParentPages) => SavedParentPages, slugs: string[], success: { title: string; description?: string }) => {
    try {
      setSaved(await updateParentPages(db, by, change));
      await revalidateParentPages(slugs).catch(() => {});
      toast(success);
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Could not save',
        description: err?.code === 'permission-denied' ? 'This account is not allowed to edit content.' : err?.message,
      });
    }
  };

  const setStatus = (page: ParentPage, status: ParentPage['status']) =>
    run(
      (s) => {
        const current = resolveParentPages(s).find((p) => p.slug === page.slug) ?? page;
        return withPage(s, { ...current, status });
      },
      [page.slug],
      status === 'published' ? { title: 'Page published', description: `Live at /products/${page.slug}` } : { title: 'Moved to draft', description: 'It is no longer on the website.' },
    );

  const deletePage = (page: ParentPage) =>
    run(
      (s) => ({
        pages: s.pages.filter((p) => p.slug !== page.slug),
        deleted: isBuiltInParent(page.slug) ? [...new Set([...s.deleted, page.slug])] : s.deleted,
      }),
      [page.slug],
      { title: 'Page deleted', description: isBuiltInParent(page.slug) ? 'You can restore it from "Deleted original pages" below.' : undefined },
    );

  const restorePage = (slug: string) =>
    run((s) => ({ pages: s.pages, deleted: s.deleted.filter((d) => d !== slug) }), [slug], { title: 'Page restored', description: `Live at /products/${slug}` });

  if (editing) {
    return (
      <ParentPageEditor
        key={`${editing.page.slug}-${editing.isNew}`}
        initial={editing.page}
        isNew={editing.isNew}
        categories={categories}
        takenSlugs={takenSlugs}
        onBack={() => setEditing(null)}
        onSaved={(page) => {
          setSaved((s) => (s ? withPage(s, page) : s));
          setEditing({ page, isNew: false });
        }}
      />
    );
  }

  const q = search.trim().toLowerCase();
  const shown = q ? pages.filter((p) => [p.title, p.slug, categoryLabel(p.category)].join(' ').toLowerCase().includes(q)) : pages;
  const deletedBuiltIns = (saved?.deleted ?? []).map(builtInParentPage).filter((p): p is ParentPage => p !== null);

  return (
    <div className="pb-24">
      <AdminHeader
        title="Parent Pages"
        description="Product family pages that list a menu category's products."
        actions={
          <Button variant="secondary" className="font-bold" disabled={!saved} onClick={() => setEditing({ page: newParentPage(), isNew: true })}>
            <Plus className="size-4 mr-1" /> New parent page
          </Button>
        }
      />

      <main className="px-6 lg:px-10 py-8">
        <p className="mb-8 text-sm text-foreground/60 max-w-3xl">
          Each parent page lists the products of one menu category in a filterable grid, and the category's orange title in the Products menu links to it.
          Product names, sizes and photos come from the product pages, so edits there show here automatically.
        </p>

        {loadError ? (
          <div className="p-8 rounded-3xl bg-white border border-border text-center">
            <p className="text-destructive font-semibold">Could not load the parent pages.</p>
            <p className="text-sm text-foreground/60 mt-2">{loadError}</p>
            <Button variant="outline" className="mt-4" onClick={load}>
              Try again
            </Button>
          </div>
        ) : !saved ? (
          <div className="py-24 flex justify-center">
            <Loader2 className="size-8 animate-spin text-secondary" />
          </div>
        ) : (
          <>
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-foreground/40 pointer-events-none" />
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search parent pages"
                className="h-12 pl-11 pr-11 rounded-2xl bg-white border-border shadow-sm [&::-webkit-search-cancel-button]:hidden"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-foreground/50 hover:text-primary hover:bg-background"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {!shown.length && (
              <div className="p-8 mb-10 rounded-3xl bg-white border border-dashed border-border text-center">
                <LayoutGrid className="size-8 text-secondary mx-auto mb-3" />
                <p className="font-semibold text-primary">{q ? `No parent pages match "${search.trim()}"` : 'No parent pages yet'}</p>
              </div>
            )}

            <div className="space-y-4">
              {shown.map((page) => {
                const builtIn = isBuiltInParent(page.slug);
                const edited = builtIn && saved.pages.some((p) => p.slug === page.slug);
                const count = productCount(page);
                return (
                  <div key={page.slug} className="p-4 rounded-3xl bg-white border border-border shadow-sm flex flex-wrap items-center gap-4">
                    <div className="size-14 rounded-2xl bg-primary/5 shrink-0 flex items-center justify-center">
                      <LayoutGrid className="size-6 text-secondary" />
                    </div>
                    <div className="flex-1 min-w-[12rem]">
                      <p className="font-bold text-primary leading-snug">{page.title || 'Untitled parent page'}</p>
                      <p className="text-xs text-foreground/50 mt-1">
                        /products/{page.slug} · {page.category ? categoryLabel(page.category) : 'No category'} · {count} product{count === 1 ? '' : 's'} ·{' '}
                        <StatusLabel status={page.status} />
                        {builtIn ? (edited ? ' · Original, edited' : ' · Original') : ' · Added'}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1">
                      <Button size="sm" variant="outline" onClick={() => setEditing({ page, isNew: false })}>
                        <Pencil className="size-4 mr-1" /> Edit
                      </Button>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost" className="px-2" aria-label="More actions">
                            <MoreHorizontal className="size-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52 rounded-xl">
                          {page.status === 'published' && (
                            <DropdownMenuItem asChild>
                              <Link href={`/products/${page.slug}`} target="_blank" className="cursor-pointer">
                                <ExternalLink className="size-4 mr-2" /> View on website
                              </Link>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onSelect={() => setStatus(page, page.status === 'published' ? 'draft' : 'published')} className="cursor-pointer">
                            {page.status === 'published' ? (
                              <>
                                <EyeOff className="size-4 mr-2" /> Move to draft
                              </>
                            ) : (
                              <>
                                <Eye className="size-4 mr-2" /> Publish
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onSelect={() => setConfirmDelete(page)} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                            <Trash2 className="size-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}
            </div>

            {deletedBuiltIns.length > 0 && (
              <>
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/50 mt-12 mb-3">Deleted original pages</h2>
                <div className="space-y-3">
                  {deletedBuiltIns.map((page) => (
                    <div key={page.slug} className="p-4 rounded-3xl bg-white border border-dashed border-border flex flex-wrap items-center gap-4">
                      <div className="flex-1 min-w-[12rem]">
                        <p className="font-semibold text-primary/70">{page.title}</p>
                        <p className="text-xs text-foreground/50 mt-1">/products/{page.slug} · not on the website</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => restorePage(page.slug)}>
                        <RotateCcw className="size-4 mr-1" /> Restore
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        <ConfirmDialog
          open={!!confirmDelete}
          onOpenChange={(open) => !open && setConfirmDelete(null)}
          title="Delete this parent page?"
          description={
            confirmDelete && (
              <>
                <strong className="text-primary">{confirmDelete.title || 'This page'}</strong> (/products/{confirmDelete.slug}) will be removed from the website and the menu title will no
                longer link to it. The products themselves are not affected.
                {isBuiltInParent(confirmDelete.slug) ? ' This is an original page: you can restore it later.' : ' This can’t be undone.'}
              </>
            )
          }
          confirmLabel="Delete page"
          onConfirm={async () => {
            if (confirmDelete) await deletePage(confirmDelete);
            setConfirmDelete(null);
          }}
        />
      </main>
    </div>
  );
}
