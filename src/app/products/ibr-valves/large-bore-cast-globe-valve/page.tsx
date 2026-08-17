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
import { productSpecsRegistry } from "@/lib/product-specs";
import { QuotePopup } from "@/components/QuotePopup";

export default function LargeBoreCastGlobeValvePage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const slug = "ibr-valves/large-bore-cast-globe-valve";
  const product = productSpecsRegistry[slug];

  if (!product) return null;

  const showcaseImages = product.showcaseImages || [];

  const specs = [
    { label: "Size", value: product.size },
    { 
      label: "Material of construction", 
      subLabel: "(Bill of material)",
      value: product.material 
    },
    { label: "End connection", value: product.endConnection },
    { label: "Pressure rating", value: product.pressureRating },
    { label: "Mode of operation", value: product.modeOfOperation },
    { label: "Manufacturing Standard", value: product.manufacturingStandard },
    { label: "Testing Standard", value: product.testingStandard },
  ];

  const table150_300 = [
    { size: "DN50", ftf150fl: "203", ftf150bw: "203", od150: "150", h150: "19 X 4", p150: "120.7", ftf300fl: "267", ftf300bw: "267", od300: "165", h300: "19 X 8", p300: "127" },
    { size: "DN65", ftf150fl: "216", ftf150bw: "216", od150: "180", h150: "19 X 4", p150: "139.7", ftf300fl: "292", ftf300bw: "292", od300: "190", h300: "22.2 X 8", p300: "149.2" },
    { size: "DN80", ftf150fl: "241", ftf150bw: "241", od150: "190", h150: "19 X 4", p150: "152.4", ftf300fl: "318", ftf300bw: "318", od300: "210", h300: "22.2 X 8", p300: "168.3" },
    { size: "DN100", ftf150fl: "292", ftf150bw: "292", od150: "230", h150: "19 X 8", p150: "190.5", ftf300fl: "356", ftf300bw: "356", od300: "255", h300: "22.2 X 8", p300: "200" },
    { size: "DN125", ftf150fl: "356", ftf150bw: "356", od150: "255", h150: "22.2 X 8", p150: "215.9", ftf300fl: "400", ftf300bw: "400", od300: "280", h300: "22.2 X 8", p300: "235" },
    { size: "DN150", ftf150fl: "406", ftf150bw: "406", od150: "280", h150: "22.2 X 8", p150: "241.3", ftf300fl: "444", ftf300bw: "444", od300: "320", h300: "22.2 X 12", p300: "269.9" },
    { size: "DN200", ftf150fl: "495", ftf150bw: "495", od150: "345", h150: "22.2 X 8", p150: "298.5", ftf300fl: "559", ftf300bw: "559", od300: "380", h300: "25.4 X 12", p300: "330.2" },
    { size: "DN250", ftf150fl: "622", ftf150bw: "622", od150: "405", h150: "25.4 X 12", p150: "362", ftf300fl: "622", ftf300bw: "622", od300: "445", h300: "29 X 16", p300: "387.4" },
    { size: "DN300", ftf150fl: "698", ftf150bw: "698", od150: "485", h150: "25.4 X 12", p150: "431.8", ftf300fl: "711", ftf300bw: "711", od300: "520", h300: "32 X 16", p300: "450.8" },
    { size: "DN350", ftf150fl: "787", ftf150bw: "787", od150: "535", h150: "29 X 12", p150: "476.3", ftf300fl: "838", ftf300bw: "838", od300: "585", h300: "32 X 20", p300: "514.4" },
    { size: "DN400", ftf150fl: "914", ftf150bw: "914", od150: "595", h150: "29 X 16", p150: "539.8", ftf300fl: "864", ftf300bw: "864", od300: "650", h300: "35 X 20", p300: "571.5" },
    { size: "DN450", ftf150fl: "978", ftf150bw: "978", od150: "635", h150: "32 X 16", p150: "577.9", ftf300fl: "978", ftf300bw: "978", od300: "710", h300: "35 X 24", p300: "628.6" },
    { size: "DN500", ftf150fl: "978", ftf150bw: "978", od150: "700", h150: "32 X 20", p150: "635", ftf300fl: "1016", ftf300bw: "1016", od300: "775", h300: "35 X 24", p300: "685.8" },
    { size: "DN600", ftf150fl: "1295", ftf150bw: "1295", od150: "815", h150: "35 X 20", p150: "749.3", ftf300fl: "1346", ftf300bw: "1346", od300: "915", h300: "41 X 24", p300: "812.8" },
    { size: "DN700", ftf150fl: "1448", ftf150bw: "1448", ftf300fl: "1499", ftf300bw: "1499", isHeader: true },
    { size: "SERIES A FLANGE", od150: "925", h150: "35 X 28", p150: "863.6", od300: "1035", h300: "44 X 28", p300: "939.8", isChild: true },
    { size: "SERIES B FLANGE", od150: "835", h150: "22.2 X 40", p150: "795.3", od300: "920", h300: "35 X 36", p300: "857.2", isChild: true },
    { size: "DN800", ftf150fl: "1676", ftf150bw: "1676", ftf300fl: "1778", ftf300bw: "1778", isHeader: true },
    { size: "SERIES A FLANGE", od150: "1060", h150: "41.2 X 28", p150: "977.9", od300: "1150", h300: "50 X 28", p300: "1054.1", isChild: true },
    { size: "SERIES B FLANGE", od150: "940", h150: "22.2 X 48", p150: "900.1", od300: "1055", h300: "41.2 X 32", p300: "977.9", isChild: true },
  ];

  const table600 = [
    { size: "DN50", fl: "292", bw: "292", od: "165", h: "19 X 8", pcd: "127" },
    { size: "DN65", fl: "330", bw: "330", od: "190", h: "22.2 X 8", pcd: "149.2" },
    { size: "DN80", fl: "356", bw: "356", od: "210", h: "22.2 X 8", pcd: "168.3" },
    { size: "DN100", fl: "432", bw: "432", od: "275", h: "25.4 X 8", pcd: "215.9" },
    { size: "DN125", fl: "508", bw: "508", od: "330", h: "29 X 8", pcd: "266.7" },
    { size: "DN150", fl: "559", bw: "559", od: "355", h: "29 X 12", pcd: "292.1" },
    { size: "DN200", fl: "660", bw: "660", od: "420", h: "32 X 12", pcd: "349.2" },
    { size: "DN250", fl: "787", bw: "787", od: "510", h: "35 X 16", pcd: "431.8" },
    { size: "DN300", fl: "838", bw: "838", od: "560", h: "35 X 20", pcd: "489" },
    { size: "DN350", fl: "889", bw: "889", od: "605", h: "38 X 20", pcd: "527" },
    { size: "DN400", fl: "991", bw: "991", od: "685", h: "41 X 20", pcd: "603.2" },
    { size: "DN450", fl: "1092", bw: "1092", od: "745", h: "44 X 20", pcd: "654" },
    { size: "DN500", fl: "1194", bw: "1194", od: "815", h: "44 X 24", pcd: "723.9" },
    { size: "DN600", fl: "1397", bw: "1397", od: "940", h: "51 X 24", pcd: "838.2" },
    { size: "DN700", fl: "1549", bw: "1549", isHeader: true },
    { size: "SERIES A FLANGE", od: "1075", h: "54 X 28", pcd: "965.2", isChild: true },
    { size: "SERIES B FLANGE", od: "950", h: "47.6 X 28", pcd: "863.6", isChild: true },
    { size: "DN800", fl: "1651", bw: "1651", isHeader: true },
    { size: "SERIES A FLANGE", od: "1195", h: "60 X 28", pcd: "1079.5", isChild: true },
    { size: "SERIES B FLANGE", od: "1085", h: "54 X 28", pcd: "984.2", isChild: true },
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
      
      <div className="bg-neutral-50 pt-32 pb-8 px-5 md:px-[63px]">
        <div className="container mx-auto">
          <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-foreground/60 mb-4">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <Link href="/#products" className="hover:text-secondary transition-colors">Products</Link>
            <ChevronRight className="size-4" />
            <span className="text-primary">IBR & Non IBR Valves</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">{product.subCategory}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">{product.subTitle}</h1>
        </div>
      </div>

      <section className="py-12 md:py-20 px-5 md:px-[63px]" style={{ backgroundColor: '#f3f3f3bd' }}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white border border-border shadow-lg">
              <Image
                src={showcaseImages[0]?.src || "/dummy-image.png"}
                alt={product.subTitle}
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
                      {spec.label}
                      {spec.subLabel && (
                        <>
                          <br />
                          <span className="text-[10px] md:text-xs opacity-70 font-normal uppercase">{spec.subLabel}</span>
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

          {showcaseImages.length > 0 && (
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
          )}

          <div className="space-y-16">
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={6} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-6">GLOBE VALVE FLANGED END 150#</TableHead>
                      <TableHead colSpan={6} className="text-center font-bold text-primary uppercase py-6">GLOBE VALVE FLANGED END 300#</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE (FL)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE (BW)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">OUTER DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">HOLE DIA X NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">PCD</TableHead>
                      
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE (FL)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE (BW)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">OUTER DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">HOLE DIA X NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">PCD</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table150_300.map((row, idx) => (
                      <TableRow key={idx} className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-[10px] md:text-xs ${row.isHeader ? 'bg-primary/5' : ''}`}>
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf150fl || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf150bw || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.od150 || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h150 || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-200">{row.p150 || ""}</TableCell>
                        
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf300fl || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf300bw || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.od300 || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h300 || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.p300 || ""}</TableCell>
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

            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-5xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={6} className="text-center font-bold text-primary uppercase py-6 text-lg">GLOBE VALVE FLANGED END 600#</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE (FL)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE (BW)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">OUTER DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">HOLE DIA X NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">PCD</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table600.map((row, idx) => (
                      <TableRow key={idx} className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-[10px] md:text-xs ${row.isHeader ? 'bg-primary/5' : ''}`}>
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.fl || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.bw || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.od || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.pcd || ""}</TableCell>
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
        productName={product.subTitle} 
      />

      <Footer />
    </main>
  );
}