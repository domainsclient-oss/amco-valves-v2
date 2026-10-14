
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { productNavigationData } from "@/lib/navigation-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Products", href: "/#products", hasMegaMenu: true },
  { name: "Blog", href: "#", hasDropdown: true },
  { name: "Certificates", href: "/#certificates" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Contact", href: "/#contact" },
];

const blogLinks = [
  { name: "Industrial Valves for Water Treatment", href: "/blog/industrial-valves-for-water-treatment" },
  { name: "PFA vs FEP Lined Valves for Chemical Applications", href: "/blog/pfa-vs-fep-lined-valves" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when any menu is open
  useEffect(() => {
    if (isOpen || isMegaMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, isMegaMenuOpen]);

  const openMegaMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMegaMenuOpen(true);
  };

  const closeMegaMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 150); // Small delay to bridge gap between link and menu
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-[60] transition-all duration-700 ease-in-out border-b px-5 md:px-[63px]",
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-md border-border" 
            : "bg-transparent border-transparent"
        )}
      >
        <div className={cn(
          "flex items-center justify-between transition-all duration-500 w-full",
          scrolled 
            ? "h-16 md:h-20" 
            : "py-6"
        )}>
          <div className="transition-all duration-500 ease-in-out flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative w-24 h-12 md:w-36 md:h-18 transition-transform group-hover:scale-105">
                <Image
                  src="/Logo-Asset.png"
                  alt="AMCO Valves Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          <div className={cn(
            "hidden md:flex items-center gap-6 lg:gap-8 transition-all duration-700 ease-in-out h-full",
            !scrolled && "bg-white px-8 py-3 h-auto rounded-2xl rounded-bl-[40px] shadow-lg border border-white/20"
          )}>
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative h-full flex items-center group/navitem"
                onMouseEnter={() => {
                  if (link.hasMegaMenu) openMegaMenu();
                  if (link.hasDropdown) setIsBlogOpen(true);
                }}
                onMouseLeave={() => {
                  if (link.hasMegaMenu) closeMegaMenu();
                  if (link.hasDropdown) setIsBlogOpen(false);
                }}
              >
                <Link
                  href={link.href}
                  className="text-[14px] lg:text-[16px] font-extrabold text-primary transition-colors hover:text-secondary whitespace-nowrap flex items-center gap-1 h-full py-2"
                >
                  {link.name}
                  {(link.hasMegaMenu || link.hasDropdown) && <ChevronDown className={cn("size-4 transition-transform duration-300", (isMegaMenuOpen && link.hasMegaMenu) || (isBlogOpen && link.hasDropdown) ? "rotate-180" : "")} />}
                </Link>

                {/* Simple Dropdown for Blog */}
                {link.hasDropdown && (
                  <div className={cn(
                    "absolute top-full left-0 w-72 bg-white shadow-2xl rounded-xl border border-border p-4 transition-all duration-300 origin-top z-[70]",
                    isBlogOpen ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
                  )}>
                    <ul className="space-y-3">
                      {blogLinks.map((blog) => (
                        <li key={blog.href}>
                          <Link 
                            href={blog.href} 
                            className="text-sm font-bold text-primary/70 hover:text-secondary block py-1 transition-colors leading-snug"
                          >
                            {blog.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center h-full">
              <Button variant="secondary" size="sm" className="rounded-xl font-extrabold px-6 h-10 text-[14px] lg:text-[16px]" asChild>
                <Link href="/#contact">Get a Quote</Link>
              </Button>
            </div>
          </div>

          <div className="md:hidden flex items-center h-full">
            <button
              className={cn(
                "p-2 rounded-xl transition-all duration-500 ease-in-out text-primary",
                scrolled 
                  ? "bg-primary/5" 
                  : "bg-white shadow-md border-white/20 border"
              )}
              onClick={() => setIsOpen(true)}
            >
              <Menu className="size-9" />
            </button>
          </div>
        </div>

        {/* Full-width Desktop Mega Menu Overlay */}
        <div 
          className={cn(
            "absolute left-0 w-full transition-all duration-300 origin-top z-50 hidden md:block",
            scrolled ? "top-full" : "top-[calc(100%-2px)]",
            isMegaMenuOpen ? "opacity-100 translate-y-0 scale-y-100 pointer-events-auto" : "opacity-0 -translate-y-4 scale-y-0 pointer-events-none"
          )}
          onMouseEnter={openMegaMenu}
          onMouseLeave={closeMegaMenu}
        >
          <div className="bg-white shadow-2xl border-t border-border overflow-hidden rounded-b-3xl">
            <div className="overflow-y-auto max-h-[85vh] scrollbar-thin scrollbar-thumb-secondary/20 scrollbar-track-transparent">
              <div className="max-w-[1440px] mx-auto p-8 lg:p-12 px-12 md:px-24">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-12 gap-y-16">
                  {productNavigationData.map((column, colIdx) => (
                    <div key={colIdx} className="space-y-12">
                      {column.map((category) => (
                        <div key={category.title} className="space-y-5">
                          <h4 className="text-secondary font-bold text-[13px] uppercase tracking-[0.15em] border-b border-secondary/10 pb-3 leading-tight flex items-end">
                            {category.title}
                          </h4>
                          <div className="space-y-8">
                            {category.subCategories.map((sub) => (
                              <div key={sub.name} className="space-y-3">
                                <h5 className="text-primary font-bold text-[14px] flex items-center gap-2">
                                  <ChevronRight className="size-3.5 text-secondary shrink-0" />
                                  {sub.name}
                                </h5>
                                <ul className="space-y-2.5 pl-6 border-l border-primary/5 ml-1.5">
                                  {sub.products.map((product) => (
                                    <li key={product.name}>
                                      <Link 
                                        href={product.href} 
                                        className="text-foreground/60 hover:text-secondary text-[13px] lg:text-[14px] transition-all hover:translate-x-1 block leading-snug"
                                        onClick={() => setIsMegaMenuOpen(false)}
                                      >
                                        {product.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Mega Menu Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-primary/10 backdrop-blur-[2px] z-[55] transition-opacity duration-300 hidden md:block pointer-events-none",
          isMegaMenuOpen ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 z-[70] transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 bottom-0 right-0 w-[85vw] bg-white z-[80] md:hidden transition-transform duration-500 ease-in-out shadow-2xl flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-5 flex items-center justify-between border-b border-border bg-white shrink-0">
          <div className="relative w-32 h-16">
            <Image
              src="/Logo-Asset.png"
              alt="AMCO Valves Logo"
              fill
              className="object-contain"
            />
          </div>
          <button onClick={() => setIsOpen(false)} className="text-primary p-2">
            <X className="size-8" />
          </button>
        </div>

        <div className="flex flex-col py-4 bg-white flex-1 overflow-y-auto px-5">
          {mounted && (
            <Accordion type="single" collapsible className="w-full">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasMegaMenu ? (
                    <AccordionItem value={link.name} className="border-b border-border">
                      <AccordionTrigger className="py-5 text-lg font-bold text-primary uppercase hover:no-underline">
                        {link.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-10 pt-2 pb-4">
                          {productNavigationData.map((column, colIdx) => (
                            <div key={colIdx} className="space-y-8">
                              {column.map((category) => (
                                <div key={category.title} className="space-y-4">
                                  <h4 className="text-secondary font-bold text-xs uppercase tracking-wider bg-secondary/5 px-3 py-1 rounded">
                                    {category.title}
                                  </h4>
                                  <div className="space-y-5 pl-2">
                                    {category.subCategories.map((sub) => (
                                      <div key={sub.name} className="space-y-2">
                                        <h5 className="text-primary font-bold text-[13px] flex items-center gap-2">
                                          <ChevronRight className="size-3 text-secondary shrink-0" />
                                          {sub.name}
                                        </h5>
                                        <ul className="space-y-2 pl-5">
                                          {sub.products.map((product) => (
                                            <li key={product.name}>
                                              <Link 
                                                href={product.href} 
                                                className="text-foreground/60 text-sm block py-1 leading-tight"
                                                onClick={() => setIsOpen(false)}
                                              >
                                                {product.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ) : link.hasDropdown ? (
                    <AccordionItem value={link.name} className="border-b border-border">
                      <AccordionTrigger className="py-5 text-lg font-bold text-primary uppercase hover:no-underline">
                        {link.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-4 pt-2 pb-4 pl-4">
                          {blogLinks.map((blog) => (
                            <li key={blog.href}>
                              <Link 
                                href={blog.href}
                                className="text-foreground/70 text-base font-bold block leading-snug"
                                onClick={() => setIsOpen(false)}
                              >
                                {blog.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex py-5 text-lg font-bold text-primary uppercase border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </Accordion>
          )}
        </div>

        <div className="p-8 border-t border-border bg-white mt-auto shrink-0">
          <Button variant="secondary" size="lg" className="w-full rounded-xl font-bold uppercase tracking-wider h-14" asChild onClick={() => setIsOpen(false)}>
            <Link href="/#contact">Get a Quote</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
