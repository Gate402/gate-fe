import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import SlideArrowButton from "@/components/animata/button/slide-arrow-button";
import { AnimatedDiagram } from "./AnimatedDiagram";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 pb-0 relative overflow-hidden">
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#25f478]/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl mx-auto text-center px-4"
      >
        <motion.h1
          className="mb-6 text-5xl md:text-7xl font-bold font-heading tracking-tight text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Monetize Your API in{" "}
          <span className="relative whitespace-nowrap">
            <AnimatedText
              text="5 Minutes"
              className="inline-block"
              textClassName="text-5xl md:text-7xl font-bold font-heading text-[#25f478]"
              underlineClassName="text-[#25f478]"
              underlineDuration={1.2}
            />
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mb-8 max-w-2xl text-lg md:text-xl leading-relaxed text-[#a1a1aa]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Add crypto payments to any API without writing billing code.{" "}
          <br className="hidden md:block" />
          Built on{" "}
          <span className="text-white font-mono font-medium">x402</span>,
          purpose-built for AI agents.
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <SlideArrowButton
              text="Create Your First Gateway"
              primaryColor="#25f478"
              className="text-lg font-semibold shadow-[0_0_30px_-10px_rgba(37,244,120,0.5)] cursor-pointer"
              onClick={() => navigate("/login")}
            />
            <Button
              variant="ghost"
              size="lg"
              className="text-base text-[#a1a1aa] hover:text-white hover:bg-white/5 border border-transparent hover:border-[#27272a] transition-all"
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See How It Works ↓
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Diagram Section */}
      <motion.div
        className="w-full relative z-10"
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <AnimatedDiagram />
      </motion.div>
    </div>
  );
};
