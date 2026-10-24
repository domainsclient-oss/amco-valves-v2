import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "PTFE Seated Butterfly Valve",
  title: "Wafer Full Lug Type",
  specs: [
    { label: "Size", subLabel: "", value: "DN50 - DN400" },
    { label: "Material of construction", subLabel: "", value: "CI / DI / WCB / CF8 / CF8M" },
    { label: "Seat", subLabel: "", value: "PTFE" },
    { label: "End connection", subLabel: "", value: "Wafer Full Lug" },
    { label: "Pressure rating", subLabel: "", value: "PN10 / PN16 / 150#" },
    { label: "Mode of operation", subLabel: "", value: "Lever, Gear, Actuator" },
    { label: "Manufacturing Standard", subLabel: "", value: "API 609" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/dummy-image.png", alt: "PTFE Seated Full Lug BFV" },
  ],
  tables: [
    {
      title: "PTFE SEATED FULL LUG BFV",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "BORE"],
      rows: [
        { cells: ["DN50", "43", "51"], kind: "" },
        { cells: ["DN65", "46", "64"], kind: "" },
        { cells: ["DN80", "46", "76"], kind: "" },
        { cells: ["DN100", "52", "101"], kind: "" },
        { cells: ["DN125", "56", "125"], kind: "" },
        { cells: ["DN150", "56", "152"], kind: "" },
        { cells: ["DN200", "60", "203"], kind: "" },
        { cells: ["DN250", "68", "254"], kind: "" },
        { cells: ["DN300", "78", "305"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "TO SUIT 150# FLANGES",
      groups: [],
      headers: ["SIZE", "PCD", "HOLE DIA", "NO. OF HOLES"],
      rows: [
        { cells: ["DN50", "120.7", "19", "4"], kind: "" },
        { cells: ["DN65", "139.7", "19", "4"], kind: "" },
        { cells: ["DN80", "152.4", "19", "4"], kind: "" },
        { cells: ["DN100", "190.5", "19", "8"], kind: "" },
        { cells: ["DN125", "215.9", "22.2", "8"], kind: "" },
        { cells: ["DN150", "241.3", "22.2", "8"], kind: "" },
        { cells: ["DN200", "298.5", "22.2", "8"], kind: "" },
        { cells: ["DN250", "362.0", "25.4", "12"], kind: "" },
        { cells: ["DN300", "431.8", "25.4", "12"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
};
