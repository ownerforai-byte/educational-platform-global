# Pro overhaul — Practice · Leaderboard · AI Tools

Audit + section-by-section plan. Each section ships fully before the next starts.

---

## 0. Audit — what is "wired only" today

### Practice
| Surface | State | Why it reads as unpolished |
|---|---|---|
| `/practice` | 5 identical link rows | A list of shortcuts, not an interface. No progress, no subject context, no feedback. |
| `/practice/[subject]` | Same list + unit rows | Duplicate of the hub with a subject name pasted in. |
| `/quiz` | 677-line single file, 3 modes | Mode cards + stacked `Card`s (form-like). MCQ mode is actually **True/False**, and the answer area is a bare `<textarea>` for the written modes. Reveal shows one blob of text — no per-option reasoning, no concept contrasts. Results screen is a percentage and a flat list. |

**Verdict:** the logic is wired; the interface is a form. Also the question types contradict the brief: there are three modes (concepts / true-false / PYQ) and no four-option MCQ at all.

### Leaderboard
| Surface | State | Why it reads as unpolished |
|---|---|---|
| `/leaderboard` | 114 lines, client-only | Ranks *your own subjects* by accuracy — no XP, no points rule, no other students, no rank of you. Header + one bordered list + a wall of subject chips. |

**Verdict:** it is a personal accuracy table wearing a leaderboard title. No XP concept exists anywhere in the codebase.

### AI Tools
| Surface | State | Why it reads as unpolished |
|---|---|---|
| `/ai` | Hub with directory | Generic card directory; no tool state, no tier context. |
| `/ai/workspace` | 103-line 3-card banner | Marketing banner, not a workspace. |
| `/ai/tutor`, `/ai/history` | `AiSurfaceHeader` ("features trio") + component | The trio of marketing bullets sits *above* the tool, so the console is pushed below the fold. Widths differ per page (`max-w-5xl`, `max-w-7xl`, `max-w-2xl`). |
| `/ai/quiz` → `/ai-quiz`, `/ai/search` → `/search`, `/ai/chat` → `/chat` | Redirects | Three of the "tools" are redirects: the toolbox is scattered across four top-level routes. |
| `/ai/math`, `/ai/deep-dive`, `/ai/diagrams` | Bespoke full-page canvases | No shared chrome, no switcher, no breadcrumb consistency. |

**Verdict:** every tool is individually wired but there is no console: no tool rail, no shared status, no consistent frame. Each page invents its own header and width.

---

## 1. Module A — Practice (ships first)

**Question model, final:** exactly two types.
1. **MCQ** — stem + exactly 4 options. On selection: lock the set, mark right/wrong, and render **four** explanations (one per option, plain language), plus a concept anchor.
2. **Writing** — prompt + input. On submit: model answer, marking points, and a **contrast table** that names each easily-confused concept pair and states the difference in one plain sentence.

Everything else in the section (true/false, "concepts" flip mode, the empty-question fallbacks) is removed from Practice.

**Files**
- `frontend/lib/practice/types.ts` — `McqQuestion`, `WritingQuestion`, `ContrastPair`, `SessionResult`.
- `frontend/lib/practice/mcq-bank.ts` — authored 4-option bank, per-option explanations (physics, chemistry, biology, mathematics).
- `frontend/lib/practice/writing-bank.ts` — authored written questions: model answer, marking points, contrast keys.
- `frontend/lib/practice/contrasts.ts` — the honest confusion-pair registry (distance vs displacement, speed vs velocity, mass vs weight, …).
- `frontend/lib/practice/xp.ts` — XP rule, one implementation, documented and tested.
- `frontend/components/practice/` — `session-shell`, `mcq-question`, `writing-question`, `explanation-panel`, `contrast-table`, `result-panel`.
- Rewrite `app/(app)/practice/page.tsx`, `app/(app)/practice/[subject]/page.tsx`, `app/(app)/quiz/page.tsx` (canonical engine, `?mode=mcq|writing&subject=…`).

**Acceptance:** no true/false mode; every MCQ has 4 options and 4 explanations; writing shows model answer + ≥2 contrast pairs; keyboard accessible (options are real buttons, arrow/enter, visible focus); mobile-first.

---

## 2. Module B — Leaderboard (XP)

**Rule (single source of truth in `backend/src/utils/xp.ts`)**
- correct MCQ = **10 XP**; wrong attempt = **2 XP** (effort, never a reward for accuracy)
- set accuracy bonus: ≥80% **+25**, ≥60% **+15**, ≥40% **+5**
- writing sets: `score% / 100 × 40`, where a set below 50% earns half
- total XP = sum over the student's scored sets

**Backend:** `GET /api/leaderboard` → aggregate `quiz_history` per user, join `profiles.full_name`, return `entries` (top 100), `you` (rank, xp, answered, accuracy, gap to next), and the rule constants so the UI never recomputes them.

**Frontend:** rewrite `/leaderboard`: podium (top 3), ranked table with XP bar + accuracy + sets, "your position" sticky strip, rule card, real empty state.

**Acceptance:** rank is XP-derived only; caller always sees their own rank; no invented people.

---

## 3. Module C — AI Tools (one tool at a time)

**Shared chrome:** `components/ai/ai-tool-shell.tsx`
- breadcrumb → tool title/description → live status chips (tier, saved history, credits) → **tool rail** (all AI tools, current one marked) → console slot at a single width → footer key.
- Replaces `AiSurfaceHeader`'s marketing trio above the tool; the trio becomes a compact "what this tool does" aside *below* the console.

**Order:** 1 `/ai` hub → 2 `/ai/workspace` → 3 `/ai/tutor` → 4 `/ai/history` → 5 `/ai-quiz` → 6 `/ai/diagrams` → 7 `/ai/math` → 8 `/ai/deep-dive` → 9 `/ai/subjects`.

**Acceptance per tool:** one shell, same width, rail marks the tool, no marketing block above the console, focus states, empty/error states styled.

---

## 4. Validation
`npx tsc --noEmit` (frontend + backend), focused vitest suites for XP math, MCQ bank integrity (4 options / 4 explanations / unique ids), contrast registry coverage, and the new components. Full `check:all` before any push.

---

## 5. Status

| Section | State | Evidence |
|---|---|---|
| A. Practice | **shipped** | 23 MCQs / 8 writing questions / 25 contrast pairs; `/practice`, `/practice/[subject]`, `/practice/session` live; `/quiz` forwards. `tests/lib/practice-bank.test.ts` (11) + `practice-xp.test.ts` (8) pass; tsc + eslint clean. |
| B. Leaderboard | **shipped** | `backend/src/utils/xp.ts`, `/api/leaderboard` (masked names, tie-aware ranks, JSON-path format read + fallback), XP-driven board with podium/your-position/rule card. `backend/tests/leaderboard-xp.test.ts` (9) passes; backend tsc clean. |
| C. AI Tools | **partial** | Shared `AiToolShell` + `AI_TOOLS` registry shipped; applied to `/ai/workspace` (full command deck), `/ai/tutor`, `/ai/history`, `/ai-quiz`; `/ai` hub gained workspace/subjects actions. **Remaining:** `/ai/diagrams`, `/ai/math`, `/ai/deep-dive`, `/ai/subjects` still own their headers and need the shell applied inside those components. |

