import { getRestDoc } from "@/lib/firestore-rest";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { mergeWithDefaults } from "@/lib/content-merge";
import { button, type ButtonContent } from "@/lib/buttons";

/**
 * Editable content for the home page.
 *
 * `defaultHomeContent` holds the original site text. Anything saved from the
 * admin dashboard (Firestore doc `siteContent/home`) is merged on top of it, so
 * if nothing is saved, or the read fails, the site renders exactly as before.
 */

export const HOME_CONTENT_COLLECTION = "siteContent";
export const HOME_CONTENT_DOC = "home";
export const HOME_CONTENT_TAG = "home-content";

export interface HeroStat {
  end: number;
  label: string;
}

export interface ProductItem {
  id: string;
  title: string;
  specs: string;
  features: string[];
}

export interface FeatureTile {
  title: string;
  desc: string;
}

export interface CertificateLogo {
  id: string;
  /** A site path: a file in /public (original logos) or /api/blog-images/<id> (uploaded). */
  src: string;
  alt: string;
  hint: string;
}

/** The original certificate logos, in their original order. */
const defaultCertificateLogos: CertificateLogo[] = [
  "cert-iso",
  "cert-iso-2015",
  "cert-iso-alt",
  "cert-tuv",
  "cert-tata",
  "cert-sgs",
].flatMap((id) => {
  const img = PlaceHolderImages.find((p) => p.id === id);
  return img ? [{ id: img.id, src: img.imageUrl, alt: img.description, hint: img.imageHint }] : [];
});

export interface HomeContent {
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleHighlight: string;
    subtitle: string;
    primaryButton: ButtonContent;
    secondaryButton: ButtonContent;
    stats: HeroStat[];
  };
  about: {
    badge: string;
    title: string;
    titleHighlight: string;
    intro: string;
    industries: string;
    team: string;
    supply: string;
    quality: string;
    banner: string;
  };
  products: {
    label: string;
    title: string;
    description: string;
    items: ProductItem[];
    brochureHeading: string;
    brochureButton: ButtonContent;
    tiles: FeatureTile[];
  };
  certificates: {
    badge: string;
    title: string;
    description: string;
    approvalsHeading: string;
    approvals: string[];
    thirdPartyHeading: string;
    thirdParty: string[];
    logos: CertificateLogo[];
    boxTitle: string;
    boxText: string;
  };
  gallery: {
    label: string;
    title: string;
    description: string;
  };
  contact: {
    label: string;
    title: string;
    description: string;
    factoryAddress: string;
    warehouseAddress: string;
    phone: string;
    email: string;
  };
  footer: {
    about: string;
  };
}

export const defaultHomeContent: HomeContent = {
  hero: {
    badge: "Precision Engineered Solutions",
    titleLine1: "Pioneering the",
    titleLine2: "Future of",
    titleHighlight: "Industrial Flow",
    subtitle: "AIV delivers world class Industrial Valves.\nReliability, durability, and engineering excellence.",
    primaryButton: button("Explore Catalog", "#products"),
    secondaryButton: button("Learn More", "#about"),
    stats: [
      { end: 500, label: "Projects Completed" },
      { end: 1000, label: "Happy Customers" },
      { end: 5, label: "Work Facilities" },
    ],
  },
  about: {
    badge: "About AMCO Valves",
    title: "Trusted by Industry",
    titleHighlight: "Since 1986",
    intro: "We are Manufacturers of “AMCO™” brand Low pressure & High pressure IBR & Non IBR Industrial & Instrumentation Valves in the small sector ever since 1986",
    industries: "We Manufacture Quality Valves of almost all types for a wide spectrum of users in the Process & Chemical, Refineries & Petrochemicals, Fertilizers, Drugs & Pharmaceuticals, Thermal Power Stations, Nuclear & Atomic Power Stations, Textiles, Dyes & Intermediates, Paints & Varnishes, Sugar, Breweries & Distilleries, Soaps & Detergents, Steel Plants, Food & Oil Industry, Solvent Extraction Plants, Sewage, Effluent & Water Treatment, Cooling Water, Ship Yards and Marine Management, Water Works, Pulp & Paper, LPG Bottling Plants, Onshore & Offshore platforms, Slurry & Ash handling.",
    team: "Our Unit is managed by a team of qualified personnel with extensive experience in the field. From a modest beginning in 1986, we have since made rapid strides in technology and statute and are today recognized by our esteemed customers as the most reliable single point source for their versatile requirement of Valves.\nTheir sustained support bears ample testimony for the confidence reposed in us.",
    supply: "Whether it be a well planned project installation or contingent maintenance replacement, we at AMCO gear ourselves up to our customers exacting requirements and supply well within time as Marginal stocks of standard sizes and ranges of valves are available with us.",
    quality: "We use Quality Raw Materials (Castings & Forgings ) from reputed foundries/forge shops and we have Statistical Quality Assurance system with inspection at every stage of Manufacture to ensure sustained quality in our supplies. We have adequate capacity in terms of expertise and finance are in a position to undertake large volume of orders with committed deliveries.",
    banner: "At AMCO, you do not have to pay a premium for Quality.",
  },
  products: {
    label: "Product Portfolio",
    title: "Our Valve Solutions",
    description: "Discover comprehensive range of our precision engineered valves designed for the world's most demanding environments.",
    items: [
      {
        id: "1",
        title: "Ball Valves",
        specs: "1 Pc | 2 Pc | 3 Pc",
        features: [
          "Screwed | Socket Weld | Butt Weld | Flanged",
          "Soft & Metal Seat",
          "Floating & Trunnion Mounted (Fire Safe Design)",
        ],
      },
      {
        id: "2",
        title: "Knife Edge Gate Valves",
        specs: "Uni Directional | Bi Directional",
        features: ["Wafer, Lugged & Flanged", "Soft & Metal Seat"],
      },
      {
        id: "3",
        title: "Damper Valve",
        specs: "Fabricated Damper Valve",
        features: ["Wafer, Lugged & Flanged", "Metal Seat"],
      },
      {
        id: "4",
        title: "Wafer Check Valves",
        specs: "Wafer Type",
        features: ["With & Without Spring", "Soft Seat"],
      },
      {
        id: "5",
        title: "Butterfly Valves",
        specs: "Concentric | Double Offset | Triple Offset",
        features: ["Wafer, Lugged & Flanged", "Soft & Metal Seat"],
      },
      {
        id: "6",
        title: "Diaphragm Valve",
        specs: "Weir & KB Type",
        features: ["Flanged Only", "Unlined & Rubber Lined"],
      },
      {
        id: "7",
        title: "Piston Valve",
        specs: "Screwed | Socket Weld | Flanged",
        features: [
          "Metal Seat, Glandless",
          "OS & Y Type, Bolted Bonnet, Rising Spindle",
          "IBR & NON IBR",
        ],
      },
      {
        id: "11",
        title: "IBR & Non IBR Gate/Globe/Check Valve",
        specs: "",
        features: [
          "IBR & Non IBR Gate Valve 800#, 1500#, 2500# Screwed / Socket weld / Butt weld",
          "IBR & Non IBR Globe Valve 800#, 1500#, 2500# Screwed / Socket weld / Butt weld",
          "IBR & Non IBR Lift check Valve 800#, 1500#, 2500#Screwed / Socket weld / Butt weld",
          "IBR & Non IBR Gate Valve 150#, 300#, 600# Flanged / Butt weld",
          "IBR & Non IBR Globe Valve 150#, 300#, 600# Flanged / Butt weld",
          "IBR & Non IBR Swing check Valve 150#, 300#, 600# Flanged / Butt weld",
        ],
      },
      {
        id: "8",
        title: "Dual Plate Check Valve",
        specs: "Wafer | Lugged | Flanged",
        features: ["Soft & Metal Seat"],
      },
      {
        id: "9",
        title: "Non Slam Check Valve (DCV)",
        specs: "Wafer",
        features: ["Soft & Metal Seat"],
      },
      {
        id: "10",
        title: "FEP & PFA Lined Valves",
        specs: "Flanged | Wafer",
        features: [
          "Plug Valve (Sleeved, Lined & Jacketed)",
          "Ball valve (Lined)",
          "Butterfly valve (Sleeved and Lined)",
          "Diaphragm valve (Lined)",
          "Wafer Check valve (Lined)",
          "Ball type check valve (Lined)",
        ],
      },
      {
        id: "12",
        title: "High Pressure Valves",
        specs: "Ball | Check | Needle",
        features: ["Soft Seat", "Screwed", "1500 psi, 3000 psi, 6000 psi"],
      },
      {
        id: "13",
        title: "Strainers",
        specs: "Y, T, Pot, Duplex, Self Cleaning Type",
        features: [
          "Y Type - Screwed & Flanged",
          "T Type, Pot Type, Duplex, Self Cleaning - Flanged",
          "Mesh Size To Customer Requirement",
        ],
      },
      {
        id: "14",
        title: "Sliding Gate Valve",
        specs: "Fabricated Penstock | Sliding Gate Valve",
        features: [
          "For Hydro, Sewage, Rainwater",
          "Soft & Metal Seat",
          "Manual Wheel, Gear Operated, Cylinder Operated",
          "Large Size Available",
        ],
      },
      {
        id: "15",
        title: "Actuator & Accessories",
        specs: "",
        features: [
          "Pneumatic & Electrical Actuators (Double acting, Single acting, 1 phase & 3 phase)",
          "Solenoid valve, Limit switch and AFR (IP67 and Ex-proof)",
          "Gear box with locking arrangement",
          "Limit switch arrangement for On/off feedback for manual valves",
          "Linear Cylinders (Double acting and single acting)",
          "Hydraulic Cylinders (Linear)",
        ],
      },
      {
        id: "16",
        title: "Safety Relief Valve",
        specs: "Screwed | Flanged",
        features: ["Angle type"],
      },
    ],
    brochureHeading: "Get our complete product catalog with technical specifications",
    brochureButton: button("Download Brochure", "/brochure.pdf"),
    tiles: [
      { title: "Configurations", desc: "Standard & Custom Designs" },
      { title: "Connections", desc: "Threaded, Weld, Flanged" },
      { title: "Seat Types", desc: "Soft & Metal Seat Options" },
      { title: "Mounting", desc: "Versatile Installation" },
    ],
  },
  certificates: {
    badge: "Quality Standards",
    title: "Certified for Excellence",
    description: "AMCO Valves is committed to the highest standards of safety and quality. Our manufacturing processes are audited and certified by leading global certification bodies.",
    approvalsHeading: "Approvals & Certificates",
    approvals: [
      "ISO 9001:2015",
      "IBR",
      "CE PED 2014/68/EU ANNEX III MODULE H (ON REQUEST)",
      "SIL-2 (ON REQUEST)",
      "FUGITIVE EMISSION TEST ISO 15848-1:2015 (ON REQUEST)",
      "FIRE TEST FOR BALL VALVES – API 607-2016, 7TH EDITION (ON REQUEST)",
      "EAC TR CU 032/2013 (ON REQUEST)",
      "ATEX 2014/34/EU (ON REQUEST)",
      "NDT (VT, LPT, MPT, UT, RT & IGC FOR SS (ON REQUEST)",
    ],
    thirdPartyHeading: "Third Party Inspection",
    thirdParty: ["DNV", "TUV", "BV", "SGS", "TATA Projects"],
    logos: defaultCertificateLogos,
    boxTitle: "Global Quality Standards",
    boxText: "Meeting and exceeding international requirements for industrial safety and engineering performance.",
  },
  gallery: {
    label: "Visual Showcase",
    title: "Industrial Gallery",
    description: "A glimpse into our manufacturing processes and the high-quality products we deliver to our global clientele.",
  },
  contact: {
    label: "Get In Touch",
    title: "Contact",
    description: "Have questions about our products or need a custom quote? Our technical support team is ready to assist you.",
    factoryAddress: "638/A Tiruvottriyur high road, Ajax, Chennai, 600019",
    warehouseAddress: "104-A East Mada church street, Royapuram, Chennai, 600013",
    phone: "91-9841114671",
    email: "contact@amcovalves.com",
  },
  footer: {
    about: "Precision engineered valve solutions for the global energy and industrial sectors. Quality and reliability at the core of everything we do.",
  },
};

/** Builds a `tel:` link from a display number, e.g. "91-9841114671" -> "tel:+919841114671". */
export function phoneHref(phone: string) {
  return `tel:+${phone.replace(/\D/g, "")}`;
}

export function resolveHomeContent(saved: unknown): HomeContent {
  return mergeWithDefaults(defaultHomeContent, saved);
}

// --- Reading the saved content (works on the server and in the browser) ---

/**
 * Fetches the home page content through the Firestore REST API (the doc is
 * publicly readable). Never throws: returns the defaults if anything goes wrong.
 */
export async function getHomeContent(): Promise<HomeContent> {
  const doc = await getRestDoc(`${HOME_CONTENT_COLLECTION}/${HOME_CONTENT_DOC}`, {
    revalidate: 60,
    tags: [HOME_CONTENT_TAG],
  });
  return doc ? resolveHomeContent(doc.data) : defaultHomeContent;
}
