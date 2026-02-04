import { prisma, parseJsonField } from "@/lib/database";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { Search, Filter, TrendingUp, Star } from "lucide-react";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    search?: string;
    sort?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, search, sort = 'popular' } = searchParams;

  // Build where clause
  const where: any = {
    isActive: true,
  };

  if (category && category !== 'all') {
    where.category = category.toUpperCase();
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  // Build orderBy clause
  let orderBy: any = {};
  switch (sort) {
    case 'newest':
      orderBy = { createdAt: 'desc' };
      break;
    case 'price-low':
      orderBy = { price: 'asc' };
      break;
    case 'price-high':
      orderBy = { price: 'desc' };
      break;
    case 'commission':
      orderBy = { commissionRate: 'desc' };
      break;
    default: // popular
      orderBy = { salesCount: 'desc' };
  }

  // Fetch products
  const products = await prisma.product.findMany({
    where,
    orderBy,
  });

  // Get categories for filter
  const categories = await prisma.product.groupBy({
    by: ['category'],
  });

  // Stats
  const totalProducts = products.length;
  const totalSales = await prisma.product.aggregate({
    _sum: {
      salesCount: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Digital Products
          </h1>
          <p className="text-gray-600 text-lg">
            Discover {totalProducts} products to sell or promote. Earn commissions up to 50%.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="text-2xl font-bold text-gray-900">{totalProducts}</div>
              <div className="text-sm text-gray-600">Total Products</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="text-2xl font-bold text-green-600">
                {totalSales._sum.salesCount?.toLocaleString() || '0'}
              </div>
              <div className="text-sm text-gray-600">Total Sales</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="text-2xl font-bold text-blue-600">50%</div>
              <div className="text-sm text-gray-600">Max Commission</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="text-2xl font-bold text-purple-600">500+</div>
              <div className="text-sm text-gray-600">Active Affiliates</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters 
              categories={categories}
              activeCategory={category}
              activeSort={sort}
              searchQuery={search}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Results header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {products.length} {products.length === 1 ? 'product' : 'products'} found
                </h2>
                {search && (
                  <p className="text-sm text-gray-600">
                    Search results for: <span className="font-semibold">"{search}"</span>
                  </p>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}

            {/* Call to Action */}
            {products.length > 0 && (
              <div className="mt-12 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Ready to Earn More?</h3>
                    <p className="opacity-90">
                      Join our affiliate program and start earning commissions today.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <a
                      href="/affiliate/signup"
                      className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                      Become an Affiliate
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
