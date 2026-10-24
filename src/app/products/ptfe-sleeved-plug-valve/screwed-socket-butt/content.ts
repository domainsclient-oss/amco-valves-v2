import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "PTFE Sleeved Plug Valve",
  title: "Screwed / Socket / Butt",
  specs: [
    { label: "Size", subLabel: "", value: "DN15 - DN50" },
    { label: "Material of construction", subLabel: "", value: "WCB / CF8 / CF8M / CF3 / CF3M" },
    { label: "Sleeve", subLabel: "", value: "PTFE" },
    { label: "End connection", subLabel: "", value: "Screwed / Socket / Butt" },
    { label: "Pressure rating", subLabel: "", value: "800#" },
    { label: "Mode of operation", subLabel: "", value: "Lever" },
    { label: "Manufacturing Standard", subLabel: "", value: "API 599" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/dummy-image.png", alt: "Screwed / Socket / Butt" },
  ],
  tables: [],
};
