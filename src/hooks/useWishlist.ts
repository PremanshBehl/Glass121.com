"use client";

import { useWishlistStore } from "@/store/useWishlistStore";

export function useWishlist() {
  return useWishlistStore();
}

