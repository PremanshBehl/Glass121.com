"use client";

import Link from "next/link";
import { Search, User, Heart, ShoppingCart, Menu } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function Header() {
  const { isAuthenticated, user } = useAuthStore();
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <header className="sticky top-0 z-50 bg-primary-dark/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-poppins font-bold text-white flex items-center gap-2">
            <span className="text-accent-cyan">Glass</span>121
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-sm font-inter text-gray-300 hover:text-accent-cyan transition-colors">Catalog</Link>
            <Link href="/search" className="text-sm font-inter text-gray-300 hover:text-accent-cyan transition-colors">AI Match</Link>
            <Link href="/rates" className="text-sm font-inter text-gray-300 hover:text-accent-cyan transition-colors">Daily Rates</Link>
            <Link href="/estimates" className="text-sm font-inter text-gray-300 hover:text-accent-cyan transition-colors">Estimates</Link>
            <Link href="/vendors" className="text-sm font-inter text-gray-300 hover:text-accent-cyan transition-colors">Vendors</Link>
            <Link href="/partners" className="text-sm font-inter text-gray-300 hover:text-accent-cyan transition-colors">Partners</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/search" className="p-2 text-gray-300 hover:text-accent-cyan transition-colors">
            <Search size={20} />
          </Link>
          <Link href="/dashboard" className="hidden md:flex relative p-2 text-gray-300 hover:text-accent-cyan transition-colors">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-danger text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                <span suppressHydrationWarning>{wishlistCount}</span>
              </span>
            )}
          </Link>
          <Link href="/cart" className="hidden md:flex relative p-2 text-gray-300 hover:text-accent-cyan transition-colors">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-cyan text-primary-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                <span suppressHydrationWarning>{cartCount}</span>
              </span>
            )}
          </Link>
          <div className="h-6 w-px bg-gray-700 hidden md:block"></div>
          
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-sm font-inter text-gray-300 hover:text-white transition-colors">
                <User size={20} />
                <span className="truncate max-w-[100px]" suppressHydrationWarning>
                  {user?.name}
                </span>
              </Link>
            </div>
          ) : (
            <Link href="/login" className="hidden md:flex items-center gap-2 text-sm font-inter text-gray-300 hover:text-white transition-colors">
              <User size={20} />
              <span>Sign In</span>
            </Link>
          )}
          
          <button className="md:hidden p-2 text-gray-300 hover:text-accent-cyan transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
