"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { FloatingShape } from "./FloatingShape";
import { Scissors } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Natural Classic",
      desc: "1 helai lash extension pada 1 bulu mata asli. Hasil natural seperti pakai maskara.",
      color: "from-pink-400 to-rose-400",
      img: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Hybrid Volume",
      desc: "Perpaduan teknik single & volume. Memberikan efek wispy yang manis dan bervolume.",
      color: "from-purple-400 to-indigo-400",
      img: "https://images.unsplash.com/photo-1583001931096-959e9ad7b535?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Mega Russian",
      desc: "Teknik volume tebal untuk tampilan glamor dan dramatis. Mata terlihat lebih hidup.",
      color: "from-orange-400 to-pink-500",
      img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <section id="services" className="py-24 relative">
      <FloatingShape className="w-64 h-64 bg-yellow-200 top-20 left-10" />
      <div className="container mx-auto px-6">
        <SectionTitle title="Our Signature Styles" subtitle="PILIHAN MODEL" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-64 overflow-hidden relative">
                <Image src={service.img} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700"/>
                <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
              </div>
              <div className="p-8 relative">
                <div className={`absolute -top-8 right-8 w-16 h-16 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                  <Scissors size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-800">{service.title}</h3>
                <p className="text-slate-500 mb-6">{service.desc}</p>
                <button className="text-pink-600 font-bold uppercase text-sm tracking-wide hover:underline">
                  Lihat Detail &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
