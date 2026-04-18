"use client";

import { useState } from "react";
import { Search as SearchIcon, Sparkles, Loader2, AlertTriangle, ShieldCheck, Info, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Recommendation = {
  application: string;
  safetyLevel: "HIGH" | "MEDIUM" | "LOW";
  recommendedGlass: Array<{
    id: string;
    name: string;
    rank: number;
    badge: string;
    description: string;
    attributes: string[];
    priceRange: string;
  }>;
  alliedProducts: Array<{ name: string; type: string; cost: string }>;
  customerNote: string;
};

const mockAIResponse: Recommendation = {
  application: "Shower Enclosure",
  safetyLevel: "HIGH",
  recommendedGlass: [
    {
      id: "g1",
      name: "8mm Toughened Glass",
      rank: 1,
      badge: "BEST CHOICE",
      description: "Ideal balance of strength and weight for standard shower doors.",
      attributes: ["Tempered for safety", "Water-resistant", "Impact resistant"],
      priceRange: "₹120-160/sq.ft"
    },
    {
      id: "g2",
      name: "10mm Laminated Glass",
      rank: 2,
      badge: "PREMIUM OPTION",
      description: "Superior strength with added acoustic properties and extra safety.",
      attributes: ["Extra durability", "Sound dampening", "Holds together if broken"],
      priceRange: "₹180-250/sq.ft"
    }
  ],
  alliedProducts: [
    { name: "Stainless Steel Hinges & Fittings", type: "Hardware", cost: "₹800/set" },
    { name: "Silicone Sealant (Weatherproof)", type: "Sealant", cost: "₹250/tube" },
    { name: "Professional Installation", type: "Service", cost: "₹50-100/sq.ft" }
  ],
  customerNote: "For shower enclosures, safety glass is mandatory. We recommend toughened glass as it crumbles into small, blunt pieces rather than sharp shards if broken."
};

import { useCartStore } from "@/store/useCartStore";

// Mock database for simple keyword matching
const glassDatabase: { keywords: string[], response: Recommendation }[] = [
  { keywords: ["shower", "bathroom", "wet"], response: mockAIResponse },
  { keywords: ["partition", "office", "cabin"], response: { ...mockAIResponse, application: "Office Partition", safetyLevel: "MEDIUM", recommendedGlass: [{ id: "g3", name: "10mm Toughened Clear", rank: 1, badge: "STANDARD", description: "Standard office partition glass.", attributes: ["Clear", "Safe", "Acoustic"], priceRange: "₹140-180/sq.ft" }], customerNote: "Acoustic privacy is key for offices." } as Recommendation },
  { keywords: ["balcony", "railing", "outdoor"], response: { ...mockAIResponse, application: "Balcony Railing", safetyLevel: "HIGH", recommendedGlass: [{ id: "g4", name: "12.52mm Sentry Laminated", rank: 1, badge: "ULTRA SAFE", description: "Hurricane resistant structural glass.", attributes: ["Structural integrity", "Weather proof", "No shattering"], priceRange: "₹350-450/sq.ft" }], customerNote: "Structural laminated glass is highly recommended for exposed outdoor areas." } as Recommendation }
];

export default function SmartFinder() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Recommendation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const addToCart = useCartStore(state => state.addItem);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResult(null);
    setError(null);

    setTimeout(() => {
      try {
        if (query.toLowerCase() === "error") {
          throw new Error("Failed to parse AI response. Please try again.");
        }
        
        const lowerQuery = query.toLowerCase();
        let matchedResponse = mockAIResponse; // Default fallback
        for (const entry of glassDatabase) {
          if (entry.keywords.some(kw => lowerQuery.includes(kw))) {
            matchedResponse = entry.response;
            break;
          }
        }
        setResult(matchedResponse);
      } catch (err: any) {
        console.error('Error fetching recommendations:', err);
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const setQuickSearch = (text: string) => {
    setQuery(text);
    // Auto submit?
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-poppins font-bold text-white mb-4 flex items-center justify-center gap-3">
          Smart Glass Finder <Sparkles className="text-accent-cyan w-8 h-8" />
        </h1>
        <p className="text-gray-400 font-inter text-lg">Describe your need in plain language. AI recommends the right glass.</p>
      </div>

      <form onSubmit={handleSearch} className="mb-12 relative">
        <div className="relative group">
          <div className={`absolute inset-0 bg-accent-cyan/20 rounded-xl blur-xl transition-opacity duration-300 ${query ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
          <div className="relative bg-[#1a1f2e] border-2 border-white/10 focus-within:border-accent-cyan rounded-xl flex items-center px-4 transition-colors">
            <SearchIcon className="text-gray-400 w-6 h-6 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you building? Eg: 'shower enclosure', 'office partition'..."
              className="w-full bg-transparent border-none outline-none text-white font-inter text-lg py-4 md:py-5 px-4 placeholder:text-gray-500 placeholder:italic"
            />
            <button 
              type="submit" 
              disabled={loading || !query.trim()}
              className="bg-accent-cyan text-primary-dark p-2 md:px-6 md:py-3 rounded-lg font-bold font-poppins hover:bg-[#00bfe6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span className="hidden md:inline">Find Match</span>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 items-center justify-center">
          <span className="text-gray-400 text-sm font-inter mr-2">Quick Searches:</span>
          {["Shower Enclosure", "Office Partition", "Balcony Railing", "Facade", "Kitchen Backsplash"].map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuickSearch(tag)}
              className="bg-white/5 border border-white/10 hover:border-accent-cyan hover:text-accent-cyan text-gray-300 text-sm py-1.5 px-4 rounded-full transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </form>

      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 border-4 border-accent-cyan/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-accent-cyan rounded-full border-t-transparent animate-spin"></div>
              <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-accent-cyan animate-pulse" />
            </div>
            <p className="text-accent-cyan font-inter animate-pulse">AI is analyzing your requirement...</p>
          </motion.div>
        )}

        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-danger/10 border border-danger/50 rounded-2xl p-8 text-center"
          >
            <AlertTriangle className="w-12 h-12 text-danger mx-auto mb-4" />
            <h3 className="text-xl font-poppins font-bold text-white mb-2">Could not fetch recommendations</h3>
            <p className="text-danger mb-6">{error}</p>
            <button 
              onClick={handleSearch}
              className="px-6 py-2 bg-danger text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {result && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[#11141e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="bg-primary-dark p-6 border-b border-white/10 flex flex-wrap justify-between items-center gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">AI Recommendation For</p>
                <h2 className="text-2xl font-poppins font-bold text-white">{result.application}</h2>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${
                result.safetyLevel === 'HIGH' ? 'bg-danger/20 text-danger border border-danger/50' : 
                result.safetyLevel === 'MEDIUM' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/50' : 
                'bg-success/20 text-success border border-success/50'
              }`}>
                {result.safetyLevel === 'HIGH' ? <AlertTriangle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                Safety Level: {result.safetyLevel}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <h3 className="text-lg font-poppins font-semibold text-white mb-6">Recommended Glass Types</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {result.recommendedGlass.map((glass) => (
                  <div key={glass.id} className="bg-primary-dark border border-white/10 rounded-xl p-6 relative hover:shadow-[0_8px_30px_rgba(0,217,255,0.1)] hover:border-accent-cyan/50 hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#11141e] border border-white/10 rounded-full flex items-center justify-center font-bold text-accent-gold font-poppins z-10">
                      {glass.rank}
                    </div>
                    
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-poppins font-bold text-white pr-2">{glass.name}</h4>
                      <span className="shrink-0 bg-accent-gold/20 text-accent-gold border border-accent-gold/30 text-xs font-bold px-2 py-1 rounded">
                        {glass.badge}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4">{glass.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {glass.attributes.map((attr, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                          <span>{attr}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-white/10">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Est. Price</p>
                        <p className="font-mono text-accent-gold font-bold">{glass.priceRange}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/products/${glass.id}`} className="px-4 py-2 bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan hover:text-primary-dark border border-accent-cyan transition-colors rounded font-semibold text-sm">
                          View
                        </Link>
                        <button className="px-4 py-2 bg-transparent text-white border border-white/20 hover:bg-white/10 transition-colors rounded font-semibold text-sm">
                          Quote
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-primary-dark border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-poppins font-semibold text-white mb-4">Allied Products for Your Project</h3>
                  <div className="space-y-3">
                    {result.alliedProducts.map((prod, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-accent-cyan rounded-full"></div>
                          <span className="text-gray-300">{prod.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500 block">{prod.type}</span>
                          <span className="font-mono text-sm text-gray-400">{prod.cost}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary-dark border border-accent-gold/30 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/10 rounded-bl-full pointer-events-none"></div>
                  <Info className="w-8 h-8 text-accent-gold mb-4" />
                  <h3 className="text-lg font-poppins font-semibold text-white mb-2">Expert Note</h3>
                  <p className="text-sm text-gray-300 leading-relaxed italic">
                    "{result.customerNote}"
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
