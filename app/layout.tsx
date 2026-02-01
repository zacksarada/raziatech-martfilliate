import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RaziaTech MartFilliate - Affiliate Platform",
  description: "Earn commissions promoting digital products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg font-semibold mb-2">RaziaTech MartFilliate</p>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} All rights reserved.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Earn commissions promoting digital products
        </p>
      </div>
    </footer>
  );
}
