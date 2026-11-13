import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "Trunnion Mounted",
  title: "2 Piece Design Flanged ANSI 150#, 300#, 600#",
  specs: [
    { label: "Size", subLabel: "", value: "DN100 - DN300" },
    { label: "Material of construction", subLabel: "", value: "WCB / CF8 / CF8M / CF3 / CF3M" },
    { label: "End connection", subLabel: "", value: "FLANGED" },
    { label: "Pressure rating", subLabel: "", value: "150# / 300# / 600#" },
    { label: "Mode of operation", subLabel: "", value: "Lever, Actuator" },
    { label: "Manufacturing Standard", subLabel: "", value: "ISO 17292 / API 6D / API 608" },
    { label: "Testing Standard", subLabel: "", value: "ISO 5208 / ISO 10497 / API 607" },
  ],
  images: [
    { src: "/products/trunnion-mounted2-piece-design-flanged-ansi-150-300-600.jpg", alt: "2 Piece Trunnion Ball Valve" },
  ],
  tables: [
    {
      title: "TRUNNION 2PC/3PC FLANGED END 150#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE (FL)", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD"],
      rows: [
        { cells: ["DN100", "229", "230", "Ø 19 X 8", "190.5"], kind: "" },
        { cells: ["DN125", "", "255", "Ø 22.2 X 8", "215.9"], kind: "" },
        { cells: ["DN150", "394", "280", "Ø 22.2 X 8", "241.3"], kind: "" },
        { cells: ["DN200", "457", "345", "Ø 22.2 X 8", "298.5"], kind: "" },
        { cells: ["DN250", "533", "405", "Ø 25.4 X 12", "362"], kind: "" },
        { cells: ["DN300", "610", "485", "Ø 25.4 X 12", "431.8"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "TRUNNION 2PC/3PC FLANGED END 300#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE (FL)", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD"],
      rows: [
        { cells: ["DN100", "305", "255", "Ø 22.2 X 8", "200"], kind: "" },
        { cells: ["DN125", "", "280", "Ø 22.2 X 8", "235"], kind: "" },
        { cells: ["DN150", "403", "320", "Ø 22.2 X 12", "269.9"], kind: "" },
        { cells: ["DN200", "502", "380", "Ø 25.4 X 12", "330.2"], kind: "" },
        { cells: ["DN250", "568", "445", "Ø 29 X 16", "387.4"], kind: "" },
        { cells: ["DN300", "648", "520", "Ø 32 X 16", "450.8"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "TRUNNION 2PC/3PC FLANGED END 600#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE (FL)", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD"],
      rows: [
        { cells: ["DN100", "432", "275", "Ø 25.4 X 8", "215.9"], kind: "" },
        { cells: ["DN125", "", "330", "Ø 29 X 8", "266.7"], kind: "" },
        { cells: ["DN150", "559", "355", "Ø 29 X 12", "292.1"], kind: "" },
        { cells: ["DN200", "660", "420", "Ø 32 X 12", "349.2"], kind: "" },
        { cells: ["DN250", "787", "510", "Ø 35 X 16", "431.8"], kind: "" },
        { cells: ["DN300", "838", "560", "Ø 35 X 20", "489"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "Trunnion Ball Valve – 2-Piece Flanged Class 150/300/600 | AMCO",
    description:
      "AMCO trunnion mounted ball valve in 2-piece, flanged, 2, ANSI/150/300/600 configuration for industrial quarter-turn isolation. Check specifications and request a.",
    keywords: "2-piece flanged trunnion mounted ball valve",
    image: "",
  },
};
