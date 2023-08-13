import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center gap-y-3">
      <div className="flex w-1/2 flex-col items-start gap-y-2">
        <Skeleton className="h-20 w-20 rounded-full" />
        <Skeleton className="h-12 w-full" />
      </div>
      <Separator />
      <Skeleton className="h-32 w-2/3" />
    </div>
  )
}
