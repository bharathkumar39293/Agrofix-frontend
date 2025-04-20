'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function ProductCard({ id, name, price, quantity }: ProductProps) {
  const [orderQuantity, setOrderQuantity] = useState(1);
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    addItem({ id, name, price }, orderQuantity);
    setOrderQuantity(1);
  };

  // Generate a placeholder image URL with a fixed image for each product type
  const getImageUrl = (productName: string) => {
    const productType = productName.toLowerCase();
    // Use a mapping of product names to reliable image URLs
    const imageMap: Record<string, string> = {
      'tomato': 'https://images.unsplash.com/photo-1592924357236-864f0177984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'tomatoes': 'https://images.unsplash.com/photo-1592924357236-864f0177984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'potatoes': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'carrot': 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'carrots': 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'cabbage': 'https://images.unsplash.com/photo-1551889885-43e30d110f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'onion': 'https://images.unsplash.com/photo-1507633698233-3ba3769ac01f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'onions': 'https://images.unsplash.com/photo-1507633698233-3ba3769ac01f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'cauliflower': 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'brinjal': 'https://images.unsplash.com/photo-1632252377066-1eb9dfb51a1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'eggplant': 'https://images.unsplash.com/photo-1632252377066-1eb9dfb51a1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'capsicum': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'bell pepper': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'cucumber': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'apple': 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      'banana': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    };
    
    // Return specific image URL if we have one, otherwise use a default vegetable image
    for (const [key, url] of Object.entries(imageMap)) {
      if (productType.includes(key)) {
        return url;
      }
    }
    
    // Default image if no specific match found
    return 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
  };

  const imageUrl = getImageUrl(name);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image 
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-primary font-medium">₹{price} per kg</p>
          <p className="text-sm text-gray-600">Stock: {quantity} kg</p>
        </div>
        
        <div className="mt-4 flex items-center">
          <div className="flex border rounded overflow-hidden mr-2">
            <button
              onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max={quantity}
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(Math.min(quantity, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-12 text-center"
            />
            <button
              onClick={() => setOrderQuantity(Math.min(quantity, orderQuantity + 1))}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={quantity === 0}
            className={`flex-1 py-2 rounded-md text-white text-sm ${
              quantity === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-secondary'
            }`}
          >
            {quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
} 