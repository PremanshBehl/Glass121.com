"use client";

import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  // This page reads persisted client state (Zustand persist). We intentionally wait until
  // after mount to avoid SSR/client mismatches.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setIsMounted(true), []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-poppins font-bold text-white mb-8 flex items-center gap-3">
        <ShoppingCart className="text-accent-cyan" /> Your Cart
      </h1>

      {!isMounted ? (
        <div className="bg-[#11141e] border border-white/10 rounded-2xl p-12 text-center">
          <p className="text-gray-400 text-lg">Loading your cart…</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-[#11141e] border border-white/10 rounded-2xl p-12 text-center">
          <p className="text-gray-400 text-lg mb-6">Your cart is currently empty.</p>
          <Link
            href="/products"
            className="bg-accent-cyan text-primary-dark font-bold px-6 py-3 rounded-lg hover:bg-[#00bfe6] transition-colors inline-block"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-[#11141e] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="w-24 h-24 bg-white/5 rounded-lg shrink-0"></div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-white font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-accent-gold font-mono font-bold">₹{item.price} /sq.ft</p>
                </div>

                <div className="flex items-center gap-3 bg-primary-dark border border-white/10 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center text-white font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="text-right w-full sm:w-auto mt-4 sm:mt-0 flex justify-between sm:block">
                  <span className="sm:hidden text-gray-400">Total:</span>
                  <p className="text-white font-bold text-lg mb-2">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-danger hover:text-red-400 text-sm flex items-center gap-1 transition-colors"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-[#11141e] border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-poppins font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">₹{getTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Taxes (18% GST)</span>
                  <span className="text-white">₹{(getTotal() * 0.18).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-success">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">Total estimated</span>
                  <span className="text-2xl font-mono font-bold text-accent-gold">
                    ₹{(getTotal() * 1.18).toLocaleString()}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-accent-cyan hover:bg-[#00bfe6] text-primary-dark font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

