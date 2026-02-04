import { notFound } from "next/navigation";
import { prisma, parseJsonField } from "@/lib/database";
import ProductDetail from "@/components/products/ProductDetail";
import AffiliateSection from "@/components/affiliate/AffiliateSection";

interface ProductPageProps {
  params: {
    category: string;
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findFirst({
    where: {
      id: params.id,
      isActive: true,
    },
  });

  if (!product) {
    notFound();
  }

  // Parse JSON fields
  const parsedProduct = {
    ...product,
    features: parseJsonField<string>(product.features),
    requirements: parseJsonField<string>(product.requirements),
    tags: parseJsonField<string>(product.tags),
    gallery: parseJsonField<string>(product.gallery),
  };

  // Get related products
  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      isActive: true,
      id: { not: params.id },
    },
    take: 4,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <a href="/" className="text-gray-700 hover:text-blue-600 text-sm">
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <a href="/products" className="text-gray-700 hover:text-blue-600 text-sm">
                  Products
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <a href={`/products?category=${params.category}`} className="text-gray-700 hover:text-blue-600 text-sm capitalize">
                  {params.category}
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500 text-sm truncate max-w-xs">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Product Info (2/3 width) */}
          <div className="lg:col-span-2">
            <ProductDetail product={parsedProduct} />
          </div>

          {/* Right Column - Actions & Affiliate (1/3 width) */}
          <div className="space-y-6">
            {/* Pricing & Buy Box */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.discountPrice || product.price}
                  </span>
                  {product.discountPrice && (
                    <>
                      <span className="ml-2 text-xl text-gray-500 line-through">
                        ${product.price}
                      </span>
                      <span className="ml-2 bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
                        Save ${(product.price - product.discountPrice).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>
                
                {product.promoCode && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <p className="text-green-800 text-sm">
                      <span className="font-semibold">Promo Code:</span>{' '}
                      <code className="bg-green-100 px-2 py-1 rounded font-mono">
                        {product.promoCode}
                      </code>
                    </p>
                  </div>
                )}

                {/* Add to Cart Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg mb-3 transition-colors">
                  🛒 Add to Cart - ${product.discountPrice || product.price}
                </button>
                
                {/* Buy Now Button */}
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  ⚡ Buy Now
                </button>
              </div>

              {/* Features Quick View */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="space-y-1 text-sm">
                  {parsedProduct.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Affiliate Section */}
            <AffiliateSection 
              productId={product.id}
              productName={product.name}
              commissionRate={product.commissionRate}
              price={product.discountPrice || product.price}
            />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
                  <div className="h-32 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    {relatedProduct.coverImage ? (
                      <img 
                        src={relatedProduct.coverImage} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-4xl">
                          {relatedProduct.category === 'SOFTWARE' ? '💻' : 
                           relatedProduct.category === 'EBOOK' ? '📚' :
                           relatedProduct.category === 'TEMPLATE' ? '🎨' :
                           relatedProduct.category === 'COURSE' ? '🎓' :
                           relatedProduct.category === 'TOOL' ? '🔧' : '📦'}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold mb-2 truncate">{relatedProduct.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${relatedProduct.discountPrice || relatedProduct.price}</span>
                    <a 
                      href={`/products/${params.category}/${relatedProduct.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                    >
                      View →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
