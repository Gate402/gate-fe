import React, { useEffect, useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Link, Loader2, Globe, Save } from 'lucide-react';
import { toast } from "sonner";
import { gatewaysApi } from '@/lib/gateways';
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

interface GatewayDetailsModalProps {
  gatewayId: string | null;
  setOpen: (open: boolean) => void;
  onGatewayUpdated: () => void;
}

const GatewayDetailsModal: React.FC<GatewayDetailsModalProps> = ({ gatewayId, setOpen, onGatewayUpdated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form fields
  const [originUrl, setOriginUrl] = useState('');
  const [price, setPrice] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [paymentScheme, setPaymentScheme] = useState('flexible');
  const [paymentNetwork, setPaymentNetwork] = useState('base');
  const [status, setStatus] = useState('active');
  const [evmAddress, setEvmAddress] = useState('');

  useEffect(() => {
    if (gatewayId) {
      fetchGatewayDetails(gatewayId);
    }
  }, [gatewayId]);

  const fetchGatewayDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await gatewaysApi.getById(id);
      setOriginUrl(data.originUrl || '');
      setPrice(data.defaultPricePerRequest?.toString() || '');
      setSubdomain(data.subdomain || '');
      setCustomDomain(data.customDomain || '');
      setPaymentScheme(data.paymentScheme || 'flexible');
      setPaymentNetwork(data.paymentNetwork || 'base');
      setStatus(data.status || 'active');
      setEvmAddress(data.evmAddress || '');
    } catch (error) {
      console.error("Failed to fetch gateway details:", error);
      toast.error("Failed to load gateway details.");
      setOpen(false);
    } finally {
      setIsLoading(false);
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

    setIsSaving(true);
    try {
      await gatewaysApi.update(gatewayId, {
        originUrl,
        defaultPricePerRequest: Number(price),
        customDomain: customDomain || undefined,
        paymentScheme,
        paymentNetwork,
        status,
        evmAddress
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

  return (
    <DialogContent className="bg-background border-border-dark text-white max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-serif font-medium text-white tracking-tight">Gateway Details</DialogTitle>
        <DialogDescription className="mt-1 text-sm text-text-secondary">View and edit your gateway configuration.</DialogDescription>
      </DialogHeader>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="p-6 space-y-6">
           <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Gateway Status</label>
            <NativeSelect value={status} onChange={(e) => setStatus(e.target.value)}>
              <NativeSelectOption value="active">Active</NativeSelectOption>
              <NativeSelectOption value="paused">Paused</NativeSelectOption>
            </NativeSelect>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300" htmlFor="origin-url">Origin URL</label>
            <InputGroup>
              <InputGroupAddon>
                <Link size={16}/>
              </InputGroupAddon>
              <InputGroupInput 
                id="origin-url" 
                type="url" 
                value={originUrl}
                onChange={(e) => setOriginUrl(e.target.value)}
              />
            </InputGroup>
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
                    step="0.0001" 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
              </InputGroup>
            </div>
             <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Subdomain</label>
               <InputGroup>
                  <InputGroupAddon>
                    <Globe size={16}/>
                  </InputGroupAddon>
                  <InputGroupInput 
                    id="subdomain" 
                    value={subdomain}
                    disabled
                    className="cursor-not-allowed opacity-70"
                  />
                </InputGroup>
            </div>
          </div>

           <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300" htmlFor="custom-domain">
                Custom Domain
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
        </div>
      )}

      <DialogFooter className="px-6 py-4 bg-[#0f0f0f] border-t border-border-dark rounded-b-xl">
        <DialogClose asChild>
            <Button variant="ghost" disabled={isSaving}>Cancel</Button>
        </DialogClose>
        <Button variant={"secondary"} onClick={handleUpdateGateway} disabled={isSaving || isLoading}>
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
      </DialogFooter>
    </DialogContent>
  );
};

export default GatewayDetailsModal;
