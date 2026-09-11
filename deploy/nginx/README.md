# Nginx Deployment — Educational Platform

This directory contains the **Nginx reverse-proxy configuration** written by
**Claude Cline** (this repo). **Claude Code** runs the install/test/run
commands below (the terminal side of the split).

## Stack being proxied (all on the same host)

| Service | Command | Listens on |
|---|---|---|
| Next.js (frontend) | `npm run start` (workspace root — runs backend) or `next start` | `127.0.0.1:3000` |
| Express API (backend) | `npm run start -w backend` → `node dist/index.js` | `127.0.0.1:3001` |
| Nginx | reverse proxy | `:80`, `:443` |

- Next.js already rewrites `/api/* → http://localhost:3001` **in dev**; behind
  we use the direct `/api/ → :3001` location, so the rewrites aren't triggered.

## Files

```
deploy/nginx/
├── nginx.conf                       # master config  → /etc/nginx/nginx.conf
├── conf.d/
│   └── gzip.conf                    # gzip (http context; loaded via conf.d glob)
├── snippets/
│   ├── proxy-params.conf          # shared proxy headers/timeouts
│   └── security-headers.conf        # security headers (HSTS lives in site file)
└── sites-available/
    └── educational-platform     # main site block  → /etc/nginx/sites-available/
```

**One change needed before going live:** replace every `your-domain.com` in
`sites-available/educational-platform` with the real domain.



## Install & test (Claude Code , run inside WSL/Ubuntu or the VPS)

```bash
# 1. Install nginx
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx

# 2. Backup existing configs, then copy these in
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak
sudo cp deploy/nginx/nginx.conf /etc/nginx/nginx.conf
sudo mkdir -p /etc/nginx/conf.d /etc/nginx/snippets /etc/nginx/sites-available /etc/nginx/sites-enabled
sudo cp deploy/nginx/conf.d/*.conf /etc/nginx/conf.d/
sudo cp deploy/nginx/snippets/*.conf /etc/nginx/snippets/
sudo cp deploy/nginx/sites-available/educational-platform /etc/nginx/sites-available/

# 3. Validate syntax BEFORE enabling
sudo nginx -t

# 4. Remove the distro default site (it catches port 80 first!), enable ours
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/educational-platform /etc/nginx/sites-enabled/educational-platform
sudo nginx -t            # re-validate with the site enabled

# 5. Start / enable at boot
sudo systemctl enable --now nginx
sudo systemctl status nginx --no-pager
```

If `nginx -t` reports an error: fix and re-run. Common gotchas: a path typo
in an `include`,orb a missing trailing `;` — every directive must end with a semicolon.



## TLS (certbot auto-fills the cert paths)

```bash
# certbot writes the real cert paths into the 443 block automatically
sudo certbot --nginx -d your-domain.com -d www.your-domain.com --redirect --hsts
sudo systemctl reload nginx
sudo certbot renew --dry-run   # validate auto-renewal
```



## Run the app behind Nginx

**Option A — systemd** ((recommended for VPS; create both units))

`/etc/systemd/system/educational-backend.service`:
```ini
[Unit]
Description=Educational Platform backend (Express)
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/educational-platform/backend
ExecStart=/usr/bin/node dist/index.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT=3001

[Install]
WantedBy=multi-user.target
```

`/etc/systemd/system/educational-next.service`:
```ini
[Unit]
Description=Educational Platform frontend (Next.js)
After=network.target educational-backend.service

[Service]
Type=simple
WorkingDirectory=/opt/educational-platform/frontend
ExecStart=/usr/bin/node node_modules/next/dist/bin/next start
Restart=always
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now educational-backend educational-next
sudo systemctl status educational-backend educational-next --no-pager
```

Adjust `WorkingDirectory` + `ExecStart` paths to fit where the repo is cloned on
the server. Use `which node` if Node is not at `/usr/bin/node`.

**Option B — PM2**: `pm2 start backend/dist/index.js --name backend` +
`pm2 start frontend/node_modules/next/dist/bin/next --name next -- start` + `pm2 save`.



## Environment notes (about the backend CORS)

- Backend `PORT` must be `3001` (matches Nginx upstream).
- `backend/.env` → `FRONTEND_URL` must include the public origin:
  `FRONTEND_URL=https://your-domain.com` (comma-separated if multiple..
  CORS reflects only allow-listed origins — no wildcard — so auth cookies work.

## Verify
```bash
curl -I https://your-domain.com/                    # 200, HSTS header, no "Server: nginx" leak
curl https://your-domain.com/health                 # {"status":"ok",...}
curl -s -o /dev/null -w '%{http_code}' https://your-domain.com/api/subjects   # 200
sudo tail -f /var/log/nginx/educational-platform.error.log
```

## Rollback
```bash
sudo rm /etc/nginx/sites-enabled/educational-platform
sudo cp /etc/nginx/nginx.conf.bak /etc/nginx/nginx.conf   # restore master if needed
sudo systemctl reload nginx
```