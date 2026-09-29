/**
 * Minimal outbound mailer — owner policy 2026-09-28:
 *   "an auto approved email is sent to the user when his account is
 *    approved from the owner".
 *
 * Deliberately dependency-free: both supported providers are plain HTTPS
 * APIs, so no nodemailer/SMTP wiring is needed. Configuration (any ONE of):
 *
 *   RESEND_API_KEY=re_...        (+ optional MAIL_FROM, default below)
 *   SENDGRID_API_KEY.SG....
 *
 * When neither key is present the mailer SKIPS and reports it — approval
 * flows must never fail or hang because email has not been wired yet.
 */

export interface MailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface SendResult {
  sent: boolean;
  skipped?: boolean;
  error?: string;
}

const DEFAULT_FROM = "Ravikisan's Platform <no-reply@ravikisan.app>";

function fromAddress(): string {
  return process.env.MAIL_FROM?.trim() || DEFAULT_FROM;
}

/** "Name <a@b.c>" → { email, name } for providers that want them split. */
function parseFrom(raw: string): { email: string; name: string } {
  const match = /^("?)(.*?)\1\s*<([^>]+)>\s*$/.exec(raw);
  if (match) return { email: match[3].trim(), name: match[2].trim() };
  return { email: raw.trim(), name: "Ravikisan's Platform" };
}

function frontendUrl(path: string): string {
  const base = (
    process.env.FRONTEND_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3110"
  ).replace(/\/+$/, "");
  return `${base}${path}`;
}

async function postJson(
  url: string,
  headers: Record<string, string>,
  body: unknown,
): Promise<{ ok: boolean; status: number; detail: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const detail = res.ok ? "" : (await res.text().catch(() => "")).slice(0, 400);
    return { ok: res.ok, status: res.status, detail };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Send one email through whichever provider is configured.
 * Best-effort by design: returns a result instead of throwing so callers
 * can treat email as a side dish to the real response.
 */
export async function sendMail(payload: MailPayload): Promise<SendResult> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const sendgridKey = process.env.SENDGRID_API_KEY?.trim();

  try {
    if (resendKey) {
      const result = await postJson(
        "https://api.resend.com/emails",
        { Authorization: `Bearer ${resendKey}` },
        {
          from: fromAddress(),
          to: [payload.to],
          subject: payload.subject,
          html: payload.html,
          ...(payload.text ? { text: payload.text } : {}),
        },
      );
      if (!result.ok) {
        return { sent: false, error: `resend ${result.status}: ${result.detail}` };
      }
      return { sent: true };
    }

    if (sendgridKey) {
      const from = parseFrom(fromAddress());
      const result = await postJson(
        "https://api.sendgrid.com/v3/mail/send",
        { Authorization: `Bearer ${sendgridKey}` },
        {
          personalizations: [{ to: [{ email: payload.to }] }],
          from: { email: from.email, name: from.name },
          subject: payload.subject,
          content: [
            { type: "text/plain", value: payload.text ?? payload.subject },
            { type: "text/html", value: payload.html },
          ],
        },
      );
      if (!result.ok) {
        return { sent: false, error: `sendgrid ${result.status}: ${result.detail}` };
      }
      return { sent: true };
    }

    return { sent: false, skipped: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { sent: false, error: message };
  }
}

function approvalHtml(displayName: string | null): string {
  const firstName = displayName?.trim().split(/\s+/)[0] || null;
  const hello = firstName ? `Hi ${firstName},` : "Hello,";
  const loginUrl = frontendUrl("/login");
  return `<!doctype html>
<html>
  <body style="margin:0;padding:32px 16px;background:#f4f6fb;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;">
      <tr>
        <td style="background:linear-gradient(135deg,#059669,#2563eb);padding:28px 32px;">
          <div style="font-size:22px;font-weight:800;color:#ffffff;">⚓ Ravikisan's Platform</div>
          <div style="font-size:13px;color:#dbeafe;margin-top:4px;">NEB Class 11 &amp; 12 · Learning Platform</div>
        </td>
      </tr>
      <tr>
        <td style="padding:32px;">
          <h1 style="margin:0 0 12px;font-size:20px;">Your account has been approved! ✅</h1>
          <p style="margin:0 0 14px;line-height:1.6;">${hello}</p>
          <p style="margin:0 0 14px;line-height:1.6;">
            The platform owner has approved your account. You can now sign in
            and use everything the platform offers: syllabus notes, 3D labs,
            derivations, PYQs, quizzes and your Veer tutor — with your own
            saved chat histories and daily credits.
          </p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:22px 0;">
            <tr>
              <td style="background:#2563eb;border-radius:12px;">
                <a href="${loginUrl}" style="display:inline-block;padding:12px 28px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;">
                  Sign in now →
                </a>
              </td>
            </tr>
          </table>
          <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">
            If the button does not work, open this link directly:<br/>
            <a href="${loginUrl}" style="color:#2563eb;">${loginUrl}</a>
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:18px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;">
          This is an automatic approval notice from Ravikisan's Platform.
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/**
 * Notify a user that the owner approved their account. Best-effort:
 * resolves with a result, never throws into the approval flow.
 */
export async function sendApprovalEmail(
  to: string,
  fullName?: string | null,
): Promise<SendResult> {
  return sendMail({
    to,
    subject: "Your Ravikisan account is approved ✅ — sign in now",
    html: approvalHtml(fullName ?? null),
    text: "Your account has been approved by the owner. Sign in at your Ravikisan platform to start learning.",
  });
}
