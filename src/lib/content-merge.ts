/**
 * Merges content saved from the admin dashboard onto default content, so pages
 * always have a complete, correctly typed object even if the saved data is
 * missing fields or malformed.
 */

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** An empty value with the same shape as `template` (used for new list items). */
function emptyLike(template: unknown): unknown {
  if (typeof template === "string") return "";
  if (typeof template === "number") return 0;
  if (Array.isArray(template)) return [];
  if (isPlainObject(template)) {
    return Object.fromEntries(Object.entries(template).map(([k, v]) => [k, emptyLike(v)]));
  }
  return template;
}

/**
 * Takes each field from `saved` only when it has the same type as the default.
 * Missing or malformed fields fall back to the default value.
 */
export function mergeWithDefaults<T>(defaults: T, saved: unknown): T {
  if (Array.isArray(defaults)) {
    if (!Array.isArray(saved)) return defaults;
    const itemTemplate = defaults[0];
    if (isPlainObject(itemTemplate)) {
      return saved
        .filter(isPlainObject)
        .map((item) => mergeWithDefaults(emptyLike(itemTemplate), item)) as T;
    }
    // Lists with no default items (e.g. features of a new product) are lists of text.
    const itemType = itemTemplate === undefined ? "string" : typeof itemTemplate;
    return saved.filter((item) => typeof item === itemType) as T;
  }
  if (isPlainObject(defaults)) {
    if (!isPlainObject(saved)) return defaults;
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(defaults)) {
      result[key] = mergeWithDefaults(value, saved[key]);
    }
    return result as T;
  }
  return typeof saved === typeof defaults ? (saved as T) : defaults;
}
