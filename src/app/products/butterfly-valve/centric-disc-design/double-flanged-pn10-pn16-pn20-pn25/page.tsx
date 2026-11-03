import { getProductContent, productMetadata } from "@/lib/product-content";
import { content } from "./content";
import ProductView from "./view";

// The data is editable from the admin dashboard (saving there refreshes this page immediately).
export const revalidate = 60;

// Title, description, keywords and share image from the admin (SEO tab).
export const generateMetadata = () => productMetadata("butterfly-valve/centric-disc-design/double-flanged-pn10-pn16-pn20-pn25", content);

export default async function DoubleFlangedButterflyValvePage() {
  return <ProductView content={await getProductContent("butterfly-valve/centric-disc-design/double-flanged-pn10-pn16-pn20-pn25", content)} />;
}
