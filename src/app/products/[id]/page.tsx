"use client";

import { useState } from "react";
import { Star, ArrowLeft, Heart, Share2, Shield, Info, ShoppingCart, ArrowRight, ShieldCheck, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function ProductDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("specs");
  
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, items: wishlistItems, removeItem: removeFromWishlist } = useWishlistStore();
  
  // Mock data for the product
  const product = {
    id: id,
    name: "8mm Toughened Glass",
    brand: "Glass121 Verified",
    rating: 4.8,
    reviews: 247,
    description: "High-strength safety glass processed by controlled thermal treatments to increase its strength compared with normal glass. Perfect for shower enclosures, glass doors, and table tops.",
    priceRange: "₹120 - ₹160",
    stock: "in-stock",
    safetyLevel: "HIGH",
    attributes: [
      { label: "Glass Type", value: "Toughened" },
      { label: "Thickness", value: "8mm" },
      { label: "Process", value: "Tempered" },
      { label: "Size Range", value: "Up to 3000 x 2000mm" },
      { label: "Load Capacity", value: "800 kg/sq.m" },
      { label: "Thermal Prop.", value: "U-Value: 5.6 W/m²K" },
      { label: "Safety Rating", value: "IS 2083:1999" }
    ],
    applications: ["Windows", "Doors", "Partitions", "Shower Enclosures"]
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb & Navigation */}
      <div className="bg-primary-dark pt-6 pb-2 px-4">
        <div className="container mx-auto flex items-center gap-4 text-sm font-inter">
          <Link href="/products" className="text-gray-400 hover:text-white flex items-center gap-1">
            <ArrowLeft size={16} /> Back to Catalog
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400">Products</span>
          <span className="text-gray-600">/</span>
          <span className="text-white">{product.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-primary-dark border-b border-white/10 pb-12">
        <div className="container mx-auto px-4 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Images */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl aspect-[4/3] relative overflow-hidden mb-4 group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center text-gray-400 text-lg">
                  [Product Image Placeholder]
                </div>
                
                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="bg-accent-gold text-primary-dark px-3 py-1 rounded-full text-xs font-bold font-poppins shadow-lg">
                    BESTSELLER
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => {
                      const isSaved = wishlistItems.some(item => item.id === (id as string || 'default-id'));
                      if (isSaved) {
                        removeFromWishlist(id as string || 'default-id');
                      } else {
                        addToWishlist({
                          id: id as string || 'default-id',
                          name: product.name,
                          price: parseInt(product.priceRange.replace(/[^0-9]/g, ''), 10) || 120
                        });
                      }
                    }}
                    className={`w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center transition-all shadow-md ${
                      wishlistItems.some(item => item.id === (id as string || 'default-id')) 
                      ? 'text-danger bg-white' 
                      : 'text-gray-600 hover:text-danger hover:bg-white'
                    }`}
                  >
                    <Heart size={20} className={wishlistItems.some(item => item.id === (id as string || 'default-id')) ? "fill-danger" : ""} />
                  </button>
                  <button className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-600 hover:text-accent-cyan hover:bg-white transition-all shadow-md">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-20 h-20 rounded-lg shrink-0 cursor-pointer border-2 transition-all ${i === 1 ? 'border-accent-cyan bg-gray-100' : 'border-transparent bg-gray-200 hover:border-gray-400'}`}></div>
                ))}
              </div>
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-400 font-inter text-sm">{product.brand}</span>
                <span className="flex items-center text-accent-gold text-sm font-bold bg-white/5 px-2 py-0.5 rounded">
                  <Star size={14} className="fill-accent-gold mr-1" /> {product.rating} <span className="text-gray-500 font-normal ml-1">({product.reviews})</span>
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4 leading-tight">{product.name}</h1>
              
              <p className="text-gray-400 font-inter leading-relaxed mb-6">
                {product.description}
              </p>
              
              <div className="bg-[#11141e] rounded-xl p-6 border border-white/5 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Market Price Range</p>
                    <p className="text-3xl font-mono font-bold text-accent-gold">{product.priceRange}<span className="text-base text-gray-500 font-inter font-normal">/sq.ft</span></p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 bg-success/20 text-success px-3 py-1 rounded-full text-xs font-bold border border-success/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div>
                      In Stock
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-gray-400 font-inter text-sm">Thickness</span>
                    <span className="text-white font-mono">{product.attributes.find(a => a.label === 'Thickness')?.value}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-gray-400 font-inter text-sm">Process</span>
                    <span className="text-white font-mono bg-accent-gold/20 text-accent-gold px-2 py-0.5 rounded text-xs">{product.attributes.find(a => a.label === 'Process')?.value}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-inter text-sm">Safety Level</span>
                    <span className="flex items-center gap-1 text-danger font-bold text-xs bg-danger/20 px-2 py-0.5 rounded">
                      <AlertTriangle size={12} /> HIGH
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Link href="/estimates" className="w-full bg-accent-cyan hover:bg-[#00bfe6] text-primary-dark font-bold py-3 rounded-lg flex justify-center items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,217,255,0.2)]">
                    Get Instant Estimate
                  </Link>
                  <button 
                    onClick={() => {
                      addToCart({
                        id: id as string || 'default-id',
                        name: product.name,
                        price: parseInt(product.priceRange.replace(/[^0-9]/g, ''), 10) || 120,
                        quantity: 1
                      });
                      window.location.href = "/cart";
                    }}
                    className="w-full bg-transparent border border-white/20 text-white hover:bg-white/5 font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {product.applications.map(app => (
                  <span key={app} className="bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1.5 rounded-full">
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Sections */}
      <section className="py-16 bg-white text-primary-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar">
              {['Specs & Details', 'Vendor Comparison', 'Reviews (247)', 'Installation Guide'].map((tab, i) => (
                <button 
                  key={tab}
                  className={`px-6 py-4 font-poppins font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${i === 0 ? 'border-accent-cyan text-primary-dark' : 'border-transparent text-gray-500 hover:text-primary-dark'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Specs Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-poppins font-bold mb-6">Technical Specifications</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  {product.attributes.map((attr, i) => (
                    <div key={i} className={`flex p-4 ${i !== product.attributes.length - 1 ? 'border-b border-gray-200' : ''} ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <div className="w-1/3 text-sm font-semibold text-gray-600">{attr.label}</div>
                      <div className="w-2/3 text-sm font-mono text-primary-dark">{attr.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-poppins font-bold mb-6">Vendor Comparison</h3>
                <div className="space-y-4">
                  {/* Vendor 1 */}
                  <div className="border border-accent-cyan/50 bg-blue-50/50 rounded-xl p-5 relative">
                    <div className="absolute -top-3 right-4 bg-accent-cyan text-primary-dark text-xs font-bold px-2 py-1 rounded shadow">
                      Recommended
                    </div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-lg">Glass121 Official</h4>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star size={14} className="fill-accent-gold text-accent-gold mr-1" /> 4.9 (1.2k jobs)
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-accent-gold text-lg">₹130<span className="text-xs text-gray-500">/sq.ft</span></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-success" /> Verified</span>
                      <span>Delivery: 2-3 days</span>
                    </div>
                    <button className="w-full py-2 bg-primary-dark text-white rounded font-semibold text-sm hover:bg-[#2a3040] transition-colors">
                      Select Vendor
                    </button>
                  </div>
                  
                  {/* Vendor 2 */}
                  <div className="border border-gray-200 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">Prime Glass India</h4>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star size={14} className="fill-accent-gold text-accent-gold mr-1" /> 4.6 (450 jobs)
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-accent-gold text-lg">₹125<span className="text-xs text-gray-500">/sq.ft</span></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>Delivery: 4-5 days</span>
                    </div>
                    <button className="w-full py-2 border border-gray-300 text-gray-700 rounded font-semibold text-sm hover:bg-gray-50 transition-colors">
                      Select Vendor
                    </button>
                  </div>
                  
                  <Link href="/vendors" className="block text-center text-accent-cyan font-semibold text-sm mt-4 hover:underline">
                    View All 12 Vendors &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sticky Footer CTA for Mobile/Scrolling */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 lg:hidden flex gap-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex-1">
          <p className="text-xs text-gray-500">Starting from</p>
          <p className="font-mono font-bold text-lg text-accent-gold">₹120/sq.ft</p>
        </div>
        <button className="flex-1 bg-accent-cyan text-primary-dark font-bold rounded-lg">
          Get Estimate
        </button>
      </div>
    </div>
  );
}
