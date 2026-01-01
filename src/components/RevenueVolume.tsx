import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    { name: 'Sep 01', volume: 8000 },
    { name: 'Sep 07', volume: 7500 },
    { name: 'Sep 14', volume: 6000 },
    { name: 'Sep 21', volume: 6500 },
    { name: 'Sep 28', volume: 4000 },
    { name: 'Oct 05', volume: 5000 },
    { name: 'Oct 12', volume: 3000 },
    { name: 'Oct 19', volume: 3500 },
    { name: 'Oct 26', volume: 1500 },
    { name: 'Nov 02', volume: 2000 },
    { name: 'Nov 09', volume: 500 },
  ];
  

const RevenueVolume: React.FC = () => {
  return (
    <Card className="lg:col-span-2 bg-card-dark border border-border-dark rounded-xl p-6">
        <CardHeader className="flex justify-between items-center px-0 pt-0 pb-6">
            <CardTitle className="text-white font-semibold text-lg">Revenue Volume</CardTitle>
            <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-medium rounded bg-white/10 text-white border border-white/10">Volume</button>
                <button className="px-3 py-1 text-xs font-medium rounded hover:bg-white/5 text-gray-400 transition-colors">Requests</button>
            </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
            <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#25f478" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#25f478" stopOpacity={0}/>
                </linearGradient>
                </defs>
                <Area type="monotone" dataKey="volume" stroke="#25f478" fillOpacity={1} fill="url(#colorVolume)" />
            </AreaChart>
            </ResponsiveContainer>
        </div>
        </CardContent>
    </Card>
  );
};

export default RevenueVolume;
