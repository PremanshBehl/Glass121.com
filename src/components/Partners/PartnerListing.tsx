"use client";

import { useState } from "react";
import { Search, MapPin, Star, ShieldCheck, Map, List as ListIcon, Phone, MessageSquare, Calendar, X } from "lucide-react";
import { useOrderStore } from "@/store/useOrderStore";
type Partner = {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  verified: boolean;
  services: string[];
  location: string;
  distance: string;
  response: string;
  image: string;
};

export default function PartnerListing() {
  const [view, setView] = useState<'list'|'map'>('list');
  const [activeFilter, setActiveFilter] = useState('All Services');
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [contactMessage, setContactMessage] = useState('');
  
  const { addOrder } = useOrderStore();

  const partners: Partner[] = [
    {
      id: 1,
      name: "Rajesh Installation Services",
      rating: 4.9,
      reviews: 234,
      verified: true,
      services: ["Installation", "Measurement", "Curtain Walls", "Facade Setup"],
      location: "Pune, Maharashtra",
      distance: "2.3 km",
      response: "<2 hours",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
      id: 2,
      name: "Blue Glass & Aluminum",
      rating: 4.7,
      reviews: 156,
      verified: true,
      services: ["Installation", "Repair", "Consultation"],
      location: "Shivaji Nagar, Pune",
      distance: "4.1 km",
      response: "<4 hours",
      image: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    },
    {
      id: 3,
      name: "Precision Fitters",
      rating: 4.5,
      reviews: 89,
      verified: false,
      services: ["Measurement", "Interior Partitions", "Shower Enclosures"],
      location: "Kothrud, Pune",
      distance: "5.5 km",
      response: "<1 hour",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-poppins font-bold text-white mb-4">Service Partners Near You</h1>
        <p className="text-gray-400 font-inter text-lg">Find verified installers and service professionals in your area.</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-[#11141e] border border-white/10 rounded-2xl p-4 md:p-6 mb-8 flex flex-col md:flex-row gap-4 shadow-lg">
        <div className="flex-1 relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-cyan" size={20} />
          <input 
            type="text" 
            placeholder="Enter your location..." 
            className="w-full bg-primary-dark border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white focus:border-accent-cyan outline-none"
            defaultValue="Pune, Maharashtra"
          />
        </div>
        
        <div className="relative md:w-48">
          <select className="w-full bg-primary-dark border border-white/20 rounded-xl px-4 py-3 text-white focus:border-accent-cyan outline-none appearance-none">
            <option>Within 5km</option>
            <option>Within 10km</option>
            <option>Within 25km</option>
            <option>Within 50km</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
        </div>
        
        <button className="bg-accent-cyan hover:bg-[#00bfe6] text-primary-dark font-bold px-8 py-3 rounded-xl transition-colors flex justify-center items-center gap-2">
          <Search size={18} /> Search
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2 hide-scrollbar overflow-x-auto w-full md:w-auto">
          {["All Services", "Installation", "Measurement", "Repair", "Consultation"].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeFilter === filter 
                ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/50' 
                : 'bg-[#11141e] text-gray-400 border border-white/10 hover:border-white/30'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="flex bg-[#11141e] rounded-lg border border-white/10 p-1 shrink-0">
          <button 
            onClick={() => setView('list')}
            className={`px-4 py-1.5 rounded-md flex items-center gap-2 text-sm font-semibold transition-all ${view === 'list' ? 'bg-primary-dark text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <ListIcon size={16} /> List
          </button>
          <button 
            onClick={() => setView('map')}
            className={`px-4 py-1.5 rounded-md flex items-center gap-2 text-sm font-semibold transition-all ${view === 'map' ? 'bg-primary-dark text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Map size={16} /> Map
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="space-y-6">
          <p className="text-gray-400 font-inter mb-4">{partners.length} installers found</p>
          
          {partners.map(partner => (
            <div key={partner.id} className="bg-[#11141e] border border-white/10 hover:border-accent-cyan/50 rounded-2xl p-6 flex flex-col lg:flex-row gap-6 transition-all hover:-translate-y-1 hover:shadow-xl group">
              
              <div className="flex gap-6 flex-1">
                <img src={partner.image} alt={partner.name} className="w-20 h-20 rounded-full object-cover border-2 border-white/10 group-hover:border-accent-cyan transition-colors" />
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-xl font-poppins font-bold text-white">{partner.name}</h2>
                    {partner.verified && (
                      <span className="bg-success/10 text-success text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1 border border-success/20">
                        <ShieldCheck size={12} /> Verified
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm mb-4">
                    <div className="flex items-center text-accent-gold font-bold">
                      <Star size={14} className="fill-accent-gold mr-1" /> {partner.rating}/5
                    </div>
                    <span className="text-gray-500">({partner.reviews} jobs)</span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Services</p>
                    <div className="flex flex-wrap gap-2">
                      {partner.services.map(s => (
                        <span key={s} className="bg-white/5 text-gray-300 text-xs px-2.5 py-1 rounded-md border border-white/5">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm font-inter">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Location</p>
                      <p className="text-gray-300">{partner.location} <span className="text-accent-cyan ml-1">({partner.distance})</span></p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Est. Response</p>
                      <p className="text-gray-300">{partner.response}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-row lg:flex-col gap-3 justify-center lg:w-48 lg:border-l lg:border-white/10 lg:pl-6 pt-4 lg:pt-0 border-t border-white/10 mt-4 lg:mt-0">
                <button 
                  onClick={() => {
                    addOrder({
                      id: `SR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
                      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                      items: [{ id: `srv-${partner.id}`, name: `Service with ${partner.name}`, price: 0, quantity: 1 }],
                      total: 0,
                      status: 'Processing'
                    });
                    window.location.href = "/dashboard";
                  }}
                  className="flex-1 lg:flex-none bg-accent-cyan text-primary-dark font-bold py-2.5 rounded-lg flex justify-center items-center gap-2 hover:bg-[#00bfe6] transition-colors text-sm"
                >
                  <Calendar size={16} /> Book Service
                </button>
                <button className="flex-1 lg:flex-none bg-transparent border border-white/20 text-white font-semibold py-2.5 rounded-lg hover:bg-white/5 transition-colors text-sm">
                  View Profile
                </button>
                <div className="hidden lg:flex gap-2 w-full mt-auto pt-2">
                  <button className="flex-1 bg-white/5 border border-white/10 text-gray-300 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors flex justify-center items-center">
                    <Phone size={16} />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedPartner(partner);
                      setShowContactModal(true);
                    }}
                    className="flex-1 bg-white/5 border border-white/10 text-gray-300 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors flex justify-center items-center"
                  >
                    <MessageSquare size={16} />
                  </button>
                </div>
              </div>

            </div>
          ))}

          <div className="text-center mt-8">
            <button className="bg-transparent border border-white/20 text-white px-6 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm font-semibold">
              Load More
            </button>
          </div>
        </div>
      ) : (
        <div className="h-[600px] bg-[#11141e] border border-white/10 rounded-2xl relative overflow-hidden flex items-center justify-center">
          {/* Mock Map View */}
          <div className="absolute inset-0 opacity-30 mix-blend-luminosity bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Pune,India&zoom=12&size=1200x800&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0x8ec3b9&style=feature:all|element:labels.text.stroke|color:0x1a3646&style=feature:landscape|element:geometry|color:0x0f121a&style=feature:poi|element:geometry|color:0x0f121a&style=feature:road|element:geometry|color:0x1a1f2e&style=feature:road|element:geometry.stroke|color:0x2a3040&style=feature:water|element:geometry|color:0x0a0c14&key=YOUR_API_KEY')] bg-cover bg-center"></div>
          
          {/* Mock Pins */}
          <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-accent-cyan rounded-full border-4 border-[#11141e] shadow-[0_0_15px_rgba(0,217,255,0.5)] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center animate-bounce">
            <div className="w-2 h-2 bg-primary-dark rounded-full"></div>
          </div>
          
          <div className="absolute top-1/3 left-1/2 w-6 h-6 bg-white rounded-full border-2 border-accent-cyan shadow-[0_0_10px_rgba(255,255,255,0.5)] transform -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="absolute top-2/3 right-1/3 w-6 h-6 bg-white rounded-full border-2 border-accent-cyan shadow-[0_0_10px_rgba(255,255,255,0.5)] transform -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Map Overlay Card */}
          <div className="absolute top-1/2 left-1/3 translate-x-4 -translate-y-1/2 bg-[#11141e] border border-accent-cyan/50 p-4 rounded-xl shadow-2xl w-64 z-10 hidden md:block">
            <h3 className="font-poppins font-bold text-white text-sm mb-1">{partners[0].name}</h3>
            <div className="flex items-center text-accent-gold text-xs font-bold mb-2">
              <Star size={12} className="fill-accent-gold mr-1" /> {partners[0].rating} ({partners[0].reviews})
            </div>
            <p className="text-gray-400 text-xs mb-3">{partners[0].distance} away</p>
            <button className="w-full bg-accent-cyan text-primary-dark py-1.5 rounded font-semibold text-xs">View Profile</button>
          </div>
          
          <div className="absolute bottom-6 right-6 bg-[#11141e] border border-white/10 p-3 rounded-lg flex gap-2 shadow-lg">
            <button className="w-8 h-8 bg-white/5 rounded flex items-center justify-center text-white hover:bg-white/10">+</button>
            <button className="w-8 h-8 bg-white/5 rounded flex items-center justify-center text-white hover:bg-white/10">-</button>
          </div>
        </div>
      )}
      {showContactModal && selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#11141e] border border-white/10 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button onClick={() => setShowContactModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20}/></button>
            <h2 className="text-xl font-bold text-white mb-2">Contact {selectedPartner.name}</h2>
            <p className="text-sm text-gray-400 mb-4">Send a message to discuss your requirements.</p>
            <textarea 
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              className="w-full h-32 bg-primary-dark border border-white/10 rounded-xl p-3 text-white focus:border-accent-cyan outline-none resize-none mb-4"
              placeholder="Hi, I need help with..."
            />
            <button 
              onClick={() => {
                setShowContactModal(false);
                setContactMessage('');
              }}
              className="w-full bg-accent-cyan hover:bg-[#00bfe6] text-primary-dark font-bold py-3 rounded-lg transition-colors"
            >
              Send Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
