import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex flex-col gap-y-4 md:mx-auto md:w-4/5">
        <Skeleton className="h-12 w-1/4" />
        <Skeleton className="h-72 w-full" />
      </div>
    </div>
  )
}