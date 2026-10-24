"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Download, ChevronLeft, Maximize, Sparkles, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { ProductContent, ProductTable } from "@/lib/product-content";
import { rowCells } from "@/lib/product-content";
import { QuotePopup } from "@/components/QuotePopup";
import { cn } from "@/lib/utils";

/** Column layout of the group headings: start/end header index of each group. */
const groupColumns = (table: ProductTable) => {
  // Groups covering every column sit side by side (each starting with its own SIZE column);
  // otherwise the first column heading spans both heading rows.
  const full = table.groups.reduce((n, g) => n + g.span, 0) >= table.headers.length;
  let col = full ? 0 : 1;
  const starts: number[] = [];
  const ends: number[] = [];
  table.groups.forEach(g => {
    starts.push(col);
    col += g.span;
    ends.push(col - 1);
  });
  return { full, starts, ends };
};

/** Product page layout; the data comes from ./content.ts or the admin dashboard. */
export default function LargeBoreCastGateValveView({ content }: { content: ProductContent }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const product = { category: content.category, subTitle: content.title };
  const showcaseImages = content.images;
  const specs = content.specs;
  const tables = content.tables;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + showcaseImages.length) % showcaseImages.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % showcaseImages.length);
    }
  };

  const handleDownloadCSV = () => {
    const headers = ["Specification", "Details"];
    const rows = [
      ["Product", product.subTitle],
      ["Category", product.category],
      ...specs.map(spec => [spec.label + (spec.subLabel || ""), spec.value]),
    ];
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${product.subTitle.replace(/[^a-z0-9]/gi, '_')}_Data_Sheet.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Breadcrumbs */}
      <div className="bg-neutral-50 pt-32 pb-8 px-5 md:px-[63px]">
        <div className="container mx-auto">
          <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-foreground/60 mb-4">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <Link href="/#products" className="hover:text-secondary transition-colors">Products</Link>
            <ChevronRight className="size-4" />
            <span className="text-primary">{product.category}</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">Large Bore Cast</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">{product.subTitle}</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-20 px-5 md:px-[63px]" style={{ backgroundColor: 'rgba(243, 243, 243, 0.74)' }}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
            {/* Left Column: Image */}
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white border border-border shadow-lg">
              <Image
                src={showcaseImages[0]?.src || "/dummy-image.png"}
                alt={product.subTitle}
                fill
                className="object-contain p-8 md:p-12"
                priority
              />
            </div>

            {/* Right Column: Specs */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6">
                {specs.map((spec, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 border-b border-border pb-4 last:border-none">
                    <span className="text-primary font-bold text-sm md:text-base md:min-w-[220px] uppercase tracking-wide">
                      {spec.label}
                      {spec.subLabel && (
                        <>
                          <br />
                          <span className="text-[10px] md:text-xs opacity-70 font-normal uppercase">{spec.subLabel}</span>
                        </>
                      )} :
                    </span>
                    <span className="text-foreground/70 text-sm md:text-base leading-relaxed">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  variant="secondary" 
                  className="h-12 px-8 rounded-xl font-bold"
                  onClick={() => setIsQuoteOpen(true)}
                >
                  Request a Quote
                </Button>
                <Button 
                  variant="outline" 
                  className="h-12 px-8 rounded-xl font-bold border-primary text-primary hover:bg-neutral-100 hover:text-primary transition-colors"
                  onClick={handleDownloadCSV}
                >
                  <Download className="mr-2 size-5" /> Download Data Sheet
                </Button>
              </div>
            </div>
          </div>

          {showcaseImages.length > 0 && (
            <div className="mb-20 space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                <Sparkles className="size-3.5" /> Visual Showcase
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {showcaseImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-white border border-border shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-contain p-6"
                    />
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <Maximize className="size-6 text-primary" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-16">
            {/* Dimension Tables */}
            {tables.map((table, t) => {
              const grouped = table.groups.length > 0;
              const { full, starts, ends } = groupColumns(table);
              return (
            <div key={t} className={`bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden${grouped ? "" : " max-w-5xl mx-auto"}`}>
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    {table.title && (
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={table.headers.length} className="text-center font-bold text-primary uppercase py-6 text-lg">{table.title}</TableHead>
                    </TableRow>
                    )}
                    {grouped && (
                    <TableRow className="bg-white border-b border-neutral-300">
                      {!full && (
                        <TableHead rowSpan={2} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-6 text-lg">{table.headers[0]}</TableHead>
                      )}
                      {table.groups.map((group, g) => (
                        <TableHead key={g} colSpan={group.span} className={g === table.groups.length - 1 ? "text-center font-bold text-primary uppercase py-6 text-lg" : "text-center font-bold text-primary border-r border-neutral-200 uppercase py-6 text-lg"}>{group.label}</TableHead>
                      ))}
                    </TableRow>
                    )}
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      {table.headers.map((header, i) => {
                        if (grouped && !full && i === 0) return null;
                        const last = i === table.headers.length - 1;
                        const cls = last
                          ? "text-center font-bold text-primary py-4 uppercase leading-tight"
                          : i === 0 || starts.includes(i)
                            ? "text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase"
                            : "text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight";
                        return <TableHead key={i} className={cls}>{header}</TableHead>;
                      })}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table.rows.map((row, idx) => (
                      <TableRow key={idx} className={cn("border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-[10px] md:text-xs", row.kind === "section" && "bg-primary/5")}>
                        {rowCells(table, row).map((cell, i) => {
                          const last = i === table.headers.length - 1;
                          const cls = i === 0 || starts.includes(i)
                            ? cn("font-bold text-primary text-center border-r border-neutral-100 py-3", row.kind === "child" && "pl-8 text-left")
                            : last
                              ? "text-center text-foreground/80"
                              : ends.includes(i)
                                ? "text-center text-foreground/80 border-r border-neutral-200"
                                : "text-center text-foreground/80 border-r border-neutral-100";
                          return <TableCell key={i} className={cls}>{cell}</TableCell>;
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {table.note && (
              <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50 text-right">
                <p className="text-[10px] md:text-sm text-foreground/50 font-medium italic">
                  {table.note}
                </p>
              </div>
              )}
            </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={(open) => !open && setSelectedImageIndex(null)}>
        <DialogContent className="max-w-[95vw] max-h-[70vh] p-0 border-none bg-transparent shadow-none flex items-center justify-center overflow-visible z-[100]">
          <DialogTitle className="sr-only">Product Showcase Image</DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-16">
            {selectedImageIndex !== null && showcaseImages && (
              <>
                <button 
                  onClick={() => setSelectedImageIndex(null)}
                  className="absolute top-12 right-4 md:top-24 md:right-12 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all border border-white/10 z-[105]"
                >
                  <X className="size-8" />
                </button>

                <div className="relative w-full max-w-5xl aspect-video md:aspect-[1.6/1] rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
                  <Image
                    src={showcaseImages[selectedImageIndex].src}
                    alt={showcaseImages[selectedImageIndex].alt}
                    fill
                    className="object-contain bg-black/20"
                    priority
                  />
                </div>
                
                <button 
                  onClick={handlePrev}
                  className="absolute left-6 md:left-12 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10 z-[102]"
                >
                  <ChevronLeft className="size-8" />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-6 md:right-12 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10 z-[102]"
                >
                  <ChevronRight className="size-8" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <QuotePopup 
        isOpen={isQuoteOpen} 
        onOpenChange={setIsQuoteOpen} 
        productName={product.subTitle} 
      />

      <Footer />
    </main>
  );
}
