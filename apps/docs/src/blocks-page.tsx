import * as React from "react";
import { Bell, Boxes, Check, MoreHorizontal, PanelsTopLeft, Settings, Sparkles, Terminal } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardTitle, Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious, Checkbox, Combobox, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, FlipCard, GlassElementLayers, Input, InputGroup, InputGroupAddon, InputGroupInput, Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle, Kbd, Label, LiquidGlassFilter, Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger, Popover, PopoverContent, PopoverTrigger, Progress, RadioGroup, RadioGroupItem, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SectionAwareNavbar, Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger, Slider, Switch, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, toast, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, useSidebar } from "@alkamanas/ui";

import { getPrimaryThemeStyle, PrimaryColorSwitcher, type BorderAnimationColorId, type GlassEffectId, type PrimaryThemeId, type SurfaceGradientColorId } from "./docs-theme";

function BlockFrame({
  id,
  eyebrow,
  title,
  description,
  components,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  components: string[];
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 rounded-3xl border border-white/[0.08] bg-transparent p-4 sm:p-5">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Badge variant="secondary" className="rounded-full border-white/[0.08] bg-white/[0.04] text-white/76">
            {eyebrow}
          </Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-normal sm:text-3xl">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {components.map((component) => (
            <Badge key={component} variant="outline" className="rounded-full border-white/[0.08] bg-transparent text-muted-foreground">
              {component}
            </Badge>
          ))}
        </div>
      </div>
      {children}
    </section>
  );
}

function SidebarExternalTrigger({ className, inline = false }: { className?: string; inline?: boolean }) {
  const { state } = useSidebar();

  return (
    <SidebarTrigger
      style={
        inline
          ? {
              transition:
                "transform var(--alka-motion-smooth) var(--alka-ease-smooth), background var(--alka-motion-normal) var(--alka-ease-smooth), border-color var(--alka-motion-normal) var(--alka-ease-smooth)",
            }
          : {
              left:
                state === "collapsed"
                  ? "calc(var(--sidebar-width-icon) + 3.625rem)"
                  : "calc(var(--sidebar-width) + 2.5rem)",
              transition:
                "left var(--alka-motion-smooth) var(--alka-ease-smooth), transform var(--alka-motion-smooth) var(--alka-ease-smooth), background var(--alka-motion-normal) var(--alka-ease-smooth), border-color var(--alka-motion-normal) var(--alka-ease-smooth)",
            }
      }
      className={[
        inline
          ? "relative z-10 shrink-0 border border-white/[0.1] bg-white/[0.045] shadow-[0_12px_28px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-[transform,background,border-color] duration-[var(--alka-motion-smooth)] ease-[var(--alka-ease-smooth)] hover:bg-white/[0.07]"
          : "absolute top-5 z-30 border border-white/[0.1] bg-white/[0.045] shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-[left,transform,background,border-color] duration-[var(--alka-motion-smooth)] ease-[var(--alka-ease-smooth)] hover:bg-white/[0.07]",
        className,
      ].filter(Boolean).join(" ")}
    />
  );
}

function SidebarBrandRow({ label }: { label: string }) {
  return (
    <div className="flex h-12 w-full min-w-0 items-center gap-2 overflow-hidden rounded-3xl px-2 text-sm font-semibold transition-[height,padding,gap,border-radius,justify-content] duration-[var(--alka-motion-smooth)] ease-[var(--alka-ease-smooth)] group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 transition-[width,height,border-radius] duration-[var(--alka-motion-smooth)] ease-[var(--alka-ease-smooth)] group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:rounded-[24px]">
        <span className="h-3 w-3 rounded-full bg-primary transition-[width,height] duration-[var(--alka-motion-smooth)] ease-[var(--alka-ease-smooth)] group-data-[collapsible=icon]:h-4 group-data-[collapsible=icon]:w-4" />
      </span>
      <span className="alka-sidebar-brand-label min-w-0 truncate">
        {label}
      </span>
    </div>
  );
}

function WorkspaceShellBlock() {
  const [dashboardTab, setDashboardTab] = React.useState("health");
  const contentColumnRef = React.useRef<HTMLDivElement | null>(null);
  const [shellHeight, setShellHeight] = React.useState<number | null>(null);

  const measureShellHeight = React.useCallback(() => {
    const contentColumn = contentColumnRef.current;
    if (!contentColumn) return;

    setShellHeight(Math.max(512, Math.ceil(contentColumn.scrollHeight)));
  }, []);

  React.useLayoutEffect(() => {
    measureShellHeight();
  }, [dashboardTab, measureShellHeight]);

  React.useLayoutEffect(() => {
    const contentColumn = contentColumnRef.current;
    if (!contentColumn || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(measureShellHeight);
    observer.observe(contentColumn);
    Array.from(contentColumn.children).forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [measureShellHeight]);

  return (
    <BlockFrame
      id="blocks-dashboard"
      eyebrow="Operational shell"
      title="Workspace overview block"
      description="A dense dashboard block for checking navigation, cards, tabs, select, combobox, progress, slider and switch behavior together."
      components={["Sidebar", "Card", "Tabs", "Select", "Combobox", "Progress", "Slider", "Switch"]}
    >
      <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-transparent p-3">
        <SidebarProvider
          className="relative min-h-[32rem] transition-[height] duration-[var(--alka-motion-smooth)] ease-[var(--alka-ease-smooth)]"
          style={{
            "--sidebar-width": "15rem",
            "--sidebar-width-icon": "4.25rem",
            height: shellHeight ? `${shellHeight}px` : undefined,
          } as React.CSSProperties}
        >
          <div className="grid h-full w-full gap-4 lg:grid-cols-[auto_minmax(0,1fr)]">
            <Sidebar position="relative" collapsible="icon" variant="floating" className="hidden p-0 lg:flex">
              <SidebarHeader>
                <SidebarBrandRow label="Studio" />
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive tooltip="Overview"><Boxes /> Overview</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Blocks"><PanelsTopLeft /> Blocks</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Settings"><Settings /> Settings</SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarRail />
            </Sidebar>
            <div ref={contentColumnRef} className="min-w-0 space-y-4">
              <div className="alka-liquid-glass flex flex-col gap-3 rounded-[2rem] border border-white/[0.08] px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:rounded-full">
                <GlassElementLayers />
                <div className="flex min-w-0 items-center gap-3">
                  <SidebarExternalTrigger inline className="hidden lg:inline-flex" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem><BreadcrumbLink href="#blocks">Blocks</BreadcrumbLink></BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem><BreadcrumbPage>Workspace overview</BreadcrumbPage></BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Combobox size="sm" surface="bare" className="w-full sm:w-48" options={[{ value: "studio", label: "Visetra Studio" }, { value: "web", label: "Visetra Web" }, { value: "ui", label: "Alkamanas UI" }]} />
                  <Select>
                    <SelectTrigger size="sm" surface="bare" className="w-full sm:w-40"><SelectValue placeholder="Cycle" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Tabs value={dashboardTab} onValueChange={setDashboardTab} className="w-full">
                <TabsList>
                  <TabsTrigger value="health">Health</TabsTrigger>
                  <TabsTrigger value="traffic">Traffic</TabsTrigger>
                  <TabsTrigger value="quality">Quality</TabsTrigger>
                </TabsList>
                <TabsContent value="health" className="mt-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      ["Uptime", "99.98%", 88],
                      ["Pipeline", "42 runs", 64],
                      ["Latency", "82 ms", 46],
                    ].map(([label, value, progress]) => (
                      <Card key={label}>
                        <CardHeader>
                          <CardDescription>{label}</CardDescription>
                          <CardTitle className="text-3xl">{value}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Progress value={Number(progress)} />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="traffic" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Traffic shaping</CardTitle>
                      <CardDescription>Slider and switch are tested inside a real control surface.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-5">
                      <Slider defaultValue={[42]} max={100} step={1} />
                      <div className="flex items-center justify-between gap-4">
                        <Label htmlFor="traffic-live">Live preview</Label>
                        <Switch id="traffic-live" defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="quality" className="mt-4">
                  <div className="grid gap-3">
                    <Item>
                      <ItemMedia><Check className="h-4 w-4" /></ItemMedia>
                      <ItemContent>
                        <ItemTitle>Design tokens synced</ItemTitle>
                        <ItemDescription>Section scopes and component tokens are active.</ItemDescription>
                      </ItemContent>
                      <ItemActions><Badge variant="success">Ready</Badge></ItemActions>
                    </Item>
                    <Item>
                      <ItemMedia><Bell className="h-4 w-4" /></ItemMedia>
                      <ItemContent>
                        <ItemTitle>Motion audit</ItemTitle>
                        <ItemDescription>Interactive states use the shared smooth motion tokens.</ItemDescription>
                      </ItemContent>
                      <ItemActions><Badge variant="secondary">Queued</Badge></ItemActions>
                    </Item>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </BlockFrame>
  );
}

function LaunchFormBlock() {
  return (
    <BlockFrame
      id="blocks-forms"
      eyebrow="Product form"
      title="Launch settings block"
      description="A form-heavy block for testing input animation, select and combobox close motion, grouped buttons, radio controls, checkboxes and modal triggers."
      components={["Input", "Input Group", "Button Group", "Radio Group", "Checkbox", "Sheet", "Dialog", "Alert Dialog"]}
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="rounded-3xl border border-white/[0.08] p-4 sm:p-5">
          <div className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="block-name">Project name</Label>
                <Input id="block-name" variant="pill" placeholder="visetra-studio" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="block-domain">Domain</Label>
                <InputGroup>
                  <InputGroupAddon>https://</InputGroupAddon>
                  <InputGroupInput id="block-domain" placeholder="studio.visetra.app" />
                  <InputGroupAddon>.com</InputGroupAddon>
                </InputGroup>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Combobox surface="flat" options={[{ value: "automotive", label: "Automotive" }, { value: "tire", label: "Tire industry" }, { value: "manufacturing", label: "Manufacturing" }]} placeholder="Select industry" />
              <Select>
                <SelectTrigger surface="flat"><SelectValue placeholder="Deployment region" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="eu">Europe</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="tr">Turkey</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Textarea placeholder="Release notes..." />

            <div className="grid gap-4 md:grid-cols-2">
              <RadioGroup defaultValue="production" className="grid gap-3">
                <div className="flex items-center gap-3"><RadioGroupItem value="preview" id="block-preview" /><Label htmlFor="block-preview">Preview</Label></div>
                <div className="flex items-center gap-3"><RadioGroupItem value="production" id="block-production" /><Label htmlFor="block-production">Production</Label></div>
              </RadioGroup>
              <div className="grid gap-3">
                <div className="flex items-center gap-3"><Checkbox id="block-check-a" defaultChecked /><Label htmlFor="block-check-a">Enable analytics</Label></div>
                <div className="flex items-center gap-3"><Checkbox id="block-check-b" /><Label htmlFor="block-check-b">Require review</Label></div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
              <ButtonGroup>
                <Button variant="secondary">Draft</Button>
                <Button variant="ghost">Preview</Button>
                <Button variant="ghost">Publish</Button>
              </ButtonGroup>
              <div className="flex flex-wrap gap-2">
                <Dialog>
                  <DialogTrigger asChild><Button variant="outline">Review</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Review launch</DialogTitle>
                      <DialogDescription>This dialog uses the same glass surface and smooth modal motion as component previews.</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Sheet>
                  <SheetTrigger asChild><Button>Open sheet</Button></SheetTrigger>
                  <SheetContent size="md">
                    <SheetHeader>
                      <SheetTitle>Launch checklist</SheetTitle>
                      <SheetDescription>Sheet sizing and close behavior can be tested from this real block.</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 grid gap-3">
                      <Item><ItemContent><ItemTitle>Content approved</ItemTitle><ItemDescription>Marketing copy and images are ready.</ItemDescription></ItemContent><ItemActions><Badge variant="success">Done</Badge></ItemActions></Item>
                      <Item><ItemContent><ItemTitle>Billing enabled</ItemTitle><ItemDescription>Workspace subscription is active.</ItemDescription></ItemContent><ItemActions><Badge variant="secondary">Soon</Badge></ItemActions></Item>
                    </div>
                    <SheetFooter className="mt-6"><Button>Continue</Button></SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Risk actions</CardTitle>
            <CardDescription>Alert dialog, popover and toast checks.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Popover>
              <PopoverTrigger asChild><Button variant="outline">Open popover</Button></PopoverTrigger>
              <PopoverContent>
                <p className="text-sm text-muted-foreground">Popover is rendered inside the launch form block.</p>
              </PopoverContent>
            </Popover>
            <AlertDialog>
              <AlertDialogTrigger asChild><Button variant="destructive">Delete draft</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this draft?</AlertDialogTitle>
                  <AlertDialogDescription>This tests alert dialog centering and close motion from a composed block.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button variant="secondary" onClick={() => toast("Draft saved", { description: "Toast triggered from the launch block." })}>Show toast</Button>
          </CardContent>
        </Card>
      </div>
    </BlockFrame>
  );
}

function StorytellingBlock() {
  return (
    <BlockFrame
      id="blocks-marketing"
      eyebrow="Marketing surface"
      title="Sector story block"
      description="A visual block for testing carousel paging, accordion disclosure, flip-card expansion and tabs in a real page composition."
      components={["Carousel", "Accordion", "Flip Card", "Tabs", "Badge"]}
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <Carousel>
          <CarouselContent>
            {[1, 2, 3, 4].map((number) => (
              <CarouselItem key={number}>
                <Card className="flex min-h-[20rem] items-center justify-center rounded-3xl p-0">
                  <span className="text-7xl font-semibold tabular-nums text-foreground">{number}</span>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselDots className="mt-4" />
        </Carousel>

        <div className="grid gap-4">
          <FlipCard
            expandToViewport
            eyebrow="Heavy load and uptime"
            title="Industrial Tire"
            description="A production-style sector card tested inside a real block composition."
            image="/assets/sectors/tire-light.webp"
            minHeightClassName="min-h-[18rem]"
          />
          <Accordion type="single" collapsible defaultValue="motion">
            <AccordionItem value="motion">
              <AccordionTrigger>Smooth motion</AccordionTrigger>
              <AccordionContent>Disclosure state can be tested next to carousel and flip-card motion.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="theme">
              <AccordionTrigger>Dark section</AccordionTrigger>
              <AccordionContent>The whole page keeps the dark section scope active.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </BlockFrame>
  );
}

function CommandSurfaceBlock() {
  return (
    <BlockFrame
      id="blocks-command"
      eyebrow="Interaction lab"
      title="Command and menu block"
      description="A compact block for validating command items, context menu glass, dropdown menus, tooltips, menubar and keyboard tokens together."
      components={["Command", "Context Menu", "Dropdown Menu", "Tooltip", "Menubar", "Kbd"]}
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Command>
          <CommandInput placeholder="Search workspace actions..." />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem><Sparkles className="h-4 w-4" />Generate block</CommandItem>
              <CommandItem><PanelsTopLeft className="h-4 w-4" />Open component preview</CommandItem>
              <CommandItem><Terminal className="h-4 w-4" />Run registry check</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="grid gap-4">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New block</MenubarItem>
                <MenubarItem>Export</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <ContextMenu>
            <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-3xl border border-dashed border-white/[0.14] text-sm text-muted-foreground">
              Right click actions
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Duplicate block</ContextMenuItem>
              <ContextMenuItem>Copy JSX</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">Menu</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Inspect</DropdownMenuItem>
                <DropdownMenuItem>Reset state</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild><Button variant="secondary" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TooltipTrigger>
                <TooltipContent>More actions</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </div>
        </div>
      </div>
    </BlockFrame>
  );
}

function BlocksTopNav({ glassEffect }: { glassEffect: GlassEffectId }) {
  return (
    <SectionAwareNavbar
      brand={
        <span className="flex items-center gap-3 text-sm font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10">
            <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_24px_hsl(var(--primary)_/_0.55)]" />
          </span>
          <span className="leading-none">Alkamanas UI</span>
        </span>
      }
      theme="dark"
      syncThemeMeta={false}
      glassEffect={glassEffect}
      glassRealisticStrategy="premium"
      links={[
        { href: "#blocks", label: "Blocks" },
        { href: "#components", label: "Components" },
        { href: "#installation", label: "Docs" },
        { href: "#registry", label: "Registry" },
      ]}
      cta={{ href: "#components", label: "View Components" }}
    />
  );
}

export function BlocksPage({
  primaryTheme,
  onPrimaryThemeChange,
  borderAnimationColor,
  onBorderAnimationColorChange,
  surfaceGradientColor,
  onSurfaceGradientColorChange,
  glassEffect,
  onGlassEffectChange,
  routeMotion,
  routeKey,
}: {
  primaryTheme: PrimaryThemeId;
  onPrimaryThemeChange: (value: PrimaryThemeId) => void;
  borderAnimationColor: BorderAnimationColorId;
  onBorderAnimationColorChange: (value: BorderAnimationColorId) => void;
  surfaceGradientColor: SurfaceGradientColorId;
  onSurfaceGradientColorChange: (value: SurfaceGradientColorId) => void;
  glassEffect: GlassEffectId;
  onGlassEffectChange: (value: GlassEffectId) => void;
  routeMotion: "enter" | "exit";
  routeKey: string;
}) {
  return (
    <div id="blocks" className="theme-dark docs-shell min-h-dvh text-foreground" data-border-animation-color={borderAnimationColor} data-glass-effect="blurry" data-surface-gradient-color={surfaceGradientColor} style={getPrimaryThemeStyle(primaryTheme)}>
      <LiquidGlassFilter />
      <BlocksTopNav glassEffect={glassEffect} />
      <PrimaryColorSwitcher
        value={primaryTheme}
        onChange={onPrimaryThemeChange}
        borderAnimationColor={borderAnimationColor}
        onBorderAnimationColorChange={onBorderAnimationColorChange}
        surfaceGradientColor={surfaceGradientColor}
        onSurfaceGradientColorChange={onSurfaceGradientColorChange}
        glassEffect={glassEffect}
        onGlassEffectChange={onGlassEffectChange}
        className="fixed bottom-4 right-4 z-40 w-[min(92vw,20rem)] lg:bottom-auto lg:top-28"
      />
      <main
        key={routeKey}
        className="docs-apple-motion-page relative z-10 mx-auto max-w-[1440px] px-4 pb-14 pt-28 sm:px-6 lg:px-8"
        data-route-motion={routeMotion}
      >
        <section id="overview" className="max-w-4xl">
          <Badge variant="secondary" className="rounded-full border-white/10 bg-white/[0.06] text-white/80">Blocks</Badge>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-6xl">
            Building blocks for Alkamanas interfaces.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            A block gallery separate from the component directory. Every example is composed from real `@alkamanas/ui` components so hover, focus, close motion, glass surfaces and responsive behavior can be tested together.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild><a href="#components">View Components</a></Button>
            <Button variant="outline" asChild><a href="#blocks-dashboard">Browse Blocks</a></Button>
          </div>
        </section>

        <section className="mt-10 flex flex-wrap gap-2">
          {[
            ["Featured", "#blocks-dashboard"],
            ["Dashboard", "#blocks-dashboard"],
            ["Forms", "#blocks-forms"],
            ["Marketing", "#blocks-marketing"],
            ["Command", "#blocks-command"],
          ].map(([label, href]) => (
            <Button key={label} variant="secondary" size="sm" asChild>
              <a href={href}>{label}</a>
            </Button>
          ))}
        </section>

        <section id="preview" className="mt-8 grid gap-6">
          <WorkspaceShellBlock />
          <LaunchFormBlock />
          <StorytellingBlock />
          <CommandSurfaceBlock />
        </section>
      </main>
    </div>
  );
}
