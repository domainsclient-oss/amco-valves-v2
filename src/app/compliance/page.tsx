"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CompliancePage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Breadcrumbs */}
      <div className="bg-neutral-50 pt-32 pb-8 px-5 md:px-[63px]">
        <div className="container mx-auto">
          <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-foreground/60 mb-4">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <span className="text-primary">Compliance</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-primary">Compliance</h1>
          <p className="text-foreground/50 mt-2">Date: {currentDate}</p>
        </div>
      </div>

      <section className="py-12 md:py-20 px-5 md:px-[63px]">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-blue max-w-none text-foreground/80 space-y-8">
            <p>
              At AMCO Valves, quality, reliability, safety, and responsible business practices are important parts of our manufacturing and customer-service approach.
            </p>
            <p>
              We are committed to conducting our business in accordance with applicable laws, regulations, industry requirements, and customer specifications relevant to our operations.
            </p>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Quality and Manufacturing</h2>
              <p>
                AMCO Valves maintains quality-focused manufacturing and inspection practices designed to support consistent product performance.
              </p>
              <p className="mt-4">
                Our manufacturing processes may include inspection and quality checks at various stages, including material procurement, manufacturing, assembly, testing, and final inspection, as applicable to the product and customer requirements.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Materials and Traceability</h2>
              <p>
                We source castings, forgings, and other raw materials from established suppliers and undertake appropriate inspection and verification processes based on applicable product and customer requirements.
              </p>
              <p className="mt-4">
                Where applicable, material documentation, inspection records, test certificates, and other quality documentation may be provided in accordance with the agreed order requirements.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Standards and Customer Requirements</h2>
              <p>
                Our products may be manufactured, tested, and supplied according to applicable standards, specifications, codes, and customer requirements relevant to the particular product or project.
              </p>
              <p className="mt-4">
                Applicable requirements may vary depending on valve type, pressure rating, material, industry, application, and customer specification.
              </p>
              <p className="mt-4 font-medium italic">
                Customers are encouraged to confirm the required standards and technical specifications with AMCO Valves before placing an order.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Industrial Applications</h2>
              <p>
                Our products are supplied for a wide range of industrial applications, including process industries, chemical and petrochemical facilities, refineries, fertilizers, pharmaceuticals, power generation, steel, textiles, food and oil industries, water treatment, marine applications, and other industrial environments.
              </p>
              <p className="mt-4">
                The suitability of a particular valve for an application should always be evaluated based on operating conditions, fluid characteristics, pressure, temperature, material compatibility, applicable standards, and project requirements.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Regulatory Compliance</h2>
              <p>
                AMCO Valves aims to comply with applicable statutory and regulatory requirements relevant to its operations and products.
              </p>
              <p className="mt-4">
                Specific certifications, approvals, inspection requirements, or compliance documentation may vary depending on the product, project, customer requirements, and applicable jurisdiction.
              </p>
              <p className="mt-4 font-medium italic">
                For information regarding a specific certification, standard, approval, test certificate, or compliance document, please contact our team.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Continuous Improvement</h2>
              <p>
                We believe quality is an ongoing process. We continuously work to improve our manufacturing processes, inspection practices, product quality, customer service, and operational capabilities.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Contact</h2>
              <p className="mb-4">For compliance-related enquiries:</p>
              <div className="bg-neutral-50 p-6 rounded-2xl border border-border">
                <p className="font-bold text-primary">AMCO Valves</p>
                <p>Email: <Link href="mailto:contact@amcovalves.com" className="text-secondary hover:underline">contact@amcovalves.com</Link></p>
                <p>Phone: <Link href="tel:+919841114671" className="text-secondary hover:underline">91-9841114671</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
