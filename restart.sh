#!/bin/bash
echo "🔄 Restarting RaziaTech Martfilliate..."
pkill -f "next" 2>/dev/null || true
rm -rf .next
npm run dev
