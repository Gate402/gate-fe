import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronRight, Plus, PanelLeft } from "lucide-react";
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@/components/ui/shadcn-io/status";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateGatewayModal from "./CreateGatewayModal";

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, onToggleSidebar }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsAtTop(scrollPosition === 0);
    };

    // Check initial position
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-20 
        bg-background-dark/80 backdrop-blur-md 
        border-b border-border-dark 
        flex flex-wrap justify-between items-center gap-4
        transition-all duration-300 ease-in-out
        ${
          isAtTop
            ? "px-6 py-6 w-full rounded-none"
            : "px-6 py-4 mx-4 mt-4 rounded-xl w-[calc(100%-2rem)]"
        }
      `}
    >
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="mr-4 text-white hover:text-[#25f478] transition-colors focus:outline-none"
        >
          <PanelLeft
            size={20}
            className={isSidebarOpen ? "text-[#25f478]" : ""}
          />
        </button>
        {pathnames.length > 0 ? (
          <>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;

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
        <div className="ml-3">
          <Status
            className="gap-4 rounded-full px-6 py-2 text-sm bg-primary/10 border border-primary/20"
            status="online"
            variant="outline"
          >
            <StatusIndicator />
            <StatusLabel className="text-primary">LIVE ON LISK & MANTLE & SEPOLIA</StatusLabel>
          </Status>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="1d">1 day</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last 1 year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={20} className="mr-1" />
              New Gateway
            </Button>
          </DialogTrigger>
          <CreateGatewayModal setOpen={setIsModalOpen} />
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
