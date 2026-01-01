import React from 'react';
import { type Gateway, DataTable, columns } from '@/components/GatewayTable';
import TotalRevenueStatCard from '@/components/TotalRevenueStatCard';
import TotalRequestsStatCard from '@/components/TotalRequestsStatCard';
import ActiveGatewaysStatCard from '@/components/ActiveGatewaysStatCard';
import AvgLatencyStatCard from '@/components/AvgLatencyStatCard';

function getData(): Gateway[] {
  // Fetch data from your API here.
  return [
    {
      id: "gw_8x92...k92",
      name: "LLM Agent Proxy",
      status: "active",
      subdomain: "agent-proxy.x402.io",
      requests24h: 14203,
      revenue24h: {
        eth: 0.45,
        usd: 1340,
      },
      conversion: 98.5,
    },
    {
        id: "gw_b421...m01",
        name: "Image Gen API",
        status: "active",
        subdomain: "img-gen-v2.x402.io",
        requests24h: 8112,
        revenue24h: {
            eth: 0.12,
            usd: 350,
        },
        conversion: 92.1,
    },
    {
        id: "gw_a992...z33",
        name: "Legacy Translation",
        status: "paused",
        subdomain: "translate-old.x402.io",
        requests24h: 0,
        revenue24h: {
            eth: 0,
            usd: 0,
        },
        conversion: 0,
    },
    {
        id: "gw_c771...p09",
        name: "Search Aggregator",
        status: "active",
        subdomain: "search-agg.x402.io",
        requests24h: 42109,
        revenue24h: {
            eth: 1.88,
            usd: 5600,
        },
        conversion: 99.1,
    },
    {
        id: "gw_f229...x55",
        name: "Trading Bot Webhook",
        status: "active",
        subdomain: "trade-hook.x402.io",
        requests24h: 210,
        revenue24h: {
            eth: 0.05,
            usd: 145,
        },
        conversion: 100,
    }
  ]
}

const Gateways: React.FC = () => {
  const data = getData();

  return (
    <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">
      <div className="flex flex-col md:flex-row justify-between gap-6 px-4 py-4 items-start md:items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Gateways</h1>
          <p className="text-text-dim text-sm sm:text-base font-normal leading-normal max-w-2xl">Manage your API monetization endpoints, monitor traffic, and configure x402 payment rules.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <TotalRevenueStatCard />
          <TotalRequestsStatCard />
          <ActiveGatewaysStatCard />
          <AvgLatencyStatCard />
      </div>
      <div className="px-4 pb-8">
        <div className="w-full overflow-hidden rounded-xl border border-border-dark bg-surface-dark/20 shadow-xl shadow-black/20">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Gateways;
