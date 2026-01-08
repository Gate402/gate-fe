import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconGlobe,
  IconServer,
  IconArrowRight,
  IconLock,
  IconCheck,
  IconBolt,
} from "@tabler/icons-react";

// --- Components ---

const HudNode = ({
  icon: Icon,
  label,
  sublabel,
  isActive = false,
}: {
  icon: any;
  label: string;
  sublabel?: string;
  isActive?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className={`relative z-10 flex flex-col items-center justify-center p-5 rounded-2xl border backdrop-blur-md transition-all duration-500 w-32 h-32
      ${
        isActive
          ? "bg-[#25f478]/5 border-[#25f478] shadow-[0_0_20px_-5px_rgba(37,244,120,0.3)]"
          : "bg-[#18181b]/90 border-[#27272a]"
      }`}
  >
    <div
      className={`p-3 rounded-xl border mb-3 transition-colors duration-500 ${
        isActive
          ? "bg-[#25f478]/10 border-[#25f478] text-[#25f478]"
          : "bg-[#0f0f11] border-[#27272a] text-[#a1a1aa]"
      }`}
    >
      <Icon size={28} stroke={1.5} />
    </div>
    <span
      className={`text-xs font-mono font-bold tracking-wider uppercase transition-colors duration-500 ${
        isActive ? "text-[#25f478]" : "text-[#a1a1aa]"
      }`}
    >
      {label}
    </span>
    {sublabel && (
      <span className="text-[10px] font-mono text-[#a1a1aa]/60 mt-1 text-center leading-tight">
        {sublabel}
      </span>
    )}

    {/* Tech Corners */}
    <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-[#25f478]/20 -translate-x-px -translate-y-px rounded-tl-md" />
    <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-[#25f478]/20 translate-x-px -translate-y-px rounded-tr-md" />
    <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-[#25f478]/20 -translate-x-px translate-y-px rounded-bl-md" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-[#25f478]/20 translate-x-px translate-y-px rounded-br-md" />
  </motion.div>
);

const ConnectionLine = ({
  active = false,
  reverse = false,
}: {
  active?: boolean;
  reverse?: boolean;
}) => (
  <div className="flex-1 hidden md:flex items-center justify-center px-4 relative">
    {/* Base Line */}
    <div className="h-[1px] w-full bg-[#27272a] relative overflow-hidden">
      {/* Active Stream */}
      {active && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#25f478] to-transparent w-1/2"
          animate={{ x: reverse ? ["200%", "-100%"] : ["-100%", "200%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </div>
    {/* Arrow Head */}
    <IconArrowRight
      size={16}
      className={`absolute right-4 text-[#27272a] ${
        active ? "text-[#25f478]" : ""
      }`}
    />
  </div>
);

const ReactorNode = () => {
  const [state, setState] = useState<"IDLE" | "SCAN" | "PAY" | "OPEN">("IDLE");

  useEffect(() => {
    let mounted = true;
    const cycle = async () => {
      while (mounted) {
        setState("IDLE"); // Wait for request
        await new Promise((r) => setTimeout(r, 1000));
        if (!mounted) break;
        setState("SCAN"); // 402 Detect
        await new Promise((r) => setTimeout(r, 1500));
        if (!mounted) break;
        setState("PAY"); // Settling
        await new Promise((r) => setTimeout(r, 1500));
        if (!mounted) break;
        setState("OPEN"); // 200 OK
        await new Promise((r) => setTimeout(r, 2000));
      }
    };
    cycle();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="relative group w-48 h-48 flex items-center justify-center">
      {/* Outer Rotating Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border border-[#27272a] rounded-full border-dashed"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 border border-[#27272a]/50 rounded-full"
      />

      {/* Main Core */}
      <motion.div
        animate={
          state === "PAY" || state === "OPEN"
            ? {
                boxShadow: "0 0 50px -10px rgba(37,244,120,0.4)",
                borderColor: "#25f478",
              }
            : {
                boxShadow: "0 0 0px 0px rgba(37,244,120,0)",
                borderColor: "#27272a",
              }
        }
        transition={{ duration: 0.5 }}
        className="relative z-20 w-32 h-32 rounded-full bg-[#0f0f11] border-2 flex flex-col items-center justify-center overflow-hidden"
      >
        {/* State Content */}
        <AnimatePresence mode="wait">
          {state === "IDLE" && (
            <motion.div
              key="IDLE"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center"
            >
              <div className="w-2 h-2 bg-[#a1a1aa] rounded-full animate-pulse mb-2" />
              <span className="text-[10px] font-mono text-[#a1a1aa] tracking-widest">
                READY
              </span>
            </motion.div>
          )}

          {state === "SCAN" && (
            <motion.div
              key="SCAN"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <IconLock size={24} className="text-amber-400 mb-1" />
              <span className="text-xs font-mono font-bold text-white">
                402
              </span>
              <span className="text-[9px] font-mono text-amber-400">
                PAYMENT REQ
              </span>
            </motion.div>
          )}

          {state === "PAY" && (
            <motion.div
              key="PAY"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <IconBolt
                size={24}
                className="text-[#25f478] mb-1 animate-pulse"
              />
              <span className="text-xs font-mono font-bold text-white">
                SETTLING
              </span>
              <span className="text-[9px] font-mono text-[#25f478]">
                ON-CHAIN
              </span>
            </motion.div>
          )}

          {state === "OPEN" && (
            <motion.div
              key="OPEN"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#25f478]/20 flex items-center justify-center mb-1">
                <IconCheck size={28} className="text-[#25f478]" />
              </div>
              <span className="text-[10px] font-mono text-[#25f478] tracking-widest">
                ACCESS GRANTED
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Orbiting Particles (Active only when busy) */}
      {(state === "PAY" || state === "SCAN") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 animate-spin-slow pointer-events-none"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1.5 w-3 h-3 bg-[#25f478] rounded-full shadow-[0_0_15px_#25f478]" />
        </motion.div>
      )}
    </div>
  );
};

export const AnimatedDiagram = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      <div className="relative p-6 md:p-8 rounded-3xl border border-[#27272a] bg-[#0f0f11]/80 backdrop-blur-xl overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,244,120,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,244,120,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0f0f11_100%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
          {/* 1. Client Node */}
          <div className="flex-none">
            <HudNode
              icon={IconGlobe}
              label="Client"
              sublabel="Any App / Agent"
              isActive
            />
          </div>

          {/* Connection 1 */}
          <ConnectionLine active={true} />

          {/* 2. The Core (Gate402) */}
          <div className="flex-none -my-8 md:my-0 scale-90 md:scale-100">
            <ReactorNode />
          </div>

          {/* Connection 2 */}
          <ConnectionLine active={true} />

          {/* 3. Access Node */}
          <div className="flex-none">
            <HudNode
              icon={IconServer}
              label="API Access"
              sublabel="Protected Resource"
              isActive
            />
          </div>
        </div>
      </div>
    </div>
  );
};
