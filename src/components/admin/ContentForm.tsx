'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ImagePlus, Loader2, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { ButtonField, Field, Section } from '@/components/admin/fields';
import { useImageUploader } from '@/components/admin/ImageUpload';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { blogImageUrl } from '@/lib/blog';
import { isImageField } from '@/lib/blog-articles';

/**
 * Builds an edit form from a content object: each top-level key becomes a card,
 * text becomes inputs, lists of text become paragraph boxes, and lists of
 * objects become repeatable items. The defaults supply the shape for new items.
 */

const FIELD_LABELS: Record<string, string> = {
  heading: 'Heading',
  paragraphs: 'Paragraphs',
  title: 'Title',
  intro: 'Intro text',
  description: 'Description',
  breadcrumb: 'Breadcrumb label',
  badge: 'Badge',
  category: 'Category (shown on the blog card)',
  date: 'Date (shown on the blog card)',
  lead: 'Opening sentence',
  tableTitle: 'Table title',
  tableHeaders: 'Table column headings',
  tableRows: 'Table rows',
  col1: 'Column 1',
  col2: 'Column 2',
  col3: 'Column 3',
  note: 'Highlighted note',
  calloutTitle: 'Highlight box title',
  calloutText: 'Highlight box text',
  boxTitle: 'Box title',
  boxParagraphs: 'Box paragraphs',
  items: 'Items',
  types: 'Valve types',
  label: 'Label',
  desc: 'Description',
  summary: 'Closing sentence',
  ctaText: 'Call-to-action text',
  ctaPrimaryButton: 'Main button',
  ctaSecondaryButton: 'Second button',
  primaryButton: 'Main button',
  secondaryButton: 'Second button',
  question: 'Question',
  answer: 'Answer',
  expertTitle: 'Contact box title',
  expertText: 'Contact box text',
  expertButton: 'Contact box button',
  expertPrimaryButton: 'Contact box main button',
  expertSecondaryButton: 'Contact box second button',
  infoTitle: 'Info card title',
  infoText: 'Info card text',
  linksTitle: 'Links box title',
  links: 'Links',
  href: 'Link address',
  image: 'Photo',
  titleHighlight: 'Title highlight (orange)',
  headingHighlight: 'Heading highlight (orange)',
  tag1: 'Tag 1',
  tag2: 'Tag 2',
  readMoreLabel: 'Card button text',
  text: 'Text',
};

function labelFor(key: string) {
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];
  const words = key.replace(/([A-Z])/g, ' $1').toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const isObject = (v: unknown): v is Record<string, Json> => typeof v === 'object' && v !== null && !Array.isArray(v);

function emptyLike(template: Json): Json {
  if (typeof template === 'string') return '';
  if (typeof template === 'number') return 0;
  if (Array.isArray(template)) return [];
  if (isObject(template)) return Object.fromEntries(Object.entries(template).map(([k, v]) => [k, emptyLike(v)]));
  return template;
}

function itemTitle(item: Json, index: number, singular: string) {
  if (isObject(item)) {
    const name = [item.heading, item.question, item.label, item.col1].find((v) => typeof v === 'string' && v.trim());
    if (typeof name === 'string') return name;
  }
  return `${singular} ${index + 1}`;
}

/** Trims text and drops empty paragraphs before saving. */
export function cleanContent<T>(value: T): T {
  if (typeof value === 'string') return value.trim() as T;
  if (Array.isArray(value)) {
    const cleaned = value.map(cleanContent);
    return (cleaned.every((v) => typeof v === 'string') ? cleaned.filter(Boolean) : cleaned) as T;
  }
  if (isObject(value)) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, cleanContent(v)])) as T;
  }
  return value;
}

/** Replaces an image in place: the page keeps the same spot and size, only the picture changes. */
function ImageField({ label, value, original, onChange }: { label: string; value: string; original: string; onChange: (value: string) => void }) {
  const { upload, isUploading } = useImageUploader();
  const inputRef = useRef<HTMLInputElement>(null);
  // Shows a just-uploaded image instantly instead of waiting for the server copy.
  const [localPreview, setLocalPreview] = useState<{ src: string; dataUrl: string } | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    const result = await upload(file);
    if (inputRef.current) inputRef.current.value = '';
    if (!result) return;
    const src = blogImageUrl(result.id);
    setLocalPreview({ src, dataUrl: result.previewSrc });
    onChange(src);
  };

  const previewSrc = localPreview?.src === value ? localPreview.dataUrl : value;
  const isOriginal = value === original;

  return (
    <div className="space-y-2">
      <Label className="text-primary font-semibold">{label}</Label>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="w-full sm:w-72 aspect-video rounded-2xl overflow-hidden border border-border bg-background shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewSrc} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => inputRef.current?.click()} disabled={isUploading}>
              {isUploading ? <Loader2 className="size-4 mr-1 animate-spin" /> : <ImagePlus className="size-4 mr-1" />}
              {isUploading ? 'Uploading…' : 'Replace photo'}
            </Button>
            {!isOriginal && (
              <ConfirmDialog
                title="Use the original photo?"
                description="The uploaded photo will be replaced with the article's original photo. It changes on the website after you click &quot;Save changes&quot;."
                confirmLabel="Use original"
                icon={RotateCcw}
                onConfirm={() => onChange(original)}
                trigger={
                  <Button type="button" variant="outline" size="sm">
                    <RotateCcw className="size-4 mr-1" /> Use original photo
                  </Button>
                }
              />
            )}
          </div>
          <p className="text-xs text-foreground/50">
            {isOriginal ? 'Showing the original photo. ' : 'New photo uploaded. '}
            It appears in the same place and size on the page. Landscape photos work best.
          </p>
        </div>
      </div>
    </div>
  );
}

function ValueEditor({ name, value, template, onChange }: { name: string; value: Json; template: Json; onChange: (value: Json) => void }) {
  const label = labelFor(name);

  if (typeof value === 'string' && isImageField(name)) {
    return <ImageField label={label} value={value} original={typeof template === 'string' ? template : value} onChange={onChange} />;
  }

  if (typeof value === 'string') {
    const long = Math.max(value.length, typeof template === 'string' ? template.length : 0) > 80;
    return <Field label={label} value={value} onChange={onChange} multiline={long} />;
  }

  if (Array.isArray(value)) {
    const itemTemplate = Array.isArray(template) ? template[0] : undefined;

    // A list of text: edited as paragraphs separated by a blank line.
    if (itemTemplate === undefined || typeof itemTemplate === 'string') {
      return (
        <Field
          label={label}
          value={(value as string[]).join('\n\n')}
          onChange={(text) => onChange(text.split(/\n[ \t]*\n/))}
          multiline
          hint="Leave an empty line between paragraphs."
        />
      );
    }

    const singular = label.replace(/s$/, '').replace(/ies$/, 'y');
    const move = (index: number, direction: -1 | 1) => {
      const next = [...value];
      const target = index + direction;
      if (target < 0 || target >= next.length) return;
      [next[index], next[target]] = [next[target], next[index]];
      onChange(next);
    };

    return (
      <div className="space-y-3">
        <p className="text-sm font-semibold text-primary">{label}</p>
        {value.map((item, i) => (
          <div key={i} className="p-4 rounded-2xl bg-background space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold text-primary truncate">{itemTitle(item, i, singular)}</span>
              <div className="flex gap-1 shrink-0">
                <Button type="button" size="icon" variant="ghost" className="size-8" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
                  <ArrowUp className="size-4" />
                </Button>
                <Button type="button" size="icon" variant="ghost" className="size-8" onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="Move down">
                  <ArrowDown className="size-4" />
                </Button>
                <ConfirmDialog
                  title={`Remove this ${singular.toLowerCase()}?`}
                  description={
                    <>
                      <strong className="text-primary">{itemTitle(item, i, singular)}</strong> will be removed. It disappears from the website after you click "Save changes".
                    </>
                  }
                  confirmLabel="Remove"
                  onConfirm={() => onChange(value.filter((_, j) => j !== i))}
                  trigger={
                    <Button type="button" size="icon" variant="ghost" className="size-8 text-destructive hover:text-destructive" aria-label={`Remove ${singular.toLowerCase()}`}>
                      <Trash2 className="size-4" />
                    </Button>
                  }
                />
              </div>
            </div>
            <ValueEditor name="" value={item} template={itemTemplate} onChange={(next) => onChange(value.map((v, j) => (j === i ? next : v)))} />
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...value, emptyLike(itemTemplate)])}>
          <Plus className="size-4 mr-1" /> Add {singular.toLowerCase()}
        </Button>
      </div>
    );
  }

  // A button: its text, link and optional id.
  if (isObject(value) && Object.keys(value).join() === 'label,href,id') {
    return (
      <ButtonField
        label={label}
        value={value as { label: string; href: string; id: string }}
        onChange={(next) => onChange(next as unknown as Json)}
      />
    );
  }

  if (isObject(value)) {
    const entries = Object.entries(value);
    const allShortText = entries.every(([k, v]) => typeof v === 'string' && v.length <= 80 && !isImageField(k));
    const fields = entries.map(([key, child]) => (
      <ValueEditor
        key={key}
        name={key}
        value={child}
        template={isObject(template) ? template[key] : child}
        onChange={(next) => onChange({ ...value, [key]: next })}
      />
    ));
    // Small groups of short fields (e.g. table columns) sit side by side.
    const grid = allShortText && entries.length > 1 ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-4';
    return name ? (
      <div className="space-y-2">
        <p className="text-sm font-semibold text-primary">{labelFor(name)}</p>
        <div className={grid}>{fields}</div>
      </div>
    ) : (
      <div className={grid}>{fields}</div>
    );
  }

  return null;
}

/** One tab per top-level section, in the same order as the page; only the selected section is shown. */
export function ContentForm<T extends Record<string, unknown>>({
  value,
  defaults,
  sectionTitles,
  tabLabels = {},
  onChange,
}: {
  value: T;
  defaults: T;
  sectionTitles: Record<string, string>;
  /** Short names for the tabs; falls back to the section title. */
  tabLabels?: Record<string, string>;
  onChange: (value: T) => void;
}) {
  const keys = Object.keys(value);
  const [activeKey, setActiveKey] = useState(keys[0]);
  const activeIndex = Math.max(0, keys.indexOf(activeKey));
  const key = keys[activeIndex];
  const titleOf = (k: string) => sectionTitles[k] ?? labelFor(k);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Keep the selected tab visible when the tab row scrolls sideways.
  useEffect(() => {
    tabRefs.current[key]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [key]);

  const goTo = (index: number) => {
    setActiveKey(keys[index]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white border border-border shadow-sm">
        <div role="tablist" aria-label="Article sections" className="flex overflow-x-auto px-2 [scrollbar-width:thin]">
          {keys.map((k) => (
            <button
              key={k}
              ref={(el) => {
                tabRefs.current[k] = el;
              }}
              type="button"
              role="tab"
              aria-selected={k === key}
              onClick={() => setActiveKey(k)}
              className={cn(
                'relative shrink-0 px-4 py-3.5 text-sm whitespace-nowrap transition-colors',
                k === key ? 'text-primary font-semibold' : 'text-foreground/55 font-medium hover:text-primary',
              )}
            >
              {tabLabels[k] ?? titleOf(k)}
              <span
                className={cn(
                  'absolute left-3 right-3 bottom-0 h-[3px] rounded-t-full transition-colors',
                  k === key ? 'bg-secondary' : 'bg-transparent',
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <Section title={`${activeIndex + 1}. ${titleOf(key)}`} description={`Section ${activeIndex + 1} of ${keys.length}`}>
        <ValueEditor
          key={key}
          name=""
          value={value[key] as Json}
          template={defaults[key] as Json}
          onChange={(next) => onChange({ ...value, [key]: next })}
        />
      </Section>

      <div className="flex items-center justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0}>
          <ArrowLeft className="size-4 mr-1" /> <span className="truncate max-w-[10rem] sm:max-w-xs">{activeIndex > 0 ? titleOf(keys[activeIndex - 1]) : 'Previous'}</span>
        </Button>
        <Button type="button" variant="outline" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === keys.length - 1}>
          <span className="truncate max-w-[10rem] sm:max-w-xs">{activeIndex < keys.length - 1 ? titleOf(keys[activeIndex + 1]) : 'Next'}</span> <ArrowRight className="size-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
