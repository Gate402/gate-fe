import React, { useEffect, useState } from 'react';
import TotalRevenueCard from '../components/TotalRevenueCard';
import RevenueCard from '../components/RevenueCard';
import SuccessfulPaymentsCard from '../components/SuccessfulPaymentsCard';
import RequestsCard from '../components/RequestsCard';
import RevenueVolume from '../components/RevenueVolume';
import LatestTransactions from '../components/LatestTransactions';
import ActiveGateways from '../components/ActiveGateways';
import { analyticsApi } from '@/lib/analytics';
import { type UserOverviewResponse, type UserRevenueTimelineResponse } from '@/types/analytics';

const Dashboard: React.FC = () => {
  const [overview, setOverview] = useState<UserOverviewResponse | null>(null);
  const [revenueTimeline, setRevenueTimeline] = useState<UserRevenueTimelineResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overviewData, timelineData] = await Promise.all([
          analyticsApi.getUserOverview(undefined, undefined),
          analyticsApi.getUserRevenueTimeline('day', undefined, undefined)
        ]);
        setOverview(overviewData);
        setRevenueTimeline(timelineData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto w-full flex flex-col gap-8">
      {/* Hero Section: Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TotalRevenueCard value={overview?.totalRevenue} chartData={revenueTimeline} isLoading={isLoading} />
        <div className="flex flex-col gap-6 lg:col-span-1">
          <RevenueCard />
          <SuccessfulPaymentsCard value={overview?.successfulPayments} isLoading={isLoading} />
        </div>
        <RequestsCard value={overview?.totalRequests} isLoading={isLoading} />
      </div>
      {/* Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueVolume data={revenueTimeline} isLoading={isLoading} />
        <LatestTransactions />
      </div>
      {/* Gateways Table Section */}
      <ActiveGateways />
    </div>
  );
};

export default Dashboard;
