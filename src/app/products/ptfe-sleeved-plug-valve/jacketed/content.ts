import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "PTFE Sleeved Plug Valve",
  title: "Jacketed",
  specs: [
    { label: "Size", subLabel: "", value: "DN15 - DN300" },
    { label: "Material of construction", subLabel: "", value: "CS / SS / Alloy steel / Duplex SS / Inconel" },
    { label: "Sleeve", subLabel: "", value: "PTFE" },
    { label: "End connection", subLabel: "", value: "Flanged" },
    { label: "Pressure rating", subLabel: "", value: "150# / 300#" },
    { label: "Mode of operation", subLabel: "", value: "Lever, Gear, Actuator" },
    { label: "Manufacturing Standard", subLabel: "", value: "API 599" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/dummy-image.png", alt: "Jacketed Plug Valve" },
  ],
  tables: [
    {
      title: "SLEEVED JACKETED PLUG VALVE FLANGED END 150#",
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
        { cells: ["DN250", "330", "405", "Ø 25.4 X 12", "362"], kind: "" },
        { cells: ["DN300", "356", "485", "Ø 25.4 X 12", "431.8"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "SLEEVED JACKETED PLUG VALVE FLANGED END 300#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD"],
      rows: [
        { cells: ["DN15", "140", "95", "Ø 16 X 4", "66.7"], kind: "" },
        { cells: ["DN20", "152", "115", "Ø 19 X 4", "82.6"], kind: "" },
        { cells: ["DN25", "165", "125", "Ø 19 X 4", "88.9"], kind: "" },
        { cells: ["DN32", "178", "135", "Ø 19 X 4", "98.4"], kind: "" },
        { cells: ["DN40", "190", "155", "Ø 22.2 X 4", "114.3"], kind: "" },
        { cells: ["DN50", "216", "165", "Ø 19 X 8", "127"], kind: "" },
        { cells: ["DN65", "241", "190", "Ø 22.2 X 8", "149.2"], kind: "" },
        { cells: ["DN80", "282", "210", "Ø 22.2 X 8", "168.3"], kind: "" },
        { cells: ["DN100", "305", "255", "Ø 22.2 X 8", "200"], kind: "" },
        { cells: ["DN125", "381", "280", "Ø 22.2 X 8", "235"], kind: "" },
        { cells: ["DN150", "403", "320", "Ø 22.2 X 12", "269.9"], kind: "" },
        { cells: ["DN200", "419", "380", "Ø 25.4 X 12", "330.2"], kind: "" },
        { cells: ["DN250", "457", "445", "Ø 29 X 16", "387.4"], kind: "" },
        { cells: ["DN300", "502", "520", "Ø 32 X 16", "450.8"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "PTFE Sleeved Plug Valve – Jacketed | AMCO",
    description:
      "AMCO ptfe sleeved plug valve in jacketed configuration for industrial flow isolation. Check specifications and request a technical quote.",
    keywords: "jacketed ptfe sleeved plug valve",
    image: "",
  },
};
