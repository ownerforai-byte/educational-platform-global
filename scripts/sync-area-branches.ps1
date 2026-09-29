# sync-area-branches.ps1
# Fast-forwards every area branch (the 48 branches in BRANCHES.md §2) to the
# current tip of `main`, inside its own worktree. Reserved branches
# (agents/*, claude/*, worktree/*, cline/*) are never touched.
#
# Usage (from the main worktree):
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/sync-area-branches.ps1
#
# Each area branch is checked out in its own worktree under rn.worktrees/,
# so the fast-forward is done with `git -C <worktree> merge --ff-only main`.
# Safe by construction: ff-only never rewrites history and refuses if the
# branch has drifted ahead of main (then merge it back to main first).

$ErrorActionPreference = "Continue"

$mainWorktree = git rev-parse --show-toplevel
if (-not $mainWorktree) { Write-Error "run from inside the main worktree"; exit 1 }

$worktrees = git worktree list --porcelain |
  Select-String -Pattern "^worktree " |
  ForEach-Object { $_.Line.Substring(9) }

$reserved = @("agents/", "claude/", "worktree/", "cline/")
$ok = 0; $skip = 0; $fail = 0

foreach ($wt in $worktrees) {
  $branch = git -C $wt rev-parse --abbrev-ref HEAD 2>$null
  if (-not $branch) { continue }
  if ($reserved | Where-Object { $branch.StartsWith($_) }) {
    Write-Output "skip (reserved): $branch"
    $skip++
    continue
  }
  if ($branch -eq "main") { continue }

  $before = git -C $wt rev-parse --short HEAD 2>$null
  $out = & cmd /c "git -C `"$wt`" merge --ff-only main 2>&1"
  if ($LASTEXITCODE -eq 0) {
    $after = git -C $wt rev-parse --short HEAD 2>$null
    Write-Output "ok:   $branch  $before -> $after"
    $ok++
  } else {
    Write-Output "FAIL: $branch  ($($out -join ' '))"
    $fail++
  }
}

Write-Output "synced=$ok skipped=$skip failed=$fail"
