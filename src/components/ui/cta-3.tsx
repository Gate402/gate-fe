import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  const navigate = useNavigate();

  return (
    <div className="relative mx-auto w-full max-w-5xl px-4 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-[#27272a] bg-[#0f0f11]">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,244,120,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,244,120,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,244,120,0.05)_0%,transparent_70%)] pointer-events-none" />

        {/* Corner Markers */}
        <PlusIcon className="absolute top-4 left-4 text-[#25f478]/40 w-4 h-4" />
        <PlusIcon className="absolute top-4 right-4 text-[#25f478]/40 w-4 h-4" />
        <PlusIcon className="absolute bottom-4 left-4 text-[#25f478]/40 w-4 h-4" />
        <PlusIcon className="absolute bottom-4 right-4 text-[#25f478]/40 w-4 h-4" />

        <div className="relative z-10 flex flex-col items-center justify-center gap-8 py-16 px-6 text-center">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white tracking-tight">
              Ready to Start Earning?
            </h2>
            <p className="text-lg text-[#a1a1aa] font-medium">
              Create your first gateway in under 5 minutes.{" "}
              <br className="hidden sm:block" />
              No credit card required. Pure crypto native.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              variant="outline"
              className="border-[#27272a] bg-transparent text-white hover:bg-[#27272a]/50"
              onClick={() => window.open("https://docs.gate402.io", "_blank")}
            >
              Read The Docs
            </Button>
            <Button
              className="bg-[#25f478] text-black hover:bg-[#25f478]/90 font-bold px-8 shadow-[0_0_20px_-5px_rgba(37,244,120,0.5)]"
              onClick={() => navigate("/login")}
            >
              Launch App <ArrowRightIcon className="size-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
