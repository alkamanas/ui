import * as React from "react";
import { CommandPaletteProvider, Separator, Toaster } from "@alkamanas/ui";

import { BlocksPage } from "./blocks-page";
import { DirectoryPage, SectionPage } from "./component-page";
import { componentPageById } from "./component-pages";
import { PageChrome } from "./docs-shell";
import { blockPageIds, componentIds, docs } from "./docs-data";
import { getPrimaryThemeStyle, type BorderAnimationColorId, type GlassEffectId, type PrimaryThemeId, type SurfaceGradientColorId } from "./docs-theme";

function getInitialDoc() {
  if (typeof window === "undefined") return "blocks";
  return window.location.hash.replace("#", "") || "blocks";
}

export default function App() {
  const [activeId, setActiveId] = React.useState(getInitialDoc);
  const [primaryTheme, setPrimaryTheme] = React.useState<PrimaryThemeId>("white");
  const [borderAnimationColor, setBorderAnimationColor] = React.useState<BorderAnimationColorId>("primary");
  const [surfaceGradientColor, setSurfaceGradientColor] = React.useState<SurfaceGradientColorId>("primary");
  const [glassEffect, setGlassEffect] = React.useState<GlassEffectId>("blurry");

  React.useEffect(() => {
    document.body.classList.add("theme-dark");
    document.documentElement.classList.add("theme-dark");

    return () => {
      document.body.classList.remove("theme-dark");
      document.documentElement.classList.remove("theme-dark");
    };
  }, []);

  React.useEffect(() => {
    const onHashChange = () => setActiveId(getInitialDoc());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  React.useEffect(() => {
    const variables = getPrimaryThemeStyle(primaryTheme);
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
  }, [primaryTheme]);

  React.useEffect(() => {
    document.documentElement.dataset.glassEffect = glassEffect;
    document.body.dataset.glassEffect = glassEffect;

    return () => {
      delete document.documentElement.dataset.glassEffect;
      delete document.body.dataset.glassEffect;
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
    if (!isBlocksPage || activeId === "blocks") return;

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
            setActiveId(item.id);
          },
        })),
      }]}
    >
      <Toaster />
      {isBlocksPage ? (
        <BlocksPage
          primaryTheme={primaryTheme}
          onPrimaryThemeChange={setPrimaryTheme}
          borderAnimationColor={borderAnimationColor}
          onBorderAnimationColorChange={setBorderAnimationColor}
          surfaceGradientColor={surfaceGradientColor}
          onSurfaceGradientColorChange={setSurfaceGradientColor}
          glassEffect={glassEffect}
          onGlassEffectChange={setGlassEffect}
        />
      ) : (
        <PageChrome
          activeDoc={activeDoc}
          primaryTheme={primaryTheme}
          onPrimaryThemeChange={setPrimaryTheme}
          borderAnimationColor={borderAnimationColor}
          onBorderAnimationColorChange={setBorderAnimationColor}
          surfaceGradientColor={surfaceGradientColor}
          onSurfaceGradientColorChange={setSurfaceGradientColor}
          glassEffect={glassEffect}
          onGlassEffectChange={setGlassEffect}
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
