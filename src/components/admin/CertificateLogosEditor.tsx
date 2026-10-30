'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ImagePlus, Loader2, Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { useImageUploader } from '@/components/admin/ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { blogImageUrl } from '@/lib/blog';
import type { CertificateLogo } from '@/lib/home-content';

/** Wording and preview style for each kind of image grid. */
const KINDS = {
  logo: {
    noun: 'logo',
    section: 'certificates section',
    namePlaceholder: 'Logo name, e.g. ISO 9001',
    // Logos are shown whole on a white card on the website.
    preview: 'aspect-[1.4/1] bg-white p-4',
    img: 'max-w-full max-h-full object-contain',
    help: 'Logos are shown on a white card, so images with a white or transparent background look best. Use the arrows to change the order.',
  },
  photo: {
    noun: 'photo',
    section: 'gallery',
    namePlaceholder: 'Description, e.g. Final quality inspection',
    // Gallery photos fill their tile on the website (cropped to fit).
    preview: 'aspect-[1.3/1] bg-primary/5 overflow-hidden',
    img: 'absolute inset-0 w-full h-full object-cover',
    help: 'Photos fill their tile in the gallery and open full size when clicked; landscape photos work best. Use the arrows to change the order.',
  },
} as const;

/** Grid of site images (certificate logos or gallery photos) with upload, reorder, rename and delete. */
export function CertificateLogosEditor({
  logos,
  onChange,
  kind = 'logo',
}: {
  logos: CertificateLogo[];
  onChange: (logos: CertificateLogo[]) => void;
  kind?: keyof typeof KINDS;
}) {
  const k = KINDS[kind];
  const Noun = k.noun.charAt(0).toUpperCase() + k.noun.slice(1);
  const { upload, isUploading } = useImageUploader();
  const inputRef = useRef<HTMLInputElement>(null);
  // Data-URL previews for logos uploaded in this session, keyed by logo id.
  const [previews, setPreviews] = useState<Record<string, string>>({});

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const added: CertificateLogo[] = [];
    for (const file of Array.from(files)) {
      const result = await upload(file);
      if (!result) continue;
      setPreviews((p) => ({ ...p, [result.id]: result.previewSrc }));
      added.push({ id: result.id, src: blogImageUrl(result.id), alt: file.name.replace(/\.[^.]+$/, ''), hint: '' });
    }
    if (inputRef.current) inputRef.current.value = '';
    if (added.length) onChange([...logos, ...added]);
  };

  const move = (index: number, direction: -1 | 1) => {
    const next = [...logos];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {logos.map((logo, i) => (
          <div key={logo.id} className="rounded-2xl border border-border bg-background p-3 space-y-3">
            <div className={`relative rounded-xl border border-border flex items-center justify-center ${k.preview}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previews[logo.id] ?? logo.src} alt={logo.alt} className={k.img} />
              <span className="absolute top-2 left-2 text-[10px] font-bold text-foreground/40 bg-white/80 rounded px-1">#{i + 1}</span>
            </div>
            <Input
              value={logo.alt}
              onChange={(e) => onChange(logos.map((l, j) => (j === i ? { ...l, alt: e.target.value } : l)))}
              placeholder={k.namePlaceholder}
              className="bg-white border-border h-9 text-sm"
              aria-label={`${Noun} name`}
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                <Button type="button" size="icon" variant="ghost" className="size-8" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move earlier">
                  <ArrowLeft className="size-4" />
                </Button>
                <Button type="button" size="icon" variant="ghost" className="size-8" onClick={() => move(i, 1)} disabled={i === logos.length - 1} aria-label="Move later">
                  <ArrowRight className="size-4" />
                </Button>
              </div>
              <ConfirmDialog
                title={`Delete this ${k.noun}?`}
                description={
                  <>
                    <strong className="text-primary">{logo.alt || `This ${k.noun}`}</strong> will be removed from the {k.section}.
                    It disappears from the website after you click "Save changes".
                  </>
                }
                confirmLabel={`Delete ${k.noun}`}
                onConfirm={() => onChange(logos.filter((_, j) => j !== i))}
                trigger={
                  <Button type="button" size="sm" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8">
                    <Trash2 className="size-4 mr-1" /> Delete
                  </Button>
                }
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="min-h-[12rem] rounded-2xl border-2 border-dashed border-border bg-background flex flex-col items-center justify-center gap-2 text-foreground/50 hover:border-secondary hover:text-secondary transition-colors"
        >
          {isUploading ? <Loader2 className="size-7 animate-spin" /> : <ImagePlus className="size-7" />}
          <span className="text-sm font-semibold">{isUploading ? 'Uploading…' : `Upload ${k.noun}`}</span>
          <span className="text-xs">PNG, JPG or WebP. You can pick several.</span>
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      <p className="text-xs text-foreground/50">{k.help}</p>
    </div>
  );
}
