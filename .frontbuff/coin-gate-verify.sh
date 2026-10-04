#!/bin/bash
set -o pipefail
R=".frontbuff/coin-gate-verify-report.txt"
exec > "$R" 2>&1

echo "=== 6. render files must NOT reintroduce the removed phrases ==="
P6=("Free mode . the coin gate is OFF" "Free mode . no coins needed" "Free mode . no credits needed" "Coin gate is OFF for owner emails" "ON .* Coins Required" "OFF .* Free Mode" "Coin gate ENABLED" "Coin gate DISABLED" "Currently ON: owners pay" "Currently OFF: owners free" "chat FREE with no coin ask" "OFF: every owner email chats FREE" "free mode . no coins needed" "free mode . no credits needed" "coin gate is OFF for owner emails" "OFF for owner emails")
for p in "${P6[@]}"; do
  printf "'%s' -> %s\n" "$p" "$(grep -rE "$p" frontend/components frontend/features/credits/index.ts frontend/features/credits/route-gate.tsx frontend/app frontend/features --include='*.tsx' --include='*.ts 2>/dev/null | wc -l)"
done

echo ""
echo "=== 7a. diff of edited files is clean of old text ==="
git diff -- \
  frontend/components/ai/tutor-console.tsx \
  frontend/components/ai/ai-chat-interface.tsx \
  frontend/components/ai/ai-plan-strip.tsx \
  "frontend/app/(app)/profile/page.tsx" \
  frontend/app/owner/settings/page.tsx \
  frontend/features/credits/route-gate.tsx \
  frontend/features/credits/index.ts \
  frontend/features/credits/coin-gate-dot.tsx \
  > .freebuff-coin-gate-diff.log 2>&1
DIFF_EXIT=$?
printf "DIFF_EXIT=%s\n" "$DIFF_EXIT"
P7=("the coin gate is OFF for owner emails" "Coin gate is OFF for owner emails" "OFF -- free" "ON .* Coins Required" "OFF .* Free Mode" ".- asking for coins" ".- free" "Coin gate OFF" "Coin gate ON")
for p in "${P7[@]}"; do
  if grep -qE "$p" .freebuff-coin-gate-diff.log 2>/dev/null; then
    printf "FAIL: diff contains '%s'\n" "$p"
  else
    printf "OK: diff clean of '%s'\n" "$p"
  fi
done

echo ""
echo "=== 7b. targeted test suite run (exit status preserved) ==="
cd frontend && npx vitest run tests/features/coin-gate-library.test.tsx tests/components/profile/profile-page.test.tsx > .freebuff/coin-gate-ci.log 2>&1
TESTS_EXIT=$?
printf "TESTS_EXIT=%s\n" "$TESTS_EXIT"
tail -4 .freebuff/coin-gate-ci.log

echo ""
printf "verify_exit=diff=%s tests=%s\n" "$DIFF_EXIT" "$TESTS_EXIT"
