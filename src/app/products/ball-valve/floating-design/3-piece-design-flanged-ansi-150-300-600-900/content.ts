import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "Ball Valve",
  title: "3 Piece Design Flanged ANSI 150#, 300#, 600# & 900#",
  specs: [
    { label: "Size", subLabel: "", value: "DN6 - DN300" },
    { label: "Material of construction", subLabel: "", value: "A105 / F304/L / F316/L / WCB / CF8 / CF8M / CF3 / CF3M" },
    { label: "End connection", subLabel: "", value: "FLANGED / BW" },
    { label: "Pressure rating", subLabel: "", value: "150# / 300# / 600# / 900#" },
    { label: "Mode of operation", subLabel: "", value: "Lever, Actuator" },
    { label: "Manufacturing Standard", subLabel: "", value: "ISO 17292 / API 6D / API 608" },
    { label: "Testing Standard", subLabel: "", value: "ISO 5208 / ISO 10497 / API 607" },
  ],
  images: [
    { src: "/products/3-piece-design-flanged-ansi-150-300-600-900-1.jpg", alt: "3PC Flanged Ball Valve View 1" },
    { src: "/products/3-piece-design-flanged-ansi-150-300-600-900-2.jpg", alt: "3PC Flanged Ball Valve View 2" },
    { src: "/products/3-piece-design-flanged-ansi-150-300-600-900-3.jpg", alt: "3PC Flanged Ball Valve View 3" },
    { src: "/products/3-piece-design-flanged-ansi-150-300-600-900-4.jpg", alt: "3PC Flanged Ball Valve View 4" },
    { src: "/products/3-piece-design-flanged-ansi-150-300-600-900-5.jpg", alt: "3PC Flanged Ball Valve View 5" },
    { src: "/products/3-piece-design-flanged-ansi-150-300-600-900-6.jpg", alt: "3PC Flanged Ball Valve View 6" },
    { src: "/products/3-piece-design-flanged-ansi-150-300-600-900-7.jpeg", alt: "3PC Flanged Ball Valve View 7" },
    { src: "/products/3-piece-design-flanged-ansi-150-300-600-900-8.jpg", alt: "3PC Flanged Ball Valve View 8" },
  ],
  tables: [
    {
      // Side-by-side table: the title holds one heading per half, separated by "|".
      title: "3PC FLANGED END 150#|3PC FLANGED END 300#",
      groups: [],
      headers: ["SIZE", "Face To Face (FL)", "Face To Face (BW)", "Outer Dia", "Hole Dia x No. of Holes", "PCD", "SIZE", "Face To Face (FL)", "Face To Face (BW)", "Outer Dia", "Hole Dia x No. of Holes", "PCD"],
      rows: [
        { cells: ["DN15", "108", "140", "90", "Ø 16 X 4", "60.3", "DN15", "140", "140", "95", "Ø 16 X 4", "66.7"], kind: "" },
        { cells: ["DN20", "117", "152", "100", "Ø 16 X 4", "69.9", "DN20", "152", "152", "115", "Ø 19 X 4", "82.6"], kind: "" },
        { cells: ["DN25", "127", "165", "110", "Ø 16 X 4", "79.4", "DN25", "165", "165", "125", "Ø 19 X 4", "88.9"], kind: "" },
        { cells: ["DN32", "140", "178", "115", "Ø 16 X 4", "88.9", "DN32", "178", "178", "135", "Ø 19 X 4", "98.4"], kind: "" },
        { cells: ["DN40", "165", "190", "125", "Ø 16 X 4", "98.4", "DN40", "190", "190", "155", "Ø 22.2 X 4", "114.3"], kind: "" },
        { cells: ["DN50", "178", "216", "150", "Ø 19 X 4", "120.7", "DN50", "216", "216", "165", "Ø 19 X 8", "127"], kind: "" },
        { cells: ["DN65", "190", "241", "180", "Ø 19 X 4", "139.7", "DN65", "241", "241", "190", "Ø 22.2 X 8", "149.2"], kind: "" },
        { cells: ["DN80", "203", "282", "190", "Ø 19 X 4", "152.4", "DN80", "282", "282", "210", "Ø 22.2 X 8", "168.3"], kind: "" },
        { cells: ["DN100", "229", "305", "230", "Ø 19 X 8", "190.5", "DN100", "305", "305", "255", "Ø 22.2 X 8", "200"], kind: "" },
        { cells: ["DN125", "254", "-", "255", "Ø 22.2 X 8", "215.9", "DN125", "", "", "280", "Ø 22.2 X 8", "235"], kind: "" },
        { cells: ["DN150", "267", "403", "280", "Ø 22.2 X 8", "241.3", "DN150", "403", "403", "320", "Ø 22.2 X 12", "269.9"], kind: "" },
        { cells: ["DN200", "292", "419", "345", "Ø 22.2 X 8", "298.5", "DN200", "419", "419", "380", "Ø 25.4 X 12", "330.2"], kind: "" },
        { cells: ["DN250", "330", "457", "405", "Ø 25.4 X 12", "362", "DN250", "457", "457", "445", "Ø 29 X 16", "387.4"], kind: "" },
        { cells: ["DN300", "356", "502", "485", "Ø 25.4 X 12", "431.8", "DN300", "502", "502", "520", "Ø 32 X 16", "450.8"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "3PC FLANGED END 600#|3PC FLANGED END 900#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE (FL)", "FACE TO FACE (BW)", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD", "SIZE", "FACE TO FACE (FL)", "FACE TO FACE (BW)", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD"],
      rows: [
        { cells: ["DN15", "165", "165", "95", "Ø 16 X 4", "66.7", "DN15", "-", "-", "120", "Ø 22.2 X 4", "82.6"], kind: "" },
        { cells: ["DN20", "190", "190", "115", "Ø 19 X 4", "82.6", "DN20", "-", "-", "130", "Ø 22.2 X 4", "88.9"], kind: "" },
        { cells: ["DN25", "216", "216", "125", "Ø 19 X 4", "88.9", "DN25", "254", "254", "150", "Ø 25.4 X 4", "101.6"], kind: "" },
        { cells: ["DN32", "229", "229", "135", "Ø 19 X 4", "98.4", "DN32", "279", "279", "160", "Ø 25.4 X 4", "111.1"], kind: "" },
        { cells: ["DN40", "241", "241", "155", "Ø 22.2 X 4", "114.3", "DN40", "305", "305", "180", "Ø 29 X 4", "123.8"], kind: "" },
        { cells: ["DN50", "292", "292", "165", "Ø 19 X 8", "127.0", "DN50", "368", "368", "215", "Ø 25.4 X 8", "165.1"], kind: "" },
        { cells: ["DN65", "330", "330", "190", "Ø 22.2 X 8", "149.2", "DN65", "419", "419", "245", "Ø 29 X 8", "190.5"], kind: "" },
        { cells: ["DN80", "356", "356", "210", "Ø 22.2 X 8", "168.3", "DN80", "381", "381", "240", "Ø 25.4 X 8", "190.5"], kind: "" },
        { cells: ["DN100", "432", "432", "275", "Ø 25.4 X 8", "215.9", "DN100", "457", "457", "290", "Ø 32 X 8", "235"], kind: "" },
        { cells: ["DN125", "", "", "330", "Ø 29 X 8", "266.7", "DN125", "", "", "350", "Ø 35 X 8", "279.4"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "Floating Ball Valve – 3-Piece Flanged Class 150/300/600/900 | AMCO",
    description:
      "AMCO floating ball valve in 3-piece, floating, flanged, 3, ANSI/150/300/600/900 configuration for industrial quarter-turn isolation. Check specifications and.",
    keywords: "3-piece floating floating ball valve",
    image: "",
  },
};
