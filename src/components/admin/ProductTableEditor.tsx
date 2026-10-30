'use client';

import { useRef, useState } from 'react';
import { ArrowDown, ArrowUp, FileUp, Loader2, Plus, Trash2, X } from 'lucide-react';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Field } from '@/components/admin/fields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { ProductTable, ProductTableRow } from '@/lib/product-content';

const ROW_KINDS: { value: ProductTableRow['kind']; label: string }[] = [
  { value: '', label: 'Row' },
  { value: 'section', label: 'Section' },
  { value: 'child', label: 'Sub-row' },
];

function RemoveButton({ what, onConfirm }: { what: string; onConfirm: () => void }) {
  return (
    <ConfirmDialog
      title={`Remove this ${what}?`}
      description={`The ${what} will be removed from the data sheet. It disappears from the website after you click "Save changes".`}
      confirmLabel="Remove"
      onConfirm={onConfirm}
      trigger={
        <Button type="button" size="icon" variant="ghost" className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0" aria-label={`Remove ${what}`}>
          <X className="size-4" />
        </Button>
      }
    />
  );
}

/** One data-sheet table: title, optional group headings, columns, rows and footnote. */
function TableCard({
  table,
  index,
  count,
  onChange,
  onMove,
  onRemove,
}: {
  table: ProductTable;
  index: number;
  count: number;
  onChange: (table: ProductTable) => void;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
}) {
  const columns = table.headers.length;
  const pad = (cells: string[]) => Array.from({ length: columns }, (_, i) => cells[i] ?? '');

  const setHeader = (i: number, value: string) => onChange({ ...table, headers: table.headers.map((h, j) => (j === i ? value : h)) });
  const setCell = (r: number, c: number, value: string) =>
    onChange({ ...table, rows: table.rows.map((row, i) => (i === r ? { ...row, cells: pad(row.cells).map((v, j) => (j === c ? value : v)) } : row)) });
  const setRow = (r: number, patch: Partial<ProductTableRow>) => onChange({ ...table, rows: table.rows.map((row, i) => (i === r ? { ...row, ...patch } : row)) });
  const moveRow = (r: number, direction: -1 | 1) => {
    const rows = [...table.rows];
    const target = r + direction;
    if (target < 0 || target >= rows.length) return;
    [rows[r], rows[target]] = [rows[target], rows[r]];
    onChange({ ...table, rows });
  };
  const addColumn = () =>
    onChange({ ...table, headers: [...table.headers, ''], rows: table.rows.map((r) => ({ ...r, cells: [...pad(r.cells), ''] })) });
  const removeColumn = (c: number) =>
    onChange({
      ...table,
      headers: table.headers.filter((_, j) => j !== c),
      rows: table.rows.map((r) => ({ ...r, cells: pad(r.cells).filter((_, j) => j !== c) })),
    });

  const groupSpan = table.groups.reduce((sum, g) => sum + g.span, 0);
  const grid = { gridTemplateColumns: `6.5rem repeat(${Math.max(1, columns)}, minmax(7.5rem, 1fr)) 4.75rem` };

  return (
    <div className="rounded-3xl bg-white border border-border shadow-sm">
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-primary">Table {index + 1}</p>
          <p className="text-xs text-foreground/50 truncate">
            {table.title || 'No title'} · {columns} columns · {table.rows.length} rows
          </p>
        </div>
        <div className="flex gap-1">
          <Button type="button" size="icon" variant="ghost" className="size-9" onClick={() => onMove(-1)} disabled={index === 0} aria-label="Move table up">
            <ArrowUp className="size-4" />
          </Button>
          <Button type="button" size="icon" variant="ghost" className="size-9" onClick={() => onMove(1)} disabled={index === count - 1} aria-label="Move table down">
            <ArrowDown className="size-4" />
          </Button>
          <ConfirmDialog
            title="Remove this table?"
            description={
              <>
                <strong className="text-primary">{table.title || `Table ${index + 1}`}</strong> and all its rows will be removed from the data sheet. It
                disappears from the website after you click "Save changes".
              </>
            }
            confirmLabel="Remove table"
            onConfirm={onRemove}
            trigger={
              <Button type="button" size="icon" variant="ghost" className="size-9 text-destructive hover:text-destructive hover:bg-destructive/10" aria-label="Remove table">
                <Trash2 className="size-4" />
              </Button>
            }
          />
        </div>
      </div>

      <div className="p-5 space-y-5">
        <Field label="Table title (top row, optional)" value={table.title} onChange={(title) => onChange({ ...table, title })} />

        {/* Optional group headings, e.g. "TO SUIT 150# FLANGES" over three columns. */}
        <div className="space-y-2">
          <Label className="text-primary font-semibold">Group headings (optional)</Label>
          <p className="text-xs text-foreground/50">
            A row above the column headings that groups columns, e.g. "TO SUIT 150# FLANGES" over 3 columns. The first column heading then spans both rows.
            {table.groups.length > 0 && ` Spans should add up to ${Math.max(0, columns - 1)} (all columns except the first); now ${groupSpan}.`}
          </p>
          {table.groups.map((group, g) => (
            // On phones the label takes its own line; no effect from 640px up.
            <div key={g} className="flex items-center gap-2 max-sm:flex-wrap">
              <Input
                value={group.label}
                onChange={(e) => onChange({ ...table, groups: table.groups.map((x, j) => (j === g ? { ...x, label: e.target.value } : x)) })}
                placeholder="Group heading"
                className="bg-background border-none h-9 text-sm"
              />
              <span className="text-xs text-foreground/50 whitespace-nowrap">over</span>
              <Input
                type="number"
                min={1}
                value={group.span}
                onChange={(e) =>
                  onChange({ ...table, groups: table.groups.map((x, j) => (j === g ? { ...x, span: Math.max(1, Number(e.target.value) || 1) } : x)) })
                }
                className="bg-background border-none h-9 text-sm w-20"
                aria-label="Number of columns"
              />
              <span className="text-xs text-foreground/50 whitespace-nowrap">columns</span>
              <RemoveButton what="group heading" onConfirm={() => onChange({ ...table, groups: table.groups.filter((_, j) => j !== g) })} />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChange({ ...table, groups: [...table.groups, { label: '', span: Math.max(1, columns - 1 - groupSpan) }] })}
          >
            <Plus className="size-4 mr-1" /> Add group heading
          </Button>
        </div>

        <div className="space-y-2">
          <Label className="text-primary font-semibold">Columns and rows</Label>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <div className="min-w-fit p-2 space-y-1.5">
              <div className="grid gap-1.5 items-center" style={grid}>
                <span className="text-[11px] font-semibold text-foreground/40 px-1">Row type</span>
                {table.headers.map((header, c) => (
                  <div key={c} className="flex items-center gap-1">
                    <Input value={header} onChange={(e) => setHeader(c, e.target.value)} placeholder={`Heading ${c + 1}`} className="bg-primary/5 border-border font-semibold h-9 text-xs uppercase" />
                    {columns > 1 && <RemoveButton what="column" onConfirm={() => removeColumn(c)} />}
                  </div>
                ))}
                <span />
              </div>
              {table.rows.map((row, r) => (
                <div key={r} className="grid gap-1.5 items-center" style={grid}>
                  <select
                    value={row.kind}
                    onChange={(e) => setRow(r, { kind: e.target.value as ProductTableRow['kind'] })}
                    className="h-9 rounded-md border border-border bg-white px-2 text-xs"
                    aria-label="Row type"
                  >
                    {ROW_KINDS.map((k) => (
                      <option key={k.value} value={k.value}>{k.label}</option>
                    ))}
                  </select>
                  {row.kind === 'section' ? (
                    <Input
                      value={row.cells[0] ?? ''}
                      onChange={(e) => setCell(r, 0, e.target.value)}
                      placeholder="Section heading, e.g. DN700"
                      className="bg-neutral-50 border-border font-bold h-9 text-sm"
                      style={{ gridColumn: `span ${Math.max(1, columns)}` }}
                    />
                  ) : (
                    pad(row.cells).map((cell, c) => (
                      <Input
                        key={c}
                        value={cell}
                        onChange={(e) => setCell(r, c, e.target.value)}
                        className={cn('bg-white border-border h-9 text-sm', c === 0 && 'font-semibold', c === 0 && row.kind === 'child' && 'pl-5')}
                      />
                    ))
                  )}
                  <div className="flex">
                    <Button type="button" size="icon" variant="ghost" className="size-8" onClick={() => moveRow(r, -1)} disabled={r === 0} aria-label="Move row up">
                      <ArrowUp className="size-3.5" />
                    </Button>
                    <RemoveButton what="row" onConfirm={() => onChange({ ...table, rows: table.rows.filter((_, i) => i !== r) })} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => onChange({ ...table, rows: [...table.rows, { cells: pad([]), kind: '' }] })}>
              <Plus className="size-4 mr-1" /> Add row
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={addColumn}>
              <Plus className="size-4 mr-1" /> Add column
            </Button>
          </div>
          <p className="text-xs text-foreground/50">
            Row types: <strong>Row</strong> is a normal row; <strong>Section</strong> is a heading across the table (e.g. a size like DN700);{' '}
            <strong>Sub-row</strong> is a row grouped under the section above it.
          </p>
        </div>

        <Field label="Footnote (optional)" value={table.note} onChange={(note) => onChange({ ...table, note })} hint='e.g. "All dimensions are in mm".' />
      </div>
    </div>
  );
}

/** All data-sheet tables of a product, with add / reorder / remove. */
export function ProductTablesEditor({ tables, onChange }: { tables: ProductTable[]; onChange: (tables: ProductTable[]) => void }) {
  const move = (index: number, direction: -1 | 1) => {
    const next = [...tables];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const addTable = () => {
    // Start from the previous table's columns, which is usually what a new size range needs.
    const last = tables[tables.length - 1];
    const headers = last ? last.headers.map((h) => h) : ['SIZE', '', ''];
    onChange([...tables, { title: '', groups: [], headers, rows: [{ cells: headers.map(() => ''), kind: '' }], note: last?.note ?? '' }]);
  };

  // Reads the tables from a data-sheet PDF and adds them below, to be checked before saving.
  const { user } = useUser();
  const { toast } = useToast();
  const fileInput = useRef<HTMLInputElement>(null);
  const [reading, setReading] = useState(false);
  const uploadPdf = async (file: File) => {
    if (!user) return;
    setReading(true);
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/admin/extract-pdf-tables', {
        method: 'POST',
        headers: { Authorization: `Bearer ${await user.getIdToken()}` },
        body,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !Array.isArray(data.tables)) throw new Error(data.error || "Couldn't read tables from this PDF.");
      onChange([...tables, ...(data.tables as ProductTable[])]);
      toast({
        title: `Added ${data.tables.length} table${data.tables.length === 1 ? '' : 's'} from the PDF`,
        description: 'Please check the values, then click "Save changes".',
      });
    } catch (error) {
      toast({ variant: 'destructive', title: 'PDF upload failed', description: error instanceof Error ? error.message : String(error) });
    } finally {
      setReading(false);
    }
  };

  return (
    <div className="space-y-4">
      {tables.length === 0 && (
        <div className="p-10 rounded-3xl bg-white border border-dashed border-border text-center text-sm text-foreground/60">This product has no data sheet tables.</div>
      )}
      {tables.map((table, i) => (
        <TableCard
          key={i}
          table={table}
          index={i}
          count={tables.length}
          onChange={(next) => onChange(tables.map((t, j) => (j === i ? next : t)))}
          onMove={(direction) => move(i, direction)}
          onRemove={() => onChange(tables.filter((_, j) => j !== i))}
        />
      ))}
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={addTable}>
          <Plus className="size-4 mr-1" /> Add table
        </Button>
        <Button type="button" variant="outline" onClick={() => fileInput.current?.click()} disabled={reading || !user}>
          {reading ? <Loader2 className="size-4 mr-1 animate-spin" /> : <FileUp className="size-4 mr-1" />}
          {reading ? 'Reading PDF…' : 'Upload PDF'}
        </Button>
        <input
          ref={fileInput}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = '';
            if (file) uploadPdf(file);
          }}
        />
      </div>
      <p className="text-xs text-foreground/50">
        Add a table and type the values, or upload a data-sheet PDF (under 4 MB) to add its tables automatically. Uploaded tables are added at the end for you to check before saving.
      </p>
    </div>
  );
}
