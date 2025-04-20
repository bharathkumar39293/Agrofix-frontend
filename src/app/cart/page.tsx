'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';
import { ordersAPI } from '@/lib/api';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=cart');
      return;
    }

    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    try {
      setIsPlacingOrder(true);
      setError(null);

      // Place orders for each item in cart
      for (const item of items) {
        await ordersAPI.create({
          product_id: item.id,
          quantity: item.quantity,
        });
      }

      // Clear cart after successful order
      clearCart();
      setOrderSuccess(true);
    } catch (err: any) {
      console.error('Failed to place order:', err);
      setError(err?.response?.data?.error || 'Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-500 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. You can track its status in the orders section.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-md"
            >
              Continue Shopping
            </Link>
            <Link
              href="/orders"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-6 rounded-md"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-md">
          <div className="text-gray-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link
            href="/products"
            className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-md"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="p-4 flex items-center">
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price} per kg</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex border rounded overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <div className="w-12 text-center flex items-center justify-center">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      ₹{item.price * item.quantity}
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-gray-500 hover:text-red-500"
                      aria-label="Remove item"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between font-semibold text-lg mb-2">
              <span>Subtotal:</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="text-gray-500 mb-4 text-sm">
              Delivery charges and taxes will be calculated at checkout
            </div>
            <button
              onClick={handleCheckout}
              disabled={isPlacingOrder}
              className={`w-full py-3 text-white bg-primary hover:bg-primary/90 rounded-md font-medium ${
                isPlacingOrder ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isPlacingOrder ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>

          <div className="text-center">
            <Link href="/products" className="text-primary hover:underline">
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
} 