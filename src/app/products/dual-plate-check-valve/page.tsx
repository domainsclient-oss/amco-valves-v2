import { ProductFamilyPage, productFamilyMetadata } from "@/components/products/ProductFamilyPage";

// Parent page listing this family's products; product edits in the admin refresh it within a minute.
export const revalidate = 60;

export const generateMetadata = () => productFamilyMetadata("dual-plate-check-valve");

export default function Page() {
  return <ProductFamilyPage slug="dual-plate-check-valve" />;
}
