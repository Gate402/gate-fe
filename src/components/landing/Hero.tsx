import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-12 flex flex-col items-center justify-center">
      <motion.h1
        className="mb-6 text-4xl font-bold tracking-tight text-white md:text-7xl font-serif max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Monetize Your API in <span className="text-primary">5 Minutes</span>
      </motion.h1>
      <motion.p
        className="mx-auto mb-10 max-w-2xl text-md leading-relaxed text-text-dim md:text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        Add crypto payments to any API without writing billing code.{" "}
        <br className="hidden md:block" />
        Built on <span className="text-white font-medium">x402</span>,
        purpose-built for AI agents.
      </motion.p>

      <motion.div
        className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
        <Button
          size="lg"
          className="h-14 px-8 text-lg font-semibold bg-primary text-black hover:bg-primary/90 shadow-[0_0_30px_-10px_rgba(37,244,120,0.5)] transition-all hover:scale-105"
          onClick={() => navigate("/login")}
        >
          Create Your First Gateway
          <ArrowRight className="h-5 w-5 ml-2 opacity-70" />
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="h-14 px-8 text-base text-text-dim hover:text-white hover:bg-white/5"
          onClick={() =>
            document
              .getElementById("how-it-works")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          See How It Works ↓
        </Button>
      </motion.div>
    </div>
  );
};
