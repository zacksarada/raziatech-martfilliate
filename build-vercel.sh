#!/bin/bash
echo "🚀 Building for Vercel..."
echo "========================="

# Clean
rm -rf .next node_modules package-lock.json

# Install with exact versions
echo "Installing dependencies..."
npm ci --legacy-peer-deps

# Generate Prisma
echo "Generating Prisma client..."
npx prisma generate

# Build
echo "Building Next.js..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📦 Next.js version: $(npm list next | grep next)"
    echo "📦 Prisma version: $(npm list prisma | grep prisma)"
else
    echo "❌ Build failed"
    exit 1
fi
