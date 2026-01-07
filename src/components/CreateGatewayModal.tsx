import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Link, Lock, ArrowRight, Loader2, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from "sonner";
import { gatewaysApi } from '@/lib/gateways';
import { useAuth } from '@/context/AuthContext';
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Checkbox } from "@/components/ui/checkbox";

import { useNavigate } from 'react-router-dom';

const CreateGatewayModal: React.FC<{ setOpen: (open: boolean) => void }> = ({ setOpen }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Basic fields
  const [originUrl, setOriginUrl] = useState('');
  const [price, setPrice] = useState('');

  // Advanced fields
  const [subdomain, setSubdomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [paymentScheme, setPaymentScheme] = useState('flexible');
  const [paymentNetwork, setPaymentNetwork] = useState('base');
  const [acceptedNetworks, setAcceptedNetworks] = useState<string[]>(['solana', 'base']);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleNetworkChange = (network: string, checked: boolean) => {
    if (checked) {
      setAcceptedNetworks([...acceptedNetworks, network]);
    } else {
      setAcceptedNetworks(acceptedNetworks.filter(n => n !== network));
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
    
    const evmAddress = user?.evmAddress || user?.address;
    
    if (!evmAddress) {
      toast.error("Wallet address not found. Please reconnect your wallet.");
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
          pricePerRequest: Number(price),
          evmAddress,
          subdomain,
          customDomain: customDomain || undefined,
          paymentScheme,
          paymentNetwork,
          acceptedNetworks
        });
      } else {
        response = await gatewaysApi.quickCreate({
          originUrl,
          pricePerRequest: Number(price),
          evmAddress
        });
      }
      
      toast.success("Gateway created successfully!");
      setOpen(false);
      navigate('/gateway-created', { state: response });
    } catch (error: any) {
      console.error("Failed to create gateway:", error);
      toast.error(error.response?.data?.error || "Failed to create gateway. Please try again.");
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
                    .x402.io
                  </div>
                </InputGroup>
                <p className="text-xs text-gray-600">Leave blank to auto-generate.</p>
             </div>

             <div className="space-y-2">
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
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Payment Scheme</label>
                  <NativeSelect value={paymentScheme} onChange={(e) => setPaymentScheme(e.target.value)}>
                    <NativeSelectOption value="flexible">Flexible</NativeSelectOption>
                    <NativeSelectOption value="exact">Exact</NativeSelectOption>
                  </NativeSelect>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Primary Network</label>
                   <NativeSelect value={paymentNetwork} onChange={(e) => setPaymentNetwork(e.target.value)}>
                    <NativeSelectOption value="base">Base</NativeSelectOption>
                    <NativeSelectOption value="solana">Solana</NativeSelectOption>
                  </NativeSelect>
                </div>
             </div>

             <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">Accepted Networks</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="relative flex items-center p-3 rounded-lg border border-border-dark cursor-pointer hover:bg-[#1a1a1a] transition-colors group">
                  <Checkbox 
                    checked={acceptedNetworks.includes('solana')}
                    onCheckedChange={(checked) => handleNetworkChange('solana', checked as boolean)}
                    className="border-gray-600 bg-[#0f0f0f]"
                  />
                  <div className="ml-3 flex items-center">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-[#9945FF] to-[#14F195] flex items-center justify-center mr-2">
                        <svg fill="none" height="12" viewBox="0 0 24 24" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M4 16L20 16" stroke="white" stroke-linecap="round" stroke-width="4"></path><path d="M4 8L20 8" stroke="white" stroke-linecap="round" stroke-width="4"></path></svg>
                    </div>
                    <span className="text-sm font-medium text-white group-hover:text-gray-100">Solana</span>
                  </div>
                </label>
                <label className="relative flex items-center p-3 rounded-lg border border-border-dark cursor-pointer hover:bg-[#1a1a1a] transition-colors group">
                  <Checkbox 
                     checked={acceptedNetworks.includes('base')}
                     onCheckedChange={(checked) => handleNetworkChange('base', checked as boolean)}
                     className="border-gray-600 bg-[#0f0f0f]"
                  />
                  <div className="ml-3 flex items-center">
                    <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                      <div className="w-3 h-3 bg-white rounded-full border-2 border-blue-600"></div>
                    </div>
                    <span className="text-sm font-medium text-white group-hover:text-gray-100">Base</span>
                  </div>
                </label>
              </div>
            </div>
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