import type { Metadata } from "next";
import { PublicPage, Panel, Action } from "@/components/platform/public-page";
import { HelpSearch } from "@/components/platform/help-search";
export const metadata: Metadata = { title: "Help Center | Ravikisan's Platform", description: "Search answers about account approval, access levels, AI sparks, content unlocks, privacy, and troubleshooting." };
export default function HelpPage() {
  return <PublicPage current="/help" eyebrow="The help center" title="Less confusion. A useful next step." intro="Find out how approval, access, and sparks work, or narrow down a problem before contacting the owner.">
    <div className="grid gap-5 md:grid-cols-3">{[
      ["New here?", "Start with account approval and the study workflow.", "/how-it-works", "How it works"],
      ["Need to report something?", "Prepare the details that make a support request useful.", "/contact", "Contact checklist"],
      ["Checking an exam notice?", "Verify the source before relying on a date or deadline.", "/neb-updates", "Verify a notice"],
    ].map(([title, text, href, label]) => <Panel key={title} title={title}><p>{text}</p><Action href={href} secondary>{label}</Action></Panel>)}</div>
    <HelpSearch />
  </PublicPage>;
}
