import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "Lined Valves",
  title: "PTFE Lined Wafer Check Valve",
  specs: [
    { label: "Size", subLabel: "", value: "DN50 - DN300" },
    { label: "Material of construction", subLabel: "", value: "CS / SS / Alloy steel" },
    { label: "Lining", subLabel: "", value: "PFA / FEP" },
    { label: "End connection", subLabel: "", value: "Wafer to suit ANSI 150# flanges" },
    { label: "Pressure rating", subLabel: "", value: "PN10 / 16" },
    { label: "Manufacturing Standard", subLabel: "", value: "Manufacturer Std" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/dummy-image.png", alt: "PTFE Lined Wafer Check Valve" },
  ],
  tables: [
    {
      title: "PTFE LINED WAFER CHECK VALVE",
      groups: [],
      headers: ["SIZE", "BORE", "FACE TO FACE", "OUTER DIA"],
      rows: [
        { cells: ["DN50", "26", "43", "113"], kind: "" },
        { cells: ["DN65", "-", "-", "-"], kind: "" },
        { cells: ["DN80", "42", "46", "147"], kind: "" },
        { cells: ["DN100", "65", "52", "180"], kind: "" },
        { cells: ["DN125", "-", "-", "-"], kind: "" },
        { cells: ["DN150", "111", "56", "236.8"], kind: "" },
        { cells: ["DN200", "133", "60", "290"], kind: "" },
        { cells: ["DN250", "184", "68", "344"], kind: "" },
        { cells: ["DN300", "232", "78", "415"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "TO SUIT 150# FLANGES",
      groups: [],
      headers: ["SIZE", "PCD", "HOLE DIA", "NO. OF HOLES"],
      rows: [
        { cells: ["DN50", "120.7", "19", "4"], kind: "" },
        { cells: ["DN65", "-", "-", "-"], kind: "" },
        { cells: ["DN80", "152.4", "19", "4"], kind: "" },
        { cells: ["DN100", "190.5", "19", "8"], kind: "" },
        { cells: ["DN125", "-", "-", "-"], kind: "" },
        { cells: ["DN150", "241.3", "22.2", "8"], kind: "" },
        { cells: ["DN200", "298.5", "22.2", "8"], kind: "" },
        { cells: ["DN250", "362.0", "25.4", "12"], kind: "" },
        { cells: ["DN300", "431.8", "25.4", "12"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "PTFE Lined Wafer Check Valve | AMCO",
    description:
      "AMCO ptfe lined wafer check valve for corrosive-service backflow prevention. Compare lining, seat and connection design; request drawings, datasheets or a quotation.",
    keywords: "ptfe lined wafer check valve",
    image: "",
  },
};
