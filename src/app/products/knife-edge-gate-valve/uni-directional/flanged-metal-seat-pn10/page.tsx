import { getProductContent } from "@/lib/product-content";
import { content } from "./content";
import ProductView from "./view";

// The data is editable from the admin dashboard (saving there refreshes this page immediately).
export const revalidate = 60;

export default async function FlangedMetalSeatKnifeEdgeGateValvePage() {
  return <ProductView content={await getProductContent("knife-edge-gate-valve/uni-directional/flanged-metal-seat-pn10", content)} />;
}
