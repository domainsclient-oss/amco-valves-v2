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

export default function WaferSemiLuggedButterflyValvePage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const showcaseImages = [
    { src: "/products/butterfly-valve-wafer-semi-lugged-1.jpg", alt: "Wafer Semi Lugged BFV View 1" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-2.jpg", alt: "Wafer Semi Lugged BFV View 2" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-3.jpg", alt: "Wafer Semi Lugged BFV View 3" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-4.jpg", alt: "Wafer Semi Lugged BFV View 4" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-5.jpg", alt: "Wafer Semi Lugged BFV View 5" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-6.jpg", alt: "Wafer Semi Lugged BFV View 6" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-7.jpg", alt: "Wafer Semi Lugged BFV View 7" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-8.jpg", alt: "Wafer Semi Lugged BFV View 8" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-9.jpg", alt: "Wafer Semi Lugged BFV View 9" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-10.jpg", alt: "Wafer Semi Lugged BFV View 10" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-11.jpg", alt: "Wafer Semi Lugged BFV View 11" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-12.jpg", alt: "Wafer Semi Lugged BFV View 12" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-13.jpg", alt: "Wafer Semi Lugged BFV View 13" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-14.jpg", alt: "Wafer Semi Lugged BFV View 14" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-15.jpg", alt: "Wafer Semi Lugged BFV View 15" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-16.jpg", alt: "Wafer Semi Lugged BFV View 16" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-17.jpg", alt: "Wafer Semi Lugged BFV View 17" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-18.jpg", alt: "Wafer Semi Lugged BFV View 18" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-19.jpg", alt: "Wafer Semi Lugged BFV View 19" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-20.jpg", alt: "Wafer Semi Lugged BFV View 20" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-21.jpg", alt: "Wafer Semi Lugged BFV View 21" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-22.jpg", alt: "Wafer Semi Lugged BFV View 22" },
    { src: "/products/butterfly-valve-wafer-semi-lugged-23.jpeg", alt: "Wafer Semi Lugged BFV View 23" },
  ];

  const productImage = {
    imageUrl: showcaseImages[0].src,
    description: "Wafer Semi Lugged Butterfly Valve"
  };

  const specs = [
    { label: "Size", value: "DN40 - DN1000" },
    { label: "Material of construction", value: "CI / DI / WCB / CF8 / CF8M / CF3 / CF3M / DSS / SDS / AL. BR" },
    { label: "Seat / Liner", value: "BUNA-N, EPDM, SILICON, VITON" },
    { label: "End connection", value: "Wafer to suit ANSI & ND flanges" },
    { label: "Pressure rating", value: "PN10# / PN16# / PN20# / PN25#" },
    { label: "Mode of operation", value: "Lever, Gear, Actuator" },
    { label: "Manufacturing Standard", value: "API 609 (Cat.A)" },
    { label: "Testing Standard", value: "API 598" },
  ];

  const dimensionData = [
    { size: "DN40", ftf: "33", th: "101", bh: "55", ll: "180", gear: "175" },
    { size: "DN50", ftf: "41", th: "113", bh: "59", ll: "180", gear: "175" },
    { size: "DN65", ftf: "44", th: "121", bh: "67", ll: "180", gear: "175" },
    { size: "DN80", ftf: "44", th: "128", bh: "75", ll: "180", gear: "175" },
    { size: "DN100", ftf: "51", th: "146", bh: "94", ll: "270", gear: "175" },
    { size: "DN125", ftf: "54", th: "158", bh: "108", ll: "270", gear: "175" },
    { size: "DN150", ftf: "54", th: "174", bh: "120", ll: "270", gear: "175" },
    { size: "DN200", ftf: "58", th: "198", bh: "147", ll: "320", gear: "250" },
    { size: "DN250", ftf: "68", th: "245", bh: "200", ll: "550", gear: "250" },
    { size: "DN300", ftf: "78", th: "284", bh: "268", ll: "550", gear: "350" },
    { size: "DN350", ftf: "78", th: "318", bh: "291", ll: "-", gear: "350" },
    { size: "DN400", ftf: "102", th: "360", bh: "310", ll: "-", gear: "500" },
    { size: "DN450", ftf: "114", th: "390", bh: "334", ll: "-", gear: "500" },
    { size: "DN500", ftf: "127", th: "410", bh: "362", ll: "-", gear: "500" },
    { size: "DN600", ftf: "154", th: "504", bh: "432", ll: "-", gear: "600" },
    { size: "DN700", ftf: "165", th: "580", bh: "-", ll: "-", gear: "-" },
    { size: "DN750", ftf: "165", th: "595", bh: "-", ll: "-", gear: "-" },
    { size: "DN800", ftf: "190", th: "670", bh: "-", ll: "-", gear: "-" },
    { size: "DN900", ftf: "203", th: "705", bh: "-", ll: "-", gear: "-" },
    { size: "DN1000", ftf: "216", th: "782", bh: "-", ll: "-", gear: "-" },
  ];

  const flangeSuitabilityData = [
    { size: "DN40", p150: "98.4", d150: "16", n150: "4", pPN10: "110", dPN10: "18", nPN10: "4" },
    { size: "DN50", p150: "120.7", d150: "19", n150: "4", pPN10: "125", dPN10: "18", nPN10: "4" },
    { size: "DN65", p150: "139.7", d150: "19", n150: "4", pPN10: "145", dPN10: "18", nPN10: "4" },
    { size: "DN80", p150: "152.4", d150: "19", n150: "4", pPN10: "160", dPN10: "18", nPN10: "8" },
    { size: "DN100", p150: "190.5", d150: "19", n150: "8", pPN10: "180", dPN10: "18", nPN10: "8" },
    { size: "DN125", p150: "215.9", d150: "22.2", n150: "8", pPN10: "210", dPN10: "18", nPN10: "8" },
    { size: "DN150", p150: "241.3", d150: "22.2", n150: "8", pPN10: "240", dPN10: "22", nPN10: "8" },
    { size: "DN200", p150: "298.5", d150: "22.2", n150: "8", pPN10: "295", dPN10: "22", nPN10: "8" },
    { size: "DN250", p150: "362.0", d150: "25.4", n150: "12", pPN10: "350", dPN10: "22", nPN10: "12" },
    { size: "DN300", p150: "431.8", d150: "25.4", n150: "12", pPN10: "400", dPN10: "22", nPN10: "12" },
    { size: "DN350", p150: "476.3", d150: "29", n150: "12", pPN10: "460", dPN10: "22", nPN10: "16" },
    { size: "DN400", p150: "539.8", d150: "29", n150: "16", pPN10: "515", dPN10: "26", nPN10: "16" },
    { size: "DN450", p150: "577.9", d150: "32", n150: "16", pPN10: "565", dPN10: "26", nPN10: "20" },
    { size: "DN500", p150: "635.0", d150: "32", n150: "20", pPN10: "620", dPN10: "26", nPN10: "20" },
    { size: "DN600", p150: "749.3", d150: "35", n150: "20", pPN10: "725", dPN10: "30", nPN10: "20" },
    { size: "DN700", p150: "863.6", d150: "35", n150: "28", pPN10: "840", dPN10: "30", nPN10: "24" },
    { size: "DN750", p150: "914.4", d150: "35", n150: "28", pPN10: "-", dPN10: "-", nPN10: "-" },
    { size: "DN800", p150: "977.9", d150: "41.2", n150: "28", pPN10: "950", dPN10: "33", nPN10: "24" },
    { size: "DN900", p150: "1085.8", d150: "41.2", n150: "32", pPN10: "1050", dPN10: "33", nPN10: "24" },
    { size: "DN1000", p150: "1200.2", d150: "41.2", n150: "36", pPN10: "1160", dPN10: "36", nPN10: "28" },
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
      ["Product", "Wafer Semi Lugged BFV"],
      ["Category", "Butterfly Valve"],
      ["Sub Category", "Centric Disc Design"],
      ["Model", "Wafer Semi Lugged PN10# / PN16# / PN20# / PN25#"],
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
    link.setAttribute("download", `Wafer_Semi_Lugged_BFV_data_sheet.csv`);
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
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">Wafer Semi Lugged PN10# / PN16# / PN20# / PN25#</h1>
        </div>
      </div>

      <section className="py-12 md:py-20 px-5 md:px-[63px]" style={{ backgroundColor: '#f3f3f3bd' }}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white border border-border shadow-lg">
              <Image
                src={productImage.imageUrl}
                alt="Wafer Semi Lugged Butterfly Valve"
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
            {/* General Dimensions Table */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={6} className="text-center font-bold text-primary uppercase py-6 text-lg">WAFER BFV</TableHead>
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
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-4">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf}</TableCell>
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
                <p className="text-sm text-foreground/50 font-medium italic text-right">
                  All dimensions are in mm
                </p>
              </div>
            </div>

            {/* Flange Suitability Table */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead rowSpan={2} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-6 text-sm">SIZE</TableHead>
                      <TableHead colSpan={3} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-4 bg-neutral-50/50">TO SUIT 150# FLANGES</TableHead>
                      <TableHead colSpan={3} className="text-center font-bold text-primary uppercase py-4 bg-neutral-50/50">TO SUIT PN10# FLANGES</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">PCD</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase leading-tight">HOLE DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase leading-tight">NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">PCD</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase leading-tight">HOLE DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary py-3 uppercase leading-tight">NO. OF HOLES</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flangeSuitabilityData.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3 bg-neutral-50/20">{row.size}</TableCell>
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
                <p className="text-sm text-foreground/50 font-medium italic text-right">
                  All dimensions are in mm
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
        productName="Wafer Semi Lugged PN10# / PN16# / PN20# / PN25# Butterfly Valve" 
      />

      <Footer />
    </main>
  );
}
