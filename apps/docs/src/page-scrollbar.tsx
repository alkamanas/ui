"use client";

import * as React from "react";

function prefersDesktopPageScrollbar() {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;

  const hasFinePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false;
  if (!hasFinePointer) return false;

  const platform = [
    navigator.platform,
    navigator.userAgent,
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return /win|linux|x11/.test(platform) && !/android|iphone|ipad|ipod/.test(platform);
}

export function PageScrollbar() {
  const hideTimerRef = React.useRef<number | undefined>(undefined);
  const dragStartRef = React.useRef<{ pointerY: number; scrollY: number } | null>(null);
  const [enabled, setEnabled] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [metrics, setMetrics] = React.useState({
    viewportHeight: 1,
    scrollHeight: 1,
    scrollTop: 0,
  });

  const updateMetrics = React.useCallback(() => {
    const documentElement = document.documentElement;
    const scrollHeight = Math.max(documentElement.scrollHeight, document.body.scrollHeight, window.innerHeight);

    setMetrics({
      viewportHeight: window.innerHeight,
      scrollHeight,
      scrollTop: window.scrollY,
    });
  }, []);

  const show = React.useCallback(() => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    updateMetrics();
    setVisible(true);
  }, [updateMetrics]);

  const hideSoon = React.useCallback(() => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => {
      setVisible(false);
    }, 1000);
  }, []);

  React.useEffect(() => {
    const isEnabled = prefersDesktopPageScrollbar();
    setEnabled(isEnabled);
    document.documentElement.dataset.docsPageOverlayScrollbar = isEnabled ? "true" : "false";

    return () => {
      delete document.documentElement.dataset.docsPageOverlayScrollbar;
    };
  }, []);

  React.useEffect(() => {
    if (!enabled) return;

    updateMetrics();

    const onScroll = () => {
      show();
      hideSoon();
    };

    const onResize = () => {
      updateMetrics();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, [enabled, hideSoon, show, updateMetrics]);

  React.useEffect(() => {
    if (!enabled) return;

    const onPointerMove = (event: PointerEvent) => {
      const dragStart = dragStartRef.current;
      if (!dragStart) return;

      const availableTrack = Math.max(1, metrics.viewportHeight - thumbHeight);
      const scrollableDistance = Math.max(1, metrics.scrollHeight - metrics.viewportHeight);
      const delta = event.clientY - dragStart.pointerY;
      const nextScrollTop = dragStart.scrollY + (delta / availableTrack) * scrollableDistance;

      window.scrollTo({ top: nextScrollTop });
      updateMetrics();
    };

    const onPointerUp = () => {
      if (!dragStartRef.current) return;
      dragStartRef.current = null;
      hideSoon();
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  });

  if (!enabled || metrics.scrollHeight <= metrics.viewportHeight + 1) return null;

  const thumbHeight = Math.max(42, (metrics.viewportHeight / metrics.scrollHeight) * metrics.viewportHeight);
  const availableTrack = Math.max(1, metrics.viewportHeight - thumbHeight);
  const scrollableDistance = Math.max(1, metrics.scrollHeight - metrics.viewportHeight);
  const thumbOffset = (metrics.scrollTop / scrollableDistance) * availableTrack;
  const trackStyle = {
    position: "fixed",
    insetBlock: 0,
    right: 0,
    zIndex: 1400,
    width: "0.875rem",
    paddingBlock: "0.35rem",
    paddingInline: "0.1875rem",
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
    transform: "none",
    transformOrigin: "center right",
    transition: "opacity 360ms cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "opacity",
  } satisfies React.CSSProperties;

  return (
    <div
      aria-hidden="true"
      className="docs-page-scrollbar"
      data-visible={visible ? "true" : undefined}
      style={trackStyle}
    >
      <div
        className="docs-page-scrollbar-thumb"
        style={{
          height: `${thumbHeight}px`,
          width: "100%",
          minHeight: "2.625rem",
          cursor: dragStartRef.current ? "grabbing" : "grab",
          borderRadius: "var(--alka-radius-pill)",
          background:
            "linear-gradient(180deg, hsl(var(--alka-highlight-color) / 0.18), transparent), hsl(var(--foreground) / 0.32)",
          boxShadow:
            "0 6px 18px hsl(var(--alka-shadow-color) / 0.18), inset 0 1px 0 hsl(var(--alka-highlight-color) / 0.18)",
          opacity: 0.88,
          transform: `translate3d(0, ${thumbOffset}px, 0)`,
          transformOrigin: "center right",
          transition:
            "background-color 240ms var(--alka-ease-smooth), box-shadow 240ms var(--alka-ease-smooth), opacity 360ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          dragStartRef.current = {
            pointerY: event.clientY,
            scrollY: window.scrollY,
          };
          show();
        }}
      />
    </div>
  );
}
