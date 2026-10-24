import { getProductContent } from "@/lib/product-content";
import { content } from "./content";
import ProductView from "./view";

// The data is editable from the admin dashboard (saving there refreshes this page immediately).
export const revalidate = 60;

export default async function SmallBoreForgedLiftCheckValvePage() {
  return <ProductView content={await getProductContent("ibr-valves/small-bore-forged-lift-check-valve", content)} />;
}
