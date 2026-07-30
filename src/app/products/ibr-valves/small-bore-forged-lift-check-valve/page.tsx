"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { productSpecsRegistry } from "@/lib/product-specs";

export default function SmallBoreForgedLiftCheckValvePage() {
  const slug = "ibr-valves/small-bore-forged-lift-check-valve";
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
    { size: "DN15", ftf: "73", bore: "9.5", sw: "21.8", height: "53" },
    { size: "DN20", ftf: "80", bore: "12.7", sw: "27.2", height: "56" },
    { size: "DN25", ftf: "100", bore: "17.5", sw: "33.9", height: "66" },
    { size: "DN32", ftf: "145", bore: "23.8", sw: "42.7", height: "86" },
    { size: "DN40", ftf: "145", bore: "28.6", sw: "48.8", height: "86" },
    { size: "DN50", ftf: "160", bore: "36.5", sw: "61.2", height: "104" },
  ];

  const table1500 = [
    { size: "DN15", ftf: "80", bore: "8.5", sw: "21.8", height: "56" },
    { size: "DN20", ftf: "100", bore: "9.5", sw: "27.2", height: "66" },
    { size: "DN25", ftf: "145", bore: "14.5", sw: "33.9", height: "86" },
    { size: "DN32", ftf: "145", bore: "20.5", sw: "42.7", height: "86" },
    { size: "DN40", ftf: "160", bore: "25.5", sw: "48.8", height: "104" },
    { size: "DN50", ftf: "172", bore: "34.9", sw: "61.2", height: "127" },
  ];

  const table2500 = [
    { size: "DN15", ftf: "100", bore: "7.0", sw: "21.8", height: "66" },
    { size: "DN20", ftf: "145", bore: "12.5", sw: "27.2", height: "86" },
    { size: "DN25", ftf: "160", bore: "15.5", sw: "33.9", height: "104" },
    { size: "DN32", ftf: "172", bore: "21.5", sw: "42.7", height: "127" },
    { size: "DN40", ftf: "172", bore: "26.5", sw: "48.8", height: "127" },
    { size: "DN50", ftf: "-", bore: "-", sw: "-", height: "-" },
  ];

  const handleDownloadCSV = () => {
    const headers = ["Specification", "Details"];
    const rows = [
      ["Product", product.subTitle],
      ["Category", product.category],
      ["Sub Category", product.subCategory],
      ...specs.map(spec => [spec.label + (spec.subLabel || ""), spec.value]),
      [""],
      ["FLANGED TYPE (150#)"],
      ["SIZE", "FACE TO FACE", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD", "HEIGHT"],
      ...table150.map(row => [row.size, row.ftf, row.od, row.hole, row.pcd, row.height]),
      [""],
      ["FLANGED TYPE (300#)"],
      ["SIZE", "FACE TO FACE", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD", "HEIGHT"],
      ...table300.map(row => [row.size, row.ftf, row.od, row.hole, row.pcd, row.height]),
      [""],
      ["FLANGED TYPE (600#)"],
      ["SIZE", "FACE TO FACE", "OUTER DIA", "HOLE DIA X NO. OF HOLES", "PCD", "HEIGHT"],
      ...table600.map(row => [row.size, row.ftf, row.od, row.hole, row.pcd, row.height]),
      [""],
      ["SW, SE & BW TYPE (800#)"],
      ["SIZE", "FACE TO FACE", "BORE", "SOCKETWELD BORE", "HEIGHT"],
      ...table800.map(row => [row.size, row.ftf, row.bore, row.sw, row.height]),
      [""],
      ["SW, SE & BW TYPE (1500#)"],
      ["SIZE", "FACE TO FACE", "BORE", "SOCKETWELD BORE", "HEIGHT"],
      ...table1500.map(row => [row.size, row.ftf, row.bore, row.sw, row.height]),
      [""],
      ["SW, SE & BW TYPE (2500#)"],
      ["SIZE", "FACE TO FACE", "BORE", "SOCKETWELD BORE", "HEIGHT"],
      ...table2500.map(row => [row.size, row.ftf, row.bore, row.sw, row.height]),
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

          <div className="space-y-16">
            <h2 className="text-2xl font-bold text-primary border-l-4 border-secondary pl-4">Flanged Design Specifications</h2>
            <div className="grid gap-12">
              {/* Table: 150# */}
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
                <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50">
                  <p className="text-[10px] md:text-sm text-foreground/50 font-medium italic text-right">
                    All dimensions are in mm
                  </p>
                </div>
              </div>

              {/* Table: 300# */}
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
                <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50">
                  <p className="text-[10px] md:text-sm text-foreground/50 font-medium italic text-right">
                    All dimensions are in mm
                  </p>
                </div>
              </div>

              {/* Table: 600# */}
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
                <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50">
                  <p className="text-[10px] md:text-sm text-foreground/50 font-medium italic text-right">
                    All dimensions are in mm
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-primary border-l-4 border-secondary pl-4 pt-8">SW, SE & BW Design Specifications</h2>
            <div className="grid gap-12">
              {/* Table: 800# */}
              <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table className="border-collapse w-full">
                    <TableHeader>
                      <TableRow className="bg-white border-b border-neutral-300">
                        <TableHead colSpan={5} className="text-center font-bold text-primary uppercase py-6 text-lg">
                          A105 / F304L / F316L LIFT CHECK VALVE SW,SE & SW 800#
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
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.sw}</TableCell>
                          <TableCell className="text-center text-foreground/80">{row.height}</TableCell>
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

              {/* Table: 1500# */}
              <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table className="border-collapse w-full">
                    <TableHeader>
                      <TableRow className="bg-white border-b border-neutral-300">
                        <TableHead colSpan={5} className="text-center font-bold text-primary uppercase py-6 text-lg">
                          A105 / F304L / F316L LIFT CHECK VALVE SW,SE & SW 1500#
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
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.sw}</TableCell>
                          <TableCell className="text-center text-foreground/80">{row.height}</TableCell>
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

              {/* Table: 2500# */}
              <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table className="border-collapse w-full">
                    <TableHeader>
                      <TableRow className="bg-white border-b border-neutral-300">
                        <TableHead colSpan={5} className="text-center font-bold text-primary uppercase py-6 text-lg">
                          A105 / F304L / F316L LIFT CHECK VALVE SW,SE & SW 2500#
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
                          <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.sw}</TableCell>
                          <TableCell className="text-center text-foreground/80">{row.height}</TableCell>
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
        </div>
      </section>

      <Footer />
    </main>
  );
}
