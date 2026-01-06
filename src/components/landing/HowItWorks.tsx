"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";

const priceOptions = [
  { value: 0.001, label: "$0.001", description: "(1/10th of a cent)" },
  { value: 0.01, label: "$0.01", description: "(1 cent)" },
  { value: 0.1, label: "$0.10", description: "(10 cents)" },
  { value: "custom", label: "Custom", description: "" },
];

interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "You have an API",
    description:
      "Any HTTP endpoint you want to monetize. Could be weather data, AI models, market data, or custom tools.",
  },
  {
    number: 2,
    title: "Create a Gateway",
    description:
      "Gate402 gives you a unique gateway URL that sits in front of your API. No code changes needed.",
  },
  {
    number: 3,
    title: "Set a price",
    description:
      "Choose how much to charge per request. Micropayments as low as $0.001 are possible with crypto.",
  },
  {
    number: 4,
    title: "Share the URL",
    description:
      "AI agents and developers use your gateway URL. Payments happen automatically via x402. You get paid in real-time.",
  },
];

// Visualization for Step 1
const Step1Visualization = () => (
  <div className="rounded-lg border border-border-dark/50 bg-slate-900/50 backdrop-blur-sm p-6">
    <p className="mb-2 font-mono text-xs text-text-dim/60">Origin API:</p>
    <code className="block rounded bg-slate-800/50 px-4 py-3 font-mono text-sm text-primary">
      https://api.yourapp.com/weather
    </code>
  </div>
);

// Visualization for Step 2
const Step2Visualization = () => (
  <div className="rounded-lg border border-border-dark/50 bg-slate-900/50 backdrop-blur-sm p-6">
    <p className="mb-2 font-mono text-xs text-text-dim/60">Your Gateway:</p>
    <code className="block rounded bg-slate-800/50 px-4 py-3 font-mono text-sm text-purple-400">
      https://yourapp.gate402.io
    </code>
  </div>
);

// Visualization for Step 3
const Step3Visualization = ({
  selectedPrice,
  setSelectedPrice,
}: {
  selectedPrice: number | string;
  setSelectedPrice: (v: number | string) => void;
}) => (
  <div className="rounded-lg border border-border-dark/50 bg-slate-900/50 backdrop-blur-sm p-6">
    <p className="mb-4 font-mono text-xs text-text-dim/60">
      Price per request:
    </p>
    <div className="space-y-2">
      {priceOptions.map((option) => (
        <button
          key={option.label}
          onClick={() => setSelectedPrice(option.value)}
          className={`w-full flex items-center gap-3 rounded px-4 py-3 text-left transition-all ${
            selectedPrice === option.value
              ? "bg-primary/10 border border-primary/50"
              : "bg-slate-800/30 border border-transparent hover:bg-slate-800/50"
          }`}
        >
          <div
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
              selectedPrice === option.value
                ? "border-primary bg-primary"
                : "border-text-dim/30"
            }`}
          >
            {selectedPrice === option.value && (
              <IconCheck size={10} className="text-white" />
            )}
          </div>
          <div className="flex-1">
            <span className="font-mono text-sm font-semibold text-white">
              {option.label}
            </span>
            {option.description && (
              <span className="ml-2 font-sans text-xs text-text-dim/60">
                {option.description}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  </div>
);

// Visualization for Step 4
const Step4Visualization = () => (
  <div className="rounded-lg border border-border-dark/50 bg-slate-900/50 backdrop-blur-sm p-8">
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full bg-blue-500/10 p-3">
          <svg
            className="h-6 w-6 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <span className="text-xs text-text-dim">Client</span>
      </div>

      <IconArrowRight className="text-text-dim/40" size={20} />

      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full bg-primary/10 p-3">
          <svg
            className="h-6 w-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <span className="text-xs text-text-dim">Pay</span>
      </div>

      <IconArrowRight className="text-text-dim/40" size={20} />

      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full bg-purple-500/10 p-3">
          <svg
            className="h-6 w-6 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <span className="text-xs text-text-dim">Access API</span>
      </div>

      <IconArrowRight className="text-text-dim/40" size={20} />

      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full bg-emerald-500/10 p-3">
          <svg
            className="h-6 w-6 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <span className="text-xs text-text-dim">You earn</span>
      </div>
    </div>
  </div>
);

// Progress indicator dot component
const ProgressDot = ({
  number,
  progress,
}: {
  number: number;
  progress: MotionValue<number>;
}) => {
  const opacity = useTransform(progress, [0, 1], [0.3, 1]);
  const scale = useTransform(progress, [0, 1], [0.5, 1]);

  return (
    <motion.div className="flex items-center gap-2" style={{ opacity }}>
      <motion.div
        className="w-2 h-2 rounded-full bg-primary"
        style={{ scale }}
      />
      <span className="text-xs font-mono text-text-dim/60 hidden lg:block">
        {number}
      </span>
    </motion.div>
  );
};

// Step content component
const StepContent = ({ step, isLeft }: { step: Step; isLeft: boolean }) => (
  <div className={`space-y-4 ${isLeft ? "" : "md:text-right"}`}>
    <div
      className={`flex items-center gap-3 ${
        isLeft ? "" : "md:flex-row-reverse"
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-lg font-bold text-primary">
        {step.number}
      </div>
      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
    </div>
    <p className="text-lg text-text-dim leading-relaxed max-w-md">
      {step.description}
    </p>
  </div>
);

export const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | string>(0.001);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Progress indicators for each step
  const step1Opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.17],
    [1, 1, 0]
  );
  const step2Opacity = useTransform(
    scrollYProgress,
    [0.17, 0.22, 0.3, 0.35],
    [0, 1, 1, 0]
  );
  const step3Opacity = useTransform(
    scrollYProgress,
    [0.35, 0.4, 0.55, 0.6],
    [0, 1, 1, 0]
  );
  const step4Opacity = useTransform(
    scrollYProgress,
    [0.6, 0.65, 0.8, 0.85],
    [0, 1, 1, 0]
  );

  // Text content transforms for each step
  const step1Y = useTransform(
    scrollYProgress,
    [0, 0.12, 0.17],
    ["0%", "0%", "-50%"]
  );
  const step1TextOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.17],
    [1, 1, 0]
  );

  const step2Y = useTransform(
    scrollYProgress,
    [0.17, 0.22, 0.3, 0.35],
    ["50%", "0%", "0%", "-50%"]
  );
  const step2TextOpacity = useTransform(
    scrollYProgress,
    [0.17, 0.22, 0.3, 0.35],
    [0, 1, 1, 0]
  );

  const step3Y = useTransform(
    scrollYProgress,
    [0.35, 0.4, 0.55, 0.6],
    ["50%", "0%", "0%", "-50%"]
  );
  const step3TextOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.4, 0.55, 0.6],
    [0, 1, 1, 0]
  );

  const step4Y = useTransform(
    scrollYProgress,
    [0.6, 0.65, 0.8, 0.85],
    ["50%", "0%", "0%", "-50%"]
  );
  const step4TextOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.65, 0.8, 0.85],
    [0, 1, 1, 0]
  );

  // Pointer events - only interactive when step is visible
  const step1Pointer = useTransform(step1TextOpacity, (v) =>
    v > 0.5 ? "auto" : "none"
  );
  const step2Pointer = useTransform(step2TextOpacity, (v) =>
    v > 0.5 ? "auto" : "none"
  );
  const step3Pointer = useTransform(step3TextOpacity, (v) =>
    v > 0.5 ? "auto" : "none"
  );
  const step4Pointer = useTransform(step4TextOpacity, (v) =>
    v > 0.5 ? "auto" : "none"
  );

  return (
    <div
      ref={containerRef}
      className="relative mt-24 border-t border-border-dark/50"
      style={{ height: "400vh" }}
      id="how-it-works"
    >
      {/* Sticky container for the entire section */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Section Title - Only visible at the very start */}
        <motion.div
          className="absolute top-0 left-0 right-0 text-center pt-8"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.02], [1, 0]),
          }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-dim/60">
            How it works
          </p>
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Four Steps to Monetization
          </h2>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50">
          <ProgressDot number={1} progress={step1Opacity} />
          <ProgressDot number={2} progress={step2Opacity} />
          <ProgressDot number={3} progress={step3Opacity} />
          <ProgressDot number={4} progress={step4Opacity} />
        </div>

        {/* Main content area */}
        <div className="relative flex-1 flex items-center max-w-5xl mx-auto w-full px-4">
          {/* Step 1: Text Left, Viz Right */}
          <motion.div
            className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4"
            style={{
              opacity: step1TextOpacity,
              y: step1Y,
              pointerEvents: step1Pointer,
            }}
          >
            <StepContent step={steps[0]} isLeft={true} />
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500" />
              <div className="relative">
                <motion.div style={{ opacity: step1Opacity }}>
                  <Step1Visualization />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Step 2: Viz Left, Text Right */}
          <motion.div
            className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4"
            style={{
              opacity: step2TextOpacity,
              y: step2Y,
              pointerEvents: step2Pointer,
            }}
          >
            <div className="relative group md:order-1">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-primary/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500" />
              <div className="relative">
                <motion.div style={{ opacity: step2Opacity }}>
                  <Step2Visualization />
                </motion.div>
              </div>
            </div>
            <div className="md:order-2">
              <StepContent step={steps[1]} isLeft={false} />
            </div>
          </motion.div>

          {/* Step 3: Text Left, Viz Right */}
          <motion.div
            className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4"
            style={{
              opacity: step3TextOpacity,
              y: step3Y,
              pointerEvents: step3Pointer,
            }}
          >
            <StepContent step={steps[2]} isLeft={true} />
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-emerald-500/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500" />
              <div className="relative">
                <motion.div style={{ opacity: step3Opacity }}>
                  <Step3Visualization
                    selectedPrice={selectedPrice}
                    setSelectedPrice={setSelectedPrice}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Step 4: Viz Left, Text Right */}
          <motion.div
            className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4"
            style={{
              opacity: step4TextOpacity,
              y: step4Y,
              pointerEvents: step4Pointer,
            }}
          >
            <div className="relative group md:order-1">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-primary/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500" />
              <div className="relative">
                <motion.div style={{ opacity: step4Opacity }}>
                  <Step4Visualization />
                </motion.div>
              </div>
            </div>
            <div className="md:order-2">
              <StepContent step={steps[3]} isLeft={false} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Closing Section - Separate sticky screen at the end */}
      <motion.div
        className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-4 -mt-[100vh] bg-[#0f0f11]"
        style={{
          opacity: useTransform(scrollYProgress, [0.82, 0.9], [0, 1]),
          pointerEvents: useTransform(scrollYProgress, (v) =>
            v > 0.85 ? "auto" : "none"
          ),
        }}
      >
        <h3 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Ready to Get Paid?
        </h3>
        <p className="text-xl md:text-2xl text-text-dim max-w-xl">
          Your API. Your price. Instant payments.
        </p>
      </motion.div>
    </div>
  );
};
