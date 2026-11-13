import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "FEP & PFA Lined Valves",
  title: "Plug Valve PFA/FEP Lined",
  specs: [
    { label: "Size", subLabel: "", value: "DN15 - DN200" },
    { label: "Material of construction", subLabel: "", value: "WCB / CF8 / CF8M" },
    { label: "Lining", subLabel: "", value: "PFA / FEP" },
    { label: "End connection", subLabel: "", value: "Flanged" },
    { label: "Pressure rating", subLabel: "", value: "150#" },
    { label: "Mode of operation", subLabel: "", value: "Lever, Gear, Actuator" },
    { label: "Manufacturing Standard", subLabel: "", value: "API 599" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/dummy-image.png", alt: "Lined Plug Valve" },
  ],
  tables: [
    {
      title: "LINED PLUG VALVE FLANGED END 150#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD"],
      rows: [
        { cells: ["DN15", "108", "90", "Ø 16 X 4", "60.3"], kind: "" },
        { cells: ["DN20", "117", "100", "Ø 16 X 4", "69.9"], kind: "" },
        { cells: ["DN25", "127", "110", "Ø 16 X 4", "79.4"], kind: "" },
        { cells: ["DN32", "140", "115", "Ø 16 X 4", "88.9"], kind: "" },
        { cells: ["DN40", "165", "125", "Ø 16 X 4", "98.4"], kind: "" },
        { cells: ["DN50", "178", "150", "Ø 19 X 4", "120.7"], kind: "" },
        { cells: ["DN65", "190", "180", "Ø 19 X 4", "139.7"], kind: "" },
        { cells: ["DN80", "203", "190", "Ø 19 X 4", "152.4"], kind: "" },
        { cells: ["DN100", "229", "230", "Ø 19 X 8", "190.5"], kind: "" },
        { cells: ["DN125", "254", "255", "Ø 22.2 X 8", "215.9"], kind: "" },
        { cells: ["DN150", "267", "280", "Ø 22.2 X 8", "241.3"], kind: "" },
        { cells: ["DN200", "292", "345", "Ø 22.2 X 8", "298.5"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "PFA/FEP Lined Plug Valve – PFA/FEP Lined | AMCO",
    description:
      "AMCO pfa/fep lined plug valve for corrosive-process flow isolation. Compare lining and jacket configuration; request drawings, datasheets or a quotation.",
    keywords: "pfa/fep lined plug valve",
    image: "",
  },
};
