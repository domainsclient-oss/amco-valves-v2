"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QuotePopup } from "@/components/QuotePopup";
import type { ProductContent } from "@/lib/product-content";
import { rowCells } from "@/lib/product-content";

/** Product page layout; the data comes from ./content.ts or the admin dashboard. */
export default function PtfeLinedFullLugButterflyValveView({ content }: { content: ProductContent }) {
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
      ...specs.map(spec => [spec.label, spec.value]),
      ...content.tables.flatMap(table => [
        [""],
        [table.title],
        table.headers,
        ...table.rows.map(row => rowCells(table, row)),
      ]),
    ];
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `PTFE_Lined_Full_Lug_BFV_Data_Sheet.csv`);
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
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">Centric Disc Design</p>
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
            <div key={t} className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-4xl mx-auto">
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
                    <TableRow className="bg-neutral-50 border-b border-neutral-300">
                      {table.headers.map((header, i) => {
                        if (grouped && i === 0) return null;
                        const border = i === cols - 1 ? "" : " border-r border-neutral-200";
                        return <TableHead key={i} className={`text-center font-bold text-primary${border} py-4 uppercase${i === 0 ? "" : " leading-tight"}`}>{header}</TableHead>;
                      })}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table.rows.map((row, idx) => row.kind === "section" ? (
                      <TableRow key={idx} className="bg-neutral-50 border-b border-neutral-200 text-xs md:text-sm">
                        <TableCell colSpan={cols} className="font-bold text-primary text-center py-3 uppercase">{row.cells[0]}</TableCell>
                      </TableRow>
                    ) : (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                        {rowCells(table, row).map((cell, i) => {
                          const cls = i === 0
                            ? (row.kind === "child" ? "font-medium text-primary/80 text-center border-r border-neutral-100 py-3 text-[11px] md:text-xs" : "font-bold text-primary text-center border-r border-neutral-100 py-3")
                            : i === cols - 1
                              ? "text-center text-foreground/80"
                              : `text-center text-foreground/80 border-r ${groupEnds.has(i) ? "border-neutral-200" : "border-neutral-100"}`;
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

      <QuotePopup 
        isOpen={isQuoteOpen} 
        onOpenChange={setIsQuoteOpen} 
        productName={product.subTitle} 
      />

      <Footer />
    </main>
  );
}
