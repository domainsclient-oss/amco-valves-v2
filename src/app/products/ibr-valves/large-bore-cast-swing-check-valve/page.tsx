
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

export default function LargeBoreCastSwingCheckValvePage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const slug = "ibr-valves/large-bore-cast-swing-check-valve";
  const product = productSpecsRegistry[slug];

  if (!product) return null;

  const showcaseImages = [
    { src: "/products/large-bore-cast-swing-check-valve-1.jpg", alt: "Large Bore Cast Swing Check Valve View 1" },
    { src: "/products/large-bore-cast-swing-check-valve-2.jpg", alt: "Large Bore Cast Swing Check Valve View 2" },
    { src: "/products/large-bore-cast-swing-check-valve-3.jpg", alt: "Large Bore Cast Swing Check Valve View 3" },
  ];

  const productImage = {
    imageUrl: showcaseImages[0].src,
    description: product.subTitle
  };

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
    { size: "DN50", f150fl: "203", f150bw: "203", d150: "150", h150: "19 X 4", pcd150: "120.7", f300fl: "267", f300bw: "267", d300: "165", h300: "19 X 8", pcd300: "127" },
    { size: "DN65", f150fl: "216", f150bw: "216", d150: "180", h150: "19 X 4", pcd139: "139.7", f300fl: "292", f300bw: "292", d300: "190", h300: "22.2 X 8", pcd300_2: "149.2" },
    { size: "DN80", f150fl: "241", f150bw: "241", d150: "190", h150: "19 X 4", pcd152: "152.4", f300fl: "318", f300bw: "318", d300: "210", h300: "22.2 X 8", pcd300_3: "168.3" },
    { size: "DN100", f150fl: "292", f150bw: "292", d150: "230", h150: "19 X 8", pcd190: "190.5", f300fl: "356", f300bw: "356", d300: "255", h300: "22.2 X 8", pcd300_4: "200" },
    { size: "DN125", f150fl: "330", f150bw: "330", d150: "255", h150: "22.2 X 8", pcd215: "215.9", f300fl: "400", f300bw: "400", d300: "280", h300: "22.2 X 8", pcd300_5: "235" },
    { size: "DN150", f150fl: "356", f150bw: "356", d150: "280", h150: "22.2 X 8", pcd241: "241.3", f300fl: "444", f300bw: "444", d300: "320", h300: "22.2 X 12", pcd300_6: "269.9" },
    { size: "DN200", f150fl: "495", f150bw: "495", d150: "345", h150: "22.2 X 8", pcd298: "298.5", f300fl: "533", f300bw: "533", d300: "380", h300: "25.4 X 12", pcd300_7: "330.2" },
    { size: "DN250", f150fl: "622", f150bw: "622", d150: "405", h150: "25.4 X 12", pcd362: "362", f300fl: "622", f300bw: "622", d300: "445", h300: "29 X 16", pcd300_8: "387.4" },
    { size: "DN300", f150fl: "698", f150bw: "698", d150: "485", h150: "25.4 X 12", pcd431: "431.8", f300fl: "711", f300bw: "711", d300: "520", h300: "32 X 16", pcd300_9: "450.8" },
    { size: "DN350", f150fl: "787", f150bw: "787", d150: "535", h150: "29 X 12", pcd476: "476.3", f300fl: "838", f300bw: "838", d300: "585", h300: "32 X 20", pcd300_10: "514.4" },
    { size: "DN400", f150fl: "864", f150bw: "864", d150: "595", h150: "29 X 16", pcd539: "539.8", f300fl: "864", f300bw: "864", d300: "650", h300: "35 X 20", pcd300_11: "571.5" },
    { size: "DN450", f150fl: "978", f150bw: "978", d150: "635", h150: "32 X 16", pcd577: "577.9", f300fl: "978", f300bw: "978", d300: "710", h300: "35 X 24", pcd300_12: "628.6" },
    { size: "DN500", f150fl: "978", f150bw: "978", d150: "700", h150: "32 X 20", pcd635: "635", f300fl: "1016", f300bw: "1016", d300: "775", h300: "35 X 24", pcd300_13: "685.8" },
    { size: "DN600", f150fl: "1295", f150bw: "1295", d150: "815", h150: "35 X 20", pcd749: "749.3", f300fl: "1346", f300bw: "1346", d300: "915", h300: "41 X 24", pcd300_14: "812.8" },
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
      
      {/* Breadcrumbs */}
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

          <div className="space-y-16">
            {/* Dimension Table Section - 150# & 300# */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={6} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-6">SWING CHECK VALVE FLANGED END 150#</TableHead>
                      <TableHead colSpan={6} className="text-center font-bold text-primary uppercase py-6">SWING CHECK VALVE FLANGED END 300#</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-100 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-100 py-4 uppercase leading-tight">FACE TO FACE (FL)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-100 py-4 uppercase leading-tight">FACE TO FACE (BW)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-100 py-4 uppercase leading-tight">OUTER DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-100 py-4 uppercase leading-tight">HOLE DIA X NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">PCD</TableHead>
                      
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-100 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-100 py-4 uppercase leading-tight">FACE TO FACE (FL)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-100 py-4 uppercase leading-tight">FACE TO FACE (BW)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-100 py-4 uppercase leading-tight">OUTER DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-100 py-4 uppercase leading-tight">HOLE DIA X NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">PCD</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table150_300.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-[10px] md:text-xs">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f150fl || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f150bw || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.d150 || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h150 || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-200">
                          {Object.values(row)[5] || ""}
                        </TableCell>
                        
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f300fl || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f300bw || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.d300 || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h300 || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80">
                          {Object.values(row)[Object.values(row).length - 1] || ""}
                        </TableCell>
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

      <Footer />
    </main>
  );
}
