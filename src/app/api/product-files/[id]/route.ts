import { getRestDoc } from '@/lib/firestore-rest';
import { BLOG_IMAGES_COLLECTION } from '@/lib/blog';

const ID = /^[A-Za-z0-9_-]{1,64}$/;

/**
 * Serves an uploaded product PDF (see src/lib/product-files.ts) as a download.
 * Files never change once uploaded (a replacement gets a new id), so they cache forever.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!ID.test(id)) return new Response('Not found', { status: 404 });

  const manifest = await getRestDoc(`${BLOG_IMAGES_COLLECTION}/${id}`, { revalidate: false });
  const data = manifest?.data;
  const chunkIds = Array.isArray(data?.chunkIds) ? (data.chunkIds as unknown[]).map(String) : [];
  if (!data || data.kind !== 'file' || !chunkIds.length || !chunkIds.every((c) => ID.test(c))) {
    return new Response('Not found', { status: 404 });
  }

  const chunks = await Promise.all(chunkIds.map((c) => getRestDoc(`${BLOG_IMAGES_COLLECTION}/${c}`, { revalidate: false })));
  if (chunks.some((c) => !c || typeof c.data.data !== 'string')) {
    return new Response('File is incomplete', { status: 500 });
  }
  const body = Buffer.concat(chunks.map((c) => Buffer.from(c!.data.data as string, 'base64')));

  const fileName = (typeof data.fileName === 'string' && data.fileName.trim()) || 'data-sheet.pdf';
  const asciiName = fileName.replace(/[^\x20-\x7E]+/g, '_').replace(/["\\]/g, '');

  return new Response(body, {
    headers: {
      'Content-Type': typeof data.contentType === 'string' ? data.contentType : 'application/pdf',
      'Content-Length': String(body.length),
      'Content-Disposition': `attachment; filename="${asciiName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
