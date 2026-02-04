import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding SQLite database...')
  
  // Clear existing data
  console.log('Clearing existing data...')
  await prisma.sale.deleteMany()
  await prisma.affiliateLink.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()
  console.log('✅ Data cleared')
  
  // Create admin user
  console.log('Creating admin user...')
  const admin = await prisma.user.create({
    data: {
      email: 'admin@raziatech.com',
      name: 'Admin RaziaTech',
      password: 'admin123', // In production, use hashed password
      role: 'ADMIN',
      affiliateCode: 'ADMIN001',
    },
  })
  console.log('✅ Admin user created:', admin.email)
  
  // Create affiliate user
  console.log('Creating affiliate user...')
  const affiliate = await prisma.user.create({
    data: {
      email: 'affiliate@example.com',
      name: 'John Affiliate',
      password: 'password123',
      role: 'AFFILIATE',
      affiliateCode: 'AFF001',
    },
  })
  console.log('✅ Affiliate user created:', affiliate.email)
  
  // Create buyer user
  console.log('Creating buyer user...')
  const buyer = await prisma.user.create({
    data: {
      email: 'buyer@example.com',
      name: 'Jane Buyer',
      password: 'password123',
      role: 'BUYER',
    },
  })
  console.log('✅ Buyer user created:', buyer.email)
  
  // Create products
  console.log('Creating products...')
  
  const products = [
    {
      name: 'MikroTik RouterOS License Level 4',
      description: 'Professional networking software license for MikroTik routers.',
      price: 199.99,
      category: 'SOFTWARE',
      commissionRate: 30.0,
      imageUrl: '/images/mikrotik.jpg',
    },
    {
      name: 'Python Mastery: From Zero to Hero',
      description: 'Complete Python programming course for beginners to advanced.',
      price: 49.99,
      category: 'EBOOK',
      commissionRate: 40.0,
      imageUrl: '/images/python.jpg',
    },
    {
      name: 'React E-commerce Template Pro',
      description: 'Premium React.js template for building e-commerce websites.',
      price: 129.99,
      category: 'TEMPLATE',
      commissionRate: 50.0,
      imageUrl: '/images/react-template.jpg',
    },
    {
      name: 'Digital Marketing Mastery 2024',
      description: 'Latest strategies and techniques for digital marketing success.',
      price: 299.99,
      category: 'COURSE',
      commissionRate: 45.0,
      imageUrl: '/images/digital-marketing.jpg',
    },
    {
      name: 'SEO Analyzer Pro Tool',
      description: 'Advanced SEO analysis tool with competitor tracking.',
      price: 89.99,
      category: 'TOOL',
      commissionRate: 35.0,
      imageUrl: '/images/seo-tool.jpg',
    },
  ]
  
  for (const product of products) {
    const created = await prisma.product.create({
      data: product,
    })
    console.log(`✅ Product created: ${created.name}`)
  }
  
  console.log('\n🎉 Database seeding completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`- Users: 3 (Admin, Affiliate, Buyer)`)
  console.log(`- Products: 5 (Software, Ebook, Template, Course, Tool)`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
