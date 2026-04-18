"use client";

import { useState } from "react";
import { User, FileText, Heart, ShoppingBag, CreditCard, MapPin, Bell, Settings, LogOut, Package, Zap, X, ShoppingCart, Check } from "lucide-react";
import Link from "next/link";

import { useAuthStore } from "@/store/useAuthStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  const { user, logout } = useAuthStore();
  const { orders, quotes } = useOrderStore();
  const { items: savedItems, removeItem: removeWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const [notificationsVisible, setNotificationsVisible] = useState(true);
  const [addressVisible, setAddressVisible] = useState(true);

  const handleMockAction = (actionName: string) => {
    console.log(`"${actionName}" action triggered! This feature is simulated in the prototype.`);
  };

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center" suppressHydrationWarning>
        <h1 className="text-3xl font-poppins font-bold text-white mb-4">Sign in to view your dashboard</h1>
        <p className="text-gray-400 mb-8">Your orders, quotes, and saved items live here.</p>
        <Link
          href="/login"
          className="inline-flex bg-accent-cyan text-primary-dark font-bold px-8 py-3 rounded-lg hover:bg-[#00bfe6] transition-colors"
        >
          Go to Login
        </Link>
      </div>
    );
  }
  
  const sidebarNav = [
    { id: "overview", label: "Overview", icon: <User size={18} /> },
    { id: "orders", label: "My Orders", icon: <Package size={18} /> },
    { id: "saved", label: "Saved Items", icon: <Heart size={18} /> },
    { id: "quotes", label: "Quotes & Estimates", icon: <FileText size={18} /> },
    { id: "vendors", label: "My Vendors", icon: <ShoppingBag size={18} /> },
    { id: "payment", label: "Payment Methods", icon: <CreditCard size={18} /> },
    { id: "address", label: "Addresses", icon: <MapPin size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col md:flex-row gap-8">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0">
        <div className="bg-[#11141e] border border-white/10 rounded-2xl p-6 sticky top-24">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
            <div className="w-12 h-12 rounded-full bg-accent-cyan/20 text-accent-cyan flex items-center justify-center font-bold text-xl font-poppins uppercase">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <h2 className="text-white font-bold font-poppins truncate">{user.name}</h2>
              <p className="text-xs text-gray-400 truncate">{user.role}</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            {sidebarNav.map(nav => (
              <button
                key={nav.id}
                onClick={() => setActiveTab(nav.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-semibold ${
                  activeTab === nav.id 
                  ? 'bg-accent-cyan/10 text-accent-cyan' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {nav.icon}
                {nav.label}
              </button>
            ))}
            
            <div className="pt-6 mt-6 border-t border-white/5">
              <button 
                onClick={() => {
                  logout();
                  window.location.href = '/login';
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-semibold text-danger hover:bg-danger/10"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-poppins font-bold text-white mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-400 font-inter">Here&apos;s an overview of your account activity.</p>
        </div>

        {activeTab === "overview" && (
          <>
            {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#11141e] border border-white/10 hover:border-accent-cyan rounded-xl p-5 flex items-center gap-4 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-accent-cyan transition-colors">
              <Package size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Orders</p>
              <p className="text-2xl font-mono font-bold text-accent-gold">{orders.length}</p>
            </div>
          </div>
          <div className="bg-[#11141e] border border-white/10 hover:border-accent-cyan rounded-xl p-5 flex items-center gap-4 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-accent-cyan transition-colors">
              <Heart size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Saved Items</p>
              <p className="text-2xl font-mono font-bold text-accent-gold">{savedItems.length}</p>
            </div>
          </div>
          <div className="bg-[#11141e] border border-white/10 hover:border-accent-cyan rounded-xl p-5 flex items-center gap-4 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-accent-cyan transition-colors">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Quotes</p>
              <p className="text-2xl font-mono font-bold text-accent-gold">{quotes.length}</p>
            </div>
          </div>
          <div className="bg-[#11141e] border border-white/10 hover:border-accent-cyan rounded-xl p-5 flex items-center gap-4 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-accent-cyan transition-colors">
              <CreditCard size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Credits</p>
              <p className="text-2xl font-mono font-bold text-accent-gold">₹0</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Active Orders */}
          <div className="bg-[#11141e] border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-poppins font-bold text-white">Active Orders</h2>
              <button onClick={() => handleMockAction("View All Orders")} className="text-sm text-accent-cyan hover:underline font-semibold">View All</button>
            </div>
            
            <div className="space-y-4">
              {orders.slice(0, 2).map((order) => (
                <div key={order.id} className="border border-white/5 bg-primary-dark rounded-xl p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs text-gray-500 font-mono block mb-1">#{order.id} • {order.date}</span>
                      <h3 className="font-bold text-white">{order.items[0]?.name} {order.items.length > 1 ? `+ ${order.items.length - 1} items` : ''}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-mono font-bold text-accent-gold">₹{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 border ${
                      order.status === 'Delivered' ? 'bg-success/10 text-success border-success/20' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }`}>
                      {order.status === 'Delivered' ? <Check size={12} /> : <Zap size={12} />} {order.status}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 text-sm">
                    {order.status !== 'Delivered' && (
                      <button onClick={() => handleMockAction("Track Order")} className="px-4 py-2 bg-white/5 text-white rounded hover:bg-white/10 transition-colors">Track</button>
                    )}
                    <button onClick={() => handleMockAction("View Details")} className="px-4 py-2 bg-transparent border border-white/10 text-gray-300 rounded hover:text-white transition-colors">Details</button>
                    {order.status === 'Delivered' && (
                      <button onClick={() => handleMockAction("Reorder Item")} className="px-4 py-2 text-accent-cyan hover:bg-accent-cyan/10 rounded transition-colors">Reorder</button>
                    )}
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="py-8 text-center text-gray-500 border border-dashed border-white/10 rounded-xl">No active orders found.</div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            {/* Recent Quotes */}
            <div className="bg-[#11141e] border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-poppins font-bold text-white">Recent Quotes</h2>
                <button onClick={() => handleMockAction("View All Quotes")} className="text-sm text-accent-cyan hover:underline font-semibold">View All</button>
              </div>
              
              <div className="space-y-4">
                <div className="border border-white/5 bg-primary-dark rounded-xl p-4 flex justify-between items-center group hover:border-white/20 transition-colors">
                  <div>
                    <span className="text-xs text-gray-500 font-mono block mb-1">#QT-2026-341 • 3 days ago</span>
                    <h3 className="font-semibold text-white">10mm Laminated Glass</h3>
                    <p className="text-sm text-accent-gold font-mono font-bold">~₹2,500</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleMockAction("Convert Quote to Order")} className="p-2 bg-accent-cyan/10 text-accent-cyan rounded hover:bg-accent-cyan hover:text-primary-dark transition-colors" title="Convert to Order">
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Saved Items Snippet */}
            <div className="bg-[#11141e] border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-poppins font-bold text-white">Saved Items</h2>
                <span className="text-sm text-gray-500">12 items</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {savedItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="aspect-square bg-white/5 rounded-lg border border-white/10 relative group overflow-hidden cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <p className="text-xs text-white truncate w-full">{item.name}</p>
                    </div>
                    <button onClick={() => removeWishlist(item.id)} className="absolute top-1 right-1 w-6 h-6 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white hover:text-danger opacity-0 group-hover:opacity-100 transition-all">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
              
              <Link href="/saved" className="block text-center mt-4 text-sm text-gray-400 hover:text-white transition-colors">
                View all saved items
              </Link>
            </div>
          </div>
        </div>
        </>
        )}

        {activeTab === "orders" && (
          <div className="bg-[#11141e] border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-poppins font-bold text-white">My Orders</h2>
              <button onClick={() => handleMockAction("Filter Orders")} className="px-4 py-2 bg-accent-cyan/10 text-accent-cyan rounded text-sm font-semibold hover:bg-accent-cyan/20 transition-colors">Filter</button>
            </div>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-white/5 bg-primary-dark rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="text-xs text-gray-500 font-mono block mb-1">#{order.id} • {order.date}</span>
                    <h3 className="font-bold text-white text-lg">{order.items[0]?.name} {order.items.length > 1 ? `+ ${order.items.length - 1} items` : ''}</h3>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 border ${
                      order.status === 'Delivered' ? 'bg-success/10 text-success border-success/20' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }`}>
                    {order.status === 'Delivered' ? <Check size={14} /> : <Zap size={14} />} {order.status}
                  </span>
                  <div className="flex flex-col items-start md:items-end gap-2 mt-2 md:mt-0">
                    <span className="text-xl font-mono font-bold text-accent-gold">₹{order.total.toLocaleString()}</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleMockAction("Track Order")} className="px-4 py-2 bg-white/5 text-white rounded text-sm hover:bg-white/10 transition-colors">Track</button>
                      <button onClick={() => handleMockAction("Download Invoice")} className="px-4 py-2 bg-accent-cyan text-primary-dark font-bold rounded text-sm hover:bg-[#00bfe6] transition-colors">Invoice</button>
                    </div>
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="py-12 text-center text-gray-500 border border-dashed border-white/10 rounded-xl">No orders found.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === "saved" && (
          <div className="bg-[#11141e] border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-poppins font-bold text-white mb-6">Saved Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedItems.length === 0 ? (
                <div className="col-span-full py-8 text-center text-gray-500 border border-dashed border-white/10 rounded-xl">No saved items found.</div>
              ) : savedItems.map((item) => (
                <div key={item.id} className="bg-primary-dark border border-white/10 rounded-xl p-4 relative group">
                  <div className="aspect-video bg-white/5 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                    <Heart size={24} className="opacity-50" />
                  </div>
                  <h3 className="font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">Saved from Catalog</p>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-accent-gold font-bold">₹{item.price}/sq.ft</span>
                    <button onClick={() => {
                      addToCart({ id: item.id, name: item.name, price: item.price, quantity: 1 });
                      handleMockAction(`Added ${item.name} to cart`);
                    }} className="px-3 py-1.5 bg-accent-cyan/10 text-accent-cyan rounded text-sm font-semibold hover:bg-accent-cyan/20 transition-colors">Add to Cart</button>
                  </div>
                  <button onClick={() => removeWishlist(item.id)} className="absolute top-6 right-6 w-8 h-8 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white hover:text-danger opacity-0 group-hover:opacity-100 transition-all">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "quotes" && (
          <div className="bg-[#11141e] border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-poppins font-bold text-white mb-6">Quotes & Estimates</h2>
            <div className="space-y-4">
              {quotes.map(quote => (
                <div key={quote.id} className={`border border-white/5 bg-primary-dark rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/20 transition-colors ${quote.status === 'Expired' ? 'opacity-75' : ''}`}>
                  <div>
                    <span className="text-xs text-gray-500 font-mono block mb-1">#{quote.id} • {quote.date}</span>
                    <h3 className="font-bold text-white text-lg">{quote.productName}</h3>
                    <p className="text-sm text-gray-400 mt-1">{quote.details}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2 mt-2 md:mt-0">
                    <span className={`text-xl font-mono font-bold ${quote.status === 'Expired' ? 'text-gray-500 line-through' : 'text-accent-gold'}`}>~₹{quote.amount.toLocaleString()}</span>
                    {quote.status === 'Active' ? (
                      <button onClick={() => {
                        addToCart({ id: `quote-${quote.id}`, name: quote.productName, price: quote.amount, quantity: 1 });
                        window.location.href = "/cart";
                      }} className="px-4 py-2 bg-accent-cyan hover:bg-[#00bfe6] text-primary-dark font-bold rounded text-sm transition-colors flex items-center gap-2">
                        <ShoppingCart size={16} /> Convert to Order
                      </button>
                    ) : (
                      <button onClick={() => handleMockAction("Recalculate Expired Quote")} className="px-4 py-2 border border-white/20 text-white rounded text-sm transition-colors hover:bg-white/5">
                        Recalculate
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {quotes.length === 0 && (
                <div className="py-12 text-center text-gray-500 border border-dashed border-white/10 rounded-xl">No quotes found.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === "vendors" && (
          <div className="bg-[#11141e] border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-poppins font-bold text-white mb-6">My Vendors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-white/5 bg-primary-dark rounded-xl p-6 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center font-bold text-xl text-white">SG</div>
                  <div>
                    <h3 className="font-bold text-white text-lg">SafeGlass Pro</h3>
                    <p className="text-sm text-gray-400">Premium Safety Glass</p>
                  </div>
                </div>
                <div className="flex gap-4 mb-6">
                  <div className="text-sm"><span className="text-accent-gold font-bold text-lg">4.8</span><span className="text-gray-500 ml-1">Rating</span></div>
                  <div className="text-sm"><span className="text-white font-bold text-lg">15</span><span className="text-gray-500 ml-1">Orders</span></div>
                </div>
                <div className="mt-auto flex gap-2">
                  <button onClick={() => window.location.href = "/vendors"} className="flex-1 px-4 py-2 bg-white/5 text-white rounded text-sm hover:bg-white/10 transition-colors">View Profile</button>
                  <button onClick={() => handleMockAction("Contact Vendor")} className="flex-1 px-4 py-2 bg-accent-cyan/10 text-accent-cyan rounded text-sm font-semibold hover:bg-accent-cyan/20 transition-colors">Contact</button>
                </div>
              </div>
              <div className="border border-white/5 bg-primary-dark rounded-xl p-6 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center font-bold text-xl text-white">AG</div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Glass121 Official</h3>
                    <p className="text-sm text-gray-400">Direct Manufacturer</p>
                  </div>
                </div>
                <div className="flex gap-4 mb-6">
                  <div className="text-sm"><span className="text-accent-gold font-bold text-lg">4.9</span><span className="text-gray-500 ml-1">Rating</span></div>
                  <div className="text-sm"><span className="text-white font-bold text-lg">42</span><span className="text-gray-500 ml-1">Orders</span></div>
                </div>
                <div className="mt-auto flex gap-2">
                  <button onClick={() => window.location.href = "/vendors"} className="flex-1 px-4 py-2 bg-white/5 text-white rounded text-sm hover:bg-white/10 transition-colors">View Profile</button>
                  <button onClick={() => handleMockAction("Contact Vendor")} className="flex-1 px-4 py-2 bg-accent-cyan/10 text-accent-cyan rounded text-sm font-semibold hover:bg-accent-cyan/20 transition-colors">Contact</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="bg-[#11141e] border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-poppins font-bold text-white">Payment Methods</h2>
              <button onClick={() => handleMockAction("Add New Payment Method")} className="px-4 py-2 bg-accent-cyan text-primary-dark rounded text-sm font-bold hover:bg-[#00bfe6] transition-colors">+ Add New</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-accent-cyan/50 bg-accent-cyan/5 rounded-xl p-6 relative overflow-hidden group hover:border-accent-cyan transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan/10 rounded-bl-full"></div>
                <CreditCard className="text-accent-cyan mb-4 w-8 h-8" />
                <h3 className="font-mono text-white text-lg mb-1 tracking-widest">•••• •••• •••• 4242</h3>
                <p className="text-sm text-gray-400 mb-4 font-mono">Expires 12/28</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-accent-cyan bg-accent-cyan/20 px-2 py-1 rounded">DEFAULT</span>
                  <button onClick={() => handleMockAction("Edit Payment Method")} className="text-xs text-gray-400 hover:text-white transition-colors">Edit</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "address" && (
          <div className="bg-[#11141e] border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-poppins font-bold text-white">Saved Addresses</h2>
              <button onClick={() => handleMockAction("Add New Address")} className="px-4 py-2 bg-accent-cyan text-primary-dark rounded text-sm font-bold hover:bg-[#00bfe6] transition-colors">+ Add Address</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addressVisible && (
                <div className="border border-white/10 bg-primary-dark rounded-xl p-6 hover:border-white/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white flex items-center gap-2"><MapPin size={16} className="text-accent-cyan"/> Main Site / Office</h3>
                    <span className="text-xs font-bold text-accent-cyan bg-accent-cyan/20 px-2 py-1 rounded">DEFAULT</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 mt-4">
                    123 Business Avenue, Suite 400<br/>
                    Mumbai, Maharashtra 400001<br/>
                    India
                  </p>
                  <div className="flex gap-4 border-t border-white/5 pt-4 mt-auto">
                    <button onClick={() => handleMockAction("Edit Address")} className="text-sm text-gray-400 hover:text-white transition-colors">Edit</button>
                    <button onClick={() => setAddressVisible(false)} className="text-sm text-danger hover:text-red-400 transition-colors">Delete</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="bg-[#11141e] border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-poppins font-bold text-white">Notifications</h2>
              <button onClick={() => setNotificationsVisible(false)} className="text-sm text-gray-400 hover:text-white transition-colors">Mark all as read</button>
            </div>
            <div className="space-y-3">
              {!notificationsVisible ? (
                <div className="py-8 text-center text-gray-500">No new notifications.</div>
              ) : (
                <>
              <div className="p-4 border border-white/5 bg-primary-dark rounded-xl flex gap-4 items-start relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-cyan"></div>
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Package size={18} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Order Shipped</h4>
                  <p className="text-sm text-gray-400 mb-2">Your order #AMG-2026-4521 has been shipped and is out for delivery.</p>
                  <span className="text-xs text-gray-500 font-mono">2 hours ago</span>
                </div>
              </div>
              <div className="p-4 border border-white/5 bg-primary-dark rounded-xl flex gap-4 items-start opacity-75">
                <div className="w-10 h-10 rounded-full bg-accent-gold/20 text-accent-gold flex items-center justify-center shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">New Quote Available</h4>
                  <p className="text-sm text-gray-400 mb-2">Vendor SafeGlass Pro has responded to your quote request.</p>
                  <span className="text-xs text-gray-500 font-mono">Yesterday</span>
                </div>
              </div>
              </>
              )}
            </div>
          </div>
        )}
        {activeTab === "settings" && (
          <div className="bg-[#11141e] border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-poppins font-bold text-white mb-6">Account Settings</h2>
            
            <form className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                  <input type="text" defaultValue={user.name} className="w-full bg-primary-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-cyan outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                  <input type="email" defaultValue={user.email} className="w-full bg-primary-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-cyan outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Role / Title</label>
                  <input type="text" defaultValue={user.role} className="w-full bg-primary-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-cyan outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" className="w-full bg-primary-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-cyan outline-none transition-colors" />
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/5">
                <h3 className="text-lg font-bold text-white mb-4">Email Preferences</h3>
                <label className="flex items-center gap-3 mb-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-accent-cyan cursor-pointer" />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Order updates and shipping tracking</span>
                </label>
                <label className="flex items-center gap-3 mb-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-accent-cyan cursor-pointer" />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">New quotes from vendors</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 accent-accent-cyan cursor-pointer" />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Promotional offers and glass rate alerts</span>
                </label>
              </div>

              <div className="pt-6 flex gap-4">
                <button type="button" onClick={() => handleMockAction("Save Settings")} className="px-6 py-3 bg-accent-cyan hover:bg-[#00bfe6] text-primary-dark font-bold rounded-lg transition-colors">Save Changes</button>
                <button type="button" onClick={() => handleMockAction("Cancel Changes")} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg transition-colors">Cancel</button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
