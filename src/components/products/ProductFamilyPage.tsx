import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductFamilyView } from "@/components/products/ProductFamilyView";
import { getPublishedParentPage, type ParentPage } from "@/lib/parent-pages";
import { getFamilyCards } from "@/lib/product-family-data";
import { seoMetadata } from "@/lib/seo";

const SITE_URL = "https://www.amcovalves.com";

/** Title, description, keywords and share image of a parent page (empty fields fall back to its title / intro). */
export async function productFamilyMetadata(slug: string): Promise<Metadata> {
  const page = await getPublishedParentPage(slug);
  if (!page) return {};
  return seoMetadata(page.seo, { title: `${page.title} | AMCO Valves`, description: page.intro.slice(0, 160) || undefined });
}

/** Server part of a parent page (/products/<slug>): loads the page and its visible products and adds structured data. */
export async function ProductFamilyPage({ slug, page: given }: { slug: string; page?: ParentPage }) {
  const page = given ?? (await getPublishedParentPage(slug));
  if (!page) notFound();
  const cards = await getFamilyCards(page);
  if (!cards) notFound();

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/#products` },
        { "@type": "ListItem", position: 3, name: page.title, item: `${SITE_URL}/products/${page.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: page.title,
      itemListElement: cards.map((card, i) => ({ "@type": "ListItem", position: i + 1, name: card.title, url: `${SITE_URL}${card.href}` })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <ProductFamilyView family={page} cards={cards} />
    </>
  );
}
