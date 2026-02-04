import Link from "next/link";

export default function HomePage() {
  // No server-side auth check during build
  const session = null
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">RaziaTech Martfilliate</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your premier platform for digital products and affiliate marketing.
            Earn up to 50% commission by promoting high-quality digital products.
          </p>
          
          {!session ? (
            <div className="space-x-4">
              <Link
                href="/auth/signin"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                href="/products"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Browse Products
              </Link>
              <Link
                href="/affiliate"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Affiliate Dashboard
              </Link>
            </div>
          )}
        </div>

        {/* Features - tetap sama */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">🛒</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Digital Products</h3>
            <p className="text-gray-600">
              Browse our collection of premium digital products.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Earn Commissions</h3>
            <p className="text-gray-600">
              Become an affiliate and earn up to 50% commission.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Instant Access</h3>
            <p className="text-gray-600">
              Get instant access to products after purchase.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our affiliate program today!
          </p>
          <div className="space-x-4">
            <Link
              href="/affiliate/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Become an Affiliate
            </Link>
            <Link
              href="/products"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
