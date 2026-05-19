import * as React from "react";
import { CommandPaletteProvider, Separator, Toaster } from "@alkamanas/ui";

import { BlocksPage } from "./blocks-page";
import { DirectoryPage, SectionPage } from "./component-page";
import { componentPageById } from "./component-pages";
import { PageChrome } from "./docs-shell";
import { blockPageIds, componentIds, docs } from "./docs-data";
import { getPrimaryThemeStyle, type BorderAnimationColorId, type DocsThemeModeId, type GlassEffectId, type PrimaryThemeId, type SurfaceGradientColorId } from "./docs-theme";

const routeIds = new Set([...docs.map((item) => item.id), ...blockPageIds]);
const routeTransitionMs = 360;

function getHashDoc(fallback = "blocks") {
  if (typeof window === "undefined") return fallback;
  const hashId = window.location.hash.replace("#", "");
  if (!hashId) return fallback;
  return routeIds.has(hashId) ? hashId : fallback;
}

export default function App() {
  const [activeId, setActiveId] = React.useState(() => getHashDoc());
  const [routeMotion, setRouteMotion] = React.useState<"enter" | "exit">("enter");
  const activeIdRef = React.useRef(activeId);
  const previousActiveIdRef = React.useRef(activeId);
  const routeMotionRef = React.useRef(routeMotion);
  const pendingIdRef = React.useRef<string | null>(null);
  const routeTimeoutRef = React.useRef<number | undefined>(undefined);
  const [primaryTheme, setPrimaryTheme] = React.useState<PrimaryThemeId>("white");
  const [themeMode, setThemeMode] = React.useState<DocsThemeModeId>("dark");
  const [borderAnimationColor, setBorderAnimationColor] = React.useState<BorderAnimationColorId>("primary");
  const [surfaceGradientColor, setSurfaceGradientColor] = React.useState<SurfaceGradientColorId>("primary");
  const [glassEffect, setGlassEffect] = React.useState<GlassEffectId>("blurry");

  React.useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  React.useEffect(() => {
    routeMotionRef.current = routeMotion;
  }, [routeMotion]);

  React.useEffect(() => {
    const nextClass = `theme-${themeMode}`;
    const previousClass = themeMode === "dark" ? "theme-light" : "theme-dark";
    document.body.classList.remove(previousClass);
    document.documentElement.classList.remove(previousClass);
    document.body.classList.add(nextClass);
    document.documentElement.classList.add(nextClass);
    document.documentElement.style.colorScheme = themeMode;

    return () => {
      document.body.classList.remove(nextClass);
      document.documentElement.classList.remove(nextClass);
      document.documentElement.style.removeProperty("color-scheme");
    };
  }, [themeMode]);

  React.useEffect(() => {
    const completeRouteChange = () => {
      const nextId = pendingIdRef.current;
      if (!nextId) return;

      pendingIdRef.current = null;
      previousActiveIdRef.current = activeIdRef.current;
      setActiveId(nextId);
      setRouteMotion("enter");
    };

    const startRouteChange = (nextId: string) => {
      if (nextId === activeIdRef.current && routeMotionRef.current !== "exit") return;

      pendingIdRef.current = nextId;
      if (routeTimeoutRef.current) window.clearTimeout(routeTimeoutRef.current);
      setRouteMotion("exit");
      routeTimeoutRef.current = window.setTimeout(completeRouteChange, routeTransitionMs);
    };

    const onHashChange = () => {
      const nextId = getHashDoc(activeIdRef.current);
      startRouteChange(nextId);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      if (routeTimeoutRef.current) window.clearTimeout(routeTimeoutRef.current);
    };
  }, []);

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

  React.useEffect(() => {
    document.documentElement.dataset.borderAnimationColor = borderAnimationColor;
    document.body.dataset.borderAnimationColor = borderAnimationColor;

    return () => {
      delete document.documentElement.dataset.borderAnimationColor;
      delete document.body.dataset.borderAnimationColor;
    };
  }, [borderAnimationColor]);

  React.useEffect(() => {
    document.documentElement.dataset.surfaceGradientColor = surfaceGradientColor;
    document.body.dataset.surfaceGradientColor = surfaceGradientColor;

    return () => {
      delete document.documentElement.dataset.surfaceGradientColor;
      delete document.body.dataset.surfaceGradientColor;
    };
  }, [surfaceGradientColor]);

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
        items: docs.map((item) => ({
          key: item.id,
          title: item.title,
          keywords: [item.group, item.description],
          onSelect: () => {
            window.location.hash = item.id;
          },
        })),
      }]}
    >
      <Toaster />
      {isBlocksPage ? (
        <BlocksPage
          primaryTheme={primaryTheme}
          onPrimaryThemeChange={setPrimaryTheme}
          themeMode={themeMode}
          onThemeModeChange={setThemeMode}
          borderAnimationColor={borderAnimationColor}
          onBorderAnimationColorChange={setBorderAnimationColor}
          surfaceGradientColor={surfaceGradientColor}
          onSurfaceGradientColorChange={setSurfaceGradientColor}
          glassEffect={glassEffect}
          onGlassEffectChange={setGlassEffect}
          routeMotion={routeMotion}
          routeKey={activeId}
        />
      ) : (
        <PageChrome
          activeDoc={activeDoc}
          primaryTheme={primaryTheme}
          onPrimaryThemeChange={setPrimaryTheme}
          themeMode={themeMode}
          onThemeModeChange={setThemeMode}
          borderAnimationColor={borderAnimationColor}
          onBorderAnimationColorChange={setBorderAnimationColor}
          surfaceGradientColor={surfaceGradientColor}
          onSurfaceGradientColorChange={setSurfaceGradientColor}
          glassEffect={glassEffect}
          onGlassEffectChange={setGlassEffect}
          routeMotion={routeMotion}
          routeKey={activeId}
        >
          {activeDoc.id === "components" ? <DirectoryPage /> : componentIds.has(activeDoc.id) && ActiveComponentPage ? <ActiveComponentPage doc={activeDoc} /> : <SectionPage doc={activeDoc} />}
          <Separator className="my-12" />
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>Built from Visetra Studio primitives with Apple-inspired smooth interaction references.</span>
            <a className="hover:text-foreground" href="#registry">Registry metadata</a>
          </div>
        </PageChrome>
      )}
    </CommandPaletteProvider>
  );
}
