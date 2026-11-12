# content-tools

Purpose-grouped scripts for curriculum content (legacy CJS/TS helpers).
The live Next content pipeline is `frontend/scripts/content/` (`npm run content:build`).

| Folder | Purpose | Examples |
|--------|---------|----------|
| `generators/` | Create notes, mindmaps, biology topic modules | `build-syllabus-notes.js`, `generate-*.cjs`, `bio-*.cjs` |
| `enhancers/` | Enrich / expand existing JSON | `enhance-*.cjs`, `expand-*.cjs`, `refine-*.cjs`, `update-*.cjs` |
| `validators/` | Schema / coverage checks | `validate-*.cjs`, `validate-*.ts` |
| `migrators/` | Structure migrations & bulk populate | `migrate-*.ts`, `populate-*.cjs`, `add-tabbed-structure*.cjs` |
| `fixers/` | Repair placeholders / field lifts | `fix-*.cjs`, `fill-*.cjs`, `ensure-*.cjs`, `lift-*.cjs` |
| `neb-frag/` | NEB fragment assets (unchanged) | — |

Root:

- `debug-build.cjs` — local debug helper (stays at root)
- `build-syllabus-notes.js` — shim → `generators/build-syllabus-notes.js`

Run from the **repo root** (many scripts resolve `content/` via `__dirname` or cwd).

```bash
node content-tools/generators/build-syllabus-notes.js chemistry
npx tsx content-tools/validators/validate-biology-content.ts
```
