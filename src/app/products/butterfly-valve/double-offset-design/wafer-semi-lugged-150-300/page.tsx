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

export default function DoubleOffsetWaferBFVPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const slug = "butterfly-valve/double-offset-design/wafer-semi-lugged-150-300";
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

  const showcaseImages = [
    { src: "/products/butterfly-valvedouble-offset-designwafer-semi-lugged-150-300-1.jpg", alt: "Wafer Semi Lugged BFV View 1" },
    { src: "/products/butterfly-valvedouble-offset-designwafer-semi-lugged-150-300-2.jpg", alt: "Wafer Semi Lugged BFV View 2" },
    { src: "/products/butterfly-valvedouble-offset-designwafer-semi-lugged-150-300-3.jpeg", alt: "Wafer Semi Lugged BFV View 3" },
    { src: "/products/butterfly-valvedouble-offset-designwafer-semi-lugged-150-300-4.jpg", alt: "Wafer Semi Lugged BFV View 4" },
    { src: "/products/butterfly-valvedouble-offset-designwafer-semi-lugged-150-300-5.jpg", alt: "Wafer Semi Lugged BFV View 5" },
    { src: "/products/butterfly-valvedouble-offset-designwafer-semi-lugged-150-300-6.jpg", alt: "Wafer Semi Lugged BFV View 6" },
    { src: "/products/butterfly-valvedouble-offset-designwafer-semi-lugged-150-300-7.jpeg", alt: "Wafer Semi Lugged BFV View 7" },
    { src: "/products/butterfly-valvedouble-offset-designwafer-semi-lugged-150-300-8.jpg", alt: "Wafer Semi Lugged BFV View 8" },
  ];

  const productImage = {
    imageUrl: showcaseImages[0].src,
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
    { size: "DN40", f: "42", top: "85", bottom: "51" },
    { size: "DN50", f: "45", top: "90", bottom: "58" },
    { size: "DN65", f: "48", top: "102", bottom: "63" },
    { size: "DN80", f: "48", top: "120", bottom: "70" },
    { size: "DN100", f: "54", top: "134", bottom: "86" },
    { size: "DN125", f: "57", top: "154", bottom: "105" },
    { size: "DN150", f: "57", top: "170", bottom: "120" },
    { size: "DN200", f: "63", top: "200", bottom: "145" },
    { size: "DN250", f: "72", top: "230", bottom: "175" },
    { size: "DN300", f: "83", top: "270", bottom: "215" },
    { size: "DN350", f: "92", top: "320", bottom: "240" },
    { size: "DN400", f: "102", top: "365", bottom: "280" },
    { size: "DN450", f: "114", top: "375", bottom: "305" },
    { size: "DN500", f: "127", top: "410", bottom: "340" },
    { size: "DN600", f: "154", top: "634", bottom: "438" },
    { size: "DN700", f: "165", top: "730", bottom: "500" },
    { size: "DN750", f: "190", top: "720", bottom: "540" },
    { size: "DN800", f: "190", top: "781", bottom: "560" },
    { size: "DN900", f: "203", top: "860", bottom: "650" },
    { size: "DN1000", f: "251", top: "990", bottom: "732" },
  ];

  const dim300 = [
    { size: "DN40", f: "-", top: "-", bottom: "-" },
    { size: "DN50", f: "43", top: "133", bottom: "86" },
    { size: "DN65", f: "48", top: "146", bottom: "108" },
    { size: "DN80", f: "48", top: "158", bottom: "109" },
    { size: "DN100", f: "54", top: "172", bottom: "123" },
    { size: "DN125", f: "59", top: "203", bottom: "139" },
    { size: "DN150", f: "59", top: "220", bottom: "163" },
    { size: "DN200", f: "73", top: "278", bottom: "200" },
    { size: "DN250", f: "83", top: "300", bottom: "230" },
    { size: "DN300", f: "92", top: "341", bottom: "267" },
    { size: "DN350", f: "117", top: "457", bottom: "315" },
    { size: "DN400", f: "133", top: "528", bottom: "365" },
    { size: "DN450", f: "149", top: "591", bottom: "383" },
    { size: "DN500", f: "159", top: "602", bottom: "436" },
    { size: "DN600", f: "181", top: "795", bottom: "504" },
    { size: "DN700", f: "-", top: "-", bottom: "-" },
    { size: "DN750", f: "-", top: "-", bottom: "-" },
    { size: "DN800", f: "-", top: "-", bottom: "-" },
    { size: "DN900", f: "-", top: "-", bottom: "-" },
    { size: "DN1000", f: "-", top: "-", bottom: "-" },
  ];

  const flangeSuit1 = [
    { size: "DN40", p150: "98.4", d150: "16", n150: "4", p10: "110", d10: "18", n10: "4" },
    { size: "DN50", p150: "120.7", d150: "19", n150: "4", p10: "125", d10: "18", n10: "4" },
    { size: "DN65", p150: "139.7", d150: "19", n150: "4", p10: "145", d10: "18", n10: "4" },
    { size: "DN80", p150: "152.4", d150: "19", n150: "4", p10: "160", d10: "18", n10: "8" },
    { size: "DN100", p150: "190.5", d150: "19", n150: "8", p10: "180", d10: "18", n10: "8" },
    { size: "DN125", p150: "215.9", d150: "22.2", n150: "8", p10: "210", d10: "18", n10: "8" },
    { size: "DN150", p150: "241.3", d150: "22.2", n150: "8", p10: "240", d10: "22", n10: "8" },
    { size: "DN200", p150: "298.5", d150: "22.2", n150: "8", p10: "295", d10: "22", n10: "8" },
    { size: "DN250", p150: "362.0", d150: "25.4", n150: "12", p10: "350", d10: "22", n10: "12" },
    { size: "DN300", p150: "431.8", d150: "25.4", n150: "12", p10: "400", d10: "22", n10: "12" },
    { size: "DN350", p150: "476.3", d150: "29", n150: "12", p10: "460", d10: "22", n10: "16" },
    { size: "DN400", p150: "539.8", d150: "29", n150: "16", p10: "515", d10: "26", n10: "16" },
    { size: "DN450", p150: "577.9", d150: "32", n150: "16", p10: "565", d10: "26", n10: "20" },
    { size: "DN500", p150: "635.0", d150: "32", n150: "20", p10: "620", d10: "26", n10: "20" },
    { size: "DN600", p150: "749.3", d150: "35", n150: "20", p10: "725", d10: "30", n10: "20" },
    { size: "DN700", p150: "863.6", d150: "35", n150: "28", p10: "840", d10: "30", n10: "24" },
    { size: "DN750", p150: "914.4", d150: "35", n150: "28", p10: "-", d10: "-", n10: "-" },
    { size: "DN800", p150: "977.9", d150: "41.2", n150: "28", p10: "950", d10: "33", n10: "24" },
    { size: "DN900", p150: "1085.8", d150: "41.2", n150: "32", p10: "1050", d10: "33", n10: "24" },
    { size: "DN1000", p150: "1200.2", d150: "41.2", n150: "36", p10: "1160", d10: "36", n10: "28" },
  ];

  const flangeSuit2 = [
    { size: "DN40", p16: "110", d16: "18", n16: "4", p300: "-", d300: "-", n300: "-" },
    { size: "DN50", p16: "125", d16: "18", n16: "4", p300: "127", d300: "19", n300: "8" },
    { size: "DN65", p16: "145", d16: "18", n16: "4", p300: "149.2", d300: "22.2", n300: "8" },
    { size: "DN80", p16: "160", d16: "18", n16: "8", p300: "168.3", d300: "22.2", n300: "8" },
    { size: "DN100", p16: "180", d16: "18", n16: "8", p300: "200", d300: "22.2", n300: "8" },
    { size: "DN125", p16: "210", d16: "18", n16: "8", p300: "235", d300: "22.2", n300: "8" },
    { size: "DN150", p16: "240", d16: "22", n16: "8", p300: "269.9", d300: "22.2", n300: "12" },
    { size: "DN200", p16: "295", d16: "22", n16: "12", p300: "330.2", d300: "25.4", n300: "12" },
    { size: "DN250", p16: "355", d16: "26", n16: "12", p300: "387.4", d300: "29", n300: "16" },
    { size: "DN300", p16: "410", d16: "26", n16: "12", p300: "450.8", d300: "32", n300: "16" },
    { size: "DN350", p16: "470", d16: "26", n16: "16", p300: "514.4", d300: "32", n300: "20" },
    { size: "DN400", p16: "525", d16: "30", n16: "16", p300: "571.5", d300: "35", n300: "20" },
    { size: "DN450", p16: "585", d16: "30", n16: "20", p300: "628.6", d300: "35", n300: "24" },
    { size: "DN500", p16: "650", d16: "33", n16: "20", p300: "685.8", d300: "35", n300: "24" },
    { size: "DN600", p16: "770", d16: "36", n16: "20", p300: "812.8", d300: "41", n300: "24" },
    { size: "DN700", p16: "840", d16: "36", n16: "24", p300: "-", d300: "-", n300: "-" },
    { size: "DN750", p16: "-", d16: "-", n16: "-", p300: "-", d300: "-", n300: "-" },
    { size: "DN800", p16: "950", d16: "39", n16: "24", p300: "-", d300: "-", n300: "-" },
    { size: "DN900", p16: "1050", d16: "39", n16: "28", p300: "-", d300: "-", n300: "-" },
    { size: "DN1000", p16: "1170", d16: "42", n16: "28", p300: "-", d300: "-", n300: "-" },
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
    link.setAttribute("download", `Double_Offset_Wafer_BFV_Data_Sheet.csv`);
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
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

          <div className="space-y-16">
            {/* Table 1: 150# */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-5xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={4} className="text-center font-bold text-primary uppercase py-6 text-lg">
                        WAFER TYPE BFV TO SUIT 150# FLANGES
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

            {/* Table 2: 300# */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-5xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={4} className="text-center font-bold text-primary uppercase py-6 text-lg">
                        WAFER TYPE BFV TO SUIT 300# FLANGES
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

            {/* Table 3: Suitability 1 */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-7xl mx-auto">
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
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">HOLE DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase leading-tight">NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">PCD</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">HOLE DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary py-3 uppercase">NO. OF HOLES</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flangeSuit1.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-2.5 bg-neutral-50/20">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.p150}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.d150}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-200">{row.n150}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.p10}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.d10}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.n10}</TableCell>
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

            {/* Table 4: Suitability 2 */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-7xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead rowSpan={2} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-6 text-sm">SIZE</TableHead>
                      <TableHead colSpan={3} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-4 bg-neutral-50/50">TO SUIT PN16# FLANGES</TableHead>
                      <TableHead colSpan={3} className="text-center font-bold text-primary uppercase py-4 bg-neutral-50/50">TO SUIT 300# FLANGES</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">PCD</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">HOLE DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase leading-tight">NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">PCD</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">HOLE DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary py-3 uppercase">NO. OF HOLES</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flangeSuit2.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-2.5 bg-neutral-50/20">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.p16}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.d16}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-200">{row.n16}</TableCell>
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
