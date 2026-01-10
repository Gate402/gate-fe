import React, { useState, useEffect } from "react";
import {
  Link,
  Lock,
  ArrowRight,
  Loader2,
  Globe,
  ChevronDown,
} from "lucide-react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { gatewaysApi } from "@/lib/gateways";
import { configApi } from "@/lib/config";
import {
  type ChainWithTokensResponse,
  type TokenResponse,
} from "@/types/config";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

import { useNavigate } from "react-router-dom";

const CreateGatewayModal: React.FC<{ setOpen: (open: boolean) => void }> = ({
  setOpen,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Basic fields
  const [originUrl, setOriginUrl] = useState("");
  const [price, setPrice] = useState("");
  const [receiverAddress, setReceiverAddress] = useState(
    user?.evmAddress || user?.address || ""
  );

  // Advanced fields
  const [subdomain, setSubdomain] = useState("");
  const [paymentNetwork, setPaymentNetwork] = useState("");
  const [defaultToken, setDefaultToken] = useState("");
  const [chains, setChains] = useState<ChainWithTokensResponse[]>([]);
  const [availableTokens, setAvailableTokens] = useState<TokenResponse[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    if (user && !receiverAddress) {
      setReceiverAddress(user.evmAddress || user.address || "");
    }
  }, [user]);

  useEffect(() => {
    const fetchChains = async () => {
      try {
        const data = await configApi.getChainsWithTokens();
        setChains(data);
        if (data.length > 0) {
          // Default to first chain if not set
          const firstChain = data[0];
          setPaymentNetwork(firstChain.id);
          setAvailableTokens(firstChain.tokens);
          if (firstChain.tokens.length > 0) {
            setDefaultToken(firstChain.tokens[0].id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch chains:", error);
        toast.error("Failed to load available networks");
      }
    };
    fetchChains();
  }, []);

  const handleChainChange = (chainId: string) => {
    setPaymentNetwork(chainId);
    const selectedChain = chains.find((c) => c.id === chainId);
    if (selectedChain) {
      setAvailableTokens(selectedChain.tokens);
      if (selectedChain.tokens.length > 0) {
        setDefaultToken(selectedChain.tokens[0].id);
      } else {
        setDefaultToken("");
      }
    }
  };

  const handleCreateGateway = async () => {
    if (!originUrl) {
      toast.error("Please enter an Origin URL");
      return;
    }
    if (!price) {
      toast.error("Please enter a price per request");
      return;
    }

    if (!receiverAddress) {
      toast.error("Please enter a receiver address");
      return;
    }

    if (!defaultToken) {
      toast.error("Please select a payment token.");
      return;
    }

    setIsLoading(true);
    try {
      let response;
      if (subdomain) {
        response = await gatewaysApi.create({
          originUrl,
          pricePerRequest: price,
          evmAddress: receiverAddress,
          subdomain,
          paymentScheme: "exact",
          paymentNetwork,
          defaultToken,
        });
      } else {
        response = await gatewaysApi.quickCreate({
          originUrl,
          pricePerRequest: Number(price),
          evmAddress: receiverAddress,
          defaultToken: defaultToken,
        });
      }

      toast.success("Gateway created successfully!");
      setOpen(false);
      navigate("/gateway-created", { state: response });
    } catch (error: any) {
      console.error("Failed to create gateway:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create gateway. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="bg-[#0f0f11]/95 backdrop-blur-xl border-[#27272a] text-white max-h-[90vh] overflow-y-auto sm:max-w-[500px] shadow-[0_0_50px_-20px_rgba(0,0,0,0.5)] p-0 gap-0">
      <DialogHeader className="p-6 border-b border-[#27272a] bg-[#0f0f11]">
        <DialogTitle className="text-2xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
          Create Gateway
          <span className="text-[#25f478] text-xs font-mono uppercase border border-[#25f478]/30 bg-[#25f478]/10 px-2 py-0.5 rounded-full">
            New
          </span>
        </DialogTitle>
        <DialogDescription className="mt-1 text-sm text-[#a1a1aa]">
          Configure your API endpoint for monetization.
        </DialogDescription>
      </DialogHeader>

      <div className="p-6 space-y-6 bg-gradient-to-b from-[#0f0f11] to-[#0a0a0c]">
        {/* Origin URL */}
        <div className="space-y-2 group">
          <label
            className="block text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] group-focus-within:text-[#25f478] transition-colors"
            htmlFor="origin-url"
          >
            Origin URL
          </label>
          <motion.div
            animate={{
              borderColor: activeField === "origin" ? "#25f478" : "#27272a",
            }}
            className="rounded-lg border bg-[#18181b]/50 overflow-hidden transition-colors duration-300"
          >
            <InputGroup className="border-none shadow-none">
              <InputGroupAddon className="bg-transparent border-r w-10 px-1 border-[#27272a] text-[#a1a1aa]">
                <Globe
                  size={16}
                  className={cn(
                    "transition-colors",
                    activeField === "origin" && "text-[#25f478]"
                  )}
                />
              </InputGroupAddon>
              <InputGroupInput
                id="origin-url"
                placeholder="https://api.yourdomain.com/v1"
                type="url"
                className="bg-transparent border-none text-white focus:ring-0 placeholder:text-[#52525b]"
                value={originUrl}
                onChange={(e) => setOriginUrl(e.target.value)}
                onFocus={() => setActiveField("origin")}
                onBlur={() => setActiveField(null)}
              />
            </InputGroup>
          </motion.div>
          <p className="text-[10px] text-[#71717a]">
            Requests will be proxied to this endpoint after payment
            verification.
          </p>
        </div>

        {/* Set Your Price Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold font-heading text-white border-b border-[#25f478]/20 pb-1 inline-block">
            Set Your Price
          </h3>
          <div className="space-y-2 group">
            <label
              className="block text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] group-focus-within:text-[#25f478] transition-colors"
              htmlFor="price"
            >
              Price Per Request (USD)
            </label>
            <motion.div
              animate={{
                borderColor: activeField === "price" ? "#25f478" : "#27272a",
              }}
              className="rounded-lg border bg-[#18181b]/50 overflow-hidden"
            >
              <InputGroup className="border-none shadow-none">
                <InputGroupAddon className="bg-transparent border-r pl-0 px-1 w-10 border-[#27272a] text-[#a1a1aa]">
                  <span
                    className={cn(
                      "font-mono",
                      activeField === "price" && "text-[#25f478]"
                    )}
                  >
                    $
                  </span>
                </InputGroupAddon>
                <InputGroupInput
                  id="price"
                  placeholder="0.002"
                  step="0.0001"
                  type="number"
                  className="bg-transparent border-none text-white focus:ring-0 placeholder:text-[#52525b]"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  onFocus={() => setActiveField("price")}
                  onBlur={() => setActiveField(null)}
                />
              </InputGroup>
            </motion.div>
          </div>
        </div>

        {/* Token Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold font-heading text-white border-b border-[#25f478]/20 pb-1 inline-block">
            Token
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Network Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
                Network
              </label>
              <Select value={paymentNetwork} onValueChange={handleChainChange}>
                <SelectTrigger className="bg-[#18181b]/50 border-[#27272a] text-white hover:border-[#25f478]/50 focus:ring-[#25f478]/20 transition-all">
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent className="bg-[#0f0f11] border-[#27272a] text-white">
                  {chains.map((chain) => (
                    <SelectItem
                      key={chain.id}
                      value={chain.id}
                      className="focus:bg-[#25f478]/10 focus:text-[#25f478] cursor-pointer"
                    >
                      {chain.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Token Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
                Token
              </label>
              <Select
                value={defaultToken}
                onValueChange={setDefaultToken}
                disabled={availableTokens.length === 0}
              >
                <SelectTrigger className="bg-[#18181b]/50 border-[#27272a] text-white hover:border-[#25f478]/50 focus:ring-[#25f478]/20 transition-all">
                  <SelectValue
                    placeholder={
                      availableTokens.length === 0
                        ? "No tokens"
                        : "Select token"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="bg-[#0f0f11] border-[#27272a] text-white">
                  {availableTokens.map((token) => (
                    <SelectItem
                      key={token.id}
                      value={token.id}
                      className="focus:bg-[#25f478]/10 focus:text-[#25f478] cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {token.imageUrl && (
                          <img
                            src={token.imageUrl}
                            alt={token.symbol}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                        )}
                        <span>{token.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                  {availableTokens.length === 0 && (
                    <SelectItem value="no-tokens" disabled>
                      No tokens
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 group pt-2">
            <label
              className="block text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] group-focus-within:text-[#25f478] transition-colors"
              htmlFor="receiver"
            >
              Receiver Address
            </label>
            <motion.div
              animate={{
                borderColor: activeField === "receiver" ? "#25f478" : "#27272a",
              }}
              className="rounded-lg border bg-[#18181b]/50 overflow-hidden"
            >
              <InputGroup className="border-none shadow-none">
                <InputGroupAddon className="bg-transparent border-r w-10 px-1 pl-0 border-[#27272a] text-[#a1a1aa]">
                  <Lock
                    size={14}
                    className={cn(
                      "transition-colors",
                      activeField === "receiver" && "text-[#25f478]"
                    )}
                  />
                </InputGroupAddon>
                <InputGroupInput
                  id="receiver-address"
                  placeholder="0x..."
                  className="bg-transparent border-none text-white focus:ring-0 placeholder:text-[#52525b] text-xs font-mono"
                  value={receiverAddress}
                  onChange={(e) => setReceiverAddress(e.target.value)}
                  onFocus={() => setActiveField("receiver")}
                  onBlur={() => setActiveField(null)}
                />
              </InputGroup>
            </motion.div>
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <div className="pt-2">
          <button
            type="button"
            className="flex items-center text-xs font-medium text-[#71717a] hover:text-[#25f478] transition-colors group"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <motion.div animate={{ rotate: showAdvanced ? 180 : 0 }}>
              <ChevronDown
                size={14}
                className="mr-1 group-hover:text-[#25f478]"
              />
            </motion.div>
            Advanced Configuration
          </button>
        </div>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-4 border-t border-[#27272a]/50 pb-2">
                <div className="space-y-2 group">
                  <label
                    className="block text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] group-focus-within:text-[#25f478] transition-colors"
                    htmlFor="subdomain"
                  >
                    Subdomain
                  </label>
                  <motion.div
                    animate={{
                      borderColor:
                        activeField === "subdomain" ? "#25f478" : "#27272a",
                    }}
                    className="rounded-lg border bg-[#18181b]/50 overflow-hidden flex items-center"
                  >
                    <Link
                      size={14}
                      className={cn(
                        "ml-3 text-[#52525b]",
                        activeField === "subdomain" && "text-[#25f478]"
                      )}
                    />
                    <InputGroupInput
                      id="subdomain"
                      placeholder="my-api"
                      className="bg-transparent border-none text-white focus:ring-0 placeholder:text-[#52525b] h-9"
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value)}
                      onFocus={() => setActiveField("subdomain")}
                      onBlur={() => setActiveField(null)}
                    />
                    <div className="pr-3 text-xs text-[#52525b] font-mono">
                      {import.meta.env.VITE_GATEWAY_DOMAIN || ".gate402.pro"}
                    </div>
                  </motion.div>
                  <p className="text-[10px] text-[#71717a]">
                    Leave blank to auto-generate a unique ID.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DialogFooter className="px-6 py-4 bg-[#0f0f11] border-t border-[#27272a]">
        <DialogClose asChild>
          <Button
            variant="ghost"
            disabled={isLoading}
            className="text-[#a1a1aa] hover:text-white hover:bg-white/5"
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          onClick={handleCreateGateway}
          disabled={isLoading}
          className="bg-[#25f478] text-black hover:bg-[#25f478]/90 font-bold shadow-[0_0_20px_-5px_rgba(37,244,120,0.5)] transition-all duration-300 hover:scale-105"
        >
          {isLoading ? (
            <>
              Deploying...
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Create Gateway
              <ArrowRight size={16} className="ml-2" />
            </>
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateGatewayModal;
