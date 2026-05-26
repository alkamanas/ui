import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
  type ComponentType,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  Blocks,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Command,
  Copy,
  CreditCard,
  Database,
  Factory,
  FileText,
  Gauge,
  Globe2,
  Info,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Maximize,
  Monitor,
  MousePointer2,
  PackageCheck,
  Palette,
  Play,
  Plus,
  Rocket,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Smartphone,
  TrendingUp,
  UsersRound,
  WalletCards,
  Zap,
  X,
} from "lucide-react";
import {
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  GlassProvider,
  ImageCard,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Kbd,
  Navbar,
  NavbarCTA,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Slider,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@alkamanas/ui";

import { PageScrollbar } from "./page-scrollbar";

const brandmarkUrl = new URL("../../../public/assets/logo/brandmarksvg.svg", import.meta.url).href;
const wordmarkForDarkUrl = new URL("../../../public/assets/logo/wordmark-horizontal-for-dark.svg", import.meta.url).href;

function ExamplesWordmark({ className }: { className?: string }) {
  return <img alt="Alkamanas Examples" className={className} decoding="async" loading="eager" src={wordmarkForDarkUrl} />;
}

function ExamplesBrandmark({ className }: { className?: string }) {
  return <img alt="Alkamanas Examples" className={className} decoding="async" loading="eager" src={brandmarkUrl} />;
}

const examplesNavbarLogo = {
  wide: {
    dark: <ExamplesWordmark className="examples-navbar-wordmark" />,
    light: <ExamplesWordmark className="examples-navbar-wordmark" />,
  },
  compact: {
    dark: <ExamplesBrandmark className="examples-navbar-brandmark" />,
    light: <ExamplesBrandmark className="examples-navbar-brandmark" />,
  },
  widths: {
    wide: "13rem",
    compact: "2.35rem",
  },
};

type CategoryId = "marketing" | "dashboard" | "commerce" | "productivity" | "legal";
type ExampleId =
  | "basic-landing"
  | "glass-command-center"
  | "saas-dashboard"
  | "pricing-page"
  | "settings-page"
  | "storefront"
  | "checkout-flow"
  | "payment-method"
  | "admin-console"
  | "analytics-overview"
  | "calendar-app"
  | "kanban-board"
  | "bento-grid"
  | "portfolio"
  | "terms-page"
  | "invoice-page";

type Category = {
  id: CategoryId;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

type Example = {
  id: ExampleId;
  category: CategoryId;
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  complexity: "Starter" | "Standard" | "Advanced";
  featured?: boolean;
  recent?: boolean;
  icon: ComponentType<{ className?: string }>;
  preview:
    | "landing"
    | "dashboard"
    | "pricing"
    | "storefront"
    | "checkout"
    | "kanban"
    | "document"
    | "portfolio"
    | "calendar"
    | "bento"
    | "command"
    | "settings";
};

const categories: Category[] = [
  {
    id: "marketing",
    title: "Marketing",
    description: "Landing pages, pricing, portfolio and launch surfaces.",
    icon: Rocket,
  },
  {
    id: "dashboard",
    title: "Dashboards",
    description: "Admin, analytics and operational workspaces.",
    icon: LayoutDashboard,
  },
  {
    id: "commerce",
    title: "Commerce",
    description: "Storefront, checkout and revenue workflows.",
    icon: ShoppingBag,
  },
  {
    id: "productivity",
    title: "Productivity",
    description: "Calendars, kanban boards and focused team tools.",
    icon: CalendarDays,
  },
  {
    id: "legal",
    title: "Legal",
    description: "Text-heavy pages that still use the design system.",
    icon: FileText,
  },
];

const examples: Example[] = [
  {
    id: "basic-landing",
    category: "marketing",
    title: "SaaS landing page",
    eyebrow: "Marketing",
    description: "Hero, proof, feature sections and CTA built with Alkamanas primitives.",
    tags: ["Navbar", "Hero", "Cards", "CTA"],
    complexity: "Starter",
    featured: true,
    recent: true,
    icon: Rocket,
    preview: "landing",
  },
  {
    id: "pricing-page",
    category: "marketing",
    title: "Pricing page",
    eyebrow: "Conversion",
    description: "Plan cards, feature comparison and short conversion form.",
    tags: ["Cards", "Badges", "Inputs"],
    complexity: "Standard",
    featured: true,
    icon: CircleDollarSign,
    preview: "pricing",
  },
  {
    id: "glass-command-center",
    category: "marketing",
    title: "Fintech glass landing",
    eyebrow: "Landing",
    description: "A centered fintech landing page with glass cards, wallet surfaces and payment controls.",
    tags: ["Glass", "Navbar", "Wallet", "Cards"],
    complexity: "Advanced",
    featured: true,
    recent: true,
    icon: WalletCards,
    preview: "command",
  },
  {
    id: "settings-page",
    category: "productivity",
    title: "Settings page",
    eyebrow: "Productivity",
    description: "Account, notifications and appearance settings with form controls.",
    tags: ["Tabs", "Switch", "Select", "Slider"],
    complexity: "Standard",
    featured: true,
    recent: true,
    icon: Settings,
    preview: "settings",
  },
  {
    id: "portfolio",
    category: "marketing",
    title: "Portfolio page",
    eyebrow: "Showcase",
    description: "Project cards, testimonial proof and contact panel.",
    tags: ["ImageCard", "Items", "Tabs"],
    complexity: "Starter",
    recent: true,
    icon: BriefcaseBusiness,
    preview: "portfolio",
  },
  {
    id: "bento-grid",
    category: "marketing",
    title: "Alkamanas Bento grid",
    eyebrow: "Marketing",
    description: "A dense product showcase built with Alkamanas cards, badges, buttons and items.",
    tags: ["Card", "Badge", "Button", "Item"],
    complexity: "Advanced",
    featured: true,
    recent: true,
    icon: Blocks,
    preview: "bento",
  },
  {
    id: "saas-dashboard",
    category: "dashboard",
    title: "SaaS dashboard",
    eyebrow: "Dashboard",
    description: "Metrics, account states and command-like list surfaces.",
    tags: ["Tabs", "Progress", "Items"],
    complexity: "Advanced",
    featured: true,
    recent: true,
    icon: BarChart3,
    preview: "dashboard",
  },
  {
    id: "admin-console",
    category: "dashboard",
    title: "Admin console",
    eyebrow: "Operations",
    description: "Dense admin page with status cards and role-aware actions.",
    tags: ["Cards", "Badges", "Buttons"],
    complexity: "Standard",
    icon: ShieldCheck,
    preview: "dashboard",
  },
  {
    id: "analytics-overview",
    category: "dashboard",
    title: "Analytics overview",
    eyebrow: "Reports",
    description: "A reporting page with segmented tabs and KPI grids.",
    tags: ["Tabs", "Progress", "Cards"],
    complexity: "Standard",
    recent: true,
    icon: Gauge,
    preview: "dashboard",
  },
  {
    id: "storefront",
    category: "commerce",
    title: "Storefront",
    eyebrow: "Commerce",
    description: "Product discovery surface with category filters and product cards.",
    tags: ["Badges", "Cards", "ImageCard"],
    complexity: "Standard",
    featured: true,
    icon: Store,
    preview: "storefront",
  },
  {
    id: "checkout-flow",
    category: "commerce",
    title: "Checkout flow",
    eyebrow: "Revenue",
    description: "Checkout shell with order summary, inputs and trust signals.",
    tags: ["Inputs", "Items", "CTA"],
    complexity: "Advanced",
    icon: PackageCheck,
    preview: "checkout",
  },
  {
    id: "payment-method",
    category: "commerce",
    title: "Add payment method",
    eyebrow: "Payments",
    description: "Card entry flow with animated payment cards, billing controls and trust signals.",
    tags: ["Animated card", "Inputs", "Select"],
    complexity: "Advanced",
    recent: true,
    icon: WalletCards,
    preview: "checkout",
  },
  {
    id: "calendar-app",
    category: "productivity",
    title: "Calendar app",
    eyebrow: "Productivity",
    description: "Calendar landing surface with agenda cards and availability controls.",
    tags: ["Tabs", "Items", "Badges"],
    complexity: "Standard",
    icon: CalendarDays,
    preview: "calendar",
  },
  {
    id: "kanban-board",
    category: "productivity",
    title: "Kanban board",
    eyebrow: "Workflow",
    description: "Board-style page using cards, badges and compact actions.",
    tags: ["Cards", "Badges", "Buttons"],
    complexity: "Starter",
    recent: true,
    icon: Blocks,
    preview: "kanban",
  },
  {
    id: "terms-page",
    category: "legal",
    title: "Terms page",
    eyebrow: "Legal",
    description: "Readable text page with anchors, summaries and document metadata.",
    tags: ["Cards", "Breadcrumb", "Items"],
    complexity: "Starter",
    icon: FileText,
    preview: "document",
  },
  {
    id: "invoice-page",
    category: "legal",
    title: "Invoice page",
    eyebrow: "Document",
    description: "Invoice-style page with customer summary and payment CTA.",
    tags: ["Cards", "Items", "Inputs"],
    complexity: "Standard",
    icon: BadgeCheck,
    preview: "document",
  },
];

const platformStats = [
  { label: "Activation", value: "83%", icon: TrendingUp },
  { label: "Teams", value: "1.8k", icon: UsersRound },
  { label: "Automations", value: "42k", icon: Zap },
];

const featureItems = [
  {
    title: "Signal-aware workspace",
    description: "Operational events are grouped into calm, readable decision surfaces.",
    icon: Gauge,
  },
  {
    title: "Launch controls",
    description: "Review queues, deployment states and ownership are visible in one place.",
    icon: Rocket,
  },
  {
    title: "Secure collaboration",
    description: "Team roles, approvals and audit trails stay close to every workflow.",
    icon: ShieldCheck,
  },
];

function getExampleIdFromPath(): ExampleId | null {
  if (typeof window === "undefined") return null;

  const [, section, id] = window.location.pathname.split("/");
  if (section !== "examples" || !id) return null;

  return examples.some((example) => example.id === id) ? (id as ExampleId) : null;
}

export function ExamplesApp() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | "all">("all");
  const [activeExample, setActiveExample] = useState<ExampleId | null>(() => getExampleIdFromPath());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const selectedExample = useMemo(
    () => examples.find((example) => example.id === activeExample),
    [activeExample],
  );
  const visibleExamples = useMemo(
    () =>
      activeCategory === "all"
        ? examples
        : examples.filter((example) => example.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    document.documentElement.classList.add("alka-theme-dark");
    document.documentElement.dataset.theme = "dark";
    document.body.classList.add("alka-theme-dark", "examples-portal-theme");
    document.body.dataset.theme = "dark";

    return () => {
      document.documentElement.classList.remove("alka-theme-dark");
      document.body.classList.remove("alka-theme-dark", "examples-portal-theme");
      delete document.documentElement.dataset.theme;
      delete document.body.dataset.theme;
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => setActiveExample(getExampleIdFromPath());

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const openSearch = () => {
      setIsSearchOpen(true);
      window.requestAnimationFrame(() => {
        document.querySelector<HTMLInputElement>(".examples-search-input-shell input")?.focus();
      });
    };

    window.addEventListener("examples:open-search", openSearch);
    return () => window.removeEventListener("examples:open-search", openSearch);
  }, []);

  useEffect(() => {
    const openSearchShortcut = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") return;

      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }

      event.preventDefault();
      setIsSearchOpen(true);
    };

    window.addEventListener("keydown", openSearchShortcut);
    return () => window.removeEventListener("keydown", openSearchShortcut);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [activeExample]);

  const openExample = (id: ExampleId) => {
    setIsSearchOpen(false);
    setActiveExample(id);
    window.history.pushState(null, "", `/examples/${id}`);
  };

  const openHome = () => {
    setActiveExample(null);
    window.history.pushState(null, "", "/");
  };

  const openHomeSection = (sectionId: string, categoryId?: CategoryId | "all") => {
    setIsSearchOpen(false);
    if (categoryId) setActiveCategory(categoryId);
    setActiveExample(null);
    window.history.pushState(null, "", `/#${sectionId}`);
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <GlassProvider effect="blurry" realisticStrategy="auto">
      <TooltipProvider>
        <div className="examples-app alka-theme-dark" data-theme="dark">
          <PageScrollbar />
          {selectedExample ? (
            <ExampleDetail example={selectedExample} onBack={openHome} />
          ) : (
            <ExamplesHome
              activeCategory={activeCategory}
              visibleExamples={visibleExamples}
              onCategoryChange={setActiveCategory}
              onOpenExample={openExample}
            />
          )}
          <ExamplesSearchDialog
            open={isSearchOpen}
            onOpenChange={setIsSearchOpen}
            onOpenExample={openExample}
            onOpenSection={openHomeSection}
          />
        </div>
      </TooltipProvider>
    </GlassProvider>
  );
}

function ExamplesHome({
  activeCategory,
  visibleExamples,
  onCategoryChange,
  onOpenExample,
}: {
  activeCategory: CategoryId | "all";
  visibleExamples: Example[];
  onCategoryChange: (id: CategoryId | "all") => void;
  onOpenExample: (id: ExampleId) => void;
}) {
  const heroExamples = examples.filter((example) =>
    ["glass-command-center", "checkout-flow", "payment-method", "bento-grid"].includes(example.id),
  );

  return (
    <>
      <ExamplesNavbar />
      <main className="examples-home" data-navbar-theme="dark" data-theme-color="#050505">
        <section className="examples-hero">
          <div className="examples-shell">
            <div className="hero-copy">
              <Badge className="hero-eyebrow" size="md" variant="outline">
                <Blocks />
                UI templates
              </Badge>
              <h1>Premium UI Examples</h1>
              <p>
                Beautiful, production-ready templates and components to ship exceptional digital products.
              </p>
            </div>
            <div className="hero-example-grid" aria-label="Featured UI examples">
              {heroExamples.map((example) => (
                <ExampleCard key={example.id} example={example} onOpen={onOpenExample} />
              ))}
            </div>
          </div>
        </section>

        <section id="site-map" className="examples-section site-map-section" aria-label="Site map">
          <div className="examples-shell">
            <SectionHeading
              eyebrow="Site map"
              title="The examples app now has a browsable structure."
              description="Top-level navigation points to the gallery, categories, components used by examples and the request CTA."
            />
            <div className="site-map-grid">
              {categories.map((category) => (
                <Card key={category.id} variant="soft">
                  <CardHeader>
                    <div className="category-icon">
                      <category.icon />
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="category-links">
                      {examples
                        .filter((example) => example.category === category.id)
                        .map((example) => (
                          <button
                            className="category-link"
                            key={example.id}
                            type="button"
                            onClick={() => onOpenExample(example.id)}
                          >
                            <span>{example.title}</span>
                            <ChevronRight />
                          </button>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="examples" className="examples-section" aria-label="All examples">
          <div className="examples-shell">
            <div className="gallery-toolbar">
              <SectionHeading
                eyebrow="All examples"
                title="Browse by category."
              />
              <div className="category-filter" aria-label="Example categories">
                <Button
                  size="sm"
                  variant={activeCategory === "all" ? "flat" : "glass"}
                  onClick={() => onCategoryChange("all")}
                >
                  All
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    size="sm"
                    variant={activeCategory === category.id ? "flat" : "glass"}
                    onClick={() => onCategoryChange(category.id)}
                  >
                    <category.icon />
                    {category.title}
                  </Button>
                ))}
              </div>
            </div>
            <div className="example-card-grid">
              {visibleExamples.map((example) => (
                <ExampleCard key={example.id} example={example} onOpen={onOpenExample} />
              ))}
            </div>
          </div>
        </section>

        <section id="components" className="examples-section components-section" aria-label="Components used">
          <div className="examples-shell components-grid">
            <SectionHeading
              eyebrow="Component inventory"
              title="No one-off UI primitives."
              description="The examples app starts from package exports: navigation, buttons, cards, badges, inputs, tabs, items, progress and media cards."
            />
            <Card>
              <CardContent className="component-cloud">
                {[
                  "Navbar",
                  "Button",
                  "Card",
                  "Badge",
                  "InputGroup",
                  "Item",
                  "Tabs",
                  "Progress",
                  "ImageCard",
                  "Tooltip",
                  "Breadcrumb",
                  "Avatar",
                ].map((component) => (
                  <Badge key={component} variant="outline" size="lg">
                    {component}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="request" className="examples-section request-section" aria-label="Request an example">
          <div className="examples-shell">
            <Card className="request-card">
              <CardHeader>
                <Badge>Request queue</Badge>
                <CardTitle>Next pass: make each card open a complete page example.</CardTitle>
                <CardDescription>
                  The structure is ready for adding real page builds without changing the gallery
                  contract.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="request-form">
                  <Input placeholder="Example idea" variant="pill" />
                  <InputGroup>
                    <InputGroupAddon>
                      <Mail />
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Component focus" />
                  </InputGroup>
                  <Button>
                    Add to queue
                    <ChevronRight />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <ExamplesFooter />
      </main>
    </>
  );
}

function ExamplesNavbar({ onNavigateHome }: { onNavigateHome?: () => void }) {
  return (
    <Navbar
      defaultTheme="dark"
      links={[
        { href: "/#site-map", label: "Categories", onSelect: onNavigateHome },
        { href: "/#examples", label: "Examples", onSelect: onNavigateHome },
        { href: "/#site-map", label: "Site map", onSelect: onNavigateHome },
        { href: "/#components", label: "Components", onSelect: onNavigateHome },
      ]}
      logo={examplesNavbarLogo}
      mobileFooterSlot={<NavbarActions onNavigateHome={onNavigateHome} />}
      mobileMenuLabel="Open navigation"
      mobileMenuCloseLabel="Close navigation"
      rightSlot={<NavbarActions onNavigateHome={onNavigateHome} />}
      theme="dark"
    />
  );
}

function NavbarActions({ onNavigateHome }: { onNavigateHome?: () => void }) {
  return (
    <div className="navbar-actions">
      <NavbarSearch />
      <NavbarCTA href="/#examples" label="Browse examples" onSelect={onNavigateHome} />
    </div>
  );
}

function NavbarSearch() {
  const openSearch = () => window.dispatchEvent(new Event("examples:open-search"));

  return (
    <div className="navbar-search">
      <InputGroup className="navbar-search-control" onClick={openSearch}>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          data-examples-search
          floatingLabel={false}
          placeholder="Search"
          readOnly
          onFocus={openSearch}
        />
        <InputGroupAddon className="navbar-search-shortcut">
          <Kbd className="navbar-search-kbd">
            <Command aria-hidden="true" className="navbar-command-icon" />
            <span>K</span>
          </Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

const searchSuggestionItems = [
  { label: "Settings", icon: Settings, exampleId: "settings-page" as ExampleId },
  { label: "Dashboard", icon: LayoutDashboard, exampleId: "saas-dashboard" as ExampleId },
  { label: "Pricing", icon: CreditCard, exampleId: "pricing-page" as ExampleId },
  { label: "Data table", icon: Database, sectionId: "components" },
  { label: "Landing page", icon: Globe2, exampleId: "basic-landing" as ExampleId },
  { label: "Auth", icon: LockKeyhole, sectionId: "request" },
  { label: "AI Chat", icon: Bell, exampleId: "glass-command-center" as ExampleId },
];

const searchPageIds: ExampleId[] = [
  "glass-command-center",
  "bento-grid",
  "checkout-flow",
  "payment-method",
];

const searchComponents = [
  { title: "Tabs", description: "Navigation", icon: Copy },
  { title: "Select", description: "Input", icon: ChevronDown },
  { title: "Slider", description: "Input", icon: Gauge },
  { title: "Data table", description: "Display", icon: Database },
];

function ExamplesSearchDialog({
  onOpenChange,
  onOpenExample,
  onOpenSection,
  open,
}: {
  onOpenChange: (open: boolean) => void;
  onOpenExample: (id: ExampleId) => void;
  onOpenSection: (sectionId: string, categoryId?: CategoryId | "all") => void;
  open: boolean;
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearchClosing, setIsSearchClosing] = useState(false);
  const closeAnimationFrameRef = useRef<number | undefined>(undefined);
  const closeAnimationTimerRef = useRef<number | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputFrameRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const normalizedQuery = debouncedQuery.trim().toLowerCase();
  const pageResults = useMemo(() => {
    const pageItems = searchPageIds
      .map((id) => examples.find((example) => example.id === id))
      .filter((example): example is Example => Boolean(example));

    if (!normalizedQuery) return pageItems;

    return pageItems.filter((example) =>
      [example.title, example.eyebrow, example.description, ...example.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery]);
  const componentResults = useMemo(() => {
    if (!normalizedQuery) return searchComponents;

    return searchComponents.filter((component) =>
      `${component.title} ${component.description}`.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  useEffect(() => {
    if (open) {
      if (closeAnimationTimerRef.current) {
        window.clearTimeout(closeAnimationTimerRef.current);
        closeAnimationTimerRef.current = undefined;
      }
      setIsSearchClosing(false);
      closeAnimationFrameRef.current = window.requestAnimationFrame(() => inputRef.current?.focus());
      return () => {
        if (closeAnimationFrameRef.current) {
          window.cancelAnimationFrame(closeAnimationFrameRef.current);
          closeAnimationFrameRef.current = undefined;
        }
      };
    }

    setIsSearchClosing(false);
    setQuery("");
    setDebouncedQuery("");
  }, [open]);

  useEffect(() => {
    return () => {
    if (closeAnimationFrameRef.current) {
      window.cancelAnimationFrame(closeAnimationFrameRef.current);
    }
      if (closeAnimationTimerRef.current) {
      window.clearTimeout(closeAnimationTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPaddingRight = document.body.style.paddingRight;
    const previousHtmlOverscrollBehavior = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPaddingRight;
      document.documentElement.style.overscrollBehavior = previousHtmlOverscrollBehavior;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const timeout = window.setTimeout(() => setDebouncedQuery(query), 180);
    return () => window.clearTimeout(timeout);
  }, [open, query]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.scrollTo({ top: 0, left: 0 });
  }, [open, normalizedQuery]);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSearch();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  function closeSearch() {
    if (isSearchClosing) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsSearchClosing(false);
      setQuery("");
      setDebouncedQuery("");
      onOpenChange(false);
      return;
    }

    setIsSearchClosing(true);
    if (closeAnimationTimerRef.current) {
      window.clearTimeout(closeAnimationTimerRef.current);
    }

    const animations = [
      overlayRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 300,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      }),
      contentRef.current?.animate(
        [
          { opacity: 1, transform: "translate3d(-50%, 0, 0) scale(1)" },
          { opacity: 0, transform: "translate3d(-50%, 22px, 0) scale(0.97)" },
        ],
        {
          duration: 520,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        },
      ),
      inputFrameRef.current?.animate(
        [
          { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
          { opacity: 0, transform: "translate3d(0, -10px, 0) scale(0.975)" },
        ],
        {
          duration: 360,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "forwards",
        },
      ),
    ].filter((animation): animation is Animation => Boolean(animation));

    closeAnimationTimerRef.current = window.setTimeout(() => {
      animations.forEach((animation) => animation.cancel());
      setIsSearchClosing(false);
      setQuery("");
      setDebouncedQuery("");
      onOpenChange(false);
      closeAnimationTimerRef.current = undefined;
    }, 560);
  }

  const searchInput = (
    <InputGroup className="examples-search-input-shell" surface="glass">
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput
        ref={inputRef}
        value={query}
        aria-label="Search examples, components and patterns"
        floatingLabel={false}
        placeholder="Search examples, components & patterns..."
        onChange={(event) => setQuery(event.target.value)}
      />
      <InputGroupAddon className="examples-search-shortcut">
        <Kbd className="examples-search-kbd">
          <Command aria-hidden="true" />
          <span>K</span>
        </Kbd>
      </InputGroupAddon>
    </InputGroup>
  );

  if (!open || typeof document === "undefined") return null;

  const searchState = isSearchClosing ? "closed" : "open";
  const searchMode = normalizedQuery.length > 0 ? "search" : "browse";

  return createPortal(
    <div
      className="examples-search-layer"
      data-state={searchState}
      role="dialog"
      aria-modal="true"
      aria-labelledby="examples-search-title"
    >
      <button
        ref={overlayRef}
        className="examples-search-overlay"
        data-state={searchState}
        type="button"
        aria-label="Close search"
        onClick={closeSearch}
      />
      <Card
        ref={contentRef}
        className="examples-search-content"
        data-mode={searchMode}
        data-state={searchState}
        variant="solid"
      >
        <h2 id="examples-search-title" className="sr-only">
          Search examples, components and patterns
        </h2>
        <button className="examples-search-close" type="button" aria-label="Close search" onClick={closeSearch}>
          <X />
        </button>
        <div key={searchMode} ref={panelRef} className="examples-search-panel" data-mode={searchMode}>
          <SearchDialogContent
            componentResults={componentResults}
            hasQuery={normalizedQuery.length > 0}
            onOpenExample={onOpenExample}
            onOpenSection={onOpenSection}
            pageResults={pageResults}
          />
        </div>
      </Card>
      <div ref={inputFrameRef} className="examples-search-input-frame" data-state={searchState}>
        {searchInput}
      </div>
    </div>,
    document.body,
  );
}

function SearchDialogContent({
  componentResults,
  hasQuery,
  onOpenExample,
  onOpenSection,
  pageResults,
}: {
  componentResults: typeof searchComponents;
  hasQuery: boolean;
  onOpenExample: (id: ExampleId) => void;
  onOpenSection: (sectionId: string, categoryId?: CategoryId | "all") => void;
  pageResults: Example[];
}) {
  const hasPageResults = pageResults.length > 0;
  const hasComponentResults = componentResults.length > 0;
  const hasAnyResults = hasPageResults || hasComponentResults;

  if (hasQuery && !hasAnyResults) {
    return (
      <div className="examples-search-empty">
        <Search />
        <strong>No results found</strong>
        <span>Try settings, pricing, dashboard, data table or kanban.</span>
      </div>
    );
  }

  return (
    <>
          {!hasQuery ? (
          <div className="examples-search-suggestions">
            <span>Suggestions</span>
            <div>
              {searchSuggestionItems.map((item) => (
                <Item
                  key={item.label}
                  asChild
                  className="examples-search-suggestion-item"
                  surface="bare"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (item.exampleId) onOpenExample(item.exampleId);
                      else if (item.sectionId) onOpenSection(item.sectionId);
                    }}
                  >
                    <item.icon />
                    {item.label}
                  </button>
                </Item>
              ))}
            </div>
          </div>
          ) : null}

          <div className="examples-search-columns">
            {hasPageResults ? (
            <SearchSection
              title="Pages"
              moreLabel="More"
              onMore={() => onOpenSection("examples")}
            >
              {pageResults.map((example) => (
                <Item
                  className="examples-search-page"
                  key={example.id}
                  asChild
                  surface="bare"
                >
                  <button
                    type="button"
                    onClick={() => onOpenExample(example.id)}
                  >
                    <span className="examples-search-page-thumb">
                      <ExampleCardVisualContent example={example} />
                    </span>
                    <span>
                      <strong>{example.title}</strong>
                      <em data-category={example.category}>{example.eyebrow}</em>
                    </span>
                  </button>
                </Item>
              ))}
            </SearchSection>
            ) : null}

            {hasComponentResults ? (
            <SearchSection
              title="Components"
              moreLabel="More"
              onMore={() => onOpenSection("components")}
            >
              {componentResults.map((component) => (
                <Item
                  className="examples-search-component"
                  key={component.title}
                  asChild
                  surface="bare"
                >
                  <button
                    type="button"
                    onClick={() => onOpenSection("components")}
                  >
                    <span className="examples-search-component-icon">
                      <component.icon />
                    </span>
                    <span>
                      <strong>{component.title}</strong>
                      <small>{component.description}</small>
                    </span>
                  </button>
                </Item>
              ))}
            </SearchSection>
            ) : null}
          </div>

          {!hasQuery ? (
          <SearchSection
            className="examples-search-categories"
            title="Categories"
            moreLabel="More"
            onMore={() => onOpenSection("examples")}
          >
            {categories.map((category) => (
              <Item
                key={category.id}
                asChild
                className="examples-search-category-item"
                surface="bare"
              >
                <button
                  type="button"
                  onClick={() => onOpenSection("examples", category.id)}
                >
                  <category.icon />
                  {category.title}
                </button>
              </Item>
            ))}
          </SearchSection>
          ) : null}
    </>
  );
}

function SearchSection({
  children,
  className,
  moreLabel,
  onMore,
  title,
}: {
  children: ReactNode;
  className?: string;
  moreLabel?: string;
  onMore?: () => void;
  title: string;
}) {
  return (
    <section className={className}>
      <div className="examples-search-section-header">
        <h3>{title}</h3>
        {moreLabel && onMore ? (
          <button type="button" onClick={onMore}>
            {moreLabel} <ChevronRight />
          </button>
        ) : null}
      </div>
      <div className="examples-search-section-body">{children}</div>
    </section>
  );
}

function SectionHeading({
  description,
  eyebrow,
  title,
}: {
  description?: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      <Badge variant="outline">{eyebrow}</Badge>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function ExampleCard({
  example,
  compact = false,
  onOpen,
}: {
  example: Example;
  compact?: boolean;
  onOpen: (id: ExampleId) => void;
}) {
  const openCard = () => onOpen(example.id);
  const category = categories.find((item) => item.id === example.category);
  const CategoryIcon = category?.icon ?? example.icon;

  return (
    <Card
      aria-label={`Open ${example.title}`}
      className="example-card"
      data-compact={compact ? "true" : undefined}
      onClick={openCard}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openCard();
        }
      }}
      role="link"
      tabIndex={0}
    >
      <CardContent className="example-card-content">
        <ExampleCardVisual example={example} />
        <div className="example-card-body">
          <div className="example-card-topline">
            <span className="example-card-icon">
              <CategoryIcon />
            </span>
            <span>{example.eyebrow}</span>
          </div>
          <CardTitle>{example.title}</CardTitle>
          <CardDescription>{example.description}</CardDescription>
          <div className="example-card-footer">
            <Badge variant="outline">{example.tags[0]}</Badge>
            <Badge variant="outline">{example.complexity}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ExampleCardVisual({ example }: { example: Example }) {
  return (
    <div aria-hidden="true" className="example-card-visual" data-preview={example.preview} inert>
      <ExampleCardVisualContent example={example} />
    </div>
  );
}

function ExampleCardVisualContent({ example }: { example: Example }) {
  const thumbnail = getExampleThumbnail(example.id);
  if (!thumbnail) return null;

  return <img alt="" className="example-card-visual-image" draggable={false} src={thumbnail} />;
}

function getExampleThumbnail(exampleId: ExampleId) {
  switch (exampleId) {
    case "admin-console":
    case "analytics-overview":
    case "bento-grid":
    case "calendar-app":
    case "checkout-flow":
    case "glass-command-center":
    case "invoice-page":
    case "kanban-board":
    case "payment-method":
    case "portfolio":
    case "pricing-page":
    case "saas-dashboard":
    case "settings-page":
    case "storefront":
    case "terms-page":
      return `/assets/example-thumbnails/${exampleId}.png`;
    default:
      return undefined;
  }
}

function ExamplePreview({ example }: { example: Example }) {
  return (
    <div className="example-preview" data-preview={example.preview}>
      {renderPreviewContent(example)}
    </div>
  );
}

function renderPreviewContent(example: Example) {
  switch (example.preview) {
    case "dashboard":
      return (
        <div className="preview-dashboard">
          <Tabs defaultValue="overview" className="preview-tabs">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="preview-dashboard-stack">
                <div className="preview-kpi-row">
                  {["MRR", "Users", "Risk"].map((label, index) => (
                    <Item key={label} surface="glass">
                      <ItemContent>
                        <ItemDescription>{label}</ItemDescription>
                        <ItemTitle>{index === 0 ? "$42k" : index === 1 ? "1.8k" : "4%"}</ItemTitle>
                      </ItemContent>
                    </Item>
                  ))}
                </div>
                <Progress value={68} />
                <Table className="preview-table-component">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {["Acme", "Linea"].map((account) => (
                      <TableRow key={account}>
                        <TableCell>{account}</TableCell>
                        <TableCell>
                          <Badge variant="success">Live</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="team">
              <div className="preview-avatar-row">
                <Avatar>
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>VF</AvatarFallback>
                </Avatar>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      );
    case "pricing":
      return (
        <div className="preview-pricing">
          {["Free", "Pro", "Scale"].map((plan, index) => (
            <Item key={plan} surface="glass" className={index === 1 ? "preview-plan-featured" : undefined}>
              <ItemContent>
                <ItemTitle>{plan}</ItemTitle>
                <ItemDescription>{index === 0 ? "$0" : index === 1 ? "$29" : "Custom"}</ItemDescription>
              </ItemContent>
              <ItemActions>
                {index === 1 ? <Badge>Popular</Badge> : null}
                <Button size="sm" variant={index === 1 ? "flat" : "glass"}>
                  Select
                </Button>
              </ItemActions>
            </Item>
          ))}
        </div>
      );
    case "settings":
      return (
        <div className="preview-settings">
          <Item surface="glass">
            <ItemMedia>
              <Bell />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Email alerts</ItemTitle>
              <ItemDescription>Critical updates only</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Switch defaultChecked />
            </ItemActions>
          </Item>
          <div className="preview-control-row">
            <Badge variant="outline">Density</Badge>
            <Slider defaultValue={[54]} aria-label="Preview density" />
          </div>
        </div>
      );
    case "storefront":
      return (
        <div className="preview-storefront">
          <div className="preview-store-toolbar">
            <Badge>New arrivals</Badge>
            <Button size="sm" variant="glass">
              View cart
            </Button>
          </div>
          <div className="preview-product-grid">
            {["Desk lamp", "Travel mug", "Notebook", "Cable kit"].map((product, index) => (
              <Item key={product} surface="glass">
                <ItemMedia>
                  <ShoppingBag />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{product}</ItemTitle>
                  <ItemDescription>${index === 0 ? "48" : index === 1 ? "22" : index === 2 ? "16" : "34"}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </div>
        </div>
      );
    case "checkout":
      return (
        <div className="preview-checkout">
          <div className="preview-form-lines">
            <InputGroup>
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
              <InputGroupInput placeholder="Email" />
            </InputGroup>
            <Input placeholder="Card number" variant="pill" />
            <label className="preview-check-row">
              <Checkbox defaultChecked />
              Save payment method
            </label>
          </div>
          <div className="preview-order-card">
            <Item surface="glass">
              <ItemContent>
                <ItemTitle>Total</ItemTitle>
                <ItemDescription>$128.00</ItemDescription>
              </ItemContent>
            </Item>
            <Button size="sm">
              Pay now
              <ChevronRight />
            </Button>
          </div>
        </div>
      );
    case "kanban":
      return (
        <div className="preview-kanban">
          {["Todo", "Doing", "Done"].map((column, index) => (
            <div className="preview-kanban-column" key={column}>
              <Badge variant={index === 1 ? "info" : "outline"}>{column}</Badge>
              <Item surface="glass">
                <ItemContent>
                  <ItemTitle>{index === 0 ? "Hero polish" : index === 1 ? "Preview cards" : "Tokens"}</ItemTitle>
                  <ItemDescription>{index + 2} tasks</ItemDescription>
                </ItemContent>
              </Item>
              <Item surface="glass">
                <ItemContent>
                  <ItemTitle>{index === 0 ? "Docs copy" : index === 1 ? "Filters" : "QA pass"}</ItemTitle>
                </ItemContent>
              </Item>
            </div>
          ))}
        </div>
      );
    case "document":
      return (
        <div className="preview-document">
          <div className="preview-doc-meta">
            <Badge variant="outline">{example.eyebrow}</Badge>
            <Item surface="glass">
              <ItemMedia>
                <FileText />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Updated</ItemTitle>
                <ItemDescription>May 20</ItemDescription>
              </ItemContent>
            </Item>
          </div>
          <article>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#examples">Docs</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Policy</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Item surface="glass">
              <ItemContent>
                <ItemTitle>{example.title}</ItemTitle>
                <ItemDescription>Readable document layout with summary blocks.</ItemDescription>
              </ItemContent>
            </Item>
          </article>
        </div>
      );
    case "portfolio":
      return (
        <div className="preview-portfolio">
          <ImageCard
            className="preview-image-card"
            imageAlt="Portfolio project preview"
            imageSrc="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80"
            subtitle="Selected work"
            title="Brand systems"
          />
          <div className="preview-project-list">
            {["Identity", "Product UI"].map((project) => (
              <Badge key={project} variant="outline">
                {project}
              </Badge>
            ))}
          </div>
        </div>
      );
    case "calendar":
      return (
        <div className="preview-calendar">
          <Tabs defaultValue="week" className="preview-tabs">
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
            </TabsList>
            <TabsContent value="week">
              <div className="preview-agenda-list">
                {["Planning", "Design review", "Ship room"].map((event) => (
                  <Item key={event} surface="glass">
                    <ItemMedia>
                      <CalendarDays />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{event}</ItemTitle>
                      <ItemDescription>Today</ItemDescription>
                    </ItemContent>
                  </Item>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          <div className="preview-agenda">
            <Switch defaultChecked />
            <Slider defaultValue={[64]} aria-label="Availability" />
          </div>
        </div>
      );
    case "bento":
      return (
        <div className="preview-bento">
          <div className="preview-bento-main">
            <Badge variant="outline">
              <Sparkles />
              Alkamanas
            </Badge>
            <strong>Composable UI blocks</strong>
            <div className="preview-bento-orb" />
          </div>
          <Item surface="glass">
            <ItemMedia>
              <UsersRound />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>42</ItemTitle>
              <ItemDescription>components</ItemDescription>
            </ItemContent>
          </Item>
          <Item surface="glass">
            <ItemMedia>
              <Zap />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>12</ItemTitle>
              <ItemDescription>patterns</ItemDescription>
            </ItemContent>
          </Item>
        </div>
      );
    case "command":
      return (
        <div className="preview-command">
          <div className="preview-command-copy">
            <Badge variant="outline">
              <Sparkles />
              Fintech glass
            </Badge>
            <strong>Streamline finance</strong>
            <Button size="sm" variant="glassPrimary">
              Open wallet
            </Button>
          </div>
          <Card className="preview-command-panel">
            <CardHeader>
              <CardTitle>7.95k</CardTitle>
              <CardDescription>Campaign performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Item surface="glass">
                <ItemMedia>
                  <CreditCard />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Virtual card</ItemTitle>
                  <ItemDescription>Approved</ItemDescription>
                </ItemContent>
              </Item>
            </CardContent>
          </Card>
        </div>
      );
    case "landing":
    default:
      return (
        <div className="preview-landing">
          <div className="preview-copy-stack">
            <Item surface="glass">
              <ItemMedia>
                <Rocket />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Launch faster</ItemTitle>
                <ItemDescription>Hero, proof and CTA sections.</ItemDescription>
              </ItemContent>
            </Item>
          </div>
          <div className="preview-hero-cards">
            <Button size="sm">Start</Button>
            <Button size="sm" variant="glass">
              Demo
            </Button>
          </div>
        </div>
      );
  }
}

function ExampleDetail({ example, onBack }: { example: Example; onBack: () => void }) {
  if (example.id === "saas-dashboard") {
    return <AnalyticsDashboardExample example={example} onBack={onBack} />;
  }

  if (example.id === "checkout-flow") {
    return <CheckoutFlowExample example={example} onBack={onBack} />;
  }

  if (example.id === "payment-method") {
    return <PaymentMethodExample example={example} onBack={onBack} />;
  }

  if (example.id === "basic-landing") {
    return <BasicLandingExample example={example} onBack={onBack} />;
  }

  if (example.id === "settings-page") {
    return <SettingsExample example={example} onBack={onBack} />;
  }

  if (example.id === "bento-grid") {
    return <BentoGridExample example={example} onBack={onBack} />;
  }

  if (example.id === "glass-command-center") {
    return <GlassCommandCenterExample example={example} onBack={onBack} />;
  }

  return <GenericShowcaseExample example={example} onBack={onBack} />;
}

function ExamplePageShell({
  children,
  onBack,
}: {
  children: ReactNode;
  onBack: () => void;
}) {
  return (
    <>
      <ExamplesNavbar onNavigateHome={onBack} />
      <main className="example-page" data-navbar-theme="dark" data-theme-color="#050505">
        <div className="examples-shell">
          {children}
        </div>
      </main>
    </>
  );
}

function ExampleShowcasePage({
  access,
  children,
  description,
  example,
  files,
  onBack,
  title,
}: {
  access: "Free" | "Pro";
  children: ReactNode;
  description: string;
  example: Example;
  files: string[];
  onBack: () => void;
  title: string;
}) {
  const [mode, setMode] = useState("preview");
  const [viewport, setViewport] = useState<"mobile" | "desktop">("desktop");
  const [copied, setCopied] = useState(false);
  const cliCommand = `npx alka add ${example.id}`;
  const relatedExamples = examples
    .filter((item) => item.category === example.category && item.id !== example.id)
    .slice(0, 2);
  const copyCliCommand = async (command: string) => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };
  const openFullScreen = async () => {
    await document.querySelector<HTMLElement>(".showcase-preview-frame")?.requestFullscreen?.();
  };

  return (
    <ExamplePageShell onBack={onBack}>
      <section className="showcase-heading">
        <Badge variant="outline">{example.eyebrow}</Badge>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>

      <section className="showcase-workspace">
        <div className="showcase-toolbar">
          <div className="showcase-toolbar-left">
            <Tabs value={mode} onValueChange={setMode} className="showcase-mode-tabs">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="showcase-device-group" aria-label="Preview viewport">
              {[
                { icon: Smartphone, label: "Mobile", value: "mobile" },
                { icon: Monitor, label: "Desktop", value: "desktop" },
              ].map(({ icon: Icon, label, value }) => (
                <Button
                  aria-label={label}
                  data-active={viewport === value ? "true" : undefined}
                  key={value}
                  onClick={() => setViewport(value as "mobile" | "desktop")}
                  size="icon"
                  variant="glass"
                >
                  <Icon />
                </Button>
              ))}
              <Button aria-label="Full screen" onClick={openFullScreen} size="icon" variant="glass">
                <Maximize />
              </Button>
            </div>
          </div>
          <div className="showcase-actions">
            <Badge variant={access === "Free" ? "success" : "warning"}>{access}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="glass">
                  <Copy />
                  {copied ? "Copied" : "Copy CLI Command"}
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="showcase-cli-menu">
                <DropdownMenuItem onSelect={() => copyCliCommand(cliCommand)}>
                  <span className="cli-manager">npx</span>
                  <code>{cliCommand}</code>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Card className="showcase-preview-frame" data-viewport={viewport}>
          <CardContent>
            {mode === "preview" ? (
              viewport === "mobile" ? <MobilePreviewFrame>{children}</MobilePreviewFrame> : children
            ) : (
              <div className="showcase-code-panel">
                <div>
                  <Badge variant="outline">CLI</Badge>
                  <pre>{cliCommand}</pre>
                </div>
                <div>
                  <Badge variant="outline">Files</Badge>
                  <div className="showcase-code-files">
                    {files.map((file) => (
                      <Kbd key={file}>{file}</Kbd>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="showcase-meta-grid">
        <Card>
          <CardHeader>
            <CardDescription>Files</CardDescription>
            <CardTitle>Source structure</CardTitle>
          </CardHeader>
          <CardContent className="showcase-file-list">
            {files.map((file) => (
              <Item key={file} surface="glass">
                <ItemMedia>
                  <FileText />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{file}</ItemTitle>
                </ItemContent>
              </Item>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Other {example.eyebrow} examples</CardDescription>
            <CardTitle>Continue browsing</CardTitle>
          </CardHeader>
          <CardContent className="mini-list">
            {relatedExamples.map((item) => (
              <Item key={item.id} surface="glass">
                <ItemMedia>
                  <item.icon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemDescription>{item.description}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="showcase-access-card">
        <CardHeader>
          <Badge>Get all examples</Badge>
          <CardTitle>Use this structure for every example detail page.</CardTitle>
          <CardDescription>
            The page mirrors the reference flow: preview first, source structure second, related
            examples and an access CTA last.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>
            Browse full library
            <ArrowRight />
          </Button>
        </CardContent>
      </Card>
    </ExamplePageShell>
  );
}

function AnalyticsDashboardExample({ example, onBack }: { example: Example; onBack: () => void }) {
  return (
    <ExampleShowcasePage
      access="Free"
      description="Clean admin dashboard pattern with stat cards, a data table, progress signals and sidebar-style navigation."
      example={example}
      files={[
        "components/app-sidebar.tsx",
        "components/site-header.tsx",
        "components/section-cards.tsx",
        "components/data-table.tsx",
        "page.tsx",
      ]}
      onBack={onBack}
      title="Website Analytics Admin Dashboard"
    >
      <div className="dashboard-showcase-preview">
        <aside className="dashboard-showcase-sidebar">
          <span className="examples-brand">
            <ExamplesBrandmark className="examples-brand-mark" />
            Analytics
          </span>
          {["Overview", "Reports", "Traffic", "Settings"].map((item, index) => (
            <Item key={item} surface={index === 0 ? "glass" : "flat"}>
              <ItemMedia>
                {index === 0 ? <LayoutDashboard /> : index === 1 ? <FileText /> : index === 2 ? <TrendingUp /> : <Settings />}
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{item}</ItemTitle>
              </ItemContent>
            </Item>
          ))}
        </aside>
        <div className="dashboard-showcase-main">
          <div className="showcase-panel-header">
            <div>
              <Badge variant="outline">Last 30 days</Badge>
              <h2>Website analytics</h2>
            </div>
            <Button size="sm" variant="glass">
              Export
            </Button>
          </div>
          <div className="dashboard-showcase-stats">
            {[
              ["Visitors", "42.8k", 74],
              ["Conversions", "3.2k", 58],
              ["Bounce", "28%", 36],
            ].map(([label, value, progress]) => (
              <Card key={label as string} variant="soft">
                <CardHeader>
                  <CardDescription>{label as string}</CardDescription>
                  <CardTitle>{value as string}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={progress as number} />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardDescription>Traffic sources</CardDescription>
              <CardTitle>Top channels</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Visitors</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["Organic", "Direct", "Campaign"].map((source, index) => (
                    <TableRow key={source}>
                      <TableCell>{source}</TableCell>
                      <TableCell>{index === 0 ? "18.2k" : index === 1 ? "12.4k" : "8.1k"}</TableCell>
                      <TableCell>
                        <Badge variant={index === 2 ? "warning" : "success"}>
                          {index === 2 ? "Watch" : "Healthy"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </ExampleShowcasePage>
  );
}

function BentoGridExample({ example, onBack }: { example: Example; onBack: () => void }) {
  return (
    <ExampleShowcasePage
      access="Free"
      description="A design-system showcase section that uses Alkamanas cards, badges, buttons, avatars and item primitives for a dense bento composition."
      example={example}
      files={[
        "components/alka-bento-grid.tsx",
        "components/alka-metric-card.tsx",
        "components/alka-feature-card.tsx",
        "page.tsx",
      ]}
      onBack={onBack}
      title="Alkamanas UI Bento Grid"
    >
      <section className="bento-showcase-preview" aria-label="Alkamanas bento grid preview">
        <Card className="bento-tile bento-intro-card">
          <CardHeader>
            <span className="bento-brand-mark">
              <Sparkles />
            </span>
            <CardTitle>Composable Product Surfaces</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Production-ready UI
              <span>for modern product teams</span>
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bento-tile bento-hero-card">
          <CardHeader>
            <Badge variant="outline">
              <Sparkles />
              Alkamanas
            </Badge>
            <CardTitle>Design System Building Blocks</CardTitle>
          </CardHeader>
        </Card>

        <div className="bento-globe" aria-hidden="true">
          <span className="bento-globe-ring" />
          <span className="bento-globe-core" />
        </div>

        <Card className="bento-tile bento-control-card">
          <CardContent>
            <Switch defaultChecked aria-label="Toggle glass theme preview" />
          </CardContent>
        </Card>

        <Card className="bento-tile bento-users-card">
          <CardHeader>
            <CardTitle>42</CardTitle>
            <CardDescription>Public components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bento-avatar-row" aria-label="User avatars">
              {["UI", "DS", "UX"].map((initials, index) => (
                <Avatar key={initials} className="bento-avatar" data-tone={index + 1}>
                  <AvatarFallback>{index === 1 ? <Sparkles /> : initials}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bento-tile bento-metric-card">
          <CardHeader>
            <CardTitle>96%</CardTitle>
            <CardDescription>Theme coverage</CardDescription>
            <Progress
              className="bento-theme-progress"
              indicatorClassName="bento-theme-progress-indicator"
              value={96}
              aria-label="Theme coverage"
            />
          </CardHeader>
        </Card>

        <Card className="bento-tile bento-action-card">
          <CardContent>
            <Button variant="glassPrimary" size="lg">
              <Sparkles />
              Compose
            </Button>
          </CardContent>
        </Card>

        <Card className="bento-tile bento-feature-card bento-feature-left">
          <CardHeader>
            <span className="bento-feature-icon">
              <Blocks />
            </span>
            <CardTitle>Scoped imports</CardTitle>
            <CardDescription>Pull only the focused component CSS a target app needs.</CardDescription>
          </CardHeader>
        </Card>

        <Card className="bento-tile bento-feature-card bento-feature-right">
          <CardHeader>
            <span className="bento-feature-icon">
              <Gauge />
            </span>
            <CardTitle>Token control</CardTitle>
            <CardDescription>Keep color, glass, motion and surfaces aligned by tokens.</CardDescription>
          </CardHeader>
        </Card>

        <Card className="bento-tile bento-template-card">
          <CardHeader>
            <CardTitle>Registry-ready blocks</CardTitle>
            <CardDescription>Copy, customize and ship complete UI sections faster.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bento-template-stack" aria-hidden="true">
              <Badge variant="outline">copy ready</Badge>
              <Item className="bento-template-item bento-template-item-theme" surface="glass">
                <ItemMedia>
                  <Palette />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Theme</ItemTitle>
                </ItemContent>
              </Item>
              <Item className="bento-template-item bento-template-item-ship" surface="glass">
                <ItemMedia>
                  <Rocket />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Ship</ItemTitle>
                </ItemContent>
              </Item>
              <Item className="bento-template-item bento-template-item-docs" surface="glass">
                <ItemMedia>
                  <FileText />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Docs</ItemTitle>
                </ItemContent>
              </Item>
            </div>
          </CardContent>
        </Card>
      </section>
    </ExampleShowcasePage>
  );
}

function GlassCommandCenterPreview() {
  return (
    <section className="command-showcase-preview" aria-label="Fintech glass landing preview">
      <div className="command-navbar-frame">
        <Navbar
          brand={
            <span className="command-brand">
              <span className="command-brand-mark">
                <WalletCards />
              </span>
              FlowPay
            </span>
          }
          className="command-navbar"
          actions={
            <>
              <NavbarCTA className="command-navbar-login" href="#command-login" label="Login" />
              <NavbarCTA className="command-navbar-signup" href="#command-signup" label="Sign up" />
            </>
          }
          defaultTheme="dark"
          links={[
            { href: "#command-product", label: "Home" },
            { href: "#command-glass", label: "Features" },
            { href: "#command-demo", label: "How it works" },
            { href: "#command-pricing", label: "Pricing" },
          ]}
          mobileMenuLabel="Open navigation"
          mobileMenuCloseLabel="Close navigation"
          panelClassName="command-navbar-panel"
          panelVisible={false}
          syncThemeMeta={false}
          theme="dark"
        />
      </div>

      <div className="command-hero">
        <div className="command-copy">
          <h2>Streamline Your <span>Finance</span></h2>
          <p>Automate payments, spending and growth from one secure finance hub.</p>
        </div>

        <div className="command-proof">
          <div className="command-proof-copy">
            <div className="command-proof-actions" aria-label="Finance platform actions">
              <Button className="command-proof-glass-button" size="sm" variant="glassPrimary">
                <WalletCards />
                Start managing
              </Button>
              <Button className="command-proof-outline-button" size="sm" variant="ghost">
                Learn more
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
        <span className="fintech-floating-dot fintech-floating-dot-mastercard" aria-hidden="true">
          <PaymentBrandLogo brand="mastercard" size="preview" />
        </span>
        <span className="fintech-floating-dot fintech-floating-dot-user" aria-hidden="true">
          <ShieldCheck />
        </span>
        <span className="fintech-floating-dot fintech-floating-dot-check" aria-hidden="true">
          <TrendingUp />
        </span>
        <span className="fintech-floating-dot fintech-floating-dot-small" aria-hidden="true">
          <WalletCards />
        </span>
        <span className="fintech-floating-dot fintech-floating-dot-arrow" aria-hidden="true">
          <CreditCard />
        </span>

        <div className="command-visual-stage">
          <div className="fintech-orb" aria-hidden="true" />
          <div className="fintech-orbit-line" aria-hidden="true" />
          <div className="fintech-mobile-balance-card" aria-hidden="true">
            <div className="fintech-mobile-balance-card-topline">
              <div className="fintech-mobile-balance-card-meta">
                <span>Total Balance</span>
                <strong>$24,890</strong>
              </div>
              <span className="fintech-mobile-balance-card-wallet">
                <WalletCards />
              </span>
            </div>
            <div className="fintech-mobile-balance-card-trend-row">
              <div className="fintech-mobile-balance-card-trend">
                <TrendingUp />
                <span>+12.4%</span>
              </div>
              <span>vs last 30 days</span>
            </div>
            <div className="fintech-mobile-balance-card-chart">
              <svg viewBox="0 0 190 64" role="presentation" focusable="false">
                <path d="M6 48 C18 34 26 40 38 30 S62 42 76 30 S102 32 114 22 S136 24 148 16 S172 18 184 6" />
              </svg>
              <span />
            </div>
          </div>
          <div className="fintech-mobile-feature-row" aria-hidden="true">
            <div className="fintech-mobile-feature-item">
              <span><CreditCard /></span>
              <strong>Payments</strong>
              <small>Automated</small>
            </div>
            <div className="fintech-mobile-feature-item">
              <span><BarChart3 /></span>
              <strong>Spending</strong>
              <small>Tracked</small>
            </div>
            <div className="fintech-mobile-feature-item">
              <span><TrendingUp /></span>
              <strong>Growth</strong>
              <small>Accelerated</small>
            </div>
          </div>
          <div className="fintech-card-layout">
            <div className="fintech-left-stack">
              <Card className="fintech-card-preview">
                <CardHeader>
                  <div className="fintech-card-preview-meta">
                    <CardDescription>June 2026</CardDescription>
                    <Badge variant="outline">Live</Badge>
                  </div>
                  <CardTitle>78.39k</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="fintech-card-preview-users">
                    {[
                      ["28.45k", "Active buyers"],
                      ["19.32k", "Repeat orders"],
                    ].map(([value, label], index) => (
                      <div className="fintech-card-preview-user" key={label}>
                        <span data-tone={index === 0 ? "purple" : "blue"} />
                        <div>
                          <strong>{value}</strong>
                          <small>{label}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="fintech-chart-lines" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="fintech-center-stack">
              <Card className="command-console-card fintech-wallet-panel">
                <CardHeader>
                  <div className="fintech-console-topline">
                    <Badge variant="outline">May</Badge>
                    <Badge variant="outline">Last 28 days</Badge>
                  </div>
                  <div className="fintech-console-heading">
                    <CardDescription>Marketing campaign</CardDescription>
                    <CardTitle>7.95k</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={74} />
                  <div className="fintech-mini-bars" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="fintech-right-stack">
              <Card className="fintech-expense-back-card fintech-expense-back-card-far" aria-hidden="true" />
              <Card className="fintech-expense-back-card fintech-expense-back-card-near" aria-hidden="true" />
              <Card className="command-floating-card command-floating-card-top">
                <CardHeader>
                  <CardDescription>Total expenses</CardDescription>
                  <CardTitle>$6,240</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="fintech-expense-line" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlassCommandCenterExample({ example, onBack }: { example: Example; onBack: () => void }) {
  return (
    <ExampleShowcasePage
      access="Free"
      description="A centered fintech landing page that combines Alkamanas navbar, glass cards, wallet items, payment controls and metrics."
      example={example}
      files={[
        "components/fintech-glass-landing.tsx",
        "components/wallet-hero-card.tsx",
        "components/payment-feature-card.tsx",
        "page.tsx",
      ]}
      onBack={onBack}
      title="Fintech Glass Landing"
    >
      <GlassCommandCenterPreview />
    </ExampleShowcasePage>
  );
}

const mobilePreviewRuntimeStyles = `
  html,
  body,
  #mobile-preview-root {
    min-height: 100%;
  }

  #mobile-preview-root {
    display: block;
    min-height: 100%;
    padding: 0;
    background: #050505;
  }

  body {
    margin: 0;
    overflow-x: hidden;
    overscroll-behavior: contain;
    background: #050505;
  }

  html {
    overscroll-behavior: contain;
    scrollbar-width: none;
  }

  #mobile-preview-root > .dashboard-showcase-preview,
  #mobile-preview-root > .checkout-showcase-preview,
  #mobile-preview-root > .settings-showcase-preview,
  #mobile-preview-root > .bento-showcase-preview,
  #mobile-preview-root > .command-showcase-preview,
  #mobile-preview-root > .generic-showcase-preview {
    min-height: 100vh;
    border: 0;
    border-radius: 0;
    padding-top: 52px;
  }

  body::-webkit-scrollbar {
    display: none;
  }
`;

function MobilePreviewFrame({ children }: { children: ReactNode }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const iframeDocument = iframe?.contentDocument;
    if (!iframeDocument) return;

    iframeDocument.open();
    iframeDocument.write(
      '<!doctype html><html><head><base target="_parent" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head><body><div id="mobile-preview-root" class="examples-app alka-theme-dark" data-theme="dark"></div></body></html>',
    );
    iframeDocument.close();

    iframeDocument.documentElement.className = document.documentElement.className;
    iframeDocument.body.className = document.body.className;

    document.querySelectorAll<HTMLLinkElement | HTMLStyleElement>('link[rel="stylesheet"], style').forEach((node) => {
      iframeDocument.head.appendChild(node.cloneNode(true));
    });

    setMountNode(iframeDocument.getElementById("mobile-preview-root"));
  }, []);

  useEffect(() => {
    const iframeDocument = iframeRef.current?.contentDocument;
    if (!iframeDocument) return;

    let runtimeStyles = iframeDocument.getElementById("mobile-preview-runtime-styles") as HTMLStyleElement | null;
    if (!runtimeStyles) {
      runtimeStyles = iframeDocument.createElement("style");
      runtimeStyles.id = "mobile-preview-runtime-styles";
      iframeDocument.head.appendChild(runtimeStyles);
    }

    runtimeStyles.textContent = mobilePreviewRuntimeStyles;
  });

  return (
    <div className="showcase-mobile-device" aria-label="Mobile preview">
      <iframe ref={iframeRef} className="showcase-mobile-iframe" title="Mobile preview" />
      {mountNode ? createPortal(children, mountNode) : null}
    </div>
  );
}

function BasicLandingPreview({ example }: { example: Example }) {
  return (
    <main className="landing-page">
      <section className="landing-hero" data-navbar-theme="dark" data-theme-color="#050505">
        <div className="landing-shell">
          <div className="landing-hero-grid">
            <div className="landing-copy">
              <Badge>{example.title}</Badge>
              <h1>Launch operations without losing the signal.</h1>
              <p>
                SignalForge turns fragmented team activity into a focused operating layer for
                launches, billing, account health and customer-facing workflows.
              </p>
              <div className="landing-actions">
                <Button>
                  Start free
                  <ArrowRight />
                </Button>
                <Button variant="glass">
                  <Play />
                  Watch overview
                </Button>
              </div>
              <div className="landing-proof">
                <Avatar>
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>VF</AvatarFallback>
                </Avatar>
                <span>Used by product, ops and revenue teams shipping weekly.</span>
              </div>
            </div>

            <Card className="landing-dashboard-card">
              <CardHeader>
                <div className="dashboard-card-header">
                  <div>
                    <CardDescription>Live workspace</CardDescription>
                    <CardTitle>Launch control</CardTitle>
                  </div>
                  <Badge>
                    <BadgeCheck />
                    Healthy
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pipeline">
                  <TabsList>
                    <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
                    <TabsTrigger value="accounts">Accounts</TabsTrigger>
                    <TabsTrigger value="risk">Risk</TabsTrigger>
                  </TabsList>
                  <TabsContent value="pipeline">
                    <div className="dashboard-preview-grid">
                      {platformStats.map((stat) => (
                        <div className="dashboard-stat" key={stat.label}>
                          <stat.icon />
                          <span>{stat.label}</span>
                          <strong>{stat.value}</strong>
                        </div>
                      ))}
                    </div>
                    <Progress value={76} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

function CheckoutShowcasePreview() {
  const orderItems = [
    {
      name: "UI Kit license",
      meta: "Commercial license",
      price: "$129",
      quantity: "1",
      icon: PackageCheck,
    },
    {
      name: "Priority support",
      meta: "12 month coverage",
      price: "$39",
      quantity: "1",
      icon: ShieldCheck,
    },
    {
      name: "Team seats",
      meta: "3 editors",
      price: "$72",
      quantity: "3",
      icon: UsersRound,
    },
  ];
  const trustItems = [
    {
      icon: ShieldCheck,
      title: "Protected payment",
      description: "Encrypted checkout and tokenized cards.",
    },
    {
      icon: PackageCheck,
      title: "Instant access",
      description: "License and files unlock after payment.",
    },
    {
      icon: BadgeCheck,
      title: "Verified invoice",
      description: "Receipt and invoice are generated automatically.",
    },
  ];

  return (
    <div className="checkout-showcase-preview">
      <div className="checkout-flow-main">
        <div className="showcase-panel-header">
          <div>
            <Badge variant="outline">
              <LockKeyhole />
              Secure checkout
            </Badge>
            <h2>Complete your order</h2>
            <p className="checkout-header-copy">Review your details and complete your secure purchase.</p>
          </div>
          <Badge variant="success">
            <LockKeyhole />
            SSL ready
          </Badge>
        </div>

        <div className="checkout-step-row" aria-label="Checkout progress">
          {[
            ["1", "Address", "Complete", "complete"],
            ["2", "Payment", "Complete", "complete"],
            ["3", "Review", "Current step", "active"],
          ].map(([number, step, status, state]) => (
            <div className="checkout-step-item" data-state={state as string} key={step as string}>
              <span className="checkout-step-number">{state === "complete" ? <Check /> : (number as string)}</span>
              <div>
                <CardTitle>{step as string}</CardTitle>
                <CardDescription>{status as string}</CardDescription>
              </div>
            </div>
          ))}
        </div>

        <Card className="checkout-review-card">
          <CardHeader>
            <CardTitle>Review details</CardTitle>
          </CardHeader>
          <CardContent className="checkout-review-list">
            <section className="checkout-review-section" aria-label="Shipping address">
              <div className="checkout-review-section-header">
                <div>
                  <h3>Shipping address</h3>
                </div>
              </div>
              <Item surface="flat" className="checkout-review-item">
                <ItemMedia>
                  <Building2 />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Berkay Labs</ItemTitle>
                  <ItemDescription>Market Street 24, Floor 8, San Francisco, CA 94103</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button size="sm" variant="secondary">
                    Edit
                  </Button>
                </ItemActions>
              </Item>
            </section>

            <section className="checkout-review-section" aria-label="Payment method">
              <div className="checkout-review-section-header">
                <div>
                  <h3>Payment method</h3>
                </div>
              </div>
              <Item surface="flat" className="checkout-review-item">
                <ItemMedia className="checkout-card-brand" aria-label="Visa">
                  <PaymentBrandLogo brand="visa" size="wallet" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Visa ending in 4242</ItemTitle>
                  <ItemDescription>Billed to Alkamanas Labs</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button size="sm" variant="secondary">
                    Change
                  </Button>
                </ItemActions>
              </Item>
            </section>
          </CardContent>
        </Card>
      </div>

      <aside className="checkout-summary">
        <Card className="checkout-summary-card">
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
            <CardDescription>3 items</CardDescription>
          </CardHeader>
          <CardContent className="checkout-summary-stack">
            <div className="checkout-cart-list">
              {orderItems.map(({ icon: Icon, meta, name, price, quantity }) => (
                <Item key={name} surface="flat" className="checkout-cart-item">
                  <ItemMedia>
                    <Icon />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{name}</ItemTitle>
                    <ItemDescription>{meta}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Badge variant="outline">x{quantity}</Badge>
                    <strong>{price}</strong>
                  </ItemActions>
                </Item>
              ))}
            </div>
            <Separator />
            <div className="checkout-total-list">
              {[
                ["Subtotal", "$240"],
                ["Shipping", "Free"],
                ["Tax", "$0"],
              ].map(([label, value]) => (
                <div className="checkout-summary-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
              <Separator />
              <div className="checkout-summary-row total">
                <span>Total</span>
                <strong>$240</strong>
              </div>
            </div>
            <Button>
              Complete checkout
              <ArrowRight />
            </Button>
          </CardContent>
        </Card>

        <div className="checkout-trust-list">
          {trustItems.map(({ icon: Icon, title, description }) => (
            <Item key={title} surface="flat" className="checkout-trust-item">
              <ItemMedia className="settings-nav-icon">
                <Icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{title}</ItemTitle>
                <ItemDescription>{description}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </div>
      </aside>
    </div>
  );
}

function CheckoutFlowExample({ example, onBack }: { example: Example; onBack: () => void }) {
  return (
    <ExampleShowcasePage
      access="Free"
      description="A focused checkout flow with contact fields, shipping method, payment controls, order summary and trust signals."
      example={example}
      files={[
        "components/checkout-form.tsx",
        "components/payment-panel.tsx",
        "components/order-summary.tsx",
        "components/trust-signals.tsx",
        "page.tsx",
      ]}
      onBack={onBack}
      title="Checkout Flow"
    >
      <CheckoutShowcasePreview />
    </ExampleShowcasePage>
  );
}

function PaymentMethodShowcasePreview() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [isCvcFocused, setIsCvcFocused] = useState(false);
  const cardBrand = getCardBrand(cardNumber);
  const cvcMaxLength = cardBrand === "amex" ? 4 : 3;
  const savedMethods: Array<{
    brand: "amex" | "mastercard" | "visa";
    meta: string;
    name: string;
    state: string;
  }> = [
    {
      brand: "visa",
      name: "Visa ending in 4242",
      meta: "Default for team billing",
      state: "Default",
    },
    {
      brand: "mastercard",
      name: "Mastercard ending in 6094",
      meta: "Subscription budget",
      state: "Backup",
    },
    {
      brand: "amex",
      name: "Amex ending in 0005",
      meta: "Travel and expenses",
      state: "Active",
    },
  ];
  const trustItems = [
    {
      icon: LockKeyhole,
      title: "Tokenized storage",
      description: "Card data stays encrypted by the payment provider.",
    },
    {
      icon: ShieldCheck,
      title: "SCA ready",
      description: "Authentication states fit into the same panel.",
    },
    {
      icon: BadgeCheck,
      title: "Billing audit",
      description: "Team changes are logged for finance review.",
    },
  ];

  return (
    <div className="checkout-showcase-preview payment-method-showcase">
      <div className="checkout-flow-main">
        <div className="showcase-panel-header payment-method-header">
          <div>
            <Badge variant="outline">Team billing</Badge>
            <h2>Add Payment Method</h2>
          </div>
          <Badge variant="success">PCI scoped</Badge>
        </div>

        <Card className="checkout-review-card payment-method-card">
          <CardHeader>
            <CardTitle>Card Details</CardTitle>
          </CardHeader>
          <CardContent className="checkout-review-list">
            <PaymentCardPreview
              cardHolder={cardHolder}
              cardNumber={cardNumber}
              cvc={cvc}
              expiry={expiry}
              flipped={isCvcFocused}
            />

            <section className="checkout-review-section payment-card-fields" aria-label="Card details">
              <div className="payment-form-grid">
                <InputGroup className="payment-form-field payment-form-field-wide">
                  <InputGroupAddon>
                    <UsersRound />
                  </InputGroupAddon>
                  <InputGroupInput
                    maxLength={48}
                    placeholder="Name on card"
                    value={cardHolder}
                    onBeforeInput={handleCardHolderBeforeInput}
                    onChange={(event) => setCardHolder(formatCardHolderInput(event.target.value))}
                    onPaste={(event) => handleCardHolderPaste(event, setCardHolder)}
                  />
                </InputGroup>
                <InputGroup className="payment-form-field payment-form-field-wide">
                  <InputGroupAddon>
                    <CreditCard />
                  </InputGroupAddon>
                  <InputGroupInput
                    inputMode="numeric"
                    maxLength={16}
                    pattern="[0-9]*"
                    placeholder="Card number"
                    type="text"
                    value={cardNumber}
                    onBeforeInput={handleCardNumberBeforeInput}
                    onChange={(event) => setCardNumber(formatCardNumberInput(event.target.value))}
                    onPaste={(event) => handleCardNumberPaste(event, setCardNumber)}
                  />
                </InputGroup>
                <Input
                  inputMode="numeric"
                  maxLength={7}
                  placeholder="Expiration"
                  value={expiry}
                  variant="pill"
                  onChange={(event) => setExpiry(formatExpiryInput(event.target.value))}
                />
                <Input
                  inputMode="numeric"
                  maxLength={cvcMaxLength}
                  placeholder="CVC"
                  value={cvc}
                  variant="pill"
                  onBlur={() => setIsCvcFocused(false)}
                  onChange={(event) => setCvc(formatCvcInput(event.target.value, cvcMaxLength))}
                  onFocus={() => setIsCvcFocused(true)}
                />
              </div>
            </section>

            <section className="checkout-review-section payment-billing-section" aria-label="Billing address">
              <div className="checkout-review-section-header">
                <div>
                  <h3>Billing Address</h3>
                </div>
              </div>
              <div className="payment-form-grid">
                <Select>
                  <SelectTrigger aria-label="Country">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="tr">Turkey</SelectItem>
                    <SelectItem value="gb">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="City" variant="pill" />
                <Input
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[0-9]*"
                  placeholder="ZIP code"
                  variant="pill"
                  onBeforeInput={handleZipCodeBeforeInput}
                  onChange={(event) => {
                    event.currentTarget.value = formatZipCodeInput(event.currentTarget.value);
                  }}
                  onPaste={handleZipCodePaste}
                />
                <Input placeholder="Billing address" variant="pill" wrapperClassName="payment-form-field-wide" />
              </div>
              <div className="payment-billing-actions">
                <label className="payment-default-row" htmlFor="payment-default-method">
                  <Checkbox id="payment-default-method" defaultChecked />
                  <span>
                    <strong>Set as default payment method</strong>
                    <span>Use this card for future workspace invoices.</span>
                  </span>
                </label>
                <Button className="payment-save-button">
                  Save Card
                  <ArrowRight />
                </Button>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>

      <aside className="checkout-summary">
        <Card>
          <CardHeader>
            <CardDescription>Wallet</CardDescription>
            <CardTitle>Saved Methods</CardTitle>
          </CardHeader>
          <CardContent className="checkout-summary-stack">
            <div className="checkout-cart-list">
              {savedMethods.map(({ brand, meta, name, state }) => (
                <Item key={name} surface="flat" className="checkout-cart-item" data-default={state === "Default" ? "true" : undefined}>
                  <ItemMedia className="payment-wallet-logo-media">
                    <PaymentBrandLogo brand={brand} size="wallet" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{name}</ItemTitle>
                    <ItemDescription>{meta}</ItemDescription>
                  </ItemContent>
                  {state === "Default" ? (
                    <ItemActions className="payment-wallet-default-action">
                      <Badge className="payment-wallet-default-badge" variant="outline">
                        {state}
                      </Badge>
                    </ItemActions>
                  ) : null}
                </Item>
              ))}
            </div>
            <Separator />
            <Item asChild surface="glass" className="payment-method-option">
              <button type="button" aria-label="Add new payment method">
                <ItemContent>
                  <ItemTitle>New Payment Method</ItemTitle>
                </ItemContent>
                <ItemActions className="payment-add-card-action">
                  <Plus />
                </ItemActions>
              </button>
            </Item>
          </CardContent>
        </Card>

        <div className="checkout-trust-list">
          {trustItems.map(({ icon: Icon, title, description }) => (
            <Item key={title} surface="flat" className="checkout-trust-item">
              <ItemMedia>
                <Icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{title}</ItemTitle>
                <ItemDescription>{description}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </div>
      </aside>
    </div>
  );
}

function PaymentMethodExample({ example, onBack }: { example: Example; onBack: () => void }) {
  return (
    <ExampleShowcasePage
      access="Free"
      description="A focused payment method flow with animated card previews, card entry fields, billing controls, saved methods and trust signals."
      example={example}
      files={[
        "components/payment-method-form.tsx",
        "components/animated-card-stack.tsx",
        "components/billing-address-panel.tsx",
        "components/trust-signals.tsx",
        "page.tsx",
      ]}
      onBack={onBack}
      title="Add Payment Method"
    >
      <PaymentMethodShowcasePreview />
    </ExampleShowcasePage>
  );
}

function PaymentCardPreview({
  cardHolder,
  cardNumber,
  cvc,
  expiry,
  flipped,
}: {
  cardHolder: string;
  cardNumber: string;
  cvc: string;
  expiry: string;
  flipped: boolean;
}) {
  const detectedBrand = getCardBrand(cardNumber);
  const [visibleBrand, setVisibleBrand] = useState<"amex" | "card" | "mastercard" | "visa">(detectedBrand);
  const brand = detectedBrand === "card" ? visibleBrand : detectedBrand;
  const displayNumber = formatCardNumber(cardNumber, brand);
  const hasCardNumber = cardNumber.replace(/\D/g, "").length > 0;
  const displayExpiry = expiry.trim() || "MM / YY";
  const displayHolder = cardHolder.trim() || "Card holder";
  const displayCvc = cvc.trim() || "CVC";

  useEffect(() => {
    if (detectedBrand !== "card") {
      setVisibleBrand(detectedBrand);
      return;
    }

    const resetLogo = window.setTimeout(() => {
      setVisibleBrand("card");
    }, 220);

    return () => window.clearTimeout(resetLogo);
  }, [detectedBrand]);

  return (
    <div className="payment-card-preview" data-side={flipped ? "back" : "front"}>
      <div className="payment-card-preview-inner">
        <div className="payment-card-preview-face payment-card-preview-front">
          <div className="payment-card-topline">
            <span className="payment-card-chip" />
            <PaymentBrandLogo brand={brand} size="preview" />
          </div>
          <div>
            <span className="payment-card-label">Alkamanas Business</span>
            <span className="payment-card-number" data-empty={hasCardNumber ? undefined : "true"}>
              {displayNumber}
            </span>
          </div>
          <div className="payment-card-bottom">
            <span>
              <span>Card holder</span>
              <strong>{displayHolder}</strong>
            </span>
            <span>
              <span>Valid thru</span>
              <strong>{displayExpiry}</strong>
            </span>
          </div>
        </div>

        <div className="payment-card-preview-face payment-card-preview-back">
          <span className="payment-card-strip" />
          <div className="payment-card-back-row">
            <span className="payment-card-signature-line">{displayHolder}</span>
            <strong>{displayCvc}</strong>
          </div>
          <div className="payment-card-back-footer">
            <span>Security code</span>
            <PaymentBrandLogo brand={brand} size="preview" />
          </div>
        </div>
      </div>
    </div>
  );
}

function getCardBrand(cardNumber: string): "amex" | "card" | "mastercard" | "visa" {
  const digits = cardNumber.replace(/\D/g, "");
  if (!digits) return "card";
  if (/^3/.test(digits)) return "amex";
  if (/^(5|2)/.test(digits)) return "mastercard";
  return "visa";
}

function formatCardNumber(cardNumber: string, brand: "amex" | "card" | "mastercard" | "visa") {
  const digits = cardNumber.replace(/\D/g, "").slice(0, brand === "amex" ? 15 : 16);
  if (!digits) return "•••• •••• •••• ••••";

  const source = digits;
  const groups = brand === "amex" ? [4, 6, 5] : [4, 4, 4, 4];
  let cursor = 0;

  return groups
    .map((size) => {
      const group = source.slice(cursor, cursor + size);
      cursor += size;
      return group.padEnd(size, "•");
    })
    .join(" ");
}

function formatCardNumberInput(value: string) {
  return value.replace(/\D/g, "").slice(0, 16);
}

function getPastedCardNumberValue(input: HTMLInputElement, value: string) {
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? start;
  return formatCardNumberInput(`${input.value.slice(0, start)}${value}${input.value.slice(end)}`);
}

function handleCardNumberBeforeInput(event: FormEvent<HTMLInputElement>) {
  const inputEvent = event.nativeEvent as InputEvent;

  if (inputEvent.data && /\D/.test(inputEvent.data)) {
    event.preventDefault();
  }
}

function handleCardNumberPaste(event: ClipboardEvent<HTMLInputElement>, setCardNumber: (value: string) => void) {
  event.preventDefault();

  const pastedValue = event.clipboardData.getData("text");
  setCardNumber(getPastedCardNumberValue(event.currentTarget, pastedValue));
}

function formatCardHolderInput(value: string) {
  return Array.from(value)
    .filter((character) => /[\p{L}\p{M}\p{P}\s]/u.test(character))
    .join("")
    .replace(/\s{2,}/g, " ")
    .slice(0, 48);
}

function getPastedCardHolderValue(input: HTMLInputElement, value: string) {
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? start;
  return formatCardHolderInput(`${input.value.slice(0, start)}${value}${input.value.slice(end)}`);
}

function handleCardHolderBeforeInput(event: FormEvent<HTMLInputElement>) {
  const inputEvent = event.nativeEvent as InputEvent;

  if (inputEvent.data && !/^[\p{L}\p{M}\p{P}\s]+$/u.test(inputEvent.data)) {
    event.preventDefault();
  }
}

function handleCardHolderPaste(event: ClipboardEvent<HTMLInputElement>, setCardHolder: (value: string) => void) {
  event.preventDefault();

  const pastedValue = event.clipboardData.getData("text");
  setCardHolder(getPastedCardHolderValue(event.currentTarget, pastedValue));
}

function formatZipCodeInput(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

function getPastedZipCodeValue(input: HTMLInputElement, value: string) {
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? start;
  return formatZipCodeInput(`${input.value.slice(0, start)}${value}${input.value.slice(end)}`);
}

function handleZipCodeBeforeInput(event: FormEvent<HTMLInputElement>) {
  const inputEvent = event.nativeEvent as InputEvent;

  if (inputEvent.data && /\D/.test(inputEvent.data)) {
    event.preventDefault();
  }
}

function handleZipCodePaste(event: ClipboardEvent<HTMLInputElement>) {
  event.preventDefault();

  event.currentTarget.value = getPastedZipCodeValue(event.currentTarget, event.clipboardData.getData("text"));
}

function formatExpiryInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;

  const rawMonth = Number(digits.slice(0, 2));
  const month = String(Math.min(Math.max(rawMonth || 1, 1), 12)).padStart(2, "0");
  return `${month} / ${digits.slice(2)}`;
}

function formatCvcInput(value: string, maxLength: number) {
  return value.replace(/\D/g, "").slice(0, maxLength);
}

function PaymentBrandLogo({
  brand,
  size = "preview",
}: {
  brand: "amex" | "card" | "mastercard" | "visa";
  size?: "preview" | "wallet";
}) {
  const logos = {
    amex: "/payment-card-logos/amex-bluebox-alternate-official.svg",
    card: "/payment-card-logos/card.svg",
    mastercard: "/payment-card-logos/mastercard.svg",
    visa: "/payment-card-logos/visa-white.svg",
  };
  const label = brand === "card" ? "Card" : brand === "amex" ? "American Express" : brand === "mastercard" ? "Mastercard" : "Visa";

  return (
    <span aria-label={label} className={`payment-card-brand-logo payment-card-brand-logo-${size}`} data-brand={brand} role="img">
      {(Object.keys(logos) as Array<keyof typeof logos>).map((logoBrand) => (
        <img
          alt=""
          aria-hidden="true"
          data-active={brand === logoBrand ? "true" : undefined}
          data-logo-brand={logoBrand}
          key={logoBrand}
          src={logos[logoBrand]}
        />
      ))}
    </span>
  );
}

function GenericShowcaseExample({ example, onBack }: { example: Example; onBack: () => void }) {
  return (
    <ExampleShowcasePage
      access={example.complexity === "Advanced" ? "Pro" : "Free"}
      description={example.description}
      example={example}
      files={[
        `components/${example.id}.tsx`,
        `components/${example.id}-preview.tsx`,
        "page.tsx",
      ]}
      onBack={onBack}
      title={example.title}
    >
      <div className="generic-showcase-preview">
        <ExamplePreview example={example} />
      </div>
    </ExampleShowcasePage>
  );
}

function _PricingExample({ example, onBack }: { example: Example; onBack: () => void }) {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "For small teams validating the system.",
      features: ["5 projects", "Community support", "Basic analytics"],
    },
    {
      name: "Pro",
      price: "$29",
      description: "For teams shipping production interfaces.",
      features: ["Unlimited projects", "Priority support", "Advanced analytics"],
      featured: true,
    },
    {
      name: "Scale",
      price: "Custom",
      description: "For organizations with governance needs.",
      features: ["SAML SSO", "Audit trails", "Dedicated onboarding"],
    },
  ];

  return (
    <ExamplePageShell onBack={onBack}>
      <section className="pricing-example-hero">
        <div>
          <Badge variant="outline">{example.eyebrow}</Badge>
          <h1>Pricing that makes the product choice obvious.</h1>
          <p>
            A focused pricing page using package cards, badges, buttons, tabs and comparison rows.
          </p>
        </div>
        <Tabs defaultValue="monthly" className="pricing-cycle-tabs">
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual</TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      <section className="pricing-plan-grid">
        {plans.map((plan) => (
          <Card className={plan.featured ? "pricing-plan is-featured" : "pricing-plan"} key={plan.name}>
            <CardHeader>
              <div className="card-row">
                <Badge variant={plan.featured ? "default" : "outline"}>{plan.name}</Badge>
                {plan.featured ? <Badge variant="success">Popular</Badge> : null}
              </div>
              <CardTitle>{plan.price}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mini-list">
                {plan.features.map((feature) => (
                  <Item key={feature} surface="glass">
                    <ItemMedia>
                      <Check />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{feature}</ItemTitle>
                    </ItemContent>
                  </Item>
                ))}
              </div>
              <Button className="pricing-plan-button" variant={plan.featured ? "flat" : "glass"}>
                Choose {plan.name}
                <ArrowRight />
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="pricing-compare">
        <Card>
          <CardHeader>
            <CardDescription>Comparison</CardDescription>
            <CardTitle>Plan capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  <TableHead>Starter</TableHead>
                  <TableHead>Pro</TableHead>
                  <TableHead>Scale</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {["Projects", "Support", "Security review"].map((feature, index) => (
                  <TableRow key={feature}>
                    <TableCell>{feature}</TableCell>
                    <TableCell>{index === 0 ? "5" : "Basic"}</TableCell>
                    <TableCell>{index === 0 ? "Unlimited" : "Priority"}</TableCell>
                    <TableCell>{index === 2 ? "Included" : "Custom"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </ExamplePageShell>
  );
}

function SettingsExample({ example, onBack }: { example: Example; onBack: () => void }) {
  const [settingsTab, setSettingsTab] = useState("profile");
  const [appearanceTheme, setAppearanceTheme] = useState("dark");
  const [appearanceAccent, setAppearanceAccent] = useState("gold");
  const [appearanceDensity, setAppearanceDensity] = useState("comfortable");
  const settingsItems = [
    { icon: UsersRound, label: "Profile", value: "profile" },
    { icon: Settings, label: "Account", value: "account" },
    { icon: Bell, label: "Notifications", value: "notifications" },
    { icon: ShieldCheck, label: "Security", value: "security" },
    { icon: CreditCard, label: "Billing", value: "billing" },
    { icon: Palette, label: "Appearance", value: "appearance" },
    { icon: Blocks, label: "Integrations", value: "integrations" },
    { icon: UsersRound, label: "Team", value: "team" },
  ];
  const notifications = [
    ["Email notifications", "Receive updates via email", true],
    ["Push notifications", "Receive push notifications", true],
    ["Weekly summary", "Weekly digest of your activity", false],
    ["Product updates", "News and announcements", true],
  ] as const;
  const integrations = [
    ["Slack", "Connected to #flowsuite", "Connected"],
    ["Google Drive", "Connected as alex.kim@flowsuite.com", "Connected"],
    ["GitHub", "Connected as @alexkim", "Connected"],
    ["Stripe", "Connected for billing", "Connected"],
  ] as const;
  const sessions = [
    ["macOS - Chrome", "San Francisco, CA - US", "Current session"],
    ["iOS - Mobile App", "San Francisco, CA - US", "2h ago"],
    ["Windows - Edge", "New York, NY - US", "1d ago"],
  ] as const;
  const appearanceThemes = [
    { icon: Monitor, label: "Dark", value: "dark" },
    { icon: Monitor, label: "System", value: "system" },
    { icon: Sparkles, label: "Light", value: "light" },
  ] as const;
  const appearanceAccents = ["gold", "violet", "blue", "cyan", "green", "pink", "coral"] as const;
  const appearanceDensities = [
    {
      description: "More padding and room to breathe.",
      icon: BadgeCheck,
      label: "Comfortable",
      value: "comfortable",
    },
    {
      description: "More content in less space.",
      icon: LayoutDashboard,
      label: "Compact",
      value: "compact",
    },
  ] as const;
  const activeSettingsItem = settingsItems.find((item) => item.value === settingsTab) ?? settingsItems[0];

  return (
    <ExampleShowcasePage
      access="Pro"
      description="Comprehensive settings page with profile management, notification preferences, security options and billing controls."
      example={example}
      files={[
        "components/settings-sidebar.tsx",
        "components/profile-form.tsx",
        "components/notification-rules.tsx",
        "components/appearance-controls.tsx",
        "page.tsx",
      ]}
      onBack={onBack}
      title="Settings Page"
    >
      <div className="settings-showcase-preview">
        <aside className="settings-nav">
          <span className="settings-nav-label">Settings</span>
          {settingsItems.map(({ icon: Icon, label, value }) => (
            <button
              className="settings-nav-button"
              data-active={settingsTab === value ? "true" : undefined}
              key={value}
              onClick={() => setSettingsTab(value)}
              type="button"
            >
              <ItemMedia>
                <Icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{label}</ItemTitle>
              </ItemContent>
            </button>
          ))}
          <span className="settings-nav-spacer" aria-hidden="true" />
        </aside>

        <div className="settings-panels">
          <header className="settings-showcase-header">
            <div>
              <h2>{activeSettingsItem.label}</h2>
              <p>
                {settingsTab === "appearance"
                  ? "Customize how FlowSuite looks and feels for you."
                  : "Manage your account, preferences and workspace."}
              </p>
            </div>
            <div className="settings-showcase-actions">
              <Button size="sm" variant="secondary">Reset</Button>
              <Button size="sm">
                Save changes
                <Sparkles />
              </Button>
            </div>
          </header>

          <div className="settings-section-grid">
            {settingsTab === "profile" ? (
              <Card className="settings-section-card settings-profile-card">
                <CardHeader>
                  <div>
                    <CardTitle>Profile information</CardTitle>
                    <CardDescription>Update your personal details and how others see you.</CardDescription>
                  </div>
                  <div className="settings-profile-progress">
                    <strong>82% complete</strong>
                    <Progress value={82} />
                    <span>Nice! You're almost there.</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="settings-profile-media">
                    <Avatar className="settings-profile-avatar">
                      <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                    <Button size="sm" variant="secondary">
                      <UsersRound />
                      Change avatar
                    </Button>
                    <span className="settings-upload-note">JPG, PNG or GIF. Max 2MB.</span>
                  </div>
                  <div className="settings-field-list">
                    <label>
                      <span>Full name</span>
                      <Input className="settings-profile-input" defaultValue="Alex Kim" />
                    </label>
                    <label>
                      <span>Email address</span>
                      <Input className="settings-profile-input" defaultValue="alex.kim@flowsuite.com" />
                    </label>
                    <label className="settings-select-field">
                      <span>Role</span>
                      <span className="settings-select-wrap">
                        <Select defaultValue="admin">
                          <SelectTrigger className="settings-profile-select">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                          </SelectContent>
                        </Select>
                      </span>
                    </label>
                    <label>
                      <span>Phone number</span>
                      <Input className="settings-profile-input" defaultValue="+1 (415) 555-0199" />
                    </label>
                    <label>
                      <span>Company</span>
                      <Input className="settings-profile-input" defaultValue="FlowSuite Inc." />
                    </label>
                    <label className="settings-select-field">
                      <span>Time zone</span>
                      <span className="settings-select-wrap">
                        <Select defaultValue="pacific">
                          <SelectTrigger className="settings-profile-select">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pacific">(GMT-7) Pacific Time (US & Canada)</SelectItem>
                            <SelectItem value="eastern">(GMT-4) Eastern Time (US & Canada)</SelectItem>
                          </SelectContent>
                        </Select>
                      </span>
                    </label>
                    <label className="settings-bio-field">
                      <span>Bio</span>
                      <Textarea
                        className="settings-profile-textarea"
                        defaultValue="Building secure, reliable and delightful experiences for modern teams."
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {settingsTab === "notifications" ? (
            <Card className="settings-section-card">
              <CardHeader>
                <span className="settings-section-icon">
                  <Bell />
                </span>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="settings-list">
                {notifications.map(([title, description, checked]) => (
                  <Item key={title} surface="flat">
                    <ItemMedia>
                      <Mail />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{title}</ItemTitle>
                      <ItemDescription>{description}</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Switch defaultChecked={checked} />
                    </ItemActions>
                  </Item>
                ))}
                <button className="settings-card-link" type="button">
                  Manage notification preferences
                  <ChevronRight />
                </button>
              </CardContent>
            </Card>
            ) : null}

            {settingsTab === "appearance" ? (
            <Card
              className="settings-section-card settings-appearance-card"
              data-accent={appearanceAccent}
              data-density={appearanceDensity}
              data-theme-setting={appearanceTheme}
            >
              <CardContent className="settings-appearance-panel">
                <div className="settings-preference-row">
                  <div className="settings-preference-copy">
                    <strong>Theme</strong>
                    <span>Choose how the application looks.</span>
                  </div>
                  <Tabs
                    className="settings-theme-tabs"
                    onValueChange={setAppearanceTheme}
                    value={appearanceTheme}
                  >
                    <TabsList surface="flat">
                    {appearanceThemes.map(({ icon: Icon, label, value }) => (
                      <TabsTrigger
                        key={value}
                        value={value}
                      >
                        <Icon />
                        {label}
                      </TabsTrigger>
                    ))}
                    </TabsList>
                  </Tabs>
                </div>

                <div className="settings-preference-row">
                  <div className="settings-preference-copy">
                    <strong>Accent color</strong>
                    <span>Pick an accent color to highlight key elements.</span>
                  </div>
                  <div className="settings-swatch-row">
                    {appearanceAccents.map((tone) => (
                      <button
                        aria-label={`Use ${tone} accent`}
                        className="settings-swatch"
                        data-active={appearanceAccent === tone ? "true" : undefined}
                        data-tone={tone}
                        key={tone}
                        onClick={() => setAppearanceAccent(tone)}
                        type="button"
                      >
                        {appearanceAccent === tone ? <Check /> : null}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="settings-preference-row">
                  <div className="settings-preference-copy">
                    <strong>Density</strong>
                    <span>Adjust the spacing and information density.</span>
                  </div>
                  <div className="settings-density-row">
                    {appearanceDensities.map(({ description, icon: Icon, label, value }) => (
                      <Item
                        asChild
                        data-active={appearanceDensity === value ? "true" : undefined}
                        key={value}
                        surface="flat"
                      >
                        <button onClick={() => setAppearanceDensity(value)} type="button">
                          <ItemMedia>
                            <Icon />
                          </ItemMedia>
                          <ItemContent>
                            <ItemTitle>{label}</ItemTitle>
                            <ItemDescription>{description}</ItemDescription>
                          </ItemContent>
                        </button>
                      </Item>
                    ))}
                  </div>
                </div>

                <div className="settings-preference-row settings-preview-row">
                  <div className="settings-preference-copy">
                    <strong>Preview</strong>
                    <span>See how your preferences look in action.</span>
                  </div>
                  <div className="settings-preview-chart" aria-hidden="true">
                    <div className="settings-preview-sidebar">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="settings-preview-main">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="settings-preview-panel">
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            ) : null}

            {settingsTab === "security" ? (
            <Card className="settings-section-card">
              <CardHeader>
                <span className="settings-section-icon">
                  <ShieldCheck />
                </span>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="settings-list security">
                <Item surface="flat">
                  <ItemMedia>
                    <LockKeyhole />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Password</ItemTitle>
                    <ItemDescription>Last changed 45 days ago</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button size="sm" variant="secondary">Change</Button>
                  </ItemActions>
                </Item>
                <Item surface="flat">
                  <ItemMedia>
                    <ShieldCheck />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Two-factor authentication</ItemTitle>
                    <ItemDescription>Enabled</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button size="sm" variant="secondary">Manage</Button>
                  </ItemActions>
                </Item>
                {sessions.map(([title, description, status]) => (
                  <Item key={title} surface="flat">
                    <ItemMedia>
                      <Monitor />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{title}</ItemTitle>
                      <ItemDescription>{description}</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Badge variant="outline">{status}</Badge>
                    </ItemActions>
                  </Item>
                ))}
                <button className="settings-card-link" type="button">
                  Manage security settings
                  <ChevronRight />
                </button>
              </CardContent>
            </Card>
            ) : null}

            {settingsTab === "billing" ? (
            <Card className="settings-section-card settings-billing-card">
              <CardHeader>
                <span className="settings-section-icon">
                  <CreditCard />
                </span>
                <CardTitle>Billing</CardTitle>
              </CardHeader>
              <CardContent className="settings-billing-panel">
                <div className="settings-plan-row">
                  <div>
                    <span>Current plan</span>
                    <strong>Pro Plan</strong>
                    <Badge variant="outline">Most popular</Badge>
                  </div>
                  <div>
                    <span>Next renewal</span>
                    <strong>Jun 12, 2025</strong>
                    <small>in 24 days</small>
                  </div>
                </div>
                <div className="settings-usage-row">
                  <span>Usage this month</span>
                  <strong>78% of 100GB</strong>
                  <Progress value={78} />
                </div>
                <div className="settings-payment-section">
                  <span>Payment method</span>
                  <Item surface="flat">
                    <ItemMedia className="settings-payment-logo">
                      <PaymentBrandLogo brand="visa" size="wallet" />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Visa ending in 4242</ItemTitle>
                      <ItemDescription>Expires 04/28</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button size="sm" variant="secondary">Change</Button>
                    </ItemActions>
                  </Item>
                </div>
                <div className="settings-billing-history-section">
                  <span>Billing history</span>
                <button className="settings-card-link" type="button">
                  View billing history
                  <ChevronRight />
                </button>
                </div>
                <div className="settings-billing-note">
                  <Info />
                  <span>Invoices are generated automatically and sent to your billing email.</span>
                </div>
              </CardContent>
            </Card>
            ) : null}

            {settingsTab === "integrations" ? (
            <Card className="settings-section-card">
              <CardHeader>
                <span className="settings-section-icon">
                  <Blocks />
                </span>
                <CardTitle>Integrations</CardTitle>
              </CardHeader>
              <CardContent className="settings-list">
                {integrations.map(([title, description, status]) => (
                  <Item key={title} surface="flat">
                    <ItemMedia>
                      <Globe2 />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{title}</ItemTitle>
                      <ItemDescription>{description}</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Badge variant="outline">{status}</Badge>
                      <Button size="sm" variant="secondary">Manage</Button>
                    </ItemActions>
                  </Item>
                ))}
                <button className="settings-card-link" type="button">
                  Browse all integrations
                  <ChevronRight />
                </button>
              </CardContent>
            </Card>
            ) : null}

            {settingsTab === "account" ? (
              <Card className="settings-section-card">
                <CardHeader>
                  <span className="settings-section-icon">
                    <Settings />
                  </span>
                  <CardTitle>Account</CardTitle>
                </CardHeader>
                <CardContent className="settings-field-list">
                  <label>
                    <span>Workspace</span>
                    <Input defaultValue="FlowSuite" />
                  </label>
                  <label>
                    <span>Region</span>
                    <Select defaultValue="us">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="eu">Europe</SelectItem>
                      </SelectContent>
                    </Select>
                  </label>
                  <label>
                    <span>Language</span>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="tr">Turkish</SelectItem>
                      </SelectContent>
                    </Select>
                  </label>
                </CardContent>
              </Card>
            ) : null}

            {settingsTab === "team" ? (
              <Card className="settings-section-card">
                <CardHeader>
                  <span className="settings-section-icon">
                    <UsersRound />
                  </span>
                  <CardTitle>Team</CardTitle>
                </CardHeader>
                <CardContent className="settings-list">
                  {["Maya Chen", "Nora Ellis", "Sam Rivera", "Theo Martin"].map((member, index) => (
                    <Item key={member} surface="flat">
                      <ItemMedia>
                        <UsersRound />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{member}</ItemTitle>
                        <ItemDescription>{index === 0 ? "Owner" : "Product team"}</ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <Badge variant="outline">{index === 0 ? "Owner" : "Member"}</Badge>
                      </ItemActions>
                    </Item>
                  ))}
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </ExampleShowcasePage>
  );
}

function BasicLandingExample({ example, onBack }: { example: Example; onBack: () => void }) {
  return (
    <>
      <Navbar
        brand={
          <span className="landing-brand">
            <span className="landing-brand-mark" />
            SignalForge
          </span>
        }
        cta={{ href: "#demo", label: "Book demo" }}
        defaultTheme="dark"
        links={[
          { href: "#product", label: "Product" },
          { href: "#features", label: "Features" },
          { href: "#pricing", label: "Pricing" },
        ]}
        menu={{
          label: "Menu",
          title: "SignalForge",
          description: "A compact landing page example built with Alkamanas UI.",
          items: [
            { href: "#product", label: "Product", icon: LayoutDashboard },
            { href: "#features", label: "Features", icon: Sparkles },
            { href: "#demo", label: "Request demo", icon: Mail },
          ],
        }}
        mobileMenuLabel="Open navigation"
        mobileMenuCloseLabel="Close navigation"
        theme="dark"
      />

      <main className="landing-page">
        <section className="landing-hero" data-navbar-theme="dark" data-theme-color="#050505">
          <div className="landing-shell">
            <Button className="back-button" size="sm" variant="glass" onClick={onBack}>
              <ArrowLeft />
              Examples
            </Button>

            <div className="landing-hero-grid">
              <div className="landing-copy">
                <Badge>{example.title}</Badge>
                <h1>Launch operations without losing the signal.</h1>
                <p>
                  SignalForge turns fragmented team activity into a focused operating layer for
                  launches, billing, account health and customer-facing workflows.
                </p>
                <div className="landing-actions">
                  <Button>
                    Start free
                    <ArrowRight />
                  </Button>
                  <Button variant="glass">
                    <Play />
                    Watch overview
                  </Button>
                </div>
                <div className="landing-proof">
                  <Avatar>
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>VF</AvatarFallback>
                  </Avatar>
                  <span>Used by product, ops and revenue teams shipping weekly.</span>
                </div>
              </div>

              <Card className="landing-dashboard-card">
                <CardHeader>
                  <div className="dashboard-card-header">
                    <div>
                      <CardDescription>Live workspace</CardDescription>
                      <CardTitle>Launch control</CardTitle>
                    </div>
                    <Badge>
                      <BadgeCheck />
                      Healthy
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="pipeline">
                    <TabsList>
                      <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
                      <TabsTrigger value="accounts">Accounts</TabsTrigger>
                      <TabsTrigger value="risk">Risk</TabsTrigger>
                    </TabsList>
                    <TabsContent value="pipeline">
                      <div className="dashboard-preview-grid">
                        {platformStats.map((stat) => (
                          <div className="dashboard-stat" key={stat.label}>
                            <stat.icon />
                            <span>{stat.label}</span>
                            <strong>{stat.value}</strong>
                          </div>
                        ))}
                      </div>
                      <Progress value={76} />
                    </TabsContent>
                    <TabsContent value="accounts">
                      <div className="mini-list">
                        {["Acme Cloud", "Northstar Labs", "Linea Systems"].map((account) => (
                          <Item key={account} surface="glass">
                            <ItemMedia>
                              <Building2 />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle>{account}</ItemTitle>
                              <ItemDescription>Expansion motion active</ItemDescription>
                            </ItemContent>
                          </Item>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="risk">
                      <div className="mini-list">
                        {["SOC review", "Data residency", "Billing approval"].map((item) => (
                          <Item key={item} surface="glass">
                            <ItemMedia>
                              <Check />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle>{item}</ItemTitle>
                              <ItemDescription>Ready for launch</ItemDescription>
                            </ItemContent>
                          </Item>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="product" className="landing-band" data-navbar-theme="dark" data-theme-color="#050505">
          <div className="landing-shell feature-grid">
            <ImageCard
              className="landing-image-card"
              imageAlt="Industrial control room"
              imageSrc="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
              subtitle="CONTROL PLANE"
              title="One surface for every launch"
              description="A glass image card pattern for product pages that need rich imagery and readable copy."
            />
            <div className="feature-copy">
              <Badge>Platform</Badge>
              <h2>Designed for teams that move between strategy and execution.</h2>
              <p>
                Connect account health, operational thresholds and launch approvals into one
                repeated workflow. The page uses shared primitives instead of custom one-off UI.
              </p>
              <div className="feature-list">
                {featureItems.map((feature) => (
                  <Item key={feature.title} surface="glass">
                    <ItemMedia>
                      <feature.icon />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{feature.title}</ItemTitle>
                      <ItemDescription>{feature.description}</ItemDescription>
                    </ItemContent>
                  </Item>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="landing-band" data-navbar-theme="dark" data-theme-color="#050505">
          <div className="landing-shell">
            <div className="section-heading">
              <Badge>Features</Badge>
              <h2>Enough structure for real product pages.</h2>
              <p>
                Cards, tabs, input groups, buttons, keyboard hints and surface tokens work together
                without leaving the component system.
              </p>
            </div>

            <div className="capability-grid">
              {[
                [Factory, "Operational context", "Pages can feel specific without custom primitives."],
                [Globe2, "Global ready", "Region, account and workflow controls fit dense layouts."],
                [CircleDollarSign, "Revenue motion", "Pricing and conversion blocks can reuse the same system."],
              ].map(([Icon, label, description]) => (
                <Card key={label as string}>
                  <CardHeader>
                    <div className="capability-icon">
                      <Icon />
                    </div>
                    <CardTitle>{label as string}</CardTitle>
                    <CardDescription>{description as string}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="demo" className="landing-cta" data-navbar-theme="dark" data-theme-color="#050505">
          <div className="landing-shell">
            <Card className="cta-card">
              <CardHeader>
                <Badge>Request access</Badge>
                <CardTitle>See the landing page blocks in a production-shaped flow.</CardTitle>
                <CardDescription>
                  This form uses package inputs, input groups and buttons. It is intentionally short
                  so the example stays focused.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="cta-form">
                  <Input placeholder="Work email" variant="pill" />
                  <InputGroup>
                    <InputGroupAddon>
                      <Mail />
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Company name" />
                  </InputGroup>
                  <Button>
                    Request demo
                    <ChevronRight />
                  </Button>
                </div>
                <div className="cta-shortcuts">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Kbd>⌘ K</Kbd>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Command palette shortcut example</TooltipContent>
                  </Tooltip>
                  <span>
                    <Command /> Open command menu
                  </span>
                  <span>
                    <MousePointer2 /> Built from reusable components
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}

function ExamplesFooter() {
  return (
    <footer className="examples-footer">
      <div className="examples-shell footer-grid">
        <div>
          <ExamplesWordmark className="examples-footer-wordmark" />
          <p>Page examples composed from the package component system.</p>
        </div>
        <div className="footer-links">
          {["Marketing", "Dashboards", "Commerce", "Productivity", "Legal"].map((link) => (
            <a href="#site-map" key={link}>
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
