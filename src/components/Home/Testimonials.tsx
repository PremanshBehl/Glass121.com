"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Glass121 saved us 30% on our facade project by showing daily rate trends. The platform's transparency is a game-changer for the industry.",
    author: "Rajesh Kumar",
    role: "Lead Architect",
    location: "Mumbai",
    rating: 5,
    initials: "RK",
    color: "bg-blue-600"
  },
  {
    id: 2,
    quote: "Finding the right toughened glass for custom shower enclosures used to take days of phone calls. Now it takes 5 minutes.",
    author: "Priya Patel",
    role: "Interior Designer",
    location: "Bangalore",
    rating: 5,
    initials: "PP",
    color: "bg-emerald-600"
  },
  {
    id: 3,
    quote: "As a dealer, the real-time pricing dashboard helps me adjust my margins dynamically. I've grown my business by 40% since joining.",
    author: "Amit Singh",
    role: "Glass Dealer",
    location: "Delhi",
    rating: 4,
    initials: "AS",
    color: "bg-purple-600"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-primary-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">Trusted by the Industry</h2>
          <div className="w-24 h-1 bg-accent-gold mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto relative h-[300px] md:h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-2xl"
            >
              <Quote className="w-16 h-16 text-accent-gold/20 shrink-0 absolute top-6 left-6" />
              
              <div className="flex-grow z-10 text-center md:text-left mt-4 md:mt-0">
                <div className="flex justify-center md:justify-start gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? 'text-accent-gold fill-accent-gold' : 'text-gray-600'}`} 
                    />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl font-playfair italic text-white mb-8 leading-relaxed">
                  &quot;{testimonials[currentIndex].quote}&quot;
                </p>
                
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${testimonials[currentIndex].color}`}>
                    {testimonials[currentIndex].initials}
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-poppins font-semibold">{testimonials[currentIndex].author}</h4>
                    <p className="text-gray-400 text-sm font-inter">
                      {testimonials[currentIndex].role}, {testimonials[currentIndex].location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-10 gap-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-accent-gold w-8" : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
