import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "Large Bore Cast",
  title: "Large Bore Cast IBR & Non IBR Swing Check Valve",
  specs: [
    { label: "Size", subLabel: "", value: "DN50 - DN600" },
    {
      label: "Material of construction",
      subLabel: "(Bill of material)",
      value: "WCB / LCB / WC6 / WC9 / CF8 / CF8M / CF3 / CF3M / ALLOY STEEL / DUPLEX / SUPER DUPLEX / INCONEL / ALUMINIUM BRONZE",
    },
    { label: "End connection", subLabel: "", value: "Flanged / Butt weld" },
    { label: "Pressure rating", subLabel: "", value: "150#, 300#, 600#" },
    { label: "Mode of operation", subLabel: "", value: "Automatic" },
    { label: "Manufacturing Standard", subLabel: "", value: "API 600" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/products/large-bore-cast-swing-check-valve-1.jpg", alt: "Large Bore Cast Swing Check Valve View 1" },
    { src: "/products/large-bore-cast-swing-check-valve-2.jpg", alt: "Large Bore Cast Swing Check Valve View 2" },
    { src: "/products/large-bore-cast-swing-check-valve-3.jpg", alt: "Large Bore Cast Swing Check Valve View 3" },
  ],
  tables: [
    {
      title: "",
      // Two halves side by side, each starting with its own SIZE column.
      groups: [
        { label: "SWING CHECK VALVE FLANGED END 150#", span: 6 },
        { label: "SWING CHECK VALVE FLANGED END 300#", span: 6 },
      ],
      headers: ["SIZE", "FACE TO FACE (FL)", "FACE TO FACE (BW)", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD", "SIZE", "FACE TO FACE (FL)", "FACE TO FACE (BW)", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD"],
      rows: [
        { cells: ["DN50", "203", "203", "150", "19 X 4", "120.7", "DN50", "267", "267", "165", "19 X 8", "127"], kind: "" },
        { cells: ["DN65", "216", "216", "180", "19 X 4", "139.7", "DN65", "292", "292", "190", "22.2 X 8", "149.2"], kind: "" },
        { cells: ["DN80", "241", "241", "190", "19 X 4", "152.4", "DN80", "318", "318", "210", "22.2 X 8", "168.3"], kind: "" },
        { cells: ["DN100", "292", "292", "230", "19 X 8", "190.5", "DN100", "356", "356", "255", "22.2 X 8", "200"], kind: "" },
        { cells: ["DN125", "330", "330", "255", "22.2 X 8", "215.9", "DN125", "400", "400", "280", "22.2 X 8", "235"], kind: "" },
        { cells: ["DN150", "356", "356", "280", "22.2 X 8", "241.3", "DN150", "444", "444", "320", "22.2 X 12", "269.9"], kind: "" },
        { cells: ["DN200", "495", "495", "345", "22.2 X 8", "298.5", "DN200", "533", "533", "380", "25.4 X 12", "330.2"], kind: "" },
        { cells: ["DN250", "622", "622", "405", "25.4 X 12", "362", "DN250", "622", "622", "445", "29 X 16", "387.4"], kind: "" },
        { cells: ["DN300", "698", "698", "485", "25.4 X 12", "431.8", "DN300", "711", "711", "520", "32 X 16", "450.8"], kind: "" },
        { cells: ["DN350", "787", "787", "535", "29 X 12", "476.3", "DN350", "838", "838", "585", "32 X 20", "514.4"], kind: "" },
        { cells: ["DN400", "864", "864", "595", "29 X 16", "539.8", "DN400", "864", "864", "650", "35 X 20", "571.5"], kind: "" },
        { cells: ["DN450", "978", "978", "635", "32 X 16", "577.9", "DN450", "978", "978", "710", "35 X 24", "628.6"], kind: "" },
        { cells: ["DN500", "978", "978", "700", "32 X 20", "635", "DN500", "1016", "1016", "775", "35 X 24", "685.8"], kind: "" },
        { cells: ["DN600", "1295", "1295", "815", "35 X 20", "749.3", "DN600", "1346", "1346", "915", "41 X 24", "812.8"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "Cast Swing Check IBR Valve | AMCO",
    description:
      "AMCO cast swing check valve in large bore, cast, check configuration for boiler and steam piping applications. Check specifications and request a technical quote.",
    keywords: "large bore cast cast swing check valve",
    image: "",
  },
};
