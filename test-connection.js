const { PrismaClient } = require('@prisma/client')

async function main() {
  const prisma = new PrismaClient()
  
  console.log('🔍 Testing database connection...')
  
  try {
    // Test 1: Simple query
    const result = await prisma.$queryRaw`SELECT version() as version`
    console.log('✅ Database connected')
    console.log('📊 PostgreSQL version:', result[0].version)
    
    // Test 2: Check if tables exist
    const tables = await prisma.$queryRaw`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `
    console.log('\n📋 Tables in database:')
    tables.forEach((table, i) => {
      console.log(`  ${i + 1}. ${table.tablename}`)
    })
    
    // Test 3: Try to access products table
    try {
      const productCount = await prisma.product.count()
      console.log(`\n📦 Products count: ${productCount}`)
      
      if (productCount > 0) {
        const products = await prisma.product.findMany({
          take: 2,
          select: { name: true, price: true }
        })
        console.log('Sample products:', products)
      } else {
        console.log('No products found. Creating test product...')
        await prisma.product.create({
          data: {
            name: 'Test Product',
            slug: 'test-product-' + Date.now(),
            price: 19.99,
            category: 'Test'
          }
        })
        console.log('✅ Test product created')
      }
    } catch (tableError) {
      console.log('❌ Products table error:', tableError.message)
      console.log('Creating products table...')
      
      // Try to create table
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS products (
          id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          category VARCHAR(100),
          image_url TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `
      console.log('✅ Products table created')
    }
    
  } catch (error) {
    console.error('❌ Connection error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

main()
