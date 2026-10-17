import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "../legal-doc";
import { LegalBlurGate } from "../legal-blur-gate";

export const metadata: Metadata = {
  title: "Terms of Service — Ravikisan's Platform",
  description:
    "The rules for using Ravikisan's Platform: accounts, content, AI credits, purchases, and liability.",
};

export default function TermsOfService() {
  return (
    <LegalDoc
      title="Terms of Service"
      updated="14 October 2026"
      intro="By creating an account or using the App you agree to these Terms of Service."
      doc="terms-of-service"
    >
      <section>
        <h2>1. The service</h2>
        <p>
          Ravikisan's Platform is an educational study platform for NEB Class 11
          &amp; 12 (+2) students. It is a <strong>learning aid</strong>, not a
          substitute for your syllabus, textbooks, teachers, or exam-authority
          guidance.
        </p>
      </section>

      <section>
        <h2>2. Eligibility &amp; account approval</h2>
        <ul>
          <li>You must be able to form a binding contract or have parental consent.</li>
          <li>New accounts start <strong>pending</strong> and are activated by an administrator; authenticated features are unavailable until approval.</li>
          <li>Provide a valid email and keep credentials confidential; you are responsible for account activity.</li>
        </ul>
      </section>

      <section>
        <h2>3. Content</h2>
        <p>
          Content is for <strong>educational purposes only</strong>. AI answers
          and figures are aids, not exam guarantees — verify against the
          official NEB syllabus. We do not guarantee completeness or error-free
          content.
        </p>
      </section>

      <section>
        <h2>4. Acceptable use</h2>
        <p>
          Do not use the Service for fraud, unlawful acts, harassment, hacking,
          reverse-engineering, circumventing rate/credit limits or approvals,
          uploading malicious/infringing files, or harming others.
        </p>
      </section>

      <section>
        <h2>5. AI features &amp; credits</h2>
        <LegalBlurGate>
          <p>
            “Veer” runs on third-party AI providers; output may be inaccurate.
            Some AI actions consume <strong>credits</strong> from your daily pool;
            when empty, the feature is unavailable until reset or top-up. We may
            adjust costs or availability.
          </p>
        </LegalBlurGate>
      </section>

      <section>
        <h2>6. Purchases &amp; premium</h2>
        <p>
          Paid features are governed by the{" "}
          <Link className="font-medium" href="/legal/purchases">
            Purchase &amp; Refund Policy
          </Link>{" "}
          and applicable Google Play Billing terms.
        </p>
      </section>

      <section>
        <h2>7. Intellectual property</h2>
        <p>
          The Service, design, and our original content are owned by the
          operator; you get a limited, non-exclusive, revocable license for
          personal, non-commercial study. You own your uploads; you license us
          to store/display them to run the Service.
        </p>
      </section>

      <section>
        <h2>8. Disclaimers</h2>
        <p>
          The Service is provided <strong>“as is” and “as available”</strong>{" "}
          without warranties, including fitness for a particular exam. We do
          not guarantee uninterrupted service.
        </p>
      </section>

      <section>
        <h2>9. Limitation of liability</h2>
        <p>
          To the maximum extent permitted, we are not liable for indirect,
          incidental, or consequential damages or losses from relying on
          AI/study content. Total liability is limited to amounts paid in the
          preceding 3 months (or as required by law).
        </p>
      </section>

      <section>
        <h2>10. Indemnity</h2>
        <p>
          You agree to defend and hold us harmless from claims arising from your
          breach or misuse.
        </p>
      </section>

      <section>
        <h2>11. Termination</h2>
        <p>
          We may suspend or terminate your account at any time for breach or at
          our discretion; data may be deleted after notice.
        </p>
      </section>

      <section>
        <h2>12. Changes</h2>
        <p>
          We may update the Service and these Terms; material changes are
          posted with a new date. Continued use means acceptance.
        </p>
      </section>

      <section>
        <h2>13. Governing law</h2>
        <p>
          Governed by the laws of <code>Nepal</code>.
          Disputes first by discussion, then by the courts of{" "}
          <code>Nepal</code>.
        </p>
      </section>

      <section>
        <h2>14. Contact</h2>
        <p>
          Email: <a className="font-medium" href="mailto:ravikisan1814@gmail.com">ravikisan1814@gmail.com</a>{" "}
          · Operator: <code>Ravikisan</code>
        </p>
      </section>
    </LegalDoc>
  );
}
