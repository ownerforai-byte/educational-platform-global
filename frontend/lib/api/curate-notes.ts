import { apiFetch } from "@/lib/api-client";

/**
 * Curated notes — the data behind the one-tap "Curate my notes" block.
 *
 * The AI behind it is Agnes on the backend (AGNES_API_KEY lives only in the
 * backend env); this client sends WHERE the student is and receives notes
 * text back. No key material exists in the frontend, by design.
 */

export interface CuratePlace {
  surface: string;
  classLevel?: string;
  subject?: string;
  chapter?: string;
  topic?: string;
}

export interface CuratedSection {
  heading: string;
  bullets: string[];
}

export interface CuratedNotes {
  title: string;
  sections: CuratedSection[];
  bulletCount: number;
  provider: "agnes";
}

export async function curateNotes(place: CuratePlace): Promise<CuratedNotes> {
  return apiFetch<CuratedNotes>("/api/ai/curate-notes", {
    method: "POST",
    body: JSON.stringify({ place }),
  });
}
