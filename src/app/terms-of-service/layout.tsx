import type { Metadata } from "next";

// The page is a client component, so its search-engine settings live here.
export const metadata: Metadata = {
  title: "Terms Of Service | AMCO Valves",
  description: "Read AMCO Valves’ terms of service information, including relevant website policies and company disclosures. Contact AMCO for further clarification.",
  keywords: ["AMCO terms of service"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
