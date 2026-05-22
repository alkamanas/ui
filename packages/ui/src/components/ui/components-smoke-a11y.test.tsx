import * as React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { afterEach, describe, expect, it } from "vitest";

import { FlipCard } from "@/components/display/flip-card";
import { ImageCard } from "@/components/display/image-card";
import { Navbar } from "@/components/navigation/section-aware-navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
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
  CommandPaletteProvider,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  DataTable,
  type DataTableColumnDef,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DirectionProvider,
  DatePicker,
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
  Slider,
  Spinner,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  FloatingPanel,
  useCommandPalette,
} from "@/index";

afterEach(() => cleanup());

const options = [
  { value: "studio", label: "Visetra Studio" },
  { value: "web", label: "Visetra Web" },
];

type DataTableSmokeRow = {
  status: string;
  task: string;
};

const dataTableColumns: DataTableColumnDef<DataTableSmokeRow>[] = [
  {
    accessorKey: "task",
    header: "Task",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

const dataTableRows: DataTableSmokeRow[] = [
  { task: "Publish package", status: "Ready" },
  { task: "Review docs", status: "In progress" },
];

function CommandPaletteTrigger() {
  const command = useCommandPalette();
  return <Button onClick={command.open}>Open command palette</Button>;
}

const cases: Array<[string, React.ReactElement]> = [
  [
    "accordion",
    <Accordion defaultValue="one">
      <AccordionItem value="one">
        <AccordionTrigger>Colors</AccordionTrigger>
        <AccordionContent>Panel content</AccordionContent>
      </AccordionItem>
    </Accordion>,
  ],
  [
    "alert",
    <Alert>
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>Alert content</AlertDescription>
    </Alert>,
  ],
  [
    "alert-dialog",
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Open alert dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm action</AlertDialogTitle>
          <AlertDialogDescription>Dialog description</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>,
  ],
  ["avatar", <Avatar><AvatarFallback>AK</AvatarFallback></Avatar>],
  ["badge", <Badge>Live</Badge>],
  [
    "breadcrumb",
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Button</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>,
  ],
  ["button", <Button>Continue</Button>],
  ["button-group", <ButtonGroup><Button>Day</Button><Button variant="secondary">Week</Button></ButtonGroup>],
  ["calendar", <Calendar mode="single" selected={new Date(2026, 4, 20)} defaultMonth={new Date(2026, 4, 20)} />],
  [
    "card",
    <Card>
      <CardHeader>
        <CardTitle>Workspace</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>Card content</CardContent>
    </Card>,
  ],
  [
    "carousel",
    <Carousel>
      <CarouselContent>
        <CarouselItem><Card>1</Card></CarouselItem>
        <CarouselItem><Card>2</Card></CarouselItem>
      </CarouselContent>
      <CarouselPrevious aria-label="Previous slide" />
      <CarouselNext aria-label="Next slide" />
      <CarouselDots />
    </Carousel>,
  ],
  ["checkbox", <Checkbox aria-label="Accept terms" defaultChecked />],
  [
    "collapsible",
    <Collapsible>
      <CollapsibleTrigger asChild><Button>Toggle details</Button></CollapsibleTrigger>
      <CollapsibleContent>Details</CollapsibleContent>
    </Collapsible>,
  ],
  ["combobox", <Combobox options={options} />],
  [
    "command",
    <Command>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Actions"><CommandItem>Open</CommandItem></CommandGroup>
      </CommandList>
    </Command>,
  ],
  [
    "context-menu",
    <ContextMenu>
      <ContextMenuTrigger>Right click</ContextMenuTrigger>
      <ContextMenuContent><ContextMenuItem>Open</ContextMenuItem></ContextMenuContent>
    </ContextMenu>,
  ],
  [
    "data-table",
    <DataTable
      columns={dataTableColumns}
      data={dataTableRows}
      enableColumnVisibility={false}
      enablePagination={false}
      enableRowSelection={false}
    />,
  ],
  [
    "dialog",
    <Dialog>
      <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>,
  ],
  ["date-picker", <DatePicker defaultValue={new Date(2026, 4, 20)} />],
  ["direction", <DirectionProvider dir="rtl"><div>RTL content</div></DirectionProvider>],
  [
    "drawer",
    <Drawer>
      <DrawerTrigger asChild><Button>Open drawer</Button></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer title</DrawerTitle>
          <DrawerDescription>Drawer description</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>,
  ],
  [
    "dropdown-menu",
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button>Open menu</Button></DropdownMenuTrigger>
      <DropdownMenuContent><DropdownMenuItem>Profile</DropdownMenuItem></DropdownMenuContent>
    </DropdownMenu>,
  ],
  ["flip-card", <FlipCard title="Sector card" description="Description" eyebrow="Sector" />],
  [
    "floating-panel",
    <FloatingPanel>
      <h2>Floating panel</h2>
      <p>Panel content</p>
    </FloatingPanel>,
  ],
  [
    "image-card",
    <ImageCard
      imageSrc="data:image/gif;base64,R0lGODlhAQABAAAAACw="
      imageAlt="Industrial workspace"
      subtitle="Operations"
      title="Image card"
      description="Readable content over imagery."
    />,
  ],
  ["input", <Input aria-label="Workspace name" placeholder="workspace" />],
  [
    "input-group",
    <InputGroup>
      <InputGroupAddon>https://</InputGroupAddon>
      <InputGroupInput aria-label="Domain" placeholder="studio" />
    </InputGroup>,
  ],
  [
    "input-otp",
    <InputOTP maxLength={4}>
      <InputOTPGroup>
        {[0, 1].map((index) => <InputOTPSlot key={index} index={index} />)}
        <InputOTPSeparator />
        {[2, 3].map((index) => <InputOTPSlot key={index} index={index} />)}
      </InputOTPGroup>
    </InputOTP>,
  ],
  [
    "item",
    <Item>
      <ItemMedia>01</ItemMedia>
      <ItemContent>
        <ItemTitle>Item title</ItemTitle>
        <ItemDescription>Item description</ItemDescription>
      </ItemContent>
      <ItemActions><Badge>New</Badge></ItemActions>
    </Item>,
  ],
  ["kbd", <Kbd>⌘</Kbd>],
  ["label", <Label htmlFor="field">Field</Label>],
  [
    "menubar",
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent><MenubarItem>New</MenubarItem></MenubarContent>
      </MenubarMenu>
    </Menubar>,
  ],
  [
    "section-aware-navbar",
    <Navbar
      brand={<span>Alkamanas</span>}
      links={[{ href: "#components", label: "Components" }]}
      syncThemeMeta={false}
      theme="dark"
    />,
  ],
  [
    "popover",
    <Popover>
      <PopoverTrigger asChild><Button>Open popover</Button></PopoverTrigger>
      <PopoverContent>Popover content</PopoverContent>
    </Popover>,
  ],
  ["progress", <Progress value={50} aria-label="Loading progress" />],
  [
    "radio-group",
    <RadioGroup defaultValue="studio" aria-label="Product">
      <RadioGroupItem value="studio" id="studio" />
      <Label htmlFor="studio">Studio</Label>
    </RadioGroup>,
  ],
  ["scroll-area", <ScrollArea className="h-24"><div>Scrollable content</div></ScrollArea>],
  [
    "select",
    <Select>
      <SelectTrigger aria-label="Product"><SelectValue placeholder="Select product" /></SelectTrigger>
      <SelectContent><SelectItem value="studio">Visetra Studio</SelectItem></SelectContent>
    </Select>,
  ],
  ["separator", <Separator />],
  [
    "sheet",
    <Sheet>
      <SheetTrigger asChild><Button>Open sheet</Button></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>,
  ],
  [
    "sidebar",
    <SidebarProvider defaultOpen>
      <Sidebar position="relative">
        <SidebarHeader>Workspace</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem><SidebarMenuButton isActive>Overview</SidebarMenuButton></SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>,
  ],
  ["slider", <Slider defaultValue={[42]} aria-label="Traffic" />],
  ["spinner", <Spinner />],
  ["switch", <Switch aria-label="Live preview" defaultChecked />],
  [
    "tabs",
    <Tabs defaultValue="preview">
      <TabsList><TabsTrigger value="preview">Preview</TabsTrigger></TabsList>
      <TabsContent value="preview">Preview content</TabsContent>
    </Tabs>,
  ],
  ["textarea", <Textarea aria-label="Notes" placeholder="Write a note" />],
  ["toast", <Toaster />],
  ["toggle", <Toggle aria-label="Toggle bold">B</Toggle>],
  [
    "toggle-group",
    <ToggleGroup type="single" defaultValue="center" aria-label="Alignment">
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
    </ToggleGroup>,
  ],
  [
    "tooltip",
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild><Button>Hover</Button></TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  ],
  [
    "command-palette",
    <CommandPaletteProvider
      groups={[
        {
          heading: "Navigation",
          items: [{ key: "components", title: "Open components", onSelect: () => undefined }],
        },
      ]}
    >
      <CommandPaletteTrigger />
    </CommandPaletteProvider>,
  ],
];

describe("component smoke and a11y", () => {
  it.each(cases)("%s renders without axe violations", async (_name, element) => {
    const { container } = render(<div className="theme-dark">{element}</div>);

    expect(container.firstElementChild).toBeTruthy();
    await expect(axe(container)).resolves.toHaveNoViolations();
  });

  it("supports interactive dialog opening in jsdom", async () => {
    render(
      <Dialog>
        <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Interactive dialog</DialogTitle>
            <DialogDescription>Opened by user event.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Open dialog" }));

    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("applies explicit navbar logo widths to wide and compact variants", () => {
    render(
      <Navbar
        logo={{
          wide: { dark: <span>Wide logo</span> },
          compact: { dark: <span>Compact logo</span> },
        }}
        logoWidths={{ wide: "10rem", compact: "2.25rem" }}
        syncThemeMeta={false}
        theme="dark"
      />,
    );

    expect(screen.getByText("Wide logo").parentElement?.style.width).toBe("10rem");
    expect(screen.getByText("Compact logo").parentElement?.style.width).toBe("2.25rem");
  });

  it("supports command palette opening in jsdom without axe violations", async () => {
    const { container } = render(
      <div className="theme-dark">
        <CommandPaletteProvider
          groups={[
            {
              heading: "Navigation",
              items: [{ key: "components", title: "Open components", onSelect: () => undefined }],
            },
          ]}
        >
          <CommandPaletteTrigger />
        </CommandPaletteProvider>
      </div>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Open command palette" }));

    expect(screen.getByRole("dialog")).toBeTruthy();
    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});
