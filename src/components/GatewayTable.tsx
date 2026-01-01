"use client"
import { useState } from "react";
import { MoreVertical, ArrowUpDown, Copy, Search, Filter, Rows, LayoutGrid } from "lucide-react";
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "./ui/input";

export type Gateway = {
  id: string;
  name: string;
  status: "active" | "paused";
  subdomain: string;
  requests24h: number;
  revenue24h: {
    eth: number;
    usd: number;
  };
  conversion: number;
};

export const columns: ColumnDef<Gateway>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Gateway / Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const gateway = row.original;
          const statusIndicator =
            gateway.status === "active" ? (
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
            ) : (
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
            );
    
          return (
            <div className="flex items-center gap-3">
              {statusIndicator}
              <div className="flex flex-col">
                <span className="font-bold text-white text-base">{gateway.name}</span>
                <span className="font-mono text-xs text-text-dim">ID: {gateway.id}</span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "subdomain",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Subdomain URL
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2 group/copy cursor-pointer w-fit p-1.5 -ml-1.5 rounded hover:bg-white/5 transition-colors">
                <span className="font-mono text-text-dim">{row.original.subdomain}</span>
                <Copy className="text-text-dim opacity-0 group-hover/copy:opacity-100 transition-opacity" size={14}/>
            </div>
          )
        }
      },
      {
        accessorKey: "requests24h",
        header: ({ column }) => {
            return (
                <div className="text-right">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Requests (24h)
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("requests24h"));
          const formatted = new Intl.NumberFormat("en-US").format(amount);
          return <div className="text-right font-mono text-white font-medium">{formatted}</div>;
        },
      },
      {
        accessorKey: "revenue24h",
        header: ({ column }) => {
            return (
                <div className="text-right">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Revenue (24h)
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const revenue = row.original.revenue24h;
            return (
                <div className="text-right">
                    <div className="font-mono text-white font-medium">{revenue.eth} ETH</div>
                    <div className="text-xs text-text-dim">≈ ${new Intl.NumberFormat("en-US").format(revenue.usd)}</div>
                </div>
            )
        }
      },
      {
        accessorKey: "conversion",
        header: ({ column }) => {
            return (
                <div className="text-right">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Conversion
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className="text-right font-medium text-primary">{row.original.conversion}%</div>
        }
      },
      {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: () => {
          return (
            <div className="text-center">
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-text-dim hover:text-white">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background border-border-dark text-white">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Pause Gateway</DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border-dark"/>
                    <DropdownMenuItem className="text-red-500">Delete Gateway</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
          );
        },
      },
];

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