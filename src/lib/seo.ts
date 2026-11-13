import type { Metadata } from "next";

/**
 * Search-engine settings of a page, edited in the admin "SEO" tab. Every field is optional:
 * an empty field keeps the page's own default (so pages look the same until something is set).
 */
export interface SeoContent {
  /** Browser tab and search result title. */
  title: string;
  /** Text under the title in search results. */
  description: string;
  /** Comma-separated keywords. */
  keywords: string;
  /** Picture shown when the page is shared (WhatsApp, LinkedIn, Facebook…): a site path. */
  image: string;
}

export const emptySeo: SeoContent = { title: "", description: "", keywords: "", image: "" };

/** The site-wide defaults (also set in the root layout). */
export const SITE_SEO = {
  title: "AMCO Valves | High-Quality Industrial Valves",
  description: "Specializing in 1 Pc, 2 Pc, and 3 Pc Ball Valves. Screwed, Socket Weld, Butt Weld, and Flanged connections available.",
};

/** Reads saved SEO settings, ignoring anything that isn't text. */
export function toSeo(raw: unknown): SeoContent {
  const r = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  return { title: str(r.title), description: str(r.description), keywords: str(r.keywords), image: str(r.image) };
}

/**
 * Saved SEO settings over the page's own SEO defaults, field by field: a field left empty
 * in the admin keeps the default from the code.
 */
export function mergeSeo(saved: unknown, defaults: Partial<SeoContent> | undefined): SeoContent {
  const s = toSeo(saved);
  const d = toSeo(defaults);
  const pick = (k: keyof SeoContent) => (s[k].trim() ? s[k] : d[k]);
  return { title: pick("title"), description: pick("description"), keywords: pick("keywords"), image: pick("image") };
}

export const keywordList = (keywords: string) =>
  keywords
    .split(/[,\n]/)
    .map((k) => k.trim())
    .filter(Boolean);

/**
 * Page metadata from the SEO settings, falling back to the page's own defaults field by field.
 * Fields with neither are left out, so the page keeps what it inherits from the layout.
 */
export function seoMetadata(seo: Partial<SeoContent> | undefined, fallback: { title?: string; description?: string; keywords?: string[]; image?: string } = {}): Metadata {
  const title = seo?.title?.trim() || fallback.title;
  const description = seo?.description?.trim() || fallback.description;
  const keywords = keywordList(seo?.keywords ?? "");
  const image = seo?.image?.trim().startsWith("/") ? seo.image.trim() : fallback.image;

  const metadata: Metadata = {};
  if (title) metadata.title = title;
  if (description) metadata.description = description;
  if (keywords.length) metadata.keywords = keywords;
  else if (fallback.keywords?.length) metadata.keywords = fallback.keywords;
  // Share previews fall back to the title and description; the extra tags are only needed for a share image.
  if (image) {
    metadata.openGraph = {
      ...(title && { title }),
      ...(description && { description }),
      ...(image && { images: [image] }),
    };
    metadata.twitter = { card: "summary_large_image", ...(title && { title }), ...(description && { description }), images: [image] };
  }
  return metadata;
}
