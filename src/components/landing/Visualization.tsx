"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconPhoto,
  IconCode,
  IconBrain,
  IconLanguage,
  IconFileText,
  IconSearch,
  IconBuildingStore,
  IconDatabase,
  IconChartBar,
  IconApi,
} from "@tabler/icons-react";
import { Marquee } from "@/components/ui/marquee";

interface Notification {
  id: string;
  amount: string;
  top: number;
  left: number;
}

interface APICard {
  domain: string;
  icon: React.ReactNode;
}

const firstRowCards: APICard[] = [
  { domain: "image-gen.gate402.io", icon: <IconPhoto className="h-8 w-8" /> },
  {
    domain: "code-analyzer.gate402.io",
    icon: <IconCode className="h-8 w-8" />,
  },
  { domain: "llm-gateway.gate402.io", icon: <IconBrain className="h-8 w-8" /> },
  {
    domain: "translation.gate402.io",
    icon: <IconLanguage className="h-8 w-8" />,
  },
  {
    domain: "file-converter.gate402.io",
    icon: <IconFileText className="h-8 w-8" />,
  },
];

const secondRowCards: APICard[] = [
  { domain: "search-api.gate402.io", icon: <IconSearch className="h-8 w-8" /> },
  {
    domain: "[your-company].gate402.io",
    icon: <IconBuildingStore className="h-8 w-8" />,
  },
  {
    domain: "data-enrichment.gate402.io",
    icon: <IconDatabase className="h-8 w-8" />,
  },
  {
    domain: "analytics.gate402.io",
    icon: <IconChartBar className="h-8 w-8" />,
  },
  { domain: "custom-api.gate402.io", icon: <IconApi className="h-8 w-8" /> },
];

const Card = ({ domain, icon, index }: APICard & { index: number }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const spawnNotification = () => {
      const id = Math.random().toString(36).substring(7);
      const top = Math.random() * 70 + 10; // 10% to 80% from top
      const left = Math.random() * 60 + 10; // 10% to 70% from left

      const notification: Notification = {
        id,
        amount: "$0.001",
        top,
        left,
      };

      setNotifications((prev) => [...prev, notification]);

      // Remove notification after animation completes (500ms fade in/out)
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 1500);
    };

    // Initial delay based on index to stagger notifications
    const initialDelay = index * 300;

    const initialTimeout = setTimeout(() => {
      spawnNotification();
      // Then spawn every 1.5s
      const interval = setInterval(spawnNotification, 1500);
      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(initialTimeout);
  }, [index]);

  return (
    <div className="relative aspect-[970/700] rounded-lg bg-card-dark/40 border border-border-dark/50 backdrop-blur-sm overflow-hidden">
      {/* Card Content */}
      <div className="p-6 flex flex-col items-center justify-center h-full gap-4">
        <div className="text-primary">{icon}</div>
        <h3 className="text-lg font-mono text-white">{domain}</h3>
      </div>

      {/* Animated Notifications */}
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              top: `${notification.top}%`,
              left: `${notification.left}%`,
            }}
            className="absolute pointer-events-none"
          >
            <div className="bg-emerald-500/90 text-white px-3 py-2 rounded-md shadow-lg backdrop-blur-sm">
              <div className="text-xs font-semibold">
                {notification.amount} Settled
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export const Visualization = () => {
  return (
    <section
      className="mt-24 border-t border-border-dark/50 pt-16"
      id="visualization"
    >
      {/* Section Title */}
      <div className="mb-12 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-dim/60">
          Live in Action
        </p>
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Real-Time Payments
        </h2>
      </div>

      {/* First Row Marquee */}
      <Marquee pauseOnHover className="[--duration:60s] mb-4">
        {firstRowCards.map((card, index) => (
          <Card key={index} {...card} index={index} />
        ))}
      </Marquee>

      {/* Second Row Marquee - Reversed */}
      <Marquee reverse pauseOnHover className="[--duration:60s]">
        {secondRowCards.map((card, index) => (
          <Card key={index} {...card} index={index + firstRowCards.length} />
        ))}
      </Marquee>
    </section>
  );
};
