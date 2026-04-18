import { NextRequest, NextResponse } from "next/server";
import { glassProducts } from "@/data/glassProducts";
import type { FilterOptions, Product } from "@/types";
import { toErrorMessage } from "@/lib/errorHandler";

function applyFilters(products: Product[], filters: FilterOptions) {
  return products.filter((p) => {
    if (filters.glassType?.length && !filters.glassType.includes(p.glassType)) return false;
    if (typeof filters.minPrice === "number" && p.priceMax < filters.minPrice) return false;
    if (typeof filters.maxPrice === "number" && p.priceMin > filters.maxPrice) return false;
    if (filters.application?.length && !filters.application.some((a) => p.applications.includes(a))) return false;
    return true;
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filters: FilterOptions = {
      glassType: (searchParams.getAll("type") as FilterOptions["glassType"]) || undefined,
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      application: searchParams.getAll("app") || undefined,
      sortBy: (searchParams.get("sort") as FilterOptions["sortBy"]) || undefined,
    };

    let products = applyFilters(glassProducts, filters);

    switch (filters.sortBy) {
      case "price-asc":
        products = [...products].sort((a, b) => a.priceMin - b.priceMin);
        break;
      case "price-desc":
        products = [...products].sort((a, b) => b.priceMax - a.priceMax);
        break;
      case "rating":
        products = [...products].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return NextResponse.json({ success: true, data: products });
  } catch (err) {
    return NextResponse.json({ success: false, error: toErrorMessage(err, "Failed to fetch products") }, { status: 500 });
  }
}

