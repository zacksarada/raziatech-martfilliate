"use client";

import { useState } from "react";
import { ShoppingCart as CartIcon, Trash2, Plus, Minus, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  image: string;
  category: string;
}

export default function ShoppingCart() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Sample cart items
    {
      id: "1",
      productId: "product_1",
      name: "Python Mastery Ebook",
      price: 29.99,
      discountPrice: 24.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec9?w=150",
      category: "ebook"
    },
    {
      id: "2",
      productId: "product_2",
      name: "React E-commerce Template",
      price: 49.99,
      discountPrice: 39.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=150",
      category: "template"
    }
  ]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discountPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const updateQuantity = (id: string, change: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setIsOpen(false);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = calculateTotal();

  return (
    <>
      {/* Cart Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <CartIcon className="w-6 h-6 text-gray-700" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Cart Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                {/* Header */}
                <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <CartIcon className="w-6 h-6 text-gray-900 mr-2" />
                      <h2 className="text-lg font-medium text-gray-900">
                        Shopping Cart ({totalItems} items)
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Cart Items */}
                  <div className="mt-8">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-12">
                        <CartIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Your cart is empty
                        </h3>
                        <p className="text-gray-500 mb-6">
                          Add some products to get started
                        </p>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    ) : (
                      <ul className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                          <li key={item.id} className="py-6 flex">
                            {/* Product Image */}
                            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-lg overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Product Info */}
                            <div className="ml-4 flex-1 flex flex-col">
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <Link 
                                    href={`/products/${item.category}/${item.productId}`}
                                    onClick={() => setIsOpen(false)}
                                    className="hover:text-blue-600"
                                  >
                                    {item.name}
                                  </Link>
                                </h3>
                                <div className="text-right">
                                  <p className="text-lg font-bold">
                                    ${(item.discountPrice || item.price).toFixed(2)}
                                  </p>
                                  {item.discountPrice && (
                                    <p className="text-sm text-gray-500 line-through">
                                      ${item.price.toFixed(2)}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex-1 flex items-end justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-8 text-center font-medium">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-600 hover:text-red-800 flex items-center"
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Footer with Total & Checkout */}
                {cartItems.length > 0 && (
                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                      <p>Subtotal</p>
                      <p>${totalAmount.toFixed(2)}</p>
                    </div>
                    
                    {session ? (
                      <>
                        <p className="text-sm text-gray-500 mb-6">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="space-y-3">
                          <Link
                            href="/checkout"
                            onClick={() => setIsOpen(false)}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                          >
                            Proceed to Checkout
                          </Link>
                          <button
                            onClick={clearCart}
                            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition"
                          >
                            Clear Cart
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                          Please sign in to checkout and earn rewards!
                        </p>
                        <Link
                          href="/auth/signin"
                          onClick={() => setIsOpen(false)}
                          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                        >
                          Sign In to Checkout
                        </Link>
                        <Link
                          href="/auth/signup"
                          onClick={() => setIsOpen(false)}
                          className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition flex items-center justify-center"
                        >
                          Create Account
                        </Link>
                      </div>
                    )}
                    
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          onClick={() => setIsOpen(false)}
                          className="text-blue-600 hover:text-blue-500 font-medium"
                        >
                          Continue Shopping
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
