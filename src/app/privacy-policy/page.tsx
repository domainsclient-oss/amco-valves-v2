"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PrivacyPolicyPage() {
  const [effectiveDate, setEffectiveDate] = useState("");

  useEffect(() => {
    setEffectiveDate(new Date().toLocaleDateString('en-US', {
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
            <span className="text-primary">Privacy Policy</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-primary">Privacy Policy</h1>
          <p className="text-foreground/50 mt-2">{effectiveDate}</p>
        </div>
      </div>

      <section className="py-12 md:py-20 px-5 md:px-[63px]">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-blue max-w-none text-foreground/80 space-y-8">
            <p>
              At AMCO Valves, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect information when you visit our website, communicate with us, or use our services.
            </p>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">1. Information We Collect</h2>
              <p className="mb-4">We may collect information that you voluntarily provide when you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Submit an enquiry or contact form</li>
                <li>Request product information or quotations</li>
                <li>Request technical or product support</li>
                <li>Subscribe to updates or communications</li>
                <li>Communicate with us by email, telephone, or other channels</li>
              </ul>
              <p className="mt-4">
                This information may include your name, company name, email address, telephone number, postal address, designation, and other information necessary to respond to your enquiry.
              </p>
              <p className="mt-4">
                We may also automatically collect limited technical information such as your IP address, browser type, device information, pages visited, and general website usage data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">AMCO Valves may use collected information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to enquiries and requests</li>
                <li>Provide product information and quotations</li>
                <li>Process business communications</li>
                <li>Provide customer and technical support</li>
                <li>Improve our website, products, and services</li>
                <li>Understand website usage and improve user experience</li>
                <li>Send relevant business communications where permitted</li>
                <li>Maintain website security and prevent misuse</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">3. Sharing of Information</h2>
              <p className="mb-4">We do not sell or rent your personal information.</p>
              <p className="mb-4">
                We may share information with trusted service providers, business partners, or professional advisers where reasonably necessary to operate our website, provide services, respond to enquiries, or meet legal and regulatory requirements.
              </p>
              <p>
                We may also disclose information where required by applicable law, regulation, court order, or government authority.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">4. Data Security</h2>
              <p className="mb-4">
                We take reasonable technical and organizational measures to protect personal information against unauthorized access, alteration, disclosure, loss, or misuse.
              </p>
              <p>
                However, no method of transmission or electronic storage can be guaranteed to be completely secure.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">5. Data Retention</h2>
              <p>
                We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, to maintain business records, resolve disputes, comply with legal requirements, and protect our legitimate business interests.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">6. Third-Party Websites</h2>
              <p className="mb-4">
                Our website may contain links to third-party websites. AMCO Valves is not responsible for the privacy practices, security, or content of external websites.
              </p>
              <p>
                We recommend reviewing the privacy policies of third-party websites before providing them with personal information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">7. Your Rights</h2>
              <p className="mb-4">
                Depending on applicable law, you may have rights regarding your personal information, including the right to request access, correction, updating, or deletion of certain information.
              </p>
              <p>
                To make a privacy-related request, please contact us using the details provided on our Contact Us page.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">8. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or applicable requirements. Any updated version will be published on this page with a revised effective date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">9. Contact Us</h2>
              <p className="mb-4">If you have questions regarding this Privacy Policy or how we handle personal information, please contact:</p>
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
