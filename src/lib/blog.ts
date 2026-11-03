import { format, isValid, parseISO } from "date-fns";
import { getRestDoc, queryRestDocs } from "@/lib/firestore-rest";
import { button, type ButtonContent } from "@/lib/buttons";
import { emptySeo, toSeo, type SeoContent } from "@/lib/seo";

/**
 * Blog posts written in the admin dashboard (/admin/blog).
 *
 * Posts live in the `blogPosts` collection; photos are stored compressed in
 * `blogImages` and served through /api/blog-images/[id].
 *
 * A post's body is a list of blocks (heading, text, image, table, FAQ, …) that
 * render with the same design as the original hand-built articles, plus a
 * per-post sidebar.
 */

export const BLOG_POSTS_COLLECTION = "blogPosts";
export const BLOG_IMAGES_COLLECTION = "blogImages";
export const BLOG_TAG = "blog";

/** Slugs already used by the hand-built posts in src/app/blog. */
export const RESERVED_BLOG_SLUGS = ["industrial-valves-for-water-treatment", "pfa-vs-fep-lined-valves"];

// --- Blocks ---

export type BlogBlock =
  | { id: string; type: "heading"; text: string; level: "h2" | "h3" }
  /** Blank lines separate paragraphs; lines starting with "- " become bullet points. */
  | { id: string; type: "text"; body: string }
  | { id: string; type: "image"; imageId: string; caption: string }
  /** Firestore can't store nested arrays, so each row wraps its cells. */
  | { id: string; type: "table"; title: string; headers: string[]; rows: { cells: string[] }[] }
  | { id: string; type: "callout"; title: string; text: string }
  | { id: string; type: "infoBox"; title: string; body: string }
  | { id: string; type: "note"; text: string }
  | { id: string; type: "checklist"; items: { label: string; desc: string }[] }
  | { id: string; type: "cta"; heading: string; body: string; primary: ButtonContent; secondary: ButtonContent }
  | { id: string; type: "faq"; heading: string; items: { question: string; answer: string }[] };

export type BlogBlockType = BlogBlock["type"];

export function newBlockId() {
  return Math.random().toString(36).slice(2, 10);
}

/** A new, empty block of the given type (with helpful starting values). */
export function newBlogBlock(type: BlogBlockType): BlogBlock {
  const id = newBlockId();
  switch (type) {
    case "heading":
      return { id, type, text: "", level: "h2" };
    case "text":
      return { id, type, body: "" };
    case "image":
      return { id, type, imageId: "", caption: "" };
    case "table":
      return { id, type, title: "", headers: ["", ""], rows: [{ cells: ["", ""] }] };
    case "callout":
      return { id, type, title: "", text: "" };
    case "infoBox":
      return { id, type, title: "", body: "" };
    case "note":
      return { id, type, text: "" };
    case "checklist":
      return { id, type, items: [{ label: "", desc: "" }] };
    case "cta":
      return {
        id,
        type,
        heading: "Need a valve for a similar application?",
        body: "Share your application details with AMCO Industrial Valves to discuss suitable configurations and request the relevant technical datasheet or quotation.",
        primary: button("Get a Technical Consultation", "/#contact"),
        secondary: button("Explore Catalog", "/#products"),
      };
    case "faq":
      return { id, type, heading: "Frequently Asked Questions", items: [{ question: "", answer: "" }] };
  }
}

// --- Sidebar ---

export interface BlogSidebar {
  expert: { enabled: boolean; title: string; text: string; button: ButtonContent };
  info: { enabled: boolean; title: string; text: string };
  links: { enabled: boolean; title: string; items: { label: string; href: string }[] };
}

export function defaultBlogSidebar(): BlogSidebar {
  return {
    expert: {
      enabled: true,
      title: "Expert Assistance",
      text: "Our engineering team can evaluate your process conditions and recommend the right valve configuration for your application.",
      button: button("Consult an Engineer", "/#contact"),
    },
    info: {
      enabled: true,
      title: "Quality Assured",
      text: "Every AMCO valve is manufactured from quality castings and forgings with inspection at every stage of manufacture.",
    },
    links: { enabled: false, title: "Related Products", items: [] },
  };
}

// --- Posts ---

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  /** Optional blog-card text; empty uses the title / summary. */
  cardTitle: string;
  cardDescription: string;
  coverImageId: string;
  /** ISO date, e.g. "2026-10-24". */
  date: string;
  blocks: BlogBlock[];
  sidebar: BlogSidebar;
  /** Search-engine settings (admin "SEO" tab); empty fields use the title, summary and cover photo. */
  seo: SeoContent;
  status: "draft" | "published";
}

export function newBlogPost(id: string): BlogPost {
  return {
    id,
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    cardTitle: "",
    cardDescription: "",
    coverImageId: "",
    date: format(new Date(), "yyyy-MM-dd"),
    blocks: [newBlogBlock("heading"), newBlogBlock("text"), newBlogBlock("cta")],
    sidebar: defaultBlogSidebar(),
    seo: { ...emptySeo },
    status: "draft",
  };
}

/** All photos a post uses (cover and image blocks), e.g. to clean up when deleting it. */
export function blogPostImageIds(post: BlogPost) {
  return [post.coverImageId, ...post.blocks.map((b) => (b.type === "image" ? b.imageId : ""))].filter(Boolean);
}

/** "PFA vs FEP: Lined Valves!" -> "pfa-vs-fep-lined-valves" */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** "2026-10-05" -> "October 05, 2026", matching the existing blog cards. */
export function formatBlogDate(isoDate: string) {
  const date = parseISO(isoDate);
  return isValid(date) ? format(date, "MMMM dd, yyyy") : isoDate;
}

export function blogImageUrl(imageId: string) {
  return `/api/blog-images/${imageId}`;
}

// --- Reading stored posts (tolerating missing or malformed fields) ---

type Raw = Record<string, unknown>;

const str = (value: unknown) => (typeof value === "string" ? value : "");
const list = (value: unknown) =>
  (Array.isArray(value) ? value : []).filter((item): item is Raw => typeof item === "object" && item !== null);
const strList = (value: unknown) => (Array.isArray(value) ? value : []).map(str);
const toButton = (value: unknown, fallback: ButtonContent): ButtonContent => {
  if (typeof value !== "object" || value === null) return fallback;
  const raw = value as Raw;
  return { label: str(raw.label), href: str(raw.href) || fallback.href, id: str(raw.id) };
};

function toBlock(raw: Raw, index: number): BlogBlock | null {
  const id = str(raw.id) || `b${index}`;
  switch (raw.type) {
    case "heading":
      return { id, type: "heading", text: str(raw.text), level: raw.level === "h3" ? "h3" : "h2" };
    case "text":
      return { id, type: "text", body: str(raw.body) };
    case "image":
      return { id, type: "image", imageId: str(raw.imageId), caption: str(raw.caption) };
    case "table":
      return { id, type: "table", title: str(raw.title), headers: strList(raw.headers), rows: list(raw.rows).map((r) => ({ cells: strList(r.cells) })) };
    case "callout":
      return { id, type: "callout", title: str(raw.title), text: str(raw.text) };
    case "infoBox":
      return { id, type: "infoBox", title: str(raw.title), body: str(raw.body) };
    case "note":
      return { id, type: "note", text: str(raw.text) };
    case "checklist":
      return { id, type: "checklist", items: list(raw.items).map((i) => ({ label: str(i.label), desc: str(i.desc) })) };
    case "cta": {
      const defaults = newBlogBlock("cta") as Extract<BlogBlock, { type: "cta" }>;
      return {
        id,
        type: "cta",
        heading: str(raw.heading),
        body: str(raw.body),
        primary: toButton(raw.primary, defaults.primary),
        secondary: toButton(raw.secondary, defaults.secondary),
      };
    }
    case "faq":
      return { id, type: "faq", heading: str(raw.heading), items: list(raw.items).map((i) => ({ question: str(i.question), answer: str(i.answer) })) };
    default:
      return null;
  }
}

/** Posts saved before blocks existed had a specs table and heading/text/photo sections. */
function legacyBlocks(data: Raw): BlogBlock[] {
  const blocks: BlogBlock[] = [];
  const specs = list(data.specs).filter((s) => str(s.label) || str(s.value));
  if (specs.length) {
    blocks.push({
      id: "legacy-specs",
      type: "table",
      title: str(data.specsTitle) || "Key Specifications",
      headers: [],
      rows: specs.map((s) => ({ cells: [str(s.label), str(s.value)] })),
    });
  }
  list(data.sections).forEach((s, i) => {
    if (str(s.heading)) blocks.push({ id: `legacy-h${i}`, type: "heading", text: str(s.heading), level: "h2" });
    if (str(s.body)) blocks.push({ id: `legacy-t${i}`, type: "text", body: str(s.body) });
    if (str(s.imageId)) blocks.push({ id: `legacy-i${i}`, type: "image", imageId: str(s.imageId), caption: str(s.imageCaption) });
  });
  // The old template always ended with a call-to-action box.
  blocks.push({ ...(newBlogBlock("cta") as Extract<BlogBlock, { type: "cta" }>), id: "legacy-cta" });
  return blocks;
}

function toSidebar(value: unknown): BlogSidebar {
  const defaults = defaultBlogSidebar();
  if (typeof value !== "object" || value === null) return defaults;
  const raw = value as Raw;
  const expert = (raw.expert ?? {}) as Raw;
  const info = (raw.info ?? {}) as Raw;
  const links = (raw.links ?? {}) as Raw;
  // Missing fields fall back to the defaults; text deliberately cleared in the editor ("") is kept.
  const text = (value: unknown, fallback: string) => (typeof value === "string" ? value : fallback);
  return {
    expert: {
      enabled: typeof expert.enabled === "boolean" ? expert.enabled : defaults.expert.enabled,
      title: text(expert.title, defaults.expert.title),
      text: text(expert.text, defaults.expert.text),
      button: expert.button === undefined ? defaults.expert.button : toButton(expert.button, defaults.expert.button),
    },
    info: {
      enabled: typeof info.enabled === "boolean" ? info.enabled : defaults.info.enabled,
      title: text(info.title, defaults.info.title),
      text: text(info.text, defaults.info.text),
    },
    links: {
      enabled: typeof links.enabled === "boolean" ? links.enabled : defaults.links.enabled,
      title: text(links.title, defaults.links.title),
      items: list(links.items).map((l) => ({ label: str(l.label), href: str(l.href) })),
    },
  };
}

/** Turns raw Firestore data into a BlogPost. */
export function toBlogPost(id: string, data: Raw): BlogPost {
  const blocks = Array.isArray(data.blocks)
    ? list(data.blocks).map(toBlock).filter((b): b is BlogBlock => b !== null)
    : legacyBlocks(data);

  return {
    id,
    title: str(data.title),
    slug: str(data.slug),
    category: str(data.category),
    excerpt: str(data.excerpt),
    cardTitle: str(data.cardTitle),
    cardDescription: str(data.cardDescription),
    coverImageId: str(data.coverImageId),
    date: str(data.date),
    blocks,
    sidebar: toSidebar(data.sidebar),
    seo: toSeo(data.seo),
    status: data.status === "published" ? "published" : "draft",
  };
}

const cacheOptions = { revalidate: 60, tags: [BLOG_TAG] };

/** Published posts, newest first. Returns [] if anything goes wrong. */
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const docs = await queryRestDocs(BLOG_POSTS_COLLECTION, { status: "published" }, cacheOptions);
  return docs
    .map((doc) => toBlogPost(doc.id, doc.data))
    .filter((post) => post.slug && post.title)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPublishedBlogPost(slug: string): Promise<BlogPost | null> {
  const docs = await queryRestDocs(BLOG_POSTS_COLLECTION, { slug, status: "published" }, cacheOptions);
  return docs.length ? toBlogPost(docs[0].id, docs[0].data) : null;
}

/** A stored photo: base64 data plus its MIME type. */
export async function getBlogImage(imageId: string) {
  const doc = await getRestDoc(`${BLOG_IMAGES_COLLECTION}/${imageId}`, { revalidate: false });
  if (!doc || typeof doc.data.data !== "string") return null;
  return { base64: doc.data.data, contentType: str(doc.data.contentType) || "image/jpeg" };
}
