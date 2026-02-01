import Link from "next/link";

// Mock data
const featuredProducts = [
  {
    id: '1',
    name: 'MikroTik License',
    description: 'Professional networking software',
    price: 199.99,
    commission: 49.99
  },
  {
    id: '2', 
    name: 'React Template',
    description: 'Premium admin dashboard',
    price: 89.99,
    commission: 29.99
  },
  {
    id: '3',
    name: 'Python Course',
    description: 'Data science masterclass',
    price: 149.99,
    commission: 39.99
  }
];

const categories = [
  { id: '1', name: 'Software Tools' },
  { id: '2', name: 'Website Templates' },
  { id: '3', name: 'Online Courses' },
  { id: '4', name: 'E-Books' }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">
            Earn Commissions Promoting Digital Products
          </h1>
          <p className="text-xl mb-8">
            Join our affiliate program and start earning today
          </p>
          <div className="space-x-4">
            <Link href="/auth/signup" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
              Sign Up Free
            </Link>
            <Link href="/products" className="border border-white text-white px-6 py-3 rounded-lg font-semibold">
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <span className="text-green-600 font-bold">${product.commission} commission</span>
                </div>
                <Link 
                  href={`/products/${product.id}`}
                  className="block w-full text-center mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
