"use client";

import { useAuthStore } from "@/store/useAuthStore";
import type { UserRole } from "@/types";

export function useRole(): { role: UserRole | null } {
  const role = useAuthStore((s) => s.user?.role ?? null);
  return { role };
}

