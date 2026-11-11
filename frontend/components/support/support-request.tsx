"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api-client";
import { useSession } from "@/features/auth/hooks/use-session";

export function SupportRequest({ kind, floating = false }: { kind: "account_deletion" | "ai_report"; floating?: boolean }) {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const { user, isLoading } = useSession();
  const deletion = kind === "account_deletion";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading || !user) return;
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
    <details className={floating
      ? "fixed bottom-24 right-4 z-[100] w-[calc(100vw-2rem)] max-w-sm rounded-xl border border-border bg-card text-sm shadow-xl"
      : "my-4 rounded-xl border border-border bg-card p-4 text-sm"}>
      <summary className={floating ? "cursor-pointer list-none p-3 font-semibold" : "cursor-pointer font-semibold"}>
        {deletion ? "Request account deletion" : "Report AI content"}
      </summary>
      <form onSubmit={submit} className={floating
        ? "absolute bottom-full right-0 mb-2 max-h-[70vh] w-full space-y-3 overflow-y-auto rounded-xl border border-border bg-card p-4 text-sm shadow-xl"
        : "mt-3 space-y-3"}>
        <p>{deletion
          ? "Request deletion of your account and associated data. Support will verify your identity before deletion; submitting this form does not immediately delete data."
          : "Paste the offensive or unsafe AI answer and describe the problem. Support uses reports to review content and improve filtering."}</p>
        {isLoading
          ? <p>Checking sign-in status…</p>
          : user
            ? <p>Your account ID, email and this message are sent to support. Include only information needed to handle your request.</p>
            : <p>Sign in to submit this request. <Link href="/login" className="underline">Sign in</Link>.</p>}
        <label className="block">{deletion ? "Deletion request details" : "AI content and reason"}
          <textarea required minLength={10} maxLength={4000} value={message} onChange={event => setMessage(event.target.value)} className="mt-1 block min-h-24 w-full rounded border border-border bg-background p-2" />
        </label>
        {deletion && <label className="flex gap-2"><input type="checkbox" required />I want support to delete my account and associated data after verification.</label>}
        <button type="submit" disabled={pending || isLoading || !user} className="rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50">{pending ? "Sending…" : "Send request"}</button>
        {status && <p role="status">{status}</p>}
        {error && <p role="alert">{error}</p>}
      </form>
    </details>
  );
}
