"use client";

import { Mail, Lock, Check, Building2, Home, Briefcase, Wrench, PackageSearch } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useAuthStore } from "@/store/useAuthStore";
import type { UserRole } from "@/types";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const login = useAuthStore((state) => state.login);

  const roles: Array<{ id: string; label: UserRole; icon: React.ReactNode }> = [
    { id: "homeowner", label: "Homeowner", icon: <Home size={24} /> },
    { id: "architect", label: "Architect", icon: <Building2 size={24} /> },
    { id: "builder", label: "Builder", icon: <Briefcase size={24} /> },
    { id: "dealer", label: "Dealer", icon: <PackageSearch size={24} /> },
    { id: "installer", label: "Installer", icon: <Wrench size={24} /> },
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      email: email,
      role: roles.find((r) => r.id === role)?.label || "User",
      name: email.split("@")[0] || "User",
    });
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-primary-dark relative overflow-hidden">
      <div className="w-full max-w-xl bg-[#11141e] border border-white/10 rounded-2xl p-8 relative z-10 shadow-2xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    step > i
                      ? "bg-success text-white"
                      : step === i
                        ? "bg-accent-cyan text-primary-dark"
                        : "bg-gray-800 text-gray-500"
                  }`}
                >
                  {step > i ? <Check size={14} /> : i}
                </div>
              </div>
            ))}
          </div>
          <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-cyan transition-all duration-500 ease-out"
              style={{ width: `${((step - 1) / 1) * 100}%` }}
            ></div>
          </div>
        </div>

        {step === 1 && (
          <form onSubmit={handleNext}>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-poppins font-bold text-white mb-2">Create Account</h1>
              <p className="text-gray-400 text-sm">Join the Glass121 marketplace today.</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="space-y-1">
                <label className="text-sm text-gray-400 font-inter">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-primary-dark border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-accent-cyan outline-none"
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
                    className="w-full bg-primary-dark border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-accent-cyan outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-accent-cyan hover:bg-[#00bfe6] text-primary-dark font-bold py-3 rounded-lg transition-colors"
            >
              Continue
            </button>
            <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-accent-cyan hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleComplete}>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-poppins font-bold text-white mb-2">What&apos;s your primary role?</h1>
              <p className="text-gray-400 text-sm">This helps us customize your experience.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {roles.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                    role === r.id
                      ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan shadow-[0_0_15px_rgba(0,217,255,0.2)]"
                      : "border-white/10 text-gray-400 hover:border-white/30 hover:text-gray-200"
                  }`}
                >
                  {r.icon}
                  <span className="text-sm font-semibold">{r.label}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!role}
                className="flex-1 bg-accent-cyan hover:bg-[#00bfe6] text-primary-dark font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                Complete Sign Up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

