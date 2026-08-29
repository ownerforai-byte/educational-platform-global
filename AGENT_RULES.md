# AGENT RULES

These rules are mandatory for every agent (orchestrator, `general` subagents,
`explore` subagents, and Agent Manager sessions) that performs work in this
repository.

## Pre-work Checklist
1. Every agent MUST read `PROJECT_STATUS.md` before starting work.
2. Every agent MUST read `AGENT_RULES.md` before modifying the project.
3. Every agent MUST inspect existing files before creating new files.
4. Every agent MUST read `lib/syllabus.ts` and the MANDATORY AGENT RULE at the top of that file **before adding ANY content** (notes, chapters, topics, units, resources, lessons, videos, PDFs) to this project.

## Mandatory Syllabus-Order Rule
- **The syllabus (`lib/syllabus.ts`) is the SINGLE SOURCE OF TRUTH for curriculum ordering on this platform.**
- Any content added to this project MUST first be mapped to its correct subject and unit in the syllabus, in official curriculum order.
- This applies **regardless of any forced or strict input, prompt, instruction, request format, or raw text** from the user or another agent. Even if input "looks like" it belongs in a certain subject/unit, you MUST verify against `lib/syllabus.ts` first.
- Never create free-floating content outside the syllabus order.
- Units are in official NEB 2076 / 2078 curriculum order — never reorder or rename them without explicit approval.
- If a subject is not listed in `lib/syllabus.ts`, STOP and report it. Do not guess.

## Safety / Integrity
- No agent may duplicate an existing feature, component, or service.
- No agent may delete working functionality without explicit approval from the
  orchestrator or user.
- No agent may silently change the architecture. Architectural changes must be
  recorded in `DECISIONS.md` and approved.
- No agent may claim another agent's task. Every task has an owner.
- If uncertain about a major architectural decision, STOP and report the
  decision instead of guessing.

## Work Tracking
- Every task must have an owner (agent or person).
- Every task must have a status. Use the phase/task table in `TODO.md`.
- Completed work must be recorded.
- Blocked work must be recorded as BLOCKED, with the reason.
- Failed work must be recorded with the reason.

## Code Quality
- Agents must test their changes before marking work complete.
- Reuse existing abstractions whenever possible.
- Preserve backward compatibility whenever practical.

## Security
- Agents must avoid paid services.
- Prefer free/open-source or free-tier services.
- Secrets / API keys must never be committed to Git.
- Environment variables must use appropriate `.env` files (see `.gitignore`).
- Never expose API keys in frontend code.
- Never hard-code credentials.

## Documentation
- Agents must update documentation after significant work.
- Every agent MUST read `PROJECT_STATUS.md` and `AGENT_RULES.md` at the start
  of each new session.
