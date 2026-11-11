import { Router } from "express";
import { z } from "zod";
import { requireAuth, type AuthedRequest } from "../../middleware/auth";
import { supportRequestLimit } from "../../middleware/rateLimit";
import { sendMail } from "../../utils/mailer";

/**
 * Support intake for account deletion and AI-content reports.
 *
 * Ported onto current main from PR #3 (the branch also carried a large stale
 * docs/workflow delta). Identity is read from the verified session, never from
 * the body; HTML is escaped; a failed delivery is never reported as success.
 */
const router = Router();

const schema = z
  .object({
    kind: z.enum(["account_deletion", "ai_report"]),
    message: z.string().trim().min(10).max(4000),
  })
  .strict();

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (char) =>
    ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char] ?? char,
  );

// No premium/approval gate: every authenticated account may request deletion.
// The account-scoped limiter follows auth; global IP limits still apply.
router.post("/", requireAuth, supportRequestLimit, async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Choose a request type and enter 10–4000 characters." });
    return;
  }
  const user = (req as AuthedRequest).user;
  const text = `Type: ${parsed.data.kind}\nAccount: ${user.id}\nEmail: ${user.email}\n\n${parsed.data.message}`;
  const result = await sendMail({
    to: "sahrocky81@gmail.com",
    subject:
      parsed.data.kind === "account_deletion"
        ? "Account deletion request"
        : "AI content report",
    text,
    html: `<pre>${escapeHtml(text)}</pre>`,
  });
  if (!result.sent) {
    res.status(503).json({
      error:
        "Request delivery is unavailable. Please retry or contact sahrocky81@gmail.com.",
    });
    return;
  }
  const message =
    parsed.data.kind === "account_deletion"
      ? "Your account deletion request was delivered to support for review. Identity verification is required before deletion."
      : "Your AI content report was delivered to support for review.";
  res.status(202).json({ message });
});

export default router;
