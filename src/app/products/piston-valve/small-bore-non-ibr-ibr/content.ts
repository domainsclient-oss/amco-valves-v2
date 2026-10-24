import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "Piston Valve",
  title: "Small Bore Non IBR & IBR Piston Valve",
  specs: [
    { label: "Size", subLabel: "", value: "DN15 - DN50" },
    { label: "Material of construction", subLabel: "(Bill of material)", value: "A105 / F304/L / F316/L / F11 / F22" },
    { label: "End connection", subLabel: "", value: "Screwed / Socket weld" },
    { label: "Pressure rating", subLabel: "", value: "800#" },
    { label: "Mode of operation", subLabel: "", value: "Wheel" },
    { label: "Manufacturing Standard", subLabel: "", value: "API 602" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/products/small-bore-non-ibr-ibr.jpg", alt: "Small Bore Non IBR & IBR Piston Valve" },
  ],
  tables: [
    {
      title: "A105 / F304L / F316L PISTON VALVE SW & SE 800#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "BORE", "SOCKETWELD BORE", "CENTER TO TOP (OPEN)", "CENTER TO TOP (CLOSE)", "WHEEL DIA"],
      rows: [
        { cells: ["DN15", "110", "9.0", "21.8", "130", "104", "86"], kind: "" },
        { cells: ["DN20", "110", "12.0", "27.2", "130", "104", "86"], kind: "" },
        { cells: ["DN25", "126", "17.0", "33.9", "171", "137", "116"], kind: "" },
        { cells: ["DN32", "-", "-", "-", "-", "-", "-"], kind: "" },
        { cells: ["DN40", "165", "28.0", "48.8", "235", "191", "150"], kind: "" },
        { cells: ["DN50", "-", "-", "-", "-", "-", "-"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
};
