export interface GatewayOverviewResponse {
  totalRequests: number;
  successfulPayments: number;
  failedPayments: number;
  totalRevenue: string;
  uniquePayers: number;
  avgLatencyMs: number | null;
  conversionRate: number;
}

export interface TopPayerResponse {
  wallet: string;
  totalSpent: string;
  requestCount: number;
  lastRequestAt: string;
}

export interface RequestTimelineResponse {
  timestamp: string;
  totalRequests: number;
  paidRequests: number;
  failedRequests: number;
}

export interface RevenueTimelineResponse {
  timestamp: string;
  revenue: string;
  paymentCount: number;
}

export interface RouteAnalyticsResponse {
  path: string;
  method: string;
  totalRequests: number;
  paidRequests: number;
  avgLatencyMs: number | null;
  revenue: string;
}

export interface ConversionFunnelResponse {
  totalRequests: number;
  paymentRequiredCount: number;
  paymentAttemptCount: number;
  validPaymentCount: number;
  settledPaymentCount: number;
  rates: {
    overallRate: number;
    settlementRate: number;
    validationRate: number;
    attemptRate: number;
  };
}

export interface UserOverviewResponse {
  totalGateways: number;
  totalRequests: number;
  successfulPayments: number;
  totalRevenue: string;
  uniquePayers: number;
  avgLatencyMs: number | null;
  gatewayBreakdown: {
    totalRevenue: string;
    totalRequests: number;
    subdomain: string;
    gatewayId: string;
  }[];
}

export interface UserRevenueTimelineResponse {
  timestamp: string;
  revenue: string;
  paymentCount: number;
}

export interface UserRequestsTimelineResponse {
  timestamp: string;
  totalRequests: number;
  paidRequests: number;
  failedRequests: number;
}
