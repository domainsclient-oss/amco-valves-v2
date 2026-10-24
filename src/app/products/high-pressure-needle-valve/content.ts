import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "High Pressure Valve",
  title: "High Pressure Needle Valve",
  specs: [
    { label: "Size", subLabel: "", value: "DN06 - DN50" },
    { label: "Material of construction", subLabel: "", value: "CS / SS / Alloy Steel / Duplex SS" },
    { label: "End connection", subLabel: "", value: "BSPF / NPTF / SW" },
    { label: "Pressure rating", subLabel: "", value: "3000 PSI / 6000 PSI" },
    { label: "Mode of operation", subLabel: "", value: "Lever" },
    { label: "Manufacturing Standard", subLabel: "", value: "Manufacturer Standard" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/products/HP_needle_valve.jpg", alt: "High Pressure Needle Valve View" },
  ],
  tables: [
    {
      title: "HIGH PRESSURE NEEDLE VALVE 3000 psi / 6000 psi",
      groups: [],
      headers: ["SIZE", "FACE TO FACE (3000 psi)", "FACE TO FACE (6000 psi)"],
      rows: [
        { cells: ["DN8", "45", "55"], kind: "" },
        { cells: ["DN10", "50", "60"], kind: "" },
        { cells: ["DN15", "55", "65"], kind: "" },
        { cells: ["DN20", "65", "75"], kind: "" },
        { cells: ["DN25", "70", "85"], kind: "" },
        { cells: ["DN32", "70", "90"], kind: "" },
        { cells: ["DN40", "75", "90"], kind: "" },
        { cells: ["DN50", "75", "-"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
};
