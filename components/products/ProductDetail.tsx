import { ExternalLink, Download, Video, Star, Package, TrendingUp, Users } from "lucide-react";
import { parseJsonField } from "@/lib/database";

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    category: string;
    type: string;
    price: number;
    discountPrice: number | null;
    promoCode: string | null;
    affiliateLink: string | null;
    commissionRate: number;
    features: string[]; // Already parsed
    requirements: string[]; // Already parsed
    tutorialLink: string | null;
    reviewYoutubeLink: string | null;
    downloadLink: string | null;
    demoLink: string | null;
    coverImage: string;
    gallery: string[]; // Already parsed
    tags: string[]; // Already parsed
    salesCount: number;
    affiliateClicksCount: number;
    views: number;
    createdAt: Date;
  };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      {/* Product Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full capitalize">
              {product.category.toLowerCase()}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
              {product.type === 'OWN_PRODUCT' ? 'Produk Kita' : 'Affiliate Product'}
            </span>
            {product.promoCode && (
              <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
                Promo: {product.promoCode}
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <span className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>4.8 (124 reviews)</span>
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Package className="w-4 h-4 mr-1" />
              <span>{product.salesCount} terjual</span>
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{product.views} dilihat</span>
            </span>
            <span>•</span>
            <span className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{product.affiliateClicksCount} affiliate clicks</span>
            </span>
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="mb-8">
        <div className="aspect-video bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
          {product.coverImage ? (
            <img 
              src={product.coverImage} 
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="text-6xl">
              {product.category === 'SOFTWARE' ? '💻' : 
               product.category === 'EBOOK' ? '📚' :
               product.category === 'TEMPLATE' ? '🎨' :
               product.category === 'COURSE' ? '🎓' :
               product.category === 'TOOL' ? '🔧' : '📦'}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Deskripsi Produk</h2>
        <div className="prose prose-lg max-w-none text-gray-700">
          {product.description ? (
            <p>{product.description}</p>
          ) : (
            <p className="text-gray-500 italic">Deskripsi produk belum tersedia.</p>
          )}
        </div>
      </div>

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Fitur Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Requirements */}
      {product.requirements && product.requirements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Persyaratan Sistem</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {product.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Important Links */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Links Penting</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.tutorialLink && (
            <a 
              href={product.tutorialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
            >
              <div className="flex items-center">
                <Video className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-semibold text-blue-800">Tutorial Instalasi</div>
                  <div className="text-sm text-blue-600">Video panduan penggunaan</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-blue-500" />
            </a>
          )}

          {product.reviewYoutubeLink && (
            <a 
              href={product.reviewYoutubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                <div>
                  <div className="font-semibold text-red-800">Review di YouTube</div>
                  <div className="text-sm text-red-600">Lihat review produk</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-red-500" />
            </a>
          )}

          {product.downloadLink && (
            <a 
              href={product.downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors"
            >
              <div className="flex items-center">
                <Download className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <div className="font-semibold text-green-800">Download Produk</div>
                  <div className="text-sm text-green-600">Link download langsung</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-green-500" />
            </a>
          )}

          {product.demoLink && (
            <a 
              href={product.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="font-semibold text-purple-800">Demo Live</div>
                  <div className="text-sm text-purple-600">Coba sebelum beli</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-purple-500" />
            </a>
          )}
        </div>
      </div>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="mt-8 pt-8 border-t">
          <h3 className="font-semibold mb-3">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
