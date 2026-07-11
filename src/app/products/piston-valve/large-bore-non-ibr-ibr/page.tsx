"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { productSpecsRegistry } from "@/lib/product-specs";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function LargeBorePistonValvePage() {
  const slug = "piston-valve/large-bore-non-ibr-ibr";
  const product = productSpecsRegistry[slug];

  if (!product) return null;

  const productImage = PlaceHolderImages.find(img => img.id === "product-7") || PlaceHolderImages[0];

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

  const table150 = [
    { size: "DN25", ftf: "127", outer: "110", hole: "Ø 16 X 4", pcd: "79.4", h_open: "176", h_close: "142", wheel: "116" },
    { size: "DN40", ftf: "165", outer: "125", hole: "Ø 16 X 4", pcd: "98.4", h_open: "240", h_close: "193", wheel: "150" },
    { size: "DN50", ftf: "190", outer: "150", hole: "Ø 19 X 4", pcd: "120.7", h_open: "269", h_close: "223", wheel: "200" },
    { size: "DN65", ftf: "216", outer: "180", hole: "Ø 19 X 4", pcd: "139.7", h_open: "400", h_close: "330", wheel: "200" },
    { size: "DN80", ftf: "254", outer: "190", hole: "Ø 19 X 4", pcd: "152.4", h_open: "400", h_close: "330", wheel: "300" },
    { size: "DN100", ftf: "305", outer: "230", hole: "Ø 19 X 8", pcd: "190.5", h_open: "496", h_close: "412", wheel: "300" },
    { size: "DN150", ftf: "406", outer: "280", hole: "Ø 22.2 X 8", pcd: "241.3", h_open: "615", h_close: "495", wheel: "350" },
    { size: "DN200", ftf: "495", outer: "343", hole: "Ø 22.2 X 8", pcd: "298.5", h_open: "720", h_close: "575", wheel: "400" },
  ];

  const table300 = [
    { size: "DN25", ftf: "203", outer: "125", hole: "Ø 19 X 4", pcd: "88.9", h_open: "176", h_close: "142", wheel: "116" },
    { size: "DN40", ftf: "229", outer: "155", hole: "Ø 22.2 X 4", pcd: "114.3", h_open: "240", h_close: "193", wheel: "150" },
    { size: "DN50", ftf: "267", outer: "165", hole: "Ø 19 X 8", pcd: "127", h_open: "269", h_close: "223", wheel: "200" },
    { size: "DN65", ftf: "292", outer: "190", hole: "Ø 22.2 X 8", pcd: "149.2", h_open: "400", h_close: "330", wheel: "200" },
    { size: "DN80", ftf: "318", outer: "210", hole: "Ø 22.2 X 8", pcd: "168.3", h_open: "400", h_close: "330", wheel: "300" },
    { size: "DN100", ftf: "356", outer: "255", hole: "Ø 22.2 X 8", pcd: "200", h_open: "496", h_close: "412", wheel: "300" },
    { size: "DN150", ftf: "444", outer: "320", hole: "Ø 22.2 X 12", pcd: "269.9", h_open: "615", h_close: "495", wheel: "350" },
    { size: "DN200", ftf: "559", outer: "380", hole: "Ø 25.4 X 12", pcd: "330.2", h_open: "720", h_close: "575", wheel: "400" },
  ];

  const handleDownloadCSV = () => {
    const headers = ["Specification", "Details"];
    const rows = [
      ["Product", product.subTitle],
      ["Category", product.category],
      ...specs.map(spec => [spec.label + (spec.subLabel || ""), spec.value]),
      [""],
      ["Dimension Table (150#)"],
      ["Size", "Face To Face", "Outer Dia", "Hole pattern", "PCD", "Height (Open)", "Height (Close)", "Wheel Dia"],
      ...table150.map(row => [row.size, row.ftf, row.outer, row.hole, row.pcd, row.h_open, row.h_close, row.wheel]),
      [""],
      ["Dimension Table (300#)"],
      ["Size", "Face To Face", "Outer Dia", "Hole pattern", "PCD", "Height (Open)", "Height (Close)", "Wheel Dia"],
      ...table300.map(row => [row.size, row.ftf, row.outer, row.hole, row.pcd, row.h_open, row.h_close, row.wheel])
    ];
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Large_Bore_Piston_Valve_Data_Sheet.csv`);
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
            <span className="text-primary">Piston Valve</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">Seatless & Glandless</p>
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

          <div className="space-y-16">
            {/* Table 1: 150# Dimensions */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-7xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={8} className="text-center font-bold text-primary uppercase py-6 text-lg">
                        PISTON VALVE FLANGED 150#
                      </TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">OUTER DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">HOLE DIA X NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">PCD</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">CENTER TO TOP (OPEN)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">CENTER TO TOP (CLOSE)</TableHead>
                      <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">WHEEL DIA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table150.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.outer}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.hole}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.pcd}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h_open}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h_close}</TableCell>
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

            {/* Table 2: 300# Dimensions */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-7xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={8} className="text-center font-bold text-primary uppercase py-6 text-lg">
                        PISTON VALVE FLANGED 300#
                      </TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">OUTER DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">HOLE DIA X NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">PCD</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">CENTER TO TOP (OPEN)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">CENTER TO TOP (CLOSE)</TableHead>
                      <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">WHEEL DIA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table300.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.outer}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.hole}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.pcd}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h_open}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h_close}</TableCell>
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
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
