import React from 'react';
import { TrendingUp, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress"

const RequestsCard: React.FC = () => {
  return (
    <Card className="lg:col-span-1 rounded-xl bg-card-dark border border-border-dark p-6 flex flex-col justify-between">
      <CardHeader className="px-0 pt-0 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Cpu className="text-gray-500" size={20} />
            <CardTitle className="text-gray-400 text-xs font-medium uppercase tracking-wider">Requests (30d)</CardTitle>
          </div>
          <span className="bg-gray-800 text-gray-300 text-[10px] px-2 py-0.5 rounded border border-gray-700">99.9% Success</span>
        </div>
        <CardTitle className="text-3xl font-bold text-white tracking-tight">1.2M</CardTitle>
        <p className="text-primary text-xs font-medium mt-2 flex items-center gap-1">
          <TrendingUp size={14} />
          +5.0%
        </p>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="flex justify-between text-[10px] text-gray-500 mb-1">
          <span>Usage</span>
          <span>Limit: 5M</span>
        </div>
        <Progress value={40} />
      </CardContent>
    </Card>
  );
};

export default RequestsCard;
