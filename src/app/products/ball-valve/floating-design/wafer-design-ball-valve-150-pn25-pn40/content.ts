import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "Ball Valve",
  title: "Wafer Design Ball valve 150# / PN25 / PN40",
  specs: [
    { label: "Size", subLabel: "", value: "DN50 - DN150" },
    { label: "Material of construction", subLabel: "", value: "WCB / CF8 / CF8M / CF3 / CF3M" },
    { label: "End connection", subLabel: "", value: "Wafer to suit ANSI / ND flanges" },
    { label: "Pressure rating", subLabel: "", value: "150# / PN25 / PN40" },
    { label: "Mode of operation", subLabel: "", value: "Lever, Actuator" },
    { label: "Manufacturing Standard", subLabel: "", value: "ISO 17292" },
    { label: "Testing Standard", subLabel: "", value: "ISO 5208" },
  ],
  images: [{ src: "/dummy-image.png", alt: "Wafer Design Ball Valve" }],
  tables: [],
};
