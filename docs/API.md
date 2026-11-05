# API Reference

Base URL (production): `https://rn01.onrender.com`

All endpoints use JSON. Authenticated endpoints require either:
- `Authorization: Bearer <token>` header
- `sb-access-token` httpOnly cookie (set by login/signup)

---

## Auth

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | No | Email + password login |
| POST | `/api/auth/signup` | No | Create account (status → PENDING) |
| POST | `/api/auth/logout` | Yes | Revoke session |
| GET | `/api/auth/callback` | No | OAuth callback handler |
| POST | `/api/auth/refresh` | No | Refresh session token |

## User & Credits

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/user/me` | Yes | Profile + credits + plan |
| POST | `/api/user/credits/unlock` | Yes | Spend spark to unlock content (20-min window) |
| GET | `/api/user/credits/transactions` | Yes | Spark transaction history |
| POST | `/api/user/credits/request` | Yes | Request premium upgrade |

## Content (gated)

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/content/reveal` | Yes + Tier + Spark | Return note/PYQ body from corpus |

Request body:
```json
{
  "kind": "concepts",
  "classSlug": "class-11-notes",
  "subjectSlug": "physics",
  "unitSlug": "kinematics",
  "filename": "01-motion.json",
  "moduleKey": "route:/class-11-notes/physics/kinematics"
}
```

## AI — Veer

| Method | Path | Auth | Sparks | Description |
|---|---|---|---|---|
| POST | `/api/ai` | Yes | AI sparks | Main Veer tutor chat |
| POST | `/api/ai/guest` | No | Guest pool (3/day) | Guest chat (limited) |
| POST | `/api/ai/math` | Yes (Plus) | AI sparks | Math solver |
| POST | `/api/ai/deep-dive` | Yes (Plus) | AI sparks | Concept deep-dive |
| POST | `/api/ai/generate-questions` | Yes (Plus) | AI sparks | Quiz generation |
| POST | `/api/ai/evaluate-answers` | Yes (Plus) | AI sparks | Answer evaluation |
| POST | `/api/ai/platform-guide` | No | None | Public platform guide (Agnes only) |
| GET | `/api/ai/status` | No | None | AI online/offline status |
| GET | `/api/ai/spark` | Yes | None | Current AI spark usage |

## Progress & Bookmarks

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/progress` | Yes | Topic progress entries |
| POST | `/api/progress` | Yes | Update topic progress |
| GET | `/api/bookmarks` | Yes | Saved bookmarks |
| POST | `/api/bookmarks` | Yes | Add bookmark |
| DELETE | `/api/bookmarks/:id` | Yes | Remove bookmark |

## Config

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/config` | No | Runtime flags (coin gate on/off) |
| GET | `/health` | No | Server health check |

---

## Error codes

| Status | Meaning |
|---|---|
| 400 | Bad request — invalid body |
| 401 | Unauthenticated — no session |
| 402 | Insufficient sparks |
| 403 | Forbidden — wrong tier, no spark window, or missing permission |
| 404 | Not found |
| 429 | Rate limited |
| 503 | Service unavailable (AI provider down) |

Error body: `{ "error": "message", "errorId": "abc123" }`
The `errorId` is also returned as `x-error-id` response header.
