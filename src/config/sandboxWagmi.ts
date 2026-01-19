import { http, createConfig } from "wagmi";
import { mainnet, sepolia, base, baseSepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

// Separate wagmi config for the Gateway Sandbox
// This config is isolated from the main app's wallet connection
export const sandboxConfig = createConfig({
  chains: [mainnet, sepolia, base, baseSepolia],
  connectors: [
    injected(),
    walletConnect({
      projectId: "YOUR_PROJECT_ID", // Same project ID can be used
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

export type SandboxConfig = typeof sandboxConfig;
