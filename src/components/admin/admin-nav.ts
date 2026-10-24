import { Award, Boxes, Images, Info, Newspaper, Package, Phone, Sparkles, type LucideIcon } from 'lucide-react';

/** Home page sections editable in /admin, selected with ?section=<key>. */
export const HOME_SECTIONS = [
  { key: 'hero', label: 'Hero Banner', icon: Sparkles, description: 'The first section visitors see: headline, buttons and counters.' },
  { key: 'about', label: 'About Us', icon: Info, description: 'Company introduction, info cards and banner.' },
  { key: 'products', label: 'Products', icon: Package, description: 'Product cards, brochure box and feature tiles.' },
  { key: 'certificates', label: 'Certificates', icon: Award, description: 'Approvals, certificates and inspection agencies.' },
  { key: 'gallery', label: 'Gallery', icon: Images, description: 'Gallery section heading.' },
  { key: 'contact', label: 'Contact & Footer', icon: Phone, description: 'Address, phone and email (also used in the footer on every page).' },
] as const satisfies readonly { key: string; label: string; icon: LucideIcon; description: string }[];

export type HomeSectionKey = (typeof HOME_SECTIONS)[number]['key'];

export function getHomeSection(key: string | null) {
  return HOME_SECTIONS.find((s) => s.key === key) ?? HOME_SECTIONS[0];
}

export const BLOG_NAV = { href: '/admin/blog', label: 'Blog Posts', icon: Newspaper };

export const PRODUCTS_NAV = { href: '/admin/products', label: 'Product Pages', icon: Boxes };
