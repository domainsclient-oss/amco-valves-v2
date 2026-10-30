import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Activity, ArrowRight, CheckCircle2, ChevronRight, HelpCircle, Info, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { blogImageUrl, type BlogBlock, type BlogSidebar } from "@/lib/blog";
import { safeHref, safeId, type ButtonContent } from "@/lib/buttons";

/**
 * Renders blog post blocks with the same markup and styles as the original
 * hand-built articles (src/app/blog/*), so admin-written posts match them.
 */

/** Blank lines separate blocks; a block whose lines all start with "- " becomes a bullet list. */
function PostBody({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (lines.every((line) => line.trim().startsWith("- "))) {
          return (
            <ul key={i} className="mb-[15px] space-y-2 list-disc pl-6 marker:text-secondary text-[#000000] text-base md:text-lg leading-relaxed">
              {lines.map((line, j) => (
                <li key={j}>{line.trim().slice(2)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="mb-[15px]">
            {lines.map((line, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
}

function paragraphs(text: string) {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

function CtaButton({ value, fallbackHref, variant }: { value: ButtonContent; fallbackHref: string; variant: "primary" | "secondary" }) {
  if (!value.label.trim()) return null;
  return variant === "primary" ? (
    <Button variant="secondary" size="lg" className="rounded-2xl font-bold h-14 md:h-16 px-8 md:px-10 text-base md:text-lg shadow-xl shadow-secondary/20 w-full sm:w-auto" asChild>
      <Link href={safeHref(value.href, fallbackHref)} id={safeId(value.id)}>
        {value.label} <ArrowRight className="ml-3 size-5 md:size-6" />
      </Link>
    </Button>
  ) : (
    <Button variant="outline" size="lg" className="rounded-2xl font-bold h-14 md:h-16 px-8 md:px-10 text-base md:text-lg border-white/20 text-white bg-white/10 hover:bg-white/20 w-full sm:w-auto" asChild>
      <Link href={safeHref(value.href, fallbackHref)} id={safeId(value.id)}>{value.label}</Link>
    </Button>
  );
}

function Block({ block, postTitle }: { block: BlogBlock; postTitle: string }) {
  switch (block.type) {
    case "heading":
      if (!block.text) return null;
      return block.level === "h3" ? (
        <h3 className="text-lg md:text-xl font-bold mt-8 mb-4 break-words">{block.text}</h3>
      ) : (
        <h2 className="text-xl md:text-2xl font-bold mt-12 md:mt-16 mb-6 md:mb-8 break-words">{block.text}</h2>
      );

    case "text":
      return block.body ? <PostBody text={block.body} /> : null;

    case "image":
      if (!block.imageId) return null;
      return (
        <figure className="my-8 md:my-16">
          <div className="relative aspect-video rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl">
            <Image
              src={blogImageUrl(block.imageId)}
              alt={block.caption || postTitle}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover"
            />
          </div>
          {block.caption && <figcaption className="text-sm text-[#000000] mt-3 text-center">{block.caption}</figcaption>}
        </figure>
      );

    case "table": {
      const hasHeaders = block.headers.some(Boolean);
      const rows = block.rows.filter((r) => r.cells.some(Boolean));
      if (!rows.length) return null;
      return (
        <div className="my-8 md:my-12 border border-border rounded-2xl md:rounded-[2rem] shadow-xl bg-white overflow-hidden max-w-full">
          {block.title && (
            <div className="bg-primary p-5 md:p-6">
              <h4 className="text-white font-bold m-0 text-lg md:text-xl">{block.title}</h4>
            </div>
          )}
          <div className="w-full overflow-x-auto">
            <Table className={block.headers.length > 2 ? "min-w-[500px]" : undefined}>
              {hasHeaders && (
                <TableHeader className="bg-neutral-50">
                  <TableRow>
                    {block.headers.map((header, i) => (
                      <TableHead key={i} className="text-primary font-bold h-14">{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
              )}
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i} className="hover:bg-neutral-50/50">
                    {row.cells.map((cell, j) => (
                      <TableCell key={j} className={j === 0 ? "font-bold text-primary" : undefined}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      );
    }

    case "callout":
      if (!block.title && !block.text) return null;
      return (
        <div className="bg-secondary/10 border-l-8 border-secondary p-6 md:p-8 rounded-r-2xl md:rounded-r-3xl my-8 md:my-10 relative overflow-hidden">
          <HelpCircle className="absolute -right-4 -bottom-4 size-24 md:size-32 text-secondary/10" />
          {block.title && (
            <h4 className="text-lg md:text-xl font-bold text-primary mb-4 flex items-center gap-2 break-words">
              <Info className="size-5 text-secondary shrink-0" />
              {block.title}
            </h4>
          )}
          <p className="text-sm md:text-lg m-0 text-[#000000] leading-relaxed">{block.text}</p>
        </div>
      );

    case "infoBox":
      if (!block.title && !block.body) return null;
      return (
        <div className="bg-primary/5 border border-primary/10 p-6 md:p-8 rounded-2xl md:rounded-3xl my-8 md:my-10">
          {block.title && <h4 className="text-lg md:text-xl font-bold text-primary mb-4 break-words">{block.title}</h4>}
          {paragraphs(block.body).map((text, i) => (
            <p key={i} className="text-sm md:text-base text-[#000000] leading-relaxed mb-[15px]">{text}</p>
          ))}
        </div>
      );

    case "note":
      if (!block.text) return null;
      return (
        <p className="italic text-[#000000] border-l-4 border-secondary pl-6 py-2 bg-secondary/5 rounded-r-xl mb-[15px]">{block.text}</p>
      );

    case "checklist": {
      const items = block.items.filter((item) => item.label || item.desc);
      if (!items.length) return null;
      return (
        <div className="grid grid-cols-1 gap-4 md:gap-6 my-8 md:my-10">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-4 md:gap-6 p-5 md:p-8 bg-neutral-50 border border-border rounded-2xl md:rounded-3xl transition-all hover:bg-white hover:shadow-lg group">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white flex items-center justify-center text-secondary shadow-sm group-hover:bg-secondary group-hover:text-white transition-colors shrink-0">
                <CheckCircle2 className="size-6 md:size-7" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-bold text-primary text-lg md:text-xl block mb-2 break-words">{item.label}</span>
                <p className="text-sm md:text-base text-[#000000] m-0 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    case "cta": {
      const body = paragraphs(block.body);
      return (
        <div className="bg-primary text-white p-6 md:p-12 rounded-3xl md:rounded-[3rem] my-10 md:my-20 shadow-2xl relative overflow-hidden text-center">
          {block.heading && <h2 className="text-white text-xl md:text-4xl mt-0 mb-6 md:mb-8 font-bold break-words">{block.heading}</h2>}
          {body.map((text, i) => (
            <p
              key={i}
              className={
                i === body.length - 1
                  ? "text-white/70 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto"
                  : "text-white/70 text-sm md:text-lg mb-[15px] leading-relaxed max-w-2xl mx-auto"
              }
            >
              {text}
            </p>
          ))}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <CtaButton value={block.primary} fallbackHref="/#contact" variant="primary" />
            <CtaButton value={block.secondary} fallbackHref="/#products" variant="secondary" />
          </div>
        </div>
      );
    }

    case "faq": {
      const items = block.items.filter((item) => item.question);
      if (!items.length) return null;
      return (
        <div className="bg-neutral-50 rounded-3xl md:rounded-[3rem] p-6 md:p-12 mb-10 md:mb-20 border border-border">
          <h2 className="text-xl md:text-3xl font-bold text-primary mb-6 md:mb-12 flex items-center gap-4 break-words">
            <HelpCircle className="text-secondary size-6 md:size-8 shrink-0" />
            {block.heading || "Frequently Asked Questions"}
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i + 1}`} className="border-none bg-white rounded-2xl px-4 md:px-8 shadow-sm">
                <AccordionTrigger className="text-left font-bold text-primary py-4 md:py-6 hover:no-underline text-sm md:text-lg">{item.question}</AccordionTrigger>
                <AccordionContent className="text-[#000000] text-sm md:text-lg leading-relaxed pb-6 md:pb-8">
                  <p className="mb-[15px]">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      );
    }
  }
}

export function BlogBlocks({ blocks, postTitle }: { blocks: BlogBlock[]; postTitle: string }) {
  return (
    <>
      {blocks.map((block) => (
        <Block key={block.id} block={block} postTitle={postTitle} />
      ))}
    </>
  );
}

/** The post's sidebar: contact box, info card and links box (each optional), plus a link back to the blog. */
export function BlogSidebarView({ sidebar }: { sidebar: BlogSidebar }) {
  const { expert, info, links } = sidebar;
  const linkItems = links.items.filter((l) => l.label);

  return (
    <>
      {expert.enabled && (
        <div className="bg-neutral-50 rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 border border-border shadow-xl">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-2xl bg-secondary flex items-center justify-center text-white shadow-lg shadow-secondary/20 shrink-0">
              <MessageSquare className="size-5 md:size-7" />
            </div>
            <h3 className="font-bold text-lg md:text-2xl text-primary m-0 break-words">{expert.title}</h3>
          </div>
          {expert.text && <p className="text-[#000000] text-sm md:text-base mb-8 md:mb-10 leading-relaxed">{expert.text}</p>}
          {expert.button.label && (
            <Button className="w-full h-12 md:h-14 rounded-xl md:rounded-2xl font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/10" asChild>
              <Link href={safeHref(expert.button.href, "/#contact")} id={safeId(expert.button.id)}>{expert.button.label}</Link>
            </Button>
          )}
        </div>
      )}

      {info.enabled && (
        <Card className="bg-primary p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] text-white border-none shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -left-10 size-40 bg-white/5 rounded-full" />
          <CardContent className="p-0 relative z-10">
            <Info className="size-8 md:size-10 text-secondary mb-6" />
            <h4 className="font-bold text-lg md:text-xl mb-4 break-words">{info.title}</h4>
            <p className="text-white/60 text-sm md:text-[15px] leading-relaxed mb-0">{info.text}</p>
          </CardContent>
        </Card>
      )}

      {links.enabled && linkItems.length > 0 && (
        <div className="p-6 md:p-8 border border-border rounded-2xl md:rounded-[2rem] bg-white overflow-hidden">
          <h4 className="font-bold text-primary mb-4 flex items-center gap-2 break-words">
            <Activity className="size-4 text-secondary shrink-0" />
            {links.title}
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {linkItems.map((link, i) => (
              <Link key={i} href={safeHref(link.href, "/#products")} className="flex items-center justify-between text-xs md:text-sm text-[#000000] hover:text-secondary transition-colors py-2 group min-w-0">
                <span className="truncate">{link.label}</span>
                <ChevronRight className="size-3 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link href="/blog" className="flex items-center justify-between p-6 md:p-8 border border-border rounded-2xl md:rounded-[2rem] bg-white text-sm font-bold text-primary hover:text-secondary transition-colors group">
        More articles
        <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </>
  );
}
