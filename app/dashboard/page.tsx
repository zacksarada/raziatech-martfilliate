"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import DashboardStats from "@/components/DashboardStats";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Link as LinkIcon,
  BarChart3,
  Settings,
  Download,
  Calendar,
  Target,
  Award,
  Clock
} from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Mock data for charts and graphs
  const recentCommissions = [
    { id: 1, product: "MikroTik License", amount: "$49.99", date: "Today", status: "Paid" },
    { id: 2, product: "React Template", amount: "$29.99", date: "Yesterday", status: "Pending" },
    { id: 3, product: "Python Course", amount: "$39.99", date: "Jan 30", status: "Paid" },
    { id: 4, product: "SEO Plugin", amount: "$31.99", date: "Jan 28", status: "Paid" },
  ];

  const topProducts = [
    { name: "MikroTik License", clicks: 245, sales: 12, commission: "$599.88" },
    { name: "Python Course", clicks: 189, sales: 8, commission: "$319.92" },
    { name: "React Template", clicks: 167, sales: 6, commission: "$179.94" },
    { name: "WordPress Plugin", clicks: 123, sales: 5, commission: "$159.95" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="text-blue-100">
                Here's your affiliate performance overview for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {user.role === "ADMIN" ? "👑 Admin Account" : "💰 Affiliate Account"}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center">
                  <Award size={12} className="mr-1" />
                  Level 2 Affiliate
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 transition">
                <Download size={16} />
                Export Report
              </button>
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition">
                <Settings size={16} />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="mb-8">
          <DashboardStats />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Performance */}
          <div className="lg:col-span-2 space-y-8">
            {/* Revenue Chart Placeholder */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="text-blue-600" />
                  Revenue Overview
                </h2>
                <select className="border rounded-lg px-3 py-1 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-64 bg-gradient-to-b from-blue-50 to-white rounded-lg border flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <p className="text-gray-600">Revenue chart visualization</p>
                  <p className="text-sm text-gray-500">Total: $1,549.50 this month</p>
                </div>
              </div>
            </div>

            {/* Top Performing Products */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Target className="text-green-600" />
                Top Performing Products
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-gray-600">Product</th>
                      <th className="text-left py-3 text-gray-600">Clicks</th>
                      <th className="text-left py-3 text-gray-600">Sales</th>
                      <th className="text-left py-3 text-gray-600">Commission</th>
                      <th className="text-left py-3 text-gray-600">Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 font-medium">{product.name}</td>
                        <td className="py-3">{product.clicks}</td>
                        <td className="py-3">{product.sales}</td>
                        <td className="py-3 font-bold text-green-600">{product.commission}</td>
                        <td className="py-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            {((product.sales / product.clicks) * 100).toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Recent Activity */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="text-purple-600" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link 
                  href="/products" 
                  className="flex items-center justify-between p-4 border rounded-xl hover:bg-purple-50 transition group"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg mr-3 group-hover:bg-purple-200">
                      <ShoppingCart className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Browse Products</h3>
                      <p className="text-sm text-gray-600">Find new products to promote</p>
                    </div>
                  </div>
                  <span className="text-purple-600">→</span>
                </Link>
                
                <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-blue-50 transition group">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3 group-hover:bg-blue-200">
                      <LinkIcon className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">My Affiliate Links</h3>
                      <p className="text-sm text-gray-600">Manage your referral links</p>
                    </div>
                  </div>
                  <span className="text-blue-600">→</span>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-green-50 transition group">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg mr-3 group-hover:bg-green-200">
                      <DollarSign className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Withdraw Earnings</h3>
                      <p className="text-sm text-gray-600">Available: $1,549.50</p>
                    </div>
                  </div>
                  <span className="text-green-600">→</span>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-orange-50 transition group">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg mr-3 group-hover:bg-orange-200">
                      <Settings className="text-orange-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Account Settings</h3>
                      <p className="text-sm text-gray-600">Update profile & preferences</p>
                    </div>
                  </div>
                  <span className="text-orange-600">→</span>
                </div>
              </div>
            </div>

            {/* Recent Commissions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <DollarSign className="text-green-600" />
                  Recent Commissions
                </h2>
                <Link href="/dashboard/commissions" className="text-sm text-blue-600 hover:underline">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentCommissions.map((commission) => (
                  <div key={commission.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{commission.product}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={12} className="mr-1" />
                        {commission.date}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{commission.amount}</div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        commission.status === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {commission.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-6">
              <h3 className="font-bold mb-4">Monthly Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Users size={16} className="mr-2" />
                    <span>Referrals</span>
                  </div>
                  <span className="font-bold">8 New</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    <span>Active Days</span>
                  </div>
                  <span className="font-bold">24/30</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Target size={16} className="mr-2" />
                    <span>Goal Progress</span>
                  </div>
                  <span className="font-bold">78%</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="text-center">
                  <p className="text-sm opacity-90">Next payout date</p>
                  <p className="text-xl font-bold">Feb 15, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Campaigns */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold mb-4">Active Campaigns</h3>
            <div className="space-y-3">
              {['Social Media', 'Email List', 'YouTube Channel'].map((campaign, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{campaign}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Active</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold mb-4">Conversion Rate</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">4.2%</div>
              <p className="text-gray-600">↑ 0.8% from last month</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold mb-4">Average Commission</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">$37.49</div>
              <p className="text-gray-600">Per successful referral</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
