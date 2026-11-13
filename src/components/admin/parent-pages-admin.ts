'use client';

import { collection, doc, getDoc, getDocs, runTransaction, serverTimestamp, type Firestore } from 'firebase/firestore';
import { HOME_CONTENT_COLLECTION } from '@/lib/home-content';
import { CUSTOM_PRODUCTS_COLLECTION, toCustomProduct } from '@/lib/custom-products';
import { PRODUCT_TAXONOMY_DOC, buildProductCategories, toProductTaxonomy } from '@/lib/product-taxonomy';
import { builtInProductDefaults } from '@/lib/product-content-defaults';
import { productNavigationData } from '@/lib/navigation-data';
import { slugify } from '@/lib/blog';
import { BUILT_IN_PARENT_SLUGS, PARENT_PAGES_DOC, toSavedParentPages, type ParentPage, type SavedParentPages } from '@/lib/parent-pages';

/** A menu category and its products, for the parent page editor. */
export interface CategoryOption {
  /** Original title (what pages store). */
  title: string;
  /** Name shown in the menu (after renaming). */
  label: string;
  hidden: boolean;
  products: { slug: string; name: string; note: string }[];
}

/** Menu categories with their built-in and admin-added products (drafts included, marked). */
export async function loadCategoryOptions(db: Firestore): Promise<{ categories: CategoryOption[]; customSlugs: string[] }> {
  const [taxonomySnap, customSnap] = await Promise.all([
    getDoc(doc(db, HOME_CONTENT_COLLECTION, PRODUCT_TAXONOMY_DOC)),
    getDocs(collection(db, CUSTOM_PRODUCTS_COLLECTION)),
  ]);
  const taxonomy = toProductTaxonomy(taxonomySnap.exists() ? taxonomySnap.data() : null);
  const customs = customSnap.docs.map((d) => toCustomProduct(d.id, d.data())).filter((p) => p.slug);

  const categories = buildProductCategories(taxonomy).map((c) => ({
    title: c.title,
    label: c.label,
    hidden: !!c.status,
    products: [
      ...c.subCategories.flatMap((s) =>
        s.products.map((p) => ({ slug: p.slug, name: p.menuName, note: s.status ? `${s.label} (hidden in the admin)` : s.label })),
      ),
      ...customs
        .filter((p) => p.category === c.title)
        .map((p) => ({ slug: p.slug, name: p.menuName || p.content.title, note: p.status === 'draft' ? `${p.subCategory} · draft product` : p.subCategory })),
    ],
  }));
  return { categories, customSlugs: customs.map((p) => p.slug) };
}

/**
 * Web addresses a new parent page can't use: route folders under src/app/products
 * (built-in product folders and parent pages) and existing product addresses.
 */
export function reservedParentSlugs(customSlugs: string[]): Set<string> {
  const builtIn = Object.keys(builtInProductDefaults);
  const nav = productNavigationData.flat().flatMap((c) => c.subCategories.flatMap((s) => s.products.map((p) => p.href.replace(/^\/products\//, ''))));
  return new Set([...BUILT_IN_PARENT_SLUGS, ...builtIn, ...builtIn.map((s) => s.split('/')[0]), ...nav, ...customSlugs]);
}

export function suggestParentSlug(title: string) {
  return slugify(title);
}

export const parentPagesRef = (db: Firestore) => doc(db, HOME_CONTENT_COLLECTION, PARENT_PAGES_DOC);

export async function loadSavedParentPages(db: Firestore): Promise<SavedParentPages> {
  const snap = await getDoc(parentPagesRef(db));
  return toSavedParentPages(snap.exists() ? snap.data() : null);
}

/** Trims text and drops empty rows and undefined values (Firestore rejects undefined). */
export function cleanParentPage(page: ParentPage): ParentPage {
  const facets = page.facets
    .map((f) => ({ key: f.key, label: f.label.trim(), plural: f.plural.trim() || `${f.label.trim().toLowerCase()} options` }))
    .filter((f) => f.key && f.label);
  const keys = new Set(facets.map((f) => f.key));
  return {
    slug: page.slug.trim(),
    category: page.category,
    title: page.title.trim(),
    singular: page.singular.trim(),
    intro: page.intro.trim(),
    chooseBy: page.chooseBy.trim(),
    facets,
    children: page.children.map((c) => ({
      slug: c.slug,
      group: c.group.trim(),
      attrs: Object.fromEntries(Object.entries(c.attrs).map(([k, v]) => [k, v.trim()]).filter(([k, v]) => keys.has(k) && v)),
      ...(c.hidden ? { hidden: true } : {}),
    })),
    guide: page.guide
      .map((g) => ({
        title: g.title.trim(),
        intro: g.intro.trim(),
        points: g.points.map((p) => ({ term: p.term.trim(), text: p.text.trim() })).filter((p) => p.term || p.text),
      }))
      .filter((g) => g.title || g.intro || g.points.length),
    faqs: page.faqs.map((f) => ({ q: f.q.trim(), a: f.a.trim() })).filter((f) => f.q || f.a),
    seo: { title: page.seo.title.trim(), description: page.seo.description.trim(), keywords: page.seo.keywords.trim(), image: page.seo.image?.trim() ?? '' },
    status: page.status,
  };
}

/** Reads the latest saved data, applies `change` and writes it back in one transaction. */
export async function updateParentPages(db: Firestore, by: string | null, change: (saved: SavedParentPages) => SavedParentPages) {
  const ref = parentPagesRef(db);
  return runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const next = change(toSavedParentPages(snap.exists() ? snap.data() : null));
    tx.set(ref, { pages: next.pages, deleted: next.deleted, updatedAt: serverTimestamp(), updatedBy: by });
    return next;
  });
}

/** Saved data with `page` stored (replacing the page at `previousSlug` or its own slug). */
export function withPage(saved: SavedParentPages, page: ParentPage, previousSlug = page.slug): SavedParentPages {
  const exists = saved.pages.some((p) => p.slug === previousSlug);
  return {
    pages: exists ? saved.pages.map((p) => (p.slug === previousSlug ? page : p)) : [...saved.pages, page],
    deleted: saved.deleted.filter((s) => s !== page.slug),
  };
}

export const facetKeyFor = (label: string, taken: string[]) => {
  const base = slugify(label) || 'attribute';
  let key = base;
  for (let i = 2; taken.includes(key); i++) key = `${base}-${i}`;
  return key;
};
