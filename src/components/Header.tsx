import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight, Plus } from 'lucide-react';
import { Status, StatusIndicator, StatusLabel } from '@/components/ui/shadcn-io/status';
import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateGatewayModal from "./CreateGatewayModal";

const Header: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header className="sticky top-0 z-20 bg-background-dark/80 backdrop-blur-md border-b border-border-dark px-6 py-4 flex flex-wrap justify-between items-center gap-4"> {/* Added sticky top-0 z-20 */}
      <div className="flex items-center">
        {pathnames.length > 0 ? (
          <>
            <span className="text-gray-400">Dashboard</span>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;

              return (
                <div key={to} className="flex items-center">
                  <ChevronRight size={20} className="mx-1 text-gray-500" />
                  {last ? (
                    <span className="text-white capitalize">{value}</span>
                  ) : (
                    <span className="text-gray-400 capitalize">{value}</span>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <span className="text-white">Dashboard</span>
        )}
        <div className='ml-3'>
          <Status
            className="gap-4 rounded-full px-6 py-2 text-sm bg-primary/10 border border-primary/20"
            status="online"
            variant="outline"
          >
            <StatusIndicator />
            <StatusLabel className="text-primary">LIVE MAINNET</StatusLabel>
          </Status>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-4" defaultValue={"30d"}>
          <NativeSelect>
            <NativeSelectOption value="30d">Last 30 days</NativeSelectOption>
            <NativeSelectOption value="1d">1 day</NativeSelectOption>
            <NativeSelectOption value="7d">Last 7 days</NativeSelectOption>
            <NativeSelectOption value="6m">Last 6 months</NativeSelectOption>
            <NativeSelectOption value="1y">Last 1 year</NativeSelectOption>
          </NativeSelect>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus size={20} className="mr-1" />
              New Gateway
            </Button>
          </DialogTrigger>
          <CreateGatewayModal />
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
