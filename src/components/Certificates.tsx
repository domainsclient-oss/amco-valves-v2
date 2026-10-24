import Image from "next/image";
import { ShieldCheck, Search, CheckCircle2 } from "lucide-react";
import { defaultHomeContent, type HomeContent } from "@/lib/home-content";

export function Certificates({ content = defaultHomeContent.certificates }: { content?: HomeContent["certificates"] }) {
  // Only site paths are rendered; anything else would break next/image.
  const certLogos = content.logos
    .filter((logo) => logo.src.startsWith("/"))
    .map((logo) => ({ id: logo.id, imageUrl: logo.src, description: logo.alt, imageHint: logo.hint }));

  const { approvals, thirdParty } = content;

  return (
    <section id="certificates" className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <ShieldCheck className="size-5 md:size-3.5" />
              {content.badge}
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
              {content.title}
            </h3>
            <p className="text-foreground/60 text-lg mb-12 leading-relaxed max-w-xl">
              {content.description}
            </p>

            <div className="space-y-12">
              <div>
                <h4 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                  {content.approvalsHeading}
                </h4>
                <ul className="grid gap-4 sm:grid-cols-1">
                  {approvals.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-foreground/70 text-sm">
                      <CheckCircle2 className="text-secondary shrink-0 mt-0.5 size-7 md:size-[18px]" />
                      <span className="leading-tight font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-32">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {certLogos.map((logo, idx) => (
                <div 
                  key={logo?.id || idx} 
                  className="relative h-[110px] md:h-auto md:aspect-[1.4/1] rounded-[1.5rem] bg-white border border-border shadow-sm overflow-hidden p-4 flex items-center justify-center hover:shadow-lg hover:border-secondary/20 transition-all duration-300"
                >
                  {logo && (
                    <Image
                      src={logo.imageUrl}
                      alt={logo.description}
                      fill
                      className="object-contain p-4 md:p-6"
                      data-ai-hint={logo.imageHint}
                    />
                  )}
                </div>
              ))}
              
              <div className="col-span-2 lg:col-span-3 p-6 md:p-8 rounded-[2rem] bg-primary/5 border border-primary/10">
                <h4 className="text-base md:text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <Search className="text-secondary size-8 md:size-5" />
                  {content.thirdPartyHeading}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {thirdParty.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 md:px-4 py-1.5 bg-white border border-border rounded-full text-[10px] md:text-[12px] font-bold text-primary shadow-sm hover:border-secondary/30 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="col-span-2 lg:col-span-3 bg-primary p-6 md:p-8 rounded-[2rem] text-white shadow-xl shadow-primary/20 flex flex-col justify-center items-center text-center">
                <h5 className="text-lg md:text-xl font-bold mb-2">{content.boxTitle}</h5>
                <p className="text-white text-[11px] md:text-xs max-w-xs">
                  {content.boxText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
