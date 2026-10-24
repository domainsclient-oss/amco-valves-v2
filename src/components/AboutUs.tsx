import { Fragment } from "react";
import { CheckCircle2, Factory, History, ShieldCheck, Globe } from "lucide-react";
import { defaultHomeContent, type HomeContent } from "@/lib/home-content";

/** Renders each new line in the text as a <br />. */
function withLineBreaks(text: string) {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

export function AboutUs({ content = defaultHomeContent.about }: { content?: HomeContent["about"] }) {
  return (
    <section id="about" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-end mb-12 md:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6">
              <Globe className="size-5 md:size-3.5" />
              {content.badge}
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-[52px] font-bold text-primary leading-[1.2] md:leading-[1.1]">
              {content.title} <span className="text-secondary block">{content.titleHighlight}</span>
            </h3>
          </div>
          <div className="lg:text-right">
            <p className="text-lg md:text-xl text-foreground/50 leading-relaxed max-w-xl ml-auto">
              {withLineBreaks(content.intro)}
            </p>
          </div>
        </div>

        {/* Detailed Grid Section */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-start mb-12 md:mb-20">
          <div className="space-y-6 md:space-y-8">
            <div className="p-8 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-primary/5 border border-primary/10">
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                {withLineBreaks(content.industries)}
              </p>
            </div>
            
            <div className="p-8 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-white border border-border shadow-sm">
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                {withLineBreaks(content.team)}
              </p>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="p-8 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-white border border-border shadow-sm">
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                {withLineBreaks(content.supply)}
              </p>
            </div>

            <div className="p-8 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-secondary/5 border border-secondary/10">
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                {withLineBreaks(content.quality)}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center p-8 md:p-14 bg-primary rounded-[1.5rem] md:rounded-[35px] text-white shadow-2xl">
          <h4 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
            {content.banner}
          </h4>
        </div>
      </div>
    </section>
  );
}
