import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "High Pressure Valve",
  title: "High Pressure In-Line Check Valve",
  specs: [
    { label: "Size", subLabel: "", value: "DN06 - DN50" },
    { label: "Material of construction", subLabel: "", value: "CS / SS / Alloy steel / Duplex SS" },
    { label: "End connection", subLabel: "", value: "BSPF / NPTF" },
    { label: "Pressure rating", subLabel: "", value: "3000 PSI / 6000 PSI" },
    { label: "Manufacturing Standard", subLabel: "", value: "Manufacturer Std" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/dummy-image.png", alt: "HP In-line Check Valve" },
  ],
  tables: [
    {
      title: "HIGH PRESSURE INLINE CHECK VALVE 3000 psi / 6000 psi",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "TOTAL HEIGHT"],
      rows: [
        { cells: ["DN8", "61", "19"], kind: "" },
        { cells: ["DN10", "62", "25"], kind: "" },
        { cells: ["DN15", "76", "30"], kind: "" },
        { cells: ["DN20", "82", "36"], kind: "" },
        { cells: ["DN25", "95", "41"], kind: "" },
        { cells: ["DN40", "120", "60"], kind: "" },
        { cells: ["DN50", "125", "76"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
};
