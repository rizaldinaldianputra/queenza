"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Loader2, 
  Smartphone, 
  Sparkles 
} from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validasi sederhana
    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak sama!");
      setIsLoading(false);
      return;
    }

    // Simulasi register
    setTimeout(() => {
      setIsLoading(false);
      alert("Registrasi Berhasil! Silakan Login.");
      // Di sini nanti redirect ke halaman login
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-pink-50 relative overflow-hidden flex items-center justify-center p-4 py-10">
      
      {/* --- Background Elements (Varian Gerakan Berbeda dari Login) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 50, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] right-[10%] w-[400px] h-[400px] bg-yellow-200 rounded-full blur-[100px] opacity-40" 
        />
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] bg-pink-400 rounded-full blur-[130px] opacity-30" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-purple-100/40 via-transparent to-orange-100/40 opacity-50" />
      </div>

      {/* --- Tombol Kembali --- */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/">
          <motion.div 
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-slate-600 font-medium hover:text-pink-600 transition-colors bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span className="hidden md:inline">Back to Home</span>
          </motion.div>
        </Link>
      </div>

      {/* --- Register Card --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[2.5rem] p-8 md:p-10"
      >
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-pink-100 border border-pink-200 px-4 py-1.5 rounded-full text-pink-600 text-xs font-bold uppercase tracking-wide mb-4 animate-pulse">
            <Sparkles size={14} />
            <span>Join & Get 10% Off First Treatment</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">
            Create Account
          </h2>
          <p className="text-slate-500">
            Daftar member untuk booking lebih mudah & promo eksklusif.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 ml-3 uppercase tracking-wider">Nama Lengkap</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors">
                <User size={18} />
              </div>
              <input 
                name="name"
                type="text" 
                required
                placeholder="Misal: Citra Kirana"
                onChange={handleChange}
                className="w-full bg-white/50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-slate-800 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all placeholder:text-slate-300 text-sm md:text-base"
              />
            </div>
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 ml-3 uppercase tracking-wider">Email</label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors">
                        <Mail size={18} />
                    </div>
                    <input 
                        name="email"
                        type="email" 
                        required
                        placeholder="email@kamu.com"
                        onChange={handleChange}
                        className="w-full bg-white/50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-slate-800 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all placeholder:text-slate-300 text-sm"
                    />
                </div>
            </div>
            
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 ml-3 uppercase tracking-wider">WhatsApp</label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors">
                        <Smartphone size={18} />
                    </div>
                    <input 
                        name="phone"
                        type="tel" 
                        required
                        placeholder="0812..."
                        onChange={handleChange}
                        className="w-full bg-white/50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-slate-800 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all placeholder:text-slate-300 text-sm"
                    />
                </div>
            </div>
          </div>

          {/* Password & Confirm Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 ml-3 uppercase tracking-wider">Password</label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors">
                        <Lock size={18} />
                    </div>
                    <input 
                        name="password"
                        type={showPassword ? "text" : "password"} 
                        required
                        placeholder="Min. 8 Karakter"
                        onChange={handleChange}
                        className="w-full bg-white/50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-slate-800 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all placeholder:text-slate-300 text-sm"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 ml-3 uppercase tracking-wider">Ulangi Pass</label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors">
                        <Lock size={18} />
                    </div>
                    <input 
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"} 
                        required
                        placeholder="Ketik Ulang"
                        onChange={handleChange}
                        className="w-full bg-white/50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-slate-800 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all placeholder:text-slate-300 text-sm"
                    />
                </div>
            </div>
          </div>
          
          {/* Show Password Checkbox (Opsional UI) */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer gap-2">
                <input 
                    type="checkbox" 
                    onChange={() => setShowPassword(!showPassword)}
                    className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-200 accent-pink-500"
                />
                <span className="text-xs text-slate-500 select-none">Show Password</span>
            </label>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 mt-2">
             <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-gray-300 accent-pink-500" />
             <p className="text-xs text-slate-500 leading-relaxed">
                Saya setuju dengan <a href="#" className="text-pink-600 font-bold hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-pink-600 font-bold hover:underline">Kebijakan Privasi</a> GlowLash.
             </p>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-500 via-rose-400 to-orange-400 text-white font-bold py-4 rounded-2xl shadow-lg mt-4 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Creating Account...
              </>
            ) : (
              "Daftar Sekarang"
            )}
          </motion.button>
        </form>

        {/* Footer Link */}
        <p className="text-center mt-8 text-slate-500 text-sm">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-pink-600 font-bold hover:underline relative z-10">
            Login di sini
          </Link>
        </p>

      </motion.div>
    </div>
  );
}