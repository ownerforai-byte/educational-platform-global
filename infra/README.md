# infra/

Optional Docker packaging. Production today is **Vercel (frontend)** + **Render (backend)** + **Supabase**.

| Path | Purpose |
|------|---------|
| `docker/Dockerfile.frontend` | Multi-stage Next.js image |
| `docker/Dockerfile.backend` | Multi-stage Express image |
| `docker/docker-compose.yml` | Local frontend + backend |

```bash
# from repo root
docker compose -f infra/docker/docker-compose.yml up --build
```

Requirements: Docker Desktop (or Engine) with BuildKit. Provide `backend/.env` (and frontend public env at build time as needed). Do not commit secrets.
