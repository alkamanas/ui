import * as React from "react";
import {
  AlignJustify,
  Bell,
  Boxes,
  Check,
  ChevronLeft,
  ChevronRight,
  FileJson,
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
  AvatarGroup,
  AvatarGroupCount,
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
  ButtonGroupSeparator,
  Calendar,
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
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DirectionProvider,
  Drawer,
  DatePicker,
  DataTable,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  FlipCard,
  ImageCard,
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
  Navbar,
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
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@alkamanas/ui";
import type { DataTableColumnDef } from "@alkamanas/ui";

import { componentNames } from "./docs-data";
import { DocsLogoMark, DocsThemeAwareWordmark, docsNavbarLogo } from "./brand-logo";
import { getDocHref } from "./docs-routes";

function SidebarBrandRow() {
  return (
    <div className="flex h-12 w-full min-w-0 items-center gap-2 overflow-hidden rounded-3xl px-2 text-sm font-semibold transition-[height,padding,gap,border-radius,justify-content] duration-[var(--alka-motion-smooth)] ease-[var(--alka-ease-smooth)] group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0">
      <DocsThemeAwareWordmark className="block h-7 w-44 shrink-0 group-data-[collapsible=icon]:hidden" />
      <DocsLogoMark className="hidden h-9 w-12 shrink-0 object-contain group-data-[collapsible=icon]:block" />
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
        <Badge variant="secondary" className="inline-flex h-8 w-fit items-center whitespace-nowrap rounded-full border-white/[0.08] bg-white/[0.04] px-3 font-mono text-[0.68rem] uppercase leading-none tracking-[0.18em] text-muted-foreground">Border gradient / utility</Badge>
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
        <Badge variant="secondary" className="inline-flex h-8 w-fit items-center whitespace-nowrap rounded-full border-white/[0.08] bg-white/[0.04] px-3 font-mono text-[0.68rem] uppercase leading-none tracking-[0.18em] text-muted-foreground">Border gradient / utility</Badge>
        <Accordion className="border-animation-primary" defaultValue="colors">
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

function ContextMenuPreview() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-full max-w-md items-center justify-center rounded-2xl border border-dashed border-white/[0.14] text-sm text-muted-foreground">
        Right click the workspace surface
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuLabel>Navigation</ContextMenuLabel>
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>Alt Left</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward
          <ContextMenuShortcut>Alt Right</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload
          <ContextMenuShortcut>Ctrl R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-52">
            <ContextMenuItem>Command palette</ContextMenuItem>
            <ContextMenuItem>Developer tools</ContextMenuItem>
            <ContextMenuItem>Export diagnostics</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuLabel>Visibility</ContextMenuLabel>
        <ContextMenuCheckboxItem checked>Show Bookmarks</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>People</ContextMenuLabel>
        <ContextMenuRadioGroup value="utku">
          <ContextMenuRadioItem value="utku">Utku Gökcan</ContextMenuRadioItem>
          <ContextMenuRadioItem value="berkay">Berkay İnci</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

type PreviewPayment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const previewPayments: PreviewPayment[] = [
  { id: "728ed52f", amount: 316, status: "success", email: "utku@example.com" },
  { id: "489e1d42", amount: 242, status: "processing", email: "berkay@example.com" },
  { id: "95a8f4d1", amount: 837, status: "success", email: "studio@example.com" },
  { id: "7f2d9a6c", amount: 874, status: "success", email: "product@example.com" },
  { id: "20c7f3ba", amount: 721, status: "failed", email: "billing@example.com" },
];

const previewPaymentColumns: DataTableColumnDef<PreviewPayment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all rows"
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(Boolean(value))}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
      />
    ),
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as PreviewPayment["status"];
      const variant = status === "failed" ? "warning" : status === "success" ? "success" : "secondary";

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        size="sm"
        type="button"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <span aria-hidden="true">{column.getIsSorted() === "asc" ? "Asc" : column.getIsSorted() === "desc" ? "Desc" : "Sort"}</span>
      </Button>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = Number(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label={`Open actions for ${row.original.email}`} size="sm" variant="ghost">
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

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
      <TabsList surface="flat">
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
      <Navbar
        logo={docsNavbarLogo}
        theme="dark"
        syncThemeMeta={false}
        links={[
          { href: getDocHref("button"), label: "Components" },
          { href: getDocHref("sidebar"), label: "Shell" },
          { href: getDocHref("theming"), label: "Theme" },
        ]}
        cta={{ href: getDocHref("installation"), label: "Install" }}
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
            <SidebarBrandRow />
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

export function ComponentPreview({ id }: { id: string }) {
  if (id === "accordion") return <AppleAccordionPreview />;
  if (id === "carousel") return <AppleCarouselPreview />;
  if (id === "tabs") return <AppleTabsPreview />;
  if (id === "navbar") return <NavbarPreview />;
  if (id === "button") {
    return (
      <div className="grid w-full max-w-3xl gap-4">
        <div className="rounded-[1.75rem] border border-white/[0.1] p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Badge variant="secondary" className="rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat</Badge>
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
            <Button variant="glassSecondary">Secondary glass</Button>
            <Button variant="glassDestructive">Destructive glass</Button>
            <Button variant="outline">Outline glass</Button>
          </div>
        </div>
      </div>
    );
  }
  if (id === "button-group") {
    return (
      <ButtonGroup aria-label="Carousel navigation">
        <Button variant="ghost" size="icon" aria-label="Previous">
          <ChevronLeft />
        </Button>
        <ButtonGroupSeparator />
        <Button variant="ghost" size="icon" aria-label="Next">
          <ChevronRight />
        </Button>
      </ButtonGroup>
    );
  }
  if (id === "input") {
    return (
      <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Underline / default</Badge>
          <Input placeholder="workspace-name" />
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Underline / utility</Badge>
          <Input wrapperClassName="border-animation-primary" placeholder="workspace-name" />
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Pill flat / default</Badge>
          <Input variant="pill" surface="flat" placeholder="studio.visetra.app" />
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Pill flat / utility</Badge>
          <Input wrapperClassName="border-animation-primary" variant="pill" surface="flat" placeholder="studio.visetra.app" />
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Pill gradient / default</Badge>
          <Input variant="pill" surface="gradient" placeholder="studio.visetra.app" />
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Pill gradient / utility</Badge>
          <Input wrapperClassName="gradient-primary/50" variant="pill" surface="gradient" placeholder="studio.visetra.app" />
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Pill glass / default</Badge>
          <Input variant="pill" surface="glass" placeholder="studio.visetra.app" />
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Pill glass / utility</Badge>
          <Input wrapperClassName="gradient-primary/50 border-animation-primary" variant="pill" surface="glass" placeholder="studio.visetra.app" />
        </div>
      </div>
    );
  }
  if (id === "input-group") {
    return (
      <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat / default</Badge>
          <InputGroup surface="flat">
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder="studio.visetra.app" />
            <InputGroupAddon>.com</InputGroupAddon>
          </InputGroup>
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat / utility</Badge>
          <InputGroup className="border-animation-primary" surface="flat">
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder="studio.visetra.app" />
            <InputGroupAddon>.com</InputGroupAddon>
          </InputGroup>
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient / default</Badge>
          <InputGroup surface="gradient">
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder="studio.visetra.app" />
            <InputGroupAddon>.com</InputGroupAddon>
          </InputGroup>
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient / utility</Badge>
          <InputGroup className="gradient-primary/50" surface="gradient">
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder="studio.visetra.app" />
            <InputGroupAddon>.com</InputGroupAddon>
          </InputGroup>
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Glass / default</Badge>
          <InputGroup surface="glass">
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder="studio.visetra.app" />
            <InputGroupAddon>.com</InputGroupAddon>
          </InputGroup>
        </div>
        <div className="grid gap-2">
          <Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Glass / utility</Badge>
          <InputGroup className="gradient-primary/50 border-animation-primary" surface="glass">
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder="studio.visetra.app" />
            <InputGroupAddon>.com</InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    );
  }
  if (id === "input-otp") {
    return <div className="grid w-full max-w-3xl gap-5"><div className="grid gap-2 overflow-x-auto pb-1"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Primary</Badge><InputOTP maxLength={6}><InputOTPGroup>{[0, 1, 2].map((i) => <InputOTPSlot key={i} index={i} />)}<InputOTPSeparator />{[3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup></InputOTP></div><div className="grid gap-2 overflow-x-auto pb-1"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Border / utility</Badge><InputOTP className="border-animation-primary" maxLength={6}><InputOTPGroup>{[0, 1, 2].map((i) => <InputOTPSlot key={i} index={i} />)}<InputOTPSeparator />{[3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup></InputOTP></div><div className="grid gap-2 overflow-x-auto pb-1"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient / utility</Badge><InputOTP className="gradient-primary/50" maxLength={6}><InputOTPGroup>{[0, 1, 2].map((i) => <InputOTPSlot key={i} index={i} />)}<InputOTPSeparator />{[3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup></InputOTP></div></div>;
  }
  if (id === "calendar") return <div className="grid gap-6 lg:grid-cols-2"><Calendar mode="single" selected={new Date(2026, 4, 20)} defaultMonth={new Date(2026, 4, 20)} /><Calendar mode="range" selected={{ from: new Date(2026, 4, 12), to: new Date(2026, 4, 18) }} defaultMonth={new Date(2026, 4, 12)} /></div>;
  if (id === "card") {
    return <div className="grid gap-4 md:grid-cols-2"><Card><CardHeader><CardTitle>Glass default</CardTitle><CardDescription>Floating, blurred, token-driven surface.</CardDescription></CardHeader></Card><Card variant="solid"><CardHeader><CardTitle>Solid</CardTitle><CardDescription>Use inside dense content areas.</CardDescription></CardHeader></Card></div>;
  }
  if (id === "alert-dialog") {
    return <AlertDialog><AlertDialogTrigger asChild><Button variant="destructive">Delete project</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete project?</AlertDialogTitle><AlertDialogDescription>This action keeps the soft dialog motion but requires explicit confirmation.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>Continue</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>;
  }
  if (id === "avatar") return <div className="grid w-full max-w-md gap-5"><Avatar><AvatarImage src="/assets/sectors/automotive-light.webp" alt="Workspace avatar" /><AvatarFallback>VS</AvatarFallback></Avatar><AvatarGroup><Avatar><AvatarFallback>CN</AvatarFallback></Avatar><Avatar><AvatarFallback>LR</AvatarFallback></Avatar><Avatar><AvatarFallback>ER</AvatarFallback></Avatar><AvatarGroupCount>+3</AvatarGroupCount></AvatarGroup></div>;
  if (id === "badge") return <div className="grid gap-4"><div className="flex flex-wrap gap-2"><Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="success">Success</Badge><Badge variant="warning">Warning</Badge><Badge variant="info">Info</Badge></div><div className="flex flex-wrap items-center gap-2"><Badge size="sm" variant="outline">Small</Badge><Badge size="md" variant="outline">Medium</Badge><Badge size="lg" variant="outline">Large</Badge></div></div>;
  if (id === "breadcrumb") return <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href={getDocHref("components")}>Components</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>;
  if (id === "checkbox") return <div className="flex items-center gap-3"><Checkbox id="preview-checkbox" defaultChecked /><Label htmlFor="preview-checkbox">Enable smooth motion</Label></div>;
  if (id === "collapsible") return <Collapsible><CollapsibleTrigger asChild><Button variant="outline">Toggle details</Button></CollapsibleTrigger><CollapsibleContent className="mt-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 text-sm text-muted-foreground">A compact disclosure region.</CollapsibleContent></Collapsible>;
  if (id === "combobox") return <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2"><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat / default</Badge><Combobox surface="flat" options={[{ value: "studio", label: "Visetra Studio" }, { value: "web", label: "Visetra Web" }, { value: "ui", label: "Alkamanas UI" }]} /></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat / utility</Badge><Combobox className="border-animation-primary" surface="flat" options={[{ value: "studio", label: "Visetra Studio" }, { value: "web", label: "Visetra Web" }, { value: "ui", label: "Alkamanas UI" }]} /></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient / default</Badge><Combobox surface="gradient" options={[{ value: "studio", label: "Visetra Studio" }, { value: "web", label: "Visetra Web" }, { value: "ui", label: "Alkamanas UI" }]} /></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient / utility</Badge><Combobox className="gradient-primary/50" surface="gradient" options={[{ value: "studio", label: "Visetra Studio" }, { value: "web", label: "Visetra Web" }, { value: "ui", label: "Alkamanas UI" }]} /></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Glass / default</Badge><Combobox surface="glass" options={[{ value: "studio", label: "Visetra Studio" }, { value: "web", label: "Visetra Web" }, { value: "ui", label: "Alkamanas UI" }]} /></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Glass / utility</Badge><Combobox className="gradient-primary/50 border-animation-primary" surface="glass" options={[{ value: "studio", label: "Visetra Studio" }, { value: "web", label: "Visetra Web" }, { value: "ui", label: "Alkamanas UI" }]} /></div></div>;
  if (id === "command") return <Command className="max-w-xl"><CommandInput placeholder="Search components..." /><CommandList><CommandEmpty>No results.</CommandEmpty><CommandGroup heading="Components"><CommandItem><Type className="h-4 w-4" />Input</CommandItem><CommandItem><PanelsTopLeft className="h-4 w-4" />Dialog</CommandItem></CommandGroup></CommandList></Command>;
  if (id === "context-menu") return <ContextMenuPreview />;
  if (id === "data-table") return <DataTable columns={previewPaymentColumns} data={previewPayments} filterColumn="email" filterPlaceholder="Filter emails..." pageSize={5} />;
  if (id === "date-picker") return <div className="grid gap-4"><DatePicker defaultValue={new Date(2026, 4, 20)} /><DatePicker placeholder="Select launch date" calendarProps={{ defaultMonth: new Date(2026, 4, 1) }} /></div>;
  if (id === "dialog") return <Dialog><DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Dialog</DialogTitle><DialogDescription>Focused content with soft overlay motion.</DialogDescription></DialogHeader></DialogContent></Dialog>;
  if (id === "direction") return <DirectionProvider dir="rtl" className="max-w-md rounded-2xl border border-white/[0.08] p-4"><p className="text-sm">RTL scoped content</p></DirectionProvider>;
  if (id === "drawer") return <Drawer><DrawerTrigger asChild><Button>Open drawer</Button></DrawerTrigger><DrawerContent><DrawerHeader><DrawerTitle>Drawer</DrawerTitle><DrawerDescription>Bottom sheet motion.</DrawerDescription></DrawerHeader></DrawerContent></Drawer>;
  if (id === "dropdown-menu") return <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Open menu</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Profile</DropdownMenuItem><DropdownMenuItem>Settings</DropdownMenuItem></DropdownMenuContent></DropdownMenu>;
  if (id === "item") return <div className="grid w-full max-w-xl gap-3"><Item><ItemMedia><User className="h-4 w-4" /></ItemMedia><ItemContent><ItemTitle>Flat item</ItemTitle><ItemDescription>Default item keeps hover calm without border animation.</ItemDescription></ItemContent><ItemActions><Badge variant="secondary">Active</Badge></ItemActions></Item><Item surface="glass"><ItemMedia><Sparkles className="h-4 w-4" /></ItemMedia><ItemContent><ItemTitle>Glass item</ItemTitle><ItemDescription>Glass keeps the same calm hover behavior.</ItemDescription></ItemContent><ItemActions><Badge>Live</Badge></ItemActions></Item><Item surface="glass"><ItemMedia><Sparkles className="h-4 w-4" /></ItemMedia><ItemContent><ItemTitle>Themed glass item</ItemTitle><ItemDescription>Surface, border and shadow tokens follow theme.</ItemDescription></ItemContent><ItemActions><Badge variant="secondary">Theme</Badge></ItemActions></Item></div>;
  if (id === "kbd") return <div className="flex gap-2"><Kbd>⌘</Kbd><Kbd>K</Kbd></div>;
  if (id === "label") return <div className="grid w-full max-w-sm gap-2"><Label htmlFor="label-preview">Workspace</Label><Input id="label-preview" variant="pill" floatingLabel={false} placeholder="visetra" /></div>;
  if (id === "menubar") return <Menubar><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem>New</MenubarItem><MenubarItem>Save</MenubarItem></MenubarContent></MenubarMenu></Menubar>;
  if (id === "popover") return <Popover><PopoverTrigger asChild><Button variant="outline">Open popover</Button></PopoverTrigger><PopoverContent><p className="text-sm text-muted-foreground">Floating content surface.</p></PopoverContent></Popover>;
  if (id === "progress") return <Progress value={62} className="max-w-xl" />;
  if (id === "radio-group") return <RadioGroup defaultValue="studio" className="grid gap-3"><div className="flex items-center gap-3"><RadioGroupItem value="studio" id="studio" /><Label htmlFor="studio">Studio</Label></div><div className="flex items-center gap-3"><RadioGroupItem value="web" id="web" /><Label htmlFor="web">Web</Label></div></RadioGroup>;
  if (id === "scroll-area") return <ScrollArea className="h-36 max-w-xl rounded-2xl border border-white/[0.08] p-4"><div className="space-y-3">{componentNames.slice(0, 12).map(([, title]) => <p key={title} className="text-sm text-muted-foreground">{title}</p>)}</div></ScrollArea>;
  if (id === "select") return <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2"><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat / default</Badge><Select><SelectTrigger surface="flat"><SelectValue placeholder="Select product" /></SelectTrigger><SelectContent><SelectItem value="studio">Visetra Studio</SelectItem><SelectItem value="web">Visetra Web</SelectItem></SelectContent></Select></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat / utility</Badge><Select><SelectTrigger className="border-animation-primary" surface="flat"><SelectValue placeholder="Select product" /></SelectTrigger><SelectContent><SelectItem value="studio">Visetra Studio</SelectItem><SelectItem value="web">Visetra Web</SelectItem></SelectContent></Select></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient / default</Badge><Select><SelectTrigger surface="gradient"><SelectValue placeholder="Select product" /></SelectTrigger><SelectContent><SelectItem value="studio">Visetra Studio</SelectItem><SelectItem value="web">Visetra Web</SelectItem></SelectContent></Select></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient / utility</Badge><Select><SelectTrigger className="gradient-primary/50" surface="gradient"><SelectValue placeholder="Select product" /></SelectTrigger><SelectContent><SelectItem value="studio">Visetra Studio</SelectItem><SelectItem value="web">Visetra Web</SelectItem></SelectContent></Select></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Glass / default</Badge><Select><SelectTrigger surface="glass"><SelectValue placeholder="Select product" /></SelectTrigger><SelectContent><SelectItem value="studio">Visetra Studio</SelectItem><SelectItem value="web">Visetra Web</SelectItem></SelectContent></Select></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Glass / utility</Badge><Select><SelectTrigger className="gradient-primary/50 border-animation-primary" surface="glass"><SelectValue placeholder="Select product" /></SelectTrigger><SelectContent><SelectItem value="studio">Visetra Studio</SelectItem><SelectItem value="web">Visetra Web</SelectItem></SelectContent></Select></div></div>;
  if (id === "separator") return <div className="max-w-xl"><p>Before</p><Separator className="my-4" /><p>After</p></div>;
  if (id === "sheet") return <Sheet><SheetTrigger asChild><Button>Immerse yourself</Button></SheetTrigger><SheetContent size="lg"><SheetHeader><SheetTitle className="text-3xl sm:text-5xl">Ultra Retina XDR.</SheetTitle><SheetDescription>The centered sheet opens as a focused detail surface with a detached close control, inspired by Apple product deep dives.</SheetDescription></SheetHeader><div className="mt-6 grid gap-4 md:grid-cols-3"><Card className="bg-white/[0.035]"><CardHeader><CardTitle>sm</CardTitle><CardDescription>Compact detail surface.</CardDescription></CardHeader></Card><Card className="bg-white/[0.035]"><CardHeader><CardTitle>md</CardTitle><CardDescription>Default documentation size.</CardDescription></CardHeader></Card><Card className="bg-white/[0.035]"><CardHeader><CardTitle>lg / xl</CardTitle><CardDescription>Immersive product content.</CardDescription></CardHeader></Card></div><SheetFooter className="mt-8"><Button variant="secondary">Compare sizes</Button><Button>Continue</Button></SheetFooter></SheetContent></Sheet>;
  if (id === "sidebar") return <SidebarPreview />;
  if (id === "slider") return (
    <div className="grid w-full max-w-xl gap-8">
      <Slider defaultValue={[42]} max={100} step={1} aria-label="Progress" />
      <Slider variant="range" defaultValue={[24, 76]} max={100} step={1} aria-label="Budget range" />
      <div className="flex h-64 items-center justify-center gap-8">
        <Slider orientation="vertical" defaultValue={[62]} max={100} step={1} aria-label="Level" />
        <Slider orientation="vertical" variant="range" defaultValue={[18, 82]} max={100} step={1} aria-label="Vertical range" />
      </div>
    </div>
  );
  if (id === "spinner") return <Spinner size="lg" />;
  if (id === "switch") return <div className="flex items-center gap-3"><Switch id="switch-preview" defaultChecked /><Label htmlFor="switch-preview">Live preview</Label></div>;
  if (id === "textarea") return <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2"><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat / default</Badge><Textarea surface="flat" placeholder="Write a note..." /></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Flat / utility</Badge><Textarea wrapperClassName="border-animation-primary" surface="flat" placeholder="Write a note..." /></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient / default</Badge><Textarea surface="gradient" placeholder="Write a note..." /></div><div className="grid gap-2"><Badge variant="secondary" className="w-fit rounded-full border-white/[0.08] bg-white/[0.04] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">Gradient / utility</Badge><Textarea wrapperClassName="gradient-primary/50" surface="gradient" placeholder="Write a note..." /></div></div>;
  if (id === "toast") return <Button onClick={() => toast("Component saved", { description: "Toast uses the shared dark surface." })}>Show toast</Button>;
  if (id === "toggle") return <Toggle variant="outline" aria-label="Toggle bold"><AlignJustify className="h-4 w-4" /></Toggle>;
  if (id === "toggle-group") return <ToggleGroup defaultValue="center"><ToggleGroupItem value="left">Left</ToggleGroupItem><ToggleGroupItem value="center">Center</ToggleGroupItem><ToggleGroupItem value="right">Right</ToggleGroupItem></ToggleGroup>;
  if (id === "tooltip") return <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="outline">Hover</Button></TooltipTrigger><TooltipContent>Tooltip content</TooltipContent></Tooltip></TooltipProvider>;
  if (id === "flip-card") {
    return <div className="alka-theme-dark w-full max-w-xl rounded-3xl bg-[#050505] p-6 text-white"><FlipCard expandToViewport eyebrow="Heavy load and uptime" title="Industrial Tire" description="The card expands from its own position into a viewport dialog." image="/assets/sectors/tire-light.webp" minHeightClassName="min-h-[20rem]" /></div>;
  }
  if (id === "image-card") {
    return (
      <div className="w-full max-w-[26rem]">
        <ImageCard
          className="aspect-[3/4] min-h-0"
          imageSrc="/assets/sectors/automotive-light.webp"
          imageAlt="Close-up of an automotive manufacturing surface"
          subtitle="Manufacturing"
          title="Industrial intelligence"
          description="A full-bleed image card with a masked blurred copy area."
        />
      </div>
    );
  }
  return <div className="rounded-2xl border border-dashed border-white/[0.12] p-8 text-sm text-muted-foreground">Preview is available through the exported primitive API.</div>;
}
