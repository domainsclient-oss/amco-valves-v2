
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { productSpecsRegistry } from "@/lib/product-specs";

export default function FlangedRetainerlessMetalSeatCheckValvePage() {
  const slug = "dual-plate-check-valve/flanged-type-retainerless-metal-seat-150-300";
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
    { label: "Seat", value: product.seat },
    { label: "End connection", value: product.endConnection },
    { label: "Pressure rating", value: product.pressureRating },
    { label: "Manufacturing Standard", value: product.manufacturingStandard },
    { label: "Testing Standard", value: product.testingStandard },
  ];

  const dim150 = [
    { size: "DN50", f: "60", bore: "60", outer: "101" },
    { size: "DN65", f: "67", bore: "73", outer: "120" },
    { size: "DN80", f: "73", bore: "89", outer: "133" },
    { size: "DN100", f: "73", bore: "114", outer: "171" },
    { size: "DN125", f: "86", bore: "141", outer: "193" },
    { size: "DN150", f: "98", bore: "168", outer: "218" },
    { size: "DN200", f: "127", bore: "219", outer: "276" },
    { size: "DN250", f: "146", bore: "273", outer: "336" },
    { size: "DN300", f: "181", bore: "324", outer: "406" },
    { size: "DN350", f: "184", bore: "356", outer: "447" },
    { size: "DN400", f: "191", bore: "406", outer: "511" },
    { size: "DN450", f: "203", bore: "457", outer: "546" },
    { size: "DN500", f: "213", bore: "508", outer: "603" },
    { size: "DN600", f: "222", bore: "610", outer: "714" },
    { size: "DN700", f: "305", bore: "702", outer: "828" },
    { size: "DN750", f: "305", bore: "748", outer: "879" },
    { size: "DN800", f: "356", bore: "813", outer: "936" },
  ];

  const dim300 = [
    { size: "DN50", f: "60", bore: "60", outer: "107" },
    { size: "DN65", f: "67", bore: "73", outer: "127" },
    { size: "DN80", f: "73", bore: "89", outer: "145" },
    { size: "DN100", f: "73", bore: "114", outer: "177" },
    { size: "DN125", f: "86", bore: "141", outer: "212" },
    { size: "DN150", f: "98", bore: "168", outer: "247" },
    { size: "DN200", f: "127", bore: "219", outer: "304" },
    { size: "DN250", f: "146", bore: "273", outer: "358" },
    { size: "DN300", f: "181", bore: "324", outer: "419" },
    { size: "DN350", f: "222", bore: "356", outer: "482" },
    { size: "DN400", f: "232", bore: "406", outer: "536" },
    { size: "DN450", f: "264", bore: "457", outer: "593" },
    { size: "DN500", f: "292", bore: "508", outer: "650" },
    { size: "DN600", f: "318", bore: "610", outer: "771" },
    { size: "DN700", f: "-", bore: "-", outer: "-" },
    { size: "DN750", f: "-", bore: "-", outer: "-" },
    { size: "DN800", f: "-", bore: "-", outer: "-" },
  ];

  const suitability = [
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
  ];

  const handleDownloadCSV = () => {
    const headers = ["Specification", "Details"];
    const rows = [
      ["Product", "Flanged type Retainerless Metal seat Dual Plate Check Valve"],
      ["Category", product.category],
      ["Sub Category", product.subCategory],
      ...specs.map(spec => [spec.label + (spec.subLabel || ""), spec.value]),
      [""],
      ["Flanged Type (To Suit 150# Flanges)"],
      ["Size", "Face To Face", "Bore Dia", "Outer Dia"],
      ...dim150.map(row => [row.size, row.f, row.bore, row.outer]),
      [""],
      ["Flanged Type (To Suit 300# Flanges)"],
      ["Size", "Face To Face", "Bore Dia", "Outer Dia"],
      ...dim300.map(row => [row.size, row.f, row.bore, row.outer]),
      [""],
      ["Flange Suitability"],
      ["Size", "PCD (150#)", "Hole Dia (150#)", "No. Holes (150#)", "PCD (300#)", "Hole Dia (300#)", "No. Holes (300#)"],
      ...suitability.map(row => [row.size, row.p150, row.d150, row.n150, row.p300, row.d300, row.n300])
    ];
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Flanged_Retainerless_Metal_Check_Valve_Data_Sheet.csv`);
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
            <span className="text-primary">{product.category}</span>
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
                alt="Flanged type Retainerless Metal seat Dual Plate Check Valve"
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
                          <span className="text-[10px] md:text-xs opacity-70 uppercase font-normal">{spec.subLabel}</span>
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

          <div className="space-y-12">
            {/* Table 1: 150# Dimensions */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-6xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={4} className="text-center font-bold text-primary uppercase py-6">FLANGED TYPE RETAINERLESS METAL SEAT DUAL PLATE CHECK VALVE TO SUIT 150# FLANGES</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">BORE DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">OUTER DIA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dim150.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.bore}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.outer}</TableCell>
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
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-6xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={4} className="text-center font-bold text-primary uppercase py-6">FLANGED TYPE RETAINERLESS METAL SEAT DUAL PLATE CHECK VALVE TO SUIT 300# FLANGES</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">BORE DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">OUTER DIA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dim300.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.f}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.bore}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.outer}</TableCell>
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

            {/* Table 3: Flange Suitability */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-6xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead rowSpan={2} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-4">SIZE</TableHead>
                      <TableHead colSpan={3} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-4">TO SUIT 150# FLANGES</TableHead>
                      <TableHead colSpan={3} className="text-center font-bold text-primary uppercase py-4">TO SUIT 300# FLANGES</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">PCD</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">HOLE DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">PCD</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">HOLE DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">NO. OF HOLES</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {suitability.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
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
