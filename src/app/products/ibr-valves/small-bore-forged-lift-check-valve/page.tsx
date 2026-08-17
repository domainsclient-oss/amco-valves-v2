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

export default function SmallBoreForgedLiftCheckValvePage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const slug = "ibr-valves/small-bore-forged-lift-check-valve";
  const product = productSpecsRegistry[slug];

  if (!product) return null;

  const showcaseImages = [
    { src: "/products/small-bore-forged-lift-check-valve-1.jpg", alt: "Small Bore Forged Lift Check Valve View 1" },
    { src: "/products/small-bore-forged-lift-check-valve-2.jpg", alt: "Small Bore Forged Lift Check Valve View 2" },
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
    { label: "Manufacturing Standard", value: product.manufacturingStandard },
    { label: "Testing Standard", value: product.testingStandard },
  ];

  const table150 = [
    { size: "DN15", ftf: "108", od: "90", hole: "16 X 4", pcd: "60.3", height: "53" },
    { size: "DN20", ftf: "117", od: "100", hole: "16 X 4", pcd: "69.9", height: "56" },
    { size: "DN25", ftf: "127", od: "110", hole: "16 X 4", pcd: "79.4", height: "66" },
    { size: "DN32", ftf: "140", od: "115", hole: "16 X 4", pcd: "88.9", height: "86" },
    { size: "DN40", ftf: "165", od: "125", hole: "16 X 4", pcd: "98.4", height: "86" },
    { size: "DN50", ftf: "203", od: "150", hole: "19 X 4", pcd: "120.7", height: "104" },
  ];

  const table300 = [
    { size: "DN15", ftf: "152", od: "95", hole: "16 X 4", pcd: "66.7", height: "53" },
    { size: "DN20", ftf: "178", od: "115", hole: "19 X 4", pcd: "82.6", height: "56" },
    { size: "DN25", ftf: "203", od: "125", hole: "19 X 4", pcd: "88.9", height: "66" },
    { size: "DN32", ftf: "216", od: "135", hole: "19 X 4", pcd: "98.4", height: "86" },
    { size: "DN40", ftf: "229", od: "155", hole: "22.2 X 4", pcd: "114.3", height: "86" },
    { size: "DN50", ftf: "267", od: "165", hole: "19 X 8", pcd: "127", height: "104" },
  ];

  const table600 = [
    { size: "DN15", ftf: "165", od: "95", hole: "16 X 4", pcd: "66.7", height: "53" },
    { size: "DN20", ftf: "190", od: "115", hole: "19 X 4", pcd: "82.6", height: "56" },
    { size: "DN25", ftf: "216", od: "125", hole: "19 X 4", pcd: "88.9", height: "66" },
    { size: "DN32", ftf: "229", od: "135", hole: "19 X 4", pcd: "98.4", height: "86" },
    { size: "DN40", ftf: "241", od: "155", hole: "22.2 X 4", pcd: "114.3", height: "86" },
    { size: "DN50", ftf: "292", od: "165", hole: "19 X 8", pcd: "127", height: "104" },
  ];

  const table800 = [
    { size: "DN15", ftf: "73", bore: "9.5", sw_bore: "21.8", height: "53" },
    { size: "DN20", ftf: "80", bore: "12.7", sw_bore: "27.2", height: "56" },
    { size: "DN25", ftf: "100", bore: "17.5", sw_bore: "33.9", height: "66" },
    { size: "DN32", ftf: "145", bore: "23.8", sw_bore: "42.7", height: "86" },
    { size: "DN40", ftf: "145", bore: "28.6", sw_bore: "48.8", height: "86" },
    { size: "DN50", ftf: "160", bore: "36.5", sw_bore: "61.2", height: "104" },
  ];

  const table1500 = [
    { size: "DN15", ftf: "80", bore: "8.5", sw_bore: "21.8", height: "56" },
    { size: "DN20", ftf: "100", bore: "9.5", sw_bore: "27.2", height: "66" },
    { size: "DN25", ftf: "145", bore: "14.5", sw_bore: "33.9", height: "86" },
    { size: "DN32", ftf: "145", bore: "20.5", sw_bore: "42.7", height: "86" },
    { size: "DN40", ftf: "160", bore: "25.5", sw_bore: "48.8", height: "104" },
    { size: "DN50", ftf: "172", bore: "27.5", sw_bore: "61.2", height: "127" },
  ];

  const table2500 = [
    { size: "DN15", ftf: "100", bore: "7.0", sw_bore: "21.8", height: "66" },
    { size: "DN20", ftf: "145", bore: "12.5", sw_bore: "27.2", height: "86" },
    { size: "DN25", ftf: "160", bore: "15.5", sw_bore: "33.9", height: "104" },
    { size: "DN32", ftf: "172", bore: "21.5", sw_bore: "42.7", height: "127" },
    { size: "DN40", ftf: "172", bore: "26.5", sw_bore: "48.8", height: "127" },
    { size: "DN50", ftf: "-", bore: "-", sw_bore: "-", height: "-" },
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
      ["Product", "Small Bore Forged IBR & Non IBR Lift check Valve"],
      ["Category", "IBR & Non IBR Valves"],
      ["Sub Category", "Small Bore Forged"],
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
    link.setAttribute("download", `Small_Bore_Forged_Lift_Check_Valve_Data_Sheet.csv`);
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
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">Small Bore Forged</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">{product.subTitle}</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-20 px-5 md:px-[63px]" style={{ backgroundColor: 'rgba(243, 243, 243, 0.74)' }}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
            {/* Left Column: Image */}
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white border border-border shadow-lg">
              <Image
                src={productImage.imageUrl}
                alt="Small Bore Forged Lift Check Valve"
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

          {/* Visual Showcase Section */}
          <div className="mb-20 space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
              <Sparkles className="size-3.5" /> Visual Showcase
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <h2 className="text-2xl font-bold text-primary border-l-4 border-secondary pl-4 uppercase tracking-wide">Flanged Design Specifications</h2>
            
            <div className="grid gap-12">
              {/* Flanged 150# */}
              <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table className="border-collapse w-full">
                    <TableHeader>
                      <TableRow className="bg-white border-b border-neutral-300">
                        <TableHead colSpan={6} className="text-center font-bold text-primary uppercase py-6 text-lg">
                          A105 / F304L / F316L LIFT CHECK VALVE FLANGED 150#
                        </TableHead>
                      </TableRow>
                      <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs uppercase">
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4">SIZE</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">FACE TO FACE</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">OUTER DIA</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">HOLE DIA X NO. OF HOLES</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">PCD</TableHead>
                        <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">CENTER TO TOP HEIGHT</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {table150.map((row, idx) => (
                        <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                          <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.od}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.hole}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.pcd}</TableCell>
                          <TableCell className="text-center text-foreground/80">{row.height}</TableCell>
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

              {/* Flanged 300# */}
              <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table className="border-collapse w-full">
                    <TableHeader>
                      <TableRow className="bg-white border-b border-neutral-300">
                        <TableHead colSpan={6} className="text-center font-bold text-primary uppercase py-6 text-lg">
                          A105 / F304L / F316L LIFT CHECK VALVE FLANGED 300#
                        </TableHead>
                      </TableRow>
                      <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs uppercase">
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4">SIZE</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">FACE TO FACE</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">OUTER DIA</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">HOLE DIA X NO. OF HOLES</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">PCD</TableHead>
                        <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">CENTER TO TOP HEIGHT</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {table300.map((row, idx) => (
                        <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                          <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.od}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.hole}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.pcd}</TableCell>
                          <TableCell className="text-center text-foreground/80">{row.height}</TableCell>
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

              {/* Flanged 600# */}
              <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table className="border-collapse w-full">
                    <TableHeader>
                      <TableRow className="bg-white border-b border-neutral-300">
                        <TableHead colSpan={6} className="text-center font-bold text-primary uppercase py-6 text-lg">
                          A105 / F304L / F316L LIFT CHECK VALVE FLANGED 600#
                        </TableHead>
                      </TableRow>
                      <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs uppercase">
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4">SIZE</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">FACE TO FACE</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">OUTER DIA</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">HOLE DIA X NO. OF HOLES</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">PCD</TableHead>
                        <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">CENTER TO TOP HEIGHT</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {table600.map((row, idx) => (
                        <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                          <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.od}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.hole}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.pcd}</TableCell>
                          <TableCell className="text-center text-foreground/80">{row.height}</TableCell>
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

            <h2 className="text-2xl font-bold text-primary border-l-4 border-secondary pl-4 uppercase tracking-wide">SW, SE & BW Design Specifications</h2>
            
            <div className="grid gap-12">
              {/* SW/SE/BW 800# */}
              <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table className="border-collapse w-full">
                    <TableHeader>
                      <TableRow className="bg-white border-b border-neutral-300">
                        <TableHead colSpan={5} className="text-center font-bold text-primary uppercase py-6 text-lg">
                          A105 / F304L / F316L LIFT CHECK VALVE SW, SE & BW 800#
                        </TableHead>
                      </TableRow>
                      <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs uppercase">
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4">SIZE</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">FACE TO FACE</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">BORE</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">SOCKETWELD BORE</TableHead>
                        <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">CENTER TO TOP HEIGHT</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {table800.map((row, idx) => (
                        <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                          <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.bore}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.sw_bore}</TableCell>
                          <TableCell className="text-center text-foreground/80">{row.height}</TableCell>
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

              {/* SW/SE/BW 1500# */}
              <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table className="border-collapse w-full">
                    <TableHeader>
                      <TableRow className="bg-white border-b border-neutral-300">
                        <TableHead colSpan={5} className="text-center font-bold text-primary uppercase py-6 text-lg">
                          A105 / F304L / F316L LIFT CHECK VALVE SW, SE & BW 1500#
                        </TableHead>
                      </TableRow>
                      <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs uppercase">
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4">SIZE</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">FACE TO FACE</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">BORE</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">SOCKETWELD BORE</TableHead>
                        <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">CENTER TO TOP HEIGHT</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {table1500.map((row, idx) => (
                        <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                          <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.bore}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.sw_bore}</TableCell>
                          <TableCell className="text-center text-foreground/80">{row.height}</TableCell>
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

              {/* SW/SE/BW 2500# */}
              <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table className="border-collapse w-full">
                    <TableHeader>
                      <TableRow className="bg-white border-b border-neutral-300">
                        <TableHead colSpan={5} className="text-center font-bold text-primary uppercase py-6 text-lg">
                          A105 / F304L / F316L LIFT CHECK VALVE SW, SE & BW 2500#
                        </TableHead>
                      </TableRow>
                      <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs uppercase">
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4">SIZE</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">FACE TO FACE</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">BORE</TableHead>
                        <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 leading-tight">SOCKETWELD BORE</TableHead>
                        <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">CENTER TO TOP HEIGHT</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {table2500.map((row, idx) => (
                        <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                          <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.bore}</TableCell>
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.sw_bore}</TableCell>
                          <TableCell className="text-center text-foreground/80">{row.height}</TableCell>
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
        productName="Small Bore Forged IBR & Non IBR Lift check Valve" 
      />

      <Footer />
    </main>
  );
}
