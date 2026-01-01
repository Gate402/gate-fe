import React from 'react';
import TotalRevenueCard from '../components/TotalRevenueCard';
import RevenueCard from '../components/RevenueCard';
import SuccessfulPaymentsCard from '../components/SuccessfulPaymentsCard';
import RequestsCard from '../components/RequestsCard';
import RevenueVolume from '../components/RevenueVolume';
import LatestTransactions from '../components/LatestTransactions';
import ActiveGateways from '../components/ActiveGateways';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto w-full flex flex-col gap-8">
      {/* Hero Section: Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TotalRevenueCard />
        <div className="flex flex-col gap-6 lg:col-span-1">
          <RevenueCard />
          <SuccessfulPaymentsCard />
        </div>
        <RequestsCard />
      </div>
      {/* Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueVolume />
        <LatestTransactions />
      </div>
      {/* Gateways Table Section */}
      <ActiveGateways />
    </div>
  );
};

export default Dashboard;
