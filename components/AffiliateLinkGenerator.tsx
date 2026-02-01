"use client";

import { useState } from "react";
import { Copy, Check, Share2, Facebook, Twitter, Link2, Mail } from "lucide-react";

interface AffiliateLinkGeneratorProps {
  productId: string;
  userId: string;
  productName: string;
  commission: number;
}

export default function AffiliateLinkGenerator({
  productId,
  userId,
  productName,
  commission,
}: AffiliateLinkGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const affiliateLink = `${window.location.origin}/p/${productId}?ref=${userId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(affiliateLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareOnSocialMedia = (platform: string) => {
    const text = `Check out "${productName}"! Earn $${commission} commission by promoting this amazing product.`;
    const url = encodeURIComponent(affiliateLink);
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email: `mailto:?subject=${encodeURIComponent(`Check out ${productName}`)}&body=${encodeURIComponent(`${text}\n\n${affiliateLink}`)}`,
    };

    if (platform === 'email' && shareUrls.email) {
      window.location.href = shareUrls.email;
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Share2 className="text-blue-600" />
            Your Affiliate Link
          </h3>
          <p className="text-gray-600">Share this link to earn commissions</p>
        </div>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
          Earn ${commission} per sale
        </div>
      </div>
      
      {/* Link Display */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 bg-white p-4 rounded-xl border border-gray-300 flex items-center">
            <Link2 className="text-gray-400 mr-3" size={20} />
            <code className="text-sm text-gray-800 flex-1 truncate">{affiliateLink}</code>
            <button
              onClick={copyToClipboard}
              className="ml-3 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          This link includes a 30-day tracking cookie
        </div>
      </div>

      {/* Quick Share */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-gray-800">Share Instantly:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => shareOnSocialMedia('twitter')}
            className="flex items-center justify-center gap-2 p-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition"
          >
            <Twitter size={18} />
            Twitter
          </button>
          <button
            onClick={() => shareOnSocialMedia('facebook')}
            className="flex items-center justify-center gap-2 p-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#1666d9] transition"
          >
            <Facebook size={18} />
            Facebook
          </button>
          <button
            onClick={() => shareOnSocialMedia('linkedin')}
            className="flex items-center justify-center gap-2 p-3 bg-[#0A66C2] text-white rounded-lg hover:bg-[#0957aa] transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </button>
          <button
            onClick={() => shareOnSocialMedia('email')}
            className="flex items-center justify-center gap-2 p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            <Mail size={18} />
            Email
          </button>
        </div>
      </div>

      {/* Tracking Info */}
      <div className="bg-white/80 rounded-xl p-4 border border-blue-100">
        <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Tracking & Analytics
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-gray-600">Clicks Today</div>
            <div className="font-bold">24</div>
          </div>
          <div>
            <div className="text-gray-600">Sales Today</div>
            <div className="font-bold">3</div>
          </div>
          <div>
            <div className="text-gray-600">Conversion</div>
            <div className="font-bold">12.5%</div>
          </div>
          <div>
            <div className="text-gray-600">Earned Today</div>
            <div className="font-bold text-green-600">$149.97</div>
          </div>
        </div>
      </div>
    </div>
  );
}