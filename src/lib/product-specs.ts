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
    title: "Piston Valve - Seatless & Glandless",
    subTitle: "Small bore Non IBR & IBR Piston Valve",
    category: "Piston Valve - Seatless & Glandless",
    subCategory: "Small bore",
    size: "DN15 - DN50",
    material: "A105 / F304/L / F316/L",
    endConnection: "Screwed / Socket weld",
    pressureRating: "800#",
    modeOfOperation: "Wheel",
    manufacturingStandard: "API 602",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/piston-valvesmall-bore-non-ibr-ibr.jpg", alt: "Small Bore Piston Valve" }]
  },
  "piston-valve/large-bore-non-ibr-ibr": {
    title: "Piston Valve - Seatless & Glandless",
    subTitle: "Large bore Non IBR & IBR Piston Valve",
    category: "Piston Valve - Seatless & Glandless",
    subCategory: "Large bore",
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
    category: "Ball valve",
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
    category: "Ball valve",
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
    category: "Ball valve",
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
    category: "Ball valve",
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
    category: "Ball valve",
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
    category: "Ball valve",
    subCategory: "Floating Design",
    size: "DN50 - DN150",
    material: "WCB / CF8 / CF8M / CF3 / CF3M",
    endConnection: "Wafer to suit ANSI / ND flanges",
    pressureRating: "150# / PN25 / PN40",
    modeOfOperation: "Lever, Actuator",
    manufacturingStandard: "ISO 17292",
    testingStandard: "ISO 5208",
    showcaseImages: [{ src: "/Amco-Banner.png", alt: "Wafer Design Ball Valve" }]
  },

  // Ball Valve - Trunnion Mounted
  "ball-valve/trunnion-mounted/2-piece-design-flanged-ansi-150-300-600": {
    title: "Trunnion Mounted",
    subTitle: "2 Piece Design Flanged ANSI 150#, 300#, 600#",
    category: "Ball valve",
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
    category: "Ball valve",
    subCategory: "Trunnion Mounted",
    size: "DN100 - DN300",
    material: "WCB / CF8 / CF8M / CF3 / CF3M",
    endConnection: "FLANGED",
    pressureRating: "150# / 300# / 600#",
    modeOfOperation: "Lever, Actuator",
    manufacturingStandard: "ISO 17292 / API 6D / API 608",
    testingStandard: "ISO 5208 / ISO 10497 / API 607",
    showcaseImages: [{ src: "/products/trunnion-mounted3-piece-design-flanged-ansi-150-300-600.jpg", alt: "3PC Trunnion Ball Valve" }]
  },

  // Butterfly Valve - Centric Disc Design
  "butterfly-valve/centric-disc-design/wafer-semi-lugged-pn10-pn16-pn20-pn25": {
    title: "Centric Disc Design",
    subTitle: "Wafer Semi Lugged PN10# / PN16# / PN20# / PN25#",
    category: "Butterfly valve",
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
    category: "Butterfly valve",
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
    category: "Butterfly valve",
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
    category: "Butterfly valve",
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
    category: "Butterfly valve",
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
    category: "Butterfly valve",
    subCategory: "Double Offset Design",
    size: "DN40 - DN1000",
    material: "WCB / CF8 / CF8M / CF3 / CF3M / DSS / SDS / AL. BR",
    seat: "PTFE / CFT / GFT",
    endConnection: "Lugged to suit ANSI & ND flanges",
    pressureRating: "150# / 300#",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "API 609 (Cat.A)",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/Amco-Banner.png", alt: "Double Offset Lugged BFV" }]
  },
  "butterfly-valve/double-offset-design/double-flanged-150-300": {
    title: "Double Offset Design",
    subTitle: "Double Flanged 150# / 300#",
    category: "Butterfly valve",
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
    subTitle: "Double Flanged Soft seated Gate Valve for fire fighting application",
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
    subTitle: "Wafer type Resilient seat",
    category: "Dual plate check valve",
    subCategory: "Check Valve Range",
    size: "DN50 - DN800",
    material: "WCB / CF8 / CF8M / CF3 / CF3M / DUPLEX / SUPER DUPLEX / ALUMINIUM BRONZE / ALLOY STEEL",
    seat: "EPDM / VITON",
    endConnection: "Wafer to suit ANSI flanges",
    pressureRating: "150#",
    modeOfOperation: "Automatic",
    manufacturingStandard: "API 594",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/wafer-type-resilient-seat-pn16-1.jpg", alt: "Wafer Check Valve" }]
  },
  "dual-plate-check-valve/lugged-type-resilient-seat-pn16": {
    title: "Check Valve Range",
    subTitle: "Lugged type Resilient seat",
    category: "Dual plate check valve",
    subCategory: "Check Valve Range",
    size: "DN50 - DN800",
    material: "WCB / CF8 / CF8M / CF3 / CF3M / DUPLEX / SUPER DUPLEX / ALUMINIUM BRONZE / ALLOY STEEL",
    seat: "EPDM / VITON",
    endConnection: "Wafer Lugged to suit ANSI flanges",
    pressureRating: "150#",
    modeOfOperation: "Automatic",
    manufacturingStandard: "API 594",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/wafer-type-resilient-seat-pn16-1.jpg", alt: "Lugged Check Valve" }]
  },

  // Damper Valve
  "damper-valve/wafer-type-seatless-design": {
    title: "Damper valve",
    subTitle: "Wafer type Damper valve - seatless design",
    category: "Damper valve",
    subCategory: "Wafer type",
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
    title: "Damper valve",
    subTitle: "Flanged type Damper valve - seatless design",
    category: "Damper valve",
    subCategory: "Flanged type",
    size: "DN50 - DN1000",
    material: "CS / WCB / CF8 / CF8M / CF3 / CF3M / DUPLEX / SUPER DUPLEX / ALLOY STEEL",
    endConnection: "Flanged to suit ANSI / ND Flanges",
    pressureRating: "0.5 bar (max)",
    modeOfOperation: "Lever, Gear, Actuator",
    manufacturingStandard: "Manufacturer / API 609",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/Amco-Banner.png", alt: "Flanged Damper Valve" }]
  },

  // Knife Edge Gate Valve - Uni Directional
  "knife-edge-gate-valve/uni-directional/wafer-lugged-resilient-seat-pn10": {
    title: "Uni Directional",
    subTitle: "Wafer Lugged Resilient seat PN10#",
    category: "Knife Edge Gate Valve",
    subCategory: "Uni Directional",
    size: "DN50 - DN1000",
    material: "WCB / CF8 / CF8M / CF3 / CF3M / DSS / SDS",
    seat: "PTFE / EPDM / VITON",
    endConnection: "Wafer Lugged to suit ANSI flanges",
    pressureRating: "PN10#",
    modeOfOperation: "Wheel, Gear, Actuator",
    manufacturingStandard: "MSS SP 81",
    testingStandard: "MSS SP 81",
    showcaseImages: [{ src: "/products/uni-directionalwafer-lugged-resilient-seat-pn10-1.jpg", alt: "Uni-Directional KGV" }]
  },

  // Diaphragm Valve
  "diaphragm-valve/unlined-and-lined": {
    title: "Diaphragm Valve - Unlined and Lined",
    subTitle: "Diaphragm Valve - Unlined and Lined",
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

  // High Pressure Ball Valve
  "high-pressure-ball-valve": {
    title: "High Pressure Ball Valve",
    subTitle: "High Pressure Ball Valve",
    category: "High Pressure Ball Valve",
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

  // Strainer
  "strainer/y-strainer-flanged": {
    title: "Strainer",
    subTitle: "Y Strainer - Flanged",
    category: "Strainer",
    subCategory: "Y Strainer - Flanged",
    size: "DN25 - DN400",
    material: "CI / DI / CS / SS / WCB / CF8 / CF8M / CF3 / CF3M / DUPLEX / SUPER DUPLEX / ALUMINIUM BRONZE",
    mesh: "All sizes available",
    endConnection: "Flanged to ANSI 150# / 300#",
    pressureRating: "PN10 / PN16 / 150# / 300#",
    manufacturingStandard: "ASME B16.34",
    testingStandard: "API 598",
    showcaseImages: [{ src: "/products/y-strainer-flanged-1.jpg", alt: "Y Strainer Flanged" }]
  }
};
