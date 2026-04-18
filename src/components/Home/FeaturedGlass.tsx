"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const glassTypes = [
  { name: "Clear Float", desc: "Standard transparent glass for everyday use.", thickness: "3-19mm", color: "from-blue-500/20" },
  { name: "Toughened", desc: "Safety glass, up to 5x stronger than standard.", thickness: "4-19mm", color: "from-red-500/20" },
  { name: "Laminated", desc: "Shatter-proof glass holding together on impact.", thickness: "6-21mm", color: "from-green-500/20" },
  { name: "DGU (Double Glazed)", desc: "Insulated glass for superior energy efficiency.", thickness: "18-32mm", color: "from-yellow-500/20" },
  { name: "Frosted", desc: "Translucent glass for privacy and diffused light.", thickness: "4-12mm", color: "from-purple-500/20" },
  { name: "Low-E", desc: "Coated glass that reflects heat, saving energy.", thickness: "4-12mm", color: "from-cyan-500/20" },
];

export default function FeaturedGlass() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-primary-dark overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">Explore Glass Types</h2>
        <div className="flex justify-between items-end">
          <p className="text-gray-400 font-inter max-w-2xl">Discover the perfect material for your specific requirements.</p>
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
              className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition"
            >
              &larr;
            </button>
            <button 
              onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
              className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 px-4 pb-10 hide-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Spacer for container alignment */}
        <div className="min-w-[max(0px,calc((100vw-1536px)/2))] md:min-w-[max(0px,calc((100vw-1280px)/2))] lg:min-w-[max(0px,calc((100vw-1024px)/2))] shrink-0" />
        
        {glassTypes.map((glass, idx) => (
          <motion.div
            key={idx}
            className="shrink-0 w-64 md:w-80 h-96 bg-[#1a1f2e] rounded-2xl relative overflow-hidden group snap-center border border-white/10"
            whileHover="hover"
            initial="rest"
          >
            {/* Background Image Placeholder / Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${glass.color} to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300`} />
            
            {/* Glass effect panel inside */}
            <div className="absolute top-4 left-4 right-4 bottom-32 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md transition-transform duration-300 group-hover:scale-[1.02]" />

            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent flex flex-col justify-end p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-poppins font-bold text-white group-hover:text-accent-cyan transition-colors">{glass.name}</h3>
                <span className="bg-white/10 px-2 py-1 rounded text-xs font-mono text-accent-gold">{glass.thickness}</span>
              </div>
              
              <motion.div 
                variants={{
                  rest: { height: 0, opacity: 0 },
                  hover: { height: "auto", opacity: 1 }
                }}
                className="overflow-hidden"
              >
                <p className="text-sm text-gray-300 font-inter mb-4 mt-2">{glass.desc}</p>
                <button className="text-sm font-bold text-accent-cyan hover:text-white transition-colors">
                  View Specs &rarr;
                </button>
              </motion.div>
            </div>
            
            {/* Glowing border effect */}
            <motion.div 
              className="absolute inset-0 border-2 border-accent-cyan/0 rounded-2xl pointer-events-none"
              variants={{
                rest: { borderColor: "rgba(0, 217, 255, 0)" },
                hover: { borderColor: "rgba(0, 217, 255, 0.5)", boxShadow: "0 0 20px rgba(0, 217, 255, 0.2) inset" }
              }}
            />
          </motion.div>
        ))}
        
        {/* Trailing spacer */}
        <div className="min-w-[max(0px,calc((100vw-1536px)/2))] md:min-w-[max(0px,calc((100vw-1280px)/2))] lg:min-w-[max(0px,calc((100vw-1024px)/2))] shrink-0" />
      </div>
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
