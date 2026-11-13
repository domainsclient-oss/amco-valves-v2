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
import { DataSheetDownload } from "@/components/products/DataSheetDownload";
import { ProductShowcase } from "@/components/products/ProductShowcase";

/** Product page layout; the data comes from ./content.ts or the admin dashboard. */
export default function Trunnion3PieceView({ content }: { content: ProductContent }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const specs = content.specs;
  
  // This layout shows a single photo: the first one.
  const productImage = {
    imageUrl: content.images[0].src,
    description: content.images[0].alt
  };

  const handleDownloadCSV = () => {
    const headers = ["Specification", "Details"];
    const rows = [
      ["Product", content.title],
      ["Category", "Ball Valve"],
      ["Sub Category", content.category],
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
    link.setAttribute("download", `Trunnion_3pc_Ball_Valve_data_sheet.csv`);
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
          <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#000000] mb-4">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <Link href="/#products" className="hover:text-secondary transition-colors">Products</Link>
            <ChevronRight className="size-4" />
            <span className="text-primary">{content.category}</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">{content.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">{content.title}</h1>
        </div>
      </div>

      <section className="py-12 md:py-20 px-5 md:px-[63px]" style={{ backgroundColor: '#f3f3f3bd' }}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white border border-border shadow-lg">
              <Image src={productImage.imageUrl} alt={productImage.description} fill className="object-contain p-8 md:p-12" priority />
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6">
                {specs.map((spec, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 border-b border-border pb-4 last:border-none">
                    <span className="text-primary font-bold text-sm md:text-base md:min-w-[220px] uppercase tracking-wide">{spec.label} :</span>
                    <span className="text-[#000000] text-sm md:text-base leading-relaxed">{spec.value}</span>
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
                  <Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-primary text-primary hover:bg-neutral-100 hover:text-primary transition-colors" onClick={handleDownloadCSV}>
                    <Download className="mr-2 size-5" /> Download Data Sheet
                  </Button>
                </DataSheetDownload>
              </div>
            </div>
          </div>

          {/* Visual Showcase: every image saved in the admin */}
          <ProductShowcase images={content.images} />

          <div className="space-y-12">
            {content.tables.map((table, t) => {
              const n = table.headers.length;
              // Columns that start a group (side-by-side tables) are styled like the SIZE column; group ends get a stronger divider and no leading-tight.
              const starts = new Set<number>([0]);
              const ends = new Set<number>();
              let col = 0;
              table.groups.forEach((g) => { starts.add(col); col += g.span; ends.add(col - 1); });
              return (
              <div key={t} className={`bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden${t > 0 ? " max-w-4xl mx-auto" : ""}`}>
                <div className="overflow-x-auto">
                  <Table className="border-collapse w-full">
                    <TableHeader>
                      {table.title && (
                      <TableRow className="bg-white border-b border-neutral-300">
                        <TableHead colSpan={n} className="text-center font-bold text-primary uppercase py-6">{table.title}</TableHead>
                      </TableRow>
                      )}
                      {table.groups.length > 0 && (
                      <TableRow className="bg-white border-b border-neutral-300">
                        {table.groups.map((g, i) => (
                          <TableHead key={i} colSpan={g.span} className={`text-center font-bold text-primary${i < table.groups.length - 1 ? " border-r border-neutral-200" : ""} uppercase py-6`}>{g.label}</TableHead>
                        ))}
                      </TableRow>
                      )}
                      <TableRow className="bg-neutral-50 border-b border-neutral-300">
                        {table.headers.map((header, i) => {
                          const border = i === n - 1 ? "" : " border-r border-neutral-200";
                          const cls = starts.has(i)
                            ? `text-center font-bold text-primary${border} text-xs py-4`
                            : ends.has(i)
                              ? `text-center font-bold text-primary${border} text-xs py-4 uppercase`
                              : `text-center font-bold text-primary${border} text-xs py-4 leading-tight uppercase`;
                          return <TableHead key={i} className={cls}>{header}</TableHead>;
                        })}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {table.rows.map((row, idx) => row.kind === "section" ? (
                        <TableRow key={idx} className="bg-neutral-50 border-b border-neutral-200">
                          <TableCell colSpan={n} className="font-bold text-primary text-center py-4 uppercase">{row.cells[0]}</TableCell>
                        </TableRow>
                      ) : (
                        <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                          {rowCells(table, row).map((cell, i) => {
                            const border = i === n - 1 ? "" : ends.has(i) ? " border-r border-neutral-200" : " border-r border-neutral-100";
                            const cls = i === 0 && row.kind === "child"
                              ? `font-medium text-primary/80 text-center${border} py-4 text-[11px] md:text-xs`
                              : starts.has(i)
                                ? `font-bold text-primary text-center${border} py-4`
                                : `text-center text-[#000000]${border}`;
                            return <TableCell key={i} className={cls}>{cell}</TableCell>;
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {table.note && (
                <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50">
                  <p className="text-sm text-[#000000] font-medium italic text-right">
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

      <QuotePopup 
        isOpen={isQuoteOpen} 
        onOpenChange={setIsQuoteOpen} 
        productName="3 Piece Design Trunnion Mounted Ball Valve" 
      />

      <Footer />
    </main>
  );
}
