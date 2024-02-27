import { Skeleton } from './ui/skeleton'

export function TableSkeleton() {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-28" />

          <Skeleton className="h-10 w-36" />
        </div>

        <div className="space-y-2.5">
          <Skeleton className="h-8 w-[900px]" />

          <Skeleton className="h-[700px] w-full" />
        </div>
      </div>
    </div>
  )
}
