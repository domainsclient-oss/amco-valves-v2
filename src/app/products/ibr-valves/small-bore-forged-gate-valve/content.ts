import type { ProductContent } from "@/lib/product-content";

/** Original page data; edits from the admin dashboard replace it. */
export const content: ProductContent = {
  category: "IBR & Non IBR Valves",
  title: "Small Bore Forged IBR & Non IBR Gate Valve",
  specs: [
    { label: "Size", subLabel: "", value: "DN15 - DN50" },
    { label: "Material of construction", subLabel: "(BILL OF MATERIAL)", value: "A105 / F304/L / F316/L / F11 / F22" },
    { label: "End connection", subLabel: "", value: "Screwed / Socket weld / Butt weld / Flanged" },
    { label: "Pressure rating", subLabel: "", value: "150#, 300#, 600#, 800#, 1500#, 2500#" },
    { label: "Mode of operation", subLabel: "", value: "Wheel" },
    { label: "Manufacturing Standard", subLabel: "", value: "API 602" },
    { label: "Testing Standard", subLabel: "", value: "API 598" },
  ],
  images: [
    { src: "/products/small-bore-forged-gate-valve-1.jpg", alt: "Small Bore Forged Gate Valve View 1" },
    { src: "/products/small-bore-forged-gate-valve-2.jpg", alt: "Small Bore Forged Gate Valve View 2" },
  ],
  tables: [
    {
      title: "A105 / F304L / F316L GATE VALVE FLANGED 150#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD", "HEIGHT (OPEN/CLOSE)", "WHEEL DIA"],
      rows: [
        { cells: ["DN15", "108", "90", "16 X 4", "60.3", "151 / 135", "86"], kind: "" },
        { cells: ["DN20", "117", "100", "16 X 4", "69.9", "157 / 137", "86"], kind: "" },
        { cells: ["DN25", "127", "110", "16 X 4", "79.4", "186 / 162", "116"], kind: "" },
        { cells: ["DN32", "140", "115", "16 X 4", "88.9", "237 / 201", "150"], kind: "" },
        { cells: ["DN40", "165", "125", "16 X 4", "98.4", "237 / 201", "150"], kind: "" },
        { cells: ["DN50", "178", "150", "19 X 4", "120.7", "268 / 223", "150"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "A105 / F304L / F316L GATE VALVE FLANGED 300#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD", "HEIGHT (OPEN/CLOSE)", "WHEEL DIA"],
      rows: [
        { cells: ["DN15", "140", "95", "16 X 4", "66.7", "151 / 135", "86"], kind: "" },
        { cells: ["DN20", "152", "115", "19 X 4", "82.6", "157 / 137", "86"], kind: "" },
        { cells: ["DN25", "165", "125", "19 X 4", "88.9", "186 / 162", "116"], kind: "" },
        { cells: ["DN32", "178", "135", "19 X 4", "98.4", "237 / 201", "150"], kind: "" },
        { cells: ["DN40", "190", "155", "22.2 X 4", "114.3", "237 / 201", "150"], kind: "" },
        { cells: ["DN50", "216", "165", "19 X 8", "127", "268 / 223", "150"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "A105 / F304L / F316L GATE VALVE FLANGED 600#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD", "HEIGHT (OPEN/CLOSE)", "WHEEL DIA"],
      rows: [
        { cells: ["DN15", "165", "95", "16 X 4", "66.7", "151 / 135", "86"], kind: "" },
        { cells: ["DN20", "190", "115", "19 X 4", "82.6", "157 / 137", "86"], kind: "" },
        { cells: ["DN25", "216", "125", "19 X 4", "88.9", "186 / 162", "116"], kind: "" },
        { cells: ["DN32", "229", "135", "19 X 4", "98.4", "237 / 201", "150"], kind: "" },
        { cells: ["DN40", "241", "155", "22.2 X 4", "114.3", "237 / 201", "150"], kind: "" },
        { cells: ["DN50", "292", "165", "19 X 8", "127", "268 / 223", "150"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "A105 / F304L / F316L GATE VALVE SW, SE & BW 800#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "BORE", "SOCKETWELD BORE", "HEIGHT (OPEN)", "HEIGHT (CLOSE)", "WHEEL DIA"],
      rows: [
        { cells: ["DN15", "73", "9.5", "21.8", "151", "135", "86"], kind: "" },
        { cells: ["DN20", "80", "12.7", "27.2", "157", "137", "86"], kind: "" },
        { cells: ["DN25", "100", "17.5", "33.9", "186", "162", "116"], kind: "" },
        { cells: ["DN32", "120", "23.8", "42.7", "237", "201", "150"], kind: "" },
        { cells: ["DN40", "120", "28.6", "48.8", "237", "201", "150"], kind: "" },
        { cells: ["DN50", "130", "36.5", "61.2", "268", "223", "150"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "A105 / F304L / F316L GATE VALVE SW, SE & BW 1500#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "BORE", "SOCKETWELD BORE", "HEIGHT (OPEN)", "HEIGHT (CLOSE)", "WHEEL DIA"],
      rows: [
        { cells: ["DN15", "80", "9.5", "21.8", "151", "138", "86"], kind: "" },
        { cells: ["DN20", "100", "12.7", "27.2", "178", "162", "116"], kind: "" },
        { cells: ["DN25", "120", "15.9", "33.9", "227", "207", "150"], kind: "" },
        { cells: ["DN32", "120", "22.2", "42.7", "227", "207", "150"], kind: "" },
        { cells: ["DN40", "130", "27", "48.8", "256", "224", "150"], kind: "" },
        { cells: ["DN50", "140", "34.9", "61.2", "303", "263", "225"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
    {
      title: "A105 / F304L / F316L GATE VALVE SW, SE & BW 2500#",
      groups: [],
      headers: ["SIZE", "FACE TO FACE", "BORE", "SOCKETWELD BORE", "HEIGHT (OPEN)", "HEIGHT (CLOSE)", "WHEEL DIA"],
      rows: [
        { cells: ["DN15", "100", "7.0", "21.8", "187", "174", "116"], kind: "" },
        { cells: ["DN20", "120", "12.5", "27.2", "224", "204", "150"], kind: "" },
        { cells: ["DN25", "130", "15.5", "33.9", "261", "239", "150"], kind: "" },
        { cells: ["DN32", "140", "21.5", "42.7", "318", "290", "225"], kind: "" },
        { cells: ["DN40", "140", "26.5", "48.8", "318", "290", "225"], kind: "" },
        { cells: ["DN50", "-", "-", "-", "-", "-", "-"], kind: "" },
      ],
      note: "All dimensions are in mm",
    },
  ],
  seo: {
    title: "Forged Gate IBR Valve | AMCO",
    description:
      "AMCO forged gate valve in small bore, forged, gate configuration for boiler and steam piping applications. Check specifications and request a technical quote.",
    keywords: "small bore forged forged gate valve",
    image: "",
  },
};
