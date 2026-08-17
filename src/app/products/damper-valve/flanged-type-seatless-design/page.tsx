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
import { QuotePopup } from "@/components/QuotePopup";
import { cn } from "@/lib/utils";

export default function FlangedDamperValvePage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const slug = "damper-valve/flanged-type-seatless-design";
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
      subLabel: "(BILL OF MATERIAL)",
      value: product.material 
    },
    { label: "End connection", value: product.endConnection },
    { label: "Pressure rating", value: product.pressureRating },
    { label: "Mode of operation", value: product.modeOfOperation },
    { label: "Manufacturing Standard", value: product.manufacturingStandard },
    { label: "Testing Standard", value: product.testingStandard },
  ];

  const dimensionData = [
    { size: "DN50", ftf: "30", top: "135", bottom: "76" },
    { size: "DN65", ftf: "30", top: "142", bottom: "84" },
    { size: "DN80", ftf: "30", top: "150", bottom: "92" },
    { size: "DN100", ftf: "30", top: "160", bottom: "102" },
    { size: "DN125", ftf: "30", top: "172", bottom: "114" },
    { size: "DN150", ftf: "34", top: "195", bottom: "135" },
    { size: "DN200", ftf: "34", top: "220", bottom: "160" },
    { size: "DN250", ftf: "38", top: "250", bottom: "195" },
    { size: "DN300", ftf: "38", top: "275", bottom: "220" },
    { size: "DN350", ftf: "38", top: "293", bottom: "248" },
    { size: "DN400", ftf: "50", top: "315", bottom: "300" },
    { size: "DN450", ftf: "50", top: "340", bottom: "325" },
    { size: "DN500", ftf: "50", top: "365", bottom: "360" },
    { size: "DN600", ftf: "50", top: "415", bottom: "425" },
    { size: "DN650", ftf: "50", top: "440", bottom: "450" },
    { size: "DN700", ftf: "50", top: "465", bottom: "475" },
    { size: "DN800", ftf: "50", top: "515", bottom: "530" },
    { size: "DN900", ftf: "65", top: "585", bottom: "590" },
    { size: "DN1000", ftf: "65", top: "635", bottom: "645" },
  ];

  const table150_300 = [
    { size: "DN50", od150: "150", h150: "19 X 4", p150: "120.7", od300: "165", h300: "19 X 8", p300: "127" },
    { size: "DN65", od150: "180", h150: "19 X 4", p150: "139.7", od300: "190", h300: "22.2 X 8", p300: "149.2" },
    { size: "DN80", od150: "190", h150: "19 X 4", p150: "152.4", od300: "210", h300: "22.2 X 8", p300: "168.3" },
    { size: "DN100", od150: "230", h150: "19 X 8", p150: "190.5", od300: "255", h300: "22.2 X 8", p300: "200" },
    { size: "DN125", od150: "255", h150: "22.2 X 8", p150: "215.9", od300: "280", h300: "22.2 X 8", p300: "235" },
    { size: "DN150", od150: "280", h150: "22.2 X 8", p150: "241.3", od300: "320", h300: "22.2 X 12", p300: "269.9" },
    { size: "DN200", od150: "345", h150: "22.2 X 8", p150: "298.5", od300: "380", h300: "25.4 X 12", p300: "330.2" },
    { size: "DN250", od150: "405", h150: "25.4 X 12", p150: "362", od300: "445", h300: "29 X 16", p300: "387.4" },
    { size: "DN300", od150: "485", h150: "25.4 X 12", p150: "431.8", od300: "520", h300: "32 X 16", p300: "450.8" },
    { size: "DN350", od150: "535", h150: "29 X 12", p150: "476.3", od300: "585", h300: "32 X 20", p300: "514.4" },
    { size: "DN400", od150: "595", h150: "29 X 16", p150: "539.8", od300: "650", h300: "35 X 20", p300: "571.5" },
    { size: "DN450", od150: "635", h150: "32 X 16", p150: "577.9", od300: "710", h300: "35 X 24", p300: "628.6" },
    { size: "DN500", od150: "700", h150: "32 X 20", p150: "635", od300: "775", h300: "35 X 24", p300: "685.8" },
    { size: "DN600", od150: "815", h150: "35 X 20", p150: "749.3", od300: "915", h300: "41 X 24", p300: "812.8" },
    { size: "DN700", isHeader: true },
    { size: "SERIES A FLANGE", od150: "925", h150: "35 X 28", p150: "863.6", od300: "1035", h300: "44 X 28", p300: "939.8", isChild: true },
    { size: "SERIES B FLANGE", od150: "835", h150: "22.2 X 40", p150: "795.3", od300: "920", h300: "35 X 36", p300: "857.2", isChild: true },
    { size: "DN800", isHeader: true },
    { size: "SERIES A FLANGE", od150: "1060", h150: "41.2 X 28", p150: "977.9", od300: "1150", h300: "50 X 28", p300: "1054.1", isChild: true },
    { size: "SERIES B FLANGE", od150: "940", h150: "22.2 X 48", p150: "900.1", od300: "1055", h300: "41.2 X 32", p300: "977.9", isChild: true },
    { size: "DN900", isHeader: true },
    { size: "SERIES A FLANGE", od150: "1170", h150: "41 X 32", p150: "1085.8", od300: "1270", h300: "54 X 32", p300: "1168.4", isChild: true },
    { size: "SERIES B FLANGE", od150: "1055", h150: "25.4 X 44", p150: "1009.6", od300: "1170", h300: "44 X 32", p300: "1089.0", isChild: true },
    { size: "DN1000", isHeader: true },
    { size: "SERIES A FLANGE", od150: "1290", h150: "41 X 36", p150: "1200.2", od300: "1240", h300: "44 X 32", p300: "1155.7", isChild: true },
    { size: "SERIES B FLANGE", od150: "1175", h150: "29 X 44", p150: "1120.8", od300: "1275", h300: "44 X 40", p300: "1190.6", isChild: true },
  ];

  const tablePN10_16 = [
    { size: "DN50", od10: "165", h10: "18 X 4", p10: "125", od16: "165", h16: "18 X 4", p16: "125" },
    { size: "DN65", od10: "185", h10: "18 X 4", p10: "145", od16: "185", h16: "18 X 4", p16: "145" },
    { size: "DN80", od10: "200", h10: "18 X 8", p10: "160", od16: "200", h16: "18 X 8", p16: "160" },
    { size: "DN100", od10: "220", h10: "18 X 8", p10: "180", od16: "220", h16: "18 X 8", p16: "180" },
    { size: "DN125", od10: "250", h10: "18 X 8", p10: "210", od16: "250", h16: "18 X 8", p16: "210" },
    { size: "DN150", od10: "285", h10: "22 X 8", p10: "240", od16: "285", h16: "22 X 8", p16: "240" },
    { size: "DN200", od10: "340", h10: "22 X 8", p10: "295", od16: "340", h16: "22 X 12", p16: "295" },
    { size: "DN250", od10: "395", h10: "22 X 12", p10: "350", od16: "405", h16: "26 X 12", p16: "355" },
    { size: "DN300", od10: "445", h10: "22 X 12", p10: "400", od16: "460", h16: "26 X 12", p16: "410" },
    { size: "DN350", od10: "505", h10: "22 X 16", p10: "460", od16: "520", h16: "26 X 16", p16: "470" },
    { size: "DN400", od10: "565", h10: "26 X 16", p10: "515", od16: "580", h16: "30 X 16", p16: "525" },
    { size: "DN450", od10: "615", h10: "26 X 20", p10: "565", od16: "640", h16: "30 X 20", p16: "585" },
    { size: "DN500", od10: "670", h10: "26 X 20", p10: "620", od16: "715", h16: "33 X 20", p16: "650" },
    { size: "DN600", od10: "780", h10: "30 X 20", p10: "725", od16: "840", h16: "36 X 20", p16: "770" },
    { size: "DN700", od10: "895", h10: "30 X 24", p10: "840", od16: "895", h16: "36 X 24", p16: "840" },
    { size: "DN800", od10: "1015", h10: "33 X 24", p10: "950", od16: "1015", h16: "39 X 24", p16: "950" },
    { size: "DN900", od10: "1115", h10: "33 X 24", p10: "1050", od16: "1115", h16: "36 X 28", p16: "1050" },
    { size: "DN1000", od10: "1230", h10: "36 X 28", p10: "1160", od16: "1230", h16: "42 X 28", p16: "1170" },
  ];

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
            <span className="text-primary">Damper valve</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">Damper valve</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">{product.subTitle} - seatless design</h1>
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
            {/* Table 1: General Dimensions */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={4} className="text-center font-bold text-primary uppercase py-6 text-lg">
                        FLANGED TYPE DAMPER VALVE
                      </TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">FACE TO FACE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-4 uppercase leading-tight">CENTER TO TOP</TableHead>
                      <TableHead className="text-center font-bold text-primary py-4 uppercase leading-tight">CENTER TO BOTTOM</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dimensionData.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf}</TableCell>
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

            {/* Table 2: 150# vs 300# Flanges */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={4} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-6 text-lg">FLANGED 150# FLANGES</TableHead>
                      <TableHead colSpan={4} className="text-center font-bold text-primary uppercase py-6 text-lg">FLANGED 300# FLANGES</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase leading-tight">OUTER DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase leading-tight">HOLE DIA X NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">PCD</TableHead>
                      
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase leading-tight">OUTER DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase leading-tight">HOLE DIA X NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary py-3 uppercase">PCD</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table150_300.map((row, idx) => (
                      <TableRow key={idx} className={cn("border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-[10px] md:text-xs", row.isHeader && "bg-primary/5")}>
                        <TableCell className={cn("font-bold text-primary text-center border-r border-neutral-100 py-3", row.isChild && "pl-8 text-left")}>{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.od150 || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h150 || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-200">{row.p150 || ""}</TableCell>
                        
                        <TableCell className={cn("font-bold text-primary text-center border-r border-neutral-100 py-3", row.isChild && "pl-8 text-left")}>{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.od300 || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h300 || ""}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.p300 || ""}</TableCell>
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

            {/* Table 3: PN10 vs PN16 Flanges */}
            <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow className="bg-white border-b border-neutral-300">
                      <TableHead colSpan={4} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-6 text-lg">FLANGED PN10 FLANGES</TableHead>
                      <TableHead colSpan={4} className="text-center font-bold text-primary uppercase py-6 text-lg">FLANGED PN16 FLANGES</TableHead>
                    </TableRow>
                    <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase leading-tight">OUTER DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase leading-tight">HOLE DIA X NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">PCD</TableHead>
                      
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">SIZE</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase leading-tight">OUTER DIA</TableHead>
                      <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase leading-tight">HOLE DIA X NO. OF HOLES</TableHead>
                      <TableHead className="text-center font-bold text-primary py-3 uppercase">PCD</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tablePN10_16.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-[10px] md:text-xs">
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3 bg-neutral-50/20">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.od10}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h10}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-200">{row.p10}</TableCell>
                        
                        <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3 bg-neutral-50/20">{row.size}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.od16}</TableCell>
                        <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.h16}</TableCell>
                        <TableCell className="text-center text-foreground/80">{row.p16}</TableCell>
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

      <QuotePopup 
        isOpen={isQuoteOpen} 
        onOpenChange={setIsQuoteOpen} 
        productName={product.subTitle} 
      />

      <Footer />
    </main>
  );
}