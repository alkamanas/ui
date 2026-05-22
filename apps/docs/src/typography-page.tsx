import * as React from "react";
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Separator } from "@alkamanas/ui";

import { type DocItem } from "./docs-data";
import { CodeBlock } from "./docs-shell";

const typeScale = [
  {
    name: "Display",
    className: "text-5xl font-semibold leading-[1.05] tracking-normal sm:text-6xl",
    sample: "Operational clarity at product scale",
    note: "Use for page-level editorial moments and first-viewport product titles.",
  },
  {
    name: "Page title",
    className: "text-4xl font-semibold leading-tight tracking-normal sm:text-5xl",
    sample: "Workspace intelligence",
    note: "Use once per page or major documentation route.",
  },
  {
    name: "Section title",
    className: "text-2xl font-semibold leading-tight tracking-normal sm:text-3xl",
    sample: "Usage patterns",
    note: "Use for scan-friendly page sections and dense product groups.",
  },
  {
    name: "Body",
    className: "text-base leading-7 text-muted-foreground",
    sample: "Use body copy for operational context, setup notes and short explanations.",
    note: "Keep body copy restrained and readable across dark and light scopes.",
  },
];

const codeExamples = {
  scale: `<section className="grid gap-4">
  <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
    Platform
  </p>
  <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-normal sm:text-6xl">
    Operational clarity at product scale
  </h1>
  <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
    Compose page titles, supporting copy and metadata from the shared Alkamanas type tokens.
  </p>
</section>`,
  component: `<Card>
  <CardHeader>
    <CardTitle>Revenue quality</CardTitle>
    <CardDescription>Card titles use the shared alka-card-title rhythm.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="alka-text-title text-base font-semibold">Inline title</p>
    <p className="alka-text-description mt-1 text-sm">
      Use alka-text-description for secondary copy inside custom composed surfaces.
    </p>
  </CardContent>
</Card>`,
  dense: `<div className="grid gap-2 text-sm">
  <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
    Metrics
  </p>
  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
    <span className="text-muted-foreground">Active accounts</span>
    <span className="font-mono tabular-nums text-foreground">12,804</span>
  </div>
</div>`,
};

function TypeSpec({ className, name, note, sample }: (typeof typeScale)[number]) {
  return (
    <article className="rounded-2xl border border-border/70 bg-background/30 p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Badge variant="secondary" className="rounded-full font-mono text-[0.68rem] uppercase tracking-[0.16em]">
          {name}
        </Badge>
        <code className="text-xs text-muted-foreground">{className}</code>
      </div>
      <p className={className}>{sample}</p>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">{note}</p>
    </article>
  );
}

function ComponentTypographyExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Revenue quality</CardTitle>
          <CardDescription>Card titles and descriptions use package typography classes.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="alka-text-title text-base font-semibold">Inline title</p>
          <p className="alka-text-description mt-1 text-sm">
            Custom compositions can reuse the same title and description rhythm.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Signal health</CardTitle>
          <CardDescription>Dense cards keep headings compact without switching visual language.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Active accounts</span>
              <span className="font-mono tabular-nums text-foreground">12,804</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Qualified pipeline</span>
              <span className="font-mono tabular-nums text-foreground">$4.82M</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DenseTypographyExample() {
  const rows = [
    ["Label", "font-mono text-[0.68rem] uppercase tracking-[0.16em]"],
    ["Body", "text-sm leading-6 text-muted-foreground"],
    ["Number", "font-mono tabular-nums text-foreground"],
    ["Title", "alka-text-title font-semibold"],
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border/70">
      <div className="grid grid-cols-[9rem_minmax(0,1fr)] border-b border-border/70 bg-background/35 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        <span>Use</span>
        <span>Class pattern</span>
      </div>
      {rows.map(([label, classes]) => (
        <div key={label} className="grid grid-cols-[9rem_minmax(0,1fr)] border-b border-border/60 px-4 py-3 text-sm last:border-b-0">
          <span className="text-muted-foreground">{label}</span>
          <code className="font-mono text-xs text-foreground">{classes}</code>
        </div>
      ))}
    </div>
  );
}

export function TypographyPage({ doc }: { doc: DocItem }) {
  return (
    <div className="docs-component-page">
      <section id="overview" data-docs-toc="Overview" className="max-w-3xl scroll-mt-32">
        <Badge variant="secondary" className="rounded-full">{doc.group}</Badge>
        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">{doc.title}</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{doc.description}</p>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Alkamanas typography is token-driven: use the shared sans and mono font variables, keep letter spacing neutral for readable copy, and reserve positive tracking for compact metadata labels.
        </p>
      </section>

      <section id="preview" className="mt-10 grid gap-8">
        <div id="type-scale" data-docs-toc="Type scale" className="grid scroll-mt-32 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-normal">Type scale</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              These examples mirror the scale used across the docs shell and public component pages.
            </p>
          </div>
          <div className="grid gap-4">
            {typeScale.map((item) => (
              <TypeSpec key={item.name} {...item} />
            ))}
          </div>
        </div>

        <div id="component-text" data-docs-toc="Component text" className="grid scroll-mt-32 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-normal">Component text</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Reuse package classes when composing custom surfaces around Alkamanas primitives.
            </p>
          </div>
          <ComponentTypographyExample />
        </div>

        <div id="dense-ui-labels" data-docs-toc="Dense UI labels" className="grid scroll-mt-32 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-normal">Dense UI labels</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Operational interfaces rely on compact labels, tabular numbers and clear body copy.
            </p>
          </div>
          <DenseTypographyExample />
        </div>
      </section>

      <section id="usage" data-docs-toc="Usage" className="mt-10 grid scroll-mt-32 gap-5">
        <h2 className="text-2xl font-semibold tracking-normal">Usage</h2>
        <div className="grid gap-4">
          <CodeBlock>{codeExamples.scale}</CodeBlock>
          <CodeBlock>{codeExamples.component}</CodeBlock>
          <CodeBlock>{codeExamples.dense}</CodeBlock>
        </div>
      </section>
    </div>
  );
}
