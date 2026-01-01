import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Status, StatusIndicator, StatusLabel } from '@/components/ui/shadcn-io/status';

const ActiveGateways: React.FC = () => {
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
                            <tr className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">A</div>
                                        <div>
                                            <p className="text-white font-medium">Agent Alpha API</p>
                                            <p className="text-xs">id: gw_89sfd7...</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Status
                                        className="rounded-full gap-1.5 px-2.5 py-0.5 text-sm bg-primary/10 border border-primary/20"
                                        status="online"
                                        variant="outline"
                                    >
                                        <StatusIndicator />
                                        <StatusLabel className="text-primary">Active</StatusLabel>
                                    </Status>
                                </td>
                                <td className="px-6 py-4">Pay-per-request</td>
                                <td className="px-6 py-4 text-white font-medium">$8,240.50</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-500 hover:text-white transition-colors">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">D</div>
                                        <div>
                                            <p className="text-white font-medium">DeepSeek Model v2</p>
                                            <p className="text-xs">id: gw_j2k3lm...</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Status
                                        className="rounded-full gap-1.5 px-2.5 py-0.5 text-sm bg-primary/10 border border-primary/20"
                                        status="online"
                                        variant="outline"
                                    >
                                        <StatusIndicator />
                                        <StatusLabel className="text-primary">Active</StatusLabel>
                                    </Status>
                                </td>
                                <td className="px-6 py-4">Subscription</td>
                                <td className="px-6 py-4 text-white font-medium">$4,120.00</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-500 hover:text-white transition-colors">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">T</div>
                                        <div>
                                            <p className="text-white font-medium">Text-to-Speech v1</p>
                                            <p className="text-xs">id: gw_99ad2x...</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Status
                                        className="rounded-full gap-1.5 px-2.5 py-0.5 text-sm bg-yellow-500/10 border border-yellow-600/20"
                                        status="maintenance"
                                        variant="outline"
                                    >
                                        <StatusIndicator/>
                                        <StatusLabel>Maintenance</StatusLabel>
                                    </Status>
                                </td>
                                <td className="px-6 py-4">Pay-per-request</td>
                                <td className="px-6 py-4 text-white font-medium">$89.50</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-500 hover:text-white transition-colors">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default ActiveGateways;
