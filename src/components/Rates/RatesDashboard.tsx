"use client";

import { useState } from "react";
import { Clock, Filter, Bell, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const sparklineData1 = [{ value: 45 }, { value: 48 }, { value: 46 }, { value: 50 }, { value: 52 }, { value: 55 }, { value: 52 }];
const sparklineData2 = [{ value: 160 }, { value: 155 }, { value: 150 }, { value: 145 }, { value: 148 }, { value: 140 }, { value: 142 }];

const historicalData = Array.from({ length: 30 }).map((_, i) => ({
  date: `Apr ${i + 1}`,
  price: Math.floor(Math.random() * (60 - 45 + 1)) + 45,
}));

export default function RatesDashboard() {
  const [activeRegion, setActiveRegion] = useState("All Regions");
  
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-poppins font-bold text-white mb-2">Daily Glass Rates</h1>
          <div className="flex items-center gap-4 text-sm font-inter">
            <span className="text-gray-400 flex items-center gap-1"><Clock size={14} /> Updated: Today 3:45 PM</span>
            <span className="text-accent-cyan flex items-center gap-1 font-semibold">Next Update: 14:20</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {["All Regions", "North India", "West", "South", "East"].map(region => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeRegion === region 
                ? 'bg-accent-cyan text-primary-dark' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Current Rates */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-poppins font-bold text-white mb-4">Current Rates</h2>
          
          {/* Rate Card 1 */}
          <div className="bg-[#11141e] border border-white/5 hover:border-l-4 hover:border-l-accent-cyan rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 group transition-all shadow-lg cursor-pointer hover:bg-[#151925]">
            <div className="flex-1 w-full">
              <h3 className="text-lg font-poppins font-bold text-white mb-1">Clear Float (5mm)</h3>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-2xl font-mono font-bold text-accent-gold">₹45 - ₹60 <span className="text-sm font-inter text-gray-500 font-normal">/sq.ft</span></span>
                <span className="flex items-center text-success text-sm font-bold bg-success/10 px-2 py-0.5 rounded"><TrendingUp size={14} className="mr-1" /> +2%</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 font-inter">
                <span>Vendors: 15</span>
                <span>Last Updated: 3:45 PM</span>
              </div>
            </div>
            <div className="w-full md:w-48 h-16 opacity-50 group-hover:opacity-100 transition-opacity">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData1}>
                  <Line type="monotone" dataKey="value" stroke="#00d9ff" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rate Card 2 */}
          <div className="bg-[#11141e] border border-white/5 hover:border-l-4 hover:border-l-accent-cyan rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 group transition-all shadow-lg cursor-pointer hover:bg-[#151925]">
            <div className="flex-1 w-full">
              <h3 className="text-lg font-poppins font-bold text-white mb-1">Toughened (8mm)</h3>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-2xl font-mono font-bold text-accent-gold">₹120 - ₹160 <span className="text-sm font-inter text-gray-500 font-normal">/sq.ft</span></span>
                <span className="flex items-center text-danger text-sm font-bold bg-danger/10 px-2 py-0.5 rounded"><TrendingDown size={14} className="mr-1" /> -0.5%</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 font-inter">
                <span>Vendors: 12</span>
                <span>Last Updated: 3:30 PM</span>
              </div>
            </div>
            <div className="w-full md:w-48 h-16 opacity-50 group-hover:opacity-100 transition-opacity">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData2}>
                  <Line type="monotone" dataKey="value" stroke="#e63946" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Rate Card 3 */}
          <div className="bg-[#11141e] border border-white/5 hover:border-l-4 hover:border-l-accent-cyan rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 group transition-all shadow-lg cursor-pointer hover:bg-[#151925]">
            <div className="flex-1 w-full">
              <h3 className="text-lg font-poppins font-bold text-white mb-1">Laminated (10mm)</h3>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-2xl font-mono font-bold text-accent-gold">₹180 - ₹250 <span className="text-sm font-inter text-gray-500 font-normal">/sq.ft</span></span>
                <span className="flex items-center text-gray-400 text-sm font-bold bg-white/5 px-2 py-0.5 rounded"><Minus size={14} className="mr-1" /> 0%</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 font-inter">
                <span>Vendors: 8</span>
                <span>Last Updated: 2:15 PM</span>
              </div>
            </div>
            <div className="w-full md:w-48 h-16 opacity-50 group-hover:opacity-100 transition-opacity">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData1}>
                  <Line type="monotone" dataKey="value" stroke="#6b7280" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Historical Trends */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-poppins font-bold text-white">Historical Trends (30-day)</h2>
              <select className="bg-[#11141e] border border-white/10 text-white text-sm rounded-lg px-4 py-2 outline-none focus:border-accent-cyan">
                <option>Clear Float (5mm)</option>
                <option>Toughened (8mm)</option>
                <option>Laminated (10mm)</option>
              </select>
            </div>
            
            <div className="bg-[#11141e] border border-white/5 rounded-xl p-6">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00d9ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#4b5563" fontSize={12} tickMargin={10} minTickGap={30} />
                    <YAxis stroke="#4b5563" fontSize={12} tickFormatter={(val) => `₹${val}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      itemStyle={{ color: '#00d9ff', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="price" stroke="#00d9ff" fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-between mt-6 text-sm font-mono border-t border-white/10 pt-4">
                <div className="text-gray-400">Min: <span className="text-white">₹45 (Apr 1)</span></div>
                <div className="text-gray-400">Current: <span className="text-accent-cyan">₹52 (avg)</span></div>
                <div className="text-gray-400">Max: <span className="text-white">₹60 (Apr 15)</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Price Alerts */}
        <div className="lg:col-span-1">
          <div className="bg-[#11141e] border border-white/5 rounded-xl p-6 sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-poppins font-bold text-white flex items-center gap-2">
                <Bell size={20} className="text-accent-gold" />
                Price Alerts
              </h2>
              <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">2 Active</span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-primary-dark border border-white/10 rounded-lg p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-success/10 rounded-bl-full pointer-events-none"></div>
                <p className="text-sm text-gray-300 font-inter mb-2">Clear Float falls below ₹50</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded">TRIGGERED 2hrs ago</span>
                  <button className="text-gray-500 hover:text-white transition-colors text-xs">Dismiss</button>
                </div>
              </div>

              <div className="bg-primary-dark border border-white/10 rounded-lg p-4">
                <p className="text-sm text-gray-300 font-inter mb-2">Toughened (8mm) above ₹150</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-400 bg-white/5 px-2 py-1 rounded flex items-center gap-1"><div className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-pulse"></div> WATCHING</span>
                  <div className="flex gap-2">
                    <button className="text-gray-500 hover:text-white transition-colors text-xs">Edit</button>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full bg-transparent border border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10 transition-colors font-bold py-3 rounded-lg text-sm flex justify-center items-center gap-2">
              <Bell size={16} /> Set New Alert
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
