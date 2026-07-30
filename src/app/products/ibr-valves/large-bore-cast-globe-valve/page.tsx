
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { productSpecsRegistry } from "@/lib/product-specs";

export default function LargeBoreCastGlobeValvePage() {
  const slug = "ibr-valves/large-bore-cast-globe-valve";
  const product = productSpecsRegistry[slug];

  if (!product) return null;

  const productImage = {
    imageUrl: "/dummy-image.png",
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
    { size: "DN65", f150fl: "216", f150bw: "216", d150: "180", h150: "19 X 4", pcd150: "139.7", f300fl: "292", f300bw: "292", d300: "190", h300: "22.2 X 8", pcd300: "149.2" },
    { size: "DN80", f150fl: "241", f150bw: "241", d150: "190", h150: "19 X 4", pcd150: "152.4", f300fl: "318", f300bw: "318", d300: "210", h300: "22.2 X 8", pcd300: "168.3" },
    { size: "DN100", f150fl: "292", f150bw: "292", d150: "230", h150: "19 X 8", pcd150: "190.5", f300fl: "356", f300bw: "356", d300: "255", h300: "22.2 X 8", pcd300: "200" },
    { size: "DN125", f150fl: "356", f150bw: "356", d150: "255", h150: "22.2 X 8", pcd150: "215.9", f300fl: "400", f300bw: "400", d300: "280", h300: "22.2 X 8", pcd300: "235" },
    { size: "DN150", f150fl: "406", f150bw: "406", d150: "280", h150: "22.2 X 8", pcd150: "241.3", f300fl: "444", f300bw: "444", d300: "320", h300: "22.2 X 12", pcd300: "269.9" },
    { size: "DN200", f150fl: "495", f150bw: "495", d150: "345", h150: "22.2 X 8", pcd150: "298.5", f300fl: "559", f300bw: "559", d300: "380", h300: "25.4 X 12", pcd300: "330.2" },
    { size: "DN250", f150fl: "622", f150bw: "622", d150: "405", h150: "25.4 X 12", pcd150: "362", f300fl: "622", f300bw: "622", d300: "445", h300: "29 X 16", pcd300: "387.4" },
    { size: "DN300", f150fl: "698", f150bw: "698", d150: "485", h150: "25.4 X 12", pcd150: "431.8", f300fl: "711", f300bw: "711", d300: "520", h300: "32 X 16", pcd300: "450.8" },
    { size: "DN350", f150fl: "787", f150bw: "787", d150: "535", h150: "29 X 12", pcd150: "476.3", f300fl: "838", f300bw: "838", d300: "585", h300: "32 X 20", pcd300: "514.4" },
    { size: "DN400", f150fl: "914", f150bw: "914", d150: "595", h150: "29 X 16", pcd150: "539.8", f300fl: "864", f300bw: "864", d300: "650", h300: "35 X 20", pcd300: "571.5" },
    { size: "DN450", f150fl: "978", f150bw: "978", d150: "635", h150: "32 X 16", pcd150: "577.9", f300fl: "978", f300bw: "978", d300: "710", h300: "35 X 24", pcd300: "628.6" },
    { size: "DN500", f150fl: "978", f150bw: "978", d150: "700", h150: "32 X 20", pcd150: "635", f300fl: "1016", f300bw: "1016", d300: "775", h300: "35 X 24", pcd300: "685.8" },
    { size: "DN600", f150fl: "1295", f150bw: "1295", d150: "815", h150: "35 X 20", pcd150: "749.3", f300fl: "1346", f300bw: "1346", d300: "915", h300: "41 X 24", pcd300: "812.8" },
    { size: "DN700", f150fl: "1448", f150bw: "1448", f300fl: "1499", f300bw: "1499", isHeader: true },
    { size: "SERIES A FLANGE", d150: "925", h150: "35 X 28", pcd150: "863.6", d300: "1035", h300: "44 X 28", pcd300: "939.8", isChild: true },
    { size: "SERIES B FLANGE", d150: "835", h150: "22.2 X 40", pcd150: "795.3", d300: "920", h300: "35 X 36", pcd300: "857.2", isChild: true },
    { size: "DN800", f150fl: "1676", f150bw: "1676", f300fl: "1778", f300bw: "1778", isHeader: true },
    { size: "SERIES A FLANGE", d150: "1060", h150: "41.2 X 28", pcd150: "977.9", d300: "1150", h300: "50 X 28", pcd300: "1054.1", isChild: true },
    { size: "SERIES B FLANGE", d150: "940", h150: "22.2 X 48", pcd150: "900.1", d300: "1055", h300: "41.2 X 32", pcd300: "977.9", isChild: true },
  ];

  const table600 = [
    { size: "DN50", fl: "292", bw: "292", d: "165", h: "19 X 8", pcd: "127" },
    { size: "DN65", fl: "330", bw: "330", d: "190", h: "22.2 X 8", pcd: "149.2" },
    { size: "DN80", fl: "356", bw: "356", d: "210", h: "22.2 X 8", pcd: "168.3" },
    { size: "DN100", fl: "432", bw: "432", d: "275", h: "25.4 X 8", pcd: "215.9" },
    { size: "DN125", fl: "508", bw: "508", d: "330", h: "29 X 8", pcd: "266.7" },
    { size: "DN150", fl: "559", bw: "559", d: "355", h: "29 X 12", pcd: "292.1" },
    { size: "DN200", fl: "660", bw: "660", d: "420", h: "32 X 12", pcd: "349.2" },
    { size: "DN250", fl: "787", bw: "787", d: "510", h: "35 X 16", pcd: "431.8" },
    { size: "DN300", fl: "838", bw: "838", d: "560", h: "35 X 20", pcd: "489" },
    { size: "DN350", fl: "889", bw: "889", d: "605", h: "38 X 20", pcd: "527" },
    { size: "DN400", fl: "991", bw: "991", d: "685", h: "41 X 20", pcd: "603.2" },
    { size: "DN450", fl: "1092", bw: "1092", d: "745", h: "44 X 20", pcd: "654" },
    { size: "DN500", fl: "1194", bw: "1194", d: "815", h: "44 X 24", pcd: "723.9" },
    { size: "DN600", fl: "1397", bw: "1397", d: "940", h: "51 X 24", pcd: "838.2" },
    { size: "DN700", fl: "1549", bw: "1549", isHeader: true },
    { size: "SERIES A FLANGE", d: "1075", h: "54 X 28", pcd: "965.2", isChild: true },
    { size: "SERIES B FLANGE", d: "950", h: "47.6 X 28", pcd: "863.6", isChild: true },
    { size: "DN800", fl: "1651", bw: "1651", isHeader: true },
    { size: "SERIES A FLANGE", d: "1195", h: "60 X 28", pcd: "1079.5", isChild: true },
    { size: "SERIES B FLANGE", d: "1085", h: "54 X 28", pcd: "984.2", isChild: true },
  ];

  const handleDownloadCSV = () => {
    const headers = ["Specification", "Details"];
    const rows = [
      ["Product", product.subTitle],
      ["Category", product.category],
      ...specs.map(spec => [spec.label + (spec.subLabel || ""), spec.value]),
      [""],
      ["Dimension Table (150# / 300#)"],
      ["SIZE", "FTF (150# FL)", "FTF (150# BW)", "OD (150#)", "Hole Pattern (150#)", "PCD (150#)", "FTF (300# FL)", "FTF (300# BW)", "OD (300#)", "Hole Pattern (300#)", "PCD (300#)"],
      ...table150_300.map(row => [row.size, row.f150fl || "", row.f150bw || "", row.d150 || "", row.h150 || "", row.pcd150 || "", row.f300fl || "", row.f300bw || "", row.d300 || "", row.h300 || "", row.pcd300 || ""]),
      [""],
      ["Dimension Table (600#)"],
      ["SIZE", "FACE TO FACE (FL)", "FACE TO FACE (BW)", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD"],
      ...table600.map(row => [row.size, row.fl || "", row.bw || "", row.d || "", row.h || "", row.pcd || ""])
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

          <div className="space-y-16">
            {/* Dimension Table Section - 150# & 300# */}
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
              <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50">
                <p className="text-[10px] md:text-sm text-foreground/50 font-medium italic text-right">
                  All dimensions are in mm
                </p>
              </div>
            </div>

            {/* Dimension Table Section - 600# */}
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
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.d || ""}</TableCell>
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

      <Footer />
    </main>
  );
}
