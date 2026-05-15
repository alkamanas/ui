import { Skeleton } from "@/components/ui/skeleton";

export const ProjectListSkeleton: React.FC<{ count?: number }> = ({
  count = 9,
}) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="overflow-hidden rounded-xl border border-glass bg-white/[0.02]"
      >
        <Skeleton className="aspect-[5/3] w-full" />
        <div className="space-y-2 p-3">
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-3 w-2/5" />
        </div>
      </div>
    ))}
  </div>
);

export default ProjectListSkeleton;
