/**
 * Shrinks a photo in the browser so it fits in a single Firestore document
 * (limit 1 MiB). Tries progressively smaller sizes / lower quality until the
 * base64 result is under MAX_BASE64_LENGTH.
 */

const MAX_BASE64_LENGTH = 900_000;
const ATTEMPTS: [maxWidth: number, quality: number][] = [
  [1600, 0.82],
  [1600, 0.7],
  [1280, 0.7],
  [1024, 0.65],
  [800, 0.6],
];

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
}

function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

export async function compressImage(file: File) {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file (JPG, PNG or WebP).');
  }

  const bitmap = await createImageBitmap(file);
  try {
    for (const [maxWidth, quality] of ATTEMPTS) {
      const scale = Math.min(1, maxWidth / bitmap.width);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Your browser could not process this image.');
      // White background so transparent PNGs don't turn black as JPEG.
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

      // Safari can't encode WebP and falls back to PNG, so use JPEG there.
      let blob = await canvasToBlob(canvas, 'image/webp', quality);
      if (!blob || blob.type !== 'image/webp') blob = await canvasToBlob(canvas, 'image/jpeg', quality);
      if (!blob) continue;

      const base64 = await blobToBase64(blob);
      if (base64.length <= MAX_BASE64_LENGTH) {
        return { base64, contentType: blob.type, width: canvas.width, height: canvas.height };
      }
    }
  } finally {
    bitmap.close();
  }
  throw new Error('This image is too large even after compression. Please use a smaller photo.');
}
