import * as React from "react";
import { Command as CommandIcon, Menu, Search } from "lucide-react";
import { Button, GlassElementLayers, LiquidGlassFilter, useCommandPalette } from "@alkamanas/ui";

import { componentIds, groupedDocs, type DocItem } from "./docs-data";
import { getPrimaryThemeStyle, PrimaryColorSwitcher, type BorderAnimationColorId, type DocsThemeModeId, type GlassEffectId, type PrimaryThemeId, type SurfaceGradientColorId } from "./docs-theme";

function Brand() {
  return (
    <a href="#blocks" className="flex items-center gap-3 text-sm font-semibold tracking-tight text-foreground">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10">
        <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_24px_hsl(var(--primary)_/_0.55)]" />
      </span>
      <span className="leading-none">Alkamanas UI</span>
    </a>
  );
}

function CommandButton() {
  const command = useCommandPalette();
  return (
    <Button variant="outline" size="sm" onClick={command.open} className="border-white/10 bg-white/[0.03]">
      <CommandIcon className="h-4 w-4" />
      Search
    </Button>
  );
}

function SidebarNav({ activeId }: { activeId: string }) {
  return (
    <aside className="alka-liquid-glass fixed bottom-4 left-4 top-4 z-30 hidden w-[264px] overflow-hidden rounded-3xl border lg:flex lg:flex-col">
      <GlassElementLayers />
      <div className="border-b border-white/[0.06] px-3 py-3">
        <Brand />
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3">
        <div className="mx-1 flex h-10 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 text-sm text-muted-foreground">
          <Search className="h-4 w-4" />
          Search documentation...
        </div>
        <nav className="mt-5 space-y-5">
          {Object.entries(groupedDocs).map(([group, items]) =>
            items.length ? (
              <div key={group}>
                <p className="px-3 pb-1 pt-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground/60">
                  {group}
                </p>
                <div className="grid gap-1">
                  {items.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      data-active={activeId === item.id}
                      className="docs-sidebar-link"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
            ) : null,
          )}
        </nav>
      </div>
    </aside>
  );
}

function Topbar({ activeId, activeTitle }: { activeId: string; activeTitle: string }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMenuOpen(false);
  }, [activeId]);

  React.useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="docs-mobile-topbar sticky top-3 z-50 mx-3 mb-3 lg:hidden" data-open={menuOpen}>
      <div className="docs-mobile-topbar-panel alka-liquid-glass relative z-20 flex h-16 items-center justify-between overflow-hidden rounded-full border px-3.5">
        <GlassElementLayers />
        <Brand />
        <div className="relative z-10 flex items-center gap-2">
          <CommandButton />
          <Button
            variant="ghost"
            size="icon"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="docs-mobile-menu"
            className="docs-mobile-menu-trigger"
            onClick={() => {
              setMenuOpen((open) => !open);
            }}
          >
            <Menu className="docs-mobile-menu-icon h-4 w-4" />
            <span className="docs-mobile-menu-lines" aria-hidden="true">
              <span />
              <span />
            </span>
          </Button>
        </div>
      </div>
      <div
        id="docs-mobile-menu"
        className="docs-mobile-menu fixed inset-0 z-10 overflow-y-auto px-5 pb-10 pt-24"
        aria-hidden={!menuOpen}
      >
        <div className="docs-mobile-menu-bg fixed inset-x-0 top-0 h-dvh" aria-hidden="true" />
        <nav className="docs-mobile-menu-content relative mx-auto max-w-[520px]">
          <p className="pb-5 pt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground/70">
            {activeTitle}
          </p>
          <div className="grid gap-7">
            {Object.entries(groupedDocs).map(([group, items]) =>
              items.length ? (
                <div key={group} className="grid gap-2">
                  <p className="px-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground/55">
                    {group}
                  </p>
                  <div className="grid gap-1">
                    {items.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        data-active={activeId === item.id}
                        className="docs-mobile-menu-link"
                        onClick={closeMenu}
                      >
                        <span>{item.title}</span>
                        <span className="text-sm text-muted-foreground/55">{item.group === "Components" ? "Component" : item.group}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null,
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#070707]/90 p-4 text-sm leading-6 text-white shadow-[0_18px_44px_rgba(0,0,0,0.28)]">
      <code>{children}</code>
    </pre>
  );
}

export function PageChrome({
  activeDoc,
  children,
  primaryTheme,
  onPrimaryThemeChange,
  themeMode,
  onThemeModeChange,
  borderAnimationColor,
  onBorderAnimationColorChange,
  surfaceGradientColor,
  onSurfaceGradientColorChange,
  glassEffect,
  onGlassEffectChange,
  routeMotion,
  routeKey,
}: {
  activeDoc: DocItem;
  children: React.ReactNode;
  primaryTheme: PrimaryThemeId;
  onPrimaryThemeChange: (value: PrimaryThemeId) => void;
  themeMode: DocsThemeModeId;
  onThemeModeChange: (value: DocsThemeModeId) => void;
  borderAnimationColor: BorderAnimationColorId;
  onBorderAnimationColorChange: (value: BorderAnimationColorId) => void;
  surfaceGradientColor: SurfaceGradientColorId;
  onSurfaceGradientColorChange: (value: SurfaceGradientColorId) => void;
  glassEffect: GlassEffectId;
  onGlassEffectChange: (value: GlassEffectId) => void;
  routeMotion: "enter" | "exit";
  routeKey: string;
}) {
  const showPrimarySwitcher = activeDoc.id === "components" || componentIds.has(activeDoc.id);

  return (
    <div className={`theme-${themeMode} alka-theme-${themeMode} docs-shell text-foreground`} data-border-animation-color={borderAnimationColor} data-glass-effect={glassEffect} data-surface-gradient-color={surfaceGradientColor} style={getPrimaryThemeStyle(primaryTheme, themeMode)}>
      <LiquidGlassFilter />
      <Topbar activeId={activeDoc.id} activeTitle={activeDoc.title} />
      {showPrimarySwitcher ? (
        <PrimaryColorSwitcher
          value={primaryTheme}
          onChange={onPrimaryThemeChange}
          themeMode={themeMode}
          onThemeModeChange={onThemeModeChange}
          borderAnimationColor={borderAnimationColor}
          onBorderAnimationColorChange={onBorderAnimationColorChange}
          surfaceGradientColor={surfaceGradientColor}
          onSurfaceGradientColorChange={onSurfaceGradientColorChange}
          glassEffect={glassEffect}
          onGlassEffectChange={onGlassEffectChange}
          className="fixed bottom-4 right-4 z-40 w-[min(92vw,20rem)] lg:hidden"
        />
      ) : null}
      <div className="relative z-10 min-h-dvh lg:pl-[296px]">
        <SidebarNav activeId={activeDoc.id} />
        <main className="min-w-0">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-8 md:px-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:px-10 lg:py-10">
            <article
              key={routeKey}
              className="docs-apple-motion-page min-w-0"
              data-route-motion={routeMotion}
            >
              {children}
            </article>
            <aside className="hidden lg:block">
              <div className="sticky top-4 space-y-4">
                <div className="alka-liquid-glass space-y-3 rounded-2xl border p-4 text-sm">
                  <GlassElementLayers />
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground/70">
                    On This Page
                  </p>
                  <a href="#overview" className="block text-muted-foreground hover:text-foreground">Overview</a>
                  <a href="#preview" className="block text-muted-foreground hover:text-foreground">Preview</a>
                  <a href="#usage" className="block text-muted-foreground hover:text-foreground">Usage</a>
                </div>
                {showPrimarySwitcher ? (
                  <PrimaryColorSwitcher
                    value={primaryTheme}
                    onChange={onPrimaryThemeChange}
                    themeMode={themeMode}
                    onThemeModeChange={onThemeModeChange}
                    borderAnimationColor={borderAnimationColor}
                    onBorderAnimationColorChange={onBorderAnimationColorChange}
                    surfaceGradientColor={surfaceGradientColor}
                    onSurfaceGradientColorChange={onSurfaceGradientColorChange}
                    glassEffect={glassEffect}
                    onGlassEffectChange={onGlassEffectChange}
                  />
                ) : null}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
