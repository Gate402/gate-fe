export interface ChainResponse {
  id: string;
  name: string;
  nativeCurrency: string;
  rpcUrl: string | null;
  blockExplorer: string | null;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface TokenResponse {
  id: string;
  chainId: string;
  symbol: string;
  address: string;
  decimals: number;
  name: string | null;
  version: string | null;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChainWithTokensResponse extends ChainResponse {
  tokens: TokenResponse[];
}

export interface TokenWithChainResponse extends TokenResponse {
  chain: ChainResponse;
}
