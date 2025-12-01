// components/admin/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Utility bawaan shadcn
import {
  LayoutDashboard,
  CalendarDays,
  Scissors,
  Users,
  Star,
  Settings,
  LogOut,
  CreditCard,
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    label: "Bookings",
    icon: CalendarDays,
    href: "/admin/bookings",
    color: "text-pink-500",
  },
  {
    label: "Services",
    icon: Scissors,
    href: "/admin/services",
    color: "text-orange-500",
  },
  {
    label: "Customers",
    icon: Users,
    href: "/admin/customers",
    color: "text-emerald-500",
  },
  {
    label: "Reviews",
    icon: Star,
    href: "/admin/reviews",
    color: "text-yellow-500",
  },
  {
    label: "Billing",
    icon: CreditCard,
    href: "/admin/billing",
    color: "text-violet-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
    color: "text-gray-500",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/admin" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold bg-linear-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            QUEENZA
            <span className="text-xs text-slate-400 font-normal ml-1 border border-slate-700 px-1 rounded">
              ADMIN
            </span>
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Logout Button Area */}
      <div className="px-3 py-2">
        <button className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-red-400 hover:bg-red-500/10 rounded-lg transition text-zinc-400">
            <div className="flex items-center flex-1">
                <LogOut className="h-5 w-5 mr-3 text-red-500" />
                Logout
            </div>
        </button>
      </div>
    </div>
  );
};