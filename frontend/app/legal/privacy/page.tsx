import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "../legal-doc";
import { LegalBlurGate } from "../legal-blur-gate";

export const metadata: Metadata = {
  title: "Privacy Policy — Ravikisan's Platform",
  description:
    "What information Ravikisan's Platform collects, why, and how it is protected, shared, and deleted.",
};

export default function PrivacyPolicy() {
  return (
    <LegalDoc
      title="Privacy Policy"
      updated="14 October 2026"
      intro="This policy explains what information Ravikisan's Platform (the “App”, “we”, “us”) collects, why, and what choices you have. It is written for Google Play review and for students."
      doc="privacy-policy"
    >
      <section>
        <h2>1. Who we are</h2>
        <p>
          Ravikisan's Platform is a free, offline-capable study service for{" "}
          <strong>NEB Class 11 &amp; 12 (Nepali +2)</strong> students in Nepal. It
          provides curriculum-aligned notes, interactive labs, past-year
          questions, and an AI study assistant (“Veer”).
        </p>
        <ul>
          <li>Operator: <code>Ravikisan</code></li>
          <li>Country: Nepal</li>
          <li>Support email: <a className="font-medium" href="mailto:ravikisan1814@gmail.com">ravikisan1814@gmail.com</a></li>
        </ul>
      </section>

      <section>
        <h2>2. Information we collect</h2>
        <h3>Account information</h3>
        <p>
          Full name (optional), email address (required), and a password (stored
          only as a one-way hash). Accounts start as <strong>pending</strong> and
          are activated after approval.
        </p>
        <h3>Usage &amp; learning data (with an account)</h3>
        <p>
          Study progress, completed topics, statistics, bookmarks, AI chat
          history and generated figures, uploaded files, and lab/quiz activity.
        </p>
        <h3>AI-assistant data</h3>
        <p>
          When you use the AI tutor, your prompts and the AI responses are sent
          to a third-party AI provider to produce answers and figures. We do not
          sell your prompts.
        </p>
        <h3>Device &amp; technical data</h3>
        <p>
          Browser/app type, device &amp; OS version, screen size, and
          crash/error logs (technical only).
        </p>
      </section>

      <section>
        <h2>3. How we use it</h2>
        <p>
          To create and manage your account, provide study content and AI
          features, track progress, keep bookmarks, and secure the service
          (rate-limiting, abuse blocking).
        </p>
      </section>

      <section>
        <h2>4. How we protect it</h2>
        <LegalBlurGate>
          <p>
            Data is stored on <strong>Supabase</strong> (PostgreSQL, auth,
            storage) under our processor agreement. We use HTTPS/TLS, hashed
            passwords, per-user row-level security, strict CORS, per-IP rate
            limiting, and secure, httpOnly session cookies in production.
          </p>
        </LegalBlurGate>
      </section>

      <section>
        <h2>5. Who we share it with (processors)</h2>
        <LegalBlurGate>
          <p>We do <strong>not sell</strong> personal data. We use these service providers:</p>
          <table>
            <thead>
              <tr><th>Provider</th><th>Handles</th><th>Role</th></tr>
            </thead>
            <tbody>
              <tr><td>Supabase</td><td>Accounts, learning data, uploads, password emails</td><td>Processor / host</td></tr>
              <tr><td>Vercel</td><td>Front-end hosting</td><td>Host</td></tr>
              <tr><td>Render</td><td>Back-end API hosting</td><td>Host</td></tr>
              <tr><td>AI provider (Veer)</td><td>AI prompt/response processing</td><td>Third-party AI</td></tr>
            </tbody>
          </table>
          <p>
            Data may be processed in <strong>Nepal</strong> and{" "}
            <strong>India/US</strong> data centers.
          </p>
        </LegalBlurGate>
      </section>

      <section>
        <h2>6. Cookies</h2>
        <LegalBlurGate>
          <p>
            Two <code>httpOnly</code> session cookies (<code>sb-access-token</code>,{" "}
            <code>sb-refresh-token</code>) keep you signed in. No advertising or
            analytics cookies. See the <Link className="font-medium" href="/legal/cookies">Cookie Policy</Link>.
          </p>
        </LegalBlurGate>
      </section>

      <section>
        <h2>7. What we do NOT collect</h2>
        <p>
          No advertising identifiers, no third-party trackers, no precise GPS,
          and we do not sell data.
        </p>
      </section>

      <section>
        <h2>8. Your rights</h2>
        <p>
          You can access, correct, delete, or export your data. Email{" "}
          <a className="font-medium" href="mailto:ravikisan1814@gmail.com">ravikisan1814@gmail.com</a> from your
          account address.
        </p>
      </section>

      <section>
        <h2>9. Children's privacy</h2>
        <p>
          For +2 secondary students. We do not knowingly collect data from
          under-13 children. Contact us to delete any by mistake.
        </p>
      </section>

      <section>
        <h2>10. Retention &amp; security</h2>
        <p>
          Account data kept while active; deleted on request. AI history kept
          with your account. Uploaded files kept until removed. Reasonable
          safeguards apply; no transmission is 100% secure.
        </p>
      </section>

      <section>
        <h2>11. Changes &amp; contact</h2>
        <p>
          Changes are posted with a new “Last updated” date. Email:{" "}
          <a className="font-medium" href="mailto:ravikisan1814@gmail.com">ravikisan1814@gmail.com</a>
        </p>
        <LegalBlurGate compact>
          <p>
            Address: <code>Kalaiya-25, Bara, Madhesh Province, Nepal</code>
          </p>
        </LegalBlurGate>
      </section>
    </LegalDoc>
  );
}
