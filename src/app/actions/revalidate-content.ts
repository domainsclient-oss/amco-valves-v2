'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { HOME_CONTENT_TAG } from '@/lib/home-content';
import { BLOG_TAG } from '@/lib/blog';
import { PARENT_PAGES_TAG } from '@/lib/parent-pages';

/**
 * Called by the admin dashboard after saving, so the home page shows the new
 * content straight away instead of waiting for the next revalidation.
 * It only clears the cache; the content itself is protected by Firestore rules.
 */
export async function revalidateHomeContent() {
  revalidateTag(HOME_CONTENT_TAG);
  // The header, footer and favicon appear on every page.
  revalidatePath('/', 'layout');
}

/** Same as above for the blog list and the given post pages. */
export async function revalidateBlog(slugs: string[] = []) {
  revalidateTag(BLOG_TAG);
  revalidatePath('/blog');
  for (const slug of slugs) {
    if (slug) revalidatePath(`/blog/${slug}`);
  }
}

/** Same as above for one product detail page. */
export async function revalidateProduct(slug: string) {
  revalidateTag(`product:${slug}`);
  revalidatePath(`/products/${slug}`);
}

/** Refreshes the parent pages, the given addresses, and the site menu (its category titles link to them). */
export async function revalidateParentPages(slugs: string[] = []) {
  revalidateTag(PARENT_PAGES_TAG);
  revalidatePath('/', 'layout');
  for (const slug of slugs) {
    if (slug) revalidatePath(`/products/${slug}`);
  }
}

/** Refreshes the site menu (on every page) and the given custom product page. */
export async function revalidateCustomProducts(slug?: string) {
  revalidateTag('custom-products');
  revalidatePath('/', 'layout');
  if (slug) revalidatePath(`/products/${slug}`);
}
