import { getProductContent, productMetadata } from "@/lib/product-content";
import { content } from "./content";
import ProductView from "./view";

// The data is editable from the admin dashboard (saving there refreshes this page immediately).
export const revalidate = 60;

// Title, description, keywords and share image from the admin (SEO tab).
export const generateMetadata = () => productMetadata("knife-edge-gate-valve/uni-directional/wafer-lugged-metal-seat-pn10", content);

export default async function MetalSeatKnifeEdgeGateValvePage() {
  return <ProductView content={await getProductContent("knife-edge-gate-valve/uni-directional/wafer-lugged-metal-seat-pn10", content)} />;
}
