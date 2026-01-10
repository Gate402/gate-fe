import React, { useEffect, useState } from "react";
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
  Link,
  Loader2,
  Globe,
  Save,
  Wallet,
  Settings,
  Code2,
} from "lucide-react";
import { toast } from "sonner";
import { gatewaysApi } from "@/lib/gateways";
import { configApi } from "@/lib/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type ChainWithTokensResponse,
  type TokenResponse,
} from "@/types/config";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CodeBlock } from "@/components/ui/code-block";
import {
  getNodeSnippet,
  getGoSnippet,
  getRustSnippet,
  getPythonSnippet,
  getClientSnippet,
} from "@/lib/code-examples";

interface GatewayDetailsModalProps {
  gatewayId: string | null;
  setOpen: (open: boolean) => void;
  onGatewayUpdated: () => void;
}

const GatewayDetailsModal: React.FC<GatewayDetailsModalProps> = ({
  gatewayId,
  setOpen,
  onGatewayUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<"config" | "integration">(
    "config"
  );
  const [activeLang, setActiveLang] = useState<
    "node" | "go" | "rust" | "python"
  >("node");
  const [activeField, setActiveField] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form fields
  const [originUrl, setOriginUrl] = useState("");
  const [price, setPrice] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [paymentNetwork, setPaymentNetwork] = useState("");
  const [status, setStatus] = useState("active");
  const [evmAddress, setEvmAddress] = useState("");
  const [defaultToken, setDefaultToken] = useState("");
  const [gatewayUrl, setGatewayUrl] = useState("");
  const [secretToken, setSecretToken] = useState("");

  const [chains, setChains] = useState<ChainWithTokensResponse[]>([]);
  const [availableTokens, setAvailableTokens] = useState<TokenResponse[]>([]);

  useEffect(() => {
    const fetchChains = async () => {
      try {
        const data = await configApi.getChainsWithTokens();
        setChains(data);
      } catch (error) {
        console.error("Failed to fetch chains:", error);
        toast.error("Failed to load available networks");
      }
    };
    fetchChains();
  }, []);

  useEffect(() => {
    if (gatewayId) {
      fetchGatewayDetails(gatewayId);
    }
  }, [gatewayId]);

  useEffect(() => {
    if (chains.length > 0 && paymentNetwork) {
      const selectedChain = chains.find((c) => c.id === paymentNetwork);
      if (selectedChain) {
        setAvailableTokens(selectedChain.tokens);
      }
    }
  }, [chains, paymentNetwork]);

  const fetchGatewayDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await gatewaysApi.getById(id);
      setOriginUrl(data.originUrl || "");
      setPrice(data.defaultPricePerRequest?.toString() || "");
      setSubdomain(data.subdomain || "");
      setCustomDomain(data.customDomain || "");
      setPaymentNetwork(data.paymentNetwork || "");
      setStatus(data.status || "active");
      setEvmAddress(data.evmAddress || "");
      setDefaultToken(data.defaultToken || "");
      setSecretToken(data.secretToken || "sk_live_402_xxxxxxxxxx");

      const gatewayDomain =
        import.meta.env.VITE_GATEWAY_DOMAIN || ".gate402.pro";
      setGatewayUrl(
        data.gatewayUrl ||
          (data.subdomain ? `https://${data.subdomain}${gatewayDomain}` : "")
      );
    } catch (error) {
      console.error("Failed to fetch gateway details:", error);
      toast.error("Failed to load gateway details.");
      setOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleUpdateGateway = async () => {
    if (!gatewayId) return;
    if (!originUrl) {
      toast.error("Please enter an Origin URL");
      return;
    }
    if (!price) {
      toast.error("Please enter a price per request");
      return;
    }
    if (!defaultToken) {
      toast.error("Please select a payment token.");
      return;
    }

    setIsSaving(true);
    try {
      await gatewaysApi.update(gatewayId, {
        originUrl,
        defaultPricePerRequest: price,
        customDomain: customDomain || undefined,
        paymentNetwork,
        status,
        evmAddress,
        defaultToken: defaultToken || undefined,
      } as any);

      toast.success("Gateway updated successfully!");
      onGatewayUpdated();
      setOpen(false);
    } catch (error: any) {
      console.error("Failed to update gateway:", error);
      toast.error(error.response?.data?.error || "Failed to update gateway.");
    } finally {
      setIsSaving(false);
    }
  };

  const serverSnippets = {
    node: getNodeSnippet(secretToken),
    go: getGoSnippet(secretToken),
    rust: getRustSnippet(secretToken),
    python: getPythonSnippet(secretToken),
  };

  const clientSnippet = getClientSnippet(gatewayUrl);

  return (
    <DialogContent className="bg-[#0f0f11]/95 backdrop-blur-xl border-border-dark text-white max-h-[90vh] overflow-y-auto sm:max-w-[800px] shadow-[0_0_50px_-20px_rgba(0,0,0,0.5)] p-0 gap-0">
      <DialogHeader className="p-6 border-b border-border-dark bg-[#0f0f11]">
        <DialogTitle className="text-2xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
          Gateway Settings
          <span
            className={cn(
              "text-xs font-mono uppercase border px-2 py-0.5 rounded-full",
              status === "active"
                ? "text-[#25f478] border-[#25f478]/30 bg-[#25f478]/10"
                : "text-amber-500 border-amber-500/30 bg-amber-500/10"
            )}
          >
            {status}
          </span>
        </DialogTitle>
        <DialogDescription className="mt-1 text-sm text-text-dim">
          Manage your gateway configuration and integration.
        </DialogDescription>
      </DialogHeader>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin text-[#25f478]" size={32} />
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex items-center gap-4 px-6 pt-4 border-b border-border-dark/50">
            <button
              onClick={() => setActiveTab("config")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px",
                activeTab === "config"
                  ? "text-white border-[#25f478]"
                  : "text-text-dim border-transparent hover:text-gray-200"
              )}
            >
              <Settings size={16} />
              Configuration
            </button>
            <button
              onClick={() => setActiveTab("integration")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px",
                activeTab === "integration"
                  ? "text-white border-[#25f478]"
                  : "text-text-dim border-transparent hover:text-gray-200"
              )}
            >
              <Code2 size={16} />
              Integration
            </button>
          </div>

          <div className="p-6 space-y-6 bg-linear-to-b from-[#0f0f11] to-[#0a0a0c]">
            <AnimatePresence mode="wait">
              {activeTab === "config" && (
                <motion.div
                  key="config"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Status */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim">
                      Gateway Status
                    </label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="bg-card-dark/50 border-border-dark text-white hover:border-[#25f478]/50 focus:ring-[#25f478]/20 transition-all">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0f0f11] border-border-dark text-white">
                        <SelectItem
                          value="active"
                          className="focus:bg-[#25f478]/10 focus:text-[#25f478] cursor-pointer"
                        >
                          Active
                        </SelectItem>
                        <SelectItem
                          value="paused"
                          className="focus:bg-[#25f478]/10 focus:text-[#25f478] cursor-pointer"
                        >
                          Paused
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* General Section */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold font-heading text-white border-b border-[#25f478]/20 pb-1 inline-block">
                      General
                    </h3>

                    <div className="space-y-2 group">
                      <label
                        className="block text-xs font-semibold uppercase tracking-wider text-text-dim group-focus-within:text-[#25f478] transition-colors"
                        htmlFor="origin-url"
                      >
                        Origin URL
                      </label>
                      <motion.div
                        animate={{
                          borderColor:
                            activeField === "origin" ? "#25f478" : "#27272a",
                        }}
                        className="rounded-lg border bg-card-dark/50 overflow-hidden"
                      >
                        <InputGroup className="border-none shadow-none">
                          <InputGroupAddon className="bg-transparent border-r w-10 px-1 border-border-dark text-text-dim">
                            <Link
                              size={16}
                              className={cn(
                                "transition-colors",
                                activeField === "origin" && "text-[#25f478]"
                              )}
                            />
                          </InputGroupAddon>
                          <InputGroupInput
                            id="origin-url"
                            type="url"
                            className="bg-transparent border-none text-white focus:ring-0 placeholder:text-[#52525b]"
                            value={originUrl}
                            onChange={(e) => setOriginUrl(e.target.value)}
                            onFocus={() => setActiveField("origin")}
                            onBlur={() => setActiveField(null)}
                          />
                        </InputGroup>
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 group">
                        <label
                          className="block text-xs font-semibold uppercase tracking-wider text-text-dim group-focus-within:text-[#25f478] transition-colors"
                          htmlFor="price"
                        >
                          Price Per Request (USD)
                        </label>
                        <motion.div
                          animate={{
                            borderColor:
                              activeField === "price" ? "#25f478" : "#27272a",
                          }}
                          className="rounded-lg border bg-card-dark/50 overflow-hidden"
                        >
                          <InputGroup className="border-none shadow-none">
                            <InputGroupAddon className="bg-transparent border-r pl-0 px-1 w-10 border-border-dark text-text-dim">
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

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim">
                          Subdomain
                        </label>
                        <InputGroup className="bg-card-dark/50 border-border-dark rounded-lg opacity-70">
                          <InputGroupAddon className="bg-transparent border-r border-border-dark text-text-dim">
                            <Globe size={16} />
                          </InputGroupAddon>
                          <InputGroupInput
                            value={subdomain}
                            disabled
                            className="bg-transparent border-none text-white cursor-not-allowed"
                          />
                        </InputGroup>
                      </div>
                    </div>
                  </div>

                  {/* Network Section */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold font-heading text-white border-b border-[#25f478]/20 pb-1 inline-block">
                      Payment Network
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim">
                          Network
                        </label>
                        <Select
                          value={paymentNetwork}
                          onValueChange={handleChainChange}
                        >
                          <SelectTrigger className="bg-card-dark/50 border-border-dark text-white hover:border-[#25f478]/50 focus:ring-[#25f478]/20 transition-all">
                            <SelectValue placeholder="Select network" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0f0f11] border-border-dark text-white">
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

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim">
                          Token
                        </label>
                        <Select
                          value={defaultToken}
                          onValueChange={setDefaultToken}
                          disabled={availableTokens.length === 0}
                        >
                          <SelectTrigger className="bg-card-dark/50 border-border-dark text-white hover:border-[#25f478]/50 focus:ring-[#25f478]/20 transition-all">
                            <SelectValue
                              placeholder={
                                availableTokens.length === 0
                                  ? "No tokens"
                                  : "Select token"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0f0f11] border-border-dark text-white">
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
                  </div>

                  {/* Settlement Section */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold font-heading text-white border-b border-[#25f478]/20 pb-1 inline-block">
                      Settlement
                    </h3>

                    <div className="space-y-2 group">
                      <label
                        className="block text-xs font-semibold uppercase tracking-wider text-text-dim group-focus-within:text-[#25f478] transition-colors"
                        htmlFor="evm-address"
                      >
                        Receiver Address
                      </label>
                      <motion.div
                        animate={{
                          borderColor:
                            activeField === "receiver" ? "#25f478" : "#27272a",
                        }}
                        className="rounded-lg border bg-card-dark/50 overflow-hidden"
                      >
                        <InputGroup className="border-none shadow-none">
                          <InputGroupAddon className="bg-transparent border-r w-10 px-1 pl-0 border-border-dark text-text-dim">
                            <Wallet
                              size={14}
                              className={cn(
                                "transition-colors",
                                activeField === "receiver" && "text-[#25f478]"
                              )}
                            />
                          </InputGroupAddon>
                          <InputGroupInput
                            id="evm-address"
                            placeholder="0x..."
                            className="bg-transparent border-none text-white focus:ring-0 placeholder:text-[#52525b] text-xs font-mono"
                            value={evmAddress}
                            onChange={(e) => setEvmAddress(e.target.value)}
                            onFocus={() => setActiveField("receiver")}
                            onBlur={() => setActiveField(null)}
                          />
                        </InputGroup>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "integration" && (
                <motion.div
                  key="integration"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                    {(["node", "go", "rust", "python"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLang(lang)}
                        className={cn(
                          "px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wide transition-colors border",
                          activeLang === lang
                            ? "bg-[#25f478]/10 text-[#25f478] border-[#25f478]/20"
                            : "bg-transparent text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5"
                        )}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-text-dim mb-3">
                    Add this middleware to your backend to verify payments.
                  </p>
                  <CodeBlock
                    language={
                      activeLang === "python"
                        ? "python"
                        : activeLang === "go"
                        ? "go"
                        : activeLang === "rust"
                        ? "rust"
                        : "javascript"
                    }
                    filename={`middleware.${
                      activeLang === "python"
                        ? "py"
                        : activeLang === "go"
                        ? "go"
                        : activeLang === "rust"
                        ? "rs"
                        : "js"
                    }`}
                    code={serverSnippets[activeLang]}
                  />

                  <div className="border-t border-border-dark my-6"></div>

                  <h4 className="text-sm font-bold text-white mb-3">
                    Client Integration
                  </h4>
                  <p className="text-sm text-text-dim mb-3">
                    Use the <code className="text-[#25f478]">@x402/axios</code>{" "}
                    SDK to make paid requests.
                  </p>
                  <CodeBlock
                    language="javascript"
                    filename="client-example.js"
                    code={clientSnippet}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}

      <DialogFooter className="px-6 py-4 bg-[#0f0f11] border-t border-border-dark">
        <DialogClose asChild>
          <Button
            variant="ghost"
            disabled={isSaving}
            className="text-text-dim hover:text-white hover:bg-white/5"
          >
            Cancel
          </Button>
        </DialogClose>
        {activeTab === "config" && (
          <Button
            onClick={handleUpdateGateway}
            disabled={isSaving || isLoading}
            className="bg-[#25f478] text-black hover:bg-[#25f478]/90 font-bold shadow-[0_0_20px_-5px_rgba(37,244,120,0.5)] transition-all duration-300 hover:scale-105"
          >
            {isSaving ? (
              <>
                Saving...
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                Save Changes
                <Save size={16} className="ml-2" />
              </>
            )}
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
  );
};

export default GatewayDetailsModal;
