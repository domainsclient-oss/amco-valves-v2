import { getRestDoc } from "@/lib/firestore-rest";
import { HOME_CONTENT_COLLECTION } from "@/lib/home-content";
import { productNavigationData } from "@/lib/navigation-data";
import { slugify } from "@/lib/blog";

/**
 * Product classification managed from the admin dashboard, saved as
 * `siteContent/product-categories`: categories / sub-categories added on top of
 * the built-in menu (src/lib/navigation-data.ts), renamed labels, and the
 * draft / deleted status of categories, sub-categories and built-in products.
 *
 * Categories and sub-categories are identified by their ORIGINAL name, so
 * renaming only changes the label and products stay attached.
 */

export const PRODUCT_TAXONOMY_DOC = "product-categories";
export const PRODUCT_TAXONOMY_TAG = "custom-products";

/** "" = visible (published). Built-in items are never really removed, only marked deleted. */
export type VisibilityStatus = "" | "draft" | "deleted";

export interface ProductTaxonomy {
  /** New categories, each with its own sub-categories. */
  categories: { title: string; subCategories: string[] }[];
  /** New sub-categories added to the built-in menu categories. */
  subCategories: { category: string; name: string }[];
  /** Renamed labels, keyed by categoryKey() / subCategoryKey(). */
  labels: { key: string; value: string }[];
  /** Draft / deleted status, keyed by categoryKey() / subCategoryKey() / productKey(). */
  statuses: { key: string; value: Exclude<VisibilityStatus, ""> }[];
  /**
   * Custom order of categories (CATEGORY_ORDER_KEY), sub-categories (subCategoryOrderKey) and
   * products (productOrderKey). Items not listed keep their original order, after listed ones.
   */
  orders: { key: string; items: string[] }[];
}

export const emptyTaxonomy: ProductTaxonomy = { categories: [], subCategories: [], labels: [], statuses: [], orders: [] };

export const categoryKey = (title: string) => `c:${title}`;
export const subCategoryKey = (category: string, name: string) => `s:${category}|${name}`;
export const productKey = (slug: string) => `p:${slug}`;
export const CATEGORY_ORDER_KEY = "o:categories";
export const subCategoryOrderKey = (category: string) => `o:c:${category}`;
export const productOrderKey = (category: string, subCategory: string) => `o:s:${category}|${subCategory}`;

type Raw = Record<string, unknown>;
const str = (value: unknown) => (typeof value === "string" ? value : "");
const objects = (v: unknown) => (Array.isArray(v) ? v : []).filter((x): x is Raw => typeof x === "object" && x !== null);

export function toProductTaxonomy(raw: unknown): ProductTaxonomy {
  if (typeof raw !== "object" || raw === null) return emptyTaxonomy;
  const data = raw as Raw;
  return {
    categories: objects(data.categories)
      .map((c) => ({ title: str(c.title), subCategories: (Array.isArray(c.subCategories) ? c.subCategories : []).map(str).filter(Boolean) }))
      .filter((c) => c.title),
    subCategories: objects(data.subCategories).map((x) => ({ category: str(x.category), name: str(x.name) })).filter((x) => x.category && x.name),
    labels: objects(data.labels).map((x) => ({ key: str(x.key), value: str(x.value) })).filter((x) => x.key && x.value),
    statuses: objects(data.statuses)
      .map((x) => ({ key: str(x.key), value: x.value === "deleted" ? ("deleted" as const) : ("draft" as const) }))
      .filter((x) => x.key),
    orders: objects(data.orders)
      .map((x) => ({ key: str(x.key), items: (Array.isArray(x.items) ? x.items : []).map(str).filter(Boolean) }))
      .filter((x) => x.key),
  };
}

export async function getProductTaxonomy(): Promise<ProductTaxonomy> {
  const doc = await getRestDoc(`${HOME_CONTENT_COLLECTION}/${PRODUCT_TAXONOMY_DOC}`, { revalidate: 60, tags: [PRODUCT_TAXONOMY_TAG] });
  return doc ? toProductTaxonomy(doc.data) : emptyTaxonomy;
}

export function labelOf(taxonomy: ProductTaxonomy, key: string, fallback: string) {
  return taxonomy.labels.find((l) => l.key === key)?.value || fallback;
}

export function statusOf(taxonomy: ProductTaxonomy, key: string): VisibilityStatus {
  return taxonomy.statuses.find((s) => s.key === key)?.value ?? "";
}

/** Returns the taxonomy with `key` set to `value` ("" removes the entry). */
export function withEntry(list: { key: string; value: string }[], key: string, value: string) {
  return [...list.filter((x) => x.key !== key), ...(value ? [{ key, value }] : [])];
}

/** Whether anything in the taxonomy changes what the website shows. */
export function taxonomyAffectsSite(taxonomy: ProductTaxonomy) {
  return taxonomy.labels.length > 0 || taxonomy.statuses.length > 0 || taxonomy.orders.length > 0;
}

export function orderOf(taxonomy: ProductTaxonomy, key: string) {
  return taxonomy.orders.find((o) => o.key === key)?.items ?? [];
}

/** Returns the orders with `key` set to `items`. */
export function withOrder(orders: ProductTaxonomy["orders"], key: string, items: string[]) {
  return [...orders.filter((o) => o.key !== key), { key, items }];
}

/** Sorts items by a saved order; items not in it keep their original order after the listed ones. */
export function applyOrder<T>(items: T[], id: (item: T) => string, order: string[]) {
  if (!order.length) return items;
  const rank = new Map(order.map((key, i) => [key, i]));
  return items
    .map((item, i) => ({ item, i, r: rank.get(id(item)) }))
    .sort((a, b) => (a.r ?? Infinity) - (b.r ?? Infinity) || a.i - b.i)
    .map((x) => x.item);
}

/**
 * Category titles per menu column: the built-in columns, with new categories added to the last
 * one, each column sorted by the saved category order. Categories never move between columns,
 * so the menu layout stays the same.
 */
export function categoryColumns(taxonomy: ProductTaxonomy): string[][] {
  const columns = productNavigationData.map((column) => column.map((c) => c.title));
  const builtIn = new Set(columns.flat());
  const added = taxonomy.categories.map((c) => c.title).filter((t) => !builtIn.has(t));
  columns[columns.length - 1] = [...columns[columns.length - 1], ...added];
  const order = orderOf(taxonomy, CATEGORY_ORDER_KEY);
  return columns.map((column) => applyOrder(column, (t) => t, order));
}

/** Menu category and sub-category of a built-in product page. */
export function builtInLocation(slug: string): { category: string; subCategory: string } | null {
  for (const category of productNavigationData.flat()) {
    for (const sub of category.subCategories) {
      if (sub.products.some((p) => p.href === `/products/${slug}`)) return { category: category.title, subCategory: sub.name };
    }
  }
  return null;
}

/** A product is on the website only if it, its sub-category and its category are all visible. */
export function isProductVisible(taxonomy: ProductTaxonomy, slug: string, category: string, subCategory: string) {
  return (
    !statusOf(taxonomy, productKey(slug)) &&
    !statusOf(taxonomy, subCategoryKey(category, subCategory)) &&
    !statusOf(taxonomy, categoryKey(category))
  );
}

/** For built-in product pages: false when an admin put the product (or its category) to draft or deleted it. */
export async function isBuiltInProductVisible(slug: string) {
  const location = builtInLocation(slug);
  if (!location) return true;
  return isProductVisible(await getProductTaxonomy(), slug, location.category, location.subCategory);
}

/** A category as shown in the admin: built-in menu entries plus anything added from the admin. */
export interface ProductCategory {
  /** Original name (the identifier). */
  title: string;
  /** Name to show (after renaming). */
  label: string;
  status: VisibilityStatus;
  /** True for categories added from the admin. */
  isNew: boolean;
  /** Menu column the category is in (categories only move within their column). */
  column: number;
  subCategories: {
    name: string;
    label: string;
    status: VisibilityStatus;
    isNew: boolean;
    /** Built-in products in menu order, with their menu link text (after renaming). */
    products: { slug: string; menuName: string }[];
  }[];
}

/**
 * Categories as shown in the admin, in menu order (column by column), with new sub-categories
 * merged in and the saved names, statuses and order applied.
 */
export function buildProductCategories(taxonomy: ProductTaxonomy): ProductCategory[] {
  const builtInCategories = productNavigationData.flat();
  const columns = categoryColumns(taxonomy);

  return columns.flatMap((titles, column) =>
    titles.map((title) => {
      const builtIn = builtInCategories.find((c) => c.title === title);
      const added = taxonomy.categories.find((c) => c.title === title);
      const sub = (name: string, isNew: boolean, products: { name: string; href: string }[]) => ({
        name,
        label: labelOf(taxonomy, subCategoryKey(title, name), name),
        status: statusOf(taxonomy, subCategoryKey(title, name)),
        isNew,
        products: applyOrder(
          products.map((p) => {
            const slug = p.href.replace(/^\/products\//, "");
            return { slug, menuName: labelOf(taxonomy, productKey(slug), p.name) };
          }),
          (p) => p.slug,
          orderOf(taxonomy, productOrderKey(title, name)),
        ),
      });
      const subCategories = builtIn
        ? [
            ...builtIn.subCategories.map((s) => sub(s.name, false, s.products)),
            ...taxonomy.subCategories
              .filter((x) => x.category === title && !builtIn.subCategories.some((s) => s.name === x.name))
              .map((x) => sub(x.name, true, [])),
          ]
        : (added?.subCategories ?? []).map((name) => sub(name, true, []));
      return {
        title,
        label: labelOf(taxonomy, categoryKey(title), title),
        status: statusOf(taxonomy, categoryKey(title)),
        isNew: !builtIn,
        column,
        subCategories: applyOrder(subCategories, (s) => s.name, orderOf(taxonomy, subCategoryOrderKey(title))),
      };
    }),
  );
}

const commonFolders = (hrefs: string[], dropLast: boolean) => {
  const folders = hrefs.map((h) => {
    const parts = h.replace(/^\/products\//, "").split("/");
    return dropLast ? parts.slice(0, -1) : parts;
  });
  if (!folders.length) return [];
  const common: string[] = [];
  for (let i = 0; i < folders[0].length; i++) {
    if (folders.every((f) => f[i] === folders[0][i])) common.push(folders[0][i]);
    else break;
  }
  return common;
};

/** Web-address folder for a category: the first folder its products share, or its name. */
function categoryBasePath(category: string) {
  const c = productNavigationData.flat().find((x) => x.title === category);
  const hrefs = (c?.subCategories ?? []).flatMap((s) => s.products.map((p) => p.href));
  const shared = commonFolders(hrefs, true).slice(0, 1);
  return shared.length ? shared[0] : slugify(category);
}

/**
 * Web-address folder for new products in a sub-category: the folder its existing products
 * share (e.g. "knife-edge-gate-valve/uni-directional"), else "<category folder>/<sub-category>".
 */
export function subCategoryBasePath(category: string, subCategory: string) {
  const sub = productNavigationData.flat().find((c) => c.title === category)?.subCategories.find((s) => s.name === subCategory);
  if (sub?.products.length) {
    const shared = commonFolders(sub.products.map((p) => p.href), true);
    if (shared.length) return shared.join("/");
    return slugify(category);
  }
  return `${categoryBasePath(category)}/${slugify(subCategory)}`;
}

export function suggestProductSlug(category: string, subCategory: string, name: string) {
  const leaf = slugify(name);
  return leaf ? `${subCategoryBasePath(category, subCategory)}/${leaf}` : "";
}
