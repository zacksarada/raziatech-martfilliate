#!/bin/bash

PORT=3003

echo "🚀 Launching RaziaTech MartFilliate..."

# Kill ALL Next.js and Node processes
echo "Stopping any existing servers..."
pkill -9 -f "next" 2>/dev/null || true
pkill -9 -f "node.*next" 2>/dev/null || true
pkill -9 -f "next-server" 2>/dev/null || true

# Wait for cleanup
sleep 2

# Check if build exists
if [ ! -f ".next/BUILD_ID" ]; then
  echo "Building application..."
  npx next build
fi

# Find available port
while lsof -i :$PORT > /dev/null 2>&1; do
  echo "Port $PORT in use, trying next..."
  PORT=$((PORT + 1))
done

echo "Starting server on port $PORT..."
echo "👉 Open: http://localhost:$PORT"
echo ""

# Start server
npx next start -p $PORT
