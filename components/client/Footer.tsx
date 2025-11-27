"use client";
import Image from "next/image";
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-white pt-20 pb-10 rounded-t-[3rem] relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-pink-500 mb-4">Queenza Beauty.</h2>
            <p className="text-slate-400 mb-6">
              Membantu wanita tampil percaya diri dengan mata yang indah memukau setiap bangun tidur.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors cursor-pointer">
                <Instagram size={20} />
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Facebook size={20} />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-slate-400">
              {["Home", "Services", "Pricelist", "FAQ"].map(link => (
                <li key={link} className="hover:text-pink-400 cursor-pointer">{link}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <MapPin className="text-pink-500" size={20} />
                <span>Jl. Melati Indah No. 12, Jakarta Selatan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-pink-500" size={20} />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-pink-500" size={20} />
                <span>Senin - Minggu: 09.00 - 20.00</span>
              </li>
            </ul>
          </div>

          {/* Maps */}
          <div className="rounded-xl overflow-hidden h-48 bg-slate-800 relative group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.052601783857!2d106.820!3d-6.256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnMjEuNiJTIDEwNsKwNDknMTIuMCJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              className="opacity-70 group-hover:opacity-100 transition-opacity"
            ></iframe>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} Queenza Beauty Studio. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
