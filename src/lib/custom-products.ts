import { queryRestDocs } from "@/lib/firestore-rest";
import { productNavigationData, type MegaMenuCategory } from "@/lib/navigation-data";
import { resolveProductContent, type ProductContent } from "@/lib/product-content";
import {
  applyOrder,
  categoryColumns,
  categoryKey,
  emptyTaxonomy,
  labelOf,
  orderOf,
  productKey,
  productOrderKey,
  statusOf,
  subCategoryKey,
  subCategoryOrderKey,
  taxonomyAffectsSite,
  type ProductTaxonomy,
} from "@/lib/product-taxonomy";

// Classification helpers live in product-taxonomy.ts; re-exported for existing imports.
export * from "@/lib/product-taxonomy";

/**
 * Products added from the admin dashboard (in addition to the built-in pages
 * under src/app/products). Each is stored in the `customProducts` collection,
 * classified by the menu's category and sub-category, and rendered by the
 * catch-all route src/app/products/[...slug] with the standard product layout.
 */

export const CUSTOM_PRODUCTS_COLLECTION = "customProducts";
/** Same cache tag as the classification, so one refresh updates the menu. */
export const CUSTOM_PRODUCTS_TAG = "custom-products";

export interface CustomProduct {
  id: string;
  /** Web address under /products/, e.g. "knife-edge-gate-valve/uni-directional/my-new-valve". */
  slug: string;
  /** Menu category title, e.g. "Knife Edge Gate Valve". */
  category: string;
  /** Menu sub-category name, e.g. "Uni Directional". */
  subCategory: string;
  /** Name shown in the site menu. */
  menuName: string;
  content: ProductContent;
  status: "draft" | "published";
}

export function customProductDocId(slug: string) {
  return slug.replace(/\//g, "__");
}

/** A blank product page, used when a new product doesn't copy an existing one. */
export function emptyProductContent(category: string, title: string): ProductContent {
  return {
    category,
    title,
    specs: [
      { label: "Size", subLabel: "", value: "" },
      { label: "Material of construction", subLabel: "", value: "" },
      { label: "End connection", subLabel: "", value: "" },
      { label: "Pressure rating", subLabel: "", value: "" },
      { label: "Mode of operation", subLabel: "", value: "" },
      { label: "Manufacturing Standard", subLabel: "", value: "" },
      { label: "Testing Standard", subLabel: "", value: "" },
    ],
    images: [{ src: "/dummy-image.png", alt: title }],
    tables: [],
  };
}

type Raw = Record<string, unknown>;
const str = (value: unknown) => (typeof value === "string" ? value : "");

export function toCustomProduct(id: string, data: Raw): CustomProduct {
  const category = str(data.category);
  const menuName = str(data.menuName);
  return {
    id,
    slug: str(data.slug),
    category,
    subCategory: str(data.subCategory),
    menuName,
    content: resolveProductContent(emptyProductContent(category, menuName), data.content),
    status: data.status === "published" ? "published" : "draft",
  };
}

/**
 * The site menu as visitors see it: published custom products added to their sub-category,
 * saved names and order applied, and anything put to draft / deleted in the admin left out.
 * Categories stay in their menu column (new ones go to the last column), and headings left
 * without products are dropped, so the menu never shows empty headings. Without any of these
 * changes the built-in menu is returned unchanged.
 */
export function mergeProductNavigation(
  customs: Pick<CustomProduct, "slug" | "category" | "subCategory" | "menuName">[],
  taxonomy: ProductTaxonomy = emptyTaxonomy,
  /** Category title → parent page link (from the admin Parent Pages); without it the built-in links are used. */
  parentLinks?: Map<string, string>,
): MegaMenuCategory[][] {
  if (!customs.length && !taxonomyAffectsSite(taxonomy) && !parentLinks) return productNavigationData;

  const builtInCategories = productNavigationData.flat();
  const hidden = (key: string) => !!statusOf(taxonomy, key);
  const slugOf = (href: string) => href.replace(/^\/products\//, "");

  const menuCategory = (title: string): MegaMenuCategory | null => {
    if (hidden(categoryKey(title))) return null;
    const builtIn = builtInCategories.find((c) => c.title === title);
    const subNames = builtIn
      ? [
          ...builtIn.subCategories.map((s) => s.name),
          ...taxonomy.subCategories.filter((x) => x.category === title && !builtIn.subCategories.some((s) => s.name === x.name)).map((x) => x.name),
        ]
      : taxonomy.categories.find((c) => c.title === title)?.subCategories ?? [];

    const subCategories = applyOrder(subNames, (n) => n, orderOf(taxonomy, subCategoryOrderKey(title)))
      .filter((name) => !hidden(subCategoryKey(title, name)))
      .map((name) => {
        const builtInProducts = (builtIn?.subCategories.find((s) => s.name === name)?.products ?? [])
          .filter((p) => !hidden(productKey(slugOf(p.href))))
          .map((p) => ({ name: labelOf(taxonomy, productKey(slugOf(p.href)), p.name), href: p.href }));
        const customProducts = customs
          .filter((c) => c.category === title && c.subCategory === name)
          .map((c) => ({ name: c.menuName, href: `/products/${c.slug}` }));
        return {
          name: labelOf(taxonomy, subCategoryKey(title, name), name),
          products: applyOrder([...builtInProducts, ...customProducts], (p) => slugOf(p.href), orderOf(taxonomy, productOrderKey(title, name))),
        };
      })
      .filter((s) => s.products.length);

    const href = parentLinks ? parentLinks.get(title) : builtIn?.href;
    return subCategories.length
      ? { title: labelOf(taxonomy, categoryKey(title), title), ...(href && { href }), subCategories }
      : null;
  };

  return categoryColumns(taxonomy).map((titles) => titles.map(menuCategory).filter((c): c is MegaMenuCategory => c !== null));
}

const cacheOptions = { revalidate: 60, tags: [CUSTOM_PRODUCTS_TAG] };

/** Published custom products. Returns [] if anything goes wrong. */
export async function getPublishedCustomProducts(): Promise<CustomProduct[]> {
  const docs = await queryRestDocs(CUSTOM_PRODUCTS_COLLECTION, { status: "published" }, cacheOptions);
  return docs.map((d) => toCustomProduct(d.id, d.data)).filter((p) => p.slug);
}

export async function getPublishedCustomProduct(slug: string): Promise<CustomProduct | null> {
  const docs = await queryRestDocs(CUSTOM_PRODUCTS_COLLECTION, { slug, status: "published" }, cacheOptions);
  return docs.length ? toCustomProduct(docs[0].id, docs[0].data) : null;
}
