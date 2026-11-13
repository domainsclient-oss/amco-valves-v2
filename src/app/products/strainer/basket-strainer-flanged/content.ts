import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "Strainer",
  title: "Basket Strainer - Flanged",
  specs: [
    { label: "Size", subLabel: "", value: "DN50 - DN600" },
    { label: "Material of construction", subLabel: "(Bill of material)", value: "CS / SS / DUPLEX / SUPER DUPLEX / ALUMINIUM BRONZE" },
    { label: "Mesh", subLabel: "", value: "All sizes available" },
    { label: "End connection", subLabel: "", value: "Flanged ANSI 150# / 300# / 600#" },
    { label: "Pressure rating", subLabel: "", value: "150# / 300# / 600#" },
    { label: "Mode of operation", subLabel: "", value: "" },
    { label: "Manufacturing Standard", subLabel: "", value: "ASME B16.34" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/products/basket-strainer-flanged-1.jpg", alt: "Basket Strainer View 1" },
    { src: "/products/basket-strainer-flanged-2.jpg", alt: "Basket Strainer View 2" },
    { src: "/products/basket-strainer-flanged-3.jpg", alt: "Basket Strainer View 3" },
    { src: "/products/basket-strainer-flanged-4.jpg", alt: "Basket Strainer View 4" },
    { src: "/products/basket-strainer-flanged-5.jpg", alt: "Basket Strainer View 5" },
    { src: "/products/basket-strainer-flanged-6.jpg", alt: "Basket Strainer View 6" },
  ],
  tables: [],
  seo: {
    title: "Basket Strainer – Flanged | AMCO",
    description:
      "AMCO basket strainer in flanged configuration for pipeline debris removal and equipment protection. Check specifications and request a technical quote.",
    keywords: "flanged basket strainer",
    image: "",
  },
};
