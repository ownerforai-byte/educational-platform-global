/**
 * Site index — shared shapes for the "Everything Index" head page.
 *
 * Every entry renders the same way, in this exact order:
 *   1. a short opening line (what the page is for),
 *   2. the name of the page,
 *   3. and below the name, its link — the real route, shown as text.
 *
 * Kept in its own module so the client renderer can import the types without
 * pulling the heavy registries (lab components, chapter data) into the bundle.
 */

/** An extra route that hangs off an entry (e.g. the five knowledge kinds). */
export interface SiteIndexLink {
  label: string;
  href: string;
}

/** One routable destination in the index. */
export interface SiteIndexEntry {
  /** The name — shown above its link. */
  name: string;
  /** Short opening: one line saying what this page gives you. */
  opening: string;
  /** Its link: the real route. */
  href: string;
  /** Small qualifier shown next to the name (class, subject, kind…). */
  meta?: string;
  /** Additional routed pages that hang off this entry. */
  links?: SiteIndexLink[];
}

/** A named, ordered group of entries — one block on the head page. */
export interface SiteIndexGroup {
  /** Anchor id, used for jump links. */
  id: string;
  /** Group heading. */
  name: string;
  /** Short opening for the group itself. */
  opening: string;
  /** The group's own head page, when it has one. */
  href?: string;
  entries: SiteIndexEntry[];
}
