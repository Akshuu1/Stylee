# 🚀 Deployment Guide for MongoDB Backend

## ⚠️ Critical Fixes Made

### 1. Fixed Build Script
**Problem**: `build.sh` was trying to run `npx prisma generate` which fails since Prisma is removed.

**Solution**: Updated to only install npm dependencies.

### 2. Removed All Prisma References
All utility scripts now use Mongoose instead of Prisma.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure these environment variables are set in your deployment platform:

### Required Environment Variables

```bash
MONGODB_URI=mongodb+srv://akshata14feb_db_user:7x7eBoRK6KJ3KBkS@cluster0.7v67s6a.mongodb.net/?appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
PORT=5001
```

---

## 🔧 Deployment Instructions

### For Vercel Deployment

1. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add:`MONGODB_URI`, `JWT_SECRET`, `NODE_ENV`

2. **Deploy**:
   ```bash
   # Commit all changes
   git add .
   git commit -m "Migrated from Prisma to MongoDB"
   git push
   ```

3. **Vercel will auto-deploy** from your connected repository

### For Render Deployment

1. **Update Environment Variables** in Render Dashboard:
   - Go to your service settings
   - Update environment variables with MongoDB Atlas connection

2. **Manual Deploy** or push to trigger auto-deploy

---

## ✅ Post-Deployment Steps

### 1. Create Admin User

After first deployment, run this script on your deployment platform or locally connected to production DB:

```bash
node create-admin.js
```

This creates:
- Email: `admin@stylee.com`
- Password: `admin123`
- Role: `ADMIN`

### 2. Verify Deployment

Test these endpoints:

```bash
# Health check
curl https://your-deployed-url.com/

# Login
curl -X POST https://your-deployed-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@stylee.com","password":"admin123"}'

# Get items
curl https://your-deployed-url.com/api/items
```

---

## 🐛 Common Deployment Issues & Fixes

### Issue: "Cannot find module '@prisma/client'"

**Cause**: Old build cache or dependencies not updated

**Fix**:
1. Clear build cache in deployment platform
2. Verify `package.json` doesn't have Prisma dependencies
3. Force rebuild

### Issue: "user.role is undefined"

**Cause**: Old server code still running or JWT token from old Prisma-based backend

**Fix**:
1. Restart the deployed server
2. Clear browser local storage/cookies
3. Login again to get new JWT token with MongoDB user structure

### Issue: Database connection timeout

**Cause**: MongoDB Atlas IP whitelist or wrong connection string

**Fix**:
1. In MongoDB Atlas, go to Network Access
2. Add `0.0.0.0/0` to allow all IPs (or your deployment platform's IPs)
3. Verify `MONGODB_URI` environment variable is correct

---

## 🔒 MongoDB Atlas Configuration

### Allow Deployment Platform Access

1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add your deployment platform's specific IPs

### Database User Permissions

Ensure your database user has:
- Read and write permissions
- Database: `test` (or your chosen database name)

---

## 📊 Monitoring Deployed Backend

### Check Logs

**Vercel**: 
```bash
vercel logs your-deployment-url
```

**Render**:
- View logs in dashboard under "Logs" tab

### Expected Startup Logs

```
✅ MongoDB Connected: ac-kq1bzmj-shard-00-XX.7v67s6a.mongodb.net
📦 Database: test
🚀 Stylee Backend running on port 5001
```

---

## 🎯 Quick Deployment Commands

```bash
# 1. Ensure all changes are committed
git add .
git commit -m "Fix: Updated backend for MongoDB deployment"

# 2. Push to trigger deployment
git push origin main

# 3. After deployment, create admin user
# (Run this with production MONGODB_URI in .env)
node create-admin.js
```

---

## ✨ Deployment Complete!

Your MongoDB backend should now be deployed and working. The `user.role` error should be resolved because:

1. ✅ All Prisma code removed
2. ✅ Mongoose properly returns user with role field
3. ✅ Build script updated to work without Prisma
4. ✅ All environment variables configured

If you still encounter issues, check the deployment logs for specific error messages.
