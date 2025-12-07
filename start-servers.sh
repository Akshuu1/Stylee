#!/bin/bash

# Stylee - Quick Start Script for Cross-Device Testing
# This script starts both backend and frontend servers

echo "🚀 Starting Stylee Backend and Frontend..."
echo ""

# Get current IP
CURRENT_IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "unknown")
echo "📡 Your computer's IP: $CURRENT_IP"
echo ""

# Check if .env file has the correct IP
if [ -f "Frontend/.env" ]; then
    if grep -q "$CURRENT_IP" Frontend/.env; then
        echo "✅ Frontend .env is configured correctly"
    else
        echo "⚠️  Warning: Frontend/.env IP might be outdated"
        echo "   Current IP: $CURRENT_IP"
        echo "   Update Frontend/.env if needed"
    fi
else
    echo "❌ Frontend/.env not found"
fi

echo ""
echo "Starting servers..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Start backend in background
cd Backend
echo "📦 Starting Backend..."
npm start &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend
cd ../Frontend
echo "🎨 Starting Frontend..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📱 To test on your phone:"
echo "   1. Make sure phone is on same WiFi"
echo "   2. Open: http://$CURRENT_IP:5173"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npm run dev

# When frontend stops, also stop backend
kill $BACKEND_PID 2>/dev/null
