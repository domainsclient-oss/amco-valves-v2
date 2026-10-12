import { Metadata } from "next";
import Link from "link";
import Image from "next/image";
import { ChevronRight, Droplets, Info, HelpCircle, Settings, Activity, Wrench, ArrowRight, MessageSquare, CheckCircle2, Layout } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images.json";

export const metadata: Metadata = {
  title: "Industrial Valves for Water Treatment: Selection Guide | AMCO Valves",
  description: "Choosing valves for water and wastewater treatment? Learn how to select butterfly, check, knife gate and diaphragm valves for reliable operation.",
  keywords: [
    "industrial valves for water treatment",
    "wastewater treatment valves",
    "butterfly valves for water treatment",
    "knife gate valves for slurry",
    "check valves for water pipelines",
    "industrial valve manufacturer in India"
  ],
};

export default function WaterTreatmentBlogPage() {
  const heroImg = placeholderImages.find(img => img.id === "blog-water-hero");
  const midImg = placeholderImages.find(img => img.id === "blog-water-valves");

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-5 md:px-[63px] bg-gradient-to-br from-white via-blue-50/30 to-neutral-100 overflow-hidden border-b-4 border-secondary/10">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <Image
            src={heroImg?.imageUrl || "/blog/hero-bg-blog1.webp"}
            alt="Water Treatment Header"
            fill
            className="object-cover"
            data-ai-hint="water treatment"
          />
        </div>
        <div className="container mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-foreground/60 mb-6">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <span className="text-foreground/40">Blog</span>
            <ChevronRight className="size-4" />
            <span className="text-secondary font-bold">Industrial Valves Selection</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
            <Droplets className="size-3.5" /> Industry Selection Guide
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary max-w-5xl leading-tight mb-8">
            How to Choose the Right Industrial Valve for Water and Wastewater Treatment Plants
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl leading-relaxed mb-[15px]">
            Selecting valves for treatment facilities requires understanding the fluid characteristics, operating conditions, and the specific role of each pipeline.
          </p>
        </div>
      </div>

      {/* Article Content */}
      <section className="py-12 md:py-24 px-5 md:px-[63px]">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-8">
              <article className="prose prose-neutral max-w-none prose-headings:text-primary prose-headings:font-bold prose-p:text-foreground/80 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-[15px]">
                <p className="text-xl md:text-2xl text-primary font-semibold leading-snug mb-[15px]">
                  A valve that works perfectly in a clean water pipeline may not last long in a wastewater treatment plant.
                </p>

                <p className="mb-[15px]">
                  The difference often comes down to what is flowing through the pipeline. Clean water, untreated sewage, chemical dosing solutions and sludge all behave differently. Each places different demands on the valve body, seat, sealing arrangement and operating mechanism.
                </p>

                <p className="mb-[15px]">
                  For plant engineers and procurement teams, selecting industrial valves for water treatment is therefore not simply a matter of matching pipe size and pressure rating.
                </p>

                <p className="mb-[15px]">
                  The right valve must suit the fluid, the operating conditions and the work it is expected to perform.
                </p>

                <h2 className="text-2xl font-bold mt-16 mb-8">
                  Which valves are commonly used in water and wastewater treatment?
                </h2>
                <p className="mb-[15px]">
                  Butterfly valves, check valves, knife gate valves, diaphragm valves and gate valves are among the options used across water and wastewater treatment systems.
                </p>
                
                <p className="mb-[15px]">
                  Their suitability depends on the specific process.
                </p>

                {/* Comparison Table */}
                <div className="my-12 border border-border rounded-2xl md:rounded-[2rem] shadow-xl bg-white overflow-hidden">
                  <div className="bg-primary p-6">
                    <h4 className="text-white font-bold m-0 text-xl">Valve Suitability Matrix</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <Table className="min-w-[600px]">
                      <TableHeader className="bg-neutral-50">
                        <TableRow>
                          <TableHead className="text-primary font-bold h-14">Valve type</TableHead>
                          <TableHead className="text-primary font-bold h-14">Typical application</TableHead>
                          <TableHead className="text-primary font-bold h-14">Main consideration</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="hover:bg-neutral-50/50">
                          <TableCell className="font-bold text-primary">Butterfly valve</TableCell>
                          <TableCell>Water isolation and distribution lines</TableCell>
                          <TableCell>Compact design and operating requirements</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-neutral-50/50">
                          <TableCell className="font-bold text-primary">Check valve</TableCell>
                          <TableCell>Pump discharge pipelines</TableCell>
                          <TableCell>Prevention of reverse flow</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-neutral-50/50">
                          <TableCell className="font-bold text-primary">Knife gate valve</TableCell>
                          <TableCell>Sludge and slurry handling</TableCell>
                          <TableCell>Ability to handle suspended solids</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-neutral-50/50">
                          <TableCell className="font-bold text-primary">Diaphragm valve</TableCell>
                          <TableCell>Selected chemical dosing and process lines</TableCell>
                          <TableCell>Fluid compatibility and diaphragm material</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-neutral-50/50">
                          <TableCell className="font-bold text-primary">Gate valve</TableCell>
                          <TableCell>Pipeline isolation</TableCell>
                          <TableCell>Suitability for fully open or fully closed operation</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <p className="italic text-foreground/60 border-l-4 border-secondary pl-6 py-2 bg-secondary/5 rounded-r-xl mb-[15px]">
                  There is no single valve design that is ideal for every stage of treatment.
                </p>

                <h3 className="text-2xl font-bold mt-16 mb-6">1. Butterfly valves for water distribution and isolation</h3>
                
                <p className="mb-[15px]">
                  Butterfly valves are commonly considered for medium- and large-diameter water pipelines.
                </p>

                <p className="mb-[15px]">
                  Their compact construction can make them practical where installation space matters.
                </p>

                <p className="mb-[15px]">
                  Depending on the design, they can be operated manually or with an actuator.
                </p>

                <p className="mb-[15px]">
                  However, the selection should not stop at the valve diameter.
                </p>

                <p className="mb-[15px]">
                  Engineers should also examine the operating pressure, seat material, water characteristics, required shut-off performance and frequency of operation.
                </p>

                <p className="mb-[15px]">
                  For example, a butterfly valve installed on a clean water distribution line may face different service conditions from one handling treated industrial effluent.
                </p>

                <div className="bg-secondary/10 border-l-8 border-secondary p-6 md:p-8 rounded-r-2xl md:rounded-r-3xl my-10 relative overflow-hidden">
                  <HelpCircle className="absolute -right-4 -bottom-4 size-24 md:size-32 text-secondary/10" />
                  <h4 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Info className="size-5 text-secondary" />
                    When should you consider a butterfly valve?
                  </h4>
                  <p className="text-lg m-0 text-foreground/80 leading-relaxed">
                    A butterfly valve is worth evaluating when the application calls for a compact isolation valve, particularly on larger pipelines. The final choice should be based on pressure, temperature, sealing and installation requirements.
                  </p>
                </div>

                <h3 className="text-2xl font-bold mt-16 mb-6">2. Check valves for preventing reverse flow</h3>
                
                <p className="mb-[15px]">
                  Reverse flow is an important concern in pumping systems.
                </p>

                <p className="mb-[15px]">
                  When a pump stops, the pressure conditions in a pipeline can change. Without appropriate protection, fluid may flow backwards through the system.
                </p>

                <p className="mb-[15px]">
                  A check valve is designed to permit flow in one direction and restrict reverse flow.
                </p>

                <p className="mb-[15px]">
                  Water treatment applications may use different check valve designs, including wafer, dual plate and non-slam check valves.
                </p>

                <p className="mb-[15px]">
                  The important distinction is that these designs do not necessarily behave the same way during pump shutdown.
                </p>

                <p className="mb-[15px]">
                  Valve closing characteristics, installation orientation, flow velocity and system dynamics all influence performance.
                </p>

                <div className="bg-primary/5 border border-primary/10 p-6 md:p-8 rounded-2xl md:rounded-3xl my-10">
                  <h4 className="text-xl font-bold text-primary mb-4">Does a non-slam check valve eliminate water hammer?</h4>
                  <p className="text-base text-foreground/70 leading-relaxed mb-[15px]">
                    Not necessarily. A properly selected non-slam check valve can help reduce the risk of valve-slam-related pressure surges, but water hammer depends on the entire piping system. 
                  </p>
                  <p className="text-base text-foreground/70 leading-relaxed mb-[15px]">
                    Pump characteristics, pipeline length, flow velocity and transient pressure conditions must also be considered.
                  </p>
                </div>

                <div className="relative aspect-video rounded-2xl md:rounded-[2.5rem] overflow-hidden my-16 shadow-2xl">
                  <Image
                    src={midImg?.imageUrl || "/blog/Water-treatment-Industrials-valve.webp"}
                    alt="Industrial Valve Pipeline"
                    fill
                    className="object-cover"
                    data-ai-hint="industrial valves"
                  />
                </div>

                <h3 className="text-2xl font-bold mt-16 mb-6">3. Knife gate valves for sludge and slurry handling</h3>
                
                <p className="mb-[15px]">
                  Sludge handling creates challenges that are not normally encountered in clean water pipelines.
                </p>

                <p className="mb-[15px]">
                  Suspended solids, fibrous material and variations in slurry concentration can affect how a valve opens, closes and seals.
                </p>

                <p className="mb-[15px]">
                  Knife gate valves are often considered for these services because their design can be suited to certain fluids containing suspended solids.
                </p>

                <p className="mb-[15px]">
                  However, not every knife gate valve is suitable for every sludge application.
                </p>

                <p className="mb-[15px]">
                  The selection should account for solids concentration, particle characteristics, pressure differential, direction of flow and required sealing performance.
                </p>

                <p className="mb-[15px]">
                  Unidirectional and bidirectional knife gate valves also have different application considerations.
                </p>

                <p className="mb-[15px]">
                  Before placing an order, confirm whether the valve is intended to isolate pressure from one direction or both.
                </p>

                <h3 className="text-2xl font-bold mt-16 mb-6">4. Diaphragm valves for selected chemical treatment lines</h3>
                
                <p className="mb-[15px]">
                  Chemical dosing is another area where valve selection requires care.
                </p>

                <p className="mb-[15px]">
                  Treatment plants may handle chemicals for disinfection, pH adjustment, coagulation or other processes.
                </p>

                <p className="mb-[15px]">
                  Depending on the chemical, concentration and operating temperature, a diaphragm valve may be an appropriate choice.
                </p>

                <p className="mb-[15px]">
                  Its suitability depends heavily on the diaphragm and lining materials.
                </p>

                <p className="mb-[15px]">
                  A valve that is compatible with one treatment chemical may not be suitable for another.
                </p>

                <p className="mb-[15px]">
                  For this reason, material compatibility should always be confirmed using the actual chemical concentration and operating conditions rather than the chemical name alone.
                </p>

                <h2 className="text-2xl md:text-3xl mt-20 mb-10 text-primary border-b border-border pb-4">
                  Five details to confirm before ordering a water treatment valve
                </h2>
                <div className="grid md:grid-cols-1 gap-6 my-10">
                  {[
                    { icon: Droplets, label: "Fluid", desc: "Is the pipeline carrying clean water, wastewater, sludge or a chemical solution?" },
                    { icon: Activity, label: "Operating Conditions", desc: "What are the normal and maximum pressure and temperature?" },
                    { icon: Settings, label: "Valve Function", desc: "Is the valve required for isolation, thinning or reverse-flow prevention?" },
                    { icon: Layout, label: "Installation", desc: "What are the pipe size, connection type, available space and orientation?" },
                    { icon: Wrench, label: "Operation", desc: "Will the valve be operated manually, pneumatically or electrically?" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 md:gap-6 p-6 md:p-8 bg-neutral-50 border border-border rounded-2xl md:rounded-3xl transition-all hover:bg-white hover:shadow-lg group">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white flex items-center justify-center text-secondary shadow-sm group-hover:bg-secondary group-hover:text-white transition-colors shrink-0">
                        <item.icon className="size-6 md:size-7" />
                      </div>
                      <div>
                        <span className="font-bold text-primary text-lg md:text-xl block mb-2">{item.label}</span>
                        <p className="text-sm md:text-base text-foreground/60 m-0 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mb-[15px]">
                  These details help narrow the selection and reduce the risk of specifying a valve that is unsuitable for the actual service.
                </p>

                <h2 className="text-2xl font-bold mt-20 mb-6">Why valve selection affects maintenance costs</h2>
                
                <p className="mb-[15px]">
                  The purchase price of a valve is only one part of its overall cost.
                </p>

                <p className="mb-[15px]">
                  A poorly matched valve may lead to repeated seat damage, leakage, difficult operation or premature replacement.
                </p>

                <p className="mb-[15px]">
                  In a treatment plant, maintenance may also require isolating sections of the process or temporarily stopping equipment.
                </p>

                <p className="mb-[15px]">
                  That is why selecting the right valve at the procurement stage can be more valuable than simply choosing the lowest-priced option.
                </p>

                <h2 className="text-2xl font-bold mt-20 mb-6">Industrial valve solutions from AMCO</h2>
                
                <p className="mb-[15px]">
                  AMCO Industrial Valves manufactures a range of valves used across industrial applications, including sewage, effluent and water treatment.
                </p>

                <p className="mb-[15px]">
                  Its product portfolio includes butterfly valves, knife edge gate valves, wafer check valves, dual plate check valves, non-slam check valves, diaphragm valves and other industrial flow-control products.
                </p>

                <p className="mb-[15px]">
                  The appropriate configuration depends on the application and operating requirements.
                </p>

                <h2 className="text-2xl font-bold mt-20 mb-6">Planning a water or wastewater treatment project?</h2>
                
                <p className="mb-[15px]">
                  Share your fluid details, operating pressure, temperature, pipeline size and valve function with the AMCO team.
                </p>

                <div className="bg-primary text-white p-8 md:p-12 rounded-3xl md:rounded-[3rem] my-20 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <p className="text-white/70 text-base md:text-lg mb-10 leading-relaxed relative z-10">
                    Contact AMCO Industrial Valves to discuss a suitable valve configuration and request technical specifications or a quotation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                    <Button variant="secondary" size="lg" className="rounded-2xl font-bold h-14 md:h-16 px-8 md:px-10 text-base md:text-lg shadow-xl shadow-secondary/20 w-full sm:w-auto" asChild>
                      <Link href="/#contact">
                        Request a Quote <ArrowRight className="ml-3 size-5 md:size-6" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-2xl font-bold h-14 md:h-16 px-8 md:px-10 text-base md:text-lg border-white/20 text-white hover:bg-white/10 w-full sm:w-auto" asChild>
                      <Link href="/#products">Explore Catalog</Link>
                    </Button>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-3xl md:rounded-[3rem] p-8 md:p-12 mb-20 border border-border">
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-12 flex items-center gap-4">
                    <HelpCircle className="text-secondary size-7 md:size-8" />
                    Frequently Asked Questions
                  </h2>
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    <AccordionItem value="item-1" className="border-none bg-white rounded-2xl px-6 md:px-8 shadow-sm">
                      <AccordionTrigger className="text-left font-bold text-primary py-6 hover:no-underline text-base md:text-lg">Which valve is best for wastewater treatment?</AccordionTrigger>
                      <AccordionContent className="text-foreground/70 text-base md:text-lg leading-relaxed pb-8">
                        There is no single best valve for all wastewater treatment applications. Butterfly valves may suit certain water isolation duties, knife gate valves may be considered for sludge handling, and check valves help prevent reverse flow in pumping systems.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-none bg-white rounded-2xl px-6 md:px-8 shadow-sm">
                      <AccordionTrigger className="text-left font-bold text-primary py-6 hover:no-underline text-base md:text-lg">What is the difference between a butterfly valve and a knife gate valve?</AccordionTrigger>
                      <AccordionContent className="text-foreground/70 text-base md:text-lg leading-relaxed pb-8">
                        <p className="mb-[15px]">A butterfly valve uses a rotating disc to control flow, while a knife gate valve uses a sliding gate. Their suitability depends on the fluid, solids content, pressure and sealing requirements.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-none bg-white rounded-2xl px-6 md:px-8 shadow-sm">
                      <AccordionTrigger className="text-left font-bold text-primary py-6 hover:no-underline text-base md:text-lg">Why are check valves used in water treatment plants?</AccordionTrigger>
                      <AccordionContent className="text-foreground/70 text-base md:text-lg leading-relaxed pb-8">
                        <p className="mb-[15px]">Check valves help prevent reverse flow, particularly in pumping systems where flow direction may change after a pump stops.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-none bg-white rounded-2xl px-6 md:px-8 shadow-sm">
                      <AccordionTrigger className="text-left font-bold text-primary py-6 hover:no-underline text-base md:text-lg">Can butterfly valves be automated?</AccordionTrigger>
                      <AccordionContent className="text-foreground/70 text-base md:text-lg leading-relaxed pb-8">
                        <p className="mb-[15px]">Yes. Suitable butterfly valve configurations can be fitted with pneumatic or electric actuators, subject to valve design, torque requirements and operating conditions.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className="border-none bg-white rounded-2xl px-6 md:px-8 shadow-sm">
                      <AccordionTrigger className="text-left font-bold text-primary py-6 hover:no-underline text-base md:text-lg">What information should I provide when requesting a valve quotation?</AccordionTrigger>
                      <AccordionContent className="text-foreground/70 text-base md:text-lg leading-relaxed pb-8">
                        <p className="mb-[15px]">Provide the fluid type, pipe size, pressure, temperature, connection requirements, preferred material, operation method and applicable project specifications.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </article>
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-32 self-start space-y-8 mt-12 lg:mt-0">
              <div className="bg-neutral-50 rounded-3xl md:rounded-[2.5rem] p-8 md:p-10 border border-border shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-secondary flex items-center justify-center text-white shadow-lg shadow-secondary/20">
                    <MessageSquare className="size-6 md:size-7" />
                  </div>
                  <h3 className="font-bold text-xl md:text-2xl text-primary m-0">Expert Advice</h3>
                </div>
                <p className="text-foreground/60 text-sm md:text-base mb-10 leading-relaxed">
                  Planning a water or wastewater treatment project? Share your pipeline details with the AMCO engineering team for a custom valve configuration.
                </p>
                <div className="space-y-4">
                  <Button className="w-full h-14 rounded-2xl font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/10" asChild>
                    <Link href="/#contact">Contact Our Engineers</Link>
                  </Button>
                  <Button variant="outline" className="w-full h-14 rounded-2xl font-bold border-secondary text-secondary hover:bg-secondary/5" asChild>
                    <Link href="/#products">Browse Catalog</Link>
                  </Button>
                </div>
              </div>

              <Card className="bg-primary p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] text-white border-none shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -left-10 size-40 bg-white/5 rounded-full" />
                <CardContent className="p-0 relative z-10">
                  <Info className="size-8 md:size-10 text-secondary mb-6" />
                  <h4 className="font-bold text-xl mb-4">India's Leading Manufacturer</h4>
                  <p className="text-white/60 text-sm md:text-[15px] leading-relaxed mb-0">
                    AMCO Industrial Valves has been delivering precision solutions since 1986, specialized in IBR and Non IBR valves for global utility and industrial sectors.
                  </p>
                </CardContent>
              </Card>
              
              <div className="p-6 md:p-8 border border-border rounded-2xl md:rounded-[2rem] bg-white">
                <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <Activity className="size-4 text-secondary" />
                  Quick Links
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { label: "Butterfly Valves", href: "/#products" },
                    { label: "Knife Edge Gate Valves", href: "/#products" },
                    { label: "Dual Plate Check Valves", href: "/#products" },
                    { label: "Non-Slam Check Valves", href: "/#products" },
                  ].map((link, i) => (
                    <Link key={i} href={link.href} className="flex items-center justify-between text-xs md:text-sm text-foreground/50 hover:text-secondary transition-colors py-2 group">
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
