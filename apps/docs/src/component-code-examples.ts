export const previewCodeById: Record<string, string> = {
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
  avatar: `import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@alkamanas/ui";

export function AvatarDemo() {
  return (
    <div className="grid gap-4">
      <Avatar>
        <AvatarImage src="/assets/sectors/automotive-light.webp" />
        <AvatarFallback>VS</AvatarFallback>
      </Avatar>

      <AvatarGroup>
        <Avatar><AvatarFallback>CN</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>LR</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>ER</AvatarFallback></Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}`,
  badge: `import { Badge } from "@alkamanas/ui";

export function BadgeDemo() {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge size="sm" variant="outline">Small</Badge>
        <Badge size="md" variant="outline">Medium</Badge>
        <Badge size="lg" variant="outline">Large</Badge>
      </div>
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
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
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
        <Button>Flat</Button>
        <Button variant="flat">Primary flat</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="glassPrimary">Primary glass</Button>
        <Button variant="glassSecondary">Secondary glass</Button>
        <Button variant="glassDestructive">Destructive glass</Button>
        <Button variant="outline">Outline glass</Button>
      </div>
    </div>
  );
}`,
  "button-group": `import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, ButtonGroup, ButtonGroupSeparator } from "@alkamanas/ui";

export function ButtonGroupDemo() {
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
}`,
  calendar: `"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";
import { Calendar } from "@alkamanas/ui";

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 4, 20));
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 4, 12),
    to: new Date(2026, 4, 18),
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={date} />
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        defaultMonth={range?.from}
      />
    </div>
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
    <div className="grid gap-4 md:grid-cols-3">
      <div className="grid gap-2">
        <Badge variant="secondary">Flat / default</Badge>
        <Combobox surface="flat" options={options} />
      </div>
      <div className="grid gap-2">
        <Badge variant="secondary">Gradient / utility</Badge>
        <Combobox
          surface="gradient"
          className="gradient-primary/50 border-animation-primary"
          options={options}
        />
      </div>
      <div className="grid gap-2">
        <Badge variant="secondary">Glass / default</Badge>
        <Combobox surface="glass" options={options} />
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
} from "@alkamanas/ui";

export function ContextMenuDemo() {
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
}`,
  "data-table": `"use client";

import { DataTable, type DataTableColumnDef } from "@alkamanas/ui/data-table";
import "@alkamanas/ui/data-table.css";
import {
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@alkamanas/ui";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const payments: Payment[] = [
  { id: "728ed52f", amount: 316, status: "success", email: "utku@example.com" },
  { id: "489e1d42", amount: 242, status: "processing", email: "berkay@example.com" },
  { id: "95a8f4d1", amount: 837, status: "success", email: "studio@example.com" },
  { id: "7f2d9a6c", amount: 874, status: "success", email: "product@example.com" },
  { id: "20c7f3ba", amount: 721, status: "failed", email: "billing@example.com" },
];

const columns: DataTableColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all rows"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("status")}</Badge>,
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
        <span aria-hidden="true">{column.getIsSorted() === "asc" ? "Asc" : "Sort"}</span>
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
            <Button aria-label={\`Open actions for \${row.original.email}\`} size="sm" variant="ghost">
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

export function DataTableDemo() {
  return (
    <DataTable
      columns={columns}
      data={payments}
      filterColumn="email"
      filterPlaceholder="Filter emails..."
      pageSize={5}
    />
  );
}`,
  "date-picker": `"use client";

import { DatePicker } from "@alkamanas/ui";

export function DatePickerDemo() {
  return (
    <div className="grid gap-4">
      <DatePicker defaultValue={new Date(2026, 4, 20)} />
      <DatePicker
        placeholder="Select launch date"
        calendarProps={{
          disabled: { before: new Date(2026, 4, 1) },
          defaultMonth: new Date(2026, 4, 1),
        }}
      />
    </div>
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
        eyebrow="Heavy load and uptime"
        title="Industrial Tire"
        description="The card expands from its own position into a viewport dialog."
        image="/assets/sectors/tire-light.webp"
        minHeightClassName="min-h-[20rem]"
      />
    </div>
  );
}`,
  "image-card": `import { ImageCard } from "@alkamanas/ui";

export function ImageCardDemo() {
  return (
    <ImageCard
      imageSrc="/assets/sectors/automotive-light.webp"
      imageAlt="Close-up of an automotive manufacturing surface"
      subtitle="Manufacturing"
      title="Industrial intelligence"
      description="A full-bleed image card with a gradient-masked blurred copy area."
    />
  );
}`,
  input: `import { Badge, Input } from "@alkamanas/ui";

export function InputDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="grid gap-2">
        <Badge variant="secondary">Underline / default</Badge>
        <Input placeholder="workspace-name" />
      </div>
      <div className="grid gap-2">
        <Badge variant="secondary">Pill Gradient / utility</Badge>
        <Input
          variant="pill"
          surface="gradient"
          className="gradient-primary/50 border-animation-primary"
          placeholder="studio.visetra.app"
        />
      </div>
      <div className="grid gap-2">
        <Badge variant="secondary">Pill glass / default</Badge>
        <Input variant="pill" surface="glass" placeholder="studio.visetra.app" />
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
    <div className="grid gap-4 md:grid-cols-3">
      <div className="grid gap-2">
        <Badge variant="secondary">Flat / default</Badge>
        <InputGroup surface="flat">
          <InputGroupAddon>https://</InputGroupAddon>
          <InputGroupInput placeholder="studio.visetra.app" />
          <InputGroupAddon>.com</InputGroupAddon>
        </InputGroup>
      </div>
      <div className="grid gap-2">
        <Badge variant="secondary">Gradient / utility</Badge>
        <InputGroup surface="gradient" className="gradient-primary/50">
          <InputGroupAddon>https://</InputGroupAddon>
          <InputGroupInput placeholder="studio.visetra.app" />
          <InputGroupAddon>.com</InputGroupAddon>
        </InputGroup>
      </div>
      <div className="grid gap-2">
        <Badge variant="secondary">Glass / default</Badge>
        <InputGroup surface="glass">
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
      <Item>
        <ItemMedia>01</ItemMedia>
        <ItemContent>
          <ItemTitle>Flat item</ItemTitle>
          <ItemDescription>Default hover stays calm.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge variant="secondary">Active</Badge>
        </ItemActions>
      </Item>
      <Item surface="glass">
        <ItemMedia>02</ItemMedia>
        <ItemContent>
          <ItemTitle>Glass item</ItemTitle>
          <ItemDescription>Hover keeps the standard border without animation.</ItemDescription>
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
    <div className="grid gap-3">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
            <MenubarItem>Save</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Menubar surface="glass">
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Zoom in</MenubarItem>
            <MenubarItem>Zoom out</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}`,
  navbar: `import { Navbar, NavbarCTA } from "@alkamanas/ui/navbar";
import "@alkamanas/ui/navbar.css";

export function NavbarDemo() {
  return (
    <Navbar
      logo={{
        wide: {
          dark: (
            <img
              src="/assets/logo/wordmark-horizontal-for-dark.svg"
              alt="Alkamanas UI"
              className="h-7 w-full object-contain"
            />
          ),
          light: (
            <img
              src="/assets/logo/wordmark-horizontal-for-light.svg"
              alt="Alkamanas UI"
              className="h-7 w-full object-contain"
            />
          ),
        },
        compact: {
          dark: (
            <img
              src="/assets/logo/brandmarksvg.svg"
              alt="Alkamanas UI"
              className="h-7 w-full object-contain"
            />
          ),
          light: (
            <img
              src="/assets/logo/brandmarksvg.svg"
              alt="Alkamanas UI"
              className="h-7 w-full object-contain"
            />
          ),
        },
        widths: {
          wide: "13.5rem",
          compact: "2.35rem",
        },
      }}
      theme="dark"
      syncThemeMeta={false}
      links={[
        { href: "/components/button", label: "Components" },
        { href: "/components/sidebar", label: "Shell" },
        { href: "/theming", label: "Theme" },
      ]}
      rightSlot={<NavbarCTA href="/installation">Install</NavbarCTA>}
      mobileFooterSlot={<NavbarCTA href="/installation">Install</NavbarCTA>}
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
    <div className="grid gap-4 md:grid-cols-3">
      <div className="grid gap-2">
        <Badge variant="secondary">Flat / default</Badge>
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
        <Badge variant="secondary">Gradient / utility</Badge>
        <Select>
          <SelectTrigger surface="gradient" className="gradient-primary/50">
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="studio">Visetra Studio</SelectItem>
            <SelectItem value="web">Visetra Web</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Badge variant="secondary">Glass / default</Badge>
        <Select>
          <SelectTrigger surface="glass">
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
  return (
    <div className="grid gap-8">
      <Slider defaultValue={[42]} max={100} step={1} className="max-w-xl" aria-label="Progress" />
      <Slider
        variant="range"
        defaultValue={[24, 76]}
        max={100}
        step={1}
        className="max-w-xl"
        aria-label="Budget range"
      />
      <div className="flex h-72 items-center gap-8">
        <Slider orientation="vertical" defaultValue={[62]} max={100} step={1} aria-label="Level" />
        <Slider
          orientation="vertical"
          variant="range"
          defaultValue={[18, 82]}
          max={100}
          step={1}
          aria-label="Vertical range"
        />
      </div>
    </div>
  );
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
      <TabsList surface="flat">
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
        <Badge variant="secondary">Flat / default</Badge>
        <Textarea surface="flat" placeholder="Write a note..." />
      </div>
      <div className="grid gap-2">
        <Badge variant="secondary">Gradient / utility</Badge>
        <Textarea
          surface="gradient"
          className="gradient-primary/50 border-animation-primary"
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
