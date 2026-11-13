import { getPublishedBlogPosts } from "@/lib/blog";
import { getArticleContent, isArticlePublished, pfaVsFepDefaults, waterTreatmentDefaults } from "@/lib/blog-articles";
import { getProductTaxonomy, getPublishedCustomProducts, mergeProductNavigation } from "@/lib/custom-products";

/**
 * Everything the header search can find: site pages, products (the same list as
 * the Products menu, including ones published from the admin) and live blog posts.
 */

export type SearchCategory = "pages" | "products" | "blog";

export interface SearchItem {
  category: SearchCategory;
  title: string;
  /** Short context shown under the title (section, product family, post summary). */
  subtitle: string;
  href: string;
  /** Extra words that should match but aren't shown. */
  keywords: string;
  /** Products only: the product family, used to group the full product list. */
  group?: string;
}

const PAGES: SearchItem[] = [
  { title: "Home", subtitle: "AMCO Industrial Valves", href: "/", keywords: "home main start" },
  { title: "About Us", subtitle: "Who we are", href: "/#about", keywords: "about company history team" },
  { title: "Products", subtitle: "Our valve range", href: "/#products", keywords: "products valves catalog range" },
  { title: "Certificates", subtitle: "Quality standards & approvals", href: "/#certificates", keywords: "certificates certification iso quality approvals standards" },
  { title: "Gallery", subtitle: "Industrial gallery", href: "/#gallery", keywords: "gallery photos images" },
  { title: "Contact", subtitle: "Get in touch / request a quote", href: "/#contact", keywords: "contact quote enquiry phone email address" },
  { title: "Blog", subtitle: "Articles and updates", href: "/blog", keywords: "blog articles news updates" },
  { title: "Compliance", subtitle: "Compliance information", href: "/compliance", keywords: "compliance" },
  { title: "Privacy Policy", subtitle: "Legal", href: "/privacy-policy", keywords: "privacy policy legal data" },
  { title: "Terms of Service", subtitle: "Legal", href: "/terms-of-service", keywords: "terms service conditions legal" },
  { title: "Cookie Policy", subtitle: "Legal", href: "/cookie-policy", keywords: "cookie policy legal" },
].map((p) => ({ ...p, category: "pages" as const }));

async function productItems(): Promise<SearchItem[]> {
  const [customs, taxonomy] = await Promise.all([getPublishedCustomProducts(), getProductTaxonomy()]);
  return mergeProductNavigation(customs, taxonomy)
    .flat()
    .flatMap((category) =>
      category.subCategories.flatMap((sub) =>
        sub.products.map((product) => ({
          category: "products" as const,
          title: product.name,
          subtitle: `${category.title} · ${sub.name}`,
          href: product.href,
          keywords: `${category.title} ${sub.name}`,
          group: category.title,
        })),
      ),
    );
}

async function blogItems(): Promise<SearchItem[]> {
  const [water, pfa, waterLive, pfaLive, adminPosts] = await Promise.all([
    getArticleContent("industrial-valves-for-water-treatment", waterTreatmentDefaults),
    getArticleContent("pfa-vs-fep-lined-valves", pfaVsFepDefaults),
    isArticlePublished("industrial-valves-for-water-treatment"),
    isArticlePublished("pfa-vs-fep-lined-valves"),
    getPublishedBlogPosts(),
  ]);
  const originals = [
    { live: waterLive, card: water.card, href: "/blog/industrial-valves-for-water-treatment" },
    { live: pfaLive, card: pfa.card, href: "/blog/pfa-vs-fep-lined-valves" },
  ]
    .filter((a) => a.live)
    .map((a) => ({
      category: "blog" as const,
      title: a.card.heading,
      subtitle: a.card.description,
      href: a.href,
      keywords: a.card.category,
    }));
  const posts = adminPosts.map((post) => ({
    category: "blog" as const,
    title: post.cardTitle || post.title,
    subtitle: post.cardDescription || post.excerpt,
    href: `/blog/${post.slug}`,
    keywords: `${post.title} ${post.category}`,
  }));
  return [...posts, ...originals];
}

/** The full index. Each source falls back to nothing on error, so search never breaks the page. */
export async function getSearchIndex(): Promise<SearchItem[]> {
  const [products, blog] = await Promise.all([
    productItems().catch(() => [] as SearchItem[]),
    blogItems().catch(() => [] as SearchItem[]),
  ]);
  return [...PAGES, ...products, ...blog];
}
