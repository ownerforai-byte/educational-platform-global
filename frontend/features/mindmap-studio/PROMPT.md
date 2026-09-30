# ⚡ AGENT TASK — READ THIS FILE AND DO THE WORK INSIDE

> **TO THE LOCAL AGENT:** You are connected to this repository. This file
> is your task. Read the full spec below, then create the folder
> `frontend/features/mindmap-studio/` and implement every requirement inside
> it. Work folder-only — do not modify `backend/`, `frontend/app/`, or any
> other feature. When done, verify "Definition of done" and report.

---

## SPEC — "Mind Studio" (client-side only)

Self-contained React 19 + TypeScript + Tailwind feature with a dark
glassmorphism floating-interface UI. No backend, no database, no auth, no
external API keys. Use the repo's existing `frontend/components/ui`
(shadcn) conventions where they fit. One root export: `MindStudio`.

### Module 1 — Mindmap Maker
- Infinite canvas with pan + zoom (wheel/pinch), a central root node, free nesting.
- Node types: concept | fact | question | link; each holds text, color, tags.
- Add / rename / delete / merge; drag to rearrange; collapse / expand subtrees.
- Live minimap. Keyboard: N = new node, Ctrl+Z / Ctrl+Shift+Z = undo / redo.
- Export / import the whole map as one JSON file.

### Module 2 — Advanced Classifier & Identifier
- Floating "Classifier" panel: select a node (or paste a text block) and classify
  it deterministically — NO AI calls:
  - levels: domain → subject → topic → concept
  - fact type: definition | numeric | formula | comparison | exception | historical
  - auto top-5 keyword tags, confidence %, one-line reason per classification
- Rule engine = keyword heuristics + structural signals.
- User overrides persist to localStorage and strengthen future rules.
- Output: a Card object `{ nodeId, levels, factType, tags, confidence, overrides }`.

### Module 3 — Facts & Data Representor
- Render classified Cards as clean floating cards: key fact, stat chips,
  comparison bars, related-concept links.
- Hover a card → it lifts and shows quick actions (edit, link, re-classify, pin).
- Click a card → floating Inspector panel with full classification + reasoning.
- Summary strip: totals per fact type and top tags as compact bars.

### Floating interface system
- Dockable, draggable panels: canvas, classifier, data view, inspector.
- Glassmorphism: backdrop-blur, subtle borders, soft shadows.
- click = open / pin, hover = tooltip / quick-actions.
- Cmd/Ctrl+K = command palette.
- Seed a demo dataset (Physics → Circular Motion → centripetal force,
  F = mv²/r, related concepts) so every view works immediately.

### Definition of done (verify before reporting)
- `frontend/features/mindmap-studio/index.ts` exports `<MindStudio />`.
- `npx tsc --noEmit` clean from `frontend`.
- No unused imports, no external network calls, no hardcoded keys.
- Demo dataset loads on first open.
