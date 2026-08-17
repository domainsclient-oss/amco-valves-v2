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
import { QuotePopup } from "@/components/QuotePopup";

export default function Trunnion3PiecePage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const productImage = {
    imageUrl: "/dummy-image.png",
    description: "3 Piece Trunnion Ball Valve"
  };

  const specs = [
    { label: "Size", value: "DN100 - DN300" },
    { label: "Material of construction", value: "WCB / CF8 / CF8M / CF3 / CF3M" },
    { label: "End connection", value: "FLANGED" },
    { label: "Pressure rating", value: "150# / 300# / 600#" },
    { label: "Mode of operation", value: "Lever, Actuator" },
    { label: "Manufacturing Standard", value: "ISO 17292 / API 6D / API 608" },
    { label: "Testing Standard", value: "ISO 5208 / ISO 10497 / API 607" },
  ];

  const table150 = [
    { size: "DN100", f: "229", d: "230", h: "Ø 19 X 8", pcd: "190.5" },
    { size: "DN125", f: "", d: "255", h: "Ø 22.2 X 8", pcd: "215.9" },
    { size: "DN150", f: "394", d: "280", h: "Ø 22.2 X 8", pcd: "241.3" },
    { size: "DN200", f: "457", d: "345", h: "Ø 22.2 X 8", pcd: "298.5" },
    { size: "DN250", f: "533", d: "405", h: "Ø 25.4 X 12", pcd: "362" },
    { size: "DN300", f: "610", d: "485", h: "Ø 25.4 X 12", pcd: "431.8" },
  ];

  const handleDownloadCSV = () => {
    const headers = ["Specification", "Details"];
    const rows = [
      ["Product", "3 Piece Design Flanged ANSI 150#, 300#, 600#"],
      ["Category", "Ball Valve"],
      ["Sub Category", "Trunnion Mounted"],
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
          <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-foreground/60 mb-4">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <Link href="/#products" className="hover:text-secondary transition-colors">Products</Link>
            <ChevronRight className="size-4" />
            <span className="text-primary">Trunnion Mounted</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">Trunnion Mounted</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">3 Piece Design Flanged ANSI 150#, 300#, 600#</h1>
        </div>
      </div>

      <section className="py-12 md:py-20 px-5 md:px-[63px]" style={{ backgroundColor: '#f3f3f3bd' }}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white border border-border shadow-lg">
              <Image src={productImage.imageUrl} alt="3 Piece Trunnion Ball Valve" fill className="object-contain p-8 md:p-12" priority />
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6">
                {specs.map((spec, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 border-b border-border pb-4 last:border-none">
                    <span className="text-primary font-bold text-sm md:text-base md:min-w-[220px] uppercase tracking-wide">{spec.label} :</span>
                    <span className="text-foreground/70 text-sm md:text-base leading-relaxed">{spec.value}</span>
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
                <Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-primary text-primary hover:bg-neutral-100 hover:text-primary transition-colors" onClick={handleDownloadCSV}>
                  <Download className="mr-2 size-5" /> Download Data Sheet
                </Button>
              </div>
            </div>
          </div>

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
            <div className="bg-white rounded-[1.5rem] border border-border shadow-xl overflow-hidden max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={5} className="text-center font-bold text-primary uppercase py-4">TRUNNION 3PC FLANGED END 150#</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs py-4">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs uppercase leading-tight">FACE TO FACE (FL)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs uppercase leading-tight">OUTER DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs uppercase leading-tight">HOLE DIA X NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary text-xs uppercase">PCD</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table150.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-4">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.d}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.pcd}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </section>

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
        productName="3 Piece Design Trunnion Mounted Ball Valve" 
      />

      <Footer />
    </main>
  );
}
