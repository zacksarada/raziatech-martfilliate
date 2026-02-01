const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkTables() {
  try {
    console.log('🔍 Checking database tables...')
    
    // Cek apakah bisa connect
    await prisma.$connect()
    console.log('✅ Connected to database')
    
    // Cek tabel products
    try {
      const count = await prisma.product.count()
      console.log(`📦 Products table exists with ${count} records`)
      
      if (count === 0) {
        console.log('No products found. Did you run the SQL in Supabase SQL Editor?')
        console.log('\n📝 Please run this SQL in Supabase SQL Editor:')
        console.log(`
          CREATE TABLE IF NOT EXISTS products (
            id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
            name VARCHAR(255) NOT NULL,
            slug VARCHAR(255) UNIQUE NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            category VARCHAR(100),
            image_url TEXT,
            created_at TIMESTAMP DEFAULT NOW()
          );
          
          INSERT INTO products (name, slug, price, category) VALUES 
            ('MikroTik RouterOS', 'mikrotik-routeros', 45.00, 'Software'),
            ('React Template', 'react-template', 89.99, 'Templates');
        `)
      }
    } catch (error) {
      console.log('❌ Products table does not exist or has different structure')
      console.log('Error:', error.message)
    }
    
  } catch (error) {
    console.error('❌ Connection error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkTables()
