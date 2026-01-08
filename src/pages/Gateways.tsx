import React, { useEffect, useState, useMemo } from 'react';
import {
  type ColumnDef,
} from "@tanstack/react-table";
import { MoreVertical, ArrowUpDown, Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from '@/components/GatewayTable';
import TotalRevenueStatCard from '@/components/TotalRevenueStatCard';
import TotalRequestsStatCard from '@/components/TotalRequestsStatCard';
import ActiveGatewaysStatCard from '@/components/ActiveGatewaysStatCard';
import AvgLatencyStatCard from '@/components/AvgLatencyStatCard';
import { type Gateway } from '@/types/gateway';
import { gatewaysApi } from '@/lib/gateways';
import { analyticsApi } from '@/lib/analytics';
import { type GatewayOverviewResponse } from '@/types/analytics';
import { toast } from 'sonner';
import { 
  Dialog,  
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter,
  DialogClose 
} from "@/components/ui/dialog";
import GatewayDetailsModal from '@/components/GatewayDetailsModal';

const Gateways: React.FC = () => {
  const [data, setData] = useState<Gateway[]>([]);
  const [overview, setOverview] = useState<GatewayOverviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOverviewLoading, setIsOverviewLoading] = useState(true);
  const [selectedGatewayId, setSelectedGatewayId] = useState<string | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [gatewayToDelete, setGatewayToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchGateways = async () => {
    try {
      const response = await gatewaysApi.getAllWithStats();
      // Map the API response to match the Gateway type expected by the table
      setData(response);
    } catch (error) {
      console.error("Failed to fetch gateways:", error);
      toast.error("Failed to load gateways");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOverview = async () => {
    try {
      const response = await analyticsApi.getOverview("6a7065af-3025-430f-bd4c-9497ec332f4a", undefined, undefined);
      setOverview(response);
    } catch (error) {
      console.error("Failed to fetch overview:", error);
    } finally {
      setIsOverviewLoading(false);
    }
  };

  useEffect(() => {
    fetchGateways();
    fetchOverview();
  }, []);

  const handleViewDetails = (id: string) => {
    setSelectedGatewayId(id);
    setDetailsModalOpen(true);
  };

  const handleDeleteGatewayClick = (id: string) => {
    setGatewayToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDeleteGateway = async () => {
    if (!gatewayToDelete) return;
    
    setIsDeleting(true);
    try {
      await gatewaysApi.delete(gatewayToDelete);
      toast.success("Gateway deleted successfully");
      fetchGateways();
      setDeleteConfirmationOpen(false);
      setGatewayToDelete(null);
    } catch (error) {
      console.error("Failed to delete gateway:", error);
      toast.error("Failed to delete gateway");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<Gateway>[] = useMemo(() => [
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
                  <span className="font-bold text-white text-base">{gateway.subdomain}</span>
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
          accessorKey: "totalRequests",
          header: ({ column }) => {
              return (
                  <div className="text-right">
                      <Button
                          variant="ghost"
                          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Requests (Total)
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                  </div>
              )
          },
          cell: ({ row }) => {
            const amount = parseFloat(row.getValue("totalRequests"));
            const formatted = new Intl.NumberFormat("en-US").format(amount);
            return <div className="text-right font-mono text-white font-medium">{formatted}</div>;
          },
        },
        {
          accessorKey: "totalRevenue",
          header: ({ column }) => {
              return (
                  <div className="text-right">
                      <Button
                          variant="ghost"
                          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Revenue (Total)
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                  </div>
              )
          },
          cell: ({ row }) => {
              const revenue = row.original.totalRevenue;
              return (
                  <div className="text-right">
                      <div className="font-mono text-white font-medium">${new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(revenue)}</div>
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
              const gateway = row.original;
              const conversionRate = gateway.totalRequests === 0 ? 0 : (gateway.successfulPayments / gateway.totalRequests * 100).toFixed(2);
              return (
                  <div className="text-right">
                      <div className="font-medium text-primary">{conversionRate}%</div>
                      <div className="text-xs text-text-dim font-mono">{gateway.successfulPayments} / {gateway.totalRequests}</div>
                  </div>
              )
          }
        },
        {
          id: "actions",
          header: () => <div className="text-center">Actions</div>,
          cell: ({ row }) => {
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
                      <DropdownMenuItem onClick={() => handleViewDetails(row.original.id)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Pause Gateway</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border-dark"/>
                      <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteGatewayClick(row.original.id)}>Delete Gateway</DropdownMenuItem>
                  </DropdownMenuContent>
                  </DropdownMenu>
              </div>
            );
          },
        },
  ], []);

  return (
    <div className="layout-content-container flex flex-col w-full flex-1">
      <div className="flex flex-col md:flex-row justify-between gap-6 px-4 py-4 items-start md:items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Gateways</h1>
          <p className="text-text-dim text-sm sm:text-base font-normal leading-normal max-w-2xl">Manage your API monetization endpoints, monitor traffic, and configure x402 payment rules.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <TotalRevenueStatCard value={overview?.totalRevenue} isLoading={isOverviewLoading} />
          <TotalRequestsStatCard value={overview?.totalRequests} isLoading={isOverviewLoading} />
          <ActiveGatewaysStatCard activeGateways={data.length} pausedGateways={data.filter(g => g.status === 'paused').length} />
          <AvgLatencyStatCard value={overview?.avgLatencyMs} isLoading={isOverviewLoading} />
      </div>
      <div className="px-4 pb-8">
        <div className="w-full overflow-hidden rounded-xl border border-border-dark bg-surface-dark/20 shadow-xl shadow-black/20">
          {isLoading ? (
             <div className="flex items-center justify-center p-12">
                <Loader2 className="animate-spin text-primary" size={32} />
             </div>
          ) : (
             <DataTable columns={columns} data={data} />
          )}
        </div>
      </div>
      <Dialog open={detailsModalOpen} onOpenChange={setDetailsModalOpen}>
        <GatewayDetailsModal 
          gatewayId={selectedGatewayId} 
          setOpen={setDetailsModalOpen}
          onGatewayUpdated={fetchGateways} 
        />
      </Dialog>
      <Dialog open={deleteConfirmationOpen} onOpenChange={setDeleteConfirmationOpen}>
        <DialogContent className="bg-background border-border-dark text-white">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the gateway.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" disabled={isDeleting}>Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDeleteGateway} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  Deleting...
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gateways;
