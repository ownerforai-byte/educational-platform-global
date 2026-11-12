import type { Metadata } from "next";
import { PublicPage, Panel, Action } from "@/components/platform/public-page";
import {
  INDEPENDENCE_DISCLAIMER,
} from "@/components/platform/independence-disclaimer";

export const metadata: Metadata = {
  title: "Official Sources & References | Verner",
  description:
    "The official Government of Nepal domains that publish the NEB Class 11 & 12 curriculum, syllabus and exam notices — and the exact relationship Verner has with them.",
};

/**
 * OFFICIAL SOURCES & REFERENCES — Google Play "Misleading Claims" compliance.
 *
 * Play rejected the listing because an app that ships NEB syllabus, notes and
 * past questions did not show where the official material comes from, so the
 * relationship looked implied. This page is the proof both ways: the exact
 * non-affiliation sentence, the government domains that publish the primary
 * documents, and a plain statement of what Verner adds on top.
 *
 * Rules held here:
 *  - every external link is https, target="_blank" + rel="noopener noreferrer"
 *    so it opens in the device browser instead of a WebView;
 *  - no invented URLs — each domain below is the authority's own home page;
 *    deeper pages (syllabus PDFs) are reached from there rather than guessed.
 */
const SOURCES: Array<{
  name: string;
  abbr: string;
  url: string;
  publishes: string;
}> = [
  {
    name: "Curriculum Development Centre (CDC)",
    abbr: "CDC",
    url: "https://moecdc.gov.np/",
    publishes:
      "The national curriculum framework and the Class 11 & 12 subject curricula that the syllabus on this platform is arranged around.",
  },
  {
    name: "National Examination Board (NEB)",
    abbr: "NEB",
    url: "https://www.neb.gov.np/",
    publishes:
      "Exam notices, examination routines, model questions, results and administrative announcements for the Grade 11 and 12 examinations.",
  },
  {
    name: "Ministry of Education, Science and Technology (MoEST)",
    abbr: "MoEST",
    url: "https://moest.gov.np/",
    publishes:
      "The education policy and the ministry-level notices that the CDC curriculum and NEB exams operate under.",
  },
];

function ExternalSource({
  name,
  abbr,
  url,
  publishes,
}: (typeof SOURCES)[number]) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-[10px] font-extrabold text-primary">
          {abbr}
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-bold leading-snug text-foreground">{name}</h3>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex break-all text-[13px] font-semibold text-primary underline underline-offset-2"
          >
            {url}
          </a>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{publishes}</p>
        </div>
      </div>
    </div>
  );
}

export default function OfficialSourcesPage() {
  return (
    <PublicPage
      current="/official-sources"
      eyebrow="Primary sources"
      title="Where this syllabus actually comes from."
      intro="Verner is a study layer. The curriculum, the syllabus and the examinations are published by Government of Nepal bodies — here they are, in one place, so you can always check the primary document."
    >
      <Panel title="Independence disclaimer" eyebrow="Read this first">
        <p className="text-[13px] leading-relaxed text-foreground">
          <strong>Disclaimer:</strong> {INDEPENDENCE_DISCLAIMER}
        </p>
        <p>
          In practice: the syllabus structure, unit order and examination framing
          here are aligned to the official CDC curriculum and NEB examination
          pattern, but the notes, past-paper solutions, diagrams, labs and AI
          answers are written by Verner. Only the authorities below can confirm
          an official date, marking scheme or curriculum change.
        </p>
      </Panel>

      <Panel title="Official government sources" eyebrow="The primary documents">
        <p>
          Every link opens the authority&apos;s own website in your browser. Open
          them directly for the current curriculum, notices and results —
          especially before quoting a date or a rule.
        </p>
        <div className="grid gap-3">
          {SOURCES.map((source) => (
            <ExternalSource key={source.url} {...source} />
          ))}
        </div>
        <p className="text-[13px]">
          Syllabus PDFs, model questions and exam routines sit a click or two
          inside those sites. Deep links change as the boards reorganise their
          pages, so they are linked from the home page above rather than pinned
          here as fixed addresses.
        </p>
      </Panel>

      <Panel title="What Verner adds, and what stays official" eyebrow="The honest split">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Aligned, not issued.</strong> Units and topics follow the
            published curriculum; the wording, examples and explanations are
            Verner&apos;s own.
          </li>
          <li>
            <strong>Past questions are reproduced for practice.</strong> They are
            not an official marking service and are not endorsed by NEB.
          </li>
          <li>
            <strong>AI answers can be wrong.</strong> Veer is study support; check
            calculations and facts against your textbook and the official
            documents.
          </li>
          <li>
            <strong>Official notice beats this app.</strong> Where an exam date,
            routine or syllabus change is announced, the authority&apos;s notice
            is decisive.
          </li>
        </ul>
        <Action href="/legal/attribution" secondary>
          Read the content licences
        </Action>
      </Panel>

      <Panel title="Found a mismatch?" eyebrow="Corrections">
        <p>
          If a unit here no longer matches the official curriculum, or a fact
          contradicts the current textbook, report it with the page URL and the
          official reference so it can be corrected at the source.
        </p>
        <Action href="/contact">Report a correction</Action>
      </Panel>
    </PublicPage>
  );
}
