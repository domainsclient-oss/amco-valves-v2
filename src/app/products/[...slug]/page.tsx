import { getProductTaxonomy, getPublishedCustomProduct, isProductVisible } from "@/lib/custom-products";
import { GenericProductView } from "@/components/products/GenericProductView";
import { RegistryProductPage } from "./registry-page";
import { seoMetadata } from "@/lib/seo";

// Products added from the admin dashboard; saving or publishing there refreshes this immediately.
export const revalidate = 60;

// Title, description, keywords and share image from the admin (SEO tab).
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const custom = await getPublishedCustomProduct(slug.join("/"));
  return seoMetadata(custom?.content.seo);
}

export default async function DynamicProductDetailPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const [custom, taxonomy] = await Promise.all([getPublishedCustomProduct(slug.join("/")), getProductTaxonomy()]);
  // Products whose category or sub-category was put to draft / deleted are hidden too.
  const visible = custom && isProductVisible(taxonomy, custom.slug, custom.category, custom.subCategory);
  return visible ? <GenericProductView content={custom.content} /> : <RegistryProductPage />;
}
