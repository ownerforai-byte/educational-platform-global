#!/bin/bash
# entry.sh — shared front-door for every agent binary.
#
# The OBSERVER's standing rule: a prompt typed into ANY agent CLI must
# activate the WHOLE pipeline (all three agents work per their rules),
# not just that one agent.
#
# Usage (from any wrapper, e.g. bin/kilo):
#   ROUTER_ENTRY_VIA=kilo bin/entry.sh "your task words..."
#
# What happens:
#   1. Builds a single task string from all args.
#   2. Hands it to ../router.sh (planner -> implementer -> generator ->
#      verifier), which scope-gates each role and runs whichever apply,
#      exactly per rules/<role>.md and rules/overseer.md.
#   3. Every decision lands in logs/router.log + per-agent output files.

set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIR="$(cd "$HERE/.." && pwd)"
ENTRY_VIA="${ROUTER_ENTRY_VIA:-$(basename "$0")}"

# Join all args into exactly one task string (space-separated, as-is).
TASK="$*"
if [ -z "${TASK// }" ]; then
  echo "FATAL: empty task — give a prompt after the command." >&2
  echo "Usage: $0 \"task description\"" >&2
  exit 2
fi

echo "[entry] prompt received via '$ENTRY_VIA' -> routing through the full pipeline"
exec "$DIR/router.sh" "$TASK"