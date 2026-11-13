import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "Wafer Check Valve",
  title: "Wafer type check valve Metal seat",
  specs: [
    { label: "Size", subLabel: "", value: "DN25 - DN1000" },
    { label: "Material of construction", subLabel: "(Bill of material)", value: "WCB / CF8 / CF8M / CF3 / CF3M / DUPLEX / SUPER DUPLEX / ALUMINIUM BRONZE / ALLOY STEEL" },
    { label: "End connection", subLabel: "", value: "Serrated Wafer to suit ANSI flanges" },
    { label: "Pressure rating", subLabel: "", value: "PN16" },
    { label: "Manufacturing Standard", subLabel: "", value: "API 594" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/products/wafer-type-check-valve-metal-seat-1.jpg", alt: "Wafer Check Valve Metal Seat View 1" },
    { src: "/products/wafer-type-check-valve-metal-seat-2.jpeg", alt: "Wafer Check Valve Metal Seat View 2" },
    { src: "/products/wafer-type-check-valve-metal-seat-3.jpg", alt: "Wafer Check Valve Metal Seat View 3" },
  ],
  tables: [
    {
      title: "WAFER CHECK VALVE METAL SEAT",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "BORE DIA", "OUTER DIA"],
      rows: [
        { cells: ["DN25", "16", "14", "65"], kind: "" },
        { cells: ["DN40", "19", "24", "84"], kind: "" },
        { cells: ["DN50", "19", "30", "103"], kind: "" },
        { cells: ["DN65", "19", "40", "123"], kind: "" },
        { cells: ["DN80", "19", "52", "136"], kind: "" },
        { cells: ["DN100", "19", "71", "174"], kind: "" },
        { cells: ["DN125", "19", "93", "195"], kind: "" },
        { cells: ["DN150", "19", "114", "220"], kind: "" },
        { cells: ["DN200", "28", "157", "278"], kind: "" },
        { cells: ["DN250", "28", "195", "340"], kind: "" },
        { cells: ["DN300", "38", "230", "410"], kind: "" },
        { cells: ["DN350", "41", "270", "451"], kind: "" },
        { cells: ["DN400", "51", "310", "511"], kind: "" },
        { cells: ["DN450", "51", "360", "549"], kind: "" },
        { cells: ["DN500", "60", "406", "606"], kind: "" },
        { cells: ["DN600", "70", "490", "714"], kind: "" },
        { cells: ["DN650", "80", "530", "722"], kind: "" },
        { cells: ["DN700", "89", "570", "773"], kind: "" },
        { cells: ["DN800", "102", "652", "878"], kind: "" },
        { cells: ["DN900", "127", "715", "984"], kind: "" },
        { cells: ["DN1000", "-", "-", "-"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "Wafer Check Valve – Metal Seat | AMCO",
    description:
      "AMCO wafer check valve in metal seated configuration for compact non-return service. Check specifications and request a technical quote.",
    keywords: "metal seated wafer check valve",
    image: "",
  },
};
