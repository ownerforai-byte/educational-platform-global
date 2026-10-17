# Cline Tutor Agent

A standalone Node.js 22+ CLI study coach powered by the Cline SDK. It uses the platform's local curriculum files as a read-only reference and has no access to shell, filesystem mutation, account data, or other agent tools.

## Setup

From this directory, install dependencies:

```sh
npm install
```

Set a provider key in your shell (never commit it). Defaults reuse the platform's Agnes OpenAI-compatible endpoint:

```sh
# Windows PowerShell
$env:AGNES_API_KEY = "your-provider-key"

# macOS / Linux
export AGNES_API_KEY="your-provider-key"
```

Then run the interactive coach:

```sh
npm start
```

Ask a question, use `/subjects` to ask for the available catalog, or `/exit` to quit. For a single prompt:

```sh
npm start -- "Explain Newton's law of gravitation for Class 11 physics"
```

To use another OpenAI-compatible provider:

- `CLINE_PROVIDER_ID`: defaults to `openai-compatible`.
- `CLINE_MODEL_ID`: defaults to `AGNES_MODEL`, then `agnes-3.0-flash`.
- `CLINE_API_KEY`: provider key; falls back to `AGNES_API_KEY`.
- `CLINE_BASE_URL`: defaults to `https://apihub.agnes-ai.com/v1`.

For a non-compatible Cline SDK provider, set its provider ID/model/key as above; `CLINE_BASE_URL` is only passed for the `openai-compatible` provider.

## Local tools

- `search_curriculum`: keyword search across authored notes, including subject/class filters and short excerpts.
- `get_curriculum_topic`: read one exact topic's available note content.
- `list_curriculum_subjects`: report catalog coverage counts.

The catalog reads `frontend/public/data/content-ledger.json`, authored ledger-indexed `syllabus-notes/` payloads, and authored Class 11/12 entries from `frontend/public/data/ravikishan/manifest.json`. Duplicate rows are combined so generated titles can use longer authored notes where available. It is loaded at startup and searches stay local; the model provider receives only tool results it requests.

## Verify

```sh
npm test
```

No provider request is made by the tests. A real chat requires a provider key, working network access, and a valid model configuration.
