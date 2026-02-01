#!/bin/bash

echo "=== PRODUCTION DEPLOYMENT ==="
echo ""

# 1. Build
echo "1. Building application..."
npx next build

# 2. Find available port
PORT=3000
while lsof -i :$PORT > /dev/null 2>&1; do
  PORT=$((PORT + 1))
done

# 3. Start
echo "2. Starting server on port $PORT..."
echo ""
echo "   🔗 Application URL: http://localhost:$PORT"
echo "   🔗 Products: http://localhost:$PORT/products"
echo "   🔗 Sign In: http://localhost:$PORT/auth/signin"
echo ""
echo "   Test accounts:"
echo "     Admin: admin@example.com / password123"
echo "     Affiliate: affiliate@example.com / password123"
echo ""
echo "3. Server starting..."
echo "   Press Ctrl+C to stop"
echo ""

npx next start -p $PORT
