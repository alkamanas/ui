import type { LucideIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Faz 7.4 — thin wrapper that keeps the legacy `<EmptyState icon={…} title=… />`
 * call shape used by ~10 callsites while delegating layout to the shadcn
 * `Empty` primitive underneath.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className,
}) => (
  <Empty className={className}>
    <EmptyHeader>
      {Icon ? (
        <EmptyMedia variant="icon">
          <Icon className="size-5" />
        </EmptyMedia>
      ) : null}
      <EmptyTitle>{title}</EmptyTitle>
      {description ? <EmptyDescription>{description}</EmptyDescription> : null}
    </EmptyHeader>
    {action ? <EmptyContent>{action}</EmptyContent> : null}
  </Empty>
);

export default EmptyState;
