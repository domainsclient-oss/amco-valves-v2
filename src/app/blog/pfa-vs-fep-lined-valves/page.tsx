import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Info, HelpCircle, Activity, ArrowRight, MessageSquare, ShieldAlert } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images.json";

export const metadata: Metadata = {
  title: "PFA vs FEP Lined Valves: Which is Better? | AMCO Valves",
  description: "Choosing between PFA and FEP lining for your industrial valves? Learn the key differences in temperature, chemical resistance, and cost for corrosive applications.",
  keywords: [
    "PFA vs FEP lined valves",
    "pfa lining vs fep lining",
    "lined valve applications",
    "corrosive chemical valves",
    "teflon lined valves",
    "industrial valves for chemicals"
  ],
};

export default function PfaVsFepBlogPage() {
  const heroImg = placeholderImages.find(img => img.id === "blog-pfa-hero");
  const midImg = "/blog/PFA-lined-valves.webp";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-5 md:px-[63px] bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={heroImg?.imageUrl || "https://picsum.photos/seed/chemical1/1200/600"}
            alt="Chemical Processing Plant"
            fill
            className="object-cover"
            data-ai-hint="chemical processing"
          />
        </div>
        <div className="container mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-white/60 mb-6">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <span className="text-white/40">Blog</span>
            <ChevronRight className="size-4" />
            <span className="text-secondary font-bold">Material Comparison</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
            <ShieldAlert className="size-3.5" /> Corrosive Chemical Solutions
          </div>
          <h1 className="text-3xl md:text-6xl font-bold text-white max-w-5xl leading-tight mb-8">
            PFA vs FEP Lined Valves: What Should You Choose for Corrosive Chemical Applications?
          </h1>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed mb-[15px]">
            Selecting the right fluoropolymer lining is critical for the safety and longevity of your industrial valves in highly aggressive environments.
          </p>
        </div>
      </div>

      {/* Article Content */}
      <section className="py-12 md:py-24 px-5 md:px-[63px]">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <article className="prose prose-neutral max-w-none prose-headings:text-primary prose-headings:font-bold prose-p:text-foreground/80 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-[15px]">
                <p className="mb-[15px]">When a valve is exposed to corrosive chemicals, the wrong material choice can become an expensive problem.</p>
                
                <p className="mb-[15px]">Corrosion, damaged sealing surfaces and premature lining failure can lead to leakage, maintenance work and unplanned interruptions.</p>
                
                <p className="mb-[15px]">This is why engineers working with aggressive chemical media often consider fluoropolymer-lined valves.</p>
                
                <p className="mb-[15px]">Two materials commonly encountered in this category are PFA and FEP.</p>
                
                <p className="mb-[15px]">Both offer broad chemical resistance, but they are not identical. Understanding the differences is important before selecting a valve for a chemical processing application.</p>

                <h2 className="text-2xl font-bold mt-16 mb-8">
                  What are PFA and FEP lined valves?
                </h2>
                
                <p className="mb-[15px]">PFA (perfluoroalkoxy) and FEP (fluorinated ethylene propylene) are fluoropolymers used to provide chemical-resistant surfaces.</p>
                
                <p className="mb-[15px]">In a lined valve, the lining separates the process fluid from the underlying valve body, helping protect it from direct chemical exposure.</p>
                
                <p className="mb-[15px]">A lined valve is therefore different from an unlined metallic valve, where the process fluid comes into contact with the body material.</p>
                
                <p className="mb-[15px]">Both PFA and FEP can be suitable for a wide range of corrosive chemicals. However, their performance limits and suitability depend on the application.</p>

                <h2 className="text-2xl font-bold mt-16 mb-8">PFA vs FEP: What is the difference?</h2>
                
                <div className="my-12 overflow-hidden border border-border rounded-[2rem] shadow-xl bg-white">
                  <div className="bg-primary p-6">
                    <h4 className="text-white font-bold m-0 text-xl">Material Comparison Matrix</h4>
                  </div>
                  <Table>
                    <TableHeader className="bg-neutral-50">
                      <TableRow>
                        <TableHead className="text-primary font-bold h-14">Factor</TableHead>
                        <TableHead className="text-primary font-bold h-14">PFA lining</TableHead>
                        <TableHead className="text-primary font-bold h-14">FEP lining</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-neutral-50/50">
                        <TableCell className="font-bold text-primary">Chemical resistance</TableCell>
                        <TableCell>Broad resistance to many aggressive chemicals</TableCell>
                        <TableCell>Broad resistance to many aggressive chemicals</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-neutral-50/50">
                        <TableCell className="font-bold text-primary">Temperature capability</TableCell>
                        <TableCell>Generally higher material temperature capability</TableCell>
                        <TableCell>Generally lower than PFA</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-neutral-50/50">
                        <TableCell className="font-bold text-primary">Processing</TableCell>
                        <TableCell>Melt-processable fluoropolymer</TableCell>
                        <TableCell>Melt-processable fluoropolymer</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-neutral-50/50">
                        <TableCell className="font-bold text-primary">Common consideration</TableCell>
                        <TableCell>More demanding temperature requirements</TableCell>
                        <TableCell>Applications within FEP's operating limits</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-neutral-50/50">
                        <TableCell className="font-bold text-primary">Final selection</TableCell>
                        <TableCell>Depends on valve design and service conditions</TableCell>
                        <TableCell>Depends on valve design and service conditions</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <p className="mb-[15px]">The important point is that the properties of the lining material do not automatically determine the allowable operating conditions of the complete valve.</p>
                
                <p className="mb-[15px]">The valve body, lining thickness, sealing components, pressure rating and manufacturing design must also be considered.</p>

                <h2 className="text-2xl font-bold mt-16 mb-8">When should you consider PFA lined valves?</h2>
                <p className="mb-[15px]">PFA lined valves are often evaluated for chemical applications where both corrosion resistance and elevated temperature capability are important.</p>
                <p className="mb-[15px]">They may be considered for certain chemical transfer, process isolation and handling applications involving aggressive media.</p>
                <p className="mb-[15px]">However, it would be incorrect to assume that a PFA lining is suitable for every chemical at every temperature.</p>
                <p className="mb-[15px]">Chemical concentration, operating pressure, temperature, permeation behaviour and potential mechanical damage all influence suitability.</p>
                <p className="mb-[15px]">For demanding service conditions, engineers should confirm the complete valve's rated operating limits with the manufacturer.</p>

                <h2 className="text-2xl font-bold mt-16 mb-8">When can FEP lined valves be a suitable option?</h2>
                <p className="mb-[15px]">FEP lined valves can also provide strong chemical resistance in appropriately selected applications.</p>
                <p className="mb-[15px]">They may be considered where the operating conditions remain within the lining and complete valve assembly's limits.</p>
                <p className="mb-[15px]">For some projects, FEP may provide a practical alternative to PFA.</p>
                <p className="mb-[15px]">But the decision should not be based on lining material alone.</p>
                <p className="mb-[15px]">Two valves with different designs, lining methods and sealing arrangements may perform differently even when both are described as FEP lined.</p>
                <p className="mb-[15px]">This is why the technical datasheet matters more than a broad product label.</p>

                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden my-16 shadow-2xl">
                  <Image
                    src={midImg}
                    alt="PFA Lined Valve Detail"
                    fill
                    className="object-cover"
                  />
                </div>

                <h2 className="text-2xl font-bold mt-16 mb-8">
                  Which valve types are available with chemical-resistant linings?
                </h2>
                
                <p className="mb-[15px]">Several industrial valve designs can be manufactured with fluoropolymer linings.</p>
                
                <p className="mb-[15px]">The correct design depends on the function required in the pipeline.</p>

                <h3 className="text-2xl font-bold mt-16 mb-6">Lined ball valves</h3>
                <p className="mb-[15px]">Lined ball valves are commonly considered for on/off isolation duties.</p>
                
                <p className="mb-[15px]">Their quarter-turn operation can make them practical where relatively quick opening and closing is required.</p>
                
                <p className="mb-[15px]">Selection must account for the process fluid, operating conditions, sealing arrangement and compatibility of wetted components.</p>

                <h3 className="text-2xl font-bold mt-16 mb-6">Lined butterfly valves</h3>
                <p className="mb-[15px]">Lined butterfly valves may be considered for chemical service in suitable pipeline sizes and pressure conditions.</p>
                
                <p className="mb-[15px]">The valve's disc, liner and sealing arrangement require particular attention because these components can be exposed to the process fluid.</p>

                <h3 className="text-2xl font-bold mt-16 mb-6">Lined plug valves</h3>
                <p className="mb-[15px]">Lined plug valves are another option for chemical isolation applications.</p>
                
                <p className="mb-[15px]">Their suitability depends on the valve design, lining construction and service conditions.</p>

                <h3 className="text-2xl font-bold mt-16 mb-6">Lined check valves</h3>
                <p className="mb-[15px]">Where reverse-flow prevention is required, lined check valves may be considered.</p>
                
                <p className="mb-[15px]">However, their operating characteristics must also suit the process, including flow conditions and installation requirements.</p>

                <h2 className="text-2xl md:text-3xl mt-20 mb-10 text-primary border-b border-border pb-4">
                  Five questions to ask before selecting a lined valve
                </h2>
                <div className="space-y-8 my-10">
                  {[
                    { q: "1. What is the maximum operating temperature?", a: "Ensure the lining material can handle your peak process heat without softening or losing integrity." },
                    { q: "2. What specific chemicals and concentrations are being handled?", a: "Verify compatibility with all components of the fluid, including trace elements." },
                    { q: "3. What are the normal and maximum operating pressures?", a: "Lined valves have specific pressure-temperature ratings that must be strictly followed." },
                    { q: "4. Is the service vacuum or high pressure?", a: "Some linings are better suited for vacuum conditions than others to prevent collapse." },
                    { q: "5. What are the installation requirements?", a: "Consider the pipe size, connection type, and available space for operation and maintenance." },
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-neutral-50 border border-border rounded-3xl group hover:bg-white hover:shadow-lg transition-all">
                      <h4 className="font-bold text-primary text-xl mb-3">{item.q}</h4>
                      <p className="text-base text-foreground/60 m-0 leading-relaxed mb-[15px]">{item.a}</p>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl md:text-3xl mt-20 mb-6">Why your selection of valve construction matters</h2>
                <p className="mb-[15px]">
                  The lining material is just one part of the equation. The quality of the cast body, the precision of the lining application, and the design of the seat and stem seals all contribute to the overall reliability of the valve. In corrosive environments, even a pinhole leak can lead to catastrophic failure.
                </p>

                <div className="bg-primary text-white p-12 rounded-[3rem] my-20 shadow-2xl relative overflow-hidden text-center">
                  <h2 className="text-white text-3xl md:text-4xl mt-0 mb-8 font-bold">Expert Lined Valve Solutions</h2>
                  <p className="text-white/70 text-lg mb-10 leading-relaxed max-w-2xl mx-auto mb-[15px]">
                    AMCO Industrial Valves specializes in high-performance PFA and FEP lined valves for the most demanding chemical applications.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button variant="secondary" size="lg" className="rounded-2xl font-bold h-16 px-10 text-lg shadow-xl shadow-secondary/20" asChild>
                      <Link href="/#contact">
                        Get a Technical Consultation <ArrowRight className="ml-3 size-6" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-2xl font-bold h-16 px-10 text-lg border-white/20 text-white hover:bg-white/10" asChild>
                      <Link href="/#products">View Lined Catalog</Link>
                    </Button>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-[3rem] p-12 mb-20 border border-border">
                  <h2 className="text-3xl font-bold text-primary mb-12 flex items-center gap-4">
                    <HelpCircle className="text-secondary size-8" />
                    Frequently Asked Questions
                  </h2>
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    <AccordionItem value="item-1" className="border-none bg-white rounded-2xl px-8 shadow-sm">
                      <AccordionTrigger className="text-left font-bold text-primary py-6 hover:no-underline">Which is more durable, PFA or FEP lined valves?</AccordionTrigger>
                      <AccordionContent className="text-foreground/70 text-lg leading-relaxed pb-8">
                        PFA typically has a higher flex life and better thermal stability, making it more durable in extreme or cyclic conditions. However, FEP is excellent for many standard corrosive duties.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-none bg-white rounded-2xl px-8 shadow-sm">
                      <AccordionTrigger className="text-left font-bold text-primary py-6 hover:no-underline">Can FEP lining handle all chemicals?</AccordionTrigger>
                      <AccordionContent className="text-foreground/70 text-lg leading-relaxed pb-8">
                        FEP is resistant to most chemicals, but it has lower resistance to some aggressive organic solvents and high temperatures compared to PFA. Always check a compatibility chart for your specific fluid.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-none bg-white rounded-2xl px-8 shadow-sm">
                      <AccordionTrigger className="text-left font-bold text-primary py-6 hover:no-underline">Is PFE always worth the extra cost?</AccordionTrigger>
                      <AccordionContent className="text-foreground/70 text-lg leading-relaxed pb-8">
                        If your process operates near or above 150°C, or if the fluid is exceptionally aggressive, PFA is essential. For standard corrosive service at lower temperatures, FEP provides the same safety at a lower cost.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-none bg-white rounded-2xl px-8 shadow-sm">
                      <AccordionTrigger className="text-left font-bold text-primary py-6 hover:no-underline">What info should I provide for a quote?</AccordionTrigger>
                      <AccordionContent className="text-foreground/70 text-lg leading-relaxed pb-8">
                        Provide the fluid name, concentration, operating temperature and pressure, pipe size, and connection standard.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </article>
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-32 self-start space-y-8">
              <div className="bg-neutral-50 rounded-[2.5rem] p-10 border border-border shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-white shadow-lg shadow-secondary/20">
                    <MessageSquare className="size-7" />
                  </div>
                  <h3 className="font-bold text-2xl text-primary m-0">Need Help?</h3>
                </div>
                <p className="text-foreground/60 text-base mb-10 leading-relaxed mb-[15px]">
                  Unsure which lining fits your process? Our engineers can analyze your media details and recommend the optimal PFA or FEP solution.
                </p>
                <div className="space-y-4">
                  <Button className="w-full h-14 rounded-2xl font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/10" asChild>
                    <Link href="/#contact">Consult an Engineer</Link>
                  </Button>
                </div>
              </div>

              <Card className="bg-primary p-10 rounded-[2.5rem] text-white border-none shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -left-10 size-40 bg-white/5 rounded-full" />
                <CardContent className="p-0 relative z-10">
                  <Info className="size-10 text-secondary mb-6" />
                  <h4 className="font-bold text-xl mb-4">Precision Lining</h4>
                  <p className="text-white/60 text-[15px] leading-relaxed mb-0">
                    AMCO uses high-density fluoropolymer resins and advanced molding techniques to ensure uniform lining thickness and zero porosity.
                  </p>
                </CardContent>
              </Card>
              
              <div className="p-8 border border-border rounded-[2rem] bg-white">
                <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <Activity className="size-4 text-secondary" />
                  Related Products
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { label: "Lined Ball Valves", href: "/products/ptfe-lined-ball-valve" },
                    { label: "Lined Butterfly Valves", href: "/products/ptfe-lined-butterfly-valve/wafer-centric-disc-design" },
                    { label: "Lined Diaphragm Valves", href: "/products/ptfe-lined-diaphragm-valve" },
                    { label: "Lined Check Valves", href: "/products/ptfe-lined-wafer-check-valve" },
                  ].map((link, i) => (
                    <Link key={i} href={link.href} className="flex items-center justify-between text-sm text-foreground/50 hover:text-secondary transition-colors py-2 group">
                      {link.label}
                      <ChevronRight className="size-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
