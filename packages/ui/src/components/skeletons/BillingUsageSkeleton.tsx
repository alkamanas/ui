import { Skeleton } from "@/components/ui/skeleton";

export const BillingUsageSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Plan summary */}
    <div className="space-y-4 rounded-2xl border border-glass bg-glass-2 p-6 backdrop-blur-xl">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-56" />
        </div>
        <div className="space-y-1 text-right">
          <Skeleton className="ml-auto h-7 w-20" />
          <Skeleton className="ml-auto h-3 w-12" />
        </div>
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-9 w-40" />
      </div>
    </div>

    {/* QuotaCard grid */}
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="space-y-3 rounded-2xl border border-glass bg-glass-2 p-4 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="size-4 rounded" />
          </div>
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-1.5 w-full rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  </div>
);

export default BillingUsageSkeleton;
