# One-off: push every area branch to origin after a main sync.
# Mirrors scripts/sync-area-branches.ps1 - reserved branches (agents/*, claude/*,
# worktree/*, cline/*) are never pushed. Every push is a plain ff fast-forward
# of the local branch, so nothing can be force-written.

$ErrorActionPreference = "Continue"
$reserved = '^(agents|claude|worktree|cline)/'

$branches = git for-each-ref --format='%(refname:short)' refs/heads |
  Where-Object { $_ -notmatch $reserved }

$ok = 0; $fail = 0; $skip = 0
foreach ($b in $branches) {
  $out = git push origin $b 2>&1
  if ($LASTEXITCODE -eq 0) {
    $ok++
    Write-Output "ok:   $b"
  } else {
    $fail++
    Write-Output "FAIL: $b -> $out"
  }
}

# Reserved branches that exist locally, reported for awareness only.
$res = git for-each-ref --format='%(refname:short)' refs/heads |
  Where-Object { $_ -match $reserved }
foreach ($r in $res) { Write-Output "skip (reserved): $r"; $skip++ }

Write-Output "pushed=$ok skipped=$skip failed=$fail"
