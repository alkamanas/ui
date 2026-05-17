import * as React from "react";
import {
  AlignJustify,
  Bell,
  Boxes,
  Check,
  ChevronRight,
  Command as CommandIcon,
  FileJson,
  Maximize2,
  Menu,
  Minimize2,
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
  DialogClose,
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
  GlassElementLayers,
  LiquidGlassFilter,
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
  SectionAwareNavbar,
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
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
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
  useSidebar,
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
  ["navbar", "Navbar", "Section-aware navigation with liquid glass panel and mobile reveal motion."],
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
    command: id === "navbar" ? "npx alka add section-aware-navbar" : `npx alka add ${id}`,
    importCode:
      id === "navbar"
        ? 'import { SectionAwareNavbar } from "@alkamanas/ui";'
        : `import { ${title.replace(/\s+/g, "")} } from "@alkamanas/ui";`,
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
const blockPageIds = new Set(["blocks", "blocks-dashboard", "blocks-forms", "blocks-marketing", "blocks-command"]);

type PrimaryThemeId = "white" | "visetra" | "red" | "blue" | "turquoise" | "green" | "purple";
type GlassEffectId = "blurry" | "realistic";
type BorderAnimationColorId = "primary" | "contrast";
type SurfaceGradientColorId = "primary" | "contrast";

const primaryThemeOptions: Record<PrimaryThemeId, {
  label: string;
  primary: string;
  primaryForeground: string;
  swatch: string;
}> = {
  white: {
    label: "Beyaz",
    primary: "0 0% 100%",
    primaryForeground: "0 0% 2%",
    swatch: "#ffffff",
  },
  visetra: {
    label: "Visetra Gold",
    primary: "41 39% 59%",
    primaryForeground: "0 0% 2%",
    swatch: "#c0a46d",
  },
  red: {
    label: "Kırmızı",
    primary: "5 100% 50%",
    primaryForeground: "0 0% 100%",
    swatch: "#ff1200",
  },
  blue: {
    label: "Mavi",
    primary: "221 83% 53%",
    primaryForeground: "0 0% 100%",
    swatch: "#2563eb",
  },
  turquoise: {
    label: "Turkuaz",
    primary: "187 92% 45%",
    primaryForeground: "0 0% 2%",
    swatch: "#06b6d4",
  },
  green: {
    label: "Yeşil",
    primary: "142 71% 45%",
    primaryForeground: "0 0% 2%",
    swatch: "#22c55e",
  },
  purple: {
    label: "Mor",
    primary: "258 90% 66%",
    primaryForeground: "0 0% 100%",
    swatch: "#8b5cf6",
  },
};

function getPrimaryThemeStyle(theme: PrimaryThemeId): React.CSSProperties {
  const option = primaryThemeOptions[theme];

  return {
    "--alka-primary": option.primary,
    "--alka-primary-foreground": option.primaryForeground,
    "--primary": option.primary,
    "--primary-foreground": option.primaryForeground,
    "--alka-accent": option.primary,
    "--alka-accent-foreground": option.primaryForeground,
    "--accent": option.primary,
    "--accent-foreground": option.primaryForeground,
    "--alka-ring": option.primary,
    "--ring": option.primary,
    "--sidebar-primary": option.primary,
    "--sidebar-primary-foreground": option.primaryForeground,
  } as React.CSSProperties;
}

function getInitialDoc() {
  if (typeof window === "undefined") return "blocks";
  return window.location.hash.replace("#", "") || "blocks";
}

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

function PrimaryColorSwitcher({
  className,
  value,
  onChange,
  borderAnimationColor,
  onBorderAnimationColorChange,
  surfaceGradientColor,
  onSurfaceGradientColorChange,
  glassEffect,
  onGlassEffectChange,
}: {
  className?: string;
  value: PrimaryThemeId;
  onChange: (value: PrimaryThemeId) => void;
  borderAnimationColor: BorderAnimationColorId;
  onBorderAnimationColorChange: (value: BorderAnimationColorId) => void;
  surfaceGradientColor: SurfaceGradientColorId;
  onSurfaceGradientColorChange: (value: SurfaceGradientColorId) => void;
  glassEffect: GlassEffectId;
  onGlassEffectChange: (value: GlassEffectId) => void;
}) {
  const realisticModeId = React.useId();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div
      className={["docs-primary-switcher alka-liquid-glass rounded-3xl border p-3 text-sm", className].filter(Boolean).join(" ")}
      data-collapsed={isCollapsed ? "true" : undefined}
    >
      <GlassElementLayers />
      <div className="docs-primary-switcher-header mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-muted-foreground/70">
            Primary
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Color token</p>
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.1] bg-white/[0.04]">
          <Sparkles className="h-4 w-4 text-primary" />
        </span>
        <button
          type="button"
          aria-label={isCollapsed ? "Selector panelini göster" : "Selector panelini gizle"}
          aria-expanded={!isCollapsed}
          onClick={() => setIsCollapsed((current) => !current)}
          className="docs-primary-switcher-toggle grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-white/[0.1] bg-white/[0.04] text-muted-foreground transition-[background-color,border-color,color] duration-300 ease-[var(--alka-ease-smooth)] hover:border-primary/25 hover:bg-primary/10 hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(primaryThemeOptions) as PrimaryThemeId[]).map((key) => {
          const option = primaryThemeOptions[key];
          const isActive = value === key;

          return (
            <button
              key={key}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(key)}
              className={[
                "flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-3 text-left text-xs font-semibold transition-[background-color,border-color,color,box-shadow] duration-300 ease-[var(--alka-ease-smooth)]",
                isActive
                  ? "border-primary/30 bg-primary/[0.18] text-foreground shadow-[inset_0_1px_0_hsl(var(--primary)_/_0.16)]"
                  : "border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:border-primary/20 hover:bg-primary/10 hover:text-foreground"
              ].join(" ")}
            >
              <span
                className="h-4 w-4 shrink-0 rounded-full border border-white/20 shadow-[0_0_16px_hsl(var(--primary)_/_0.18)]"
                style={{ backgroundColor: option.swatch }}
              />
              <span className="min-w-0 truncate">{option.label}</span>
            </button>
          );
        })}
      </div>
      <Separator className="my-3 bg-white/[0.08]" />
      <div className="grid gap-3">
        <p className="px-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-muted-foreground/70">
          Border
        </p>
        <div className="grid grid-cols-2 gap-2">
          {([
            ["primary", "Primary"],
            ["contrast", "Contrast"],
          ] as const).map(([key, label]) => {
            const isActive = borderAnimationColor === key;

            return (
              <button
                key={key}
                type="button"
                aria-pressed={isActive}
                onClick={() => onBorderAnimationColorChange(key)}
                className={[
                  "flex min-h-10 cursor-pointer items-center justify-center rounded-full border px-3 text-xs font-semibold transition-[background-color,border-color,color] duration-300 ease-[var(--alka-ease-smooth)]",
                  isActive
                    ? "border-primary/30 bg-primary/[0.16] text-foreground"
                    : "border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:border-primary/20 hover:bg-primary/10 hover:text-foreground"
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>
        <p className="px-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-muted-foreground/70">
          Gradient
        </p>
        <div className="grid grid-cols-2 gap-2">
          {([
            ["primary", "Primary"],
            ["contrast", "Contrast"],
          ] as const).map(([key, label]) => {
            const isActive = surfaceGradientColor === key;

            return (
              <button
                key={key}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSurfaceGradientColorChange(key)}
                className={[
                  "flex min-h-10 cursor-pointer items-center justify-center rounded-full border px-3 text-xs font-semibold transition-[background-color,border-color,color] duration-300 ease-[var(--alka-ease-smooth)]",
                  isActive
                    ? "border-primary/30 bg-primary/[0.16] text-foreground"
                    : "border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:border-primary/20 hover:bg-primary/10 hover:text-foreground"
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <Separator className="my-3 bg-white/[0.08]" />
      <div className="flex items-center justify-between gap-4 rounded-[1.35rem] px-2 py-1.5">
        <Label htmlFor={realisticModeId} className="min-w-0 cursor-pointer">
          <span className="block text-xs font-semibold text-foreground">Realistic mode</span>
          <span className="mt-1 block text-[0.68rem] leading-4 text-muted-foreground">
            Chromatic glass effect
          </span>
        </Label>
        <Switch
          id={realisticModeId}
          checked={glassEffect === "realistic"}
          onCheckedChange={(checked) => onGlassEffectChange(checked ? "realistic" : "blurry")}
        />
      </div>
    </div>
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

function Topbar({ activeTitle }: { activeTitle: string }) {
  return (
    <header className="alka-liquid-glass sticky top-0 z-40 rounded-b-2xl border-x-0 border-t-0 lg:hidden">
      <GlassElementLayers />
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

const previewCodeById: Record<string, string> = {
  accordion: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@alkamanas/ui";

export function AccordionDemo() {
  return (
    <Accordion defaultValue="colors">
      <AccordionItem value="colors">
        <AccordionTrigger>Colors</AccordionTrigger>
        <AccordionContent>
          Choose from three bold finishes. Content fades in after the shell settles.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="aluminum">
        <AccordionTrigger>Aluminum unibody</AccordionTrigger>
        <AccordionContent>
          The item opens with the shared soft disclosure motion.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  "alert-dialog": `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@alkamanas/ui";

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            This action requires explicit confirmation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`,
  avatar: `import { Avatar, AvatarFallback, AvatarImage } from "@alkamanas/ui";

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="/assets/sectors/automotive-light.webp" />
      <AvatarFallback>VS</AvatarFallback>
    </Avatar>
  );
}`,
  badge: `import { Badge } from "@alkamanas/ui";

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
    </div>
  );
}`,
  breadcrumb: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@alkamanas/ui";

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`,
  button: `import { Button } from "@alkamanas/ui";

export function ButtonDemo() {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="glassPrimary">Primary glass</Button>
        <Button variant="glassDestructive">Destructive glass</Button>
        <Button variant="outline">Outline glass</Button>
      </div>
    </div>
  );
}`,
  "button-group": `import { Button, ButtonGroup } from "@alkamanas/ui";

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="ghost">Day</Button>
      <Button variant="secondary">Week</Button>
      <Button variant="ghost">Month</Button>
    </ButtonGroup>
  );
}`,
  card: `import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@alkamanas/ui";

export function CardDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Glass default</CardTitle>
          <CardDescription>Floating, blurred, token-driven surface.</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="solid">
        <CardHeader>
          <CardTitle>Solid</CardTitle>
          <CardDescription>Use inside dense content areas.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}`,
  carousel: `import {
  Card,
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@alkamanas/ui";

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-6xl">
      <CarouselContent className="px-12 sm:px-16">
        {[1, 2, 3, 4].map((number) => (
          <CarouselItem key={number} className="basis-[92%] md:basis-[84%] lg:basis-[78%]">
            <Card className="flex min-h-[18rem] items-center justify-center rounded-3xl p-0">
              <span className="text-7xl font-semibold tabular-nums">{number}</span>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots className="mt-4" />
    </Carousel>
  );
}`,
  checkbox: `import { Checkbox, Label } from "@alkamanas/ui";

export function CheckboxDemo() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="preview-checkbox" defaultChecked />
      <Label htmlFor="preview-checkbox">Enable smooth motion</Label>
    </div>
  );
}`,
  collapsible: `import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@alkamanas/ui";

export function CollapsibleDemo() {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle details</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 text-sm text-muted-foreground">
        A compact disclosure region.
      </CollapsibleContent>
    </Collapsible>
  );
}`,
  combobox: `import { Badge, Combobox } from "@alkamanas/ui";

const options = [
  { value: "studio", label: "Visetra Studio" },
  { value: "web", label: "Visetra Web" },
  { value: "ui", label: "Alkamanas UI" },
];

export function ComboboxDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="grid gap-2">
        <Badge variant="secondary">Flat / primary</Badge>
        <Combobox surface="flat" options={options} />
      </div>
      <div className="grid gap-2">
        <Badge variant="secondary">Gradient / contrast</Badge>
        <Combobox
          surface="gradient"
          surfaceGradientColor="contrast"
          borderAnimationColor="contrast"
          options={options}
        />
      </div>
    </div>
  );
}`,
  command: `import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@alkamanas/ui";

export function CommandDemo() {
  return (
    <Command className="max-w-xl">
      <CommandInput placeholder="Search components..." />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Components">
          <CommandItem>Input</CommandItem>
          <CommandItem>Dialog</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}`,
  "context-menu": `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@alkamanas/ui";

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-white/[0.14] text-sm text-muted-foreground">
        Right click
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem>Duplicate</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}`,
  dialog: `import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@alkamanas/ui";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog</DialogTitle>
          <DialogDescription>
            Focused content with soft overlay motion.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}`,
  direction: `import { DirectionProvider } from "@alkamanas/ui";

export function DirectionDemo() {
  return (
    <DirectionProvider dir="rtl" className="max-w-md rounded-2xl border border-white/[0.08] p-4">
      <p className="text-sm">RTL scoped content</p>
    </DirectionProvider>
  );
}`,
  drawer: `import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@alkamanas/ui";

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>Bottom sheet motion.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}`,
  "dropdown-menu": `import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@alkamanas/ui";

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
  "flip-card": `import { FlipCard } from "@alkamanas/ui";

export function FlipCardDemo() {
  return (
    <div className="alka-theme-dark w-full max-w-xl rounded-3xl bg-[#050505] p-6 text-white">
      <FlipCard
        expandToViewport
        eyebrow="Ağır yük & süreklilik"
        title="Lastik Sanayi"
        description="Kart kendi konumundan çıkarak viewport dialog'a büyür."
        image="/assets/sectors/tire-light.webp"
        minHeightClassName="min-h-[20rem]"
      />
    </div>
  );
}`,
  input: `import { Badge, Input } from "@alkamanas/ui";

export function InputDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="grid gap-2">
        <Badge variant="secondary">Underline / primary</Badge>
        <Input placeholder="workspace-name" />
      </div>
      <div className="grid gap-2">
        <Badge variant="secondary">Pill gradient / contrast</Badge>
        <Input
          variant="pill"
          surface="gradient"
          surfaceGradientColor="contrast"
          borderAnimationColor="contrast"
          placeholder="studio.visetra.app"
        />
      </div>
    </div>
  );
}`,
  "input-group": `import {
  Badge,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@alkamanas/ui";

export function InputGroupDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="grid gap-2">
        <Badge variant="secondary">Flat / primary</Badge>
        <InputGroup surface="flat">
          <InputGroupAddon>https://</InputGroupAddon>
          <InputGroupInput placeholder="studio.visetra.app" />
          <InputGroupAddon>.com</InputGroupAddon>
        </InputGroup>
      </div>
      <div className="grid gap-2">
        <Badge variant="secondary">Gradient / contrast</Badge>
        <InputGroup surface="gradient" surfaceGradientColor="contrast">
          <InputGroupAddon>https://</InputGroupAddon>
          <InputGroupInput placeholder="studio.visetra.app" />
          <InputGroupAddon>.com</InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}`,
  "input-otp": `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@alkamanas/ui";

export function InputOTPDemo() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        {[0, 1, 2].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
        <InputOTPSeparator />
        {[3, 4, 5].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}`,
  item: `import {
  Badge,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@alkamanas/ui";

export function ItemDemo() {
  return (
    <div className="grid gap-3">
      <Item surface="solid">
        <ItemMedia>01</ItemMedia>
        <ItemContent>
          <ItemTitle>Default item</ItemTitle>
          <ItemDescription>Default hover stays calm.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge variant="secondary">Active</Badge>
        </ItemActions>
      </Item>
      <Item surface="glass" borderAnimation borderAnimationColor="contrast">
        <ItemMedia>02</ItemMedia>
        <ItemContent>
          <ItemTitle>Animated item</ItemTitle>
          <ItemDescription>Border animation can be enabled per item.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
}`,
  kbd: `import { Kbd } from "@alkamanas/ui";

export function KbdDemo() {
  return (
    <div className="flex gap-2">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  );
}`,
  label: `import { Input, Label } from "@alkamanas/ui";

export function LabelDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="workspace">Workspace</Label>
      <Input id="workspace" variant="pill" floatingLabel={false} placeholder="visetra" />
    </div>
  );
}`,
  menubar: `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@alkamanas/ui";

export function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New</MenubarItem>
          <MenubarItem>Save</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}`,
  navbar: `import { SectionAwareNavbar } from "@alkamanas/ui";

export function NavbarDemo() {
  return (
    <SectionAwareNavbar
      brand={<span className="text-sm font-semibold text-white">Alkamanas</span>}
      theme="dark"
      syncThemeMeta={false}
      links={[
        { href: "#button", label: "Components" },
        { href: "#sidebar", label: "Shell" },
        { href: "#theming", label: "Theme" },
      ]}
      cta={{ href: "#installation", label: "Install" }}
    />
  );
}`,
  popover: `import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@alkamanas/ui";

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm text-muted-foreground">Floating content surface.</p>
      </PopoverContent>
    </Popover>
  );
}`,
  progress: `import { Progress } from "@alkamanas/ui";

export function ProgressDemo() {
  return <Progress value={62} className="max-w-xl" />;
}`,
  "radio-group": `import { Label, RadioGroup, RadioGroupItem } from "@alkamanas/ui";

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="studio" className="grid gap-3">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="studio" id="studio" />
        <Label htmlFor="studio">Studio</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="web" id="web" />
        <Label htmlFor="web">Web</Label>
      </div>
    </RadioGroup>
  );
}`,
  "scroll-area": `import { ScrollArea } from "@alkamanas/ui";

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-36 max-w-xl rounded-2xl border border-white/[0.08] p-4">
      <div className="space-y-3">
        {["Accordion", "Button", "Card", "Command", "Input"].map((item) => (
          <p key={item} className="text-sm text-muted-foreground">{item}</p>
        ))}
      </div>
    </ScrollArea>
  );
}`,
  select: `import {
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@alkamanas/ui";

export function SelectDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="grid gap-2">
        <Badge variant="secondary">Flat / primary</Badge>
        <Select>
          <SelectTrigger surface="flat">
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="studio">Visetra Studio</SelectItem>
            <SelectItem value="web">Visetra Web</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Badge variant="secondary">Gradient / contrast</Badge>
        <Select>
          <SelectTrigger surface="gradient" surfaceGradientColor="contrast">
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="studio">Visetra Studio</SelectItem>
            <SelectItem value="web">Visetra Web</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}`,
  separator: `import { Separator } from "@alkamanas/ui";

export function SeparatorDemo() {
  return (
    <div className="max-w-xl">
      <p>Before</p>
      <Separator className="my-4" />
      <p>After</p>
    </div>
  );
}`,
  sheet: `import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@alkamanas/ui";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Immerse yourself</Button>
      </SheetTrigger>
      <SheetContent size="lg">
        <SheetHeader>
          <SheetTitle>Ultra Retina XDR.</SheetTitle>
          <SheetDescription>
            Centered sheet surface with detached close behavior.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["sm", "md", "lg / xl"].map((size) => (
            <Card key={size} className="bg-white/[0.035]">
              <CardHeader>
                <CardTitle>{size}</CardTitle>
                <CardDescription>Responsive detail surface.</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <SheetFooter className="mt-8">
          <Button variant="secondary">Compare sizes</Button>
          <Button>Continue</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}`,
  sidebar: `import { Boxes, FileJson, Terminal } from "lucide-react";
import {
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
  SidebarRail,
} from "@alkamanas/ui";

export function SidebarDemo() {
  return (
    <SidebarProvider defaultOpen style={{ "--sidebar-width": "15rem", "--sidebar-width-icon": "4.25rem" }}>
      <Sidebar position="relative" collapsible="icon" variant="floating">
        <SidebarHeader>Alkamanas</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Overview"><Boxes /> Overview</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Deployments"><Terminal /> Deployments</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Registry"><FileJson /> Registry</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}`,
  slider: `import { Slider } from "@alkamanas/ui";

export function SliderDemo() {
  return <Slider defaultValue={[42]} max={100} step={1} className="max-w-xl" />;
}`,
  spinner: `import { Spinner } from "@alkamanas/ui";

export function SpinnerDemo() {
  return <Spinner size="lg" />;
}`,
  switch: `import { Label, Switch } from "@alkamanas/ui";

export function SwitchDemo() {
  return (
    <div className="flex items-center gap-3">
      <Switch id="switch-preview" defaultChecked />
      <Label htmlFor="switch-preview">Live preview</Label>
    </div>
  );
}`,
  tabs: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@alkamanas/ui";

export function TabsDemo() {
  return (
    <Tabs defaultValue="200" className="max-w-2xl">
      <TabsList>
        {["200", "100", "48", "35"].map((mm) => (
          <TabsTrigger key={mm} value={mm}>{mm} mm</TabsTrigger>
        ))}
      </TabsList>
      {["200", "100", "48", "35"].map((mm) => (
        <TabsContent key={mm} value={mm} className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-8">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Focal length</p>
          <p className="mt-4 text-4xl font-semibold">{mm} mm</p>
        </TabsContent>
      ))}
    </Tabs>
  );
}`,
  textarea: `import { Badge, Textarea } from "@alkamanas/ui";

export function TextareaDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="grid gap-2">
        <Badge variant="secondary">Flat / primary</Badge>
        <Textarea surface="flat" placeholder="Write a note..." />
      </div>
      <div className="grid gap-2">
        <Badge variant="secondary">Gradient / contrast</Badge>
        <Textarea
          surface="gradient"
          surfaceGradientColor="contrast"
          borderAnimationColor="contrast"
          placeholder="Write a note..."
        />
      </div>
    </div>
  );
}`,
  toast: `import { Button, toast, Toaster } from "@alkamanas/ui";

export function ToastDemo() {
  return (
    <>
      <Toaster />
      <Button onClick={() => toast("Component saved", { description: "Toast uses the shared dark surface." })}>
        Show toast
      </Button>
    </>
  );
}`,
  toggle: `import { AlignJustify } from "lucide-react";
import { Toggle } from "@alkamanas/ui";

export function ToggleDemo() {
  return (
    <Toggle variant="outline" aria-label="Toggle bold">
      <AlignJustify className="h-4 w-4" />
    </Toggle>
  );
}`,
  "toggle-group": `import { ToggleGroup, ToggleGroupItem } from "@alkamanas/ui";

export function ToggleGroupDemo() {
  return (
    <ToggleGroup defaultValue="center">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  );
}`,
  tooltip: `import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@alkamanas/ui";

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`,
};

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
            <TabsTrigger value="preview">
              Preview
            </TabsTrigger>
            <TabsTrigger value="code">
              Code
            </TabsTrigger>
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

function PageChrome({
  activeDoc,
  children,
  primaryTheme,
  onPrimaryThemeChange,
  borderAnimationColor,
  onBorderAnimationColorChange,
  surfaceGradientColor,
  onSurfaceGradientColorChange,
  glassEffect,
  onGlassEffectChange,
}: {
  activeDoc: DocItem;
  children: React.ReactNode;
  primaryTheme: PrimaryThemeId;
  onPrimaryThemeChange: (value: PrimaryThemeId) => void;
  borderAnimationColor: BorderAnimationColorId;
  onBorderAnimationColorChange: (value: BorderAnimationColorId) => void;
  surfaceGradientColor: SurfaceGradientColorId;
  onSurfaceGradientColorChange: (value: SurfaceGradientColorId) => void;
  glassEffect: GlassEffectId;
  onGlassEffectChange: (value: GlassEffectId) => void;
}) {
  const showPrimarySwitcher = activeDoc.id === "components" || componentIds.has(activeDoc.id);

  return (
    <div className="theme-dark docs-shell text-foreground" data-border-animation-color={borderAnimationColor} data-glass-effect={glassEffect} data-surface-gradient-color={surfaceGradientColor} style={getPrimaryThemeStyle(primaryTheme)}>
      <LiquidGlassFilter />
      <Topbar activeTitle={activeDoc.title} />
      {showPrimarySwitcher ? (
        <PrimaryColorSwitcher
          value={primaryTheme}
          onChange={onPrimaryThemeChange}
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
            <article className="min-w-0">{children}</article>
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
              <div className="alka-liquid-glass flex flex-col gap-3 rounded-3xl border border-white/[0.08] px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
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
                  <Combobox surface="bare" className="w-full sm:w-48" options={[{ value: "studio", label: "Visetra Studio" }, { value: "web", label: "Visetra Web" }, { value: "ui", label: "Alkamanas UI" }]} />
                  <Select>
                    <SelectTrigger surface="bare" className="w-full sm:w-40"><SelectValue placeholder="Cycle" /></SelectTrigger>
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
                <Input id="block-name" placeholder="visetra-studio" />
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
              <Combobox options={[{ value: "automotive", label: "Automotive" }, { value: "tire", label: "Tire industry" }, { value: "manufacturing", label: "Manufacturing" }]} placeholder="Select industry" />
              <Select>
                <SelectTrigger><SelectValue placeholder="Deployment region" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="eu">Europe</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="tr">Türkiye</SelectItem>
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
            eyebrow="Ağır yük & süreklilik"
            title="Lastik Sanayi"
            description="Flip card block içinde gerçek sektör kartı davranışı."
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

function BlocksTopNav() {
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

function BlocksPage({
  primaryTheme,
  onPrimaryThemeChange,
  borderAnimationColor,
  onBorderAnimationColorChange,
  surfaceGradientColor,
  onSurfaceGradientColorChange,
  glassEffect,
  onGlassEffectChange,
}: {
  primaryTheme: PrimaryThemeId;
  onPrimaryThemeChange: (value: PrimaryThemeId) => void;
  borderAnimationColor: BorderAnimationColorId;
  onBorderAnimationColorChange: (value: BorderAnimationColorId) => void;
  surfaceGradientColor: SurfaceGradientColorId;
  onSurfaceGradientColorChange: (value: SurfaceGradientColorId) => void;
  glassEffect: GlassEffectId;
  onGlassEffectChange: (value: GlassEffectId) => void;
}) {
  return (
    <div id="blocks" className="theme-dark docs-shell min-h-dvh text-foreground" data-border-animation-color={borderAnimationColor} data-glass-effect={glassEffect} data-surface-gradient-color={surfaceGradientColor} style={getPrimaryThemeStyle(primaryTheme)}>
      <LiquidGlassFilter />
      <BlocksTopNav />
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
      <main className="relative z-10 mx-auto max-w-[1440px] px-4 pb-14 pt-28 sm:px-6 lg:px-8">
        <section id="overview" className="max-w-4xl">
          <Badge variant="secondary" className="rounded-full border-white/10 bg-white/[0.06] text-white/80">Blocks</Badge>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-6xl">
            Building blocks for Alkamanas interfaces.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Component directory’den ayrı bir blok galerisi. Her örnek gerçek `@alkamanas/ui` componentleriyle compose edildi; hover, focus, close motion, glass surface ve responsive davranışları bu sayfada birlikte test edebiliriz.
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
  const items = [
    ["colors", "Colors", "Choose from three bold finishes. The control opens into a wider surface while content fades up after the shell settles."],
    ["aluminum-unibody", "Aluminum unibody", "Heat-forged aluminum creates a light, rigid enclosure with a softer disclosure motion."],
    ["ceramic-shield", "Ceramic Shield", "Front protection and back glass details enter as a second-stage content animation."],
    ["vapor-chamber", "Vapor chamber", "Internal thermal architecture appears without snapping the surrounding stack."],
  ];

  return (
    <div className="grid w-full max-w-5xl gap-5 lg:grid-cols-2">
      <div className="grid gap-3">
        <Badge variant="secondary" className="inline-flex h-8 w-fit items-center whitespace-nowrap rounded-full border-white/[0.08] bg-white/[0.04] px-3 font-mono text-[0.68rem] uppercase leading-none tracking-[0.18em] text-muted-foreground">Border gradient / primary</Badge>
        <Accordion defaultValue="colors">
          {items.map(([value, title, body]) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>
                <p>{body}</p>
                {value === "colors" ? (
                  <div className="flex gap-2">
                    {["#f26d21", "#263142", "#d9d7d2"].map((color) => (
                      <span key={color} className="h-7 w-7 rounded-full border border-white/15" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                ) : null}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="grid gap-3">
        <Badge variant="secondary" className="inline-flex h-8 w-fit items-center whitespace-nowrap rounded-full border-white/[0.08] bg-white/[0.04] px-3 font-mono text-[0.68rem] uppercase leading-none tracking-[0.18em] text-muted-foreground">Border gradient / contrast</Badge>
        <Accordion borderGradientColor="contrast" defaultValue="colors">
          {items.map(([value, title, body]) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>
                <p>{body}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

function AppleCarouselPreview() {
  return (
    <Carousel className="w-full max-w-6xl">
      <CarouselContent className="px-12 sm:px-16">
        {[1, 2, 3, 4].map((number) => (
          <CarouselItem key={number} className="basis-[92%] md:basis-[84%] lg:basis-[78%]">
            <Card className="flex min-h-[18rem] items-center justify-center rounded-3xl p-0">
              <span className="text-7xl font-semibold tabular-nums text-foreground">{number}</span>
            </Card>
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
      <TabsList>
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

function NavbarPreview() {
  return (
    <div className="relative h-[18rem] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#050505]">
      <div className="absolute inset-0 docs-grid opacity-60" />
      <div className="absolute inset-x-8 bottom-8 grid gap-3 text-white/70">
        <p className="max-w-md text-sm leading-6">
          Liquid glass panel section-aware navbar preview.
        </p>
        <div className="h-16 rounded-2xl border border-white/[0.06] bg-white/[0.025]" />
      </div>
      <SectionAwareNavbar
        brand={<span className="text-sm font-semibold text-white">Alkamanas</span>}
        theme="dark"
        syncThemeMeta={false}
        links={[
          { href: "#button", label: "Components" },
          { href: "#sidebar", label: "Shell" },
          { href: "#theming", label: "Theme" },
        ]}
        cta={{ href: "#installation", label: "Install" }}
        className="!absolute !inset-x-4 !top-4 !z-10"
      />
    </div>
  );
}

function SidebarPreview() {
  return (
    <div className="h-[34rem] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#050505] p-3">
      <SidebarProvider
        defaultOpen
        className="relative h-full !min-h-0 overflow-hidden rounded-[1.35rem]"
        style={{ "--sidebar-width": "15rem", "--sidebar-width-icon": "4.25rem" } as React.CSSProperties}
      >
        <Sidebar position="relative" collapsible="icon" variant="floating">
          <SidebarHeader>
            <SidebarBrandRow label="Alkamanas" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip="Overview"><Boxes /> Overview</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Deployments"><Terminal /> Deployments</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Registry"><FileJson /> Registry</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Blocks"><PanelsTopLeft /> Blocks</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Members"><User /> Members</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings"><Settings /> Settings</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Account"><User /> Utku Gokcan</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <main className="min-w-0 flex-1 p-2 pl-1">
          <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.018]">
            <header className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
              <SidebarTrigger className="border border-white/[0.08] bg-white/[0.035]" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Platform</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="text-foreground">Overview</span>
                </div>
                <p className="text-xs text-muted-foreground">Production workspace</p>
              </div>
              <div className="ml-auto hidden h-10 min-w-[15rem] items-center gap-2 rounded-full border border-white/[0.08] px-3 text-sm text-muted-foreground md:flex">
                <Search className="h-4 w-4" />
                Search deployments...
              </div>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-white/[0.08] bg-white/[0.03]">
                <Bell className="h-4 w-4" />
              </Button>
            </header>
            <section className="min-h-0 flex-1 overflow-hidden p-4">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
                <div className="min-w-0 space-y-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    {[
                      ["Revenue", "$42.8k", "18%"],
                      ["Deploys", "128", "24h"],
                      ["Latency", "82 ms", "p95"],
                    ].map(([label, value, meta]) => (
                      <Card key={label}>
                        <CardHeader className="space-y-2">
                          <div className="flex items-center justify-between">
                            <CardDescription>{label}</CardDescription>
                            <Badge variant="secondary" className="rounded-full">{meta}</Badge>
                          </div>
                          <CardTitle className="text-2xl">{value}</CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                  <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0">
                      <div>
                        <CardTitle>Deployment queue</CardTitle>
                        <CardDescription>Live production checks across environments.</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                      {[
                        ["Studio API", "Frankfurt", "Healthy"],
                        ["Web preview", "Virginia", "Building"],
                        ["Registry CDN", "Istanbul", "Healthy"],
                      ].map(([name, region, status]) => (
                        <div key={name} className="grid grid-cols-[minmax(0,1fr)_6rem_5.5rem] items-center gap-3 rounded-2xl border border-white/[0.07] px-3 py-2 text-sm">
                          <span className="truncate font-medium">{name}</span>
                          <span className="text-muted-foreground">{region}</span>
                          <Badge variant={status === "Healthy" ? "success" : "secondary"} className="justify-center rounded-full">
                            {status}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
                <Card className="hidden lg:block">
                  <CardHeader>
                    <CardTitle>Activity</CardTitle>
                    <CardDescription>Latest workspace events.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {["Token sync completed", "Preview promoted", "Schema validated", "Member invited"].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/[0.07] px-3 py-2 text-sm">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="min-w-0 truncate">{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}

function ComponentPreview({ id }: { id: string }) {
  if (id === "accordion") return <AppleAccordionPreview />;
  if (id === "carousel") return <AppleCarouselPreview />;
  if (id === "tabs") return <AppleTabsPreview />;
  if (id === "navbar") return <NavbarPreview />;
  if (id === "button") {
    return (
      <div className="grid w-full max-w-3xl gap-4">
        <div className="rounded-[1.75rem] border border-white/[0.1] p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Badge variant="secondary" className="rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Solid</Badge>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-white/[0.1] p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Badge variant="secondary" className="rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Glass</Badge>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="glassPrimary">Primary glass</Button>
            <Button variant="glassDestructive">Destructive glass</Button>
            <Button variant="outline">Outline glass</Button>
          </div>
        </div>
      </div>
    );
  }
  if (id === "button-group") {
    return <ButtonGroup><Button variant="ghost">Day</Button><Button variant="secondary">Week</Button><Button variant="ghost">Month</Button></ButtonGroup>;
  }
  if (id === "input") {
    return (
      <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Underline / primary</Badge>
          <Input placeholder="workspace-name" />
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Underline / contrast</Badge>
          <Input borderAnimationColor="contrast" placeholder="workspace-name" />
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Pill flat / primary</Badge>
          <Input variant="pill" surface="flat" placeholder="studio.visetra.app" />
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Pill flat / contrast</Badge>
          <Input borderAnimationColor="contrast" variant="pill" surface="flat" placeholder="studio.visetra.app" />
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Pill gradient / primary</Badge>
          <Input variant="pill" surface="gradient" placeholder="studio.visetra.app" />
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Pill gradient color / contrast</Badge>
          <Input surfaceGradientColor="contrast" variant="pill" surface="gradient" placeholder="studio.visetra.app" />
        </div>
      </div>
    );
  }
  if (id === "input-group") {
    return (
      <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat / primary</Badge>
          <InputGroup surface="flat">
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder="studio.visetra.app" />
            <InputGroupAddon>.com</InputGroupAddon>
          </InputGroup>
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat / contrast</Badge>
          <InputGroup borderAnimationColor="contrast" surface="flat">
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder="studio.visetra.app" />
            <InputGroupAddon>.com</InputGroupAddon>
          </InputGroup>
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient / primary</Badge>
          <InputGroup surface="gradient">
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder="studio.visetra.app" />
            <InputGroupAddon>.com</InputGroupAddon>
          </InputGroup>
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient color / contrast</Badge>
          <InputGroup surfaceGradientColor="contrast" surface="gradient">
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder="studio.visetra.app" />
            <InputGroupAddon>.com</InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    );
  }
  if (id === "input-otp") {
    return <div className="grid w-full max-w-3xl gap-5"><div className="grid gap-2 overflow-x-auto pb-1"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Primary</Badge><InputOTP maxLength={6}><InputOTPGroup>{[0, 1, 2].map((i) => <InputOTPSlot key={i} index={i} />)}<InputOTPSeparator />{[3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup></InputOTP></div><div className="grid gap-2 overflow-x-auto pb-1"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Border / contrast</Badge><InputOTP borderAnimationColor="contrast" maxLength={6}><InputOTPGroup>{[0, 1, 2].map((i) => <InputOTPSlot key={i} index={i} />)}<InputOTPSeparator />{[3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup></InputOTP></div><div className="grid gap-2 overflow-x-auto pb-1"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient / contrast</Badge><InputOTP surfaceGradientColor="contrast" maxLength={6}><InputOTPGroup>{[0, 1, 2].map((i) => <InputOTPSlot key={i} index={i} />)}<InputOTPSeparator />{[3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup></InputOTP></div></div>;
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
  if (id === "combobox") return <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2"><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat / primary</Badge><Combobox surface="flat" options={[{ value: "studio", label: "Visetra Studio" }, { value: "web", label: "Visetra Web" }, { value: "ui", label: "Alkamanas UI" }]} /></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat / contrast</Badge><Combobox borderAnimationColor="contrast" surface="flat" options={[{ value: "studio", label: "Visetra Studio" }, { value: "web", label: "Visetra Web" }, { value: "ui", label: "Alkamanas UI" }]} /></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient / primary</Badge><Combobox surface="gradient" options={[{ value: "studio", label: "Visetra Studio" }, { value: "web", label: "Visetra Web" }, { value: "ui", label: "Alkamanas UI" }]} /></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient color / contrast</Badge><Combobox surfaceGradientColor="contrast" surface="gradient" options={[{ value: "studio", label: "Visetra Studio" }, { value: "web", label: "Visetra Web" }, { value: "ui", label: "Alkamanas UI" }]} /></div></div>;
  if (id === "command") return <Command className="max-w-xl"><CommandInput placeholder="Search components..." /><CommandList><CommandEmpty>No results.</CommandEmpty><CommandGroup heading="Components"><CommandItem><Type className="h-4 w-4" />Input</CommandItem><CommandItem><PanelsTopLeft className="h-4 w-4" />Dialog</CommandItem></CommandGroup></CommandList></Command>;
  if (id === "context-menu") return <ContextMenu><ContextMenuTrigger className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-white/[0.14] text-sm text-muted-foreground">Right click</ContextMenuTrigger><ContextMenuContent><ContextMenuItem>Open</ContextMenuItem><ContextMenuItem>Duplicate</ContextMenuItem></ContextMenuContent></ContextMenu>;
  if (id === "dialog") return <Dialog><DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Dialog</DialogTitle><DialogDescription>Focused content with soft overlay motion.</DialogDescription></DialogHeader></DialogContent></Dialog>;
  if (id === "direction") return <DirectionProvider dir="rtl" className="max-w-md rounded-2xl border border-white/[0.08] p-4"><p className="text-sm">RTL scoped content</p></DirectionProvider>;
  if (id === "drawer") return <Drawer><DrawerTrigger asChild><Button>Open drawer</Button></DrawerTrigger><DrawerContent><DrawerHeader><DrawerTitle>Drawer</DrawerTitle><DrawerDescription>Bottom sheet motion.</DrawerDescription></DrawerHeader></DrawerContent></Drawer>;
  if (id === "dropdown-menu") return <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Open menu</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Profile</DropdownMenuItem><DropdownMenuItem>Settings</DropdownMenuItem></DropdownMenuContent></DropdownMenu>;
  if (id === "item") return <div className="grid w-full max-w-xl gap-3"><Item surface="solid"><ItemMedia><User className="h-4 w-4" /></ItemMedia><ItemContent><ItemTitle>Default item</ItemTitle><ItemDescription>Default item keeps hover calm without border animation.</ItemDescription></ItemContent><ItemActions><Badge variant="secondary">Active</Badge></ItemActions></Item><Item surface="glass" borderAnimation><ItemMedia><Sparkles className="h-4 w-4" /></ItemMedia><ItemContent><ItemTitle>Primary border animation</ItemTitle><ItemDescription>borderAnimation uses primary by default.</ItemDescription></ItemContent><ItemActions><Badge>Live</Badge></ItemActions></Item><Item surface="glass" borderAnimation borderAnimationColor="contrast"><ItemMedia><Sparkles className="h-4 w-4" /></ItemMedia><ItemContent><ItemTitle>Contrast border animation</ItemTitle><ItemDescription>Set borderAnimationColor to contrast.</ItemDescription></ItemContent><ItemActions><Badge variant="secondary">Contrast</Badge></ItemActions></Item></div>;
  if (id === "kbd") return <div className="flex gap-2"><Kbd>⌘</Kbd><Kbd>K</Kbd></div>;
  if (id === "label") return <div className="grid w-full max-w-sm gap-2"><Label htmlFor="label-preview">Workspace</Label><Input id="label-preview" variant="pill" floatingLabel={false} placeholder="visetra" /></div>;
  if (id === "menubar") return <Menubar><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem>New</MenubarItem><MenubarItem>Save</MenubarItem></MenubarContent></MenubarMenu></Menubar>;
  if (id === "popover") return <Popover><PopoverTrigger asChild><Button variant="outline">Open popover</Button></PopoverTrigger><PopoverContent><p className="text-sm text-muted-foreground">Floating content surface.</p></PopoverContent></Popover>;
  if (id === "progress") return <Progress value={62} className="max-w-xl" />;
  if (id === "radio-group") return <RadioGroup defaultValue="studio" className="grid gap-3"><div className="flex items-center gap-3"><RadioGroupItem value="studio" id="studio" /><Label htmlFor="studio">Studio</Label></div><div className="flex items-center gap-3"><RadioGroupItem value="web" id="web" /><Label htmlFor="web">Web</Label></div></RadioGroup>;
  if (id === "scroll-area") return <ScrollArea className="h-36 max-w-xl rounded-2xl border border-white/[0.08] p-4"><div className="space-y-3">{componentNames.slice(0, 12).map(([, title]) => <p key={title} className="text-sm text-muted-foreground">{title}</p>)}</div></ScrollArea>;
  if (id === "select") return <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2"><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat / primary</Badge><Select><SelectTrigger surface="flat"><SelectValue placeholder="Select product" /></SelectTrigger><SelectContent><SelectItem value="studio">Visetra Studio</SelectItem><SelectItem value="web">Visetra Web</SelectItem></SelectContent></Select></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat / contrast</Badge><Select><SelectTrigger borderAnimationColor="contrast" surface="flat"><SelectValue placeholder="Select product" /></SelectTrigger><SelectContent><SelectItem value="studio">Visetra Studio</SelectItem><SelectItem value="web">Visetra Web</SelectItem></SelectContent></Select></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient / primary</Badge><Select><SelectTrigger surface="gradient"><SelectValue placeholder="Select product" /></SelectTrigger><SelectContent><SelectItem value="studio">Visetra Studio</SelectItem><SelectItem value="web">Visetra Web</SelectItem></SelectContent></Select></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient color / contrast</Badge><Select><SelectTrigger surfaceGradientColor="contrast" surface="gradient"><SelectValue placeholder="Select product" /></SelectTrigger><SelectContent><SelectItem value="studio">Visetra Studio</SelectItem><SelectItem value="web">Visetra Web</SelectItem></SelectContent></Select></div></div>;
  if (id === "separator") return <div className="max-w-xl"><p>Before</p><Separator className="my-4" /><p>After</p></div>;
  if (id === "sheet") return <Sheet><SheetTrigger asChild><Button>Immerse yourself</Button></SheetTrigger><SheetContent size="lg"><SheetHeader><SheetTitle className="text-3xl sm:text-5xl">Ultra Retina XDR.</SheetTitle><SheetDescription>The centered sheet opens as a focused detail surface with a detached close control, inspired by Apple product deep dives.</SheetDescription></SheetHeader><div className="mt-6 grid gap-4 md:grid-cols-3"><Card className="bg-white/[0.035]"><CardHeader><CardTitle>sm</CardTitle><CardDescription>Compact detail surface.</CardDescription></CardHeader></Card><Card className="bg-white/[0.035]"><CardHeader><CardTitle>md</CardTitle><CardDescription>Default documentation size.</CardDescription></CardHeader></Card><Card className="bg-white/[0.035]"><CardHeader><CardTitle>lg / xl</CardTitle><CardDescription>Immersive product content.</CardDescription></CardHeader></Card></div><SheetFooter className="mt-8"><Button variant="secondary">Compare sizes</Button><Button>Continue</Button></SheetFooter></SheetContent></Sheet>;
  if (id === "sidebar") return <SidebarPreview />;
  if (id === "slider") return <Slider defaultValue={[42]} max={100} step={1} className="max-w-xl" />;
  if (id === "spinner") return <Spinner size="lg" />;
  if (id === "switch") return <div className="flex items-center gap-3"><Switch id="switch-preview" defaultChecked /><Label htmlFor="switch-preview">Live preview</Label></div>;
  if (id === "textarea") return <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2"><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat / primary</Badge><Textarea surface="flat" placeholder="Write a note..." /></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat / contrast</Badge><Textarea borderAnimationColor="contrast" surface="flat" placeholder="Write a note..." /></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient / primary</Badge><Textarea surface="gradient" placeholder="Write a note..." /></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient color / contrast</Badge><Textarea surfaceGradientColor="contrast" surface="gradient" placeholder="Write a note..." /></div></div>;
  if (id === "toast") return <Button onClick={() => toast("Component saved", { description: "Toast uses the shared dark surface." })}>Show toast</Button>;
  if (id === "toggle") return <Toggle variant="outline" aria-label="Toggle bold"><AlignJustify className="h-4 w-4" /></Toggle>;
  if (id === "toggle-group") return <ToggleGroup defaultValue="center"><ToggleGroupItem value="left">Left</ToggleGroupItem><ToggleGroupItem value="center">Center</ToggleGroupItem><ToggleGroupItem value="right">Right</ToggleGroupItem></ToggleGroup>;
  if (id === "tooltip") return <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="outline">Hover</Button></TooltipTrigger><TooltipContent>Tooltip content</TooltipContent></Tooltip></TooltipProvider>;
  if (id === "flip-card") {
    return <div className="alka-theme-dark w-full max-w-xl rounded-3xl bg-[#050505] p-6 text-white"><FlipCard expandToViewport eyebrow="Ağır yük & süreklilik" title="Lastik Sanayi" description="Kart kendi konumundan çıkarak viewport dialog'a büyür." image="/assets/sectors/tire-light.webp" minHeightClassName="min-h-[20rem]" /></div>;
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
        <ComponentPreviewShell doc={doc} />
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
          {activeDoc.id === "components" ? <DirectoryPage /> : componentIds.has(activeDoc.id) ? <ComponentPage doc={activeDoc} /> : <SectionPage doc={activeDoc} />}
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
