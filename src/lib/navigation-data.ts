export interface ProductItem {
  name: string;
  href: string;
}

export interface SubCategory {
  name: string;
  products: ProductItem[];
}

export interface MegaMenuCategory {
  title: string;
  subCategories: SubCategory[];
}

/**
 * productNavigationData is now a 2D array: MegaMenuCategory[][]
 * Each top-level array element represents a column in the mega menu.
 */
export const productNavigationData: MegaMenuCategory[][] = [
  [
    {
      title: "Knife Edge Gate Valve",
      subCategories: [
        {
          name: "Uni Directional",
          products: [
            { name: "Wafer Lugged Resilient seat PN10#", href: "/products/knife-edge-gate-valve/uni-directional/wafer-lugged-resilient-seat-pn10" },
            { name: "Wafer Lugged Metal seat PN10#", href: "/products/knife-edge-gate-valve/uni-directional/wafer-lugged-metal-seat-pn10" },
            { name: "Flanged Resilient seat PN10#", href: "/products/knife-edge-gate-valve/uni-directional/flanged-resilient-seat-pn10" },
            { name: "Flanged Metal seat PN10#", href: "/products/knife-edge-gate-valve/uni-directional/flanged-metal-seat-pn10" }
          ]
        },
        {
          name: "Bi Directional",
          products: [
            { name: "Wafer Lugged Resilient seat PN10#", href: "/products/knife-edge-gate-valve/bi-directional/wafer-lugged-resilient-seat-pn10" },
            { name: "Flanged Resilient seat PN10#", href: "/products/knife-edge-gate-valve/bi-directional/flanged-resilient-seat-pn10" },
            { name: "2 piece design Wafer Lugged Resilient seat PN10#", href: "/products/knife-edge-gate-valve/bi-directional/wafer-lugged-resilient-seat-pn10-two-piece-design" },
            { name: "2 piece design Flanged Resilient seat PN10#", href: "/products/knife-edge-gate-valve/bi-directional/flanged-resilient-seat-pn10-two-piece-design" }
          ]
        }
      ]
    },
    {
      title: "Dual Plate Check Valve",
      subCategories: [
        {
          name: "Check Valve Range",
          products: [
            { name: "Wafer type Resilient seat PN16#", href: "/products/dual-plate-check-valve/wafer-type-resilient-seat-pn16" },
            { name: "Lugged type Resilient seat PN16#", href: "/products/dual-plate-check-valve/lugged-type-resilient-seat-pn16" },
            { name: "Flanged type Resilient seat PN16#", href: "/products/dual-plate-check-valve/flanged-type-resilient-seat-pn16" },
            { name: "Wafer type Retainerless Metal seat 150#, 300#", href: "/products/dual-plate-check-valve/wafer-type-retainerless-metal-seat-150-300" },
            { name: "Lugged type Retainerless Metal seat 150#, 300#", href: "/products/dual-plate-check-valve/lugged-type-retainerless-metal-seat-150-300" },
            { name: "Flanged type Retainerless Metal 150#, 300#", href: "/products/dual-plate-check-valve/flanged-type-retainerless-metal-seat-150-300" }
          ]
        }
      ]
    }
  ],
  [
    {
      title: "Butterfly Valve",
      subCategories: [
        {
          name: "Centric Disc Design",
          products: [
            { name: "Wafer Semi Lugged PN10# / PN16# / PN20# / PN25#", href: "/products/butterfly-valve/centric-disc-design/wafer-semi-lugged-pn10-pn16-pn20-pn25" },
            { name: "Full Lugged PN10# / PN16# / PN20# / PN25#", href: "/products/butterfly-valve/centric-disc-design/full-lugged-pn10-pn16-pn20-pn25" },
            { name: "Wafer Flanged PN10# / PN16# / PN20# / PN25#", href: "/products/butterfly-valve/centric-disc-design/wafer-flanged-pn10-pn16-pn20-pn25" },
            { name: "Double Flanged PN10# / PN16# / PN20# / PN25#", href: "/products/butterfly-valve/centric-disc-design/double-flanged-pn10-pn16-pn20-pn25" }
          ]
        },
        {
          name: "Double Offset Design",
          products: [
            { name: "Wafer Semi Lugged 150# / 300#", href: "/products/butterfly-valve/double-offset-design/wafer-semi-lugged-150-300" },
            { name: "Full Lugged 150# / 300#", href: "/products/butterfly-valve/double-offset-design/full-lugged-150-300" },
            { name: "Double Flanged 150# / 300#", href: "/products/butterfly-valve/double-offset-design/double-flanged-150-300" }
          ]
        }
      ]
    },
    {
      title: "Wafer Check Valve",
      subCategories: [
        {
          name: "Wafer Check Range",
          products: [
            { name: "Wafer type check valve Resilient seat", href: "/products/wafer-check-valve/resilient-seat" },
            { name: "Wafer type check valve Metal seat", href: "/products/wafer-check-valve/metal-seat" },
            { name: "Wafer type check valve Resilient seat - Spring type", href: "/products/wafer-check-valve/resilient-seat-spring-type" }
          ]
        }
      ]
    },
    {
      title: "High Pressure Valve",
      subCategories: [
        {
          name: "High Pressure Range",
          products: [
            { name: "High Pressure Ball Valve", href: "/products/high-pressure-ball-valve" },
            { name: "High Pressure In-Line Check Valve", href: "/products/high-pressure-in-line-check-valve" },
            { name: "High Pressure Needle Valve", href: "/products/high-pressure-needle-valve" }
          ]
        }
      ]
    }
  ],
  [
    {
      title: "Ball Valve",
      subCategories: [
        {
          name: "Floating Design",
          products: [
            { name: "2 Piece Design screwed 1000 WOG", href: "/products/ball-valve/floating-design/2-piece-design-screwed-1000-wog" },
            { name: "3 Piece Design Screwed / Socket weld 150# & 300#", href: "/products/ball-valve/floating-design/3-piece-design-screwed-socket-weld-150-300" },
            { name: "3 Piece Design Screwed / Socket weld 600# & 800# & 1500#", href: "/products/ball-valve/floating-design/3-piece-design-screwed-socket-weld-600-800-1500" },
            { name: "3 Piece Design Flanged ANSI 150#, 300#, 600# & 900#", href: "/products/ball-valve/floating-design/3-piece-design-flanged-ansi-150-300-600-900" },
            { name: "2 Piece Design Flanged ANSI 150#, 300#, 600#", href: "/products/ball-valve/floating-design/2-piece-design-flanged-ansi-150-300-600" },
            { name: "Wafer Design Ball valve 150# / PN25 / PN40", href: "/products/ball-valve/floating-design/wafer-design-ball-valve-150-pn25-pn40" }
          ]
        },
        {
          name: "Trunnion Mounted",
          products: [
            { name: "2 Piece Design Flanged ANSI 150#, 300#, 600#", href: "/products/ball-valve/trunnion-mounted/2-piece-design-flanged-ansi-150-300-600" },
            { name: "3 Piece Design Flanged ANSI 150#, 300#, 600#", href: "/products/ball-valve/trunnion-mounted/3-piece-design-flanged-ansi-150-300-600" }
          ]
        }
      ]
    },
    {
      title: "Gate Valve for Fire Fighting",
      subCategories: [
        {
          name: "Fire Fighting Range",
          products: [
            { name: "Double Flanged Soft seated Gate Valve", href: "/products/gate-valve-for-fire-fighting/double-flanged-soft-seated-pn16" }
          ]
        }
      ]
    },
    {
      title: "Strainer",
      subCategories: [
        {
          name: "Strainer Range",
          products: [
            { name: "Y Strainer - Screwed", href: "/products/strainer/y-strainer-screwed" },
            { name: "Y Strainer - Flanged", href: "/products/strainer/y-strainer-flanged" },
            { name: "Basket Strainer - Flanged", href: "/products/strainer/basket-strainer-flanged" }
          ]
        }
      ]
    }
  ],
  [
    {
      title: "Piston Valve - Seatless & Glandless",
      subCategories: [
        {
          name: "Piston Valve Range",
          products: [
            { name: "Small bore Non IBR & IBR Piston Valve", href: "/products/piston-valve/small-bore-non-ibr-ibr" },
            { name: "Large bore Non IBR & IBR Piston Valve", href: "/products/piston-valve/large-bore-non-ibr-ibr" }
          ]
        }
      ]
    },
    {
      title: "Diaphragm Valve",
      subCategories: [
        {
          name: "Unlined and Lined",
          products: [
            { name: "Unlined and Lined", href: "/products/diaphragm-valve/unlined-and-lined" }
          ]
        }
      ]
    },
    {
      title: "FEP & PFA Lined Valves",
      subCategories: [
        {
          name: "Lined Valve Range",
          products: [
            { name: "Ball Check Valve (PFA/FEP Lined)", href: "/products/ptfe-lined-ball-check-valve" },
            { name: "Ball Valve (PFA/FEP Lined)", href: "/products/ptfe-lined-ball-valve" },
            { name: "Butterfly Valve Wafer (PFA/FEP Lined)", href: "/products/ptfe-lined-butterfly-valve/wafer-centric-disc-design" },
            { name: "Butterfly Valve Wafer Full Lug (PFA/FEP Lined)", href: "/products/ptfe-lined-butterfly-valve/wafer-full-lug-centric-disc-design" },
            { name: "Diaphragm Valve (PFA/FEP Lined)", href: "/products/ptfe-lined-diaphragm-valve" },
            { name: "Plug Valve PFA/FEP Lined", href: "/products/ptfe-lined-plug-valve/pfa-fep-lined" },
            { name: "Plug Valve PFA/FEP Jacketed", href: "/products/ptfe-lined-plug-valve/pfa-fep-lined-jacketed" },
            { name: "Wafer Check Valve (PFA/FEP Lined)", href: "/products/ptfe-lined-wafer-check-valve" }
          ]
        }
      ]
    },
    {
      title: "Damper Valve",
      subCategories: [
        {
          name: "Seatless Design",
          products: [
            { name: "Wafer type Damper valve", href: "/products/damper-valve/wafer-type-seatless-design" },
            { name: "Flanged type Damper valve", href: "/products/damper-valve/flanged-type-seatless-design" }
          ]
        }
      ]
    }
  ],
  [
    {
      title: "IBR & Non IBR Small & Large Bore",
      subCategories: [
        {
          name: "Valve Range",
          products: [
            { name: "IBR & Non IBR Gate Valve 800#, 1500#, 2500#", href: "/products/ibr-valves/small-bore-forged-gate-valve" },
            { name: "IBR & Non IBR Globe Valve 800#, 1500#, 2500#", href: "/products/ibr-valves/small-bore-forged-globe-valve" },
            { name: "IBR & Non IBR Lift check Valve 800#, 1500#, 2500#", href: "/products/ibr-valves/small-bore-forged-lift-check-valve" },
            { name: "IBR & Non IBR Gate Valve 150#, 300#, 600#", href: "/products/ibr-valves/large-bore-cast-gate-valve" },
            { name: "IBR & Non IBR Globe Valve 150#, 300#, 600#", href: "/products/ibr-valves/large-bore-cast-globe-valve" },
            { name: "IBR & Non IBR Swing check Valve 150#, 300#, 600#", href: "/products/ibr-valves/large-bore-cast-swing-check-valve" }
          ]
        }
      ]
    }
  ],
  [
    {
      title: "PTFE Sleeved Plug Valve",
      subCategories: [
        {
          name: "Plug Valve Range",
          products: [
            { name: "Flanged", href: "/products/ptfe-sleeved-plug-valve/flanged" },
            { name: "Jacketed", href: "/products/ptfe-sleeved-plug-valve/jacketed" },
            { name: "Screwed / Socket / Butt", href: "/products/ptfe-sleeved-plug-valve/screwed-socket-butt" }
          ]
        }
      ]
    },
    {
      title: "PTFE Seated Butterfly Valve",
      subCategories: [
        {
          name: "Centric Disc Design",
          products: [
            { name: "Wafer Centric Disc Design", href: "/products/ptfe-seated-butterfly-valve/wafer-centric-disc-design" },
            { name: "Wafer Full Lug Type", href: "/products/ptfe-seated-butterfly-valve/wafer-full-lug-centric-disc-design" }
          ]
        }
      ]
    }
  ]
];
