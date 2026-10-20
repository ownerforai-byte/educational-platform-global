# Handoff prompt — Physics XI Academic Companion: deepen, test, commit all, push to origin main

**How to use:** paste the "PROMPT" block below into a fresh request (attach the `deepen` and
`commit` skills), or open this file with an `@` mention in a new thread. Every task below is
still open — none of it has been done.

---

## PROMPT

```text
CONTINUE: Physics XI Academic Companion — deepen, test, commit EVERYTHING, push to origin main

CONTEXT — already on disk, do NOT redo:
- Branch: main-integration. The Physics XI Academic Companion is ~70% built; the work below is the rest.
- Canonical dataset: frontend/public/data/physics-xi-academic/units.json — 26 units. Unit keys:
  unitNo, unitId, unitName, contentArea, slug, summary, facts[7], conditions[5],
  mysteries[2-3]{question,status,note}, prompts[3], keyNumbers[3-5]{label,value}, sources[3-6]{label,url}
- VERIFIED: the dataset's 26 unitIds map 1:1 onto the NEB syllabus units
  (getSubjectSyllabus("class-11-notes","physics").units[].id) — no missing on either side —
  and the syllabus carries 117 topics in total across those 26 units.
- Lib: frontend/lib/physics-xi-academic.ts
- UI: frontend/components/content/physics-xi-academic-grid.tsx, physics-xi-unit-brief.tsx
- Routes: frontend/app/(app)/resources/physics-xi/page.tsx and frontend/app/(app)/resources/physics-xi/[unit]/page.tsx
- Tests: frontend/tests/lib/physics-xi-academic.test.ts, frontend/tests/components/content/physics-xi-academic-grid.test.tsx
- Generator: scripts/generate-physics-academic-docs.mjs (writes an HTML + a Word-compatible .doc per unit
  into BOTH frontend/public/resources/physics-xi/ and public/resources/physics-xi/ — 52 files each, already generated).
  It supports `--check` (fails when the committed documents drift from the dataset).
- Modified: frontend/app/(app)/resources/page.tsx (companion card), frontend/lib/site-index.ts (new site-index group)
- Untracked scratch: scripts/fix-json.mjs, fix-json2.mjs, fix-json3.mjs, fix-json4.mjs
  (numbered one-off mutators of ONE chemistry rail file; fix-json3/4 rewrite that file's payload)
  → CONSOLIDATED into scripts/repair-json.mjs and the four numbered scripts DELETED. Nothing to do here.
- Every reading link in the dataset was verified live earlier; keep them.
- TOOLING NOTE: `npx tsx` HANGS in this repo (it tries a network install). Use the local binary instead:
  `cd frontend && node ../node_modules/tsx/dist/cli.mjs --eval "…"` (verified working), or the npm scripts
  that already wrap it (npm run content:build / content:build:check / ledger:* / registry:*).

TASK 1 — DEEPEN (the single highest-value capability): exam-anchored completeness + misconceptions + a
workbook, for all 26 briefs.
Why this wins: the briefs are currently unit-level prose. A demanding reviewer would say a student still
cannot tell (a) whether every examinable NEB topic in the unit is covered, (b) which wrong beliefs the exam
punishes, (c) whether they can actually solve anything. Fix exactly that, inside the brief.
Add to EVERY unit in units.json:
- syllabusTopics: string[] — the exact NEB topic titles for that unit, taken from the syllabus (never
  invented, never renamed). Source:
    import { getSubjectSyllabus, getUnitTopicEntries } from "@/lib/syllabus";
    getSubjectSyllabus("class-11-notes","physics")!.units.find(u => u.id === unit.unitId)!.topics
  (SyllabusUnit = { id, title, topics: string[], hours?, introducedIn? }; getUnitTopicEntries(unit) gives
  { slug, title, index } and slugifySyllabusTopic(title) gives the normalised key used for matching.)
- misconceptions: {claim, why, correction}[] — exactly 3 per unit; each a real student error in that unit.
- workbook: {question, answer, unit}[] — exactly 3 per unit: one numerical (with units), one derivation
  or derivation-closure, one conceptual-with-reasoning. Verify every answer numerically before committing.
- nextSteps: {label, href}[] — links into the platform's own physics material for that unit:
  • /class-11-notes/physics/chapters/<unitId>  (route exists: frontend/app/(app)/class-11-notes/[subject]/chapters/[unit]/page.tsx)
  • a relevant lab from frontend/lib/lab-registry.tsx (LAB_REGISTRY / getLabById / searchLabs; physics lab
    ids look like "ph-3d-dynamics", "ph-3d-pendulum" …) and/or /lab/theory where a lab genuinely exists.
  Include ONLY hrefs that resolve — a test will enforce that no link is dead.
Automatic guarantees (a test must enforce each):
- Every syllabus topic of a unit appears in that unit's brief — match on the normalised key
  (slugifySyllabusTopic of the topic title vs. the same normalisation of the topic's mentions) so a topic can
  never silently go missing. 117 topics across the 26 units is the coverage denominator.
- Per unit: facts>=7, conditions>=5, mysteries>=2, prompts>=3, keyNumbers>=3, sources>=3,
  misconceptions=3, workbook=3, syllabusTopics>=1, nextSteps>=1.
- Mysteries stay framed as live research frontiers (keep the `status` field) and must NOT imply the
  school-level model is invalid; the page + doc footer keeps the "companion brief, not a replacement for
  the prescribed NEB text" disclaimer.
Surface the new sections in: physics-xi-unit-brief.tsx (brief page), physics-xi-academic-grid.tsx
(card shows exam-topic count + misconception count, and the search must reach the new fields), and
scripts/generate-physics-academic-docs.mjs (HTML + .doc get the SAME sections, so the downloadable documents
match the site). Re-run `node scripts/generate-physics-academic-docs.mjs` after the dataset change so both
published trees stay in sync (52 files each).

TASK 2 — TESTS:
- frontend/tests/lib/physics-xi-academic.test.ts ALREADY has: the raised richness floors (facts>=7, conditions>=5,
  mysteries>=2, prompts>=3, keyNumbers>=3, sources>=3) and the generator-parity test
  ("keeps the documents in step with the dataset" runs `generate-physics-academic-docs.mjs --check`).
  Do NOT redo those two. STILL TO ADD:
  • the per-unit syllabus-topic-coverage assertion (117 topics across 26 units);
  • a check that every nextSteps href resolves, using frontend/tests/helpers/route-tree.ts
    (routeExists / isResolvable) — that helper resolves "app" and "public" relative to the process cwd,
    so the test must run with frontend/ as cwd;
  • grid coverage of the new fields (search must reach misconceptions / workbook / syllabus topics).
- GOTCHA already hit and fixed: the generator HTML-escapes & < > " in unit names and summaries, so document
  assertions must compare against the ESCAPED text (a local escapeHtml() helper now lives in that test file).
  Without it, Unit 21 "Potential & Potential Energy" fails against its own correct document.
- Verify the notes-chapter route really resolves before linking to it.

TASK 3 — SCRATCH SCRIPTS: DONE. The four numbered one-off mutators (scripts/fix-json{,2,3,4}.mjs, which
re-wrote a single chemistry rail's payload when re-run) were deleted and their capability consolidated into
scripts/repair-json.mjs <file> [--write|--check]: it strips a UTF-8 BOM, escapes raw control characters that
leaked inside string literals, closes a truncated array/object at the end of the file, and never invents
content. Verified: a valid rail reports "OK (already valid, nothing changed)" and is not rewritten; a broken
fixture is repaired, keeps its content, and re-runs clean (idempotent); unrepairable input exits 1 with the
error position. Do NOT run it against committed content unless a file is genuinely broken. (It does not
duplicate scripts/content-health-check.mjs — BOM + parse detection — or frontend/lib/content/repair.ts —
concept-note migrations.)

TASK 4 — VALIDATION GATE (AGENTS.md Rule 3), in order, reporting each result:
1. cd frontend && npx tsc --noEmit
2. cd frontend && npm run test:run   (vitest, full suite green)
3. cd frontend && npx next build     (exit 0)
4. npm run check  (scoped)  then  npm run check:all
5. npm run check:content  (JSON/BOM/schema health — the new dataset must not break the content gate)
6. npm test (backend) only if backend files changed; they should not have.
7. node scripts/generate-physics-academic-docs.mjs --check
Fix real failures. Do NOT weaken assertions or add lint/type suppressions to make a check pass. If a check
cannot run in this environment, report it as not-run — never as a pass.

TASK 5 — COMMIT + PUSH (the user explicitly asked to commit ALL files regardless of which agent produced
them, and to push to origin main):
- First: git status, git diff (staged + unstaged), git log -8 to match the repo's message style.
- Secrets hygiene (AGENTS.md Rule 2): `git log -S "<key-value>" -- <file>` and
  `git grep -n -E "vcp_|sbp_|AIza|sk-|KEY=|TOKEN=" -- . ':!node_modules' ':!*.md'` must be clean.
  Never commit .env* or generated secrets.
- One commit. First line something like
  `feature: physics-xi academic companion briefs — exam-anchored, misconception- and workbook-deepened`
  (match the repo's style). Body: what changed, why, acceptance criteria, validation run.
- Stage EVERYTHING: `git add -A` (the user explicitly wants all files committed, including other agents'
  edits), but never add ignored artifacts (.next, node_modules, .env).
- Branch: current branch is main-integration. Check `git branch -a` and `git remote -v` first. Push to
  origin main WITHOUT force: if origin/main is an ancestor of HEAD → `git push origin HEAD:main`;
  otherwise merge origin/main into the branch (no rebase, no force), re-run the affected checks, then push.
  Do not rewrite history, do not open a PR.

TASK 6 — REPORT:
- The deepen choice and why it won, plus what you deliberately left unbuilt.
- Validation results: each command, pass/fail/not-run.
- Commit hash + message + files committed.
- AGENTS.md Rule 1b file classification for EVERY touched file: [IMPORTANT CORE FILE] vs [CONTENT FILE];
  if a new core architecture file was added, register it in CORE_FILES.md (frontend/lib/physics-xi-academic.ts
  and the new components are candidates; the dataset + generated documents are content).
```

---

## Notes for whoever picks this up

- The unit-level academic layer (facts, conditions, mysteries, prompts, key numbers, verified reading links)
  already exists for all 26 units and is published to both resource trees. The gap this handoff closes is
  *exam-anchored completeness*, not more prose: syllabus coverage, misconception checks, and a self-test
  workbook per unit.
- `npx tsx` hangs in this repo; use `node ../node_modules/tsx/dist/cli.mjs` from `frontend/` (verified).
- The dataset is the single source of truth: edit `frontend/public/data/physics-xi-academic/units.json`,
  then re-run the generator so the site and the published documents stay identical.
- Verified green as of this handoff (run from frontend/):
  `npm run test:run -- tests/lib/physics-xi-academic.test.ts tests/components/content/physics-xi-academic-grid.test.tsx
  tests/lib/route-links.test.ts tests/lib/site-index-coverage.test.ts tests/lib/navigation.test.ts
  tests/components/content/physics-unit-resource-doc.test.tsx` → 6 files, 30 tests, exit 0.
