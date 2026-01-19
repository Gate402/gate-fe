import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Gate402 dApp",
  projectId: import.meta.env.VITE_RAINBOW_PROJECT_ID!,
  chains: [mainnet, sepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
});
