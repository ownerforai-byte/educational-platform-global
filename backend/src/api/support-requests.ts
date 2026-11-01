import { Router } from "express";
import { z } from "zod";
import { requireAuth, type AuthedRequest } from "../middleware/auth";
import { supportRequestLimit } from "../middleware/rateLimit";
import { sendMail } from "../utils/mailer";

const router = Router();
const schema = z.object({
  kind: z.enum(["account_deletion", "ai_report"]),
  message: z.string().trim().min(10).max(4000),
}).strict();
const escapeHtml = (text: string) => text.replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char] ?? char);

// No premium/approval gate: every authenticated account may request deletion.
// An account-scoped support limiter follows auth; global IP limits still apply.
// Delivery failure is never acknowledged as success.
router.post("/", requireAuth, supportRequestLimit, async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Choose a request type and enter 10–4000 characters." });
    return;
  }
  const user = (req as AuthedRequest).user;
  const text = `Type: ${parsed.data.kind}\nAccount: ${user.id}\nEmail: ${user.email}\n\n${parsed.data.message}`;
  const result = await sendMail({
    to: "ravikisan1814@gmail.com",
    subject: parsed.data.kind === "account_deletion" ? "Account deletion request" : "AI content report",
    text,
    html: `<pre>${escapeHtml(text)}</pre>`,
  });
  if (!result.sent) {
    res.status(503).json({ error: "Request delivery is unavailable. Please retry or contact ravikisan1814@gmail.com." });
    return;
  }
  res.status(202).json({ message: "Your request was delivered to support for review. Account deletion requires identity verification." });
});

export default router;
