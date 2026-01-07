import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import SlideArrowButton from "@/components/animata/button/slide-arrow-button";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.h1
        className="mb-6 text-4xl font-bold tracking-tight text-white md:text-7xl font-serif max-w-4xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Monetize Your API in{" "}
        <AnimatedText
          text="5 Minutes"
          className="inline-block"
          textClassName="text-4xl md:text-7xl font-bold font-serif text-primary"
          underlineClassName="text-primary"
          underlineDuration={1.2}
        />
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
        <SlideArrowButton
          text="Create Your First Gateway"
          primaryColor="#25f478"
          className="text-lg shadow-[0_0_30px_-10px_rgba(37,244,120,0.5)] cursor-pointer"
          onClick={() => navigate("/login")}
        />
      </motion.div>
      <Button
        variant="ghost"
        size="lg"
        className="text-base text-text-dim hover:text-white hover:bg-white/5"
        onClick={() =>
          document
            .getElementById("how-it-works")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        See How It Works ↓
      </Button>
    </div>
  );
};
