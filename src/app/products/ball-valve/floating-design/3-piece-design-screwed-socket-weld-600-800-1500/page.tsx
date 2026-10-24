import { getProductContent } from "@/lib/product-content";
import { content } from "./content";
import ProductView from "./view";

// The data is editable from the admin dashboard (saving there refreshes this page immediately).
export const revalidate = 60;

export default async function ThreePieceHighPressureBallValvePage() {
  return <ProductView content={await getProductContent("ball-valve/floating-design/3-piece-design-screwed-socket-weld-600-800-1500", content)} />;
}
