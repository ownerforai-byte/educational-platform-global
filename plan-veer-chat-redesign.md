# Plan: Veer chat redesign (branch feature/veer-chat-redesign)

- [x] 1 Single attach menu (camera, photos, files) replacing two buttons
- [ ] 2 Voice auto-send + Stop — `ai-chat-interface` and `tutor-console` are wired; the remaining chat surfaces (study-chat, diagram-studio, subject-classroom, ai-widget) are still being hardened. Auto-send and early-Stop restoration were fixed in the CodeRabbit follow-up.
- [x] 3 Shared live status dot (navigator.onLine + backend `/api/ai/status` probe). The probe reports provider **configuration**, not proven provider health; the dot is labelled accordingly.
- [x] 4 Compact boxes, slimmer header
- [x] 5 Complete-answer prompts
- [x] 6 Env key audit, .env.example names
- [ ] 7 Tests, gates — unit coverage exists for the status helpers, but browser-level validation of voice auto-send and Stop on every surface is still outstanding.

Status: items 2 and 7 are not release-complete. Do not use this file as a release checklist until both are ticked with linked validation runs.
