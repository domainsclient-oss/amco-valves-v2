import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "Floating Design",
  title: "3 Piece Design Screwed / Socket weld 150# & 300#",
  specs: [
    { label: "Size", subLabel: "", value: "DN6 - DN100" },
    { label: "Material of construction", subLabel: "", value: "WCB / CF8 / CF8M / CF3 / CF3M" },
    { label: "End connection", subLabel: "", value: "BSPF / NPTF / SW / BW" },
    { label: "Pressure rating", subLabel: "", value: "150# / 300#" },
    { label: "Mode of operation", subLabel: "", value: "Lever, Actuator" },
    { label: "Manufacturing Standard", subLabel: "", value: "ISO 17292" },
    { label: "Testing Standard", subLabel: "", value: "ISO 5208" },
  ],
  images: [
    { src: "/products/3pc-design-screwed-1.png", alt: "3PC Design Screwed View 1" },
    { src: "/products/3pc-design-screwed-2.png", alt: "3PC Design Screwed View 2" },
    { src: "/products/3pc-design-screwed-3.png", alt: "3PC Design Screwed View 3" },
    { src: "/products/3-piece-design-screwed-socket-weld-150-300-1.jpg", alt: "3PC Design Screwed View 4" },
    { src: "/products/3-piece-design-screwed-socket-weld-150-300-2.jpg", alt: "3PC Design Screwed View 5" },
    { src: "/products/3-piece-design-screwed-socket-weld-150-300-3.jpg", alt: "3PC Design Screwed View 6" },
    { src: "/products/3-piece-design-screwed-socket-weld-150-300-4.jpg", alt: "3PC Design Screwed View 7" },
    { src: "/products/3-piece-design-screwed-socket-weld-150-300-5.jpg", alt: "3PC Design Screwed View 8" },
    { src: "/products/3-piece-design-screwed-socket-weld-150-300-6.jpg", alt: "3PC Design Screwed View 9" },
  ],
  tables: [
    {
      title: "",
      groups: [
        { label: "3PC DESIGN SCREWED / SOCKETWELD 150#", span: 3 },
        { label: "3PC DESIGN SCREWED / SOCKETWELD 300#", span: 3 },
      ],
      headers: ["SIZE", "FACE TO FACE", "LEVER LENGTH", "HEIGHT", "FACE TO FACE", "LEVER LENGTH", "HEIGHT"],
      rows: [
        { cells: ["DN8", "63", "110", "50", "63", "110", "50"], kind: "" },
        { cells: ["DN10", "63", "110", "50", "63", "110", "50"], kind: "" },
        { cells: ["DN15", "63", "110", "50", "63", "110", "50"], kind: "" },
        { cells: ["DN20", "75", "110", "55", "75", "110", "55"], kind: "" },
        { cells: ["DN25", "87", "140", "70", "87", "140", "70"], kind: "" },
        { cells: ["DN32", "88", "180", "26", "88", "180", "26"], kind: "" },
        { cells: ["DN40", "110", "180", "90", "110", "180", "90"], kind: "" },
        { cells: ["DN50", "112", "180", "105", "112", "180", "105"], kind: "" },
        { cells: ["DN65", "on request", "on request", "on request", "on request", "on request", "on request"], kind: "" },
        { cells: ["DN80", "162", "290", "135", "162", "290", "135"], kind: "" },
        { cells: ["DN100", "on request", "on request", "on request", "on request", "on request", "on request"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "Floating Ball Valve – 3-Piece Screwed/Socket Weld 150/300 | AMCO",
    description:
      "AMCO floating ball valve in 3-piece, floating, screwed / socket weld, 3, 150/300 configuration for industrial quarter-turn isolation. Check specifications and.",
    keywords: "3-piece floating floating ball valve",
    image: "",
  },
};
