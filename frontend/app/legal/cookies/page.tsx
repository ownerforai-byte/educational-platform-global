import type { Metadata } from "next";
import { LegalDoc } from "../legal-doc";
import { LegalBlurGate } from "../legal-blur-gate";

export const metadata: Metadata = {
  title: "Cookie Policy — Ravikisan's Platform",
  description:
    "The session cookies Ravikisan's Platform uses, why, and how to manage them. No advertising or analytics cookies.",
};

export default function CookiePolicy() {
  return (
    <LegalDoc
      title="Cookie & Session Policy"
      updated="14 October 2026"
      intro="We use functionally essential cookies only, to keep you signed in and protect your account. No advertising cookies or third-party analytics trackers."
      doc="cookie-policy"
    >
      <section>
        <h2>Cookies set</h2>
        <LegalBlurGate>
          <table>
            <thead>
              <tr><th>Cookie</th><th>Purpose</th><th>Type</th><th>Lifetime</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><code>sb-access-token</code></td>
                <td>Short-lived session (keeps you logged in)</td>
                <td>Essential · httpOnly · Secure in production · SameSite=Lax</td>
                <td>~1 hour, auto-refreshed</td>
              </tr>
              <tr>
                <td><code>sb-refresh-token</code></td>
                <td>Long-lived token to stay signed in</td>
                <td>Essential · httpOnly · Secure · SameSite=Lax</td>
                <td>30 days, rotated on refresh</td>
              </tr>
            </tbody>
          </table>
          <ul>
            <li>Both are <code>httpOnly</code> (not readable by page scripts).</li>
            <li>In <strong>production</strong> both are flagged <code>Secure</code> (HTTPS only).</li>
            <li><code>SameSite=Lax</code> limits cross-site sending (reduces CSRF risk).</li>
          </ul>
        </LegalBlurGate>
      </section>

      <section>
        <h2>Browser / PWA local storage</h2>
        <p>
          If you install the App as a PWA or use it in a browser, we may use{" "}
          <strong>local storage</strong> for non-essential, non-personal UI
          preferences (e.g. theme). It does not contain your password or
          personal data.
        </p>
      </section>

      <section>
        <h2>Controlling / removing</h2>
        <ul>
          <li>We do not set tracking cookies to opt out of.</li>
          <li>
            Blocking the two session cookies means you cannot stay signed in,
            and authenticated features (progress, bookmarks, AI history) become
            unavailable.
          </li>
          <li>Use <strong>Sign out</strong> to clear both session cookies.</li>
        </ul>
      </section>

      <section>
        <h2>Protection &amp; changes</h2>
        <LegalBlurGate>
          <p>
            Sessions are protected in transit (HTTPS) and at rest (Supabase). We
            never read or log full passwords. We may update this policy; changes
            are marked with a new date.
          </p>
        </LegalBlurGate>
      </section>
    </LegalDoc>
  );
}
