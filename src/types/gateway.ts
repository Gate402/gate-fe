export type Gateway = {
  id: string;
  name: string;
  status: "active" | "paused";
  subdomain: string;
  requests24h: number;
  revenue24h: {
    eth: number;
    usd: number;
  };
  conversion: number;
  paymentScheme?: string;
};