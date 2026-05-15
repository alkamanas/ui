import * as React from "react";
import {
  AlignJustify,
  Bell,
  Boxes,
  Check,
  ChevronRight,
  Command as CommandIcon,
  FileJson,
  GalleryHorizontal,
  Grip,
  Menu,
  Moon,
  MoreHorizontal,
  PanelsTopLeft,
  Search,
  Settings,
  Sparkles,
  Terminal,
  Type,
  User,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPaletteProvider,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DirectionProvider,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FlipCard,
  FloatingPanel,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Kbd,
  Label,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  Slider,
  Spinner,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  toast,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useCommandPalette,
} from "@alkamanas/ui";

type DocItem = {
  id: string;
  title: string;
  description: string;
  group: "Sections" | "Components" | "Patterns" | "Registry";
  command?: string;
  importCode?: string;
};

const componentNames = [
  ["accordion", "Accordion", "Apple-style disclosure stack with soft height and opacity transitions."],
  ["alert-dialog", "Alert Dialog", "Modal confirmation flow for destructive or high-friction decisions."],
  ["avatar", "Avatar", "User image and fallback primitive."],
  ["badge", "Badge", "Compact status and metadata label."],
  ["breadcrumb", "Breadcrumb", "Hierarchical navigation trail."],
  ["button", "Button", "Action primitive with soft color transitions and no hover lift."],
  ["button-group", "Button Group", "Grouped actions with a shared pill surface."],
  ["card", "Card", "Glass-first content surface with solid and outline variants."],
  ["carousel", "Carousel", "Highlight rail inspired by Apple product story carousels."],
  ["checkbox", "Checkbox", "Binary selection control."],
  ["collapsible", "Collapsible", "Single disclosure region for progressive content."],
  ["combobox", "Combobox", "Searchable select built from Popover and Command."],
  ["command", "Command", "Composable command menu primitives."],
  ["context-menu", "Context Menu", "Right-click menu primitive."],
  ["dialog", "Dialog", "Modal surface for focused tasks."],
  ["direction", "Direction", "LTR/RTL scope provider."],
  ["drawer", "Drawer", "Bottom sheet style dialog surface."],
  ["dropdown-menu", "Dropdown Menu", "Anchored action menu."],
  ["input", "Input", "Large rounded input with soft focus border animation."],
  ["input-group", "Input Group", "Input with leading/trailing affordances."],
  ["input-otp", "Input OTP", "Segmented one-time-code input."],
  ["item", "Item", "Composable row for lists and command-like surfaces."],
  ["kbd", "Kbd", "Keyboard shortcut token."],
  ["label", "Label", "Accessible form label primitive."],
  ["menubar", "Menubar", "Desktop menu bar pattern."],
  ["popover", "Popover", "Anchored floating panel."],
  ["progress", "Progress", "Progress indicator with smooth value updates."],
  ["radio-group", "Radio Group", "Single-choice selection group."],
  ["scroll-area", "Scroll Area", "Styled scroll container."],
  ["select", "Select", "Accessible select menu."],
  ["separator", "Separator", "Visual divider."],
  ["sheet", "Sheet", "Apple-style centered detail surface with size variants."],
  ["sidebar", "Sidebar", "Application navigation shell."],
  ["slider", "Slider", "Range input control."],
  ["spinner", "Spinner", "Loading indicator."],
  ["switch", "Switch", "Boolean toggle control."],
  ["tabs", "Tabs", "Segmented content switcher inspired by Apple camera focal tabs."],
  ["textarea", "Textarea", "Multiline text input."],
  ["toast", "Toast", "Ephemeral notification surface."],
  ["toggle", "Toggle", "Two-state button primitive."],
  ["toggle-group", "Toggle Group", "Grouped toggle selection."],
  ["tooltip", "Tooltip", "Hover/focus helper surface."],
] as const;

const docs: DocItem[] = [
  {
    id: "introduction",
    title: "Introduction",
    group: "Sections",
    description: "Install, theme and compose Alkamanas UI in React web projects.",
  },
  {
    id: "components",
    title: "Components",
    group: "Sections",
    description: "Browse the component directory and open each component's examples.",
  },
  {
    id: "installation",
    title: "Installation",
    group: "Sections",
    description: "Add the package, styles and Tailwind source scanning.",
  },
  {
    id: "theming",
    title: "Theming",
    group: "Sections",
    description: "Use section-level light and dark scopes with Alkamanas tokens.",
  },
  {
    id: "cli",
    title: "CLI",
    group: "Sections",
    description: "Use the alka CLI skeleton for registry metadata and copy flows.",
  },
  ...componentNames.map(([id, title, description]) => ({
    id,
    title,
    description,
    group: "Components" as const,
    command: `npx alka add ${id}`,
    importCode: `import { ${title.replace(/\s+/g, "")} } from "@alkamanas/ui";`,
  })),
  {
    id: "flip-card",
    title: "Flip Card",
    group: "Patterns",
    description: "Visetra Web-style 3D rotateY card that can open into a viewport dialog.",
    command: "npx alka add flip-card",
    importCode: 'import { FlipCard } from "@alkamanas/ui";',
  },
  {
    id: "registry",
    title: "Registry",
    group: "Registry",
    description: "Agent-readable metadata for package and copy-paste usage.",
  },
];

const groupedDocs = docs.reduce<Record<DocItem["group"], DocItem[]>>(
  (groups, item) => {
    groups[item.group].push(item);
    return groups;
  },
  { Sections: [], Components: [], Patterns: [], Registry: [] },
);

const componentIds = new Set(docs.filter((item) => item.group === "Components" || item.group === "Patterns").map((item) => item.id));

function getInitialDoc() {
  if (typeof window === "undefined") return "components";
  return window.location.hash.replace("#", "") || "components";
}

function Brand() {
  return (
    <a href="#components" className="flex items-center gap-3 text-sm font-semibold tracking-tight text-foreground">
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
    <aside className="docs-glass-panel fixed bottom-4 left-4 top-4 z-30 hidden w-[264px] overflow-hidden rounded-2xl lg:flex lg:flex-col">
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
                <div className="space-y-0.5">
                  {items.map((item) => (
                    <a key={item.id} href={`#${item.id}`} data-active={activeId === item.id} className="docs-nav-item">
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
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

function Topbar({ activeTitle }: { activeTitle: string }) {
  return (
    <header className="docs-glass-panel sticky top-0 z-40 rounded-b-2xl border-x-0 border-t-0 lg:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        <Brand />
        <div className="flex items-center gap-2">
          <CommandButton />
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="border-t border-border/70 px-4 py-2 text-sm text-muted-foreground">{activeTitle}</div>
    </header>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#070707]/90 p-4 text-sm leading-6 text-white shadow-[0_18px_44px_rgba(0,0,0,0.28)]">
      <code>{children}</code>
    </pre>
  );
}

function PageChrome({ activeDoc, children }: { activeDoc: DocItem; children: React.ReactNode }) {
  return (
    <div className="theme-dark docs-shell text-foreground">
      <Topbar activeTitle={activeDoc.title} />
      <div className="relative z-10 min-h-dvh lg:pl-[296px]">
        <SidebarNav activeId={activeDoc.id} />
        <main className="min-w-0">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-8 md:px-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:px-10 lg:py-10">
            <article className="min-w-0">{children}</article>
            <aside className="hidden lg:block">
              <div className="docs-glass-panel sticky top-4 space-y-3 rounded-2xl p-4 text-sm">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground/70">
                  On This Page
                </p>
                <a href="#overview" className="block text-muted-foreground hover:text-foreground">Overview</a>
                <a href="#preview" className="block text-muted-foreground hover:text-foreground">Preview</a>
                <a href="#usage" className="block text-muted-foreground hover:text-foreground">Usage</a>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function DirectoryPage() {
  return (
    <div>
      <section id="overview" className="max-w-3xl">
        <Badge variant="secondary" className="rounded-full border-white/10 bg-white/[0.06] text-white/80">Directory</Badge>
        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
          Components Directory
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Soldaki floating panelden component seçip preview, import ve registry örneklerine geçebilirsin.
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

function AppleAccordionPreview() {
  return (
    <Accordion defaultValue="colors" className="max-w-3xl rounded-3xl border border-white/[0.08] bg-white/[0.035] px-6">
      {[
        ["colors", "Colors", "Choose from three bold finishes with a calm disclosure reveal."],
        ["aluminum-unibody", "Aluminum unibody", "Optimized for performance and battery with a soft detail transition."],
        ["ceramic-shield", "Ceramic Shield", "Durability copy opens without a jump or hard snap."],
      ].map(([value, title, body]) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>{body}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function AppleCarouselPreview() {
  return (
    <Carousel className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-4">
      <CarouselContent>
        {[
          ["Design", "Heat-forged aluminum unibody design for exceptional capability."],
          ["A19 Pro chip", "Vapor cooled performance with breakthrough battery life."],
          ["Camera system", "All 48MP Fusion rear cameras with the longest iPhone zoom."],
        ].map(([title, body]) => (
          <CarouselItem key={title}>
            <div className="min-h-[18rem] rounded-[1.75rem] bg-[#111] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.34)]">
              <GalleryHorizontal className="h-5 w-5 text-primary" />
              <h3 className="mt-16 text-3xl font-semibold">{title}</h3>
              <p className="mt-4 max-w-md text-muted-foreground">{body}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots className="mt-4" />
    </Carousel>
  );
}

function AppleTabsPreview() {
  return (
    <Tabs defaultValue="200" className="max-w-2xl">
      <TabsList className="h-12">
        {["200", "100", "48", "35", "28", "24", "13"].map((mm) => (
          <TabsTrigger key={mm} value={mm} className="rounded-full px-4">{mm} mm</TabsTrigger>
        ))}
      </TabsList>
      {["200", "100", "48", "35", "28", "24", "13"].map((mm) => (
        <TabsContent key={mm} value={mm} className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-8">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Focal length</p>
          <p className="mt-4 text-4xl font-semibold">{mm} mm</p>
          <p className="mt-3 text-muted-foreground">Content swaps with a restrained, soft tab transition.</p>
        </TabsContent>
      ))}
    </Tabs>
  );
}

function ComponentPreview({ id }: { id: string }) {
  if (id === "accordion") return <AppleAccordionPreview />;
  if (id === "carousel") return <AppleCarouselPreview />;
  if (id === "tabs") return <AppleTabsPreview />;
  if (id === "button") {
    return <div className="flex flex-wrap gap-3"><Button>Default</Button><Button variant="outline">Outline</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button></div>;
  }
  if (id === "button-group") {
    return <ButtonGroup><Button variant="ghost">Day</Button><Button variant="secondary">Week</Button><Button variant="ghost">Month</Button></ButtonGroup>;
  }
  if (id === "input") return <div className="grid max-w-xl gap-3"><Input placeholder="workspace-name" /><Input placeholder="studio.visetra.app" /></div>;
  if (id === "input-group") {
    return <InputGroup className="max-w-xl"><InputGroupAddon>https://</InputGroupAddon><InputGroupInput placeholder="studio.visetra.app" /><InputGroupAddon>.com</InputGroupAddon></InputGroup>;
  }
  if (id === "input-otp") {
    return <InputOTP maxLength={6}><InputOTPGroup>{[0, 1, 2].map((i) => <InputOTPSlot key={i} index={i} />)}<InputOTPSeparator />{[3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup></InputOTP>;
  }
  if (id === "card") {
    return <div className="grid gap-4 md:grid-cols-2"><Card><CardHeader><CardTitle>Glass default</CardTitle><CardDescription>Floating, blurred, token-driven surface.</CardDescription></CardHeader></Card><Card variant="solid"><CardHeader><CardTitle>Solid</CardTitle><CardDescription>Use inside dense content areas.</CardDescription></CardHeader></Card></div>;
  }
  if (id === "alert-dialog") {
    return <AlertDialog><AlertDialogTrigger asChild><Button variant="destructive">Delete project</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete project?</AlertDialogTitle><AlertDialogDescription>This action keeps the soft dialog motion but requires explicit confirmation.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>Continue</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>;
  }
  if (id === "avatar") return <Avatar><AvatarImage src="/assets/sectors/automotive-light.webp" /><AvatarFallback>VS</AvatarFallback></Avatar>;
  if (id === "badge") return <div className="flex gap-2"><Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="success">Success</Badge></div>;
  if (id === "breadcrumb") return <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#components">Components</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>;
  if (id === "checkbox") return <div className="flex items-center gap-3"><Checkbox id="preview-checkbox" defaultChecked /><Label htmlFor="preview-checkbox">Enable smooth motion</Label></div>;
  if (id === "collapsible") return <Collapsible><CollapsibleTrigger asChild><Button variant="outline">Toggle details</Button></CollapsibleTrigger><CollapsibleContent className="mt-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 text-sm text-muted-foreground">A compact disclosure region.</CollapsibleContent></Collapsible>;
  if (id === "combobox") return <Combobox options={[{ value: "studio", label: "Visetra Studio" }, { value: "web", label: "Visetra Web" }, { value: "ui", label: "Alkamanas UI" }]} />;
  if (id === "command") return <Command className="max-w-xl border border-white/[0.08]"><CommandInput placeholder="Search components..." /><CommandList><CommandEmpty>No results.</CommandEmpty><CommandGroup heading="Components"><CommandItem><Type className="h-4 w-4" />Input</CommandItem><CommandItem><PanelsTopLeft className="h-4 w-4" />Dialog</CommandItem></CommandGroup></CommandList></Command>;
  if (id === "context-menu") return <ContextMenu><ContextMenuTrigger className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-white/[0.14] text-sm text-muted-foreground">Right click</ContextMenuTrigger><ContextMenuContent><ContextMenuItem>Open</ContextMenuItem><ContextMenuItem>Duplicate</ContextMenuItem></ContextMenuContent></ContextMenu>;
  if (id === "dialog") return <Dialog><DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Dialog</DialogTitle><DialogDescription>Focused content with soft overlay motion.</DialogDescription></DialogHeader></DialogContent></Dialog>;
  if (id === "direction") return <DirectionProvider dir="rtl" className="max-w-md rounded-2xl border border-white/[0.08] p-4"><p className="text-sm">RTL scoped content</p></DirectionProvider>;
  if (id === "drawer") return <Drawer><DrawerTrigger asChild><Button>Open drawer</Button></DrawerTrigger><DrawerContent><DrawerHeader><DrawerTitle>Drawer</DrawerTitle><DrawerDescription>Bottom sheet motion.</DrawerDescription></DrawerHeader></DrawerContent></Drawer>;
  if (id === "dropdown-menu") return <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Open menu</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Profile</DropdownMenuItem><DropdownMenuItem>Settings</DropdownMenuItem></DropdownMenuContent></DropdownMenu>;
  if (id === "item") return <Item className="max-w-xl"><ItemMedia><User className="h-4 w-4" /></ItemMedia><ItemContent><ItemTitle>Visetra Studio</ItemTitle><ItemDescription>Workspace shell item</ItemDescription></ItemContent><ItemActions><Badge variant="secondary">Active</Badge></ItemActions></Item>;
  if (id === "kbd") return <div className="flex gap-2"><Kbd>⌘</Kbd><Kbd>K</Kbd></div>;
  if (id === "label") return <div className="grid max-w-sm gap-2"><Label htmlFor="label-preview">Workspace</Label><Input id="label-preview" placeholder="visetra" /></div>;
  if (id === "menubar") return <Menubar><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem>New</MenubarItem><MenubarItem>Save</MenubarItem></MenubarContent></MenubarMenu></Menubar>;
  if (id === "popover") return <Popover><PopoverTrigger asChild><Button variant="outline">Open popover</Button></PopoverTrigger><PopoverContent><p className="text-sm text-muted-foreground">Floating content surface.</p></PopoverContent></Popover>;
  if (id === "progress") return <Progress value={62} className="max-w-xl" />;
  if (id === "radio-group") return <RadioGroup defaultValue="studio" className="grid gap-3"><div className="flex items-center gap-3"><RadioGroupItem value="studio" id="studio" /><Label htmlFor="studio">Studio</Label></div><div className="flex items-center gap-3"><RadioGroupItem value="web" id="web" /><Label htmlFor="web">Web</Label></div></RadioGroup>;
  if (id === "scroll-area") return <ScrollArea className="h-36 max-w-xl rounded-2xl border border-white/[0.08] p-4"><div className="space-y-3">{componentNames.slice(0, 12).map(([, title]) => <p key={title} className="text-sm text-muted-foreground">{title}</p>)}</div></ScrollArea>;
  if (id === "select") return <Select><SelectTrigger className="max-w-sm"><SelectValue placeholder="Select product" /></SelectTrigger><SelectContent><SelectItem value="studio">Visetra Studio</SelectItem><SelectItem value="web">Visetra Web</SelectItem></SelectContent></Select>;
  if (id === "separator") return <div className="max-w-xl"><p>Before</p><Separator className="my-4" /><p>After</p></div>;
  if (id === "sheet") return <Sheet><SheetTrigger asChild><Button>Immerse yourself</Button></SheetTrigger><SheetContent size="lg"><SheetHeader><SheetTitle className="text-3xl sm:text-5xl">Ultra Retina XDR.</SheetTitle><SheetDescription>The centered sheet opens as a focused detail surface with a detached close control, inspired by Apple product deep dives.</SheetDescription></SheetHeader><div className="mt-6 grid gap-4 md:grid-cols-3"><Card className="bg-white/[0.035]"><CardHeader><CardTitle>sm</CardTitle><CardDescription>Compact detail surface.</CardDescription></CardHeader></Card><Card className="bg-white/[0.035]"><CardHeader><CardTitle>md</CardTitle><CardDescription>Default documentation size.</CardDescription></CardHeader></Card><Card className="bg-white/[0.035]"><CardHeader><CardTitle>lg / xl</CardTitle><CardDescription>Immersive product content.</CardDescription></CardHeader></Card></div><SheetFooter className="mt-8"><Button variant="secondary">Compare sizes</Button><Button>Continue</Button></SheetFooter></SheetContent></Sheet>;
  if (id === "sidebar") return <div className="h-[22rem] overflow-hidden rounded-3xl border border-white/[0.08]"><SidebarProvider><Sidebar variant="floating" collapsible="icon"><SidebarHeader><SidebarTrigger /></SidebarHeader><SidebarContent><SidebarGroup><SidebarGroupLabel>Workspace</SidebarGroupLabel><SidebarGroupContent><SidebarMenu><SidebarMenuItem><SidebarMenuButton isActive><Boxes /> Components</SidebarMenuButton></SidebarMenuItem><SidebarMenuItem><SidebarMenuButton><Settings /> Settings</SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarGroupContent></SidebarGroup></SidebarContent></Sidebar></SidebarProvider></div>;
  if (id === "slider") return <Slider defaultValue={[42]} max={100} step={1} className="max-w-xl" />;
  if (id === "spinner") return <Spinner size="lg" />;
  if (id === "switch") return <div className="flex items-center gap-3"><Switch id="switch-preview" defaultChecked /><Label htmlFor="switch-preview">Live preview</Label></div>;
  if (id === "textarea") return <Textarea className="max-w-xl" placeholder="Write a note..." />;
  if (id === "toast") return <Button onClick={() => toast("Component saved", { description: "Toast uses the shared dark surface." })}>Show toast</Button>;
  if (id === "toggle") return <Toggle variant="outline" aria-label="Toggle bold"><AlignJustify className="h-4 w-4" /></Toggle>;
  if (id === "toggle-group") return <ToggleGroup defaultValue="center"><ToggleGroupItem value="left">Left</ToggleGroupItem><ToggleGroupItem value="center">Center</ToggleGroupItem><ToggleGroupItem value="right">Right</ToggleGroupItem></ToggleGroup>;
  if (id === "tooltip") return <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="outline">Hover</Button></TooltipTrigger><TooltipContent>Tooltip content</TooltipContent></Tooltip></TooltipProvider>;
  if (id === "flip-card") {
    return <div className="alka-theme-dark rounded-3xl bg-[#050505] p-6 text-white"><FlipCard expandToViewport eyebrow="Ağır yük & süreklilik" title="Lastik Sanayi" description="Kart kendi konumundan çıkarak viewport dialog'a büyür." image="/assets/sectors/tire-light.webp" minHeightClassName="min-h-[20rem]" /></div>;
  }
  return <div className="rounded-2xl border border-dashed border-white/[0.12] p-8 text-sm text-muted-foreground">Preview is available through the exported primitive API.</div>;
}

function ComponentPage({ doc }: { doc: DocItem }) {
  return (
    <div>
      <section id="overview" className="max-w-3xl">
        <Badge variant="secondary" className="rounded-full">{doc.group}</Badge>
        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">{doc.title}</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{doc.description}</p>
      </section>
      <section id="preview" className="mt-10">
        <Card variant="solid">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Examples use the shared smooth motion standard: calm easing, restrained opacity and no abrupt jumps.</CardDescription>
          </CardHeader>
          <CardContent><ComponentPreview id={doc.id} /></CardContent>
        </Card>
      </section>
      <section id="usage" className="mt-10 grid gap-4">
        {doc.importCode ? <><h2 className="text-2xl font-semibold">Import</h2><CodeBlock>{doc.importCode}</CodeBlock></> : null}
        {doc.command ? <><h2 className="text-2xl font-semibold">Registry</h2><CodeBlock>{doc.command}</CodeBlock></> : null}
      </section>
    </div>
  );
}

function SectionPage({ doc }: { doc: DocItem }) {
  const iconMap: Record<string, React.ReactNode> = {
    installation: <Terminal className="h-5 w-5" />,
    theming: <Moon className="h-5 w-5" />,
    cli: <FileJson className="h-5 w-5" />,
    registry: <Boxes className="h-5 w-5" />,
  };

  return (
    <div>
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
            <CodeBlock>{doc.id === "theming" ? `<section className="alka-theme-dark" data-navbar-theme="dark" />` : `npm install @alkamanas/ui\nimport "@alkamanas/ui/styles.css";`}</CodeBlock>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default function App() {
  const [activeId, setActiveId] = React.useState(getInitialDoc);

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

  const activeDoc = docs.find((item) => item.id === activeId) ?? docs[0];

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
      <PageChrome activeDoc={activeDoc}>
        {activeDoc.id === "components" ? <DirectoryPage /> : componentIds.has(activeDoc.id) ? <ComponentPage doc={activeDoc} /> : <SectionPage doc={activeDoc} />}
        <Separator className="my-12" />
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>Built from Visetra Studio primitives with Apple-inspired smooth interaction references.</span>
          <a className="hover:text-foreground" href="#registry">Registry metadata</a>
        </div>
      </PageChrome>
    </CommandPaletteProvider>
  );
}
