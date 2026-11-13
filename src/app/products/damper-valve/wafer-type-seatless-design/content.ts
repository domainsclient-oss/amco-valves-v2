import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "Damper valve",
  title: "Wafer type Damper valve - seatless design",
  specs: [
    { label: "Size", subLabel: "", value: "DN50 - DN1000" },
    { label: "Material of construction", subLabel: "(Bill of material)", value: "CS / WCB / CF8 / CF8M / CF3 / CF3M / DUPLEX / SUPER DUPLEX / ALLOY STEEL" },
    { label: "End connection", subLabel: "", value: "Wafer to suit ANSI / ND Flanges" },
    { label: "Pressure rating", subLabel: "", value: "0.5 bar (max)" },
    { label: "Mode of operation", subLabel: "", value: "Lever, Gear, Actuator" },
    { label: "Manufacturing Standard", subLabel: "", value: "Manufacturer / API 609" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/products/damper-valvewafer-type-seatless-design-1.jpg", alt: "Wafer Type Damper Valve View 1" },
    { src: "/products/damper-valvewafer-type-seatless-design-2.jpg", alt: "Wafer Type Damper Valve View 2" },
    { src: "/products/damper-valvewafer-type-seatless-design-3.jpg", alt: "Wafer Type Damper Valve View 3" },
    { src: "/products/damper-valvewafer-type-seatless-design-4.jpg", alt: "Wafer Type Damper Valve View 4" },
  ],
  tables: [
    {
      title: "WAFER TYPE DAMPER VALVE",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "CENTER TO TOP", "CENTER TO BOTTOM"],
      rows: [
        { cells: ["DN50", "30", "135", "76"], kind: "" },
        { cells: ["DN65", "30", "142", "84"], kind: "" },
        { cells: ["DN80", "30", "150", "92"], kind: "" },
        { cells: ["DN100", "30", "160", "102"], kind: "" },
        { cells: ["DN125", "30", "172", "114"], kind: "" },
        { cells: ["DN150", "34", "195", "135"], kind: "" },
        { cells: ["DN200", "34", "220", "160"], kind: "" },
        { cells: ["DN250", "38", "250", "195"], kind: "" },
        { cells: ["DN300", "38", "275", "220"], kind: "" },
        { cells: ["DN350", "38", "293", "248"], kind: "" },
        { cells: ["DN400", "50", "315", "300"], kind: "" },
        { cells: ["DN450", "50", "340", "325"], kind: "" },
        { cells: ["DN500", "50", "365", "360"], kind: "" },
        { cells: ["DN600", "50", "415", "425"], kind: "" },
        { cells: ["DN650", "50", "440", "450"], kind: "" },
        { cells: ["DN700", "50", "465", "475"], kind: "" },
        { cells: ["DN800", "50", "515", "530"], kind: "" },
        { cells: ["DN900", "65", "585", "590"], kind: "" },
        { cells: ["DN1000", "65", "635", "645"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "Wafer Damper Valve – Wafer | AMCO",
    description:
      "AMCO wafer seatless damper valve in wafer configuration for air and gas flow management. Check specifications and request a technical quote.",
    keywords: "wafer wafer seatless damper valve",
    image: "",
  },
};
