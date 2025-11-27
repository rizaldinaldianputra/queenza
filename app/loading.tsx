import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-screen w-full animate-pulse space-x-6 p-6">
      {/* Sidebar Skeleton */}
      <div className="w-64 space-y-4">
        <Skeleton className="h-12 w-full rounded-md" /> {/* Logo/Header */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* Menu item */}
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Main content Skeleton */}
      <div className="flex-1 space-y-4">
        <Skeleton className="h-12 w-1/3 rounded-md" /> {/* Page title */}
        <Skeleton className="h-6 w-full rounded-md" /> {/* Subtitle / info */}
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-32 w-full rounded-md" /> {/* Card 1 */}
          <Skeleton className="h-32 w-full rounded-md" /> {/* Card 2 */}
          <Skeleton className="h-32 w-full rounded-md" /> {/* Card 3 */}
        </div>
        <Skeleton className="h-10 w-full rounded-md" /> {/* Table row */}
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
