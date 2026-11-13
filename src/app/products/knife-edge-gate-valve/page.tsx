import { ProductFamilyPage, productFamilyMetadata } from "@/components/products/ProductFamilyPage";

// Parent page listing this family's products; product edits in the admin refresh it within a minute.
export const revalidate = 60;

export const generateMetadata = () => productFamilyMetadata("knife-edge-gate-valve");

export default function Page() {
  return <ProductFamilyPage slug="knife-edge-gate-valve" />;
}
