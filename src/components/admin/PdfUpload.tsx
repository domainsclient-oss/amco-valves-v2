'use client';

import { useRef, useState } from 'react';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Download, FileText, FileUp, Loader2, Trash2 } from 'lucide-react';
import { useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { BLOG_IMAGES_COLLECTION } from '@/lib/blog';
import { FILE_CHUNK_BYTES, MAX_PRODUCT_FILE_BYTES, formatFileSize, productFileUrl } from '@/lib/product-files';
import type { ProductPdf } from '@/lib/product-content';

function toBase64(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

/** Stores a PDF in Firestore as chunks plus a manifest (see src/lib/product-files.ts). */
function usePdfUploader() {
  const db = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const [progress, setProgress] = useState<number | null>(null);

  const upload = async (file: File): Promise<ProductPdf | null> => {
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
    if (!isPdf) {
      toast({ variant: 'destructive', title: 'Not a PDF', description: 'Please choose a .pdf file.' });
      return null;
    }
    if (file.size > MAX_PRODUCT_FILE_BYTES) {
      toast({ variant: 'destructive', title: 'File too large', description: `PDFs can be up to ${formatFileSize(MAX_PRODUCT_FILE_BYTES)}; this one is ${formatFileSize(file.size)}.` });
      return null;
    }
    setProgress(0);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const fileRef = doc(collection(db, BLOG_IMAGES_COLLECTION));
      const total = Math.max(1, Math.ceil(bytes.length / FILE_CHUNK_BYTES));
      const chunkIds: string[] = [];
      for (let i = 0; i < total; i++) {
        const chunkRef = doc(collection(db, BLOG_IMAGES_COLLECTION));
        await setDoc(chunkRef, {
          kind: 'fileChunk',
          fileId: fileRef.id,
          index: i,
          data: toBase64(bytes.subarray(i * FILE_CHUNK_BYTES, (i + 1) * FILE_CHUNK_BYTES)),
        });
        chunkIds.push(chunkRef.id);
        setProgress(Math.round(((i + 1) / total) * 100));
      }
      // The manifest is written last, so a file is only reachable once all its chunks exist.
      await setDoc(fileRef, {
        kind: 'file',
        fileName: file.name,
        contentType: 'application/pdf',
        size: file.size,
        chunkIds,
        createdAt: serverTimestamp(),
        createdBy: user?.email ?? user?.uid ?? null,
      });
      return { src: productFileUrl(fileRef.id), name: file.name, size: file.size };
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: err?.code === 'permission-denied' ? 'This account is not allowed to upload files.' : err?.message,
      });
      return null;
    } finally {
      setProgress(null);
    }
  };

  return { upload, progress };
}

/** Upload, replace, open and remove the product's catalog PDF. */
export function PdfUpload({ value, onChange }: { value: ProductPdf | null | undefined; onChange: (pdf: ProductPdf | null) => void }) {
  const { upload, progress } = usePdfUploader();
  const inputRef = useRef<HTMLInputElement>(null);
  const isUploading = progress !== null;

  const handleFile = async (file: File | undefined) => {
    if (inputRef.current) inputRef.current.value = '';
    if (!file) return;
    const pdf = await upload(file);
    if (pdf) onChange(pdf);
  };

  return (
    <div className="space-y-3">
      <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      {value ? (
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl border border-border bg-background">
          <div className="size-12 shrink-0 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
            <FileText className="size-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-primary truncate">{value.name}</p>
            <p className="text-xs text-foreground/50">{value.size ? `${formatFileSize(value.size)} · ` : ''}PDF</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="ghost" asChild>
              <a href={value.src} download={value.name}>
                <Download className="size-4 mr-1" /> Download
              </a>
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={() => inputRef.current?.click()} disabled={isUploading}>
              {isUploading ? <><Loader2 className="size-4 mr-1 animate-spin" /> {progress}%</> : 'Replace'}
            </Button>
            <ConfirmDialog
              title="Remove this PDF?"
              description='After you click "Save changes", the Download Data Sheet button downloads the data-sheet tables as a spreadsheet (CSV) again.'
              confirmLabel="Remove PDF"
              onConfirm={() => onChange(null)}
              trigger={
                <Button type="button" size="sm" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10" disabled={isUploading}>
                  <Trash2 className="size-4 mr-1" /> Remove
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
          className="w-full max-w-md h-32 rounded-2xl border-2 border-dashed border-border bg-background flex flex-col items-center justify-center gap-2 text-foreground/50 hover:border-secondary hover:text-secondary transition-colors"
        >
          {isUploading ? <Loader2 className="size-6 animate-spin" /> : <FileUp className="size-6" />}
          <span className="text-sm font-semibold">{isUploading ? `Uploading… ${progress}%` : 'Upload catalog PDF'}</span>
        </button>
      )}
      <p className="text-xs text-foreground/50">
        PDF only, up to {formatFileSize(MAX_PRODUCT_FILE_BYTES)}. When a PDF is uploaded, the &quot;Download Data Sheet&quot; button on the product page downloads it; otherwise it downloads the data-sheet tables as a spreadsheet (CSV).
      </p>
    </div>
  );
}
