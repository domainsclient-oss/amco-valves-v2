/**
 * Uploaded product files (catalog / data-sheet PDFs).
 *
 * Files are kept in Firestore, in the same `blogImages` collection as uploaded photos
 * (public read, admin-only write, so no extra security rules are needed). A Firestore
 * document holds at most 1 MiB, so a file is split into base64 chunks:
 *
 *   blogImages/<fileId>         { kind: "file", fileName, contentType, size, chunkIds: [...] }
 *   blogImages/<chunkId> (each) { kind: "fileChunk", fileId, index, data: "<base64>" }
 *
 * The file is served (and downloaded) from /api/product-files/<fileId>.
 */

/** Raw bytes per chunk; base64 makes it ~800 KB, well under Firestore's 1 MiB document limit. */
export const FILE_CHUNK_BYTES = 600 * 1024;

/** Largest PDF the admin may upload. */
export const MAX_PRODUCT_FILE_BYTES = 20 * 1024 * 1024;

export const PRODUCT_FILE_URL_PREFIX = "/api/product-files/";

export function productFileUrl(fileId: string) {
  return `${PRODUCT_FILE_URL_PREFIX}${fileId}`;
}

export function isProductFileUrl(src: string) {
  return /^\/api\/product-files\/[A-Za-z0-9_-]{1,64}$/.test(src);
}

/** "1.4 MB" style size label. */
export function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
