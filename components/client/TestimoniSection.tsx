"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { FloatingShape } from "./FloatingShape";
import { Star } from "lucide-react";

export default function TestimoniSection() {
  return (
    <section id="testimoni" className="py-24 bg-pink-50 relative">
      <FloatingShape className="w-80 h-80 bg-purple-200 bottom-0 left-0" />
      <div className="container mx-auto px-6">
        <SectionTitle title="Happy Clients" subtitle="TESTIMONI" />
        <div className="flex flex-col md:flex-row gap-8 overflow-x-auto pb-8 snap-x">
          {[1,2,3,4].map(i => (
            <motion.div key={i} className="min-w-[300px] md:min-w-[350px] bg-white p-8 rounded-3xl shadow-lg border-b-4 border-pink-400 snap-center" whileHover={{ y: -5 }}>
              <div className="flex gap-1 text-yellow-400 mb-4">{[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" />)}</div>
              <p className="text-slate-600 mb-6 italic">"Suka banget sama hasilnya! Bulu matanya halus banget, gak nusuk, dan awet sampai 1 bulan lebih. Terapisnya juga ramah banget."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden relative">
                  <Image src={`https://i.pravatar.cc/150?img=${i+20}`} alt="User" fill />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Jessica Diana</h4>
                  <p className="text-xs text-slate-400">Regular Member</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
