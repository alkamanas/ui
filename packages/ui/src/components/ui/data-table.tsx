"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  type Table as TanStackTable,
  type VisibilityState,
} from "@tanstack/react-table"

import { GlassElementLayers } from "@/components/surfaces/liquid-glass-filter"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export type DataTableSurface = "flat" | "glass" | "bare"

export interface DataTableProps<TData, TValue>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  emptyLabel?: React.ReactNode
  enableColumnVisibility?: boolean
  enablePagination?: boolean
  enableRowSelection?: boolean
  filterColumn?: string
  filterPlaceholder?: string
  pageSize?: number
  selectedRowsLabel?: (selectedCount: number, rowCount: number) => React.ReactNode
  surface?: DataTableSurface
  tableClassName?: string
  toolbar?: React.ReactNode | ((table: TanStackTable<TData>) => React.ReactNode)
}

function getDefaultSelectionLabel(selectedCount: number, rowCount: number) {
  return `${selectedCount} of ${rowCount} row(s) selected.`
}

function getColumnLabel(columnId: string) {
  return columnId
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (character) => character.toUpperCase())
}

function DataTable<TData, TValue>({
  className,
  columns,
  data,
  emptyLabel = "No results.",
  enableColumnVisibility = true,
  enablePagination = true,
  enableRowSelection = true,
  filterColumn,
  filterPlaceholder,
  pageSize = 5,
  selectedRowsLabel = getDefaultSelectionLabel,
  surface = "flat",
  tableClassName,
  toolbar,
  ...props
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const useGlassSurface = surface === "glass"

  const table = useReactTable({
    data,
    columns,
    enableRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
      sorting,
    },
  })

  React.useEffect(() => {
    if (!enablePagination) return
    table.setPageSize(pageSize)
  }, [enablePagination, pageSize, table])

  const filterColumnInstance = filterColumn ? table.getColumn(filterColumn) : undefined
  const renderedToolbar = typeof toolbar === "function" ? toolbar(table) : toolbar
  const visibleColumns = table.getAllColumns().filter((column) => column.getCanHide())
  const hasColumnVisibilityControl = enableColumnVisibility && visibleColumns.length > 0
  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const rowCount = table.getFilteredRowModel().rows.length

  return (
    <div
      className={cn("alka-data-table", className)}
      data-surface={surface}
      {...props}
    >
      {filterColumnInstance || renderedToolbar || hasColumnVisibilityControl ? (
        <div className="alka-data-table-toolbar">
          {filterColumnInstance ? (
            <Input
              floatingLabel={false}
              placeholder={filterPlaceholder ?? `Filter ${getColumnLabel(filterColumn ?? "")}...`}
              value={(filterColumnInstance.getFilterValue() as string | undefined) ?? ""}
              variant="pill"
              wrapperClassName="alka-data-table-filter"
              onChange={(event) => filterColumnInstance.setFilterValue(event.target.value)}
            />
          ) : null}
          {renderedToolbar ? (
            <div className="alka-data-table-toolbar-slot">{renderedToolbar}</div>
          ) : null}
          {hasColumnVisibilityControl ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="alka-data-table-columns-trigger" size="sm" variant="outlineFlat">
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {visibleColumns.map((column) => (
                  <DropdownMenuCheckboxItem
                    checked={column.getIsVisible()}
                    key={column.id}
                    onCheckedChange={(value) => column.toggleVisibility(Boolean(value))}
                  >
                    {getColumnLabel(column.id)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      ) : null}

      <div
        className={cn(
          "alka-data-table-shell",
          useGlassSurface && "alka-liquid-glass",
        )}
        data-surface={surface}
      >
        {useGlassSurface ? <GlassElementLayers /> : null}
        <Table className={cn("alka-data-table-table", tableClassName)}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="alka-data-table-empty" colSpan={columns.length}>
                  {emptyLabel}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {enablePagination || enableRowSelection ? (
        <div className="alka-data-table-footer">
          {enableRowSelection ? (
            <div className="alka-data-table-selection">
              {selectedRowsLabel(selectedCount, rowCount)}
            </div>
          ) : null}
          {enablePagination ? (
            <div className="alka-data-table-pagination">
              <Button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                size="sm"
                type="button"
                variant="outlineFlat"
              >
                Previous
              </Button>
              <Button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                size="sm"
                type="button"
                variant="outlineFlat"
              >
                Next
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export { DataTable }
export type {
  ColumnDef as DataTableColumnDef,
  TanStackTable as DataTableInstance,
}
