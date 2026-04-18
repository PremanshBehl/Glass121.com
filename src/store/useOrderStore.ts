import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order, Quote } from '@/types';

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
      name: 'glass121-orders',
    }
  )
);
