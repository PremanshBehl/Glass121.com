"use client";

import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Users, Activity, Target, ShieldCheck } from "lucide-react";

const features = [
  { icon: <CheckCircle2 className="w-8 h-8 text-accent-cyan" />, title: "$150B Industry, Zero Transparency", desc: "We're bringing clear pricing and specs." },
  { icon: <Users className="w-8 h-8 text-accent-cyan" />, title: "604+ B2B Players", desc: "A unified platform for all stakeholders." },
  { icon: <TrendingUp className="w-8 h-8 text-accent-cyan" />, title: "Daily Rates Updated in Real-Time", desc: "Make informed buying decisions." },
  { icon: <Activity className="w-8 h-8 text-accent-cyan" />, title: "52 Customer Types, One Solution", desc: "Built for architects, builders, and homeowners." },
  { icon: <Target className="w-8 h-8 text-accent-cyan" />, title: "AI Matching", desc: "Find the exact glass for your requirement." },
  { icon: <ShieldCheck className="w-8 h-8 text-accent-cyan" />, title: "Verified Partners", desc: "Trusted installers and service providers." },
];

export default function TrustSection() {
  return (
    <section className="py-20 bg-[#11141e] border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">Why Glass121?</h2>
          <div className="w-24 h-1 bg-accent-cyan mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0, 217, 255, 0.1)" }}
              className="bg-primary-dark p-8 rounded-xl border border-white/10 hover:border-accent-cyan/30 transition-all duration-300"
            >
              <div className="bg-[#11141e] w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-inner shadow-black/50">
                {feature.icon}
              </div>
              <h3 className="text-xl font-poppins font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 font-inter">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
