# Who does what — task map & the activation system

## The standing rule (declared by the owner)
> "Even if I give the prompt to kilocode or agnes, the system still
> activates and ALL agents work as per their rules."

That is now built-in. Every agent binary has a **front-door wrapper**
(`agent-pipeline/bin/<agent>`). Whichever one you type the prompt into,
the wrapper hands the task to `router.sh`, which runs the **whole**
pipeline per this task map:

## When ANY prompt arrives → what each agent does

| Order | Role / agent | Entry condition (scope gate) | What it actually does |
|-------|--------------|------------------------------|------------------------|
| 1 | **planner** — claude (via omniroute) | Task needs decomposition / file triage | Breaks the task into concrete numbered steps; names the real files involved. Output = plan text. |
| 2 | **implementer** — kilo (`--auto`) | Task writes/edits source files | Reads the existing SAMPLE/convention first, mirrors its exact shape, writes full new files or edits existing ones. Must compile (`tsc --noEmit`), LF endings. Output = changed files. |
| 3 | **generator** — mistral (omniroute codestral) | Task is fast boilerplate / single snippet | Emits raw scaffold/config/code blocks only. No multi-file or project-wide work (that's kilo's job). |
| 4 | **verifier** — agnes | Task checks/validates content | Receives the spec + FULL file content inlined; returns exactly `VERIFY PASSED` or `VERIFY FAILED: <reason>`. Never fabricates — if the content is truncated it says FAILED. |

## The activation system (how "one prompt → all agents" works)

```
you type a prompt
        │
        ▼
agent-pipeline/bin/kilo   (or bin/agnes / bin/claude / bin/entry.sh)
        │  ROUTER_ENTRY_VIA=<whichever you used>  → source entry.sh
        ▼
agent-pipeline/router.sh
        │  walks ROLES = planner → implementer → generator → verifier
        ▼
  per role: acquire lock → pick available agent (fallback chain) →
  check_scope(rules/<role>.md) → if in scope: run_agent() → release lock
        ▼
logs/router.log       ← every activation / skip / fail / done
logs/<ts>_<role>_<agent>.log  ← each agent's raw output
```

- The scope gate decides which of the 3 (planner/implementer/generator/verifier)
  actually activate for a given prompt. A "verify this file" prompt triggers
  planner? likely skip → verifier. A "write the chemistry question set"
  prompt triggers implementer (+ generator for snippets). You don't pre-select
  — the rules do.
- Only the **Overseer (Cline)** commits and pushes. Agents never do.
- Auto-approve is on at all times; wrapper/agent flags are headless-friendly.

## Putting `bin/` on PATH (optional, so you can type `kilo "..."` directly)
```bash
export PATH="$PWD/agent-pipeline/bin:$PATH"   # bash / Git Bash
# then:  kilo "add Usage section to README" triggers the full pipeline too
```

## Trying the empty / bad prompt guard
```bash
agent-pipeline/bin/kilo                    # prints usage, exits 2
agent-pipeline/bin/agnes ""                # prints usage, exits 2
```