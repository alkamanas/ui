import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  summary:
    "Data Table composes Alkamanas surfaces with TanStack Table state for product tables that need filtering, sorting, selection, visibility and pagination.",
  anatomy: [
    "Import DataTable from @alkamanas/ui/data-table when the target app should load only the table primitive and its CSS.",
    "Define columns with TanStack ColumnDef objects. Columns own formatting, sortable headers and row-level actions.",
    "Use filterColumn for a focused toolbar filter, and keep richer product-specific controls in the toolbar slot.",
  ],
  variants: [
    {
      name: "flat",
      description: "Default bordered table surface for dense app pages and admin lists.",
    },
    {
      name: "glass",
      description: "Liquid glass table shell for showcase panels and high-emphasis dashboards.",
    },
    {
      name: "bare",
      description: "Transparent table shell for tables composed inside an existing glass panel.",
    },
  ],
  sizes: [
    {
      name: "responsive",
      description: "The table keeps horizontal overflow inside its shell while toolbar and pagination controls wrap on mobile.",
    },
    {
      name: "paginated",
      description: "pageSize sets the initial page length and can be tuned per table density.",
    },
  ],
  props: [
    {
      name: "columns",
      type: "DataTableColumnDef<TData, TValue>[]",
      description: "TanStack column definitions for headers, cells, sorting controls and row actions.",
    },
    {
      name: "data",
      type: "TData[]",
      description: "Rows rendered by the table engine.",
    },
    {
      name: "filterColumn",
      type: "string",
      description: "Column id or accessor key used by the built-in toolbar filter input.",
    },
    {
      name: "surface",
      type: '"flat" | "glass" | "bare"',
      description: "Controls the table shell surface. Use bare inside parent glass panels.",
    },
    {
      name: "toolbar",
      type: "ReactNode | (table) => ReactNode",
      description: "Optional extra controls rendered next to filtering and column visibility.",
    },
  ],
  accessibility: [
    "Keep row action buttons labelled, especially icon-only menu triggers.",
    "Column visibility and selection controls should expose clear aria-label text.",
    "Use readable header labels and preserve native table semantics for screen readers.",
  ],
  motion: [
    "Hover and selected row states transition color without shifting row height.",
    "Pagination buttons keep fixed control dimensions as table state changes.",
  ],
  tokens: [
    "--alka-ease-smooth",
    "--alka-panel-bg",
    "--alka-radius-card",
    "--alka-shadow-color",
  ],
};

export function DataTablePage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
