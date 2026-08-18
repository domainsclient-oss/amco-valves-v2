export interface ProductSpecs {
  title: string;
  subTitle: string;
  category: string;
  subCategory: string;
  size: string;
  material: string;
  endConnection: string;
  pressureRating: string;
  modeOfOperation?: string;
  manufacturingStandard: string;
  testingStandard: string;
  seatLiner?: string;
  seat?: string;
  lining?: string;
  diaphragm?: string;
  mesh?: string;
  oRings?: string;
  sleeve?: string;
  showcaseImages?: { src: string; alt: string }[];
  dimensionTables?: {
    title: string;
    headers: string[];
    subHeaders?: { title: string; colSpan: number }[];
    rows: { data: string[]; isHeader?: boolean; isChild?: boolean }[];
  }[];
}

export const productSpecsRegistry: Record<string, ProductSpecs> = {
  // Piston Valve
  "piston-valve/small-bore-non-ibr-ibr": {
    title: "Small Bore Non IBR & IBR Piston Valve",
    subTitle: "Small Bore Non IBR & IBR Piston Valve",
    category: "Piston Valve",
    subCategory: "Piston Valve Range",
    size: "DN15 - DN50",
    material: "A105 / F304/L / F316/L / F11 / F22",
    endConnection: "Screwed / Socket weld",
    pressureRating: "800#",
    modeOfOperation: "Wheel",
    manufacturingStandard: "API 602",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/small-bore-non-ibr-ibr.jpg", alt: "Small Bore Piston Valve" }]
  },
  "piston-valve/large-bore-non-ibr-ibr": {
    title: "Large Bore Non IBR & IBR Piston Valve",
    subTitle: "Large Bore Non IBR & IBR Piston Valve",
    category: "Piston Valve",
    subCategory: "Piston Valve Range",
    size: "DN25 - DN200",
    material: "WCB / CF8 / CF8M / CF3 / CF3M",
    endConnection: "Flanged ANSI 150# / 300#",
    pressureRating: "150# / 300#",
    modeOfOperation: "Wheel",
    manufacturingStandard: "API 602",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/large-bore-non-ibr-ibr.jpg", alt: "Large Bore Piston Valve" }]
  },

  // Ball Valve - Floating Design
  "ball-valve/floating-design/2-piece-design-screwed-1000-wog": {
    title: "Floating Design",
    subTitle: "2 Piece Design screwed 1000 WOG",
    category: "Ball Valve",
    subCategory: "Floating Design",
    size: "DN6 - DN100",
    material: "CF8 / CF8M / CF3 / CF3M",
    endConnection: "BSPF / NPTF",
    pressureRating: "150# / 300# / 1000 PSI",
    modeOfOperation: "Lever",
    manufacturingStandard: "ISO 17292",
    testingStandard: "ISO 5208",
    showcaseImages: [{ src: "/products/2pc-screwed-1.webp", alt: "2PC Screwed Ball Valve" }]
  },
  "ball-valve/floating-design/3-piece-design-screwed-socket-weld-150-300": {
    title: "Floating Design",
    subTitle: "3 Piece Design Screwed / Socket weld 150# & 300#",
    category: "Ball Valve",
    subCategory: "Floating Design",
    size: "DN6 - DN100",
    material: "WCB / CF8 / CF8M / CF3 / CF3M",
    endConnection: "BSPF / NPTF / SW / BW",
    pressureRating: "150# / 300#",
    modeOfOperation: "Lever, Actuator",
    manufacturingStandard: "ISO 17292",
    testingStandard: "ISO 5208",
    showcaseImages: [{ src: "/products/3pc-design-screwed-1.png", alt: "3PC Screwed Ball Valve" }]
  },
  "ball-valve/floating-design/3-piece-design-screwed-socket-weld-600-800-1500": {
    title: "Floating Design",
    subTitle: "3 Piece Design Screwed / Socket weld 600# & 800# & 1500#",
    category: "Ball Valve",
    subCategory: "Floating Design",
    size: "DN6 - DN50",
    material: "A105 / F304/L / F316/L / CF8 / CF8M / CF3 / CF3M",
    endConnection: "BSPF / NPTF / SW / BW",
    pressureRating: "600# / 800# / 1500#",
    modeOfOperation: "Lever, Actuator",
    manufacturingStandard: "ISO 17292 / API 6D / API 608",
    testingStandard: "ISO 5208 / ISO 10497 / API 607",
    showcaseImages: [{ src: "/products/3-piece-design-screwed-socket-weld-600-800-1500-1.jpg", alt: "3PC High Pressure Ball Valve" }]
  },
  "ball-valve/floating-design/3-piece-design-flanged-ansi-150-300-600-900": {
    title: "Floating Design",
    subTitle: "3 Piece Design Flanged ANSI 150#, 300#, 600# & 900#",
    category: "Ball Valve",
    subCategory: "Floating Design",
    size: "DN6 - DN300",
    material: "A105 / F304/L / F316/L / WCB / CF8 / CF8M / CF3 / CF3M",
    endConnection: "FLANGED / BW",
    pressureRating: "150# / 300# / 600# / 900#",
    modeOfOperation: "Lever, Actuator",
    manufacturingStandard: "ISO 17292 / API 6D / API 608",
    testingStandard: "ISO 5208 / ISO 10497 / API 607",
    showcaseImages: [{ src: "/products/3-piece-design-flanged-ansi-150-300-600-900-1.jpg", alt: "3PC Flanged Ball Valve" }]
  },
  "ball-valve/floating-design/2-piece-design-flanged-ansi-150-300-600": {
    title: "Floating Design",
    subTitle: "2 Piece Design Flanged ANSI 150#, 300#, 600#",
    category: "Ball Valve",
    subCategory: "Floating Design",
    size: "DN6 - DN300",
    material: "WCB / CF8 / CF8M / CF3 / CF3M",
    endConnection: "FLANGED",
    pressureRating: "150# / 300# / 600#",
    modeOfOperation: "Lever, Actuator",
    manufacturingStandard: "ISO 17292 / API 6D / API 608",
    testingStandard: "ISO 5208 / ISO 10497 / API 607",
    showcaseImages: [{ src: "/products/2-piece-design-flanged-ansi-150-300-600-1.jpg", alt: "2PC Flanged Ball Valve" }]
  },
  "ball-valve/floating-design/wafer-design-ball-valve-150-pn25-pn40": {
    title: "Floating Design",
    subTitle: "Wafer Design Ball valve 150# / PN25 / PN40",
    category: "Ball Valve",
    subCategory: "Floating Design",
    size: "DN50 - DN150",
    material: "WCB / CF8 / CF8M / CF3 / CF3M",
    endConnection: "Wafer to suit ANSI / ND flanges",
    pressureRating: "150# / PN25 / PN40",
    modeOfOperation: "Lever, Actuator",
    manufacturingStandard: "ISO 17292",
    testingStandard: "ISO 5208",
    showcaseImages: [{ src: "/dummy-image.png", alt: "Wafer Design Ball Valve" }]
  },

  // Ball Valve - Trunnion Mounted
  "ball-valve/trunnion-mounted/2-piece-design-flanged-ansi-150-300-600": {
    title: "Trunnion Mounted",
    subTitle: "2 Piece Design Flanged ANSI 150#, 300#, 600#",
    category: "Ball Valve",
    subCategory: "Trunnion Mounted",
    size: "DN100 - DN300",
    material: "WCB / CF8 / CF8M / CF3 / CF3M",
    endConnection: "FLANGED",
    pressureRating: "150# / 300# / 600#",
    modeOfOperation: "Lever, Actuator",
    manufacturingStandard: "ISO 17292 / API 6D / API 608",
    testingStandard: "ISO 5208 / ISO 10497 / API 607",
    showcaseImages: [{ src: "/products/trunnion-mounted2-piece-design-flanged-ansi-150-300-600.jpg", alt: "2PC Trunnion Ball Valve" }]
  },
  "ball-valve/trunnion-mounted/3-piece-design-flanged-ansi-150-300-600": {
    title: "Trunnion Mounted",
    subTitle: "3 Piece Design Flanged ANSI 150#, 300#, 600#",
    category: "Ball Valve",
    subCategory: "Trunnion Mounted",
    size: "DN100 - DN300",
    material: "WCB / CF8 / CF8M / CF3 / CF3M",
    endConnection: "FLANGED",
    pressureRating: "150# / 300# / 600#",
    modeOfOperation: "Lever, Actuator",
    manufacturingStandard: "ISO 17292 / API 6D / API 608",
    testingStandard: "ISO 5208 / ISO 10497 / API 607",
    showcaseImages: [{ src: "/dummy-image.png", alt: "3PC Trunnion Ball Valve" }]
  },

  // Butterfly Valve - Centric Disc Design
  "butterfly-valve/centric-disc-design/wafer-semi-lugged-pn10-pn16-pn20-pn25": {
    title: "Centric Disc Design",
    subTitle: "Wafer Semi Lugged PN10# / PN16# / PN20# / PN25#",
    category: "Butterfly Valve",
    subCategory: "Centric Disc Design",
    size: "DN40 - DN1000",
    material: "CI / DI / WCB / CF8 / CF8M / CF3 / CF3M / DSS / SDS / AL. BR",
    seatLiner: "BUNA-N, EPDM, SILICON, VITON",
    endConnection: "Wafer to suit ANSI & ND flanges",
    pressureRating: "PN10# / PN16# / PN20# / PN25#",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "API 609 (Cat.A)",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/butterfly-valve-wafer-semi-lugged-1.jpg", alt: "Wafer Semi Lugged BFV" }]
  },
  "butterfly-valve/centric-disc-design/full-lugged-pn10-pn16-pn20-pn25": {
    title: "Centric Disc Design",
    subTitle: "Full Lugged PN10# / PN16# / PN20# / PN25#",
    category: "Butterfly Valve",
    subCategory: "Centric Disc Design",
    size: "DN40 - DN1000",
    material: "CI / DI / WCB / CF8 / CF8M / CF3 / CF3M / DSS / SDS / AL. BR",
    seatLiner: "BUNA-N, EPDM, SILICON, VITON",
    endConnection: "Lugged to suit ANSI & ND flanges",
    pressureRating: "PN10# / PN16# / PN20# / PN25#",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "API 609 (Cat.A)",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/centric-disc-designfull-lugged-pn10-pn16-pn20-pn25.jpg", alt: "Full Lugged BFV" }]
  },
  "butterfly-valve/centric-disc-design/wafer-flanged-pn10-pn16-pn20-pn25": {
    title: "Centric Disc Design",
    subTitle: "Wafer Flanged PN10# / PN16# / PN20# / PN25#",
    category: "Butterfly Valve",
    subCategory: "Centric Disc Design",
    size: "DN40 - DN1000",
    material: "CI / DI / WCB / CF8 / CF8M / CF3 / CF3M / DSS / SDS / AL. BR",
    seatLiner: "BUNA-N, EPDM, SILICON, VITON",
    endConnection: "Flanged to suit ANSI & ND flanges",
    pressureRating: "PN10# / PN16# / PN20# / PN25#",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "API 609 (Cat.A)",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/butterfly-valvecentric-disc-designwafer-flanged-pn10-pn16-pn20-pn25-1.jpg", alt: "Wafer Flanged BFV" }]
  },
  "butterfly-valve/centric-disc-design/double-flanged-pn10-pn16-pn20-pn25": {
    title: "Centric Disc Design",
    subTitle: "Double Flanged PN10# / PN16# / PN20# / PN25#",
    category: "Butterfly Valve",
    subCategory: "Centric Disc Design",
    size: "DN40 - DN1000",
    material: "CI / DI / WCB / CF8 / CF8M / CF3 / CF3M / DSS / SDS / AL. BR",
    seatLiner: "BUNA-N, EPDM, SILICON, VITON",
    endConnection: "Flanged",
    pressureRating: "PN10# / PN16# / PN20# / PN25#",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "API 609 (Cat.A)",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/butterfly-valvecentric-disc-designdouble-flanged-pn10-pn16-pn20-pn25-1.jpg", alt: "Double Flanged BFV" }]
  },

  // Butterfly Valve - Double Offset Design
  "butterfly-valve/double-offset-design/wafer-semi-lugged-150-300": {
    title: "Double Offset Design",
    subTitle: "Wafer Semi Lugged 150# / 300#",
    category: "Butterfly Valve",
    subCategory: "Double Offset Design",
    size: "DN40 - DN1000",
    material: "WCB / CF8 / CF8M / CF3 / CF3M / DSS / SDS / AL. BR",
    seat: "PTFE / CFT / GFT",
    endConnection: "Wafer to suit ANSI & ND flanges",
    pressureRating: "150# / 300#",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "API 609 (Cat.A)",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/butterfly-valvedouble-offset-designwafer-semi-lugged-150-300-1.jpg", alt: "Double Offset Wafer BFV" }]
  },
  "butterfly-valve/double-offset-design/full-lugged-150-300": {
    title: "Double Offset Design",
    subTitle: "Full Lugged 150# / 300#",
    category: "Butterfly Valve",
    subCategory: "Double Offset Design",
    size: "DN40 - DN1000",
    material: "WCB / CF8 / CF8M / CF3 / CF3M / DSS / SDS / AL. BR",
    seat: "PTFE / CFT / GFT",
    endConnection: "Lugged to suit ANSI & ND flanges",
    pressureRating: "150# / 300#",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "API 609 (Cat.A)",
    testingStandard: "API 598",
    showcaseImages: [{ src: "https://picsum.photos/seed/amco-double-offset/800/800", alt: "Double Offset Lugged BFV" }]
  },
  "butterfly-valve/double-offset-design/double-flanged-150-300": {
    title: "Double Offset Design",
    subTitle: "Double Flanged 150# / 300#",
    category: "Butterfly Valve",
    subCategory: "Double Offset Design",
    size: "DN40 - DN1000",
    material: "WCB / CF8 / CF8M / CF3 / CF3M / DSS / SDS / AL. BR",
    seat: "PTFE / CFT / GFT",
    endConnection: "Flanged to suit ANSI flanges",
    pressureRating: "150# / 300#",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "API 609 (Cat.A)",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/butterfly-valvedouble-offset-designdouble-flanged-150-300.jpg", alt: "Double Offset Flanged BFV" }]
  },

  // Gate Valve for Fire Fighting
  "gate-valve-for-fire-fighting/double-flanged-soft-seated-pn16": {
    title: "Fire Fighting Range",
    subTitle: "Double Flanged Soft seated Gate Valve",
    category: "Gate valve for fire fighting",
    subCategory: "Fire Fighting Range",
    size: "DN50 - DN400",
    material: "DI",
    seat: "PTFE",
    endConnection: "Flanged ANSI 150#",
    pressureRating: "PN16",
    modeOfOperation: "Bare shaft, Wheel, Gear box, Actuator",
    manufacturingStandard: "API 600",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/fire-fightingdouble-flanged-soft-seated-pn16-1.jpg", alt: "Fire Fighting Gate Valve" }]
  },

  // Dual Plate Check Valve
  "dual-plate-check-valve/wafer-type-resilient-seat-pn16": {
    title: "Check Valve Range",
    subTitle: "Wafer type Resilient seat PN16#",
    category: "Dual Plate Check Valve",
    subCategory: "Check Valve Range",
    size: "DN50 - DN800",
    material: "WCB / LCB / WC6 / WC9 / CF8 / CF8M / CF3 / CF3M / ALLOY STEEL / DUPLEX / SUPER DUPLEX / INCONEL / ALUMINIUM BRONZE",
    seat: "EPDM / VITON",
    endConnection: "Wafer to suit ANSI flanges",
    pressureRating: "PN16#",
    manufacturingStandard: "API 594",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/wafer-type-resilient-seat-pn16-1.jpg", alt: "Wafer Check Valve" }]
  },
  "dual-plate-check-valve/lugged-type-resilient-seat-pn16": {
    title: "Check Valve Range",
    subTitle: "Lugged type Resilient seat PN16#",
    category: "Dual Plate Check Valve",
    subCategory: "Check Valve Range",
    size: "DN50 - DN800",
    material: "WCB / LCB / WC6 / WC9 / CF8 / CF8M / CF3 / CF3M / ALLOY STEEL / DUPLEX / SUPER DUPLEX / INCONEL / ALUMINIUM BRONZE",
    seat: "EPDM / VITON",
    endConnection: "Lugged to suit ANSI flanges",
    pressureRating: "PN16#",
    manufacturingStandard: "API 594",
    testingStandard: "API 598"
  },
  "dual-plate-check-valve/flanged-type-resilient-seat-pn16": {
    title: "Check Valve Range",
    subTitle: "Flanged type Resilient seat PN16#",
    category: "Dual Plate Check Valve",
    subCategory: "Check Valve Range",
    size: "DN50 - DN800",
    material: "WCB / LCB / WC6 / WC9 / CF8 / CF8M / CF3 / CF3M / ALLOY STEEL / DUPLEX / SUPER DUPLEX / INCONEL / ALUMINIUM BRONZE",
    seat: "EPDM / VITON",
    endConnection: "Flanged to suit ANSI flanges",
    pressureRating: "PN16#",
    manufacturingStandard: "API 594",
    testingStandard: "API 598"
  },
  "dual-plate-check-valve/wafer-type-retainerless-metal-seat-150-300": {
    title: "Check Valve Range",
    subTitle: "Wafer type Retainerless Metal seat 150#, 300#",
    category: "Dual Plate Check Valve",
    subCategory: "Check Valve Range",
    size: "DN50 - DN800",
    material: "WCB / LCB / WC6 / WC9 / CF8 / CF8M / CF3 / CF3M / ALLOY STEEL / DUPLEX / SUPER DUPLEX / INCONEL / ALUMINIUM BRONZE",
    seat: "Metal to Metal",
    endConnection: "Wafer",
    pressureRating: "150# / 300#",
    manufacturingStandard: "API 594",
    testingStandard: "API 598"
  },
  "dual-plate-check-valve/lugged-type-retainerless-metal-seat-150-300": {
    title: "Check Valve Range",
    subTitle: "Lugged type Retainerless Metal seat 150#, 300#",
    category: "Dual Plate Check Valve",
    subCategory: "Check Valve Range",
    size: "DN50 - DN800",
    material: "WCB / LCB / WC6 / WC9 / CF8 / CF8M / CF3 / CF3M / ALLOY STEEL / DUPLEX / SUPER DUPLEX / INCONEL / ALUMINIUM BRONZE",
    seat: "Metal to Metal",
    endConnection: "Lugged",
    pressureRating: "150# / 300#",
    manufacturingStandard: "API 594",
    testingStandard: "API 598"
  },
  "dual-plate-check-valve/flanged-type-retainerless-metal-seat-150-300": {
    title: "Check Valve Range",
    subTitle: "Flanged type Retainerless Metal 150#, 300#",
    category: "Dual Plate Check Valve",
    subCategory: "Check Valve Range",
    size: "DN50 - DN800",
    material: "WCB / LCB / WC6 / WC9 / CF8 / CF8M / CF3 / CF3M / ALLOY STEEL / DUPLEX / SUPER DUPLEX / INCONEL / ALUMINIUM BRONZE",
    seat: "Metal to Metal",
    endConnection: "Flanged",
    pressureRating: "150# / 300#",
    manufacturingStandard: "API 594",
    testingStandard: "API 598"
  },

  // Damper Valve
  "damper-valve/wafer-type-seatless-design": {
    title: "Damper Valve",
    subTitle: "Wafer type Damper valve - seatless design",
    category: "Damper Valve",
    subCategory: "Seatless Design",
    size: "DN50 - DN1000",
    material: "CS / WCB / CF8 / CF8M / CF3 / CF3M / DUPLEX / SUPER DUPLEX / ALLOY STEEL",
    endConnection: "Wafer to suit ANSI / ND Flanges",
    pressureRating: "0.5 bar (max)",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "Manufacturer / API 609",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/damper-valvewafer-type-seatless-design-1.jpg", alt: "Wafer Damper Valve" }]
  },
  "damper-valve/flanged-type-seatless-design": {
    title: "Damper Valve",
    subTitle: "Flanged type Damper valve - seatless design",
    category: "Damper Valve",
    subCategory: "Seatless Design",
    size: "DN50 - DN1000",
    material: "CS / WCB / CF8 / CF8M / CF3 / CF3M / DUPLEX / SUPER DUPLEX / ALLOY STEEL",
    endConnection: "Flanged to suit ANSI / ND Flanges",
    pressureRating: "0.5 bar (max)",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "Manufacturer / API 609",
    testingStandard: "API 598"
  },

  // Diaphragm Valve
  "diaphragm-valve/unlined-and-lined": {
    title: "Unlined and Lined",
    subTitle: "Unlined and Lined",
    category: "Diaphragm Valve",
    subCategory: "Unlined and Lined",
    size: "DN15 - DN150",
    material: "CI / DI / CS / SS",
    lining: "Unlined / Natural Rubber Lined / Ebonite Lined",
    diaphragm: "EPDM / Neoprene",
    endConnection: "Flanged ANSI 150#",
    pressureRating: "PN16",
    modeOfOperation: "Wheel",
    manufacturingStandard: "BS 5156",
    testingStandard: "API 6755 Part I",
    showcaseImages: [{ src: "/products/diaphragm-valveunlined-and-lined-1.jpg", alt: "Diaphragm Valve" }]
  },

  // High Pressure Valves
  "high-pressure-ball-valve": {
    title: "High Pressure Valve",
    subTitle: "High Pressure Ball Valve",
    category: "High Pressure Valve",
    subCategory: "High Pressure Range",
    size: "DN06 - DN50",
    material: "CS / SS / Alloy steel / Duplex SS",
    endConnection: "BSPF / NPTF / SW (extended nipple)",
    pressureRating: "3000 PSI / 6000 PSI",
    modeOfOperation: "Lever, Actuator",
    manufacturingStandard: "ISO 17292 / API 608",
    testingStandard: "ISO 5208 / API 598",
    showcaseImages: [{ src: "/products/high-pressure-ball-valve-1.jpg", alt: "HP Ball Valve" }]
  },
  "high-pressure-in-line-check-valve": {
    title: "High Pressure Valve",
    subTitle: "High Pressure In-Line Check Valve",
    category: "High Pressure Valve",
    subCategory: "High Pressure Range",
    size: "DN06 - DN50",
    material: "CS / SS / Alloy steel / Duplex SS",
    endConnection: "BSPF / NPTF",
    pressureRating: "3000 PSI / 6000 PSI",
    manufacturingStandard: "Manufacturer Std",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/dummy-image.png", alt: "HP In-line Check Valve" }]
  },
  "high-pressure-needle-valve": {
    title: "High Pressure Valve",
    subTitle: "High Pressure Needle Valve",
    category: "High Pressure Valve",
    subCategory: "High Pressure Range",
    size: "DN06 - DN50",
    material: "CS / SS / Alloy Steel / Duplex SS",
    endConnection: "BSPF / NPTF / SW",
    pressureRating: "3000 PSI / 6000 PSI",
    modeOfOperation: "Lever",
    manufacturingStandard: "Manufacturer Standard",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/HP_needle_valve.jpg", alt: "HP Needle Valve" }]
  },

  // Lined Valves
  "ptfe-lined-ball-check-valve": {
    title: "PTFE Lined Ball Check Valve",
    subTitle: "PTFE Lined Ball Check Valve",
    category: "PFA / FEP Lined",
    subCategory: "Lined Valve Range",
    size: "DN15 - DN300",
    material: "WCB / CF8 / CF8M",
    lining: "PFA / FEP",
    endConnection: "Flanged",
    pressureRating: "150#",
    manufacturingStandard: "ASME B16.34",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/dummy-image.png", alt: "Lined Ball Check Valve" }]
  },
  "ptfe-lined-ball-valve": {
    title: "PFA / FEP Lined",
    subTitle: "PTFE Lined Ball Valve",
    category: "PFA / FEP Lined",
    subCategory: "Lined Valve Range",
    size: "DN15 - DN250",
    material: "WCB / CF8 / CF8M",
    lining: "PFA / FEP",
    endConnection: "Flanged",
    pressureRating: "150#",
    modeOfOperation: "Lever, Actuator",
    manufacturingStandard: "ISO 17292",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/dummy-image.png", alt: "Lined Ball Valve" }]
  },
  "ptfe-lined-butterfly-valve/wafer-centric-disc-design": {
    title: "Centric Disc Design",
    subTitle: "PTFE Lined Butterfly Valve Wafer Centric Disc Design",
    category: "PTFE Lined Butterfly Valve",
    subCategory: "Centric Disc Design",
    size: "DN50 - DN400",
    material: "CS / SS / Alloy steel",
    lining: "PFA / FEP",
    endConnection: "Wafer to suit ANSI 150# flanges",
    pressureRating: "PN10",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "API 609",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/butterfly-valve-wafer-semi-lugged-1.jpg", alt: "Wafer Semi Lugged BFV" }]
  },
  "ptfe-lined-butterfly-valve/wafer-full-lug-centric-disc-design": {
    title: "Centric Disc Design",
    subTitle: "PTFE Lined Butterfly Valve Wafer Centric Disc Design",
    category: "PTFE Lined Butterfly Valve",
    subCategory: "Centric Disc Design",
    size: "DN50 - DN400",
    material: "CS / SS / Alloy steel",
    lining: "PFA / FEP",
    endConnection: "Wafer to suit ANSI 150# flanges",
    pressureRating: "PN10",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "API 609",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/dummy-image.png", alt: "Lined Full Lug BFV" }]
  },
  "ptfe-lined-diaphragm-valve": {
    title: "PTFE Lined Diaphragm Valve",
    subTitle: "PTFE Lined Diaphragm Valve",
    category: "PFA / FEP Lined",
    subCategory: "Lined Valve Range",
    size: "DN25 - DN100",
    material: "DI / CS / SS",
    lining: "PFA / FEP",
    endConnection: "Flanged 150#",
    pressureRating: "PN10",
    modeOfOperation: "Wheel",
    manufacturingStandard: "BS EN 13397:2002",
    testingStandard: "BS EN 12266",
    showcaseImages: [{ src: "/dummy-image.png", alt: "Lined Diaphragm Valve" }]
  },
  "ptfe-lined-plug-valve/pfa-fep-lined": {
    title: "Plug Valve PFA/FEP Lined",
    subTitle: "Plug Valve PFA/FEP Lined",
    category: "FEP & PFA Lined Valves",
    subCategory: "Lined Valve Range",
    size: "DN15 - DN200",
    material: "WCB / CF8 / CF8M",
    lining: "PFA / FEP",
    endConnection: "Flanged",
    pressureRating: "150#",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "API 599",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/dummy-image.png", alt: "Lined Plug Valve" }]
  },
  "ptfe-lined-plug-valve/pfa-fep-lined-jacketed": {
    title: "Plug Valve PFA/FEP Jacketed",
    subTitle: "Plug Valve PFA/FEP Jacketed",
    category: "FEP & PFA Lined Valves",
    subCategory: "Lined Valve Range",
    size: "DN15 - DN200",
    material: "WCB / CF8 / CF8M",
    lining: "PFA / FEP",
    endConnection: "Flanged",
    pressureRating: "150#",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "API 599",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/dummy-image.png", alt: "Lined Jacketed Plug Valve" }]
  },
  "ptfe-lined-wafer-check-valve": {
    title: "PTFE Lined Wafer Check Valve",
    subTitle: "PTFE Lined Wafer Check Valve",
    category: "Lined Valves",
    subCategory: "Lined Valve Range",
    size: "DN50 - DN300",
    material: "CS / SS / Alloy steel",
    lining: "PFA / FEP",
    endConnection: "Wafer to suit ANSI 150# flanges",
    pressureRating: "PN10 / 16",
    manufacturingStandard: "Manufacturer Std",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/uni-directionalwafer-lugged-resilient-seat-pn10-1.jpg", alt: "Lined Wafer Check Valve" }]
  },

  // Sleeved Plug Valves
  "ptfe-sleeved-plug-valve/flanged": {
    title: "PTFE Sleeved Plug Valve",
    subTitle: "Flanged",
    category: "PTFE Sleeved Plug Valve",
    subCategory: "Plug Valve Range",
    size: "DN15 - DN300",
    material: "WCB / CF8 / CF8M / CF3 / CF3M",
    sleeve: "PTFE",
    endConnection: "Flanged",
    pressureRating: "150# / 300#",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "API 599",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/dummy-image.png", alt: "Sleeved Plug Valve" }]
  },
  "ptfe-sleeved-plug-valve/jacketed": {
    title: "PTFE Sleeved Plug Valve",
    subTitle: "Jacketed",
    category: "PTFE Sleeved Plug Valve",
    subCategory: "Plug Valve Range",
    size: "DN15 - DN300",
    material: "CS / SS / Alloy steel / Duplex SS / Inconel",
    sleeve: "PTFE",
    endConnection: "Flanged",
    pressureRating: "150# / 300#",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "API 599",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/dummy-image.png", alt: "Jacketed Plug Valve" }]
  },
  "ptfe-sleeved-plug-valve/screwed-socket-butt": {
    title: "PTFE Sleeved Plug Valve",
    subTitle: "Screwed / Socket / Butt",
    category: "PTFE Sleeved Plug Valve",
    subCategory: "Plug Valve Range",
    size: "DN15 - DN50",
    material: "WCB / CF8 / CF8M / CF3 / CF3M",
    sleeve: "PTFE",
    endConnection: "Screwed / Socket / Butt",
    pressureRating: "800#",
    modeOfOperation: "Lever",
    manufacturingStandard: "API 599",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/dummy-image.png", alt: "Screwed Sleeved Plug Valve" }]
  },

  // PTFE Seated Butterfly Valves
  "ptfe-seated-butterfly-valve/wafer-centric-disc-design": {
    title: "PTFE Seated Butterfly Valve",
    subTitle: "Wafer Centric Disc Design",
    category: "PTFE Seated Butterfly Valve",
    subCategory: "Centric Disc Design",
    size: "DN50 - DN400",
    material: "CI / DI / WCB / CF8 / CF8M",
    seat: "PTFE",
    endConnection: "Wafer",
    pressureRating: "PN10 / PN16 / 150#",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "API 609",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/dummy-image.png", alt: "PTFE Seated Wafer BFV" }]
  },
  "ptfe-seated-butterfly-valve/wafer-full-lug-centric-disc-design": {
    title: "PTFE Seated Butterfly Valve",
    subTitle: "Wafer Full Lug Type",
    category: "PTFE Seated Butterfly Valve",
    subCategory: "Centric Disc Design",
    size: "DN50 - DN400",
    material: "CI / DI / WCB / CF8 / CF8M",
    seat: "PTFE",
    endConnection: "Wafer Full Lug",
    pressureRating: "PN10 / PN16 / 150#",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "API 609",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/dummy-image.png", alt: "PTFE Seated Full Lug BFV" }]
  },

  // Wafer Check Valves
  "wafer-check-valve/resilient-seat": {
    title: "Wafer type check valve Resilient seat",
    subTitle: "Wafer type check valve Resilient seat",
    category: "Wafer Check Valve",
    subCategory: "Wafer Check Range",
    size: "DN25 - DN900",
    material: "CI / DI / CS / SS",
    oRings: "Nitrial / EPDM / Viton / Silicone",
    endConnection: "Wafer",
    pressureRating: "PN10 / PN16 / 150#",
    manufacturingStandard: "API 6D",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/wafer-check-valveresilient-seat-1.jpg", alt: "Wafer Check Valve Resilient Seat" }]
  },
  "wafer-check-valve/metal-seat": {
    title: "Wafer type check valve Metal seat",
    subTitle: "Wafer type check valve Metal seat",
    category: "Wafer Check Valve",
    subCategory: "Wafer Check Range",
    size: "DN25 - DN900",
    material: "CI / DI / CS / SS",
    endConnection: "Wafer",
    pressureRating: "PN10 / PN16 / 150#",
    manufacturingStandard: "API 6D",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/wafer-type-check-valve-metal-seat-1.jpg", alt: "Wafer Check Valve Metal Seat" }]
  },
  "wafer-check-valve/resilient-seat-spring-type": {
    title: "Wafer type check valve Resilient seat - Spring type",
    subTitle: "Wafer type check valve Resilient seat - Spring type",
    category: "Wafer Check Valve",
    subCategory: "Wafer Check Range",
    size: "DN25 - DN900",
    material: "CI / DI / CS / SS",
    endConnection: "Wafer",
    pressureRating: "PN10 / PN16 / 150#",
    manufacturingStandard: "API 6D",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/wafer-type-check-valve-resilient-seat-spring-type.jpg", alt: "Wafer Check Valve Spring Type" }]
  },

  // Strainers
  "strainer/y-strainer-flanged": {
    title: "Y Strainer - Flanged",
    subTitle: "Y Strainer - Flanged",
    category: "Strainer",
    subCategory: "Strainer Range",
    size: "DN25 - DN400",
    material: "CI / DI / CS / SS / WCB / CF8 / CF8M / CF3 / CF3M / DUPLEX / SUPER DUPLEX / ALUMINIUM BRONZE",
    mesh: "All sizes available",
    endConnection: "Flanged to ANSI 150# / 300#",
    pressureRating: "PN10 / PN16 / 150# / 300#",
    manufacturingStandard: "ASME B16.34",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/y-strainer-flanged-1.jpg", alt: "Y Strainer Flanged" }]
  },
  "strainer/y-strainer-screwed": {
    title: "Y Strainer - Screwed",
    subTitle: "Y Strainer - Screwed",
    category: "Strainer",
    subCategory: "Strainer Range",
    size: "DN15 - DN50",
    material: "CF8 / CF8M / CF3 / CF3M / DUPLEX / SUPER DUPLEX / ALLOY STEEL",
    mesh: "All sizes available",
    endConnection: "Screwed",
    pressureRating: "PN40",
    manufacturingStandard: "ASME B16.34",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/y-strainer-screwed-1.jpeg", alt: "Y Strainer Screwed" }]
  },
  "strainer/basket-strainer-flanged": {
    title: "Basket Strainer - Flanged",
    subTitle: "Basket Strainer - Flanged",
    category: "Strainer",
    subCategory: "Basket Design",
    size: "DN50 - DN600",
    material: "CS / SS / DUPLEX / SUPER DUPLEX / ALUMINIUM BRONZE",
    mesh: "All sizes available",
    endConnection: "Flanged ANSI 150# / 300# / 600#",
    pressureRating: "150# / 300# / 600#",
    modeOfOperation: "",
    manufacturingStandard: "ASME B16.34",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/basket-strainer-flanged-1.jpg", alt: "Basket Strainer" }]
  },

  // IBR Valves
  "ibr-valves/small-bore-forged-gate-valve": {
    title: "Small Bore Forged IBR & Non IBR Gate Valve",
    subTitle: "Small Bore Forged IBR & Non IBR Gate Valve",
    category: "IBR & Non IBR Valves",
    subCategory: "Small Bore Forged",
    size: "DN15 - DN50",
    material: "A105 / F304/L / F316/L / F11 / F22",
    endConnection: "Screwed / Socket weld / Butt weld / Flanged",
    pressureRating: "150#, 300#, 600#, 800#, 1500#, 2500#",
    modeOfOperation: "Wheel",
    manufacturingStandard: "API 602",
    testingStandard: "API 598",
    showcaseImages: [
      { src: "/products/small-bore-forged-gate-valve-1.jpg", alt: "Small Bore Forged Gate Valve View 1" },
      { src: "/products/small-bore-forged-gate-valve-2.jpg", alt: "Small Bore Forged Gate Valve View 2" }
    ]
  },
  "ibr-valves/small-bore-forged-globe-valve": {
    title: "Small Bore Forged IBR & Non IBR Globe Valve",
    subTitle: "Small Bore Forged IBR & Non IBR Globe Valve",
    category: "IBR & Non IBR Valves",
    subCategory: "Small Bore Forged",
    size: "DN15 - DN50",
    material: "A105 / F304/L / F316/L / F11 / F22",
    endConnection: "Screwed / Socket weld / CB / BW",
    pressureRating: "150#, 300#, 600#, 800#, 1500#, 2500#",
    modeOfOperation: "Wheel",
    manufacturingStandard: "API 602",
    testingStandard: "API 598",
    showcaseImages: [
      { src: "/products/small-bore-forged-globe-valve-1.jpg", alt: "Small Bore Forged Globe Valve View 1" },
      { src: "/products/small-bore-forged-globe-valve-2.jpg", alt: "Small Bore Forged Globe Valve View 2" }
    ]
  },
  "ibr-valves/small-bore-forged-lift-check-valve": {
    title: "Small Bore Forged IBR & Non IBR Lift check Valve",
    subTitle: "Small Bore Forged IBR & Non IBR Lift check Valve",
    category: "IBR & Non IBR Valves",
    subCategory: "Small Bore Forged",
    size: "DN15 - DN50",
    material: "A105 / F304/L / F316/L / F11 / F22",
    endConnection: "Screwed / Socket weld / Butt weld / Flanged",
    pressureRating: "150#, 300#, 600#, 800#, 1500#, 2500#",
    manufacturingStandard: "API 602",
    testingStandard: "API 598",
    showcaseImages: [
      { src: "/products/small-bore-forged-lift-check-valve-1.jpg", alt: "Small Bore Forged Lift Check Valve View 1" },
      { src: "/products/small-bore-forged-lift-check-valve-2.jpg", alt: "Small Bore Forged Lift Check Valve View 2" }
    ]
  },
  "ibr-valves/large-bore-cast-gate-valve": {
    title: "Large Bore Cast IBR & Non IBR Gate Valve",
    subTitle: "Large Bore Cast IBR & Non IBR Gate Valve",
    category: "IBR & Non IBR Valves",
    subCategory: "Large Bore Cast",
    size: "DN50 - DN800",
    material: "WCB / LCB / WC6 / WC9 / CF8 / CF8M / CF3 / CF3M / ALLOY STEEL / DUPLEX / SUPER DUPLEX / INCONEL / ALUMINIUM BRONZE",
    endConnection: "Flanged / Butt weld",
    pressureRating: "150#, 300#, 600#",
    modeOfOperation: "Wheel / Electric",
    manufacturingStandard: "API 600",
    testingStandard: "API 598",
    showcaseImages: [
      { src: "/products/ibr-valveslarge-bore-cast-gate-valve-1.jpg", alt: "Large Bore Cast Gate Valve View 1" },
      { src: "/products/ibr-valveslarge-bore-cast-gate-valve-2.jpg", alt: "Large Bore Cast Gate Valve View 2" },
      { src: "/products/ibr-valveslarge-bore-cast-gate-valve-3.jpg", alt: "Large Bore Cast Gate Valve View 3" }
    ]
  },
  "ibr-valves/large-bore-cast-globe-valve": {
    title: "Large Bore Cast IBR & Non IBR Globe Valve",
    subTitle: "Large Bore Cast IBR & Non IBR Globe Valve",
    category: "IBR & Non IBR Valves",
    subCategory: "Large Bore Cast",
    size: "DN50 - DN600",
    material: "WCB / LCB / WC6 / WC9 / CF8 / CF8M / CF3 / CF3M / ALLOY STEEL / DUPLEX / SUPER DUPLEX / INCONEL / ALUMINIUM BRONZE",
    endConnection: "Flanged / Butt weld",
    pressureRating: "150#, 300#, 600#",
    modeOfOperation: "Wheel / Electric",
    manufacturingStandard: "API 623",
    testingStandard: "API 598",
    showcaseImages: [
      { src: "/products/large-bore-cast-globe-valve-1.jpg", alt: "Large Bore Cast Globe Valve View 1" },
      { src: "/products/large-bore-cast-globe-valve-2.jpg", alt: "Large Bore Cast Globe Valve View 2" },
      { src: "/products/large-bore-cast-globe-valve-3.jpg", alt: "Large Bore Cast Globe Valve View 3" }
    ]
  },
  "ibr-valves/large-bore-cast-swing-check-valve": {
    title: "Large Bore Cast IBR & Non IBR Swing Check Valve",
    subTitle: "Large Bore Cast IBR & Non IBR Swing Check Valve",
    category: "IBR & Non IBR Valves",
    subCategory: "Large Bore Cast",
    size: "DN50 - DN600",
    material: "WCB / LCB / WC6 / WC9 / CF8 / CF8M / CF3 / CF3M / ALLOY STEEL / DUPLEX / SUPER DUPLEX / INCONEL / ALUMINIUM BRONZE",
    endConnection: "Flanged / Butt weld",
    pressureRating: "150#, 300#, 600#",
    modeOfOperation: "Automatic",
    manufacturingStandard: "API 600",
    testingStandard: "API 598",
    showcaseImages: [
      { src: "/products/large-bore-cast-swing-check-valve-1.jpg", alt: "Large Bore Cast Swing Check Valve View 1" },
      { src: "/products/large-bore-cast-swing-check-valve-2.jpg", alt: "Large Bore Cast Swing Check Valve View 2" },
      { src: "/products/large-bore-cast-swing-check-valve-3.jpg", alt: "Large Bore Cast Swing Check Valve View 3" }
    ]
  }
};
