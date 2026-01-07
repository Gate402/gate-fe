"use client";

import {
  IconRobot,
  IconBolt,
  IconCoins,
  IconWorld,
  IconLink,
} from "@tabler/icons-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: IconRobot,
    name: "Built for AI Agents",
    description:
      "Native MCP support. AI agents discover, pay, and use your API autonomously.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent" />
    ),
  },
  {
    Icon: IconBolt,
    name: "Instant, Non-Custodial Payments",
    description:
      "Payments settle in seconds, directly to your wallet. We never hold your funds.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent" />
    ),
  },
  {
    Icon: IconCoins,
    name: "True Micropayments",
    description: "Charge $0.001 per request. No minimums, no percentage fees.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent" />
    ),
  },
  {
    Icon: IconWorld,
    name: "Your Brand, Your Domain",
    description:
      "Use your own domain with automatic SSL. Your customers see your brand.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent" />
    ),
  },
  {
    Icon: IconLink,
    name: "Multi-Chain Support",
    description:
      "Accept payments on Solana, Base, or Lightning. More chains soon.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent" />
    ),
  },
];

export const Features = () => {
  return (
    <section
      className="mt-24 border-t border-border-dark/50 pt-16 px-4"
      id="features"
    >
      {/* Section Title */}
      <div className="mb-12 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-dim/60">
          Features
        </p>
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Everything You Need
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto">
        <BentoGrid>
          {features.map((feature) => {
            const { className, ...cardProps } = feature;
            return (
              <div key={feature.name} className={className}>
                <BentoCard {...cardProps} className="" />
              </div>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
};
