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

export default function WaferLuggedResilientSeatPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const showcaseImages = [
    { src: "/products/uni-directionalwafer-lugged-resilient-seat-pn10-1.jpg", alt: "Uni-Directional Wafer Lugged Resilient Seat View 1" },
    { src: "/products/uni-directionalwafer-lugged-resilient-seat-pn10-2.jpg", alt: "Uni-Directional Wafer Lugged Resilient Seat View 2" },
    { src: "/products/uni-directionalwafer-lugged-resilient-seat-pn10-3.jpg", alt: "Uni-Directional Wafer Lugged Resilient Seat View 3" },
    { src: "/products/uni-directionalwafer-lugged-resilient-seat-pn10-4.jpg", alt: "Uni-Directional Wafer Lugged Resilient Seat View 4" },
  ];

  const productImage = {
    imageUrl: showcaseImages[0].src,
    description: "Wafer Lugged Resilient Seat Knife Edge Gate Valve"
  };

  const specs = [
    { label: "Size", value: "DN50 - DN1000" },
    { 
      label: "Material of construction", 
      subLabel: "(Bill of material)",
      value: "WCB / CF8 / CF8M / CF3 / CF3M / DSS / SDS" 
    },
    { label: "Seat", value: "PTFE / EPDM / VITON" },
    { label: "End connection", value: "Wafer Lugged to suit ANSI flanges" },
    { label: "Pressure rating", value: "PN10#" },
    { label: "Mode of operation", value: "Wheel, Gear, Actuator" },
    { label: "Manufacturing Standard", value: "MSS SP 81" },
    { label: "Testing Standard", value: "MSS SP 81" },
  ];

  const generalDimensions = [
    { size: "DN50", f: "48", bore: "50", h: "281", wheel: "225" },
    { size: "DN65", f: "51", bore: "63", h: "308", wheel: "225" },
    { size: "DN80", f: "51", bore: "80", h: "335", wheel: "225" },
    { size: "DN100", f: "51", bore: "97", h: "374", wheel: "225" },
    { size: "DN125", f: "57", bore: "117", h: "418", wheel: "225" },
    { size: "DN150", f: "57", bore: "140", h: "465", wheel: "225" },
    { size: "DN200", f: "70", bore: "184", h: "581", wheel: "310" },
    { size: "DN250", f: "70", bore: "230", h: "681", wheel: "310" },
    { size: "DN300", f: "76", bore: "275", h: "781", wheel: "310" },
    { size: "DN350", f: "76", bore: "305", h: "902", wheel: "410" },
    { size: "DN400", f: "89", bore: "351.6", h: "1004", wheel: "410" },
    { size: "DN450", f: "89", bore: "390", h: "1028", wheel: "550" },
    { size: "DN500", f: "114", bore: "435", h: "1120", wheel: "550" },
    { size: "DN600", f: "114", bore: "522", h: "1438", wheel: "550" },
    { size: "DN700", f: "-", bore: "-", h: "-", wheel: "-" },
    { size: "DN750", f: "117", bore: "670", h: "1634", wheel: "-" },
    { size: "DN800", f: "117", bore: "794", h: "1871", wheel: "-" },
    { size: "DN900", f: "117", bore: "810", h: "1945", wheel: "-" },
    { size: "DN1000", f: "-", bore: "-", h: "-", wheel: "-" },
  ];

  const flangeSuitability = [
    { size: "DN50", p150: "120.7", d150: "19", n150: "4", pPN10: "125", dPN10: "18", nPN10: "4" },
    { size: "DN65", p150: "139.7", d150: "19", n150: "4", pPN10: "145", dPN10: "18", nPN10: "4" },
    { size: "DN80", p150: "152.4", d150: "19", n150: "4", pPN10: "160", dPN10: "18", nPN10: "8" },
    { size: "DN100", p150: "190.5", d150: "19", n150: "8", pPN10: "180", dPN10: "18", nPN10: "8" },
    { size: "DN125", p150: "215.9", d150: "22.2", n150: "8", pPN10: "210", dPN10: "18", nPN10: "8" },
    { size: "DN150", p150: "241.3", d150: "22.2", n150: "8", pPN10: "240", dPN10: "22", nPN10: "8" },
    { size: "DN200", p150: "298.5", d150: "22.2", n150: "8", pPN10: "295", dPN10: "22", nPN10: "8" },
    { size: "DN250", p150: "362", d150: "25.4", n150: "12", pPN10: "350", dPN10: "22", nPN10: "12" },
    { size: "DN300", p150: "431.8", d150: "25.4", n150: "12", pPN10: "400", dPN10: "22", nPN10: "12" },
    { size: "DN350", p150: "476.3", d150: "29", n150: "12", pPN10: "460", dPN10: "22", nPN10: "16" },
    { size: "DN400", p150: "539.8", d150: "29", n150: "16", pPN10: "515", dPN10: "26", nPN10: "16" },
    { size: "DN450", p150: "577.9", d150: "32", n150: "16", pPN10: "565", dPN10: "26", nPN10: "20" },
    { size: "DN500", p150: "635", d150: "32", n150: "20", pPN10: "620", dPN10: "26", nPN10: "20" },
    { size: "DN600", p150: "749.3", d150: "35", n150: "20", pPN10: "725", dPN10: "30", nPN10: "20" },
    { size: "DN700", p150: "863.6", d150: "35", n150: "28", pPN10: "840", dPN10: "30", nPN10: "24" },
    { size: "DN750", p150: "914.4", d150: "35", n150: "28", pPN10: "-", dPN10: "-", nPN10: "-" },
    { size: "DN800", p150: "977.9", d150: "41.2", n150: "28", pPN10: "950", dPN10: "33", nPN10: "24" },
    { size: "DN900", p150: "1085.8", d150: "41.2", n150: "32", pPN10: "1050", dPN10: "33", nPN10: "24" },
    { size: "DN1000", p150: "1200.2", d150: "41.2", n150: "36", pPN10: "1160", dPN10: "36", nPN10: "28" },
  ];

  const pn16Suitability = [
    { size: "DN50", p: "125", d: "18", n: "4" },
    { size: "DN65", p: "145", d: "18", n: "4" },
    { size: "DN80", p: "160", d: "18", n: "8" },
    { size: "DN100", p: "180", d: "18", n: "8" },
    { size: "DN125", p: "210", d: "18", n: "8" },
    { size: "DN150", p: "240", d: "22", n: "8" },
    { size: "DN200", p: "295", d: "22", n: "12" },
    { size: "DN250", p: "355", d: "26", n: "12" },
    { size: "DN300", p: "410", d: "26", n: "12" },
    { size: "DN350", p: "470", d: "26", n: "16" },
    { size: "DN400", p: "525", d: "30", n: "16" },
    { size: "DN450", p: "585", d: "30", n: "20" },
    { size: "DN500", p: "650", d: "33", n: "20" },
    { size: "DN600", p: "770", d: "36", n: "20" },
    { size: "DN700", p: "840", d: "36", n: "24" },
    { size: "DN750", p: "-", d: "-", n: "-" },
    { size: "DN800", p: "950", d: "39", n: "24" },
    { size: "DN900", p: "1050", d: "39", n: "28" },
    { size: "DN1000", p: "1170", d: "42", n: "28" },
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
      ["Product", "Knife Edge Gate Valve"],
      ["Type", "Uni Directional"],
      ["Model", "Wafer Lugged Resilient seat PN10# - Single piece design"],
      ...specs.map(spec => [spec.label + (spec.subLabel || ""), spec.value]),
      [""],
      ["General Dimensions (mm)"],
      ["Size", "Face To Face", "Bore Dia", "Height (Center to Top)", "Wheel Dia"],
      ...generalDimensions.map(row => [row.size, row.f, row.bore, row.h, row.wheel]),
      [""],
      ["Flange Suitability"],
      ["Size", "PCD (150#)", "Hole Dia (150#)", "No. Holes (150#)", "PCD (PN10)", "Hole Dia (PN10)", "No. Holes (PN10)"],
      ...flangeSuitability.map(row => [row.size, row.p150, row.d150, row.n150, row.pPN10, row.dPN10, row.nPN10]),
      [""],
      ["To Suit PN16# Flanges"],
      ["Size", "PCD", "Hole Dia", "No. of Holes"],
      ...pn16Suitability.map(row => [row.size, row.p, row.d, row.n])
    ];
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Bi_Directional_Wafer_Lugged_Resilient_seat_PN10_data_sheet.csv`);
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
            <span className="text-primary">Knife Edge Gate Valve</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider">Uni Directional</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">Wafer Lugged Resilient seat PN10#</h1>
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
                alt="Uni-Directional Wafer Lugged Resilient Seat Knife Edge Gate Valve"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

          <div className="space-y-12">
            {/* Table 1: General Dimensions */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-6xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={5} className="text-center font-bold text-primary uppercase py-6">WAFER LUGGED UNI-DIRECTIONAL RESILIENT SEAT KGV</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">BORE DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">HEIGHT (CENTER TO TOP)</TableHead>
                      <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">WHEEL DIA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {generalDimensions.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.bore}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.wheel}</TableCell>
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

            {/* Table 2: Flange Suitability (150# & PN10#) */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-6xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead rowSpan={2} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-4">SIZE</TableHead>
                      <TableHead colSpan={3} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-4">TO SUIT 150# FLANGES</TableHead>
                      <TableHead colSpan={3} className="text-center font-bold text-primary uppercase py-4">TO SUIT PN10# FLANGES</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">PCD</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">HOLE DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">PCD</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">HOLE DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">NO. OF HOLES</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flangeSuitability.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.p150}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.d150}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-200">{row.n150}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.pPN10}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.dPN10}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.nPN10}</TableCell>
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

            {/* Table 3: To Suit PN16# Flanges */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-6xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={4} className="text-center font-bold text-primary uppercase py-6">TO SUIT PN16# FLANGES</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">PCD</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">HOLE DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">NO. OF HOLES</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pn16Suitability.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.p}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.d}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.n}</TableCell>
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

      {/* Lightbox Dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={(open) => !open && setSelectedImageIndex(null)}>
        <DialogContent className="max-w-[95vw] max-h-[90vh] p-0 border-none bg-transparent shadow-none flex items-center justify-center overflow-hidden">
          <DialogTitle className="sr-only">Product Showcase Image</DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
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
                  className="absolute left-6 md:left-12 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10"
                >
                  <ChevronLeft className="size-8" />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-6 md:right-12 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10"
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
