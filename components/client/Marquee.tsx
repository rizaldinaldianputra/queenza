"use client";
import { motion } from "framer-motion";

export default function Marquee() {
  return (
    <div className="bg-pink-600 text-white py-3 overflow-hidden shadow-lg">
      <div className="animate-marquee whitespace-nowrap flex gap-8 font-bold text-lg uppercase tracking-wider">
        <span>🌸 Promo Grand Opening 50% OFF</span>
        <span>•</span>
        <span>Russian Volume</span>
        <span>•</span>
        <span>Korean Look</span>
        <span>•</span>
        <span>Home Service Available</span>
        <span>•</span>
        <span>🌸 Promo Grand Opening 50% OFF</span>
        <span>•</span>
        <span>Russian Volume</span>
        <span>•</span>
        <span>Korean Look</span>
      </div>
    </div>
  );
}
