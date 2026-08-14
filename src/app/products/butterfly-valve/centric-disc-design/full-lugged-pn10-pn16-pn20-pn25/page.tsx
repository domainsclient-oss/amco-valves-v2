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

export default function FullLuggedButterflyValvePage() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const productImage = {
    imageUrl: "/products/centric-disc-designfull-lugged-pn10-pn16-pn20-pn25.jpg",
    description: "Full Lugged Butterfly Valve"
  };

  const specs = [
    { label: "Size", value: "DN40 - DN1000" },
    { label: "Material of construction", value: "CI / DI / WCB / CF8 / CF8M / CF3 / CF3M / DSS / SDS / AL. BR" },
    { label: "Seat / Liner", value: "BUNA-N, EPDM, SILICON, VITON" },
    { label: "End connection", value: "Lugged to suit ANSI & ND flanges" },
    { label: "Pressure rating", value: "PN10# / PN16# / PN20# / PN25#" },
    { label: "Mode of operation", value: "Lever, Gear, Actuator" },
    { label: "Manufacturing Standard", value: "API 609 (Cat.A)" },
    { label: "Testing Standard", value: "API 598" },
  ];

  const dimensionData = [
    { size: "DN40", f: "33", th: "101", bh: "55", ll: "180", gear: "175" },
    { size: "DN50", f: "41", th: "113", bh: "59", ll: "180", gear: "175" },
    { size: "DN65", f: "44", th: "121", bh: "67", ll: "180", gear: "175" },
    { size: "DN80", f: "44", th: "128", bh: "75", ll: "180", gear: "175" },
    { size: "DN100", f: "51", th: "146", bh: "94", ll: "270", gear: "175" },
    { size: "DN125", f: "54", th: "158", bh: "108", ll: "270", gear: "175" },
    { size: "DN150", f: "54", th: "174", bh: "120", ll: "270", gear: "175" },
    { size: "DN200", f: "58", th: "198", bh: "147", ll: "320", gear: "250" },
    { size: "DN250", f: "68", th: "245", bh: "200", ll: "550", gear: "250" },
    { size: "DN300", f: "78", th: "284", bh: "268", ll: "550", gear: "350" },
    { size: "DN350", f: "78", th: "318", bh: "291", ll: "-", gear: "350" },
    { size: "DN400", f: "102", th: "360", bh: "310", ll: "-", gear: "500" },
    { size: "DN450", f: "114", th: "390", bh: "334", ll: "-", gear: "500" },
    { size: "DN500", f: "127", th: "410", bh: "362", ll: "-", gear: "500" },
    { size: "DN600", f: "154", th: "504", bh: "432", ll: "-", gear: "600" },
    { size: "DN700", f: "165", th: "580", bh: "-", ll: "-", gear: "-" },
    { size: "DN750", f: "165", th: "595", bh: "-", ll: "-", gear: "-" },
    { size: "DN800", f: "190", th: "670", bh: "-", ll: "-", gear: "-" },
    { size: "DN900", f: "203", th: "705", bh: "-", ll: "-", gear: "-" },
    { size: "DN1000", f: "216", th: "782", bh: "-", ll: "-", gear: "-" },
  ];

  const handleDownloadCSV = () => {
    const headers = ["Specification", "Details"];
    const rows = [
      ["Product", "Full Lugged BFV"],
      ["Category", "Butterfly Valve"],
      ["Sub Category", "Centric Disc Design"],
      ["Model", "Full Lugged PN10# / PN16# / PN20# / PN25#"],
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
    link.setAttribute("download", `Full_Lugged_BFV_data_sheet.csv`);
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
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">Centric Disc Design</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">Full Lugged PN10# / PN16# / PN20# / PN25#</h1>
        </div>
      </div>

      <section className="py-12 md:py-20 px-5 md:px-[63px]" style={{ backgroundColor: '#f3f3f3bd' }}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white border border-border shadow-lg">
              <Image
                src={productImage.imageUrl}
                alt="Full Lugged Butterfly Valve"
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

          <div className="space-y-12">
            {/* General Dimensions Table */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={6} className="text-center font-bold text-primary uppercase py-6">LUGGED BFV</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">CENTER TO TOP HEIGHT</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">CENTER TO BOTTOM HEIGHT</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs uppercase leading-tight">LEVER LENGTH</TableHead>
                      <TableHead className="text-center font-bold text-primary text-xs uppercase leading-tight">GEAR OPERATION WHEEL DIA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dimensionData.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-4">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.th}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.bh}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ll}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.gear}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50">
                <p className="text-base text-foreground/50 font-medium italic text-right">
                  All dimensions are in mm
                </p>
              </div>
            </div>
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
        productName="Full Lugged PN10# / PN16# / PN20# / PN25# Butterfly Valve" 
      />

      <Footer />
    </main>
  );
}
