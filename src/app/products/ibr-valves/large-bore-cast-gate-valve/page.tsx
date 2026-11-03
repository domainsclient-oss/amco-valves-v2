import { getProductContent, productMetadata } from "@/lib/product-content";
import { content } from "./content";
import ProductView from "./view";

// The data is editable from the admin dashboard (saving there refreshes this page immediately).
export const revalidate = 60;

// Title, description, keywords and share image from the admin (SEO tab).
export const generateMetadata = () => productMetadata("ibr-valves/large-bore-cast-gate-valve", content);

export default async function LargeBoreCastGateValvePage() {
  return <ProductView content={await getProductContent("ibr-valves/large-bore-cast-gate-valve", content)} />;
}
