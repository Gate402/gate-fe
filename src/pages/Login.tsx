import React, { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useSiweLogin } from "../hooks/useSiweLogin";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { motion } from "motion/react";
import { PlusIcon, ShieldCheck } from "lucide-react";

const Login: React.FC = () => {
  const { isConnected } = useAccount();
  const { login: siweLogin, isLoading } = useSiweLogin();
  const {
    login: authLogin,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleLogin = async () => {
    try {
      const { user, tokens } = await siweLogin();
      authLogin(user, tokens.accessToken, tokens.refreshToken);
      console.log(user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to sign in", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f11] relative overflow-hidden px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,244,120,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,244,120,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#25f478]/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Tech Corners */}
        <PlusIcon className="absolute -top-3 -left-3 text-[#25f478]/40 w-6 h-6" />
        <PlusIcon className="absolute -top-3 -right-3 text-[#25f478]/40 w-6 h-6" />
        <PlusIcon className="absolute -bottom-3 -left-3 text-[#25f478]/40 w-6 h-6" />
        <PlusIcon className="absolute -bottom-3 -right-3 text-[#25f478]/40 w-6 h-6" />

        <div className="relative bg-[#18181b]/80 backdrop-blur-xl border border-[#27272a] rounded-2xl p-8 shadow-[0_0_50px_-10px_rgba(37,244,120,0.1)]">
          <div className="flex flex-col items-center text-center mb-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#25f478]/10 flex items-center justify-center border border-[#25f478]/20 text-[#25f478]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-heading text-white">
                Welcome to Gate402
              </h1>
              <p className="text-[#a1a1aa] text-sm mt-1">
                Secure Gateway Access
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center">
              <ConnectButton showBalance={false} />
            </div>

            {isConnected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-[#25f478] text-black hover:bg-[#25f478]/90 font-bold h-11 text-base shadow-[0_0_20px_-5px_rgba(37,244,120,0.5)] transition-all duration-300 hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Establishing Session...
                    </span>
                  ) : (
                    "Sign in with Ethereum"
                  )}
                </Button>
              </motion.div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-[#27272a] text-center">
            <p className="text-xs text-[#a1a1aa]/50 font-mono">
              Encrypted Session • x402 Protocol
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
