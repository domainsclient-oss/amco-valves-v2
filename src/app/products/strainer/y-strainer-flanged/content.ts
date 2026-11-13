import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "Strainer",
  title: "Y Strainer - Flanged",
  specs: [
    { label: "Size", subLabel: "", value: "DN25 - DN400" },
    { label: "Material of construction", subLabel: "(Bill of material)", value: "CI / DI / CS / SS / WCB / CF8 / CF8M / CF3 / CF3M / DUPLEX / SUPER DUPLEX / ALUMINIUM BRONZE" },
    { label: "Mesh", subLabel: "", value: "All sizes available" },
    { label: "End connection", subLabel: "", value: "Flanged to ANSI 150# / 300#" },
    { label: "Pressure rating", subLabel: "", value: "PN10 / PN16 / 150# / 300#" },
    { label: "Manufacturing Standard", subLabel: "", value: "ASME B16.34" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/products/y-strainer-flanged-1.jpg", alt: "Y Strainer Flanged View 1" },
    { src: "/products/y-strainer-flanged-2.jpg", alt: "Y Strainer Flanged View 2" },
    { src: "/products/y-strainer-flanged-3.png", alt: "Y Strainer Flanged View 3" },
  ],
  tables: [
    {
      title: "",
      groups: [
        { label: "Y STRAINER FLANGED END 150#", span: 4 },
        { label: "Y STRAINER FLANGED END 300#", span: 4 },
      ],
      headers: ["SIZE", "Face To Face (FL)", "Outer Dia", "Hole Dia x No. Holes", "PCD", "Face To Face (FL)", "Outer Dia", "Hole Dia x No. Holes", "PCD"],
      rows: [
        { cells: ["DN25", "127", "110", "16 X 4", "79.4", "203", "125", "19 X 4", "88.9"], kind: "" },
        { cells: ["DN40", "165", "125", "16 X 4", "98.4", "229", "155", "22.2 X 4", "114.3"], kind: "" },
        { cells: ["DN50", "203", "150", "19 X 4", "120.7", "267", "165", "19 X 8", "127"], kind: "" },
        { cells: ["DN65", "216", "180", "19 X 4", "139.7", "292", "190", "22.2 X 8", "149.2"], kind: "" },
        { cells: ["DN80", "241", "190", "19 X 4", "152.4", "318", "210", "22.2 X 8", "168.3"], kind: "" },
        { cells: ["DN100", "292", "230", "19 X 8", "190.5", "356", "255", "22.2 X 8", "200"], kind: "" },
        { cells: ["DN125", "356", "255", "22.2 X 8", "215.9", "400", "280", "22.2 X 8", "235"], kind: "" },
        { cells: ["DN150", "406", "280", "22.2 X 8", "241.3", "444", "320", "22.2 X 12", "269.9"], kind: "" },
        { cells: ["DN200", "495", "345", "22.2 X 8", "298.5", "559", "380", "25.4 X 12", "330.2"], kind: "" },
        { cells: ["DN250", "622", "405", "25.4 X 12", "362", "622", "445", "29 X 16", "387.4"], kind: "" },
        { cells: ["DN300", "698", "485", "25.4 X 12", "431.8", "711", "520", "32 X 16", "450.8"], kind: "" },
        { cells: ["DN350", "787", "535", "29 X 12", "476.3", "-", "585", "32 X 20", "514.4"], kind: "" },
        { cells: ["DN400", "914", "595", "29 X 16", "539.8", "-", "650", "35 X 20", "571.5"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "Y Strainer – Flanged | AMCO",
    description:
      "AMCO y strainer in flanged configuration for pipeline debris removal and equipment protection. Check specifications and request a technical quote.",
    keywords: "flanged y strainer",
    image: "",
  },
};
