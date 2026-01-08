export type Gateway = {
  id: string;
  subdomain: string;
  originUrl: string;
  defaultPricePerRequest: number;
  defaultToken: string;
  acceptedNetworks: [
    string
  ],
  secretToken: string;
  status: string;
  customDomain: string;
  paymentScheme: string;
  paymentNetwork: string;
  evmAddress: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  totalRequests: number;
  successfulPayments: number;
  totalRevenue: number
};