import { Router, Request, Response } from "express";
import { supabaseAdmin } from "../db/supabase";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../middleware/asyncHandler";
import { serverError } from "../middleware/errors";
import { XP_RULE, xpForSet } from "../utils/xp";

/**
 * ── Leaderboard ─────────────────────────────────────────────────────────────
 *
 * Ranking is XP, and XP comes from quiz accuracy (see `utils/xp.ts`). There is
 * no stored XP column: the score is derived from each student's scored sets on
 * every read, so the rule can be corrected without a backfill and a student can
 * never "bank" points under an old rule.
 *
 * Privacy: this endpoint never returns an email, a user id or a raw full name.
 * Names are masked here, on the server, because a browser-side mask is not a
 * mask at all. Students without a profile name appear as "Student".
 *
 * The aggregation reads the set-level counts and the set format only. The
 * `questions` jsonb (the whole quiz payload) is deliberately not fetched; the
 * one field needed from it — the set format — is selected as a JSON path and
 * there is a fallback select without it, so an older PostgREST degrades to
 * "treat every set as choice" instead of failing the page.
 */

const router = Router();

/** One scored set, as far as XP is concerned. */
interface HistoryRow {
  user_id: string;
  answered: number | null;
  correct: number | null;
  score_pct: number | null;
  format?: string | null;
}

interface Aggregate {
  userId: string;
  xp: number;
  answered: number;
  correct: number;
  sets: number;
}

const MODE = "history" as const;

function isMissingTable(error: { message?: string } | null): boolean {
  const msg = (error?.message ?? "").toLowerCase();
  return (
    msg.includes("could not find the table") ||
    msg.includes("does not exist") ||
    msg.includes("schema cache") ||
    msg.includes("relation")
  );
}

/** "Aarav Sharma" → "Aarav S."; one word stays as-is; nothing → "Student". */
export function maskName(fullName: string | null | undefined): string {
  const clean = (fullName ?? "").trim().replace(/\s+/g, " ");
  if (!clean) return "Student";
  const parts = clean.split(" ");
  if (parts.length === 1) return parts[0];
  const first = parts[0];
  const last = parts[parts.length - 1];
  return `${first} ${last.charAt(0).toUpperCase()}.`;
}

/**
 * Competition ranking: equal XP shares a rank, and the next rank skips the
 * shared places (1, 2, 2, 4). A leaderboard that breaks ties by row order
 * would invent a difference the rule does not have.
 */
export function rankEntries<T extends { xp: number }>(entries: T[]): Array<T & { rank: number }> {
  const sorted = [...entries].sort(
    (a, b) => b.xp - a.xp || 0,
  );
  let rank = 0;
  let previousXp: number | null = null;
  return sorted.map((entry, index) => {
    if (previousXp === null || entry.xp !== previousXp) {
      rank = index + 1;
      previousXp = entry.xp;
    }
    return { ...entry, rank };
  });
}

function aggregate(rows: HistoryRow[]): Aggregate[] {
  const byUser = new Map<string, Aggregate>();
  for (const row of rows) {
    if (!row.user_id) continue;
    const answered = Math.max(0, Math.floor(row.answered ?? 0));
    const correct = Math.max(0, Math.min(answered, Math.floor(row.correct ?? 0)));
    const scorePct =
      typeof row.score_pct === "number" && Number.isFinite(row.score_pct) ? row.score_pct : null;

    const xp = xpForSet({ answered, correct, scorePct, format: (row.format as never) ?? null });
    if (answered === 0) continue;

    const current = byUser.get(row.user_id) ?? {
      userId: row.user_id,
      xp: 0,
      answered: 0,
      correct: 0,
      sets: 0,
    };
    current.xp += xp;
    current.answered += answered;
    current.correct += correct;
    current.sets += 1;
    byUser.set(row.user_id, current);
  }
  return [...byUser.values()];
}

const MAX_SETS = 20_000;
const TOP_N = 50;

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as Request & { user: { id: string } }).user;

    // Preferred select: counts + the set format pulled out of the question
    // payload by JSON path, aliased to `format`.
    let rows: HistoryRow[] = [];
    let migrated = true;
    let formatKnown = true;

    const primary = await supabaseAdmin
      .from("quiz_history")
      .select("user_id, answered, correct, score_pct, format:questions->0->>format")
      .limit(MAX_SETS);

    if (primary.error) {
      if (isMissingTable(primary.error)) {
        migrated = false;
      } else {
        // JSON-path select unsupported / rejected — retry with plain columns.
        formatKnown = false;
        const fallback = await supabaseAdmin
          .from("quiz_history")
          .select("user_id, answered, correct, score_pct")
          .limit(MAX_SETS);
        if (fallback.error) {
          if (isMissingTable(fallback.error)) {
            migrated = false;
          } else {
            serverError(res, fallback.error, "leaderboard");
            return;
          }
        } else {
          rows = (fallback.data ?? []) as unknown as HistoryRow[];
        }
      }
    } else {
      rows = (primary.data ?? []) as unknown as HistoryRow[];
    }

    res.setHeader("Cache-Control", "private, no-store");

    if (!migrated) {
      res.json({
        entries: [],
        you: null,
        totals: { students: 0, sets: 0 },
        rule: XP_RULE,
        mode: MODE,
        migrated: false,
        formatKnown,
      });
      return;
    }

    const aggregates = aggregate(rows);

    // Names for everyone who earns XP; ids never leave the server.
    let names = new Map<string, string | null>();
    if (aggregates.length > 0) {
      const { data: profiles } = await supabaseAdmin
        .from("profiles")
        .select("id, full_name")
        .in(
          "id",
          aggregates.map((a) => a.userId),
        );
      names = new Map(
        (profiles ?? []).map((p: { id: string; full_name: string | null }) => [p.id, p.full_name]),
      );
    }

    const ranked = rankEntries(
      aggregates.map((a) => ({
        userId: a.userId,
        xp: a.xp,
        answered: a.answered,
        correct: a.correct,
        sets: a.sets,
        accuracy: a.answered > 0 ? Math.round((a.correct / a.answered) * 100) : 0,
      })),
    );

    const entries = ranked.slice(0, TOP_N).map((entry) => ({
      rank: entry.rank,
      name: maskName(names.get(entry.userId)),
      xp: entry.xp,
      accuracy: entry.accuracy,
      answered: entry.answered,
      sets: entry.sets,
      isYou: entry.userId === user.id,
    }));

    const mine = ranked.find((entry) => entry.userId === user.id);
    const myIndex = mine ? ranked.indexOf(mine) : -1;
    const above = myIndex > 0 ? ranked[myIndex - 1] : null;

    res.json({
      entries,
      you: mine
        ? {
            rank: mine.rank,
            xp: mine.xp,
            accuracy: mine.accuracy,
            answered: mine.answered,
            correct: mine.correct,
            sets: mine.sets,
            inTopList: mine.rank <= TOP_N,
            gapToNext: above ? above.xp - mine.xp : 0,
            nextName: above ? maskName(names.get(above.userId)) : null,
          }
        : null,
      totals: {
        students: ranked.length,
        sets: ranked.reduce((sum, entry) => sum + entry.sets, 0),
      },
      rule: XP_RULE,
      mode: MODE,
      migrated: true,
      formatKnown,
    });
  }),
);

export default router;
