import type { Metadata } from "next";

// The page is a client component, so its search-engine settings live here.
export const metadata: Metadata = {
  title: "Cookie Policy | AMCO Valves",
  description: "Read AMCO Valves’ cookie policy information, including relevant website policies and company disclosures. Contact AMCO for further clarification.",
  keywords: ["AMCO cookie policy"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
