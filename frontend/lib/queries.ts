/**
 * Search/query types — thin re-export of the canonical API types.
 *
 * This module used to declare its OWN copies of the search response types,
 * which drifted from the real wire contract in `@/types/api`. It is now a
 * compatibility surface over that single source of truth: the same names stay
 * importable, but every shape is the platform's actual API shape, so the two
 * files can never disagree again. Nothing imports this today; it is kept so
 * `@/lib/queries` remains a valid, working entry point.
 */
export type {
  /** One search hit, exactly as `/api/search` returns it. */
  SearchResultItem,
  /** The syllabus hint block attached to a search response. */
  SyllabusHint,
  /** Full `/api/search` response envelope. */
  SearchResponse,
} from "@/types/api";

// Historical alias: this file used to export `SearchResult`. It is the same
// concept as `SearchResultItem`, so it now points at the canonical type.
export type { SearchResultItem as SearchResult } from "@/types/api";
