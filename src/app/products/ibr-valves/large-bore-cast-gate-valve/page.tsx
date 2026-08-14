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

export default function LargeBoreCastGateValvePage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const slug = "ibr-valves/large-bore-cast-gate-valve";
  const product = productSpecsRegistry[slug];

  if (!product) return null;

  const showcaseImages = [
    { src: "/products/ibr-valveslarge-bore-cast-gate-valve-1.jpg", alt: "Large Bore Cast Gate Valve View 1" },
    { src: "/products/ibr-valveslarge-bore-cast-gate-valve-2.jpg", alt: "Large Bore Cast Gate Valve View 2" },
    { src: "/products/ibr-valveslarge-bore-cast-gate-valve-3.jpg", alt: "Large Bore Cast Gate Valve View 3" },
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
    { size: "DN50", f150fl: "178", f150bw: "216", d150: "150", h150: "19 X 4", pcd150: "120.7", f300fl: "216", f300bw: "216", d300: "165", h300: "19 X 8", pcd300: "127" },
    { size: "DN65", f150fl: "190", f150bw: "241", d150: "180", h150: "19 X 4", pcd150: "139.7", f300fl: "241", f300bw: "241", d300: "190", h300: "22.2 X 8", pcd300: "149.2" },
    { size: "DN80", f150fl: "203", f150bw: "282", d150: "190", h150: "19 X 4", pcd150: "152.4", f300fl: "282", f300bw: "282", d300: "210", h300: "22.2 X 8", pcd300: "168.3" },
    { size: "DN100", f150fl: "229", f150bw: "305", d150: "230", h150: "19 X 8", pcd150: "190.5", f300fl: "305", f300bw: "305", d300: "255", h300: "22.2 X 8", pcd300: "200" },
    { size: "DN125", f150fl: "254", f150bw: "381", d150: "255", h150: "22.2 X 8", pcd150: "215.9", f300fl: "381", f300bw: "381", d300: "280", h300: "22.2 X 8", pcd300: "235" },
    { size: "DN150", f150fl: "267", f150bw: "403", d150: "280", h150: "22.2 X 8", pcd150: "241.3", f300fl: "403", f300bw: "403", d300: "320", h300: "22.2 X 12", pcd300: "269.9" },
    { size: "DN200", f150fl: "292", f150bw: "419", d150: "345", h150: "22.2 X 8", pcd150: "298.5", f300fl: "419", f300bw: "419", d300: "380", h300: "25.4 X 12", pcd300: "330.2" },
    { size: "DN250", f150fl: "330", f150bw: "457", d150: "405", h150: "25.4 X 12", pcd150: "362", f300fl: "457", f300bw: "457", d300: "445", h300: "29 X 16", pcd300: "387.4" },
    { size: "DN300", f150fl: "356", f150bw: "502", d150: "485", h150: "25.4 X 12", pcd150: "431.8", f300fl: "502", f300bw: "502", d300: "520", h300: "32 X 16", pcd300: "450.8" },
    { size: "DN350", f150fl: "381", f150bw: "572", d150: "535", h150: "29 X 12", pcd150: "476.3", f300fl: "762", f300bw: "762", d300: "585", h300: "32 X 20", pcd300: "514.4" },
    { size: "DN400", f150fl: "406", f150bw: "610", d150: "595", h150: "29 X 16", pcd150: "539.8", f300fl: "838", f300bw: "838", d300: "650", h300: "35 X 20", pcd300: "571.5" },
    { size: "DN450", f150fl: "432", f150bw: "660", d150: "635", h150: "32 X 16", pcd150: "577.9", f300fl: "914", f300bw: "914", d300: "710", h300: "35 X 24", pcd300: "628.6" },
    { size: "DN500", f150fl: "457", f150bw: "711", d150: "700", h150: "32 X 20", pcd150: "635", f300fl: "991", f300bw: "991", d300: "775", h300: "35 X 24", pcd300: "685.8" },
    { size: "DN600", f150fl: "508", f150bw: "813", d150: "815", h150: "35 X 20", pcd150: "749.3", f300fl: "1143", f300bw: "1143", d300: "915", h300: "41 X 24", pcd300: "812.8" },
    { size: "DN700", f150fl: "610", f150bw: "914", f300fl: "1346", f300bw: "1346", isHeader: true },
    { size: "SERIES A FLANGE", d150: "925", h150: "35 X 28", pcd150: "863.6", d300: "1035", h300: "44 X 28", pcd300: "939.8", isChild: true },
    { size: "SERIES B FLANGE", d150: "835", h150: "22.2 X 40", pcd150: "795.3", d300: "920", h300: "35 X 36", pcd300: "857.2", isChild: true },
    { size: "DN800", f150fl: "660", f150bw: "965", f300fl: "1524", f300bw: "1524", isHeader: true },
    { size: "SERIES A FLANGE", d150: "1060", h150: "41.2 X 28", pcd150: "977.9", d300: "1150", h300: "50 X 28", pcd300: "1054.1", isChild: true },
    { size: "SERIES B FLANGE", d150: "940", h150: "22.2 X 48", pcd150: "900.1", d300: "1055", h300: "41.2 X 32", pcd300: "977.9", isChild: true },
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

          <div className="space-y-16">
            {/* Dimension Table Section - 150# & 300# */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={6} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-6">GATE VALVE FLANGED END 150#</TableHead>
                      <TableHead colSpan={6} className="text-center font-bold text-primary uppercase py-6">GATE VALVE FLANGED END 300#</TableHead>
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
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f150fl || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f150bw || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.d150 || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h150 || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-200">{row.pcd150 || ""}</TableCell>
                        
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f300fl || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f300bw || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.d300 || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h300 || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.pcd300 || ""}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
