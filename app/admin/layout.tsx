// app/admin/layout.tsx
import { MobileSidebar } from "@/components/admin/mobile-sidebar";
import { Sidebar } from "@/components/admin/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      
      {/* --- DESKTOP SIDEBAR --- */}
      {/* Hidden di mobile (md:hidden), tampil di desktop (md:flex) */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-slate-900">
        <Sidebar />
      </div>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <main className="md:pl-72">
        
        {/* --- TOP NAVBAR --- */}
        <div className="flex items-center p-4 border-b h-16 bg-white shadow-sm sticky top-0 z-50">
            {/* Mobile Sidebar Trigger */}
            <MobileSidebar />
            
            {/* Right Side (Profile) */}
            <div className="ml-auto flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-slate-700">Admin Owner</p>
                    <p className="text-xs text-slate-500">Super Administrator</p>
                </div>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AD</AvatarFallback>
                </Avatar>
            </div>
        </div>

        {/* --- PAGE CONTENT --- */}
        <div className="p-8 bg-slate-50/50 min-h-[calc(100vh-64px)]">
            {children}
        </div>
      </main>
    </div>
  );
}