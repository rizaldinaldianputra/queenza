// components/admin/mobile-sidebar.tsx
"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"; // Pastikan import shadcn benar
import { Sidebar } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const MobileSidebar = () => {
  // Fix hydration error (karena sheet hanya boleh render di client)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      {/* side="left" artinya muncul dari kiri */}
      <SheetContent side="left" className="p-0 bg-slate-900 border-r-slate-800 text-white">
        <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};