import Link from "next/link";
export function PlansGuidance() {
  return <section aria-labelledby="plans-guidance" className="rounded-2xl border border-border bg-card p-6 sm:p-8">
    <h2 id="plans-guidance" className="text-xl font-bold">Before you start</h2>
    <div className="mt-5 grid gap-6 text-sm leading-7 text-muted-foreground md:grid-cols-3">
      <div><h3 className="font-semibold text-foreground">Account approval</h3><p className="mt-2">After signing, the account is approved by the system verification and administrative approval.</p></div>
      <div><h3 className="font-semibold text-foreground">Sparks are not a plan</h3><p className="mt-2">AI sparks and content sparks serve different purposes. Read the current balance and unlock prompt before proceeding.</p></div>
      <div><h3 className="font-semibold text-foreground">Check current conditions</h3><p className="mt-2">Use the current plan and your account balance for availability. No price or automatic upgrade is promised by this explanation.</p></div>
    </div>
    <div className="mt-6 divide-y divide-border">
      {[
        [
          "How does an account get access?",
          "After signing, the account is approved by the system verification and administrative approval.",
        ],
        [
          "How do I request Plus or Pro?",
          "After signing, the account is approved by the system verification and administrative approval.",
        ],
        [
          "Does access guarantee an exam result?",
          "No. Resources support learning and practice. They do not guarantee marks, admission, or a particular examination outcome.",
        ],
        [
          "Where are payment and privacy conditions?",
          "Read Purchases, Terms, and Privacy in the footer before making a payment or sharing information. Never send card details, passwords, or one-time codes in a support request.",
        ],
      ].map(([question, answer]) => <details key={question} className="py-4"><summary className="cursor-pointer rounded font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-ring">{question}</summary><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{answer}</p></details>)}
    </div>
    <Link href="/contact" className="mt-4 inline-flex min-h-11 items-center rounded-lg font-semibold text-primary focus-visible:ring-2 focus-visible:ring-ring">Questions? Get in touch →</Link>
  </section>;
}
