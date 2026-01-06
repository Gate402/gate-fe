import React, { useEffect, useState } from 'react';
import { Loader2, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Status, StatusIndicator, StatusLabel } from '@/components/ui/shadcn-io/status';
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { gatewaysApi } from '@/lib/gateways';
import { toast } from 'sonner';
import { DashboardGatewayTable } from '@/components/DashboardGatewayTable';
import { type ColumnDef } from "@tanstack/react-table";
import { type Gateway } from '@/types/gateway';
import { Button } from "@/components/ui/button";

const columns: ColumnDef<Gateway>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0 hover:bg-transparent"
                >
                    Gateway Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const gateway = row.original;
            return (
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                        {(gateway.subdomain || "G").charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-white font-medium">{gateway.subdomain || "Unnamed Gateway"}</p>
                        <p className="text-xs text-text-dim">id: {gateway.id.substring(0, 10)}...</p>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <Status
                    className={`rounded-full gap-1.5 px-2.5 py-0.5 text-sm border w-fit ${
                        status === 'active' 
                        ? 'bg-primary/10 border-primary/20' 
                        : 'bg-yellow-500/10 border-yellow-600/20'
                    }`}
                    status={status === 'active' ? 'online' : 'maintenance'}
                    variant="outline"
                >
                    <StatusIndicator />
                    <StatusLabel className={status === 'active' ? 'text-primary' : ''}>
                        {status === 'active' ? 'Active' : 'Maintenance'}
                    </StatusLabel>
                </Status>
            );
        },
    },
    {
        accessorKey: "paymentScheme",
        header: "Type",
        cell: ({ row }) => {
            return <div className="capitalize text-gray-400">{row.original.paymentScheme || "Pay-per-request"}</div>;
        },
    },
    {
        accessorKey: "revenue24h", // Using revenue24h as a proxy for now since API doesn't return 30d yet
        header: "Revenue (30d)",
        cell: () => {
            return <div className="text-white font-medium">$0.00</div>;
        },
    }
];

const ActiveGateways: React.FC = () => {
    const [gateways, setGateways] = useState<Gateway[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState("");

    useEffect(() => {
        const fetchGateways = async () => {
            try {
                const response = await gatewaysApi.getAll();
                const mappedData: Gateway[] = response.map((gw: any) => ({
                    id: gw.id,
                    name: gw.subdomain || "Unnamed Gateway",
                    status: gw.status || "active",
                    subdomain: gw.subdomain,
                    requests24h: 0,
                    revenue24h: {
                        eth: 0,
                        usd: 0,
                    },
                    conversion: 0,
                    paymentScheme: gw.paymentScheme
                }));
                setGateways(mappedData);
            } catch (error) {
                console.error("Failed to fetch gateways:", error);
                toast.error("Failed to load active gateways");
            } finally {
                setIsLoading(false);
            }
        };

        fetchGateways();
    }, []);

    return (
        <Card className="bg-card-dark border border-border-dark rounded-xl overflow-hidden">
            <CardHeader className="border-b border-gray-800 flex justify-between items-center py-4">
                <CardTitle className="text-white font-semibold text-lg">Active Gateways</CardTitle>
                <div className="flex gap-2">
                    <InputGroup>
                        <InputGroupInput 
                            className="text-white"
                            placeholder="Search gateways..." 
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                        />
                    </InputGroup>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <Loader2 className="animate-spin text-primary" size={32} />
                    </div>
                ) : (
                    <DashboardGatewayTable 
                        columns={columns} 
                        data={gateways} 
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default ActiveGateways;
