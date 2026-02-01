import { ExternalLink, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    commission: number;
    category?: {
      name: string;
    };
    imageUrl?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const commissionPercentage = Math.round((product.commission / product.price) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
      {/* Product Image */}
      <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-100 relative">
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {product.category?.name || "Digital Product"}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Star size={12} className="mr-1" />
            {commissionPercentage}% Commission
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl">🛒</div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{product.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        
        {/* Pricing */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-2xl font-bold text-gray-900">${product.price}</div>
            <div className="text-sm text-gray-500">Product Price</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-green-600">${product.commission}</div>
            <div className="text-sm text-green-500">Your Commission</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition text-center"
          >
            View Details
          </Link>
          <Link
            href={`/products/${product.id}`}
            className="flex items-center justify-center gap-1 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            <ExternalLink size={18} />
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <TrendingUp size={14} className="mr-1" />
            <span>4.2% Conversion</span>
          </div>
          <span>30-day Cookie</span>
        </div>
      </div>
    </div>
  );
}