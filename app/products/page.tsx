import ProductCard from "@/components/ProductCard";
import { Filter, Search, TrendingUp, Award, Clock, Shield } from "lucide-react";

// Mock data with complete structure
const mockProducts = [
  {
    id: '1',
    name: 'MikroTik RouterOS License',
    description: 'Professional networking software license for MikroTik routers with lifetime updates and premium support.',
    price: 199.99,
    commission: 49.99,
    category: { name: 'Software Tools' },
    imageUrl: '/api/placeholder/400/300',
    tags: ['Best Seller', 'High Commission', 'IT']
  },
  {
    id: '2',
    name: 'React Admin Dashboard Pro',
    description: 'Premium React template with 50+ components, dark mode, and complete admin functionality.',
    price: 89.99,
    commission: 29.99,
    category: { name: 'Website Templates' },
    imageUrl: '/api/placeholder/400/300',
    tags: ['Popular', 'Developer', 'Template']
  },
  {
    id: '3',
    name: 'Python for Data Science Masterclass',
    description: 'Complete Python course covering data science, machine learning, and data visualization projects.',
    price: 149.99,
    commission: 39.99,
    category: { name: 'Online Courses' },
    imageUrl: '/api/placeholder/400/300',
    tags: ['Hot', 'Education', 'Programming']
  },
  {
    id: '4',
    name: 'Digital Marketing E-Book Bundle',
    description: 'Collection of 10 e-books covering SEO, social media, email marketing, and conversion optimization.',
    price: 49.99,
    commission: 19.99,
    category: { name: 'E-Books' },
    imageUrl: '/api/placeholder/400/300',
    tags: ['Bundle', 'Marketing', 'Digital']
  },
  {
    id: '5',
    name: 'WordPress SEO Plugin Pro',
    description: 'Advanced SEO plugin for WordPress with AI optimization and real-time analytics dashboard.',
    price: 79.99,
    commission: 31.99,
    category: { name: 'Software Tools' },
    imageUrl: '/api/placeholder/400/300',
    tags: ['WordPress', 'SEO', 'Plugin']
  },
  {
    id: '6',
    name: 'UI/UX Design System & Components',
    description: 'Complete design system with Figma components, design guidelines, and implementation resources.',
    price: 129.99,
    commission: 45.99,
    category: { name: 'Design Resources' },
    imageUrl: '/api/placeholder/400/300',
    tags: ['Design', 'Figma', 'System']
  },
];

const categories = [
  { id: '1', name: 'All Products', count: 24, icon: '📦' },
  { id: '2', name: 'Software Tools', count: 8, icon: '🛠️' },
  { id: '3', name: 'Online Courses', count: 6, icon: '🎓' },
  { id: '4', name: 'E-Books', count: 5, icon: '📚' },
  { id: '5', name: 'Website Templates', count: 4, icon: '💻' },
  { id: '6', name: 'Design Resources', count: 3, icon: '🎨' },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Affiliate Products Catalog</h1>
            <p className="text-xl text-blue-100 mb-8">
              Browse our collection of high-converting digital products. Earn up to 50% commission on every sale!
            </p>
            
            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 flex items-center">
              <div className="flex-1 flex items-center px-4">
                <Search className="text-blue-200 mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Search products by name, category, or keyword..."
                  className="bg-transparent text-white placeholder-blue-200 w-full focus:outline-none"
                />
              </div>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-6">
              <h2 className="text-lg font-bold mb-6 flex items-center">
                <Filter className="mr-2" size={20} />
                Filter Products
              </h2>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4 text-gray-700">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition text-left"
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Commission Range */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4 text-gray-700">Commission Range</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Under $20', count: 8 },
                    { label: '$20 - $50', count: 12 },
                    { label: '$50 - $100', count: 3 },
                    { label: 'Over $100', count: 1 },
                  ].map((range) => (
                    <button
                      key={range.label}
                      className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-50 transition"
                    >
                      <span className="text-gray-600">{range.label}</span>
                      <span className="text-sm text-gray-500">{range.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4 text-gray-700">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp size={16} className="text-green-500 mr-2" />
                      <span className="text-sm">Avg. Commission</span>
                    </div>
                    <span className="font-bold">35%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award size={16} className="text-yellow-500 mr-2" />
                      <span className="text-sm">Best Seller</span>
                    </div>
                    <span className="font-bold">MikroTik License</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock size={16} className="text-blue-500 mr-2" />
                      <span className="text-sm">Cookie Duration</span>
                    </div>
                    <span className="font-bold">30 Days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield size={16} className="text-purple-500 mr-2" />
                      <span className="text-sm">Payment Security</span>
                    </div>
                    <span className="font-bold">Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Stats Bar */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-gray-600">Total Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$49.99</div>
                  <div className="text-sm text-gray-600">Highest Commission</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">4.2%</div>
                  <div className="text-sm text-gray-600">Avg. Conversion</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">30</div>
                  <div className="text-sm text-gray-600">Day Cookie</div>
                </div>
              </div>
            </div>

            {/* Product Grid Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-bold mb-4 sm:mb-0">All Products ({mockProducts.length})</h2>
              <div className="flex items-center space-x-2">
                <select className="border rounded-lg px-4 py-2 bg-white">
                  <option>Sort by: Commission (High to Low)</option>
                  <option>Sort by: Price (Low to High)</option>
                  <option>Sort by: Popularity</option>
                  <option>Sort by: Newest</option>
                </select>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Advanced Filter
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Previous</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">3</button>
                <span className="px-2">...</span>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">10</button>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Next</button>
              </nav>
            </div>

            {/* Affiliate Benefits */}
            <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Why Promote Our Products?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-3xl mb-4">💰</div>
                  <h3 className="font-bold mb-2">High Commissions</h3>
                  <p className="text-gray-600">Earn up to 50% commission on every sale you refer.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-3xl mb-4">⚡</div>
                  <h3 className="font-bold mb-2">Instant Payouts</h3>
                  <p className="text-gray-600">Get paid instantly via PayPal, bank transfer, or crypto.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-3xl mb-4">📊</div>
                  <h3 className="font-bold mb-2">Real-time Tracking</h3>
                  <p className="text-gray-600">Monitor clicks, conversions, and earnings in real-time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
