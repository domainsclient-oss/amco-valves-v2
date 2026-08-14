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

export default function TwoPieceFloatingFlangedBallValvePage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const showcaseImages = [
    { src: "/products/2-piece-design-flanged-ansi-150-300-600-1.jpg", alt: "2PC Flanged Ball Valve View 1" },
    { src: "/products/2-piece-design-flanged-ansi-150-300-600-2.jpg", alt: "2PC Flanged Ball Valve View 2" },
    { src: "/products/2-piece-design-flanged-ansi-150-300-600-3.jpeg", alt: "2PC Flanged Ball Valve View 3" },
    { src: "/products/2-piece-design-flanged-ansi-150-300-600-4.jpg", alt: "2PC Flanged Ball Valve View 4" },
    { src: "/products/2-piece-design-flanged-ansi-150-300-600-5.jpg", alt: "2PC Flanged Ball Valve View 5" },
    { src: "/products/2-piece-design-flanged-ansi-150-300-600-6.jpg", alt: "2PC Flanged Ball Valve View 6" },
    { src: "/products/2-piece-design-flanged-ansi-150-300-600-7.jpg", alt: "2PC Flanged Ball Valve View 7" },
    { src: "/products/2-piece-design-flanged-ansi-150-300-600-8.jpg", alt: "2PC Flanged Ball Valve View 8" },
    { src: "/products/2-piece-design-flanged-ansi-150-300-600-9.jpg", alt: "2PC Flanged Ball Valve View 9" },
    { src: "/products/2-piece-design-flanged-ansi-150-300-600-10.jpg", alt: "2PC Flanged Ball Valve View 10" },
    { src: "/products/2-piece-design-flanged-ansi-150-300-600-11.jpg", alt: "2PC Flanged Ball Valve View 11" },
  ];

  const productImage = {
    imageUrl: showcaseImages[0].src,
    description: "2 Piece Flanged Ball Valve"
  };

  const specs = [
    { label: "Size", value: "DN15 - DN300" },
    { label: "Material of construction", value: "WCB / CF8 / CF8M / CF3 / CF3M" },
    { label: "End connection", value: "FLANGED" },
    { label: "Pressure rating", value: "150# / 300# / 600#" },
    { label: "Mode of operation", value: "Lever, Gear, Actuator" },
    { label: "Manufacturing Standard", value: "ISO 17292 / API 6D / API 608" },
    { label: "Testing Standard", value: "ISO 5208 / ISO 10497 / API 607" },
  ];

  const table150_300 = [
    { size: "DN15", f150fl: "108", f150bw: "140", d150: "90", h150: "Ø 16 X 4", pcd150: "60.3", f300fl: "140", f300bw: "140", d300: "95", h300: "Ø 16 X 4", pcd300: "66.7" },
    { size: "DN20", f150fl: "117", f150bw: "152", d150: "100", h150: "Ø 16 X 4", pcd150: "69.9", f300fl: "152", f300bw: "152", d300: "115", h300: "Ø 19 X 4", pcd300: "82.6" },
    { size: "DN25", f150fl: "127", f150bw: "165", d150: "110", h150: "Ø 16 X 4", pcd150: "79.4", f300fl: "165", f300bw: "165", d300: "125", h300: "Ø 19 X 4", pcd300: "88.9" },
    { size: "DN32", f150fl: "140", f150bw: "178", d150: "115", h150: "Ø 16 X 4", pcd150: "88.9", f300fl: "178", f300bw: "178", d300: "135", h300: "Ø 19 X 4", pcd300: "98.4" },
    { size: "DN40", f150fl: "165", f150bw: "190", d150: "125", h150: "Ø 16 X 4", pcd150: "98.4", f300fl: "190", f300bw: "190", d300: "155", h300: "Ø 22.2 X 4", pcd300: "114.3" },
    { size: "DN50", f150fl: "178", f150bw: "216", d150: "150", h150: "Ø 19 X 4", pcd150: "120.7", f300fl: "216", f300bw: "216", d300: "165", h300: "Ø 19 X 8", pcd300: "127" },
    { size: "DN65", f150fl: "190", f150bw: "241", d150: "180", h150: "Ø 19 X 4", pcd139: "139.7", f300fl: "241", f300bw: "241", d300: "190", h300: "Ø 22.2 X 8", pcd300: "149.2" },
    { size: "DN80", f150fl: "203", f150bw: "282", d150: "190", h150: "Ø 19 X 4", pcd152: "152.4", f300fl: "282", f300bw: "282", d300: "210", h300: "Ø 22.2 X 8", pcd300: "168.3" },
    { size: "DN100", f150fl: "229", f150bw: "305", d150: "230", h150: "Ø 19 X 8", pcd190: "190.5", f300fl: "305", f300bw: "305", d300: "255", h300: "Ø 22.2 X 8", pcd300: "200" },
    { size: "DN125", f150fl: "254", f150bw: "-", d150: "255", h150: "Ø 22.2 X 8", pcd215: "215.9", f300fl: "", f300bw: "", d300: "280", h300: "Ø 22.2 X 8", pcd300: "235" },
    { size: "DN150", f150fl: "267", f150bw: "403", d150: "280", h150: "Ø 22.2 X 8", pcd241: "241.3", f300fl: "403", f300bw: "403", d300: "320", h300: "Ø 22.2 X 12", pcd300: "269.9" },
    { size: "DN200", f150fl: "292", f150bw: "419", d150: "345", h150: "Ø 22.2 X 8", pcd298: "298.5", f300fl: "419", f300bw: "419", d300: "380", h300: "Ø 25.4 X 12", pcd300: "330.2" },
    { size: "DN250", f150fl: "330", f150bw: "457", d150: "405", h150: "Ø 25.4 X 12", pcd362: "362", f300fl: "457", f300bw: "457", d300: "445", h300: "Ø 29 X 16", pcd300: "387.4" },
    { size: "DN300", f150fl: "356", f150bw: "502", d150: "485", h150: "Ø 25.4 X 12", pcd431: "431.8", f300fl: "502", f300bw: "502", d300: "520", h300: "Ø 32 X 16", pcd300: "450.8" },
  ];

  const table600 = [
    { size: "DN15", f: "165", bw: "165", d: "95", h: "Ø 16 X 4", pcd: "66.7" },
    { size: "DN20", f: "190", bw: "190", d: "115", h: "Ø 19 X 4", pcd: "82.6" },
    { size: "DN25", f: "216", bw: "216", d: "125", h: "Ø 19 X 4", pcd: "88.9" },
    { size: "DN32", f: "229", bw: "229", d: "135", h: "Ø 19 X 4", pcd: "98.4" },
    { size: "DN40", f: "241", bw: "241", d: "155", h: "Ø 22.2 X 4", pcd: "114.3" },
    { size: "DN50", f: "292", bw: "292", d: "165", h: "Ø 19 X 8", pcd: "127.0" },
    { size: "DN65", f: "330", bw: "330", d: "190", h: "Ø 22.2 X 8", pcd: "149.2" },
    { size: "DN80", f: "356", bw: "356", d: "210", h: "Ø 22.2 X 8", pcd: "168.3" },
    { size: "DN100", f: "432", bw: "432", d: "275", h: "Ø 25.4 X 8", pcd: "215.9" },
    { size: "DN125", f: "-", bw: "-", d: "330", h: "Ø 29 X 8", pcd: "266.7" },
    { size: "DN150", f: "559", bw: "559", d: "355", h: "Ø 29 X 12", pcd: "292.1" },
    { size: "DN200", f: "660", bw: "660", d: "420", h: "Ø 32 X 12", pcd: "349.2" },
    { size: "DN250", f: "787", bw: "787", d: "510", h: "Ø 35 X 16", pcd: "431.8" },
    { size: "DN300", f: "838", bw: "838", d: "560", h: "Ø 35 X 20", pcd: "489" },
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
      ["Product", "2 Piece Design Flanged Ball Valve"],
      ["Category", "Ball Valve"],
      ["Title", "Floating Design"],
      ["Model", "2 Piece Design Flanged ANSI 150#, 300#, 600#"],
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
    link.setAttribute("download", `2_Piece_Flanged_Ball_Valve_Data_Sheet.csv`);
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
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">2 Piece Design Flanged ANSI 150#, 300#, 600#</h1>
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
                alt="2 Piece Flanged Ball Valve"
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
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
            {/* Dimension Table Section - 150# & 300# */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={5} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-6">2PC FLANGED END 150#</TableHead>
                      <TableHead colSpan={5} className="text-center font-bold text-primary uppercase py-6">2PC FLANGED END 300#</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs py-4">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs py-4 leading-tight uppercase">Face To Face (FL)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs py-4 leading-tight uppercase">Outer Dia</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs py-4 leading-tight uppercase">Hole Dia x No. of Holes</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs py-4 leading-tight uppercase">PCD</TableHead>
                      
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs py-4">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs py-4 leading-tight uppercase">Face To Face (FL)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs py-4 leading-tight uppercase">Outer Dia</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs py-4 leading-tight uppercase">Hole Dia x No. of Holes</TableHead>
                      <TableHead className="text-center font-bold text-primary text-xs py-4 leading-tight uppercase">PCD</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table150_300.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-4">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f150fl}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.d150}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h150}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-200">{row.pcd150}</TableCell>
                        
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-4">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f300fl}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.d300}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h300}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.pcd300}</TableCell>
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

            {/* Dimension Table Section - 600# */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={5} className="text-center font-bold text-primary uppercase py-6">2PC FLANGED END 600#</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs py-4">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs py-4 leading-tight uppercase">FACE TO FACE (FL)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs py-4 leading-tight uppercase">OUTER DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 text-xs py-4 leading-tight uppercase">HOLE DIA X NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary text-xs py-4 leading-tight uppercase">PCD</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table600.map((row, idx) => (
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
              <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50">
                <p className="text-sm text-foreground/50 font-medium italic text-right">
                  All dimensions are in mm
                </p>
              </div>
            </div>
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
        productName="2 Piece Design Flanged ANSI 150#, 300#, 600#" 
      />

      <Footer />
    </main>
  );
}
