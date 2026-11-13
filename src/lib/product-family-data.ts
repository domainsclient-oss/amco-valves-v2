import { getRestDoc } from "@/lib/firestore-rest";
import { HOME_CONTENT_COLLECTION } from "@/lib/home-content";
import { productContentDocId, resolveProductContent, type ProductContent } from "@/lib/product-content";
import { builtInProductDefaults } from "@/lib/product-content-defaults";
import { productNavigationData } from "@/lib/navigation-data";
import {
  builtInLocation,
  categoryKey,
  getProductTaxonomy,
  isProductVisible,
  labelOf,
  statusOf,
  subCategoryKey,
} from "@/lib/product-taxonomy";
import { getPublishedCustomProducts } from "@/lib/custom-products";
import type { ProductFamily } from "@/lib/product-families";

/** A product card on a parent page. */
export interface FamilyCard {
  slug: string;
  href: string;
  title: string;
  group: string;
  attrs: Record<string, string>;
  size: string;
  material: string;
  image: { src: string; alt: string } | null;
}

const spec = (content: ProductContent, label: string) =>
  content.specs.find((s) => s.label.trim().toLowerCase() === label)?.value.trim() ?? "";

function toCard(slug: string, content: ProductContent, group: string, attrs: Record<string, string>): FamilyCard {
  const image = content.images[0];
  return {
    slug,
    href: `/products/${slug}`,
    title: content.title,
    group,
    attrs,
    size: spec(content, "size"),
    material: spec(content, "material of construction"),
    image: image ? { src: image.src, alt: image.alt || content.title } : null,
  };
}

/**
 * Cards for a parent page: the products of its menu category (built-in and added from the
 * admin), in the page's saved order, then any others in menu order. Products hidden on the
 * page, put to draft or deleted are left out. Returns null when the category itself is hidden.
 */
export async function getFamilyCards(family: ProductFamily): Promise<FamilyCard[] | null> {
  const [taxonomy, customs] = await Promise.all([getProductTaxonomy(), getPublishedCustomProducts()]);
  if (family.category && statusOf(taxonomy, categoryKey(family.category))) return null;

  const builtInSlugs = (productNavigationData.flat().find((c) => c.title === family.category)?.subCategories ?? []).flatMap((s) =>
    s.products.map((p) => p.href.replace(/^\/products\//, "")),
  );
  const customInCategory = customs.filter((p) => p.category === family.category);
  const config = new Map(family.children.map((c) => [c.slug, c]));
  const ordered = [...new Set([...family.children.map((c) => c.slug), ...builtInSlugs, ...customInCategory.map((p) => p.slug)])];

  const cards = await Promise.all(
    ordered.map(async (slug) => {
      const child = config.get(slug);
      if (child?.hidden) return null;

      const custom = customs.find((p) => p.slug === slug);
      if (custom) {
        if (!isProductVisible(taxonomy, custom.slug, custom.category, custom.subCategory)) return null;
        const group = child?.group || labelOf(taxonomy, subCategoryKey(custom.category, custom.subCategory), custom.subCategory);
        return toCard(slug, custom.content, group, child?.attrs ?? {});
      }

      const defaults = builtInProductDefaults[slug];
      if (!defaults) return null;
      const location = builtInLocation(slug);
      if (location && !isProductVisible(taxonomy, slug, location.category, location.subCategory)) return null;
      const doc = await getRestDoc(`${HOME_CONTENT_COLLECTION}/${productContentDocId(slug)}`, {
        revalidate: 60,
        tags: [`product:${slug}`],
      });
      const content = doc ? resolveProductContent(defaults, doc.data) : defaults;
      const group = child?.group || (location ? labelOf(taxonomy, subCategoryKey(location.category, location.subCategory), location.subCategory) : "");
      return toCard(slug, content, group, child?.attrs ?? {});
    }),
  );

  return cards.filter((c): c is FamilyCard => c !== null);
}
