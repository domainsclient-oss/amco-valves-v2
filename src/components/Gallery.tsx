"use client";

import { useState } from "react";
import Image from "next/image";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { defaultHomeContent, type HomeContent } from "@/lib/home-content";

export function Gallery({ content = defaultHomeContent.gallery }: { content?: HomeContent["gallery"] }) {
  const [selectedImage, setSelectedImage] = useState<ImagePlaceholder | null>(null);
  
  // Gallery photos (editable in the admin). Only site paths are rendered; anything else would break next/image.
  const galleryImages: ImagePlaceholder[] = content.images
    .filter((img) => img.src.startsWith("/"))
    .map((img) => ({ id: img.id, imageUrl: img.src, description: img.alt, imageHint: img.hint }));

  return (
    <section id="gallery" className="py-12 md:py-24 bg-primary overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-secondary font-bold text-xs uppercase tracking-[0.4em] mb-6">
            {content.label}
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            {content.title}
          </h3>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="relative aspect-[1.3/1] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.03] group border-4 border-white/5 text-left focus:outline-none focus:ring-2 focus:ring-secondary/50"
            >
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                data-ai-hint={image.imageHint}
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[85vh] p-0 border-none bg-transparent shadow-none flex items-center justify-center overflow-visible z-[100]">
          <DialogTitle className="sr-only">
            {selectedImage?.description || "Gallery Image View"}
          </DialogTitle>
          
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
            {selectedImage && (
              <>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10 z-[105]"
                >
                  <X className="size-8" />
                </button>
                
                <div className="relative w-full max-w-5xl aspect-video md:aspect-[1.6/1] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 animate-in zoom-in-95 duration-300">
                  <Image
                    src={selectedImage.imageUrl}
                    alt={selectedImage.description}
                    fill
                    className="object-contain bg-black/20"
                    priority
                  />
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
