import Link from "next/link";
import { Tag, ShoppingBag, Star } from "lucide-react";
import { parseJsonField } from "@/lib/database";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    category: string;
    type: string;
    price: number;
    discountPrice: number | null;
    promoCode: string | null;
    commissionRate: number;
    features: string; // JSON string
    tags: string; // JSON string
    coverImage: string;
    salesCount: number;
    views: number;
    affiliateClicksCount: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const commissionRate = product.commissionRate * 100;
  const displayPrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const tags = parseJsonField<string>(product.tags);
  
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.coverImage || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full capitalize">
            {product.category.toLowerCase()}
          </span>
          {product.type === 'OWN_PRODUCT' && (
            <span className="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
              Our Product
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold rounded-full">
            {commissionRate}% Commission
          </span>
        </div>
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
              Save {Math.round(((product.price - product.discountPrice!) / product.price) * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Title & Rating */}
        <div className="mb-3">
          <h3 className="font-bold text-lg mb-1 line-clamp-1">
            <Link 
              href={`/products/${product.category.toLowerCase()}/${product.id}`}
              className="hover:text-blue-600 transition"
            >
              {product.name}
            </Link>
          </h3>
          <div className="flex items-center text-sm text-gray-600">
            <div className="flex items-center mr-3">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              <span>4.8</span>
              <span className="text-gray-400 ml-1">(124)</span>
            </div>
            <div className="flex items-center">
              <ShoppingBag className="w-4 h-4 mr-1" />
              <span>{product.salesCount} sold</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
          {product.description || "Premium digital product with high conversion rate"}
        </p>

        {/* Price Section */}
        <div className="mb-4">
          <div className="flex items-baseline mb-1">
            <span className="text-2xl font-bold text-gray-900">
              ${displayPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          {product.promoCode && (
            <div className="text-sm text-green-600">
              Use code: <span className="font-bold">{product.promoCode}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product.category.toLowerCase()}/${product.id}`}
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg text-center transition"
          >
            View Details
          </Link>
          <Link
            href={`/products/${product.category.toLowerCase()}/${product.id}`}
            className="px-4 py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-semibold rounded-lg transition flex items-center justify-center"
            title="Quick Add to Cart"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </Link>
        </div>

        {/* Affiliate Quick Info */}
        <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Earn:</span>
            <span className="font-semibold text-green-600">
              ${(displayPrice * product.commissionRate).toFixed(2)} per sale
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Promote:</span>
            <Link 
              href={`/affiliate/promote/${product.id}`}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Get Affiliate Link →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
