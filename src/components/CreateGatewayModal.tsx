import React from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Link, Lock, ArrowRight } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const CreateGatewayModal: React.FC<{ setOpen: (open: boolean) => void }> = ({ setOpen }) => {
  const navigate = useNavigate();

  const handleCreateGateway = () => {
    // Here you would normally handle form submission
    // For now, we'll just navigate to the success page
    navigate('/gateway-created');
    setOpen(false);
  };

  return (
    <DialogContent className="bg-background border-border-dark text-white">
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
            <InputGroupInput id="origin-url" placeholder="https://api.yourdomain.com/v1" type="url" />
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
                <InputGroupInput id="price" placeholder="0.002" step="0.0001" type="number" />
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
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">Accepted Networks</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="relative flex items-center p-3 rounded-lg border border-border-dark cursor-pointer hover:bg-[#1a1a1a] transition-colors group">
              <input type="checkbox" defaultChecked className="h-4 w-4 text-primary border-gray-600 rounded focus:ring-primary focus:ring-offset-0 bg-[#0f0f0f]" name="network" value="solana" />
              <div className="ml-3 flex items-center">
                <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-[#9945FF] to-[#14F195] flex items-center justify-center mr-2">
                    <svg fill="none" height="12" viewBox="0 0 24 24" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M4 16L20 16" stroke="white" stroke-linecap="round" stroke-width="4"></path><path d="M4 8L20 8" stroke="white" stroke-linecap="round" stroke-width="4"></path></svg>
                </div>
                <span className="text-sm font-medium text-white group-hover:text-gray-100">Solana</span>
              </div>
            </label>
            <label className="relative flex items-center p-3 rounded-lg border border-border-dark cursor-pointer hover:bg-[#1a1a1a] transition-colors group">
              <input type="checkbox" className="h-4 w-4 text-primary border-gray-600 rounded focus:ring-primary focus:ring-offset-0 bg-[#0f0f0f]" name="network" value="base"/>
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
      <DialogFooter className="px-6 py-4 bg-[#0f0f0f] border-t border-border-dark rounded-b-xl">
        <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button variant={"secondary"} onClick={handleCreateGateway}>
          Create Gateway
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};


export default CreateGatewayModal;
