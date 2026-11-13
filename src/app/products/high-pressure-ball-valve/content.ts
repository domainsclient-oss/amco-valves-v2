import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "High Pressure Valve",
  title: "High Pressure Ball Valve",
  specs: [
    { label: "Size", subLabel: "", value: "DN06 - DN50" },
    { label: "Material of construction", subLabel: "", value: "CS / SS / Alloy steel / Duplex SS" },
    { label: "End connection", subLabel: "", value: "BSPF / NPTF / SW (extended nipple)" },
    { label: "Pressure rating", subLabel: "", value: "3000 PSI / 6000 PSI" },
    { label: "Mode of operation", subLabel: "", value: "Lever, Actuator" },
    { label: "Manufacturing Standard", subLabel: "", value: "ISO 17292 / API 608" },
    { label: "Testing Standard", subLabel: "", value: "ISO 5208 / API 598" },
  ],
  images: [
    { src: "/products/high-pressure-ball-valve-1.jpg", alt: "High Pressure Ball Valve View 1" },
    { src: "/products/high-pressure-ball-valve-2.jpg", alt: "High Pressure Ball Valve View 2" },
    { src: "/products/high-pressure-ball-valve-3.jpg", alt: "High Pressure Ball Valve View 3" },
    { src: "/products/high-pressure-ball-valve-4.jpg", alt: "High Pressure Ball Valve View 4" },
  ],
  tables: [
    {
      title: "HIGH PRESSURE BALL VALVE 3000 psi / 6000 psi",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "BORE", "LEVER LENGTH", "CENTER TO TOP HEIGHT"],
      rows: [
        { cells: ["DN8", "71", "6", "110", "91"], kind: "" },
        { cells: ["DN10", "73", "10", "110", "96"], kind: "" },
        { cells: ["DN15", "83", "13", "110", "100"], kind: "" },
        { cells: ["DN20", "95", "20", "180", "106"], kind: "" },
        { cells: ["DN25", "112", "25", "180", "116"], kind: "" },
        { cells: ["DN32", "110", "32", "305", "145"], kind: "" },
        { cells: ["DN40", "130", "38", "305", "155"], kind: "" },
        { cells: ["DN50", "140", "50", "305", "173"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "High Pressure Ball Valve | AMCO",
    description:
      "AMCO high pressure ball valve for high-pressure line shutoff. Compare pressure rating, port design and end connections; request drawings, datasheets or a quotation.",
    keywords: "high pressure ball valve",
    image: "",
  },
};
