"use client";

import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      email: email,
      role: "Homeowner",
      name: email.split("@")[0] || "User",
    });
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-primary-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-accent-cyan/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent-gold/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md bg-[#11141e] border border-white/10 rounded-2xl p-8 relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl font-poppins font-bold text-white mb-2">
            <span className="text-accent-cyan">Glass</span>121
          </Link>
          <p className="text-gray-400 font-inter text-sm">Glass Marketplace Platform</p>
        </div>

        <h1 className="text-2xl font-poppins font-bold text-white mb-6">Sign In</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-400 font-inter">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-primary-dark border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-accent-cyan focus:shadow-[0_0_10px_rgba(0,217,255,0.2)] outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-400 font-inter">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-primary-dark border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-accent-cyan focus:shadow-[0_0_10px_rgba(0,217,255,0.2)] outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex justify-between items-center py-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-4 h-4 rounded border border-white/20 group-hover:border-accent-cyan flex items-center justify-center transition-colors bg-white/5"></div>
              <span className="text-sm text-gray-400">Remember Me</span>
            </label>
            <Link href="#" className="text-sm text-accent-cyan hover:underline transition-all">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-accent-cyan hover:bg-[#00bfe6] text-primary-dark font-bold py-3 rounded-lg transition-all flex justify-center items-center gap-2 mt-4"
          >
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-gray-400 mb-4">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-accent-cyan font-semibold hover:underline">
              Sign Up Here
            </Link>
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg py-2 text-sm font-semibold transition-colors flex justify-center items-center gap-2">
              Google
            </button>
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg py-2 text-sm font-semibold transition-colors flex justify-center items-center gap-2">
              LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

