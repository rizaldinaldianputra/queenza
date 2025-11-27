import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Queenza Beauty",
  description: "Promo Makeup, Produkt Beauty, Testimoni, dan Penawaran Terbaik.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black antialiased">
   
        {children}

     
      </body>
    </html>
  );
}
