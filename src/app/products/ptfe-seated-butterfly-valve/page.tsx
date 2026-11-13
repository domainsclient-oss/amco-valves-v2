import { ProductFamilyPage, productFamilyMetadata } from "@/components/products/ProductFamilyPage";

// Parent page listing this family's products; product edits in the admin refresh it within a minute.
export const revalidate = 60;

export const generateMetadata = () => productFamilyMetadata("ptfe-seated-butterfly-valve");

export default function Page() {
  return <ProductFamilyPage slug="ptfe-seated-butterfly-valve" />;
}
