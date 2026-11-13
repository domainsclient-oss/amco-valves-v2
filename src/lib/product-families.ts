/**
 * Parent ("product family") pages: /products/<family>, listing the product pages under that
 * folder (e.g. /products/knife-edge-gate-valve → its 8 configurations).
 *
 * Product names, sizes and materials come from each product's own content (and admin edits);
 * this file only holds the family wording and the short attributes used by the filters, cards
 * and comparison table. Attribute values are taken from the product names.
 */

export interface FamilyFacet {
  key: string;
  /** Filter and card label, e.g. "End connection". */
  label: string;
  /** Plural for the filter's "All …" option, e.g. "connections". */
  plural: string;
}

export interface FamilyChild {
  /** Product page path under /products/. */
  slug: string;
  /** Badge on the card and comparison-table row, e.g. "Uni-directional". */
  group: string;
  /** Short value per facet key, e.g. { connection: "Flanged" }. */
  attrs: Record<string, string>;
  /** Left off the page (set from the admin). */
  hidden?: boolean;
}

export interface FamilyGuideCard {
  title: string;
  intro: string;
  points: { term: string; text: string }[];
}

export interface ProductFamily {
  /** Folder under /products/, e.g. "knife-edge-gate-valve". */
  slug: string;
  /** Mega-menu category title (src/lib/navigation-data.ts); hiding it in the admin hides this page. */
  category: string;
  /** Page heading (plural), e.g. "Knife Edge Gate Valves". */
  title: string;
  /** Singular, lower case, e.g. "knife edge gate valve". */
  singular: string;
  /** Hero paragraph. */
  intro: string;
  /** Overview panel heading, e.g. "Choose by flow direction, connection and seat type." */
  chooseBy: string;
  facets: FamilyFacet[];
  children: FamilyChild[];
  guide: FamilyGuideCard[];
  /** Family-specific questions, shown before the generated ones. */
  faqs: { q: string; a: string }[];
  seo: { title: string; description: string; keywords: string; image?: string };
}

const CONNECTION: FamilyFacet = { key: "connection", label: "End connection", plural: "connections" };
const SEAT: FamilyFacet = { key: "seat", label: "Seat type", plural: "seats" };
const PRESSURE: FamilyFacet = { key: "pressure", label: "Pressure class", plural: "pressure classes" };

const QUOTE_FAQ_NOTE =
  "Open each product page for its size range, materials of construction, standards and dimension tables.";

export const productFamilies: ProductFamily[] = [
  {
    slug: "knife-edge-gate-valve",
    category: "Knife Edge Gate Valve",
    title: "Knife Edge Gate Valves",
    singular: "knife edge gate valve",
    intro:
      "Compare AMCO's uni-directional and bi-directional knife edge gate valves, including wafer / lugged and flanged connections, resilient and metal seat options, and two-piece designs. Find the configuration that matches your piping requirements.",
    chooseBy: "Choose by flow direction, connection and seat type.",
    facets: [
      { key: "direction", label: "Flow direction", plural: "directions" },
      CONNECTION,
      SEAT,
      { key: "construction", label: "Construction", plural: "constructions" },
    ],
    children: [
      { slug: "knife-edge-gate-valve/uni-directional/wafer-lugged-resilient-seat-pn10", group: "Uni-directional", attrs: { direction: "Uni-directional", connection: "Wafer / lugged", seat: "Resilient", construction: "Standard" } },
      { slug: "knife-edge-gate-valve/uni-directional/wafer-lugged-metal-seat-pn10", group: "Uni-directional", attrs: { direction: "Uni-directional", connection: "Wafer / lugged", seat: "Metal", construction: "Standard" } },
      { slug: "knife-edge-gate-valve/uni-directional/flanged-resilient-seat-pn10", group: "Uni-directional", attrs: { direction: "Uni-directional", connection: "Flanged", seat: "Resilient", construction: "Standard" } },
      { slug: "knife-edge-gate-valve/uni-directional/flanged-metal-seat-pn10", group: "Uni-directional", attrs: { direction: "Uni-directional", connection: "Flanged", seat: "Metal", construction: "Standard" } },
      { slug: "knife-edge-gate-valve/bi-directional/wafer-lugged-resilient-seat-pn10", group: "Bi-directional", attrs: { direction: "Bi-directional", connection: "Wafer / lugged", seat: "Resilient", construction: "Standard" } },
      { slug: "knife-edge-gate-valve/bi-directional/flanged-resilient-seat-pn10", group: "Bi-directional", attrs: { direction: "Bi-directional", connection: "Flanged", seat: "Resilient", construction: "Standard" } },
      { slug: "knife-edge-gate-valve/bi-directional/wafer-lugged-resilient-seat-pn10-two-piece-design", group: "Bi-directional · Two-piece", attrs: { direction: "Bi-directional", connection: "Wafer / lugged", seat: "Resilient", construction: "Two-piece" } },
      { slug: "knife-edge-gate-valve/bi-directional/flanged-resilient-seat-pn10-two-piece-design", group: "Bi-directional · Two-piece", attrs: { direction: "Bi-directional", connection: "Flanged", seat: "Resilient", construction: "Two-piece" } },
    ],
    guide: [
      {
        title: "Uni-directional vs bi-directional",
        intro: "The valve's intended differential-pressure direction matters when specifying a knife edge gate valve.",
        points: [
          { term: "Uni-directional", text: "evaluate the intended sealing direction and installation orientation." },
          { term: "Bi-directional", text: "evaluate the need for sealing under differential pressure from either direction." },
          { term: "Shutoff", text: "confirm the actual shutoff performance and operating limits in the model datasheet." },
        ],
      },
      {
        title: "Connection and seat selection",
        intro: "Choose based on the pipeline interface and process requirements, not product naming alone.",
        points: [
          { term: "Wafer / lugged or flanged", text: "match flange dimensions, bolting and installation clearance." },
          { term: "Resilient or metal seat", text: "confirm fluid compatibility, temperature and leakage requirements." },
          { term: "Two-piece design", text: "review the construction and maintenance drawings for the exact model." },
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between uni-directional and bi-directional knife edge gate valves?",
        a: "The distinction concerns the intended direction of differential-pressure sealing. Review the valve design and installation orientation, and confirm the model's actual sealing performance with AMCO before selection.",
      },
    ],
    seo: {
      title: "Knife Edge Gate Valves – Uni & Bi-Directional | AMCO",
      description:
        "Compare AMCO knife edge gate valves: uni-directional and bi-directional, wafer / lugged and flanged, resilient and metal seat PN10 options. View specifications and request a quote.",
      keywords: "knife edge gate valve",
    },
  },
  {
    slug: "dual-plate-check-valve",
    category: "Dual Plate Check Valve",
    title: "Dual Plate Check Valves",
    singular: "dual plate check valve",
    intro:
      "Compare AMCO's dual plate check valves for backflow prevention in industrial piping, in wafer, lugged and flanged bodies with resilient seat PN16 and retainerless metal seat 150# / 300# options.",
    chooseBy: "Choose by body type, seat and pressure class.",
    facets: [{ key: "body", label: "Body type", plural: "body types" }, SEAT, { key: "design", label: "Design", plural: "designs" }, PRESSURE],
    children: [
      { slug: "dual-plate-check-valve/wafer-type-resilient-seat-pn16", group: "Resilient seat", attrs: { body: "Wafer", seat: "Resilient", design: "Standard", pressure: "PN16" } },
      { slug: "dual-plate-check-valve/lugged-type-resilient-seat-pn16", group: "Resilient seat", attrs: { body: "Lugged", seat: "Resilient", design: "Standard", pressure: "PN16" } },
      { slug: "dual-plate-check-valve/flanged-type-resilient-seat-pn16", group: "Resilient seat", attrs: { body: "Flanged", seat: "Resilient", design: "Standard", pressure: "PN16" } },
      { slug: "dual-plate-check-valve/wafer-type-retainerless-metal-seat-150-300", group: "Retainerless metal seat", attrs: { body: "Wafer", seat: "Metal", design: "Retainerless", pressure: "150# / 300#" } },
      { slug: "dual-plate-check-valve/lugged-type-retainerless-metal-seat-150-300", group: "Retainerless metal seat", attrs: { body: "Lugged", seat: "Metal", design: "Retainerless", pressure: "150# / 300#" } },
      { slug: "dual-plate-check-valve/flanged-type-retainerless-metal-seat-150-300", group: "Retainerless metal seat", attrs: { body: "Flanged", seat: "Metal", design: "Retainerless", pressure: "150# / 300#" } },
    ],
    guide: [
      {
        title: "Resilient seat vs retainerless metal seat",
        intro: "Seat material and design follow from the service conditions of the line.",
        points: [
          { term: "Resilient seat (PN16)", text: "check elastomer compatibility with the fluid and operating temperature." },
          { term: "Retainerless metal seat (150# / 300#)", text: "suited to lines specified to ASME pressure classes; confirm leakage requirements." },
          { term: "Pressure class", text: "match the valve rating to the flange rating and design pressure of the line." },
        ],
      },
      {
        title: "Body type selection",
        intro: "The body style is decided by how the valve is installed between the pipe flanges.",
        points: [
          { term: "Wafer", text: "compact body clamped between flanges with through-bolts." },
          { term: "Lugged", text: "threaded lugs allow bolting to each flange; review end-of-line requirements." },
          { term: "Flanged", text: "integral flanges; confirm face-to-face length and drilling on the datasheet." },
        ],
      },
    ],
    faqs: [],
    seo: {
      title: "Dual Plate Check Valves – Wafer, Lugged & Flanged | AMCO",
      description:
        "Compare AMCO dual plate check valves: wafer, lugged and flanged bodies with resilient seat PN16 and retainerless metal seat 150# / 300# options. View specifications and request a quote.",
      keywords: "dual plate check valve",
    },
  },
  {
    slug: "butterfly-valve",
    category: "Butterfly Valve",
    title: "Butterfly Valves",
    singular: "butterfly valve",
    intro:
      "Compare AMCO's centric disc and double offset butterfly valves for industrial flow isolation and control, in wafer, semi-lugged, full lugged and flanged body styles across PN10 – PN25 and 150# / 300# ratings.",
    chooseBy: "Choose by disc design, body style and pressure rating.",
    facets: [{ key: "design", label: "Disc design", plural: "designs" }, { key: "body", label: "Body style", plural: "body styles" }, PRESSURE],
    children: [
      { slug: "butterfly-valve/centric-disc-design/wafer-semi-lugged-pn10-pn16-pn20-pn25", group: "Centric disc", attrs: { design: "Centric disc", body: "Wafer / semi-lugged", pressure: "PN10 – PN25" } },
      { slug: "butterfly-valve/centric-disc-design/full-lugged-pn10-pn16-pn20-pn25", group: "Centric disc", attrs: { design: "Centric disc", body: "Full lugged", pressure: "PN10 – PN25" } },
      { slug: "butterfly-valve/centric-disc-design/wafer-flanged-pn10-pn16-pn20-pn25", group: "Centric disc", attrs: { design: "Centric disc", body: "Wafer / flanged", pressure: "PN10 – PN25" } },
      { slug: "butterfly-valve/centric-disc-design/double-flanged-pn10-pn16-pn20-pn25", group: "Centric disc", attrs: { design: "Centric disc", body: "Double flanged", pressure: "PN10 – PN25" } },
      { slug: "butterfly-valve/double-offset-design/wafer-semi-lugged-150-300", group: "Double offset", attrs: { design: "Double offset", body: "Wafer / semi-lugged", pressure: "150# / 300#" } },
      { slug: "butterfly-valve/double-offset-design/full-lugged-150-300", group: "Double offset", attrs: { design: "Double offset", body: "Full lugged", pressure: "150# / 300#" } },
      { slug: "butterfly-valve/double-offset-design/double-flanged-150-300", group: "Double offset", attrs: { design: "Double offset", body: "Double flanged", pressure: "150# / 300#" } },
    ],
    guide: [
      {
        title: "Centric disc vs double offset",
        intro: "The disc geometry and pressure rating narrow the choice first.",
        points: [
          { term: "Centric disc (PN10 – PN25)", text: "listed with PN pressure ratings; confirm seat material against the fluid." },
          { term: "Double offset (150# / 300#)", text: "listed with ASME pressure classes; confirm the required shutoff class." },
          { term: "Operation", text: "check the available operators (lever, gear, actuator) on each product page." },
        ],
      },
      {
        title: "Body style selection",
        intro: "Pick the body style that fits the installation and maintenance needs.",
        points: [
          { term: "Wafer / semi-lugged", text: "compact, clamped between pipe flanges." },
          { term: "Full lugged", text: "threaded lugs on the full body; review end-of-line and dismantling needs." },
          { term: "Flanged / double flanged", text: "integral flanges; confirm face-to-face length and drilling." },
        ],
      },
    ],
    faqs: [],
    seo: {
      title: "Butterfly Valves – Centric Disc & Double Offset | AMCO",
      description:
        "Compare AMCO butterfly valves: centric disc PN10 – PN25 and double offset 150# / 300# in wafer, lugged and flanged body styles. View specifications and request a quote.",
      keywords: "butterfly valve",
    },
  },
  {
    slug: "wafer-check-valve",
    category: "Wafer Check Valve",
    title: "Wafer Check Valves",
    singular: "wafer check valve",
    intro:
      "Compare AMCO's wafer check valves for compact non-return service, with resilient seat, metal seat and spring type resilient seat options.",
    chooseBy: "Choose by seat type and closing design.",
    facets: [SEAT, { key: "type", label: "Closing design", plural: "designs" }],
    children: [
      { slug: "wafer-check-valve/resilient-seat", group: "Resilient seat", attrs: { seat: "Resilient", type: "Standard" } },
      { slug: "wafer-check-valve/metal-seat", group: "Metal seat", attrs: { seat: "Metal", type: "Standard" } },
      { slug: "wafer-check-valve/resilient-seat-spring-type", group: "Resilient seat · Spring type", attrs: { seat: "Resilient", type: "Spring type" } },
    ],
    guide: [
      {
        title: "Resilient vs metal seat",
        intro: "The seat is chosen from the fluid, temperature and leakage requirements.",
        points: [
          { term: "Resilient seat", text: "check elastomer compatibility with the fluid and temperature." },
          { term: "Metal seat", text: "confirm the allowable leakage for the application." },
        ],
      },
      {
        title: "Closing design",
        intro: "Consider flow conditions and installation orientation.",
        points: [
          { term: "Spring type", text: "review the spring design and installation orientation on the product page." },
          { term: "Installation", text: "confirm flange standard and face-to-face dimensions before ordering." },
        ],
      },
    ],
    faqs: [],
    seo: {
      title: "Wafer Check Valves – Resilient, Metal & Spring Type | AMCO",
      description:
        "Compare AMCO wafer check valves for compact non-return service: resilient seat, metal seat and spring type options. View specifications and request a quote.",
      keywords: "wafer check valve",
    },
  },
  {
    slug: "ball-valve",
    category: "Ball Valve",
    title: "Ball Valves",
    singular: "ball valve",
    intro:
      "Compare AMCO's floating and trunnion mounted ball valves for industrial quarter-turn isolation, in 2-piece, 3-piece and wafer designs with screwed, socket weld and flanged ends.",
    chooseBy: "Choose by ball design, construction and end connection.",
    facets: [
      { key: "design", label: "Ball design", plural: "designs" },
      { key: "construction", label: "Construction", plural: "constructions" },
      CONNECTION,
      PRESSURE,
    ],
    children: [
      { slug: "ball-valve/floating-design/2-piece-design-screwed-1000-wog", group: "Floating", attrs: { design: "Floating", construction: "2-piece", connection: "Screwed", pressure: "1000 WOG" } },
      { slug: "ball-valve/floating-design/3-piece-design-screwed-socket-weld-150-300", group: "Floating", attrs: { design: "Floating", construction: "3-piece", connection: "Screwed / socket weld", pressure: "150# / 300#" } },
      { slug: "ball-valve/floating-design/3-piece-design-screwed-socket-weld-600-800-1500", group: "Floating", attrs: { design: "Floating", construction: "3-piece", connection: "Screwed / socket weld", pressure: "600# / 800# / 1500#" } },
      { slug: "ball-valve/floating-design/3-piece-design-flanged-ansi-150-300-600-900", group: "Floating", attrs: { design: "Floating", construction: "3-piece", connection: "Flanged", pressure: "ANSI 150# – 900#" } },
      { slug: "ball-valve/floating-design/2-piece-design-flanged-ansi-150-300-600", group: "Floating", attrs: { design: "Floating", construction: "2-piece", connection: "Flanged", pressure: "ANSI 150# – 600#" } },
      { slug: "ball-valve/floating-design/wafer-design-ball-valve-150-pn25-pn40", group: "Floating", attrs: { design: "Floating", construction: "Wafer", connection: "Wafer", pressure: "150# / PN25 / PN40" } },
      { slug: "ball-valve/trunnion-mounted/2-piece-design-flanged-ansi-150-300-600", group: "Trunnion mounted", attrs: { design: "Trunnion mounted", construction: "2-piece", connection: "Flanged", pressure: "ANSI 150# – 600#" } },
      { slug: "ball-valve/trunnion-mounted/3-piece-design-flanged-ansi-150-300-600", group: "Trunnion mounted", attrs: { design: "Trunnion mounted", construction: "3-piece", connection: "Flanged", pressure: "ANSI 150# – 600#" } },
    ],
    guide: [
      {
        title: "Floating vs trunnion mounted",
        intro: "The ball support design is selected from size, pressure class and operating torque.",
        points: [
          { term: "Floating", text: "the widest range here, from screwed 1000 WOG to flanged ANSI 900#." },
          { term: "Trunnion mounted", text: "flanged ANSI 150# – 600#; review size range and operator options." },
          { term: "Operation", text: "confirm lever, gear or actuator options on each product page." },
        ],
      },
      {
        title: "Construction and end connection",
        intro: "Match the body construction to the piping and maintenance approach.",
        points: [
          { term: "2-piece / 3-piece", text: "review the construction and maintenance drawings for the exact model." },
          { term: "Screwed / socket weld", text: "for smaller bore lines; confirm thread or socket standard." },
          { term: "Flanged / wafer", text: "confirm flange standard, drilling and face-to-face length." },
        ],
      },
    ],
    faqs: [],
    seo: {
      title: "Ball Valves – Floating & Trunnion Mounted | AMCO",
      description:
        "Compare AMCO ball valves: floating and trunnion mounted, 2-piece, 3-piece and wafer designs with screwed, socket weld and flanged ends. View specifications and request a quote.",
      keywords: "ball valve",
    },
  },
  {
    slug: "strainer",
    category: "Strainer",
    title: "Strainers",
    singular: "strainer",
    intro: "Compare AMCO's Y strainers and basket strainers for pipeline debris removal and equipment protection, with screwed and flanged ends.",
    chooseBy: "Choose by strainer type and end connection.",
    facets: [{ key: "type", label: "Strainer type", plural: "types" }, CONNECTION],
    children: [
      { slug: "strainer/y-strainer-screwed", group: "Y strainer", attrs: { type: "Y strainer", connection: "Screwed" } },
      { slug: "strainer/y-strainer-flanged", group: "Y strainer", attrs: { type: "Y strainer", connection: "Flanged" } },
      { slug: "strainer/basket-strainer-flanged", group: "Basket strainer", attrs: { type: "Basket strainer", connection: "Flanged" } },
    ],
    guide: [
      {
        title: "Y strainer vs basket strainer",
        intro: "The strainer type follows from the debris load and cleaning frequency.",
        points: [
          { term: "Y strainer", text: "compact; review the screen size and mesh on the product page." },
          { term: "Basket strainer", text: "larger screen area; review cover access for cleaning." },
        ],
      },
      {
        title: "Connection and mesh",
        intro: "Match the strainer to the line and the equipment it protects.",
        points: [
          { term: "Screwed or flanged", text: "match the pipe size, thread or flange standard." },
          { term: "Mesh", text: "select the perforation / mesh size to suit the downstream equipment." },
        ],
      },
    ],
    faqs: [],
    seo: {
      title: "Strainers – Y Strainer & Basket Strainer | AMCO",
      description:
        "Compare AMCO Y strainers and basket strainers with screwed and flanged ends for pipeline debris removal and equipment protection. View specifications and request a quote.",
      keywords: "strainer",
    },
  },
  {
    slug: "piston-valve",
    category: "Piston Valve - Seatless & Glandless",
    title: "Piston Valves",
    singular: "piston valve",
    intro: "Compare AMCO's seatless and glandless piston valves for industrial process and steam-line isolation, in small bore and large bore sizes for IBR and non-IBR service.",
    chooseBy: "Choose by bore size and IBR requirement.",
    facets: [{ key: "bore", label: "Bore", plural: "bores" }, { key: "ibr", label: "Approval", plural: "approvals" }],
    children: [
      { slug: "piston-valve/small-bore-non-ibr-ibr", group: "Small bore", attrs: { bore: "Small bore", ibr: "IBR & non-IBR" } },
      { slug: "piston-valve/large-bore-non-ibr-ibr", group: "Large bore", attrs: { bore: "Large bore", ibr: "IBR & non-IBR" } },
    ],
    guide: [
      {
        title: "Small bore vs large bore",
        intro: "Select by line size first, then confirm the end connection and rating.",
        points: [
          { term: "Small bore", text: "review the size range and end connections on the product page." },
          { term: "Large bore", text: "review the size range, pressure rating and dimensions." },
        ],
      },
      {
        title: "IBR and non-IBR service",
        intro: "Steam lines falling under IBR need the matching certification.",
        points: [
          { term: "IBR", text: "state the IBR requirement in your enquiry so the right documentation is supplied." },
          { term: "Service conditions", text: "share the operating pressure and temperature with your enquiry." },
        ],
      },
    ],
    faqs: [],
    seo: {
      title: "Piston Valves – Small & Large Bore, IBR / Non-IBR | AMCO",
      description:
        "Compare AMCO seatless and glandless piston valves in small bore and large bore sizes for IBR and non-IBR service. View specifications and request a quote.",
      keywords: "piston valve",
    },
  },
  {
    slug: "fep-pfa-lined-valves",
    category: "FEP & PFA Lined Valves",
    title: "FEP & PFA Lined Valves",
    singular: "FEP / PFA lined valve",
    intro:
      "Compare AMCO's PFA / FEP lined ball, ball check, butterfly, diaphragm, plug and wafer check valves for corrosive-service isolation and backflow prevention in flanged and wafer designs.",
    chooseBy: "Choose by valve type, service and end connection.",
    facets: [
      { key: "type", label: "Valve type", plural: "valve types" },
      { key: "service", label: "Service", plural: "services" },
      CONNECTION,
    ],
    children: [
      { slug: "ptfe-lined-ball-check-valve", group: "Non-return", attrs: { type: "Ball check", service: "Non-return", connection: "Flanged" } },
      { slug: "ptfe-lined-ball-valve", group: "Isolation", attrs: { type: "Ball", service: "Isolation", connection: "Flanged" } },
      { slug: "ptfe-lined-butterfly-valve/wafer-centric-disc-design", group: "Isolation", attrs: { type: "Butterfly", service: "Isolation", connection: "Wafer" } },
      { slug: "ptfe-lined-butterfly-valve/wafer-full-lug-centric-disc-design", group: "Isolation", attrs: { type: "Butterfly", service: "Isolation", connection: "Wafer full lug" } },
      { slug: "ptfe-lined-diaphragm-valve", group: "Isolation", attrs: { type: "Diaphragm", service: "Isolation", connection: "Flanged" } },
      { slug: "ptfe-lined-plug-valve/pfa-fep-lined", group: "Isolation", attrs: { type: "Plug", service: "Isolation", connection: "Flanged" } },
      { slug: "ptfe-lined-plug-valve/pfa-fep-lined-jacketed", group: "Isolation · Jacketed", attrs: { type: "Plug (jacketed)", service: "Isolation", connection: "Flanged" } },
      { slug: "ptfe-lined-wafer-check-valve", group: "Non-return", attrs: { type: "Wafer check", service: "Non-return", connection: "Wafer" } },
    ],
    guide: [
      {
        title: "Lining selection",
        intro: "Lined valves are chosen for the chemical compatibility of the wetted parts.",
        points: [
          { term: "PFA / FEP", text: "confirm the lining against the fluid, concentration and temperature." },
          { term: "Wetted parts", text: "review the lining and seat materials listed on each product page." },
          { term: "Jacketed", text: "for heating or cooling at the valve, share the jacket medium and its conditions." },
        ],
      },
      {
        title: "Valve type and connection",
        intro: "Pick the valve type from the function needed, then match the pipe connection.",
        points: [
          { term: "Isolation", text: "ball, butterfly, diaphragm and plug valves." },
          { term: "Non-return", text: "ball check and wafer check valves; confirm installation orientation." },
          { term: "Flanged or wafer", text: "confirm flange standard, drilling and face-to-face length." },
        ],
      },
    ],
    faqs: [],
    seo: {
      title: "FEP & PFA Lined Valves – Ball, Butterfly, Plug & Check | AMCO",
      description:
        "Compare AMCO PFA / FEP lined ball, ball check, butterfly, diaphragm, plug and wafer check valves for corrosive service. View specifications and request a quote.",
      keywords: "FEP PFA lined valves",
    },
  },
  {
    slug: "damper-valve",
    category: "Damper Valve",
    title: "Damper Valves",
    singular: "damper valve",
    intro: "Compare AMCO's seatless damper valves for air and gas flow management, in wafer and flanged body styles.",
    chooseBy: "Choose by body style.",
    facets: [{ key: "body", label: "Body style", plural: "body styles" }, { key: "design", label: "Design", plural: "designs" }],
    children: [
      { slug: "damper-valve/wafer-type-seatless-design", group: "Wafer", attrs: { body: "Wafer", design: "Seatless" } },
      { slug: "damper-valve/flanged-type-seatless-design", group: "Flanged", attrs: { body: "Flanged", design: "Seatless" } },
    ],
    guide: [
      {
        title: "Seatless design",
        intro: "Damper valves regulate air and gas flow rather than provide tight shutoff.",
        points: [
          { term: "Seatless", text: "confirm the allowable leakage for the duct or line." },
          { term: "Operation", text: "review operator options on each product page." },
        ],
      },
      {
        title: "Body style",
        intro: "Match the body style to the duct or pipe connection.",
        points: [
          { term: "Wafer", text: "compact, clamped between flanges." },
          { term: "Flanged", text: "integral flanges; confirm drilling and face-to-face length." },
        ],
      },
    ],
    faqs: [],
    seo: {
      title: "Damper Valves – Wafer & Flanged Seatless | AMCO",
      description:
        "Compare AMCO seatless damper valves in wafer and flanged styles for air and gas flow management. View specifications and request a quote.",
      keywords: "damper valve",
    },
  },
  {
    slug: "ibr-valves",
    category: "IBR & Non IBR Small & Large Bore",
    title: "IBR & Non-IBR Valves",
    singular: "IBR valve",
    intro:
      "Compare AMCO's IBR and non-IBR gate, globe and check valves for boiler and steam piping, in small bore forged (800# – 2500#) and large bore cast (150# – 600#) designs.",
    chooseBy: "Choose by bore, valve type and pressure class.",
    facets: [{ key: "bore", label: "Bore / body", plural: "bores" }, { key: "type", label: "Valve type", plural: "valve types" }, PRESSURE],
    children: [
      { slug: "ibr-valves/small-bore-forged-gate-valve", group: "Small bore · Forged", attrs: { bore: "Small bore forged", type: "Gate", pressure: "800# / 1500# / 2500#" } },
      { slug: "ibr-valves/small-bore-forged-globe-valve", group: "Small bore · Forged", attrs: { bore: "Small bore forged", type: "Globe", pressure: "800# / 1500# / 2500#" } },
      { slug: "ibr-valves/small-bore-forged-lift-check-valve", group: "Small bore · Forged", attrs: { bore: "Small bore forged", type: "Lift check", pressure: "800# / 1500# / 2500#" } },
      { slug: "ibr-valves/large-bore-cast-gate-valve", group: "Large bore · Cast", attrs: { bore: "Large bore cast", type: "Gate", pressure: "150# / 300# / 600#" } },
      { slug: "ibr-valves/large-bore-cast-globe-valve", group: "Large bore · Cast", attrs: { bore: "Large bore cast", type: "Globe", pressure: "150# / 300# / 600#" } },
      { slug: "ibr-valves/large-bore-cast-swing-check-valve", group: "Large bore · Cast", attrs: { bore: "Large bore cast", type: "Swing check", pressure: "150# / 300# / 600#" } },
    ],
    guide: [
      {
        title: "Gate, globe or check",
        intro: "The valve type follows from the function needed in the line.",
        points: [
          { term: "Gate", text: "on / off isolation." },
          { term: "Globe", text: "isolation with throttling capability." },
          { term: "Lift / swing check", text: "non-return service; confirm installation orientation." },
        ],
      },
      {
        title: "Small bore forged vs large bore cast",
        intro: "Line size and pressure class decide the body construction.",
        points: [
          { term: "Small bore forged", text: "listed in 800#, 1500# and 2500# classes." },
          { term: "Large bore cast", text: "listed in 150#, 300# and 600# classes." },
          { term: "IBR", text: "state the IBR requirement in your enquiry so the right documentation is supplied." },
        ],
      },
    ],
    faqs: [],
    seo: {
      title: "IBR & Non-IBR Gate, Globe & Check Valves | AMCO",
      description:
        "Compare AMCO IBR and non-IBR gate, globe and check valves for boiler and steam piping: small bore forged and large bore cast designs. View specifications and request a quote.",
      keywords: "IBR valves",
    },
  },
  {
    slug: "ptfe-sleeved-plug-valve",
    category: "PTFE Sleeved Plug Valve",
    title: "PTFE Sleeved Plug Valves",
    singular: "PTFE sleeved plug valve",
    intro: "Compare AMCO's PTFE sleeved plug valves for industrial flow isolation, in flanged, jacketed and screwed / socket weld / butt weld versions.",
    chooseBy: "Choose by end connection and jacket requirement.",
    facets: [{ key: "variant", label: "Version", plural: "versions" }],
    children: [
      { slug: "ptfe-sleeved-plug-valve/flanged", group: "Flanged", attrs: { variant: "Flanged" } },
      { slug: "ptfe-sleeved-plug-valve/jacketed", group: "Jacketed", attrs: { variant: "Jacketed" } },
      { slug: "ptfe-sleeved-plug-valve/screwed-socket-butt", group: "Screwed / socket / butt weld", attrs: { variant: "Screwed / socket / butt weld" } },
    ],
    guide: [
      {
        title: "End connection",
        intro: "Match the valve to the pipe joint used in the line.",
        points: [
          { term: "Flanged", text: "confirm flange standard and drilling." },
          { term: "Screwed / socket / butt weld", text: "confirm the thread, socket or weld-end standard." },
        ],
      },
      {
        title: "Jacketed version",
        intro: "A jacket is chosen when the process needs heating or cooling at the valve.",
        points: [
          { term: "Jacketed", text: "share the heating / cooling medium and its conditions in your enquiry." },
          { term: "Sleeve", text: "review the sleeve material on each product page against the fluid." },
        ],
      },
    ],
    faqs: [],
    seo: {
      title: "PTFE Sleeved Plug Valves – Flanged, Jacketed & Screwed | AMCO",
      description:
        "Compare AMCO PTFE sleeved plug valves in flanged, jacketed and screwed / socket / butt weld versions. View specifications and request a quote.",
      keywords: "ptfe sleeved plug valve",
    },
  },
  {
    slug: "ptfe-seated-butterfly-valve",
    category: "PTFE Seated Butterfly Valve",
    title: "PTFE Seated Butterfly Valves",
    singular: "PTFE seated butterfly valve",
    intro: "Compare AMCO's PTFE seated centric disc butterfly valves for process-flow isolation, in wafer and wafer full lug body styles.",
    chooseBy: "Choose by body style.",
    facets: [{ key: "body", label: "Body style", plural: "body styles" }, { key: "design", label: "Disc design", plural: "designs" }],
    children: [
      { slug: "ptfe-seated-butterfly-valve/wafer-centric-disc-design", group: "Wafer", attrs: { body: "Wafer", design: "Centric disc" } },
      { slug: "ptfe-seated-butterfly-valve/wafer-full-lug-centric-disc-design", group: "Wafer full lug", attrs: { body: "Wafer full lug", design: "Centric disc" } },
    ],
    guide: [
      {
        title: "PTFE seat",
        intro: "A PTFE seat is chosen for its chemical resistance.",
        points: [
          { term: "Seat", text: "confirm the PTFE seat against the fluid and temperature." },
          { term: "Disc", text: "review the disc material on each product page." },
        ],
      },
      {
        title: "Body style",
        intro: "Pick the body style that suits installation and dismantling.",
        points: [
          { term: "Wafer", text: "compact, clamped between pipe flanges." },
          { term: "Wafer full lug", text: "threaded lugs; review end-of-line and dismantling needs." },
        ],
      },
    ],
    faqs: [],
    seo: {
      title: "PTFE Seated Butterfly Valves – Wafer & Full Lug | AMCO",
      description:
        "Compare AMCO PTFE seated centric disc butterfly valves in wafer and wafer full lug styles for process-flow isolation. View specifications and request a quote.",
      keywords: "ptfe seated butterfly valve",
    },
  },
  {
    slug: "high-pressure-valve",
    category: "High Pressure Valve",
    title: "High Pressure Valves",
    singular: "high pressure valve",
    intro:
      "Compare AMCO's high pressure ball, in-line check and needle valves for 3000 PSI / 6000 PSI service, with BSPF, NPTF and socket weld end connections.",
    chooseBy: "Choose by valve function.",
    facets: [{ key: "type", label: "Valve type", plural: "valve types" }, { key: "service", label: "Service", plural: "services" }, PRESSURE],
    children: [
      { slug: "high-pressure-ball-valve", group: "Shutoff", attrs: { type: "Ball", service: "Line shutoff", pressure: "3000 / 6000 PSI" } },
      { slug: "high-pressure-in-line-check-valve", group: "Non-return", attrs: { type: "In-line check", service: "Non-return", pressure: "3000 / 6000 PSI" } },
      { slug: "high-pressure-needle-valve", group: "Flow regulation", attrs: { type: "Needle", service: "Flow regulation", pressure: "3000 / 6000 PSI" } },
    ],
    guide: [
      {
        title: "Ball, check or needle",
        intro: "The valve type follows from what the valve has to do in the line.",
        points: [
          { term: "Ball valve", text: "quarter-turn line shutoff." },
          { term: "In-line check valve", text: "non-return service; confirm flow direction at installation." },
          { term: "Needle valve", text: "precision flow regulation." },
        ],
      },
      {
        title: "Rating and end connection",
        intro: "Confirm the rating and thread or weld standard before ordering.",
        points: [
          { term: "Pressure", text: "listed for 3000 PSI / 6000 PSI; match the design pressure of the system." },
          { term: "End connection", text: "BSPF, NPTF or socket weld options; check each product page." },
          { term: "Materials", text: "review the material of construction against the fluid." },
        ],
      },
    ],
    faqs: [],
    seo: {
      title: "High Pressure Valves – Ball, Check & Needle | AMCO",
      description:
        "Compare AMCO high pressure ball, in-line check and needle valves for 3000 / 6000 PSI service with BSPF, NPTF and SW ends. View specifications and request a quote.",
      keywords: "high pressure valve",
    },
  },
  {
    slug: "gate-valve-for-fire-fighting",
    category: "Gate Valve for Fire Fighting",
    title: "Gate Valves for Fire Fighting",
    singular: "fire fighting gate valve",
    intro: "AMCO's double flanged, soft seated PN16 gate valve for fire protection water piping. View the full specification and dimension tables on the product page.",
    chooseBy: "Double flanged, soft seated gate valve for fire protection lines.",
    facets: [CONNECTION, SEAT, PRESSURE],
    children: [
      { slug: "gate-valve-for-fire-fighting/double-flanged-soft-seated-pn16", group: "Double flanged", attrs: { connection: "Double flanged", seat: "Soft seated", pressure: "PN16" } },
    ],
    guide: [
      {
        title: "Fire protection service",
        intro: "Fire water lines need isolation valves that match the system specification.",
        points: [
          { term: "Specification", text: "check the size range, pressure rating and materials on the product page." },
          { term: "Approvals", text: "mention any project or authority approval requirements in your enquiry." },
        ],
      },
      {
        title: "Installation",
        intro: "Match the valve to the pipe flanges and operating space.",
        points: [
          { term: "Flanges", text: "confirm flange standard, drilling and face-to-face length." },
          { term: "Operation", text: "review the operator options on the product page." },
        ],
      },
    ],
    faqs: [],
    seo: {
      title: "Gate Valves for Fire Fighting – Double Flanged PN16 | AMCO",
      description:
        "AMCO double flanged, soft seated PN16 gate valve for fire protection water piping. View specifications and request a quote.",
      keywords: "fire fighting gate valve",
    },
  },
  {
    slug: "diaphragm-valve",
    category: "Diaphragm Valve",
    title: "Diaphragm Valves",
    singular: "diaphragm valve",
    intro: "AMCO's unlined and lined diaphragm valves for process-fluid isolation, with unlined, natural rubber lined and ebonite lined options.",
    chooseBy: "Choose by lining for the process fluid.",
    facets: [{ key: "lining", label: "Lining", plural: "linings" }, CONNECTION],
    children: [
      { slug: "diaphragm-valve/unlined-and-lined", group: "Unlined and lined", attrs: { lining: "Unlined / lined", connection: "Flanged" } },
    ],
    guide: [
      {
        title: "Lining selection",
        intro: "The lining is chosen for compatibility with the process fluid.",
        points: [
          { term: "Unlined", text: "check the body material against the fluid." },
          { term: "Natural rubber / ebonite lined", text: "confirm the lining against the fluid, concentration and temperature." },
        ],
      },
      {
        title: "Diaphragm and body",
        intro: "The diaphragm is a wetted part and must suit the service too.",
        points: [
          { term: "Diaphragm", text: "review the diaphragm material on the product page." },
          { term: "Connection", text: "confirm flange standard and drilling." },
        ],
      },
    ],
    faqs: [],
    seo: {
      title: "Diaphragm Valves – Unlined & Lined | AMCO",
      description:
        "AMCO unlined and lined diaphragm valves for process-fluid isolation, with natural rubber and ebonite lining options. View specifications and request a quote.",
      keywords: "diaphragm valve",
    },
  },
];

export function getProductFamily(slug: string) {
  return productFamilies.find((f) => f.slug === slug);
}

export { QUOTE_FAQ_NOTE };
