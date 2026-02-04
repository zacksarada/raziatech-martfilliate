"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Search, X, TrendingUp, DollarSign, Clock } from "lucide-react";
import { useState } from "react";

interface CategoryCount {
  category: string;
  _count: { id: number };
}

interface ProductFiltersProps {
  categories: CategoryCount[];
  activeCategory?: string;
  activeSort?: string;
  searchQuery?: string;
}

export default function ProductFilters({ 
  categories, 
  activeCategory, 
  activeSort = 'popular',
  searchQuery 
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchQuery || '');

  const sortOptions = [
    { id: 'popular', label: 'Most Popular', icon: TrendingUp },
    { id: 'newest', label: 'Newest', icon: Clock },
    { id: 'price-low', label: 'Price: Low to High', icon: DollarSign },
    { id: 'price-high', label: 'Price: High to Low', icon: DollarSign },
    { id: 'commission', label: 'Highest Commission', icon: TrendingUp },
  ];

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    
    router.push(`/products?${params.toString()}`);
  };

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    router.push(`/products?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (search.trim()) {
      params.set('search', search.trim());
    } else {
      params.delete('search');
    }
    
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/products');
    setSearch('');
  };

  return (
    <div className="space-y-6">
      {/* Search Box */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete('search');
                  router.push(`/products?${params.toString()}`);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Categories */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Categories</h3>
        </div>
        
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`w-full text-left px-3 py-2 rounded ${
              !activeCategory 
                ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>All Products</span>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {categories.reduce((sum, cat) => sum + cat._count.id, 0)}
              </span>
            </div>
          </button>
          
          {categories.map(({ category, _count }) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category.toLowerCase())}
              className={`w-full text-left px-3 py-2 rounded ${
                activeCategory === category.toLowerCase() 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="capitalize">{category.toLowerCase()}</span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {_count.id}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="font-semibold text-gray-900 mb-4">Sort By</h3>
        <div className="space-y-2">
          {sortOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => handleSortChange(option.id)}
                className={`w-full text-left px-3 py-2 rounded flex items-center ${
                  activeSort === option.id 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4 mr-3" />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filters */}
      {(activeCategory || searchQuery) && (
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-900">Active Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear All
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {activeCategory && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Category: {activeCategory}
                <button
                  onClick={() => handleCategoryChange('all')}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                Search: "{searchQuery}"
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete('search');
                    router.push(`/products?${params.toString()}`);
                  }}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
