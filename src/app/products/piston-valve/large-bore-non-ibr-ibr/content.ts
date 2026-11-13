import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "Piston Valve",
  title: "Large Bore Non IBR & IBR Piston Valve",
  specs: [
    { label: "Size", subLabel: "", value: "DN25 - DN200" },
    { label: "Material of construction", subLabel: "(Bill of material)", value: "WCB / CF8 / CF8M / CF3 / CF3M" },
    { label: "End connection", subLabel: "", value: "Flanged ANSI 150# / 300#" },
    { label: "Pressure rating", subLabel: "", value: "150# / 300#" },
    { label: "Mode of operation", subLabel: "", value: "Wheel" },
    { label: "Manufacturing Standard", subLabel: "", value: "API 602" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/products/large-bore-non-ibr-ibr.jpg", alt: "Large Bore Piston Valve" },
  ],
  tables: [
    {
      title: "PISTON VALVE FLANGED 150#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD", "CENTER TO TOP (OPEN)", "CENTER TO TOP (CLOSE)", "WHEEL DIA"],
      rows: [
        { cells: ["DN25", "127", "110", "Ø 16 X 4", "79.4", "176", "142", "116"], kind: "" },
        { cells: ["DN40", "165", "125", "Ø 16 X 4", "98.4", "240", "193", "150"], kind: "" },
        { cells: ["DN50", "190", "150", "Ø 19 X 4", "120.7", "269", "223", "200"], kind: "" },
        { cells: ["DN65", "216", "180", "Ø 19 X 4", "139.7", "400", "330", "200"], kind: "" },
        { cells: ["DN80", "254", "190", "Ø 19 X 4", "152.4", "400", "330", "300"], kind: "" },
        { cells: ["DN100", "305", "230", "Ø 19 X 8", "190.5", "496", "412", "300"], kind: "" },
        { cells: ["DN150", "406", "280", "Ø 22.2 X 8", "241.3", "615", "495", "350"], kind: "" },
        { cells: ["DN200", "495", "343", "Ø 22.2 X 8", "298.5", "720", "575", "400"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "PISTON VALVE FLANGED 300#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD", "CENTER TO TOP (OPEN)", "CENTER TO TOP (CLOSE)", "WHEEL DIA"],
      rows: [
        { cells: ["DN25", "203", "125", "Ø 19 X 4", "88.9", "176", "142", "116"], kind: "" },
        { cells: ["DN40", "229", "155", "Ø 22.2 X 4", "114.3", "240", "193", "150"], kind: "" },
        { cells: ["DN50", "267", "165", "Ø 19 X 8", "127", "269", "223", "200"], kind: "" },
        { cells: ["DN65", "292", "190", "Ø 22.2 X 8", "149.2", "400", "330", "200"], kind: "" },
        { cells: ["DN80", "318", "210", "Ø 22.2 X 8", "168.3", "400", "330", "300"], kind: "" },
        { cells: ["DN100", "356", "255", "Ø 22.2 X 8", "200", "496", "412", "300"], kind: "" },
        { cells: ["DN150", "444", "320", "Ø 22.2 X 12", "269.9", "615", "495", "350"], kind: "" },
        { cells: ["DN200", "559", "380", "Ø 25.4 X 12", "330.2", "720", "575", "400"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "Large Bore Piston Valve – IBR/Non-IBR | AMCO",
    description:
      "AMCO large bore piston valve for industrial process and steam-line isolation. Check specifications and request a technical quote.",
    keywords: "large bore piston valve",
    image: "",
  },
};
