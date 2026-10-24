'use client';

import { useRef, useState } from 'react';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { compressImage } from '@/lib/compress-image';
import { BLOG_IMAGES_COLLECTION, blogImageUrl } from '@/lib/blog';

/**
 * Compresses an image and stores it in the `blogImages` collection (used for all
 * uploaded site images), returning its id and a data URL for instant preview.
 * Shows a toast and returns null on failure.
 */
export function useImageUploader() {
  const db = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (file: File) => {
    setIsUploading(true);
    try {
      const image = await compressImage(file);
      const ref = doc(collection(db, BLOG_IMAGES_COLLECTION));
      await setDoc(ref, {
        data: image.base64,
        contentType: image.contentType,
        width: image.width,
        height: image.height,
        createdAt: serverTimestamp(),
        createdBy: user?.email ?? user?.uid ?? null,
      });
      return { id: ref.id, previewSrc: `data:${image.contentType};base64,${image.base64}` };
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: err?.code === 'permission-denied' ? 'This account is not allowed to upload images.' : err?.message,
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading };
}

/** A single photo field: upload, preview, replace and remove (with confirmation). */
export function ImageUpload({ label, imageId, onChange }: { label: string; imageId: string; onChange: (imageId: string) => void }) {
  const { upload, isUploading } = useImageUploader();
  const inputRef = useRef<HTMLInputElement>(null);
  // Shows a just-uploaded photo instantly instead of waiting for the server copy.
  const [localPreview, setLocalPreview] = useState<{ id: string; src: string } | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    const result = await upload(file);
    if (inputRef.current) inputRef.current.value = '';
    if (!result) return;
    setLocalPreview({ id: result.id, src: result.previewSrc });
    onChange(result.id);
  };

  const previewSrc = imageId ? (localPreview?.id === imageId ? localPreview.src : blogImageUrl(imageId)) : null;

  return (
    <div className="space-y-2">
      <Label className="text-primary font-semibold">{label}</Label>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      {previewSrc ? (
        <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-border bg-background">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewSrc} alt="" className="w-full h-auto block" />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button type="button" size="sm" variant="secondary" onClick={() => inputRef.current?.click()} disabled={isUploading}>
              {isUploading ? <Loader2 className="size-4 animate-spin" /> : 'Replace'}
            </Button>
            <ConfirmDialog
              title="Remove this photo?"
              description='The photo will be removed from the post. It disappears from the website after you save or update the post.'
              confirmLabel="Remove photo"
              onConfirm={() => onChange('')}
              trigger={
                <Button type="button" size="icon" variant="destructive" className="size-9" aria-label="Remove photo">
                  <X className="size-4" />
                </Button>
              }
            />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="w-full max-w-md h-36 rounded-2xl border-2 border-dashed border-border bg-background flex flex-col items-center justify-center gap-2 text-foreground/50 hover:border-secondary hover:text-secondary transition-colors"
        >
          {isUploading ? <Loader2 className="size-6 animate-spin" /> : <ImagePlus className="size-6" />}
          <span className="text-sm font-medium">{isUploading ? 'Uploading…' : 'Choose a photo'}</span>
        </button>
      )}
      <p className="text-xs text-foreground/50">Photos are resized automatically (max 1600px wide).</p>
    </div>
  );
}
