import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-start justify-start gap-y-3">
      <div className="mx-auto w-full h-full lg:px-40 space-y-3 px-2">
        <div className="flex items-center gap-x-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-full" />
        </div>
        <Separator />
        <Skeleton className="h-8 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-8 w-1/4" />
        </div>
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  )
}