"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ProductContent } from "@/lib/product-content";
import { rowCells } from "@/lib/product-content";
import { QuotePopup } from "@/components/QuotePopup";
import { cn } from "@/lib/utils";
import { DataSheetDownload } from "@/components/products/DataSheetDownload";
import { ProductShowcase } from "@/components/products/ProductShowcase";

/** Product page layout; the data comes from ./content.ts or the admin dashboard. */
export default function FlangedDamperValveView({ content }: { content: ProductContent }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const product = { category: content.category, subTitle: content.title };

  const productImage = {
    imageUrl: content.images[0].src,
    description: product.subTitle
  };

  const specs = content.specs;

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
          <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#000000] mb-4">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <Link href="/#products" className="hover:text-secondary transition-colors">Products</Link>
            <ChevronRight className="size-4" />
            <span className="text-primary">{product.category}</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">{product.subTitle} - seatless design</h1>
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
                      {spec.subLabel ? (
                        <>
                          <br />
                          <span className="text-[10px] md:text-xs opacity-70 font-normal uppercase">{spec.subLabel}</span>
                        </>
                      ) : null} :
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

          {/* Visual Showcase: every image saved in the admin */}
          <ProductShowcase images={content.images} />

          <div className="space-y-16">
            {content.tables.map((table, t) => {
              const grouped = table.groups.length > 0;
              // Columns where each group starts / ends (groups cover the columns from the first one).
              const groupStarts = new Set<number>([0]);
              const groupEnds = new Set<number>();
              let col = 0;
              table.groups.forEach((g) => { groupStarts.add(col); col += g.span; groupEnds.add(col - 1); });
              const hasSections = table.rows.some((r) => r.kind === "section");
              const cellPy = grouped ? "py-3" : "py-4";
              const rowText = grouped ? "text-[10px] md:text-xs" : "text-xs md:text-sm";
              const sizeCls = (child: boolean) =>
                cn("font-bold text-primary text-center border-r border-neutral-100 py-3", grouped && !hasSections && "bg-neutral-50/20", child && "pl-8 text-left");
              return (
            <div key={t} className={`bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden${grouped ? "" : " max-w-4xl mx-auto"}`}>
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    {table.title && (
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={table.headers.length} className="text-center font-bold text-primary uppercase py-6 text-lg">
                        {table.title}
                      </TableHead>
                    </TableRow>
                    )}
                    {grouped && (
                    <TableRow className="bg-white border-b border-neutral-300">
                      {table.groups.map((g, i) => (
                        <TableHead key={i} colSpan={g.span} className={i === table.groups.length - 1 ? "text-center font-bold text-primary uppercase py-6 text-lg" : "text-center font-bold text-primary border-r border-neutral-200 uppercase py-6 text-lg"}>{g.label}</TableHead>
                      ))}
                    </TableRow>
                    )}
                    <TableRow className={`bg-neutral-50 border-b border-neutral-300${grouped ? " text-[10px] md:text-xs" : ""}`}>
                      {table.headers.map((header, i) => {
                        const last = i === table.headers.length - 1;
                        const plain = grouped ? groupStarts.has(i) || groupEnds.has(i) : i === 0;
                        const cls = `text-center font-bold text-primary${last ? "" : " border-r border-neutral-200"} ${cellPy} uppercase${plain ? "" : " leading-tight"}`;
                        return <TableHead key={i} className={cls}>{header}</TableHead>;
                      })}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table.rows.map((row, idx) => {
                      const section = row.kind === "section";
                      const cells = rowCells(table, row);
                      return (
                      <TableRow key={idx} className={cn(`border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${rowText}`, section && "bg-primary/5")}>
                        {cells.map((cell, i) => {
                          if (groupStarts.has(i) && (grouped || i === 0)) {
                            return <TableCell key={i} className={sizeCls(row.kind === "child")}>{section ? row.cells[0] : cell}</TableCell>;
                          }
                          const last = i === table.headers.length - 1;
                          const cls = last
                            ? "text-center text-[#000000]"
                            : `text-center text-[#000000] border-r ${grouped && groupEnds.has(i) ? "border-neutral-200" : "border-neutral-100"}`;
                          return <TableCell key={i} className={cls}>{section ? "" : cell}</TableCell>;
                        })}
                      </TableRow>
                      );
                    })}
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

      <QuotePopup 
        isOpen={isQuoteOpen} 
        onOpenChange={setIsQuoteOpen} 
        productName={product.subTitle} 
      />

      <Footer />
    </main>
  );
}
