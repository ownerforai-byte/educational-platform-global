# PLAN — The Access-Led Study Platform

> Vision document for the tier-first rebuild. Owner direction (2026-10-23):
> "all content availability based on tiers … prepare/made all tiers first then in
> those add the access … include all diversities no matter how many sections it
> can be … these section availability also be according to plan access."
>
> This file is the single source of truth for the rebuild. Implementation follows
> its phases in order. Every phase ends with green gates before the next begins.

---

## 1. Vision

One platform, one ladder. A visitor arrives as a **Guest**, grows into a
**Member**, steps up to **Plus**, reaches **Pro**, and the platform's **Owner**
holds the controls. Every piece of study content — from the oldest past paper to
the newest AI tutor — lives in a clearly named **section**, and every section
declares which tiers may open it.

Three rules shape every screen:

1. **Tiers first, access second.** The ladder (Member / Plus / Pro / Owner) is
   built before content is arranged. Content never invents its own gates.
2. **Sections, not scroll.** Content is grouped into compact horizontal
   sections (carousels). No single section becomes a vertical wall — the
   reader never scrolls through one endless list.
3. **Everything is classified.** "From past to present": past papers (PYQs),
   notes, formulas, numericals, journal, entrance tracks (CEE), visuals, labs,
   AI — every diversity has a home section, and every section is tier-gated.

---

## 2. The Access Ladder

Rank order — a viewer reaches everything at or below their rung:

| Rung | Who | How you get it |
|---|---|---|
| **Guest** | Signed-out visitor | Arriving at the site |
| **Member** | Signed-in base | Account approval (manual loop) |
| **Plus** | Elevated member | Plan grant (owner-awarded) |
| **Pro** | Power member | Plan grant (owner-awarded) |
| **Owner** | Platform owner & trusted operators | Owner email allowlist / owner grant |

The legacy role words (STUDENT / TEACHER / ADMIN / OWNER) are **retired**.
Migration: **every existing account is an Owner-tier account** (there are no
real users yet; the accounts on file are the operator's own). Old role values
are translated on read (`STUDENT|TEACHER|ADMIN|OWNER → owner` for current rows;
future accounts enter at `member`).

### 2.1 Tier cards (shown to everyone on the guest plans page)

**🪪 Guest — "Look around freely"**
- Public overview & home baseline, live approval-status check
- Full **Plans** page (this ladder, in card form)
- Search preview · AI quiz (free guest pool)
- Veer AI chat trial — 3 sparks / day
- **Free always**: 3D labs & simulations · HD visuals · Diagram Hub
- Notice board · notifications (read-through)
- Locked previews of Member+ sections (blurred cards that say what's inside)

**📚 Member — "The study desk is open"**
- Everything in Guest, plus:
- **Search the whole library**
- Student Desk: profile, progress, credits wallet
- **Class 11 core notes** (theory) + formula sheets
- Practice basics (topic practice sets)
- Veer AI chat — 7 sparks / day

**✨ Plus — "Class 11 + Class 12, exam-ready"**
- Everything in Member, plus:
- **Class 12** portal + all subject notes
- **Journal** (study journal — own entries, private)
- **Numericals** worked-problem hubs (Physics, Chemistry)
- **PYQ banks** & past-paper practice ("from past to present")
- **CEE Medical Entrance** track
- Exam countdown & board-prep suite
- Veer AI chat — 25 sparks / day

**🚀 Pro — "Everything, no caps"**
- Everything in Plus, plus:
- **All indexes** (every subject, every hub)
- Derivations & Theorems (full proofs)
- PDF library · Graph bank · Science graph bank
- Knowledge hubs: World Knowledge, General Knowledge, Loksewa
- **Engineering (IOE)** & **Loksewa** entrance tracks
- Journal (same as Plus) + richer export
- Veer AI chat — 50 sparks / day, priority queue

**👑 Owner — "Everything, plus the controls"**
- Everything in Pro, unlimited Veer sparks
- **Owner rails & console**: user control (grant/adjust tiers), content
  control (publish/classify/retire sections), grant management (R1 access,
  temporary `plus_20` passes), platform settings, live audit
- Control & management surface — see §6

---

## 3. The Content Universe (every section, every diversity)

"From past to present" — the past exam record through to the present-day AI
tutor. Each row is a **section**; sections render as compact horizontal rails.

| # | Section | What it holds | Min tier |
|---|---|---|---|
| 1 | **Overview & Plans** | Public home, this ladder, approval status | Guest |
| 2 | **Search** | Whole-library search | Guest (preview) / Member (full) |
| 3 | **Class 11 Notes** | Theory notes, all six CDC subjects | Member (core) / Plus (full) |
| 4 | **Class 12 Notes** | Advanced theory notes | Plus |
| 5 | **Formula Sheets** | One-page formula rails per unit | Member |
| 6 | **Worked Numericals** | Numerical Physics, Numerical Chemistry hubs | Plus |
| 7 | **Practice & PYQ** | Topic practice, past-year question banks | Plus |
| 8 | **Journal** | Study journal — reflections, per-user, private | Plus |
| 9 | **CEE Medical Entrance** | CEE-pattern MCQs, traps, high-yield facts | Plus |
| 10 | **Engineering (IOE) Entrance** | Entrance numericals & pattern sets | Pro |
| 11 | **Loksewa** | Loksewa GK & paper pattern | Pro |
| 12 | **Board Exam Suite** | Exam countdown, grand tests, CDC syllabi | Plus |
| 13 | **Derivations & Theorems** | Step-by-step proofs with diagrams | Pro |
| 14 | **Visuals & Mindmaps** | HD visuals, concept maps, legend sheets | Guest (free) |
| 15 | **3D Labs & Simulations** | Interactive labs (physics/chem/bio/math) | Guest (free) |
| 16 | **Diagram Hub** | Drawing studio (mind-studio) | Guest (free, owner-ruled) |
| 17 | **Graph Bank** | Science graph bank, plotted explorables | Pro |
| 18 | **PDF Library** | Reference documents, each opens in the viewer | Pro |
| 19 | **Knowledge Hubs** | World Knowledge, GK, writing & vocabulary | Pro |
| 20 | **Veer AI Chat** | Tutor chat (spark-metered per tier) | Guest (3/day) → Pro (50/day) |
| 21 | **AI Quiz** | Adaptive quiz, free guest pool | Guest |
| 22 | **Resources & Reference** | Extra references, practical notebooks | Member |
| 23 | **Progress & Profile** | XP, streaks, badges, credits wallet | Member |
| 24 | **R1 Daily Life** | Activities, plans, journal, habits | Owner-granted |
| 25 | **Owner Console** | Control & management (§6) | Owner |

Diversity rule: if a new kind of content appears (e.g. "Flashcards"), it lands
as a **new section row** with a declared `minTier` — never as an endless column
inside an existing section.

---

## 4. Layout principles

- **Horizontal sections.** Each section is a rail/carousel: 4–6 cards visible,
  swipe/arrow for more. Vertical scrolling moves *between* sections (a few
  screens total), never *through* one section's full list.
- **One header + one rail per section.** Header shows: section icon, title,
  one-line description, tier badge, "See all →" link to the section's page.
- **Locked cards stay visible.** A Member sees that "Journal" exists — the card
  is dimmed with a lock badge and a one-tap path to the Plans page. Discovery
  drives upgrades; nothing is hidden away entirely.
- **Tier badges everywhere.** Cards carry `Member / Plus / Pro / Owner` chips so
  availability is legible at a glance.

---

## 5. Guest pages (Plans is a guest page)

The guest-facing surface is small and complete:

1. **Guest home** (`/home`, public) — what the platform is and a way in. The
   flow (owner 2026-10-25) is "welcome → guest home → login page → study
   home"; the guest home carries one or two **Sign in** buttons and hides the
   other CTAs ("hide others"); account request stays on the login page.
2. **Plans** — the five tier cards of §2.1 plus a compact availability table
   (§3 rendered as a matrix). Visible to *everyone*; this replaces `/pro-plan`
   and every scattered "Pro plan" card. Route: **`/plans`** (public, read-through
   — listed in `PUBLIC_PATHS`, never blurred).
3. **Notice board** — access notices ("Login is mentored at 8:00 PM").
4. Free-section rails (Visuals, 3D Labs, Diagram Hub) with locked previews of
   the rest.

---

## 6. Control & Management (Owner)

The owner console is the stewardship layer — it manages the ladder and the
sections:

- **User control** — list accounts, grant/adjust tier (Member/Plus/Pro/Owner),
  grant temporary passes (`plus_20` with expiry), revoke, view activity.
  (This replaces the old role dropdown; the underlying role column is retired.)
- **Content control** — publish / classify / retire sections and their items;
  set a section's `minTier`; verify classification coverage (every content
  family lands in exactly one section).
- **Grant management** — R1 access grants, owner-email allowlist, feature flags.
- **Platform settings** — spark allotments per tier, unlock-window length,
  maintenance toggles.
- **Audit** — live content ledger + live smoke status (already wired to CI).

Owner-tier detection: owner email allowlist stays authoritative; everything else
enters at `member` and is promoted by grant.

---

## 7. Migration (what changes under the hood)

| Old | New |
|---|---|
| `UserRole = STUDENT \| TEACHER \| ADMIN \| OWNER` | `AccessLevel = member \| plus \| pro \| owner` (+ `visitor` when signed out) |
| `ROLE_RANK` | `ACCESS_RANK` (already in `lib/access-level.ts`) |
| `hasFullAccess(role, premium)` | `hasLevel(user, "pro")` or owner |
| Role dropdown in admin | Tier grant control (§6) |
| `/pro-plan` + scattered plan cards | `/plans` (guest page, tier cards) |
| Content families (notes/formulas/numericals/resources) | **Sections** with `minTier` (§3), Journal included |

Data: the `profiles.role` column is translated on read — every current row maps
to `owner`. New rows store tier values directly. No user data is lost.

---

## 8. Phases

Each phase is shippable and ends green (`npm run check:all` + CI).

**P0 — Plan (this file).** Vision, ladder, sections, matrix, phases. ✅

**P1 — Tier foundations.** Replace the role system with the tier ladder across
frontend + backend + tests; legacy values map to Owner; `lib/access-level.ts`
becomes the only rank source. Deliverable: all gates green, no behavior change
beyond naming. ✅ Shipped: `backend/src/auth/types.ts` LEGACY_ROLES → owner,
`requireRole` grades normalized rungs, `lib/auth/roles.ts` ROLE_RANK is now a
view over `ACCESS_RANK` (the duplicate map in `features/auth/types.ts` is
gone), and every legacy rank word in source comments/identifiers
(`requireTeacher`, `ADMIN_ONLY_PATCH_FIELDS`, stale OWNER/ADMIN notes) is
replaced by ladder vocabulary.

**P2 — Plans page (guest).** Build `/plans` with the five tier cards + the
availability matrix; remove `/pro-plan` and relink every pointer (footer,
profile, credits, AI pages, notice, credits constants) to `/plans`. ✅ Shipped:
`/plans` in `PUBLIC_PATHS`, five `TIER_CARDS` + availability matrix, and a
`/pro-plan → /plans` redirect for old bookmarks (pinned in
`tests/lib/legacy-redirects.test.ts`).

**P3 — Sections + Journal.** Introduce the section registry (id, title,
description, `minTier`, content source). Convert the home + class pages to
horizontal section rails. Add the **Journal** section (Plus/Pro), backed by the
existing journal store. ✅ Shipped: `lib/sections.ts` (25 rows), the horizontal
`HomeSections` rail on home AND the class-11/class-12 portals, and the
`journal` section (minTier plus) behind `hasLevel(user, "plus")`.

**P4 — Availability gates.** Enforce `minTier` per section end-to-end: rails
dim locked cards, section pages gate entry, APIs scope by tier. Owner console
gains tier grants + section `minTier` control. ✅ Shipped:
`SectionTierGate` (dimmed locked card + one-tap `/plans`, never a dead end),
`requireTier(min)` tier-scoped APIs (`/api/pyqs` at Plus), `/owner/users` tier
grants, and `/owner/sections` minimums → `settings` → `/api/config` → the
rails, matrix and gates at once.

**P5 — Polish & parity.** Tier badges everywhere, locked-card copy, plans-table
parity with the ladder, responsive pass. ✅ Shipped: rung chips on cards and
locked states, locked-card copy names the exact rung, and the /plans matrix
reads the same runtime minimums the gates enforce (plans-table parity).

**P6 — Gates & deploy.** Full `check:all`, backend + frontend suites, live
smoke, deploy `main` (Vercel + Render), verify live.

---

## 9. Acceptance criteria

- [x] No `STUDENT|TEACHER|ADMIN` role values remain in source (outside the
      single legacy-normalization map and natural-language copy such as
      transcript speaker labels); the ladder is the only rank vocabulary.
      (Evidence grep over `backend/src` + `frontend`: the only quoted role
      values left are `LEGACY_ROLES` in `backend/src/auth/types.ts` and the
      "STUDENT"/"VEER" transcript speaker labels in `ai/history-search.ts`;
      the remaining words are pedagogy copy — "the student", "teacher notes".)
- [x] `/plans` is public and shows all five tier cards + the availability table.
      (`PUBLIC_PATHS = ["/home", "/notice", "/plans"]`; `TIER_CARDS` ×5 + the
      `SectionMatrix` availability table.)
- [x] `/pro-plan` is gone; every former link points at `/plans`.
      (Only a redirect + a plan note mention it; `tests/lib/legacy-redirects
      .test.ts` pins `/pro-plan → /plans` for old bookmarks.)
- [x] Journal exists as a section and requires Plus or Pro.
      (`journal` row, minTier `plus`; `/journal` gates with
      `hasLevel(user, "plus")`; content tabs gate it the same way.)
- [x] Every content family appears in exactly one section; every section
      declares a `minTier`. (25-row registry; the content-tab, home-rail and
      schema-corpus tests pin one-home-per-family.)
- [x] Locked sections are visible-but-dimmed for lower tiers (no dead ends).
      (`SectionTierGate`: dimmed card naming the rung + "See plans"/"Go to my
      home"; rails keep locked cards dimmed with the rung chip. Pinned in
      `tests/features/section-tier-gate.test.tsx`.)
- [x] Owner console can grant/adjust every tier and change section minimums.
      (`/owner/users` grants/adjusts member|plus|pro|owner + credits/premium;
      `/owner/sections` edits each section's rung → `settings
      .section_min_tier.<id>` → `GET /api/config` → rails, matrix and gates.)
- [x] `npm run check:all`, backend suites and live smoke all green;
      deployed and verified live.

---

# PART 2 — System Overhaul Roadmap (2026-10-24)

> Owner request: "Develop a comprehensive technical implementation plan and
> execution strategy for a major system overhaul" — five modules woven into
> the tier-based access system above:
>
> 1. **UI/UX refinement** — remove all visual lock icons app-wide; restricted
>    access is signalled by a disabled visual state keyed to the viewer's tier.
> 2. **Dynamic AI quiz engine** — diverse quiz formats (MCQ, writing tests,
>    …) chosen by the user, with AI-driven evaluation and detailed feedback
>    on submission, gated by the existing tier logic.
> 3. **AI integration & backend architecture** — AI wired across modules;
>    API keys retrieved securely from the git-ignored AI config file
>    (`backend/.env`); every AI call scoped to the subscription tier.
> 4. **AI interface redesign** — modern, coherent AI interaction surfaces.
> 5. **QA & bug fixes** — codebase audit for logic errors and "silly
>    mistakes" (first known: notification badge fails to reset to zero after
>    all notifications are marked read).

Phasing (owner: "do not attempt to implement everything at once"):
**Phase 1** = this roadmap. **Phase 2** = milestone-by-milestone delivery,

each milestone shippable and green. **Phase 3** = optimization + UI polish.

---

## 10. Milestone M1 — Lock-free access visuals (Module 1)

Goal: no lock icon renders anywhere in the UI; tier-restricted items are
recognizable purely by their **disabled state** (dimmed, no hover lift,
`aria-disabled`, `cursor-not-allowed`, tier label kept for discoverability,
one-tap path to `/plans` preserved per §4).

| # | Sub-task | Surface |
|---|---|---|
| 1.1 | Replace lock chip with disabled tier chip | `footer.tsx` (tier links; legal links stay plain) |
| 1.2 | Same treatment | `app-shell.tsx`, `mobile-quick-nav.tsx`, `periodic-table-view.tsx` (Sign-in chips) |
| 1.3 | Locked tab pills + `LockedTabCard` → disabled cards | `content-tabs.tsx` |
| 1.4 | Locked home rails/cards → disabled cards | `home-sections.tsx`, `tier-interfaces.tsx` |
| 1.5 | Gate screens → disabled state icons (no locks) | `ai-widget.tsx`, `credit-gate.tsx`, `directory-card.tsx`, `welcome-status.tsx`, `require-approval.tsx` |
| 1.6 | Password-field adornments: drop the lock glyph | `login-form.tsx`, `signup-form.tsx`, `reset-password-form.tsx` |
| 1.7 | Update tests pinning lock visuals; keep `approval-lock` testid semantics | tests/* |

Acceptance: `grep -rn '<Lock' frontend/` matches nothing outside retired
comments; every formerly-locked item still discoverable and still routes to
`/plans`; all suites green.

---

## 11. Milestone M2 — Dynamic AI quiz engine (Module 2)

Goal: the quiz generator produces **format-diverse** sets picked by the user
and an **AI evaluator** grades submissions with detailed feedback.

### 11.1 Formats (scaffolding first)

| Format id | UI label | Answer shape | Evaluation |
|---|---|---|---|
| `mcq` | Multiple Choice | 4 options, one correct | auto-check + AI explanation |
| `true-false` | True / False | binary choice | auto-check + AI explanation |
| `fill-blank` | Fill in the Blank | short text entry | AI graded (fuzzy match + feedback) |
| `short-answer` | Short Answer (Writing) | free text | AI graded with rubric |
| `long-answer` | Long Answer (Writing Test) | essay | AI graded with rubric + improvement plan |

### 11.2 Backend (`backend/src/api/ai-generate.ts` + new `ai-evaluate.ts`)

- `POST /api/ai/generate-questions` accepts `format`; per-format prompt
  templates and response schemas; MCQ path unchanged (back-compat).
- New `POST /api/ai/evaluate-answers`: accepts question + learner answer
  pairs, returns per-item `{ score, verdict, feedback, modelAnswer,
  improvements[] }` plus an overall summary — used by every writing format.
- Both endpoints behind the existing gates (`rateLimit`, `authOrGuestQuota`,
  `requireCredit("aiChat")`) — Module 2 adds **no new gate**, it reuses §3's.

### 11.3 Frontend (`components/ai/quiz-studio.tsx`, `lib/api/ai.ts`, `types/api.ts`)

- Format selector row (five cards), format-aware question cards and answer
  inputs, and a Submission Report panel (score ring, per-question feedback,
  model answers, "what to improve" list).
- Writing formats: autosaved draft, word count, then submit → AI evaluation.
- History page records format + score.

Acceptance: one test per format end-to-end (generate → answer → evaluate);
guest pool + credit gates verified; no regression in existing quiz tests.

---

## 12. Milestone M3 — AI integration & backend architecture (Module 3)

- **Key handling**: one resolver (`backend/src/ai/config.ts`) that reads the
  git-ignored `backend/.env` (and root `.env`) via the existing dotenv load,
  exposes typed accessors (`getAgnesKey()`, `getGroqKey()`, …), never logs
  values, and degrades feature flags when a key is absent. All AI modules
  (chat, image-gen, search-engine, quiz, evaluate) go through it.
- **Tier wiring**: every AI route passes the shared credit/guest gate; the
  response carries the server-attested pool; UI mirrors it (never trusted).
- **Docs**: `.env.example` lists every key the resolver knows, with sources.
- Feature inventory: which modules call AI (chat, tutor, quiz, search,
  figure-draw, diagrams) — each declared in one table in this file (§12.1).

### 12.1 AI feature map (maintained by hand)

| Module | Endpoint | Provider | Gate |
|---|---|---|---|
| Veer chat / tutor | `/api/ai`, `/api/ai/guest` | Agnes | sparks/credits + guest pool |
| Quiz generation | `/api/ai/generate-questions` | Agnes | guest pool / credits |
| Quiz evaluation (M2) | `/api/ai/evaluate-answers` | Agnes | same as generation |
| Figure draw | `/api/ai/figure` | Agnes | credits |
| Diagrams | `/api/ai/diagrams` | Google CSE (optional) | owner flag |
| Image gen | `/api/ai/image` | Agnes | credits |

---

## 13. Milestone M4 — AI interface redesign (Module 4)

- Shared AI surface language: one header pattern (gradient hero strip,
  provider badge, pool meter), one card style, one empty/loading/error trio.
- Rebuild the quiz studio around the format picker + report panel (M2);
  refresh chat/tutor composers and the history console to match.
- Responsive pass + reduced-motion parity (low-data policy, §14).

---

## 14. Milestone M5 — QA audit & bug fixes (Module 5)

| # | Item | Fix |
|---|---|---|
| 5.1 | Notification badge never resets after "mark all read" | unread state derived from the read-id store (shared hook), bell badge hides at 0 |
| 5.2 | Static pulsing dot on the header bell ignores real state | same shared store; `storage` event sync across tabs |
| 5.3 | Silent try/catch swallowing real errors | log + typed fallbacks where found |
| 5.4 | Stale `.next/types` tsc errors | regenerate/remove stale validator files |
| 5.5 | Sweep: duplicate keys, dead state, `useEffect` over-set, `any` leaks | fix as found in audit |

Acceptance: marking all notifications read zeroes every badge (page + bell),

raw full suites green, `npm run check:all` green.

---

## 15. Phase 3 — Optimization & polish (after M1–M5)

1. Bundle/render pass on the touched AI surfaces (memoize hot lists, kill
   needless re-renders introduced by M2's report panel).
2. Visual polish sweep: spacing rhythm, focus rings, dark-mode parity on the
   redesigned AI screens and the disabled tier states.
3. Full gate: `npm run check:all`, backend suite, live smoke.

---

## 16. Overhaul acceptance criteria (roll-up)

- [x] Zero lock icons in the UI; disabled tier states everywhere restricted.
      (M1: 27 glyphs removed across 17 files — tier badges / em-dashes /
      disabled states replace them; `approval-lock` testid kept for tests.)
- [x] Quiz engine offers ≥ 5 formats with AI evaluation and detailed feedback.
      (M2: mcq, true-false, fill-blank, short-answer, long-answer —
      `POST /api/ai/evaluate-answers` grades writing formats with per-item
      score/verdict/feedback/model answer/improvements + submission report.)
- [x] Every AI call flows through the single key resolver and the shared tier
      gate; keys never appear in logs, client bundles, or git.
      (M3: `backend/src/ai/config.ts` resolver — chat, quiz, evaluate,
      image-gen, search-engine, diagrams read keys through it; values never
      logged; missing keys degrade feature flags. `.env.example` documents all.)
- [x] AI surfaces share one redesigned interface language.
      (M4: `ai-surface-header` hero strip + pool meter + feature cards on quiz,
      tutor and history consoles; `ai-surface-states` loading/error/empty trio.)
- [x] Notification badges reset to zero on mark-all-read; audit findings fixed.
      (M5: shared read-id store `lib/notifications.ts` + `useNotificationState`;
      bell badge hides at 0 and syncs across tabs; silent SSE catch now logs;
      stale `.next/types` validators removed — tsc fully clean.)
- [x] `npm run check:all` + backend suites green.
      (Backend 562/562 green; frontend suites green; tsc clean both sides.)


---

## § Page Architecture — Full Route Map (2026-11)

> Added 2026-11-04. Covers every page type a serious NEB study platform must
> have. All 8 layers are implemented; empty pages show the 🚧 under-development
> shell until content is authored. Every route is registered in
> `frontend/lib/navigation.ts` and `frontend/lib/site-index.ts`.

### Layer 0 — Public / Marketing (no login required)

| Route | Title | Status |
|---|---|---|
| `/about` | About the Platform | New |
| `/features` | Features & Tiers | New |
| `/how-it-works` | How It Works | New |
| `/contact` | Contact Us | New |
| `/school` | Schools & Institutions | New |
| `/blog` | Blog | New |
| `/blog/[slug]` | Blog Article | New |
| `/neb-updates` | NEB & CDC Updates | New |
| `/sitemap-page` | Site Map | New |

### Layer 1 — Subject Depth (core learning path)

| Route | Title | Status |
|---|---|---|
| `/class-11-notes/[subject]/[unit]/[topic]` | Topic Notes Page | New — wires `topic-vertical-notes.tsx` |
| `/class-12-notes/[subject]/[unit]/[topic]` | Topic Notes Page | New — same pattern |
| `/class-11-notes/[subject]/pyqs` | Subject PYQ Browser | New |
| `/class-12-notes/[subject]/pyqs` | Subject PYQ Browser | New |
| `/class-11-notes/[subject]/formulas` | Subject Formulas | New — redirects to `/formulas/[subject]` |

### Layer 2 — Exam & Entrance Hub

| Route | Title | Status |
|---|---|---|
| `/exams` | Exam Hub | New |
| `/exams/neb` | NEB Board Exam | New |
| `/exams/cee` | CEE Medical Entrance | New |
| `/exams/ioe` | IOE Engineering Entrance | New |
| `/exams/neb/[subject]/model-questions` | Model Questions | New |
| `/revision` | Quick Revision Mode | New |

### Layer 3 — Practice & Assessment

| Route | Title | Status |
|---|---|---|
| `/practice` | Practice Hub | New |
| `/practice/[subject]` | Subject Practice | New |
| `/quiz/[subject]` | Subject Quiz | New |
| `/quiz/[subject]/[unit]` | Unit Quiz | New |
| `/results/[sessionId]` | Quiz Results | New |
| `/leaderboard` | Leaderboard | New |

### Layer 4 — Search & Discovery

| Route | Title | Status |
|---|---|---|
| `/topics/[topicSlug]` | Topic Landing (SEO) | New |
| `/tags/[tag]` | Tag Browser | New |

### Layer 5 — Student Progress Depth

| Route | Title | Status |
|---|---|---|
| `/progress/[subject]` | Subject Progress | New |
| `/progress/[subject]/[unit]` | Unit Progress | New |
| `/goals` | Study Goals | New |
| `/schedule` | Study Schedule | New |
| `/certificates` | Certificates | New (stub) |

### Layer 6 — Community & Social

| Route | Title | Status |
|---|---|---|
| `/community/[subjectId]/[threadId]` | Discussion Thread | New |
| `/announcements` | Announcements | New |
| `/feedback` | Feedback | New |

### Layer 7 — Teacher / Parent Stubs

| Route | Title | Status |
|---|---|---|
| `/teachers` | Teacher Portal | New (stub) |
| `/parents` | Parent Portal | New (stub) |
| `/school/[code]` | School Dashboard | New (stub) |

### Layer 8 — Support & Trust

| Route | Title | Status |
|---|---|---|
| `/help` | Help Center | New |
| `/help/[articleSlug]` | Help Article | New |
| `/status` | Platform Status | New |
| `/changelog` | Changelog | New |

### Implementation Notes

- **Under-development shell**: `frontend/components/ui/under-development.tsx`
  — used by every stub page. Shows 🚧 + title + standard "will be added in
  future update" message.
- **Tier gates**: Layer 1–6 routes inside `(app)/` inherit the existing auth
  gate; Layer 0, 7, 8 public routes live outside `(app)/`.
- **Navigation**: all new routes added to `NAV_SECTIONS` in
  `frontend/lib/navigation.ts`.
- **Site index**: all new routes added to `buildSiteIndex()` in
  `frontend/lib/site-index.ts`.
- **ISR**: topic landing pages (`/topics/[topicSlug]`) use
  `export const revalidate = 86400`.
