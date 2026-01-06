import {
  Globe,
  Wallet,
  CheckCircle2,
  Waypoints,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export const AnimatedDiagram = () => {
  return (
    <div className="w-full max-w-4xl mx-auto relative mb-12">
      <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center relative z-10">
        {/* Node 1: Request */}
        <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center gap-3 group">
          <div className="h-16 w-16 rounded-2xl bg-card-dark border border-border-dark flex items-center justify-center shadow-xl group-hover:border-primary/30 transition-colors">
            <Globe className="h-8 w-8 text-text-dim group-hover:text-primary transition-colors" />
          </div>
          <span className="text-sm font-mono text-text-dim">Request</span>
        </div>

        {/* Arrow 1 */}
        <div className="col-span-1 hidden md:flex items-center justify-center">
          <div className="h-[2px] w-full bg-gradient-to-r from-border-dark to-primary/50 relative">
            <div className="absolute right-0 -top-1 h-3 w-3 bg-primary rounded-full animate-ping opacity-50"></div>
            <div className="absolute right-0 -top-1 h-3 w-3 bg-primary rounded-full"></div>
          </div>
        </div>
        <div className="md:hidden flex flex-col items-center h-8">
          <div className="w-[2px] h-full bg-gradient-to-b from-border-dark to-primary/50"></div>
        </div>

        {/* Node 2: 402 Challenge (Centerpiece) */}
        <div className="col-span-1 md:col-span-1 flex flex-col items-center justify-center relative">
          <div className="relative z-10 scale-110">
            <Card className="relative flex h-24 w-24 items-center justify-center rounded-2xl border-primary/30 bg-[#0f0f11] shadow-[0_0_50px_-15px_rgba(37,244,120,0.3)] p-0 gap-0">
              <Waypoints className="h-10 w-10 text-primary" />
              <div className="absolute -right-2 -top-2 rounded-full border-2 border-background-dark bg-primary px-2 py-0.5 font-mono text-[10px] text-black font-bold">
                402
              </div>
              <div className="absolute -bottom-2 -left-2 flex items-center gap-1 rounded-full border-2 border-background-dark bg-surface-dark px-2 py-0.5 font-mono text-[10px] text-text-dim">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>{" "}
                Gate
              </div>
            </Card>
          </div>
        </div>

        {/* Arrow 2 */}
        <div className="col-span-1 hidden md:flex items-center justify-center">
          <div className="h-[2px] w-full bg-gradient-to-r from-primary/50 to-border-dark relative">
            <div className="absolute left-0 -top-1 h-3 w-3 bg-primary rounded-full animate-ping opacity-50"></div>
            <div className="absolute left-0 -top-1 h-3 w-3 bg-primary rounded-full"></div>
          </div>
        </div>
        <div className="md:hidden flex flex-col items-center h-8">
          <div className="w-[2px] h-full bg-gradient-to-b from-primary/50 to-border-dark"></div>
        </div>

        {/* Node 3 & 4: Payment -> Access */}
        <div className="col-span-1 md:col-span-2 flex items-center justify-center gap-4">
          {/* Payment */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="h-14 w-14 rounded-2xl bg-card-dark border border-border-dark flex items-center justify-center shadow-xl group-hover:border-primary/30 transition-colors">
              <Wallet className="h-6 w-6 text-text-dim group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs font-mono text-text-dim">Payment</span>
          </div>

          <ArrowRight className="h-4 w-4 text-border-dark" />

          {/* Access */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="h-14 w-14 rounded-2xl bg-card-dark border border-border-dark flex items-center justify-center shadow-xl group-hover:border-primary/30 transition-colors">
              <CheckCircle2 className="h-6 w-6 text-text-dim group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs font-mono text-text-dim">Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};
