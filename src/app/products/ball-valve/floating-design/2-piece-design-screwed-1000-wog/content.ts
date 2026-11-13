import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "Ball Valve",
  title: "2 Piece Design screwed 1000 WOG",
  specs: [
    { label: "Size", subLabel: "", value: "DN6 - DN100" },
    { label: "Material of construction", subLabel: "", value: "CF8 / CF8M / CF3 / CF3M" },
    { label: "End connection", subLabel: "", value: "BSPF / NPTF" },
    { label: "Pressure rating", subLabel: "", value: "150# / 300# / 1000 PSI" },
    { label: "Mode of operation", subLabel: "", value: "Lever" },
    { label: "Manufacturing Standard", subLabel: "", value: "ISO 17292" },
    { label: "Testing Standard", subLabel: "", value: "ISO 5208" },
  ],
  images: [
    { src: "/products/2pc-screwed-1.webp", alt: "2PC Design Screwed Valve View 1" },
    { src: "/products/2pc-screwed-2.webp", alt: "2PC Design Screwed Valve View 2" },
  ],
  tables: [
    {
      // Side-by-side table: the title holds one heading per half, separated by "|".
      title: "2PC DESIGN SCREWED 150#|2PC DESIGN SCREWED 300#",
      groups: [
        { label: "", span: 1 },
        { label: "FULL BORE", span: 3 },
        { label: "", span: 1 },
        { label: "FULL BORE", span: 3 },
      ],
      headers: ["SIZE", "FACE TO FACE", "LEVER LENGTH", "HEIGHT", "SIZE", "FACE TO FACE", "LEVER LENGTH", "HEIGHT"],
      rows: [
        { cells: ["DN8", "47", "90", "16", "DN8", "47", "90", "16"], kind: "" },
        { cells: ["DN10", "47", "90", "16", "DN10", "47", "90", "16"], kind: "" },
        { cells: ["DN15", "58", "110", "50", "DN15", "58", "110", "50"], kind: "" },
        { cells: ["DN20", "67", "110", "55", "DN20", "67", "110", "55"], kind: "" },
        { cells: ["DN25", "76", "140", "70", "DN25", "76", "140", "70"], kind: "" },
        { cells: ["DN32", "91", "180", "90", "DN32", "91", "180", "90"], kind: "" },
        { cells: ["DN40", "100", "180", "90", "DN40", "100", "180", "90"], kind: "" },
        { cells: ["DN50", "118", "180", "105", "DN50", "118", "180", "105"], kind: "" },
        { cells: ["DN65", "-", "-", "-", "DN65", "-", "-", "-"], kind: "" },
        { cells: ["DN80", "-", "-", "-", "DN80", "-", "-", "-"], kind: "" },
        { cells: ["DN100", "-", "-", "-", "DN100", "-", "-", "-"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "2PC DESIGN SCREWED 1000 PSI",
      groups: [
        { label: "", span: 1 },
        { label: "FULL BORE", span: 3 },
      ],
      headers: ["SIZE", "FACE TO FACE", "LEVER LENGTH", "HEIGHT"],
      rows: [
        { cells: ["DN8", "47", "90", "16"], kind: "" },
        { cells: ["DN10", "47", "90", "16"], kind: "" },
        { cells: ["DN15", "59", "90", "50"], kind: "" },
        { cells: ["DN20", "65", "90", "55"], kind: "" },
        { cells: ["DN25", "78", "110", "62"], kind: "" },
        { cells: ["DN32", "86", "120", "65"], kind: "" },
        { cells: ["DN40", "100", "140", "87"], kind: "" },
        { cells: ["DN50", "115", "170", "95"], kind: "" },
        { cells: ["DN65", "-", "-", "-"], kind: "" },
        { cells: ["DN80", "-", "-", "-"], kind: "" },
        { cells: ["DN100", "-", "-", "-"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "Floating Ball Valve – 2-Piece Screwed 1000/WOG | AMCO",
    description:
      "AMCO floating ball valve in 2-piece, floating, screwed, 2, 1000/WOG configuration for industrial quarter-turn isolation. Check specifications and request a.",
    keywords: "2-piece floating floating ball valve",
    image: "",
  },
};
