"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation"; // 1. Import Router

export default function LoginPage() {
    const router = useRouter(); // 2. Panggil Router

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulasi loading login
    setTimeout(() => {
      setIsLoading(false);
            router.push("/dashboard"); 

      alert("Login berhasil (Simulasi)");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-pink-50 relative overflow-hidden flex items-center justify-center p-4">
      
      {/* --- Background Elements (Sama seperti Home agar konsisten) --- */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300 rounded-full blur-[120px] opacity-40" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-pink-400 rounded-full blur-[120px] opacity-40" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-100 rounded-full blur-[150px] opacity-20" />
      </div>

      {/* --- Tombol Kembali ke Home --- */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/">
          <motion.div 
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-slate-600 font-medium hover:text-pink-600 transition-colors bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </motion.div>
        </Link>
      </div>

      {/* --- Login Card (Glassmorphism) --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-white/60 backdrop-blur-xl border border-white/80 shadow-2xl rounded-3xl p-8 md:p-10"
      >
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
            Welcome Back!
          </h2>
          <p className="text-slate-500 text-sm">
            Silakan login untuk mengatur appointment kamu.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors">
                <Mail size={20} />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@glowlash.com"
                className="w-full bg-white/50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-800 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <a href="#" className="text-xs text-pink-500 hover:text-pink-700 hover:underline">Forgot Password?</a>
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors">
                <Lock size={20} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/50 border border-slate-200 rounded-xl py-3 pl-12 pr-12 text-slate-800 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all placeholder:text-slate-300"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-pink-500/30 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Logging in...
              </>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white/50 px-3 text-slate-400 font-medium backdrop-blur-sm rounded-full">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-100 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-slate-600 font-medium text-sm group">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 py-2.5 rounded-xl hover:bg-slate-800 transition-colors shadow-sm text-white font-medium text-sm group">
            <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-5 h-5 invert group-hover:scale-110 transition-transform" />
            Apple
          </button>
        </div>

        {/* Register Link */}
        <p className="text-center mt-8 text-slate-500 text-sm">
          Belum punya akun?{" "}
          <Link href="/register" className="text-pink-600 font-bold hover:underline">
            Daftar Member
          </Link>
        </p>

      </motion.div>
    </div>
  );
}