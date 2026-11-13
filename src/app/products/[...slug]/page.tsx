import { getProductTaxonomy, getPublishedCustomProduct, isProductVisible } from "@/lib/custom-products";
import { GenericProductView } from "@/components/products/GenericProductView";
import { ProductFamilyPage, productFamilyMetadata } from "@/components/products/ProductFamilyPage";
import { RegistryProductPage } from "./registry-page";
import { getPublishedParentPage } from "@/lib/parent-pages";
import { seoMetadata } from "@/lib/seo";

// Products added from the admin dashboard; saving or publishing there refreshes this immediately.
export const revalidate = 60;

// Parent pages added from the admin (Parent Pages) are single-segment addresses, e.g. /products/my-range.
const parentPageFor = (slug: string[]) => (slug.length === 1 ? getPublishedParentPage(slug[0]) : Promise.resolve(null));

// Title, description, keywords and share image from the admin (SEO tab).
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  if (await parentPageFor(slug)) return productFamilyMetadata(slug[0]);
  const custom = await getPublishedCustomProduct(slug.join("/"));
  return seoMetadata(custom?.content.seo);
}

export default async function DynamicProductDetailPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const parent = await parentPageFor(slug);
  if (parent) return <ProductFamilyPage slug={parent.slug} page={parent} />;

  const [custom, taxonomy] = await Promise.all([getPublishedCustomProduct(slug.join("/")), getProductTaxonomy()]);
  // Products whose category or sub-category was put to draft / deleted are hidden too.
  const visible = custom && isProductVisible(taxonomy, custom.slug, custom.category, custom.subCategory);
  return visible ? <GenericProductView content={custom.content} /> : <RegistryProductPage />;
}
