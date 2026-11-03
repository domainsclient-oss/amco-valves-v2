import { getProductContent, productMetadata } from "@/lib/product-content";
import { content } from "./content";
import ProductView from "./view";

// The data is editable from the admin dashboard (saving there refreshes this page immediately).
export const revalidate = 60;

// Title, description, keywords and share image from the admin (SEO tab).
export const generateMetadata = () => productMetadata("ball-valve/trunnion-mounted/2-piece-design-flanged-ansi-150-300-600", content);

export default async function Trunnion2PiecePage() {
  return <ProductView content={await getProductContent("ball-valve/trunnion-mounted/2-piece-design-flanged-ansi-150-300-600", content)} />;
}
