/**
 * legal-links.ts — the canonical registry of legal/policy page links.
 *
 * Lives in lib/core (not in the footer component) because BOTH a client
 * component (the site footer) and server components (plans-page-footer)
 * render it. A server component importing a VALUE from a "use client"
 * module receives a client reference stub, not the data — which crashed
 * SSR with "LEGAL_LINKS.map is not a function" (found via the E2E smoke
 * run 2026-11-26). Data registries belong in lib/core; components import
 * from here.
 */

/** Legal pages — always visible to everyone, in both footer views. */
export const LEGAL_LINKS: [string, string][] = [
  ["Privacy", "/legal/privacy"],
  ["Terms", "/legal/terms"],
  ["Cookies", "/legal/cookies"],
  ["Purchases", "/legal/purchases"],
  ["Data safety", "/legal/data-safety"],
  ["Content rating", "/legal/content-rating"],
  ["Attribution", "/legal/attribution"],
  ["Takedown", "/legal/takedown"],
];
