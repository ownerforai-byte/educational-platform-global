# Upgrade Guide for Educational Platform

*Last Updated: Auto-generated from repository analysis*

This guide helps community contributors safely upgrade dependencies and infrastructure components.

---

## 1. Overview

| Component | Current Version | Source of Truth |
|-----------|-----------------|-----------------|
| Node.js | `>=22` | Root `package.json` engines |
| npm | `10.8.2` | `packageManager` field in root `package.json` |
| Next.js (frontend) | `^16.4.5` | `frontend/package.json` |
| React | `^19.2.8` | `frontend/package.json` |
| Express (backend) | `^5.3.0` | `backend/package.json` |
| TypeScript | `^5.9.3` | Both frontend and backend |
| Firebase Functions Runtime | `nodejs24` | `firebase/firebase.json` |

---

## 2. Upgrade Blockers Fixed (Current Session)

### 2.1 Documentation Corrections

| File | Fixed Issue |
|------|-------------|
| `README.md` | Changed "Express 4" → "Express 5" (line 27) |
| `README.md` | Changed prerequisites "Node 24+, npm 11+" → "Node 22+, npm 10.8+" |
| `docs/guides/DEPLOYMENT.md` | Changed Node version 20+ → 22+ (lines 19, 51) |
| `docs/guides/DEPLOYMENT.md` | Fixed migration path from `backend/supabase/migrations/` to `backend/src/db/migrations/` |
| `docs/guides/DEPLOYMENT.md` | Fixed migration commands from Supabase CLI to npm scripts |

### 2.2 Security Vulnerabilities Addressed

| Issue | Fix Applied |
|-------|-------------|
| `@grpc/grpc-js` HIGH severity (GHSA-m9gg-hp2v-232j, GHSA-f596-whhp-79r4) | Added override to `^1.14.7` in root `package.json` |
| `uuid` Moderate severity | Transitive deps updated to latest (via overrides) |
| `firebase-admin` outdated | Upgraded from `^13.10.0` → `^14.5.1` |
| `firebase/functions` runtime | Upgraded from `nodejs22` → `nodejs24` |

### 2.3 Dependencies Upgraded

**Root `package.json` overrides added/updated:**
```json
{
  "@grpc/grpc-js": "^1.14.7",
  "body-parser": "1.20.9",
  "qs": "6.17.1",
  "glob": "14.0.3",
  "minimatch": "11.0.3",
  "source-map-js": "1.2.2",
  "vite": "8.3.5",
  "@sentry/node": "11.10.0",
  "undici": "^6.21.3",
  "sharp": "0.35.5",
  "postcss-selector-parser": "6.1.5",
  "katex": "^0.19.1",
  "google-gax": "5.0.8",
  "retry-request": "8.0.2",
  "teeny-request": "10.1.4",
  "gaxios": "8.3.3",
  "uuid": "11.1.1"
}
```

**Backend `package.json`:**
- `firebase-admin`: `^13.10.0` → `^14.5.1`

**Firebase `firebase.json`:**
- Both function codebases (`functions-api` and `functions-bot`): `nodejs22` → `nodejs24`

---

## 3. Current Security Status

### Clean (No Action Needed)
- ✅ **Next.js 16.x** - No known vulnerabilities in the 16.x line
- ✅ **React 19.x** - Latest stable version
- ✅ **Express 5.x** - Latest stable version

### Addressed in This Session
- ✅ **firebase@11.10.0 @grpc/grpc-js transitive dependency** - Fixed via overrides
- ✅ **firebase-admin@13 → 14** - Major version upgrade
- ✅ **uuid transitive dependency** - Fixed via overrides chain

---

## 4. How to Upgrade Dependencies

### 4.1 Minor/Patch Updates (Automated)

Dependabot handles these weekly:
```yaml
# .github/dependabot.yml
groups:
  minor-patch:
    patterns: ["*"]
    update-types: ["minor", "patch"]
```

### 4.2 Major Updates (Manual)

Major updates listed in `.github/dependabot.yml` require manual intervention:
- `next`, `react`, `@types/react`
- `vitest`, `@vitest/*`
- `typescript`, `@types/node`

#### Process for Major Updates

1. **Check the changelog** of the dependency
2. **Dry-run the upgrade:**
   ```bash
   npm i <package>@latest --dry-run
   ```
3. **Update the package:**
   ```bash
   cd frontend && npm i next@latest
   # or
   cd backend && npm i express@latest
   ```
4. **Run typecheck:**
   ```bash
   npm run check
   ```
5. **Run tests:**
   ```bash
   npm run test:affected
   ```
6. **Full validation before commit:**
   ```bash
   npm run check:all
   ```

### 4.3 Security-Only Updates

For security advisories:
```bash
# Check current status
npm audit

# Review the audit report carefully
npm audit --json | node scripts/parse-audit.mjs

# Apply fixes (flags to avoid breaking changes)
npm audit fix --package-lock-only --dry-run

# If overrides are needed, add to root package.json
```

#### Security Override Pattern

When a transitive dependency has a vulnerability, add to root `overrides`:

```json
{
  "overrides": {
    "<vulnerable-package>": "^<fixed-version>"
  }
}
```

Then run `npm install` to update the lock file.

---

## 5. Environment & Infrastructure

### 5.1 Node.js Version

Current requirement: **Node.js >= 22**

The repository specifies this in:
- Root `package.json` `engines.node`
- `.github/workflows/*.yml` (CI uses Node 22)
- `firebase/functions/package.json` (also specifies `>=22`)

### 5.2 Firebase Functions Runtime

Current runtime: **nodejs24**

Updated in `firebase/firebase.json` (both codebases).

**Note:** `nodejs24` runtime was deployed. Monitor for any cold-start latency changes or compatibility issues.

---

## 6. CI/CD Considerations

### 6.1 Pre-Commit Checks

Always run before committing dependency changes:
```bash
npm run check       # Scoped check (changed areas only)
npm run check:all   # Full gate (required before push to main)
```

### 6.2 Dependency Installation

Use the workspace root:
```bash
# DON'T: cd frontend && npm install
# DO:
npm install         # Installs and links all workspaces
```

### 6.3 Lockfile

- Only one `package-lock.json` at root
- Do not commit workspace-level lockfiles
- Run `npm install` after any package.json change to update the lockfile

---

## 7. Known Issues & Workarounds

### 7.1 Deprecated `@cloudflare/next-on-pages`

**Status:** The package is deprecated but **not actively used** in the codebase according to current manifests.

References in `PROJECT_STATUS.md` and `repomix-output.xml` are historical. Current build uses Vercel.

**Action:** No immediate action needed. If Cloudflare deployment is needed in future, migrate to OpenNext adapter.

### 7.2 npm Audit False Positives

Some vulnerabilities flagged by `npm audit` may be false positives if:
- They affect features you don't use
- They're in development dependencies only
- The vulnerable code path isn't reachable

**Action:** Review each advisory, don't blindly apply `--force` fixes.

---

## 8. Pre-Upgrade Checklist

Before starting any major upgrade:

- [ ] Read the dependency's CHANGELOG
- [ ] Check for breaking changes in your usage patterns
- [ ] Create a feature branch: `git checkout -b upgrade/<package>-<version>`
- [ ] Run `npm run check:all` to establish baseline
- [ ] Apply the upgrade
- [ ] Run `npm run check` for scoped validation
- [ ] Run `npm run test:affected` for test coverage
- [ ] Run `npm run check:all` for full gate
- [ ] Review any new deprecation warnings
- [ ] Update documentation if needed
- [ ] Open PR with detailed change notes

---

## 9. Post-Upgrade Verification

After applying upgrades:

### Immediate checks
```bash
npm audit                      # Should show 0 vulnerabilities
npm run check                  # Typecheck passes
npm run test:affected          # Tests pass
npm run check:all              # Full gate passes
```

### Deploy verification
```bash
# Build checks
npm run build:backend
npm run build:frontend

# Content build (if applicable)
npm run content:build
npm run content:build:check
```

---

## 10. Emergency Rollback

If an upgrade breaks production:

```bash
# Revert the commit
git revert HEAD --no-edit
git push origin main

# Or manually restore package.json
npm install  # Re-install based on reverted versions
```

Then investigate the issue in a non-production environment.

---

## Files Changed in This Session

| File | Classification |
|------|----------------|
| `README.md` | **[IMPORTANT CORE FILE]** - Documentation |
| `docs/guides/DEPLOYMENT.md` | **[IMPORTANT CORE FILE]** - Documentation |
| `backend/package.json` | **[IMPORTANT CORE FILE]** - Dependency manifest |
| `firebase/firebase.json` | **[IMPORTANT CORE FILE]** - Infrastructure config |
| `package.json` | **[IMPORTANT CORE FILE]** - Root dependency manifest |
| `docs/guides/UPGRADE.md` | **[IMPORTANT CORE FILE]** - Documentation (new) |

---

## Further Reading

- [AGENTS.md](../../AGENTS.md) - For agent-specific guidance
- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Contribution guidelines
- [BRANCHES.md](../../BRANCHES.md) - Branch management rules
- [CORE_FILES.md](../../CORE_FILES.md) - Architecture entrypoints
