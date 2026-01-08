import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  IconHome,
  IconServer,
  IconKey,
  IconSettings,
  IconWebhook,
  IconHistory,
} from "@tabler/icons-react";
import { Waypoints } from "lucide-react";
import Header from "./Header";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import UpdateProfileModal from "./UpdateProfileModal";
import { Dialog } from "@/components/ui/dialog";

const links = (activeLink: string) => [
    {
      label: "Home",
      href: "/dashboard",
      icon: (
        <IconHome className={`h-5 w-5 shrink-0 ${activeLink === 'Home' ? 'text-primary' : 'text-neutral-700 dark:text-neutral-200'}`} />
      ),
    },
    {
      label: "Gateways",
      href: "/gateways",
      icon: (
        <IconServer className={`h-5 w-5 shrink-0 ${activeLink === 'Gateways' ? 'text-primary' : 'text-neutral-700 dark:text-neutral-200'}`} />
      ),
    },
    {
      label: "API Keys",
      href: "/api-keys",
      icon: (
        <IconKey className={`h-5 w-5 shrink-0 ${activeLink === 'API Keys' ? 'text-primary' : 'text-neutral-700 dark:text-neutral-200'}`} />
      ),
    },
    {
      label: "Webhooks",
      href: "/webhooks",
      icon: (
        <IconWebhook className={`h-5 w-5 shrink-0 ${activeLink === 'Webhooks' ? 'text-primary' : 'text-neutral-700 dark:text-neutral-200'}`} />
      ),
    },
    {
      label: "Transactions",
      href: "/transactions",
      icon: (
        <IconHistory className={`h-5 w-5 shrink-0 ${activeLink === 'Transactions' ? 'text-primary' : 'text-neutral-700 dark:text-neutral-200'}`} />
      ),
    },
    {
        label: "Settings",
        href: "/settings",
        icon: (
          <IconSettings className={`h-5 w-5 shrink-0 ${activeLink === 'Settings' ? 'text-primary' : 'text-neutral-700 dark:text-neutral-200'}`} />
        ),
    },
  ];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpenState] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const setOpen: React.Dispatch<React.SetStateAction<boolean>> = (value) => {
    if (isDropdownOpen) {
       // Prevent sidebar from closing if dropdown is open
       if (value === false) return;
       if (typeof value === 'function') {
           setOpenState(prev => {
              const result = value(prev);
              return result === false ? true : result;
           });
           return;
       }
    }
    setOpenState(value);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const getActiveLink = (pathname: string) => {
    switch (pathname) {
      case '/dashboard':
        return 'Home';
      case '/gateways':
        return 'Gateways';
      case '/api-keys':
        return 'API Keys';
      case '/webhooks':
        return 'Webhooks';
      case '/transactions':
        return 'Transactions';
      case '/settings':
        return 'Settings';
      default:
        return "Home";
    }
  };

  const activeLink = getActiveLink(location.pathname);
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mt-2">
              <div className="h-8 w-8 rounded-md flex items-center justify-center">
                <Waypoints className="h-5 w-5 text-primary" />
              </div>
              <motion.span
                animate={{
                  display: open ? "inline-block" : "none",
                  opacity: open ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="font-bold text-xl whitespace-pre"
              >
                x402 Dev
              </motion.span>
            </div>
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <div className="mt-8 flex flex-col gap-2">
                {links(activeLink).map((link, idx) => (
                  <div
                    onClick={() => navigate(link.href)}
                    key={idx}
                    className={cn(
                      "cursor-pointer",
                      activeLink === link.label
                        ? (open ? "bg-primary/10 rounded-lg px-3 py-2" : "bg-primary/10 rounded-lg px-3 py-0")
                        : "px-3 py-2",
                      !open ? "w-full flex justify-center" : ""
                    )}
                  >
                    <SidebarLink link={link} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t mt-4 pt-4">
             <DropdownMenu onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <div className="w-full cursor-pointer hover:bg-white/5 rounded-lg transition-colors">
                  <SidebarLink
                    link={{
                      label: `${user?.name || "Anonymous"}\n${
                        user?.evmAddress
                          ? `${user.evmAddress.slice(0, 6)}...${user.evmAddress.slice(
                              -4
                            )}`
                          : ""
                      }`,
                      href: "#",
                      icon: (
                        <Avatar className="h-7 w-7 shrink-0">
                          <AvatarImage src="/Logo.png" alt="Avatar" />
                          <AvatarFallback>{(user?.name || user?.email || "A").charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      ),
                    }}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background-dark border-border-dark text-white" align="start" side="right" sideOffset={10}>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setIsProfileModalOpen(true)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Update Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarBody>
      </Sidebar>
      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <UpdateProfileModal setOpen={setIsProfileModalOpen} />
      </Dialog>
      <motion.div
        className="flex-1 flex flex-col min-h-screen"
        animate={{
          marginLeft: open ? "300px" : "60px",
        }}
        transition={{ duration: 0.2 }}
      >
        <Header />
        <main className="flex-1 flex flex-col p-8">{children}</main>
      </motion.div>
    </div>
  );
};

export default Layout;
