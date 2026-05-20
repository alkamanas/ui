import { readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(currentDir, "..");
const repoRoot = resolve(packageRoot, "../..");
const registryPath = join(repoRoot, "registry/registry.json");

const extraEntries = [
  { name: "alert", entry: "src/components/ui/alert.tsx" },
  { name: "custom-checkbox", entry: "src/components/ui/custom-checkbox.tsx" },
  { name: "draggable-number-input", entry: "src/components/ui/draggable-number-input.tsx" },
  { name: "empty", entry: "src/components/ui/empty.tsx" },
  { name: "form", entry: "src/form.ts", cssSources: ["src/components/ui/form.tsx"] },
  { name: "hover-card", entry: "src/components/ui/hover-card.tsx" },
  { name: "icons", entry: "src/components/ui/icons.tsx" },
  { name: "table", entry: "src/components/ui/table.tsx" },
  { name: "skeleton", entry: "src/components/ui/skeleton.tsx" },
  { name: "ambient-background", entry: "src/components/shell/AmbientBackground.tsx" },
  { name: "data-state", entry: "src/components/shell/DataState.tsx" },
  { name: "empty-state", entry: "src/components/shell/EmptyState.tsx" },
  { name: "floating-sidebar", entry: "src/components/shell/FloatingSidebar.tsx" },
  { name: "floating-sidebar-provider", entry: "src/components/shell/FloatingSidebarProvider.tsx" },
  { name: "floating-sidebar-trigger", entry: "src/components/shell/FloatingSidebarTrigger.tsx" },
  { name: "page-container", entry: "src/components/shell/PageContainer.tsx" },
  { name: "page-content", entry: "src/components/shell/PageContent.tsx" },
  { name: "page-header", entry: "src/components/shell/PageHeader.tsx" },
  { name: "billing-usage-skeleton", entry: "src/components/skeletons/BillingUsageSkeleton.tsx" },
  { name: "form-skeleton", entry: "src/components/skeletons/FormSkeleton.tsx" },
  { name: "project-list-skeleton", entry: "src/components/skeletons/ProjectListSkeleton.tsx" },
  { name: "stat-card-skeleton", entry: "src/components/skeletons/StatCardSkeleton.tsx" },
  { name: "table-skeleton", entry: "src/components/skeletons/TableSkeleton.tsx" },
  { name: "liquid-glass-filter", entry: "src/components/surfaces/liquid-glass-filter.tsx" },
];

function toPackageSource(source) {
  return source.startsWith("packages/ui/") ? source.slice("packages/ui/".length) : source;
}

function normalizeEntry(entry) {
  return {
    ...entry,
    cssSources: entry.cssSources ?? [entry.entry],
  };
}

export function getComponentEntries() {
  const registry = JSON.parse(readFileSync(registryPath, "utf8"));
  const entries = new Map();

  for (const item of registry.items) {
    const entry = toPackageSource(item.source);
    entries.set(item.name, normalizeEntry({ name: item.name, entry }));
  }

  entries.delete("section-aware-navbar");
  entries.set(
    "navbar",
    normalizeEntry({
      name: "navbar",
      entry: "src/navbar.ts",
      cssSources: [
        "src/components/navigation/section-aware-navbar.tsx",
        "src/components/surfaces/liquid-glass-filter.tsx",
        "src/components/ui/button.tsx",
      ],
    }),
  );
  entries.set(
    "section-aware-navbar",
    normalizeEntry({
      name: "section-aware-navbar",
      entry: "src/section-aware-navbar.ts",
      cssSources: [
        "src/components/navigation/section-aware-navbar.tsx",
        "src/components/surfaces/liquid-glass-filter.tsx",
        "src/components/ui/button.tsx",
      ],
    }),
  );

  for (const entry of extraEntries) {
    entries.set(entry.name, normalizeEntry(entry));
  }

  return Array.from(entries.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getComponentEntryObject() {
  return Object.fromEntries(getComponentEntries().map((entry) => [entry.name, entry.entry]));
}

export function toStyleSourceDirective(source, fromDir = "src/styles") {
  const fromPath = join(packageRoot, fromDir);
  const targetPath = join(packageRoot, source);
  const relativePath = relative(fromPath, targetPath).replaceAll("\\", "/");
  return `@source "${relativePath}";`;
}
