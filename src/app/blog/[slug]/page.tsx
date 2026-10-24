import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BookOpen, Calendar, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogBlocks, BlogSidebarView } from "@/components/blog/BlogBlocks";
import { blogImageUrl, formatBlogDate, getPublishedBlogPost } from "@/lib/blog";

// Posts are written in the admin dashboard; saving there refreshes the page immediately.
export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);
  if (!post) return { title: "Post not found | AMCO Valves" };

  return {
    title: `${post.title} | AMCO Valves`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImageId ? [blogImageUrl(post.coverImageId)] : undefined,
    },
  };
}

function PostImage({ imageId, alt, caption, priority }: { imageId: string; alt: string; caption?: string; priority?: boolean }) {
  return (
    <figure className="my-8 md:my-12 not-prose">
      <div className="rounded-2xl md:rounded-[2rem] overflow-hidden border border-border shadow-xl bg-neutral-50">
        <Image
          src={blogImageUrl(imageId)}
          alt={alt}
          width={1600}
          height={1000}
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="w-full h-auto"
          priority={priority}
        />
      </div>
      {caption && <figcaption className="text-sm text-foreground/50 mt-3 text-center">{caption}</figcaption>}
    </figure>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white max-w-full overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-12 md:pt-48 md:pb-32 px-5 md:px-[63px] bg-gradient-to-br from-white via-blue-50/30 to-neutral-100 overflow-hidden border-b-4 border-secondary/10">
        {post.coverImageId && (
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
            <Image src={blogImageUrl(post.coverImageId)} alt="" fill className="object-cover" />
          </div>
        )}
        <div className="container mx-auto relative z-10">
          <nav className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-foreground/60 mb-4">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="size-4" />
            <Link href="/blog" className="text-foreground/40 hover:text-secondary transition-colors">Blog</Link>
            {post.category && (
              <>
                <ChevronRight className="size-4" />
                <span className="text-secondary font-bold">{post.category}</span>
              </>
            )}
          </nav>
          <div className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
            <BookOpen className="size-3.5" /> {post.category || "AMCO Updates"}
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-primary max-w-5xl leading-tight mb-8 break-words hyphens-auto">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-base md:text-xl text-foreground/70 max-w-3xl leading-relaxed mb-4">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-3 text-foreground/40 text-xs font-bold mt-6">
            <Calendar className="size-4 text-secondary" />
            {formatBlogDate(post.date)}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <section className="py-12 md:py-24 px-5 md:px-[63px] overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-8 min-w-0">
              <article className="prose prose-neutral max-w-none break-words prose-headings:text-primary prose-headings:font-bold prose-p:text-foreground/80 prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-p:mb-[15px]">
                {post.coverImageId && <PostImage imageId={post.coverImageId} alt={post.title} priority />}

                <BlogBlocks blocks={post.blocks} postTitle={post.title} />
              </article>
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-32 self-start space-y-8 mt-10 lg:mt-0 min-w-0">
              <BlogSidebarView sidebar={post.sidebar} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
