export type DocItem = {
  id: string;
  title: string;
  description: string;
  group: "Sections" | "Components" | "Patterns" | "Registry";
  command?: string;
  importCode?: string;
};

export const componentNames = [
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

export const docs: DocItem[] = [
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

export const groupedDocs = docs.reduce<Record<DocItem["group"], DocItem[]>>(
  (groups, item) => {
    groups[item.group].push(item);
    return groups;
  },
  { Sections: [], Components: [], Patterns: [], Registry: [] },
);

export const componentIds = new Set(docs.filter((item) => item.group === "Components" || item.group === "Patterns").map((item) => item.id));
export const blockPageIds = new Set(["blocks", "blocks-dashboard", "blocks-forms", "blocks-marketing", "blocks-command"]);
