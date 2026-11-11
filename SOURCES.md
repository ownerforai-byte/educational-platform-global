# SOURCES.md — Content Rights & Attribution Ledger

> Every external source ingested into this platform is listed here.
> Maintainers: update this file whenever a new external source is added.
> If you are a rights holder and believe your content is included without
> permission, use the public request page at `/legal/takedown`. The operative
> review process is in SECURITY.md; this file is the source ledger.

## Status key

| Symbol | Meaning |
|--------|---------|
| ✅ | Confirmed: open licence or explicit permission |
| ⚠️ | Under review — rights status not yet confirmed |
| ❌ | Do not use — removed or rejected |

---

## Platform-authored content (✅)

All concept notes, formula sheets, PYQ solutions, mindmap trees, rail cards,
and worked examples under `content/notes/`, `content/formulas/`,
`content/practice/`, `content/visuals/`, and `content/resources/` are
authored by the platform team and released under the licence in
`CONTENT_LICENSE.md`.

---

## NEB / CDC official syllabus (✅)

- **Source**: Curriculum Development Centre (CDC), Government of Nepal
- **Used for**: unit order, topic lists, teaching hours, syllabus tables
- **Licence**: Public curriculum document — no reproduction of full text;
  structural metadata only
- **Location in repo**: `frontend/lib/syllabus.ts` (structured data, not verbatim text)

---

## NEB past-year question banks (⚠️)

- **Source**: NEB (National Examination Board) published question papers
- **Used for**: PYQ banks under `content/practice/questions/`
- **Status**: Questions from public examinations — ownership and
  reproduction rights under Nepalese law are not fully confirmed.
  **Action required**: verify whether NEB exam questions are freely
  reproducible for educational use, or obtain written permission.
- **Location**: `content/practice/questions/`

---

## Ingested textbook corpus — backend/kb/books/ (⚠️)

The `backend/kb/books/` directory contains JSON fragments derived from
textbooks via an OCR/ingest pipeline. The source PDFs are **not** in this
repository (they were processed locally). Rights status:

| File pattern | Likely source | Status |
|---|---|---|
| `biology/publisher-*.json` | NEB Biology Grade 11 (Bhrikuti Publication or similar) | ⚠️ Confirm rights |
| `chemistry/*.json` | NEB Chemistry textbook | ⚠️ Confirm rights |
| `physics/*.json` | NEB Physics textbook | ⚠️ Confirm rights |
| `mathematics/*.json` | NEB Mathematics textbook | ⚠️ Confirm rights |
| `english/*.json` | NEB English textbook | ⚠️ Confirm rights |

**Action required**: Identify the exact publisher and edition for each
ingested book. Obtain written permission for educational use, or replace
the ingested fragments with platform-authored summaries.

The ingest pipeline report (`_ingest-report.json`) has been removed from
the repository because it contained local file paths. The pipeline itself
(`content-tools/`) is retained for reference.

---

## OCR'd question-bank guides — backend/.ocr-v2/ (⚠️)

- **Source**: Commercial entrance-exam preparation guides (publishers unknown)
- **Used for**: CEE/IOE exam trap facts and high-yield question patterns
- **Status**: ⚠️ Rights not confirmed. These guides are commercial products.
  **Action required**: either obtain permission from each publisher, or
  replace the OCR'd data with platform-authored content.

---

## PYQ paper link index — content/practice/pyq-links/ (⚠️ link-only)

- **Source**: NEB past/model question papers as hosted by public
  educational aggregators (see the rows below)
- **Used for**: `content/practice/pyq-links/<class>/<subject>.json` — a
  metadata-only index (year, exam source, provider, URL, unit coverage).
  **No paper text is reproduced**: the platform links out to the provider page
  and authors its own solutions and guidance.
- **Status**: ⚠️ The papers themselves are NEB publications whose reproduction
  rights are not confirmed — so the platform stores **links and factual
  metadata only** (`rights: "link-only"`), never paper text.
- **Location**: `content/practice/pyq-links/`

### Aggregator providers referenced by the link index

| Provider | URL | Status | Use |
|---|---|---|---|
| NEB Education | https://www.nebeducation.com/ | ⚠️ link-only lead | Class 11/12 important + old questions, all subjects |
| Educate Nepal | https://www.educatenepal.com/ | ⚠️ link-only lead | NEB Class 12 exam questions 2080–81 (2024), all subjects |
| Noteswift | https://noteswift.in/ | ⚠️ link-only lead | NEB Class 12 PYQ collection, all subjects |
| Sajha Notes | https://sajhanotes.com/ | ⚠️ link-only lead | NEB Grade 11/12 model + past papers |
| Shiksha Sanjal | https://shikshasanjal.com/ | ⚠️ link-only lead | NEB Class 12 model questions, subject-wise |
| Notesharu | https://notesharu.com/ | ⚠️ link-only lead | NEB notes + solved past questions, all subjects |
| EduSanjal | https://edusanjal.com/ | ⚠️ link-only lead | Grade 12 model questions (NEB) |
| ExamSanjal | https://www.examsanjal.com/ | ⚠️ link-only lead | NEB exam portal (forms, results, question collections) |
| Scribd uploads | https://www.scribd.com/ | ⚠️ link-only lead | Individual uploaded model/specification documents |

Aggregator items are **leads, not authority**: they are stored as links with
provider credit, re-verified by the link-check gate
(`node scripts/validate-neb-pyq-content.mjs --links`), and dropped when dead.

---

## CDC specification grids — blueprint metadata (✅ structural only)

- **Source**: Curriculum Development Centre (CDC), Nepal — test specification
  grids for Grades 11 & 12
- **Used for**: `content/practice/blueprint/<class>/<subject>.json` — per-unit
  teaching hours, concept lists, question-type and cognitive-level splits
- **Status**: ✅ **structural metadata only** (unit order, hours, marks,
  question types). Never verbatim grid text. Values not yet transcribed from
  the official grid are flagged `"verified": false` with a `provenance`
  note — they are curriculum-derived estimates, never presented as CDC data.
- **Location**: `content/practice/blueprint/`

---

## Examiner mistake references (✅ inspiration only)

- **Source**: Published examiner/teacher commentary on common science and
  board-exam errors (e.g. India Today board-examiner round-ups, Tutopiya
  science-mistake guides)
- **Used for**: `content/practice/mistakes/<class>/<subject>.json` — seed
  material only; every mistake entry is **authored original** in the
  platform's own words for the NEB context
- **Status**: ✅ No text is reproduced; the sources inform which error
  patterns to cover
- **Location**: `content/practice/mistakes/`

---

## Takedown / contact process

If you are a rights holder and believe your content is included without
permission:

1. Email **[contact email — fill in]** with subject line
   `TAKEDOWN REQUEST — [your work title]`
2. Include: your name, the work title, a description of where it appears,
   and proof of ownership or licence.
3. We will respond within 5 business days and remove or replace the content
   if the claim is valid.
