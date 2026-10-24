import { getProductContent } from "@/lib/product-content";
import { content } from "./content";
import ProductView from "./view";

// The data is editable from the admin dashboard (saving there refreshes this page immediately).
export const revalidate = 60;

export default async function FlangedDamperValvePage() {
  return <ProductView content={await getProductContent("damper-valve/flanged-type-seatless-design", content)} />;
}
