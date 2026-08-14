"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TermsOfServicePage() {
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
            <span className="text-primary">Terms of Service</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-primary">Terms of Service</h1>
          <p className="text-foreground/50 mt-2">Effective Date: {currentDate || "[Insert Date]"}</p>
        </div>
      </div>

      <section className="py-12 md:py-20 px-5 md:px-[63px]">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-blue max-w-none text-foreground/80 space-y-8">
            <p>
              Welcome to the AMCO Valves website. By accessing or using this website, you agree to comply with these Terms of Service. If you do not agree with these terms, please discontinue use of the website.
            </p>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">1. About the Website</h2>
              <p>
                The AMCO Valves website provides general information about our company, products, industrial valve solutions, capabilities, industries served, and related services.
              </p>
              <p className="mt-4">
                The information provided on the website is intended for general informational and business purposes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">2. Use of Website</h2>
              <p className="mb-4">You agree to use this website only for lawful purposes.</p>
              <p className="mb-4">You must not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the website for fraudulent or unlawful activities</li>
                <li>Attempt to gain unauthorized access to the website or its systems</li>
                <li>Interfere with website functionality or security</li>
                <li>Copy, reproduce, or distribute website content without permission</li>
                <li>Use website information in a manner that may infringe our rights or those of third parties</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">3. Product Information</h2>
              <p className="mb-4">
                We make reasonable efforts to ensure that product descriptions, specifications, technical information, images, and other content published on the website are accurate.
              </p>
              <p className="mb-4">
                However, specifications, dimensions, materials, availability, configurations, and other product details may change without prior notice.
              </p>
              <p>
                Product information available on the website should not be treated as a substitute for project-specific technical documentation, drawings, specifications, or written confirmation from AMCO Valves.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">4. Quotations and Orders</h2>
              <p className="mb-4">
                Information submitted through the website does not automatically constitute an order or binding contract.
              </p>
              <p>
                Product pricing, availability, delivery schedules, technical specifications, warranties, and other commercial terms are subject to confirmation by AMCO Valves through the applicable quotation, purchase order, agreement, or other written communication.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">5. Intellectual Property</h2>
              <p className="mb-4">
                Unless otherwise stated, the content of this website, including text, graphics, photographs, logos, trademarks, product information, designs, and other materials, is owned by or licensed to AMCO Valves.
              </p>
              <p>
                The content may not be reproduced, modified, distributed, republished, or commercially used without prior written permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">6. Third-Party Links</h2>
              <p>
                The website may contain links to third-party websites for convenience or additional information. AMCO Valves does not control and is not responsible for the content, availability, security, or practices of such websites.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">7. Disclaimer</h2>
              <p>
                The website and its content are provided on an "as available" basis. While we make reasonable efforts to maintain accurate and reliable information, we do not guarantee that the website will always be uninterrupted, error-free, complete, or current.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">8. Limitation of Liability</h2>
              <p className="mb-4">
                To the extent permitted by applicable law, AMCO Valves shall not be responsible for losses or damages arising solely from reliance on general information available on this website.
              </p>
              <p>
                Specific product selection, engineering requirements, installation, operation, maintenance, and application suitability should be evaluated based on the relevant technical specifications and project requirements.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">9. Changes to These Terms</h2>
              <p>
                AMCO Valves may modify these Terms of Service from time to time. Updated terms will be published on this page and will become effective from the date of publication unless otherwise stated.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">10. Contact</h2>
              <p className="mb-4">For questions regarding these Terms of Service, please contact:</p>
              <div className="bg-neutral-50 p-6 rounded-2xl border border-border">
                <p className="font-bold text-primary">AMCO Valves</p>
                <p>Email: <Link href="mailto:contact@amcovalves.com" className="text-secondary hover:underline">contact@amcovalves.com</Link></p>
                <p>Phone: <Link href="tel:+919841114671" className="text-secondary hover:underline">91-9841114671</Link></p>
                <p>Address: 638/A Tiruvottriyur high road, Ajax, Chennai, 600019</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
