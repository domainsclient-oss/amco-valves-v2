"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { contactHref, defaultHomeContent, phoneHref, siteImage, type HomeContent } from "@/lib/home-content";
import { safeHref } from "@/lib/buttons";
import { useHomeContent } from "@/hooks/use-home-content";

type FooterContent = HomeContent["footer"];

export function Footer({ content }: { content?: FooterContent }) {
  return content ? <FooterView footer={content} /> : <FooterWithLoadedContent />;
}

function FooterWithLoadedContent() {
  return <FooterView footer={useHomeContent().footer} />;
}

/** An address that becomes a link only when one is set in the admin. */
function Address({ text, link }: { text: string; link: string }) {
  return link.trim() ? (
    <Link href={safeHref(link, "#")} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
      {text}
    </Link>
  ) : (
    <>{text}</>
  );
}

function FooterView({ footer }: { footer: FooterContent }) {
  const social = [
    { Icon: Linkedin, href: footer.social.linkedin },
    { Icon: Twitter, href: footer.social.twitter },
    { Icon: Facebook, href: footer.social.facebook },
  ];

  return (
    <footer className="bg-primary text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo and About */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <div className="relative w-40 h-20 bg-white rounded-xl p-3 flex items-center justify-center shadow-lg">
                <Image
                  src={siteImage(footer.logo.src, defaultHomeContent.footer.logo.src)}
                  alt={footer.logo.alt}
                  fill
                  className="object-contain p-2"
                />
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {footer.about}
            </p>
            <div className="flex gap-4">
              {social.map(({ Icon, href }, idx) => (
                <Link key={idx} href={safeHref(href, "#")} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary transition-colors">
                  <Icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">{footer.quickLinksTitle}</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              {footer.quickLinks.map((link, i) => (
                <li key={i}><Link href={safeHref(link.href, "/")} className="hover:text-secondary transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">{footer.legalTitle}</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              {footer.legalLinks.map((link, i) => (
                <li key={i}><Link href={safeHref(link.href, "/")} className="hover:text-secondary transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">{footer.contactTitle}</h4>
            <ul className="space-y-5 text-white/60 text-sm">
              <li className="flex gap-3">
                <MapPin className="text-secondary shrink-0 size-5" />
                <span>
                  <strong>{footer.factoryLabel}</strong><br />
                  <Address text={footer.factoryAddress} link={footer.factoryLink} />
                </span>
              </li>
              <li className="flex gap-3">
                <MapPin className="text-secondary shrink-0 size-5" />
                <span>
                  <strong>{footer.warehouseLabel}</strong><br />
                  <Address text={footer.warehouseAddress} link={footer.warehouseLink} />
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-secondary shrink-0 size-5" />
                <Link href={contactHref(footer.phoneLink, phoneHref(footer.phone))} className="hover:text-secondary transition-colors">
                  {footer.phone}
                </Link>
              </li>
              <li className="flex gap-3">
                <Mail className="text-secondary shrink-0 size-5" />
                <Link href={contactHref(footer.emailLink, `mailto:${footer.email}`)} className="hover:text-secondary transition-colors">
                  {footer.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-white/40 text-[15px]">
          <p>© {new Date().getFullYear()} {footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
