import React, { useState, useEffect } from 'react';
import { Link, Lock, ArrowRight, Loader2, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { gatewaysApi } from '@/lib/gateways';
import { configApi } from '@/lib/config';
import { type ChainWithTokensResponse, type TokenResponse } from '@/types/config';
import { useAuth } from '@/context/AuthContext';

import { useNavigate } from 'react-router-dom';

const CreateGatewayModal: React.FC<{ setOpen: (open: boolean) => void }> = ({ setOpen }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Basic fields
  const [originUrl, setOriginUrl] = useState('');
  const [price, setPrice] = useState('');
  const [receiverAddress, setReceiverAddress] = useState(user?.evmAddress || user?.address || '');

  // Advanced fields
  const [subdomain, setSubdomain] = useState('');
  // const [customDomain, setCustomDomain] = useState('');
  const [paymentNetwork, setPaymentNetwork] = useState('');
  const [defaultToken, setDefaultToken] = useState('');
  const [chains, setChains] = useState<ChainWithTokensResponse[]>([]);
  const [availableTokens, setAvailableTokens] = useState<TokenResponse[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (user && !receiverAddress) {
      setReceiverAddress(user.evmAddress || user.address || '');
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
    const selectedChain = chains.find(c => c.id === chainId);
    if (selectedChain) {
      setAvailableTokens(selectedChain.tokens);
      if (selectedChain.tokens.length > 0) {
        setDefaultToken(selectedChain.tokens[0].id);
      } else {
        setDefaultToken('');
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
      // If subdomain is provided, we use the full create endpoint
      // Otherwise we use quick-create which auto-generates it
      if (subdomain) {
        response = await gatewaysApi.create({
          originUrl,
          pricePerRequest: price,
          evmAddress: receiverAddress,
          subdomain,
          // customDomain: customDomain || undefined,
          paymentScheme: "exact",
          paymentNetwork,
          defaultToken 
        }); 
      } else {
        response = await gatewaysApi.quickCreate({
          originUrl,
          pricePerRequest: Number(price),
          evmAddress: receiverAddress,
          defaultToken: defaultToken
        });
      }
      
      toast.success("Gateway created successfully!");
      setOpen(false);
      navigate('/gateway-created', { state: response });
    } catch (error: any) {
      console.error("Failed to create gateway:", error);
      toast.error(error.response?.data?.message || "Failed to create gateway. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="bg-background border-border-dark text-white max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-serif font-medium text-white tracking-tight">Create Gateway</DialogTitle>
        <DialogDescription className="mt-1 text-sm text-text-secondary">Configure your API endpoint for monetization.</DialogDescription>
      </DialogHeader>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300" htmlFor="origin-url">Origin URL</label>
          <InputGroup>
            <InputGroupAddon>
              <Link size={16}/>
            </InputGroupAddon>
            <InputGroupInput 
              id="origin-url" 
              placeholder="https://api.yourdomain.com/v1" 
              type="url" 
              value={originUrl}
              onChange={(e) => setOriginUrl(e.target.value)}
            />
          </InputGroup>
          <p className="text-xs text-gray-600">Requests will be proxied to this endpoint after payment verification.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300" htmlFor="price">Price per request</label>
            <InputGroup>
                <InputGroupAddon>
                    $
                </InputGroupAddon>
                <InputGroupInput 
                  id="price" 
                  placeholder="0.002" 
                  step="0.0001" 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
            </InputGroup>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Currency</label>
            <div className="relative">
              <div className="w-full py-2.5 px-3 border border-border-dark rounded-lg bg-[#262626] text-gray-400 text-sm font-mono cursor-not-allowed flex items-center justify-between">
                <span>USD</span>
                <Lock size={16} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300" htmlFor="receiver-address">Receiver Address</label>
          <InputGroup>
            <InputGroupAddon>
              <Lock size={16}/>
            </InputGroupAddon>
            <InputGroupInput 
              id="receiver-address" 
              placeholder="0x..." 
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
            />
          </InputGroup>
          <p className="text-xs text-gray-600">The wallet address that will receive the payments on the selected network.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Payment Network</label>
             <Select value={paymentNetwork} onValueChange={handleChainChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                {chains.map((chain) => (
                  <SelectItem key={chain.id} value={chain.id}>{chain.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Payment Token</label>
             <Select value={defaultToken} onValueChange={setDefaultToken} disabled={availableTokens.length === 0}>
              <SelectTrigger>
                <SelectValue placeholder={availableTokens.length === 0 ? "No tokens" : "Select token"} />
              </SelectTrigger>
              <SelectContent>
                {availableTokens.map((token) => (
                  <SelectItem key={token.id} value={token.id}>{token.symbol}</SelectItem>
                ))}
                {availableTokens.length === 0 && <SelectItem value="no-tokens" disabled>No tokens</SelectItem>}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <button 
            type="button"
            className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? <ChevronUp size={16} className="mr-1" /> : <ChevronDown size={16} className="mr-1" />}
            Advanced Options
          </button>
        </div>

        {showAdvanced && (
          <div className="space-y-6 pt-2 border-t border-border-dark/50 animate-in slide-in-from-top-2 fade-in duration-200">
             <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300" htmlFor="subdomain">
                  Subdomain <span className="text-xs text-gray-500">(Optional)</span>
                </label>
                <InputGroup>
                  <InputGroupAddon>
                    <Globe size={16}/>
                  </InputGroupAddon>
                  <InputGroupInput 
                    id="subdomain" 
                    placeholder="my-api" 
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value)}
                  />
                  <div className="flex items-center px-3 bg-[#262626] border-l border-border-dark text-gray-400 text-sm">
                    {import.meta.env.VITE_GATEWAY_DOMAIN || ".gate402.pro"}
                  </div>
                </InputGroup>
                <p className="text-xs text-gray-600">Leave blank to auto-generate.</p>
             </div>

             {/* <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300" htmlFor="custom-domain">
                  Custom Domain <span className="text-xs text-gray-500">(Optional)</span>
                </label>
                <InputGroup>
                  <InputGroupAddon>
                    <Globe size={16}/>
                  </InputGroupAddon>
                  <InputGroupInput 
                    id="custom-domain" 
                    placeholder="api.example.com" 
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                  />
                </InputGroup>
             </div> */}
          </div>
        )}
      </div>
      <DialogFooter className="px-6 py-4 bg-[#0f0f0f] border-t border-border-dark rounded-b-xl">
        <DialogClose asChild>
            <Button variant="ghost" disabled={isLoading}>Cancel</Button>
        </DialogClose>
        <Button variant={"secondary"} onClick={handleCreateGateway} disabled={isLoading}>
          {isLoading ? (
            <>
              Creating...
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