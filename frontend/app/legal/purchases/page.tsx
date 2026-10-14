import type { Metadata } from "next";
import { LegalDoc } from "../legal-doc";

export const metadata: Metadata = {
  title: "Purchases & Refund Policy — Ravikisan's Platform",
  description:
    "How purchases, credits, and refunds work in Ravikisan's Platform, including Google Play Billing.",
};

export default function PurchasesRefund() {
  return (
    <LegalDoc
      title="Purchase & Refund Policy"
      updated="14 October 2026"
      intro="Applies to any paid feature (premium access, extra AI credits, or subscriptions) and is kept consistent with Google Play Billing."
      doc="purchase-refund-policy"
    >
      <section>
        <h2>1. Free features</h2>
        <p>
          Notes, mind maps, labs, PYQs, quizzes, and progress tracking are
          free. A limited <strong>daily credit pool</strong> (resets at
          midnight) is available to all signed-in users at no cost.
        </p>
      </section>

      <section>
        <h2>2. Paid features (if enabled)</h2>
        <ul>
          <li><strong>Premium / Pro access</strong> — unlocks unlimited/higher AI usage and premium-gated features.</li>
          <li><strong>Extra AI credits</strong> — one-time top-ups for your credit pool.</li>
        </ul>
        <p>
          Pricing, billing cycle, and what's included are shown{" "}
          <strong>before</strong> you confirm a purchase.
        </p>
      </section>

      <section>
        <h2>3. Billing (where Google Play Billing is used)</h2>
        <p>
          Purchases are processed by <strong>Google Play</strong> and billed to
          your Google account. Subscriptions renew automatically at the end of
          each cycle unless you cancel beforehand (manage in Play Store →
          Subscriptions). You'll be notified of price changes at least 3 days
          before. Prices vary by store region.
        </p>
      </section>

      <section>
        <h2>4. Refunds</h2>
        <ul>
          <li>
            <strong>Google Play</strong> handles refunds for in-app
            purchases/subscriptions — request via Play Store → Payments &amp;
            subscriptions → Order history, or contact Google.
          </li>
          <li>
            <strong>Failed AI actions</strong> are refunded automatically to
            your pool (you are not charged for a failed request).
          </li>
          <li>
            <strong>Unused credit/premium</strong> purchased within <code>7</code>{" "}
            days: email <a className="font-medium" href="mailto:ravikisan1814@gmail.com">ravikisan1814@gmail.com</a>{" "}
            from your account address; we review and process or explain.
          </li>
          <li>
            Subscription periods already used: at Google's discretion per Play
            policy.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Cancellations</h2>
        <p>
          Subscriptions: cancel anytime via Play Store; keep access until the
          paid period ends. Credit tops: non-refundable once consumed; unused
          credits may be refundable within the §4 window.
        </p>
      </section>

      <section>
        <h2>6. Support</h2>
        <p>
          Email: <a className="font-medium" href="mailto:ravikisan1814@gmail.com">ravikisan1814@gmail.com</a>{" "}
          (include account email, order ID, and a short description).
        </p>
      </section>
    </LegalDoc>
  );
}
