import type { Metadata } from "next";
import { PublicPage, Panel, Action } from "@/components/platform/public-page";

export const metadata: Metadata = {
  title: "Parent Portal | Ravikisan's Platform",
  description:
    "A plain guide to how students use the platform, what a parent can check today, and what is not built yet.",
};

export default function ParentsPage() {
  return (
    <PublicPage
      current="/parents"
      eyebrow="For parents"
      title="A clear view of how the study platform is meant to be used."
      intro="This page explains the study loop, the access boundaries and the honest current scope of parent-facing features. No invented dashboards or progress claims."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="sequential-block-reveal">
          <Panel title="What a student can do today" eyebrow="Available now">
            <p>
              Students follow the official Class 11 and 12 syllabus into chapter notes, theory pages,
              past questions, formula sheets and practice tools. The planner, analytics and report
              card turn that work into a repeatable review loop.
            </p>
            <p>
              Access is approval-based and plan-specific, so a student may not see every section
              immediately. That is expected, not a broken page.
            </p>
          </Panel>
        </div>
        <div className="sequential-block-reveal" style={{ animationDelay: "90ms" }}>
          <Panel title="What is not available yet" eyebrow="Honest scope">
            <p>
              A dedicated parent dashboard, weekly email reports and enforced daily time limits are
              not built. This page does not pretend those features exist or silently collect a
              guardian&apos;s contact details.
            </p>
            <p>
              Until a parent-specific view ships, the clearest approach is to review the study plan,
              report card and completed units together with the student in their own account.
            </p>
          </Panel>
        </div>
      </div>

      <div className="sequential-block-reveal" style={{ animationDelay: "180ms" }}>
        <Panel title="A simple way to support the loop" eyebrow="Practical guidance">
          <ol className="list-decimal space-y-3 pl-5">
            <li>Ask which syllabus unit is being studied this week, not just how many hours were spent.</li>
            <li>Ask the student to explain one worked question without looking at the solution.</li>
            <li>Let the report card and analytics identify weak topics, then agree on one revision goal.</li>
            <li>Use the contact route for access questions or a factual error in the material.</li>
          </ol>
        </Panel>
      </div>

      <div className="sequential-block-reveal flex flex-wrap gap-3" style={{ animationDelay: "270ms" }}>
        <Action href="/plans">See access plans</Action>
        <Action href="/how-it-works" secondary>
          Read the learning workflow
        </Action>
        <Action href="/contact" secondary>
          Ask a question
        </Action>
      </div>
    </PublicPage>
  );
}
