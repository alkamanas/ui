"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Plus, X } from "lucide-react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

const flipCardEase = "cubic-bezier(0.16, 1, 0.3, 1)";
const flipCardOverlayEase = "cubic-bezier(0.4, 0, 0.2, 1)";

export type FlipCardProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  image?: string;
  imagePosition?: string;
  front?: React.ReactNode;
  back?: React.ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  expandToViewport?: boolean;
  dialogLabel?: string;
  minHeightClassName?: string;
  cardClassName?: string;
  backClassName?: string;
  overlayClassName?: string;
  transitionMs?: number;
};

type FloatingLayout = {
  top: number;
  left: number;
  width: number;
  height: number;
  expandedTop: number;
  expandedLeft: number;
  expandedWidth: number;
  expandedHeight: number;
};

function getFloatingLayout(rect: DOMRect, maxHeight: number): FloatingLayout {
  const viewportPadding = window.innerWidth < 640 ? 16 : 32;
  const expandedHeight = Math.min(maxHeight, window.innerHeight - viewportPadding * 2);
  const expandedWidth = Math.min(1080, window.innerWidth - viewportPadding * 2);

  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    expandedTop: Math.max(viewportPadding, (window.innerHeight - expandedHeight) / 2),
    expandedLeft: Math.max(viewportPadding, (window.innerWidth - expandedWidth) / 2),
    expandedWidth,
    expandedHeight,
  };
}

export function FlipCard({
  eyebrow,
  title,
  description,
  image,
  imagePosition = "center",
  front,
  back,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  expandToViewport = false,
  dialogLabel,
  className,
  minHeightClassName = "min-h-[22rem]",
  cardClassName,
  backClassName,
  overlayClassName,
  transitionMs = 900,
  onClick,
  ...props
}: FlipCardProps) {
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [floatingExpanded, setFloatingExpanded] = React.useState(false);
  const [floatingLayout, setFloatingLayout] = React.useState<FloatingLayout | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const closeTimerRef = React.useRef<number | null>(null);
  const isExpanded = expanded ?? internalExpanded;

  const setExpanded = (next: boolean) => {
    setInternalExpanded(next);
    onExpandedChange?.(next);
  };

  const closeFloatingCard = React.useCallback(() => {
    setFloatingExpanded(false);

    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = window.setTimeout(() => {
      setDialogOpen(false);
      setFloatingLayout(null);
      closeTimerRef.current = null;
    }, transitionMs);
  }, [transitionMs]);

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!dialogOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;
    const previousHtmlOverscroll = document.documentElement.style.overscrollBehavior;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeFloatingCard();
      }
    };

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.documentElement.style.overscrollBehavior = "none";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
      document.documentElement.style.overscrollBehavior = previousHtmlOverscroll;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeFloatingCard, dialogOpen]);

  const renderCardShell = (flipped: boolean, compact = false) => (
    <span
      className={cn(
        "relative block h-full rounded-[2rem] transition-transform will-change-transform [transform-style:preserve-3d]",
        compact ? "min-h-full" : minHeightClassName,
        flipped ? "[transform:rotateY(180deg)]" : "",
      )}
      style={{
        transitionDuration: `${transitionMs}ms`,
        transitionTimingFunction: flipCardEase,
      }}
    >
      <span
        className={cn(
          "absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] shadow-[0_22px_60px_rgba(0,0,0,0.32)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform [backface-visibility:hidden] group-hover:-translate-y-0.5 group-focus-visible:ring-2 group-focus-visible:ring-primary/70 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#050505]",
          cardClassName,
        )}
      >
        {image ? (
          <>
            <span
              className="absolute inset-0 bg-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.018]"
              style={{ backgroundImage: `url(${image})`, backgroundPosition: imagePosition }}
            />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,23,0.7)_0%,rgba(17,19,23,0.22)_42%,rgba(17,19,23,0.68)_100%),linear-gradient(90deg,rgba(17,19,23,0.78)_0%,rgba(17,19,23,0.14)_58%,rgba(17,19,23,0.24)_100%)]" />
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(192,164,109,0.2),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(140,197,179,0.12),transparent_30%)]" />
          </>
        ) : (
          <>
            <span className="absolute inset-0 bg-[#070707]" />
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_76%_54%,rgba(192,164,109,0.22),transparent_38%),radial-gradient(circle_at_86%_76%,rgba(140,197,179,0.14),transparent_34%),linear-gradient(90deg,rgba(5,6,10,0.9)_0%,rgba(7,9,14,0.82)_36%,rgba(9,13,18,0.62)_62%,rgba(5,6,10,0.38)_100%)]" />
          </>
        )}

        {front ?? (
          <span className="relative z-10 flex h-full flex-col justify-end p-7 sm:p-8">
            {eyebrow ? (
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-white/56">
                {eyebrow}
              </span>
            ) : null}
            <span className="mt-3 block max-w-[13ch] text-[2rem] font-bold leading-[1.02] text-white sm:text-[2.45rem]">
              {title}
            </span>
          </span>
        )}

        <span
          aria-hidden="true"
          className="absolute bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/12 text-white shadow-[0_16px_34px_rgba(0,0,0,0.28)] backdrop-blur-md transition-colors group-hover:bg-white/18"
        >
          <Plus className="h-5 w-5" strokeWidth={2} />
        </span>
      </span>

      <span
        className={cn(
          "absolute inset-0 overflow-hidden rounded-[2rem] border border-white/12 bg-[#111111] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.48)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-8",
          backClassName,
        )}
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(192,164,109,0.2),transparent_28%),radial-gradient(circle_at_86%_80%,rgba(140,197,179,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0))]" />
        {back ?? (
          <span className="relative z-10 flex h-full min-h-[calc(22rem-4rem)] flex-col justify-between">
            <span className="max-w-[22rem]">
              {eyebrow ? (
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-white/42">
                  {eyebrow}
                </span>
              ) : null}
              <span className="mt-3 block max-w-[16ch] text-[1.2rem] font-bold leading-[1.04] text-white sm:text-[1.45rem]">
                {title}
              </span>
            </span>
            {description ? (
              <span className="mb-9 block max-w-[42rem] pr-14 text-[1.25rem] font-semibold leading-[1.26] text-white/78 sm:text-[1.65rem]">
                {description}
              </span>
            ) : null}
          </span>
        )}
        <span
          aria-hidden="true"
          className="absolute bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/12 text-white shadow-[0_16px_34px_rgba(0,0,0,0.28)] backdrop-blur-md"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </span>
      </span>
    </span>
  );

  if (expandToViewport) {
    const floatingStyle: CSSProperties | undefined = floatingLayout
      ? {
          top: floatingExpanded ? floatingLayout.expandedTop : floatingLayout.top,
          left: floatingExpanded ? floatingLayout.expandedLeft : floatingLayout.left,
          width: floatingExpanded ? floatingLayout.expandedWidth : floatingLayout.width,
          height: floatingExpanded ? floatingLayout.expandedHeight : floatingLayout.height,
          transitionDuration: `${transitionMs}ms`,
          transitionTimingFunction: flipCardEase,
          transform: floatingExpanded ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 0, 0) scale(0.998)",
          opacity: 1,
        }
      : undefined;

    const overlayTransitionDuration = `${Math.max(620, Math.round(transitionMs * 0.72))}ms`;

    const floatingDialog =
      dialogOpen && floatingLayout
        ? createPortal(
            <>
              <button
                type="button"
                aria-label="Close flip card overlay"
                className={cn(
                  "fixed inset-0 z-[9990] cursor-default bg-black/62 backdrop-blur-xl transition-opacity duration-500",
                  floatingExpanded ? "opacity-100" : "opacity-0",
                  overlayClassName,
                )}
                style={{
                  transitionDuration: overlayTransitionDuration,
                  transitionTimingFunction: flipCardOverlayEase,
                }}
                onClick={closeFloatingCard}
              />
              <div
                className="fixed z-[9991] rounded-[2rem] text-left transition-[top,left,width,height,opacity,transform] will-change-[top,left,width,height,opacity,transform] [perspective:1600px]"
                style={floatingStyle}
                role="dialog"
                aria-modal="true"
                aria-label={dialogLabel ?? (typeof title === "string" ? title : "Flip card detail")}
              >
                {renderCardShell(floatingExpanded, true)}
                <button
                  type="button"
                  aria-label="Close flip card"
                  className={cn(
                    "absolute bottom-5 right-5 z-30 h-11 w-11 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
                    floatingExpanded ? "pointer-events-auto" : "pointer-events-none",
                  )}
                  onClick={(event) => {
                    event.stopPropagation();
                    closeFloatingCard();
                  }}
                />
              </div>
            </>,
            document.body,
          )
        : null;

    return (
      <>
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={dialogOpen}
          className={cn(
            "group block h-full w-full cursor-pointer rounded-[2rem] text-left outline-none [perspective:1400px]",
            minHeightClassName,
            dialogOpen ? "invisible pointer-events-none" : "",
            className,
          )}
          {...props}
          onClick={(event) => {
            onClick?.(event);
            if (event.defaultPrevented) return;

            const rect = triggerRef.current?.getBoundingClientRect();
            if (!rect) return;

            if (closeTimerRef.current) {
              window.clearTimeout(closeTimerRef.current);
              closeTimerRef.current = null;
            }

            setFloatingLayout(getFloatingLayout(rect, 680));
            setDialogOpen(true);
            setFloatingExpanded(false);

            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(() => {
                setFloatingExpanded(true);
              });
            });
          }}
        >
          {renderCardShell(false)}
        </button>

        {floatingDialog}
      </>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={isExpanded}
      className={cn(
        "group block h-full w-full cursor-pointer rounded-[2rem] text-left outline-none [perspective:1400px]",
        minHeightClassName,
        className,
      )}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        setExpanded(!isExpanded);
      }}
    >
      {renderCardShell(isExpanded)}
    </button>
  );
}
