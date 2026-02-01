import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  try {
    // Create admin user
    const hashedPassword = await hash('admin123', 12)
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@raziatech.com' },
      update: {},
      create: {
        email: 'admin@raziatech.com',
        name: 'Admin RaziaTech',
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date(),
      },
    })

    // Create categories
    const categories = await prisma.category.createMany({
      data: [
        { 
          id: 'cat-software',
          name: 'Software Tools', 
          slug: 'software-tools', 
          icon: '💻', 
          color: '#3B82F6',
          description: 'Essential software tools'
        },
        { 
          id: 'cat-templates',
          name: 'Website Templates', 
          slug: 'website-templates', 
          icon: '🎨', 
          color: '#8B5CF6',
          description: 'Modern website templates'
        },
        { 
          id: 'cat-ebooks',
          name: 'E-Books & Guides', 
          slug: 'e-books', 
          icon: '📚', 
          color: '#10B981',
          description: 'Digital books and guides'
        },
        { 
          id: 'cat-courses',
          name: 'Online Courses', 
          slug: 'online-courses', 
          icon: '🎓', 
          color: '#EF4444',
          description: 'Video courses'
        },
      ],
      skipDuplicates: true,
    })

    // Create sample products
    const products = await prisma.product.createMany({
      data: [
        {
          sku: 'MT-001',
          name: 'MikroTik RouterOS License',
          slug: 'mikrotik-routeros-license',
          description: 'Professional networking license',
          productType: 'AFFILIATE_PRODUCT',
          basePrice: 45.00,
          salePrice: 39.99,
          isOnSale: true,
          currency: 'USD',
          categoryId: 'cat-software',
          imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
          affiliateUrl: 'https://mikrotik.com/buy',
          tags: ['networking', 'router'],
          isFeatured: true,
        },
        {
          sku: 'RT-001',
          name: 'React Admin Template',
          slug: 'react-admin-template',
          description: 'Modern React admin dashboard',
          productType: 'OWN_PRODUCT',
          basePrice: 89.99,
          salePrice: 69.99,
          isOnSale: true,
          currency: 'USD',
          categoryId: 'cat-templates',
          imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400',
          downloadUrl: '#',
          tags: ['react', 'template'],
          isFeatured: true,
        },
      ],
      skipDuplicates: true,
    })

    console.log('✅ Seeding completed!')
    console.log(`👤 Admin: ${admin.email}`)
    console.log(`📦 Categories: ${categories.count}`)
    console.log(`📦 Products: ${products.count}`)
    
  } catch (error) {
    console.error('❌ Seeding error:', error)
    throw error
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
