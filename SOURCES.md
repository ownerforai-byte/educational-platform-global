# SOURCES.md — Content Rights & Attribution Ledger

> Every external source ingested into this platform is listed here.
> Maintainers: update this file whenever a new external source is added.
> If you are a rights holder and believe your content is included without
> permission, please contact us via the process in SECURITY.md.

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

## Takedown / contact process

If you are a rights holder and believe your content is included without
permission:

1. Email **[contact email — fill in]** with subject line
   `TAKEDOWN REQUEST — [your work title]`
2. Include: your name, the work title, a description of where it appears,
   and proof of ownership or licence.
3. We will respond within 5 business days and remove or replace the content
   if the claim is valid.
