'use client';

import { useEffect, useState } from 'react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Loader2, Plus } from 'lucide-react';
import { useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  CUSTOM_PRODUCTS_COLLECTION,
  customProductDocId,
  emptyProductContent,
  suggestProductSlug,
  type CustomProduct,
} from '@/lib/custom-products';
import type { ProductContent } from '@/lib/product-content';

/** A product in the same sub-category whose page can be copied as a starting point. */
export interface ProductTemplate {
  slug: string;
  title: string;
  content: ProductContent;
}

/** Creates a new product (as a draft) in a menu category / sub-category. */
export function AddProductDialog({
  open,
  onOpenChange,
  category,
  subCategory,
  templates,
  takenSlugs,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: string;
  subCategory: string;
  templates: ProductTemplate[];
  /** Web addresses already used by other products. */
  takenSlugs: Set<string>;
  onCreated: (product: CustomProduct) => void;
}) {
  const db = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const [template, setTemplate] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Start fresh each time the dialog opens for a sub-category.
  useEffect(() => {
    if (!open) return;
    setName('');
    setSlug('');
    setSlugEdited(false);
    setTemplate(templates[0]?.slug ?? '');
  }, [open, templates]);

  const cleanSlug = slug.trim().replace(/^\/+|\/+$/g, '');
  const slugError = !cleanSlug
    ? ''
    : !/^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(cleanSlug)
      ? 'Use lowercase letters, numbers, - and / only.'
      : takenSlugs.has(cleanSlug)
        ? 'Another product already uses this web address.'
        : '';

  const create = async () => {
    const title = name.trim();
    if (!title || !cleanSlug || slugError) return;
    setIsCreating(true);
    try {
      const source = templates.find((t) => t.slug === template);
      const content: ProductContent = source ? { ...source.content, title } : emptyProductContent(category, title);
      const product: CustomProduct = {
        id: customProductDocId(cleanSlug),
        slug: cleanSlug,
        category,
        subCategory,
        menuName: title,
        content,
        status: 'draft',
      };
      const { id, ...data } = product;
      await setDoc(doc(db, CUSTOM_PRODUCTS_COLLECTION, id), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        updatedBy: user?.email ?? user?.uid ?? null,
      });
      toast({ title: 'Product created', description: 'It is a draft until you publish it from the product list.' });
      onOpenChange(false);
      onCreated(product);
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Could not create the product',
        description: err?.code === 'permission-denied' ? 'This account is not allowed to add products.' : err?.message,
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !isCreating && onOpenChange(value)}>
      <DialogContent className="rounded-3xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-primary">Add product</DialogTitle>
          <DialogDescription>
            New product in <strong className="text-primary">{category}</strong> › <strong className="text-primary">{subCategory}</strong>. It is saved as a draft;
            publish it from the product list to show it on the website and in the menu.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-product-name" className="text-primary font-semibold">Product name</Label>
            <Input
              id="new-product-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!slugEdited) setSlug(suggestProductSlug(category, subCategory, e.target.value));
              }}
              placeholder="e.g. Wafer Lugged Resilient seat PN16#"
              className="bg-background border-none"
              autoFocus
            />
            <p className="text-xs text-foreground/50">Shown in the site menu and as the page heading.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-product-slug" className="text-primary font-semibold">Web address</Label>
            <div className="flex items-center rounded-md bg-background overflow-hidden">
              <span className="pl-3 text-sm text-foreground/50 whitespace-nowrap">/products/</span>
              <Input
                id="new-product-slug"
                value={slug}
                onChange={(e) => {
                  setSlugEdited(true);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9/-]/g, '-'));
                }}
                className="bg-background border-none pl-1"
              />
            </div>
            {slugError && <p className="text-xs text-destructive">{slugError}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-product-template" className="text-primary font-semibold">Start from</Label>
            <select
              id="new-product-template"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full h-10 rounded-md bg-background px-3 text-sm"
            >
              {templates.map((t) => (
                <option key={t.slug} value={t.slug}>Copy of “{t.title}”</option>
              ))}
              <option value="">Blank product</option>
            </select>
            <p className="text-xs text-foreground/50">Copying a similar product brings its specifications, photos and data sheets, which you can then edit.</p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isCreating}>Cancel</Button>
          <Button variant="secondary" className="font-semibold" onClick={create} disabled={isCreating || !name.trim() || !cleanSlug || !!slugError}>
            {isCreating ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Plus className="size-4 mr-1" />}
            Create and edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
