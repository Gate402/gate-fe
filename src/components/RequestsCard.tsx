import React from 'react';
import { Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RequestsCardProps {
  value?: number;
  isLoading?: boolean;
}

const RequestsCard: React.FC<RequestsCardProps> = ({ value, isLoading }) => {
  return (
    <Card className="flex-1 rounded-xl bg-card-dark border border-border-dark p-6 flex flex-col justify-center">
      <CardHeader className="flex gap-2 px-0 pt-0 pb-2">
        <Cpu className="text-gray-500" size={20} />
        <CardTitle className="text-gray-400 text-xs font-medium uppercase tracking-wider">Requests (30d)</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {isLoading ? (
           <div className="h-9 w-24 bg-gray-800 animate-pulse rounded"></div>
        ) : (
          <CardTitle className="text-3xl font-bold text-white tracking-tight">
             {value ? new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(value) : "0"}
          </CardTitle>
        )}
      </CardContent>
    </Card>
  );
};

export default RequestsCard;
