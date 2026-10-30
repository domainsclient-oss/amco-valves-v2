'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ArrowDown, ArrowLeft, ArrowUp, ChevronRight, ExternalLink, Eye, EyeOff, FolderPlus, MoreHorizontal, Pencil, Plus, RotateCcw, Search, Trash2, Type } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProductEditor } from '@/components/admin/ProductEditor';
import { AddProductDialog, type ProductTemplate } from '@/components/admin/AddProductDialog';
import { AddCategoryDialog, updateProductTaxonomy } from '@/components/admin/AddCategoryDialog';
import { RenameDialog } from '@/components/admin/RenameDialog';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { revalidateCustomProducts } from '@/app/actions/revalidate-content';
import { HOME_CONTENT_COLLECTION } from '@/lib/home-content';
import { productContentDocId, resolveProductContent, type ProductContent } from '@/lib/product-content';
import { PRODUCT_CATALOG } from '@/lib/product-catalog';
import {
  CUSTOM_PRODUCTS_COLLECTION,
  PRODUCT_TAXONOMY_DOC,
  buildProductCategories,
  categoryKey,
  emptyTaxonomy,
  isProductVisible,
  productKey,
  statusOf,
  subCategoryKey,
  toCustomProduct,
  toProductTaxonomy,
  withEntry,
  applyOrder,
  orderOf,
  withOrder,
  productOrderKey,
  subCategoryOrderKey,
  categoryColumns,
  CATEGORY_ORDER_KEY,
  type CustomProduct,
  type ProductCategory,
  type ProductTaxonomy,
  type VisibilityStatus,
} from '@/lib/custom-products';

/** One product as listed in the admin: a built-in page or one added from the admin. */
interface ListedProduct {
  slug: string;
  category: string;
  subCategory: string;
  content: ProductContent;
  defaults: ProductContent;
  edited: boolean;
  /** Own status: built-in products via the classification, added products via their document. */
  status: VisibilityStatus;
  /** On the website right now (it, its sub-category and category are all visible). */
  live: boolean;
  /** Link text in the site's products menu. */
  menuName: string;
  /** Present for products added from the admin. */
  custom?: CustomProduct;
}

/** A pending confirmation popup. */
interface PendingConfirm {
  title: string;
  description: React.ReactNode;
  confirmLabel: string;
  icon?: React.ComponentType<{ className?: string }>;
  run: () => Promise<void>;
}

function StatusText({ status }: { status: VisibilityStatus }) {
  if (status === 'draft') return <span className="text-amber-700 font-semibold">Draft · </span>;
  if (status === 'deleted') return <span className="text-destructive font-semibold">Deleted · </span>;
  return null;
}

/** The "⋯" menu: Edit, Put to draft / Publish, Delete (or Restore when deleted). */
function ItemMenu({
  status,
  onEdit,
  onToggleDraft,
  onDelete,
  onRestore,
  label,
  onRename,
  onMove,
  canMoveUp,
  canMoveDown,
}: {
  status: VisibilityStatus;
  onEdit: () => void;
  onToggleDraft: () => void;
  onDelete: () => void;
  onRestore: () => void;
  label: string;
  /** Products only: change the link text in the site menu. */
  onRename?: () => void;
  onMove: (direction: -1 | 1) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  return (
    // Non-modal: a modal menu that opens a confirmation popup can leave the page unclickable.
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="px-2 h-8"
          aria-label={`More actions for ${label}`}
          // Keep clicks on the menu from also opening the card underneath.
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-xl" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem onSelect={onEdit} className="cursor-pointer">
          <Pencil className="size-4 mr-2" /> Edit
        </DropdownMenuItem>
        {onRename && (
          <DropdownMenuItem onSelect={onRename} className="cursor-pointer">
            <Type className="size-4 mr-2" /> Rename in menu
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={() => onMove(-1)} disabled={!canMoveUp} className="cursor-pointer">
          <ArrowUp className="size-4 mr-2" /> Move up
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onMove(1)} disabled={!canMoveDown} className="cursor-pointer">
          <ArrowDown className="size-4 mr-2" /> Move down
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {status === 'deleted' ? (
          <DropdownMenuItem onSelect={onRestore} className="cursor-pointer">
            <RotateCcw className="size-4 mr-2" /> Restore
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem onSelect={onToggleDraft} className="cursor-pointer">
              {status === 'draft' ? (
                <>
                  <Eye className="size-4 mr-2" /> Publish
                </>
              ) : (
                <>
                  <EyeOff className="size-4 mr-2" /> Put to draft
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={onDelete} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
              <Trash2 className="size-4 mr-2" /> Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ProductCard({ product, menu }: { product: ListedProduct; menu: React.ReactNode }) {
  const { content, custom } = product;
  return (
    <div className="p-3 rounded-2xl bg-white border border-border shadow-sm flex items-center gap-3">
      <div className="size-16 rounded-xl bg-background border border-border shrink-0 flex items-center justify-center p-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={content.images[0]?.src} alt="" className="max-w-full max-h-full object-contain" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-primary text-sm leading-snug truncate">{content.title}</p>
        <p className="text-xs text-foreground/50 truncate">
          {custom && <span className="text-secondary font-semibold">New · </span>}
          <StatusText status={product.status} />
          {!custom && product.edited && <span className="text-secondary font-semibold">Edited · </span>}
          {product.menuName !== content.title && <span>Menu: “{product.menuName}” · </span>}
          {content.specs.length} specs · {content.images.length} photos · {content.tables.length} tables
        </p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {product.live && (
          <Button size="icon" variant="ghost" className="size-9" asChild>
            <Link href={`/products/${product.slug}`} target="_blank" aria-label="View product page">
              <ExternalLink className="size-4" />
            </Link>
          </Button>
        )}
        {menu}
      </div>
    </div>
  );
}

/** Product pages organised like the site menu: categories → sub-categories → products. */
export function ProductManager() {
  const db = useFirestore();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [editing, setEditing] = useState<ListedProduct | null>(null);
  const [adding, setAdding] = useState<{ category: string; subCategory: string } | null>(null);
  const [pending, setPending] = useState<PendingConfirm | null>(null);
  const [renamingProduct, setRenamingProduct] = useState<ListedProduct | null>(null);
  const [renaming, setRenaming] = useState<{ key: string; current: string; what: string; siblings: string[] } | null>(null);
  // Saved edits of built-in products (by doc id) and products added from the admin.
  const [saved, setSaved] = useState<Record<string, unknown>>({});
  const [customs, setCustoms] = useState<CustomProduct[]>([]);
  // Classification managed from the admin (added categories, names, draft / deleted status).
  const [taxonomy, setTaxonomy] = useState<ProductTaxonomy>(emptyTaxonomy);
  const [addingCategory, setAddingCategory] = useState(false);
  const [addingSubTo, setAddingSubTo] = useState<ProductCategory | null>(null);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, HOME_CONTENT_COLLECTION));
      setSaved(Object.fromEntries(snap.docs.filter((d) => d.id.startsWith('product__')).map((d) => [d.id, d.data()])));
    } catch {
      // Without access the list still works from the original data.
    }
    try {
      const snap = await getDoc(doc(db, HOME_CONTENT_COLLECTION, PRODUCT_TAXONOMY_DOC));
      setTaxonomy(toProductTaxonomy(snap.exists() ? snap.data() : null));
    } catch {
      setTaxonomy(emptyTaxonomy);
    }
    try {
      const snap = await getDocs(collection(db, CUSTOM_PRODUCTS_COLLECTION));
      setCustoms(snap.docs.map((d) => toCustomProduct(d.id, d.data())).filter((p) => p.slug));
    } catch {
      setCustoms([]);
    }
  }, [db]);

  useEffect(() => {
    load();
  }, [load]);

  const categories = useMemo(() => buildProductCategories(taxonomy), [taxonomy]);

  const products = useMemo<ListedProduct[]>(() => {
    const builtIn = categories.flatMap((category) =>
      category.subCategories.flatMap((sub) =>
        sub.products.flatMap(({ slug, menuName }) => {
          const entry = PRODUCT_CATALOG.find((p) => p.slug === slug);
          if (!entry) return [];
          const savedData = saved[productContentDocId(slug)];
          return [{
            slug,
            category: category.title,
            subCategory: sub.name,
            content: savedData ? resolveProductContent(entry.defaults, savedData) : entry.defaults,
            defaults: entry.defaults,
            edited: !!savedData,
            status: statusOf(taxonomy, productKey(slug)),
            live: isProductVisible(taxonomy, slug, category.title, sub.name),
            menuName,
          }];
        }),
      ),
    );
    const added = customs.map((c) => ({
      slug: c.slug,
      category: c.category,
      subCategory: c.subCategory,
      content: c.content,
      defaults: c.content,
      edited: false,
      status: (c.status === 'draft' ? 'draft' : '') as VisibilityStatus,
      live: c.status === 'published' && isProductVisible(taxonomy, c.slug, c.category, c.subCategory),
      menuName: c.menuName,
      custom: c,
    }));
    return [...builtIn, ...added];
  }, [saved, customs, categories, taxonomy]);

  const takenSlugs = useMemo(() => new Set(products.map((p) => p.slug)), [products]);

  /** A sub-category's products (built-in and added) in menu order. */
  const productsIn = (category: string, subCategory: string) =>
    applyOrder(
      products.filter((p) => p.category === category && p.subCategory === subCategory),
      (p) => p.slug,
      orderOf(taxonomy, productOrderKey(category, subCategory)),
    );

  const swap = <T,>(items: T[], index: number, direction: -1 | 1) => {
    const next = [...items];
    const target = index + direction;
    [next[index], next[target]] = [next[target], next[index]];
    return next;
  };

  // --- Saving ---

  const saveTaxonomy = async (change: (t: ProductTaxonomy) => ProductTaxonomy, message: string) => {
    try {
      setTaxonomy(await updateProductTaxonomy(db, change));
      await revalidateCustomProducts().catch(() => {});
      toast({ title: message });
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Could not save',
        description: err?.code === 'permission-denied' ? 'This account is not allowed to change products.' : err?.message,
      });
    }
  };

  const setEntryStatus = (key: string, status: VisibilityStatus, message: string) =>
    saveTaxonomy((t) => ({ ...t, statuses: withEntry(t.statuses, key, status) as ProductTaxonomy['statuses'] }), message);

  const setCustomStatus = async (product: CustomProduct, status: CustomProduct['status']) => {
    try {
      await updateDoc(doc(db, CUSTOM_PRODUCTS_COLLECTION, product.id), { status, updatedAt: serverTimestamp() });
      await revalidateCustomProducts(product.slug).catch(() => {});
      setCustoms((list) => list.map((p) => (p.id === product.id ? { ...p, status } : p)));
      toast({ title: status === 'published' ? 'Product published' : 'Put to draft' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Could not change the status', description: err?.message });
    }
  };

  const deleteCustom = async (product: CustomProduct) => {
    try {
      await deleteDoc(doc(db, CUSTOM_PRODUCTS_COLLECTION, product.id));
      await revalidateCustomProducts(product.slug).catch(() => {});
      setCustoms((list) => list.filter((p) => p.id !== product.id));
      toast({ title: 'Product deleted' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Delete failed', description: err?.message });
    }
  };

  /** Removes an added (non built-in) category or sub-category and its saved name / status. */
  const removeAddedEntry = (category: ProductCategory, subCategory?: string) => {
    const key = subCategory ? subCategoryKey(category.title, subCategory) : categoryKey(category.title);
    return saveTaxonomy((t) => {
      const cleaned = { ...t, labels: withEntry(t.labels, key, ''), statuses: withEntry(t.statuses, key, '') as ProductTaxonomy['statuses'] };
      if (!subCategory) return { ...cleaned, categories: cleaned.categories.filter((c) => c.title !== category.title) };
      if (category.isNew) {
        return { ...cleaned, categories: cleaned.categories.map((c) => (c.title === category.title ? { ...c, subCategories: c.subCategories.filter((n) => n !== subCategory) } : c)) };
      }
      return { ...cleaned, subCategories: cleaned.subCategories.filter((x) => !(x.category === category.title && x.name === subCategory)) };
    }, subCategory ? 'Sub-category deleted' : 'Category deleted');
  };

  const saveOrder = (key: string, items: string[]) =>
    saveTaxonomy((t) => ({ ...t, orders: withOrder(t.orders, key, items) }), 'Order saved');

  const moveProduct = (p: ListedProduct, direction: -1 | 1) => {
    const slugs = productsIn(p.category, p.subCategory).map((x) => x.slug);
    return saveOrder(productOrderKey(p.category, p.subCategory), swap(slugs, slugs.indexOf(p.slug), direction));
  };

  const moveSubCategory = (c: ProductCategory, name: string, direction: -1 | 1) => {
    const names = c.subCategories.map((s) => s.name);
    return saveOrder(subCategoryOrderKey(c.title), swap(names, names.indexOf(name), direction));
  };

  /** Categories move only within their menu column, so the menu layout stays the same. */
  const moveCategory = (c: ProductCategory, direction: -1 | 1) => {
    const columns = categoryColumns(taxonomy);
    const column = columns[c.column];
    columns[c.column] = swap(column, column.indexOf(c.title), direction);
    return saveOrder(CATEGORY_ORDER_KEY, columns.flat());
  };

  const renameProductInMenu = async (p: ListedProduct, name: string) => {
    if (p.custom) {
      try {
        await updateDoc(doc(db, CUSTOM_PRODUCTS_COLLECTION, p.custom.id), { menuName: name, updatedAt: serverTimestamp() });
        await revalidateCustomProducts(p.slug).catch(() => {});
        setCustoms((list) => list.map((x) => (x.id === p.custom!.id ? { ...x, menuName: name } : x)));
        toast({ title: 'Menu name saved' });
      } catch (err: any) {
        toast({ variant: 'destructive', title: 'Could not save', description: err?.message });
      }
      return;
    }
    await saveTaxonomy((t) => ({ ...t, labels: withEntry(t.labels, productKey(p.slug), name) }), 'Menu name saved');
  };

  // --- Menu actions ---

  const draftConfirm = (name: string, extra: string, run: () => Promise<void>): PendingConfirm => ({
    title: 'Put to draft?',
    description: (
      <>
        <strong className="text-primary">{name}</strong> {extra} will be taken off the website and the menu. You can publish it again any time.
      </>
    ),
    confirmLabel: 'Put to draft',
    icon: EyeOff,
    run,
  });

  const productMenu = (p: ListedProduct) => {
    const siblings = productsIn(p.category, p.subCategory);
    const index = siblings.findIndex((x) => x.slug === p.slug);
    return (
    <ItemMenu
      label={p.content.title}
      status={p.status}
      onRename={() => setRenamingProduct(p)}
      onMove={(direction) => moveProduct(p, direction)}
      canMoveUp={index > 0}
      canMoveDown={index >= 0 && index < siblings.length - 1}
      onEdit={() => setEditing(p)}
      onToggleDraft={() => {
        if (p.custom) {
          if (p.status === 'draft') setCustomStatus(p.custom, 'published');
          else setPending(draftConfirm(p.content.title, '', () => setCustomStatus(p.custom!, 'draft')));
        } else if (p.status === 'draft') {
          setEntryStatus(productKey(p.slug), '', 'Product published');
        } else {
          setPending(draftConfirm(p.content.title, '', () => setEntryStatus(productKey(p.slug), 'draft', 'Put to draft')));
        }
      }}
      onDelete={() =>
        setPending({
          title: 'Delete this product?',
          description: p.custom ? (
            <>
              <strong className="text-primary">{p.content.title}</strong> will be permanently deleted and removed from the website and the menu. This cannot be undone.
            </>
          ) : (
            <>
              <strong className="text-primary">{p.content.title}</strong> will be removed from the website and the menu. It stays in this list marked "Deleted", so
              you can restore it later.
            </>
          ),
          confirmLabel: 'Delete product',
          run: () => (p.custom ? deleteCustom(p.custom) : setEntryStatus(productKey(p.slug), 'deleted', 'Product deleted')),
        })
      }
      onRestore={() => setEntryStatus(productKey(p.slug), '', 'Product restored')}
    />
    );
  };

  const categoryMenu = (c: ProductCategory) => {
    const key = categoryKey(c.title);
    // Categories move only within their column of the site menu.
    const inColumn = categories.filter((x) => x.column === c.column).map((x) => x.title);
    const hasProducts = products.some((p) => p.category === c.title);
    return (
      <ItemMenu
        label={c.label}
        status={c.status}
        onMove={(direction) => moveCategory(c, direction)}
        canMoveUp={inColumn.indexOf(c.title) > 0}
        canMoveDown={inColumn.indexOf(c.title) < inColumn.length - 1}
        onEdit={() => setRenaming({ key, current: c.label, what: 'category', siblings: categories.filter((x) => x.title !== c.title).map((x) => x.label) })}
        onToggleDraft={() =>
          c.status === 'draft'
            ? setEntryStatus(key, '', 'Category published')
            : setPending(draftConfirm(c.label, 'and all its products', () => setEntryStatus(key, 'draft', 'Category put to draft')))
        }
        onDelete={() => {
          if (c.isNew && hasProducts) {
            toast({ variant: 'destructive', title: 'Category has products', description: 'Delete its products first, or put the category to draft instead.' });
            return;
          }
          setPending({
            title: 'Delete this category?',
            description: c.isNew ? (
              <>
                <strong className="text-primary">{c.label}</strong> and its sub-categories will be deleted. It has no products, so nothing changes on the website.
              </>
            ) : (
              <>
                <strong className="text-primary">{c.label}</strong> and all its products will be removed from the website and the menu. It stays in this list marked
                "Deleted", so you can restore it later.
              </>
            ),
            confirmLabel: 'Delete category',
            run: async () => {
              if (c.isNew) await removeAddedEntry(c);
              else await setEntryStatus(key, 'deleted', 'Category deleted');
              setOpenCategory(null);
            },
          });
        }}
        onRestore={() => setEntryStatus(key, '', 'Category restored')}
      />
    );
  };

  const subCategoryMenu = (c: ProductCategory, sub: ProductCategory['subCategories'][number]) => {
    const key = subCategoryKey(c.title, sub.name);
    const subIndex = c.subCategories.findIndex((s) => s.name === sub.name);
    const hasProducts = products.some((p) => p.category === c.title && p.subCategory === sub.name);
    return (
      <ItemMenu
        label={sub.label}
        status={sub.status}
        onMove={(direction) => moveSubCategory(c, sub.name, direction)}
        canMoveUp={subIndex > 0}
        canMoveDown={subIndex < c.subCategories.length - 1}
        onEdit={() => setRenaming({ key, current: sub.label, what: 'sub-category', siblings: c.subCategories.filter((s) => s.name !== sub.name).map((s) => s.label) })}
        onToggleDraft={() =>
          sub.status === 'draft'
            ? setEntryStatus(key, '', 'Sub-category published')
            : setPending(draftConfirm(sub.label, 'and all its products', () => setEntryStatus(key, 'draft', 'Sub-category put to draft')))
        }
        onDelete={() => {
          if (sub.isNew && hasProducts) {
            toast({ variant: 'destructive', title: 'Sub-category has products', description: 'Delete its products first, or put the sub-category to draft instead.' });
            return;
          }
          setPending({
            title: 'Delete this sub-category?',
            description: sub.isNew ? (
              <>
                <strong className="text-primary">{sub.label}</strong> will be deleted. It has no products, so nothing changes on the website.
              </>
            ) : (
              <>
                <strong className="text-primary">{sub.label}</strong> and all its products will be removed from the website and the menu. It stays in this list marked
                "Deleted", so you can restore it later.
              </>
            ),
            confirmLabel: 'Delete sub-category',
            run: () => (sub.isNew ? removeAddedEntry(c, sub.name) : setEntryStatus(key, 'deleted', 'Sub-category deleted')),
          });
        }}
        onRestore={() => setEntryStatus(key, '', 'Sub-category restored')}
      />
    );
  };

  if (editing) {
    return (
      <ProductEditor
        slug={editing.slug}
        defaults={editing.defaults}
        customProductId={editing.custom?.id}
        onBack={() => {
          setEditing(null);
          load();
        }}
      />
    );
  }

  const cardFor = (p: ListedProduct) => <ProductCard key={p.slug} product={p} menu={productMenu(p)} />;

  const q = query.trim().toLowerCase();
  const labelFor = (title: string) => categories.find((c) => c.title === title)?.label ?? title;
  const searchResults = q
    ? products.filter((p) => [p.content.title, p.slug, p.category, labelFor(p.category), p.subCategory, p.content.category].some((v) => v.toLowerCase().includes(q)))
    : [];
  const category = openCategory ? categories.find((c) => c.title === openCategory) : null;

  const dialogs = (
    <>
      {adding && (
        <AddProductDialog
          open={!!adding}
          onOpenChange={(open) => !open && setAdding(null)}
          category={adding.category}
          subCategory={adding.subCategory}
          templates={products
            .filter((p) => p.category === adding.category && p.subCategory === adding.subCategory)
            .map<ProductTemplate>((p) => ({ slug: p.slug, title: p.content.title, content: p.content }))}
          takenSlugs={takenSlugs}
          onCreated={(product) => {
            setCustoms((list) => [...list, product]);
            setEditing({
              slug: product.slug,
              category: product.category,
              subCategory: product.subCategory,
              content: product.content,
              defaults: product.content,
              edited: false,
              status: 'draft',
              live: false,
              menuName: product.menuName,
              custom: product,
            });
          }}
        />
      )}
      <AddCategoryDialog
        open={addingCategory || !!addingSubTo}
        onOpenChange={(open) => {
          if (!open) {
            setAddingCategory(false);
            setAddingSubTo(null);
          }
        }}
        category={addingSubTo ?? undefined}
        categories={categories}
        onSaved={setTaxonomy}
      />
      <RenameDialog
        open={!!renaming}
        onOpenChange={(open) => !open && setRenaming(null)}
        title={`Rename ${renaming?.what ?? ''}`}
        description={`The new name is shown in the admin and in the site menu. Products stay in this ${renaming?.what ?? ''}.`}
        initialValue={renaming?.current ?? ''}
        isTaken={(name) => !!renaming?.siblings.some((s) => s.toLowerCase() === name.toLowerCase())}
        onSave={(name) =>
          renaming ? saveTaxonomy((t) => ({ ...t, labels: withEntry(t.labels, renaming.key, name) }), 'Name saved') : Promise.resolve()
        }
      />
      <RenameDialog
        open={!!renamingProduct}
        onOpenChange={(open) => !open && setRenamingProduct(null)}
        title="Rename in menu"
        description="The link text for this product in the site's products menu. The product page heading doesn't change (edit that with Edit)."
        initialValue={renamingProduct?.menuName ?? ''}
        isTaken={() => false}
        onSave={(name) => (renamingProduct ? renameProductInMenu(renamingProduct, name) : Promise.resolve())}
      />
      <ConfirmDialog
        open={!!pending}
        onOpenChange={(open) => !open && setPending(null)}
        title={pending?.title ?? ''}
        description={pending?.description ?? ''}
        confirmLabel={pending?.confirmLabel}
        icon={pending?.icon}
        onConfirm={() => pending?.run()}
      />
    </>
  );

  // --- One category: its sub-categories and products ---
  if (category) {
    const inCategory = products.filter((p) => p.category === category.title);
    return (
      <div className="pb-24">
        <AdminHeader
          title={category.label}
          description={`${inCategory.length} products in ${category.subCategories.length} ${category.subCategories.length === 1 ? 'sub-category' : 'sub-categories'}`}
        />
        <main className="px-6 lg:px-10 py-8 space-y-8">
          <Button variant="ghost" onClick={() => setOpenCategory(null)}>
            <ArrowLeft className="size-4 mr-1" /> All categories
          </Button>

          {category.subCategories.map((sub) => {
            const items = productsIn(category.title, sub.name);
            return (
              <section key={sub.name}>
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/50">
                    {sub.label} <span className="text-foreground/30">· {items.length}</span>
                    {sub.isNew && <span className="ml-2 normal-case tracking-normal text-secondary">New</span>}
                    {sub.status === 'draft' && <span className="ml-2 normal-case tracking-normal text-amber-700">Draft</span>}
                    {sub.status === 'deleted' && <span className="ml-2 normal-case tracking-normal text-destructive">Deleted</span>}
                  </h2>
                  {subCategoryMenu(category, sub)}
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {items.map(cardFor)}
                  <button
                    type="button"
                    onClick={() => setAdding({ category: category.title, subCategory: sub.name })}
                    className="min-h-[5.5rem] p-3 rounded-2xl border-2 border-dashed border-border bg-white/60 flex items-center justify-center gap-2 text-sm font-semibold text-foreground/55 hover:border-secondary hover:text-secondary transition-colors"
                  >
                    <Plus className="size-4" /> Add product to {sub.label}
                  </button>
                </div>
              </section>
            );
          })}

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={() => setAddingSubTo(category)}>
              <FolderPlus className="size-4 mr-1" /> Add sub-category
            </Button>
          </div>
        </main>
        {dialogs}
      </div>
    );
  }

  // --- All categories (or search results) ---
  return (
    <div className="pb-24">
      <AdminHeader title="Product Pages" description={`Edit the details, specifications, photos and data sheets of all ${products.length} product pages.`} />

      <main className="px-6 lg:px-10 py-8 space-y-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground/40" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search all products…" className="pl-9 bg-white border-border h-11" aria-label="Search products" />
        </div>

        {q ? (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/50 mb-3">
              Search results <span className="text-foreground/30">· {searchResults.length}</span>
            </h2>
            {searchResults.length === 0 ? (
              <p className="text-sm text-foreground/60">No products match "{query}".</p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">{searchResults.map(cardFor)}</div>
            )}
          </section>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((c) => {
              const items = products.filter((p) => p.category === c.title);
              const added = items.filter((p) => p.custom).length;
              return (
                <div
                  key={c.title}
                  role="button"
                  tabIndex={0}
                  onClick={() => setOpenCategory(c.title)}
                  onKeyDown={(e) => {
                    if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      setOpenCategory(c.title);
                    }
                  }}
                  className="group cursor-pointer text-left p-5 rounded-3xl bg-white border border-border shadow-sm hover:border-secondary hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex -space-x-3 shrink-0">
                      {items.slice(0, 3).map((p) => (
                        <span key={p.slug} className="size-12 rounded-xl bg-background border-2 border-white shadow-sm flex items-center justify-center p-1">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.content.images[0]?.src} alt="" className="max-w-full max-h-full object-contain" />
                        </span>
                      ))}
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      {categoryMenu(c)}
                      <ChevronRight className="size-5 text-foreground/30 group-hover:text-secondary group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                  <p className="mt-4 font-bold text-primary leading-snug">
                    {c.label} <span className="text-foreground/40 font-semibold">· {items.length}</span>
                  </p>
                  <p className="text-xs text-foreground/50 mt-1 line-clamp-2">
                    {c.isNew && <span className="text-secondary font-semibold">New · </span>}
                    <StatusText status={c.status} />
                    {c.subCategories.map((s) => s.label).join(' · ')}
                    {added > 0 && <span className="text-secondary font-semibold"> · {added} new</span>}
                  </p>
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => setAddingCategory(true)}
              className="min-h-[9.5rem] p-5 rounded-3xl border-2 border-dashed border-border bg-white/60 flex flex-col items-center justify-center gap-2 text-sm font-semibold text-foreground/55 hover:border-secondary hover:text-secondary transition-colors"
            >
              <FolderPlus className="size-6" /> Add category
            </button>
          </div>
        )}
      </main>
      {dialogs}
    </div>
  );
}
