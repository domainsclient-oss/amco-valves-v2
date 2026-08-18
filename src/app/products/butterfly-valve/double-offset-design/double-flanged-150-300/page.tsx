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
import { productSpecsRegistry } from "@/lib/product-specs";
import { QuotePopup } from "@/components/QuotePopup";

export default function DoubleOffsetFlangedBFVPage() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const slug = "butterfly-valve/double-offset-design/double-flanged-150-300";
  const product = productSpecsRegistry[slug];

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-40 pb-20 container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-primary">Product Not Found</h1>
          <Button className="mt-8" asChild>
            <Link href="/#products">Back to Products</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const productImage = {
    imageUrl: "/products/butterfly-valvedouble-offset-designdouble-flanged-150-300.jpg",
    description: product.subTitle
  };

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

  const dim150 = [
    { size: "DN40", f: "-", top: "-", bottom: "-" },
    { size: "DN50", f: "109", top: "163", bottom: "93" },
    { size: "DN65", f: "112", top: "162", bottom: "101" },
    { size: "DN80", f: "114", top: "190", bottom: "118" },
    { size: "DN100", f: "127", top: "220", bottom: "139" },
    { size: "DN125", f: "140", top: "220", bottom: "139" },
    { size: "DN150", f: "140", top: "220", bottom: "151" },
    { size: "DN200", f: "152", top: "277", bottom: "183" },
    { size: "DN250", f: "165", top: "304", bottom: "217" },
    { size: "DN300", f: "178", top: "380", bottom: "265" },
    { size: "DN350", f: "190", top: "405", bottom: "284" },
    { size: "DN400", f: "216", top: "484", bottom: "315" },
    { size: "DN450", f: "222", top: "491", bottom: "339" },
    { size: "DN500", f: "229", top: "577", bottom: "390" },
    { size: "DN600", f: "267", top: "634", bottom: "438" },
    { size: "DN700", f: "292", top: "730", bottom: "500" },
    { size: "DN750", f: "318", top: "745", bottom: "540" },
    { size: "DN800", f: "318", top: "781", bottom: "560" },
    { size: "DN900", f: "330", top: "860", bottom: "650" },
    { size: "DN1000", f: "410", top: "990", bottom: "732" },
  ];

  const dim300 = [
    { size: "DN40", f: "-", top: "-", bottom: "-" },
    { size: "DN50", f: "108", top: "167", bottom: "98" },
    { size: "DN65", f: "114", top: "184", bottom: "120" },
    { size: "DN80", f: "114", top: "190", bottom: "118" },
    { size: "DN100", f: "127", top: "190", bottom: "123" },
    { size: "DN125", f: "140", top: "200", bottom: "139" },
    { size: "DN150", f: "140", top: "245", bottom: "173" },
    { size: "DN200", f: "152", top: "305", bottom: "207" },
    { size: "DN250", f: "165", top: "351", bottom: "240" },
    { size: "DN300", f: "178", top: "400", bottom: "277" },
    { size: "DN350", f: "190", top: "457", bottom: "318" },
    { size: "DN400", f: "216", top: "528", bottom: "365" },
    { size: "DN450", f: "222", top: "591", bottom: "400" },
    { size: "DN500", f: "229", top: "602", bottom: "436" },
    { size: "DN600", f: "267", top: "795", bottom: "504" },
    { size: "DN700", f: "-", top: "-", bottom: "-" },
    { size: "DN750", f: "-", top: "-", bottom: "-" },
    { size: "DN800", f: "-", top: "-", bottom: "-" },
    { size: "DN900", f: "-", top: "-", bottom: "-" },
    { size: "DN1000", f: "-", top: "-", bottom: "-" },
  ];

  const flangeSuitability = [
    { size: "DN40", p150: "98.4", d150: "16", n150: "4", p300: "-", d300: "-", n300: "-" },
    { size: "DN50", p150: "120.7", d150: "19", n150: "4", p300: "127", d300: "19", n300: "8" },
    { size: "DN65", p150: "139.7", d150: "19", n150: "4", p300: "149.2", d300: "22.2", n300: "8" },
    { size: "DN80", p150: "152.4", d150: "19", n150: "4", p300: "168.3", d300: "22.2", n300: "8" },
    { size: "DN100", p150: "190.5", d150: "19", n150: "8", p300: "200", d300: "22.2", n300: "8" },
    { size: "DN125", p150: "215.9", d150: "22.2", n150: "8", p300: "235", d300: "22.2", n300: "8" },
    { size: "DN150", p150: "241.3", d150: "22.2", n150: "8", p300: "269.9", d300: "22.2", n300: "12" },
    { size: "DN200", p150: "298.5", d150: "22.2", n150: "8", p300: "330.2", d300: "25.4", n300: "12" },
    { size: "DN250", p150: "362.0", d150: "25.4", n150: "12", p300: "387.4", d300: "29", n300: "16" },
    { size: "DN300", p150: "431.8", d150: "25.4", n150: "12", p300: "450.8", d300: "32", n300: "16" },
    { size: "DN350", p150: "476.3", d150: "29", n150: "12", p300: "514.4", d300: "32", n300: "20" },
    { size: "DN400", p150: "539.8", d150: "29", n150: "16", p300: "571.5", d300: "35", n300: "20" },
    { size: "DN450", p150: "577.9", d150: "32", n150: "16", p300: "628.6", d300: "35", n300: "24" },
    { size: "DN500", p150: "635.0", d150: "32", n150: "20", p300: "685.8", d300: "35", n300: "24" },
    { size: "DN600", p150: "749.3", d150: "35", n150: "20", p300: "812.8", d300: "41", n300: "24" },
    { size: "DN700", p150: "863.6", d150: "35", n150: "28", p300: "-", d300: "-", n300: "-" },
    { size: "DN750", p150: "914.4", d150: "35", n150: "28", p300: "-", d300: "-", n300: "-" },
    { size: "DN800", p150: "977.9", d150: "41.2", n150: "28", p300: "-", d300: "-", n300: "-" },
    { size: "DN900", p150: "1085.8", d150: "41.2", n150: "32", p300: "-", d300: "-", n300: "-" },
    { size: "DN1000", p150: "1200.2", d150: "41.2", n150: "36", p300: "-", d300: "-", n300: "-" },
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
    link.setAttribute("download", `Double_Offset_Flanged_BFV_Data_Sheet.csv`);
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
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">{product.subCategory}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">{product.subTitle}</h1>
        </div>
      </div>

      <section className="py-12 md:py-20 px-5 md:px-[63px]" style={{ backgroundColor: '#f3f3f3bd' }}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white border border-border shadow-lg">
              <Image
                src={productImage.imageUrl}
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

          <div className="space-y-16">
            {/* Table 1: 150# Dimensions */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-5xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={4} className="text-center font-bold text-primary uppercase py-6 text-lg">
                        FLANGED BFV TO SUIT 150# FLANGES
                      </TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">CENTER TO TOP</TableHead>
                      <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">CENTER TO BOTTOM</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dim150.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-2.5">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.top}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.bottom}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50 text-right">
                <p className="text-[10px] md:text-sm text-foreground/50 font-medium italic">
                  All dimensions are in mm
                </p>
              </div>
            </div>

            {/* Table 2: 300# Dimensions */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-5xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={4} className="text-center font-bold text-primary uppercase py-6 text-lg">
                        FLANGED BFV TO SUIT 300# FLANGES
                      </TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">CENTER TO TOP</TableHead>
                      <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">CENTER TO BOTTOM</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dim300.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-2.5">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.top}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.bottom}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50 text-right">
                <p className="text-[10px] md:text-sm text-foreground/50 font-medium italic">
                  All dimensions are in mm
                </p>
              </div>
            </div>

            {/* Table 3: Flange Suitability */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-7xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead rowSpan={2} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-6 text-sm">SIZE</TableHead>
                      <TableHead colSpan={3} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-4 bg-neutral-50/50">TO SUIT 150# FLANGES</TableHead>
                      <TableHead colSpan={3} className="text-center font-bold text-primary uppercase py-4 bg-neutral-50/50">TO SUIT 300# FLANGES</TableHead>
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
                    {flangeSuitability.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-2.5 bg-neutral-50/20">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.p150}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.d150}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-200">{row.n150}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.p300}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.d300}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.n300}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50 text-right">
                <p className="text-[10px] md:text-sm text-foreground/50 font-medium italic">
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
        productName={product.subTitle} 
      />

      <Footer />
    </main>
  );
}
