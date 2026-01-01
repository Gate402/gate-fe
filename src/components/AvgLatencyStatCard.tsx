import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Gauge, ArrowDown } from 'lucide-react';

const AvgLatencyStatCard: React.FC = () => {
  return (
    <Card className="flex flex-col gap-3 rounded-xl bg-card-dark border border-border-dark text-white">
      <CardHeader className="flex justify-between items-start">
        <CardDescription className="text-text-dim text-sm font-medium leading-normal">Avg. Latency</CardDescription>
        <Gauge className="text-text-dim" size={20} />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-white tracking-tight text-2xl font-bold font-mono">42ms</CardTitle>
        <div className="flex items-center gap-2 mt-1">
          <span className="bg-green-500/10 text-green-400 text-xs px-1.5 py-0.5 rounded flex items-center gap-1 font-medium">
            <ArrowDown size={12} /> 12%
          </span>
          <span className="text-text-dim text-xs">improvement</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default AvgLatencyStatCard;
