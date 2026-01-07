import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Navbar,
  Hero,
  HowItWorks,
  PageLoader,
  Visualization,
  Comparison,
  FAQ,
} from "@/components/landing";
import { Features } from "@/components/landing/Features";
import { MinimalFooter } from "@/components/ui/minimal-footer";
import { CallToAction } from "@/components/ui/cta-3";
import { Seo } from "@/components/seo/Seo";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    return <PageLoader onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <SmoothScrollProvider>
      <div
        className={cn(
          "relative flex min-h-screen flex-col bg-[#0f0f11] transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      >
        {/* Background Elements - Applied to entire page */}
        <div
          className={cn(
            "fixed inset-0 z-0",
            "bg-size-[20px_20px]",
            "bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
            "opacity-30"
          )}
        />
        <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center bg-[#0f0f11] mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        {/* All content above background */}
        <div className="relative z-10">
          <Seo />
          <Navbar />

          {/* Hero section */}
          <div className="flex flex-col items-center justify-center pt-16 pb-16">
            <div className="w-full max-w-5xl text-center px-4">
              <Hero />
              {/* <AnimatedDiagram /> */}
            </div>
          </div>

          {/* HowItWorks - needs full document scroll for parallax */}
          <HowItWorks />

          {/* Remaining sections */}
          <div className="relative w-full max-w-5xl mx-auto px-4">
            <Features />
            <Visualization />
            <Comparison />
            <FAQ />
          </div>

          <div className="mt-12">
            <CallToAction />
          </div>

          {/* Footer */}
          <MinimalFooter />
        </div>
      </div>
    </SmoothScrollProvider>
  );
};

export default Home;
