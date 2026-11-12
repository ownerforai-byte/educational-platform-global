import type { Metadata } from "next";
import { PublicPage, Panel, Action } from "@/components/platform/public-page";
export const metadata: Metadata = { title: "How It Works | Ravikisan's Platform", description: "From getting started to notes, practice, and review: a practical guide to using the platform." };
export default function HowItWorksPage() {
  return <PublicPage current="/how-it-works" eyebrow="Your first study session" title="Start with a goal. Finish with understanding." intro="You do not need to use every tool at once. Get your account ready, choose one topic, and build a repeatable study cycle.">
    <ol className="grid gap-5 md:grid-cols-2">{[
      ["Request your account", "After signing, the account is approved by the system verification and administrative approval."],
      ["Check your access", "Check your current plan and visible sections. A disabled section may not be included in your plan. Plans and sparks are separate."],
      ["Choose one learning outcome", "Pick your class, subject, and chapter. Set a specific target such as explaining one concept or solving a particular question type."],
      ["Learn the concept", "Read the relevant explanation and work through an example. Use formulas, diagrams, mindmaps, or labs where available to understand why the method works."],
      ["Attempt before asking", "Try a question without the answer open. If you need Veer, include your attempt and ask about the exact step that is unclear. Check the response against your material."],
      ["Review and return", "Record the mistake or missing idea in your own notes. Retry later without assistance, then attempt a different question on the same concept."],
    ].map(([title, text], i) => <li key={title} className="rounded-2xl border border-border bg-card p-6"><span className="text-sm font-bold text-primary">STEP 0{i + 1}</span><h2 className="mt-3 text-xl font-bold">{title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></li>)}</ol>
    <div className="grid gap-6 md:grid-cols-2"><Panel title="Plans and sparks are different"><p>Your plan determines which sections you can enter. AI sparks cover supported Veer activity. Content sparks apply to supported note and past-question unlocks. One balance does not replace the other.</p><p>Read the current unlock prompt before proceeding, and check your account for current allowances. Plans are explained through the footer.</p></Panel><Panel title="A 40-minute example"><ul className="list-disc space-y-2 pl-5"><li>5 minutes: recall what you already know.</li><li>15 minutes: learn one idea and inspect an example.</li><li>15 minutes: attempt questions independently.</li><li>5 minutes: write one correction and choose what to retry.</li></ul><p>This is a suggested routine, not an access duration or an examination rule.</p></Panel></div>
    <Panel title="Ready to begin?"><p>If you are new, create an account. After signing, the account is approved by the system verification and administrative approval. The Help Center explains the most common access questions.</p><div className="flex flex-wrap gap-3"><Action href="/signup">Request an account</Action><Action href="/help" secondary>Visit Help Center</Action></div></Panel>
  </PublicPage>;
}
