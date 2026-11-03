import { Fragment } from "react";
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
import { notFound } from "next/navigation";
import { getArticleContent, isArticlePublished, pfaVsFepDefaults } from "@/lib/blog-articles";
import { keywordList, seoMetadata } from "@/lib/seo";
import { safeHref, safeId } from "@/lib/buttons";

const SLUG = "pfa-vs-fep-lined-valves";

// The text is editable from the admin dashboard (saving there refreshes this page immediately).
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getArticleContent(SLUG, pfaVsFepDefaults);
  // Edited in the admin (SEO tab); empty fields keep the original title, description and keywords.
  return seoMetadata(c.seo, { title: pfaVsFepDefaults.seo.title, description: pfaVsFepDefaults.seo.description, keywords: keywordList(pfaVsFepDefaults.seo.keywords) });
}

export default async function PfaVsFepBlogPage() {
  // An admin can move this article to draft, which takes it off the website.
  if (!(await isArticlePublished(SLUG))) notFound();
  const c = await getArticleContent(SLUG, pfaVsFepDefaults);

  return (
    <main className="min-h-screen bg-white max-w-full overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-12 md:pt-48 md:pb-32 px-5 md:px-[63px] bg-gradient-to-br from-white via-blue-50/30 to-neutral-100 overflow-hidden border-b-4 border-secondary/10">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <Image
            src={c.hero.image}
            alt="Chemical Processing Plant"
            fill
            className="object-cover"
            data-ai-hint="chemical processing"
          />
        </div>
        <div className="container mx-auto relative z-10">
          <nav className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-[#000000] mb-4">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <span className="text-[#000000]">Blog</span>
            <ChevronRight className="size-4" />
            <span className="text-secondary font-bold">{c.hero.breadcrumb}</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
            <ShieldAlert className="size-3.5" /> {c.hero.badge}
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-primary max-w-5xl leading-tight mb-8 break-words hyphens-auto">
            {c.hero.title}
          </h1>
          <p className="text-base md:text-xl text-[#000000] max-w-3xl leading-relaxed mb-4">
            {c.hero.intro}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <section className="py-12 md:py-24 px-5 md:px-[63px] overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-8 min-w-0">
              <article className="prose prose-neutral text-[#000000] max-w-none break-words prose-headings:text-primary prose-headings:font-bold prose-p:text-[#000000] prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-p:mb-[15px]">
                
                <h2 className="text-xl md:text-2xl font-bold mt-12 md:mt-16 mb-6 md:mb-8 break-words">{c.whatAre.heading}</h2>
                {c.whatAre.paragraphs.map((text, i) => (
                  <p key={i} className="mb-[15px]">{text}</p>
                ))}

                <h2 className="text-xl md:text-2xl font-bold mt-12 md:mt-16 mb-6 md:mb-8 break-words">{c.difference.heading}</h2>
                
                <div className="my-8 md:my-12 border border-border rounded-2xl md:rounded-[2rem] shadow-xl bg-white overflow-hidden max-w-full">
                  <div className="bg-primary p-5 md:p-6">
                    <h4 className="text-white font-bold m-0 text-lg md:text-xl">{c.difference.tableTitle}</h4>
                  </div>
                  <div className="w-full overflow-x-auto">
                    <Table className="min-w-[500px]">
                      <TableHeader className="bg-neutral-50">
                        <TableRow>
                          <TableHead className="text-primary font-bold h-14 uppercase tracking-wider">{c.difference.tableHeaders.col1}</TableHead>
                          <TableHead className="text-primary font-bold h-14 uppercase tracking-wider">{c.difference.tableHeaders.col2}</TableHead>
                          <TableHead className="text-primary font-bold h-14 uppercase tracking-wider">{c.difference.tableHeaders.col3}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {c.difference.tableRows.map((row, i) => (
                          <TableRow key={i} className="hover:bg-neutral-50/50">
                            <TableCell className="font-bold text-primary">{row.col1}</TableCell>
                            <TableCell>{row.col2}</TableCell>
                            <TableCell>{row.col3}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {c.difference.paragraphs.map((text, i) => (
                  <p key={i} className="mb-[15px]">{text}</p>
                ))}

                <h2 className="text-xl md:text-2xl font-bold mt-12 md:mt-16 mb-6 md:mb-8 break-words">{c.whenPfa.heading}</h2>
                {c.whenPfa.paragraphs.map((text, i) => (
                  <p key={i} className="mb-[15px]">{text}</p>
                ))}

                <h2 className="text-xl md:text-2xl font-bold mt-12 md:mt-16 mb-6 md:mb-8 break-words">{c.whenFep.heading}</h2>
                {c.whenFep.paragraphs.map((text, i) => (
                  <p key={i} className="mb-[15px]">{text}</p>
                ))}

                <div className="relative aspect-video rounded-2xl md:rounded-[2.5rem] overflow-hidden my-8 md:my-16 shadow-2xl">
                  <Image
                    src={c.whenFep.image}
                    alt="Lined Valve Technology"
                    fill
                    className="object-cover"
                    data-ai-hint="valve lining"
                  />
                </div>

                <h2 className="text-xl md:text-2xl font-bold mt-12 md:mt-16 mb-6 md:mb-8 break-words">{c.valveTypes.heading}</h2>
                {c.valveTypes.paragraphs.map((text, i) => (
                  <p key={i} className="mb-[15px]">{text}</p>
                ))}

                {c.valveTypes.types.map((type, i) => (
                  <Fragment key={i}>
                    <h3 className="text-lg md:text-xl font-bold mt-8 mb-4 break-words">{type.heading}</h3>
                    {type.paragraphs.map((text, j) => (
                      <p key={j} className="mb-[15px]">{text}</p>
                    ))}
                  </Fragment>
                ))}

                <h2 className="text-xl md:text-2xl font-bold mt-12 md:mt-16 mb-6 md:mb-8 break-words">{c.questions.heading}</h2>

                {c.questions.items.map((question, i) => (
                  <Fragment key={i}>
                    <h3 className="text-lg md:text-xl font-bold mt-8 mb-4 break-words">{question.heading}</h3>
                    {question.paragraphs.map((text, j) => (
                      <p key={j} className="mb-[15px]">{text}</p>
                    ))}
                  </Fragment>
                ))}

                <h2 className="text-xl md:text-2xl font-bold mt-12 md:mt-16 mb-6 md:mb-8 break-words">{c.construction.heading}</h2>
                {c.construction.paragraphs.map((text, i) => (
                  <p key={i} className="mb-[15px]">{text}</p>
                ))}

                <h2 className="text-xl md:text-2xl font-bold mt-12 md:mt-16 mb-6 md:mb-8 break-words">{c.solutions.heading}</h2>
                {c.solutions.paragraphs.map((text, i) => (
                  <p key={i} className="mb-[15px]">{text}</p>
                ))}

                <div className="bg-primary text-white p-6 md:p-12 rounded-3xl md:rounded-[3rem] my-10 md:my-20 shadow-2xl relative overflow-hidden text-center">
                  <h2 className="text-white text-xl md:text-4xl mt-0 mb-6 md:mb-8 font-bold break-words">{c.cta.heading}</h2>
                  {c.cta.paragraphs.map((text, i) => (
                    // The last paragraph has extra space before the buttons, as in the original design.
                    <p key={i} className={i === c.cta.paragraphs.length - 1 ? "text-white/70 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto" : "text-white/70 text-sm md:text-lg mb-[15px] leading-relaxed max-w-2xl mx-auto"}>
                      {text}
                    </p>
                  ))}
                  <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                    <Button variant="secondary" size="lg" className="rounded-2xl font-bold h-14 md:h-16 px-8 md:px-10 text-base md:text-lg shadow-xl shadow-secondary/20 w-full sm:w-auto" asChild>
                      <Link href={safeHref(c.cta.primaryButton.href, "/#contact")} id={safeId(c.cta.primaryButton.id)}>
                        {c.cta.primaryButton.label} <ArrowRight className="ml-3 size-5 md:size-6" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-2xl font-bold h-14 md:h-16 px-8 md:px-10 text-base md:text-lg border-white/20 text-white bg-white/10 hover:bg-white/20 w-full sm:w-auto" asChild>
                      <Link href={safeHref(c.cta.secondaryButton.href, "/#products")} id={safeId(c.cta.secondaryButton.id)}>{c.cta.secondaryButton.label}</Link>
                    </Button>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-3xl md:rounded-[3rem] p-6 md:p-12 mb-10 md:mb-20 border border-border">
                  <h2 className="text-xl md:text-3xl font-bold text-primary mb-6 md:mb-12 flex items-center gap-4 break-words">
                    <HelpCircle className="text-secondary size-6 md:size-8 shrink-0" />
                    {c.faq.heading}
                  </h2>
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {c.faq.items.map((item, i) => (
                      <AccordionItem key={i} value={`item-${i + 1}`} className="border-none bg-white rounded-2xl px-4 md:px-8 shadow-sm">
                        <AccordionTrigger className="text-left font-bold text-primary py-4 md:py-6 hover:no-underline text-sm md:text-lg">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-[#000000] text-sm md:text-lg leading-relaxed pb-6 md:pb-8">
                          <p className="mb-[15px]">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </article>
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-32 self-start space-y-8 mt-10 lg:mt-0 min-w-0">
              <div className="bg-neutral-50 rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 border border-border shadow-xl">
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-2xl bg-secondary flex items-center justify-center text-white shadow-lg shadow-secondary/20 shrink-0">
                    <MessageSquare className="size-5 md:size-7" />
                  </div>
                  <h3 className="font-bold text-lg md:text-2xl text-primary m-0 break-words">{c.sidebar.expertTitle}</h3>
                </div>
                <p className="text-[#000000] text-sm md:text-base mb-8 md:mb-10 leading-relaxed">
                  {c.sidebar.expertText}
                </p>
                <div className="space-y-4">
                  <Button className="w-full h-12 md:h-14 rounded-xl md:rounded-2xl font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/10" asChild>
                    <Link href={safeHref(c.sidebar.expertButton.href, "/#contact")} id={safeId(c.sidebar.expertButton.id)}>{c.sidebar.expertButton.label}</Link>
                  </Button>
                </div>
              </div>

              <Card className="bg-primary p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] text-white border-none shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -left-10 size-40 bg-white/5 rounded-full" />
                <CardContent className="p-0 relative z-10">
                  <Info className="size-8 md:size-10 text-secondary mb-6" />
                  <h4 className="font-bold text-lg md:text-xl mb-4 break-words">{c.sidebar.infoTitle}</h4>
                  <p className="text-white/60 text-sm md:text-[15px] leading-relaxed mb-0">
                    {c.sidebar.infoText}
                  </p>
                </CardContent>
              </Card>
              
              <div className="p-6 md:p-8 border border-border rounded-2xl md:rounded-[2rem] bg-white overflow-hidden">
                <h4 className="font-bold text-primary mb-4 flex items-center gap-2 break-words">
                  <Activity className="size-4 text-secondary shrink-0" />
                  {c.sidebar.linksTitle}
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {c.sidebar.links.map((link, i) => (
                    <Link key={i} href={link.href} className="flex items-center justify-between text-xs md:text-sm text-[#000000] hover:text-secondary transition-colors py-2 group min-w-0">
                      <span className="truncate">{link.label}</span>
                      <ChevronRight className="size-3 group-hover:translate-x-1 transition-transform shrink-0" />
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
