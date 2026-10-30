'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ExternalLink, ImagePlus, Loader2, Plus, RotateCcw, Save, Star, Trash2, X } from 'lucide-react';
import { useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Field, Section } from '@/components/admin/fields';
import { useImageUploader } from '@/components/admin/ImageUpload';
import { ProductTablesEditor } from '@/components/admin/ProductTableEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { revalidateCustomProducts, revalidateProduct } from '@/app/actions/revalidate-content';
import { CUSTOM_PRODUCTS_COLLECTION } from '@/lib/custom-products';
import { HOME_CONTENT_COLLECTION } from '@/lib/home-content';
import { blogImageUrl } from '@/lib/blog';
import { productContentDocId, resolveProductContent, type ProductContent, type ProductImage, type ProductSpec } from '@/lib/product-content';

const TABS = [
  { key: 'details', label: 'Details' },
  { key: 'specs', label: 'Specifications' },
  { key: 'images', label: 'Images' },
  { key: 'tables', label: 'Data sheets' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

function moveItem<T>(items: T[], index: number, direction: -1 | 1) {
  const next = [...items];
  const target = index + direction;
  if (target < 0 || target >= next.length) return items;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

/** Trims text and drops completely empty specifications before saving. */
function cleanForSave(content: ProductContent): ProductContent {
  return {
    ...content,
    category: content.category.trim(),
    title: content.title.trim(),
    specs: content.specs
      .map((s) => ({ label: s.label.trim(), subLabel: s.subLabel, value: s.value.trim() }))
      .filter((s) => s.label || s.value),
    images: content.images.map((i) => ({ src: i.src, alt: i.alt.trim() })),
  };
}

function SpecsEditor({ specs, showSubLabels, onChange }: { specs: ProductSpec[]; showSubLabels: boolean; onChange: (specs: ProductSpec[]) => void }) {
  const set = (i: number, patch: Partial<ProductSpec>) => onChange(specs.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  return (
    <div className="space-y-2">
      {specs.map((spec, i) => (
        <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-background">
          <div className={cn('grid gap-2 flex-1', showSubLabels ? 'md:grid-cols-[16rem_8rem_1fr]' : 'md:grid-cols-[16rem_1fr]')}>
            <Input value={spec.label} onChange={(e) => set(i, { label: e.target.value })} placeholder="Label, e.g. Size" className="bg-white border-border font-semibold" />
            {showSubLabels && (
              <Input value={spec.subLabel} onChange={(e) => set(i, { subLabel: e.target.value })} placeholder="Extra label" className="bg-white border-border text-sm" aria-label="Extra label" />
            )}
            <Input value={spec.value} onChange={(e) => set(i, { value: e.target.value })} placeholder="Value, e.g. DN15 - DN50" className="bg-white border-border" />
          </div>
          <div className="flex shrink-0">
            <Button type="button" size="icon" variant="ghost" className="size-8" onClick={() => onChange(moveItem(specs, i, -1))} disabled={i === 0} aria-label="Move up">
              <ArrowUp className="size-4" />
            </Button>
            <Button type="button" size="icon" variant="ghost" className="size-8" onClick={() => onChange(moveItem(specs, i, 1))} disabled={i === specs.length - 1} aria-label="Move down">
              <ArrowDown className="size-4" />
            </Button>
            <ConfirmDialog
              title="Remove this specification?"
              description={
                <>
                  <strong className="text-primary">{spec.label || 'This specification'}</strong> will be removed from the product page after you click "Save changes".
                </>
              }
              confirmLabel="Remove"
              onConfirm={() => onChange(specs.filter((_, j) => j !== i))}
              trigger={
                <Button type="button" size="icon" variant="ghost" className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10" aria-label="Remove specification">
                  <X className="size-4" />
                </Button>
              }
            />
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => onChange([...specs, { label: '', subLabel: '', value: '' }])}>
        <Plus className="size-4 mr-1" /> Add specification
      </Button>
    </div>
  );
}

function ImagesEditor({ images, onChange }: { images: ProductImage[]; onChange: (images: ProductImage[]) => void }) {
  const { upload, isUploading } = useImageUploader();
  const addRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);
  // Data-URL previews for images uploaded in this session, keyed by src.
  const [previews, setPreviews] = useState<Record<string, string>>({});

  const uploadOne = async (file: File) => {
    const result = await upload(file);
    if (!result) return null;
    const src = blogImageUrl(result.id);
    setPreviews((p) => ({ ...p, [src]: result.previewSrc }));
    return src;
  };

  const handleAdd = async (files: FileList | null) => {
    if (!files?.length) return;
    const added: ProductImage[] = [];
    for (const file of Array.from(files)) {
      const src = await uploadOne(file);
      if (src) added.push({ src, alt: file.name.replace(/\.[^.]+$/, '') });
    }
    if (addRef.current) addRef.current.value = '';
    if (added.length) onChange([...images, ...added]);
  };

  const handleReplace = async (files: FileList | null) => {
    const index = replaceIndex;
    if (replaceRef.current) replaceRef.current.value = '';
    if (!files?.length || index === null) return;
    const src = await uploadOne(files[0]);
    if (src) onChange(images.map((img, i) => (i === index ? { ...img, src } : img)));
    setReplaceIndex(null);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image, i) => (
          <div key={`${image.src}-${i}`} className="rounded-2xl border border-border bg-background p-3 space-y-3">
            <div className="relative aspect-square rounded-xl bg-white border border-border flex items-center justify-center p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previews[image.src] ?? image.src} alt={image.alt} className="max-w-full max-h-full object-contain" />
              {i === 0 && (
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-secondary text-white text-[10px] font-bold px-2 py-0.5">
                  <Star className="size-3" /> Main photo
                </span>
              )}
            </div>
            <Input
              value={image.alt}
              onChange={(e) => onChange(images.map((img, j) => (j === i ? { ...img, alt: e.target.value } : img)))}
              placeholder="Description (for search engines)"
              className="bg-white border-border h-9 text-sm"
              aria-label="Image description"
            />
            <div className="flex items-center justify-between gap-1">
              <div className="flex">
                <Button type="button" size="icon" variant="ghost" className="size-8" onClick={() => onChange(moveItem(images, i, -1))} disabled={i === 0} aria-label="Move earlier">
                  <ArrowLeft className="size-4" />
                </Button>
                <Button type="button" size="icon" variant="ghost" className="size-8" onClick={() => onChange(moveItem(images, i, 1))} disabled={i === images.length - 1} aria-label="Move later">
                  <ArrowRight className="size-4" />
                </Button>
              </div>
              <div className="flex">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-8"
                  disabled={isUploading}
                  onClick={() => {
                    setReplaceIndex(i);
                    replaceRef.current?.click();
                  }}
                >
                  {isUploading && replaceIndex === i ? <Loader2 className="size-4 animate-spin" /> : 'Replace'}
                </Button>
                <ConfirmDialog
                  title="Remove this photo?"
                  description="The photo will be removed from the product page after you click &quot;Save changes&quot;."
                  confirmLabel="Remove photo"
                  onConfirm={() => onChange(images.filter((_, j) => j !== i))}
                  trigger={
                    <Button type="button" size="icon" variant="ghost" className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10" disabled={images.length === 1} aria-label="Remove photo">
                      <Trash2 className="size-4" />
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addRef.current?.click()}
          disabled={isUploading}
          className="min-h-[14rem] rounded-2xl border-2 border-dashed border-border bg-background flex flex-col items-center justify-center gap-2 text-foreground/50 hover:border-secondary hover:text-secondary transition-colors"
        >
          {isUploading && replaceIndex === null ? <Loader2 className="size-7 animate-spin" /> : <ImagePlus className="size-7" />}
          <span className="text-sm font-semibold">Add photos</span>
          <span className="text-xs">You can pick several.</span>
        </button>
      </div>
      <input ref={addRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleAdd(e.target.files)} />
      <input ref={replaceRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleReplace(e.target.files)} />
      <p className="text-xs text-foreground/50">The first photo is the large main photo; all photos appear in the Visual Showcase gallery. Use the arrows to change the order. A product always keeps at least one photo.</p>
    </div>
  );
}

/** Edits one product page's data: details, specifications, photos and data-sheet tables. */
export function ProductEditor({
  slug,
  defaults,
  onBack,
  customProductId,
}: {
  slug: string;
  defaults: ProductContent;
  onBack: () => void;
  /** Set for products added from the admin: their data lives in `customProducts/<id>.content`. */
  customProductId?: string;
}) {
  const db = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const contentRef = customProductId
    ? doc(db, CUSTOM_PRODUCTS_COLLECTION, customProductId)
    : doc(db, HOME_CONTENT_COLLECTION, productContentDocId(slug));

  const [content, setContent] = useState<ProductContent | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [tab, setTab] = useState<TabKey>('details');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);

  useEffect(() => {
    getDoc(contentRef)
      .then((snap) => {
        const data = snap.exists() ? snap.data() : null;
        setContent(resolveProductContent(defaults, customProductId ? data?.content : data));
      })
      .catch((err) => setLoadError(err?.message ?? 'Could not load the product.'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, slug]);

  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const update = (patch: Partial<ProductContent>) => {
    setContent((c) => (c ? { ...c, ...patch } : c));
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);
    try {
      const cleaned = cleanForSave(content);
      const meta = { updatedAt: serverTimestamp(), updatedBy: user?.email ?? user?.uid ?? null };
      // Custom products keep their classification and status next to the content, so merge.
      if (customProductId) await setDoc(contentRef, { content: cleaned, ...meta }, { merge: true });
      else await setDoc(contentRef, { ...cleaned, ...meta });
      setContent(cleaned);
      setIsDirty(false);
      await (customProductId ? revalidateCustomProducts(slug) : revalidateProduct(slug)).catch(() => {});
      toast({ title: 'Saved', description: 'The product page has been updated.' });
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

  const showSubLabels = defaults.specs.some((s) => s.subLabel) || !!content?.specs.some((s) => s.subLabel);

  return (
    <div className="pb-24">
      <AdminHeader
        title="Edit product"
        description={content?.title ?? defaults.title}
        actions={
          <>
            {isDirty && <span className="text-xs font-semibold text-secondary">Unsaved changes</span>}
            <Button variant="secondary" className="font-bold" onClick={handleSave} disabled={isSaving || !isDirty || !content}>
              {isSaving ? <Loader2 className="size-4 mr-1 animate-spin" /> : <Save className="size-4 mr-1" />}
              {isDirty ? 'Save changes' : 'All changes saved'}
            </Button>
          </>
        }
      />

      <main className="px-6 lg:px-10 py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => (isDirty ? setConfirmLeave(true) : onBack())}>
            <ArrowLeft className="size-4 mr-1" /> All products
          </Button>
          <Link href={`/products/${slug}`} target="_blank" className="inline-flex items-center gap-1 text-sm text-secondary font-semibold hover:underline">
            View product page <ExternalLink className="size-3.5" />
          </Link>
          <ConfirmDialog
            open={confirmLeave}
            onOpenChange={setConfirmLeave}
            title="Discard unsaved changes?"
            description="You have changes to this product that haven't been saved. If you go back now, they will be lost."
            confirmLabel="Discard changes"
            onConfirm={onBack}
          />
        </div>

        {loadError ? (
          <div className="p-8 rounded-3xl bg-white border border-border text-center">
            <p className="text-destructive font-semibold">Could not load the product.</p>
            <p className="text-sm text-foreground/60 mt-2">{loadError}</p>
            <p className="text-sm text-foreground/60 mt-1">Check that the latest Firestore rules are published.</p>
          </div>
        ) : !content ? (
          <div className="py-24 flex justify-center">
            <Loader2 className="size-8 animate-spin text-secondary" />
          </div>
        ) : (
          <>
            <div className="rounded-2xl bg-white border border-border shadow-sm">
              <div role="tablist" aria-label="Product editor" className="flex overflow-x-auto px-2">
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    role="tab"
                    aria-selected={tab === t.key}
                    onClick={() => setTab(t.key)}
                    className={cn(
                      'relative shrink-0 px-5 py-3.5 text-sm whitespace-nowrap transition-colors',
                      tab === t.key ? 'text-primary font-semibold' : 'text-foreground/55 font-medium hover:text-primary',
                    )}
                  >
                    {t.label}
                    {t.key === 'specs' && <span className="ml-1.5 text-xs text-foreground/40">{content.specs.length}</span>}
                    {t.key === 'images' && <span className="ml-1.5 text-xs text-foreground/40">{content.images.length}</span>}
                    {t.key === 'tables' && <span className="ml-1.5 text-xs text-foreground/40">{content.tables.length}</span>}
                    <span className={cn('absolute left-3 right-3 bottom-0 h-[3px] rounded-t-full', tab === t.key ? 'bg-secondary' : 'bg-transparent')} />
                  </button>
                ))}
              </div>
            </div>

            {tab === 'details' && (
              <Section title="Details" description="Shown in the breadcrumb, above the heading and as the page heading.">
                <Field label="Category" value={content.category} onChange={(category) => update({ category })} />
                <Field label="Product name (page heading)" value={content.title} onChange={(title) => update({ title })} hint="Also used in the quote form and as the main photo description." />
              </Section>
            )}

            {tab === 'specs' && (
              <Section title="Specifications" description="The list next to the main photo, e.g. Size, Material, Pressure rating.">
                <SpecsEditor specs={content.specs} showSubLabels={showSubLabels} onChange={(specs) => update({ specs })} />
              </Section>
            )}

            {tab === 'images' && (
              <Section title="Images" description="Main photo and the Visual Showcase gallery.">
                <ImagesEditor images={content.images} onChange={(images) => update({ images })} />
              </Section>
            )}

            {tab === 'tables' && (
              <>
                <p className="text-sm text-foreground/60">The dimension and data tables at the bottom of the product page. Add or remove tables, columns and rows; the page keeps its design.</p>
                <ProductTablesEditor tables={content.tables} onChange={(tables) => update({ tables })} />
              </>
            )}

            <div className="mt-12 p-6 rounded-3xl border border-dashed border-border bg-white flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-primary">Restore original data</p>
                <p className="text-sm text-foreground/60">Loads this product's original data into the editor. Nothing changes until you save.</p>
              </div>
              <ConfirmDialog
                title="Restore original data?"
                description="All of this product's details, specifications, photos and tables will be reset to the original, replacing your edits in the editor. Nothing changes on the website until you click &quot;Save changes&quot;."
                confirmLabel="Restore original"
                icon={RotateCcw}
                onConfirm={() => {
                  setContent(defaults);
                  setIsDirty(true);
                }}
                trigger={
                  <Button variant="outline">
                    <RotateCcw className="size-4 mr-1" /> Restore original
                  </Button>
                }
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
