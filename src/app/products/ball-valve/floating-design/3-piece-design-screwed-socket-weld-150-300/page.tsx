"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Download, ChevronLeft, Maximize, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function ThreePieceBallValvePage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const showcaseImages = [
    { src: "/products/3pc-design-screwed-1.png", alt: "3PC Design Screwed View 1" },
    { src: "/products/3pc-design-screwed-2.png", alt: "3PC Design Screwed View 2" },
    { src: "/products/3pc-design-screwed-3.png", alt: "3PC Design Screwed View 3" },
  ];

  const productImage = {
    imageUrl: showcaseImages[0].src,
    description: "3 Piece Design Screwed / Socket weld"
  };

  const specs = [
    { label: "Size", value: "DN6 - DN100" },
    { label: "Material of construction", value: "WCB / CF8 / CF8M / CF3 / CF3M" },
    { label: "End connection", value: "BSPF / NPTF / SW / BW" },
    { label: "Pressure rating", value: "150# / 300#" },
    { label: "Mode of operation", value: "Lever, Actuator" },
    { label: "Manufacturing Standard", value: "ISO 17292" },
    { label: "Testing Standard", value: "ISO 5208" },
  ];

  const dimensionData = [
    { size: "DN8", f150: "63", l150: "110", h150: "50", f300: "63", l300: "110", h300: "50" },
    { size: "DN10", f150: "63", l150: "110", h150: "50", f300: "63", l300: "110", h300: "50" },
    { size: "DN15", f150: "63", l150: "110", h150: "50", f300: "63", l300: "110", h300: "50" },
    { size: "DN20", f150: "75", l150: "110", h150: "55", f300: "75", l300: "110", h300: "55" },
    { size: "DN25", f150: "87", l150: "140", h150: "70", f300: "87", l300: "140", h300: "70" },
    { size: "DN32", f150: "88", l150: "180", h150: "26", f300: "88", l300: "180", h300: "26" },
    { size: "DN40", f150: "110", l150: "180", h150: "90", f300: "110", l300: "180", h300: "90" },
    { size: "DN50", f150: "112", l150: "180", h150: "105", f300: "112", l300: "180", h300: "105" },
    { size: "DN65", f150: "on request", l150: "on request", h150: "on request", f300: "on request", l300: "on request", h300: "on request" },
    { size: "DN80", f150: "162", l150: "290", h150: "135", f300: "162", l300: "290", h300: "135" },
    { size: "DN100", f150: "on request", l150: "on request", h150: "on request", f300: "on request", l300: "on request", h300: "on request" },
  ];

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
      ["Product", "3 Piece Design Ball Valve"],
      ["Category", "Ball Valve"],
      ["Title", "Floating Design"],
      ["Model", "3 Piece Design Screwed / Socket weld 150# & 300#"],
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
    link.setAttribute("download", `3_Piece_Ball_Valve_150_300_data_sheet.csv`);
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
            <span className="text-primary">Ball Valve</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider">Floating Design</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">3 Piece Design Screwed / Socket weld 150# & 300#</h1>
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
                alt="3 Piece Ball Valve"
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
                <Button variant="secondary" className="h-12 px-8 rounded-xl font-bold">
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

          {/* Dimension Table Section */}
          <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="border-collapse w-full">
                <TableHeader>
                  <TableRow className="bg-white border-b border-neutral-300">
                    <TableHead rowSpan={2} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-6">SIZE</TableHead>
                    <TableHead colSpan={3} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-4">3PC DESIGN SCREWED / SOCKETWELD 150#</TableHead>
                    <TableHead colSpan={3} className="text-center font-bold text-primary uppercase py-4">3PC DESIGN SCREWED / SOCKETWELD 300#</TableHead>
                  </TableRow>
                  <TableRow className="bg-white border-b border-neutral-300">
                    <TableHead colSpan={3} className="text-center font-bold text-primary border-r border-neutral-200 py-2">FULL BORE</TableHead>
                    <TableHead colSpan={3} className="text-center font-bold text-primary py-2">FULL BORE</TableHead>
                  </TableRow>
                  <TableRow className="bg-neutral-50 border-b border-neutral-300">
                    <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs py-4">SIZE</TableHead>
                    <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs">FACE TO FACE</TableHead>
                    <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs">LEVER LENGTH</TableHead>
                    <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs">HEIGHT</TableHead>
                    <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs">FACE TO FACE</TableHead>
                    <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs">LEVER LENGTH</TableHead>
                    <TableHead className="text-center font-bold text-primary text-xs">HEIGHT</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dimensionData.map((row, idx) => (
                    <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                      <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-4">{row.size}</TableCell>
                      <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f150}</TableCell>
                      <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.l150}</TableCell>
                      <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h150}</TableCell>
                      <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f300}</TableCell>
                      <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.l300}</TableCell>
                      <TableCell className="text-center text-foreground/80">{row.h300}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50">
              <p className="text-sm text-foreground/50 font-medium italic text-right">
                All dimensions are in mm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={(open) => !open && setSelectedImageIndex(null)}>
        <DialogContent className="max-w-[95vw] max-h-[85vh] p-0 border-none bg-transparent shadow-none flex items-center justify-center overflow-hidden">
          <DialogTitle className="sr-only">Product Showcase Image</DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-16">
            {selectedImageIndex !== null && (
              <>
                <div className="relative w-full max-w-5xl aspect-video md:aspect-[1.6/1] rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
                  <Image
                    src={showcaseImages[selectedImageIndex].src}
                    alt={showcaseImages[selectedImageIndex].alt}
                    fill
                    className="object-contain bg-black/20"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-lg font-medium">{showcaseImages[selectedImageIndex].alt}</p>
                  </div>
                </div>
                
                <button 
                  onClick={handlePrev}
                  className="absolute left-6 md:left-12 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10 z-10"
                >
                  <ChevronLeft className="size-8" />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-6 md:right-12 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10 z-10"
                >
                  <ChevronRight className="size-8" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
}