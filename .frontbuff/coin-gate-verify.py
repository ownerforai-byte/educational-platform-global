#!/usr/bin/env python3
import subprocess, sys, re, os

def sh(cmd):
    p = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return p.stdout, p.stderr, p.returncode

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
    out, err, rc = sh(
        f"grep -rE {p!r} {' '.join(files6)} --include='*.tsx' --include='*.ts 2>/dev/null | wc -l"
    )
    lines.append(f"'{p}' -> {out.strip()}")

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
