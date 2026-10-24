import { getProductContent } from "@/lib/product-content";
import { content } from "./content";
import ProductView from "./view";

// The data is editable from the admin dashboard (saving there refreshes this page immediately).
export const revalidate = 60;

export default async function BiDirectionalFlangedTwoPiecePage() {
  return <ProductView content={await getProductContent("knife-edge-gate-valve/bi-directional/flanged-resilient-seat-pn10-two-piece-design", content)} />;
}
