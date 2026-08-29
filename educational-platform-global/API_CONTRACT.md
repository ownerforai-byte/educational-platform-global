# API Contract

## Base URL

```
Production: https://api.yourdomain.com
Development: http://localhost:3001
```

## Authentication

All protected endpoints require a Bearer token in the `Authorization` header or an `sb-access-token` cookie.

```
Authorization: Bearer <supabase-access-token>
```

## Endpoints

### Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/login` | No | Login with email/password |
| POST | `/api/auth/signup` | No | Create new account |
| POST | `/api/auth/logout` | Yes | Logout current session |
| GET | `/api/auth/me` | Yes | Get current user |

### Levels

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/levels` | No | List all levels |
| GET | `/api/levels/:slug` | No | Get level by slug |

### Classes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/classes/:slug` | No | Get classes by level slug |

### Subjects

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/subjects/:slug` | No | Get subject by slug |

### Chapters

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/chapters/:slug` | No | Get chapter by slug |

### Topics

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/topics/:slug` | No | Get topic by slug |

### Resources

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/resources` | No | List published resources |
| GET | `/api/resources/:id` | No | Get resource by ID |
| POST | `/api/resources` | Yes (Teacher+) | Create resource |
| PATCH | `/api/resources/:id` | Yes (Teacher+) | Update resource |
| DELETE | `/api/resources/:id` | Yes (Teacher+) | Delete resource |
| POST | `/api/resources/:id/link` | Yes (Teacher+) | Link resource reference |

### Content

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/r-notes` | No | List R-export notes |
| GET | `/api/ravikishan-notes` | No | Get Ravikishan notes |

### AI

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/chat` | Yes | AI chat completion |
| POST | `/api/search` | Yes | AI-powered search |

### Progress

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/progress` | Yes | Get user progress |
| POST | `/api/progress` | Yes | Update user progress |

### Bookmarks

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/bookmarks` | Yes | Get user bookmarks |
| POST | `/api/bookmarks` | Yes | Create bookmark |
| DELETE | `/api/bookmarks/:id` | Yes | Delete bookmark |

### Controller (Admin)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/controller/health` | Admin | System health check |
| GET | `/api/controller/content-stats` | Admin | Content statistics |
| GET | `/api/controller/settings` | Admin | App settings |

## Error Responses

All errors follow this shape:

```json
{
  "error": "Error message"
}
```

Common status codes:
- `400` — Bad request / validation error
- `401` — Unauthorized (missing or invalid token)
- `403` — Forbidden (insufficient permissions)
- `404` — Not found
- `429` — Rate limit exceeded
- `500` — Internal server error

## Rate Limiting

- 120 requests per minute per IP
- Exceeded: `429 Too Many Requests`

## Post-migration reality check

The sections above describe the intended contract. After the frontend/backend split,
the implemented backend (`backend/`, Express 4) **drifts** from it in these ways —
treat this list as authoritative until the drift is closed. Full context:
`MIGRATION_COMPLETE.md` (REMAINING ISSUES).

### Verified working

- `GET /health` → 200 · `GET /api/exams` → 200 · `GET /api/r-notes` → 200 `{subjects, chapters, notes}`.

### Drift vs this contract

1. **Auth transport**: backend accepts Bearer tokens or the legacy `sb-access-token`
   cookie only. The frontend sends cookies via `credentials: "include"` but never sets
   `Authorization`, so protected endpoints return **401 for real logged-in browser
   users** until the frontend attaches the access token or the backend parses the
   `@supabase/ssr` chunked-cookie format. Login/signup/logout work end-to-end.
2. **Search** is now authenticated (was public), and the `officialLink` setting was
   dropped from the search response.
3. **Bookmarks shape changed**: `GET /api/bookmarks` returns a bare array (documented
   here as `{bookmarks:[…]}`); POST upsert overwrites instead of idempotent-ok;
   DELETE keys on row `id`, not `resourceId`.
4. **Progress validation dropped**: raw `topic_id` accepted; FK violations surface as
   `500` instead of `400`.
5. **Resources**: PATCH forwards `req.body` unsanitized to `update()` under the
   service-role key (no column allowlist); DELETE has no ownership check.
6. **Controller**: `PATCH /api/controller/settings` was lost in migration (settings are
   read-only today); health/content-stats/settings payload shapes drifted from the
   originals.
7. **Storage upload not ported**: `POST /api/storage/upload` does not exist in the
   backend (`lib/storage/storage-service.ts` is unused).
8. **AI paths**: providers live only in the backend; the frontend reaches AI through
   `/api/ai` proxy routes rather than calling provider endpoints directly.
9. **Config dependency**: DB-backed routes require `backend/.env` with
   `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`; without them they degrade/fail even
   though the server itself boots with zero env vars.
