#!/bin/bash

echo "🚀 Starting RaziaTech Martfilliate..."

# Clean cache
rm -rf .next
rm -rf node_modules/.cache

# Check and fix config files
if [ -f "next.config.ts" ]; then
    echo "⚠️  Removing unsupported next.config.ts..."
    rm next.config.ts
fi

if [ ! -f "next.config.js" ]; then
    echo "📝 Creating next.config.js..."
    cat > next.config.js << 'CONFIG'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ['localhost'] },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
}
module.exports = nextConfig
CONFIG
fi

# Start the application
echo "✅ Starting Next.js dev server..."
exec npm run dev
