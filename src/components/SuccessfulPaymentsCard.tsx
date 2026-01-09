import React from 'react';
import { TrendingUp, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SuccessfulPaymentsCardProps {
  value?: number;
  isLoading?: boolean;
}

const SuccessfulPaymentsCard: React.FC<SuccessfulPaymentsCardProps> = ({ value, isLoading }) => {
  return (
    <Card className="flex-1 rounded-xl bg-card-dark border border-border-dark p-6 flex flex-col justify-center">
      <CardHeader className="flex gap-2 px-0 pt-0 pb-2">
        <CheckCircle className="text-gray-500" size={20} />
        <CardTitle className="text-gray-400 text-xs font-medium uppercase tracking-wider">Successful Payments</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {isLoading ? (
          <div className="h-9 w-24 bg-gray-800 animate-pulse rounded"></div>
        ) : (
          <CardTitle className="text-3xl font-bold text-white tracking-tight">
             {value ? new Intl.NumberFormat("en-US").format(value) : "0"}
          </CardTitle>
        )}
        <p className="text-primary text-xs font-medium mt-2 flex items-center gap-1">
          <TrendingUp size={14} />
          +8.4% <span className="text-gray-600 ml-1 font-normal">growth</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SuccessfulPaymentsCard;
