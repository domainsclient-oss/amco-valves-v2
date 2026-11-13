"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, FileText, Loader2, Newspaper, Package, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SearchCategory, SearchItem } from "@/lib/search-index";

type Filter = "all" | SearchCategory;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pages", label: "Pages" },
  { value: "products", label: "Products" },
  { value: "blog", label: "Blog" },
];

const GROUPS: { category: SearchCategory; label: string; icon: typeof FileText }[] = [
  { category: "pages", label: "Pages", icon: FileText },
  { category: "products", label: "Products", icon: Package },
  { category: "blog", label: "Blog", icon: Newspaper },
];

/** With "All" selected, most results shown per group so one long list doesn't push the others off screen.
    Picking a single category shows its complete list. */
const MAX_PER_GROUP = 8;

// Loaded once per visit, the first time search is opened.
let indexPromise: Promise<SearchItem[]> | null = null;
function loadIndex() {
  indexPromise ??= fetch("/api/search")
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => {
      indexPromise = null; // let a later open retry
      return [];
    });
  return indexPromise;
}

const normalize = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

/** Every word typed must appear somewhere; matches in the title rank first. */
function score(item: SearchItem, words: string[]) {
  const title = normalize(item.title);
  const rest = normalize(`${item.subtitle} ${item.keywords}`);
  let total = 0;
  for (const w of words) {
    if (title.startsWith(w)) total += 4;
    else if (title.includes(w)) total += 3;
    else if (rest.includes(w)) total += 1;
    else return 0;
  }
  return total;
}

/** Search button for the header; opens a centred search panel with a category filter. */
export function SiteSearch({ triggerClassName, iconClassName }: { triggerClassName?: string; iconClassName?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState<SearchItem[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    loadIndex().then(setIndex);
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.querySelector("[data-radix-select-viewport]")) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // A single category lists everything in it (in site order) until you type; typing narrows that list.
  const browseAll = filter !== "all";
  const words = useMemo(() => normalize(query).split(/\s+/).filter(Boolean), [query]);

  const groups = useMemo(() => {
    if (!index || (!words.length && !browseAll)) return [];
    return GROUPS.filter((g) => !browseAll || g.category === filter)
      .map((g) => {
        const inGroup = index.filter((item) => item.category === g.category);
        const matches = words.length
          ? inGroup
              .map((item) => ({ item, s: score(item, words) }))
              .filter((m) => m.s > 0)
              .sort((a, b) => b.s - a.s)
              .map((m) => m.item)
          : inGroup;
        return { ...g, total: matches.length, items: browseAll ? matches : matches.slice(0, MAX_PER_GROUP) };
      })
      .filter((g) => g.items.length);
  }, [words, browseAll, filter, index]);

  // The product list is long, so it's split under its product families (as in the Products menu).
  const sections = (items: SearchItem[], category: SearchCategory) => {
    if (category !== "products" || !browseAll) return [{ heading: "", items }];
    const byGroup = new Map<string, SearchItem[]>();
    for (const item of items) {
      const key = item.group ?? "";
      byGroup.set(key, [...(byGroup.get(key) ?? []), item]);
    }
    return [...byGroup].map(([heading, list]) => ({ heading, items: list }));
  };

  const close = () => setOpen(false);
  // Enter opens the best match, only once something has been typed.
  const firstResult = words.length ? groups[0]?.items[0] : undefined;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className={cn("flex items-center justify-center rounded-xl text-primary hover:text-secondary transition-colors", triggerClassName)}
      >
        <Search className={cn("size-5", iconClassName)} />
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-[90] bg-primary/30 backdrop-blur-sm flex items-start justify-center px-4 pt-[12vh] md:pt-[16vh] animate-in fade-in-0 duration-200"
          onMouseDown={(e) => e.target === e.currentTarget && close()}
          role="dialog"
          aria-modal="true"
          aria-label="Search the site"
        >
          <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-200">
            <form
              className="flex items-center gap-2 md:gap-3 p-3 md:p-4 border-b border-border"
              onSubmit={(e) => {
                e.preventDefault();
                if (firstResult) {
                  close();
                  router.push(firstResult.href);
                }
              }}
            >
              <Select value={filter} onValueChange={(v) => setFilter(v as Filter)}>
                <SelectTrigger
                  aria-label="Search in"
                  className="w-[110px] md:w-[130px] shrink-0 h-11 rounded-xl border-border bg-primary/5 font-bold text-primary text-sm focus:ring-secondary"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[100] rounded-xl">
                  {FILTERS.map((f) => (
                    <SelectItem key={f.value} value={f.value} className="font-semibold text-primary">
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/40 pointer-events-none" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search ${filter === "all" ? "the site" : FILTERS.find((f) => f.value === filter)?.label.toLowerCase()}…`}
                  className="w-full h-11 rounded-xl border border-border bg-white pl-9 pr-3 text-[15px] text-primary placeholder:text-primary/40 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all [&::-webkit-search-cancel-button]:hidden"
                  aria-label="Search"
                />
              </div>

              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                className="shrink-0 p-2 rounded-full bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 transition-all"
              >
                <X className="size-5" />
              </button>
            </form>

            <div className="max-h-[55vh] overflow-y-auto p-3 md:p-4">
              {!index ? (
                <div className="flex items-center justify-center gap-2 py-6 text-sm text-primary/50">
                  <Loader2 className="size-4 animate-spin" /> Loading…
                </div>
              ) : !words.length && !browseAll ? (
                <p className="text-sm text-primary/50 text-center py-6">
                  Type to search pages, products and blog posts, or pick a category to see everything in it.
                </p>
              ) : !groups.length ? (
                <p className="text-sm text-primary/50 text-center py-6">
                  {words.length ? (
                    <>
                      No results for <span className="font-bold text-primary">&ldquo;{query.trim()}&rdquo;</span>
                      {browseAll && " in " + FILTERS.find((f) => f.value === filter)?.label}.
                    </>
                  ) : (
                    "Nothing here yet."
                  )}
                </p>
              ) : (
                <div className="space-y-5">
                  {groups.map((g) => (
                    <div key={g.category}>
                      <h4 className="text-secondary font-bold text-[11px] uppercase tracking-[0.15em] px-2 mb-2">
                        {g.label}
                        <span className="text-primary/40 normal-case tracking-normal font-semibold">
                          {g.total > g.items.length ? ` · top ${g.items.length} of ${g.total}` : ` · ${g.total}`}
                        </span>
                      </h4>
                      <div className="space-y-3">
                        {sections(g.items, g.category).map((section) => (
                          <div key={section.heading || "all"}>
                            {section.heading && (
                              <h5 className="text-primary font-bold text-[12px] px-2 mt-1 mb-1">{section.heading}</h5>
                            )}
                            <ul className="space-y-1">
                              {section.items.map((item) => (
                                <li key={item.href + item.title}>
                                  <Link
                                    href={item.href}
                                    onClick={close}
                                    className="group flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-primary/5 transition-colors"
                                  >
                                    <span className="shrink-0 size-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                                      <g.icon className="size-4" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className="block text-sm font-bold text-primary truncate">{item.title}</span>
                                      {item.subtitle && <span className="block text-xs text-[#000000]/60 truncate">{item.subtitle}</span>}
                                    </span>
                                    <ArrowRight className="size-4 text-primary/30 group-hover:text-secondary group-hover:translate-x-0.5 transition-all shrink-0" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      , document.body)}
    </>
  );
}
