import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding SQLite database...')

  try {
    // Clear existing data
    console.log('Clearing existing data...')
    await prisma.socialMediaAnalytic.deleteMany()
    await prisma.content.deleteMany()
    await prisma.affiliateConversion.deleteMany()
    await prisma.affiliateClick.deleteMany()
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()
    await prisma.user.deleteMany()

    console.log('✅ Data cleared')

    // Create Admin User
    console.log('Creating admin user...')
    const adminPassword = await bcrypt.hash('admin123', 10)
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@raziatech.com',
        name: 'Admin RaziaTech',
        password: adminPassword,
        role: 'ADMIN',
        affiliateCode: 'ADMIN001',
        walletBalance: 0,
      }
    })
    console.log(`✅ Admin user created: ${adminUser.email}`)

    // Create Affiliate User
    console.log('Creating affiliate user...')
    const affiliatePassword = await bcrypt.hash('password123', 10)
    const affiliateUser = await prisma.user.create({
      data: {
        email: 'affiliate@example.com',
        name: 'John Affiliate',
        password: affiliatePassword,
        role: 'AFFILIATE',
        affiliateCode: 'AFF001',
        walletBalance: 150.75,
      }
    })
    console.log(`✅ Affiliate user created: ${affiliateUser.email}`)

    // Create Buyer User
    console.log('Creating buyer user...')
    const buyerPassword = await bcrypt.hash('password123', 10)
    const buyerUser = await prisma.user.create({
      data: {
        email: 'buyer@example.com',
        name: 'Jane Buyer',
        password: buyerPassword,
        role: 'BUYER',
        walletBalance: 0,
      }
    })
    console.log(`✅ Buyer user created: ${buyerUser.email}`)

    // Create Products
    console.log('Creating products...')

    // Software Products
    const mikrotik = await prisma.product.create({
      data: {
        name: 'MikroTik RouterOS License Level 4',
        slug: 'mikrotik-routeros-license-level-4',
        category: 'SOFTWARE',
        type: 'AFFILIATE',
        description: 'Lisensi resmi MikroTik RouterOS Level 4 untuk jaringan enterprise dengan fitur lengkap.',
        price: 299.99,
        discountPrice: 249.99,
        promoCode: 'MIKROTIK10',
        affiliateLink: 'https://mikrotik.com/buy/routeros4',
        commissionRate: 0.3,
        features: JSON.stringify([
          'Unlimited device management',
          'Advanced firewall & security',
          'VPN (PPTP, L2TP, SSTP, OpenVPN)',
          'Load balancing & failover',
          'Hotspot management',
          'Traffic analysis & monitoring'
        ]),
        requirements: JSON.stringify([
          'MikroTik hardware compatible',
          'Internet connection for activation',
          'Basic networking knowledge'
        ]),
        tutorialLink: 'https://youtube.com/watch?v=example1',
        reviewYoutubeLink: 'https://youtube.com/watch?v=example2',
        downloadLink: null,
        demoLink: 'https://demo.mikrotik.com',
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
        gallery: JSON.stringify([
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
          'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w-800'
        ]),
        tags: JSON.stringify(['networking', 'router', 'enterprise', 'vpn', 'security']),
        isActive: true,
        salesCount: 125,
        affiliateClicksCount: 450,
        views: 1200,
      }
    })
    console.log(`✅ Product created: ${mikrotik.name}`)

    // Ebook Product
    const pythonEbook = await prisma.product.create({
      data: {
        name: 'Python Mastery: From Zero to Hero',
        slug: 'python-mastery-ebook',
        category: 'EBOOK',
        type: 'OWN_PRODUCT',
        description: 'Ebook lengkap pembelajaran Python dari dasar hingga advanced dengan 50+ project.',
        price: 29.99,
        commissionRate: 0.5,
        features: JSON.stringify([
          '500+ halaman konten',
          '50+ project praktis',
          'Download PDF & EPUB',
          'Akses lifetime',
          'Source code lengkap',
          'Certificate of completion'
        ]),
        requirements: JSON.stringify(['Basic programming knowledge']),
        tutorialLink: 'https://youtube.com/watch?v=example3',
        reviewYoutubeLink: 'https://youtube.com/watch?v=example4',
        downloadLink: 'https://drive.google.com/file/example',
        demoLink: 'https://sample.pythonmastery.com',
        coverImage: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec9?w=800',
        gallery: JSON.stringify([]),
        tags: JSON.stringify(['programming', 'python', 'ebook', 'learning', 'coding']),
        isActive: true,
        salesCount: 89,
        affiliateClicksCount: 320,
        views: 850,
      }
    })
    console.log(`✅ Product created: ${pythonEbook.name}`)

    // Template Product
    const reactTemplate = await prisma.product.create({
      data: {
        name: 'React E-commerce Template Pro',
        slug: 'react-ecommerce-template-pro',
        category: 'TEMPLATE',
        type: 'OWN_PRODUCT',
        description: 'Template React modern untuk toko online dengan dashboard admin lengkap.',
        price: 49.99,
        discountPrice: 39.99,
        promoCode: 'REACT20',
        commissionRate: 0.4,
        features: JSON.stringify([
          'Built with React 18 + Next.js 14',
          'Complete shopping cart',
          'Admin dashboard with analytics',
          'Mobile responsive design',
          'Payment integration ready',
          'SEO optimized'
        ]),
        requirements: JSON.stringify(['Node.js 18+', 'React basic knowledge']),
        tutorialLink: 'https://youtube.com/watch?v=example5',
        reviewYoutubeLink: 'https://youtube.com/watch?v=example6',
        downloadLink: 'https://github.com/raziatech/react-ecommerce',
        demoLink: 'https://demo.raziatech.com/react-ecommerce',
        coverImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
        gallery: JSON.stringify([]),
        tags: JSON.stringify(['react', 'template', 'ecommerce', 'web', 'development']),
        isActive: true,
        salesCount: 67,
        affiliateClicksCount: 210,
        views: 550,
      }
    })
    console.log(`✅ Product created: ${reactTemplate.name}`)

    // Course Product
    const digitalMarketing = await prisma.product.create({
      data: {
        name: 'Digital Marketing Mastery 2024',
        slug: 'digital-marketing-mastery-course',
        category: 'COURSE',
        type: 'AFFILIATE',
        description: 'Kursus lengkap digital marketing untuk pemula hingga advanced.',
        price: 99.99,
        commissionRate: 0.35,
        features: JSON.stringify([
          '30+ hours video content',
          '10 real-world projects',
          'Facebook/Google Ads training',
          'SEO & content marketing',
          'Social media strategies',
          'Certificate included'
        ]),
        requirements: JSON.stringify(['Internet connection', 'Basic computer skills']),
        tutorialLink: 'https://youtube.com/watch?v=example7',
        reviewYoutubeLink: 'https://youtube.com/watch?v=example8',
        downloadLink: null,
        demoLink: 'https://sample.digitalmarketing.com',
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        gallery: JSON.stringify([]),
        tags: JSON.stringify(['marketing', 'course', 'digital', 'seo', 'social-media']),
        isActive: true,
        salesCount: 142,
        affiliateClicksCount: 380,
        views: 920,
      }
    })
    console.log(`✅ Product created: ${digitalMarketing.name}`)

    // Tool Product
    const seoTool = await prisma.product.create({
      data: {
        name: 'SEO Analyzer Pro Tool',
        slug: 'seo-analyzer-pro-tool',
        category: 'TOOL',
        type: 'OWN_PRODUCT',
        description: 'Tools analisis SEO lengkap untuk optimasi website.',
        price: 79.99,
        commissionRate: 0.45,
        features: JSON.stringify([
          'Keyword research & analysis',
          'Backlink checker',
          'Site audit tools',
          'Competitor analysis',
          'Rank tracking',
          'Report generation'
        ]),
        requirements: JSON.stringify(['Website URL to analyze']),
        tutorialLink: 'https://youtube.com/watch?v=example9',
        reviewYoutubeLink: 'https://youtube.com/watch?v=example10',
        downloadLink: 'https://download.raziatech.com/seo-analyzer',
        demoLink: 'https://demo.raziatech.com/seo-tool',
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        gallery: JSON.stringify([]),
        tags: JSON.stringify(['seo', 'tool', 'analysis', 'marketing', 'website']),
        isActive: true,
        salesCount: 54,
        affiliateClicksCount: 180,
        views: 420,
      }
    })
    console.log(`✅ Product created: ${seoTool.name}`)

    // Create sample content for social media
    console.log('Creating sample social media content...')
    await prisma.content.create({
      data: {
        title: 'Review MikroTik RouterOS - Best for Enterprise',
        description: 'Video review lengkap tentang MikroTik RouterOS License',
        type: 'video',
        platform: 'youtube',
        url: 'https://youtube.com/watch?v=review-mikrotik',
        createdById: adminUser.id,
        productId: mikrotik.id,
        status: 'published',
        publishedAt: new Date(),
      }
    })

    console.log('\n🎉 Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`- Users: 3 (Admin, Affiliate, Buyer)`)
    console.log(`- Products: 5 (Software, Ebook, Template, Course, Tool)`)
    console.log(`- Social Media Content: 1`)

  } catch (error) {
    console.error('\n❌ Seeding failed:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
