#!/bin/bash
# agents.sh — defines WHO does WHAT, and WHO covers for whom if absent.
#
# Each role has an ordered fallback chain: "name:binary name:binary ..."
# pick_available_agent() walks the chain and returns the first agent
# whose CLI binary is actually installed (`command -v` check).
#
# >>> EDIT THE RIGHT-HAND "binary" NAMES to match your real installs. <<<
# claude, kilo, cline, agnes are real installed CLI names.
#
# NOTE (2026-08-31): the judge/planner/generator roles all execute through
# `omniroute chat` (binary: omniroute) rather than their native CLIs because
# the native CLIs are unreliable programmatically on this Windows setup:
#   - `claude -p` truncates prompts to their first word with the custom
#     rider77 combo model (verified in omniroute's upstream call logs)
#   - `vibe -p` hangs in non-TTY mode (never writes output) — it's a
#     vibe-on-Windows limitation
#   - `bigpickle`, `codestral` remain placeholders (no real install)
# OmnIRoute reliably serves the same model family for each role, so the
# role semantics are preserved.
#
# NOTE: The verifier rule file (rules/verifier.md) designates agnes as the
# verifier agent with no fallback. To preserve that single-agent design
# while fixing agnes's lack of file tools, the agnes run_agent case below
# inlines the contents of any files named in the task (via
# collect_task_file_contents()) so agnes verifies real content with real
# line numbers instead of fabricating findings.

declare -A ROLE_CHAIN=(
  [planner]="claude:omniroute bigpickle:bigpickle"
  [implementer]="kilocode:kilo cline:cline"
  [generator]="mistral:omniroute codestral:codestral"
    [verifier]="agnes:agnes"
)

# Returns the name of the first available agent for a role, or "" if none.
pick_available_agent() {
  local role="$1"
  local chain="${ROLE_CHAIN[$role]}"
  for pair in $chain; do
    local name="${pair%%:*}"
    local bin="${pair##*:}"
    if command -v "$bin" >/dev/null 2>&1; then
      echo "$name"
      return 0
    fi
  done
  echo ""
}

# Asks the agent's own rules whether this task is in scope. YES/NO only.
#
# Judge: omniroute (direct) is primary. claude.exe's -p mode truncates prompts
# to their first word with unrecognized custom models (verified 2026-08-31),
# so it's only a fallback if omniroute is down.
# JUDGE_MODEL env var overrides the default (fast API-backed model).
check_scope() {
  local agent="$1" role="$2" task="$3"
  local rulesfile="$DIR/rules/${role}.md"
  local rules
  rules=$(cat "$rulesfile" 2>/dev/null || echo "No rules defined.")

  local model="${JUDGE_MODEL:-mistral/mistral-medium-3.5}"
  local prompt="Rules for role '$role' (agent: $agent):
$rules

Task: $task

Does this task fall inside these rules? Answer with exactly one word: YES or NO."

  local verdict=""
  if command -v omniroute >/dev/null 2>&1; then
    verdict=$(timeout 60 omniroute chat -q --timeout 45000 --model "$model" "$prompt" 2>/dev/null || true)
  fi
  if [ -z "$verdict" ] && command -v claude >/dev/null 2>&1; then
    verdict=$(timeout 60 claude -p "$prompt" --output-format text 2>/dev/null || true)
  fi

  # Extract the verdict from anywhere in the reply, not just the first char.
  local answer
  answer=$(printf '%s' "$verdict" | tr -d '\r' | grep -oiw 'yes\|no' 2>/dev/null | head -n1 | tr '[:lower:]' '[:upper:]')
  if [ "$answer" = "YES" ]; then
    echo "YES"
  else
    echo "NO"
  fi
}

# Inlines the contents of any files referenced in the task, so prompt-only
# agents (agnes) verify against real content instead of fabricating findings.
collect_task_file_contents() {
  local task="$1" out="" repo
  repo="$(cd "$DIR/.." && pwd)"
  local rel f
  for rel in $(printf '%s' "$task" | grep -oE '\b[A-Za-z0-9_./-]+\.(md|env\.example|env|json|ts|js|tsx|jsx|yml|yaml|sh|txt)\b' | sort -u); do
    for f in "$repo/$rel" "$rel" "./$rel"; do
      if [ -f "$f" ]; then
        out="$out

--- FILE: $rel ---
$(cat "$f")"
        break
      fi
    done
  done
  printf '%s' "$out"
}

# Actually runs the chosen agent on the task. Customize each case to match
# the real CLI syntax of that tool.
run_agent() {
  local agent="$1" role="$2" task="$3"
  local rulesfile="$DIR/rules/${role}.md"
  local rules
  rules=$(cat "$rulesfile" 2>/dev/null || echo "")

  case "$agent" in
    claude)
      # claude.exe -p is broken with custom combo models (prompt truncated to
      # first word) — route the planner through omniroute chat instead, which
      # serves the same rider77 combo the claude config points at.
      if command -v omniroute >/dev/null 2>&1; then
        timeout 300 omniroute chat -q --timeout 280000 --model "${JUDGE_MODEL:-mistral/mistral-medium-3.5}" "$rules

Task: $task"
      else
        claude -p "$rules

Task: $task" --dangerously-skip-permissions
      fi
      ;;
    bigpickle)
      bigpickle run --prompt "$rules

Task: $task"
      ;;
    kilocode)
      # kilo run takes the prompt as a positional message (no --task/--rules flags).
      # --auto auto-approves permissions so headless/CI runs can write files.
      timeout 600 kilo run --auto "$rules

Task: $task"
      ;;
    cline)
      timeout 600 cline --headless --prompt "$rules

Task: $task"
      ;;
    mistral)
      # native `vibe` CLI hangs in non-TTY mode on Windows — route through
      # omniroute's codestral (mistral family) instead. Tries vibe first
      # only if omniroute is absent.
      if command -v omniroute >/dev/null 2>&1; then
        timeout 300 omniroute chat -q --timeout 280000 --model "${GENERATOR_MODEL:-mistral/codestral-latest}" "$rules

Task: $task"
      else
        timeout 120 vibe -p "$rules

Task: $task" --output text --auto-approve --max-turns 10 2>/dev/null || true
      fi
      ;;
    codestral)
      codestral complete --prompt "$rules

Task: $task"
      ;;
    agnes)
      # agnes is a one-shot chat completion with NO file-access tools — if
      # it only gets a task description it fabricates plausible findings.
      # Inline the contents of any files named in the task so it verifies
      # real content (actual line numbers will reference real text).
      local filesctx
      filesctx=$(collect_task_file_contents "$task")
             timeout 200 agnes text chat --prompt "$rules

Task: $task

Relevant file contents to verify against:
$filesctx"
      ;;
    *)
      echo "Unknown agent: $agent" >&2
      return 1
      ;;
  esac
}
