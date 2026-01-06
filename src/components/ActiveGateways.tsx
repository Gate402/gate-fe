import React, { useEffect, useState } from 'react';
import { MoreHorizontal, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Status, StatusIndicator, StatusLabel } from '@/components/ui/shadcn-io/status';
import { gatewaysApi } from '@/lib/gateways';
import { toast } from 'sonner';

interface Gateway {
    id: string;
    name?: string;
    subdomain: string;
    status: string;
    paymentScheme?: string;
}

const ActiveGateways: React.FC = () => {
    const [gateways, setGateways] = useState<Gateway[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGateways = async () => {
            try {
                const response = await gatewaysApi.getAll();
                setGateways(response);
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
            <CardHeader className="border-b border-gray-800 flex justify-between items-center">
                <CardTitle className="text-white font-semibold text-lg">Active Gateways</CardTitle>
                <div className="flex gap-2">
                    <InputGroup>
                        <InputGroupInput placeholder="Search gateways..." />
                    </InputGroup>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-10">
                            <Loader2 className="animate-spin text-primary" size={32} />
                        </div>
                    ) : gateways.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            No gateways found.
                        </div>
                    ) : (
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-background-dark/50 text-gray-200 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 font-medium tracking-wider">Gateway Name</th>
                                    <th className="px-6 py-3 font-medium tracking-wider">Status</th>
                                    <th className="px-6 py-3 font-medium tracking-wider">Type</th>
                                    <th className="px-6 py-3 font-medium tracking-wider">Revenue (30d)</th>
                                    <th className="px-6 py-3 font-medium tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {gateways.map((gateway) => (
                                    <tr key={gateway.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                                    {(gateway.subdomain || "G").charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{gateway.subdomain || "Unnamed Gateway"}</p>
                                                    <p className="text-xs">id: {gateway.id.substring(0, 10)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Status
                                                className={`rounded-full gap-1.5 px-2.5 py-0.5 text-sm border ${
                                                    gateway.status === 'active' 
                                                    ? 'bg-primary/10 border-primary/20' 
                                                    : 'bg-yellow-500/10 border-yellow-600/20'
                                                }`}
                                                status={gateway.status === 'active' ? 'online' : 'maintenance'}
                                                variant="outline"
                                            >
                                                <StatusIndicator />
                                                <StatusLabel className={gateway.status === 'active' ? 'text-primary' : ''}>
                                                    {gateway.status === 'active' ? 'Active' : 'Maintenance'}
                                                </StatusLabel>
                                            </Status>
                                        </td>
                                        <td className="px-6 py-4 capitalize">{gateway.paymentScheme}</td>
                                        <td className="px-6 py-4 text-white font-medium">$0.00</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-500 hover:text-white transition-colors">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ActiveGateways;
