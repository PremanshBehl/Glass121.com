"use client";

import { useState } from "react";
import { Check, ChevronRight, Calculator, FileText, Download } from "lucide-react";
import { useOrderStore } from "@/store/useOrderStore";
import { useCartStore } from "@/store/useCartStore";

export default function QuoteGenerator() {
  const [step, setStep] = useState(1);
  const [glassType, setGlassType] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: "", height: "" });
  const [qty, setQty] = useState(1);
  const [features, setFeatures] = useState({
    polish: false,
    holes: false,
    silkScreen: false,
    insurance: false
  });
  
  const { addQuote } = useOrderStore();
  const { addItem: addToCart } = useCartStore();

  const glassTypes = [
    { id: "g1", name: "Clear Float", price: 50 },
    { id: "g2", name: "Toughened", price: 140 },
    { id: "g3", name: "Laminated", price: 200 },
    { id: "g4", name: "DGU", price: 400 },
  ];

  const calculateAreaSqFt = () => {
    if (!dimensions.width || !dimensions.height) return 0;
    const w = parseFloat(dimensions.width);
    const h = parseFloat(dimensions.height);
    // mm to sq meters: (w/1000) * (h/1000)
    // sq meters to sq ft: * 10.764
    return (w / 1000) * (h / 1000) * 10.764 * qty;
  };

  const calculateTotal = () => {
    const area = calculateAreaSqFt();
    const basePrice = glassTypes.find(g => g.id === glassType)?.price || 0;
    let total = area * basePrice;
    
    if (features.polish) total += (4 * 50 * qty); // 4 edges * 50 * qty
    if (features.holes) total += (100 * qty); // assuming 1 hole per panel
    if (features.silkScreen) total += (200 * qty);
    if (features.insurance) total += (total * 0.05);
    
    return total;
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-poppins font-bold text-white mb-4">Glass Quote Estimator</h1>
        <p className="text-gray-400 font-inter text-lg">Instant pricing based on daily market rates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Form Steps */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Step 1 */}
          <div className={`bg-[#11141e] border ${step >= 1 ? 'border-accent-cyan/50' : 'border-white/10'} rounded-2xl p-6 md:p-8 transition-colors`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step > 1 ? 'bg-success text-white' : 'bg-accent-cyan text-primary-dark'}`}>
                {step > 1 ? <Check size={16} /> : "1"}
              </div>
              <h2 className="text-xl font-poppins font-bold text-white">Select Glass Type</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {glassTypes.map(type => (
                <div 
                  key={type.id}
                  onClick={() => { setGlassType(type.id); if (step === 1) setStep(2); }}
                  className={`cursor-pointer border rounded-xl p-4 text-center transition-all ${
                    glassType === type.id 
                    ? 'border-accent-cyan bg-accent-cyan/10 text-white shadow-[0_0_15px_rgba(0,217,255,0.2)]' 
                    : 'border-white/10 text-gray-400 hover:border-white/30'
                  }`}
                >
                  <div className="font-semibold mb-1">{type.name}</div>
                  <div className="text-xs">~₹{type.price}/sq.ft</div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className={`bg-[#11141e] border ${step >= 2 ? 'border-accent-cyan/50' : 'border-white/10 opacity-50 pointer-events-none'} rounded-2xl p-6 md:p-8 transition-all`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step > 2 ? 'bg-success text-white' : step === 2 ? 'bg-accent-cyan text-primary-dark' : 'bg-gray-700 text-gray-400'}`}>
                {step > 2 ? <Check size={16} /> : "2"}
              </div>
              <h2 className="text-xl font-poppins font-bold text-white">Enter Dimensions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Width (mm)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={dimensions.width}
                    onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
                    className="w-full bg-primary-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:border-accent-cyan outline-none"
                    placeholder="e.g. 1200"
                  />
                  <span className="absolute right-4 top-3 text-gray-500 text-sm">mm</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Height (mm)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={dimensions.height}
                    onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
                    className="w-full bg-primary-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:border-accent-cyan outline-none"
                    placeholder="e.g. 800"
                  />
                  <span className="absolute right-4 top-3 text-gray-500 text-sm">mm</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Quantity (panels)</label>
                <div className="flex items-center border border-white/20 rounded-lg overflow-hidden bg-primary-dark">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white">-</button>
                  <input 
                    type="number" 
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value) || 1)}
                    className="w-full bg-transparent text-center text-white outline-none"
                  />
                  <button onClick={() => setQty(qty + 1)} className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white">+</button>
                </div>
              </div>
            </div>
            
            {dimensions.width && dimensions.height && (
              <div className="mt-4 text-sm text-gray-400 font-mono">
                Area: {calculateAreaSqFt().toFixed(2)} sq.ft
              </div>
            )}
            
            {step === 2 && dimensions.width && dimensions.height && (
              <button 
                onClick={() => setStep(3)}
                className="mt-6 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                Continue <ChevronRight size={16} />
              </button>
            )}
          </div>

          {/* Step 3 */}
          <div className={`bg-[#11141e] border ${step >= 3 ? 'border-accent-cyan/50' : 'border-white/10 opacity-50 pointer-events-none'} rounded-2xl p-6 md:p-8 transition-all`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 3 ? 'bg-accent-cyan text-primary-dark' : 'bg-gray-700 text-gray-400'}`}>
                3
              </div>
              <h2 className="text-xl font-poppins font-bold text-white">Optional Features</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${features.polish ? 'border-accent-cyan bg-accent-cyan/5' : 'border-white/10 hover:border-white/30'}`}>
                <input 
                  type="checkbox" 
                  checked={features.polish}
                  onChange={(e) => setFeatures({...features, polish: e.target.checked})}
                  className="mt-1 accent-accent-cyan w-4 h-4" 
                />
                <div>
                  <div className="text-white font-semibold">Edge Polishing</div>
                  <div className="text-sm text-gray-400 mt-1">+₹50 per edge</div>
                </div>
              </label>
              
              <label className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${features.holes ? 'border-accent-cyan bg-accent-cyan/5' : 'border-white/10 hover:border-white/30'}`}>
                <input 
                  type="checkbox" 
                  checked={features.holes}
                  onChange={(e) => setFeatures({...features, holes: e.target.checked})}
                  className="mt-1 accent-accent-cyan w-4 h-4" 
                />
                <div>
                  <div className="text-white font-semibold">Drill Holes</div>
                  <div className="text-sm text-gray-400 mt-1">+₹100 per hole</div>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right: Summary Card */}
        <div className="lg:col-span-4">
          <div className="bg-[#11141e] border border-accent-cyan rounded-2xl p-6 sticky top-24 shadow-[0_10px_40px_-10px_rgba(0,217,255,0.15)]">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-poppins font-bold text-white flex items-center gap-2">
                <Calculator size={20} className="text-accent-cyan" />
                Quote Summary
              </h3>
              <span className="bg-accent-gold/20 text-accent-gold text-xs font-bold px-2 py-1 rounded">ESTIMATED</span>
            </div>
            
            <div className="space-y-4 text-sm font-mono border-b border-white/10 pb-6 mb-6">
              {glassType && dimensions.width && dimensions.height ? (
                <>
                  <div className="flex justify-between text-gray-300">
                    <span>Glass ({calculateAreaSqFt().toFixed(2)} sq.ft)</span>
                    <span>₹{(calculateAreaSqFt() * (glassTypes.find(g => g.id === glassType)?.price || 0)).toFixed(2)}</span>
                  </div>
                  {features.polish && (
                    <div className="flex justify-between text-gray-300">
                      <span>Edge Polish (4 edges × {qty})</span>
                      <span>₹{4 * 50 * qty}</span>
                    </div>
                  )}
                  {features.holes && (
                    <div className="flex justify-between text-gray-300">
                      <span>Drill Holes (1 × {qty})</span>
                      <span>₹{100 * qty}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-gray-500 text-center py-4 font-inter">
                  Complete steps 1 and 2 to see the breakdown.
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-gray-400 font-inter">Total Estimate:</span>
                <span className="text-3xl font-mono font-bold text-accent-gold">
                  ₹{calculateTotal().toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-500 text-right">±10% based on final specifications</p>
            </div>
            
            <button 
              disabled={!(glassType && dimensions.width && dimensions.height)}
              onClick={() => {
                const g = glassTypes.find(gt => gt.id === glassType);
                addQuote({
                  id: `QT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
                  date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                  productName: `${g?.name} Glass (${dimensions.width}x${dimensions.height})`,
                  details: `Qty: ${qty}. Features: ${[features.polish ? 'Polish' : '', features.holes ? 'Holes' : ''].filter(Boolean).join(', ')}`,
                  amount: calculateTotal(),
                  status: 'Active'
                });
                window.location.href = "/dashboard";
              }}
              className="w-full bg-accent-cyan text-primary-dark font-bold py-3 rounded-lg mb-3 hover:bg-[#00bfe6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              <FileText size={18} /> Request Detailed Quote
            </button>
            <button 
              disabled={!(glassType && dimensions.width && dimensions.height)}
              onClick={() => {
                const g = glassTypes.find(gt => gt.id === glassType);
                addToCart({
                  id: `qt-custom-${Date.now()}`,
                  name: `Custom ${g?.name} Glass`,
                  price: calculateTotal() / qty,
                  quantity: qty
                });
                window.location.href = "/cart";
              }}
              className="w-full bg-transparent border border-accent-cyan text-accent-cyan font-bold py-3 rounded-lg hover:bg-accent-cyan/10 transition-colors disabled:opacity-50 disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-transparent"
            >
              Add to Cart
            </button>
            
            <div className="mt-4 flex justify-center">
              <button className="text-xs text-gray-400 flex items-center gap-1 hover:text-white transition-colors">
                <Download size={14} /> Save as PDF
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
