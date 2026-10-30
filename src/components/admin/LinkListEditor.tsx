'use client';

import { ArrowDown, ArrowUp, Plus, X } from 'lucide-react';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/** Editable list of { label, href } links with reorder, remove (confirmed) and add. */
export function LinkListEditor<T extends { label: string; href: string }>({
  links,
  onChange,
  newLink,
  isLocked,
  lockedNote,
  what = 'link',
}: {
  links: T[];
  onChange: (links: T[]) => void;
  /** Value for a newly added link. */
  newLink: () => T;
  /** Links that can't be removed (e.g. the menu item that opens the products menu). */
  isLocked?: (link: T) => boolean;
  lockedNote?: string;
  what?: string;
}) {
  const set = (i: number, patch: Partial<T>) => onChange(links.map((l, j) => (j === i ? { ...l, ...patch } : l)));
  const move = (i: number, direction: -1 | 1) => {
    const next = [...links];
    const target = i + direction;
    if (target < 0 || target >= next.length) return;
    [next[i], next[target]] = [next[target], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {links.map((link, i) => {
        const locked = isLocked?.(link) ?? false;
        return (
          <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-background">
            <div className="grid md:grid-cols-[14rem_1fr] gap-2 flex-1">
              <Input value={link.label} onChange={(e) => set(i, { label: e.target.value } as Partial<T>)} placeholder="Label" className="bg-white border-border font-semibold" aria-label="Link label" />
              <Input value={link.href} onChange={(e) => set(i, { href: e.target.value } as Partial<T>)} placeholder="/#contact, /blog or https://…" className="bg-white border-border" aria-label="Link address" />
            </div>
            <div className="flex shrink-0 items-center">
              <Button type="button" size="icon" variant="ghost" className="size-8" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
                <ArrowUp className="size-4" />
              </Button>
              <Button type="button" size="icon" variant="ghost" className="size-8" onClick={() => move(i, 1)} disabled={i === links.length - 1} aria-label="Move down">
                <ArrowDown className="size-4" />
              </Button>
              {locked ? (
                <span className="text-[10px] font-semibold text-secondary px-2 w-8 text-center" title={lockedNote}>★</span>
              ) : (
                <ConfirmDialog
                  title={`Remove this ${what}?`}
                  description={
                    <>
                      <strong className="text-primary">{link.label || `This ${what}`}</strong> will be removed after you click "Save changes".
                    </>
                  }
                  confirmLabel="Remove"
                  onConfirm={() => onChange(links.filter((_, j) => j !== i))}
                  trigger={
                    <Button type="button" size="icon" variant="ghost" className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10" aria-label={`Remove ${what}`}>
                      <X className="size-4" />
                    </Button>
                  }
                />
              )}
            </div>
          </div>
        );
      })}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...links, newLink()])}>
          <Plus className="size-4 mr-1" /> Add {what}
        </Button>
        {lockedNote && links.some((l) => isLocked?.(l)) && <p className="text-xs text-foreground/50">★ {lockedNote}</p>}
      </div>
    </div>
  );
}
