import React from 'react';
import { ArrowDown, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LatestTransactions: React.FC = () => {
    return (
        <Card className="lg:col-span-1 bg-card-dark border border-border-dark rounded-xl p-6 flex flex-col">
            <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="text-white font-semibold text-lg">Latest Transactions</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0 flex flex-col gap-0 overflow-hidden">
                {/* Transaction Item 1 */}
                <div className="flex items-center justify-between py-3 border-b border-gray-800/50 hover:bg-white/5 px-2 rounded transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/10 p-2 rounded-full text-primary">
                            <ArrowDown size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white text-sm font-medium">Payment Received</span>
                            <span className="text-gray-500 text-xs">2 min ago</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-white text-sm font-bold">+ $24.00</p>
                        <p className="text-gray-500 text-[10px] uppercase">USDC</p>
                    </div>
                </div>
                {/* Transaction Item 2 */}
                <div className="flex items-center justify-between py-3 border-b border-gray-800/50 hover:bg-white/5 px-2 rounded transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/10 p-2 rounded-full text-primary">
                            <ArrowDown size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white text-sm font-medium">Payment Received</span>
                            <span className="text-gray-500 text-xs">15 min ago</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-white text-sm font-bold">+ $10.50</p>
                        <p className="text-gray-500 text-[10px] uppercase">ETH</p>
                    </div>
                </div>
                {/* Transaction Item 3 */}
                <div className="flex items-center justify-between py-3 border-b border-gray-800/50 hover:bg-white/5 px-2 rounded transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/10 p-2 rounded-full text-primary">
                            <ArrowDown size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white text-sm font-medium">Payment Received</span>
                            <span className="text-gray-500 text-xs">42 min ago</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-white text-sm font-bold">+ $120.00</p>
                        <p className="text-gray-500 text-[10px] uppercase">SOL</p>
                    </div>
                </div>
                {/* Transaction Item 4 */}
                <div className="flex items-center justify-between py-3 border-b border-gray-800/50 hover:bg-white/5 px-2 rounded transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-500/10 p-2 rounded-full text-orange-400">
                            <RefreshCw size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white text-sm font-medium">Processing</span>
                            <span className="text-gray-500 text-xs">1 hr ago</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-300 text-sm font-bold">+ $5.00</p>
                        <p className="text-gray-500 text-[10px] uppercase">USDC</p>
                    </div>
                </div>
                {/* Transaction Item 5 */}
                <div className="flex items-center justify-between py-3 hover:bg-white/5 px-2 rounded transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/10 p-2 rounded-full text-primary">
                            <ArrowDown size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white text-sm font-medium">Payment Received</span>
                            <span className="text-gray-500 text-xs">2 hrs ago</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-white text-sm font-bold">+ $45.00</p>
                        <p className="text-gray-500 text-[10px] uppercase">ETH</p>
                    </div>
                </div>
            </CardContent>
            <Button size="lg">
                View All Transactions
            </Button>
        </Card>
    );
};

export default LatestTransactions;
