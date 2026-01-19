import { useState, useCallback, useRef, useEffect } from "react";
import {
  WagmiProvider,
  useAccount,
  useConnect,
  useDisconnect,
  useWalletClient,
} from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sandboxConfig } from "@/config/sandboxWagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Wallet,
  Key,
  Play,
  AlertTriangle,
  Eye,
  EyeOff,
  X,
  Loader2,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { privateKeyToAccount, type PrivateKeyAccount } from "viem/accounts";
import { x402Client } from "@x402/core/client";
import {
  decodePaymentRequiredHeader,
  decodePaymentResponseHeader,
  encodePaymentSignatureHeader,
} from "@x402/core/http";
import { ExactEvmScheme } from "@x402/evm/exact/client";
import type { PaymentRequirements } from "@x402/core/types";
import type { WalletClient } from "viem";

const GATEWAY_DOMAIN = import.meta.env.VITE_GATEWAY_DOMAIN || "gate402.pro";

// Create a separate QueryClient for the sandbox
const sandboxQueryClient = new QueryClient();

type LogLevel = "info" | "success" | "error" | "warning" | "step" | "data";

interface LogEntry {
  id: number;
  timestamp: Date;
  level: LogLevel;
  message: string;
  data?: string;
}

// Terminal Log Component
function TerminalLog({
  logs,
  isRunning,
}: {
  logs: LogEntry[];
  isRunning: boolean;
}) {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const getLevelStyles = (level: LogLevel) => {
    switch (level) {
      case "success":
        return "text-emerald-400";
      case "error":
        return "text-red-400";
      case "warning":
        return "text-yellow-400";
      case "step":
        return "text-primary font-bold";
      case "data":
        return "text-zinc-400";
      default:
        return "text-zinc-300";
    }
  };

  const getLevelIcon = (level: LogLevel) => {
    switch (level) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "step":
        return "📤";
      case "data":
        return "📋";
      default:
        return "ℹ️";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div
      ref={terminalRef}
      className="bg-zinc-950 border border-border-dark rounded-lg font-mono text-sm overflow-auto h-[500px] p-4"
    >
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border-dark">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>
        <span className="text-zinc-500 text-xs ml-2">
          x402 Payment Flow Test
        </span>
        {isRunning && (
          <div className="ml-auto flex items-center gap-2 text-primary text-xs">
            <Loader2 className="w-3 h-3 animate-spin" />
            Running...
          </div>
        )}
      </div>

      {logs.length === 0 ? (
        <div className="text-zinc-600 text-center py-8">
          Click "Start Test" to begin the x402 payment flow test
        </div>
      ) : (
        <div className="space-y-1">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2">
              <span className="text-zinc-600 shrink-0">
                [{formatTime(log.timestamp)}]
              </span>
              <span className="shrink-0">{getLevelIcon(log.level)}</span>
              <div className="flex-1 min-w-0">
                <span className={getLevelStyles(log.level)}>{log.message}</span>
                {log.data && (
                  <pre className="mt-1 p-2 bg-zinc-900 rounded text-xs text-zinc-400 overflow-x-auto whitespace-pre-wrap break-all">
                    {log.data}
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Wallet Connect Button for Sandbox
function SandboxWalletConnect({
  onConnected,
}: {
  onConnected: (address: string) => void;
}) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (isConnected && address) {
      onConnected(address);
    }
  }, [isConnected, address, onConnected]);

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/30 rounded-lg">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span className="font-mono text-sm text-white">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => disconnect()}
          className="text-zinc-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {connectors.map((connector) => (
        <Button
          key={connector.uid}
          variant="outline"
          size="sm"
          onClick={() => connect({ connector })}
          disabled={isPending}
          className="text-zinc-300 border-border-dark hover:border-primary hover:text-white"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Wallet className="w-4 h-4 mr-2" />
          )}
          {connector.name}
        </Button>
      ))}
    </div>
  );
}

// Main Sandbox Content Component
function SandboxContent() {
  const [signingMode, setSigningMode] = useState<"wallet" | "privateKey">(
    "wallet",
  );
  const [privateKey, setPrivateKey] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [gatewayUrl, setGatewayUrl] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const logIdRef = useRef(0);

  const { data: walletClient } = useWalletClient();

  const addLog = useCallback(
    (level: LogLevel, message: string, data?: string) => {
      setLogs((prev) => [
        ...prev,
        {
          id: ++logIdRef.current,
          timestamp: new Date(),
          level,
          message,
          data,
        },
      ]);
    },
    [],
  );

  const clearLogs = useCallback(() => {
    setLogs([]);
    logIdRef.current = 0;
  }, []);

  const validateGatewayUrl = useCallback(
    (url: string): { valid: boolean; error?: string } => {
      if (!url.trim()) {
        return { valid: false, error: "Gateway URL is required" };
      }

      try {
        const parsed = new URL(url);
        if (!parsed.hostname.endsWith(GATEWAY_DOMAIN)) {
          return {
            valid: false,
            error: `URL must be on the ${GATEWAY_DOMAIN} domain`,
          };
        }
        return { valid: true };
      } catch {
        return { valid: false, error: "Invalid URL format" };
      }
    },
    [],
  );

  const validatePrivateKey = useCallback(
    (key: string): { valid: boolean; error?: string } => {
      if (!key.trim()) {
        return { valid: false, error: "Private key is required" };
      }

      const normalized = key.startsWith("0x") ? key : `0x${key}`;
      if (!/^0x[a-fA-F0-9]{64}$/.test(normalized)) {
        return {
          valid: false,
          error: "Invalid private key format (must be 64 hex characters)",
        };
      }

      return { valid: true };
    },
    [],
  );

  // Select payment option (picks first available)
  const selectPayment = useCallback(
    (_version: number, requirements: PaymentRequirements[]) => {
      const selected = requirements[0];
      addLog(
        "info",
        `Selected payment: ${selected.network} / ${selected.scheme} - ${selected.amount}`,
      );
      return selected;
    },
    [addLog],
  );

  const runPaymentFlow = useCallback(async () => {
    clearLogs();
    setIsRunning(true);

    try {
      // Validate inputs
      const urlValidation = validateGatewayUrl(gatewayUrl);
      if (!urlValidation.valid) {
        addLog("error", urlValidation.error!);
        setIsRunning(false);
        return;
      }

      // Prepare signer
      let signer: PrivateKeyAccount | WalletClient;

      if (signingMode === "privateKey") {
        const keyValidation = validatePrivateKey(privateKey);
        if (!keyValidation.valid) {
          addLog("error", keyValidation.error!);
          setIsRunning(false);
          return;
        }
        const normalized = privateKey.startsWith("0x")
          ? (privateKey as `0x${string}`)
          : (`0x${privateKey}` as `0x${string}`);
        signer = privateKeyToAccount(normalized);
        addLog("success", `Using private key signer: ${signer.address}`);
      } else {
        if (!walletClient) {
          addLog(
            "error",
            "Wallet not connected. Please connect your wallet first.",
          );
          setIsRunning(false);
          return;
        }
        signer = walletClient;
        addLog("success", `Using connected wallet: ${connectedAddress}`);
      }

      // Create x402 client with EVM scheme
      addLog("info", "Creating x402 client with EVM scheme...");
      const client = new x402Client(selectPayment).register(
        "eip155:*",
        new ExactEvmScheme(signer as PrivateKeyAccount),
      );

      addLog("step", `Step 1: Making initial request to ${gatewayUrl}`);
      addLog("info", "Sending request without payment signature...");

      // Step 1: Initial request (should get 402)
      let response;
      try {
        console.log({ gatewayUrl });
        // Use axios with validateStatus to accept 402 and 200
        response = await axios.get(gatewayUrl);
        console.log("Axios request succeeded, status:", response.status);
      } catch (err) {
        console.log("Axios error caught:", err);
        console.log({ isError: JSON.stringify(err) });

        // Handle 402 if it was thrown despite validateStatus
        if (
          axios.isAxiosError(err) &&
          err.response &&
          err.response.status === 402
        ) {
          console.log("Recovered 402 response from error");
          response = err.response;
        } else {
          const errorMessage =
            err instanceof AxiosError ? err.message : String(err);
          addLog("error", `Network error: ${errorMessage}`);

          if (axios.isAxiosError(err) && !err.response) {
            addLog(
              "warning",
              "❌ Request failed with no response. This usually indicates a CORS error. The browser blocks the response if Access-Control-Allow-Origin is missing, even if the Network tab shows 402.",
            );
          }

          setIsRunning(false);
          return;
        }
      }

      addLog(
        response.status === 402 ? "success" : "warning",
        `Response: ${response.status} ${response.statusText}`,
      );

      // Log response body if not 402
      if (response.status !== 402) {
        addLog("error", "Expected 402 Payment Required status");
        if (response.data) {
          addLog(
            "data",
            "Response body:",
            typeof response.data === "string"
              ? response.data
              : JSON.stringify(response.data, null, 2),
          );
        }
        setIsRunning(false);
        return;
      }

      // Step 2: Decode payment requirements
      addLog(
        "step",
        "Step 2: Decoding payment requirements from PAYMENT-REQUIRED header",
      );

      // Axios keys are lowercase
      const paymentRequiredHeader =
        response.headers["payment-required"] ||
        response.headers["PAYMENT-REQUIRED"];

      if (!paymentRequiredHeader) {
        addLog("error", "Missing PAYMENT-REQUIRED header in 402 response");
        setIsRunning(false);
        return;
      }

      const headerValue = Array.isArray(paymentRequiredHeader)
        ? paymentRequiredHeader[0]
        : paymentRequiredHeader;

      addLog("data", "PAYMENT-REQUIRED header:", headerValue);

      let paymentRequired: ReturnType<typeof decodePaymentRequiredHeader>;
      try {
        paymentRequired = decodePaymentRequiredHeader(headerValue);
      } catch (err) {
        addLog(
          "error",
          `Failed to decode header: ${err instanceof Error ? err.message : String(err)}`,
        );
        setIsRunning(false);
        return;
      }

      const requirements: PaymentRequirements[] = Array.isArray(
        paymentRequired.accepts,
      )
        ? paymentRequired.accepts
        : [paymentRequired.accepts];

      addLog("success", `Resource: ${paymentRequired.resource.url}`);
      addLog("info", `Payment options available: ${requirements.length}`);

      requirements.forEach((req, i) => {
        addLog(
          "data",
          `  Option ${i + 1}:`,
          JSON.stringify(
            {
              network: req.network,
              scheme: req.scheme,
              amount: req.amount,
            },
            null,
            2,
          ),
        );
      });

      // Step 3: Create payment signature
      addLog("step", "Step 3: Creating payment signature...");

      let paymentPayload: Awaited<
        ReturnType<typeof client.createPaymentPayload>
      >;
      try {
        paymentPayload = await client.createPaymentPayload(paymentRequired);
      } catch (err) {
        addLog(
          "error",
          `Failed to create payment: ${err instanceof Error ? err.message : String(err)}`,
        );
        setIsRunning(false);
        return;
      }

      const paymentHeader = encodePaymentSignatureHeader(paymentPayload);
      addLog("success", "Payment signature created successfully");
      addLog("data", "PAYMENT-SIGNATURE header:", paymentHeader);

      // Step 4: Retry with payment
      addLog(
        "step",
        "Step 4: Retrying request with PAYMENT-SIGNATURE header...",
      );

      try {
        response = await axios.get(gatewayUrl, {
          headers: {
            "PAYMENT-SIGNATURE": paymentHeader,
          },
          validateStatus: (status) => status === 200,
        });
      } catch (err) {
        // Handle 200 if it was thrown despite validateStatus
        if (
          axios.isAxiosError(err) &&
          err.response &&
          err.response.status === 200
        ) {
          console.log("Recovered 200 response from error");
          response = err.response;
        } else {
          const errorMessage =
            err instanceof AxiosError ? err.message : String(err);
          addLog("error", `Network error on retry: ${errorMessage}`);
          // If it's a 4xx/5xx error that axios threw, we can still try to read response
          if (axios.isAxiosError(err) && err.response) {
            addLog(
              "data",
              "Response:",
              `${err.response.status} ${err.response.statusText}`,
            );
            if (err.response.data) {
              addLog(
                "data",
                "Body:",
                typeof err.response.data === "string"
                  ? err.response.data
                  : JSON.stringify(err.response.data, null, 2),
              );
            }
          }
          setIsRunning(false);
          return;
        }
      }

      addLog(
        response.status === 200 ? "success" : "error",
        `Response: ${response.status} ${response.statusText}`,
      );

      if (response.status !== 200) {
        addLog("error", "Payment verification failed");
        if (response.data) {
          addLog(
            "data",
            "Response body:",
            typeof response.data === "string"
              ? response.data
              : JSON.stringify(response.data, null, 2),
          );
        }
        setIsRunning(false);
        return;
      }

      // Step 5: Success!
      addLog("step", "Step 5: Payment successful!");

      try {
        const jsonBody =
          typeof response.data === "string"
            ? JSON.parse(response.data)
            : response.data;
        addLog("success", "Response body:", JSON.stringify(jsonBody, null, 2));
      } catch {
        addLog("success", "Response body:", String(response.data));
      }

      // Check for settlement header
      const settlementHeader =
        response.headers["payment-response"] ||
        response.headers["PAYMENT-RESPONSE"];

      if (settlementHeader) {
        const settlementVal = Array.isArray(settlementHeader)
          ? settlementHeader[0]
          : settlementHeader;
        const settlement = decodePaymentResponseHeader(settlementVal);
        addLog(
          "success",
          "Settlement details:",
          JSON.stringify(
            {
              transaction: settlement.transaction,
              network: settlement.network,
              payer: settlement.payer,
            },
            null,
            2,
          ),
        );
      } else {
        addLog(
          "warning",
          "No PAYMENT-RESPONSE header (settlement may be pending)",
        );
      }

      addLog("success", "🎉 Test completed successfully!");
    } catch (err) {
      addLog(
        "error",
        `Unexpected error: ${err instanceof Error ? err.message : String(err)}`,
      );
    } finally {
      setIsRunning(false);
    }
  }, [
    gatewayUrl,
    signingMode,
    privateKey,
    walletClient,
    connectedAddress,
    addLog,
    clearLogs,
    validateGatewayUrl,
    validatePrivateKey,
    selectPayment,
  ]);

  const isFormValid = useCallback(() => {
    const urlValid = validateGatewayUrl(gatewayUrl).valid;
    if (signingMode === "privateKey") {
      return urlValid && validatePrivateKey(privateKey).valid;
    }
    return urlValid && !!walletClient;
  }, [
    gatewayUrl,
    signingMode,
    privateKey,
    walletClient,
    validateGatewayUrl,
    validatePrivateKey,
  ]);

  return (
    <div className="layout-content-container flex flex-col w-full flex-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-6 px-4 py-4 items-start md:items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
            Gateway Sandbox
          </h1>
          <p className="text-text-dim text-sm sm:text-base font-normal leading-normal max-w-2xl">
            Test the x402 payment flow step-by-step. Make requests to your
            gateway and observe the payment signature handshake.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        {/* Configuration Panel */}
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border-dark bg-surface-dark/20 p-6">
            <h2 className="text-white text-lg font-semibold mb-6">
              Configuration
            </h2>

            {/* Signing Mode Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Signing Method
                </label>
                <Select
                  value={signingMode}
                  onValueChange={(v) =>
                    setSigningMode(v as "wallet" | "privateKey")
                  }
                >
                  <SelectTrigger className="bg-zinc-900 border-border-dark text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-border-dark">
                    <SelectItem
                      value="wallet"
                      className="text-white hover:bg-zinc-800"
                    >
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4" />
                        Connect Wallet
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="privateKey"
                      className="text-white hover:bg-zinc-800"
                    >
                      <div className="flex items-center gap-2">
                        <Key className="w-4 h-4" />
                        Private Key
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Wallet Connection or Private Key Input */}
              {signingMode === "wallet" ? (
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Sandbox Wallet
                  </label>
                  <SandboxWalletConnect onConnected={setConnectedAddress} />
                  <p className="text-xs text-zinc-500 mt-2">
                    This wallet connection is isolated from the main app
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Private Key
                  </label>
                  <div className="relative">
                    <Input
                      type={showPrivateKey ? "text" : "password"}
                      value={privateKey}
                      onChange={(e) => setPrivateKey(e.target.value)}
                      placeholder="0x..."
                      className="bg-zinc-900 border-border-dark text-white font-mono pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                    >
                      {showPrivateKey ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-start gap-2 mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-500/90">
                      <strong>Security Warning:</strong> Never enter your main
                      wallet's private key. Use a test wallet with minimal funds
                      for sandbox testing.
                    </p>
                  </div>
                </div>
              )}

              {/* Gateway URL Input */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Gateway URL
                </label>
                <Input
                  type="url"
                  value={gatewayUrl}
                  onChange={(e) => setGatewayUrl(e.target.value)}
                  placeholder={`https://your-gateway.${GATEWAY_DOMAIN}/path`}
                  className="bg-zinc-900 border-border-dark text-white font-mono"
                />
                <p className="text-xs text-zinc-500 mt-2">
                  Must be a valid URL on the{" "}
                  <code className="text-primary">{GATEWAY_DOMAIN}</code> domain
                </p>
              </div>

              {/* Submit Button */}
              <Button
                onClick={runPaymentFlow}
                disabled={!isFormValid() || isRunning}
                className="w-full mt-2"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Running Test...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Test
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Flow Summary */}
          <div className="rounded-xl border border-border-dark bg-surface-dark/20 p-6">
            <h2 className="text-white text-lg font-semibold mb-4">
              Payment Flow
            </h2>
            <div className="space-y-3">
              {[
                {
                  step: 1,
                  icon: Clock,
                  label: "Request resource without payment",
                  status: "Returns 402 Payment Required",
                },
                {
                  step: 2,
                  icon: Key,
                  label: "Decode PAYMENT-REQUIRED header",
                  status: "Extract payment options",
                },
                {
                  step: 3,
                  icon: Wallet,
                  label: "Create payment signature",
                  status: "Sign with wallet/key",
                },
                {
                  step: 4,
                  icon: Play,
                  label: "Retry with PAYMENT-SIGNATURE",
                  status: "Include signature header",
                },
                {
                  step: 5,
                  icon: CheckCircle2,
                  label: "Receive response",
                  status: "Returns 200 OK",
                },
              ].map(({ step, icon: Icon, label, status }) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 border border-border-dark flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-zinc-400">
                      {step}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-zinc-500" />
                      <span className="text-sm text-white">{label}</span>
                    </div>
                    <span className="text-xs text-zinc-500">{status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-lg font-semibold">Output Log</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearLogs}
              disabled={logs.length === 0 || isRunning}
              className="text-zinc-400 hover:text-white"
            >
              Clear
            </Button>
          </div>
          <TerminalLog logs={logs} isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
}

// Wrapper component with separate providers
export default function GatewaySandbox() {
  return (
    <WagmiProvider config={sandboxConfig}>
      <QueryClientProvider client={sandboxQueryClient}>
        <SandboxContent />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
