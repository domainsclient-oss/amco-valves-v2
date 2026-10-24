"use client";

import { useEffect, useState } from "react";
import { defaultHomeContent, getHomeContent, type HomeContent } from "@/lib/home-content";

let cached: Promise<HomeContent> | null = null;

/**
 * Loads the editable home content in the browser, for components rendered on
 * pages that don't pass it in. Starts with the defaults so the first render
 * matches the server HTML, then swaps in saved content once loaded.
 */
export function useHomeContent(): HomeContent {
  const [content, setContent] = useState<HomeContent>(defaultHomeContent);

  useEffect(() => {
    let active = true;
    cached ??= getHomeContent();
    cached.then((loaded) => {
      if (active) setContent(loaded);
    });
    return () => {
      active = false;
    };
  }, []);

  return content;
}
