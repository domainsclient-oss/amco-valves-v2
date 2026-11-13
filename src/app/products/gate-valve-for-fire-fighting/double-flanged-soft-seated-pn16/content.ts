import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "Gate valve for fire fighting",
  title: "Double Flanged Soft seated Gate Valve",
  specs: [
    { label: "Size", subLabel: "", value: "DN50 - DN400" },
    { label: "Material of construction", subLabel: "(Bill of material)", value: "DI" },
    { label: "Seat", subLabel: "", value: "PTFE" },
    { label: "End connection", subLabel: "", value: "Flanged ANSI 150#" },
    { label: "Pressure rating", subLabel: "", value: "PN16" },
    { label: "Mode of operation", subLabel: "", value: "Bare shaft, Wheel, Gear box, Actuator" },
    { label: "Manufacturing Standard", subLabel: "", value: "API 600" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/products/fire-fightingdouble-flanged-soft-seated-pn16-1.jpg", alt: "Fire Fighting Gate Valve View 1" },
    { src: "/products/fire-fightingdouble-flanged-soft-seated-pn16-2.jpg", alt: "Fire Fighting Gate Valve View 2" },
  ],
  tables: [
    {
      title: "DI GATE VALVE FOR FIRE FIGHTING FLANGED END 150#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD"],
      rows: [
        { cells: ["DN50", "178", "150", "19 X 4", "120.7"], kind: "" },
        { cells: ["DN65", "190", "180", "19 X 4", "139.7"], kind: "" },
        { cells: ["DN80", "203", "190", "19 X 4", "152.4"], kind: "" },
        { cells: ["DN100", "229", "230", "19 X 8", "190.5"], kind: "" },
        { cells: ["DN125", "254", "255", "22.2 X 8", "215.9"], kind: "" },
        { cells: ["DN150", "267", "280", "22.2 X 8", "241.3"], kind: "" },
        { cells: ["DN200", "292", "345", "22.2 X 8", "298.5"], kind: "" },
        { cells: ["DN250", "330", "405", "25.4 X 12", "362"], kind: "" },
        { cells: ["DN300", "356", "485", "25.4 X 12", "431.8"], kind: "" },
        { cells: ["DN350", "381", "535", "29 X 12", "476.3"], kind: "" },
        { cells: ["DN400", "406", "595", "29 X 16", "539.8"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "Fire Fighting Gate Valve – Double Flanged Soft Seat PN16 | AMCO",
    description:
      "AMCO fire fighting gate valve in double flanged, soft seated, PN16 configuration for fire protection water piping. Check specifications and request a technical.",
    keywords: "double flanged soft seated fire fighting gate valve",
    image: "",
  },
};
