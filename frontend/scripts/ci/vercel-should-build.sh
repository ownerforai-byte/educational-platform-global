#!/usr/bin/env sh
# Vercel Ignored Build Step (exit 0 = skip, exit 1 = build).
# Root Directory is `frontend`; paths below are from the monorepo git root.
case "$VERCEL_GIT_COMMIT_REF" in
  dependabot/*) exit 0 ;;
esac
git diff --quiet HEAD^ HEAD -- frontend packages/shared .well-known
if [ $? -eq 0 ]; then
  exit 0
fi
exit 1