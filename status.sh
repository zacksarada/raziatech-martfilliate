#!/bin/bash

echo "=== SYSTEM STATUS ==="
echo ""

# Check processes
echo "Next.js processes:"
ps aux | grep -E "(next|node.*next)" | grep -v grep || echo "  None"

echo ""
echo "Ports 3000-3010:"
for port in {3000..3010}; do
  if lsof -i :$port > /dev/null 2>&1; then
    echo "  Port $port: IN USE"
  fi
done

echo ""
echo "Build status:"
if [ -f ".next/BUILD_ID" ]; then
  echo "  ✅ Build exists (ID: $(cat .next/BUILD_ID 2>/dev/null || echo 'unknown'))"
else
  echo "  ❌ No build found"
fi
