<!-- coderabbit-ai-generated:v1 -->

# Owner steps: Google Play release

Status: repository preparation implemented; production release remains blocked until the steps below are completed and checked. No Play listing, paid billing integration, production deletion or device acceptance is claimed complete.

## 1. Choose the commercial model

Decide whether all app access and credits are free or whether digital benefits are sold. Existing premium approval is preserved. If free, do not collect payment through the owner-contact flow. If paid, implement Play Billing, server-side purchase-token verification, entitlement reconciliation, refunds and subscription lifecycle handling before enabling sales. Alternative billing is available only where an applicable Google program permits it. This business decision is required before billing code can be implemented safely.

## 2. Configure support delivery and operations

In Render configure one existing mail provider: RESEND_API_KEY or SENDGRID_API_KEY, and MAIL_FROM with a verified sending identity. Do not put these in frontend variables. Support requests are sent to ravikisan1814@gmail.com. Test both in-app forms with a synthetic account: receipt must reach that inbox; absent/failed delivery must show failure. <!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:a9843e23759cb2aa223df0b0c9b2eeafcdca0abe0157492894b59b0258a4f6b6 -->

Requests require login, are limited to five per account per hour after authentication, and bypass premium approval gates. Separate global IP limits also apply.

<!-- /coderabbit-ai-generated:v1 --> External users can request deletion by email without reinstalling.

Monitor the support inbox daily. Verify deletion requests from the account owner without asking for passwords. Agree and publish an appropriate response/deletion time with the operator/legal adviser. Review AI reports, investigate harmful responses, and improve prompts/filtering and provider controls. Delete report messages when no longer needed under the adopted retention schedule. A delivered request is not proof of completed deletion or moderation.

## 3. Verify deletion and database isolation

Use a synthetic account containing progress, bookmarks, chat/quiz/image history and uploads. Inventory all tables with user IDs in the deployed schema and all Storage/R2 object prefixes; do not assume auth deletion cascades everything. Export the synthetic account inventory, then remove its uploaded Storage/R2 objects, dependent records and Supabase Auth identity in the correct foreign-key order. Revoke sessions and verify that the account cannot refresh/login or read data. Preserve only documented legal/security exceptions with an explicit expiry. Check provider-held records and backup expiry. Record completion and notify the requester. Repeat with two accounts to prove neither can read/update the other's database rows or storage objects, including direct anon/authenticated Supabase access. Verify database backups and a restore in a disposable environment.

This remains an operator-assisted deletion process. The app does not promise immediate automatic erasure. Add automation only after the deployed schema/storage inventory and retention requirements are established.

## 4. Set production configuration and monitoring

Verify Supabase URL, anon public key, server-only service-role key, AI keys, allowed origins and same-origin cookie/auth proxy behavior in Vercel/Render. An anon key is public by design; RLS/storage policies provide isolation. Keep server credentials out of NEXT_PUBLIC variables. Enable Sentry DSNs if desired, send a synthetic error, confirm alert delivery and scrub credentials, cookies, personal data, prompts and uploads. Review enabled AI/search/storage providers and retention settings. Align the public Privacy Policy, cookies and Data Safety answers with actual traffic. Free apps still collect personal data. Processor transfers may qualify for Play sharing exceptions; complete Google's actual questionnaire rather than copying blanket Yes/No answers.

## 5. Resolve existing CI and deployment status

At audited head 1c557fdf, DeepSource JavaScript and three Netlify checks failed. Netlify public summaries contain no build log; inspect the authenticated Netlify deployment log, repair the underlying configuration and rerun. Inspect DeepSource's current issue list after this branch is pushed. Do not disable required checks. Confirm required branch checks in GitHub settings. Deploy the reviewed commit through the normal production process and verify frontend/backend deployed revisions agree with the intended release. Production was not changed by this task.

## 6. Register and configure Play Console

Register the correct personal/organization account; complete identity/contact/device verification and any required developer verification. Create the app with package com.ravikisan.platform. Treat the package ID as permanent. Enroll in Play App Signing. Preserve the existing upload keystore, alias/password and secure offline backups; never replace an existing app-signing identity casually. Confirm whether the checked-in certificate belongs to the actual upload key. Get the app-signing SHA-256 fingerprint from Console > App integrity.

## 7. Establish domain verification

Add the actual Play app-signing fingerprint in colon-separated uppercase form to frontend/public/.well-known/assetlinks.json and the verified-fingerprint list in .github/workflows/ci.yml. Current value is only the inspected historical AAB signer; it does not prove the Play-installed signing identity. Keep the upload certificate only if that install path is intentionally trusted. Deploy the JSON publicly over HTTPS without redirects/authentication. Check Google's Digital Asset Links API for linked:true, then install from Play internal testing and verify a full-screen TWA. The PWA's Play related-app declaration should only be advertised when the listing is available.

## 8. Configure protected Android publishing

<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:98a4f6be7eb66e5a26880ca97367ba75423a98f00717d689905e3c9c3c0582ba -->

Create a GitHub environment named google-play with required reviewers and restrict it to main. Set its public environment variable PLAY_APP_SIGNING_SHA256 to the colon-separated uppercase app-signing certificate from Play App integrity. Publishing checks the live Google domain association and refuses to upload unless linked:true.

<!-- /coderabbit-ai-generated:v1 --> Add UPLOAD_KEYSTORE_BASE64, UPLOAD_KEYSTORE_PASSWORD, UPLOAD_KEY_ALIAS, UPLOAD_KEY_PASSWORD and PLAY_SERVICE_ACCOUNT_JSON as environment secrets. The service account must have least-privilege Play release access and the Android Publisher API enabled. Never expose secret values in issues, logs or chat. Make the first manual Play upload/app setup if required by the API. <!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:e4940041a36a7d48cd8cce0149281ab820bf11afb94b603d710e3d7b82ec7ad6 -->

Release actions are pinned to inspected commit SHAs; review updates under your supply-chain policy.

<!-- /coderabbit-ai-generated:v1 -->

The Android workflow verifies PR builds without release credentials. Publishing is manual dispatch, main-only, environment-protected, and uploads a draft to internal testing. It does not publish production automatically. twa-manifest.json owns Android versionCode/versionName; keep Bubblewrap's mirror synchronized. Every upload must increment versionCode above all previous Console uploads. Current prepared version is 2 / 1.0.1; increase it if Console already used code 2.

Run Android release, download the signed AAB artifact, validate with Google's bundletool and verify its signature/certificate. Keep the artifact, source SHA, version and certificate fingerprint together. The old checked-in play-store/ravikisan-platform-release.aab is historical and is not rebuilt by editing source; upload the new workflow artifact.

## 9. Prepare store assets and truthful declarations

<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:9c5df8b3b96e8e223fc7a6928f9229c23efc85a051f65aa2348b9911ffceac69 -->

Use the branded feature graphic in this task's Outputs as a draft, inspect it and approve the branding. A 512x512 RGBA Play icon prepared from the existing project icon is also in Outputs. Review launcher-icon safe areas, monochrome support and notification glyphs: Android lint still reports advisory icon/orientation/generated-resource warnings.

<!-- /coderabbit-ai-generated:v1 --> Provide a compliant 512x512 Play icon and at least two real phone screenshots captured from the Play-installed app. Do not submit fabricated screenshots. Complete short/full descriptions, support contact, Privacy URL /legal/privacy and deletion URL /legal/delete-account. Select distribution countries and actual age bands, complete IARC including biology/external/AI content, declare ads and monetization accurately, and supply an approved reviewer account with working instructions. Verify all content/PYQ/textbook/brand rights. Do not claim an assigned age rating until Console provides it.

## 10. Test on Android and qualify for production

Install from internal testing on Android11 and Android16 with supported Chrome. Test cold start, verified TWA, Android Back, external links, OAuth/password reset, pending/approved accounts, logout/session revocation, permission denial/notification consent, file uploads/downloads, AI streaming/reporting, support failure, airplane mode, stale cache after updates, low memory, slow networks, keyboard, screen reader and small/large screens. Exercise paid flows if introduced. Verify no private data remains accessible after logout/account deletion. Check release lint, pre-launch report, accessibility and Android vitals. Review minimum API30 as a device-coverage choice, not a Play minimum requirement. Review portrait/large-screen behavior under API36.

Applicable personal accounts created after 2023-11-13 need at least 12 opted-in closed testers continuously for 14 days, then production-access approval. Confirm the current requirements shown by Console. Device testing was not completed in this sandbox: hardware acceleration is unavailable.

## 11. Release and update

Resolve all blocking results, finish Console declarations, promote the tested artifact through closed testing and staged production rollout, and watch crash/ANR/backend/support metrics. Halt rollout on regressions and ship a higher-version fix. Web updates use Vercel/Render and remain subject to Play policies; wrapper/permission/native changes require a new AAB and review. Keep backwards-compatible backend/database changes for older installed clients. Review target SDK deadlines and dependency updates before every release.

## Sources

- https://support.google.com/googleplay/android-developer/answer/11926878
- https://support.google.com/googleplay/android-developer/answer/13327111
- https://support.google.com/googleplay/android-developer/answer/13985936
- https://support.google.com/googleplay/android-developer/answer/9858738
- https://support.google.com/googleplay/android-developer/answer/14151465
- https://support.google.com/googleplay/android-developer/answer/1078870
- https://developers.google.com/digital-asset-links/v1/statements
