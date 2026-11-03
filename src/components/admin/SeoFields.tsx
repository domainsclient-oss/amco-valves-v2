'use client';

import { useRef, useState } from 'react';
import { ImagePlus, Loader2, Trash2 } from 'lucide-react';
import { Field, Section } from '@/components/admin/fields';
import { useImageUploader } from '@/components/admin/ImageUpload';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { blogImageUrl } from '@/lib/blog';
import type { SeoContent } from '@/lib/seo';

/** "Share image": optional picture shown when the page link is shared. */
function SeoImageField({ value, fallback, onChange }: { value: string; fallback?: string; onChange: (value: string) => void }) {
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

  const shown = value || fallback || '';
  const previewSrc = localPreview?.src === shown ? localPreview.dataUrl : shown;

  return (
    <div className="space-y-2">
      <Label className="text-primary font-semibold">Share image</Label>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="w-full sm:w-72 aspect-[1.91/1] rounded-2xl overflow-hidden border border-border bg-background shrink-0 flex items-center justify-center">
          {previewSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewSrc} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-foreground/40 px-4 text-center">No share image</span>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => inputRef.current?.click()} disabled={isUploading}>
              {isUploading ? <Loader2 className="size-4 mr-1 animate-spin" /> : <ImagePlus className="size-4 mr-1" />}
              {isUploading ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
            </Button>
            {value && (
              <Button type="button" variant="outline" size="sm" onClick={() => onChange('')}>
                <Trash2 className="size-4 mr-1" /> Remove
              </Button>
            )}
          </div>
          <p className="text-xs text-foreground/50">
            {value ? 'Custom share image. ' : fallback ? 'Empty: the page photo shown here is used. ' : 'Empty: no share image. '}
            Shown when the page link is shared on WhatsApp, LinkedIn, Facebook and similar. Best size 1200 × 630.
          </p>
        </div>
      </div>
    </div>
  );
}

const count = (text: string, ideal: number) => `${text.trim().length} characters (about ${ideal} or fewer shows in full in Google).`;

/**
 * The "SEO" tab of a page editor. `defaults` are what the page uses when a field is empty,
 * shown as hints so it's clear what's live.
 */
export function SeoFields({
  value,
  onChange,
  defaults = {},
}: {
  value: SeoContent;
  onChange: (value: SeoContent) => void;
  defaults?: { title?: string; description?: string; keywords?: string; image?: string };
}) {
  const set = (patch: Partial<SeoContent>) => onChange({ ...value, ...patch });
  const empty = (text?: string) => (text ? `Empty: uses "${text}".` : 'Empty: uses the website default.');

  return (
    <Section title="SEO" description="How this page appears in Google and when its link is shared. Leave a field empty to keep the current setting.">
      <Field
        label="SEO title"
        value={value.title}
        onChange={(title) => set({ title })}
        hint={value.title.trim() ? count(value.title, 60) : empty(defaults.title)}
      />
      <Field
        label="Meta description"
        value={value.description}
        onChange={(description) => set({ description })}
        multiline
        hint={value.description.trim() ? count(value.description, 160) : empty(defaults.description)}
      />
      <Field
        label="Keywords"
        value={value.keywords}
        onChange={(keywords) => set({ keywords })}
        multiline
        hint={`Separate keywords with commas, e.g. "ball valve, flanged ball valve, industrial valves".${value.keywords.trim() ? '' : defaults.keywords ? ` Empty: uses "${defaults.keywords}".` : ''}`}
      />
      <SeoImageField value={value.image} fallback={defaults.image} onChange={(image) => set({ image })} />
    </Section>
  );
}
