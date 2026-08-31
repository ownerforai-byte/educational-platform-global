#!/bin/bash
# agents.sh — defines WHO does WHAT, and WHO covers for whom if absent.
#
# Each role has an ordered fallback chain: "name:binary name:binary ..."
# pick_available_agent() walks the chain and returns the first agent
# whose CLI binary is actually installed (`command -v` check).
#
# >>> EDIT THE RIGHT-HAND "binary" NAMES to match your real installs. <<<
# claude, kilo, cline, vibe (Mistral Vibe) are real installed CLI names.
# codestral remains a placeholder — swap in whatever command actually
# launches it on your machine (or a wrapper script you write around its API).

declare -A ROLE_CHAIN=(
  [planner]="claude:claude bigpickle:bigpickle"
  [implementer]="kilocode:kilo cline:cline"
  [generator]="mistral:vibe codestral:codestral"
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
  answer=$(printf '%s' "$verdict" | tr -d '\r' | grep -oiE '\b(yes|no)\b' 2>/dev/null | head -n1 | tr '[:lower:]' '[:upper:]')
  if [ "$answer" = "YES" ]; then
    echo "YES"
  else
    echo "NO"
  fi
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
      # kilo run takes the prompt as a positional message (no --task/--rules flags)
      kilo run "$rules

Task: $task"
      ;;
    cline)
      cline --headless --prompt "$rules

Task: $task"
      ;;
    mistral)
      # real binary is `vibe` (Mistral Vibe CLI); -p = programmatic one-shot mode
      vibe -p "$rules

Task: $task" --output text --auto-approve
      ;;
    codestral)
      codestral complete --prompt "$rules

Task: $task"
      ;;
    agnes)
      # real agnes CLI: one-shot chat via `agnes text chat --prompt` (no `test` command)
      agnes text chat --prompt "$rules

Task: $task"
      ;;
    *)
      echo "Unknown agent: $agent" >&2
      return 1
      ;;
  esac
}
