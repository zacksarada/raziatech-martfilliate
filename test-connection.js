const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Coba query sederhana
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('✅ Database connected successfully!');
    console.log('PostgreSQL Version:', result[0].version);
    
    // Coba query users
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users in database`);
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
