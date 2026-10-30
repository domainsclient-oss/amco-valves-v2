import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, ArrowRight, Droplets, ShieldAlert, Sparkles, BookOpen, Layers } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { blogImageUrl, formatBlogDate, getPublishedBlogPosts } from "@/lib/blog";
import { BLOG_INDEX_SLUG, blogIndexDefaults, getArticleContent, isArticlePublished, pfaVsFepDefaults, waterTreatmentDefaults } from "@/lib/blog-articles";
import { safeHref, safeId } from "@/lib/buttons";

// Pick up posts published from the admin dashboard (saving there refreshes this immediately).
export const revalidate = 60;

/** The two original articles; their card text is editable from the admin dashboard. */
async function getOriginalPosts() {
  const [water, pfa, waterLive, pfaLive] = await Promise.all([
    getArticleContent("industrial-valves-for-water-treatment", waterTreatmentDefaults),
    getArticleContent("pfa-vs-fep-lined-valves", pfaVsFepDefaults),
    isArticlePublished("industrial-valves-for-water-treatment"),
    isArticlePublished("pfa-vs-fep-lined-valves"),
  ]);
  const posts = [
    {
      id: "water-treatment",
      title: water.card.heading,
      description: water.card.description,
      image: water.card.image,
      date: water.card.date,
      href: "/blog/industrial-valves-for-water-treatment",
      category: water.card.category,
      icon: Droplets,
    },
    {
      id: "pfa-vs-fep",
      title: pfa.card.heading,
      description: pfa.card.description,
      image: pfa.card.image,
      date: pfa.card.date,
      href: "/blog/pfa-vs-fep-lined-valves",
      category: pfa.card.category,
      icon: ShieldAlert,
    },
  ];
  // Articles moved to draft in the admin dashboard are hidden.
  return posts.filter((_, i) => [waterLive, pfaLive][i]);
}

export default async function BlogIndexPage() {
  const blogPosts = await getOriginalPosts();
  const c = await getArticleContent(BLOG_INDEX_SLUG, blogIndexDefaults);
  const adminPosts = (await getPublishedBlogPosts()).map((post) => ({
    id: post.id,
    title: post.cardTitle || post.title,
    description: post.cardDescription || post.excerpt,
    image: post.coverImageId ? blogImageUrl(post.coverImageId) : "/blog/blog-hero-1.webp",
    date: formatBlogDate(post.date),
    href: `/blog/${post.slug}`,
    category: post.category || "AMCO Updates",
    icon: BookOpen,
  }));
  const allPosts = [...adminPosts, ...blogPosts].sort(
    (a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0),
  );

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Modern Enhanced Hero Section */}
      <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-5 md:px-[63px] overflow-hidden bg-neutral-50 text-left">
        {/* Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-neutral-200/40" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a2c56' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
        
        {/* Decorative Element */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <nav className="flex items-center justify-start gap-2 text-xs md:text-sm font-medium text-[#000000] mb-8 animate-in fade-in slide-in-from-left-4 duration-700">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4 opacity-30" />
            <span className="text-primary/60 font-semibold">Blog</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary border border-secondary/20 px-4 py-2 rounded-2xl text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-in fade-in zoom-in-95 duration-1000">
              <BookOpen className="size-3.5" /> {c.hero.badge}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-primary leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              {c.hero.title} <span className="text-secondary">{c.hero.titleHighlight}</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-[#000000] max-w-2xl leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              {c.hero.description}
            </p>

            <div className="flex flex-wrap justify-start gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <div className="flex items-center gap-2 text-sm font-bold text-primary/80 bg-white shadow-sm border border-border/50 px-5 py-2.5 rounded-xl">
                <Layers className="size-4 text-secondary" />
                <span>{c.hero.tag1}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-primary/80 bg-white shadow-sm border border-border/50 px-5 py-2.5 rounded-xl">
                <Droplets className="size-4 text-secondary" />
                <span>{c.hero.tag2}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <section className="py-20 md:py-32 px-5 md:px-[63px] bg-neutral-50/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">{c.posts.heading}</h2>
            <div className="h-px flex-1 bg-border/40 mx-8 hidden md:block" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {allPosts.map((post) => (
              <Card key={post.id} className="group overflow-hidden border-none bg-white rounded-[3rem] flex flex-col shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 hover:-translate-y-3">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute top-8 left-8">
                    <div className="bg-white/95 backdrop-blur-md text-primary px-5 py-2.5 rounded-[1.25rem] text-[10px] font-bold uppercase tracking-widest shadow-xl flex items-center gap-2.5">
                      <post.icon className="size-4 text-secondary" />
                      {post.category}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-10 md:p-14 flex-grow">
                  <div className="flex items-center gap-3 text-[#000000] text-xs font-bold mb-6">
                    <Calendar className="size-4 text-secondary" />
                    {post.date}
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 leading-[1.2] group-hover:text-secondary transition-colors duration-500">
                    {post.title}
                  </h2>
                  <p className="text-[#000000] text-base md:text-lg leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </CardContent>

                <CardFooter className="px-10 md:px-14 pb-14 pt-0">
                  <Button variant="secondary" className="rounded-2xl font-bold h-14 px-8 group/btn text-base transition-all duration-500 shadow-lg shadow-secondary/10" asChild>
                    <Link href={post.href}>
                      {c.posts.readMoreLabel}
                      <ArrowRight className="ml-3 size-5 transition-transform group-hover/btn:translate-x-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional CTA Section */}
      <section className="pb-32 px-5 md:px-[63px]">
        <div className="container mx-auto">
          <div className="bg-primary p-10 md:p-24 rounded-[4rem] text-center relative overflow-hidden shadow-3xl shadow-primary/30">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 relative z-10 leading-tight">
              {c.cta.heading} <br className="hidden md:block" /> <span className="text-secondary">{c.cta.headingHighlight}</span>
            </h3>
            
            <p className="text-white/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed">
              {c.cta.text}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <Button variant="secondary" size="lg" className="h-16 px-12 rounded-[1.25rem] font-bold text-lg shadow-2xl shadow-secondary/20 hover:scale-105 transition-transform" asChild>
                <Link href={safeHref(c.cta.primaryButton.href, "/#contact")} id={safeId(c.cta.primaryButton.id)}>{c.cta.primaryButton.label}</Link>
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-12 rounded-[1.25rem] font-bold text-lg border-white/20 text-white bg-white/10 hover:bg-white/20 transition-colors" asChild>
                <Link href={safeHref(c.cta.secondaryButton.href, "/#products")} id={safeId(c.cta.secondaryButton.id)}>{c.cta.secondaryButton.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
