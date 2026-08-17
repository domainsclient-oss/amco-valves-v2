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

export default function PtfeLinedBallCheckValvePage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const slug = "ptfe-lined-ball-check-valve";
  const product = productSpecsRegistry[slug];

  if (!product) return null;

  const productImage = {
    imageUrl: "/dummy-image.png",
    description: product.subTitle
  };

  const specs = [
    { label: "Size", value: product.size },
    { label: "Material of construction", value: product.material },
    { label: "Lining", value: product.lining },
    { label: "End connection", value: product.endConnection },
    { label: "Pressure rating", value: product.pressureRating },
    { label: "Manufacturing Standard", value: product.manufacturingStandard },
    { label: "Testing Standard", value: product.testingStandard },
  ];

  const dimensionData = [
    { size: "DN50", ftf: "178", od: "150", hole: "Ø 19 X 4", pcd: "120.7" },
    { size: "DN65", ftf: "190", od: "180", hole: "Ø 19 X 4", pcd: "139.7" },
    { size: "DN80", ftf: "203", od: "190", hole: "Ø 19 X 4", pcd: "152.4" },
    { size: "DN100", ftf: "229", od: "230", hole: "Ø 19 X 8", pcd: "190.5" },
    { size: "DN125", ftf: "254", od: "255", hole: "Ø 22.2 X 8", pcd: "215.9" },
    { size: "DN150", ftf: "267", od: "280", hole: "Ø 22.2 X 8", pcd: "241.3" },
    { size: "DN200", ftf: "292", od: "345", hole: "Ø 22.2 X 8", pcd: "298.5" },
    { size: "DN250", ftf: "330", od: "405", hole: "Ø 25.4 X 12", pcd: "362" },
    { size: "DN300", ftf: "356", od: "485", hole: "Ø 25.4 X 12", pcd: "431.8" },
  ];

  const handleDownloadCSV = () => {
    if (!product) return;
    const headers = ["Specification", "Details"];
    const rows = [
      ["Product", product.subTitle],
      ...specs.map(spec => [spec.label, spec.value]),
    ];
    const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `PTFE_Lined_Ball_Check_Valve_Data_Sheet.csv`;
    link.click();
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
            <span className="text-primary">{product.category}</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider text-sm md:text-base">PFA / FEP Lined</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">{product.subTitle}</h1>
        </div>
      </div>

      <section className="py-12 md:py-20 px-5 md:px-[63px]" style={{ backgroundColor: '#f3f3f3bd' }}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white border border-border shadow-lg">
              <Image src={productImage.imageUrl} alt={product.subTitle} fill className="object-contain p-8 md:p-12" priority />
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6">
                {specs.map((spec, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 border-b border-border pb-4 last:border-none">
                    <span className="text-primary font-bold text-sm md:text-base md:min-w-[220px] uppercase tracking-wide">{spec.label} :</span>
                    <span className="text-foreground/70 text-sm md:text-base leading-relaxed">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button variant="secondary" className="h-12 px-8 rounded-xl font-bold" onClick={() => setIsQuoteOpen(true)}>Request a Quote</Button>
                <Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-primary text-primary hover:bg-neutral-100 hover:text-primary transition-colors" onClick={handleDownloadCSV}>
                  <Download className="mr-2 size-5" /> Download Data Sheet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuotePopup isOpen={isQuoteOpen} onOpenChange={setIsQuoteOpen} productName={product.subTitle} />
      <Footer />
    </main>
  );
}