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
import { useFilter } from '@/context/FilterContext';

const Dashboard: React.FC = () => {
  const [overview, setOverview] = useState<UserOverviewResponse | null>(null);
  const [revenueTimeline, setRevenueTimeline] = useState<UserRevenueTimelineResponse[]>([]);
  const [requestsTimeline, setRequestsTimeline] = useState<UserRequestsTimelineResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { duration } = useFilter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const now = new Date();
        let filterStartDate = new Date();
        let interval: 'hour' | 'day' | 'week' | 'month' = 'day';

        switch (duration) {
          case '1d':
            filterStartDate.setDate(now.getDate() - 1);
            interval = 'hour';
            break;
          case '7d':
            filterStartDate.setDate(now.getDate() - 7);
            interval = 'day';
            break;
          case '30d':
            filterStartDate.setDate(now.getDate() - 30);
            interval = 'day';
            break;
          case '6m':
            filterStartDate.setMonth(now.getMonth() - 6);
            interval = 'month';
            break;
          case '1y':
            filterStartDate.setFullYear(now.getFullYear() - 1);
            interval = 'month';
            break;
          default:
            filterStartDate.setDate(now.getDate() - 30);
            interval = 'day';
        }

        const [overviewData, revenueData, requestsData] = await Promise.all([
          analyticsApi.getUserOverview(filterStartDate.toISOString()),
          analyticsApi.getUserRevenueTimeline(interval, filterStartDate.toISOString()),
          analyticsApi.getUserRequestsTimeline(interval, filterStartDate.toISOString())
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
  }, [duration]);

  const displayedTimeline = useMemo(() => {
    return revenueTimeline
  }, [revenueTimeline, duration]);

  const displayedRequests = useMemo(() => {
    if (duration === '1y' || duration === '6m') return requestsTimeline;
    const mid = Math.ceil(requestsTimeline.length / 2);
    return requestsTimeline.slice(-mid);
  }, [requestsTimeline, duration]);

  const calculatedTotalRequests = useMemo(() => {
    if (!displayedRequests || displayedRequests.length === 0) return 0;
    return displayedRequests.reduce((acc, curr) => acc + curr.totalRequests, 0);
  }, [displayedRequests]);

  const calculatedSuccessfulPayments = useMemo(() => {
    if (!displayedRequests || displayedRequests.length === 0) return 0;
    return displayedRequests.reduce((acc, curr) => acc + curr.paidRequests, 0);
  }, [displayedRequests]);

  // Dynamic calculations for RevenueCard
  const revenueShortTerm = useMemo(() => {
    if (!displayedTimeline || displayedTimeline.length === 0) return 0;

    return parseFloat(displayedTimeline[displayedTimeline.length - 1].revenue);
  }, [displayedTimeline, duration]);

  const revenueLongTerm = useMemo(() => {
    if (!displayedTimeline || displayedTimeline.length === 0) return 0;
    if (duration === '6m' || duration === '1d' || duration === '1y') {
      // Full displayed timeline (6m, 1d, or 1y)
      return displayedTimeline.reduce((acc, curr) => acc + parseFloat(curr.revenue), 0);
    }
    // Default: last 7 items (7d)
    return displayedTimeline.slice(-7).reduce((acc, curr) => acc + parseFloat(curr.revenue), 0);
  }, [displayedTimeline, duration]);


  let revenueLabel = "Revenue (24h / 7d)";

  if (duration === '1d') {
    revenueLabel = "Revenue (1H / 1D)";
  } else if (duration === '6m') {
    revenueLabel = "Revenue (1M / 6M)";
  } else if (duration === '1y') {
    revenueLabel = "Revenue (1M / 1Y)";
  }

  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto w-full flex flex-col gap-8">
      {/* Hero Section: Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TotalRevenueCard 
          value={overview?.totalRevenue} 
          chartData={displayedTimeline} 
          isLoading={isLoading} 
          label={`Total Revenue (${duration})`}
          duration={duration}
        />
        <div className="flex flex-col gap-6 lg:col-span-1">
          <RevenueCard 
            revenue24h={revenueShortTerm} 
            revenue7d={revenueLongTerm} 
            isLoading={isLoading} 
            label={revenueLabel}
          />
          <SuccessfulPaymentsCard value={calculatedSuccessfulPayments} isLoading={isLoading} />
          <RequestsCard 
            value={calculatedTotalRequests} 
            isLoading={isLoading} 
            label={`Requests (${duration})`}
          />
        </div>
        <LatestTransactions />
      </div>
      {/* Visualization Section */}
      <div className="w-full">
        <RevenueVolume 
          data={displayedTimeline} 
          requestsData={displayedRequests} 
          isLoading={isLoading} 
          duration={duration}
        />
      </div>
      {/* Gateways Table Section */}
      <ActiveGateways />
    </div>
  );
};

export default Dashboard;
