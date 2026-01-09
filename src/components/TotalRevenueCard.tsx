import React, { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { type UserRevenueTimelineResponse } from '@/types/analytics';

export const description = "A bar chart"

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart)",
  },
} satisfies ChartConfig

interface TotalRevenueCardProps {
  value?: string;
  chartData?: UserRevenueTimelineResponse[];
  isLoading?: boolean;
}

const TotalRevenueCard: React.FC<TotalRevenueCardProps> = ({ value, chartData = [], isLoading }) => {
  const processedData = useMemo(() => {
    if (!chartData || chartData.length === 0) return [];
    
    return chartData.map(item => ({
      date: new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: parseFloat(item.revenue)
    }));
  }, [chartData]);

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-2 relative overflow-hidden rounded-xl bg-card-dark border border-border-dark group">
      {/* Gradient accent */}
      <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Total Revenue (Lifetime)</CardTitle>
            <div className="flex items-baseline gap-2">
              {isLoading ? (
                 <div className="h-10 w-32 bg-gray-800 animate-pulse rounded"></div>
              ) : (
                <CardDescription className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  ${value ? new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(parseFloat(value)) : "0.00"}
                </CardDescription>
              )}
              <span className="text-gray-500 text-lg font-normal">USD</span>
            </div>
          </div>
          <div className="bg-primary/10 px-2.5 py-1 rounded-full flex items-center gap-1 border border-primary/20">
            <TrendingUp className="text-primary" size={16} />
            <span className="text-primary text-xs font-bold">+12.5%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex flex-col h-full justify-between relative z-0">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={processedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="revenue" fill="var(--primary)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TotalRevenueCard;
