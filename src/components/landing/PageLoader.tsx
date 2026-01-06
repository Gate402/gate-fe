import { useState, useEffect } from "react";
import { MorphingSpinner } from "@/components/ui/morphing-spinner";
import { cn } from "@/lib/utils";

const loadingMessages = [
  "Initializing payment gateway...",
  "Connecting to x402 protocol...",
  "Syncing blockchain nodes...",
  "Monetizing your APIs...",
  "Deploying smart contracts...",
  "Calibrating crypto flows...",
  "Warming up the gate...",
  "Establishing secure channels...",
];

export const PageLoader = ({
  onLoadComplete,
}: {
  onLoadComplete: () => void;
}) => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [messageOpacity, setMessageOpacity] = useState(1);

  useEffect(() => {
    // Cycle through messages every 600ms
    const messageInterval = setInterval(() => {
      setMessageOpacity(0);
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        setMessageOpacity(1);
      }, 200);
    }, 600);

    // Random interval between 2-4 seconds
    const randomDelay = Math.random() * 2000 + 2000; // 2000-4000ms

    const timer = setTimeout(() => {
      clearInterval(messageInterval);
      setIsExpanding(true);
      // Wait for expansion animation to complete before calling onLoadComplete
      setTimeout(() => {
        onLoadComplete();
      }, 800); // Match the animation duration
    }, randomDelay);

    return () => {
      clearTimeout(timer);
      clearInterval(messageInterval);
    };
  }, [onLoadComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#0f0f11] transition-all duration-700",
        isExpanding && "scale-[20] opacity-0"
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center gap-8 transition-all duration-500 ease-out",
          isExpanding ? "scale-[3]" : "scale-100"
        )}
      >
        <MorphingSpinner size="lg" className="w-16 h-16" />

        <div
          className="h-6 flex items-center justify-center"
          style={{
            opacity: messageOpacity,
            transition: "opacity 200ms ease-in-out",
          }}
        >
          <p className="text-sm font-mono text-text-dim tracking-wide">
            {loadingMessages[messageIndex]}
          </p>
        </div>
      </div>
    </div>
  );
};
