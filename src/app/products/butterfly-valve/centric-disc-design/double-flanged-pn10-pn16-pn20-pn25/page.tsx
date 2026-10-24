import { getProductContent } from "@/lib/product-content";
import { content } from "./content";
import ProductView from "./view";

// The data is editable from the admin dashboard (saving there refreshes this page immediately).
export const revalidate = 60;

export default async function DoubleFlangedButterflyValvePage() {
  return <ProductView content={await getProductContent("butterfly-valve/centric-disc-design/double-flanged-pn10-pn16-pn20-pn25", content)} />;
}
