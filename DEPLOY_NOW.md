# 🚀 Deploy Your App NOW — 3 Services, 30 Minutes

Your code is ready. Let's get it live. You'll use:
- **Cloudflare Pages** (free) — for frontend
- **Render** (free) — for backend  
- **Supabase** — already have it

---

## Step 1: Cloudflare Pages Setup (10 min)

### 1.1 Create Account
1. Go to https://dash.cloudflare.com/sign-up
2. Email: `ravikisan1814@gmail.com`
3. Password: Create a new strong one (NOT your old password)
4. Verify email

### 1.2 Connect GitHub to Cloudflare
1. In Cloudflare → Pages → "Create project"
2. Click "Connect to Git"
3. Select GitHub (it will prompt you to authorize Cloudflare)
4. Find your repo: `ravikisan1814-lang/educational-platform-global`
5. Click "Connect"

### 1.3 Configure Build
When it asks for build settings:
- **Framework preset:** Next.js
- **Root directory:** `frontend`
- **Build command:** `npm run build -w frontend`
- **Build output directory:** `frontend/.next/static`
- **Node.js version:** 20+

Click "Save and deploy"

### 1.4 Add Environment Variables
After Pages creates your project:
1. Go to Settings → Environment variables
2. Click "Add variable"
3. Add these two:

```
NEXT_PUBLIC_API_URL = https://ravikisan-backend.onrender.com
NEXT_PUBLIC_SITE_URL = https://ravikisan.pages.dev
```

3. Mark both as **Public** (toggle the eye icon)
4. Click "Save"
5. Trigger a redeploy by going to Deployments → redeploy latest

✅ **Your site will be live at: `https://ravikisan.pages.dev`**

---

## Step 2: Render Backend Setup (10 min)

### 2.1 Create Account
1. Go to https://render.com/register
2. Email: `ravikisan1814@gmail.com`
3. Verify email
4. Sign in

### 2.2 Connect GitHub
1. Render → Settings → GitHub → Link account
2. Authorize Render to access your repos
3. Select `ravikisan1814-lang/educational-platform-global`

### 2.3 Create Backend Service
1. Render Dashboard → "New +" → "Web Service"
2. Select your repo
3. Fill in:

| Field | Value |
|-------|-------|
| **Name** | `ravikisan-backend` |
| **Environment** | Node |
| **Build command** | `cd backend && npm install && npm run build` |
| **Start command** | `node dist/index.js` |
| **Plan** | Free |

Click "Create Web Service"

### 2.4 Add Backend Secrets
While it's building, go to Environment:
1. Click "Add environment variable"
2. Add these (**one by one**):

```
PORT = 3001
FRONTEND_URL = https://ravikisan.pages.dev,http://localhost:5173
SUPABASE_URL = https://tsvbksfegvdjwczzfdcx.supabase.co
SUPABASE_SERVICE_ROLE_KEY = <your-NEW-rotated-key>
SUPABASE_STORAGE_BUCKET = resources
RATE_LIMIT_WINDOW_MS = 60000
RATE_LIMIT_MAX_REQUESTS = 120
AI_PROVIDER = internal
```

**IMPORTANT:** For `SUPABASE_SERVICE_ROLE_KEY`:
- Go to https://app.supabase.com → your project → Settings → API
- Click the reload icon next to "Service role secret" to rotate it
- Copy the NEW key (your old one was exposed)
- Paste it in Render

3. Click "Save"

✅ **Your backend will be live at: `https://ravikisan-backend.onrender.com`**

---

## Step 3: Test Everything Works (5 min)

### 3.1 Test Frontend
Open in browser:
```
https://ravikisan.pages.dev
```
- Should see your educational platform
- Check console (F12) for any red errors

### 3.2 Test Backend Health
Open in browser:
```
https://ravikisan-backend.onrender.com/health
```
- Should show: `{"status":"ok"}`

### 3.3 Test API Proxy
Open in browser:
```
https://ravikisan.pages.dev/api/health
```
- Should show: `{"status":"ok"}` (proves frontend talks to backend)

---

## Step 4: Enable Auto-Deploy (Optional, 2 min)

So every push to GitHub automatically deploys:

### Cloudflare Pages
- Already enabled by default (deploys on every push)

### Render
1. Render → your service → Settings
2. Find "Auto-Deploy" 
3. Toggle on "Automatically deploy new commits"

---

## 🎯 You're Done!

| Service | URL | Status |
|---------|-----|--------|
| Frontend | `https://ravikisan.pages.dev` | ✅ Live |
| Backend | `https://ravikisan-backend.onrender.com` | ✅ Live |
| Database | Supabase | ✅ Connected |

---

## 📝 Important Notes

- **Free tier limits:**
  - Render sleeps after 15 min inactivity (first request is slow)
  - Cloudflare Pages never sleeps
  - Supabase free tier: 500 DB rows, 1GB storage

- **Next push to main:**
  - Both Cloudflare and Render auto-redeploy
  - Takes ~2-5 min each

- **Secrets are safe:**
  - Your Supabase key is now in Render environment (secure, encrypted)
  - Never appears in logs or GitHub

---

## 🆘 Troubleshooting

**"Build failed" on Cloudflare?**
- Check build logs (Deployments tab)
- Common: typo in build command
- Solution: Make sure build command is exactly: `npm run build -w frontend`

**"502 Bad Gateway" on backend?**
- Wait 2 min (Render takes time to start)
- Check Render logs (Logs tab)
- Common: `SUPABASE_SERVICE_ROLE_KEY` is wrong → regenerate it

**"CORS error" when loading from frontend?**
- Check Render env vars have `FRONTEND_URL` with full URL
- Must include `https://` and exact domain

---

## ✅ Deployment Checklist

- [ ] Cloudflare account created
- [ ] GitHub connected to Cloudflare
- [ ] Cloudflare Pages project created
- [ ] Cloudflare env vars set
- [ ] Frontend live at `ravikisan.pages.dev`
- [ ] Render account created
- [ ] GitHub connected to Render
- [ ] Render backend service created
- [ ] Render env vars set (including rotated Supabase key)
- [ ] Backend health check passes
- [ ] API proxy works (frontend calls backend)

---

**Start with Step 1 now. Come back with screenshots or errors if anything doesn't work!**
