"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-800">
            RaziaTech MartFilliate
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-blue-600">
              Products
            </Link>
            
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="text-gray-600 hover:text-blue-600">
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
