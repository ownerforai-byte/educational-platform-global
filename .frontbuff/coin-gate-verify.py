#!/usr/bin/env python3
import os, subprocess, sys, re


def grep_count(pattern, roots, exts=(".tsx", ".ts")):
    """Cross-platform replacement for the old shell-based grep+wc pipeline.

    Pure-Python (no shell execution, clears the BAN-B602 security finding) and
    works on Windows where `grep` is unavailable. Handles mixed file/dir roots.
    Returns (match_count, 0).
    """
    rx = re.compile(pattern)
    count = 0
    for r in roots:
        if os.path.isfile(r):
            candidates = [r]
        elif os.path.isdir(r):
            candidates = []
            for dirpath, _dirs, files in os.walk(r):
                candidates.extend(os.path.join(dirpath, f) for f in files)
        else:
            continue
        for path in candidates:
            if not any(path.endswith(e) for e in exts):
                continue
            try:
                with open(path, encoding="utf-8", errors="ignore") as fh:
                    for _line in fh:
                        if rx.search(_line):
                            count += 1
            except OSError:
                pass
    return count, 0

R = ".frontbuff/coin-gate-verify-report.txt"
lines = []

# --- Step 6: render files must not reintroduce old phrases ---
lines.append("=== 6. render files must NOT reintroduce the removed phrases ===")
p6 = [
    "Free mode — the coin gate is OFF",
    "Free mode — no coins needed",
    "Free mode — no credits needed",
    "Coin gate is OFF for owner emails",
    "ON .* Coins Required",
    "OFF .* Free Mode",
    "Coin gate ENABLED",
    "Coin gate DISABLED",
    "Currently ON: owners pay",
    "Currently OFF: owners free",
    "chat FREE with no coin ask",
    "OFF: every owner email chats FREE",
    "free mode — no coins needed",
    "free mode — no credits needed",
    "coin gate is OFF for owner emails",
    "OFF for owner emails",
]
files6 = [
    "frontend/components",
    "frontend/features/credits/index.ts",
    "frontend/features/credits/route-gate.tsx",
    "frontend/app",
    "frontend/features",
]
for p in p6:
    out, _rc = grep_count(p, files6)
    lines.append(f"'{p}' -> {out}")

# --- Step 7a: diff of edited files is clean of old text ---
lines.append("")
lines.append("=== 7a. diff of edited files is clean of old text ===")
diff_files = [
    "frontend/components/ai/tutor-console.tsx",
    "frontend/components/ai/ai-chat-interface.tsx",
    "frontend/components/ai/ai-plan-strip.tsx",
    "frontend/app/(app)/profile/page.tsx",
    "frontend/app/owner/settings/page.tsx",
    "frontend/features/credits/route-gate.tsx",
    "frontend/features/credits/index.ts",
    "frontend/features/credits/coin-gate-dot.tsx",
]
diff_cmd = ["git", "diff", "--"] + diff_files
p = subprocess.run(diff_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
diff_log = p.stdout
diff_rc = p.returncode
lines.append(f"DIFF_EXIT={diff_rc}")
p7 = [
    "the coin gate is OFF for owner emails",
    "Coin gate is OFF for owner emails",
    "OFF — free",
    "ON .* Coins Required",
    "OFF .* Free Mode",
    ".- asking for coins",
    ".- free",
    "Coin gate OFF",
    "Coin gate ON",
]
for pat in p7:
    if re.search(pat, diff_log):
        lines.append(f"FAIL: diff contains '{pat}'")
    else:
        lines.append(f"OK: diff clean of '{pat}'")

# --- Step 7b: targeted test suite run ---
lines.append("")
lines.append("=== 7b. targeted test suite run (exit status preserved) ===")
tests_cmd = [
    "npx", "vitest", "run",
    "tests/features/coin-gate-library.test.tsx",
    "tests/components/profile/profile-page.test.tsx",
]
p = subprocess.run(tests_cmd, cwd="frontend", stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=180)
tests_rc = p.returncode
lines.append(f"TESTS_EXIT={tests_rc}")
lines.append("")
tail_lines = p.stdout.splitlines()[-4:] if p.stdout else []
lines.extend(tail_lines)

lines.append("")
lines.append(f"verify_exit=diff={diff_rc} tests={tests_rc}")

report = "\n".join(lines) + "\n"
with open(R, "w", encoding="utf-8") as f:
    f.write(report)
print(report, end="")

sys.exit(0 if (diff_rc == 0 and tests_rc == 0) else 1)
