"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

export default function GallerySection() {
  const items = [
    { span: "row-span-2", color: "bg-pink-100", img: "1596704017638-349f70632a68" },
    { span: "row-span-1", color: "bg-purple-100", img: "1620331317312-74b88bf40907" },
    { span: "row-span-2", color: "bg-orange-100", img: "1522337360705-2b615d7be599" },
    { span: "row-span-1", color: "bg-blue-100", img: "1616683693504-3ea1d9a3b6a4" },
    { span: "row-span-1", color: "bg-rose-100", img: "1588513522197-0f8c32588147" },
    { span: "row-span-2", color: "bg-yellow-100", img: "1512258872957-3a13d78e76c0" },
    { span: "row-span-1", color: "bg-teal-100", img: "1500917293891-ef795e70e1f6" },
  ];

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle title="Real Results" subtitle="BEFORE & AFTER" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]">
          {items.map((item, i) => (
            <motion.div key={i} className={`relative rounded-2xl overflow-hidden group ${item.span}`} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: i*0.1 }}>
              <div className={`absolute inset-0 ${item.color} animate-pulse`} />
              <Image src={`https://images.unsplash.com/photo-${item.img}?auto=format&fit=crop&q=80&w=600`} alt="Eyelash Result" fill className="object-cover group-hover:scale-110 transition-transform duration-500"/>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white font-bold border border-white px-4 py-2 rounded-full backdrop-blur-md">View</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
