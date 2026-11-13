import { notFound } from "next/navigation";
import { getRestDoc } from "@/lib/firestore-rest";
import { HOME_CONTENT_COLLECTION } from "@/lib/home-content";
import { isBuiltInProductVisible } from "@/lib/product-taxonomy";
import { mergeSeo, seoMetadata, type SeoContent } from "@/lib/seo";
import { isProductFileUrl } from "@/lib/product-files";

/**
 * Editable content of the product detail pages (/products/...).
 *
 * Each product page keeps its own layout; its data (title, specifications,
 * photos and data-sheet tables) comes from a ProductContent object. The page's
 * `content.ts` holds the original data as defaults; edits from the admin
 * dashboard are saved as `siteContent/product__<slug>` and replace them.
 */

export interface ProductSpec {
  label: string;
  /** Small extra text shown after the label on some pages (e.g. "(IBR)"); usually empty. */
  subLabel: string;
  value: string;
}

export interface ProductImage {
  /** A site path: a file in /public or an uploaded image (/api/blog-images/<id>). */
  src: string;
  alt: string;
}

/** An uploaded catalog / data-sheet PDF (see src/lib/product-files.ts). */
export interface ProductPdf {
  /** /api/product-files/<id> */
  src: string;
  /** Original file name, e.g. "KGV-catalog.pdf". */
  name: string;
  /** Size in bytes (shown in the admin). */
  size: number;
}

/** A heading cell spanning several columns in the optional group-heading row. */
export interface ProductTableGroup {
  label: string;
  span: number;
}

/**
 * A table row. `kind` is "" for a normal row, "section" for a heading row inside the
 * table (e.g. "DN700", only the first cell is used) and "child" for a row grouped under
 * the section above it.
 */
export interface ProductTableRow {
  cells: string[];
  kind: "" | "section" | "child";
}

export interface ProductTable {
  /** Title row spanning the whole table; empty for none. */
  title: string;
  /**
   * Optional row above the column headings, e.g. "TO SUIT 150# FLANGES" over three columns.
   * When used, the first column heading spans both heading rows.
   */
  groups: ProductTableGroup[];
  headers: string[];
  /** Firestore can't store nested arrays, so each row wraps its cells. */
  rows: ProductTableRow[];
  /** Footnote under the table, e.g. "All dimensions are in mm"; empty for none. */
  note: string;
}

export interface ProductContent {
  /** Category shown in the breadcrumb and above the title. */
  category: string;
  /** The product name: page heading, image alt text and quote form. */
  title: string;
  specs: ProductSpec[];
  /** Showcase photos; the first one is the main product photo. */
  images: ProductImage[];
  tables: ProductTable[];
  /**
   * Catalog PDFs downloaded by the separate "Download PDF" button, which is hidden when none is
   * uploaded. With one PDF the button downloads it; with several it opens a menu with one item per PDF.
   */
  dataSheetPdfs?: ProductPdf[];
  /** Search-engine settings (admin "SEO" tab); missing or empty fields keep the site defaults. */
  seo?: SeoContent;
}

export function productContentDocId(slug: string) {
  return `product__${slug.replace(/\//g, "__")}`;
}

// --- Reading saved content (tolerating missing or malformed fields) ---

type Raw = Record<string, unknown>;

const str = (value: unknown, fallback = "") => (typeof value === "string" ? value : fallback);
const list = (value: unknown) =>
  (Array.isArray(value) ? value : []).filter((item): item is Raw => typeof item === "object" && item !== null);
const strList = (value: unknown) => (Array.isArray(value) ? value : []).map((v) => str(v));

/** Only site paths can be shown with next/image; anything else is dropped. */
const isSitePath = (src: string) => src.startsWith("/");

function toProductPdf(value: unknown): ProductPdf | null {
  if (typeof value !== "object" || value === null) return null;
  const raw = value as Raw;
  const src = str(raw.src);
  if (!isProductFileUrl(src)) return null;
  return { src, name: str(raw.name) || "data-sheet.pdf", size: Math.max(0, Number(raw.size) || 0) };
}

/**
 * The saved PDF list. Content saved before multiple PDFs were supported has a single
 * `dataSheetPdf` instead; it is read as a one-item list.
 */
function toProductPdfs(raw: Raw, defaults: ProductContent): ProductPdf[] {
  if (Array.isArray(raw.dataSheetPdfs)) {
    return raw.dataSheetPdfs.map(toProductPdf).filter((pdf): pdf is ProductPdf => pdf !== null);
  }
  if ("dataSheetPdf" in raw) {
    const pdf = toProductPdf(raw.dataSheetPdf);
    return pdf ? [pdf] : [];
  }
  return defaults.dataSheetPdfs ?? [];
}

export function resolveProductContent(defaults: ProductContent, saved: unknown): ProductContent {
  if (typeof saved !== "object" || saved === null) return defaults;
  const raw = saved as Raw;

  const images = Array.isArray(raw.images)
    ? list(raw.images)
        .map((i) => ({ src: str(i.src), alt: str(i.alt) }))
        .filter((i) => isSitePath(i.src))
    : defaults.images;

  return {
    category: str(raw.category, defaults.category),
    title: str(raw.title, defaults.title),
    specs: Array.isArray(raw.specs)
      ? list(raw.specs).map((s) => ({ label: str(s.label), subLabel: str(s.subLabel), value: str(s.value) }))
      : defaults.specs,
    // Pages always need a main photo; fall back to the original photos if all were removed.
    images: images.length ? images : defaults.images,
    tables: Array.isArray(raw.tables)
      ? list(raw.tables).map((t) => ({
          title: str(t.title),
          groups: list(t.groups).map((g) => ({ label: str(g.label), span: Math.max(1, Math.round(Number(g.span) || 1)) })),
          headers: strList(t.headers),
          rows: list(t.rows).map((r) => ({
            cells: strList(r.cells),
            kind: r.kind === "section" || r.kind === "child" ? r.kind : ("" as const),
          })),
          note: str(t.note),
        }))
      : defaults.tables,
    dataSheetPdfs: toProductPdfs(raw, defaults),
    // Empty SEO fields saved from the admin keep the page's defaults (content.ts).
    seo: mergeSeo(raw.seo, defaults.seo),
  };
}

/**
 * Fetches a product's saved content merged onto its defaults. Shows "not found" when the
 * product (or its category / sub-category) was put to draft or deleted in the admin.
 */
export async function getProductContent(slug: string, defaults: ProductContent): Promise<ProductContent> {
  if (!(await isBuiltInProductVisible(slug))) notFound();
  const doc = await getRestDoc(`${HOME_CONTENT_COLLECTION}/${productContentDocId(slug)}`, {
    revalidate: 60,
    tags: [`product:${slug}`],
  });
  return doc ? resolveProductContent(defaults, doc.data) : defaults;
}

/** Cells of a table row padded/trimmed to the table's column count. */
export function rowCells(table: ProductTable, row: ProductTableRow) {
  return Array.from({ length: table.headers.length }, (_, i) => row.cells[i] ?? "");
}

/** Page metadata from the product's SEO tab; empty fields keep the site defaults. */
export async function productMetadata(slug: string, defaults: ProductContent) {
  return seoMetadata((await getProductContent(slug, defaults)).seo);
}
