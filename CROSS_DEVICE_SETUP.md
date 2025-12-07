# Cross-Device Login/Signup Fix Guide

## Problem
Login and signup were not working on your phone because the frontend was trying to connect to the backend using the phone's IP address instead of your computer's IP address.

## Solution Applied

### 1. Created Frontend `.env` File
Created `/Frontend/.env` with your computer's local network IP:
```
VITE_API_URL=http://192.168.1.13:5001/api
```

### 2. Updated Backend CORS Configuration
Enhanced `/Backend/src/index.js` to allow connections from any device on your local network.

## Setup Steps

### Step 1: Verify Your Computer's IP Address
Your computer's IP might change. Verify it's still `192.168.1.13`:

**On Mac:**
```bash
# For WiFi
ipconfig getifaddr en0

# For Ethernet
ipconfig getifaddr en1

# Or check System Settings > Network
```

### Step 2: Update .env File (if needed)
If your IP is different, update `Frontend/.env`:
```
VITE_API_URL=http://YOUR_COMPUTER_IP:5001/api
```

### Step 3: Restart Both Servers

**Backend:**
```bash
cd Backend
npm start
# or: node src/index.js
```

**Frontend:**
```bash
cd Frontend
npm run dev
# Make note of the URL shown (e.g., http://192.168.1.13:5173)
```

### Step 4: Access from Phone
1. Make sure **both devices are on the same WiFi network**
2. On your phone's browser, go to: `http://192.168.1.13:5173`
3. Try logging in or signing up

## Troubleshooting

### Issue: Phone still can't connect
**Check:**
- ✅ Both devices on same WiFi network
- ✅ Computer's firewall allows incoming connections on port 5001 and 5173
- ✅ Backend server is running (`http://192.168.1.13:5001` should show health check)
- ✅ Frontend `.env` file has correct IP address

### Issue: "Network Error" on login/signup
**Solution:**
1. Check backend logs for CORS errors
2. Verify the IP in `.env` matches your computer's actual IP
3. Make sure backend is running before frontend

### Issue: Works on computer but not phone
**Solution:**
1. Open browser console on phone (if possible) to see error messages
2. Try accessing backend health check directly on phone: `http://192.168.1.13:5001`
3. If health check doesn't work, it's a network/firewall issue

## Technical Details

### What Changed:

1. **Frontend API Configuration** (`Frontend/src/services/api.js`):
   - Now uses `VITE_API_URL` environment variable
   - Falls back to dynamic hostname detection if not set

2. **Backend CORS** (`Backend/src/index.js`):
   - Now accepts any local network IP (192.168.x.x, 10.x.x.x)
   - Still accepts localhost and production Vercel URL
   - More flexible for testing on multiple devices

### Environment Variables:
The `.env` file is read by Vite at build time. If you change it:
```bash
# Stop the dev server (Ctrl+C)
# Then restart:
npm run dev
```

## Quick Test
1. **On Computer**: Open `http://localhost:5173` - should work
2. **On Phone**: Open `http://192.168.1.13:5173` - should work
3. Try signup/login on both - should work on both now! ✨
