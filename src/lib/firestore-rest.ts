import { firebaseConfig } from "@/firebase/config";

/**
 * Minimal read-only access to Firestore over its REST API, for server
 * components (and plain browser fetches) reading publicly readable data.
 * Unlike the client SDK, these requests go through Next's fetch cache.
 */

const BASE_URL = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`;

type FirestoreValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  timestampValue?: string;
  nullValue?: null;
  mapValue?: { fields?: Record<string, FirestoreValue> };
  arrayValue?: { values?: FirestoreValue[] };
};

type FirestoreDocument = { name: string; fields?: Record<string, FirestoreValue> };

type FetchOptions = { revalidate?: number | false; tags?: string[] };

function decodeValue(value: FirestoreValue): unknown {
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.integerValue !== undefined) return Number(value.integerValue);
  if (value.doubleValue !== undefined) return value.doubleValue;
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.timestampValue !== undefined) return value.timestampValue;
  if (value.mapValue) return decodeFields(value.mapValue.fields ?? {});
  if (value.arrayValue) return (value.arrayValue.values ?? []).map(decodeValue);
  return null;
}

function decodeFields(fields: Record<string, FirestoreValue>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, decodeValue(v)]));
}

function decodeDocument(doc: FirestoreDocument) {
  return { id: doc.name.split("/").pop() ?? "", data: decodeFields(doc.fields ?? {}) };
}

/** Reads one document. Returns null if it doesn't exist, isn't readable, or the request fails. */
export async function getRestDoc(path: string, options: FetchOptions = {}) {
  try {
    const res = await fetch(`${BASE_URL}/${path}?key=${firebaseConfig.apiKey}`, { next: options });
    if (!res.ok) return null;
    return decodeDocument(await res.json());
  } catch {
    return null;
  }
}

/**
 * Returns documents in `collectionId` whose fields equal the given values.
 * Returns an empty list if the query fails.
 */
export async function queryRestDocs(
  collectionId: string,
  equals: Record<string, string>,
  options: FetchOptions = {},
) {
  const filters = Object.entries(equals).map(([field, value]) => ({
    fieldFilter: { field: { fieldPath: field }, op: "EQUAL", value: { stringValue: value } },
  }));
  const where = filters.length === 1 ? filters[0] : { compositeFilter: { op: "AND", filters } };

  try {
    const res = await fetch(`${BASE_URL}:runQuery?key=${firebaseConfig.apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ structuredQuery: { from: [{ collectionId }], where } }),
      next: options,
    });
    if (!res.ok) return [];
    const rows: { document?: FirestoreDocument }[] = await res.json();
    return rows.flatMap((row) => (row.document ? [decodeDocument(row.document)] : []));
  } catch {
    return [];
  }
}
