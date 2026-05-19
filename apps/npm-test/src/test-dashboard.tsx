import { useMemo, useState } from "react";
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
  Combobox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  Label,
  Progress,
  RadioGroup,
  RadioGroupItem,
  SectionAwareNavbar,
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
  Slider,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toaster,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  toast,
} from "@alkamanas/ui";

const packageVersion = "0.1.6";

const workspaceOptions = [
  { value: "studio", label: "Studio operations" },
  { value: "commerce", label: "Commerce launch" },
  { value: "support", label: "Support desk" },
  { value: "infra", label: "Infrastructure" },
];

const regionOptions = [
  { value: "eu", label: "Europe" },
  { value: "us", label: "United States" },
  { value: "apac", label: "Asia Pacific" },
];

const navigationItems = ["Overview", "Metrics", "Accounts", "Billing", "Settings"];

const metrics = [
  { label: "Revenue", value: "$428k", detail: "+12.4% month over month", progress: 74 },
  { label: "Conversion", value: "8.9%", detail: "1.8% above forecast", progress: 63 },
  { label: "Latency", value: "82 ms", detail: "p95 API response", progress: 41 },
];

const activityItems = [
  {
    title: "Billing guardrails updated",
    description: "A new threshold rule is active for enterprise plans.",
    shortcut: "B",
  },
  {
    title: "Data sync completed",
    description: "42,813 customer events were reconciled successfully.",
    shortcut: "D",
  },
  {
    title: "Launch review queued",
    description: "Three approvers need to confirm the workspace release.",
    shortcut: "L",
  },
];

export function TestDashboard() {
  const [workspace, setWorkspace] = useState("studio");
  const [region, setRegion] = useState("eu");
  const [automation, setAutomation] = useState(true);
  const [budget, setBudget] = useState([64]);
  const [reviewMode, setReviewMode] = useState("production");

  const selectedWorkspace = useMemo(
    () => workspaceOptions.find((option) => option.value === workspace)?.label ?? "Workspace",
    [workspace],
  );

  return (
    <GlassProvider effect="blurry" realisticStrategy="auto">
      <TooltipProvider>
        <div className="test-app alka-theme-dark theme-dark">
          <SectionAwareNavbar
            brand="Alkamanas npm test"
            cta={{ href: "#workspace", label: "Open workspace" }}
            defaultTheme="dark"
            glassEffect="realistic"
            glassRealisticStrategy="premium"
            links={[
              { href: "#overview", label: "Overview" },
              { href: "#workspace", label: "Workspace" },
              { href: "#forms", label: "Forms" },
              { href: "#audit", label: "Audit" },
            ]}
            theme="auto"
          />

          <main>
            <section
              id="overview"
              className="test-section test-section-first"
              data-navbar-theme="dark"
              data-theme-color="#050505"
            >
              <div className="page-shell hero-grid">
                <Card>
                  <CardHeader>
                    <Badge>Published package smoke test</Badge>
                    <CardTitle>Admin surface for checking the npm package in context.</CardTitle>
                    <CardDescription>
                      This app imports @alkamanas/ui from npm. Local CSS is limited to layout, so
                      visual bugs come from the package instead of the consumer app.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="inline-flow">
                      <Button size="sm">Run review</Button>
                      <Button variant="glass" size="sm">
                        Export report
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="stack">
                  <Card>
                    <CardHeader>
                      <CardDescription>Package source</CardDescription>
                      <CardTitle>@alkamanas/ui</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="metadata-grid">
                        <span>Version</span>
                        <Kbd>{packageVersion}</Kbd>
                        <span>Components</span>
                        <strong>47</strong>
                        <span>Stylesheet</span>
                        <strong>npm package</strong>
                      </div>
                    </CardContent>
                  </Card>

                  <ImageCard
                    className="image-test-card"
                    imageAlt="Modern production floor"
                    imageSrc="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                    subtitle="CONTROL ROOM"
                    title="Image card"
                    description="Tests package image treatment, masked blur and copy scale."
                  />
                </div>
              </div>
            </section>

            <section
              id="workspace"
              className="test-section"
              data-navbar-theme="dark"
              data-theme-color="#050505"
            >
              <div className="page-shell">
                <Card className="dashboard-card">
                  <SidebarProvider className="dashboard-layout" defaultOpen>
                    <Sidebar position="relative" variant="floating" collapsible="icon">
                      <SidebarHeader>
                        <Avatar>
                          <AvatarFallback>AK</AvatarFallback>
                        </Avatar>
                        <CardTitle>Control room</CardTitle>
                        <CardDescription>Package consumer app</CardDescription>
                      </SidebarHeader>
                      <SidebarContent>
                        <SidebarGroup>
                          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                          <SidebarGroupContent>
                            <SidebarMenu>
                              {navigationItems.map((label, index) => (
                                <SidebarMenuItem key={label}>
                                  <SidebarMenuButton isActive={index === 0} tooltip={label}>
                                    {label}
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              ))}
                            </SidebarMenu>
                          </SidebarGroupContent>
                        </SidebarGroup>
                      </SidebarContent>
                    </Sidebar>

                    <div className="workspace-column">
                      <Card>
                        <CardContent>
                          <div className="toolbar-grid">
                            <Breadcrumb>
                              <BreadcrumbList>
                                <BreadcrumbItem>
                                  <BreadcrumbLink href="#overview">Admin</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                  <BreadcrumbPage>{selectedWorkspace}</BreadcrumbPage>
                                </BreadcrumbItem>
                              </BreadcrumbList>
                            </Breadcrumb>

                            <div className="control-grid">
                              <Combobox
                                options={workspaceOptions}
                                size="sm"
                                surface="flat"
                                value={workspace}
                                onValueChange={setWorkspace}
                              />
                              <Select value={region} onValueChange={setRegion}>
                                <SelectTrigger size="sm" surface="flat">
                                  <SelectValue placeholder="Region" />
                                </SelectTrigger>
                                <SelectContent>
                                  {regionOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button aria-label="More actions" size="icon" variant="glass">
                                    ...
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Notify team</DropdownMenuItem>
                                  <DropdownMenuItem>Review access</DropdownMenuItem>
                                  <DropdownMenuItem>Open logs</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Tabs defaultValue="health">
                        <TabsList>
                          <TabsTrigger value="health">Health</TabsTrigger>
                          <TabsTrigger value="traffic">Traffic</TabsTrigger>
                          <TabsTrigger value="quality">Quality</TabsTrigger>
                        </TabsList>

                        <TabsContent value="health">
                          <div className="metric-grid">
                            {metrics.map((metric) => (
                              <Card key={metric.label}>
                                <CardHeader>
                                  <CardDescription>{metric.label}</CardDescription>
                                  <CardTitle>{metric.value}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <Progress value={metric.progress} />
                                  <CardDescription>{metric.detail}</CardDescription>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="traffic">
                          <Card>
                            <CardHeader>
                              <CardTitle>Traffic shaping</CardTitle>
                              <CardDescription>
                                Slider, switch and progress controls are rendered directly from the
                                package.
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="stack">
                                <Label>Budget allocation: {budget[0]}%</Label>
                                <Slider
                                  aria-label="Budget allocation"
                                  max={100}
                                  value={budget}
                                  onValueChange={setBudget}
                                />
                                <div className="inline-flow inline-flow-between">
                                  <Label htmlFor="automation">Automation</Label>
                                  <Switch
                                    checked={automation}
                                    id="automation"
                                    onCheckedChange={setAutomation}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        <TabsContent value="quality">
                          <div className="stack">
                            {activityItems.map((activity) => (
                              <Item key={activity.title} surface="glass">
                                <ItemMedia>
                                  <Avatar>
                                    <AvatarFallback>{activity.shortcut}</AvatarFallback>
                                  </Avatar>
                                </ItemMedia>
                                <ItemContent>
                                  <ItemTitle>{activity.title}</ItemTitle>
                                  <ItemDescription>{activity.description}</ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                  <Button size="sm" variant="glass">
                                    View
                                  </Button>
                                </ItemActions>
                              </Item>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </SidebarProvider>
                </Card>
              </div>
            </section>

            <section
              id="forms"
              className="test-section"
              data-navbar-theme="dark"
              data-theme-color="#050505"
            >
              <div className="page-shell">
                <div className="section-heading">
                  <Badge>Form and overlay lab</Badge>
                  <CardTitle>Inputs, menus and modal primitives in package-only styling.</CardTitle>
                </div>

                <div className="two-column-grid">
                  <Card>
                    <CardHeader>
                      <CardTitle>Launch form</CardTitle>
                      <CardDescription>
                        Form controls are not styled by the test app. Only package CSS can affect
                        their visual state.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="form-grid">
                        <div className="field">
                          <Label htmlFor="project-name">Project name</Label>
                          <Input id="project-name" placeholder="Project name" variant="pill" />
                        </div>
                        <div className="field">
                          <Label htmlFor="domain">Domain</Label>
                          <InputGroup>
                            <InputGroupAddon>https://</InputGroupAddon>
                            <InputGroupInput id="domain" placeholder="studio.alkamanas.app" />
                          </InputGroup>
                        </div>
                        <div className="field field-wide">
                          <Label htmlFor="notes">Release notes</Label>
                          <Textarea id="notes" placeholder="Describe the release..." />
                        </div>
                      </div>

                      <Separator className="layout-separator" />

                      <div className="two-column-grid">
                        <RadioGroup value={reviewMode} onValueChange={setReviewMode}>
                          <div className="inline-flow">
                            <RadioGroupItem id="preview" value="preview" />
                            <Label htmlFor="preview">Preview</Label>
                          </div>
                          <div className="inline-flow">
                            <RadioGroupItem id="production" value="production" />
                            <Label htmlFor="production">Production</Label>
                          </div>
                        </RadioGroup>

                        <div className="stack stack-tight">
                          <div className="inline-flow">
                            <Checkbox defaultChecked id="analytics" />
                            <Label htmlFor="analytics">Enable analytics</Label>
                          </div>
                          <div className="inline-flow">
                            <Checkbox id="review" />
                            <Label htmlFor="review">Require manual review</Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Risk actions</CardTitle>
                      <CardDescription>
                        Overlay surfaces, buttons and toasts should look identical to the docs
                        package.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="stack">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="glass">Open dialog</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Approve production launch?</DialogTitle>
                              <DialogDescription>
                                This action moves the selected workspace into production mode.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="secondary">Cancel</Button>
                              <Button>Approve</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="glassPrimary">Open sheet</Button>
                          </SheetTrigger>
                          <SheetContent size="md">
                            <SheetHeader>
                              <SheetTitle>Workspace summary</SheetTitle>
                              <SheetDescription>
                                Sheet motion, glass surface and focus management are loaded from
                                the published package.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="two-column-grid">
                              <Card>
                                <CardHeader>
                                  <CardDescription>Jobs</CardDescription>
                                  <CardTitle>128</CardTitle>
                                </CardHeader>
                              </Card>
                              <Card>
                                <CardHeader>
                                  <CardDescription>Alerts</CardDescription>
                                  <CardTitle>4</CardTitle>
                                </CardHeader>
                              </Card>
                            </div>
                            <SheetFooter>
                              <Button>Save changes</Button>
                            </SheetFooter>
                          </SheetContent>
                        </Sheet>

                        <Button
                          variant="destructive"
                          onClick={() =>
                            toast("Deployment draft removed", {
                              description: "The npm package toast API is working in the test app.",
                            })
                          }
                        >
                          Show toast
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <section
              id="audit"
              className="test-section"
              data-navbar-theme="dark"
              data-theme-color="#050505"
            >
              <div className="page-shell two-column-grid">
                <Card>
                  <CardHeader>
                    <CardTitle>Audit queue</CardTitle>
                    <CardDescription>
                      Item, tooltip and keyboard affordances in one package-only block.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="stack">
                      {activityItems.map((activity) => (
                        <Item key={activity.title} surface="solid">
                          <ItemMedia>
                            <Avatar>
                              <AvatarFallback>{activity.shortcut}</AvatarFallback>
                            </Avatar>
                          </ItemMedia>
                          <ItemContent>
                            <ItemTitle>{activity.title}</ItemTitle>
                            <ItemDescription>{activity.description}</ItemDescription>
                          </ItemContent>
                          <ItemActions>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button aria-label="Inspect item" size="icon" variant="glass">
                                  ?
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Inspect package behavior</TooltipContent>
                            </Tooltip>
                          </ItemActions>
                        </Item>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Shortcuts</CardTitle>
                    <CardDescription>Keyboard tokens and quick actions.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="stack stack-tight">
                      <Item surface="glass">
                        <ItemContent>
                          <ItemTitle>Command menu</ItemTitle>
                          <ItemDescription>Open the command palette.</ItemDescription>
                        </ItemContent>
                        <ItemActions>
                          <Kbd>⌘ K</Kbd>
                        </ItemActions>
                      </Item>
                      <Item surface="glass">
                        <ItemContent>
                          <ItemTitle>Refresh metrics</ItemTitle>
                          <ItemDescription>Pull a fresh dashboard snapshot.</ItemDescription>
                        </ItemContent>
                        <ItemActions>
                          <Kbd>R</Kbd>
                        </ItemActions>
                      </Item>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </main>

          <Button
            className="floating-action"
            size="icon"
            variant="glass"
            onClick={() => toast("Published package is mounted")}
            aria-label="Open support"
          >
            ?
          </Button>

          <Toaster position="bottom-right" />
        </div>
      </TooltipProvider>
    </GlassProvider>
  );
}
