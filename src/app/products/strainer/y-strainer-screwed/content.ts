import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "Strainer",
  title: "Y Strainer - Screwed",
  specs: [
    { label: "Size", subLabel: "", value: "DN15 - DN50" },
    { label: "Material of construction", subLabel: "(Bill of material)", value: "CF8 / CF8M / CF3 / CF3M / DUPLEX / SUPER DUPLEX / ALLOY STEEL" },
    { label: "Mesh", subLabel: "", value: "All sizes available" },
    { label: "End connection", subLabel: "", value: "Screwed" },
    { label: "Pressure rating", subLabel: "", value: "PN40" },
    { label: "Manufacturing Standard", subLabel: "", value: "ASME B16.34" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/products/y-strainer-screwed-1.jpeg", alt: "Y Strainer Screwed View 1" },
    { src: "/products/y-strainer-screwed-2.jpeg", alt: "Y Strainer Screwed View 2" },
  ],
  tables: [
    {
      title: "Y STRAINER SCREWED PN40",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "BORE", "HEIGHT"],
      rows: [
        { cells: ["DN15", "61", "15", "37"], kind: "" },
        { cells: ["DN20", "70", "20", "41"], kind: "" },
        { cells: ["DN25", "86", "25", "47"], kind: "" },
        { cells: ["DN32", "100", "32", "54"], kind: "" },
        { cells: ["DN40", "111", "38", "62"], kind: "" },
        { cells: ["DN50", "138", "51", "76"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "Y Strainer – Screwed | AMCO",
    description:
      "AMCO y strainer in screwed configuration for pipeline debris removal and equipment protection. Check specifications and request a technical quote.",
    keywords: "screwed y strainer",
    image: "",
  },
};
