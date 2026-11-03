import { Award, Boxes, Images, Info, Newspaper, Package, PanelBottom, PanelTop, Phone, Search, Sparkles, Users, type LucideIcon } from 'lucide-react';

/** Home page sections editable in /admin, selected with ?section=<key>. */
export const HOME_SECTIONS = [
  { key: 'header', label: 'Header', icon: PanelTop, description: 'Logo, favicon, menu links and button, shown on every page.' },
  { key: 'hero', label: 'Hero Banner', icon: Sparkles, description: 'The first section visitors see: headline, buttons and counters.' },
  { key: 'about', label: 'About Us', icon: Info, description: 'Company introduction, info cards and banner.' },
  { key: 'products', label: 'Products', icon: Package, description: 'Product cards, brochure box and feature tiles.' },
  { key: 'certificates', label: 'Certificates', icon: Award, description: 'Approvals, certificates and inspection agencies.' },
  { key: 'gallery', label: 'Gallery', icon: Images, description: 'Gallery heading and photos.' },
  { key: 'contact', label: 'Contact', icon: Phone, description: 'Contact section: heading, address, phone and email with links.' },
  { key: 'footer', label: 'Footer', icon: PanelBottom, description: 'Logo, about text, social links, link columns and contact details, shown on every page.' },
  { key: 'seo', label: 'SEO', icon: Search, description: 'Home page title, description, keywords and share image for Google and link previews.' },
] as const satisfies readonly { key: string; label: string; icon: LucideIcon; description: string }[];

export type HomeSectionKey = (typeof HOME_SECTIONS)[number]['key'];

export function getHomeSection(key: string | null) {
  return HOME_SECTIONS.find((s) => s.key === key) ?? HOME_SECTIONS[0];
}

export const BLOG_NAV = { href: '/admin/blog', label: 'Blog Posts', icon: Newspaper };

export const PRODUCTS_NAV = { href: '/admin/products', label: 'Product Pages', icon: Boxes };

export const USERS_NAV = { href: '/admin/users', label: 'Users', icon: Users };
