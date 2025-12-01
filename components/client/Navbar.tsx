"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link"; // Jangan lupa import

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-pink-600 tracking-tighter">Queenza<span className="text-purple-600">Beauty</span>.</h1>
        <div className="hidden md:flex space-x-8 font-medium text-slate-600">
          {["Services", "Promo", "Gallery", "Testimoni", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-pink-500 transition-colors">{item}</a>
          ))}
        </div>
        <Link href="/login">

        <button className="bg-linear-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-pink-500/50 transition-all transform hover:scale-105">
          Book Now
        </button>
        </Link>

      </div>
    </nav>
  );
}
