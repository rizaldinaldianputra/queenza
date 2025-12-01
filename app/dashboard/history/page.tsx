"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  MoreVertical, 
  Repeat, 
  Search,
  Filter
} from "lucide-react";

// --- Mock Data Riwayat ---
const HISTORY_DATA = [
  {
    id: "B-001",
    service: "Russian Volume Eyelash",
    date: "12 Okt 2023",
    time: "14:00",
    price: "Rp 400.000",
    status: "upcoming", // upcoming, completed, canceled
    img: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&q=80&w=200",
    location: "Studio Kemang"
  },
  {
    id: "B-002",
    service: "Natural Classic Retouch",
    date: "20 Sep 2023",
    time: "10:00",
    price: "Rp 150.000",
    status: "completed",
    img: "https://images.unsplash.com/photo-1587909209111-5097ee578ec3?auto=format&fit=crop&q=80&w=200",
    location: "Home Service"
  },
  {
    id: "B-003",
    service: "Lash Lift & Tint",
    date: "01 Sep 2023",
    time: "13:00",
    price: "Rp 150.000",
    status: "completed",
    img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=200",
    location: "Studio Kemang"
  },
  {
    id: "B-004",
    service: "Mega Volume",
    date: "15 Agu 2023",
    time: "16:00",
    price: "Rp 500.000",
    status: "canceled",
    img: "https://images.unsplash.com/photo-1583001931096-959e9ad7b535?auto=format&fit=crop&q=80&w=200",
    location: "Studio Kemang"
  },
];

export default function HistoryPage() {
  const [filter, setFilter] = useState("all");

  const filteredData = HISTORY_DATA.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-orange-100 text-orange-600 border-orange-200";
      case "completed": return "bg-green-100 text-green-600 border-green-200";
      case "canceled": return "bg-red-50 text-red-500 border-red-100";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "upcoming": return "Menunggu";
      case "completed": return "Selesai";
      case "canceled": return "Dibatalkan";
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-pink-50/50 pb-10">
      
      {/* --- Header --- */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-pink-100 px-6 py-4">
        <div className="container mx-auto max-w-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <ArrowLeft size={20} className="text-slate-600" />
              </button>
            </Link>
            <h1 className="text-xl font-bold text-slate-800">My Bookings</h1>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
            <Search size={20} />
          </button>
        </div>
      </div>

      <main className="container mx-auto max-w-2xl px-4 py-6">
        
        {/* --- Tabs Filter --- */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {["all", "upcoming", "completed", "canceled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-all border ${
                filter === tab
                  ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                  : "bg-white text-slate-500 border-slate-200 hover:border-pink-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- List Booking --- */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-20 h-24 relative rounded-xl overflow-hidden flex-shrink-0 bg-slate-200">
                      <Image 
                        src={item.img} 
                        alt={item.service} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getStatusColor(item.status)}`}>
                            {getStatusLabel(item.status)}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">#{item.id}</span>
                        </div>
                        <h3 className="font-bold text-slate-800 line-clamp-1">{item.service}</h3>
                        <p className="text-pink-600 font-bold text-sm">{item.price}</p>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-slate-400" />
                            <span>{item.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} className="text-slate-400" />
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Footer Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin size={14} />
                        {item.location}
                    </div>

                    {item.status === "completed" ? (
                        <button className="flex items-center gap-1 text-xs font-bold text-pink-600 hover:bg-pink-50 px-3 py-1.5 rounded-lg transition-colors">
                            <Repeat size={14} /> Book Again
                        </button>
                    ) : item.status === "upcoming" ? (
                        <button className="text-xs font-medium text-slate-400 hover:text-red-500 px-3 py-1.5 transition-colors">
                            Cancel
                        </button>
                    ) : (
                         <span className="text-xs text-slate-300 italic">No action</span>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              // Empty State
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter size={40} className="text-pink-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-600">Belum ada booking</h3>
                <p className="text-slate-400 text-sm">Coba ubah filter atau buat booking baru.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}