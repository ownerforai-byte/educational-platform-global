# Onboarding

## 1. Clone & install

```bash
git clone <repo>
cd rn
npm install
cd frontend && npm install && cd ..
```

## 2. Env

- `frontend/.env.local` from `frontend/.env.example` (`NEXT_PUBLIC_*`, Supabase anon)
- `backend/.env` from `backend/.env.example` (`SUPABASE_*`, AI keys, `OWNER_EMAILS` if needed)

Never commit secrets. Use `.secrets/` locally if you must keep tokens on disk.

## 3. Run

```bash
# Terminal A — API (Render-shaped: 0.0.0.0:$PORT in prod)
cd backend && npm run dev

# Terminal B — Next
cd frontend && npm run dev   # http://localhost:5173
```

## 4. Orientation for agents / new contributors

1. Read `CORE_FILES.md` first — do **not** bulk-read `content/`.
2. Use graphify for "where is X" (`npm run graphify:query -- "..."`).
3. One area per branch (`BRANCHES.md`); `main` is deployable.
4. Classify every touched file as **[IMPORTANT CORE FILE]** or **[CONTENT FILE]**.

## 5. Before you push

```bash
npm run check          # scoped
npm run check:all      # before main
```

Owner account on this tree defaults to `sahrocky81@gmail.com` (see `docs/architecture/BACKEND.md`).
