"use client";

import { IconCheck, IconX } from "@tabler/icons-react";
import { motion } from "motion/react";

interface ComparisonItem {
  label: string;
  value: string;
  isPositive: boolean;
}

interface ComparisonRow {
  aspect: string;
  description?: string;
  stripe: ComparisonItem;
  gate402: ComparisonItem;
  diy: ComparisonItem;
}

const comparisonData: ComparisonRow[] = [
  {
    aspect: "Minimum Transaction",
    stripe: {
      label: "Stripe",
      value: "$0.50 minimum + fees",
      isPositive: false,
    },
    gate402: {
      label: "Gate402",
      value: "No minimums, true micropayments",
      isPositive: true,
    },
    diy: {
      label: "DIY",
      value: "No minimums",
      isPositive: true,
    },
  },
  {
    aspect: "Development Time",
    stripe: {
      label: "Stripe",
      value: "Hours - API integration",
      isPositive: true,
    },
    gate402: {
      label: "Gate402",
      value: "5 minutes - Fastest deployment",
      isPositive: true,
    },
    diy: {
      label: "DIY",
      value: "Weeks - Complex infrastructure",
      isPositive: false,
    },
  },
  {
    aspect: "Payout Speed",
    stripe: {
      label: "Stripe",
      value: "2-7 days delayed",
      isPositive: false,
    },
    gate402: {
      label: "Gate402",
      value: "Instant to your wallet",
      isPositive: true,
    },
    diy: {
      label: "DIY",
      value: "Instant (if implemented)",
      isPositive: true,
    },
  },
  {
    aspect: "Activation",
    stripe: {
      label: "Stripe",
      value: "KYC required, days to activate",
      isPositive: false,
    },
    gate402: {
      label: "Gate402",
      value: "No KYC, start in 5 minutes",
      isPositive: true,
    },
    diy: {
      label: "DIY",
      value: "No KYC needed",
      isPositive: true,
    },
  },
  {
    aspect: "Features",
    stripe: {
      label: "Stripe",
      value: "Payment APIs only",
      isPositive: false,
    },
    gate402: {
      label: "Gate402",
      value: "Analytics, monitoring, payments",
      isPositive: true,
    },
    diy: {
      label: "DIY",
      value: "Build everything yourself",
      isPositive: false,
    },
  },
];

const ComparisonCell = ({
  item,
  isHighlighted = false,
}: {
  item: ComparisonItem;
  isHighlighted?: boolean;
}) => {
  return (
    <div
      className={`flex items-start gap-3 ${
        isHighlighted ? "text-white" : "text-text-dim"
      }`}
    >
      <div className="shrink-0 mt-0.5">
        {item.isPositive ? (
          <IconCheck className="h-5 w-5 text-emerald-500" strokeWidth={2.5} />
        ) : (
          <IconX className="h-5 w-5 text-red-500" strokeWidth={2.5} />
        )}
      </div>
      <div className="text-sm leading-relaxed">{item.value}</div>
    </div>
  );
};

export const Comparison = () => {
  return (
    <section
      className="mt-24 border-t border-border-dark/50 pt-16"
      id="comparison"
    >
      {/* Section Header */}
      <div className="mb-12 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-dim/60">
          The Smart Choice
        </p>
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Why Gate402 vs. Traditional API Billing
        </h2>
      </div>

      {/* Comparison Table - Desktop */}
      <div className="hidden lg:block">
        <div className="overflow-hidden rounded-xl border border-border-dark/50 bg-card-dark/20 backdrop-blur-sm">
          {/* Table Header */}
          <div className="grid grid-cols-4 border-b border-border-dark/50 bg-card-dark/40">
            <div className="p-6"></div>
            <div className="p-6 text-center">
              <div className="text-sm font-semibold uppercase tracking-wider text-text-dim/60">
                💳 Stripe
              </div>
            </div>
            <div className="relative p-6 text-center">
              <div className="absolute inset-0 bg-primary/5 border-x border-primary/20"></div>
              <div className="relative text-sm font-semibold uppercase tracking-wider text-primary">
                ⚡ Gate402
              </div>
            </div>
            <div className="p-6 text-center">
              <div className="text-sm font-semibold uppercase tracking-wider text-text-dim/60">
                🛠️ Build Yourself
              </div>
            </div>
          </div>

          {/* Table Body */}
          {comparisonData.map((row, index) => (
            <motion.div
              key={row.aspect}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="grid grid-cols-4 border-b border-border-dark/30 last:border-b-0 hover:bg-card-dark/40 transition-colors duration-200"
            >
              <div className="p-6 font-semibold text-white border-r border-border-dark/30">
                {row.aspect}
              </div>
              <div className="p-6 border-r border-border-dark/30">
                <ComparisonCell item={row.stripe} />
              </div>
              <div className="relative p-6 border-r border-primary/20">
                <div className="absolute inset-0 bg-primary/5"></div>
                <div className="relative">
                  <ComparisonCell item={row.gate402} isHighlighted />
                </div>
              </div>
              <div className="p-6">
                <ComparisonCell item={row.diy} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comparison Cards - Mobile/Tablet */}
      <div className="lg:hidden space-y-6">
        {comparisonData.map((row, index) => (
          <motion.div
            key={row.aspect}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl border border-border-dark/50 bg-card-dark/20 backdrop-blur-sm overflow-hidden"
          >
            <div className="p-4 bg-card-dark/40 border-b border-border-dark/50">
              <h3 className="font-semibold text-white">{row.aspect}</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-text-dim/60 mb-2">
                  💳 Stripe
                </div>
                <ComparisonCell item={row.stripe} />
              </div>
              <div className="pt-4 border-t border-primary/20">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  ⚡ Gate402
                </div>
                <ComparisonCell item={row.gate402} isHighlighted />
              </div>
              <div className="pt-4 border-t border-border-dark/30">
                <div className="text-xs font-semibold uppercase tracking-wider text-text-dim/60 mb-2">
                  🛠️ Build Yourself
                </div>
                <ComparisonCell item={row.diy} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
