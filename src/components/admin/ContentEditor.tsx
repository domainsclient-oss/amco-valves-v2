'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ArrowDown, ArrowUp, Loader2, Plus, RotateCcw, Save, Trash2 } from 'lucide-react';
import { useFirestore, useUser } from '@/firebase';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ButtonField, Field, ListField, Section } from '@/components/admin/fields';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { getHomeSection } from '@/components/admin/admin-nav';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { CertificateLogosEditor } from '@/components/admin/CertificateLogosEditor';
import { ImageField } from '@/components/admin/ContentForm';
import { LinkListEditor } from '@/components/admin/LinkListEditor';
import { SeoFields } from '@/components/admin/SeoFields';
import { SITE_SEO } from '@/lib/seo';
import { revalidateHomeContent } from '@/app/actions/revalidate-content';
import {
  HOME_CONTENT_COLLECTION,
  HOME_CONTENT_DOC,
  defaultHomeContent,
  phoneHref,
  resolveHomeContent,
  type HomeContent,
  type ProductItem,
} from '@/lib/home-content';

/** Drops blank lines left over from the one-item-per-line fields. */
function cleanForSave(content: HomeContent): HomeContent {
  const compact = (list: string[]) => list.map((s) => s.trim()).filter(Boolean);
  return {
    ...content,
    products: {
      ...content.products,
      items: content.products.items.map((p) => ({ ...p, features: compact(p.features) })),
    },
    certificates: {
      ...content.certificates,
      approvals: compact(content.certificates.approvals),
      thirdParty: compact(content.certificates.thirdParty),
    },
  };
}

// --- Editor ---

export function ContentEditor() {
  const db = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  // The sidebar links to /admin?section=<key>; the editor keeps unsaved edits while switching sections.
  const activeSection = getHomeSection(useSearchParams().get('section'));

  const [content, setContent] = useState<HomeContent | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const contentRef = doc(db, HOME_CONTENT_COLLECTION, HOME_CONTENT_DOC);

  useEffect(() => {
    getDoc(contentRef)
      .then((snap) => setContent(resolveHomeContent(snap.exists() ? snap.data() : null)))
      .catch((err) => setLoadError(err?.message ?? 'Could not load the content.'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  if (loadError) {
    return (
      <div className="px-6 lg:px-10 py-24 text-center">
        <p className="text-destructive font-semibold">Could not load the website content.</p>
        <p className="text-sm text-foreground/60 mt-2">{loadError}</p>
        <p className="text-sm text-foreground/60 mt-1">Check that the latest Firestore rules are published.</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-secondary" />
      </div>
    );
  }

  const update = <K extends keyof HomeContent>(section: K, patch: Partial<HomeContent[K]>) => {
    setContent((c) => (c ? { ...c, [section]: { ...c[section], ...patch } } : c));
    setIsDirty(true);
  };

  const { hero, about, products, certificates, gallery, contact, header, footer } = content;

  const updateProduct = (index: number, patch: Partial<ProductItem>) =>
    update('products', { items: products.items.map((p, i) => (i === index ? { ...p, ...patch } : p)) });

  const moveProduct = (index: number, direction: -1 | 1) => {
    const items = [...products.items];
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    [items[index], items[target]] = [items[target], items[index]];
    update('products', { items });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const cleaned = cleanForSave(content);
      await setDoc(contentRef, { ...cleaned, updatedAt: serverTimestamp(), updatedBy: user?.email ?? user?.uid ?? null });
      setContent(cleaned);
      setIsDirty(false);
      await revalidateHomeContent().catch(() => {});
      toast({ title: 'Saved', description: 'The website has been updated.' });
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Save failed',
        description: err?.code === 'permission-denied' ? 'This account is not allowed to edit content.' : err?.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRestore = () => {
    setContent(defaultHomeContent);
    setIsDirty(true);
    toast({ title: 'Original content loaded', description: 'Click "Save changes" to publish it.' });
  };

  return (
    <div className="pb-24">
      <AdminHeader
        title={activeSection.label}
        description={activeSection.description}
        actions={
          <>
            {isDirty && <span className="text-xs font-semibold text-secondary">Unsaved changes</span>}
            <Button variant="secondary" className="font-bold" onClick={handleSave} disabled={isSaving || !isDirty}>
              {isSaving ? <Loader2 className="size-4 mr-1 animate-spin" /> : <Save className="size-4 mr-1" />}
              {isDirty ? 'Save changes' : 'All changes saved'}
            </Button>
          </>
        }
      />

      <main className="px-6 lg:px-10 py-8 max-w-5xl">
        <Tabs value={activeSection.key}>

          <TabsContent value="hero" className="space-y-6 mt-0">
            <Section title="Hero banner" description="The first section visitors see.">
              <Field label="Badge text" value={hero.badge} onChange={(badge) => update('hero', { badge })} />
              <div className="grid md:grid-cols-3 gap-5">
                <Field label="Title line 1" value={hero.titleLine1} onChange={(titleLine1) => update('hero', { titleLine1 })} />
                <Field label="Title line 2" value={hero.titleLine2} onChange={(titleLine2) => update('hero', { titleLine2 })} />
                <Field label="Title highlight (orange)" value={hero.titleHighlight} onChange={(titleHighlight) => update('hero', { titleHighlight })} />
              </div>
              <Field label="Subtitle" value={hero.subtitle} onChange={(subtitle) => update('hero', { subtitle })} multiline hint="Press Enter for a new line." />
              <div className="grid md:grid-cols-2 gap-5">
                <ButtonField label="Main button" value={hero.primaryButton} onChange={(primaryButton) => update('hero', { primaryButton })} />
                <ButtonField label="Second button" value={hero.secondaryButton} onChange={(secondaryButton) => update('hero', { secondaryButton })} />
              </div>
            </Section>
            <Section title="Background photo" description="The large photo behind the hero text. A light fade over its left side keeps the text readable.">
              <ImageField
                label="Photo"
                value={hero.background.src}
                original={defaultHomeContent.hero.background.src}
                onChange={(src) => update('hero', { background: { ...hero.background, src } })}
              />
              <Field
                label="Photo description"
                value={hero.background.alt}
                onChange={(alt) => update('hero', { background: { ...hero.background, alt } })}
                hint="Describes the photo for search engines and screen readers."
              />
            </Section>
            <Section title="Counters" description="Numbers shown under the buttons (a + is added automatically).">
              <div className="grid md:grid-cols-3 gap-5">
                {hero.stats.map((stat, i) => (
                  <div key={i} className="space-y-3 p-4 rounded-2xl bg-background">
                    <Field
                      label={`Number ${i + 1}`}
                      value={String(stat.end)}
                      onChange={(v) =>
                        update('hero', { stats: hero.stats.map((s, j) => (j === i ? { ...s, end: Number(v.replace(/\D/g, '')) || 0 } : s)) })
                      }
                    />
                    <Field
                      label="Label"
                      value={stat.label}
                      onChange={(label) => update('hero', { stats: hero.stats.map((s, j) => (j === i ? { ...s, label } : s)) })}
                    />
                  </div>
                ))}
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="about" className="space-y-6 mt-0">
            <Section title="Heading">
              <Field label="Badge text" value={about.badge} onChange={(badge) => update('about', { badge })} />
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Title" value={about.title} onChange={(title) => update('about', { title })} />
                <Field label="Title highlight (orange)" value={about.titleHighlight} onChange={(titleHighlight) => update('about', { titleHighlight })} />
              </div>
              <Field label="Intro text" value={about.intro} onChange={(intro) => update('about', { intro })} multiline />
            </Section>
            <Section title="Info cards" description="Press Enter in a box to start a new line.">
              <Field label="Industries served" value={about.industries} onChange={(industries) => update('about', { industries })} multiline />
              <Field label="Our team" value={about.team} onChange={(team) => update('about', { team })} multiline />
              <Field label="Supply" value={about.supply} onChange={(supply) => update('about', { supply })} multiline />
              <Field label="Quality" value={about.quality} onChange={(quality) => update('about', { quality })} multiline />
            </Section>
            <Section title="Bottom banner">
              <Field label="Banner text" value={about.banner} onChange={(banner) => update('about', { banner })} />
            </Section>
          </TabsContent>

          <TabsContent value="products" className="space-y-6 mt-0">
            <Section title="Heading">
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Small label" value={products.label} onChange={(label) => update('products', { label })} />
                <Field label="Title" value={products.title} onChange={(title) => update('products', { title })} />
              </div>
              <Field label="Description" value={products.description} onChange={(description) => update('products', { description })} multiline />
            </Section>

            <Section title={`Product cards (${products.items.length})`} description="Shown in this order on the website.">
              {products.items.map((product, i) => (
                <div key={product.id} className="p-5 rounded-2xl bg-background space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-primary">#{i + 1} {product.title || 'Untitled product'}</span>
                    <div className="flex gap-1">
                      <Button type="button" size="icon" variant="ghost" onClick={() => moveProduct(i, -1)} disabled={i === 0} aria-label="Move up">
                        <ArrowUp className="size-4" />
                      </Button>
                      <Button type="button" size="icon" variant="ghost" onClick={() => moveProduct(i, 1)} disabled={i === products.items.length - 1} aria-label="Move down">
                        <ArrowDown className="size-4" />
                      </Button>
                      <ConfirmDialog
                        title="Remove this product?"
                        description={
                          <>
                            <strong className="text-primary">{product.title || 'This product'}</strong> will be removed from the product list.
                            It disappears from the website after you click "Save changes".
                          </>
                        }
                        confirmLabel="Remove product"
                        onConfirm={() => update('products', { items: products.items.filter((_, j) => j !== i) })}
                        trigger={
                          <Button type="button" size="icon" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10" aria-label="Remove product">
                            <Trash2 className="size-4" />
                          </Button>
                        }
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Product name" value={product.title} onChange={(title) => updateProduct(i, { title })} />
                    <Field label="Types (optional)" value={product.specs} onChange={(specs) => updateProduct(i, { specs })} />
                  </div>
                  <ListField label="Features" value={product.features} onChange={(features) => updateProduct(i, { features })} />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  update('products', { items: [...products.items, { id: Date.now().toString(36), title: '', specs: '', features: [] }] })
                }
              >
                <Plus className="size-4 mr-1" /> Add product
              </Button>
            </Section>

            <Section title="Brochure box">
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Heading" value={products.brochureHeading} onChange={(brochureHeading) => update('products', { brochureHeading })} />
                <ButtonField label="Download button" value={products.brochureButton} onChange={(brochureButton) => update('products', { brochureButton })} />
              </div>
            </Section>

            <Section title="Feature tiles" description="The four small boxes at the bottom of the section.">
              <div className="grid md:grid-cols-2 gap-5">
                {products.tiles.map((tile, i) => (
                  <div key={i} className="space-y-3 p-4 rounded-2xl bg-background">
                    <Field
                      label={`Tile ${i + 1} title`}
                      value={tile.title}
                      onChange={(title) => update('products', { tiles: products.tiles.map((t, j) => (j === i ? { ...t, title } : t)) })}
                    />
                    <Field
                      label="Text"
                      value={tile.desc}
                      onChange={(desc) => update('products', { tiles: products.tiles.map((t, j) => (j === i ? { ...t, desc } : t)) })}
                    />
                  </div>
                ))}
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6 mt-0">
            <Section title="Heading">
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Badge text" value={certificates.badge} onChange={(badge) => update('certificates', { badge })} />
                <Field label="Title" value={certificates.title} onChange={(title) => update('certificates', { title })} />
              </div>
              <Field label="Description" value={certificates.description} onChange={(description) => update('certificates', { description })} multiline />
            </Section>
            <Section title={`Certificate logos (${certificates.logos.length})`} description="The logo cards shown next to the approvals list.">
              <CertificateLogosEditor logos={certificates.logos} onChange={(logos) => update('certificates', { logos })} />
            </Section>
            <Section title="Approvals & certificates list">
              <Field label="List heading" value={certificates.approvalsHeading} onChange={(approvalsHeading) => update('certificates', { approvalsHeading })} />
              <ListField label="Approvals" value={certificates.approvals} onChange={(approvals) => update('certificates', { approvals })} />
            </Section>
            <Section title="Third party inspection">
              <Field label="Heading" value={certificates.thirdPartyHeading} onChange={(thirdPartyHeading) => update('certificates', { thirdPartyHeading })} />
              <ListField label="Inspection agencies" value={certificates.thirdParty} onChange={(thirdParty) => update('certificates', { thirdParty })} />
            </Section>
            <Section title="Blue box">
              <Field label="Title" value={certificates.boxTitle} onChange={(boxTitle) => update('certificates', { boxTitle })} />
              <Field label="Text" value={certificates.boxText} onChange={(boxText) => update('certificates', { boxText })} multiline />
            </Section>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6 mt-0">
            <Section title="Gallery heading">
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Small label" value={gallery.label} onChange={(label) => update('gallery', { label })} />
                <Field label="Title" value={gallery.title} onChange={(title) => update('gallery', { title })} />
              </div>
              <Field label="Description" value={gallery.description} onChange={(description) => update('gallery', { description })} multiline />
            </Section>
            <Section title={`Gallery photos (${gallery.images.length})`} description="The photo tiles in the gallery section, in this order.">
              <CertificateLogosEditor kind="photo" logos={gallery.images} onChange={(images) => update('gallery', { images })} />
            </Section>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6 mt-0">
            <Section title="Contact section heading">
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Small label" value={contact.label} onChange={(label) => update('contact', { label })} />
                <Field label="Title" value={contact.title} onChange={(title) => update('contact', { title })} />
              </div>
              <Field label="Description" value={contact.description} onChange={(description) => update('contact', { description })} multiline />
            </Section>
            <Section title="Contact details" description="Shown in the contact section. The footer has its own details (Footer section).">
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Factory address" value={contact.factoryAddress} onChange={(factoryAddress) => update('contact', { factoryAddress })} />
                <Field label="Address link (optional)" value={contact.factoryLink} onChange={(factoryLink) => update('contact', { factoryLink })} hint="e.g. a Google Maps link. Empty: the address is plain text." />
                <Field label="Mobile number" value={contact.phone} onChange={(phone) => update('contact', { phone })} hint="Include the country code, e.g. 91-9841114671." />
                <Field label="Phone link (optional)" value={contact.phoneLink} onChange={(phoneLink) => update('contact', { phoneLink })} hint={`Empty: calls the number automatically (${phoneHref(contact.phone)}).`} />
                <Field label="Email" value={contact.email} onChange={(email) => update('contact', { email })} />
                <Field label="Email link (optional)" value={contact.emailLink} onChange={(emailLink) => update('contact', { emailLink })} hint={`Empty: opens an email to the address (mailto:${contact.email}).`} />
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="header" className="space-y-6 mt-0">
            <Section title="Logo" description="Shown at the top left of every page and in the mobile menu.">
              <ImageField label="Logo" value={header.logo.src} original={defaultHomeContent.header.logo.src} onChange={(src) => update('header', { logo: { ...header.logo, src } })} />
              <Field label="Logo description" value={header.logo.alt} onChange={(alt) => update('header', { logo: { ...header.logo, alt } })} hint="For search engines and screen readers." />
            </Section>
            <Section title="Favicon" description="The small icon in the browser tab. Square images (e.g. 512 × 512) work best.">
              <ImageField label="Favicon" value={header.favicon} original={defaultHomeContent.header.favicon} onChange={(favicon) => update('header', { favicon })} />
            </Section>
            <Section title="Menu links" description="The links in the top menu, in this order.">
              <LinkListEditor
                links={header.links}
                onChange={(links) => update('header', { links })}
                newLink={() => ({ label: '', href: '/', megaMenu: false })}
                isLocked={(link) => link.megaMenu}
                lockedNote="This link opens the products menu, so it can be renamed and moved but not removed."
              />
            </Section>
            <Section title="Menu button">
              <div className="md:max-w-xl">
                <ButtonField label="Button" value={header.button} onChange={(button) => update('header', { button })} />
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="footer" className="space-y-6 mt-0">
            <Section title="Logo and about">
              <ImageField label="Footer logo" value={footer.logo.src} original={defaultHomeContent.footer.logo.src} onChange={(src) => update('footer', { logo: { ...footer.logo, src } })} />
              <Field label="Logo description" value={footer.logo.alt} onChange={(alt) => update('footer', { logo: { ...footer.logo, alt } })} />
              <Field label="About text" value={footer.about} onChange={(about) => update('footer', { about })} multiline />
            </Section>
            <Section title="Social links" description="The three round icons under the about text. &quot;#&quot; means no link yet.">
              <div className="grid md:grid-cols-3 gap-5">
                <Field label="LinkedIn" value={footer.social.linkedin} onChange={(linkedin) => update('footer', { social: { ...footer.social, linkedin } })} />
                <Field label="Twitter / X" value={footer.social.twitter} onChange={(twitter) => update('footer', { social: { ...footer.social, twitter } })} />
                <Field label="Facebook" value={footer.social.facebook} onChange={(facebook) => update('footer', { social: { ...footer.social, facebook } })} />
              </div>
            </Section>
            <Section title="Quick links">
              <Field label="Column title" value={footer.quickLinksTitle} onChange={(quickLinksTitle) => update('footer', { quickLinksTitle })} />
              <LinkListEditor links={footer.quickLinks} onChange={(quickLinks) => update('footer', { quickLinks })} newLink={() => ({ label: '', href: '/' })} />
            </Section>
            <Section title="Legal links">
              <Field label="Column title" value={footer.legalTitle} onChange={(legalTitle) => update('footer', { legalTitle })} />
              <LinkListEditor links={footer.legalLinks} onChange={(legalLinks) => update('footer', { legalLinks })} newLink={() => ({ label: '', href: '/' })} />
            </Section>
            <Section title="Contact column">
              <Field label="Column title" value={footer.contactTitle} onChange={(contactTitle) => update('footer', { contactTitle })} />
              <div className="grid md:grid-cols-[12rem_1fr_1fr] gap-5">
                <Field label="Label" value={footer.factoryLabel} onChange={(factoryLabel) => update('footer', { factoryLabel })} />
                <Field label="Address" value={footer.factoryAddress} onChange={(factoryAddress) => update('footer', { factoryAddress })} />
                <Field label="Address link (optional)" value={footer.factoryLink} onChange={(factoryLink) => update('footer', { factoryLink })} hint="e.g. Google Maps" />
                <Field label="Label" value={footer.warehouseLabel} onChange={(warehouseLabel) => update('footer', { warehouseLabel })} />
                <Field label="Address" value={footer.warehouseAddress} onChange={(warehouseAddress) => update('footer', { warehouseAddress })} />
                <Field label="Address link (optional)" value={footer.warehouseLink} onChange={(warehouseLink) => update('footer', { warehouseLink })} hint="e.g. Google Maps" />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Phone" value={footer.phone} onChange={(phone) => update('footer', { phone })} />
                <Field label="Phone link (optional)" value={footer.phoneLink} onChange={(phoneLink) => update('footer', { phoneLink })} hint={`Empty: ${phoneHref(footer.phone)}`} />
                <Field label="Email" value={footer.email} onChange={(email) => update('footer', { email })} />
                <Field label="Email link (optional)" value={footer.emailLink} onChange={(emailLink) => update('footer', { emailLink })} hint={`Empty: mailto:${footer.email}`} />
              </div>
            </Section>
            <Section title="Copyright line">
              <Field label="Text" value={footer.copyright} onChange={(copyright) => update('footer', { copyright })} hint={`Shown as "© ${new Date().getFullYear()} ${footer.copyright}" (the year updates automatically).`} />
            </Section>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6 mt-0">
            <SeoFields value={content.seo} onChange={(seo) => update('seo', seo)} defaults={SITE_SEO} />
          </TabsContent>
        </Tabs>

        <div className="mt-12 p-6 rounded-3xl border border-dashed border-border bg-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-primary">Restore original content</p>
            <p className="text-sm text-foreground/60">Loads the website's original text into the editor. Nothing changes until you save.</p>
          </div>
          <ConfirmDialog
            title="Restore original content?"
            description="All sections will be reset to the website's original text, replacing your edits in the editor. Nothing changes on the website until you click &quot;Save changes&quot;."
            confirmLabel="Restore original"
            icon={RotateCcw}
            onConfirm={handleRestore}
            trigger={
              <Button variant="outline">
                <RotateCcw className="size-4 mr-1" /> Restore original
              </Button>
            }
          />
        </div>
      </main>
    </div>
  );
}
