# Mobile / Phone-Screen Optimization Checklist

Last updated: 2026-09-30. Audit at 375px (iPhone SE/13 mini class) + safe-area rules.

## Done (foundation pass — do not redo)

- [x] `viewport-fit: cover` in `frontend/app/layout.tsx` viewport export
- [x] `globals.css` — tap-highlight removal, `overscroll-behavior-y: contain`,
      `.pb-safe-bottom`, `.pt-safe-top`, `.bottom-safe`, `.bottom-safe-panel`
- [x] Header gets `pt-safe-top` (`components/layout/app-shell.tsx`)
- [x] AI launcher + chat panel docked above the home indicator
      (`components/layout/ai-widget.tsx`, fixes panel covering its own toggle)
- [x] Floating back button moved off the gesture bar
      (`components/navigation/back-button.tsx`)
- [x] `user-nav.tsx` — broken `xs:` variant (not a real breakpoint) fixed to `sm:`
- [x] Verified clean at 375px: home hubs, subject hub (`SubjectHubView`),
      `notes-viewer`, `pyq-card`, `quiz-viewer`, `rich-note`, lab filter row

## Priority rules for remaining files

1. NO horizontal scroll at 375px — `overflow-x: hidden` on html/body is a mask, not a fix.
2. Long headers: use `flex-col` / `min-w-0` + `truncate`; never `whitespace-nowrap` on flex rows.
3. `justify-between` rows need `gap-2` + `min-w-0` children or they clip at 375px.
4. Tables/charts: wrap in an `overflow-x-auto` container (`.prose table` already does).
5. Fixed/floating chrome: use `bottom-safe` / `pt-safe-top`, never raw `bottom-6`.
6. Grids: `grid-cols-1` default, expand at `sm:`/`lg:`.
7. After edits: `npx tsc --noEmit` in `frontend/` must pass.

## Batch A — page routes (highest traffic)

- [ ] `app/(app)/ai-quiz/` (layout + page)
- [ ] `app/(app)/ai/` (chat + quiz pages)
- [ ] `app/(app)/bookmarks/page.tsx`
- [ ] `app/(app)/class-11-notes/[subject]/` — all 8 route pages (hub, chapters,
      topics, mindmap, syllabus, theory, unit)
- [ ] `app/(app)/class-12-notes/[subject]/` — mirror of the above
- [ ] `app/(app)/derivations/`, `graphs/`, `theorems/`
- [ ] `app/(app)/lab/` (3D rig pages — verify WebGL canvas sizing at 375px)
- [ ] `app/(app)/mindmap/`, `syllabus/`, `periodic-table/`
- [ ] `app/(app)/progress/`, `profile/`, `search/`, `quiz/`, `exam-countdown/`

## Batch B — content renderers

- [ ] `components/content/*.tsx` (remaining 20+ of 32; 4 already verified clean)
- [ ] `components/derivations/*` (theorem visuals A–E)
- [ ] `components/theorems/*`
- [ ] `components/graphs/*` + `components/viz/*`

## Batch C — chrome & features

- [ ] `components/layout/footer.tsx` (grid `sm:grid-cols-2 lg:grid-cols-4` — check 375px)
- [ ] `components/home/` remaining hubs (academic-rigor, assessment, curriculum, portals)
- [ ] `features/*/` components
- [ ] `components/lab/` (schematic-frame, 3d-rig slots)

## How to audit a file (5 min each)

1. Open in devtools at 375×667, take a screenshot of the route.
2. Check: horizontal scrollbar? clipped header? tappable targets ≥ 44px?
   floating chrome above the gesture bar?
3. Fix with rules above; prefer wrapping over resizing.
4. Re-run `npm run check` (repo gate) before committing.

## Regenerate the "no responsive prefix" list

Run `node .agnes/work/mobile-list.cjs` (writes `.agnes/work/mobile-noprefix.txt`).
At last run: **628 files** have zero `sm:/md:/lg:` prefixes — use the batch
order above, not alphabetical order.
