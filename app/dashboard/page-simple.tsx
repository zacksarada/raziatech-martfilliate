import Link from "next/link";

export default async function HomePage() {
  // No session check for now
  const session = null
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">RaziaTech Martfilliate</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Affiliate marketing platform (Deployment Version)
          </p>
          <div className="space-x-4">
            <Link href="/products" className="bg-blue-600 text-white px-8 py-3 rounded-lg">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
