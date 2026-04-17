import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from './useCartStore';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'In Transit' | 'Delivered';
  vendor?: string;
}

export interface Quote {
  id: string;
  date: string;
  productName: string;
  amount: number;
  details: string;
  status: 'Active' | 'Expired';
}

interface OrderState {
  orders: Order[];
  quotes: Quote[];
  addOrder: (order: Order) => void;
  addQuote: (quote: Quote) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      quotes: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      addQuote: (quote) => set((state) => ({ quotes: [quote, ...state.quotes] })),
      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
      }))
    }),
    {
      name: 'amalgus-orders',
    }
  )
);
