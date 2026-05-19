import * as React from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import {
  Badge,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@alkamanas/ui";

import { previewCodeById } from "../component-code-examples";
import { ComponentPreview } from "../component-previews";
import { type DocItem } from "../docs-data";
import { CodeBlock } from "../docs-shell";

export type ComponentPageProps = {
  doc: DocItem;
};

export type ComponentPageComponent = (props: ComponentPageProps) => React.ReactElement;

export type ComponentExampleSpec = {
  id: string;
  title: string;
  description: string;
  preview: React.ReactNode;
  code: string;
  previewClassName?: string;
};

export type ComponentPageDetails = {
  summary?: string;
  examples?: ComponentExampleSpec[];
  anatomy?: string[];
  variants?: Array<{ name: string; description: string }>;
  sizes?: Array<{ name: string; description: string }>;
  props?: Array<{ name: string; type: string; description: string }>;
  accessibility?: string[];
  motion?: string[];
  tokens?: string[];
};

function DetailList({ items }: { items?: string[] }) {
  if (!items?.length) return null;

  return (
    <ul className="grid gap-2 text-sm leading-6 text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="rounded-2xl border border-border/70 bg-background/30 px-4 py-3">
          {item}
        </li>
      ))}
    </ul>
  );
}

function DetailTable({
  columns,
  rows,
}: {
  columns: [string, string];
  rows?: Array<{ name: string; description: string }>;
}) {
  if (!rows?.length) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-border/70">
      <div className="grid grid-cols-[12rem_minmax(0,1fr)] border-b border-border/70 bg-background/35 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        <span>{columns[0]}</span>
        <span>{columns[1]}</span>
      </div>
      {rows.map((row) => (
        <div key={row.name} className="grid grid-cols-[12rem_minmax(0,1fr)] border-b border-border/60 px-4 py-3 text-sm last:border-b-0">
          <code className="font-mono text-xs text-foreground">{row.name}</code>
          <span className="leading-6 text-muted-foreground">{row.description}</span>
        </div>
      ))}
    </div>
  );
}

function PropsTable({ rows }: { rows?: ComponentPageDetails["props"] }) {
  if (!rows?.length) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-border/70">
      <div className="grid grid-cols-[11rem_12rem_minmax(0,1fr)] border-b border-border/70 bg-background/35 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        <span>Prop</span>
        <span>Type</span>
        <span>Notes</span>
      </div>
      {rows.map((row) => (
        <div key={row.name} className="grid grid-cols-[11rem_12rem_minmax(0,1fr)] border-b border-border/60 px-4 py-3 text-sm last:border-b-0">
          <code className="font-mono text-xs text-foreground">{row.name}</code>
          <code className="font-mono text-xs text-muted-foreground">{row.type}</code>
          <span className="leading-6 text-muted-foreground">{row.description}</span>
        </div>
      ))}
    </div>
  );
}

function getPreviewCode(doc: DocItem) {
  const demoName = `${doc.title.replace(/[^a-zA-Z0-9]+/g, "")}Demo`;
  const importLine = doc.importCode ?? `import { ${doc.title.replace(/\s+/g, "")} } from "@alkamanas/ui";`;
  const componentName =
    doc.id === "navbar" ? "SectionAwareNavbar" : doc.title.replace(/\s+/g, "");
  const registryCommand = doc.command ? `\n\n// ${doc.command}` : "";

  if (previewCodeById[doc.id]) {
    return `${previewCodeById[doc.id]}${registryCommand}`.trim();
  }

  return `${importLine}

export function ${demoName}() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center">
      <${componentName} />
    </div>
  );
}${registryCommand}`.trim();
}

export function ComponentExample({
  command,
  example,
}: {
  command?: string;
  example: ComponentExampleSpec;
}) {
  const [fullscreenOpen, setFullscreenOpen] = React.useState(false);

  return (
    <article className="grid gap-4">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-normal">{example.title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{example.description}</p>
      </div>
      <Tabs key={example.id} defaultValue="preview" className="w-full">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            aria-label={`Open ${example.title} preview in full screen`}
            onClick={() => setFullscreenOpen(true)}
            className="h-10 w-10 border border-border/70 bg-background/55 text-foreground/75 shadow-none backdrop-blur-xl hover:bg-muted/60 hover:text-foreground"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
        <TabsContent value="preview" className="mt-0">
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-transparent">
            <div className={`relative flex min-h-[18rem] items-center justify-center p-6 sm:p-10 ${example.previewClassName ?? ""}`}>
              {example.preview}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="code" className="mt-0">
          <CodeBlock>{command ? `${example.code}\n\n// ${command}` : example.code}</CodeBlock>
        </TabsContent>
      </Tabs>

      <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
        <DialogContent
          showCloseButton={false}
          className="h-[calc(100dvh-1.25rem)] max-h-[calc(100dvh-1.25rem)] max-w-[calc(100vw-1.25rem)] gap-0 overflow-hidden rounded-[2rem] p-0 sm:h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-2rem)] sm:max-w-[calc(100vw-2rem)]"
        >
          <div className="relative flex h-full min-h-0 flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-border/70 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <DialogTitle className="truncate text-sm font-semibold tracking-normal sm:text-base">
                  {example.title}
                </DialogTitle>
                <DialogDescription className="mt-1 hidden text-xs text-muted-foreground sm:block">
                  {example.description}
                </DialogDescription>
              </div>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  aria-label="Close full screen preview"
                  className="h-10 w-10 shrink-0 border border-border/70 bg-background/55 text-foreground/75 backdrop-blur-xl hover:bg-muted/60 hover:text-foreground"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
            <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6">
              <div className="relative flex min-h-full items-center justify-center rounded-[1.5rem] border border-border/70 bg-transparent p-6 sm:p-10">
                {example.preview}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}

function ComponentPreviewShell({ doc }: { doc: DocItem }) {
  return (
    <ComponentExample
      example={{
        id: doc.id,
        title: `${doc.title} preview`,
        description: "A focused preview of the default component composition.",
        preview: <ComponentPreview id={doc.id} />,
        code: getPreviewCode(doc),
        previewClassName: "min-h-[24rem]",
      }}
    />
  );
}

export function ComponentPageTemplate({ doc, details }: ComponentPageProps & { details?: ComponentPageDetails }) {
  return (
    <div className="docs-component-page">
      <section id="overview" className="max-w-3xl">
        <Badge variant="secondary" className="rounded-full">{doc.group}</Badge>
        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">{doc.title}</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{doc.description}</p>
        {details?.summary ? <p className="mt-4 text-base leading-7 text-muted-foreground">{details.summary}</p> : null}
      </section>
      <section id="preview" className="mt-10 grid gap-10">
        {details?.examples?.length ? (
          details.examples.map((example) => (
            <ComponentExample key={example.id} command={doc.command} example={example} />
          ))
        ) : (
          <ComponentPreviewShell doc={doc} />
        )}
      </section>
      <section id="usage" className="mt-10 grid gap-4">
        {doc.importCode ? <><h2 className="text-2xl font-semibold">Import</h2><CodeBlock>{doc.importCode}</CodeBlock></> : null}
        {doc.command ? <><h2 className="text-2xl font-semibold">Registry</h2><CodeBlock>{doc.command}</CodeBlock></> : null}
      </section>
      {details ? (
        <section className="mt-10 grid gap-6">
          {details.anatomy?.length ? (
            <div className="grid gap-3">
              <h2 className="text-2xl font-semibold">Anatomy</h2>
              <DetailList items={details.anatomy} />
            </div>
          ) : null}
          {details.variants?.length ? (
            <div className="grid gap-3">
              <h2 className="text-2xl font-semibold">Variants</h2>
              <DetailTable columns={["Variant", "Behavior"]} rows={details.variants} />
            </div>
          ) : null}
          {details.sizes?.length ? (
            <div className="grid gap-3">
              <h2 className="text-2xl font-semibold">Sizes</h2>
              <DetailTable columns={["Size", "Use case"]} rows={details.sizes} />
            </div>
          ) : null}
          {details.props?.length ? (
            <div className="grid gap-3">
              <h2 className="text-2xl font-semibold">Props</h2>
              <PropsTable rows={details.props} />
            </div>
          ) : null}
          {details.accessibility?.length ? (
            <div className="grid gap-3">
              <h2 className="text-2xl font-semibold">Accessibility</h2>
              <DetailList items={details.accessibility} />
            </div>
          ) : null}
          {details.motion?.length ? (
            <div className="grid gap-3">
              <h2 className="text-2xl font-semibold">Motion</h2>
              <DetailList items={details.motion} />
            </div>
          ) : null}
          {details.tokens?.length ? (
            <div className="grid gap-3">
              <h2 className="text-2xl font-semibold">Tokens</h2>
              <div className="flex flex-wrap gap-2">
                {details.tokens.map((token) => (
                  <Badge key={token} variant="outline" className="rounded-full font-mono text-[0.68rem]">
                    {token}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
