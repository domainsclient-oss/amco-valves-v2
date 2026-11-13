import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "IBR & Non IBR Valves",
  title: "Small Bore Forged IBR & Non IBR Globe Valve",
  specs: [
    { label: "Size", subLabel: "", value: "DN15 - DN50" },
    { label: "Material of construction", subLabel: "(BILL OF MATERIAL)", value: "A105 / F304/L / F316/L / F11 / F22" },
    { label: "End connection", subLabel: "", value: "Screwed / Socket weld / CB / BW" },
    { label: "Pressure rating", subLabel: "", value: "150#, 300#, 600#, 800#, 1500#, 2500#" },
    { label: "Mode of operation", subLabel: "", value: "Wheel" },
    { label: "Manufacturing Standard", subLabel: "", value: "API 602" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/products/small-bore-forged-globe-valve-1.jpg", alt: "Small Bore Forged Globe Valve View 1" },
    { src: "/products/small-bore-forged-globe-valve-2.jpg", alt: "Small Bore Forged Globe Valve View 2" },
  ],
  tables: [
    {
      title: "A105 / F304L / F316L GLOBE VALVE FLANGED 150#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD", "HEIGHT (OPEN/CLOSE)", "WHEEL DIA"],
      rows: [
        { cells: ["DN15", "108", "90", "16 X 4", "60.3", "159 / 143", "86"], kind: "" },
        { cells: ["DN20", "117", "100", "16 X 4", "69.9", "162 / 146", "86"], kind: "" },
        { cells: ["DN25", "127", "110", "16 X 4", "79.4", "191 / 171", "116"], kind: "" },
        { cells: ["DN32", "140", "115", "16 X 4", "88.9", "228 / 199", "150"], kind: "" },
        { cells: ["DN40", "165", "125", "16 X 4", "98.4", "228 / 199", "150"], kind: "" },
        { cells: ["DN50", "203", "150", "19 X 4", "120.7", "265 / 236", "150"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "A105 / F304L / F316L GLOBE VALVE FLANGED 300#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD", "HEIGHT (OPEN/CLOSE)", "WHEEL DIA"],
      rows: [
        { cells: ["DN15", "152", "95", "16 X 4", "66.7", "159 / 143", "86"], kind: "" },
        { cells: ["DN20", "178", "115", "19 X 4", "82.6", "162 / 146", "86"], kind: "" },
        { cells: ["DN25", "203", "125", "19 X 4", "88.9", "191 / 171", "116"], kind: "" },
        { cells: ["DN32", "216", "135", "19 X 4", "98.4", "228 / 199", "150"], kind: "" },
        { cells: ["DN40", "229", "155", "22.2 X 4", "114.3", "228 / 199", "150"], kind: "" },
        { cells: ["DN50", "267", "165", "19 X 8", "127", "265 / 236", "150"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "A105 / F304L / F316L GLOBE VALVE FLANGED 600#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD", "HEIGHT (OPEN/CLOSE)", "WHEEL DIA"],
      rows: [
        { cells: ["DN15", "165", "95", "16 X 4", "66.7", "159 / 143", "86"], kind: "" },
        { cells: ["DN20", "190", "115", "19 X 4", "82.6", "162 / 146", "86"], kind: "" },
        { cells: ["DN25", "216", "125", "19 X 4", "88.9", "191 / 171", "116"], kind: "" },
        { cells: ["DN32", "229", "135", "19 X 4", "98.4", "228 / 199", "150"], kind: "" },
        { cells: ["DN40", "241", "155", "22.2 X 4", "114.3", "228 / 199", "150"], kind: "" },
        { cells: ["DN50", "292", "165", "19 X 8", "127", "265 / 236", "150"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "A105 / F304L / F316L GLOBE VALVE SW, SE & BW 800#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "BORE", "SOCKETWELD BORE", "HEIGHT (OPEN)", "HEIGHT (CLOSE)", "WHEEL DIA"],
      rows: [
        { cells: ["DN15", "73", "9.5", "21.8", "159", "143", "86"], kind: "" },
        { cells: ["DN20", "80", "12.7", "27.2", "162", "146", "86"], kind: "" },
        { cells: ["DN25", "100", "17.5", "33.9", "191", "171", "116"], kind: "" },
        { cells: ["DN32", "145", "23.8", "42.7", "228", "199", "150"], kind: "" },
        { cells: ["DN40", "145", "28.6", "48.8", "228", "199", "150"], kind: "" },
        { cells: ["DN50", "160", "36.5", "61.2", "265", "236", "150"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "A105 / F304L / F316L GLOBE VALVE SW, SE & BW 1500#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "BORE", "SOCKETWELD BORE", "HEIGHT (OPEN)", "HEIGHT (CLOSE)", "WHEEL DIA"],
      rows: [
        { cells: ["DN15", "80", "8.5", "21.8", "160", "148", "86"], kind: "" },
        { cells: ["DN20", "100", "9.5", "27.2", "174", "187", "116"], kind: "" },
        { cells: ["DN25", "145", "14.5", "33.9", "224", "204", "150"], kind: "" },
        { cells: ["DN32", "145", "20.5", "42.7", "224", "204", "150"], kind: "" },
        { cells: ["DN40", "160", "25.5", "48.8", "239", "261", "150"], kind: "" },
        { cells: ["DN50", "172", "27.5", "61.2", "318", "290", "225"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "A105 / F304L / F316L GLOBE VALVE SW, SE & BW 2500#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "BORE", "SOCKETWELD BORE", "HEIGHT (OPEN)", "HEIGHT (CLOSE)", "WHEEL DIA"],
      rows: [
        { cells: ["DN15", "100", "7.0", "21.8", "178", "162", "116"], kind: "" },
        { cells: ["DN20", "145", "12.5", "27.2", "227", "207", "150"], kind: "" },
        { cells: ["DN25", "160", "15.5", "33.9", "256", "224", "150"], kind: "" },
        { cells: ["DN32", "172", "21.5", "42.7", "303", "263", "225"], kind: "" },
        { cells: ["DN40", "172", "26.5", "48.8", "303", "263", "225"], kind: "" },
        { cells: ["DN50", "-", "-", "-", "-", "-", "-"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "Forged Globe IBR Valve | AMCO",
    description:
      "AMCO forged globe valve in small bore, forged, globe configuration for boiler and steam piping applications. Check specifications and request a technical quote.",
    keywords: "small bore forged forged globe valve",
    image: "",
  },
};
