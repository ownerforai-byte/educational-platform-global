import { supabaseAdmin } from "../db/supabase";

/**
 * id → email resolver backed by GoTrue (auth.users).
 *
 * `profiles` deliberately has NO email column (PII would sit in a table whose
 * select policy is open), yet the owner/admin user lists need Gmails — and
 * until now they selected a nonexistent `profiles.email`, which made
 * GET /api/owner/users and GET /api/admin/users fail outright (found
 * 2026-09-26). Emails are resolved here from the auth admin API instead and
 * merged into the response server-side; they never persist in profiles.
 */

/** Max users we page through (protects against runaway loops). */
const MAX_PAGES = 50; // 50 × 200 = 10 000 accounts

export async function authEmailsById(): Promise<Map<string, string>> {
  const emails = new Map<string, string>();

  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({
        page,
        perPage: 200,
      });
      if (error) {
        console.error("[auth-emails] listUsers failed:", error.message);
        break;
      }
      for (const u of data?.users ?? []) {
        if (u.email) emails.set(u.id, u.email.toLowerCase());
      }
      const totalPages = data?.totalPages ?? 1;
      if (page >= totalPages) break;
    }
  } catch (err) {
    console.error(
      "[auth-emails] unexpected failure:",
      err instanceof Error ? err.message : err,
    );
  }

  return emails;
}
