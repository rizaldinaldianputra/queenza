"use client";
import { motion } from "framer-motion";
import { FloatingShape } from "./FloatingShape";
import { Sparkles } from "lucide-react";

export default function PromoSection() {
  return (
    <section id="promo" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-pink-500 via-purple-500 to-yellow-400 opacity-90 transform -skew-y-3 scale-110"></div>
      <FloatingShape className="w-96 h-96 bg-white top-0 right-0 opacity-20" />
      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full mb-6 border border-white/40">
            <Sparkles className="text-yellow-300" />
            <span className="font-bold tracking-wide">LIMITED TIME OFFER</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-md">DISCOUNT UP TO 50%</h2>
          <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto">
            Dapatkan potongan harga khusus untuk member baru dan pelajar. Berlaku sampai akhir bulan ini!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Days","Hours","Mins"].map((label, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <span className="block text-4xl font-bold">{i===0?"02":i===1?"14":"30"}</span>
                <span className="text-sm uppercase">{label}</span>
              </div>
            ))}
          </div>
          <button className="mt-12 bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-yellow-300 hover:text-purple-800 transition-colors">
            Claim Promo Sekarang
          </button>
        </motion.div>
      </div>
    </section>
  );
}
