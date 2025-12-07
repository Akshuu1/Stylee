# 🚀 Deployment Guide - Fix Login/Signup for Production

## Problem
Login/signup only works on `localhost` because:
- Frontend deployed on Vercel tries to connect to `http://10.7.2.90:5001/api` (your local computer)
- Other devices can't reach your local backend
- You need to deploy the backend to make it accessible from anywhere

## Solution: Deploy Backend + Configure Environment Variables

---

## Option 1: Deploy Backend to Render (Recommended - Free tier available)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with your GitHub account

### Step 2: Deploy Backend
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `stylee-backend`
   - **Root Directory**: `Backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 3: Set Environment Variables on Render
Add these in the Render dashboard (Environment tab):

```bash
DATABASE_URL=your-postgres-connection-string
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=production
```

**To get DATABASE_URL:**
1. In Render, create a **PostgreSQL database** (New + → PostgreSQL)
2. Copy the **Internal Database URL** from the database info page
3. Paste it as `DATABASE_URL`

### Step 4: Get Your Backend URL
After deployment, Render will give you a URL like:
```
https://stylee-backend.onrender.com
```

---

## Option 2: Deploy Backend to Railway

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub

### Step 2: Deploy
1. Click **"New Project"** → **"Deploy from GitHub repo"**
2. Select your repo
3. Railway auto-detects Node.js

### Step 3: Add PostgreSQL Database
1. In project, click **"New"** → **"Database"** → **"PostgreSQL"**
2. Railway automatically sets `DATABASE_URL`

### Step 4: Set Environment Variables
Add in Railway dashboard → Variables:
```bash
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

### Step 5: Configure Root Directory
If Railway deploys from wrong folder:
1. Go to Settings → **Service Settings**
2. Set **Root Directory** to `Backend`
3. Redeploy

---

## Configure Frontend After Backend Deployment

### Step 1: Update Frontend API Configuration

Edit `/Users/akki/Desktop/evyrthing/projects/stylee/Frontend/src/services/api.js`:

**Line 12** - Replace:
```javascript
return 'https://your-backend-url.vercel.app/api';
```

With YOUR actual backend URL:
```javascript
// For Render:
return 'https://stylee-backend.onrender.com/api';

// For Railway:
return 'https://stylee-backend.up.railway.app/api';
```

### Step 2: Commit and Push Changes
```bash
cd /Users/akki/Desktop/evyrthing/projects/stylee
git add Frontend/src/services/api.js
git commit -m "Update API URL for production"
git push
```

Vercel will automatically redeploy your frontend!

---

## Testing After Deployment

### Test Your Backend API
Open in browser:
```
https://your-backend-url.onrender.com/
```

You should see:
```json
{
  "message": "Stylee Backend API is running successfully!",
  "version": "1.0.0",
  ...
}
```

### Test Frontend Login/Signup
1. Open your Vercel URL: `https://stylee-gamma.vercel.app`
2. Try to sign up with a new account
3. Should work! ✅

### Test on Other Devices
1. Open Vercel URL on your phone
2. Try login/signup
3. Should work! ✅

---

## Local Development Setup (Optional)

To keep local development working, update `Frontend/.env`:

```bash
# For LOCAL testing on same WiFi network (phone, other devices)
VITE_API_URL=http://10.7.2.90:5001/api

# For LOCALHOST only testing
# VITE_API_URL=http://localhost:5001/api
```

The smart API config will:
- Use `.env` value if set (local testing)
- Use production URL when on `vercel.app` (deployed)
- Fall back to `localhost:5001` otherwise

---

## Running Migrations on Production Database

After deploying backend to Render/Railway:

```bash
# 1. Install Prisma CLI globally (if not installed)
npm install -g prisma

# 2. Set DATABASE_URL to production database
export DATABASE_URL="your-production-database-url"

# 3. Run migrations
npx prisma migrate deploy

# 4. Seed the database
node Backend/seed-better.js
```

**OR** use Render/Railway shell:
1. Go to your service dashboard
2. Click **Shell** or **Terminal**
3. Run:
```bash
npx prisma migrate deploy
node seed-better.js
```

---

## Troubleshooting

### "Failed to fetch" error on deployed site
❌ **Problem**: Frontend can't reach backend
✅ **Solution**: Check `api.js` line 12 has correct backend URL

### "Network Error" / CORS issue
❌ **Problem**: CORS blocking requests
✅ **Solution**: Backend CORS is already configured to accept Vercel. Verify backend is deployed and running.

### Database connection error
❌ **Problem**: `DATABASE_URL` not set or wrong
✅ **Solution**: Double-check environment variable in Render/Railway dashboard

### Login works locally but not deployed
❌ **Problem**: Frontend using wrong API URL
✅ **Solution**: 
1. Check browser console (F12) for API URL being used
2. Should show production URL, not `localhost`
3. Clear browser cache and try again

---

## Quick Commands Reference

### Check what API URL frontend is using:
Open browser console (F12) on your deployed site, you'll see:
```
🔗 API Base URL: https://your-backend-url.onrender.com/api
```

### Test backend health:
```bash
curl https://your-backend-url.onrender.com/
```

### Test login endpoint:
```bash
curl -X POST https://your-backend-url.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@stylee.com","password":"adminpassword"}'
```

---

## Next Steps

1. ✅ Choose Render or Railway
2. ✅ Deploy backend with PostgreSQL database
3. ✅ Note your backend URL
4. ✅ Update `Frontend/src/services/api.js` line 12
5. ✅ Commit and push changes
6. ✅ Test on deployed Vercel site
7. ✅ Test on your phone
8. 🎉 Enjoy working login/signup everywhere!

---

## Environment Variables Summary

### Backend (Render/Railway)
```bash
DATABASE_URL=postgresql://user:pass@host:5432/database
JWT_SECRET=your-secret-key-min-32-characters
NODE_ENV=production
```

### Frontend (.env) - Local Development Only
```bash
# For local network testing (phone on same WiFi)
VITE_API_URL=http://10.7.2.90:5001/api

# For localhost testing only
# VITE_API_URL=http://localhost:5001/api
```

**Note**: Don't commit `.env` file! It's in `.gitignore`.
