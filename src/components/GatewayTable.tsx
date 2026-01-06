"use client"
import { useState } from "react";
import { Search, Filter, Rows, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "./ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div>
        <div className="px-4 py-3">
            <div className="flex flex-col sm:flex-row justify-between gap-4 p-2 rounded-lg bg-surface-dark/30 border-border-dark/50">
                <div className="flex flex-1 gap-2 items-center">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-2.5 text-text-dim" size={20}/>
                        <Input
                            placeholder="Search by name or subdomain..."
                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("name")?.setFilterValue(event.target.value)
                            }
                            className="w-full bg-background-dark border border-border-dark rounded-md py-2 pl-10 pr-4 text-sm text-white focus:border-primary focus:ring-0 placeholder:text-text-dim/50 font-sans"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="bg-background-dark border-border-dark hover:border-primary/50">
                                <Filter size={20} className="mr-2"/>
                                <span className="text-sm font-medium hidden sm:inline">Filter</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background border-border-dark text-white">
                            {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                    column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="flex bg-background-dark border border-border-dark rounded-md p-1">
                        <Button variant="ghost" className="p-1.5 rounded bg-surface-dark text-white shadow-sm">
                            <Rows size={20}/>
                        </Button>
                        <Button variant="ghost" className="p-1.5 rounded text-text-dim hover:text-white transition-colors">
                            <LayoutGrid size={20}/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <div className="overflow-x-auto">
            <Table className="w-full text-left border-collapse">
            <TableHeader className="bg-surface-dark border-b border-border-dark">
                {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-border-dark">
                    {headerGroup.headers.map((header) => {
                    return (
                        <TableHead key={header.id} className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-dim">
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </TableHead>
                    );
                    })}
                </TableRow>
                ))}
            </TableHeader>
            <TableBody className="divide-y divide-border-dark text-sm">
                {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group hover:bg-surface-dark/50 transition-colors"
                    >
                    {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-4 px-6 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                    ))}
                    </TableRow>
                ))
                ) : (
                <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
         <div className="flex items-center justify-between px-6 py-4 bg-surface-dark border-t border-border-dark">
            <div className="text-sm text-text-dim">
                Showing <span className="font-medium text-white">1-{table.getRowModel().rows.length}</span> of <span className="font-medium text-white">{table.getCoreRowModel().rows.length}</span> gateways
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-text-dim border-border-dark hover:bg-background-dark hover:text-white" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
                <Button variant="outline" size="sm" className="text-text-dim border-border-dark hover:bg-background-dark hover:text-white" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
            </div>
        </div>
    </div>
  );
}