"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { User, Mail, CreditCard, ShoppingBag, Settings } from "lucide-react";

export default function AccountPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Account</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and view your activity</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Profile */}
          <div className="md:col-span-2 space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {session.user?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{session.user?.name}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{session.user?.email}</span>
                  </div>
                  {session.user?.role && (
                    <div className="mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.user.role === "ADMIN"
                          ? "bg-red-100 text-red-800"
                          : session.user.role === "AFFILIATE"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {session.user.role}
                      </span>
                      {session.user?.affiliateCode && (
                        <span className="ml-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          Code: {session.user.affiliateCode}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Member Since</div>
                  <div className="font-medium">2024</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Total Orders</div>
                  <div className="font-medium">0</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <a
                  href="/products"
                  className="p-4 border rounded-lg hover:bg-gray-50 text-center"
                >
                  <ShoppingBag className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="font-medium">Browse Products</div>
                </a>
                {session.user?.role === "AFFILIATE" && (
                  <a
                    href="/affiliate"
                    className="p-4 border rounded-lg hover:bg-gray-50 text-center"
                  >
                    <User className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <div className="font-medium">Affiliate Dashboard</div>
                  </a>
                )}
                <a
                  href="#"
                  className="p-4 border rounded-lg hover:bg-gray-50 text-center"
                >
                  <Settings className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <div className="font-medium">Settings</div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Account Summary</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm opacity-80">Available Balance</div>
                  <div className="text-2xl font-bold">$0.00</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">Pending Commissions</div>
                  <div className="text-xl font-semibold">$0.00</div>
                </div>
                <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-gray-100">
                  Withdraw Funds
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="text-center py-8 text-gray-500">
                <div className="mb-2">No recent activity</div>
                <div className="text-sm">Your activity will appear here</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
