import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

export interface DataStateProps<T> {
  data: T | null | undefined;
  loading: boolean;
  error?: Error | string | null;
  empty?: (data: T) => boolean;
  skeleton: ReactNode;
  emptyState: ReactNode;
  errorState?: ReactNode;
  children: (data: T) => ReactNode;
}

/**
 * Skeleton-in-place pattern. Keeps the page header / shell static and only
 * swaps the content slot between {skeleton, error, empty, content} so users
 * never see headers reflow when data arrives.
 */
export function DataState<T>({
  data,
  loading,
  error,
  empty,
  skeleton,
  emptyState,
  errorState,
  children,
}: DataStateProps<T>) {
  if (error) {
    return <>{errorState ?? <DefaultErrorState error={error} />}</>;
  }
  if (loading || data == null) {
    return <>{skeleton}</>;
  }
  if (empty?.(data)) {
    return <>{emptyState}</>;
  }
  return <>{children(data)}</>;
}

const DefaultErrorState: React.FC<{ error: Error | string }> = ({ error }) => {
  const message = typeof error === "string" ? error : error.message;
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
      <AlertTriangle className="size-6 text-destructive" />
      <div>
        <h3 className="text-sm font-medium text-foreground">
          Something went wrong
        </h3>
        <p className="mt-1 max-w-sm text-xs text-muted-foreground">
          {message || "Please try again in a moment."}
        </p>
      </div>
    </div>
  );
};

export default DataState;
