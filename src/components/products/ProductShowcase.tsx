"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize, Sparkles, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { ProductContent } from "@/lib/product-content";

/**
 * "Visual Showcase" grid with a full-screen lightbox.
 * Shows every image saved for the product in the admin, however many there are.
 */
export function ProductShowcase({ images }: { images: ProductContent["images"] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const list = (images ?? []).filter((img) => img && img.src);
  if (list.length === 0) return null;

  const step = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation();
    if (selected !== null) setSelected((selected + delta + list.length) % list.length);
  };

  return (
    <>
      <div className="mb-20 space-y-8">
        <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
          <Sparkles className="size-3.5" /> Visual Showcase
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {list.map((img, idx) => (
            <button
              key={`${img.src}-${idx}`}
              type="button"
              onClick={() => setSelected(idx)}
              className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-white border border-border shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
            >
              <Image src={img.src} alt={img.alt || ""} fill className="object-contain p-6" />
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <Maximize className="size-6 text-primary" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-[95vw] max-h-[70vh] p-0 border-none bg-transparent shadow-none flex items-center justify-center overflow-visible z-[100]">
          <DialogTitle className="sr-only">Product Showcase Image</DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-16">
            {selected !== null && list[selected] && (
              <>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="absolute top-12 right-4 md:top-24 md:right-12 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all border border-white/10 z-[105]"
                >
                  <X className="size-8" />
                </button>

                <div className="relative w-full max-w-5xl aspect-video md:aspect-[1.6/1] rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
                  <Image
                    src={list[selected].src}
                    alt={list[selected].alt || ""}
                    fill
                    className="object-contain bg-black/20"
                    priority
                  />
                </div>

                {list.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => step(e, -1)}
                      className="absolute left-6 md:left-12 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10 z-[102]"
                    >
                      <ChevronLeft className="size-8" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => step(e, 1)}
                      className="absolute right-6 md:right-12 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10 z-[102]"
                    >
                      <ChevronRight className="size-8" />
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
