"use client";

import { Settings, Maximize, Layers, Gauge, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { defaultHomeContent, type HomeContent } from "@/lib/home-content";
import { safeHref, safeId } from "@/lib/buttons";

const tileIcons = [Maximize, Layers, Settings, Gauge];

export function Products({ content = defaultHomeContent.products }: { content?: HomeContent["products"] }) {
  const brochureHref = safeHref(content.brochureButton.href, "/brochure.pdf");

  return (
    <section id="products" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-secondary font-bold text-sm uppercase tracking-widest mb-3">{content.label}</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-primary mb-6">{content.title}</h3>
          <p className="text-foreground/70 text-sm md:text-base mb-8">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 md:mb-20">
          {content.items.map((product) => (
            <Card 
              key={product.id} 
              className="overflow-hidden border border-border/40 bg-white rounded-[1.5rem] flex flex-col group shadow-sm hover:shadow-xl hover:shadow-secondary/5 hover:border-secondary/30 transition-all duration-300 h-full"
            >
              <div className="p-8 md:p-10 flex flex-col h-full">
                <div className="flex items-start gap-3 mb-8">
                  <div className="w-[3px] self-stretch bg-secondary rounded-full shrink-0 mt-1" />
                  <h3 className="text-xl md:text-2xl font-bold text-primary transition-colors group-hover:text-secondary leading-tight">
                    {product.title}
                  </h3>
                </div>

                <div className="flex flex-col flex-grow">
                  {product.specs && (
                    <div className="pb-4 text-primary/60 text-base font-medium">
                      {product.specs}
                    </div>
                  )}
                  
                  {product.features.map((feature, i) => (
                    <div 
                      key={i} 
                      className="py-4 border-t border-border/50 text-primary/70 text-base font-medium leading-relaxed"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}

          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div 
              className="relative flex flex-col items-center justify-center h-full py-12 px-8 bg-primary rounded-[2.5rem] text-white shadow-xl transition-all duration-500 group overflow-hidden gap-8"
            >
              <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 w-full text-center">
                <h4 className="text-xl md:text-2xl font-bold leading-tight">
                  {content.brochureHeading}
                </h4>
              </div>
              
              <div className="relative z-10 shrink-0">
                <a 
                  href={brochureHref} 
                  // Only file links (like the PDF brochure) should download; other links open normally.
                  download={/\.[a-z0-9]+$/i.test(brochureHref) ? "AMCO_Valves_Brochure.pdf" : undefined}
                  id={safeId(content.brochureButton.id)}
                  className="inline-flex items-center gap-3 bg-secondary px-6 md:px-10 py-3 md:py-4 rounded-2xl font-bold text-base md:text-lg shadow-xl shadow-secondary/20 hover:bg-secondary/90 transition-all hover:translate-y-[-2px] animate-glow"
                >
                  <Download className="size-6" />
                  {content.brochureButton.label}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {content.tiles.map((tile, i) => ({ ...tile, icon: tileIcons[i % tileIcons.length] })).map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "p-6 md:p-8 rounded-[2rem] border border-border flex flex-col gap-4 shadow-sm transition-all duration-300 group",
                idx === 0
                  ? "bg-primary text-white hover:bg-secondary" 
                  : "bg-white text-primary hover:bg-secondary hover:text-white"
              )}
            >
              <item.icon className="text-secondary group-hover:text-white transition-colors size-8" />
              <h4 className="text-base md:text-lg font-bold">{item.title}</h4>
              <p className={cn(
                "text-xs md:text-sm group-hover:text-white/90",
                idx === 0 ? "text-white/70" : "text-foreground/60"
              )}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}