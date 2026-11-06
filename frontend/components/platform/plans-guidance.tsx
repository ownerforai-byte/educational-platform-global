import Link from "next/link";
export function PlansGuidance() {
  return <section aria-labelledby="plans-guidance" className="rounded-2xl border border-border bg-card p-6 sm:p-8">
    <h2 id="plans-guidance" className="text-xl font-bold">Before you request access</h2>
    <div className="mt-5 grid gap-6 text-sm leading-7 text-muted-foreground md:grid-cols-3">
      <div><h3 className="font-semibold text-foreground">Approval comes first</h3><p className="mt-2">An account and a plan are separate. Follow the registration instructions and check your approval status before troubleshooting a restricted section.</p></div>
      <div><h3 className="font-semibold text-foreground">Sparks are not a plan</h3><p className="mt-2">AI sparks and content sparks serve different purposes. An available balance does not bypass a section&apos;s minimum access level. Read the current unlock prompt before proceeding.</p></div>
      <div><h3 className="font-semibold text-foreground">Check current conditions</h3><p className="mt-2">Use the current section matrix and your account balance for availability. No price, automatic upgrade, or approval deadline is promised by this explanation.</p></div>
    </div>
    <div className="mt-6 divide-y divide-border">
      {[
        ["How do I request Plus or Pro?", "These plans are owner-granted in the current setup. Contact the owner with the account you registered and the access you need. A request is not a guarantee of approval."],
        ["Does access guarantee an exam result?", "No. Resources support learning and practice. They do not guarantee marks, admission, or a particular examination outcome."],
        ["Where are payment and privacy conditions?", "Read Purchases, Terms, and Privacy in the footer before making a payment or sharing information. Never send card details, passwords, or one-time codes in a support request."],
      ].map(([question, answer]) => <details key={question} className="py-4"><summary className="cursor-pointer rounded font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-ring">{question}</summary><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{answer}</p></details>)}
    </div>
    <Link href="/contact" className="mt-4 inline-flex min-h-11 items-center rounded-lg font-semibold text-primary focus-visible:ring-2 focus-visible:ring-ring">Get help with an access request →</Link>
  </section>;
}
