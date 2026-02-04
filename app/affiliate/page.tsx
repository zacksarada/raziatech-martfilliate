import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/database";
import { redirect } from "next/navigation";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  Link as LinkIcon,
  BarChart3,
  Award,
  Target,
  Package
} from "lucide-react";

export default async function AffiliatePage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/auth/signin");
  }

  if (session.user?.role !== 'AFFILIATE' && session.user?.role !== 'ADMIN') {
    redirect("/");
  }

  // Fetch affiliate data
  const affiliateCode = session.user?.affiliateCode || '';
  
  // Get affiliate stats from mock data
  const clicks = await prisma.affiliateClick.count();
  const conversions = await prisma.affiliateConversion.count();
  const totalCommission = await prisma.affiliateConversion.aggregate({
    _sum: { commissionEarned: true }
  });
  const pendingCommission = await prisma.affiliateConversion.aggregate({
    _sum: { commissionEarned: true }
  });

  // Get top performing products
  const topProducts = await prisma.product.findMany({
    where: { isActive: true },
  });

  // Sort by commission rate manually
  const sortedProducts = [...topProducts].sort((a, b) => 
    (b.commissionRate || 0) - (a.commissionRate || 0)
  ).slice(0, 5);

  const stats = [
    {
      title: "Total Commission",
      value: `$${totalCommission._sum.commissionEarned?.toFixed(2) || '0.00'}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Pending Commission",
      value: `$${pendingCommission._sum.commissionEarned?.toFixed(2) || '0.00'}`,
      icon: TrendingUp,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Total Clicks",
      value: clicks.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Conversions",
      value: conversions.toLocaleString(),
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Affiliate Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome back, {session.user?.name || 'Affiliate'}! Track your earnings and performance.
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  Affiliate Code: <span className="font-bold">{affiliateCode || 'AFF001'}</span>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Commission Rate: Up to 50%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Affiliate Tools */}
          <div className="lg:col-span-2">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow border p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="/products"
                  className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition group"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-4">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-blue-700">Browse Products</h3>
                      <p className="text-sm text-gray-600">Promote products with high commission</p>
                    </div>
                  </div>
                </a>
                
                <a
                  href="/affiliate/links"
                  className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition group"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg mr-4">
                      <LinkIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-green-700">Manage Links</h3>
                      <p className="text-sm text-gray-600">Generate and track affiliate links</p>
                    </div>
                  </div>
                </a>
                
                <a
                  href="/affiliate/analytics"
                  className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition group"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg mr-4">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-purple-700">View Analytics</h3>
                      <p className="text-sm text-gray-600">Track clicks, conversions, and earnings</p>
                    </div>
                  </div>
                </a>
                
                <a
                  href="/affiliate/withdraw"
                  className="p-4 border-2 border-yellow-200 rounded-lg hover:bg-yellow-50 transition group"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg mr-4">
                      <DollarSign className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-yellow-700">Withdraw Earnings</h3>
                      <p className="text-sm text-gray-600">Transfer your commissions to bank</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Top Performing Products */}
            <div className="bg-white rounded-xl shadow border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Top Performing Products</h2>
                <a href="/products" className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                  View All →
                </a>
              </div>
              
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden mr-4">
                        {product.coverImage ? (
                          <img src={product.coverImage} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Package className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{product.category.toLowerCase()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">${product.discountPrice || product.price}</div>
                      <div className="text-sm text-green-600 font-semibold">
                        {Math.round((product.commissionRate || 0) * 100)}% Commission
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activity & Tips */}
          <div className="space-y-6">
            {/* Recent Conversions */}
            <div className="bg-white rounded-xl shadow border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Conversions</h2>
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No conversions yet</p>
                <p className="text-sm text-gray-500 mt-2">Start promoting products to see earnings</p>
              </div>
              <a 
                href="/affiliate/conversions" 
                className="block text-center mt-6 text-blue-600 hover:text-blue-800 font-medium"
              >
                View All Conversions
              </a>
            </div>

            {/* Tips & Best Practices */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-5 h-5 mr-2 text-purple-600" />
                Tips for Success
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Promote high-converting products</p>
                    <p className="text-sm text-gray-600">Focus on products with 40%+ commission rates</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Use social media effectively</p>
                    <p className="text-sm text-gray-600">Share on platforms where your audience is active</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Create genuine reviews</p>
                    <p className="text-sm text-gray-600">Honest reviews convert better than generic promotions</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
