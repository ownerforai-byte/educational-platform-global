# android-native — Labs & Mindmaps decision

**Status:** DECIDED (Agent 4, for Supervisor §8 review) · **Date:** 2026-11-26 · **Revisit trigger:** after Phase 8 device test / owner approval.

## What exists on the web today (facts, from `CORE_FILES.md` + `frontend/features/lab`)

| Surface | Tech | Weight |
|---|---|---|
| Labs (`frontend/features/lab/lab-registry.tsx`, catalog ~1,149 lines) | 2D/3D interactive simulations: **Canvas 2D (~1,400 refs), Three.js WebGL (~640 refs)**, SVG minority | Very heavy; dozens of sims (cell-3d, cell-division-3d, floral-3d, …) |
| Mindmaps (`frontend/features/mindmap/*`) | **SVG tree**, branch colours, fold/unfold, L1–L3 depth control, search, pan/zoom, fit, SVG export; data = authored JSON (`content/visuals/mindmaps/**`) or generated from topic payload | Medium; pure geometry + data, no WebGL |

## Decision

1. **Labs: NOT in the native v1 scope. Stay web-only.**
   - Rationale: Three.js/WebGL sims cannot be "ported" to Compose in any reasonable phase budget; a rewrite per lab is a multi-week effort per sim with no shared engine.
   - A WebView embed is the only cheap bridge, but the Phase 0 WebView allowlist is **empty by default** (security posture: `network_security_config` pins SPKI, redirect guard rejects cross-origin). Opening arbitrary lab URLs in a WebView would need an allowlist entry + owner security sign-off — not granted.
   - Consequence: native v1 does not link labs; the Learn surface stays syllabus → notes → practice → AI. If the owner wants labs on native later, the path is (a) owner-approved same-origin WebView allowlist entry, or (b) a curated native port of the 3–5 highest-value 2D-only labs.

2. **Mindmaps: native read-only viewer is feasible — schedule as a Phase-2-candidate feature, NOT v1 launch scope.**
   - Rationale: it is a fold/unfold SVG tree over existing JSON payloads; Compose `Canvas` + `detectTransformGestures` covers pan/zoom/fold with modest effort. The mindmap JSON is already generated content the API can serve (Agent 2 reuse, no new backend work).
   - v1 ships without it to protect the critical path (syllabus → reader → practice → quiz → AI). A read-only viewer (no editing, no SVG export in v1) is the first post-launch feature if the device test goes well.

3. **What this session did instead:** all Agent 4 v1 features (syllabus, reader, search, practice + quiz runner, Veer chat, community, profile, notifications) are complete on local fakes — see STATUS §4.

## Revisit triggers

- Owner asks for labs on Play listing parity → revisit decision 1 (WebView allowlist first).
- Device test shows mindmap demand (analytics/feedback) → schedule decision 2 viewer.
- Math rendering (LaTeX) is **separately scheduled with the Supervisor after the device test** and is a prerequisite for chemistry/physics note parity — tracked there, not here.
