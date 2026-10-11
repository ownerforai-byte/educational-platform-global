# Feature Plan: Organized, OCR-First AI Study Experience

Task type: `feature:` across the `feature/ai-chat` frontend worktree and the isolated `backend/ai-answer-quality` retrieval/answer-quality worktree. `test:` checks are local to each worktree. No commit, push, branch merge, deployment, or Vercel action is included.

## Goal
Make Veer’s academic replies concise but high-information and source-grounded: retrieve matching local textbook OCR first, then use optional credible web results to corroborate or supplement; present dates, concepts, classifications, comparisons, tables, trees, equations, or real figures only when they clarify the asked topic. Make the prompt suggestions compact, varied, subject-relevant, and rotating. Make the global welcome formal and remove its casual sign-off.

## Worktree boundaries
- **Frontend — `feature/ai-chat`**: `frontend/components/ai/tutor-console.tsx`, `frontend/components/ai/ai-chat-interface.tsx`, `frontend/components/layout/site-welcome.tsx`, and focused frontend tests. Preserve the pre-existing `frontend/components/ai/ai-chat-interface.tsx` changes; that component belongs to another active edit, so avoid overlapping hunks unless the owner approves.
- **Backend — `backend/ai-answer-quality`**: `backend/src/ai/**`, `backend/src/api/ai-stream.ts`, and focused backend tests. Do not modify the already occupied/dirty `backend/ai-api` worktree.
- The active root checkout has unrelated changes to hundreds of content files. Leave them untouched; this plan is its only intended edit. Do not delete files merely because they appear messy; prove a file is dead and keep any removal within scope.
- Keep the existing dirty [frontend/components/ai/ai-chat-interface.tsx](../rn-worktrees/ai-chat-ui/frontend/components/ai/ai-chat-interface.tsx) changes under `feature/ai-chat` and the backend retrieval/prompt/answer/test diffs under `backend/ai-answer-quality`; do not copy their changes into the active unrelated root branch. The plan is the handoff point between isolated worktrees, not a merge.

## Plan / implementation
1. Preserve the established lexical relevance and coverage checks. Verify that relevant local book OCR is selected ahead of general curriculum material and identified as OCR evidence; never imply OCR is infallible.
2. Finish local curriculum/OCR retrieval before initiating optional live web search. Tell the model to use OCR as the primary textbook evidence and web as a secondary check/supplement; resolve or flag disagreements and never fabricate citations or image URLs.
3. Remove mandatory answer word-count expansion while retaining truncation repair. Prefer concise, direct answers with essential explanation; retain complete proof/numerical working. Choose tables, timelines/dates, concept trees/classifications, diagrams/figures and callouts only when they explain relationships, sequences, comparisons or visual structure. Do not force extra images, dates, or boxes into unrelated answers.
4. Expand subject/mode-specific starter pools and select a useful varied deck (at least 8 where the pool supports it); prevent duplicate prompts across displayed cards and successive rotations. Keep SSR's first render deterministic. Reduce padding and text sizing only enough to show more legible cards in a responsive grid.
5. Replace the informal global welcome copy with concise professional wording and no informal closing sentence.
6. Add regression tests for rotating prompt deck variety/uniqueness/size and the OCR-first/optional-web-after-local retrieval contract. Run focused tests and scoped checks separately in the backend and UI worktrees. Review the actual changed hunks. Do not deploy or publish to Vercel.

## Acceptance criteria
- When a matching OCR book record exists, the attached local book evidence precedes general/curated records without weakening the existing coverage gate; OCR is clearly treated as transcribed evidence.
- Local corpus retrieval happens before web lookup begins. Web is explicitly secondary; disagreement is disclosed and source/image claims are not invented.
- Brief factual/definition/casual answers are not expanded solely to meet a fixed word floor. Necessary derivation and calculation steps remain required. The answer may use high-value structured elements (short boxes, tables, dates, equations, trees, classifications, or genuine figures) when they serve the particular question, not as mandatory decoration.
- Both chat UIs select at least 8 distinct relevant prompts per academic mode when available, rotate them, and show compact, readable, responsive cards. General mode also exposes subject variety. Server/client initial render remains deterministic.
- Welcome text is formal and concise, with the casual final sentence removed.
- Focused tests cover prompt content/order, no-floor answer behavior, deck size/uniqueness/rotation, and welcome copy. Backend/frontend typecheck and relevant tests pass, or blockers and failed checks are reported accurately.
- No unrelated content data is deleted or edited; no unproven “cleanup” deletion.

## Constraints / out of scope
- No new service, API key, or dependency is needed.
- No editing, merging, or pushing the other dirty backend AI worktree; no touching/deleting the root checkout’s unrelated dirty content.
- No branch push, commit, deployment, preview deployment, or production action. Vercel-specific verification remains for the user’s later branch preview.
