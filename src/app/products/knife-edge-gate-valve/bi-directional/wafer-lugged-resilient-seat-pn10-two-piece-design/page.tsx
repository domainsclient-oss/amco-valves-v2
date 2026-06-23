"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function BiDirectionalWaferTwoPiecePage() {
  const productImage = PlaceHolderImages.find(img => img.id === "product-1") || PlaceHolderImages[0];

  const specs = [
    { label: "Size", value: "DN50 - DN1000" },
    { 
      label: "Material of construction", 
      subLabel: "(Bill of material)",
      value: "DI / CF8 / CF8M" 
    },
    { label: "Seat", value: "EPDM" },
    { label: "Lining", value: "Natural rubber" },
    { label: "End connection", value: "Wafer Lugged to suit ANSI flanges / ND 10" },
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
      ["Model", "2 piece design Wafer Lugged Resilient seat PN10#"],
      ...specs.map(spec => [spec.label + (spec.subLabel || ""), spec.value])
    ];
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Bi_Directional_Wafer_Two_Piece_PN10_data_sheet.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Breadcrumbs */}
      <div className="bg-neutral-50 pt-32 pb-8">
        <div className="container mx-auto px-6 md:px-[63px]">
          <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-foreground/60 mb-4">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <Link href="/#products" className="hover:text-secondary transition-colors">Products</Link>
            <ChevronRight className="size-4" />
            <span className="text-primary">Knife Edge Gate Valve</span>
          </nav>
          <p className="text-secondary font-bold uppercase tracking-wider">Bi Directional</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">2 piece design Wafer Lugged Resilient seat PN10#</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-20" style={{ backgroundColor: '#f3f3f3bd' }}>
        <div className="container mx-auto px-6 md:px-[63px]">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Left Column: Image */}
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white border border-border shadow-lg">
              <Image
                src={productImage.imageUrl}
                alt="2 piece design Bi-Directional Wafer Lugged Resilient Seat Knife Edge Gate Valve"
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
        </div>
      </section>

      <Footer />
    </main>
  );
}