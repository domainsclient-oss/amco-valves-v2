'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ImagePlus, Loader2, Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { useImageUploader } from '@/components/admin/ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { blogImageUrl } from '@/lib/blog';
import type { CertificateLogo } from '@/lib/home-content';

/** Grid of certificate logos with upload, reorder, rename and delete. */
export function CertificateLogosEditor({ logos, onChange }: { logos: CertificateLogo[]; onChange: (logos: CertificateLogo[]) => void }) {
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
            <div className="relative aspect-[1.4/1] rounded-xl bg-white border border-border flex items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previews[logo.id] ?? logo.src} alt={logo.alt} className="max-w-full max-h-full object-contain" />
              <span className="absolute top-2 left-2 text-[10px] font-bold text-foreground/40">#{i + 1}</span>
            </div>
            <Input
              value={logo.alt}
              onChange={(e) => onChange(logos.map((l, j) => (j === i ? { ...l, alt: e.target.value } : l)))}
              placeholder="Logo name, e.g. ISO 9001"
              className="bg-white border-border h-9 text-sm"
              aria-label="Logo name"
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
                title="Delete this logo?"
                description={
                  <>
                    <strong className="text-primary">{logo.alt || 'This logo'}</strong> will be removed from the certificates section.
                    It disappears from the website after you click "Save changes".
                  </>
                }
                confirmLabel="Delete logo"
                onConfirm={() => onChange(logos.filter((_, j) => j !== i))}
                trigger={
                  <Button type="button" size="sm" variant="ghost" className="text-destructive hover:text-destructive h-8">
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
          <span className="text-sm font-semibold">{isUploading ? 'Uploading…' : 'Upload logo'}</span>
          <span className="text-xs">PNG, JPG or WebP. You can pick several.</span>
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      <p className="text-xs text-foreground/50">
        Logos are shown on a white card, so images with a white or transparent background look best. Use the arrows to change the order.
      </p>
    </div>
  );
}
