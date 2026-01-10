import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RevenueCardProps {
  revenue24h?: string | number;
  revenue7d?: string | number;
  isLoading?: boolean;
  label?: string;
}

const RevenueCard: React.FC<RevenueCardProps> = ({ 
  revenue24h = 0, 
  revenue7d = 0, 
  isLoading,
  label = "Revenue (24h / 7d)",
}) => {
  const formatValue = (val: string | number) => {
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return new Intl.NumberFormat("en-US", { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(num);
  };

  return (
    <Card className="flex-1 rounded-xl bg-card-dark border border-border-dark p-6 flex flex-col justify-center">
      <CardHeader className="flex items-center gap-2 px-0 pt-0 pb-2">
          <Clock className="text-gray-500" size={20} />
        <CardTitle className="text-gray-400 text-xs font-medium uppercase tracking-wider">{label}</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-8 w-32 bg-gray-800 animate-pulse rounded"></div>
            <div className="h-4 w-24 bg-gray-800 animate-pulse rounded"></div>
          </div>
        ) : (
          <>
            <div className="flex items-baseline gap-2 flex-wrap">
              <CardTitle className="text-2xl font-bold text-white tracking-tight">
                ${formatValue(revenue24h)}
              </CardTitle>
              <span className="text-gray-600 text-lg font-light">/</span>
              <p className="text-xl font-medium text-gray-300">
                ${formatValue(revenue7d)}
              </p>
            </div>
            {/* <p className={`${isPositive ? 'text-green-400' : 'text-red-400'} text-xs font-medium mt-2 flex items-center gap-1`}>
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {isPositive ? '+' : ''}{percentageChange.toFixed(1)}% 
            </p> */}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueCard;
