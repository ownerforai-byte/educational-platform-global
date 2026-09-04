#!/bin/bash
# router.sh — the orchestrator.
#
# Usage:
#   ./router.sh "Add a dark mode toggle to the settings page"
#
# What happens:
#   1. Walks each role in pipeline order: planner -> implementer -> generator -> verifier
#   2. For each role, acquires the global lock (only one agent works at a time)
#   3. Picks the first AVAILABLE agent for that role (fallback if primary is missing)
#   4. Asks that agent's own rules: is this task in scope? (YES/NO)
#   5. If YES: runs it, logs output, releases lock, moves to next role
#      If NO or no agent available: skips that role, releases lock, moves on
#
# Wire this to a trigger (cron, file watcher, git hook) instead of running
# it by hand once you're happy with the behavior.

set -uo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$DIR/lib/lock.sh"
source "$DIR/lib/agents.sh"

TASK="${1:?Usage: ./router.sh \"task description\"}"
LOGDIR="$DIR/logs"
mkdir -p "$LOGDIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ROUTERLOG="$LOGDIR/router.log"

echo "=== [$TIMESTAMP] New task: $TASK ===" | tee -a "$ROUTERLOG"

ROLES=(planner implementer generator verifier)

for ROLE in "${ROLES[@]}"; do
  acquire_lock

  AGENT=$(pick_available_agent "$ROLE")
  if [ -z "$AGENT" ]; then
    echo "[$ROLE] no agent available (all offline) — skipping" | tee -a "$ROUTERLOG"
    release_lock
    continue
  fi

  IN_SCOPE=$(check_scope "$AGENT" "$ROLE" "$TASK")
  if [ "$IN_SCOPE" != "YES" ]; then
    echo "[$ROLE:$AGENT] out of scope for this task — skipping" | tee -a "$ROUTERLOG"
    release_lock
    continue
  fi

  echo "[$ROLE:$AGENT] activated" | tee -a "$ROUTERLOG"
  OUTFILE="$LOGDIR/${TIMESTAMP}_${ROLE}_${AGENT}.log"
  run_agent "$AGENT" "$ROLE" "$TASK" > "$OUTFILE" 2>&1
  STATUS=$?

  release_lock

  if [ "$STATUS" -ne 0 ]; then
    echo "[$ROLE:$AGENT] FAILED (exit $STATUS) — see $OUTFILE" | tee -a "$ROUTERLOG"
  else
    echo "[$ROLE:$AGENT] done — output in $OUTFILE" | tee -a "$ROUTERLOG"
  fi
done

echo "=== Task complete: $TASK ===" | tee -a "$ROUTERLOG"
