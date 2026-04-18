"use client";

import { useState } from "react";
import { X, Star, ShieldCheck, AlertTriangle, ChevronDown, Check } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function VendorComparison() {
  const [selectedProducts, setSelectedProducts] = useState(["Clear Float (5mm)", "8mm Toughened"]);
  const addToCart = useCartStore(state => state.addItem);
  
  const handleMockAction = (action: string) => {
    console.log(`"${action}" action triggered! This feature is simulated for the prototype.`);
  };
  const vendors = [
    {
      name: "AmalGus",
      location: "Pan-India",
      price: "₹45-60",
      rating: 4.9,
      reviews: 300,
      delivery: "3-5 days",
      coverage: true,
      stock: "In Stock",
      cert: "IS 2083:1999",
      estCost: "₹1,200",
      recommended: true
    },
    {
      name: "Prime Glass",
      location: "West India",
      price: "₹50-65",
      rating: 4.6,
      reviews: 180,
      delivery: "2-3 days",
      coverage: false,
      stock: "Low Stock",
      cert: "IS 2083:1999",
      estCost: "₹1,350",
      recommended: false
    },
    {
      name: "Quality Glass",
      location: "North India",
      price: "₹52-70",
      rating: 4.4,
      reviews: 95,
      delivery: "4-6 days",
      coverage: true,
      stock: "In Stock",
      cert: "IS 2083:1999",
      estCost: "₹1,400",
      recommended: false
    },
    {
      name: "Crystal Pane",
      location: "South India",
      price: "₹48-62",
      rating: 4.7,
      reviews: 150,
      delivery: "3-4 days",
      coverage: true,
      stock: "In Stock",
      cert: "IS 2083:1999",
      estCost: "₹1,280",
      recommended: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="mb-10">
        <h1 className="text-3xl md:text-5xl font-poppins font-bold text-white mb-4">Compare Vendors</h1>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <p className="text-gray-400 font-inter text-lg">Comparing {selectedProducts.length} products from {vendors.length} vendors.</p>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500 mr-2">Selected Products:</span>
            {selectedProducts.length === 0 && <span className="text-sm text-gray-400">None</span>}
            {selectedProducts.map((p, i) => (
              <div key={i} className="flex items-center gap-2 bg-[#11141e] border border-white/10 px-3 py-1.5 rounded-full text-sm text-gray-300">
                {p}
                <button onClick={() => setSelectedProducts(selectedProducts.filter((_, idx) => idx !== i))} className="text-gray-500 hover:text-danger transition-colors"><X size={14} /></button>
              </div>
            ))}
            <button onClick={() => handleMockAction("Add More Products")} className="text-accent-cyan text-sm font-semibold hover:underline flex items-center gap-1 ml-2">
              + Add More
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8 border-b border-white/10 pb-6">
        <span className="text-gray-400 text-sm flex items-center mr-2">Filters:</span>
        <button onClick={() => handleMockAction("Price Filter")} className="px-4 py-2 bg-[#11141e] border border-white/10 text-gray-300 rounded-lg text-sm flex items-center gap-2 hover:border-accent-cyan transition-colors">
          Price Range <ChevronDown size={14} />
        </button>
        <button onClick={() => handleMockAction("Delivery Filter")} className="px-4 py-2 bg-[#11141e] border border-white/10 text-gray-300 rounded-lg text-sm flex items-center gap-2 hover:border-accent-cyan transition-colors">
          Delivery Time <ChevronDown size={14} />
        </button>
        <button onClick={() => handleMockAction("Rating Filter")} className="px-4 py-2 bg-[#11141e] border border-white/10 text-gray-300 rounded-lg text-sm flex items-center gap-2 hover:border-accent-cyan transition-colors">
          Rating <ChevronDown size={14} />
        </button>
        <button onClick={() => handleMockAction("Certification Filter")} className="px-4 py-2 bg-[#11141e] border border-white/10 text-gray-300 rounded-lg text-sm flex items-center gap-2 hover:border-accent-cyan transition-colors">
          Certifications <ChevronDown size={14} />
        </button>
        <button onClick={() => handleMockAction("Clear Filters")} className="px-4 py-2 text-gray-500 hover:text-white text-sm transition-colors ml-auto">
          Clear Filters
        </button>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto pb-8 hide-scrollbar relative">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-4 gap-4">
            
            {vendors.map((vendor, idx) => (
              <div key={idx} className={`bg-[#11141e] border rounded-xl overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl ${vendor.recommended ? 'border-accent-cyan shadow-[0_0_20px_rgba(0,217,255,0.15)]' : 'border-white/5'}`}>
                
                {/* Header */}
                <div className={`p-6 border-b ${vendor.recommended ? 'border-accent-cyan/30 bg-accent-cyan/5' : 'border-white/5'} relative`}>
                  {vendor.recommended && (
                    <div className="absolute top-0 right-0 bg-accent-cyan text-primary-dark text-xs font-bold px-3 py-1 rounded-bl-lg">
                      RECOMMENDED
                    </div>
                  )}
                  <h3 className="font-poppins font-bold text-xl text-white mb-1">{vendor.name}</h3>
                  <p className="text-sm text-gray-400 font-inter">{vendor.location}</p>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col gap-6">
                  
                  {/* Price & Rating */}
                  <div className="pb-6 border-b border-white/5">
                    <div className="text-3xl font-mono font-bold text-accent-gold mb-2">{vendor.price}</div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center text-accent-gold font-bold">
                        <Star size={14} className="fill-accent-gold mr-1" /> {vendor.rating}/5
                      </div>
                      <span className="text-gray-500">({vendor.reviews} rev)</span>
                    </div>
                  </div>

                  {/* Delivery */}
                  <div className="pb-6 border-b border-white/5 space-y-2">
                    <p className="text-sm text-gray-400">Delivery:</p>
                    <p className="font-mono text-white">{vendor.delivery}</p>
                    {vendor.coverage ? (
                      <p className="text-xs text-success flex items-center gap-1"><Check size={14} /> Available in your area</p>
                    ) : (
                      <p className="text-xs text-danger flex items-center gap-1"><X size={14} /> Area not covered</p>
                    )}
                  </div>

                  {/* Certifications & Stock */}
                  <div className="pb-6 border-b border-white/5 space-y-3">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Certifications:</p>
                      <span className="inline-block bg-white/5 border border-white/10 text-xs px-2 py-1 rounded text-gray-300">
                        {vendor.cert}
                      </span>
                    </div>
                    <div>
                      {vendor.stock === 'In Stock' ? (
                        <span className="text-success text-sm font-bold flex items-center gap-1"><ShieldCheck size={16} /> In Stock</span>
                      ) : (
                        <span className="text-orange-500 text-sm font-bold flex items-center gap-1"><AlertTriangle size={16} /> Low Stock</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto space-y-3 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Est. Cost</span>
                      <span className="font-mono font-bold text-white text-lg">{vendor.estCost}</span>
                    </div>
                    <button onClick={() => window.location.href = "/vendors"} className="w-full py-2 bg-transparent border border-white/20 text-white rounded-lg font-semibold hover:bg-white/5 transition-colors">
                      View Details
                    </button>
                    <button onClick={() => {
                      // Add each selected product to cart with the vendor estCost price parsed
                      const priceNum = parseInt(vendor.estCost.replace(/[^0-9]/g, ''), 10) || 1000;
                      selectedProducts.forEach((prodName, i) => {
                        addToCart({
                          id: `vendor-${vendor.name}-${i}`,
                          name: `${prodName} from ${vendor.name}`,
                          price: Math.floor(priceNum / selectedProducts.length), // Split estimated cost
                          quantity: 1
                        });
                      });
                      window.location.href = "/cart";
                    }} className={`w-full py-3 rounded-lg font-bold transition-colors ${vendor.recommended ? 'bg-accent-cyan text-primary-dark hover:bg-[#00bfe6]' : 'bg-[#2a3040] text-white hover:bg-[#343b4f]'}`}>
                      Order Now
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: #11141e;
          border-radius: 4px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 217, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
