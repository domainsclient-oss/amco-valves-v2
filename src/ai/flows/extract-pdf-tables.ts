import { z } from "genkit";
import { ai } from "@/ai/genkit";
import type { ProductTable } from "@/lib/product-content";

/** Reads data-sheet tables from a PDF with Gemini, in the product editor's table format. Server only. */

const TableSchema = z.object({
  title: z.string().describe("Title row above the table, e.g. 'A105 GLOBE VALVE FLANGED 150#'. Empty string if none."),
  groups: z
    .array(z.object({ label: z.string(), span: z.number().int() }))
    .describe(
      "Optional heading row ABOVE the column headings that groups several columns, e.g. 'TO SUIT 150# FLANGES' over 3 columns. " +
        "Groups cover every column EXCEPT the first one, left to right; spans must add up to (number of headers - 1). Empty array if the table has no such row."
    ),
  headers: z.array(z.string()).describe("Column headings, left to right, one per column, e.g. ['SIZE', 'A', 'B', 'WEIGHT (KG)']."),
  rows: z
    .array(
      z.object({
        cells: z.array(z.string()).describe("One value per column, exactly as printed. Use an empty string for an empty cell. For a 'section' row put only its heading."),
        kind: z
          .enum(["", "section", "child"])
          .describe("'' for a normal row; 'section' for a heading row spanning the whole table (e.g. 'DN700'); 'child' for a row listed under the section above it."),
      })
    )
    .describe("Data rows, top to bottom."),
  note: z.string().describe("Footnote under the table, e.g. 'All dimensions are in mm'. Empty string if none."),
});

const OutputSchema = z.object({ tables: z.array(TableSchema) });

const PROMPT = `This PDF is a valve data sheet. Extract EVERY data table in it, in the order they appear.
Copy all values exactly as printed (numbers, units, symbols like #, Ø, ±, fractions). Do not calculate, translate, round or invent values.
If one heading cell spans several columns, use the "groups" row for it. If a table continues on the next page, merge it into one table.
Ignore logos, page headers/footers and paragraphs that are not tables.`;

const clean = (value: unknown) => String(value ?? "").replace(/\s+/g, " ").trim();

/** Makes the model's tables safe to show: every row has one cell per column and group spans fit. */
function normalize(raw: z.infer<typeof TableSchema>): ProductTable | null {
  const headers = raw.headers.map(clean);
  const width = Math.max(headers.length, ...raw.rows.map((r) => r.cells.length), 1);
  while (headers.length < width) headers.push("");
  const rows = raw.rows
    .map((r) =>
      r.kind === "section"
        ? { cells: [clean(r.cells.find((c) => clean(c)) ?? ""), ...Array.from({ length: width - 1 }, () => "")], kind: "section" as const }
        : { cells: Array.from({ length: width }, (_, i) => clean(r.cells[i])), kind: r.kind === "child" ? ("child" as const) : ("" as const) }
    )
    .filter((r) => r.cells.some(Boolean));
  if (!rows.length && !headers.some(Boolean)) return null;

  let groups = raw.groups.map((g) => ({ label: clean(g.label), span: Math.max(1, Math.round(Number(g.span) || 1)) }));
  const covered = groups.reduce((sum, g) => sum + g.span, 0);
  // The pages draw groups over every column except the first.
  if (covered > width - 1) groups = [];
  else if (groups.length && covered < width - 1) groups.push({ label: "", span: width - 1 - covered });

  return { title: clean(raw.title), groups, headers, rows, note: clean(raw.note) };
}

/** Returns the tables found in the PDF (possibly none). Throws if the model call fails. */
export async function extractPdfTables(pdf: Buffer): Promise<ProductTable[]> {
  const { output } = await ai.generate({
    prompt: [{ media: { url: `data:application/pdf;base64,${pdf.toString("base64")}`, contentType: "application/pdf" } }, { text: PROMPT }],
    output: { schema: OutputSchema },
    config: { temperature: 0, maxOutputTokens: 32768 },
  });
  return (output?.tables ?? []).map(normalize).filter((t): t is ProductTable => t !== null);
}
