import { getRestDoc } from "@/lib/firestore-rest";
import { mergeWithDefaults } from "@/lib/content-merge";
import { HOME_CONTENT_COLLECTION } from "@/lib/home-content";
import { BLOG_TAG } from "@/lib/blog";
import { button } from "@/lib/buttons";

/**
 * Editable text for the two original, hand-designed blog articles.
 *
 * Each article keeps its own page layout; only the text comes from here. The
 * defaults are the original article text. Edits from the admin dashboard are
 * saved as `siteContent/blog-<slug>` and merged on top, so the pages look
 * exactly as before until something is changed.
 */

export interface TableRow3 {
  col1: string;
  col2: string;
  col3: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SidebarLink {
  label: string;
  href: string;
}

export interface HeadingWithParagraphs {
  heading: string;
  paragraphs: string[];
}

export const waterTreatmentDefaults = {
  card: {
    heading: "How to Choose the Right Industrial Valve for Water and Wastewater Treatment Plants",
    description: "Selecting valves for treatment facilities requires understanding the fluid characteristics, operating conditions, and the specific role of each pipeline.",
    category: "Industry Selection Guide",
    date: "October 12, 2026",
    image: "/blog/blog-hero-1.webp",
  },
  seo: {
    title: "Industrial Valves for Water Treatment: Selection Guide | AMCO Valves",
    description: "Choosing valves for water and wastewater treatment? Learn how to select butterfly, check, knife gate and diaphragm valves for reliable operation.",
  },
  hero: {
    image: "/blog/blog-hero-1.webp",
    breadcrumb: "Industrial Valves Selection",
    badge: "Industry Selection Guide",
    title: "How to Choose the Right Industrial Valve for Water and Wastewater Treatment Plants",
    intro: "Selecting valves for treatment facilities requires understanding the fluid characteristics, operating conditions, and the specific role of each pipeline.",
  },
  intro: {
    lead: "A valve that works perfectly in a clean water pipeline may not last long in a wastewater treatment plant.",
    paragraphs: [
      "The difference often comes down to what is flowing through the pipeline. Clean water, untreated sewage, chemical dosing solutions and sludge all behave differently. Each places different demands on the valve body, seat, sealing arrangement and operating mechanism.",
      "For plant engineers and procurement teams, selecting industrial valves for water treatment is therefore not simply a matter of matching pipe size and pressure rating.",
      "The right valve must suit the fluid, the operating conditions and the work it is expected to perform.",
    ],
  },
  valveTypes: {
    heading: "Which valves are commonly used in water and wastewater treatment?",
    paragraphs: [
      "Butterfly valves, check valves, knife gate valves, diaphragm valves and gate valves are among the options used across water and wastewater treatment systems.",
      "Their suitability depends on the specific process.",
    ],
    tableTitle: "Valve Suitability Matrix",
    tableHeaders: { col1: "Valve type", col2: "Typical application", col3: "Main consideration" },
    tableRows: [
      { col1: "Butterfly valve", col2: "Water isolation and distribution lines", col3: "Compact design and operating requirements" },
      { col1: "Check valve", col2: "Pump discharge pipelines", col3: "Prevention of reverse flow" },
      { col1: "Knife gate valve", col2: "Sludge and slurry handling", col3: "Ability to handle suspended solids" },
      { col1: "Diaphragm valve", col2: "Selected chemical dosing and process lines", col3: "Fluid compatibility and diaphragm material" },
      { col1: "Gate valve", col2: "Pipeline isolation", col3: "Suitability for fully open or fully closed operation" },
    ] as TableRow3[],
    note: "There is no single valve design that is ideal for every stage of treatment.",
  },
  butterfly: {
    heading: "1. Butterfly valves for water distribution and isolation",
    paragraphs: [
      "Butterfly valves are commonly considered for medium- and large-diameter water pipelines.",
      "Their compact construction can make them practical where installation space matters.",
      "Depending on the design, they can be operated manually or with an actuator.",
      "However, the selection should not stop at the valve diameter.",
      "Engineers should also examine the operating pressure, seat material, water characteristics, required shut-off performance and frequency of operation.",
      "For example, a butterfly valve installed on a clean water distribution line may face different service conditions from one handling treated industrial effluent.",
    ],
    calloutTitle: "When should you consider a butterfly valve?",
    calloutText: "A butterfly valve is worth evaluating when the application calls for a compact isolation valve, particularly on larger pipelines. The final choice should be based on pressure, temperature, sealing and installation requirements.",
  },
  checkValves: {
    heading: "2. Check valves for preventing reverse flow",
    paragraphs: [
      "Reverse flow is an important concern in pumping systems.",
      "When a pump stops, the pressure conditions in a pipeline can change. Without appropriate protection, fluid may flow backwards through the system.",
      "A check valve is designed to permit flow in one direction and restrict reverse flow.",
      "Water treatment applications may use different check valve designs, including wafer, dual plate and non-slam check valves.",
      "The important distinction is that these designs do not necessarily behave the same way during pump shutdown.",
      "Valve closing characteristics, installation orientation, flow velocity and system dynamics all influence performance.",
    ],
    boxTitle: "Does a non-slam check valve eliminate water hammer?",
    boxParagraphs: [
      "Not necessarily. A properly selected non-slam check valve can help reduce the risk of valve-slam-related pressure surges, but water hammer depends on the entire piping system.",
      "Pump characteristics, pipeline length, flow velocity and transient pressure conditions must also be considered.",
    ],
    image: "/blog/Water-treatment-Industrials-valve.webp",
  },
  knifeGate: {
    heading: "3. Knife gate valves for sludge and slurry handling",
    paragraphs: [
      "Sludge handling creates challenges that are not normally encountered in clean water pipelines.",
      "Suspended solids, fibrous material and variations in slurry concentration can affect how a valve opens, closes and seals.",
      "Knife gate valves are often considered for these services because their design can be suited to certain fluids containing suspended solids.",
      "However, not every knife gate valve is suitable for every sludge application.",
      "The selection should account for solids concentration, particle characteristics, pressure differential, direction of flow and required sealing performance.",
      "Unidirectional and bidirectional knife gate valves also have different application considerations.",
      "Before placing an order, confirm whether the valve is intended to isolate pressure from one direction or both.",
    ],
  },
  diaphragm: {
    heading: "4. Diaphragm valves for selected chemical treatment lines",
    paragraphs: [
      "Chemical dosing is another area where valve selection requires care.",
      "Treatment plants may handle chemicals for disinfection, pH adjustment, coagulation or other processes.",
      "Depending on the chemical, concentration and operating temperature, a diaphragm valve may be an appropriate choice.",
      "Its suitability depends heavily on the diaphragm and lining materials.",
      "A valve that is compatible with one treatment chemical may not be suitable for another.",
      "For this reason, material compatibility should always be confirmed using the actual chemical concentration and operating conditions rather than the chemical name alone.",
    ],
  },
  checklist: {
    heading: "Five details to confirm before ordering a water treatment valve",
    items: [
      { label: "Fluid", desc: "Is the pipeline carrying clean water, wastewater, sludge or a chemical solution?" },
      { label: "Operating Conditions", desc: "What are the normal and maximum pressure and temperature?" },
      { label: "Valve Function", desc: "Is the valve required for isolation, thinning or reverse-flow prevention?" },
      { label: "Installation", desc: "What are the pipe size, connection type, available space and orientation?" },
      { label: "Operation", desc: "Will the valve be operated manually, pneumatically or electrically?" },
    ],
    summary: "These details help narrow the selection and reduce the risk of specifying a valve that is unsuitable for the actual service.",
  },
  maintenance: {
    heading: "Why valve selection affects maintenance costs",
    paragraphs: [
      "The purchase price of a valve is only one part of its overall cost.",
      "A poorly matched valve may lead to repeated seat damage, leakage, difficult operation or premature replacement.",
      "In a treatment plant, maintenance may also require isolating sections of the process or temporarily stopping equipment.",
      "That is why selecting the right valve at the procurement stage can be more valuable than simply choosing the lowest-priced option.",
    ],
  },
  solutions: {
    heading: "Industrial valve solutions from AMCO",
    paragraphs: [
      "AMCO Industrial Valves manufactures a range of valves used across industrial applications, including sewage, effluent and water treatment.",
      "Its product portfolio includes butterfly valves, knife edge gate valves, wafer check valves, dual plate check valves, non-slam check valves, diaphragm valves and other industrial flow-control products.",
      "The appropriate configuration depends on the application and operating requirements.",
    ],
  },
  planning: {
    heading: "Planning a water or wastewater treatment project?",
    paragraphs: [
      "Share your fluid details, operating pressure, temperature, pipeline size and valve function with the AMCO team.",
    ],
    ctaText: "Contact AMCO Industrial Valves to discuss a suitable valve configuration and request technical specifications or a quotation.",
    ctaPrimaryButton: button("Request a Quote", "/#contact"),
    ctaSecondaryButton: button("Explore Catalog", "/#products"),
  },
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      { question: "Which valve is best for wastewater treatment?", answer: "There is no single best valve for all wastewater treatment applications. Butterfly valves may suit certain water isolation duties, knife gate valves may be considered for sludge handling, and check valves help prevent reverse flow in pumping systems." },
      { question: "What is the difference between a butterfly valve and a knife gate valve?", answer: "A butterfly valve uses a rotating disc to control flow, while a knife gate valve uses a sliding gate. Their suitability depends on the fluid, solids content, pressure and sealing requirements." },
      { question: "Why are check valves used in water treatment plants?", answer: "Check valves help prevent reverse flow, particularly in pumping systems where flow direction may change after a pump stops." },
      { question: "Can butterfly valves be automated?", answer: "Yes. Suitable butterfly valve configurations can be fitted with pneumatic or electric actuators, subject to valve design, torque requirements and operating conditions." },
      { question: "What information should I provide when requesting a valve quotation?", answer: "Provide the fluid type, pipe size, pressure, temperature, connection requirements, preferred material, operation method and applicable project specifications." },
    ] as FaqItem[],
  },
  sidebar: {
    expertTitle: "Expert Advice",
    expertText: "Planning a water or wastewater treatment project? Share your pipeline details with the AMCO engineering team for a custom valve configuration.",
    expertPrimaryButton: button("Contact Our Engineers", "/#contact"),
    expertSecondaryButton: button("Browse Catalog", "/#products"),
    infoTitle: "India's Leading Manufacturer",
    infoText: "AMCO Industrial Valves has been delivering precision solutions since 1986, specialized in IBR and Non IBR valves for global utility and industrial sectors.",
    linksTitle: "Lined Product Range",
    links: [
      { label: "Butterfly Valves", href: "/#products" },
      { label: "Knife Edge Gate Valves", href: "/#products" },
      { label: "Dual Plate Check Valves", href: "/#products" },
      { label: "Non-Slam Check Valves", href: "/#products" },
    ] as SidebarLink[],
  },
};

export const pfaVsFepDefaults = {
  card: {
    heading: "PFA vs FEP Lined Valves: What Should You Choose for Corrosive Chemical Applications?",
    description: "Selecting the right fluoropolymer lining is critical for the safety and longevity of your industrial valves in highly aggressive environments.",
    category: "Material Comparison",
    date: "October 05, 2026",
    image: "/blog/hero-bg-blog2.webp",
  },
  seo: {
    title: "PFA vs FEP Lined Valves: Which is Better? | AMCO Valves",
    description: "Choosing between PFA and FEP lining for your industrial valves? Learn the key differences in temperature, chemical resistance, and cost for corrosive applications.",
  },
  hero: {
    image: "/blog/hero-bg-blog2.webp",
    breadcrumb: "Material Comparison",
    badge: "Corrosive Chemical Solutions",
    title: "PFA vs FEP Lined Valves: What Should You Choose for Corrosive Chemical Applications?",
    intro: "Selecting the right fluoropolymer lining is critical for the safety and longevity of your industrial valves in highly aggressive environments.",
  },
  whatAre: {
    heading: "What are PFA and FEP lined valves?",
    paragraphs: [
      "PFA (perfluoroalkoxy) and FEP (fluorinated ethylene propylene) are fluoropolymers used to provide chemical-resistant surfaces.",
      "In a lined valve, the lining separates the process fluid from the underlying valve body, helping protect it from direct chemical exposure.",
      "A lined valve is therefore different from an unlined metallic valve, where the process fluid comes into contact with the body material.",
      "Both PFA and FEP can be suitable for a wide range of corrosive chemicals. However, their performance limits and suitability depend on the application.",
    ],
  },
  difference: {
    heading: "PFA vs FEP: What is the difference?",
    tableTitle: "Material Comparison Matrix",
    tableHeaders: { col1: "Factor", col2: "PFA lining", col3: "FEP lining" },
    tableRows: [
      { col1: "Chemical resistance", col2: "Broad resistance to many aggressive chemicals", col3: "Broad resistance to many aggressive chemicals" },
      { col1: "Temperature capability", col2: "Generally higher material temperature capability", col3: "Generally lower than PFA" },
      { col1: "Processing", col2: "Melt-processable fluoropolymer", col3: "Melt-processable fluoropolymer" },
      { col1: "Common consideration", col2: "More demanding temperature requirements", col3: "Applications within FEP's operating limits" },
      { col1: "Final selection", col2: "Depends on valve design and service conditions", col3: "Depends on valve design and service conditions" },
    ] as TableRow3[],
    paragraphs: [
      "The important point is that the properties of the lining material do not automatically determine the allowable operating conditions of the complete valve.",
      "The valve body, lining thickness, sealing components, pressure rating and manufacturing design must also be considered.",
    ],
  },
  whenPfa: {
    heading: "When should you consider PFA lined valves?",
    paragraphs: [
      "PFA lined valves are often evaluated for chemical applications where both corrosion resistance and elevated temperature capability are important.",
      "They may be considered for certain chemical transfer, process isolation and handling applications involving aggressive media.",
      "However, it would be incorrect to assume that a PFA lining is suitable for every chemical at every temperature.",
      "Chemical concentration, operating pressure, temperature, permeation behaviour and potential mechanical damage all influence suitability.",
      "For demanding service conditions, engineers should confirm the complete valve's rated operating limits with the manufacturer.",
    ],
  },
  whenFep: {
    heading: "When can FEP lined valves be a suitable option?",
    paragraphs: [
      "FEP lined valves can also provide strong chemical resistance in appropriately selected applications.",
      "They may be considered where the operating conditions remain within the lining and complete valve assembly's limits.",
      "For some projects, FEP may provide a practical alternative to PFA.",
      "But the decision should not be based on lining material alone.",
      "Two valves with different designs, lining methods and sealing arrangements may perform differently even when both are described as FEP lined.",
      "This is why the technical datasheet matters more than a broad product label.",
    ],
    image: "/blog/PFA-lined-valves.webp",
  },
  valveTypes: {
    heading: "Which valve types are available with chemical-resistant linings?",
    paragraphs: [
      "Several industrial valve designs can be manufactured with fluoropolymer linings.",
      "The correct design depends on the function required in the pipeline.",
    ],
    types: [
      {
        heading: "Lined ball valves",
        paragraphs: [
          "Lined ball valves are commonly considered for on/off isolation duties.",
          "Their quarter-turn operation can make them practical where relatively quick opening and closing is required.",
          "Selection must account for the process fluid, operating conditions, sealing arrangement and compatibility of wetted components.",
        ],
      },
      {
        heading: "Lined butterfly valves",
        paragraphs: [
          "Lined butterfly valves may be considered for chemical service in suitable pipeline sizes and pressure conditions.",
          "The valve's disc, liner and sealing arrangement require particular attention because these components can be exposed to the process fluid.",
        ],
      },
      {
        heading: "Lined plug valves",
        paragraphs: [
          "Lined plug valves are another option for chemical isolation applications.",
          "Their suitability depends on the valve design, lining construction and service conditions.",
        ],
      },
      {
        heading: "Lined check valves",
        paragraphs: [
          "Where reverse-flow prevention is required, lined check valves may be considered.",
          "However, their operating characteristics must also suit the process, including flow conditions and installation requirements.",
        ],
      },
    ] as HeadingWithParagraphs[],
  },
  questions: {
    heading: "Five questions to ask before selecting a lined valve",
    items: [
      {
        heading: "1. What chemical will the valve handle?",
        paragraphs: [
          "Identify the exact chemical rather than describing the fluid simply as acidic or corrosive.",
          "Where relevant, provide details of mixtures and contaminants.",
        ],
      },
      {
        heading: "2. What is the chemical concentration?",
        paragraphs: [
          "Chemical compatibility may change with concentration.",
          "A material suitable for a dilute solution may not necessarily be appropriate for a more concentrated process stream.",
        ],
      },
      {
        heading: "3. What are the operating and maximum temperatures?",
        paragraphs: [
          "Normal temperature is important, but so are cleaning cycles, process fluctuations and occasional temperature excursions.",
          "The complete valve must be suitable for the specified conditions.",
        ],
      },
      {
        heading: "4. What pressure conditions will the valve experience?",
        paragraphs: [
          "Pressure rating, temperature and valve construction must be evaluated together.",
          "Do not assume that every valve using the same lining material has the same pressure capability.",
        ],
      },
      {
        heading: "5. Is the valve required for isolation or flow control?",
        paragraphs: [
          "An isolation valve and a throttling valve may require different designs.",
          "Choosing a valve based only on chemical resistance can overlook the actual operating function.",
        ],
      },
    ] as HeadingWithParagraphs[],
  },
  construction: {
    heading: "Why the complete valve construction matters",
    paragraphs: [
      "A chemical-resistant lining is important, but it is not the only factor affecting valve reliability.",
      "The lining must remain intact during installation and operation. Seals, interfaces and other wetted components must also be compatible with the process fluid.",
      "For example, a valve with a suitable lining may still be unsuitable if another component exposed to the fluid cannot tolerate the chemical or temperature.",
      "This is one reason why engineering teams should review the complete material specification rather than relying only on the term \"chemical-resistant valve.\"",
    ],
  },
  solutions: {
    heading: "PFA and FEP lined valve solutions from AMCO",
    paragraphs: [
      "AMCO Industrial Valves offers PFA/FEP lined valve configurations within its industrial product portfolio.",
      "These include lined ball valves, butterfly valves, diaphragm valves, plug valves and check valves.",
      "For example, AMCO's published PFA/FEP lined butterfly valve specifications include wafer-type configurations, with details on size range, body material, pressure rating and applicable manufacturing and testing standards.",
      "The suitability of each configuration should be confirmed against the specific chemical service.",
    ],
  },
  cta: {
    heading: "Looking for a lined valve for your chemical process?",
    paragraphs: [
      "Choosing between PFA and FEP starts with understanding the chemical, concentration, temperature, pressure and operating requirements.",
      "Share your application details with AMCO Industrial Valves to discuss available lined valve configurations and request the relevant technical datasheet or quotation.",
    ],
    primaryButton: button("Get a Technical Consultation", "/#contact"),
    secondaryButton: button("Explore Lined Catalog", "/#products"),
  },
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      { question: "What is the main difference between PFA and FEP lined valves?", answer: "Both use chemically resistant fluoropolymers. PFA generally offers higher material temperature capability, while FEP can be suitable for many chemical applications within its specified limits." },
      { question: "Are PFA lined valves suitable for corrosive chemicals?", answer: "PFA lined valves can be suitable for many corrosive chemical services, but compatibility depends on the specific chemical, concentration, temperature, pressure and complete valve construction." },
      { question: "Is PFA always better than FEP?", answer: "No. PFA and FEP have different properties, but the best choice depends on the operating conditions and the manufacturer's valve specifications." },
      { question: "Can lined butterfly valves be used in chemical processing?", answer: "Yes, where the valve's materials, design, pressure rating and operating characteristics are suitable for the particular chemical service." },
      { question: "What details are needed to request a lined valve quotation?", answer: "The manufacturer will typically need the chemical name, concentration, temperature, pressure, valve size, connection type, required function and any applicable project standards." },
    ] as FaqItem[],
  },
  sidebar: {
    expertTitle: "Expert Assistance",
    expertText: "Our engineering team can evaluate your process conditions and recommend the optimal PFA or FEP solution for maximum service life.",
    expertButton: button("Consult an Engineer", "/#contact"),
    infoTitle: "Quality Assured",
    infoText: "AMCO uses advanced fluoropolymer resins and strictly controlled manufacturing processes to ensure lining integrity and chemical resistance.",
    linksTitle: "Lined Product Range",
    links: [
      { label: "Lined Ball Valves", href: "/products/ptfe-lined-ball-valve" },
      { label: "Lined Butterfly Valves", href: "/products/ptfe-lined-butterfly-valve/wafer-centric-disc-design" },
      { label: "Lined Plug Valves", href: "/products/ptfe-lined-plug-valve/pfa-fep-lined" },
      { label: "Lined Check Valves", href: "/products/ptfe-lined-wafer-check-valve" },
    ] as SidebarLink[],
  },
};

/** Text of the blog list page (/blog), saved as `siteContent/blog-index`. */
export const BLOG_INDEX_SLUG = "index";

export const blogIndexDefaults = {
  hero: {
    badge: "AMCO Knowledge Base",
    title: "Industrial Valve",
    titleHighlight: "Engineering Insights",
    description: "Technical guides, material comparisons, and selection frameworks designed for global procurement and maintenance teams.",
    tag1: "Deep Material Analysis",
    tag2: "Process Optimization",
  },
  posts: {
    heading: "Latest Technical Posts",
    readMoreLabel: "Continue Reading",
  },
  cta: {
    heading: "Looking for project-specific",
    headingHighlight: "valve specifications?",
    text: "Our engineering team is available for deep technical consultations to help identify the optimal configuration for your specific media and operating conditions.",
    primaryButton: button("Consult an Engineer", "/#contact"),
    secondaryButton: button("Explore Catalog", "/#products"),
  },
};

export type BlogIndexContent = typeof blogIndexDefaults;

export type WaterTreatmentContent = typeof waterTreatmentDefaults;
export type PfaVsFepContent = typeof pfaVsFepDefaults;

/** The original articles, in the order shown in the admin. */
export const ORIGINAL_ARTICLES = [
  { slug: "industrial-valves-for-water-treatment", defaults: waterTreatmentDefaults },
  { slug: "pfa-vs-fep-lined-valves", defaults: pfaVsFepDefaults },
] as const;

export type OriginalArticleSlug = (typeof ORIGINAL_ARTICLES)[number]["slug"];

export function articleContentDocId(slug: string) {
  return `blog-${slug}`;
}

/** Fields named `image` hold an image path; the admin editor shows an upload control for them. */
export function isImageField(key: string) {
  return key === "image";
}

/** Only site paths (files in /public or uploaded images) can be shown; anything else falls back to the default. */
function keepValidImages<T>(value: T, defaults: T): T {
  if (Array.isArray(value) || typeof value !== "object" || value === null) return value;
  const result: Record<string, unknown> = { ...(value as Record<string, unknown>) };
  for (const [key, child] of Object.entries(result)) {
    const fallback = (defaults as Record<string, unknown>)[key];
    if (isImageField(key) && typeof child === "string" && !child.startsWith("/")) {
      result[key] = fallback;
    } else if (typeof child === "object" && child !== null && typeof fallback === "object") {
      result[key] = keepValidImages(child, fallback);
    }
  }
  return result as T;
}

export function resolveArticleContent<T>(defaults: T, saved: unknown): T {
  return keepValidImages(mergeWithDefaults(defaults, saved), defaults);
}

/**
 * Whether an original article is live. Articles are published unless an admin
 * moved one to draft (saved as `status: "draft"` on its content document).
 */
export async function isArticlePublished(slug: string): Promise<boolean> {
  const doc = await getRestDoc(`${HOME_CONTENT_COLLECTION}/${articleContentDocId(slug)}`, {
    revalidate: 60,
    tags: [BLOG_TAG],
  });
  return doc?.data.status !== "draft";
}

/** Reads an original article's saved text (if any) merged onto its defaults. Never throws. */
export async function getArticleContent<T>(slug: string, defaults: T): Promise<T> {
  const doc = await getRestDoc(`${HOME_CONTENT_COLLECTION}/${articleContentDocId(slug)}`, {
    revalidate: 60,
    tags: [BLOG_TAG],
  });
  return doc ? resolveArticleContent(defaults, doc.data) : defaults;
}
