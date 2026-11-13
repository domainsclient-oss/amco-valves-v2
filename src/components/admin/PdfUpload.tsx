'use client';

import { useRef, useState } from 'react';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ArrowDown, ArrowUp, Download, FileText, FileUp, Loader2, Plus, Trash2 } from 'lucide-react';
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

/** Upload several catalog PDFs, and replace, reorder, open or remove each one. */
export function PdfUpload({ value, onChange }: { value: ProductPdf[]; onChange: (pdfs: ProductPdf[]) => void }) {
  const { upload, progress } = usePdfUploader();
  const addRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);
  // Which upload is running: "add" (new files) or the index of the PDF being replaced.
  const [busy, setBusy] = useState<'add' | number | null>(null);
  const [current, setCurrent] = useState<{ done: number; total: number } | null>(null);
  const isUploading = progress !== null || busy !== null;

  const handleAdd = async (files: FileList | null) => {
    const list = Array.from(files ?? []);
    if (addRef.current) addRef.current.value = '';
    if (!list.length) return;
    setBusy('add');
    const added: ProductPdf[] = [];
    try {
      // One at a time, so progress is clear and Firestore isn't flooded with chunk writes.
      for (let i = 0; i < list.length; i++) {
        setCurrent({ done: i + 1, total: list.length });
        const pdf = await upload(list[i]);
        if (pdf) added.push(pdf);
      }
    } finally {
      setBusy(null);
      setCurrent(null);
    }
    if (added.length) onChange([...value, ...added]);
  };

  const handleReplace = async (file: File | undefined) => {
    if (replaceRef.current) replaceRef.current.value = '';
    const index = replaceIndex;
    setReplaceIndex(null);
    if (!file || index === null) return;
    setBusy(index);
    try {
      const pdf = await upload(file);
      if (pdf) onChange(value.map((p, j) => (j === index ? pdf : p)));
    } finally {
      setBusy(null);
    }
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const uploadLabel = current && current.total > 1 ? `Uploading ${current.done} of ${current.total}… ${progress ?? 0}%` : `Uploading… ${progress ?? 0}%`;

  return (
    <div className="space-y-3">
      <input ref={addRef} type="file" accept="application/pdf,.pdf" multiple className="hidden" onChange={(e) => handleAdd(e.target.files)} />
      <input ref={replaceRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => handleReplace(e.target.files?.[0])} />

      {value.map((pdf, i) => (
        <div key={`${pdf.src}-${i}`} className="flex flex-wrap items-center gap-4 p-4 rounded-2xl border border-border bg-background">
          <div className="size-12 shrink-0 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
            <FileText className="size-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-primary truncate">{pdf.name}</p>
            <p className="text-xs text-foreground/50">{pdf.size ? `${formatFileSize(pdf.size)} · ` : ''}PDF</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {value.length > 1 && (
              <>
                <Button type="button" size="icon" variant="ghost" className="size-9" onClick={() => move(i, -1)} disabled={i === 0 || isUploading} aria-label="Move up">
                  <ArrowUp className="size-4" />
                </Button>
                <Button type="button" size="icon" variant="ghost" className="size-9" onClick={() => move(i, 1)} disabled={i === value.length - 1 || isUploading} aria-label="Move down">
                  <ArrowDown className="size-4" />
                </Button>
              </>
            )}
            <Button type="button" size="sm" variant="ghost" asChild>
              <a href={pdf.src} download={pdf.name}>
                <Download className="size-4 mr-1" /> Download
              </a>
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                setReplaceIndex(i);
                replaceRef.current?.click();
              }}
              disabled={isUploading}
            >
              {busy === i ? <><Loader2 className="size-4 mr-1 animate-spin" /> {progress ?? 0}%</> : 'Replace'}
            </Button>
            <ConfirmDialog
              title="Remove this PDF?"
              description={
                value.length > 1 ? (
                  <>
                    <strong className="text-primary">{pdf.name}</strong> will be removed from the &quot;Download PDF&quot; menu on the product page after you click &quot;Save changes&quot;.
                  </>
                ) : (
                  'After you click "Save changes", the "Download PDF" button is no longer shown on the product page.'
                )
              }
              confirmLabel="Remove PDF"
              onConfirm={() => onChange(value.filter((_, j) => j !== i))}
              trigger={
                <Button type="button" size="sm" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10" disabled={isUploading}>
                  <Trash2 className="size-4 mr-1" /> Remove
                </Button>
              }
            />
          </div>
        </div>
      ))}

      {value.length === 0 ? (
        <button
          type="button"
          onClick={() => addRef.current?.click()}
          disabled={isUploading}
          className="w-full max-w-md h-32 rounded-2xl border-2 border-dashed border-border bg-background flex flex-col items-center justify-center gap-2 text-foreground/50 hover:border-secondary hover:text-secondary transition-colors"
        >
          {isUploading ? <Loader2 className="size-6 animate-spin" /> : <FileUp className="size-6" />}
          <span className="text-sm font-semibold">{isUploading ? uploadLabel : 'Upload catalog PDFs'}</span>
        </button>
      ) : (
        <Button type="button" variant="outline" size="sm" onClick={() => addRef.current?.click()} disabled={isUploading}>
          {busy === 'add' ? <><Loader2 className="size-4 mr-1 animate-spin" /> {uploadLabel}</> : <><Plus className="size-4 mr-1" /> Add PDF</>}
        </Button>
      )}
      <p className="text-xs text-foreground/50">
        PDF only, up to {formatFileSize(MAX_PRODUCT_FILE_BYTES)} each. You can select several files at once. With one PDF, the &quot;Download PDF&quot; button on the product page downloads it; with several, the button opens a menu with one option per PDF, in the order shown here.
      </p>
    </div>
  );
}
