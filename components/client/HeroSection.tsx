"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { FloatingShape } from "./FloatingShape";

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587909209111-5097ee578ec3?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
      </motion.div>

      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400 rounded-full blur-[120px] opacity-50 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-[120px] opacity-50 animate-pulse delay-75"></div>

      {/* Content */}
      <div className="container relative z-10 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-block mb-4 px-4 py-1 rounded-full border border-pink-300 bg-white/30 backdrop-blur-sm text-pink-800 font-semibold">
          ✨ The Best Eyelash Extension in Town
        </motion.div>

        <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-6xl md:text-8xl font-black mb-6 leading-tight drop-shadow-xl">
          <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-500 via-red-400 to-yellow-400 filter drop-shadow-lg">Wake Up</span>
          <br />
          <span className="text-slate-800">Like This.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Tampil cantik setiap saat tanpa maskara. Hemat waktu, tampil memukau.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
            Lihat Pricelist
          </button>
          <button className="px-8 py-4 bg-white text-pink-600 border-2 border-pink-200 rounded-full font-bold text-lg hover:bg-pink-50 transition-all">
            Konsultasi Gratis
          </button>
        </motion.div>
      </div>
    </section>
  );
}
