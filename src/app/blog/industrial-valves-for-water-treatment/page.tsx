
import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, CheckCircle2, MessageSquare, ArrowRight, Droplets, Info } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  alternates: {
    canonical: "/blog/industrial-valves-for-water-treatment/",
  },
};

export default function WaterTreatmentBlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="bg-neutral-50 pt-32 pb-8 px-5 md:px-[63px]">
        <div className="container mx-auto">
          <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-foreground/60 mb-4">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <span className="text-foreground/40">Blog</span>
            <ChevronRight className="size-4" />
            <span className="text-primary font-bold">Industrial Valves for Water Treatment</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
            <Droplets className="size-3" /> Industry Guide
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary max-w-4xl leading-tight">
            How to Choose the Right Industrial Valve for Water and Wastewater Treatment Plants
          </h1>
        </div>
      </div>

      {/* Article Content */}
      <section className="py-12 md:py-20 px-5 md:px-[63px]">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <article className="prose prose-neutral max-w-none prose-headings:text-primary prose-headings:font-bold prose-p:text-foreground/80 prose-p:text-lg prose-p:leading-relaxed">
                <p className="text-xl text-foreground/70 font-medium mb-8">
                  A valve that works perfectly in a clean water pipeline may not last long in a wastewater treatment plant.
                </p>

                <p>
                  The difference often comes down to what is flowing through the pipeline. Clean water, untreated sewage, chemical dosing solutions and sludge all behave differently. Each places different demands on the valve body, seat, sealing arrangement and operating mechanism.
                </p>

                <p>
                  For plant engineers and procurement teams, selecting industrial valves for water treatment is therefore not simply a matter of matching pipe size and pressure rating. The right valve must suit the fluid, the operating conditions and the work it is expected to perform.
                </p>

                <h2 className="text-2xl md:text-3xl mt-12 mb-6">Which valves are commonly used in water and wastewater treatment?</h2>
                <p>
                  Butterfly valves, check valves, knife gate valves, diaphragm valves and gate valves are among the options used across water and wastewater treatment systems. Their suitability depends on the specific process.
                </p>

                {/* Comparison Table */}
                <div className="my-10 overflow-hidden border border-border rounded-2xl shadow-sm bg-white">
                  <Table>
                    <TableHeader className="bg-primary hover:bg-primary">
                      <TableRow>
                        <TableHead className="text-white font-bold h-14">Valve type</TableHead>
                        <TableHead className="text-white font-bold h-14">Typical application</TableHead>
                        <TableHead className="text-white font-bold h-14">Main consideration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-bold">Butterfly valve</TableCell>
                        <TableCell>Water isolation and distribution lines</TableCell>
                        <TableCell>Compact design and operating requirements</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold">Check valve</TableCell>
                        <TableCell>Pump discharge pipelines</TableCell>
                        <TableCell>Prevention of reverse flow</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold">Knife gate valve</TableCell>
                        <TableCell>Sludge and slurry handling</TableCell>
                        <TableCell>Ability to handle suspended solids</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold">Diaphragm valve</TableCell>
                        <TableCell>Selected chemical dosing and process lines</TableCell>
                        <TableCell>Fluid compatibility and diaphragm material</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold">Gate valve</TableCell>
                        <TableCell>Pipeline isolation</TableCell>
                        <TableCell>Suitability for fully open or fully closed operation</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <p className="italic text-foreground/60 mb-12">
                  There is no single valve design that is ideal for every stage of treatment.
                </p>

                <h3 className="text-xl md:text-2xl mt-12">1. Butterfly valves for water distribution and isolation</h3>
                <p>
                  <Link href="/products/butterfly-valve/centric-disc-design/wafer-semi-lugged-pn10-pn16-pn20-pn25" className="text-secondary font-bold hover:underline">Butterfly valves</Link> are commonly considered for medium- and large-diameter water pipelines. Their compact construction can make them practical where installation space matters. Depending on the design, they can be operated manually or with an actuator.
                </p>
                <p>
                  However, the selection should not stop at the valve diameter. Engineers should also examine the operating pressure, seat material, water characteristics, required shut-off performance and frequency of operation.
                </p>

                <div className="bg-secondary/5 border border-secondary/20 p-6 rounded-2xl my-8">
                  <h4 className="text-lg font-bold text-primary mb-3">When should you consider a butterfly valve?</h4>
                  <p className="text-base m-0">
                    A butterfly valve is worth evaluating when the application calls for a compact isolation valve, particularly on larger pipelines. The final choice should be based on pressure, temperature, sealing and installation requirements.
                  </p>
                </div>

                <h3 className="text-xl md:text-2xl mt-12">2. Check valves for preventing reverse flow</h3>
                <p>
                  Reverse flow is an important concern in pumping systems. When a pump stops, the pressure conditions in a pipeline can change. Without appropriate protection, fluid may flow backwards through the system.
                </p>
                <p>
                  A <Link href="/products/dual-plate-check-valve/wafer-type-resilient-seat-pn16" className="text-secondary font-bold hover:underline">check valve</Link> is designed to permit flow in one direction and restrict reverse flow. Water treatment applications may use different check valve designs, including wafer, dual plate and <Link href="/products/wafer-check-valve/resilient-seat" className="text-secondary font-bold hover:underline">non-slam check valves</Link>.
                </p>

                <h3 className="text-xl md:text-2xl mt-12">3. Knife gate valves for sludge and slurry handling</h3>
                <p>
                  Sludge handling creates challenges that are not normally encountered in clean water pipelines. Suspended solids, fibrous material and variations in slurry concentration can affect how a valve opens, closes and seals.
                </p>
                <p>
                  <Link href="/products/knife-edge-gate-valve/uni-directional/wafer-lugged-resilient-seat-pn10" className="text-secondary font-bold hover:underline">Knife gate valves</Link> are often considered for these services because their design can be suited to certain fluids containing suspended solids. However, not every knife gate valve is suitable for every sludge application. The selection should account for solids concentration, particle characteristics, pressure differential, direction of flow and required sealing performance.
                </p>

                <h3 className="text-xl md:text-2xl mt-12">4. Diaphragm valves for selected chemical treatment lines</h3>
                <p>
                  Chemical dosing is another area where valve selection requires care. Treatment plants may handle chemicals for disinfection, pH adjustment, coagulation or other processes. Depending on the chemical, concentration and operating temperature, a <Link href="/products/diaphragm-valve/unlined-and-lined" className="text-secondary font-bold hover:underline">diaphragm valve</Link> may be an appropriate choice.
                </p>

                <h2 className="text-2xl md:text-3xl mt-16 mb-8">Five details to confirm before ordering a water treatment valve</h2>
                <div className="grid md:grid-cols-2 gap-6 my-10">
                  {[
                    { label: "Fluid", desc: "Is the pipeline carrying clean water, wastewater, sludge or a chemical solution?" },
                    { label: "Operating Conditions", desc: "What are the normal and maximum pressure and temperature?" },
                    { label: "Valve Function", desc: "Is the valve required for isolation, throttling or reverse-flow prevention?" },
                    { label: "Installation", desc: "What are the pipe size, connection type, available space and orientation?" },
                    { label: "Operation", desc: "Will the valve be operated manually, pneumatically or electrically?" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-white border border-border rounded-2xl shadow-sm">
                      <CheckCircle2 className="size-6 text-secondary shrink-0" />
                      <div>
                        <span className="font-bold text-primary block mb-1">{item.label}</span>
                        <p className="text-sm text-foreground/60 m-0">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl md:text-3xl mt-16 mb-6">Why valve selection affects maintenance costs</h2>
                <p>
                  The purchase price of a valve is only one part of its overall cost. A poorly matched valve may lead to repeated seat damage, leakage, difficult operation or premature replacement.
                </p>
                <p>
                  In a treatment plant, maintenance may also require isolating sections of the process or temporarily stopping equipment. That is why selecting the right valve at the procurement stage can be more valuable than simply choosing the lowest-priced option.
                </p>

                <div className="bg-primary text-white p-10 rounded-[2.5rem] my-16 shadow-xl">
                  <h2 className="text-white text-2xl md:text-3xl mt-0 mb-6 font-bold">Industrial valve solutions from AMCO</h2>
                  <p className="text-white/80 text-lg mb-8">
                    AMCO Industrial Valves manufactures a range of valves used across industrial applications, including sewage, effluent and water treatment. Its product portfolio includes butterfly valves, knife edge gate valves, wafer check valves, and other flow-control products.
                  </p>
                  <Button variant="secondary" size="lg" className="rounded-xl font-bold h-14 px-8" asChild>
                    <Link href="/#contact">
                      Request Technical Specifications <ArrowRight className="ml-2 size-5" />
                    </Link>
                  </Button>
                </div>

                <h2 className="text-2xl md:text-3xl mt-16 mb-10 border-b pb-4 border-border">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full mb-20">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left font-bold text-primary py-5">Which valve is best for wastewater treatment?</AccordionTrigger>
                    <AccordionContent className="text-foreground/70 text-base leading-relaxed">
                      There is no single best valve for all wastewater treatment applications. Butterfly valves may suit certain water isolation duties, knife gate valves may be considered for sludge handling, and check valves help prevent reverse flow in pumping systems.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left font-bold text-primary py-5">What is the difference between a butterfly valve and a knife gate valve?</AccordionTrigger>
                    <AccordionContent className="text-foreground/70 text-base leading-relaxed">
                      A butterfly valve uses a rotating disc to control flow, while a knife gate valve uses a sliding gate. Their suitability depends on the fluid, solids content, pressure and sealing requirements.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left font-bold text-primary py-5">Why are check valves used in water treatment plants?</AccordionTrigger>
                    <AccordionContent className="text-foreground/70 text-base leading-relaxed">
                      Check valves help prevent reverse flow, particularly in pumping systems where flow direction may change after a pump stops.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left font-bold text-primary py-5">Can butterfly valves be automated?</AccordionTrigger>
                    <AccordionContent className="text-foreground/70 text-base leading-relaxed">
                      Yes. Suitable butterfly valve configurations can be fitted with pneumatic or electric actuators, subject to valve design, torque requirements and operating conditions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left font-bold text-primary py-5">What information should I provide when requesting a valve quotation?</AccordionTrigger>
                    <AccordionContent className="text-foreground/70 text-base leading-relaxed">
                      Provide the fluid type, pipe size, pressure, temperature, connection requirements, preferred material, operation method and applicable project specifications.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </article>
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
              <div className="bg-neutral-50 rounded-3xl p-8 border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-white">
                    <MessageSquare className="size-5" />
                  </div>
                  <h3 className="font-bold text-xl text-primary m-0">Need Expert Advice?</h3>
                </div>
                <p className="text-foreground/60 text-sm mb-8 leading-relaxed">
                  Planning a water or wastewater treatment project? Share your pipeline details with the AMCO team for a custom valve configuration.
                </p>
                <div className="space-y-4">
                  <Button className="w-full h-12 rounded-xl font-bold bg-primary text-white hover:bg-primary/90" asChild>
                    <Link href="/#contact">Contact Our Engineers</Link>
                  </Button>
                  <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-secondary text-secondary hover:bg-secondary/5" asChild>
                    <Link href="/#products">Browse Product Catalog</Link>
                  </Button>
                </div>
              </div>

              <div className="mt-8 bg-primary p-8 rounded-3xl text-white">
                <Info className="size-8 text-secondary mb-4" />
                <h4 className="font-bold text-lg mb-2">India's Leading Manufacturer</h4>
                <p className="text-white/60 text-sm">
                  AMCO Industrial Valves has been delivering precision solutions since 1986, specialized in IBR and Non-IBR valves for global utility and industrial sectors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
