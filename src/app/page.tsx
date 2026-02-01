import ProductCard from '@/components/ProductCard'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  // Fetch featured products
  const featuredProducts = await prisma.product.findMany({
    where: { 
      isActive: true,
      isFeatured: true 
    },
    take: 4,
    orderBy: { createdAt: 'desc' }
  })

  // Fetch all categories
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    take: 8
  })

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            RaziaTech MartFilliate
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Marketplace for Digital Products with Powerful Affiliate System
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/products" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Browse Products
            </a>
            <a 
              href="/affiliate" 
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition"
            >
              Join Affiliate Program
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <a href="/products" className="text-blue-600 hover:text-blue-800 font-medium">
            View All →
          </a>
        </div>
        
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No featured products yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <a 
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-3">{category.icon || '📦'}</div>
                  <h3 className="font-semibold text-gray-800">{category.name}</h3>
                  {category.description && (
                    <p className="text-gray-600 text-sm mt-2">{category.description}</p>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already selling and earning with our platform
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="/auth/signup" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Sign Up Free
          </a>
          <a 
            href="/about" 
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-300 transition"
          >
            Learn More
          </a>
        </div>
      </section>
    </main>
  )
}
