import api from './api';
import { type Gateway } from '../types/gateway';

export interface QuickCreateGatewayRequest {
  originUrl: string;
  pricePerRequest: number;
  evmAddress: string;
  defaultToken: string;
}

export interface CreateGatewayRequest {
  originUrl: string;
  pricePerRequest: string;
  subdomain: string;
  evmAddress: string;
  customDomain?: string;
  paymentScheme?: string;
  paymentNetwork?: string;
  acceptedNetworks?: string[];
  defaultToken: string;
}

export const gatewaysApi = {
  quickCreate: async (data: QuickCreateGatewayRequest) => {
    const response = await api.post('/gateways/quick-create', data);
    return response.data;
  },

  create: async (data: CreateGatewayRequest) => {
    const response = await api.post('/gateways', data);
    return response.data;
  },
  
  getAll: async (): Promise<Gateway[]> => {
    const response = await api.get('/gateways');
    return response.data;
  },

  getAllWithStats: async (): Promise<Gateway[]> => {
    const response = await api.get('/gateways/with-stats');
    return response.data;
  },

  getById: async (id: string): Promise<Gateway> => {
    const response = await api.get(`/gateways/${id}`);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateGatewayRequest>) => {
    const response = await api.patch(`/gateways/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/gateways/${id}`);
  }
};
