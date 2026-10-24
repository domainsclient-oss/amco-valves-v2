'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { ExternalLink, Pencil, Search } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProductEditor } from '@/components/admin/ProductEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HOME_CONTENT_COLLECTION } from '@/lib/home-content';
import { productContentDocId, resolveProductContent, type ProductContent } from '@/lib/product-content';
import { PRODUCT_CATALOG } from '@/lib/product-catalog';

/** Lists every product page (grouped by family) and opens the editor for one. */
export function ProductManager() {
  const db = useFirestore();
  const [query, setQuery] = useState('');
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  // Saved edits per product doc id, so the list shows current names/photos and an "Edited" badge.
  const [saved, setSaved] = useState<Record<string, unknown>>({});

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, HOME_CONTENT_COLLECTION));
      setSaved(Object.fromEntries(snap.docs.filter((d) => d.id.startsWith('product__')).map((d) => [d.id, d.data()])));
    } catch {
      // Without access the list still works from the original data.
    }
  }, [db]);

  useEffect(() => {
    load();
  }, [load]);

  const products = useMemo(
    () =>
      PRODUCT_CATALOG.map((entry) => {
        const savedData = saved[productContentDocId(entry.slug)];
        const content: ProductContent = savedData ? resolveProductContent(entry.defaults, savedData) : entry.defaults;
        return { ...entry, content, edited: !!savedData };
      }),
    [saved],
  );

  const filtered = products.filter((p) => {
    const q = query.trim().toLowerCase();
    return !q || p.content.title.toLowerCase().includes(q) || p.slug.includes(q) || p.group.toLowerCase().includes(q) || p.content.category.toLowerCase().includes(q);
  });
  const groups = [...new Set(filtered.map((p) => p.group))];

  if (editingSlug) {
    const entry = PRODUCT_CATALOG.find((p) => p.slug === editingSlug)!;
    return (
      <ProductEditor
        slug={entry.slug}
        defaults={entry.defaults}
        onBack={() => {
          setEditingSlug(null);
          load();
        }}
      />
    );
  }

  return (
    <div className="pb-24">
      <AdminHeader title="Product Pages" description={`Edit the details, specifications, photos and data sheets of all ${PRODUCT_CATALOG.length} product pages.`} />

      <main className="px-6 lg:px-10 py-8 space-y-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground/40" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" className="pl-9 bg-white border-border h-11" aria-label="Search products" />
        </div>

        {groups.length === 0 && <p className="text-sm text-foreground/60">No products match "{query}".</p>}

        {groups.map((group) => (
          <section key={group}>
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/50 mb-3">
              {group} <span className="text-foreground/30">· {filtered.filter((p) => p.group === group).length}</span>
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {filtered
                .filter((p) => p.group === group)
                .map((p) => (
                  <div key={p.slug} className="p-3 rounded-2xl bg-white border border-border shadow-sm flex items-center gap-3">
                    <div className="size-16 rounded-xl bg-background border border-border shrink-0 flex items-center justify-center p-1.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.content.images[0]?.src} alt="" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-primary text-sm leading-snug truncate">{p.content.title}</p>
                      <p className="text-xs text-foreground/50 truncate">
                        {p.edited && <span className="text-secondary font-semibold">Edited · </span>}
                        {p.content.specs.length} specs · {p.content.images.length} photos · {p.content.tables.length} tables
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button size="icon" variant="ghost" className="size-9" asChild>
                        <Link href={`/products/${p.slug}`} target="_blank" aria-label="View product page">
                          <ExternalLink className="size-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingSlug(p.slug)}>
                        <Pencil className="size-4 mr-1" /> Edit
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
