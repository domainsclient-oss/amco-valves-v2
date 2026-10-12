import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Info, HelpCircle, Activity, ArrowRight, MessageSquare, ShieldAlert, X } from "lucide-react";
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

                <h2 className="text-2xl font-bold mt-16 mb-8">Which valve types are available with chemical-resistant linings?</h2>

                <p className="mb-[15px]">Several industrial valve designs can be manufactured with fluoropolymer linings.</p>

                <p className="mb-[15px]">The correct design depends on the function required in the pipeline.</p>

                <h3 className="text-xl font-bold mt-8 mb-4">Lined ball valves</h3>

                <p className="mb-[15px]">Lined ball valves are commonly considered for on/off isolation duties.</p>

                <p className="mb-[15px]">Their quarter-turn operation can make them practical where relatively quick opening and closing is required.</p>

                <p className="mb-[15px]">Selection must account for the process fluid, operating conditions, sealing arrangement and compatibility of wetted components.</p>

                <h3 className="text-xl font-bold mt-8 mb-4">Lined butterfly valves</h3>

                <p className="mb-[15px]">Lined butterfly valves may be considered for chemical service in suitable pipeline sizes and pressure conditions.</p>

                <p className="mb-[15px]">The valve's disc, liner and sealing arrangement require particular attention because these components can be exposed to the process fluid.</p>

                <h3 className="text-xl font-bold mt-8 mb-4">Lined plug valves</h3>

                <p className="mb-[15px]">Lined plug valves are another option for chemical isolation applications.</p>

                <p className="mb-[15px]">Their suitability depends on the valve design, lining construction and service conditions.</p>

                <h3 className="text-xl font-bold mt-8 mb-4">Lined check valves</h3>

                <p className="mb-[15px]">Where reverse-flow prevention is required, lined check valves may be considered.</p>

                <p className="mb-[15px]">However, their operating characteristics must also suit the process, including flow conditions and installation requirements.</p>

                <h2 className="text-2xl font-bold mt-16 mb-8">Five questions to ask before selecting a lined valve</h2>

                <h3 className="text-xl font-bold mt-8 mb-4">1. What chemical will the valve handle?</h3>
                <p className="mb-[15px]">Identify the exact chemical rather than describing the fluid simply as acidic or corrosive.</p>
                <p className="mb-[15px]">Where relevant, provide details of mixtures and contaminants.</p>

                <h3 className="text-xl font-bold mt-8 mb-4">2. What is the chemical concentration?</h3>
                <p className="mb-[15px]">Chemical compatibility may change with concentration.</p>
                <p className="mb-[15px]">A material suitable for a dilute solution may not necessarily be appropriate for a more concentrated process stream.</p>

                <h3 className="text-xl font-bold mt-8 mb-4">3. What are the operating and maximum temperatures?</h3>
                <p className="mb-[15px]">Normal temperature is important, but so are cleaning cycles, process fluctuations and occasional temperature excursions.</p>
                <p className="mb-[15px]">The complete valve must be suitable for the specified conditions.</p>

                <h3 className="text-xl font-bold mt-8 mb-4">4. What pressure conditions will the valve experience?</h3>
                <p className="mb-[15px]">Pressure rating, temperature and valve construction must be evaluated together.</p>
                <p className="mb-[15px]">Do not assume that every valve using the same lining material has the same pressure capability.</p>

                <h3 className="text-xl font-bold mt-8 mb-4">5. Is the valve required for isolation or flow control?</h3>
                <p className="mb-[15px]">An isolation valve and a throttling valve may require different designs.</p>
                <p className="mb-[15px]">Choosing a valve based only on chemical resistance can overlook the actual operating function.</p>

                <h2 className="text-2xl font-bold mt-16 mb-8">Why the complete valve construction matters</h2>

                <p className="mb-[15px]">A chemical-resistant lining is important, but it is not the only factor affecting valve reliability.</p>

                <p className="mb-[15px]">The lining must remain intact during installation and operation. Seals, interfaces and other wetted components must also be compatible with the process fluid.</p>

                <p className="mb-[15px]">For example, a valve with a suitable lining may still be unsuitable if another component exposed to the fluid cannot tolerate the chemical or temperature.</p>

                <p className="mb-[15px]">This is one reason why engineering teams should review the complete material specification rather than relying only on the term "chemical-resistant valve."</p>

                <h2 className="text-2xl font-bold mt-16 mb-8">PFA and FEP lined valve solutions from AMCO</h2>

                <p className="mb-[15px]">AMCO Industrial Valves offers PFA/FEP lined valve configurations within its industrial product portfolio.</p>

                <p className="mb-[15px]">These include lined ball valves, butterfly valves, diaphragm valves, plug valves and check valves.</p>

                <p className="mb-[15px]">For example, AMCO's published PFA/FEP lined butterfly valve specifications include wafer-type configurations, with details on size range, body material, pressure rating and applicable manufacturing and testing standards.</p>

                <p className="mb-[15px]">The suitability of each configuration should be confirmed against the specific chemical service.</p>

                <div className="bg-primary text-white p-12 rounded-[3rem] my-20 shadow-2xl relative overflow-hidden text-center">
                  <h2 className="text-white text-3xl md:text-4xl mt-0 mb-8 font-bold">Looking for a lined valve for your chemical process?</h2>
                  <p className="text-white/70 text-lg mb-[15px] leading-relaxed max-w-2xl mx-auto">
                    Choosing between PFA and FEP starts with understanding the chemical, concentration, temperature, pressure and operating requirements.
                  </p>
                  <p className="text-white/70 text-lg mb-10 leading-relaxed max-w-2xl mx-auto mb-[15px]">
                    Share your application details with AMCO Industrial Valves to discuss available lined valve configurations and request the relevant technical datasheet or quotation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button variant="secondary" size="lg" className="rounded-2xl font-bold h-16 px-10 text-lg shadow-xl shadow-secondary/20" asChild>
                      <Link href="/#contact">
                        Get a Technical Consultation <ArrowRight className="ml-3 size-6" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-2xl font-bold h-16 px-10 text-lg border-white/20 text-white hover:bg-white/10" asChild>
                      <Link href="/#products">Explore Lined Catalog</Link>
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
                      <AccordionTrigger className="text-left font-bold text-primary py-6 hover:no-underline">What is the main difference between PFA and FEP lined valves?</AccordionTrigger>
                      <AccordionContent className="text-foreground/70 text-lg leading-relaxed pb-8">
                        <p className="mb-[15px]">Both use chemically resistant fluoropolymers. PFA generally offers higher material temperature capability, while FEP can be suitable for many chemical applications within its specified limits.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-none bg-white rounded-2xl px-8 shadow-sm">
                      <AccordionTrigger className="text-left font-bold text-primary py-6 hover:no-underline">Are PFA lined valves suitable for corrosive chemicals?</AccordionTrigger>
                      <AccordionContent className="text-foreground/70 text-lg leading-relaxed pb-8">
                        <p className="mb-[15px]">PFA lined valves can be suitable for many corrosive chemical services, but compatibility depends on the specific chemical, concentration, temperature, pressure and complete valve construction.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-none bg-white rounded-2xl px-8 shadow-sm">
                      <AccordionTrigger className="text-left font-bold text-primary py-6 hover:no-underline">Is PFA always better than FEP?</AccordionTrigger>
                      <AccordionContent className="text-foreground/70 text-lg leading-relaxed pb-8">
                        <p className="mb-[15px]">No. PFA and FEP have different properties, but the best choice depends on the operating conditions and the manufacturer's valve specifications.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-none bg-white rounded-2xl px-8 shadow-sm">
                      <AccordionTrigger className="text-left font-bold text-primary py-6 hover:no-underline">Can lined butterfly valves be used in chemical processing?</AccordionTrigger>
                      <AccordionContent className="text-foreground/70 text-lg leading-relaxed pb-8">
                        <p className="mb-[15px]">Yes, where the valve's materials, design, pressure rating and operating characteristics are suitable for the particular chemical service.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className="border-none bg-white rounded-2xl px-8 shadow-sm">
                      <AccordionTrigger className="text-left font-bold text-primary py-6 hover:no-underline">What details are needed to request a lined valve quotation?</AccordionTrigger>
                      <AccordionContent className="text-foreground/70 text-lg leading-relaxed pb-8">
                        <p className="mb-[15px]">The manufacturer will typically need the chemical name, concentration, temperature, pressure, valve size, connection type, required function and any applicable project standards.</p>
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
                <p className="text-foreground/60 text-base mb-10 leading-relaxed">
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
