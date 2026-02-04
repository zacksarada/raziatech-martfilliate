// Simple database utility for SQLite with mock data

// Mock data for products
const mockProducts = [
  {
    id: '1',
    name: 'MikroTik RouterOS License Level 4',
    description: 'Lisensi resmi MikroTik RouterOS Level 4 untuk jaringan enterprise dengan fitur lengkap.',
    category: 'SOFTWARE',
    type: 'AFFILIATE',
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Python Mastery: From Zero to Hero',
    description: 'Ebook lengkap pembelajaran Python dari dasar hingga advanced dengan 50+ project.',
    category: 'EBOOK',
    type: 'OWN_PRODUCT',
    price: 29.99,
    discountPrice: null,
    promoCode: null,
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'React E-commerce Template Pro',
    description: 'Template React modern untuk toko online dengan dashboard admin lengkap.',
    category: 'TEMPLATE',
    type: 'OWN_PRODUCT',
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Digital Marketing Mastery 2024',
    description: 'Kursus lengkap digital marketing untuk pemula hingga advanced.',
    category: 'COURSE',
    type: 'AFFILIATE',
    price: 99.99,
    discountPrice: null,
    promoCode: null,
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'SEO Analyzer Pro Tool',
    description: 'Tools analisis SEO lengkap untuk optimasi website.',
    category: 'TOOL',
    type: 'OWN_PRODUCT',
    price: 79.99,
    discountPrice: null,
    promoCode: null,
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
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// Mock database
export const prisma = {
  product: {
    findMany: async ({ where = {} }: any = {}) => {
      let filteredProducts = [...mockProducts];
      
      // Apply category filter
      if (where.category) {
        filteredProducts = filteredProducts.filter(p => 
          p.category.toLowerCase() === where.category.toLowerCase()
        );
      }
      
      // Apply search filter
      if (where.OR) {
        const searchTerm = where.OR[0]?.name?.contains?.toLowerCase() || 
                          where.OR[0]?.description?.contains?.toLowerCase();
        if (searchTerm) {
          filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.description?.toLowerCase().includes(searchTerm)
          );
        }
      }
      
      // Apply isActive filter
      if (where.isActive !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.isActive === where.isActive);
      }
      
      // Apply sorting
      if (where.orderBy) {
        const [key, order] = Object.entries(where.orderBy)[0];
        filteredProducts.sort((a: any, b: any) => {
          if (order === 'desc') {
            return b[key] - a[key];
          }
          return a[key] - b[key];
        });
      }
      
      return filteredProducts;
    },
    
    findFirst: async ({ where = {} }: any = {}) => {
      if (where.id) {
        return mockProducts.find(p => p.id === where.id) || null;
      }
      if (where.slug) {
        return mockProducts.find(p => 
          p.name.toLowerCase().replace(/\s+/g, '-') === where.slug
        ) || null;
      }
      return mockProducts[0] || null;
    },
    
    groupBy: async ({ by }: any) => {
      if (by === 'category') {
        const categories = ['SOFTWARE', 'EBOOK', 'TEMPLATE', 'COURSE', 'TOOL'];
        return categories.map(category => ({
          category,
          _count: { id: mockProducts.filter(p => p.category === category).length }
        }));
      }
      return [];
    },
    
    aggregate: async ({ _sum }: any) => {
      if (_sum?.salesCount) {
        const total = mockProducts.reduce((sum, p) => sum + p.salesCount, 0);
        return { _sum: { salesCount: total } };
      }
      return { _sum: {} };
    },
  },
  
  user: {
    findUnique: async ({ where }: any) => {
      if (where.email === 'admin@raziatech.com') {
        return {
          id: '1',
          email: 'admin@raziatech.com',
          name: 'Admin RaziaTech',
          role: 'ADMIN',
          affiliateCode: 'ADMIN001',
          walletBalance: 0,
        };
      }
      return null;
    },
  },
  
  affiliateClick: {
    count: async () => 0,
  },
  
  affiliateConversion: {
    count: async () => 0,
    aggregate: async () => ({ _sum: { commissionEarned: 0 } }),
    findMany: async () => [],
  },
};

// Helper function to parse JSON strings from SQLite
export function parseJsonField<T>(jsonString: string | null): T[] {
  if (!jsonString) return [] as T[];
  try {
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed as T[] : [] as T[];
  } catch {
    return [] as T[];
  }
}

// Helper to stringify arrays for SQLite
export function stringifyJsonField(data: any[]): string {
  return JSON.stringify(data);
}
