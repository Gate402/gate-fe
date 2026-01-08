"use client";

import { motion } from "motion/react";

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
      <div className="absolute inset-0 bg-gradient-to-br from-[#25f478]/10 via-[#00ff88]/5 to-transparent opacity-50" />
    ),
  },
  {
    Icon: IconBolt,
    name: "Instant, Non-Custodial",
    description:
      "Payments settle in seconds, directly to your wallet. We never hold your funds.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-[#25f478]/10 via-[#00ff88]/5 to-transparent opacity-30" />
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#25f478]/10 via-[#00ff88]/5 to-transparent opacity-30" />
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#25f478]/10 via-[#00ff88]/5 to-transparent opacity-30" />
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#25f478]/10 via-[#00ff88]/5 to-transparent opacity-50" />
    ),
  },
];

export const Features = () => {
  return (
    <section
      className="mt-24 border-t border-[#27272a] pt-16 px-4"
      id="features"
    >
      {/* Section Title */}
      <div className="mb-12 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[#25f478]">
          Features
        </p>
        <h2 className="text-4xl font-bold font-heading text-white md:text-5xl">
          Everything You Need
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto">
        <BentoGrid>
          {features.map((feature, index) => {
            const { className, ...cardProps } = feature;
            return (
              <motion.div
                key={feature.name}
                className={className}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <BentoCard {...cardProps} className="h-full" />
              </motion.div>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
};
