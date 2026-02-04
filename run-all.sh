#!/bin/bash

echo "🚀 Starting RaziaTech Martfilliate Setup..."
echo "=========================================="

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 2. Generate Prisma client
echo "⚙️  Generating Prisma client..."
npx prisma generate

# 3. Push database schema
echo "🗄️  Pushing database schema..."
npx prisma db push --accept-data-loss

# 4. Run seed data
echo "🌱 Seeding database..."
npx tsx scripts/seed.ts

# 5. Create build
echo "🔨 Creating build..."
npm run build

# 6. Start the application
echo "🚀 Starting application..."
npm run dev
