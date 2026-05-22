import * as React from "react";
import { CommandPaletteProvider, Separator, Toaster } from "@alkamanas/ui";

import { DirectoryPage, SectionPage } from "./component-page";
import { componentPageById } from "./component-pages";
import { PageChrome } from "./docs-shell";
import { blockPageIds, componentIds, docs } from "./docs-data";
import { getActiveRouteId, getDocHref, getLegacyHashDocId, getRouteDocIdFromPathname, homeDocId, isDocsPathname, isHomePath } from "./docs-routes";
import { getPrimaryThemeStyle, type DocsThemeModeId, type GlassEffectId, type PrimaryThemeId } from "./docs-theme";
import { PageScrollbar } from "./page-scrollbar";

const routeTransitionMs = 360;

const HomePage = React.lazy(() => import("./home-page").then((module) => ({ default: module.HomePage })));
const BlocksPage = React.lazy(() => import("./blocks-page").then((module) => ({ default: module.BlocksPage })));
const TypographyPage = React.lazy(() => import("./typography-page").then((module) => ({ default: module.TypographyPage })));

function SkeletonBlock({ className }: { className: string }) {
  return <div aria-hidden="true" className={`animate-pulse bg-muted/45 ${className}`} />;
}

function MarketingPageFallback({
  primaryTheme,
  themeMode,
  glassEffect,
}: {
  primaryTheme: PrimaryThemeId;
  themeMode: DocsThemeModeId;
  glassEffect: GlassEffectId;
}) {
  return (
    <div
      className={`theme-${themeMode} alka-theme-${themeMode} docs-shell docs-home min-h-dvh text-foreground`}
      data-glass-effect={glassEffect}
      style={getPrimaryThemeStyle(primaryTheme, themeMode)}
    >
      <div className="fixed left-4 right-4 top-4 z-40 mx-auto h-16 max-w-[1220px] rounded-full border border-border/70 bg-background/35 p-3 backdrop-blur-xl">
        <div className="flex h-full items-center justify-between gap-4">
          <SkeletonBlock className="h-8 w-40 rounded-full" />
          <div className="hidden items-center gap-8 md:flex">
            <SkeletonBlock className="h-4 w-12 rounded-full" />
            <SkeletonBlock className="h-4 w-24 rounded-full" />
            <SkeletonBlock className="h-4 w-16 rounded-full" />
          </div>
          <SkeletonBlock className="h-10 w-44 rounded-full" />
        </div>
      </div>
      <main className="relative z-10 mx-auto flex min-h-dvh max-w-[1280px] flex-col px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <section className="mx-auto w-full max-w-4xl text-center">
          <SkeletonBlock className="mx-auto h-8 w-72 rounded-full" />
          <SkeletonBlock className="mx-auto mt-6 h-16 w-full max-w-3xl rounded-3xl sm:h-24" />
          <SkeletonBlock className="mx-auto mt-5 h-5 w-full max-w-2xl rounded-full" />
          <SkeletonBlock className="mx-auto mt-3 h-5 w-full max-w-xl rounded-full" />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <SkeletonBlock className="h-12 w-44 rounded-full" />
            <SkeletonBlock className="h-12 w-40 rounded-full" />
            <SkeletonBlock className="h-12 w-28 rounded-full" />
          </div>
        </section>
        <section className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
          <SkeletonBlock className="min-h-[27rem] rounded-[2rem] border border-border/70 bg-background/35" />
          <div className="grid gap-4">
            <SkeletonBlock className="min-h-[13rem] rounded-[2rem] border border-border/70 bg-background/35" />
            <SkeletonBlock className="min-h-[13rem] rounded-[2rem] border border-border/70 bg-background/35" />
          </div>
        </section>
        <section className="grid gap-4 py-12 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <SkeletonBlock key={item} className="h-36 rounded-[2rem] border border-border/70 bg-background/35" />
          ))}
        </section>
      </main>
    </div>
  );
}

function BlocksPageFallback({
  primaryTheme,
  themeMode,
  glassEffect,
}: {
  primaryTheme: PrimaryThemeId;
  themeMode: DocsThemeModeId;
  glassEffect: GlassEffectId;
}) {
  return (
    <div
      className={`theme-${themeMode} alka-theme-${themeMode} docs-shell min-h-dvh text-foreground`}
      data-glass-effect={glassEffect}
      style={getPrimaryThemeStyle(primaryTheme, themeMode)}
    >
      <div className="fixed left-4 right-4 top-4 z-40 mx-auto h-16 max-w-[1220px] rounded-full border border-border/70 bg-background/35 p-3 backdrop-blur-xl">
        <div className="flex h-full items-center justify-between gap-4">
          <SkeletonBlock className="h-8 w-40 rounded-full" />
          <SkeletonBlock className="hidden h-4 w-72 rounded-full md:block" />
          <SkeletonBlock className="h-10 w-40 rounded-full" />
        </div>
      </div>
      <main className="relative z-10 mx-auto min-h-dvh max-w-[1440px] px-4 pb-14 pt-28 sm:px-6 lg:px-8">
        <section className="max-w-4xl">
          <SkeletonBlock className="h-8 w-24 rounded-full" />
          <SkeletonBlock className="mt-5 h-14 w-full max-w-3xl rounded-3xl sm:h-20" />
          <SkeletonBlock className="mt-5 h-5 w-full max-w-3xl rounded-full" />
          <SkeletonBlock className="mt-3 h-5 w-full max-w-2xl rounded-full" />
          <div className="mt-7 flex flex-wrap gap-3">
            <SkeletonBlock className="h-12 w-40 rounded-full" />
            <SkeletonBlock className="h-12 w-36 rounded-full" />
          </div>
        </section>
        <section className="mt-10 flex flex-wrap gap-2">
          {[0, 1, 2, 3, 4].map((item) => (
            <SkeletonBlock key={item} className="h-10 w-28 rounded-full" />
          ))}
        </section>
        <section className="mt-8 grid gap-6">
          {[0, 1, 2].map((item) => (
            <SkeletonBlock key={item} className="h-[32rem] rounded-3xl border border-border/70 bg-background/35" />
          ))}
        </section>
      </main>
    </div>
  );
}

function ComponentPageFallback() {
  return (
    <div className="docs-component-page min-h-[calc(100dvh-8rem)]" aria-busy="true">
      <section className="max-w-3xl scroll-mt-32">
        <SkeletonBlock className="h-8 w-28 rounded-full border border-border/70 bg-background/35" />
        <SkeletonBlock className="mt-5 h-12 w-72 rounded-2xl sm:h-14 sm:w-96" />
        <div className="mt-4 grid max-w-2xl gap-3">
          <SkeletonBlock className="h-5 w-full rounded-full" />
          <SkeletonBlock className="h-5 w-4/5 rounded-full" />
          <SkeletonBlock className="h-4 w-full rounded-full" />
        </div>
      </section>
      <section className="mt-10 grid gap-10">
        <article className="grid gap-4">
          <div className="max-w-2xl">
            <SkeletonBlock className="h-8 w-56 rounded-2xl" />
            <SkeletonBlock className="mt-3 h-4 w-full rounded-full" />
            <SkeletonBlock className="mt-2 h-4 w-3/4 rounded-full" />
          </div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <SkeletonBlock className="h-12 w-40 rounded-full border border-border/70 bg-background/35" />
            <SkeletonBlock className="h-10 w-10 rounded-full border border-border/70 bg-background/35" />
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-transparent">
            <div className="relative flex min-h-[24rem] items-center justify-center p-6 sm:p-10">
              <div className="grid w-full max-w-xl gap-4">
                <SkeletonBlock className="h-40 rounded-2xl border border-border/70 bg-background/35" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <SkeletonBlock className="h-11 rounded-full" />
                  <SkeletonBlock className="h-11 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
      <section className="mt-10 grid scroll-mt-32 gap-4">
        <SkeletonBlock className="h-8 w-24 rounded-2xl" />
        <SkeletonBlock className="h-28 rounded-2xl border border-border/70 bg-background/35" />
        <SkeletonBlock className="mt-4 h-8 w-28 rounded-2xl" />
        <div className="grid gap-2">
          {[0, 1, 2].map((item) => (
            <SkeletonBlock key={item} className="h-14 rounded-2xl border border-border/70 bg-background/35" />
          ))}
        </div>
      </section>
    </div>
  );
}

function scrollToHash(hash: string) {
  if (!hash) return;

  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return;

  window.requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  });
}

function getCurrentDoc(fallback = homeDocId) {
  if (typeof window === "undefined") return fallback;

  const legacyId = getLegacyHashDocId(window.location.hash);
  if (legacyId && isHomePath(window.location.pathname)) {
    window.history.replaceState(null, "", getDocHref(legacyId));
    return getActiveRouteId(legacyId);
  }

  return getRouteDocIdFromPathname(window.location.pathname, fallback);
}

export default function App() {
  const [activeId, setActiveId] = React.useState(() => getCurrentDoc());
  const [routeMotion, setRouteMotion] = React.useState<"enter" | "exit">("enter");
  const activeIdRef = React.useRef(activeId);
  const previousActiveIdRef = React.useRef(activeId);
  const routeMotionRef = React.useRef(routeMotion);
  const pendingIdRef = React.useRef<string | null>(null);
  const routeTimeoutRef = React.useRef<number | undefined>(undefined);
  const [primaryTheme, setPrimaryTheme] = React.useState<PrimaryThemeId>("visetra");
  const [themeMode, setThemeMode] = React.useState<DocsThemeModeId>("dark");
  const [glassEffect, setGlassEffect] = React.useState<GlassEffectId>("blurry");

  React.useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  React.useEffect(() => {
    routeMotionRef.current = routeMotion;
  }, [routeMotion]);

  React.useEffect(() => {
    const nextClasses = [`theme-${themeMode}`, `alka-theme-${themeMode}`];
    const previousMode = themeMode === "dark" ? "light" : "dark";
    const previousClasses = [`theme-${previousMode}`, `alka-theme-${previousMode}`];
    document.body.classList.remove(...previousClasses);
    document.documentElement.classList.remove(...previousClasses);
    document.body.classList.add(...nextClasses);
    document.documentElement.classList.add(...nextClasses);
    document.documentElement.style.colorScheme = themeMode;

    return () => {
      document.body.classList.remove(...nextClasses);
      document.documentElement.classList.remove(...nextClasses);
      document.documentElement.style.removeProperty("color-scheme");
    };
  }, [themeMode]);

  const completeRouteChange = React.useCallback(() => {
    const nextId = pendingIdRef.current;
    if (!nextId) return;

    pendingIdRef.current = null;
    previousActiveIdRef.current = activeIdRef.current;
    setActiveId(nextId);
    setRouteMotion("enter");
  }, []);

  const startRouteChange = React.useCallback((nextId: string) => {
    if (nextId === activeIdRef.current && routeMotionRef.current !== "exit") return;

    pendingIdRef.current = nextId;
    if (routeTimeoutRef.current) window.clearTimeout(routeTimeoutRef.current);
    setRouteMotion("exit");
    routeTimeoutRef.current = window.setTimeout(completeRouteChange, routeTransitionMs);
  }, [completeRouteChange]);

  const navigateToDoc = React.useCallback((id: string, hash = "") => {
    window.history.pushState(null, "", `${getDocHref(id)}${hash}`);
    startRouteChange(getActiveRouteId(id));

    if (hash) {
      window.setTimeout(() => {
        scrollToHash(hash);
      }, routeTransitionMs + 20);
    }
  }, [startRouteChange]);

  React.useEffect(() => {
    const onPopState = () => {
      startRouteChange(getCurrentDoc(activeIdRef.current));

      if (window.location.hash) {
        window.setTimeout(() => {
          scrollToHash(window.location.hash);
        }, routeTransitionMs + 20);
      }
    };

    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return;

      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin || !isDocsPathname(url.pathname)) return;

      event.preventDefault();
      window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
      startRouteChange(getRouteDocIdFromPathname(url.pathname, activeIdRef.current));

      if (url.hash) {
        window.setTimeout(() => {
          scrollToHash(url.hash);
        }, routeTransitionMs + 20);
      } else {
        window.scrollTo({ top: 0 });
      }
    };

    window.addEventListener("popstate", onPopState);
    document.addEventListener("click", onDocumentClick);
    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onDocumentClick);
      if (routeTimeoutRef.current) window.clearTimeout(routeTimeoutRef.current);
    };
  }, [startRouteChange]);

  React.useEffect(() => {
    scrollToHash(window.location.hash);
  }, [activeId]);

  React.useEffect(() => {
    const variables = getPrimaryThemeStyle(primaryTheme, themeMode);
    const targets = [document.documentElement, document.body];

    Object.entries(variables).forEach(([property, value]) => {
      targets.forEach((target) => {
        target.style.setProperty(property, String(value));
      });
    });

    return () => {
      Object.keys(variables).forEach((property) => {
        targets.forEach((target) => {
          target.style.removeProperty(property);
        });
      });
    };
  }, [primaryTheme, themeMode]);

  React.useEffect(() => {
    document.documentElement.dataset.glassEffect = glassEffect;
    document.documentElement.dataset.glassRealisticStrategy = "auto";
    document.body.dataset.glassEffect = glassEffect;
    document.body.dataset.glassRealisticStrategy = "auto";

    return () => {
      delete document.documentElement.dataset.glassEffect;
      delete document.documentElement.dataset.glassRealisticStrategy;
      delete document.body.dataset.glassEffect;
      delete document.body.dataset.glassRealisticStrategy;
    };
  }, [glassEffect]);

  const activeDoc = docs.find((item) => item.id === activeId) ?? docs[0];
  const isBlocksPage = blockPageIds.has(activeId);
  const ActiveComponentPage = componentPageById[activeDoc.id];

  React.useEffect(() => {
    const previousActiveId = previousActiveIdRef.current;
    if (
      !isBlocksPage ||
      activeId === "blocks" ||
      !blockPageIds.has(previousActiveId) ||
      previousActiveId === activeId
    ) {
      return;
    }

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        document.getElementById(activeId)?.scrollIntoView({ block: "start" });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [activeId, isBlocksPage]);

  return (
    <CommandPaletteProvider
      groups={[{
        heading: "Documentation",
        items: [
          {
            key: homeDocId,
            title: "Home",
            keywords: ["Overview", "Components", "Blocks"],
            onSelect: () => {
              navigateToDoc(homeDocId);
            },
          },
          ...docs.map((item) => ({
          key: item.id,
          title: item.title,
          keywords: [item.group, item.description],
          onSelect: () => {
            navigateToDoc(item.id);
          },
        })),
        ],
      }]}
    >
      <Toaster />
      <PageScrollbar />
      {activeId === homeDocId ? (
        <React.Suspense
          fallback={(
            <MarketingPageFallback
              primaryTheme={primaryTheme}
              themeMode={themeMode}
              glassEffect={glassEffect}
            />
          )}
        >
          <HomePage
            primaryTheme={primaryTheme}
            themeMode={themeMode}
            glassEffect={glassEffect}
          />
        </React.Suspense>
      ) : isBlocksPage ? (
        <React.Suspense
          fallback={(
            <BlocksPageFallback
              primaryTheme={primaryTheme}
              themeMode={themeMode}
              glassEffect={glassEffect}
            />
          )}
        >
          <BlocksPage
            primaryTheme={primaryTheme}
            onPrimaryThemeChange={setPrimaryTheme}
            themeMode={themeMode}
            onThemeModeChange={setThemeMode}
            glassEffect={glassEffect}
            onGlassEffectChange={setGlassEffect}
            routeMotion={routeMotion}
            routeKey={activeId}
          />
        </React.Suspense>
      ) : (
        <PageChrome
          activeDoc={activeDoc}
          primaryTheme={primaryTheme}
          onPrimaryThemeChange={setPrimaryTheme}
          themeMode={themeMode}
          onThemeModeChange={setThemeMode}
          glassEffect={glassEffect}
          onGlassEffectChange={setGlassEffect}
          routeMotion={routeMotion}
          routeKey={activeId}
        >
          {activeDoc.id === "components" ? (
            <DirectoryPage />
          ) : activeDoc.id === "typography" ? (
            <React.Suspense fallback={<ComponentPageFallback />}>
              <TypographyPage doc={activeDoc} />
            </React.Suspense>
          ) : componentIds.has(activeDoc.id) && ActiveComponentPage ? (
            <React.Suspense fallback={<ComponentPageFallback />}>
              <ActiveComponentPage doc={activeDoc} />
            </React.Suspense>
          ) : (
            <SectionPage doc={activeDoc} />
          )}
          <Separator className="my-12" />
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>Built from Visetra Studio primitives with Apple-inspired smooth interaction references.</span>
            <a className="hover:text-foreground" href={getDocHref("registry")}>Registry metadata</a>
          </div>
        </PageChrome>
      )}
    </CommandPaletteProvider>
  );
}
