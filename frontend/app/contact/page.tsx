import type { Metadata } from "next";
import { PublicPage, Panel, Action } from "@/components/platform/public-page";
export const metadata: Metadata = { title: "Contact & Corrections | Ravikisan's Platform", description: "Get help with access, report content mistakes, and prepare a useful support request for the owner." };
export default function ContactPage() {
  return <PublicPage current="/contact" eyebrow="Let's make it clearer" title="Questions, corrections, and a direct path to the owner." intro="Tell us what happened and where. A specific report makes it easier to understand the issue and fix the right thing.">
    <Panel title="Leave a message to this email; sahrocky81@gmail.com" eyebrow="The direct route"><p>For account approval questions, access requests, corrections and enquiries, leave a message to this email; sahrocky81@gmail.com. Everyone except the owner signs in as a Member first and waits for approval, so a pending account is a normal stage — not a fault. The owner&apos;s contact details are also on the notice board.</p><Action href="/notice">Open owner contact details</Action><p>This page does not submit or store messages. There is no support form pretending to send a request, and no guaranteed response time.</p></Panel>
    <div className="grid gap-6 md:grid-cols-2">{[
      ["Account or access", "Include the account email you used, the status visible in the app, and the section you cannot open. Do not send a password, one-time code, or access token."],
      ["Content correction", "Include the class, subject, chapter, exact page URL, and the sentence or calculation that needs review. Add a trusted reference and your suggested correction when possible."],
      ["Technical problem", "Include your device, browser, the steps that reproduce the problem, and the visible error. A screenshot can help after you remove private information."],
      ["Partnership or content request", "Explain your organisation or role, the intended audience, the topic, and what you are proposing. Do not assume that institutional access or a commercial arrangement is already available."],
    ].map(([title, text]) => <Panel key={title} title={title}><p>{text}</p></Panel>)}</div>
    <Panel title="A useful message checklist"><ul className="list-disc space-y-2 pl-5"><li>A short subject: access request, correction, bug report, or enquiry.</li><li>The page URL and relevant class or topic.</li><li>What you expected and what actually happened.</li><li>Steps to reproduce, or the evidence behind a correction.</li><li>Only the personal details needed to resolve your request.</li></ul><p>Never send payment-card details, passwords, private student records, or session tokens. For privacy or purchase questions, read the corresponding policy in the footer first.</p></Panel>
    <Panel title="You might not need to wait"><p>The Help Center covers account approval, disabled sections, the difference between AI and content sparks, and common loading problems.</p><Action href="/help" secondary>Find an answer</Action></Panel>
  </PublicPage>;
}
