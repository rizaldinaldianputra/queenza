import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-screen p-6 space-x-6">
      <div className="w-64 space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex-1 space-y-4">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  )
}
