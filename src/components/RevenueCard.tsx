import React from 'react';
import { TrendingDown, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RevenueCard: React.FC = () => {
  return (
    <Card className="flex-1 rounded-xl bg-card-dark border border-border-dark p-6 flex flex-col justify-center">
      <CardHeader className="flex items-center gap-2 px-0 pt-0 pb-2">
          <Clock className="text-gray-500" size={20} />
        <CardTitle className="text-gray-400 text-xs font-medium uppercase tracking-wider">Revenue (24h / 7d)</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <CardTitle className="text-2xl font-bold text-white tracking-tight">$450</CardTitle>
          <span className="text-gray-600 text-lg font-light">/</span>
          <p className="text-xl font-medium text-gray-300">$3,200</p>
        </div>
        <p className="text-red-400 text-xs font-medium mt-2 flex items-center gap-1">
            <TrendingDown size={14} />
          -2.1% <span className="text-gray-600 ml-1 font-normal">vs prev 7d</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default RevenueCard;
