console.log('Starting database test...')

// Coba require Prisma
try {
  const { PrismaClient } = require('@prisma/client')
  console.log('✅ Prisma loaded successfully')
  
  const prisma = new PrismaClient()
  console.log('✅ Prisma client created')
  
  // Test simple query
  prisma.$queryRaw`SELECT 1 as test`
    .then(result => {
      console.log('✅ Database query successful:', result)
      return prisma.$disconnect()
    })
    .then(() => {
      console.log('✅ Disconnected from database')
      process.exit(0)
    })
    .catch(error => {
      console.error('❌ Database error:', error.message)
      prisma.$disconnect()
      process.exit(1)
    })
    
} catch (error) {
  console.error('❌ Prisma loading error:', error.message)
  process.exit(1)
}
