"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Sparkles, 
  LogOut, 
  ChevronRight, 
  Star,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

// --- Mock Data (Updated with Category) ---
const SERVICES = [
  { id: 1, name: "Natural Classic", category: "Eyelash", price: "Rp 250.000", duration: "90 min", img: "https://images.unsplash.com/photo-1587909209111-5097ee578ec3?auto=format&fit=crop&q=80&w=300" },
  { id: 2, name: "Russian Volume", category: "Eyelash", price: "Rp 400.000", duration: "120 min", img: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&q=80&w=300" },
  { id: 3, name: "Lash Lift & Tint", category: "Treatment", price: "Rp 150.000", duration: "60 min", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=300" },
  { id: 4, name: "Retouch (2 Weeks)", category: "Eyelash", price: "Rp 150.000", duration: "60 min", img: "https://images.unsplash.com/photo-1583001931096-959e9ad7b535?auto=format&fit=crop&q=80&w=300" },
  { id: 5, name: "Gel Polish Basic", category: "Nails", price: "Rp 100.000", duration: "45 min", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=300" },
  { id: 6, name: "Nail Art Custom", category: "Nails", price: "Rp 250.000", duration: "90 min", img: "https://images.unsplash.com/photo-1632922267756-9b71242b1592?auto=format&fit=crop&q=80&w=300" },
];

const CATEGORIES = ["All", "Eyelash", "Nails", "Treatment"]; // Tab List
const TIME_SLOTS = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"];

export default function DashboardPage() {
  const [step, setStep] = useState(1); 
  const [activeCategory, setActiveCategory] = useState("All"); // State Tab Category
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<number>(0); 
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [dates, setDates] = useState<any[]>([]);

  useEffect(() => {
    const dts = Array.from({ length: 5 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return {
        day: d.toLocaleDateString("id-ID", { weekday: "short" }),
        date: d.getDate(),
        fullDate: d.toLocaleDateString("id-ID", { dateStyle: "full" })
      };
    });
    setDates(dts);
  }, []);

  // Filter Services berdasarkan Category
  const filteredServices = SERVICES.filter(service => 
    activeCategory === "All" ? true : service.category === activeCategory
  );

  const handleBooking = () => {
    alert("Booking Berhasil! Menunggu konfirmasi admin.");
    setStep(1);
    setSelectedService(null);
    setSelectedTime(null);
  };

  return (
    <div className="min-h-screen bg-pink-50/50 font-sans text-slate-800 pb-20">
      
      {/* --- Top Navbar --- */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-40 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-pink-500 to-purple-500 p-0.5">
            <div className="w-full h-full rounded-full bg-white overflow-hidden relative">
               <Image src="https://i.pravatar.cc/150?img=5" alt="Profile" fill className="object-cover" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-sm md:text-base">Hi, Cantika!</h1>
            <p className="text-xs text-pink-500 font-semibold">Gold Member</p>
          </div>
        </div>
        <Link href="/">
          <button className="p-2 hover:bg-red-50 text-red-400 rounded-full transition-colors">
            <LogOut size={20} />
          </button>
        </Link>
      </nav>

      <main className="container mx-auto px-4 md:px-6 py-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: Member Card --- */}
          <div className="md:col-span-1 space-y-6">
            {/* Member Card */}
            <motion.div 
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[1.58/1] rounded-2xl overflow-hidden shadow-2xl group perspective-1000"
            >
              <div className="absolute inset-0 bg-linear-to-br from-pink-500 via-purple-600 to-yellow-500"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-white/20 blur-[80px] rotate-45 animate-pulse"></div>

              <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
                <div className="flex justify-between items-start">
                  <span className="font-bold tracking-widest text-lg">QUEENZA</span>
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/30 flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> GOLD
                  </span>
                </div>
                <div>
                   <div className="flex gap-4 mb-4 opacity-80">
                      <div className="w-10 h-8 bg-yellow-200/40 rounded-md border border-yellow-200/60 backdrop-blur-sm"></div>
                   </div>
                   <p className="font-mono text-lg tracking-widest shadow-black drop-shadow-md">
                     8821 4990 1234
                   </p>
                   <div className="flex justify-between items-end mt-2">
                      <div>
                        <p className="text-[10px] opacity-70 uppercase">Card Holder</p>
                        <p className="font-semibold text-sm">CANTIKA PUTRI</p>
                      </div>
                      <div>
                        <p className="text-[10px] opacity-70 uppercase">Points</p>
                        <p className="font-bold text-lg text-yellow-300">1,250 XP</p>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Upcoming Appointment */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border-l-4 border-pink-500">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <Calendar size={18} className="text-pink-500" />
                    Next Session
                </h3>
                <div className="bg-pink-50 rounded-xl p-3 mb-2">
                    <p className="font-bold text-pink-700">Sabtu, 12 Okt</p>
                    <p className="text-sm text-slate-600">14:00 WIB • Retouch</p>
                </div>
                <Link href="/dashboard/history" className="w-full block text-center mt-2">
                    <span className="text-xs text-slate-500 hover:text-pink-600 underline cursor-pointer">
                        Lihat Riwayat Booking
                    </span>
                </Link>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Booking System --- */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="text-yellow-500" /> 
              Book Appointment
            </h2>

            {/* Steps Indicator */}
            <div className="flex items-center gap-4 mb-8 text-sm">
                <div className={`flex items-center gap-2 ${step >= 1 ? "text-pink-600 font-bold" : "text-slate-400"}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 1 ? "bg-pink-100 border-pink-600" : "border-slate-300"}`}>1</span>
                    Service
                </div>
                <div className="w-8 h-px bg-slate-300"></div>
                <div className={`flex items-center gap-2 ${step >= 2 ? "text-pink-600 font-bold" : "text-slate-400"}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 2 ? "bg-pink-100 border-pink-600" : "border-slate-300"}`}>2</span>
                    Waktu
                </div>
                 <div className="w-8 h-px bg-slate-300"></div>
                <div className={`flex items-center gap-2 ${step >= 3 ? "text-pink-600 font-bold" : "text-slate-400"}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 3 ? "bg-pink-100 border-pink-600" : "border-slate-300"}`}>3</span>
                    Selesai
                </div>
            </div>

            <AnimatePresence mode="wait">
                
                {/* STEP 1: PILIH SERVICE */}
                {step === 1 && (
                    <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        {/* --- CATEGORY TABS --- */}
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                          {CATEGORIES.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setActiveCategory(cat)}
                              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                                activeCategory === cat
                                  ? "bg-slate-900 text-white border-slate-900 shadow-lg scale-105"
                                  : "bg-white text-slate-500 border-slate-200 hover:border-pink-300 hover:text-pink-500"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>

                        {/* --- SERVICE GRID --- */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredServices.length > 0 ? (
                              filteredServices.map((srv) => (
                                  <motion.div 
                                      layout // Animasi saat filter berubah
                                      key={srv.id}
                                      onClick={() => setSelectedService(srv.id)}
                                      className={`cursor-pointer group relative bg-white rounded-2xl p-3 flex gap-4 items-center border-2 transition-all hover:shadow-xl ${selectedService === srv.id ? "border-pink-500 shadow-pink-200 bg-pink-50/50" : "border-transparent shadow-md"}`}
                                  >
                                      <div className="w-20 h-20 relative rounded-xl overflow-hidden shrink-0">
                                          <Image src={srv.img} alt={srv.name} fill className="object-cover" />
                                      </div>
                                      <div>
                                          {/* Badge Category Kecil */}
                                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">
                                            {srv.category}
                                          </span>
                                          <h4 className="font-bold text-slate-800 group-hover:text-pink-600 transition-colors line-clamp-1">{srv.name}</h4>
                                          <p className="text-sm text-slate-500">{srv.duration}</p>
                                          <p className="text-pink-600 font-bold mt-1">{srv.price}</p>
                                      </div>
                                      {selectedService === srv.id && (
                                          <div className="absolute top-2 right-2 text-pink-500">
                                              <CheckCircle2 fill="currentColor" className="text-white" />
                                          </div>
                                      )}
                                  </motion.div>
                              ))
                            ) : (
                              <div className="col-span-2 text-center py-10 text-slate-400">
                                Tidak ada layanan di kategori ini.
                              </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: PILIH WAKTU */}
                {step === 2 && (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100"
                    >
                        <h3 className="font-bold mb-4 text-slate-700">Pilih Tanggal</h3>
                        <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                            {dates.map((d, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedDate(idx)}
                                    className={`min-w-[70px] flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${selectedDate === idx ? "bg-pink-600 text-white border-pink-600 shadow-lg shadow-pink-300" : "bg-white border-slate-200 text-slate-500 hover:border-pink-300"}`}
                                >
                                    <span className="text-xs uppercase font-medium mb-1">{d.day}</span>
                                    <span className="text-xl font-bold">{d.date}</span>
                                </button>
                            ))}
                        </div>

                        <h3 className="font-bold mb-4 text-slate-700">Pilih Jam (Available)</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {TIME_SLOTS.map((time) => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`py-2 rounded-xl text-sm font-bold border transition-all ${selectedTime === time ? "bg-purple-100 text-purple-700 border-purple-300" : "bg-slate-50 text-slate-600 border-transparent hover:bg-white hover:border-slate-300"}`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: KONFIRMASI */}
                {step === 3 && (
                     <motion.div 
                        key="step3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-3xl p-8 shadow-xl text-center border-t-4 border-pink-500 relative overflow-hidden"
                     >
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-pink-500 via-purple-500 to-yellow-500"></div>
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce">
                            <CheckCircle2 size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Konfirmasi Booking?</h3>
                        <p className="text-slate-500 mb-8">Pastikan data di bawah ini sudah benar ya, dear.</p>
                        
                        <div className="bg-slate-50 rounded-2xl p-6 text-left space-y-4 mb-8">
                            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                                <span className="text-slate-500">Service</span>
                                <span className="font-bold text-slate-800">{SERVICES.find(s => s.id === selectedService)?.name}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                                <span className="text-slate-500">Tanggal</span>
                                <span className="font-bold text-slate-800">{dates[selectedDate].fullDate}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                                <span className="text-slate-500">Jam</span>
                                <span className="font-bold text-slate-800">{selectedTime} WIB</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-slate-500">Total Harga</span>
                                <span className="font-bold text-pink-600 text-xl">{SERVICES.find(s => s.id === selectedService)?.price}</span>
                            </div>
                        </div>

                        <button 
                            onClick={handleBooking}
                            className="w-full bg-linear-to-r from-pink-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-pink-500/40 transition-all hover:scale-[1.02]"
                        >
                            Ya, Booking Sekarang
                        </button>
                         <button 
                    onClick={() => setStep(step - 1)}
                            className="mt-5 w-full bg-linear-to-r from-gray-600 to-gray-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-pink-500/40 transition-all hover:scale-[1.02]"
                        >
                          Batal
                        </button>
                        
                     </motion.div>
                )}

            </AnimatePresence>

            {/* Navigation Buttons for Form */}
            {step < 3 && (
            <div className="flex justify-between items-center mt-8">
                {step > 1 ? (
                <button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 px-8 py-3 text-slate-400 hover:text-slate-600 text-sm font-medium"
                >
                    &larr; Kembali
                </button>
                ) : <div></div>} 

                <button
                disabled={(step === 1 && !selectedService) || (step === 2 && !selectedTime)}
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-full font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-all"
                >
                {step === 1 ? "Pilih Jadwal" : "Lanjut Konfirmasi"}
                <ChevronRight size={18} />
                </button>
            </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}