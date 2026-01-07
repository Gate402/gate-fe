import api from './api';

export interface QuickCreateGatewayRequest {
  originUrl: string;
  pricePerRequest: number;
  evmAddress: string;
}

export interface CreateGatewayRequest {
  originUrl: string;
  pricePerRequest: number;
  acceptedNetworks: string[];
  subdomain: string;
  evmAddress: string;
  customDomain?: string;
  paymentScheme?: string;
  paymentNetwork?: string;
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
  
  getAll: async () => {
    const response = await api.get('/gateways');
    return response.data;
  },

  getById: async (id: string) => {
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
