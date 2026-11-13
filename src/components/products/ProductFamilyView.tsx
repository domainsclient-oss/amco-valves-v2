"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuotePopup } from "@/components/QuotePopup";
import { cn } from "@/lib/utils";
import type { ProductFamily } from "@/lib/product-families";
import type { FamilyCard } from "@/lib/product-family-data";

const sentenceCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Distinct values in order of first appearance. */
const distinct = (values: string[]) => [...new Set(values.filter(Boolean))];

function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-secondary font-bold uppercase tracking-[0.14em] text-xs", className)}>{children}</p>;
}

/** Parent page of a product family: overview, filterable grid of its products, selection guide, comparison and FAQs. */
export function ProductFamilyView({ family, cards }: { family: ProductFamily; cards: FamilyCard[] }) {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [query, setQuery] = useState("");
  const [quoteFor, setQuoteFor] = useState<string | null>(null);

  const facetValues = useMemo(
    () => Object.fromEntries(family.facets.map((f) => [f.key, distinct(cards.map((c) => c.attrs[f.key] ?? ""))])),
    [family.facets, cards],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards.filter((card) => {
      for (const [key, value] of Object.entries(filters)) if (value && card.attrs[key] !== value) return false;
      if (!q) return true;
      const haystack = [card.title, card.group, card.size, card.material, ...Object.values(card.attrs)].join(" ").toLowerCase();
      return q.split(/\s+/).every((word) => haystack.includes(word));
    });
  }, [cards, filters, query]);

  const filtered = query.trim() !== "" || Object.values(filters).some(Boolean);
  const clearFilters = () => {
    setFilters({});
    setQuery("");
  };

  // Stats strip: the number of products, then up to three facets.
  const stats = [
    { value: `${cards.length} configuration${cards.length === 1 ? "" : "s"}`, note: "Currently listed on AMCO" },
    ...family.facets
      .filter((f) => facetValues[f.key].length)
      .slice(0, 3)
      .map((f) => {
        const values = facetValues[f.key];
        return values.length === 1
          ? { value: values[0], note: f.label }
          : { value: `${values.length} ${f.plural}`, note: values.join(" / ") };
      }),
  ];

  const chips = distinct(family.facets.flatMap((f) => facetValues[f.key])).filter((v) => v !== "Standard").slice(0, 8);
  const heroImage = cards.find((c) => c.image)?.image ?? null;

  // Comparison table: one row per group, listing the values its products cover.
  const groups = distinct(cards.map((c) => c.group)).map((group) => {
    const items = cards.filter((c) => c.group === group);
    return {
      group,
      count: items.length,
      values: family.facets.map((f) => distinct(items.map((c) => c.attrs[f.key] ?? "")).join(", ") || "—"),
    };
  });

  const guide = family.guide.filter((card) => card.title.trim() || card.points.length);

  const faqs = [
    ...family.faqs.filter((f) => f.q.trim() && f.a.trim()),
    ...family.facets.slice(0, 2).flatMap((f) =>
      facetValues[f.key].length > 1
        ? [
            {
              q: `Which ${f.label.toLowerCase()} options are listed for AMCO ${family.title}?`,
              a: `AMCO lists ${facetValues[f.key].join(", ")} options in this range. Open each product page for its size range, materials of construction, standards and dimension tables.`,
            },
          ]
        : [],
    ),
    {
      q: `What information should I send to request a ${family.singular || "product"} quotation?`,
      a: "Share the valve size, pressure rating, end connection, line media, operating pressure and temperature, preferred materials, mode of operation and quantity. Mention any certification or inspection requirements so AMCO can confirm the right configuration.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-neutral-50 to-white pt-32 pb-16 md:pb-20 px-5 md:px-[63px]">
        <div className="container mx-auto">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-[#000000] mb-8">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <Link href="/#products" className="hover:text-secondary transition-colors">Products</Link>
            <ChevronRight className="size-4" />
            <span className="text-primary">{family.title}</span>
          </nav>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_420px] gap-10 lg:gap-16 items-center">
            <div>
              <Eyebrow>Industrial Valves / Product Family</Eyebrow>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mt-3 leading-tight">{family.title}</h1>
              <p className="mt-5 text-base md:text-lg text-neutral-600 leading-relaxed max-w-2xl">{family.intro}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href="#range"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors"
                >
                  Explore {cards.length} configuration{cards.length === 1 ? "" : "s"} <ArrowDown className="size-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setQuoteFor(family.title)}
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-primary text-primary bg-white font-bold text-sm hover:bg-neutral-100 transition-colors"
                >
                  Request technical assistance <ArrowUpRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Overview panel */}
            <div className="relative overflow-hidden rounded-[1.75rem] bg-primary text-primary-foreground p-7 md:p-8 shadow-xl">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-white/5" />
              <div aria-hidden className="pointer-events-none absolute -right-6 -bottom-24 size-56 rounded-full bg-secondary/10" />
              <div className="relative">
                <Eyebrow className="text-secondary">Product family overview</Eyebrow>
                {family.chooseBy && <p className="mt-3 text-2xl md:text-[1.7rem] font-bold leading-snug">{family.chooseBy}</p>}
                {chips.length > 0 && (
                  <ul className="flex flex-wrap gap-2 mt-5">
                    {chips.map((chip) => (
                      <li key={chip} className="rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs font-medium">
                        {chip}
                      </li>
                    ))}
                  </ul>
                )}
                {heroImage && (
                  <div className="relative mt-6 aspect-[16/10] rounded-2xl bg-white overflow-hidden">
                    <Image src={heroImage.src} alt={heroImage.alt} fill sizes="(min-width: 1024px) 420px, 100vw" className="object-contain p-5" priority />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="px-5 md:px-[63px] -mt-6 md:-mt-8 relative z-10">
        <div className="container mx-auto">
          <dl className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
            {stats.map((s, i) => (
              <div
                key={i}
                className={cn(
                  "p-5 md:p-6 border-border",
                  i % 2 === 1 && "border-l",
                  i >= 2 && "border-t lg:border-t-0",
                  i === 2 && "lg:border-l",
                )}
              >
                <dt className="sr-only">{s.note}</dt>
                <dd className="text-primary font-bold text-base md:text-lg">{s.value}</dd>
                <dd className="text-neutral-500 text-xs md:text-sm mt-1">{s.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Product range */}
      <section id="range" className="scroll-mt-28 py-16 md:py-20 px-5 md:px-[63px]">
        <div className="container mx-auto">
          <Eyebrow>Browse by specification</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3">{sentenceCase(family.singular || family.title)} range</h2>
          <p className="mt-3 text-neutral-600 max-w-2xl">
            Every configuration below links to its own product page with full specifications, materials and dimension tables.
            {family.facets.length > 0 && ` Filter by ${family.facets.map((f) => f.label.toLowerCase()).join(", ")}.`}
          </p>

          {/* Filters */}
          <div className="mt-8 rounded-2xl border border-border bg-white p-4 md:p-5 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] items-end">
              {family.facets.map((f) => (
                <label key={f.key} className="block">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-primary mb-2">{f.label}</span>
                  <span className="relative block">
                    <select
                      value={filters[f.key] ?? ""}
                      onChange={(e) => setFilters((prev) => ({ ...prev, [f.key]: e.target.value }))}
                      className="w-full appearance-none h-11 rounded-xl border border-input bg-white pl-3 pr-9 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">All {f.plural}</option>
                      {facetValues[f.key].map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                  </span>
                </label>
              ))}
              <label className="block">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-primary mb-2">Search products</span>
                <span className="relative block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`e.g. ${(chips[1] ?? chips[0] ?? "flanged").toLowerCase()}`}
                    className="w-full h-11 rounded-xl border border-input bg-white pl-9 pr-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </span>
              </label>
              <button
                type="button"
                onClick={clearFilters}
                disabled={!filtered}
                className="h-11 px-5 rounded-xl border border-primary text-primary text-sm font-bold hover:bg-neutral-100 transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
              >
                Clear filters
              </button>
            </div>
          </div>

          <p className="mt-6 text-sm text-neutral-500" aria-live="polite">
            Showing {visible.length} of {cards.length} configuration{cards.length === 1 ? "" : "s"}
          </p>

          {visible.length ? (
            <ul className="mt-4 grid gap-5 md:gap-6 md:grid-cols-2">
              {visible.map((card) => (
                <li key={card.slug}>
                  <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-secondary/60 hover:shadow-lg focus-within:ring-2 focus-within:ring-ring">
                    <div className="flex gap-4 p-5 md:p-6">
                      <div className="min-w-0 flex-1">
                        <span className="inline-block rounded-md bg-secondary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary">
                          {card.group}
                        </span>
                        <h3 className="mt-3 text-lg md:text-xl font-bold text-primary leading-snug">
                          {/* The link covers the whole card, so the card is clickable anywhere. */}
                          <Link href={card.href} className="after:absolute after:inset-0 after:rounded-2xl focus:outline-none">
                            {card.title}
                          </Link>
                        </h3>
                        <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                          {sentenceCase(family.singular || family.title)}
                          {card.size ? ` · Size ${card.size}` : ""}. Review this configuration&apos;s dimensions, materials and operation options on the product page.
                        </p>
                      </div>
                      {card.image && (
                        <div className="relative hidden sm:block size-24 shrink-0 rounded-xl border border-border bg-white">
                          <Image src={card.image.src} alt="" fill sizes="96px" className="object-contain p-2" />
                        </div>
                      )}
                    </div>

                    {Object.keys(card.attrs).length > 0 && (
                      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-border bg-neutral-50 px-5 md:px-6 py-4">
                        {family.facets
                          .filter((f) => card.attrs[f.key])
                          .map((f) => (
                            <div key={f.key}>
                              <dt className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">{f.label}</dt>
                              <dd className="mt-1 text-sm font-bold text-neutral-900">{card.attrs[f.key]}</dd>
                            </div>
                          ))}
                      </dl>
                    )}

                    <div className="mt-auto flex items-center justify-between gap-3 px-5 md:px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:text-secondary transition-colors">
                        View specifications <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuoteFor(card.title)}
                        className="relative z-10 h-10 px-4 rounded-xl border border-primary text-primary bg-white text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        Request quote
                      </button>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-border bg-neutral-50 p-10 text-center">
              <p className="font-bold text-primary">{cards.length ? "No configurations match these filters." : "Products for this range will be listed here soon."}</p>
              {cards.length > 0 ? (
                <button type="button" onClick={clearFilters} className="mt-3 text-sm font-bold text-secondary hover:underline">
                  Clear filters
                </button>
              ) : (
                <button type="button" onClick={() => setQuoteFor(family.title)} className="mt-3 text-sm font-bold text-secondary hover:underline">
                  Ask AMCO about this range
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Selection guide */}
      {guide.length > 0 && (
      <section className="bg-neutral-50 py-16 md:py-20 px-5 md:px-[63px]">
        <div className="container mx-auto">
          <Eyebrow>Engineering selection support</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3">How to choose the right configuration</h2>
          <p className="mt-3 text-neutral-600 max-w-2xl">
            Use these distinctions to narrow your shortlist, then confirm the final specification with AMCO&apos;s engineering team.
          </p>
          <div className="mt-8 grid gap-5 md:gap-6 md:grid-cols-2">
            {guide.map((card) => (
              <div key={card.title} className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
                <h3 className="text-xl font-bold text-primary">{card.title}</h3>
                <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{card.intro}</p>
                <ul className="mt-5 space-y-3">
                  {card.points.map((p) => (
                    <li key={p.term} className="flex gap-3 text-sm text-neutral-800 leading-relaxed">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
                      <span>
                        <strong className="text-primary">{p.term}:</strong> {p.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Comparison */}
      {groups.length > 0 && (
      <section className="py-16 md:py-20 px-5 md:px-[63px]">
        <div className="container mx-auto">
          <Eyebrow>Quick comparison</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3">Compare the available designs</h2>
          <p className="mt-3 text-neutral-600 max-w-2xl">A side-by-side view of the design groups in this range and the options each one covers.</p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th scope="col" className="px-5 py-4 text-left font-bold">Design group</th>
                  {family.facets.map((f) => (
                    <th key={f.key} scope="col" className="px-5 py-4 text-left font-bold">{f.label}</th>
                  ))}
                  <th scope="col" className="px-5 py-4 text-left font-bold">Product options</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((g) => (
                  <tr key={g.group} className="border-t border-border even:bg-neutral-50">
                    <th scope="row" className="px-5 py-4 text-left font-bold text-primary">{g.group}</th>
                    {g.values.map((v, i) => (
                      <td key={i} className="px-5 py-4 text-neutral-700">{v}</td>
                    ))}
                    <td className="px-5 py-4 text-neutral-700">
                      {g.count} variant{g.count === 1 ? "" : "s"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      )}

      {/* FAQs */}
      <section className="bg-neutral-50 py-16 md:py-20 px-5 md:px-[63px]">
        <div className="container mx-auto max-w-4xl lg:max-w-none">
          <Eyebrow>Common buyer questions</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3">{sentenceCase(family.singular || family.title)} FAQs</h2>
          <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-white">
            {faqs.map((faq, i) => (
              <details key={faq.q} open={i === 0} className="group/faq px-5 md:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-bold text-primary [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="size-5 shrink-0 text-secondary transition-transform group-open/faq:rotate-180" />
                </summary>
                <p className="pb-5 -mt-1 text-sm text-neutral-600 leading-relaxed max-w-3xl">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-primary text-primary-foreground py-12 md:py-14 px-5 md:px-[63px]">
        <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Need help specifying {family.singular ? `a ${family.singular}` : "the right product"}?</h2>
            <p className="mt-2 text-primary-foreground/75">Share your line conditions and required configuration to request a technical quotation.</p>
          </div>
          <button
            type="button"
            onClick={() => setQuoteFor(family.title)}
            className="inline-flex shrink-0 items-center gap-2 h-12 px-7 rounded-xl bg-secondary text-secondary-foreground font-bold hover:bg-secondary/90 transition-colors self-start md:self-auto"
          >
            Request a Quote <ArrowUpRight className="size-4" />
          </button>
        </div>
      </section>

      <Footer />

      {quoteFor && (
        <QuotePopup key={quoteFor} isOpen onOpenChange={(open) => !open && setQuoteFor(null)} productName={quoteFor} />
      )}
    </main>
  );
}
