import { Skeleton } from "@/components/ui/skeleton";

export const StatCardSkeleton: React.FC = () => (
  <div className="space-y-3 rounded-2xl border border-glass bg-glass-2 p-4 backdrop-blur-xl">
    <div className="flex items-center justify-between">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="size-8 rounded-lg" />
    </div>
    <Skeleton className="h-7 w-16" />
    <Skeleton className="h-3 w-20" />
  </div>
);

export default StatCardSkeleton;
