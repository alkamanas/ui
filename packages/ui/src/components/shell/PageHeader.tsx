import { cn } from "@/lib/utils";

export const PageHeader: React.FC<{
  title: string;
  description?: string;
  actions?: React.ReactNode;
  titleAdornment?: React.ReactNode;
  className?: string;
}> = ({ title, description, actions, titleAdornment, className }) => (
  <div
    className={cn(
      "mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4",
      className,
    )}
  >
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {titleAdornment}
      </div>
      {description ? (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
    {actions ? (
      <div className="flex items-center gap-2">{actions}</div>
    ) : null}
  </div>
);

export default PageHeader;
