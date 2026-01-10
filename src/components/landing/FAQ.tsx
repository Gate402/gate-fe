"use client";

import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How does x402 work?",
    answer:
      'x402 is an open payment standard built on HTTP 402 (Payment Required). When a client requests a protected resource, the server responds with 402 and a payment invoice. The client pays, includes proof in the retry request, and gets access. Think of it as "HTTP, but with payments built in."',
  },
  {
    question: "Do I need to write any code?",
    answer:
      "No. Just point your gateway to your existing API. Gate402 handles the payment layer. If you want to verify payments server-side, we provide a simple middleware (optional).",
  },
  {
    question: "What if someone bypasses my gateway and calls my API directly?",
    answer:
      "Use the secret token we provide. Add it to your API's firewall—only accept requests with the correct token. We include setup instructions and middleware for common frameworks.",
  },
  {
    question: "How do payouts work?",
    answer:
      "Payments go directly to your wallet—we never hold your funds. You receive USDC on whatever chain you choose (Solana, Base, etc.). Instant settlement, no waiting for batch payouts.",
  },
  {
    question: "What's the 2% platform fee for?",
    answer:
      "Infrastructure costs, payment validation, analytics, and ongoing development. We only charge when you earn—if you make $0, we make $0.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes! You can CNAME your domain (e.g., api.yourbrand.com) to your gateway. We handle SSL automatically. One custom domain included on free plan.",
  },
  {
    question:
      "What if I want to charge different prices for different endpoints?",
    answer:
      "Coming soon! For now, set one price per gateway. If you need per-endpoint pricing, create multiple gateways or contact us for early access.",
  },
  {
    question: "Is this safe? What about custody risks?",
    answer:
      "Gate402 is non-custodial. Payments go directly to your wallet, not through us. We validate that payment happened, but we never hold funds. Zero custody risk.",
  },
  {
    question: "Can I use this with Claude/ChatGPT?",
    answer:
      "Yes! Gate402 is MCP-native, meaning AI agents can automatically discover your API, see the price, execute payment, and use your service—all without human intervention.",
  },
  {
    question: "What prevents payment fraud or chargebacks?",
    answer:
      "Crypto payments are irreversible. Once confirmed on-chain, there are no chargebacks. We validate payment proofs before granting access, so you only serve paid requests.",
  },
  {
    question: "What happens if your service goes down?",
    answer:
      "We're building for 99.9% uptime, but if we go down, payments would temporarily stop. Your origin API is unaffected. For mission-critical use cases, we offer self-hosted options (coming soon).",
  },
  {
    question: "What if I have more questions?",
    answer:
      "Join our Discord community or email us at hello@gate402.pro. We're small and scrappy—you'll probably talk directly to the founders.",
  },
];

const FAQAccordionItem = ({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      className={`rounded-lg border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-[#25f478] bg-[#18181b] shadow-[0_0_15px_-3px_rgba(37,244,120,0.15)]"
          : "border-[#27272a] bg-[#18181b]/30 hover:border-[#25f478]/50"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-start justify-between gap-4 transition-colors duration-200"
      >
        <span
          className={`font-heading font-medium text-base md:text-lg transition-colors duration-300 ${
            isOpen ? "text-[#25f478]" : "text-white"
          }`}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 mt-1"
        >
          <IconChevronDown
            className={`h-5 w-5 transition-colors duration-300 ${
              isOpen ? "text-[#25f478]" : "text-[#a1a1aa]"
            }`}
          />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 text-[#a1a1aa] text-sm md:text-base leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ = () => {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenIndexes = new Set(openIndexes);
    if (newOpenIndexes.has(index)) {
      newOpenIndexes.delete(index);
    } else {
      newOpenIndexes.add(index);
    }
    setOpenIndexes(newOpenIndexes);
  };

  // Split FAQs into two columns for desktop
  const midpoint = Math.ceil(faqData.length / 2);
  const firstColumn = faqData.slice(0, midpoint);
  const secondColumn = faqData.slice(midpoint);

  return (
    <section className="mt-24 border-t border-[#27272a] pt-16 px-4" id="faq">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[#25f478]">
          Got Questions?
        </p>
        <h2 className="text-4xl font-bold font-heading text-white md:text-5xl">
          Frequently Asked Questions
        </h2>
      </div>

      {/* Two-column layout for desktop, single column for mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* First Column */}
        <div className="space-y-4">
          {firstColumn.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
              isOpen={openIndexes.has(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>

        {/* Second Column */}
        <div className="space-y-4">
          {secondColumn.map((item, index) => {
            const actualIndex = index + midpoint;
            return (
              <FAQAccordionItem
                key={actualIndex}
                item={item}
                isOpen={openIndexes.has(actualIndex)}
                onToggle={() => toggleItem(actualIndex)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
