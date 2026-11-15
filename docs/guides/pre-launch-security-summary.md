# Pre-launch security summary (community + auth + R2)

Actionable items applied or verified for this app ahead of production. Full third-party PDF audits should be mapped to this checklist.

## Identity separation

- **Owner** (`sahrocky81@gmail.com`, display `Sahrocky81`) is the human operator — not the community bot.
- **Community bot** (`community-bot`, display `Community bot`, role `assistant`) handles automated feed replies only.

## Secrets hygiene

- No `service_role`, AI provider keys, or R2 credentials in the frontend bundle (`grep` gate in `AGENT_RULES.md`).
- Owner **Platform Settings** masks likely secret values with password fields (`isSensitiveConfigKey` from `@rn/shared/utils`).
- FCM device tokens are logged **masked** on the API and in Firebase functions.
- AI diagnostics (`describeAiKeyStatus`) expose booleans only — never key material.

## Auth

- Session cookies are httpOnly; refresh tokens are not exposed to client JS.
- Phone sign-in uses Firebase invisible reCAPTCHA with a rendered container (not `display:none` on the widget host).
- Community bot cron routes require `COMMUNITY_BOT_CRON_KEY` header — not callable without the secret.

## Storage (R2)

- Profile and community attachments are served through authenticated API routes; arbitrary path traversal is rejected in integration tests.
- Full-size images/PDFs load on **community post** and **profile** surfaces only; other routes use lazy/low-priority media.
- **Superseded objects:** avatar/cover uploads use stamped keys (`profile-image.ts`); after a successful DB write, `removeSupersededObject()` deletes the previous R2 key and releases quota. Community attachments delete R2 rows when the attachment or post is removed.

## Client cache (PWA)

- `public/sw.js` `activate()` deletes **every** Cache Storage key before rebuilding the shell.
- `scripts/bump-deploy-version.mjs` renames `CACHE_NAME` / `DATA_CACHE` on each build so a new deploy cannot reuse a previous version's bucket name.

## Before push

```bash
git grep -n -E "vcp_|sbp_|AIza|sk-|KEY=|TOKEN=" -- . ':!node_modules' ':!*.md'
npm run check:all
```