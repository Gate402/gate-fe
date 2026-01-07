import api from './api';
import {
  type ChainResponse,
  type ChainWithTokensResponse,
  type TokenWithChainResponse,
  type TokenResponse
} from '../types/config';

export const configApi = {
  getChains: async () => {
    const response = await api.get<ChainResponse[]>('/config/chains');
    return response.data;
  },

  getChainById: async (chainId: string) => {
    const response = await api.get<ChainWithTokensResponse>(`/config/chains/${chainId}`);
    return response.data;
  },

  getChainsWithTokens: async () => {
    const response = await api.get<ChainWithTokensResponse[]>('/config/chains-with-tokens');
    return response.data;
  },

  getAllTokens: async () => {
    const response = await api.get<TokenWithChainResponse[]>('/config/tokens');
    return response.data;
  },

  getTokensByChain: async (chainId: string) => {
    const response = await api.get<TokenResponse[]>(`/config/chains/${chainId}/tokens`);
    return response.data;
  },

  getTokenById: async (tokenId: string) => {
    const response = await api.get<TokenWithChainResponse>(`/config/tokens/${tokenId}`);
    return response.data;
  },

  getTokenByChainAndSymbol: async (chainId: string, symbol: string) => {
    const response = await api.get<TokenWithChainResponse>(`/config/chains/${chainId}/tokens/${symbol}`);
    return response.data;
  }
};
