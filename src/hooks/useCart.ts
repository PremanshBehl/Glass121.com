"use client";

import { useCartStore } from "@/store/useCartStore";

export function useCart() {
  return useCartStore();
}

