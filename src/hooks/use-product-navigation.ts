"use client";

import { useEffect, useState } from "react";
import { productNavigationData, type MegaMenuCategory } from "@/lib/navigation-data";
import { getProductTaxonomy, getPublishedCustomProducts, mergeProductNavigation } from "@/lib/custom-products";

let cached: Promise<MegaMenuCategory[][]> | null = null;

/**
 * The products menu, including products (and their new categories) published from the admin dashboard.
 * Starts with the built-in menu (so the first render matches the server HTML)
 * and adds the extra products once they've loaded.
 */
export function useProductNavigation(): MegaMenuCategory[][] {
  const [navigation, setNavigation] = useState<MegaMenuCategory[][]>(productNavigationData);

  useEffect(() => {
    let active = true;
    cached ??= Promise.all([getPublishedCustomProducts(), getProductTaxonomy()]).then(([customs, taxonomy]) =>
      mergeProductNavigation(customs, taxonomy),
    );
    cached.then((loaded) => {
      if (active) setNavigation(loaded);
    });
    return () => {
      active = false;
    };
  }, []);

  return navigation;
}
