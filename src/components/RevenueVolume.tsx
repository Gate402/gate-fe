import React, { useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type UserRevenueTimelineResponse } from '@/types/analytics';

interface RevenueVolumeProps {
  data?: UserRevenueTimelineResponse[];
  isLoading?: boolean;
}

const RevenueVolume: React.FC<RevenueVolumeProps> = ({ data = [], isLoading }) => {
  const processedData = useMemo(() => {
      if (!data || data.length === 0) return [];
      
      return data.map(item => ({
        name: new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        volume: parseFloat(item.revenue)
      }));
    }, [data]);

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
            {isLoading ? (
               <div className="h-full w-full flex items-center justify-center text-gray-500">Loading chart...</div>
            ) : (
              <ResponsiveContainer>
              <AreaChart data={processedData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#25f478" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#25f478" stopOpacity={0}/>
                  </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#555" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="volume" stroke="#25f478" fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
              </ResponsiveContainer>
            )}
        </div>
        </CardContent>
    </Card>
  );
};

export default RevenueVolume;
