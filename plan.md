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

1. **Home overview** — what the platform is, live approval-status check.
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
beyond naming.

**P2 — Plans page (guest).** Build `/plans` with the five tier cards + the
availability matrix; remove `/pro-plan` and relink every pointer (footer,
profile, credits, AI pages, notice, credits constants) to `/plans`.

**P3 — Sections + Journal.** Introduce the section registry (id, title,
description, `minTier`, content source). Convert the home + class pages to
horizontal section rails. Add the **Journal** section (Plus/Pro), backed by the
existing journal store.

**P4 — Availability gates.** Enforce `minTier` per section end-to-end: rails
dim locked cards, section pages gate entry, APIs scope by tier. Owner console
gains tier grants + section `minTier` control.

**P5 — Polish & parity.** Tier badges everywhere, locked-card copy, plans-table
parity with the ladder, responsive pass.

**P6 — Gates & deploy.** Full `check:all`, backend + frontend suites, live
smoke, deploy `main` (Vercel + Render), verify live.

---

## 9. Acceptance criteria

- [ ] No `STUDENT|TEACHER|ADMIN` role values remain in source (outside the
      single legacy-normalization map and natural-language copy such as
      transcript speaker labels); the ladder is the only rank vocabulary.
- [ ] `/plans` is public and shows all five tier cards + the availability table.
- [ ] `/pro-plan` is gone; every former link points at `/plans`.
- [ ] Journal exists as a section and requires Plus or Pro.
- [ ] Every content family appears in exactly one section; every section
      declares a `minTier`.
- [ ] Locked sections are visible-but-dimmed for lower tiers (no dead ends).
- [ ] Owner console can grant/adjust every tier and change section minimums.
- [ ] `npm run check:all`, backend suites and live smoke all green;
      deployed and verified live.
