import * as React from "react";
import { Copy, ExternalLink, Layers3, PackagePlus, PanelsTopLeft, Sparkles } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Combobox,
  Input,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  LiquidGlassFilter,
  Progress,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@alkamanas/ui";

import { getDocHref } from "./docs-routes";
import { getPrimaryThemeStyle, type DocsThemeModeId, type GlassEffectId, type PrimaryThemeId } from "./docs-theme";
import { DocsMarketingNavbar } from "./marketing-navbar";

function ComponentShowcase() {
  return (
    <div className="docs-home-showcase relative w-full max-w-none overflow-hidden rounded-[2rem] bg-transparent shadow-none">
      <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
        <Card className="min-h-[27rem]">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardDescription>Registry preview</CardDescription>
                <CardTitle className="text-2xl">Composable surfaces</CardTitle>
              </div>
              <Badge variant="secondary">0.1.7</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-5">
            <Tabs defaultValue="install" className="w-full">
              <TabsList surface="flat">
                <TabsTrigger value="install">Install</TabsTrigger>
                <TabsTrigger value="theme">Theme</TabsTrigger>
                <TabsTrigger value="motion">Motion</TabsTrigger>
              </TabsList>
              <TabsContent value="install" className="mt-4 rounded-2xl border border-white/[0.08] bg-black/[0.28] p-4 font-mono text-sm text-white">
                pnpm add @alkamanas/ui
              </TabsContent>
              <TabsContent value="theme" className="mt-4 rounded-2xl border border-white/[0.08] bg-black/[0.28] p-4 font-mono text-sm text-white">
                &lt;section className="alka-theme-dark" /&gt;
              </TabsContent>
              <TabsContent value="motion" className="mt-4 rounded-2xl border border-white/[0.08] bg-black/[0.28] p-4 font-mono text-sm text-white">
                --alka-motion-smooth: 520ms;
              </TabsContent>
            </Tabs>

            <div className="grid gap-3 md:grid-cols-2">
              <Input variant="pill" placeholder="studio.visetra.app" />
              <Combobox
                surface="flat"
                options={[
                  { value: "navbar", label: "Navbar" },
                  { value: "command", label: "Command" },
                  { value: "sheet", label: "Sheet" },
                ]}
                placeholder="Select primitive"
              />
            </div>

            <div className="grid gap-3">
              <Item surface="bare">
                <ItemMedia><Layers3 className="h-4 w-4" /></ItemMedia>
                <ItemContent>
                  <ItemTitle>Per-component exports</ItemTitle>
                  <ItemDescription>Import only the primitive and CSS you need.</ItemDescription>
                </ItemContent>
                <ItemActions><Badge variant="success">Ready</Badge></ItemActions>
              </Item>
              <Item surface="bare">
                <ItemMedia><Sparkles className="h-4 w-4" /></ItemMedia>
                <ItemContent>
                  <ItemTitle>Section-aware themes</ItemTitle>
                  <ItemDescription>Light and dark scopes can live on the same page.</ItemDescription>
                </ItemContent>
                <ItemActions><Switch defaultChecked aria-label="Enable section theme" /></ItemActions>
              </Item>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardDescription>Blocks</CardDescription>
              <CardTitle>Production-ready compositions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Progress value={68} />
              <div className="grid gap-2">
                {["Workspace shell", "Launch form", "Command surface"].map((label, index) => (
                  <Item key={label} surface="bare" className="gap-3 rounded-2xl px-3 py-2 text-sm">
                    <ItemContent>
                      <ItemTitle className="text-sm font-medium">{label}</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <Badge variant={index === 0 ? "success" : "secondary"}>{index === 0 ? "Live" : "Next"}</Badge>
                    </ItemActions>
                  </Item>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Controls</CardDescription>
              <CardTitle>Token-driven by default</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Item surface="bare" className="gap-3 rounded-2xl px-3 py-2 text-sm">
                <ItemContent>
                  <label htmlFor="docs-home-realistic-glass" className="cursor-pointer">
                    <ItemTitle className="text-sm font-medium">Realistic glass</ItemTitle>
                  </label>
                </ItemContent>
                <ItemActions>
                  <Checkbox id="docs-home-realistic-glass" defaultChecked />
                </ItemActions>
              </Item>
              <Item surface="bare" className="gap-3 rounded-2xl px-3 py-2 text-sm">
                <ItemContent>
                  <label htmlFor="docs-home-overlay-scrollbars" className="cursor-pointer">
                    <ItemTitle className="text-sm font-medium">Overlay scrollbars</ItemTitle>
                  </label>
                </ItemContent>
                <ItemActions>
                  <Checkbox id="docs-home-overlay-scrollbars" defaultChecked />
                </ItemActions>
              </Item>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function HomePage({
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
      <LiquidGlassFilter />
      <DocsMarketingNavbar themeMode={themeMode} primaryTheme={primaryTheme} />
      <main className="relative z-10 mx-auto flex min-h-dvh max-w-[1280px] flex-col px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="rounded-full">
            <PackagePlus className="h-3.5 w-3.5" />
            Open components for Alkamanas interfaces
          </Badge>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
            The glass-first system for polished product UI.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Copy, import, theme and compose components that already understand light sections, dark sections, motion tokens and per-component package exports.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild>
              <a href={getDocHref("components")}>
                View Components
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={getDocHref("blocks")}>
                <PanelsTopLeft className="h-4 w-4" />
                Browse Blocks
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <a href={getDocHref("installation")}>
                <Copy className="h-4 w-4" />
                Install
              </a>
            </Button>
          </div>
        </section>

        <section className="mt-12">
          <ComponentShowcase />
        </section>

        <section className="grid gap-4 py-12 md:grid-cols-3">
          {[
            ["Subpath-first", "Every public component ships with a dedicated import path and CSS export."],
            ["Section-aware", "Components can resolve light or dark from their nearest section before falling back to the page theme."],
            ["Agent-readable", "Docs, package metadata and agent files stay aligned with the current component surface."],
          ].map(([title, description]) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
