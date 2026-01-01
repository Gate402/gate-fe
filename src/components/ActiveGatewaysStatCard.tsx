import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Router } from 'lucide-react';

const ActiveGatewaysStatCard: React.FC = () => {
  return (
    <Card className="flex flex-col gap-3 rounded-xl bg-card-dark border border-border-dark text-white">
      <CardHeader className="flex justify-between items-start">
        <CardTitle className="text-white font-semibold text-lg">Active Gateways</CardTitle>
        <Router className="text-white" size={20} />
      </CardHeader>
      <CardContent>
        <p className="tracking-tight text-2xl font-bold font-mono">8</p>
        <div className="flex items-center gap-2 mt-1">
            <span>2 Paused</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default ActiveGatewaysStatCard;
