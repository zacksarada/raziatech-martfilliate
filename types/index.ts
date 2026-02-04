// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  type: ProductType;
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

export type ProductCategory = 
  | 'SOFTWARE'
  | 'EBOOK'
  | 'TEMPLATE'
  | 'COURSE'
  | 'TOOL'
  | 'OTHER';

export type ProductType = 'AFFILIATE' | 'OWN_PRODUCT';

// User Types
export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  affiliateCode: string | null;
  walletBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'BUYER' | 'AFFILIATE' | 'ADMIN' | 'CONTENT_CREATOR';

// Order Types
export interface Order {
  id: string;
  userId: string | null;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string | null;
  transactionId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 'pending' | 'paid' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  commission: number | null;
  affiliateId: string | null;
}

// Affiliate Types
export interface AffiliateClick {
  id: string;
  affiliateId: string;
  productId: string;
  clickDate: Date;
  ipAddress: string | null;
  userAgent: string | null;
  referrer: string | null;
  converted: boolean;
}

export interface AffiliateConversion {
  id: string;
  clickId: string | null;
  affiliateId: string;
  productId: string;
  orderItemId: string | null;
  amount: number;
  commissionRate: number;
  commissionEarned: number;
  status: 'pending' | 'approved' | 'paid';
  conversionDate: Date;
}

// Content Types for Social Media
export interface Content {
  id: string;
  title: string;
  description: string | null;
  type: string;
  platform: string;
  url: string;
  createdById: string;
  productId: string | null;
  status: 'draft' | 'published' | 'archived';
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Form Data for Product Creation
export interface ProductFormData {
  name: string;
  category: ProductCategory;
  type: ProductType;
  description: string;
  price: number;
  discountPrice?: number;
  promoCode?: string;
  affiliateLink?: string;
  commissionRate: number;
  features: string[];
  requirements: string[];
  tutorialLink?: string;
  reviewYoutubeLink?: string;
  downloadLink?: string;
  demoLink?: string;
  tags: string[];
  isActive: boolean;
}
