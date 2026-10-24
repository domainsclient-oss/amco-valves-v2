import { getBlogImage } from '@/lib/blog';

/** Serves a blog photo stored in Firestore. Photos never change once uploaded, so they cache forever. */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) {
    return new Response('Not found', { status: 404 });
  }

  const image = await getBlogImage(id);
  if (!image) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(Buffer.from(image.base64, 'base64'), {
    headers: {
      'Content-Type': image.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
