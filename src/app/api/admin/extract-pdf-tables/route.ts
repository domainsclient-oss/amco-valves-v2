import { NextResponse } from "next/server";
import { extractPdfTables } from "@/ai/flows/extract-pdf-tables";
import { firebaseConfig } from "@/firebase/config";

/**
 * Reads data-sheet tables from an uploaded PDF (admin only) and returns them in the
 * product editor's table format, so they can be checked and edited before saving.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

// Vercel accepts request bodies up to 4.5 MB.
const MAX_BYTES = 4 * 1024 * 1024;

/** Checks the Firebase ID token and that the user is listed in roles_admin. */
async function isAdmin(idToken: string) {
  try {
    const lookup = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      cache: "no-store",
    });
    if (!lookup.ok) return false;
    const uid: unknown = (await lookup.json())?.users?.[0]?.localId;
    if (typeof uid !== "string" || !uid) return false;
    const role = await fetch(
      `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/roles_admin/${encodeURIComponent(uid)}`,
      { headers: { Authorization: `Bearer ${idToken}` }, cache: "no-store" }
    );
    return role.ok;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const idToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!idToken || !(await isAdmin(idToken))) {
    return NextResponse.json({ error: "Only admins can upload data sheets." }, { status: 403 });
  }

  if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
    return NextResponse.json(
      { error: "PDF reading isn't set up yet: a Gemini API key (GEMINI_API_KEY) must be added to the site settings. You can still add the table manually." },
      { status: 503 }
    );
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No PDF was uploaded." }, { status: 400 });
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    return NextResponse.json({ error: "Please upload a PDF file." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "The PDF is too large. Please upload a file under 4 MB." }, { status: 413 });

  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.subarray(0, 5).toString() !== "%PDF-") return NextResponse.json({ error: "This file is not a valid PDF." }, { status: 400 });

  try {
    const tables = await extractPdfTables(bytes);
    if (!tables.length) return NextResponse.json({ error: "No tables were found in this PDF." }, { status: 422 });
    return NextResponse.json({ tables });
  } catch (error) {
    console.error("PDF table extraction failed", error);
    return NextResponse.json({ error: "Couldn't read tables from this PDF. Please try again or enter the table manually." }, { status: 502 });
  }
}
