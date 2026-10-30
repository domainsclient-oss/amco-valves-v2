"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookiePolicyPage() {
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
          <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#000000] mb-4">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <span className="text-primary">Cookie Policy</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-primary">Cookie Policy</h1>
          <p className="text-[#000000] mt-2">Date: {currentDate}</p>
        </div>
      </div>

      <section className="py-12 md:py-20 px-5 md:px-[63px]">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-blue max-w-none text-[#000000] space-y-8">
            <p>
              This Cookie Policy explains how AMCO Valves may use cookies and similar technologies on its website.
            </p>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your device when you visit a website. They help websites remember information about your visit and can improve functionality, performance, and user experience.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">2. How We Use Cookies</h2>
              <p className="mb-4">AMCO Valves may use cookies and similar technologies for purposes such as:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ensuring the website functions correctly</li>
                <li>Remembering certain website preferences</li>
                <li>Understanding how visitors use the website</li>
                <li>Improving website performance and user experience</li>
                <li>Monitoring website security</li>
                <li>Supporting website analytics where applicable</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">3. Types of Cookies</h2>
              <p className="mb-6">Depending on the features implemented on the website, cookies may include:</p>
              
              <div className="space-y-4">
                <h3 className="font-bold text-primary">Essential Cookies</h3>
                <p>These cookies may be necessary for basic website functionality and security.</p>

                <h3 className="font-bold text-primary">Performance and Analytics Cookies</h3>
                <p>These cookies may help us understand how visitors interact with the website, such as which pages are visited and how users navigate the site.</p>

                <h3 className="font-bold text-primary">Functional Cookies</h3>
                <p>These cookies may remember preferences or settings to provide a more convenient experience.</p>

                <h3 className="font-bold text-primary">Third-Party Cookies</h3>
                <p>Certain third-party services integrated into the website may place their own cookies or similar technologies. These services may include analytics, embedded content, security tools, or other website functionality.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">4. Managing Cookies</h2>
              <p>
                Most modern web browsers allow you to control, block, or delete cookies through their settings.
              </p>
              <p className="mt-4">
                Please note that disabling certain cookies may affect the functionality or performance of some parts of the website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">5. Third-Party Services</h2>
              <p>
                Where third-party services are used on our website, those providers may have their own privacy and cookie policies. We recommend reviewing their policies to understand how they process information collected through their technologies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">6. Changes to This Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes to the technologies or services used on our website.
              </p>
              <p className="mt-4">
                Any changes will be published on this page with an updated effective date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">7. Contact Us</h2>
              <p className="mb-4">If you have questions about our use of cookies or this Cookie Policy, please contact:</p>
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
