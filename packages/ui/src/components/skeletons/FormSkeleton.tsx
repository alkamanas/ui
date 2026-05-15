import { Skeleton } from "@/components/ui/skeleton";

export const FormSkeleton: React.FC<{ fields?: number }> = ({ fields = 4 }) => (
  <div className="space-y-6 rounded-2xl border border-glass bg-glass-2 p-6 backdrop-blur-xl">
    {Array.from({ length: fields }).map((_, index) => (
      <div key={index} className="space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-9 w-full" />
      </div>
    ))}
    <div className="flex justify-end">
      <Skeleton className="h-9 w-28" />
    </div>
  </div>
);

export default FormSkeleton;
