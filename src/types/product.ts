export type GlassType =
  | "Clear Float"
  | "Toughened"
  | "Laminated"
  | "DGU"
  | "Frosted"
  | "Reflective"
  | "Low-E"
  | "Back-Painted";

export interface VendorSummary {
  id: string;
  name: string;
  price: number;
  delivery: number;
  rating: number;
  reviews: number;
  coverage: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  glassType: GlassType;
  thickness: number;
  process: string;
  applications: string[];
  image?: string;
  priceMin: number;
  priceMax: number;
  rating: number;
  reviewCount: number;
  specs?: {
    thermalValue?: string;
    safetyRating?: string;
    loadCapacity?: string;
    maxSize?: string;
  };
  vendors?: VendorSummary[];
  isNew?: boolean;
  inStock: boolean;
}

export interface FilterOptions {
  glassType?: GlassType[];
  minPrice?: number;
  maxPrice?: number;
  thickness?: string;
  application?: string[];
  sortBy?: "newest" | "price-asc" | "price-desc" | "rating";
}

