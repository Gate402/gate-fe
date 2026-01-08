import api from './api';
import {
  type GatewayOverviewResponse,
  type TopPayerResponse,
  type RequestTimelineResponse,
  type RevenueTimelineResponse,
  type RouteAnalyticsResponse,
  type ConversionFunnelResponse
} from '../types/analytics';

export const analyticsApi = {
  getOverview: async (gatewayId?: string, startDate?: string, endDate?: string): Promise<GatewayOverviewResponse> => {
    const response = await api.get('/analytics/overview', {
      params: { 
        gatewayId: gatewayId,
        startDate: startDate, 
        endDate: endDate 
    }
    });
    return response.data;
  },

  getTopPayers: async (gatewayId: string, limit?: number, startDate?: string, endDate?: string) : Promise<TopPayerResponse[]> => {
    const response = await api.get('/analytics/top-payers', {
      params: { gatewayId, limit, startDate, endDate }
    });
    return response.data;
  },

  getRequestsTimeline: async (gatewayId: string, interval?: 'hour' | 'day' | 'week' | 'month', startDate?: string, endDate?: string) : Promise<RequestTimelineResponse[]> => {
    const response = await api.get('/analytics/requests-timeline', {
      params: { gatewayId, interval, startDate, endDate }
    });
    return response.data;
  },

  getRevenueTimeline: async (gatewayId: string, interval?: 'hour' | 'day' | 'week' | 'month', startDate?: string, endDate?: string) : Promise<RevenueTimelineResponse[]> => {
    const response = await api.get('/analytics/revenue-timeline', {
      params: { gatewayId, interval, startDate, endDate }
    });
    return response.data;
  },

  getRouteAnalytics: async (gatewayId: string, limit?: number, startDate?: string, endDate?: string) : Promise<RouteAnalyticsResponse[]> => {
    const response = await api.get('/analytics/routes', {
      params: { gatewayId, limit, startDate, endDate }
    });
    return response.data;
  },

  getConversionFunnel: async (gatewayId: string, startDate?: string, endDate?: string) : Promise<ConversionFunnelResponse> => {
    const response = await api.get('/analytics/conversion-funnel', {
      params: { gatewayId, startDate, endDate }
    });
    return response.data;
  }
};

