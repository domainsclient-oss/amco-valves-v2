import { getProductContent, productMetadata } from "@/lib/product-content";
import { content } from "./content";
import ProductView from "./view";

// The data is editable from the admin dashboard (saving there refreshes this page immediately).
export const revalidate = 60;

// Title, description, keywords and share image from the admin (SEO tab).
export const generateMetadata = () => productMetadata("strainer/y-strainer-screwed", content);

export default async function YStrainerScrewedPage() {
  return <ProductView content={await getProductContent("strainer/y-strainer-screwed", content)} />;
}
