import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CloudCog } from "lucide-react";

interface TotalRequestsStatCardProps {
  value?: number;
  isLoading?: boolean;
}

const TotalRequestsStatCard: React.FC<TotalRequestsStatCardProps> = ({
  value,
  isLoading,
}) => {
  return (
    <Card className="flex flex-col gap-3 rounded-xl bg-card-dark border border-border-dark text-white">
      <CardHeader className="flex justify-between items-start">
        <CardDescription className="text-text-dim text-sm font-medium leading-normal">
          Total Requests
        </CardDescription>
        <CloudCog className="text-text-dim" size={20} />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-8 flex items-center text-text-dim text-sm animate-pulse">
            Loading...
          </div>
        ) : (
          <>
            <CardTitle className="text-white tracking-tight text-2xl font-bold font-mono">
              {value
                ? new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(value)
                : "0"}
            </CardTitle>
            {/* <div className="flex items-center gap-2 mt-1">
                            <span className="bg-green-500/10 text-green-400 text-xs px-1.5 py-0.5 rounded flex items-center gap-1 font-medium">
                                <TrendingUp size={12} /> 5.2%
                            </span>
                            <span className="text-text-dim text-xs">vs last month</span>
                        </div> */}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TotalRequestsStatCard;
