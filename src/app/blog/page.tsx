"use client";

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, ArrowRight, Droplets, ShieldAlert, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images.json";

const blogPosts = [
  {
    id: "water-treatment",
    title: "How to Choose the Right Industrial Valve for Water and Wastewater Treatment Plants",
    description: "Selecting valves for treatment facilities requires understanding the fluid characteristics, operating conditions, and the specific role of each pipeline.",
    image: "/blog/hero-bg-blog1.webp",
    date: "October 12, 2023",
    href: "/blog/industrial-valves-for-water-treatment",
    category: "Industry Selection Guide",
    icon: Droplets,
  },
  {
    id: "pfa-vs-fep",
    title: "PFA vs FEP Lined Valves: What Should You Choose for Corrosive Chemical Applications?",
    description: "Selecting the right fluoropolymer lining is critical for the safety and longevity of your industrial valves in highly aggressive environments.",
    image: "/blog/hero-bg-blog2.webp",
    date: "November 05, 2023",
    href: "/blog/pfa-vs-fep-lined-valves",
    category: "Material Comparison",
    icon: ShieldAlert,
  }
];

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-5 md:px-[63px] bg-gradient-to-br from-white via-blue-50/30 to-neutral-100 border-b-4 border-secondary/10">
        <div className="container mx-auto">
          <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-foreground/60 mb-6">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <span className="text-secondary font-bold">Blog</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
            <Sparkles className="size-3.5" /> AMCO Technical Insights
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary max-w-4xl leading-tight mb-6">
            Industrial Valve Knowledge Hub
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
            Stay updated with the latest in valve engineering, material selection guides, and industry-specific flow control solutions.
          </p>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <section className="py-16 md:py-24 px-5 md:px-[63px]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group overflow-hidden border border-border/50 bg-white rounded-[2.5rem] flex flex-col shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6">
                    <div className="bg-white/90 backdrop-blur-md text-primary px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-2">
                      <post.icon className="size-3.5 text-secondary" />
                      {post.category}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8 md:p-10 flex-grow">
                  <div className="flex items-center gap-2 text-foreground/40 text-xs font-bold mb-4">
                    <Calendar className="size-3.5 text-secondary" />
                    {post.date}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 leading-tight group-hover:text-secondary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-foreground/60 text-base md:text-lg leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </CardContent>

                <CardFooter className="px-8 md:px-10 pb-10 pt-0">
                  <Button variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary hover:text-white transition-all font-bold h-12 px-6 group/btn" asChild>
                    <Link href={post.href}>
                      Read More 
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 px-5 md:px-[63px]">
        <div className="container mx-auto">
          <div className="bg-primary p-8 md:p-16 rounded-[3rem] text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 relative z-10">Need technical assistance with valve selection?</h3>
            <p className="text-white/70 text-base md:text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Our engineering team can help you identify the optimal configuration for your specific application requirements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Button variant="secondary" size="lg" className="h-14 px-10 rounded-xl font-bold text-lg" asChild>
                <Link href="/#contact">Contact an Engineer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
