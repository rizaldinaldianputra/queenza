"use client"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()

  return (
    <SidebarProvider>
      <div className="flex h-screen"> 
        {/* Sidebar atau Sheet untuk mobile */}
        {isMobile ? (
          <Sheet>
            <SheetTrigger className="p-4">Menu</SheetTrigger>
            <SheetContent side="left">
              <AppSidebar />
            </SheetContent>
          </Sheet>
        ) : (
          <AppSidebar />
        )}

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  )
}
