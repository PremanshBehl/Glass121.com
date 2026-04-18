"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  const delays = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => {
        // deterministic "random" delay derived from index
        const seed = (i * 9301 + 49297) % 233280;
        return (seed / 233280) * 2;
      }),
    []
  );

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary-dark">
      {/* Background glass grid effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 grid-rows-6 gap-1 opacity-20">
          {Array.from({ length: 48 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-white/5 border border-white/10 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delays[i] ?? 0, duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              whileHover={{ backgroundColor: "rgba(0, 217, 255, 0.2)", borderColor: "rgba(0, 217, 255, 0.5)" }}
            />
          ))}
        </div>
        {/* Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-gold/10 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-white mb-6 tracking-tight leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Transparency in Glass, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-blue-400">
            Built for the Industry
          </span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-gray-300 font-inter max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          The first B2B2C marketplace connecting manufacturers, dealers, architects, and installers in the $150B+ global glass industry.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            href="/search"
            className="w-full sm:w-auto px-8 py-4 bg-accent-cyan hover:bg-[#00bfe6] text-primary-dark font-poppins font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Search Glass with AI
          </Link>
          <Link 
            href="/products"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-accent-cyan text-white hover:bg-accent-cyan hover:text-primary-dark font-poppins font-bold rounded-lg transition-all duration-200"
          >
            Explore Catalog
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
