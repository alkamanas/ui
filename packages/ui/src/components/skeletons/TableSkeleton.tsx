import { Skeleton } from "@/components/ui/skeleton";

export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 6,
  columns = 5,
}) => (
  <div className="overflow-hidden rounded-2xl border border-glass bg-glass-2 backdrop-blur-xl">
    <div className="flex items-center gap-4 border-b border-glass px-4 py-3">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={`th-${i}`} className="h-3 flex-1" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, r) => (
      <div
        key={`r-${r}`}
        className="flex items-center gap-4 border-b border-glass/40 px-4 py-3 last:border-b-0"
      >
        {Array.from({ length: columns }).map((_, c) => (
          <Skeleton key={`r-${r}-c-${c}`} className="h-4 flex-1" />
        ))}
      </div>
    ))}
  </div>
);

export default TableSkeleton;
