/** An editable button: its text, where it links to, and an optional HTML id. */
export interface ButtonContent {
  label: string;
  href: string;
  id: string;
}

export function button(label: string, href: string): ButtonContent {
  return { label, href, id: "" };
}

/**
 * Links typed in the admin dashboard: site paths, #anchors, web addresses,
 * email and phone links. Anything else (e.g. "javascript:") uses the fallback.
 */
export function safeHref(href: string, fallback: string) {
  const value = href.trim();
  return /^(\/|#|https?:\/\/|mailto:|tel:)/i.test(value) ? value : fallback;
}

/** An HTML id, or undefined so no id attribute is rendered. */
export function safeId(id: string) {
  const value = id.trim().replace(/[^A-Za-z0-9_-]/g, "-");
  return value || undefined;
}
