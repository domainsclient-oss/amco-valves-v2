import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "Diaphragm Valve",
  title: "Unlined and Lined",
  specs: [
    { label: "Size", subLabel: "", value: "DN15 - DN150" },
    { label: "Material of construction", subLabel: "(Bill of material)", value: "CI / DI / CS / SS" },
    { label: "Lining", subLabel: "", value: "Unlined / Natural Rubber Lined / Ebonite Lined" },
    { label: "Diaphragm", subLabel: "", value: "EPDM / Neoprene" },
    { label: "End connection", subLabel: "", value: "Flanged ANSI 150#" },
    { label: "Pressure rating", subLabel: "", value: "PN16" },
    { label: "Mode of operation", subLabel: "", value: "Wheel" },
    { label: "Manufacturing Standard", subLabel: "", value: "BS 5156" },
    { label: "Testing Standard", subLabel: "", value: "API 6755 Part I" },
  ],
  images: [
    { src: "/products/diaphragm-valveunlined-and-lined-1.jpg", alt: "Diaphragm Valve View 1" },
    { src: "/products/diaphragm-valveunlined-and-lined-2.jpeg", alt: "Diaphragm Valve View 2" },
    { src: "/products/diaphragm-valveunlined-and-lined-3.jpg", alt: "Diaphragm Valve View 3" },
  ],
  tables: [
    {
      title: "DIAPHRAGM VALVE FLANGED 150#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE (UNLINED)", "FACE TO FACE (LINED)", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD"],
      rows: [
        { cells: ["DN15", "108", "114", "90", "Ø 16 X 4", "60.3"], kind: "" },
        { cells: ["DN20", "117", "123", "100", "Ø 16 X 4", "69.9"], kind: "" },
        { cells: ["DN25", "127", "133", "110", "Ø 16 X 4", "79.4"], kind: "" },
        { cells: ["DN32", "146", "152", "115", "Ø 16 X 4", "88.9"], kind: "" },
        { cells: ["DN40", "159", "165", "125", "Ø 16 X 4", "98.4"], kind: "" },
        { cells: ["DN50", "190", "196", "150", "Ø 19 X 4", "120.7"], kind: "" },
        { cells: ["DN65", "216", "222", "180", "Ø 19 X 4", "139.7"], kind: "" },
        { cells: ["DN80", "254", "260", "190", "Ø 19 X 4", "152.4"], kind: "" },
        { cells: ["DN100", "305", "313", "230", "Ø 19 X 8", "190.5"], kind: "" },
        { cells: ["DN125", "356", "364", "255", "Ø 22.2 X 8", "215.9"], kind: "" },
        { cells: ["DN150", "406", "414", "280", "Ø 22.2 X 8", "241.3"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "Diaphragm Valve – Lined/Unlined | AMCO",
    description:
      "AMCO diaphragm valve for process-fluid isolation. Compare lining options, diaphragm and body materials; request drawings, datasheets or a quotation.",
    keywords: "diaphragm valve",
    image: "",
  },
};
