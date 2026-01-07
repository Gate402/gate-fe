import React from 'react';
import { Link, ExternalLink, Key, AlertTriangle, ArrowRight } from 'lucide-react';
import { CodeBlock } from "@/components/ui/code-block";
import { CopyButton } from '@/components/ui/shadcn-io/copy-button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SuccessGateway: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    const gatewayDomain = import.meta.env.VITE_GATEWAY_DOMAIN || ".dummy.io";
    const gatewayUrl = data?.gatewayUrl || (data?.subdomain ? `https://${data.subdomain}${gatewayDomain}` : "https://alice-weather.gate402.io");
    const secretToken = data?.secretToken || "sk_live_402_9d8f7a6b5c4e3d2a1f0e9d8c7b6a5f4e";
    const price = data?.defaultPricePerRequest || 0.05;

    const codeSnippet = `const x402 = require('x402-node');
app.use(
  "/weather", 
  x402.middleware({
    gateway: "${gatewayUrl}",
    price: { amount: ${price}, currency: "USD" }
  })
);`;
    
  return (
    <main className="flex-grow flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>
      <div className="w-full max-w-3xl relative z-10">
        <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-serif-custom tracking-tight mb-3">Gateway created successfully</h1>
            <p className="text-gray-400 max-w-lg mx-auto">
                Your payment gateway is live and ready to accept internet-native payments.
            </p>
        </div>
        <div className="bg-surface-dark border border-border-dark rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 space-y-8">
            <div>
              <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                Your Gateway URL
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-grow relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Link className="text-gray-600" size={16}/>
                  </div>
                  <input className="w-full pl-10 pr-12 py-3 bg-black/50 border border-border-dark rounded-lg text-sm font-mono text-gray-200 focus:ring-1 focus:ring-gray-600 focus:border-gray-600 transition-all" readOnly type="text" value={gatewayUrl}/>
                  <CopyButton variant={"secondary"} content={gatewayUrl} className="absolute inset-y-0 right-0 mr-2 my-2" />
                </div>
                <a className="p-3 text-gray-500 hover:text-white transition-colors border border-border-dark rounded-lg bg-black/50" href={gatewayUrl} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                  <ExternalLink size={20}/>
                </a>
              </div>
            </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider">
                    Secret Token
                  </label>
                  <span className="text-xs text-amber-500 flex items-center gap-1">
                    <AlertTriangle size={14}/>
                    Copy this now, you won't see it again.
                  </span>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="text-gray-600" size={16}/>
                  </div>
                  <input className="w-full pl-10 pr-12 py-3 bg-black/50 border border-border-dark rounded-lg text-sm font-mono text-gray-200 focus:ring-1 focus:ring-gray-600 focus:border-gray-600 transition-all" readOnly type="text" value={secretToken}/>
                  <CopyButton variant={"secondary"} content={secretToken} className="absolute inset-y-0 right-0 mr-2 my-2" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-medium mb-4 flex items-center gap-2">
                  Next steps: Add middleware to your API
                </h3>
                <CodeBlock
                  language="js"
                  filename="endpoint-call.js"
                  code={codeSnippet}
                />
                <p className="mt-3 text-sm text-gray-400">
                  Check out the <a className="text-white underline underline-offset-2 hover:opacity-80" href="#">Quickstart Guide</a> for Python, Go, and Rust examples.
                </p>
              </div>
          </div>
          <div className="bg-black/20 border-t border-border-dark p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              Skip setup for now
            </Button>
            <Button onClick={() => navigate('/dashboard')}>
              Go to Dashboard
              <ArrowRight size={16} className="ml-2"/>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SuccessGateway;
