import * as React from "react";
import { Boxes, FileJson, Moon, PanelsTopLeft, Terminal } from "lucide-react";
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@alkamanas/ui";

import { docs, type DocItem } from "./docs-data";
import { CodeBlock } from "./docs-shell";

export function DirectoryPage() {
  return (
    <div className="docs-component-page">
      <section id="overview" className="max-w-3xl">
        <Badge variant="secondary" className="rounded-full border-white/10 bg-white/[0.06] text-white/80">Directory</Badge>
        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
          Components Directory
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Select a component from the floating sidebar to inspect its preview, import path and registry command.
        </p>
      </section>
      <section id="preview" className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {docs.filter((item) => item.group === "Components").map((item) => (
          <a key={item.id} href={`#${item.id}`} className="group block">
            <Card className="h-full border-white/[0.08] bg-white/[0.035] transition-[border-color,background-color,box-shadow] duration-500 ease-[var(--alka-ease-smooth)] group-hover:border-white/[0.14] group-hover:bg-white/[0.055]">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="font-mono text-xs text-muted-foreground">{item.command}</span>
              </CardContent>
            </Card>
          </a>
        ))}
      </section>
    </div>
  );
}

export function SectionPage({ doc }: { doc: DocItem }) {
  const iconMap: Record<string, React.ReactNode> = {
    installation: <Terminal className="h-5 w-5" />,
    theming: <Moon className="h-5 w-5" />,
    cli: <FileJson className="h-5 w-5" />,
    registry: <Boxes className="h-5 w-5" />,
  };

  return (
    <div className="docs-component-page">
      <section id="overview" className="max-w-3xl">
        <Badge variant="secondary" className="rounded-full">{doc.group}</Badge>
        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">{doc.title}</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{doc.description}</p>
      </section>
      <section id="preview" className="mt-10">
        <Card>
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted text-primary">
              {iconMap[doc.id] ?? <PanelsTopLeft className="h-5 w-5" />}
            </div>
            <CardTitle className="pt-3">Reference</CardTitle>
            <CardDescription>Overview, preview, usage and registry metadata follow the shadcn docs pattern.</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock>{doc.id === "theming" ? `<section className="alka-theme-dark" data-navbar-theme="dark" />` : `pnpm add @alkamanas/ui\nimport "@alkamanas/ui/styles.css";`}</CodeBlock>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
