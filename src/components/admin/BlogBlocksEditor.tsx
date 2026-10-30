'use client';

import {
  ArrowDown,
  ArrowUp,
  CheckSquare,
  Heading,
  HelpCircle,
  Image as ImageIcon,
  Info,
  Megaphone,
  MessageSquareQuote,
  Pilcrow,
  Plus,
  Sparkles,
  Table as TableIcon,
  Trash2,
  X,
  type LucideIcon,
} from 'lucide-react';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { ButtonField, Field } from '@/components/admin/fields';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { newBlogBlock, type BlogBlock, type BlogBlockType } from '@/lib/blog';

/** The blocks an admin can add, with the same designs as the original articles. */
const BLOCK_TYPES: { type: BlogBlockType; label: string; icon: LucideIcon; description: string }[] = [
  { type: 'heading', label: 'Heading', icon: Heading, description: 'Section title (large or small)' },
  { type: 'text', label: 'Text', icon: Pilcrow, description: 'Paragraphs and bullet points' },
  { type: 'image', label: 'Image', icon: ImageIcon, description: 'Wide photo with caption' },
  { type: 'table', label: 'Table', icon: TableIcon, description: 'Specs or comparison table' },
  { type: 'callout', label: 'Highlight box', icon: Sparkles, description: 'Orange box with a title' },
  { type: 'infoBox', label: 'Info box', icon: Info, description: 'Light box for a Q&A or tip' },
  { type: 'note', label: 'Note', icon: MessageSquareQuote, description: 'Italic highlighted line' },
  { type: 'checklist', label: 'Checklist', icon: CheckSquare, description: 'Cards with a title and text' },
  { type: 'cta', label: 'Call to action', icon: Megaphone, description: 'Dark box with two buttons' },
  { type: 'faq', label: 'FAQ', icon: HelpCircle, description: 'Expandable questions' },
];

const blockMeta = (type: BlogBlockType) => BLOCK_TYPES.find((t) => t.type === type)!;

/** A short preview of a block's content for its card header. */
function blockSummary(block: BlogBlock) {
  switch (block.type) {
    case 'heading':
      return block.text;
    case 'text':
      return block.body.split('\n')[0];
    case 'image':
      return block.caption || (block.imageId ? 'Photo added' : 'No photo yet');
    case 'table':
      return block.title || `${block.rows.length} rows`;
    case 'callout':
    case 'infoBox':
      return block.title;
    case 'note':
      return block.text;
    case 'checklist':
      return `${block.items.length} items`;
    case 'cta':
      return block.heading;
    case 'faq':
      return `${block.items.length} questions`;
  }
}

function RemoveButton({ what, onConfirm, small }: { what: string; onConfirm: () => void; small?: boolean }) {
  return (
    <ConfirmDialog
      title={`Remove this ${what}?`}
      description={`The ${what} will be removed from the post. It disappears from the website after you save or update the post.`}
      confirmLabel="Remove"
      onConfirm={onConfirm}
      trigger={
        <Button type="button" size="icon" variant="ghost" className={cn('text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0', small ? 'size-8' : 'size-9')} aria-label={`Remove ${what}`}>
          {small ? <X className="size-4" /> : <Trash2 className="size-4" />}
        </Button>
      }
    />
  );
}

function TableEditor({ block, onChange }: { block: Extract<BlogBlock, { type: 'table' }>; onChange: (b: BlogBlock) => void }) {
  const columns = Math.max(1, block.headers.length);
  const cellsOf = (cells: string[]) => Array.from({ length: columns }, (_, i) => cells[i] ?? '');

  const setHeader = (i: number, value: string) => onChange({ ...block, headers: cellsOf(block.headers).map((h, j) => (j === i ? value : h)) });
  const setCell = (r: number, c: number, value: string) =>
    onChange({ ...block, rows: block.rows.map((row, i) => (i === r ? { cells: cellsOf(row.cells).map((v, j) => (j === c ? value : v)) } : row)) });
  const addColumn = () => onChange({ ...block, headers: [...cellsOf(block.headers), ''], rows: block.rows.map((r) => ({ cells: [...cellsOf(r.cells), ''] })) });
  const removeColumn = (c: number) =>
    onChange({
      ...block,
      headers: cellsOf(block.headers).filter((_, j) => j !== c),
      rows: block.rows.map((r) => ({ cells: cellsOf(r.cells).filter((_, j) => j !== c) })),
    });

  const grid = { gridTemplateColumns: `repeat(${columns}, minmax(8rem, 1fr)) 2.25rem` };

  return (
    <div className="space-y-4">
      <Field label="Table title (blue bar, optional)" value={block.title} onChange={(title) => onChange({ ...block, title })} />
      <div className="space-y-2">
        <Label className="text-primary font-semibold">Columns and rows</Label>
        <div className="overflow-x-auto">
          <div className="space-y-2 min-w-fit">
            <div className="grid gap-2 items-center" style={grid}>
              {cellsOf(block.headers).map((header, c) => (
                <div key={c} className="flex items-center gap-1">
                  <Input value={header} onChange={(e) => setHeader(c, e.target.value)} placeholder={`Heading ${c + 1}`} className="bg-white border-border font-semibold h-9 text-sm" />
                  {columns > 1 && <RemoveButton what="column" small onConfirm={() => removeColumn(c)} />}
                </div>
              ))}
              <span />
            </div>
            {block.rows.map((row, r) => (
              <div key={r} className="grid gap-2 items-center" style={grid}>
                {cellsOf(row.cells).map((cell, c) => (
                  <Input key={c} value={cell} onChange={(e) => setCell(r, c, e.target.value)} placeholder={c === 0 ? 'Row name' : 'Value'} className={cn('bg-white border-border h-9 text-sm', c === 0 && 'font-semibold')} />
                ))}
                <RemoveButton what="row" small onConfirm={() => onChange({ ...block, rows: block.rows.filter((_, i) => i !== r) })} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => onChange({ ...block, rows: [...block.rows, { cells: cellsOf([]) }] })}>
            <Plus className="size-4 mr-1" /> Add row
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={addColumn}>
            <Plus className="size-4 mr-1" /> Add column
          </Button>
        </div>
        <p className="text-xs text-foreground/50">Leave all headings empty for a table without a heading row. The first column is shown in bold.</p>
      </div>
    </div>
  );
}

function BlockFields({ block, onChange }: { block: BlogBlock; onChange: (b: BlogBlock) => void }) {
  switch (block.type) {
    case 'heading':
      return (
        <div className="grid md:grid-cols-[1fr_auto] gap-4 items-end">
          <Field label="Heading text" value={block.text} onChange={(text) => onChange({ ...block, text })} />
          <div className="flex rounded-lg bg-background p-1 h-10">
            {(['h2', 'h3'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => onChange({ ...block, level })}
                className={cn('px-3 rounded-md text-xs font-semibold', block.level === level ? 'bg-primary text-white' : 'text-foreground/60 hover:text-primary')}
              >
                {level === 'h2' ? 'Large' : 'Small'}
              </button>
            ))}
          </div>
        </div>
      );
    case 'text':
      return <Field label="Text" value={block.body} onChange={(body) => onChange({ ...block, body })} multiline hint='Leave an empty line between paragraphs. Start lines with "- " for bullet points.' />;
    case 'image':
      return (
        <div className="space-y-4">
          <ImageUpload label="Photo" imageId={block.imageId} onChange={(imageId) => onChange({ ...block, imageId })} />
          <Field label="Caption (optional)" value={block.caption} onChange={(caption) => onChange({ ...block, caption })} />
        </div>
      );
    case 'table':
      return <TableEditor block={block} onChange={onChange} />;
    case 'callout':
      return (
        <div className="space-y-4">
          <Field label="Title" value={block.title} onChange={(title) => onChange({ ...block, title })} />
          <Field label="Text" value={block.text} onChange={(text) => onChange({ ...block, text })} multiline />
        </div>
      );
    case 'infoBox':
      return (
        <div className="space-y-4">
          <Field label="Title" value={block.title} onChange={(title) => onChange({ ...block, title })} />
          <Field label="Text" value={block.body} onChange={(body) => onChange({ ...block, body })} multiline hint="Leave an empty line between paragraphs." />
        </div>
      );
    case 'note':
      return <Field label="Note text" value={block.text} onChange={(text) => onChange({ ...block, text })} />;
    case 'checklist':
      return (
        <div className="space-y-3">
          {block.items.map((item, i) => (
            <div key={i} className="flex gap-2 items-start p-3 rounded-xl bg-background">
              <div className="grid md:grid-cols-[14rem_1fr] gap-2 flex-1">
                <Input value={item.label} onChange={(e) => onChange({ ...block, items: block.items.map((it, j) => (j === i ? { ...it, label: e.target.value } : it)) })} placeholder="Title, e.g. Fluid" className="bg-white border-border font-semibold" />
                <Input value={item.desc} onChange={(e) => onChange({ ...block, items: block.items.map((it, j) => (j === i ? { ...it, desc: e.target.value } : it)) })} placeholder="Description" className="bg-white border-border" />
              </div>
              <RemoveButton what="item" small onConfirm={() => onChange({ ...block, items: block.items.filter((_, j) => j !== i) })} />
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => onChange({ ...block, items: [...block.items, { label: '', desc: '' }] })}>
            <Plus className="size-4 mr-1" /> Add item
          </Button>
        </div>
      );
    case 'cta':
      return (
        <div className="space-y-4">
          <Field label="Heading" value={block.heading} onChange={(heading) => onChange({ ...block, heading })} />
          <Field label="Text" value={block.body} onChange={(body) => onChange({ ...block, body })} multiline hint="Leave an empty line between paragraphs." />
          <div className="grid md:grid-cols-2 gap-5">
            <ButtonField label="Main button" value={block.primary} onChange={(primary) => onChange({ ...block, primary })} />
            <ButtonField label="Second button (optional)" value={block.secondary} onChange={(secondary) => onChange({ ...block, secondary })} />
          </div>
        </div>
      );
    case 'faq':
      return (
        <div className="space-y-3">
          <Field label="Heading" value={block.heading} onChange={(heading) => onChange({ ...block, heading })} />
          {block.items.map((item, i) => (
            <div key={i} className="p-3 rounded-xl bg-background space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground/40 w-5">{i + 1}</span>
                <Input value={item.question} onChange={(e) => onChange({ ...block, items: block.items.map((it, j) => (j === i ? { ...it, question: e.target.value } : it)) })} placeholder="Question" className="bg-white border-border font-semibold" />
                <RemoveButton what="question" small onConfirm={() => onChange({ ...block, items: block.items.filter((_, j) => j !== i) })} />
              </div>
              <div className="pl-7 pr-10">
                <textarea
                  value={item.answer}
                  onChange={(e) => onChange({ ...block, items: block.items.map((it, j) => (j === i ? { ...it, answer: e.target.value } : it)) })}
                  placeholder="Answer"
                  className="w-full min-h-[70px] rounded-md bg-white border border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => onChange({ ...block, items: [...block.items, { question: '', answer: '' }] })}>
            <Plus className="size-4 mr-1" /> Add question
          </Button>
        </div>
      );
  }
}

export function BlogBlocksEditor({ blocks, onChange }: { blocks: BlogBlock[]; onChange: (blocks: BlogBlock[]) => void }) {
  const move = (index: number, direction: -1 | 1) => {
    const next = [...blocks];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {blocks.length === 0 && (
        <div className="p-10 rounded-3xl bg-white border border-dashed border-border text-center text-sm text-foreground/60">
          This post has no content yet. Add your first block below.
        </div>
      )}

      {blocks.map((block, i) => {
        const meta = blockMeta(block.type);
        const Icon = meta.icon;
        const summary = blockSummary(block);
        return (
          <div key={block.id} className="rounded-3xl bg-white border border-border shadow-sm">
            <div className="flex items-center gap-3 px-5 py-3 border-b border-border">
              <span className="size-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-primary">{meta.label}</p>
                {summary && <p className="text-xs text-foreground/50 truncate">{summary}</p>}
              </div>
              <span className="text-xs text-foreground/40 hidden sm:block">{i + 1} / {blocks.length}</span>
              <div className="flex gap-1">
                <Button type="button" size="icon" variant="ghost" className="size-9" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
                  <ArrowUp className="size-4" />
                </Button>
                <Button type="button" size="icon" variant="ghost" className="size-9" onClick={() => move(i, 1)} disabled={i === blocks.length - 1} aria-label="Move down">
                  <ArrowDown className="size-4" />
                </Button>
                <RemoveButton what={meta.label.toLowerCase()} onConfirm={() => onChange(blocks.filter((_, j) => j !== i))} />
              </div>
            </div>
            <div className="p-5">
              <BlockFields block={block} onChange={(next) => onChange(blocks.map((b, j) => (j === i ? next : b)))} />
            </div>
          </div>
        );
      })}

      <div className="rounded-3xl border-2 border-dashed border-border bg-white/60 p-5">
        <p className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
          <Plus className="size-4 text-secondary" /> Add a block
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {BLOCK_TYPES.map(({ type, label, icon: Icon, description }) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange([...blocks, newBlogBlock(type)])}
              className="text-left p-3 rounded-2xl border border-border bg-white hover:border-secondary hover:shadow-md transition-all group"
            >
              <Icon className="size-5 text-secondary mb-2" />
              <p className="text-sm font-semibold text-primary">{label}</p>
              <p className="text-[11px] text-foreground/50 leading-snug">{description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
