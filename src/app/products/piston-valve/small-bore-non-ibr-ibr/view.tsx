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
import type { ProductContent } from "@/lib/product-content";
import { rowCells } from "@/lib/product-content";
import { QuotePopup } from "@/components/QuotePopup";
import { DataSheetDownload } from "@/components/products/DataSheetDownload";

/** Product page layout; the data comes from ./content.ts or the admin dashboard. */
export default function SmallBorePistonValveView({ content }: { content: ProductContent }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const product = { category: content.category, subTitle: content.title };
  const tables = content.tables;

  const productImage = {
    imageUrl: content.images[0].src,
    description: product.subTitle
  };

  const specs = content.specs;

  // Data-sheet section titles and column names of the original table (used while its column count is unchanged).
  const csvTables = [
    { title: "Dimension Table (800#)", headers: ["Size", "Face to Face", "Bore", "Socketweld Bore", "Height (Open)", "Height (Close)", "Wheel Dia"] },
  ];

  const handleDownloadCSV = () => {
    const headers = ["Specification", "Details"];
    const rows = [
      ["Product", product.subTitle],
      ["Category", product.category],
      ...specs.map(spec => [spec.label + (spec.subLabel || ""), spec.value]),
      ...tables.flatMap((table, t) => {
        const csv = csvTables[t] && csvTables[t].headers.length === table.headers.length ? csvTables[t] : null;
        return [
          [""],
          [csv ? csv.title : table.title],
          csv ? csv.headers : table.headers,
          ...table.rows.map(row => rowCells(table, row)),
        ];
      }),
    ];
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Small_Bore_Piston_Valve_Data_Sheet.csv`);
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
          <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#000000] mb-4">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <Link href="/#products" className="hover:text-secondary transition-colors">Products</Link>
            <ChevronRight className="size-4" />
            <span className="text-primary">{product.category}</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">Seatless & Glandless</p>
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
                src={productImage.imageUrl}
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
                          <span className="text-[10px] md:text-xs opacity-70 uppercase font-normal">{spec.subLabel}</span>
                        </>
                      )} :
                    </span>
                    <span className="text-[#000000] text-sm md:text-base leading-relaxed">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  type="button"
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
                  src={productImage.imageUrl}
                  alt={productImage.description}
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

          {/* Dimension Tables */}
          {tables.map((table, t) => (
          <div key={t} className={`bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-6xl mx-auto${t > 0 ? " mt-12" : ""}`}>
            <div className="overflow-x-auto">
              <Table className="border-collapse w-full">
                <TableHeader>
                  {table.title && (
                  <TableRow className="bg-white border-b border-neutral-300">
                    <TableHead colSpan={table.headers.length} className="text-center font-bold text-primary uppercase py-6 text-lg">{table.title}</TableHead>
                  </TableRow>
                  )}
                  <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                    {table.headers.map((header, i) => {
                      const last = i === table.headers.length - 1;
                      const cls = i === 0
                        ? "text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase"
                        : last
                          ? "text-center font-bold text-primary py-4 uppercase leading-tight"
                          : "text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight";
                      return <TableHead key={i} className={cls}>{header}</TableHead>;
                    })}
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
                        const last = i === table.headers.length - 1;
                        const cls = i === 0
                          ? (row.kind === "child" ? "font-medium text-primary/80 text-center border-r border-neutral-100 py-3 text-[11px] md:text-xs" : "font-bold text-primary text-center border-r border-neutral-100 py-3")
                          : last
                            ? "text-center text-[#000000]"
                            : "text-center text-[#000000] border-r border-neutral-100";
                        return <TableCell key={i} className={cls}>{cell}</TableCell>;
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {table.note && (
            <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50">
              <p className="text-[10px] md:text-sm text-[#000000] font-medium italic text-right">
                {table.note}
              </p>
            </div>
            )}
          </div>
          ))}
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
                src={productImage.imageUrl}
                alt={productImage.description}
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
