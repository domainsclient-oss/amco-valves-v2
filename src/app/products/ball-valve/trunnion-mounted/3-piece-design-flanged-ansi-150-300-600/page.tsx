import { getProductContent } from "@/lib/product-content";
import { content } from "./content";
import ProductView from "./view";

// The data is editable from the admin dashboard (saving there refreshes this page immediately).
export const revalidate = 60;

export default async function Trunnion3PiecePage() {
  return <ProductView content={await getProductContent("ball-valve/trunnion-mounted/3-piece-design-flanged-ansi-150-300-600", content)} />;
}
