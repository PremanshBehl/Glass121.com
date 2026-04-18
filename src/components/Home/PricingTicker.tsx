"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock } from "lucide-react";

const rates = [
  { name: "Clear Float (5mm)", price: "₹45-60/sq.ft", change: "up" },
  { name: "Toughened (8mm)", price: "₹120-160/sq.ft", change: "down" },
  { name: "Laminated (10mm)", price: "₹180-250/sq.ft", change: "neutral" },
  { name: "DGU (24mm)", price: "₹350-450/sq.ft", change: "up" },
  { name: "Frosted (6mm)", price: "₹80-110/sq.ft", change: "down" },
  { name: "Low-E (6mm)", price: "₹190-240/sq.ft", change: "neutral" },
];

export default function PricingTicker() {
  return (
    <div className="bg-[#0f121a] border-y border-white/5 relative flex items-center overflow-hidden h-14">
      {/* Ticker Title */}
      <div className="absolute left-0 z-10 bg-[#0f121a] h-full flex items-center px-4 md:px-8 border-r border-white/10 shadow-[10px_0_20px_-10px_rgba(0,0,0,0.8)]">
        <span className="text-white font-poppins font-semibold text-sm whitespace-nowrap hidden md:inline-block">Real-Time Rates</span>
        <span className="text-white font-poppins font-semibold text-sm whitespace-nowrap md:hidden">Rates</span>
      </div>

      {/* Marquee Wrapper */}
      <div className="flex whitespace-nowrap ml-24 md:ml-48 overflow-hidden w-full relative">
        <motion.div 
          className="flex shrink-0 gap-8 items-center"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...rates, ...rates, ...rates].map((rate, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-gray-400 font-inter text-sm">{rate.name}:</span>
              <span className={`font-mono font-bold text-sm ${rate.change === 'up' ? 'text-success' : rate.change === 'down' ? 'text-danger' : 'text-accent-gold'}`}>
                {rate.price}
                {rate.change === 'up' && ' ↑'}
                {rate.change === 'down' && ' ↓'}
                {rate.change === 'neutral' && ' -'}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Ticker Actions */}
      <div className="absolute right-0 z-10 bg-[#0f121a] h-full flex items-center px-4 md:px-8 border-l border-white/10 shadow-[-10px_0_20px_-10px_rgba(0,0,0,0.8)] gap-4">
        <div className="hidden lg:flex items-center gap-1 text-xs text-gray-500">
          <Clock size={12} />
          <span>Updated 2 mins ago</span>
        </div>
        <Link href="/rates" className="text-accent-cyan hover:text-white text-sm font-semibold transition-colors flex items-center gap-1">
          <span className="hidden sm:inline">See All</span> <span className="sm:hidden">All</span> &rarr;
        </Link>
      </div>
    </div>
  );
}
