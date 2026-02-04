// This file provides type definitions for Prisma Client
declare module '@prisma/client' {
  export interface Product {
    id: string;
    name: string;
    slug: string;
    category: 'SOFTWARE' | 'EBOOK' | 'TEMPLATE' | 'COURSE' | 'TOOL' | 'OTHER';
    type: 'AFFILIATE' | 'OWN_PRODUCT';
    description: string | null;
    price: number;
    discountPrice: number | null;
    promoCode: string | null;
    affiliateLink: string | null;
    commissionRate: number;
    features: string[];
    requirements: string[];
    tutorialLink: string | null;
    reviewYoutubeLink: string | null;
    downloadLink: string | null;
    demoLink: string | null;
    coverImage: string;
    gallery: string[];
    tags: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    salesCount: number;
    affiliateClicks: number;
    views: number;
  }

  export interface User {
    id: string;
    email: string;
    name: string | null;
    password: string | null;
    role: 'BUYER' | 'AFFILIATE' | 'ADMIN' | 'CONTENT_CREATOR';
    affiliateCode: string | null;
    walletBalance: number;
    createdAt: Date;
    updatedAt: Date;
  }

  // Add other Prisma models as needed
}
