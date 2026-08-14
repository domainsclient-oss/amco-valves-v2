"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QuotePopup } from "@/components/QuotePopup";

interface GeneralDim {
  size: string;
  ftf: string;
  bore: string;
  height: string;
  wheel: string;
}

interface FlangeSuitability {
  size: string;
  p150: string;
  d150: string;
  n150: string;
  p10: string;
  d10: string;
  n10: string;
}

const generalDimensions: GeneralDim[] = [
  { size: "DN50", ftf: "-", bore: "-", height: "-", wheel: "-" },
  { size: "DN65", ftf: "-", bore: "-", height: "-", wheel: "-" },
  { size: "DN80", ftf: "57", bore: "82", height: "410", wheel: "225" },
  { size: "DN100", ftf: "58", bore: "102", height: "455", wheel: "300" },
  { size: "DN125", ftf: "-", bore: "-", height: "-", wheel: "-" },
  { size: "DN150", ftf: "63", bore: "152", height: "530", wheel: "300" },
  { size: "DN200", ftf: "78", bore: "200", height: "640", wheel: "300" },
  { size: "DN250", ftf: "78", bore: "250", height: "740", wheel: "300" },
  { size: "DN300", ftf: "84", bore: "300", height: "830", wheel: "300" },
  { size: "DN350", ftf: "84", bore: "334", height: "930", wheel: "450" },
  { size: "DN400", ftf: "97", bore: "380", height: "1080", wheel: "450" },
  { size: "DN450", ftf: "-", bore: "-", height: "-", wheel: "-" },
  { size: "DN500", ftf: "-", bore: "-", height: "-", wheel: "-" },
  { size: "DN600", ftf: "-", bore: "-", height: "-", wheel: "-" },
  { size: "DN700", ftf: "-", bore: "-", height: "-", wheel: "-" },
  { size: "DN750", ftf: "-", bore: "-", height: "-", wheel: "-" },
  { size: "DN800", ftf: "-", bore: "-", height: "-", wheel: "-" },
  { size: "DN900", ftf: "-", bore: "-", height: "-", wheel: "-" },
  { size: "DN1000", ftf: "-", bore: "-", height: "-", wheel: "-" },
];

const flangeSuitabilityData: FlangeSuitability[] = [
  { size: "DN50", p150: "120.7", d150: "19", n150: "4", p10: "125", d10: "18", n10: "4" },
  { size: "DN65", p150: "139.7", d150: "19", n150: "4", p10: "145", d10: "18", n10: "4" },
  { size: "DN80", p150: "152.4", d150: "19", n150: "4", p10: "160", d10: "18", n10: "8" },
  { size: "DN100", p150: "190.5", d150: "19", n150: "8", p10: "180", d10: "18", n10: "8" },
  { size: "DN125", p150: "215.9", d150: "22.2", n150: "8", p10: "210", d10: "18", n10: "8" },
  { size: "DN150", p150: "241.3", d150: "22.2", n150: "8", p10: "240", d10: "22", n10: "8" },
  { size: "DN200", p150: "298.5", d150: "22.2", n150: "8", p10: "295", d10: "22", n10: "8" },
  { size: "DN250", p150: "362", d150: "25.4", n150: "12", p10: "350", d10: "22", n10: "12" },
  { size: "DN300", p150: "431.8", d150: "25.4", n150: "12", p10: "400", d10: "22", n10: "12" },
  { size: "DN350", p150: "476.3", d150: "29", n150: "12", p10: "460", d10: "22", n10: "16" },
  { size: "DN400", p150: "539.8", d150: "29", n150: "16", p10: "515", d10: "26", n10: "16" },
  { size: "DN450", p150: "577.9", d150: "32", n150: "16", p10: "565", d10: "26", n10: "20" },
  { size: "DN500", p150: "635", d150: "32", n150: "20", p10: "620", d10: "26", n10: "20" },
  { size: "DN600", p150: "749.3", d150: "35", n150: "20", p10: "725", d10: "30", n10: "20" },
  { size: "DN700", p150: "863.6", d150: "35", n150: "28", p10: "840", d10: "30", n10: "24" },
  { size: "DN750", p150: "914.4", d150: "35", n150: "28", p10: "-", d10: "-", n10: "-" },
  { size: "DN800", p150: "977.9", d150: "41.2", n150: "28", p10: "950", d10: "33", n10: "24" },
  { size: "DN900", p150: "1085.8", d150: "41.2", n150: "32", p10: "1050", d10: "33", n10: "24" },
  { size: "DN1000", p150: "1200.2", d150: "41.2", n150: "36", p10: "1160", d10: "36", n10: "28" },
];

export default function BiDirectionalFlangedTwoPiecePage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const productName = "2 piece design Bi-Directional Flanged Resilient Seat Knife Edge Gate Valve PN10#";

  const specs = [
    { label: "Size", value: "DN50 - DN1000" },
    { label: "Material of construction", subLabel: "(Bill of material)", value: "DI / CF8 / CF8M" },
    { label: "Seat", value: "EPDM" },
    { label: "Lining", value: "Natural rubber" },
    { label: "End connection", value: "Flanged to suit ANSI flanges / ND 10" },
    { label: "Pressure rating", value: "PN10#" },
    { label: "Mode of operation", value: "Wheel, Gear, Actuator" },
    { label: "Manufacturing Standard", value: "MSS SP 81" },
    { label: "Testing Standard", value: "MSS SP 81" },
  ];

  const handleDownloadCSV = () => {
    const headers = ["Specification", "Details"];
    const rows = [
      ["Product", "Knife Edge Gate Valve"],
      ["Type", "Bi Directional"],
      ["Model", "2 piece design Flanged Resilient seat PN10#"],
      ...specs.map(spec => [spec.label + (spec.subLabel || ""), spec.value]),
      [""],
      ["General Dimensions (mm)"],
      ["SIZE", "FACE TO FACE (LINED)", "BORE DIA", "HEIGHT (CENTER TO TOP)", "WHEEL DIA"],
      ...generalDimensions.map(row => [row.size, row.ftf, row.bore, row.height, row.wheel]),
      [""],
      ["Flange Suitability"],
      ["SIZE", "PCD (150#)", "HOLE DIA (150#)", "NO. OF HOLES (150#)", "PCD (PN10#)", "HOLE DIA (PN10#)", "NO. OF HOLES (PN10#)"],
      ...flangeSuitabilityData.map(row => [row.size, row.p150, row.d150, row.n150, row.p10, row.d10, row.n10])
    ];
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Bi_Directional_Flanged_Two_Piece_PN10_data_sheet.csv`);
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
            <span className="text-primary">Knife Edge Gate Valve</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider">Bi Directional</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">2 piece design Flanged Resilient seat PN10#</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-20 px-5 md:px-[63px]" style={{ backgroundColor: '#f3f3f3bd' }}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
            {/* Left Column: Image */}
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white border border-border shadow-lg">
              <Image
                src="/dummy-image.png"
                alt={productName}
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
                          <span className="text-[10px] md:text-xs opacity-70 uppercase">{spec.subLabel}</span>
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
                <Button variant="secondary" className="h-12 px-8 rounded-xl font-bold" onClick={() => setIsQuoteOpen(true)}>
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
            {/* Table 1: General Dimensions */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-6xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={5} className="text-center font-bold text-primary uppercase py-6 text-lg">
                        FLANGED BI-DIRECTIONAL TWO PIECE DESIGN RESILIENT SEAT KGV
                      </TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE (LINED)</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">BORE DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">HEIGHT (CENTER TO TOP)</TableHead>
                      <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">WHEEL DIA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {generalDimensions.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3 bg-neutral-50/20">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.bore}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.height}</TableCell>
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

            {/* Table 2: Flange Suitability */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-[1400px] mx-auto">
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
                    {flangeSuitabilityData.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3 bg-neutral-50/20">{row.size}</TableCell>
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
              <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50">
                <p className="text-[10px] md:text-sm text-foreground/50 font-medium italic text-right">
                  All dimensions are in mm
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuotePopup 
        isOpen={isQuoteOpen} 
        onOpenChange={setIsQuoteOpen} 
        productName={productName} 
      />

      <Footer />
    </main>
  );
}