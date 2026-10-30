'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/** Renames a category or sub-category (only its displayed name changes). */
export function RenameDialog({
  open,
  onOpenChange,
  title,
  description,
  initialValue,
  isTaken,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  initialValue: string;
  /** Returns true when the name is already used by a sibling. */
  isTaken: (name: string) => boolean;
  onSave: (name: string) => Promise<void>;
}) {
  const [value, setValue] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) setValue(initialValue);
  }, [open, initialValue]);

  const clean = value.trim();
  const taken = clean.toLowerCase() !== initialValue.toLowerCase() && isTaken(clean);
  const canSave = !!clean && clean !== initialValue && !taken;

  const save = async () => {
    if (!canSave) return;
    setIsSaving(true);
    try {
      await onSave(clean);
      onOpenChange(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !isSaving && onOpenChange(v)}>
      <DialogContent className="rounded-3xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="rename-input" className="text-primary font-semibold">Name</Label>
          <Input
            id="rename-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && save()}
            className="bg-background border-none"
            autoFocus
          />
          {taken && <p className="text-xs text-destructive">This name is already used.</p>}
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>Cancel</Button>
          <Button variant="secondary" className="font-semibold" onClick={save} disabled={isSaving || !canSave}>
            {isSaving && <Loader2 className="size-4 mr-2 animate-spin" />}
            Save name
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
