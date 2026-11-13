import { getRestDoc } from "@/lib/firestore-rest";
import { HOME_CONTENT_COLLECTION } from "@/lib/home-content";
import { productFamilies, type ProductFamily, type FamilyChild, type FamilyFacet, type FamilyGuideCard } from "@/lib/product-families";

/**
 * Parent product pages (/products/<slug>), managed in the admin under "Parent Pages".
 *
 * The built-in pages are defined in src/lib/product-families.ts. Edits, new pages and
 * deletions are saved together in `siteContent/parent-product-pages`:
 *   pages:   full data of every page edited or added from the admin
 *   deleted: slugs of built-in pages deleted from the admin
 * A built-in page without saved edits uses its original data.
 */

export const PARENT_PAGES_DOC = "parent-product-pages";
export const PARENT_PAGES_TAG = "parent-pages";

export type ParentPageStatus = "published" | "draft";

export interface ParentPage extends ProductFamily {
  status: ParentPageStatus;
}

export interface SavedParentPages {
  pages: ParentPage[];
  deleted: string[];
}

export const emptySavedParentPages: SavedParentPages = { pages: [], deleted: [] };

/** Slugs of the built-in parent pages; each has its own route folder under src/app/products. */
export const BUILT_IN_PARENT_SLUGS = productFamilies.map((f) => f.slug);

export const isBuiltInParent = (slug: string) => BUILT_IN_PARENT_SLUGS.includes(slug);

export function builtInParentPage(slug: string): ParentPage | null {
  const family = productFamilies.find((f) => f.slug === slug);
  return family ? { ...family, status: "published" } : null;
}

// --- Reading saved data (tolerating missing or malformed fields) ---

type Raw = Record<string, unknown>;
const str = (v: unknown, fallback = "") => (typeof v === "string" ? v : fallback);
const objects = (v: unknown) => (Array.isArray(v) ? v : []).filter((x): x is Raw => typeof x === "object" && x !== null && !Array.isArray(x));

export const parentSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function toFacet(raw: Raw): FamilyFacet | null {
  const key = str(raw.key).trim();
  const label = str(raw.label).trim();
  return key && label ? { key, label, plural: str(raw.plural).trim() || `${label.toLowerCase()} options` } : null;
}

function toChild(raw: Raw): FamilyChild | null {
  const slug = str(raw.slug).trim();
  if (!slug) return null;
  const attrsRaw = typeof raw.attrs === "object" && raw.attrs !== null ? (raw.attrs as Raw) : {};
  const attrs = Object.fromEntries(Object.entries(attrsRaw).map(([k, v]) => [k, str(v).trim()]).filter(([, v]) => v));
  return { slug, group: str(raw.group).trim(), attrs, ...(raw.hidden === true && { hidden: true }) };
}

function toGuideCard(raw: Raw): FamilyGuideCard {
  return {
    title: str(raw.title),
    intro: str(raw.intro),
    points: objects(raw.points).map((p) => ({ term: str(p.term), text: str(p.text) })),
  };
}

export function toParentPage(raw: unknown): ParentPage | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Raw;
  const slug = str(r.slug).trim();
  if (!parentSlugPattern.test(slug)) return null;
  const seo = typeof r.seo === "object" && r.seo !== null ? (r.seo as Raw) : {};
  return {
    slug,
    category: str(r.category),
    title: str(r.title),
    singular: str(r.singular),
    intro: str(r.intro),
    chooseBy: str(r.chooseBy),
    facets: objects(r.facets).map(toFacet).filter((f): f is FamilyFacet => f !== null),
    children: objects(r.children).map(toChild).filter((c): c is FamilyChild => c !== null),
    guide: objects(r.guide).map(toGuideCard),
    faqs: objects(r.faqs).map((f) => ({ q: str(f.q), a: str(f.a) })),
    seo: { title: str(seo.title), description: str(seo.description), keywords: str(seo.keywords), image: str(seo.image) },
    status: r.status === "draft" ? "draft" : "published",
  };
}

export function toSavedParentPages(raw: unknown): SavedParentPages {
  if (typeof raw !== "object" || raw === null) return emptySavedParentPages;
  const r = raw as Raw;
  const seen = new Set<string>();
  const pages = objects(r.pages)
    .map(toParentPage)
    .filter((p): p is ParentPage => p !== null && !seen.has(p.slug) && !!seen.add(p.slug));
  return { pages, deleted: (Array.isArray(r.deleted) ? r.deleted : []).map((d) => str(d)).filter(Boolean) };
}

/** Every parent page, built-in ones first (in their original order), then pages added from the admin. */
export function resolveParentPages(saved: SavedParentPages): ParentPage[] {
  const builtIn = productFamilies
    .filter((f) => !saved.deleted.includes(f.slug))
    .map((f) => saved.pages.find((p) => p.slug === f.slug) ?? { ...f, status: "published" as const });
  const added = saved.pages.filter((p) => !isBuiltInParent(p.slug));
  return [...builtIn, ...added];
}

export async function getSavedParentPages(): Promise<SavedParentPages> {
  const doc = await getRestDoc(`${HOME_CONTENT_COLLECTION}/${PARENT_PAGES_DOC}`, { revalidate: 60, tags: [PARENT_PAGES_TAG] });
  return doc ? toSavedParentPages(doc.data) : emptySavedParentPages;
}

/** A published parent page, or null when it doesn't exist, was deleted or is a draft. */
export async function getPublishedParentPage(slug: string): Promise<ParentPage | null> {
  const page = resolveParentPages(await getSavedParentPages()).find((p) => p.slug === slug);
  return page && page.status === "published" ? page : null;
}

/** Menu category (original title) → parent page link, for published pages. The first page for a category wins. */
export function parentPageLinks(pages: ParentPage[]): Map<string, string> {
  const links = new Map<string, string>();
  for (const p of pages) {
    if (p.status === "published" && p.category && !links.has(p.category)) links.set(p.category, `/products/${p.slug}`);
  }
  return links;
}

/** An empty page for "New parent page". */
export function newParentPage(): ParentPage {
  return {
    slug: "",
    category: "",
    title: "",
    singular: "",
    intro: "",
    chooseBy: "",
    facets: [],
    children: [],
    guide: [],
    faqs: [],
    seo: { title: "", description: "", keywords: "", image: "" },
    status: "draft",
  };
}
