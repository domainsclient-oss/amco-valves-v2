'use client';

import { useEffect, useState } from 'react';
import { doc, runTransaction, serverTimestamp, type Firestore } from 'firebase/firestore';
import { Loader2, Plus } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HOME_CONTENT_COLLECTION } from '@/lib/home-content';
import { PRODUCT_TAXONOMY_DOC, toProductTaxonomy, type ProductCategory, type ProductTaxonomy } from '@/lib/custom-products';

/** Applies a change to the saved categories in one transaction and returns the new value. */
export async function updateProductTaxonomy(db: Firestore, change: (taxonomy: ProductTaxonomy) => ProductTaxonomy) {
  const ref = doc(db, HOME_CONTENT_COLLECTION, PRODUCT_TAXONOMY_DOC);
  return runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const next = change(toProductTaxonomy(snap.exists() ? snap.data() : null));
    tx.set(ref, { ...next, updatedAt: serverTimestamp() });
    return next;
  });
}

/** Adds a new category (with its first sub-category), or a new sub-category to `category`. */
export function AddCategoryDialog({
  open,
  onOpenChange,
  category,
  categories,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When set, adds a sub-category to this category; otherwise adds a new category. */
  category?: ProductCategory;
  /** All current categories, to prevent duplicate names. */
  categories: ProductCategory[];
  onSaved: (taxonomy: ProductTaxonomy) => void;
}) {
  const db = useFirestore();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [subName, setSubName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTitle('');
    setSubName('');
  }, [open]);

  const addingSub = !!category;
  const cleanTitle = title.trim();
  const cleanSub = subName.trim();
  const titleTaken = !addingSub && categories.some((c) => c.title.toLowerCase() === cleanTitle.toLowerCase());
  const subTaken = addingSub && category!.subCategories.some((s) => s.name.toLowerCase() === cleanSub.toLowerCase());
  const canSave = !!cleanSub && (addingSub ? !subTaken : !!cleanTitle && !titleTaken);

  const save = async () => {
    if (!canSave) return;
    setIsSaving(true);
    try {
      const next = await updateProductTaxonomy(db, (t) => {
        if (!addingSub) return { ...t, categories: [...t.categories, { title: cleanTitle, subCategories: [cleanSub] }] };
        if (category!.isNew) {
          return { ...t, categories: t.categories.map((c) => (c.title === category!.title ? { ...c, subCategories: [...c.subCategories, cleanSub] } : c)) };
        }
        return { ...t, subCategories: [...t.subCategories, { category: category!.title, name: cleanSub }] };
      });
      toast({
        title: addingSub ? 'Sub-category added' : 'Category added',
        description: 'It appears in the site menu once it has a published product.',
      });
      onOpenChange(false);
      onSaved(next);
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Could not save',
        description: err?.code === 'permission-denied' ? 'This account is not allowed to change categories.' : err?.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !isSaving && onOpenChange(value)}>
      <DialogContent className="rounded-3xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-primary">{addingSub ? 'Add sub-category' : 'Add category'}</DialogTitle>
          <DialogDescription>
            {addingSub ? (
              <>
                New sub-category in <strong className="text-primary">{category!.title}</strong>, e.g. "Uni Directional".
              </>
            ) : (
              'A new product category with its first sub-category. You can add more sub-categories and products afterwards.'
            )}{' '}
            It appears in the site menu once it contains a published product.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!addingSub && (
            <div className="space-y-2">
              <Label htmlFor="new-category-title" className="text-primary font-semibold">Category name</Label>
              <Input
                id="new-category-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Globe Valve"
                className="bg-background border-none"
                autoFocus
              />
              {titleTaken && <p className="text-xs text-destructive">A category with this name already exists.</p>}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="new-subcategory-name" className="text-primary font-semibold">{addingSub ? 'Sub-category name' : 'First sub-category'}</Label>
            <Input
              id="new-subcategory-name"
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
              placeholder={addingSub ? 'e.g. Bi Directional' : 'e.g. Globe Valve Range'}
              className="bg-background border-none"
              autoFocus={addingSub}
            />
            {subTaken && <p className="text-xs text-destructive">This category already has a sub-category with this name.</p>}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>Cancel</Button>
          <Button variant="secondary" className="font-semibold" onClick={save} disabled={isSaving || !canSave}>
            {isSaving ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Plus className="size-4 mr-1" />}
            {addingSub ? 'Add sub-category' : 'Add category'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
