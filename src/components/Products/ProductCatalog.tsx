"use client";

import { useState, useEffect } from "react";
import { Filter, Star, Heart, CheckSquare, Square, X, Check } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

const SAMPLE_PRODUCTS = [
  { id: "1", name: "Clear Float Glass", type: "Clear Float", thickness: 5, process: "Plain", application: ["Windows", "Doors"], priceMin: 45, priceMax: 60, vendors: 12, rating: 4.8 },
  { id: "2", name: "Toughened Safety Glass", type: "Toughened", thickness: 8, process: "Tempered", application: ["Partitions", "Doors", "Shower Enclosures"], priceMin: 120, priceMax: 160, vendors: 8, rating: 4.9 },
  { id: "3", name: "Laminated Soundproof", type: "Laminated", thickness: 10, process: "PVB Interlayer", application: ["Facades", "Skylights"], priceMin: 180, priceMax: 250, vendors: 5, rating: 4.7 },
  { id: "4", name: "Double Glazed Unit", type: "DGU", thickness: 24, process: "Insulated", application: ["Windows", "Facades"], priceMin: 350, priceMax: 450, vendors: 6, rating: 4.6 },
  { id: "5", name: "Frosted Privacy Glass", type: "Frosted", thickness: 6, process: "Sandblasted", application: ["Doors", "Partitions", "Shower Enclosures"], priceMin: 80, priceMax: 110, vendors: 10, rating: 4.5 },
  { id: "6", name: "Low-E Energy Saving", type: "Low-E", thickness: 6, process: "Coated", application: ["Facades", "Windows"], priceMin: 190, priceMax: 240, vendors: 4, rating: 4.9 },
];

const initialFilters = {
  glassType: [] as string[],
  thickness: { min: 3, max: 32 },
  application: [] as string[],
  priceRange: { min: 0, max: 500 }
};

export default function ProductCatalog() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState(initialFilters);
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [isMounted, setIsMounted] = useState(false);
  
  const addToCart = useCartStore(state => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const filtered = SAMPLE_PRODUCTS.filter(product => {
      // Check glass type
      if (filters.glassType.length > 0 && !filters.glassType.includes(product.type)) {
        return false;
      }
      
      // Check thickness
      if (product.thickness < filters.thickness.min || product.thickness > filters.thickness.max) {
        return false;
      }
      
      // Check application
      if (filters.application.length > 0 && !filters.application.some(app => product.application.includes(app))) {
        return false;
      }

      // Check price
      if (product.priceMin > filters.priceRange.max || product.priceMax < filters.priceRange.min) {
        return false;
      }
      
      return true;
    });
    
    setProducts(filtered);
  }, [filters]);

  const toggleCompare = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleGlassTypeChange = (type: string) => {
    setFilters(prev => ({
      ...prev,
      glassType: prev.glassType.includes(type)
        ? prev.glassType.filter(t => t !== type)
        : [...prev.glassType, type]
    }));
  };

  const handleAppChange = (app: string) => {
    setFilters(prev => ({
      ...prev,
      application: prev.application.includes(app)
        ? prev.application.filter(a => a !== app)
        : [...prev.application, app]
    }));
  };

  const handleThicknessChange = (type: 'min'|'max', value: string) => {
    setFilters(prev => ({
      ...prev,
      thickness: {
        ...prev.thickness,
        [type]: parseFloat(value) || 0
      }
    }));
  };

  const handlePriceChange = (type: 'min'|'max', value: string) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: parseFloat(value) || 0
      }
    }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Mobile filter toggle */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h1 className="text-2xl font-poppins font-bold text-white">Glass Catalog</h1>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-colors"
        >
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Filters Sidebar */}
      <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0 bg-[#11141e] rounded-xl p-6 border border-white/5 h-fit sticky top-24 z-10`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-poppins font-bold text-white">Filters</h2>
          <button onClick={clearFilters} className="text-sm text-accent-cyan hover:underline transition-all">Clear</button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-poppins font-bold text-gray-300 mb-3">Glass Type</h3>
            <div className="space-y-2">
              {['Clear Float', 'Toughened', 'Laminated', 'DGU', 'Frosted', 'Low-E'].map(type => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={filters.glassType.includes(type)}
                    onChange={() => handleGlassTypeChange(type)} 
                  />
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.glassType.includes(type) ? 'bg-accent-cyan border-accent-cyan' : 'bg-white/5 border-white/20 group-hover:border-accent-cyan'}`}>
                    {filters.glassType.includes(type) && <CheckSquare size={12} className="text-primary-dark" />}
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-poppins font-bold text-gray-300 mb-3">Thickness Range</h3>
            <div className="space-y-4">
              <label className="block text-sm text-gray-400">
                Min: {filters.thickness.min}mm
                <input 
                  type="range" 
                  className="w-full accent-accent-cyan mt-1" 
                  min="3" max="32" 
                  value={filters.thickness.min}
                  onChange={(e) => handleThicknessChange('min', e.target.value)}
                />
              </label>
              <label className="block text-sm text-gray-400">
                Max: {filters.thickness.max}mm
                <input 
                  type="range" 
                  className="w-full accent-accent-cyan mt-1" 
                  min="3" max="32" 
                  value={filters.thickness.max}
                  onChange={(e) => handleThicknessChange('max', e.target.value)}
                />
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-poppins font-bold text-gray-300 mb-3">Price Range (₹)</h3>
            <div className="space-y-4">
              <label className="block text-sm text-gray-400">
                Min: ₹{filters.priceRange.min}
                <input 
                  type="range" 
                  className="w-full accent-accent-cyan mt-1" 
                  min="0" max="500" step="10"
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                />
              </label>
              <label className="block text-sm text-gray-400">
                Max: ₹{filters.priceRange.max}
                <input 
                  type="range" 
                  className="w-full accent-accent-cyan mt-1" 
                  min="0" max="500" step="10"
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                />
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-poppins font-bold text-gray-300 mb-3">Application</h3>
            <div className="space-y-2">
              {['Windows', 'Doors', 'Partitions', 'Facades', 'Skylights', 'Shower Enclosures'].map(app => (
                <label key={app} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={filters.application.includes(app)}
                    onChange={() => handleAppChange(app)} 
                  />
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.application.includes(app) ? 'bg-accent-cyan border-accent-cyan' : 'bg-white/5 border-white/20 group-hover:border-accent-cyan'}`}>
                    {filters.application.includes(app) && <CheckSquare size={12} className="text-primary-dark" />}
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{app}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Products Grid */}
      <div className="flex-1">
        <div className="hidden md:flex justify-between items-center mb-6">
          <h1 className="text-3xl font-poppins font-bold text-white">Glass Catalog</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Sort by:</span>
            <select className="bg-[#11141e] border border-white/10 text-white text-sm rounded-lg px-4 py-2 outline-none focus:border-accent-cyan transition-colors">
              <option>Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="bg-[#11141e] rounded-xl border border-white/5 p-12 text-center text-gray-400 font-inter">
            <p className="text-xl mb-4 text-white font-poppins">No products match your filters.</p>
            <button onClick={clearFilters} className="text-accent-cyan font-semibold hover:underline">Clear all filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} data-testid="product-card" className="bg-white rounded-xl overflow-hidden group hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,217,255,0.15)] hover:border-accent-cyan transition-all duration-300 border border-transparent flex flex-col h-full">
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button 
                      onClick={() => {
                        if (isInWishlist(product.id)) {
                          removeFromWishlist(product.id);
                        } else {
                          addToWishlist({ id: product.id, name: product.name, price: product.priceMin });
                        }
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                        isMounted && isInWishlist(product.id) 
                        ? 'bg-white text-danger' 
                        : 'bg-white/80 backdrop-blur text-gray-500 hover:text-danger hover:bg-white'
                      }`}
                    >
                      <Heart size={16} className={isMounted && isInWishlist(product.id) ? "fill-danger" : ""} />
                    </button>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow bg-white">
                  <h3 className="text-lg font-bold font-inter text-primary-dark mb-2 group-hover:text-accent-cyan transition-colors line-clamp-1">{product.name}</h3>
                  
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-4 font-inter">
                    <span>{product.thickness}mm</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 self-center"></span>
                    <span>{product.process}</span>
                  </div>

                  <div className="mt-auto">
                    <p className="font-mono font-bold text-accent-gold text-lg mb-3">₹{product.priceMin} - ₹{product.priceMax} <span className="text-xs text-gray-500 font-inter font-normal">/sq.ft</span></p>
                    
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100 text-xs">
                      <span className="text-gray-500 hover:text-primary-dark cursor-pointer transition-colors">{product.vendors} Vendors</span>
                      <div className="flex items-center gap-1 text-accent-gold">
                        <Star size={14} className="fill-accent-gold" />
                        <span className="font-bold">{product.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/products/${product.id}`} className="flex-1 text-center py-2 border border-accent-cyan text-accent-cyan rounded-lg text-sm font-semibold hover:bg-accent-cyan hover:text-primary-dark transition-colors">
                        View Details
                      </Link>
                      <button 
                        onClick={() => {
                          addToCart({ id: product.id, name: product.name, price: product.priceMin, quantity: 1 });
                        }}
                        className="flex-1 py-2 bg-accent-cyan text-primary-dark rounded-lg text-sm font-semibold hover:bg-[#00bfe6] transition-colors"
                      >
                        Quick Add
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Compare Overlay */}
                <div 
                  className="absolute top-3 left-3 bg-white/80 backdrop-blur rounded p-1 cursor-pointer flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-primary-dark transition-colors"
                  onClick={() => toggleCompare(product.id)}
                >
                  {selectedIds.has(product.id) ? <CheckSquare size={16} className="text-accent-cyan" /> : <Square size={16} />}
                  <span>Compare</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Floating Compare Button */}
        {selectedIds.size > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary-dark border border-accent-cyan shadow-[0_0_20px_rgba(0,217,255,0.3)] rounded-full px-6 py-3 flex items-center gap-4 z-50 animate-bounce-short">
            <span className="text-white font-bold">{selectedIds.size} Selected</span>
            <div className="h-4 w-px bg-white/20"></div>
            <Link href="/vendors" className="text-accent-cyan font-bold hover:text-white transition-colors">
              Compare Now &rarr;
            </Link>
            <button onClick={() => setSelectedIds(new Set())} className="text-gray-400 hover:text-white ml-2 transition-colors">
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
