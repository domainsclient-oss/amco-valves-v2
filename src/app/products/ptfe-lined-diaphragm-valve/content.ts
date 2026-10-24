import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "PFA / FEP Lined",
  title: "PTFE Lined Diaphragm Valve",
  specs: [
    { label: "Size", subLabel: "", value: "DN25 - DN100" },
    { label: "Material of construction", subLabel: "", value: "DI / CS / SS" },
    { label: "Lining", subLabel: "", value: "PFA / FEP" },
    { label: "End connection", subLabel: "", value: "Flanged 150#" },
    { label: "Pressure rating", subLabel: "", value: "PN10" },
    { label: "Mode of operation", subLabel: "", value: "Wheel" },
    { label: "Manufacturing Standard", subLabel: "", value: "BS EN 13397:2002" },
    { label: "Testing Standard", subLabel: "", value: "BS EN 12266" },
  ],
  images: [
    { src: "/dummy-image.png", alt: "PTFE Lined Diaphragm Valve" },
  ],
  tables: [
    {
      title: "PTFE LINED DIAPHRAGM VALVE FLANGED END 150#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD"],
      rows: [
        { cells: ["DN25", "127", "90", "Ø 16 X 4", "60.3"], kind: "" },
        { cells: ["DN32", "145", "115", "Ø 16 X 4", "88.9"], kind: "" },
        { cells: ["DN40", "158", "125", "Ø 16 X 4", "98.4"], kind: "" },
        { cells: ["DN50", "188", "150", "Ø 19 X 4", "120.7"], kind: "" },
        { cells: ["DN65", "220", "180", "Ø 19 X 4", "139.7"], kind: "" },
        { cells: ["DN80", "254", "190", "Ø 19 X 4", "152.4"], kind: "" },
        { cells: ["DN100", "304", "230", "Ø 19 X 8", "190.5"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
};
