import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "../legal-doc";

export const metadata: Metadata = {
  title: "Content Takedown & Rights Requests — Ravikisan's Platform",
  description:
    "How a rights holder asks for material to be reviewed or removed, what to include, and how the platform responds.",
};

export default function TakedownPage() {
  return (
    <LegalDoc
      title="Content takedown and rights requests"
      updated="7 November 2026"
      intro="If you own material used on this platform and believe it appears without permission, this page explains how to ask us to review or remove it. There is no in-app submission form: requests go directly to the published support address."
      doc="takedown"
    >
      <section>
        <h2>1. Who can file a request</h2>
        <p>
          A rights holder, publisher, author, or someone formally authorised to
          act for them. If you are reporting a factual mistake or a wrong
          calculation instead, use <Link href="/contact">Contact and Corrections</Link> so it reaches the content review path.
        </p>
      </section>

      <section>
        <h2>2. What to include</h2>
        <p>A specific request is much easier to act on. Please include:</p>
        <ul>
          <li>The exact page URL or URLs where the material appears.</li>
          <li>A description of the original work and the part you want reviewed.</li>
          <li>Your name, organisation, and an email address we can reply to.</li>
          <li>Evidence that you own the work or are authorised to act for the owner.</li>
          <li>A short statement that the request is made in good faith.</li>
        </ul>
        <p>
          Do not send passwords, one-time codes, session tokens, or private
          student records. We only need the details above.
        </p>
      </section>

      <section>
        <h2>3. Where to send it</h2>
        <p>
          Email <a className="font-medium" href="mailto:ravikisan1814@gmail.com">ravikisan1814@gmail.com</a> with the subject{" "}
          <strong>Content takedown request</strong>. The same address is used for
          account and support enquiries; the subject line routes it to the
          rights review described here. Our written process is recorded in the
          repository&apos;s <code>SECURITY.md</code>, and every external source and
          its status is listed in <code>SOURCES.md</code>.
        </p>
        <p>
          This page does not submit or store messages, and does not promise an
          instant removal. A human reads each request before anything changes.
        </p>
      </section>

      <section>
        <h2>4. What happens next</h2>
        <ul>
          <li>We aim to acknowledge a complete request within five working days.</li>
          <li>While we review it, we may restrict access to the specific item rather than leave disputed material live.</li>
          <li>We check the source ledger and the content pipeline to find every place the material is used.</li>
          <li>If we cannot confirm the right to use it, we remove it or replace it with platform-authored material, and record the outcome in the source ledger.</li>
          <li>We reply with the result. If we need more detail to identify the work, we will ask for it.</li>
        </ul>
      </section>

      <section>
        <h2>5. Material already under review</h2>
        <p>
          Parts of the ingested textbook corpus and the past-year question banks
          are marked as rights-status under review in <code>SOURCES.md</code>. We do
          not claim ownership of third-party source text. Rights holders for
          those works are invited to contact us through this process; a request
          does not require you to identify a specific page first.
        </p>
      </section>

      <section>
        <h2>6. Related documents</h2>
        <ul>
          <li><Link href="/legal/attribution">Attribution and content licences</Link> — how the platform&apos;s own material may be reused.</li>
          <li><Link href="/legal/terms">Terms of Service</Link> — the rules for using the platform.</li>
          <li><Link href="/legal/content-rating">Content Rating</Link> — who the material is written for and how to report a concern.</li>
          <li><Link href="/contact">Contact and Corrections</Link> — reporting errors and access issues.</li>
        </ul>
      </section>
    </LegalDoc>
  );
}
