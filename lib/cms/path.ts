export function normalizePath(input: string | null | undefined): string | null {
  if (input == null) return null;
  const trimmed = String(input).trim();
  if (!trimmed) return null;
  if (trimmed.includes("null") && /\/null(\/|$)/.test(trimmed)) return null;
  let path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (path.split("/").some((segment) => segment === "undefined" || segment === "null")) {
    return null;
  }
  return path;
}

export function emptyToNull<T>(value: T): T | null {
  if (typeof value === "string" && value.trim() === "") return null;
  return value;
}
