import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  ArrowRight, 
  Code, 
  Waypoints 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden pt-24">
      {/* Background Elements */}
      <div
        className={cn(
          "absolute inset-0 z-0",
          "[background-size:20px_20px]",
          "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          "opacity-30"
        )}
      />
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-[#0f0f11] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl text-center">
        <div className="relative mb-8 inline-flex items-center justify-center">
          <div className="absolute inset-0 rounded-full blur-3xl bg-primary/20"></div>
          <Card className="relative flex h-24 w-24 items-center justify-center rounded-2xl border-border-dark bg-card-dark shadow-2xl p-0 gap-0">
            <Waypoints className="h-10 w-10 text-text-dim" />
            <div className="absolute -right-2 -top-2 rounded-full border-2 border-background-dark bg-primary px-2 py-0.5 font-mono text-[10px] text-black font-bold">
              402
            </div>
            <div className="absolute -bottom-2 -left-2 flex items-center gap-1 rounded-full border-2 border-background-dark bg-surface-dark px-2 py-0.5 font-mono text-[10px] text-text-dim">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div> Active
            </div>
          </Card>
        </div>
        
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl font-serif">
          Gate x402
        </h1>
        <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-text-dim">
          Start monetizing your APIs instantly. Create a gateway to accept HTTP 402 payments from AI agents and users.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="h-12 px-8 text-base" onClick={() => navigate('/login')}>
            <Plus className="h-5 w-5 mr-1" />
            Create Your First Gateway
            <ArrowRight className="h-4 w-4 ml-2 opacity-70 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base border-border-dark bg-transparent hover:bg-white/5 hover:text-primary">
            <Code className="h-5 w-5 mr-1" />
            View Documentation
          </Button>
        </div>

        <div className="mt-12 border-t border-border-dark/50 pt-10">
          <p className="mb-8 font-mono text-xs uppercase tracking-widest text-text-dim/60">How it works</p>
          <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3">
            <Card className="group border-transparent bg-transparent py-4 transition-all hover:border-border-dark hover:bg-card-dark/40 shadow-none gap-3">
              <CardHeader className="flex-row items-center gap-3 px-4 py-0">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/10 font-mono text-xs font-bold text-primary">1</div>
                <CardTitle className="text-sm font-semibold text-white">Configure Endpoint</CardTitle>
              </CardHeader>
              <CardContent className="px-4 py-0">
                <p className="text-sm text-text-dim leading-relaxed">Define your target API URL and pricing rules.</p>
              </CardContent>
            </Card>

            <Card className="group border-transparent bg-transparent py-4 transition-all hover:border-border-dark hover:bg-card-dark/40 shadow-none gap-3">
              <CardHeader className="flex-row items-center gap-3 px-4 py-0">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/10 font-mono text-xs font-bold text-primary">2</div>
                <CardTitle className="text-sm font-semibold text-white">Add Middleware</CardTitle>
              </CardHeader>
              <CardContent className="px-4 py-0">
                <p className="text-sm text-text-dim leading-relaxed">Drop in a single line of code to verify payments.</p>
              </CardContent>
            </Card>

            <Card className="group border-transparent bg-transparent py-4 transition-all hover:border-border-dark hover:bg-card-dark/40 shadow-none gap-3">
              <CardHeader className="flex-row items-center gap-3 px-4 py-0">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/10 font-mono text-xs font-bold text-primary">3</div>
                <CardTitle className="text-sm font-semibold text-white">Earn Crypto</CardTitle>
              </CardHeader>
              <CardContent className="px-4 py-0">
                <p className="text-sm text-text-dim leading-relaxed">Receive instant settlements for every request.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Home;