export default function AffiliateSignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Affiliate Program</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Earn generous commissions promoting high-quality digital products. 
            Join thousands of successful affiliates earning with our platform.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-blue-600">50%</div>
            <div className="text-gray-600 mt-2">Max Commission</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-green-600">$1M+</div>
            <div className="text-gray-600 mt-2">Paid to Affiliates</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-purple-600">500+</div>
            <div className="text-gray-600 mt-2">Digital Products</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-orange-600">Instant</div>
            <div className="text-gray-600 mt-2">Payouts</div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Sign Up</h3>
              <p className="text-gray-600">
                Create your free affiliate account in minutes. No fees, no commitments.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Your Links</h3>
              <p className="text-gray-600">
                Generate unique affiliate links for any product in our marketplace.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Start Earning</h3>
              <p className="text-gray-600">
                Share your links and earn commissions on every sale. Payouts every 30 days.
              </p>
            </div>
          </div>
        </div>

        {/* Commission Structure */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Commission Structure</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commission Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cookie Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Example Earnings
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Software & Tools</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-blue-600">40-50%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">90 days</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Earn $200 on a $400 product
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Online Courses</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-green-600">30-40%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">60 days</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Earn $120 on a $300 course
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">E-books & Templates</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-purple-600">25-35%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">30 days</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Earn $35 on a $100 ebook
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our affiliate program today and start earning commissions on premium digital products.
          </p>
          <div className="space-y-4 max-w-md mx-auto">
            <a
              href="/auth/signup?role=AFFILIATE"
              className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition text-lg"
            >
              Sign Up as Affiliate - It's Free!
            </a>
            <a
              href="/affiliate"
              className="block w-full border-2 border-blue-600 text-blue-600 font-semibold py-4 px-6 rounded-xl hover:bg-blue-50 transition"
            >
              Already an affiliate? Go to Dashboard
            </a>
            <a
              href="/products"
              className="block text-blue-600 hover:text-blue-800 font-medium"
            >
              Browse Products to Promote →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
