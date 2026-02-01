#!/bin/bash

PORT=${1:-3001}

echo "Starting RaziaTech MartFilliate on port $PORT..."

# Kill existing processes on this port
echo "Checking port $PORT..."
if lsof -i :$PORT > /dev/null 2>&1; then
  echo "Port $PORT is in use, killing processes..."
  pkill -f "next.*$PORT" 2>/dev/null || true
  pkill -f "node.*$PORT" 2>/dev/null || true
  sleep 2
fi

# Check if build exists
if [ ! -f ".next/BUILD_ID" ]; then
  echo "No build found, building first..."
  npx next build
fi

# Start server
echo "Starting production server..."
npx next start -p $PORT
