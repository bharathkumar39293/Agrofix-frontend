'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl">
            🌿 Agrofix
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/products" className="hover:text-accent transition-colors">
              Products
            </Link>
            <Link href="/orders" className="hover:text-accent transition-colors">
              My Orders
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="hover:text-accent transition-colors relative">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
            <Link href="/login" className="hover:text-accent transition-colors">
              <UserIcon className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white hover:text-accent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link 
              href="/" 
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              href="/orders" 
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              My Orders
            </Link>
            <Link 
              href="/cart" 
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart
            </Link>
            <Link 
              href="/login" 
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
} 