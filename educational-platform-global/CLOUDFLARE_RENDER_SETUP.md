# Deployment Checklist: Cloudflare Pages + Render Backend

**Project:** ravikisan (educational-platform-global)  
**Frontend:** Cloudflare Pages (`ravikisan.pages.dev` → custom domain later)  
**Backend:** Render (Node.js)  
**Database:** Supabase (`ravikisan1814-lang's Project`)  
**Setup Date:** 2026-08-25

---

## ✅ PHASE 1: GitHub Setup (5 min)

### 1.1 Verify GitHub Account
- [ ] Sign in to https://github.com with `ravikisan1814@gmail.com`
- [ ] Confirm you have access to `educational-platform-global` repo
- [ ] If not connected, go to repo settings → GitHub account settings to link

### 1.2 Create Personal Access Token (for Render auto-deploy)
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Name: `render-deploy-token`
4. Scopes: `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you'll use it in Render setup)
7. **Save it somewhere safe** (not in chat, not in git)

---

## ✅ PHASE 2: Rotate Supabase Keys (SECURITY) (2 min)

**⚠️ Your key was exposed in chat. Rotate it NOW:**

1. Go to https://app.supabase.com → Select "ravikisan1814-lang's Project"
2. Settings → API → Service role key → Click the eye icon to reveal
3. Click the reload/rotate icon next to it
4. Copy the **new key** (this is your new `SUPABASE_SERVICE_ROLE_KEY`)
5. **Don't share it anywhere**

---

## ✅ PHASE 3: Cloudflare Pages Setup (10 min)

### 3.1 Create Cloudflare Account
1. Go to https://dash.cloudflare.com/sign-up
2. Email: `ravikisan1814@gmail.com`
3. Complete signup
4. Verify email

### 3.2 Connect GitHub to Cloudflare Pages
1. Cloudflare Dashboard → Pages → Create project
2. Click "Connect to Git"
3. Select GitHub → Install Cloudflare Pages on your GitHub
4. Authorize Cloudflare to access your repos
5. Select `educational-platform-global` repo

### 3.3 Configure Pages Build Settings
When Cloudflare prompts for build details, enter:

| Setting | Value |
|---------|-------|
| **Framework preset** | Next.js |
| **Root directory** | `frontend` |
| **Build command** | `npm run build -w frontend && npx @cloudflare/next-on-pages@1` |
| **Build output directory** | `frontend/.vercel/output/static` |
| **Node.js version** | 20 |

### 3.4 Add Environment Variables to Pages
1. Pages project → Settings → Environment variables
2. Add these (mark as **Public** with the ✓):

```
NEXT_PUBLIC_API_URL = https://ravikisan-backend.onrender.com
NEXT_PUBLIC_SITE_URL = https://ravikisan.pages.dev
```

3. Click "Save and deploy"
4. **Wait for first deploy** (usually 2-5 min)
5. Once complete, your site is live at `https://ravikisan.pages.dev` ✓

---

## ✅ PHASE 4: Render Backend Setup (15 min)

### 4.1 Create Render Account
1. Go to https://render.com/register
2. Email: `ravikisan1814@gmail.com`
3. Verify email
4. Sign in

### 4.2 Connect GitHub to Render
1. Render Dashboard → Repositories → Link account
2. Select GitHub → Choose `educational-platform-global`
3. Authorize Render

### 4.3 Create Backend Web Service
1. Render Dashboard → New + → Web Service
2. Select `educational-platform-global` repo
3. Fill in:

| Setting | Value |
|---------|-------|
| **Name** | `ravikisan-backend` |
| **Environment** | Node |
| **Build command** | `cd backend && npm install && npm run build` |
| **Start command** | `node dist/index.js` |
| **Plan** | Free (auto-sleeps after 15 min inactivity) |

### 4.4 Add Backend Environment Variables
In Render Web Service → Environment:

```
PORT=3001
FRONTEND_URL=https://ravikisan.pages.dev,http://localhost:5173
SUPABASE_URL=https://tsvbksfegvdjwczzfdcx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-NEW-rotated-key>
SUPABASE_STORAGE_BUCKET=resources
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=120
AI_PROVIDER=internal
```

*(Optional: Add `GEMINI_API_KEY` or `OPENROUTER_API_KEY` if you have them)*

### 4.5 Deploy
1. Click "Create Web Service"
2. Render will auto-deploy from `main` branch
3. **Wait for build** (usually 3-5 min)
4. Once live, your backend is at: `https://ravikisan-backend.onrender.com` ✓

### 4.6 Enable Auto-Deploy
1. Render → ravikisan-backend → Settings → Auto-deploy
2. Toggle "Auto-deploy from branch" → `main`
3. Now every push to `main` triggers a rebuild

---

## ✅ PHASE 5: Verify Everything Works (5 min)

### 5.1 Test Frontend
```bash
# In your browser:
https://ravikisan.pages.dev
```
- [ ] Site loads without errors
- [ ] Check console (F12) for errors

### 5.2 Test Backend Health
```bash
# In your browser:
https://ravikisan-backend.onrender.com/health
```
- [ ] Should return: `{"status":"ok"}`

### 5.3 Test API Proxy
```bash
# In your browser:
https://ravikisan.pages.dev/api/health
```
- [ ] Should return: `{"status":"ok"}` (proves frontend → backend works)

---

## ✅ PHASE 6: Custom Domain (Optional, later)

When ready to add a custom domain:

### Option A: Cloudflare DNS
1. Cloudflare → Add Site → Enter your domain
2. Update nameservers at registrar
3. Pages → Custom domain → Add `yourdomain.com`
4. Auto-SSL ✓

### Option B: External DNS
1. Add CNAME at registrar: `yourdomain.com` → `ravikisan.pages.dev`
2. Pages → Custom domain → Add `yourdomain.com`

---

## 🔧 Local Development (Ongoing)

```bash
# Terminal 1: Frontend
npm run dev -w frontend
# → http://localhost:5173

# Terminal 2: Backend
npm run dev:backend
# → http://localhost:3001

# Frontend dev server proxies /api to :3001 automatically
```

---

## 📝 Credentials Summary

**Store safely (not in chat):**
- GitHub Personal Access Token: `render-deploy-token`
- Supabase Service Role Key: `<your-new-rotated-key>`
- Render API Key: (optional, for remote deploys)

**Public (safe to share):**
- Frontend URL: `https://ravikisan.pages.dev`
- Backend URL: `https://ravikisan-backend.onrender.com`

---

## ⚠️ Troubleshooting

### Pages shows "Build failed"
- Check build logs in Cloudflare dashboard
- Common: adapter not installed → run `npm install -D @cloudflare/next-on-pages --workspace frontend` and push
- Common: env var typo → verify in Pages settings

### Backend 500 errors
- Check Render logs: Dashboard → ravikisan-backend → Logs
- Common: `SUPABASE_SERVICE_ROLE_KEY` wrong → regenerate in Supabase, update in Render
- Common: `FRONTEND_URL` missing → add it to env vars

### CORS errors
- Check backend `.env`: `FRONTEND_URL` must include `https://ravikisan.pages.dev`
- Render auto-redeploys when you push to `main`

### Render auto-sleep (free plan)
- Render puts services to sleep after 15 min no traffic
- First request after sleep takes 20-30 sec (cold start)
- Upgrade to paid if you need instant response

---

## ✅ Completion Checklist

- [ ] GitHub Personal Access Token created
- [ ] Supabase service role key rotated
- [ ] Cloudflare account created & Pages project live
- [ ] Frontend env vars set in Pages
- [ ] Render account created & backend deployed
- [ ] Backend env vars set (including rotated Supabase key)
- [ ] Frontend loads at `https://ravikisan.pages.dev`
- [ ] Backend health check passes
- [ ] API proxy works (frontend calls backend)

---

**Next Step:** Follow Phase 1-5 above. Come back with results or errors, and I'll help debug.
