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
import type { ProductContent } from "@/lib/product-content";
import { rowCells } from "@/lib/product-content";
import { QuotePopup } from "@/components/QuotePopup";

/** Product page layout; the data comes from ./content.ts or the admin dashboard. */
export default function WaferFlangedButterflyValveView({ content }: { content: ProductContent }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const showcaseImages = content.images;

  const productImage = {
    imageUrl: showcaseImages[0].src,
    description: content.title
  };

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
      ["Product", "Wafer Flanged BFV"],
      ["Category", "Butterfly Valve"],
      ["Sub Category", content.category],
      ["Model", content.title],
      ...specs.map(spec => [spec.label, spec.value])
    ];
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Wafer_Flanged_BFV_data_sheet.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="bg-neutral-50 pt-32 pb-8 px-5 md:px-[63px]">
        <div className="container mx-auto">
          <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-foreground/60 mb-4">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <Link href="/#products" className="hover:text-secondary transition-colors">Products</Link>
            <ChevronRight className="size-4" />
            <span className="text-primary">Butterfly Valve</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">{content.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">{content.title}</h1>
        </div>
      </div>

      <section className="py-12 md:py-20 px-5 md:px-[63px]" style={{ backgroundColor: '#f3f3f3bd' }}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white border border-border shadow-lg">
              <Image
                src={productImage.imageUrl}
                alt="Wafer Flanged Butterfly Valve"
                fill
                className="object-contain p-8 md:p-12"
                priority
              />
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6">
                {specs.map((spec, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 border-b border-border pb-4 last:border-none">
                    <span className="text-primary font-bold text-sm md:text-base md:min-w-[220px] uppercase tracking-wide">
                      {spec.label} :
                    </span>
                    <span className="text-foreground/70 text-sm md:text-base leading-relaxed">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button variant="secondary" className="h-12 px-8 rounded-xl font-bold" onClick={() => setIsQuoteOpen(true)}>
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

          {/* Visual Showcase Section */}
          <div className="mb-20 space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
              <Sparkles className="size-3.5" /> Visual Showcase
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {showcaseImages.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-white border border-border shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.05] group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain p-4"
                  />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Maximize className="size-5 text-primary" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            {tables.map((table, t) => {
              const grouped = table.groups.length > 0;
              // Group boundaries: a group-end column gets a stronger body divider, a later group start a smaller heading.
              const groupEnds = new Set<number>();
              const groupStarts = new Set<number>();
              table.groups.reduce((col, g, gi) => {
                if (gi > 0) groupStarts.add(col);
                if (gi < table.groups.length - 1) groupEnds.add(col + g.span - 1);
                return col + g.span;
              }, 1);
              const headCls = (i: number) => {
                const base = "text-center font-bold text-primary";
                if (i === table.headers.length - 1) return `${base} text-xs uppercase leading-tight`;
                if (i === 0 || (grouped && i === 1)) return `${base} border-r border-neutral-200 py-4 uppercase`;
                if (grouped && groupStarts.has(i)) return `${base} border-r border-neutral-200 text-xs`;
                if (!grouped && i === table.headers.length - 2) return `${base} border-r border-neutral-200 text-xs uppercase leading-tight`;
                return `${base} border-r border-neutral-200 py-4 uppercase leading-tight`;
              };
              return (
            <div key={t} className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    {table.title && (
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={table.headers.length} className="text-center font-bold text-primary uppercase py-6">{table.title}</TableHead>
                    </TableRow>
                    )}
                    {grouped && (
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead rowSpan={2} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-4">{table.headers[0]}</TableHead>
                      {table.groups.map((group, i) => (
                        <TableHead key={i} colSpan={group.span} className={i === table.groups.length - 1 ? "text-center font-bold text-primary uppercase py-4" : "text-center font-bold text-primary border-r border-neutral-200 uppercase py-4"}>{group.label}</TableHead>
                      ))}
                    </TableRow>
                    )}
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      {table.headers.map((header, i) => grouped && i === 0 ? null : (
                        <TableHead key={i} className={headCls(i)}>{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table.rows.map((row, idx) => row.kind === "section" ? (
                      <TableRow key={idx} className="bg-neutral-50 border-b border-neutral-200 text-xs md:text-sm">
                        <TableCell colSpan={table.headers.length} className="font-bold text-primary text-center py-3 uppercase">{row.cells[0]}</TableCell>
                      </TableRow>
                    ) : (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        {rowCells(table, row).map((cell, i) => {
                          const cls = i === 0
                            ? (row.kind === "child" ? "font-medium text-primary/80 text-center border-r border-neutral-100 py-4 text-[11px] md:text-xs" : "font-bold text-primary text-center border-r border-neutral-100 py-4")
                            : i === table.headers.length - 1
                              ? "text-center text-foreground/80"
                              : `text-center text-foreground/80 border-r ${groupEnds.has(i) ? "border-neutral-200" : "border-neutral-100"}`;
                          return <TableCell key={i} className={cls}>{cell}</TableCell>;
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {table.note && (t === 0 ? (
              <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50">
                <p className="text-base text-foreground/50 font-medium italic text-right">
                  {table.note}
                </p>
              </div>
              ) : (
              <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50 text-right">
                <p className="text-sm text-foreground/50 font-medium italic">
                  {table.note}
                </p>
              </div>
              ))}
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
            {selectedImageIndex !== null && (
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
        productName={`${content.title} Butterfly Valve`} 
      />

      <Footer />
    </main>
  );
}
