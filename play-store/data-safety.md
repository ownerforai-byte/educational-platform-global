<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:e4422e9c7813dfce98948410799b8b3cadf2d4b0e85a6a05b1238461a3f7da39 -->

# Data Safety preparation — verify before submission

Do not paste unverified Yes/No answers into Play Console. The app collects account identifiers, learning data, prompts, generated content and uploaded files. Sentry may collect diagnostics when enabled. Inventory actual production traffic, optional features, purposes, retention and security settings.

Free status does not determine sensitive-data collection. Prompts/uploads may contain sensitive information. Apply Google's current processor/service-provider exceptions when classifying sharing. Map each enabled Supabase, Vercel, Render, AI/search, Sentry and Storage/R2 service to its data, purpose and retention. Payment-related collection depends on actual implementation.

Users can request deletion at /legal/delete-account and in their profile. This is support-assisted and requires identity verification. Only assert completed deletion coverage after verifying all database, storage, auth and provider records. Publish any retention exceptions. The owner must complete the actual Console questionnaire and confirm it matches the public privacy page. See OWNER-RELEASE-STEPS.md for the release gate.


<!-- /coderabbit-ai-generated:v1 -->