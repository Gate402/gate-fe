import React, { useEffect, useState, useMemo } from 'react';
import TotalRevenueCard from '../components/TotalRevenueCard';
import RevenueCard from '../components/RevenueCard';
import SuccessfulPaymentsCard from '../components/SuccessfulPaymentsCard';
import RequestsCard from '../components/RequestsCard';
import RevenueVolume from '../components/RevenueVolume';
import LatestTransactions from '../components/LatestTransactions';
import ActiveGateways from '../components/ActiveGateways';
import { analyticsApi } from '@/lib/analytics';
import { type UserOverviewResponse, type UserRevenueTimelineResponse, type UserRequestsTimelineResponse } from '@/types/analytics';

const Dashboard: React.FC = () => {
  const [overview, setOverview] = useState<UserOverviewResponse | null>(null);
  const [revenueTimeline, setRevenueTimeline] = useState<UserRevenueTimelineResponse[]>([]);
  const [requestsTimeline, setRequestsTimeline] = useState<UserRequestsTimelineResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

        const [overviewData, revenueData, requestsData] = await Promise.all([
          analyticsApi.getUserOverview(),
          analyticsApi.getUserRevenueTimeline('day', sixtyDaysAgo.toISOString()),
          analyticsApi.getUserRequestsTimeline('day', sixtyDaysAgo.toISOString())
        ]);

        setOverview(overviewData);
        setRevenueTimeline(revenueData);
        setRequestsTimeline(requestsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const revenue24h = useMemo(() => {
    if (!revenueTimeline || revenueTimeline.length === 0) return 0;
    return parseFloat(revenueTimeline[revenueTimeline.length - 1].revenue);
  }, [revenueTimeline]);

  const revenue7d = useMemo(() => {
    if (!revenueTimeline || revenueTimeline.length === 0) return 0;
    return revenueTimeline.slice(-7).reduce((acc, curr) => acc + parseFloat(curr.revenue), 0);
  }, [revenueTimeline]);

  const percentageChange = useMemo(() => {
    if (!revenueTimeline || revenueTimeline.length < 14) return 0;
    const current7d = revenueTimeline.slice(-7).reduce((acc, curr) => acc + parseFloat(curr.revenue), 0);
    const prev7d = revenueTimeline.slice(-14, -7).reduce((acc, curr) => acc + parseFloat(curr.revenue), 0);
    if (prev7d === 0) return current7d > 0 ? 100 : 0;
    return ((current7d - prev7d) / prev7d) * 100;
  }, [revenueTimeline]);

  const totalRevenueGrowth = useMemo(() => {
    if (!revenueTimeline || revenueTimeline.length < 60) {
      // If we don't have 60 days, we can't do full PoP, 
      // but maybe we have enough for some comparison
      if (revenueTimeline.length < 2) return 0;
      const mid = Math.floor(revenueTimeline.length / 2);
      const currentPeriod = revenueTimeline.slice(-mid).reduce((acc, curr) => acc + parseFloat(curr.revenue), 0);
      const prevPeriod = revenueTimeline.slice(-2 * mid, -mid).reduce((acc, curr) => acc + parseFloat(curr.revenue), 0);
      if (prevPeriod === 0) return currentPeriod > 0 ? 100 : 0;
      return ((currentPeriod - prevPeriod) / prevPeriod) * 100;
    }
    const current30d = revenueTimeline.slice(-30).reduce((acc, curr) => acc + parseFloat(curr.revenue), 0);
    const prev30d = revenueTimeline.slice(-60, -30).reduce((acc, curr) => acc + parseFloat(curr.revenue), 0);
    if (prev30d === 0) return current30d > 0 ? 100 : 0;
    return ((current30d - prev30d) / prev30d) * 100;
  }, [revenueTimeline]);

  const last30DaysTimeline = useMemo(() => {
    return revenueTimeline.slice(-30);
  }, [revenueTimeline]);

  const last30DaysRequests = useMemo(() => {
    return requestsTimeline.slice(-30);
  }, [requestsTimeline]);

  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto w-full flex flex-col gap-8">
      {/* Hero Section: Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TotalRevenueCard 
          value={overview?.totalRevenue} 
          chartData={last30DaysTimeline} 
          isLoading={isLoading} 
          growthRate={totalRevenueGrowth}
        />
        <div className="flex flex-col gap-6 lg:col-span-1">
          <RevenueCard 
            revenue24h={revenue24h} 
            revenue7d={revenue7d} 
            percentageChange={percentageChange}
            isLoading={isLoading} 
          />
          <SuccessfulPaymentsCard value={overview?.successfulPayments} isLoading={isLoading} />
          <RequestsCard value={overview?.totalRequests} isLoading={isLoading} />
        </div>
        <LatestTransactions />
      </div>
      {/* Visualization Section */}
      <div className="w-full">
        <RevenueVolume 
          data={last30DaysTimeline} 
          requestsData={last30DaysRequests} 
          isLoading={isLoading} 
        />
      </div>
      {/* Gateways Table Section */}
      <ActiveGateways />
    </div>
  );
};

export default Dashboard;
