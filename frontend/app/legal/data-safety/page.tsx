import type { Metadata } from "next";
import { LegalDoc } from "../legal-doc";

export const metadata: Metadata = {
  title: "Data Safety — Ravikisan's Platform",
  description:
    "Google Play Data Safety declaration and how data is collected, shared, and protected.",
};

export default function DataSafety() {
  return (
    <LegalDoc
      title="Data Safety"
      updated="14 October 2026"
      intro="This page summarizes the Google Play Data Safety declaration for Ravikisan's Platform."
      doc="data-safety"
    >
      <section>
        <h2>1. Data the app collects or shares</h2>
        <h3>Data collected</h3>
        <ul>
          <li><strong>Name</strong> — Yes (optional, account sign-up)</li>
          <li><strong>Email address</strong> — Yes (required for account creation)</li>
          <li><strong>User ID</strong> — Yes (Supabase account ID)</li>
          <li><strong>Other content</strong> — Yes (study progress, bookmarks, AI chat/figure history, uploaded files, AI prompts)</li>
          <li><strong>App interaction</strong> — Yes (features used, errors/crashes)</li>
        </ul>
        <h3>Data shared with third parties</h3>
        <ul>
          <li><strong>Supabase</strong> — Name, Email, User ID, Other content</li>
          <li><strong>Vercel / Render</strong> — App interaction / technical logs</li>
          <li><strong>AI provider (Veer)</strong> — Prompts, generated content, and User ID (for logged-in users)</li>
        </ul>
      </section>

      <section>
        <h2>2. Data protection practices</h2>
        <ul>
          <li><strong>Data encrypted in transit</strong> — Yes (HTTPS/TLS)</li>
          <li><strong>Users can delete their data</strong> — Yes</li>
          <li><strong>Data deleted on account deletion</strong> — Yes</li>
        </ul>
      </section>

      <section>
        <h2>3. Data sensitivity</h2>
        <ul>
          <li><strong>Can identify a person</strong> — Yes (Name/Email/User ID)</li>
          <li><strong>Sensitive info (health, religion, etc.)</strong> — No</li>
          <li><strong>Financial info</strong> — No (Google processes payments when IAP enabled)</li>
        </ul>
      </section>

      <section>
        <h2>4. Ads & Monetization</h2>
        <ul>
          <li><strong>Ads</strong> — No (we do not run third-party ad SDKs)</li>
          <li><strong>In-app purchases/subscriptions</strong> — As configured in the app</li>
        </ul>
      </section>

      <section>
        <h2>5. Contact</h2>
        <p>
          Questions about data safety:{" "}
          <a className="font-medium" href="mailto:ravikisan1814@gmail.com">
            ravikisan1814@gmail.com
          </a>
        </p>
      </section>
    </LegalDoc>
  );
}
