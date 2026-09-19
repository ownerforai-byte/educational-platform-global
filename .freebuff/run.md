# Freebuff Desktop — Preview Run Doc

Next.js app lives in `frontend/`. Preview runs the frontend dev server from this worktree.

## Reproduce uncommitted artifacts (fresh checkout)

1. Copy env file from the main checkout (never symlink; adapt values if both servers run concurrently):
   - Copy `frontend/.env.local` from `C:\Users\ASUS\Desktop\rn\frontend\.env.local` into `frontend/.env.local`.
2. Install frontend dependencies with npm (project uses `package-lock.json`):
   - From `frontend/`: `npm install`
3. Content JSON lives outside the app dir (`content/` at repo root); the dev server reads it via `fs` at runtime — no extra artifacts needed.

## Run the dev server

- From `frontend/`: `npm run dev`
- The `dev` script is `next dev -p 5173` — the project's default port is **5173** (confirmed free at setup). If occupied, override with `npm run dev -- -p <free-port>`.
- Server log: `.freebuff/preview-226ecc7a-8fcc-4263-a54a-da3ca5c9f44e.log` (+ `.err` for stderr).
- Windows detach recipe (used by the preview runner):
  `powershell -NoProfile -Command "(Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev' -RedirectStandardOutput '<log>' -RedirectStandardError '<log>.err' -WindowStyle Hidden -PassThru).Id"`
  (run with cwd = `frontend`), then verify with `Get-Process -Id <pid>`.
