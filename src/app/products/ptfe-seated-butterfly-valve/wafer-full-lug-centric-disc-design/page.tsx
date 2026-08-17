"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { productSpecsRegistry } from "@/lib/product-specs";
import { QuotePopup } from "@/components/QuotePopup";

export default function PtfeSeatedFullLugButterflyValvePage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const slug = "ptfe-seated-butterfly-valve/wafer-full-lug-centric-disc-design";
  const product = productSpecsRegistry[slug];

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-40 pb-20 container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-primary">Product Not Found</h1>
          <p className="text-foreground/60 mt-4">The product specification you are looking for is not available.</p>
          <Button className="mt-8" asChild>
            <Link href="/#products">Back to Products</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const specs = [
    { label: "Size", value: product.size },
    { label: "Material of construction", value: product.material },
    { label: "Seat", value: product.seat },
    { label: "End connection", value: product.endConnection },
    { label: "Pressure rating", value: product.pressureRating },
    { label: "Mode of operation", value: product.modeOfOperation },
    { label: "Manufacturing Standard", value: product.manufacturingStandard },
    { label: "Testing Standard", value: product.testingStandard },
  ];

  const dimensionData = [
    { size: "DN50", ftf: "43", bore: "51" },
    { size: "DN65", ftf: "46", bore: "64" },
    { size: "DN80", ftf: "46", bore: "76" },
    { size: "DN100", ftf: "52", bore: "101" },
    { size: "DN125", ftf: "56", bore: "125" },
    { size: "DN150", ftf: "56", bore: "152" },
    { size: "DN200", ftf: "60", bore: "203" },
    { size: "DN250", ftf: "68", bore: "254" },
    { size: "DN300", ftf: "78", bore: "305" },
  ];

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
    link.setAttribute("download", `PTFE_Seated_Full_Lug_BFV_Data_Sheet.csv`);
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
            <span className="text-primary">PTFE Seated Butterfly Valve</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">{product.subTitle}</h1>
        </div>
      </div>

      <section className="py-12 md:py-20 px-5 md:px-[63px]" style={{ backgroundColor: '#f3f3f3bd' }}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white border border-border shadow-lg">
              <Image
                src="https://picsum.photos/seed/amco-full-lug-bfv/800/800"
                alt={product.subTitle}
                fill
                className="object-contain p-8 md:p-12"
                priority
                data-ai-hint="butterfly valve"
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

          <div className="space-y-16">
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={3} className="text-center font-bold text-primary uppercase py-6 text-lg">
                        PTFE SEATED FULL LUG BFV DIMENSIONS
                      </TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE</TableHead>
                      <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">BORE</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dimensionData.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.bore}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50">
                <p className="text-[10px] md:text-sm text-foreground/50 font-medium italic text-right">
                  All dimensions are in mm
                </p>
              </div>
            </div>
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
