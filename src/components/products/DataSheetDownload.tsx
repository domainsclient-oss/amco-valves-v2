"use client";

import { cloneElement, type ReactElement } from "react";
import { Download, FileSpreadsheet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { rowCells, type ProductContent, type ProductTable } from "@/lib/product-content";

/** Name of a data-sheet table for menus and file names. */
export function dataSheetName(table: ProductTable, index: number) {
  return table.title.trim() || table.groups.map((g) => g.label).filter(Boolean).join(" / ") || `Data sheet ${index + 1}`;
}

const csvCell = (cell: string) => `"${String(cell).replace(/"/g, '""')}"`;

/** CSV rows for one table: its name, optional group headings, column headings and rows. */
function tableRows(table: ProductTable, index: number): string[][] {
  const rows: string[][] = [[dataSheetName(table, index)]];
  if (table.groups.length) {
    // Group headings span columns; repeat each over its columns so they line up in a spreadsheet.
    // Usually the first column (e.g. SIZE) has no group; some tables group every column.
    const covered = table.groups.reduce((sum, g) => sum + g.span, 0);
    const groupRow: string[] = Array.from({ length: Math.max(0, table.headers.length - covered) }, () => "");
    table.groups.forEach((g) => groupRow.push(...Array.from({ length: g.span }, () => g.label)));
    rows.push(groupRow);
  }
  rows.push(table.headers);
  table.rows.forEach((row) => rows.push(row.kind === "section" ? [row.cells[0] ?? ""] : rowCells(table, row)));
  if (table.note) rows.push([table.note]);
  return rows;
}

/** CSV text with the product's specifications plus the given tables. */
export function buildDataSheetCsv(content: ProductContent, tables: { table: ProductTable; index: number }[]) {
  const rows: string[][] = [
    ["Specification", "Details"],
    ["Product", content.title],
    ["Category", content.category],
    ...content.specs.map((spec) => [spec.label + (spec.subLabel ? ` ${spec.subLabel}` : ""), spec.value]),
  ];
  tables.forEach(({ table, index }) => rows.push([], ...tableRows(table, index)));
  return rows.map((row) => row.map(csvCell).join(",")).join("\n");
}

/** Downloads the product's specifications plus the given tables as a CSV file. */
function downloadCsv(content: ProductContent, tables: { table: ProductTable; index: number }[], suffix: string) {
  const csv = buildDataSheetCsv(content, tables);
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const link = document.createElement("a");
  const base = (content.title || "Product").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  link.href = url;
  link.download = `${base}_${suffix.replace(/[^A-Za-z0-9#]+/g, "_").replace(/#/g, "").replace(/^_+|_+$/g, "")}.csv`;
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Wraps a product page's "Download Data Sheet" button. With one table or none the button works
 * exactly as before (the page's own download). With several tables, the same button opens a menu
 * to download all data sheets or a single one.
 */
export function DataSheetDownload({ content, children }: { content: ProductContent; children: ReactElement<{ onClick?: unknown }> }) {
  const tables = content.tables;
  if (tables.length <= 1) return children;

  // The button opens the menu instead of downloading straight away.
  const trigger = cloneElement(children, { onClick: undefined });
  const all = tables.map((table, index) => ({ table, index }));

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[min(22rem,calc(100vw-2rem))] rounded-xl">
        <DropdownMenuLabel className="text-xs font-semibold text-foreground/50">Choose a data sheet</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => downloadCsv(content, all, "Data_Sheet")} className="cursor-pointer font-semibold text-primary">
          <Download className="mr-2 size-4 shrink-0" /> Download all data sheets
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {all.map(({ table, index }) => (
          <DropdownMenuItem
            key={index}
            onSelect={() => downloadCsv(content, [{ table, index }], dataSheetName(table, index))}
            className="group cursor-pointer items-start"
          >
            <FileSpreadsheet className="mr-2 mt-0.5 size-4 shrink-0 text-secondary group-focus:text-white" />
            <span className="leading-snug">{dataSheetName(table, index)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
