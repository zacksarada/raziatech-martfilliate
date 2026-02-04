'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Check } from 'lucide-react';

interface AddToCartButtonProps {
  productId: number;
  productName: string;
  price: number;
  affiliateId?: string;
}

export default function AddToCartButton({ 
  productId, 
  productName, 
  price,
  affiliateId 
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
          affiliateId
        }),
      });

      if (response.ok) {
        setIsAdded(true);
        // Reset animation after 2 seconds
        setTimeout(() => setIsAdded(false), 2000);
        // Refresh cart count
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading || isAdded}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
        isAdded
          ? 'bg-green-500 text-white'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      } ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Adding...
        </>
      ) : isAdded ? (
        <>
          <Check size={20} />
          Added to Cart!
        </>
      ) : (
        <>
          <ShoppingCart size={20} />
          Add to Cart
        </>
      )}
    </button>
  );
}