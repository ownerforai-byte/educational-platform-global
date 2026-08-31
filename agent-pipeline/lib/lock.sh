#!/bin/bash
# lock.sh — ensures only ONE agent runs at a time, no matter which role.
# Any agent must acquire this lock before writing/executing anything,
# and release it immediately after. Others simply wait their turn.
#
# Primary:  flock (Linux/WSL/CI) — kernel-enforced, auto-released when the
#           holding process dies.
# Fallback: mkdir-based lock — mkdir is atomic on virtually every filesystem
#           (two processes can't both succeed at creating the same directory),
#           so it works as a lock without flock. Used automatically when the
#           flock command is missing (e.g. Git Bash on Windows).
#           Because a mkdir lock is NOT auto-released on process death, the
#           fallback records the holder's PID and steals the lock if that
#           process is gone (stale-lock recovery).

LOCKFILE="${LOCKFILE:-/tmp/agent-pipeline.lock}"
LOCKDIR="${LOCKDIR:-/tmp/agent-pipeline.lockdir}"
LOCK_TIMEOUT="${LOCK_TIMEOUT:-300}"

# ---------- flock method (primary) ----------
acquire_lock_flock() {
  exec 200>"$LOCKFILE"
  echo "[lock] waiting for lock (fd 200 -> $LOCKFILE)..."
  if flock -w "$LOCK_TIMEOUT" 200; then
    echo "[lock] acquired by PID $$"
  else
    echo "[lock] TIMEOUT after ${LOCK_TIMEOUT}s waiting — aborting this step"
    exit 1
  fi
}

release_lock_flock() {
  flock -u 200 2>/dev/null || true
  echo "[lock] released by PID $$"
}

# ---------- mkdir method (fallback, e.g. Git Bash on Windows) ----------
acquire_lock_mkdir() {
  echo "[lock] waiting for lock (mkdir -> $LOCKDIR)..."
  local waited=0
  while true; do
    if mkdir "$LOCKDIR" 2>/dev/null; then
      echo "$$" > "$LOCKDIR/pid"
      echo "[lock] acquired by PID $$ (mkdir method)"
      return 0
    fi

    # Stale-lock recovery: if the holder recorded a PID and that process
    # no longer exists, the lock was abandoned — steal it and retry.
    local holder
    holder=$(cat "$LOCKDIR/pid" 2>/dev/null || true)
    if [ -n "$holder" ] && ! kill -0 "$holder" 2>/dev/null; then
      echo "[lock] stale lock from dead PID $holder — stealing it"
      rm -rf "$LOCKDIR"
      continue
    fi

    if [ "$waited" -ge "$LOCK_TIMEOUT" ]; then
      echo "[lock] TIMEOUT after ${LOCK_TIMEOUT}s waiting — aborting this step"
      exit 1
    fi
    sleep 1
    waited=$((waited + 1))
  done
}

release_lock_mkdir() {
  rm -rf "$LOCKDIR" 2>/dev/null || true
  echo "[lock] released by PID $$"
}

# ---------- dispatcher: pick the best method available on this system ----------
if command -v flock >/dev/null 2>&1; then
  acquire_lock() { acquire_lock_flock "$@"; }
  release_lock() { release_lock_flock "$@"; }
else
  acquire_lock() { acquire_lock_mkdir "$@"; }
  release_lock() { release_lock_mkdir "$@"; }
fi

