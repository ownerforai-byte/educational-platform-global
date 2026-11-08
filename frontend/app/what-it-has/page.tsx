import type { Metadata } from "next";
import { PublicPage, Panel, Action } from "@/components/platform/public-page";

export const metadata: Metadata = {
  title: "What it has | Ravikisan's Platform",
  description:
    "Not everything, but: educational related contents, journal, quick access, world knowledge, daily life activities in progress, and the curious features still to come.",
};

/**
 * Owner request 2026-11-08: add "What it has" under the footer's Platform
 * column and write this page. The owner's own wording is kept verbatim in the
 * item titles — this is a deliberately short, honest list, NOT a full feature
 * catalogue (that is /features). "not everything but ;" is the point of the
 * page: say what is here, mark what is coming, and leave room for what has not
 * been imagined yet.
 */

const ITEMS = [
  {
    n: "01",
    title: "Educational related contents",
    status: "Here today",
    body: "Class 11 and 12 notes, the official NEB / CDC syllabus, past questions, mindmaps, labs and practice. Everything is filed against its own subject and unit in curriculum order, so a chapter opens exactly where it belongs.",
  },
  {
    n: "02",
    title: "journal",
    status: "Here today",
    body: "A private study journal: one entry per day that you can tag to the topic you are studying, so the thought stays attached to the page that sparked it.",
  },
  {
    n: "03",
    title: "Quick Access (depending on you)",
    status: "Here today · tier-aware",
    body: "The short fast-path strip and shortcuts that change with your access level. What you can reach depends on you, so the same platform does not look the same for every viewer.",
  },
  {
    n: "04",
    title: "World knowledge",
    status: "Here today",
    body: "Reference and knowledge hubs that reach beyond the exam syllabus — general knowledge, wider reading and the world outside the classroom.",
  },
  {
    n: "05",
    title: "Some Daily Life activities (coming)",
    status: "Coming",
    body: "Habits, daily activities, plans and streaks for everyday life, not just study. This layer is still being built, so it is marked coming rather than presented as something already shipped.",
  },
  {
    n: "06",
    title: "++all incoming curious features(which you have never thought)",
    status: "Always growing",
    body: "The list is deliberately open-ended. New, curious features arrive as they are imagined, and this page grows along with them.",
  },
] as const;

export default function WhatItHasPage() {
  return (
    <PublicPage
      current="/what-it-has"
      eyebrow="Not everything, but ;"
      title="What it has"
      intro="A short, honest list of what lives on this platform today, what is still on its way, and what has not been imagined yet. This is the shape of the thing, not a complete catalogue."
    >
      <Panel eyebrow="The short version" title="not everything but ;">
        <p>
          This page does not try to list every button and every page. It names the
          handful of things the platform is actually built around — study
          material, a place to think, a fast way in, knowledge beyond the
          syllabus, everyday life, and whatever comes next.
        </p>
        <p>
          For the exhaustive, tier-by-tier capability list, read the Features
          page instead.
        </p>
      </Panel>

      <section aria-label="What the platform has" className="grid gap-6 md:grid-cols-2">
        {ITEMS.map((item) => (
          <Panel key={item.title} eyebrow={`${item.n} · ${item.status}`} title={item.title}>
            <p>{item.body}</p>
          </Panel>
        ))}
      </section>

      <Panel title="Where to go next" eyebrow="Keep looking">
        <p>
          If you want the full capability list, start with Features. If you want
          to know how the study loop fits together, read How It Works. The Help
          Center answers everyday questions about accounts and access.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Action href="/features">See all features</Action>
          <Action href="/help" secondary>Visit Help Center</Action>
        </div>
      </Panel>
    </PublicPage>
  );
}
