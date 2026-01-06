import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Router } from 'lucide-react';

type ActiveGatewaysStatCardProps = {
  activeGateways?: number;
  pausedGateways?: number;
};
const ActiveGatewaysStatCard: React.FC<ActiveGatewaysStatCardProps> = ({ activeGateways = 8, pausedGateways = 2 }) => {
  return (
    <Card className="flex flex-col gap-3 rounded-xl bg-card-dark border border-border-dark text-white">
      <CardHeader className="flex justify-between items-start">
        <CardTitle className="text-white font-semibold text-lg">Active Gateways</CardTitle>
        <Router className="text-white" size={20} />
      </CardHeader>
      <CardContent>
        <p className="tracking-tight text-2xl font-bold font-mono">{activeGateways}</p>
        {pausedGateways > 0 && 
          <div className="flex items-center gap-2 mt-1">
              <span>{pausedGateways} Paused</span>
          </div>
        }
      </CardContent>
    </Card>
  );
}

export default ActiveGatewaysStatCard;
