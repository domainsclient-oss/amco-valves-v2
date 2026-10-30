"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Download, Maximize, Sparkles, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { QuotePopup } from "@/components/QuotePopup";
import type { ProductContent } from "@/lib/product-content";
import { rowCells } from "@/lib/product-content";
import { DataSheetDownload } from "@/components/products/DataSheetDownload";

/** Product page layout; the data comes from ./content.ts or the admin dashboard. */
export default function DoubleOffsetFullLuggedBFVView({ content }: { content: ProductContent }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const product = { category: content.category, subTitle: content.title };
  const specs = content.specs;

  const handleDownloadCSV = () => {
    const headers = ["Specification", "Details"];
    const rows = [
      ["Product", product.subTitle],
      ["Category", product.category],
      ...specs.map(spec => [spec.label, spec.value]),
    ];
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Full_Lugged_Double_Offset_BFV_Data_Sheet.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const productImageMain = content.images[0].src;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Breadcrumbs */}
      <div className="bg-neutral-50 pt-32 pb-8 px-5 md:px-[63px]">
        <div className="container mx-auto">
          <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#000000] mb-4">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <Link href="/#products" className="hover:text-secondary transition-colors">Products</Link>
            <ChevronRight className="size-4" />
            <span className="text-primary">{product.category}</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">Double Offset Design</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">{product.subTitle}</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-20 px-5 md:px-[63px]" style={{ backgroundColor: '#f3f3f3bd' }}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
            {/* Left Column: Image */}
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white border border-border shadow-lg">
              <Image
                src={productImageMain}
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
                      {spec.label} :
                    </span>
                    <span className="text-[#000000] text-sm md:text-base leading-relaxed">
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
                {/* With several data-sheet tables this button opens a menu to download all or one. */}
                <DataSheetDownload content={content}>
                  <Button 
                    variant="outline" 
                    className="h-12 px-8 rounded-xl font-bold border-primary text-primary hover:bg-neutral-100 hover:text-primary transition-colors"
                    onClick={handleDownloadCSV}
                  >
                    <Download className="mr-2 size-5" /> Download Data Sheet
                  </Button>
                </DataSheetDownload>
              </div>
            </div>
          </div>

          {/* Visual Showcase Section */}
          <div className="mb-20 space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
              <Sparkles className="size-3.5" /> Visual Showcase
            </div>
            <div className="max-w-md">
              <button 
                onClick={() => setIsLightboxOpen(true)}
                className="relative aspect-square w-full rounded-[2rem] overflow-hidden bg-white border border-border shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
              >
                <Image
                  src={productImageMain}
                  alt={product.subTitle}
                  fill
                  className="object-contain p-6"
                />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <Maximize className="size-6 text-primary" />
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-16">
            {content.tables.map((table, t) => {
              const cols = table.headers.length;
              const grouped = table.groups.length > 0;
              // Last column of each heading group (the first column spans both heading rows).
              const groupEnds = new Set<number>();
              table.groups.reduce((start, g) => {
                groupEnds.add(start + g.span - 1);
                return start + g.span;
              }, 1);
              return (
            <div key={t} className={`bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden ${grouped ? "max-w-7xl" : "max-w-5xl"} mx-auto`}>
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    {table.title && (
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={cols} className="text-center font-bold text-primary uppercase py-6 text-lg">
                        {table.title}
                      </TableHead>
                    </TableRow>
                    )}
                    {grouped && (
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead rowSpan={2} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-6 text-sm">{table.headers[0]}</TableHead>
                      {table.groups.map((g, i) => (
                        <TableHead key={i} colSpan={g.span} className={i === table.groups.length - 1 ? "text-center font-bold text-primary uppercase py-4 bg-neutral-50/50" : "text-center font-bold text-primary border-r border-neutral-200 uppercase py-4 bg-neutral-50/50"}>{g.label}</TableHead>
                      ))}
                    </TableRow>
                    )}
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      {table.headers.map((header, i) => {
                        if (grouped && i === 0) return null;
                        const last = i === cols - 1;
                        const border = last ? "" : " border-r border-neutral-200";
                        const tight = grouped ? groupEnds.has(i) && !last : i > 0;
                        return <TableHead key={i} className={`text-center font-bold text-primary${border} ${grouped ? "py-3" : "py-4"} uppercase${tight ? " leading-tight" : ""}`}>{header}</TableHead>;
                      })}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table.rows.map((row, idx) => row.kind === "section" ? (
                      <TableRow key={idx} className="bg-neutral-50 border-b border-neutral-200 text-xs md:text-sm">
                        <TableCell colSpan={cols} className="font-bold text-primary text-center py-3 uppercase">{row.cells[0]}</TableCell>
                      </TableRow>
                    ) : (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        {rowCells(table, row).map((cell, i) => {
                          if (i === 0) {
                            const cls = `${row.kind === "child" ? "font-medium text-primary/80" : "font-bold text-primary"} text-center border-r border-neutral-100 py-2.5${grouped ? " bg-neutral-50/20" : ""}${row.kind === "child" ? " text-[11px] md:text-xs" : ""}`;
                            return <TableCell key={i} className={cls}>{cell}</TableCell>;
                          }
                          const cls = i === cols - 1
                            ? "text-center text-[#000000]"
                            : `text-center text-[#000000] border-r ${groupEnds.has(i) ? "border-neutral-200" : "border-neutral-100"}`;
                          return <TableCell key={i} className={cls}>{cell}</TableCell>;
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {table.note && (
              <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50 text-right">
                <p className="text-[10px] md:text-sm text-[#000000] font-medium italic">
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
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[70vh] p-0 border-none bg-transparent shadow-none flex items-center justify-center overflow-visible z-[100]">
          <DialogTitle className="sr-only">Product Showcase Image</DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-16">
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-12 right-4 md:top-24 md:right-12 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all border border-white/10 z-[105]"
            >
              <X className="size-8" />
            </button>

            <div className="relative w-full max-w-5xl aspect-video md:aspect-[1.6/1] rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
              <Image
                src={productImageMain}
                alt={product.subTitle}
                fill
                className="object-contain bg-black/20"
                priority
              />
            </div>
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
