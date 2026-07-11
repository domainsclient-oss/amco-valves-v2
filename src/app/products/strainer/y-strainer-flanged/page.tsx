
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

export default function YStrainerFlangedPage() {
  const slug = "strainer/y-strainer-flanged";
  const product = productSpecsRegistry[slug];

  if (!product) return null;

  const productImage = PlaceHolderImages.find(img => img.id === "product-1") || PlaceHolderImages[0];

  const specs = [
    { label: "Size", value: product.size },
    { 
      label: "Material of construction", 
      subLabel: "(Bill of material)",
      value: product.material 
    },
    { label: "Mesh", value: product.mesh },
    { label: "End connection", value: product.endConnection },
    { label: "Pressure rating", value: product.pressureRating },
    { label: "Manufacturing Standard", value: product.manufacturingStandard },
    { label: "Testing Standard", value: product.testingStandard },
  ];

  const dimensionData = [
    { size: "DN25", ftf150: "127", od150: "110", hole150: "16 X 4", pcd150: "79.4", ftf300: "203", od300: "125", hole300: "19 X 4", pcd300: "88.9" },
    { size: "DN40", ftf150: "165", od150: "125", hole150: "16 X 4", pcd150: "98.4", ftf300: "229", od300: "155", hole300: "22.2 X 4", pcd300: "114.3" },
    { size: "DN50", ftf150: "203", od150: "150", hole150: "19 X 4", pcd150: "120.7", ftf300: "267", od300: "165", hole300: "19 X 8", pcd300: "127" },
    { size: "DN65", ftf150: "216", od150: "180", hole150: "19 X 4", pcd150: "139.7", ftf300: "292", od300: "190", hole300: "22.2 X 8", pcd300: "149.2" },
    { size: "DN80", ftf150: "241", od150: "190", hole150: "19 X 4", pcd150: "152.4", ftf300: "318", od300: "210", hole300: "22.2 X 8", pcd300: "168.3" },
    { size: "DN100", ftf150: "292", od150: "230", hole150: "19 X 8", pcd150: "190.5", ftf300: "356", od300: "255", hole300: "22.2 X 8", pcd300: "200" },
    { size: "DN125", ftf150: "356", od150: "255", hole150: "22.2 X 8", pcd150: "215.9", ftf300: "400", od300: "280", hole300: "22.2 X 8", pcd300: "235" },
    { size: "DN150", ftf150: "406", od150: "280", hole150: "22.2 X 8", pcd150: "241.3", ftf300: "444", od300: "320", hole300: "22.2 X 12", pcd300: "269.9" },
    { size: "DN200", ftf150: "495", od150: "345", hole150: "22.2 X 8", pcd150: "298.5", ftf300: "559", od300: "380", hole300: "25.4 X 12", pcd300: "330.2" },
    { size: "DN250", ftf150: "622", od150: "405", hole150: "25.4 X 12", pcd150: "362", ftf300: "622", od300: "445", hole300: "29 X 16", pcd300: "387.4" },
    { size: "DN300", ftf150: "698", od150: "485", hole150: "25.4 X 12", pcd150: "431.8", ftf300: "711", od300: "520", hole300: "32 X 16", pcd300: "450.8" },
    { size: "DN350", ftf150: "787", od150: "535", hole150: "29 X 12", pcd150: "476.3", ftf300: "-", od300: "585", hole300: "32 X 20", pcd300: "514.4" },
    { size: "DN400", ftf150: "914", od150: "595", hole150: "29 X 16", pcd150: "539.8", ftf300: "-", od300: "650", hole300: "35 X 20", pcd300: "571.5" },
  ];

  const handleDownloadCSV = () => {
    const headers = ["Specification", "Details"];
    const rows = [
      ["Product", product.subTitle],
      ["Category", product.category],
      ...specs.map(spec => [spec.label + (spec.subLabel || ""), spec.value]),
      [""],
      ["Dimension Table (150#)"],
      ["Size", "Face To Face", "Outer Dia", "Hole pattern", "PCD"],
      ...dimensionData.map(row => [row.size, row.ftf150, row.od150, row.hole150, row.pcd150]),
      [""],
      ["Dimension Table (300#)"],
      ["Size", "Face To Face", "Outer Dia", "Hole pattern", "PCD"],
      ...dimensionData.map(row => [row.size, row.ftf300, row.od300, row.hole300, row.pcd300]),
    ];
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Y_Strainer_Flanged_Data_Sheet.csv`);
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
            <span className="text-primary">Strainer</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">Flanged Design</p>
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

          {/* Dimension Table */}
          <div className="bg-white rounded-[2rem] border border-border shadow-xl overflow-hidden max-w-[1400px] mx-auto">
            <div className="overflow-x-auto">
              <Table className="border-collapse w-full">
                <TableHeader>
                  <TableRow className="bg-white border-b border-neutral-300">
                    <TableHead rowSpan={2} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-6 text-sm">SIZE</TableHead>
                    <TableHead colSpan={4} className="text-center font-bold text-primary border-r border-neutral-200 uppercase py-4 bg-neutral-50/50">Y STRAINER FLANGED END 150#</TableHead>
                    <TableHead colSpan={4} className="text-center font-bold text-primary uppercase py-4 bg-neutral-50/50">Y STRAINER FLANGED END 300#</TableHead>
                  </TableRow>
                  <TableRow className="bg-neutral-50 border-b border-neutral-300 text-[10px] md:text-xs">
                    <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">Face To Face (FL)</TableHead>
                    <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">Outer Dia</TableHead>
                    <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase leading-tight">Hole Dia x No. Holes</TableHead>
                    <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">PCD</TableHead>
                    
                    <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">Face To Face (FL)</TableHead>
                    <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase">Outer Dia</TableHead>
                    <TableHead className="text-center font-bold text-primary border-r border-neutral-200 py-3 uppercase leading-tight">Hole Dia x No. Holes</TableHead>
                    <TableHead className="text-center font-bold text-primary py-3 uppercase">PCD</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dimensionData.map((row, idx) => (
                    <TableRow key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-xs md:text-sm">
                      <TableCell className="font-bold text-primary text-center border-r border-neutral-100 py-3 bg-neutral-50/20">{row.size}</TableCell>
                      <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf150}</TableCell>
                      <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.od150}</TableCell>
                      <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.hole150}</TableCell>
                      <TableCell className="text-center text-foreground/80 border-r border-neutral-200">{row.pcd150}</TableCell>
                      
                      <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.ftf300}</TableCell>
                      <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.od300}</TableCell>
                      <TableCell className="text-center text-foreground/80 border-r border-neutral-100">{row.hole300}</TableCell>
                      <TableCell className="text-center text-foreground/80">{row.pcd300}</TableCell>
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
      </section>

      <Footer />
    </main>
  );
}
