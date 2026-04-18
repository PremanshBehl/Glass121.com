"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#11141e] to-primary-dark border-t border-white/5 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">
            Ready to Transform Glass Buying?
          </h2>
          <p className="text-xl text-gray-400 font-inter mb-10">
            Join thousands of professionals already saving time and money on Glass121.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-accent-cyan hover:bg-[#00bfe6] text-primary-dark font-poppins font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/demo"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/20 text-white hover:bg-white/10 font-poppins font-bold rounded-lg transition-all duration-200"
            >
              Schedule Demo
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 font-inter mt-6">
            No credit card required. Takes 2 minutes to join.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
