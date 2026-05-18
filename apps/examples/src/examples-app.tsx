import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ChevronRight,
  CircleDollarSign,
  Command,
  Factory,
  Gauge,
  Globe2,
  LayoutDashboard,
  Mail,
  MousePointer2,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
  Zap,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  GlassProvider,
  ImageCard,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Kbd,
  Progress,
  SectionAwareNavbar,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@alkamanas/ui";

type ExampleId = "basic-landing";

type Example = {
  id: ExampleId;
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  complexity: string;
};

const examples: Example[] = [
  {
    id: "basic-landing",
    title: "Basic landing page",
    eyebrow: "Marketing",
    description:
      "A single-page product landing experience using the navbar, buttons, cards, image card, tabs, input group and glass surfaces.",
    tags: ["Navbar", "Hero", "Cards", "CTA"],
    complexity: "Starter",
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

export function ExamplesApp() {
  const [activeExample, setActiveExample] = useState<ExampleId | "home">("home");
  const selectedExample = useMemo(
    () => examples.find((example) => example.id === activeExample),
    [activeExample],
  );

  return (
    <GlassProvider effect="blurry" realisticStrategy="auto">
      <TooltipProvider>
        <div className="examples-app alka-theme-dark theme-dark">
          {activeExample === "home" ? (
            <ExamplesHome onOpenExample={setActiveExample} />
          ) : (
            <BasicLandingExample onBack={() => setActiveExample("home")} title={selectedExample?.title} />
          )}
        </div>
      </TooltipProvider>
    </GlassProvider>
  );
}

function ExamplesHome({
  onOpenExample,
}: {
  onOpenExample: (id: ExampleId) => void;
}) {
  return (
    <main className="examples-home" data-navbar-theme="dark" data-theme-color="#050505">
      <div className="examples-shell">
        <header className="examples-hero">
          <Badge>Examples</Badge>
          <h1>Production-shaped blocks built with Alkamanas UI.</h1>
          <p>
            Browse complete page examples that use the public components directly. Each card opens a
            full example surface for visual QA and reuse planning.
          </p>
        </header>

        <section className="examples-grid" aria-label="Example gallery">
          {examples.map((example) => (
            <Card key={example.id} className="example-card">
              <CardHeader>
                <div className="example-card-topline">
                  <Badge>{example.eyebrow}</Badge>
                  <span>{example.complexity}</span>
                </div>
                <CardTitle>{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="example-preview">
                  <div className="preview-nav">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="preview-hero">
                    <span />
                    <strong />
                    <em />
                  </div>
                  <div className="preview-cards">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="example-tags">
                  {example.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="example-open" onClick={() => onOpenExample(example.id)}>
                  Open example
                  <ArrowRight />
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}

function BasicLandingExample({ onBack, title }: { onBack: () => void; title?: string }) {
  return (
    <>
      <SectionAwareNavbar
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
        theme="auto"
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
                <Badge>{title ?? "Basic landing page"}</Badge>
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
