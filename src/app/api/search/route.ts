import { getSearchIndex } from "@/lib/search-index";

// Rebuilt at most once a minute, matching how often products and posts refresh elsewhere.
export const revalidate = 60;

/** The header search index (pages, products, blog posts). Filtering happens in the browser. */
export async function GET() {
  return Response.json(await getSearchIndex());
}
