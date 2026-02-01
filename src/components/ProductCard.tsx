import React from 'react'
import Link from 'next/link'
import { Product } from '@prisma/client'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const isAffiliate = product.productType === 'AFFILIATE_PRODUCT'
  const hasSale = product.isOnSale && product.salePrice
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        {isAffiliate && (
          <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
            Affiliate
          </span>
        )}
        
        {hasSale && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Sale
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
            {product.name}
          </h3>
          <div className="text-right">
            {hasSale ? (
              <>
                <span className="text-gray-500 line-through text-sm">
                  ${product.basePrice.toString()}
                </span>
                <span className="text-red-600 font-bold text-lg ml-2">
                  ${product.salePrice?.toString()}
                </span>
              </>
            ) : (
              <span className="text-gray-800 font-bold text-lg">
                ${product.basePrice.toString()}
              </span>
            )}
          </div>
        </div>
        
        {product.category && (
          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mb-3">
            {product.category}
          </span>
        )}
        
        {product.shortDescription && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.shortDescription}
          </p>
        )}
        
        <div className="flex justify-between items-center mt-4">
          <Link 
            href={`/products/${product.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            View Details
          </Link>
          
          {isAffiliate ? (
            <a
              href={product.affiliateUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium"
            >
              Buy Now
            </a>
          ) : (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
