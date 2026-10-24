import { getProductContent } from "@/lib/product-content";
import { content } from "./content";
import ProductView from "./view";

// The data is editable from the admin dashboard (saving there refreshes this page immediately).
export const revalidate = 60;

export default async function BiDirectionalWaferLuggedResilientSeatPage() {
  return <ProductView content={await getProductContent("knife-edge-gate-valve/bi-directional/wafer-lugged-resilient-seat-pn10", content)} />;
}
