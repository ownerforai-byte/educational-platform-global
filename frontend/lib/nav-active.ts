/**
 * Active-state rule for navigation links, shared by the sidebar and the mobile
 * drawer so both always agree on what is highlighted.
 *
 * A link owns whole path segments only: "/ai" is active on "/ai" and "/ai/tutor",
 * but never on "/ai-quiz" — the single-prefix check this replaces lit up the
 * wrong item for every sibling route that happened to start with the same text.
 */
export function isNavItemActive(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  if (href === "/") return false;
  return pathname.startsWith(`${href}/`);
}
