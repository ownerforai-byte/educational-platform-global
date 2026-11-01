"use client";

import { useState, type FormEvent } from "react";
import { apiFetch } from "@/lib/api-client";

export function SupportRequest({ kind }: { kind: "account_deletion" | "ai_report" }) {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const deletion = kind === "account_deletion";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true); setStatus(""); setError("");
    try {
      const result = await apiFetch<{ message: string }>("/api/user/support-requests", {
        method: "POST", body: JSON.stringify({ kind, message }),
      });
      setStatus(result.message); setMessage("");
    } catch {
      setError("Your request was not confirmed. Retry, sign in if needed, or email ravikisan1814@gmail.com.");
    } finally { setPending(false); }
  }
  return (
    <details className="my-4 rounded-xl border border-border bg-card p-4 text-sm">
      <summary className="cursor-pointer font-semibold">{deletion ? "Request account deletion" : "Report AI content"}</summary>
      <form onSubmit={submit} className="mt-3 space-y-3">
        <p>{deletion
          ? "Request deletion of your account and associated data. Support will verify your identity before deletion; submitting this form does not immediately delete data."
          : "Paste the offensive or unsafe AI answer and describe the problem. Support uses reports to review content and improve filtering."}</p>
        <p>Sign in to submit. Your account ID, email and this message are sent to support. Include only information needed to handle your request.</p>
        <label className="block">{deletion ? "Deletion request details" : "AI content and reason"}
          <textarea required minLength={10} maxLength={4000} value={message} onChange={event => setMessage(event.target.value)} className="mt-1 block min-h-24 w-full rounded border border-border bg-background p-2" />
        </label>
        {deletion && <label className="flex gap-2"><input type="checkbox" required />I want support to delete my account and associated data after verification.</label>}
        <button type="submit" disabled={pending} className="rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50">{pending ? "Sending…" : "Send request"}</button>
        {status && <p role="status">{status}</p>}
        {error && <p role="alert">{error}</p>}
      </form>
    </details>
  );
}
