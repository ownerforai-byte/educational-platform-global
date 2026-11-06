import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "../legal-doc";

export const metadata: Metadata = {
  title: "Attribution & Content Licences — Ravikisan's Platform",
  description:
    "The licences behind the code and study content, how to credit the platform when reusing material, and where third-party sources are recorded.",
};

export default function AttributionPage() {
  return (
    <LegalDoc
      title="Attribution and content licences"
      updated="7 November 2026"
      intro="The platform is open about what it owns and what it does not. Code and study content carry different licences, and third-party sources are tracked separately with their rights status."
      doc="attribution"
    >
      <section>
        <h2>1. Two kinds of material</h2>
        <ul>
          <li>
            <strong>Source code — MIT.</strong> The application code is released
            under the MIT licence in <code>LICENSE</code>. It does not cover
            educational content.
          </li>
          <li>
            <strong>Platform-authored study content — CC BY-NC 4.0.</strong>{" "}
            Concept notes, formula sheets, worked examples, mindmap trees,
            visual diagrams and rail cards authored by the platform team are
            released under Creative Commons Attribution-NonCommercial 4.0
            International. The full terms are in <code>CONTENT_LICENSE.md</code>{" "}
            and at{" "}
            <a className="font-medium" href="https://creativecommons.org/licenses/by-nc/4.0/">creativecommons.org</a>.
          </li>
        </ul>
        <p>
          You may share and adapt the platform-authored material, provided you
          give credit and do not use it commercially.
        </p>
      </section>

      <section>
        <h2>2. How to credit the platform</h2>
        <p>
          Include the platform name, a link back to the app, the licence, and a
          note if you changed the material. For example:
        </p>
        <p>
          <em>
            Notes adapted from Ravikisan&apos;s Platform (https://ravikisan.vercel.app),
            CC BY-NC 4.0. Sections on gas laws shortened; examples added.
          </em>
        </p>
        <p>
          Reuse does not imply endorsement: do not suggest that the platform,
          NEB, or CDC sponsors your version.
        </p>
      </section>

      <section>
        <h2>3. Third-party sources</h2>
        <p>
          Every external source ingested into the platform is recorded in{" "}
          <code>SOURCES.md</code> with a status: confirmed, under review, or
          rejected. Third-party material keeps its own licence and is not
          automatically covered by the CC BY-NC 4.0 grant above.
        </p>
        <ul>
          <li>
            The official NEB / CDC curriculum structure is used as metadata
            (unit order, topic names, teaching hours) and is not a verbatim
            reproduction of protected text.
          </li>
          <li>
            Past-year question banks and OCR-derived textbook fragments in the
            backend knowledge base are currently marked as rights-status under
            review. Until that review is complete, do not treat them as
            freely reusable.
          </li>
          <li>
            Third-party libraries, fonts and services used by the app remain
            under their own licences.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. AI-generated answers</h2>
        <p>
          Answers, explanations and figures produced by the Veer AI tutor are
          generated for the student who asked for them. They are study aids, not
          a licence grant over any source material they may summarise, and
          should be checked against the textbook and official syllabus before
          being reused or quoted.
        </p>
      </section>

      <section>
        <h2>5. Corrections, concerns and removal</h2>
        <ul>
          <li><Link href="/legal/takedown">Content takedown and rights requests</Link> — for rights holders.</li>
          <li><Link href="/contact">Contact and Corrections</Link> — for mistakes, broken pages and access questions.</li>
          <li><Link href="/legal/terms">Terms of Service</Link> — for the rules that apply when using the platform.</li>
        </ul>
      </section>
    </LegalDoc>
  );
}
