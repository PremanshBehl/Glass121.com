"use client";

import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const { user } = useAuthStore();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-lg">
        <p className="text-gray-400">Loading checkout…</p>
      </div>
    );
  }

  if (items.length === 0 && !success) {
    router.push("/cart");
    return null;
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderTotal = getTotal() * 1.18;
      addOrder({
        id: `AMG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        items: [...items],
        total: orderTotal,
        status: "Processing",
      });

      clearCart();
      setIsProcessing(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-lg">
        <div className="w-20 h-20 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="text-3xl font-poppins font-bold text-white mb-4">Order Placed!</h1>
        <p className="text-gray-400 mb-8">
          Your order has been successfully submitted. You can track its status in your dashboard.
        </p>
        <Link
          href="/dashboard"
          className="bg-accent-cyan text-primary-dark font-bold px-8 py-3 rounded-lg hover:bg-[#00bfe6] transition-colors inline-block"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Link
        href="/cart"
        className="text-gray-400 hover:text-accent-cyan mb-8 inline-flex items-center gap-2 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Cart
      </Link>

      <h1 className="text-3xl font-poppins font-bold text-white mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <form
            id="checkout-form"
            onSubmit={handlePlaceOrder}
            className="bg-[#11141e] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm text-gray-400">First Name</label>
                <input
                  required
                  type="text"
                  defaultValue={user?.name?.split(" ")[0] || ""}
                  className="w-full bg-primary-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-accent-cyan outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-400">Last Name</label>
                <input
                  required
                  type="text"
                  defaultValue={user?.name?.split(" ")[1] || ""}
                  className="w-full bg-primary-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-accent-cyan outline-none"
                />
              </div>
              <div className="space-y-1 col-span-full">
                <label className="text-sm text-gray-400">Company Name (Optional)</label>
                <input
                  type="text"
                  className="w-full bg-primary-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-accent-cyan outline-none"
                />
              </div>
              <div className="space-y-1 col-span-full">
                <label className="text-sm text-gray-400">Street Address</label>
                <input
                  required
                  type="text"
                  className="w-full bg-primary-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-accent-cyan outline-none"
                  placeholder="House number and street name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-400">City</label>
                <input
                  required
                  type="text"
                  className="w-full bg-primary-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-accent-cyan outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-400">PIN Code</label>
                <input
                  required
                  type="text"
                  className="w-full bg-primary-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-accent-cyan outline-none"
                />
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-4 pt-6 border-t border-white/10">Payment Information</h2>
            <div className="bg-primary-dark border border-accent-cyan/30 rounded-xl p-4 flex items-center gap-4">
              <input type="radio" checked readOnly className="accent-accent-cyan w-4 h-4" />
              <div className="flex-1">
                <p className="text-white font-bold flex items-center gap-2">
                  Credit / Debit Card <CreditCard size={16} className="text-accent-cyan" />
                </p>
                <p className="text-sm text-gray-400">
                  Safe money transfer using your bank account. We support Mastercard, Visa, Discover and Stripe.
                </p>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-[#11141e] border border-white/10 rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-poppins font-bold text-white mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    <span className="text-gray-500">{item.quantity}x</span> {item.name}
                  </span>
                  <span className="text-white">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-6 border-t border-white/10 pt-4">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white">₹{getTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Taxes (18% GST)</span>
                <span className="text-white">₹{(getTotal() * 0.18).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span className="text-white">Total</span>
                <span className="text-accent-gold">₹{(getTotal() * 1.18).toLocaleString()}</span>
              </div>
            </div>

            <button
              form="checkout-form"
              type="submit"
              disabled={isProcessing}
              className="w-full bg-accent-cyan hover:bg-[#00bfe6] disabled:bg-gray-700 disabled:text-gray-400 text-primary-dark font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

