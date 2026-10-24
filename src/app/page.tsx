import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutUs } from "@/components/AboutUs";
import { Products } from "@/components/Products";
import { Certificates } from "@/components/Certificates";
import { Gallery } from "@/components/Gallery";
import { ContactUs } from "@/components/ContactUs";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { getHomeContent } from "@/lib/home-content";

// Re-check the admin-edited content at most once a minute (saving from /admin refreshes it immediately).
export const revalidate = 60;

export default async function Home() {
  const content = await getHomeContent();

  return (
    <main className="relative">
      <Navbar />
      <Hero content={content.hero} />
      <AboutUs content={content.about} />
      <Products content={content.products} />
      <Certificates content={content.certificates} />
      <Gallery content={content.gallery} />
      <ContactUs content={content.contact} />
      <Footer content={{ contact: content.contact, footer: content.footer }} />
      <Toaster />
    </main>
  );
}
