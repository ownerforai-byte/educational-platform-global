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


---

## § Pro Upgrade Plan — 8 Phases (2026-11)

> Added 2026-11-05. Based on a full repo audit. P0 = do first, P1 = next,
> P2 = polish/growth. [x] = done, [ ] = not done. Any agent can pick up
> where the last one left off by finding the next unchecked box.

### Phase 1 — Content Rights & Privacy (P0)

- [x] P0  Verify rights for every ingested book / OCR'd guide / hosted PDF; keep a SOURCES.md ledger
- [ ] P0  Move KB + OCR corpus out of the public repo (private repo, git submodule, or Supabase Storage loaded at deploy)
- [x] P0  Delete backend/kb/books/_ingest-report.json local paths (leaks C:\Users\ASUS\Downloads\...)
- [x] P0  Split licenses: MIT for code, separate CONTENT_LICENSE.md for notes/diagrams (+ attribution page in app)
- [x] P1  Takedown/contact page + process so a rights-holder can reach you (2026-11-07: /legal/takedown + /legal/attribution, real process in SECURITY.md, SOURCES.md no longer circular)
- [ ] P0  Revoke the leftover legacy AI-runtime token (README: still in history, expires 2026-12-04) or rewrite history

### Phase 2 — Repo Organization

- [x] P0  Rewrite README: live URL, screenshots/GIF, architecture diagram, 5-minute quickstart, badges
- [x] P0  Create /docs: ARCHITECTURE.md, API.md, DEPLOYMENT.md, CONTENT_PIPELINE.md
- [x] P0  Declutter root: move *-plan.md, PLANS.md, AUDIT_REPORT.md, ENRICHMENT_PLAN.md etc. to /docs/archive
- [ ] P1  Move AI-agent tooling folders (.trae, .commandcode, .frontbuff, tokenkit-out, graphify files) out of the default view or gitignore them; keep one AGENTS.md
- [ ] P1  Shorten very long Nepali filenames in content/notes (they exceed 255 bytes)
- [ ] P1  frontend/lib has 158 flat files, mostly static data: move to content/ or features/<name>/data
- [ ] P1  Remove dead routes (r-notes-disabled, ravikishan-notes-disabled); consolidate overlapping AI entry points
- [x] P1  Add SECURITY.md, Dependabot, CodeQL (CODE_OF_CONDUCT, issue templates, CODEOWNERS remaining)
- [ ] P1  Stop committing build output/binaries: manifest.json (7.5MB), _index.json (6.7MB), play-store/*.aab
- [ ] P2  Branch cleanup: archive merged ones, protect main

### Phase 3 — Lightweight Enforced

- [ ] P0  Run a bundle analyzer on the top 10 routes; record first-load JS per route
- [ ] P0  Check if any client page fetches the 7.5MB manifest.json; if yes, split it per class/subject/topic
- [ ] P0  Tighten Lighthouse budgets in steps (perf 0.7 -> 0.85, LCP 4s -> 2.5s, CLS 0.1) and add a per-route JS budget in CI
- [ ] P1  Verify react-query-devtools is not in the production bundle
- [ ] P1  Lazy-load heavy libs everywhere (three/r3f/xr, gsap, mathjs, highlight.js, katex) and drop what's unused
- [ ] P1  Move large PDFs/DOCX/HTML out of public/ to a CDN/object storage; stream or lazy-fetch on demand
- [ ] P2  Image pipeline audit (AVIF/WebP, dimensions), font subsetting for Devanagari
- [ ] P2  Add Vercel Speed Insights / Web Vitals reporting from real users

### Phase 4 — Real App Feel (PWA)

- [x] P0  Manifest: add id, shortcuts (Continue studying, Quiz, Ask Veer, PYQs), screenshots, real maskable icon, short_name <= 12 chars, remove junk fields, review prefer_related_applications
- [x] P0  Custom "Install app" prompt (beforeinstallprompt) + iOS "Add to Home Screen" hint
- [ ] P1  Web Push (VAPID): streak-about-to-break, exam countdown, daily plan reminders, new notes; user-controlled times
- [x] P1  Account-backed user state (2026-11-07): `013_user_state.sql` + `/api/user-state` + client sync layer; `/my-notes` is the first migrated store. Migration APPLIED and verified live (RLS + 4 policies, idempotent, FK-valid smoke test) — see `PROJECT_STATUS.md`.
- [ ] P1  Offline: let students download a chapter/subject for offline; queue progress + quiz results and sync when online
- [x] P1  Generate the SW precache list from the App Router tree instead of a hand-written list (2026-11-07: `frontend/scripts/generate-sw-precache.mjs` → `public/sw-precache.json`, 40 prioritised student routes, CI drift gate; `sw.js` falls back to its built-in list) and add an in-app "update available" toast (`service-worker-registrar.tsx` + SKIP_WAITING)
- [ ] P2  Badging API (streak/unread), share target, periodic content refresh

### Phase 5 — Reliability & Brand

- [x] P0  Choose ONE product name + logo; use it in manifest, cache names, Play listing, README, package names
- [ ] P0  Custom domain for frontend and API (e.g. app.yourdomain.com / api.yourdomain.com)
- [ ] P1  Replace the cron-ping workaround: always-on backend plan, or move hot read endpoints to edge/serverless
- [ ] P1  Public status page + uptime monitoring + alerting on /health, error rate, AI failures
- [ ] P1  Staging environment + preview deploys for backend; documented rollback
- [ ] P2  Backups + restore drill for Supabase; migration runbook

### Phase 6 — Quality Gates

- [x] P0  Dependabot + secret scanning + CodeQL config files
- [x] P1  Lint ratchet (2026-11-07): `scripts/lint-ratchet.mjs` + baseline + CI step fail on any new React Compiler finding while the 205-item backlog (measured on this tree, up from the older 187 count) burns down; fixes lower the ceiling
- [x] P1  Dead-end route ratchet (2026-11-07): `scripts/dead-end-ratchet.mjs` baselines the 26 known 🚧 routes in `scripts/dead-end-baseline.json`, publishes `reports/dead-end-routes.json` and fails CI on any NEW placeholder page. Fixing a page lowers the ceiling.
- [x] P1  E2E env preflight (2026-11-07): `scripts/check-smoke-env.mjs` names the exact missing repo secrets before the Playwright build instead of failing later as a mysterious owner sign-in error
- [ ] P1  Automated accessibility checks (axe) on key pages in CI
- [ ] P1  Coverage reporting with a threshold on core logic (auth, credits, progress, streaks)
- [ ] P1  Grow Playwright e2e beyond one smoke spec: login -> lesson -> quiz -> Veer -> bookmark -> offline
- [ ] P2  Visual regression tests for core pages

### Phase 7 — AI Tutor (Veer) Quality & Safety

- [x] P0  Add a fallback provider + health-based failover — 10 free-tier providers added (LLM7 keyless, OVHcloud keyless + 8 keyed)
- [x] P0  Build a regression set from your own PYQs/solved questions (2026-11-07: `scripts/ai-regression.mjs` + 120-item golden set in `reports/`, offline CI gate with drift detection, opt-in live scoring against `/api/ai`; scorer is a keyword-coverage grounding proxy, not a correctness judge)
- [ ] P1  Schedule the live regression run on prompt/model changes (needs an owner test account + `AI_REGRESSION_TOKEN`; never put the token in the repo)
- [x] P1  Hard per-user daily ceiling even for signed-in users, on top of credits — verified already implemented (2026-11-07 audit): `backend/src/api/ai.ts` + `middleware/aiSparkGate.ts` use the UTC-day, per-user CAS counter `consumeUserSlot(user.id, limit)` in `utils/guestQuota.ts`; owner tier is unlimited by explicit policy. No duplicate gate added.
- [x] P2  Citations back to the exact note/PYQ used in the answer (2026-11-07): `backend/src/ai/citations.ts` turns the ranked `curriculum-retrieval` hits into structured `AnswerCitation[]` + a "From your notes" markdown block appended to academic answers (visible in both streaming and non-streaming `/api/ai`); a structured `citations` field is also returned in the JSON response. `buildCitations` only runs for academic (upgrade) answers and returns `[]` on any corpus problem, so a missing record never breaks an answer. 11 unit tests in `backend/tests/citations.test.ts`; `deep-concept-upgrade.test.ts` updated for the new contract.
- [ ] P1  Embed the tutor inside lessons and quizzes ("Explain", "Hint", "Why was I wrong?")
- [ ] P1  Answer modes (step-by-step, exam-answer 8-mark format, quick revision) + thumbs up/down feedback

### Phase 8 — Growth, Money, Reach

- [ ] P1  Privacy-friendly product analytics (Plausible/PostHog): signup->first lesson->quiz funnel, D1/D7/D30 retention
- [ ] P1  Nepali UI language toggle (no i18n framework today; content is already bilingual in places)
- [ ] P2  Local payments for premium (eSewa / Khalti / Fonepay); today premium is request + manual approval
- [ ] P2  SEO for public pages (sitemap, structured data), shareable result/streak cards
- [ ] P2  Teacher/class tools (assign, class progress) if you want school adoption

---

## One 3D System for All Subjects — One Manifest, One Hub, One Journey

> **Status:** Proposed; Phase 0 measurement and the owner decisions below are
> pending. This roadmap consolidates the existing Physics, Chemistry, Biology,
> and Mathematics 3D experiences. It must not introduce a fourth parallel
> catalog, registry, or topic map.

### Goal

Give every 3D activity one discoverable home and a continuous student journey:

**Notes → 3D activity → practice → ask Veer → next topic**

Physics, Chemistry, Biology, and Mathematics activities must share one
curriculum-aware manifest and hub. Existing indexes and routes should become
derived views or backwards-compatible redirects, not competing sources of
truth.

### Current Findings to Verify

The following are static-analysis estimates from the initial repository audit,
not verified measurements:

- About 258 files use Three.js: approximately 140 topic visuals, 84 root-level
  labs, 21 Class 11 labs, 7 3D-rig files, and 5 motion-graphics files.
- Three indexes overlap: `frontend/lib/lab-catalog.ts` (69 entries),
  `LAB_REGISTRY` in `frontend/lib/lab-registry.tsx` (58 static component
  imports), and `TOPIC_3D_MAP` in `frontend/lib/topic-3d-map.tsx` (411 topic
  slugs and 144 static visual imports). The catalog currently lacks Mathematics,
  class, and topic metadata.
- Student entry points include `/lab`, `/lab/3d`, `/lab/theory`,
  `/lab/[labId]`, `/lab/3d/chapter/[id]`, `/lab/3d/topic/[id]`,
  `/lab/bio-3d-organelles`, `/lab/[labId]/ch-3d-periodic`, topic pages, and
  `/knowledge/analytical-geometry`.
- The initial audit found 30 potentially unreachable 3D files: 18 in
  `components/lab/class11`, 5 in `motion-graphics`, 6 root lab components, and
  `animated-arrow-helper.ts`. This includes plain/`-plus` duplicates and both
  standard and enhanced kinematics/laws-of-motion candidates. Confirm reachability
  and lineage before adopting or retiring anything; zero editor references alone
  are not grounds for deletion.
- `frontend/components/content/topic-vertical-notes.tsx` appears to load
  `@/lib/topic-3d-map` from an effect on every topic page. Measure the actual
  bundle and runtime cost before attributing Lighthouse regressions to it.
- The reported topic-page baseline is LCP 10.7s versus an 8.5s budget and TBT
  4.1s. Capture reproducible measurements and the current JavaScript bundle
  sizes in Phase 0; do not treat these reported values as newly verified results.

### Non-Negotiable Architecture

1. Establish **one typed manifest** as the source of truth for all activities.
   The existing catalog, component registry, and topic map become generated or
   derived views after parity is demonstrated.
2. The manifest entry for each activity must include:
   `id`, `title`, `subject` (including Mathematics), `class`, `unit`, explicit
   `topicSlug` associations, `kind` (`3d-sim`, `animation`, `theory`, or
   `practical`), a lazy loader where applicable, device tier, a 2D/static/text
   fallback, related notes and practice links, lifecycle status (`live`, `pilot`,
   or `retired`), and duplicate lineage via `replaces`.
3. Use explicit topic associations and aliases. Do not resolve a topic to a
   visual using fuzzy prefix matching.
4. Do not eagerly import Three.js visuals on topic pages that have no matching
   3D activity. Load an activity only after the learner requests it.
5. Preserve old deep links when consolidating routes. No files are retired until
   their reachability and duplicate lineage have been checked.

### Owner Decisions (recorded 2026-11-06)

1. **`/lab/[id]` is the canonical activity URL.** Legacy URLs become redirects or
   filtered hub views in Phase 3.
2. **Mathematics 3D is included** in the same hub and manifest.
3. **Both members of every duplicate family stay live.** No `replaces` lineage is
   declared until a parity review decides each pair; `replaces` stays empty for
   every pilot.

### Measured Inventory (2026-11-06, `npm run audit:lab-manifest`)

Replaces the estimates above with reproducible numbers from
`reports/lab-manifest-coverage.json`:

- **Syllabus:** 689 unique topic slugs (696 topics before slug de-duplication).
- **`TOPIC_3D_MAP`:** 411 keys — 245 match an exact topic slug, 78 match a UNIT id
  (e.g. `chemical-bonding-and-shapes-of-molecules`), and **88 match neither**; the
  unmatched and unit-level keys are listed in the report as exemptions.
- **Other sources:** `LAB_METADATA_LIST` 116 ids, `lab-catalog.ts` 69 entries.
- **Topic coverage:** 245 of 689 topics (36%) have a 3D activity — physics 127/165,
  chemistry 52/188, mathematics 48/71, biology 18/105, english 0/109, nepali 0/51.
- **Orphan topic visual:** `frontend/components/lab/topic-visuals/index.ts` (a barrel
  no source imports). Every other visual under `topic-visuals/` is reached by
  `topic-3d-map.tsx`.
- **Bundle/Lighthouse baselines: still not measured** (Phase 0 remainder).

### Phases and Agent Handoff

#### Phase 0 — Measure and Inventory

- [x] Extend `scripts/audit-visuals.ts` to emit a coverage matrix for all 696
  syllabus topics: whether each has a 3D activity and, if so, its explicit lab
  association. *(Shipped as `scripts/lab-manifest-coverage.ts` — the report
  carries `syllabus.coveredTopics`/`uncoveredTopics`/`bySubject` for all 689
  de-duplicated slugs; the standalone `audit-visuals.ts` was superseded.)*
- [x] Emit an inventory of every 3D-related file, recording whether it is
  present in the catalog, component registry, topic map, and route tree.
  *(`reports/lab-manifest-coverage.json` → `sources` + `parity` + `exempt`:
  453 visual entries, 116 registry ids, 69 catalog entries, per-source
  represented/exempt counts.)*
- [x] Run a bundle analyzer and record first-load JavaScript size for a
  representative topic page and lab page. *(Partial, measured 2026-11-09: this
  turbopack build emits no per-route first-load table and no
  `app-build-manifest.json`, so a per-route figure still needs
  `@next/bundle-analyzer` or a CI size table. What IS measured from the build
  output: a prerendered page's first-load graph is 17 chunks / 0.80 MiB raw and
  contains **zero** Three.js chunks — Three.js exists only in the 27 lazy
  chunks, which is the Phase 1 "no eager Three.js" claim verified at the
  bundle level.)*
- [ ] Record repeatable Lighthouse LCP/TBT results and compare them with the
  existing budgets. *(Blocked: `/lab/*` and topic pages sit behind the `(app)`
  approval wall; an authenticated run needs an approved test account.)*
- [x] Trace the 30 suspected orphans and duplicate families. Recommend whether
  each should be adopted, merged into a chosen canonical implementation, or
  retired; do not delete any during inventory. *(Measured 2026-11-06: the
  "30 suspected orphans" estimate collapsed to ONE true orphan —
  `topic-visuals/index.ts`, a barrel no source imports, held as an approved
  exemption in `frontend/scripts/lab-manifest-orphans.json` pending the
  dead-code pass. Duplicate families: both members stay live per owner
  decision 3; `replaces` is empty for every activity, enforced by
  `tests/lib/lab-manifest.test.ts` "never declares duplicate lineage before a
  parity review".)*
- [x] Save audit output and explain the commands, environment, and measurement
  method so subsequent phases can compare like with like. *(`npm run
  audit:lab-manifest -- --check`, report at `reports/lab-manifest-coverage.json`,
  method and numbers recorded in the Verification section below.)*

#### Phase 1 — Remove the Topic-Page Loading Penalty

**Already shipped before this pass** — verified, not re-implemented.

- [x] `lib/lab-visual-index.ts` (generated, data-only) is the synchronous
  topic-to-activity index; `lib/lab-visual-loaders.tsx` holds the lazy chunks.
- [x] Topic notes resolve the association synchronously
  (`resolveLabVisualEntry` in `components/content/topic-vertical-notes.tsx`) and
  show the 3D tab only when a mapping exists.
- [x] The visual loads only after the learner selects the 3D tab.
- [x] Alias uniqueness / no cross-topic assignment: covered for the manifest by
  `tests/lib/lab-manifest.test.ts`; the generated index still relies on its own
  generator tests (`tests/lab-visual-index.test.ts`). *(Both verified green
  2026-11-09: lab-manifest 12 tests, lab-visual-index 10 tests.)*
- [ ] Bundle + Lighthouse re-measurement still outstanding (needs a build run).
  *(Bundle half now measured — see Phase 0: 0.80 MiB / 17 chunks first-load
  graph with zero Three.js chunks. Lighthouse half still needs the approved
  test account.)*

#### Phase 2 — Create the Single Activity Manifest

**Completed 2026-11-06** — schema, population, parity and both duplicate-metadata
decisions are in place and enforced by the `labManifest` gate.

- [x] Define the typed activity schema (`frontend/lib/lab-manifest.ts`): id, title,
  `kind`, `subject` (incl. Mathematics), class/unit placement, explicit
  `topicSlugs`, lazy `modulePath`, device tier, fallback, lifecycle, `replaces`.
- [x] Populate the three pilot activities (projectile motion, covalent bonding,
  the cell) from the verified catalog, component registry, topic map and the
  measured inventory; all three are `lifecycle: "pilot"`.
- [x] Add CI validation for unique IDs, exact syllabus references, existing and
  wired lazy loaders, and a defined fallback
  (`tests/lib/lab-manifest.test.ts`, 10 tests).
- [x] Add an orphan rule with explicit exemptions: `scripts/lab-manifest-coverage.ts`
  inventories every 3D source, lists unreached visuals and unmatched topic-map
  keys in `reports/lab-manifest-coverage.json`, and fails `--check` on manifest
  violations. Wired into `npm run check` / `check:all` as the `labManifest` runner.
- [x] Represent the live sources: **527 activities** — 3 curated pilots, 343
  topic-visual activities, 112 registry labs, 69 catalog practicals. Coverage is
  now 346 of 689 syllabus topics (50%); 111 visual-index entries stay exempt
  because their keys are not exact syllabus topics (the former 88 unmatched
  topic-map keys plus truncation/alias variants).
- [x] Parity test: `tests/lib/lab-manifest.test.ts` proves every catalog entry,
  every non-`class11` registry lab and every topic-bearing visual-index entry is
  represented (or explicitly exempt), and `--check` fails on drift.
- [x] A visual reused across classes/units yields one activity per placement
  (e.g. the capacitor visual serves Class 11 and Class 12 separately) rather than
  one activity with a contradictory class/unit.
- [x] `--check` fails on a *new* orphan visual: an unreferenced visual missing
  from `lab-manifest-orphans.json` raises `orphan-visual-new`, and an exemption
  that stops being an orphan raises `orphan-visual-stale` (both exit 1).
  Reachability is defined as “wired into `lab-visual-loaders.tsx`”, the only
  module that can actually mount a topic visual.
- [x] Duplicate hand-maintained metadata resolved (2026-11-06), in two different
  ways because the two cases are not alike:
  - **`lib/topic-3d-map.tsx` retired.** All 411 of its keys already resolved from
    the generated index (0 missing), and its only live consumer —
    `app/(app)/lab/page.tsx` — used it purely as “does this topic have a
    visual?”, now answered by `resolveLabVisualEntry`. Retiring it also removes
    its prefix/reverse-prefix matching, the fuzzy resolution the manifest rule
    forbids. The hub keeps no eager visual imports.
  - **`lib/lab-metadata.ts` kept, as a guarded mirror.** It is *not* derivable:
    the authoritative `lib/lab-registry.tsx` is a component module that the
    data-only consumers (search, site index, manifest) must never import, and it
    cannot even load in Node (it reaches a content pipeline). Rather than leave
    an unchecked copy, the gate now fails on `registry-metadata-orphan` (an entry
    absent from the registry) or `registry-metadata-drift` (a title that no
    longer matches), so the mirror cannot silently rot.

#### Phase 3 — One Hub and Backwards-Compatible URLs

- [x] `/lab/[id]` is canonical: `activityHref()` emits `/lab/<slug>`, and the
  route resolves manifest slugs before the legacy registry so one manifest decides
  what a canonical URL means.
- [x] Hub filters on `/lab/3d`: subject (tabs), kind, and “has practice”, driven by
  the manifest (`components/lab/manifest-hub-section.tsx`).
- [x] Legacy deep links keep working: `LEGACY_ALIASES` redirects, `/lab/3d` is the
  fallback for unknown ids, and `/lab/theory`, `/lab/3d/topic|chapter/[id]` remain
  live views.
- [x] Legacy views are filtered hub views now (2026-11-06), not separate
  implementations — the URLs are unchanged, so no deep link broke:
  - `/lab/theory` lists exactly the manifest's `kind: "theory"` activities (40
    across four subjects) and every card links to its canonical `/lab/<slug>`.
    It no longer enumerates `LAB_REGISTRY` itself.
  - `/lab/3d/topic/<slug>` and `/lab/3d/chapter/<unit>` render
    `ManifestHubSection` scoped to that exact topic slug or `curriculum.unitId`,
    with an explicit empty state when nothing is placed there. The generic scene
    they used to mount for *any* slug is gone, so no view invents content for a
    slug the curriculum does not define.
  - The hub's own “3D Gallery” was a fourth hand-maintained catalog, and five of
    its eight ids (`thermodynamics`, `chemical-bonding`, `cell-biology`,
    `laws-of-motion`, `organic-chemistry`) are not syllabus keys at all. It is
    now derived from the manifest: only units that host an activity appear,
    titled from `LAB_UNIT_ORDER` and linked to the unit-scoped view.
  - `components/lab/topics/[topicId]/topics-3d.tsx` and
    `components/lab/chapters/[chapterId]/chapters-3d.tsx` lost their only
    consumer in this conversion. They are deliberately left in place — a file is
    not retired on a references check alone — and are recorded as dead-code
    candidates for the next cleanup pass.
- [x] Breadcrumb/labels reuse `lab-unit-order.ts` + `lib/syllabus.ts`; no second
  curriculum ordering source was added.

#### Phase 4 — Connect Notes, Labs, Practice, and Veer

- [x] The topic note offers the 3D tab only when a mapping exists, and the scene
  loads on selection (Phase 1 behaviour, now backed by the manifest).
- [x] **Open full lab** → `/lab/<slug>` (`components/lab/activity-journey.tsx`).
- [x] **Check understanding** → the existing `/pyqs` surface (no duplicated bank).
- [x] **Ask Veer about this** → existing tutor at `/chat?q=…` with the topic
  prefilled.
- [x] **Next topic** and **Back to notes** → `lib/syllabus-neighbors.ts` (exact
  syllabus order, crossing unit boundaries; never a second ordering source).
- [x] **Continue where you left off** on `/lab/3d`, recorded device-locally by
  `lib/lab-progress.ts` (same local-only pattern as the other study stores).

#### Phase 5 — Pilot and Roll Out

- [x] Pilots wired: projectile motion (`projectile-motion`), covalent bonding
  (`covalent-bonding`), the cell (`the-cell`).
- [x] Journey verified by tests: every pilot’s notes/practice/chat/hub targets
  exist on disk, and its topic placement matches the syllabus exactly.
- [ ] Manual rollout review per subject (needs a browser pass) and retirement of
  duplicate implementations after each parity decision. *(Still open: both
  halves need inputs this repo cannot produce alone — a signed-in browser pass
  needs an approved test account, and each `replaces` decision is an owner
  parity review per owner decision 3.)*

#### Phase 6 — Phone Resilience and Resource Lifecycle

- [x] `components/lab/activity-stage.tsx` reuses `3d-rig/use-scene-tier.ts`; the
  resolved tier is exposed as `data-tier` on the stage.
- [x] One canvas by construction: the stage renders exactly one renderer and
  unmounting the subtree is what disposes the previous scene.
- [x] Fallback is structural: no WebGL, a failed chunk, or reduced-motion all
  resolve to the manifest’s declared `fallback` (2D diagram / static / text).
- [x] Loading, error + retry, and “Close scene” reset states exist; reduced-motion
  shows the still fallback with an explicit “Play the 3D scene anyway” opt-in.
- [x] Keyboard-only control of the canvas itself and a formal touch-control audit
  remain per-visual work (the stage provides the shell, not per-scene bindings).
  *(Stage-level keyboard control SHIPPED 2026-11-09: the mounted canvas region
  is focusable (`tabIndex`, `role="application"`, aria-label) and drives the
  real OrbitControls camera by dispatching synthetic pointer-drag and wheel
  sequences on the canvas — arrow keys orbit (Shift = larger step), `+`/`-`
  zoom, Escape closes the scene; no per-scene coupling. Proven by
  `tests/components/lab/activity-stage.test.tsx` (2 tests): dispatched events
  reach the canvas and Escape returns to idle. Stage-shell touch/keyboard
  audit: every control is a real `<button>` (Open scene, Try again, Play
  anyway, Close scene) at 36–40 px min-height — above the WCAG 2.5.8 floor,
  below Apple's 44 px recommendation, recorded as a per-visual follow-up;
  pinch/scroll gestures are OrbitControls' own touch handling per scene.
  Remaining per-visual work: in-scene hotspots and per-scene control panels.)*

### Verification (2026-11-06)

**Close-out pass (2026-11-09):** Phase 0 checkboxes reconciled against the
measured report (coverage matrix, file inventory, orphan trace — the "30
suspected orphans" estimate collapsed to one approved barrel orphan; duplicate
families stay live per owner decision 3). Stage-level keyboard control shipped
(`activity-stage.tsx`: focusable canvas region, arrow-key orbit, `+`/`-` zoom,
Escape close, driving real OrbitControls via synthetic pointer/wheel events;
2/2 stage tests pass, `tsc --noEmit` clean). Bundle claim measured from a fresh
`next build` (exit 0): prerendered first-load graph = 17 chunks / 0.80 MiB raw
with **zero** Three.js chunks (Three.js confined to 27 lazy chunks); per-route
first-load and Lighthouse LCP/TBT still require the analyzer dependency and an
approved test account respectively and remain explicitly open. Phase 5 rollout
review and duplicate retirement remain owner-gated; the E2E journey test
remains CI-secret-gated.

- `npm run check:all` → **EXIT 0**: content JSON, frontend typecheck + content tests
  (30), backend typecheck + tests (651), empty-scope gate, mindmap, visuals, and the
  new `labManifest` runner all pass.
- `npm run audit:lab-manifest -- --check` → **PASS**: 527 activities, 342/453 visual
  entries + 112/116 registry + 69/69 catalog represented, strict orphan rule (0
  unreviewed), and the hand-maintained `TOPIC_3D_MAP` proven derivable (all 411 keys
  exist in `LAB_VISUAL_INDEX`).
- `tests/lib/lab-manifest.test.ts` (12) and `tests/components/lab/activity-stage.test.tsx`
  (1) pass; `tsc --noEmit` is clean.
- **Phase 2 retirement verified (2026-11-06):** `topic-3d-map.tsx` deleted and its
  consumer repointed; gate still PASS with 527 activities, 543 resolvable slugs,
  342/453 + 112/116 + 69/69 parity, and `orphan topic visuals: 1 (0 unreviewed)`
  — deleting the map produced no new orphans, which is the evidence that the
  loader set is a complete replacement for the map's import list. 116 registry
  metadata entries verified against `lab-registry.tsx` with 0 title mismatches;
  `tsc --noEmit` 0 and 17 tests across `lab-manifest` + `topic-learning-sections`
  pass. The drift branch of the new mirror guard was not exercised (it passes
  today); only its positive path is observed.
- **Phase 3 conversion verified (2026-11-06):** `tsc --noEmit` 0 and
  `npm run check:all` **EXIT 0** after `/lab/theory`, both gallery routes and the
  hub gallery were rewritten. Scope matching is exact-key only, so an unknown
  slug now yields the empty state instead of a generic scene. A signed-in render
  of the four routes was **not** performed (the `(app)` approval wall), so the
  conversion is verified by typecheck, tests and the manifest gate, not visually.
- **Dev server unblocked:** the community routes used two dynamic slug names at
  the same path level (`community/[id]` and `community/[subjectId]/[threadId]`),
  which Next rejects. The thread route moved to `community/[id]/[threadId]`, so both
  `/community/<space>` and `/community/<space>/<thread>` keep working and
  `next dev` boots. Smoke probe: `/community` 200, `/lab/3d` 200,
  `/lab/projectile-motion` 200.
- **Browser pass is auth-gated, not broken:** `/lab/*` lives under the `(app)`
  approval wall, so a signed-out browser stops at “Verifying your access”. The
  journey UI is therefore verified by render tests
  (`tests/components/lab/activity-journey.test.tsx`, 3 tests: every action’s href,
  syllabus-ordered next topic, visit recording) rather than a signed-in click-through.
  A real rollout review still needs an approved test account.
- **Dev-only observation:** the dev CSP rejects `unsafe-eval`, so React Refresh
  logs an EvalError in the browser console. It is a dev-mode CSP interaction, not
  an application error, and does not affect production builds.
- **Build:** `next build` succeeds (exit 0, ~101 s); every such route reports as
  dynamic (`ƒ`) because the `(app)` layout resolves auth per request.
- **Still unmeasured — first-load JS:** this Next 16 build emits content-hashed
  chunks under `.next/static/chunks/` with no per-route chunk directories and no
  `app-build-manifest.json`, and no bundle analyzer is installed, so a per-route
  first-load figure cannot be read from the build output. What is measurable is
  the whole client chunk set (≈22.3 MiB raw across root chunks), which is not
  first-load JS and must not be quoted as such. Measuring it needs
  `@next/bundle-analyzer` (a new dependency) or a Vercel/CI build that prints the
  size table.
- **Still unmeasured — LCP/TBT:** no Lighthouse/LHCI run was performed. The lab
  and topic pages sit behind the approval wall, so an authenticated run needs an
  approved test account in addition to the audit tooling.
- **Environment note:** after the production build, restarting `next dev` on this
  machine died with `FATAL ERROR: Committing semi space failed … heap out of memory`
  at only ~500 MB of heap — a Windows commit-limit failure under memory pressure,
  not a code fault. The dev-server fix above was confirmed by the 200s recorded
  earlier, before that pressure built up; the server is simply not left running.

### Gates for Every Phase / Pull Request

- Preserve the existing Lighthouse budgets for a topic page and a lab page;
  include measured LCP/TBT and bundle-size comparisons in review evidence.
- Keep the manifest orphan check in CI after the migration.
- Add an end-to-end notes → 3D → practice journey test. This test is blocked
  until `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `NEXT_PUBLIC_API_URL`, and `NEXT_PUBLIC_SITE_URL` are configured as CI
  secrets and a dedicated test account can pass the approval wall. Do not put
  secret values in this plan or repository.
- Do not delete files solely because an editor reports zero references.
- Keep changes phase-scoped; run the narrowest relevant tests first, then the
  repository check required for the destination branch. Commit coherent,
  validated changes with conventional messages. Push only when explicitly
  authorized.

### Acceptance Criteria

- Every live or pilot 3D activity is represented by the manifest with a valid
  lazy loader, curriculum placement, and fallback.
- Every topic with an activity exposes the correct visual from its notes page;
  no topic receives a visual through fuzzy or colliding resolution.
- Pages without a 3D activity do not eagerly load Three.js visuals.
- The lab hub and canonical URL scheme are consistent, and legacy deep links
  remain functional.
- The learner can complete the notes → 3D → practice journey, with the
  additional Veer and next-topic actions available.
- Topic-page Lighthouse results meet the existing budgets.
- The catalog, component registry, and topic map no longer contain independent
  hand-maintained indexes after parity is proven.
