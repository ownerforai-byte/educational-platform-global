# Product Professionalization — Audit & Roadmap

> Owner directive 2026-11-27: audit the whole application, identify the 15
> highest-impact improvements, rank them, and implement them one verified step
> at a time. Philosophy: educational value > engagement, functionality >
> decoration, reliability > feature count. No fake statistics, no stub
> features, no rebuilds — improve what exists.

## 1. Audit summary (evidence-based)

The platform is far more complete than a greenfield audit would assume. What
already exists and works (verified against CORE_FILES.md, the code, and the
green `check:all` gate):

- **Curriculum system**: 696 topics across 6 subjects in official NEB order,
  canonical single-presentation notes, language-pro companion surfaces, strict
  content gates (schema/parity/scopes/placeholder all PASS).
- **Practice**: PYQ bank (365 banks / 869 solved questions), quiz engine with
  AI history, mock exams (OMR + written), CEE/IOE tracks.
- **Memory & progress**: SM-2 spaced repetition (`/srs`), progress journey with
  per-unit/topic states, streaks, weak-topic reader, weekly plan generator.
- **Discovery**: global search (notes/labs/derivations/practicals/PYQs),
  site-index registry, syllabus-ordered navigation.
- **Community**: per class/subject spaces, question validation, accepted
  answers, Veer assistant replies, saves/reports/moderation.
- **Infrastructure**: account-backed user-state sync (versioned JSONB, offline
  queue), LRU+TTL curriculum cache, CDN cache headers, SW v9 auto-update,
  security headers + CSP nonce, rate limiting, scoped CI gates, boundary
  ratchet, graphify code graph.

### Weaknesses found (with evidence)

| # | Finding | Evidence |
|---|---|---|
| W1 | Dashboard under-uses the platform's own engines: no SRS due-reviews surface, no practice accuracy, plan rows are dead text | `dashboard-view.tsx` (162 lines) vs existing `dueQueue`, `overallAccuracy` readers |
| W2 | Mindmap coverage gaps | gate output: 4/10 units without depth packs, 75 note units with no mindmap entry (fallback renderer) |
| W3 | Thin content units | gate output: 8 THIN units (54 thin files) |
| W4 | Mobile API bypasses the storage boundary | boundary ratchet: 5 new `supabaseAdmin` imports baselined, not refactored |
| W5 | Exam prep is fragmented across 4+ routes with no unified journey or readiness signal | `/mock-exams`, `/pyqs`, `/exam-countdown`, CEE guides live separately |
| W6 | Search is Veer-centric; no structured type filters for library-style lookup | `SmartSearchPanel` has no notes/PYQ/lab/formula facet filters |
| W7 | Resource materials scattered (`/resources`, `/pdfs`, topic-supplemental) without one searchable entry | three surfaces, no unified library index |
| W8 | Profile shows stats/progress but not educational contribution | `public-profile-sections.tsx` has no community-contribution section |
| W9 | No per-topic mastery signal surfaced while browsing | journey states exist but topic pages don't show them |
| W10 | `/referrals` is an honest placeholder (copy-link only) | `referrals-view.tsx` — reward tracking "still to come" |

## 2. The 15 highest-impact improvements (ranked)

Rank weights: educational value × user experience × technical importance,
penalised by implementation complexity. Each item reuses existing services.

| Rank | Improvement | Why here | Complexity |
|---|---|---|---|
| 1 | **Dashboard → personalized command center**: due SRS reviews today, practice accuracy (real quiz history), plan rows link to subjects, resume rail | Highest daily-touch surface; all data readers already exist; pure composition | Low |
| 2 | **Exam preparation hub**: one prep journey unifying PYQ practice, mock exams, countdown, CEE/IOE guides + a *derived* readiness indicator (real progress only) | Exam value is the product's core promise; pieces exist, journey doesn't | Medium |
| 3 | **Question-bank practice loop**: unit/topic/difficulty filters + wrong-answer retest that feeds WeakTopics | 869 questions already banked; loop closes the study cycle | Medium |
| 4 | **Structured library search**: type facets (notes / PYQ / lab / formula / mindmap / practical) over the existing index, deep links | Discovery is the #1 daily friction; index already aggregates everything | Medium |
| 5 | **Topic mastery signals**: surface journey + SRS + accuracy state on topic pages and syllabus browse ("not started / learning / practiced / strong") | Makes progress visible where studying happens | Medium |
| 6 | **Profile as educational identity**: real contribution section (community posts, answers, accepted answers), study consistency, certificates link | Identity motivates; all data exists | Medium |
| 7 | **Community → academic knowledge spaces**: syllabus topic tagging on posts + topic-filtered browsing; accepted-answer prominence | Turns chat into a searchable knowledge base | Medium |
| 8 | **Unified resource library**: one searchable entry over PDFs, materials, supplemental materials with type/subject filters | Reuses `topic-supplemental` mapping + streams catalogs | Medium |
| 9 | **Mindmap coverage completion**: author depth packs for 4 units; mindmap entries for the 75 fallback units | Content task, gated; improves a flagship feature | High (content) |
| 10 | **Thin-content units**: fill the 8 THIN units to the book-grade bar | Content task with existing gates + builders | High (content) |
| 11 | **Weekly student report**: actionable weekly digest from journey + quiz accuracy + SRS reviews (real data, delivered on dashboard/analytics) | Retention driver; aggregator functions exist | Low-Medium |
| 12 | **Mobile API storage-boundary refactor**: move the 5 mobile routes behind storage adapters | Reliability/consistency debt; ratchet currently baselined | Medium |
| 13 | **Media & payload performance**: image format audit (AVIF/WebP), payload trimming on heavy lists, prefetch audit | Bandwidth priority; infrastructure mostly exists | Medium |
| 14 | **Accessibility pass**: focus management audit, keyboard nav sweep, ARIA on interactive composites (contrast tooling exists) | Compliance + usability; no new deps | Medium |
| 15 | **Consistency finish line**: shim import codemod, remaining surfaces onto the unified design language | Hygiene; unlocks future velocity | Medium |

## 3. Incremental roadmap

- **Phase 1 (experience core)**: #1 dashboard, #2 exam hub, #3 practice loop
- **Phase 2 (findability)**: #4 library search, #5 mastery signals, #8 resource library
- **Phase 3 (identity & knowledge)**: #6 profile, #7 community topics, #11 weekly report
- **Phase 4 (content depth)**: #9 mindmaps, #10 thin units (gated content sessions)
- **Phase 5 (engineering hygiene)**: #12 boundary refactor, #13 performance, #14 a11y, #15 consistency

**Verification rule per item**: focused tests + `npm run check` scoped gate +
browser journey check of the affected surface; commit after each verified
item. Content items (#9, #10) additionally require the content gates
(schema/parity/scopes/placeholder) to stay green.

## 4. Status ledger

| # | Improvement | Status |
|---|---|---|
| 1 | Dashboard command center | ✅ Done (2026-11-27) — due-reviews card (SRS across goal subjects), practice accuracy card (real quiz history), plan rows link to subject pages, 4-stat grid |
| 2–15 | — | ⚪ Not started |
