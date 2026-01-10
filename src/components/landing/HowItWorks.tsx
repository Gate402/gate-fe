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

const VisualizationContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-[#27272a] bg-[#18181b]/80 backdrop-blur-md p-1 shadow-2xl">
    <div className="rounded-lg border border-[#27272a] bg-[#0f0f11] p-6 h-full">
      {children}
    </div>
  </div>
);

// Visualization for Step 1
const Step1Visualization = () => (
  <VisualizationContainer>
    <div className="flex items-center gap-2 mb-4 border-b border-[#27272a] pb-2">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#27272a]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27272a]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27272a]" />
      </div>
      <div className="text-[10px] text-[#a1a1aa] font-mono ml-2">bash</div>
    </div>
    <p className="mb-2 font-mono text-xs text-[#25f478]">➜ ~ curl GET</p>
    <code className="block mt-2 font-mono text-sm text-white">
      https://api.yourapp.com/weather
    </code>
    <div className="mt-4 p-3 rounded border border-[#27272a] bg-[#18181b]/50">
      <code className="font-mono text-xs text-[#a1a1aa]">
        {"{"} "temp": 24, "unit": "celsius" {"}"}
      </code>
    </div>
  </VisualizationContainer>
);

// Visualization for Step 2
const Step2Visualization = () => (
  <VisualizationContainer>
    <div className="flex items-center justify-between mb-6">
      <p className="font-mono text-xs text-[#a1a1aa]">GATEWAY STATUS</p>
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25f478] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25f478]"></span>
        </span>
        <span className="text-[10px] font-mono text-[#25f478]">ACTIVE</span>
      </div>
    </div>
    <div className="space-y-4">
      <div className="p-3 rounded border border-[#25f478]/30 bg-[#25f478]/5">
        <p className="text-[10px] text-[#25f478] mb-1 font-mono">GATEWAY URL</p>
        <code className="font-mono text-sm text-white">
          https://yourapp.gate402.pro
        </code>
      </div>
      <div className="flex gap-2 text-[10px] font-mono text-[#a1a1aa]">
        <span className="px-2 py-1 rounded bg-[#27272a]">SSL: AUTO</span>
        <span className="px-2 py-1 rounded bg-[#27272a]">X402: ON</span>
      </div>
    </div>
  </VisualizationContainer>
);

// Visualization for Step 3
const Step3Visualization = ({
  selectedPrice,
  setSelectedPrice,
}: {
  selectedPrice: number | string;
  setSelectedPrice: (v: number | string) => void;
}) => (
  <VisualizationContainer>
    <p className="mb-4 font-mono text-xs text-[#a1a1aa]">
      CONFIGURE PRICE PER CALL
    </p>
    <div className="space-y-3">
      {priceOptions.map((option) => (
        <button
          key={option.label}
          onClick={() => setSelectedPrice(option.value)}
          className={`w-full group flex items-center justify-between rounded-lg px-4 py-3 text-left transition-all duration-300 ${
            selectedPrice === option.value
              ? "bg-[#25f478]/10 border border-[#25f478]"
              : "bg-[#18181b] border border-[#27272a] hover:border-[#25f478]/50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                selectedPrice === option.value
                  ? "border-[#25f478] bg-[#25f478]"
                  : "border-[#27272a] group-hover:border-[#25f478]/50"
              }`}
            >
              {selectedPrice === option.value && (
                <IconCheck size={10} className="text-black" />
              )}
            </div>
            <span
              className={`font-mono text-sm font-semibold transition-colors ${
                selectedPrice === option.value ? "text-white" : "text-[#a1a1aa]"
              }`}
            >
              {option.label}
            </span>
          </div>
          {option.description && (
            <span className="text-[10px] uppercase font-mono text-[#25f478]/60">
              {option.description}
            </span>
          )}
        </button>
      ))}
    </div>
  </VisualizationContainer>
);

// Visualization for Step 4 with continuous animation
const Step4Visualization = () => {
  const pulseAnimation = {
    scale: [1, 1.1, 1],
    opacity: [0.5, 1, 0.5],
    boxShadow: [
      "0 0 0 0 rgba(37, 244, 120, 0.2)",
      "0 0 0 10px rgba(37, 244, 120, 0)",
      "0 0 0 0 rgba(37, 244, 120, 0)",
    ],
  };

  const arrowAnimation = {
    opacity: [0.2, 1, 0.2],
    color: ["#27272a", "#25f478", "#27272a"],
  };

  return (
    <VisualizationContainer>
      <div className="flex flex-col h-full justify-center gap-6">
        <div className="flex items-center justify-between gap-2">
          {/* Client */}
          <div className="flex flex-col items-center gap-2">
            <motion.div
              className="rounded-full border border-[#27272a] bg-[#18181b] p-3 text-white"
              animate={pulseAnimation}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0,
              }}
            >
              <IconArrowRight size={20} className="rotate-45" />
            </motion.div>
            <span className="text-[10px] font-mono text-[#a1a1aa]">REQ</span>
          </div>

          <motion.div
            animate={arrowAnimation}
            className="flex-1 h-px bg-current"
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />

          {/* Gate */}
          <div className="flex flex-col items-center gap-2">
            <motion.div
              className="rounded-full bg-[#25f478]/10 border border-[#25f478] p-3 shadow-[0_0_15px_-3px_rgba(37,244,120,0.3)]"
              animate={pulseAnimation}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1,
              }}
            >
              <div className="text-[#25f478] font-bold text-xs">402</div>
            </motion.div>
            <span className="text-[10px] font-mono text-[#25f478]">PAID</span>
          </div>

          <motion.div
            animate={arrowAnimation}
            className="flex-1 h-px bg-current"
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          />

          {/* API */}
          <div className="flex flex-col items-center gap-2">
            <motion.div
              className="rounded-full border border-[#27272a] bg-[#18181b] p-3 text-white"
              animate={pulseAnimation}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 2,
              }}
            >
              <IconCheck size={20} />
            </motion.div>
            <span className="text-[10px] font-mono text-[#a1a1aa]">200 OK</span>
          </div>
        </div>

        <div className="bg-[#25f478]/5 border border-[#25f478]/20 rounded p-2 text-center">
          <p className="font-mono text-[10px] text-[#25f478] tracking-widest uppercase animate-pulse">
            Settled on Chain
          </p>
        </div>
      </div>
    </VisualizationContainer>
  );
};

// Progress indicator dot component
const ProgressDot = ({
  number,
  progress,
}: {
  number: number;
  progress: MotionValue<number>;
}) => {
  const opacity = useTransform(progress, [0, 1], [0.3, 1]);
  const scale = useTransform(progress, [0, 1], [0.8, 1]); // Adjusted scale base
  const color = useTransform(progress, [0, 1], ["#27272a", "#25f478"]);

  return (
    <motion.div className="flex items-center gap-2" style={{ opacity }}>
      <motion.div
        className="w-2 h-2 rounded-full"
        style={{ scale, backgroundColor: color }}
      />
      <span className="text-xs font-mono text-[#a1a1aa] hidden lg:block">
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
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25f478]/10 border border-[#25f478]/30 font-mono text-lg font-bold text-[#25f478]">
        {step.number}
      </div>
      <h3 className="text-2xl font-bold font-heading text-white">
        {step.title}
      </h3>
    </div>
    <p className="text-lg text-[#a1a1aa] leading-relaxed max-w-md">
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

  // Scale transforms (0.7 -> 1)
  const step1Scale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.17],
    [1, 1, 0.7] // Start at 1 because it's the first one, fade out to 0.7
  );
  const step2Scale = useTransform(
    scrollYProgress,
    [0.17, 0.22, 0.3, 0.35],
    [0.7, 1, 1, 0.7]
  );
  const step3Scale = useTransform(
    scrollYProgress,
    [0.35, 0.4, 0.55, 0.6],
    [0.7, 1, 1, 0.7]
  );
  const step4Scale = useTransform(
    scrollYProgress,
    [0.6, 0.65, 0.8, 0.85],
    [0.7, 1, 1, 0.7]
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
      className="relative mt-24 border-t border-[#27272a]"
      style={{ height: "1000vh" }}
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
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[#25f478]">
            How it works
          </p>
          <h2 className="text-4xl font-bold font-heading text-white md:text-5xl">
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
              scale: step1Scale,
              pointerEvents: step1Pointer,
            }}
          >
            <StepContent step={steps[0]} isLeft={true} />
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#25f478]/20 to-[#00ff88]/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500" />
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
              scale: step2Scale,
              pointerEvents: step2Pointer,
            }}
          >
            <div className="relative group md:order-1">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#25f478]/20 to-[#00ff88]/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500" />
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
              scale: step3Scale,
              pointerEvents: step3Pointer,
            }}
          >
            <StepContent step={steps[2]} isLeft={true} />
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#25f478]/20 to-[#00ff88]/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500" />
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
              scale: step4Scale,
              pointerEvents: step4Pointer,
            }}
          >
            <div className="relative group md:order-1">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#25f478]/20 to-[#00ff88]/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500" />
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
        <h3 className="text-4xl md:text-6xl font-bold font-heading text-white mb-4">
          Ready to Get Paid?
        </h3>
        <p className="text-xl md:text-2xl text-[#a1a1aa] max-w-xl">
          Your API. Your price. Instant payments.
        </p>
      </motion.div>
    </div>
  );
};
