import type { CartItem } from "./common";

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "Processing" | "In Transit" | "Delivered";
  vendor?: string;
}

export interface Quote {
  id: string;
  date: string;
  productName: string;
  amount: number;
  details: string;
  status: "Active" | "Expired";
}

