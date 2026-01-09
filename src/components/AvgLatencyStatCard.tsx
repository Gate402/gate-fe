import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Gauge } from "lucide-react";

interface AvgLatencyStatCardProps {
  value?: number | null;
  isLoading?: boolean;
}

const AvgLatencyStatCard: React.FC<AvgLatencyStatCardProps> = ({
  value,
  isLoading,
}) => {
  return (
    <Card className="flex flex-col gap-3 rounded-xl bg-card-dark border border-border-dark text-white">
      <CardHeader className="flex justify-between items-start">
        <CardDescription className="text-text-dim text-sm font-medium leading-normal">
          Avg. Latency
        </CardDescription>
        <Gauge className="text-text-dim" size={20} />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-8 flex items-center text-text-dim text-sm animate-pulse">
            Loading...
          </div>
        ) : (
          <>
            <CardTitle className="text-white tracking-tight text-2xl font-bold font-mono">
              {value ? `${Math.round(value)}ms` : "N/A"}
            </CardTitle>
            {/* <div className="flex items-center gap-2 mt-1">
                <span className="bg-green-500/10 text-green-400 text-xs px-1.5 py-0.5 rounded flex items-center gap-1 font-medium">
                    <ArrowDown size={12} /> 12%
                </span>
                <span className="text-text-dim text-xs">improvement</span>
                </div> */}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AvgLatencyStatCard;
