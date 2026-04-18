"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useCartStore } from "@/store/useCartStore";

type CartContextValue = ReturnType<typeof useCartStore>;

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const value = useCartStore();
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
}

