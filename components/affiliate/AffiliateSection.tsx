"use client";

import { useState } from "react";
import { Copy, Share2, Link as LinkIcon, Facebook, Twitter, Instagram } from "lucide-react";
import { useSession } from "next-auth/react";

interface AffiliateSectionProps {
  productId: string;
  productName: string;
  commissionRate: number;
  price: number;
}

export default function AffiliateSection({ 
  productId, 
  productName, 
  commissionRate, 
  price 
}: AffiliateSectionProps) {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);
  
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const commissionAmount = price * commissionRate;
  
  // Generate affiliate link based on user session
  const affiliateLink = session?.user?.affiliateCode 
    ? `${baseUrl}/p/${productId}?ref=${session.user.affiliateCode}`
    : `${baseUrl}/p/${productId}`;

  const handleCopyLink = async () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(affiliateLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const socialShareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(affiliateLink)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(affiliateLink)}&text=${encodeURIComponent(`Check out: ${productName}`)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`Check this product: ${affiliateLink}`)}`,
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 border border-purple-200">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-purple-100 rounded-lg mr-3">
          <LinkIcon className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-purple-900">Promote as Affiliate</h3>
      </div>

      {/* Commission Info */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Your Commission:</span>
          <span className="text-2xl font-bold text-green-600">
            ${commissionAmount.toFixed(2)}
          </span>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          ({Math.round(commissionRate * 100)}% of ${price.toFixed(2)})
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Affiliate Link:</div>
          <div className="flex gap-2">
            <input
              type="text"
              value={affiliateLink}
              readOnly
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm font-mono truncate"
            />
            <button
              onClick={handleCopyLink}
              className="px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
              title="Copy link"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          {copied && (
            <div className="mt-2 text-sm text-green-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Link copied to clipboard!
            </div>
          )}
        </div>
      </div>

      {/* Share on Social Media */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-gray-800">Share on Social Media:</h4>
        <div className="flex gap-2">
          <a
            href={socialShareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#1877F2] text-white px-3 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Facebook className="w-4 h-4" />
            <span className="text-sm">Facebook</span>
          </a>
          <a
            href={socialShareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#1DA1F2] text-white px-3 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            <span className="text-sm">Twitter</span>
          </a>
          <a
            href={socialShareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white px-3 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
            </svg>
            <span className="text-sm">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Embed Code for Websites/Blogs */}
      <div>
        <h4 className="font-semibold mb-2 text-gray-800">Embed Code:</h4>
        <textarea
          value={`<a href="${affiliateLink}" target="_blank" rel="nofollow">${productName}</a>`}
          readOnly
          rows={2}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm font-mono"
        />
        <p className="text-xs text-gray-600 mt-2">
          Copy this HTML code to embed on your website or blog
        </p>
      </div>

      {/* Not Logged In Message */}
      {!session && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Sign in to get your personal affiliate tracking code and full analytics.
          </p>
          <a 
            href="/auth/signin" 
            className="inline-block mt-2 text-sm font-semibold text-yellow-700 hover:text-yellow-900"
          >
            Sign In to Access Affiliate Tools →
          </a>
        </div>
      )}
    </div>
  );
}
