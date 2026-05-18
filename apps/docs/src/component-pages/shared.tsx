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

function ComponentPreviewShell({ doc }: { doc: DocItem }) {
  const [fullscreenOpen, setFullscreenOpen] = React.useState(false);

  return (
    <>
      <Tabs key={doc.id} defaultValue="preview" className="w-full">
        <div className="mb-3 flex items-center justify-between gap-3">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] text-muted-foreground sm:inline-flex">
              {doc.command}
            </Badge>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label={`${doc.title} preview tam ekran aç`}
              onClick={() => setFullscreenOpen(true)}
              className="h-10 w-10 border border-white/[0.1] bg-black/35 text-white/80 shadow-[0_16px_34px_rgba(0,0,0,0.28)] backdrop-blur-xl hover:bg-white/[0.08] hover:text-white"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <TabsContent value="preview" className="mt-0">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-transparent">
            <div className="relative flex min-h-[24rem] items-center justify-center p-6 sm:p-10">
              <ComponentPreview id={doc.id} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="code" className="mt-0">
          <CodeBlock>{getPreviewCode(doc)}</CodeBlock>
        </TabsContent>
      </Tabs>

      <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
        <DialogContent
          showCloseButton={false}
          className="h-[calc(100dvh-1.25rem)] max-h-[calc(100dvh-1.25rem)] max-w-[calc(100vw-1.25rem)] gap-0 overflow-hidden rounded-[2rem] p-0 sm:h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-2rem)] sm:max-w-[calc(100vw-2rem)]"
        >
          <div className="relative flex h-full min-h-0 flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <DialogTitle className="truncate text-sm font-semibold tracking-normal sm:text-base">
                  {doc.title} preview
                </DialogTitle>
                <DialogDescription className="mt-1 hidden text-xs text-muted-foreground sm:block">
                  Full screen component preview
                </DialogDescription>
              </div>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  aria-label="Tam ekran preview kapat"
                  className="h-10 w-10 shrink-0 border border-white/[0.1] bg-white/[0.055] text-white/78 backdrop-blur-xl hover:bg-white/[0.09] hover:text-white"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
            <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6">
              <div className="relative flex min-h-full items-center justify-center rounded-[1.5rem] border border-white/[0.08] bg-transparent p-6 sm:p-10">
                <ComponentPreview id={doc.id} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ComponentPageTemplate({ doc }: ComponentPageProps) {
  return (
    <div>
      <section id="overview" className="max-w-3xl">
        <Badge variant="secondary" className="rounded-full">{doc.group}</Badge>
        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">{doc.title}</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{doc.description}</p>
      </section>
      <section id="preview" className="mt-10">
        <ComponentPreviewShell doc={doc} />
      </section>
      <section id="usage" className="mt-10 grid gap-4">
        {doc.importCode ? <><h2 className="text-2xl font-semibold">Import</h2><CodeBlock>{doc.importCode}</CodeBlock></> : null}
        {doc.command ? <><h2 className="text-2xl font-semibold">Registry</h2><CodeBlock>{doc.command}</CodeBlock></> : null}
      </section>
    </div>
  );
}
