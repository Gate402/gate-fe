import React, { useState } from "react";
import {
  Link,
  ExternalLink,
  Key,
  AlertTriangle,
  ArrowRight,
  Server,
  Terminal,
} from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import { CopyButton } from "@/components/ui/shadcn-io/copy-button";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getNodeSnippet,
  getGoSnippet,
  getRustSnippet,
  getPythonSnippet,
  getClientSnippet,
} from "@/lib/code-examples";

const SuccessGateway: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [activeTab, setActiveTab] = useState<"server" | "client">("server");
  const [activeLang, setActiveLang] = useState<
    "node" | "go" | "rust" | "python"
  >("node");

  const gatewayDomain = import.meta.env.VITE_GATEWAY_DOMAIN || ".dummy.io";
  const gatewayUrl =
    data?.gatewayUrl ||
    (data?.subdomain
      ? `https://${data.subdomain}.${gatewayDomain}`
      : "https://alice-weather.gate402.pro");
  const secretToken =
    data?.secretToken || "sk_live_402_9d8f7a6b5c4e3d2a1f0e9d8c7b6a5f4e";

  const serverSnippets = {
    node: getNodeSnippet(secretToken),
    go: getGoSnippet(secretToken),
    rust: getRustSnippet(secretToken),
    python: getPythonSnippet(secretToken),
  };

  const clientSnippet = getClientSnippet(gatewayUrl);

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      ></div>
      <div className="w-full max-w-4xl relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif-custom tracking-tight mb-3">
            Gateway created successfully
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Your payment gateway is live. Secure your API and start accepting
            payments.
          </p>
        </div>

        <div className="bg-surface-dark border border-border-dark rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8 space-y-6">
            {/* Gateway Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                  Your Gateway URL
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-grow relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Link className="text-gray-600" size={16} />
                    </div>
                    <input
                      className="w-full pl-10 pr-12 py-2.5 bg-black/50 border border-border-dark rounded-lg text-xs font-mono text-gray-200 focus:ring-1 focus:ring-gray-600 focus:border-gray-600 transition-all"
                      readOnly
                      type="text"
                      value={gatewayUrl}
                    />
                    <CopyButton
                      variant={"secondary"}
                      content={gatewayUrl}
                      className="absolute inset-y-0 right-0 mr-1 my-1 h-7 w-7"
                    />
                  </div>
                  <a
                    className="p-2.5 text-gray-500 hover:text-white transition-colors border border-border-dark rounded-lg bg-black/50"
                    href={gatewayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in new tab"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider">
                    Secret Token
                  </label>
                  <span className="text-xs text-amber-500 flex items-center gap-1">
                    <AlertTriangle size={12} />
                    Save this securely.
                  </span>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="text-gray-600" size={16} />
                  </div>
                  <input
                    className="w-full pl-10 pr-12 py-2.5 bg-black/50 border border-border-dark rounded-lg text-xs font-mono text-gray-200 focus:ring-1 focus:ring-gray-600 focus:border-gray-600 transition-all"
                    readOnly
                    type="text"
                    value={secretToken}
                  />
                  <CopyButton
                    variant={"secondary"}
                    content={secretToken}
                    className="absolute inset-y-0 right-0 mr-1 my-1 h-7 w-7"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border-dark my-6"></div>

            {/* Documentation Tabs */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setActiveTab("server")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    activeTab === "server"
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  )}
                >
                  <Server size={16} />
                  1. Protect your API
                </button>
                <button
                  onClick={() => setActiveTab("client")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    activeTab === "client"
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  )}
                >
                  <Terminal size={16} />
                  2. Call from Client
                </button>
              </div>

              {activeTab === "server" && (
                <div className="animate-in fade-in duration-300">
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                    {(["node", "go", "rust", "python"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLang(lang)}
                        className={cn(
                          "px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wide transition-colors border",
                          activeLang === lang
                            ? "bg-card-dark/10 text-[#25f478] border-border-dark/20"
                            : "bg-transparent text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5"
                        )}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Add this middleware to your backend to verify that requests
                    have paid via the Gateway.
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
                </div>
              )}

              {activeTab === "client" && (
                <div className="animate-in fade-in duration-300">
                  <p className="text-sm text-gray-400 mb-3">
                    Use the <code className="text-[#25f478]">@x402/axios</code>{" "}
                    SDK to make paid requests effortlessly.
                  </p>
                  <CodeBlock
                    language="javascript"
                    filename="client-example.js"
                    code={clientSnippet}
                  />
                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-200">
                    <strong>Note:</strong> Ensure you have the necessary
                    packages installed:{" "}
                    <code className="bg-black/30 px-1 py-0.5 rounded ml-1">
                      npm i @x402/axios @x402/evm axios viem
                    </code>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-black/20 border-t border-border-dark p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Skip setup for now
            </Button>
            <Button onClick={() => navigate("/dashboard")}>
              Go to Dashboard
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SuccessGateway;
