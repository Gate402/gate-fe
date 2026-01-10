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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import UpdateProfileModal from "./UpdateProfileModal";
import { Dialog } from "@/components/ui/dialog";

const links = (activeLink: string) => [
  {
    label: "Home",
    href: "/dashboard",
    icon: (
      <IconHome
        className={`h-5 w-5 shrink-0 ${
          activeLink === "Home"
            ? "text-[#25f478]"
            : "text-[#a1a1aa] group-hover/sidebar:text-white transition-colors"
        }`}
      />
    ),
  },
  {
    label: "Gateways",
    href: "/gateways",
    icon: (
      <IconServer
        className={`h-5 w-5 shrink-0 ${
          activeLink === "Gateways"
            ? "text-[#25f478]"
            : "text-[#a1a1aa] group-hover/sidebar:text-white transition-colors"
        }`}
      />
    ),
  },
  {
    label: "API Keys",
    href: "/api-keys",
    icon: (
      <IconKey
        className={`h-5 w-5 shrink-0 ${
          activeLink === "API Keys"
            ? "text-[#25f478]"
            : "text-[#a1a1aa] group-hover/sidebar:text-white transition-colors"
        }`}
      />
    ),
  },
  {
    label: "Webhooks",
    href: "/webhooks",
    icon: (
      <IconWebhook
        className={`h-5 w-5 shrink-0 ${
          activeLink === "Webhooks"
            ? "text-[#25f478]"
            : "text-[#a1a1aa] group-hover/sidebar:text-white transition-colors"
        }`}
      />
    ),
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: (
      <IconHistory
        className={`h-5 w-5 shrink-0 ${
          activeLink === "Transactions"
            ? "text-[#25f478]"
            : "text-[#a1a1aa] group-hover/sidebar:text-white transition-colors"
        }`}
      />
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <IconSettings
        className={`h-5 w-5 shrink-0 ${
          activeLink === "Settings"
            ? "text-[#25f478]"
            : "text-[#a1a1aa] group-hover/sidebar:text-white transition-colors"
        }`}
      />
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
      if (typeof value === "function") {
        setOpenState((prev) => {
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
      case "/dashboard":
        return "Home";
      case "/gateways":
        return "Gateways";
      case "/api-keys":
        return "API Keys";
      case "/webhooks":
        return "Webhooks";
      case "/transactions":
        return "Transactions";
      case "/settings":
        return "Settings";
      default:
        return "Home";
    }
  };

  const activeLink = getActiveLink(location.pathname);
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody 
          className="justify-between gap-10 bg-[#0f0f11] border-r border-[#27272a]"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mt-2 justify-center">
              <div
                className={cn(
                  "w-8 h-8 bg-[#25f478]/10 flex items-center justify-center border border-[#25f478]/20 transition-all duration-200",
                  open ? "rounded-lg" : "rounded-md"
                )}
              >
                <Waypoints className="h-5 w-5 text-[#25f478]" />
              </div>
              <motion.span
                animate={{
                  display: open ? "inline-block" : "none",
                  opacity: open ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="font-bold text-xl whitespace-pre font-heading text-white"
              >
                x402 <span className="text-[#25f478]">Dev</span>
              </motion.span>
            </div>
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <div className="mt-8 flex flex-col gap-2">
                {links(activeLink).map((link, idx) => (
                  <div
                    onClick={() => navigate(link.href)}
                    key={idx}
                    className={cn(
                      "cursor-pointer transition-all duration-200",
                      activeLink === link.label
                        ? open
                          ? "bg-[#25f478]/10 border border-[#25f478]/20 rounded-lg px-3 py-2 text-[#25f478]"
                          : "bg-[#25f478]/10 border border-[#25f478]/20 rounded-md w-9 h-9 p-0 flex items-center justify-center text-[#25f478]"
                        : open
                        ? "px-3 py-2 text-[#a1a1aa] hover:text-white hover:bg-white/5 rounded-lg"
                        : "w-9 h-9 p-0 flex items-center justify-center text-[#a1a1aa] hover:text-white hover:bg-white/5 rounded-md",
                      !open ? "mx-auto" : ""
                    )}
                  >
                    <SidebarLink link={link} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-[#27272a] mt-4 pt-4">
            <DropdownMenu onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <div className="w-full cursor-pointer hover:bg-[#27272a]/50 rounded-lg transition-colors p-1">
                  <SidebarLink
                    link={{
                      label: `${user?.name || "Anonymous"}\n${
                        user?.evmAddress
                          ? `${user.evmAddress.slice(
                              0,
                              6
                            )}...${user.evmAddress.slice(-4)}`
                          : ""
                      }`,
                      href: "#",
                      icon: (
                        <Avatar className="h-8 w-8 shrink-0 border border-[#27272a]">
                          <AvatarImage src="/Logo.png" alt="Avatar" />
                          <AvatarFallback className="bg-[#18181b] text-[#a1a1aa] font-mono">
                            {(user?.name || user?.email || "A")
                              .charAt(0)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ),
                    }}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-[#0f0f11] border-[#27272a] text-white"
                align="start"
                side="right"
                sideOffset={10}
              >
                <DropdownMenuItem
                  className="cursor-pointer focus:bg-[#25f478]/10 focus:text-[#25f478] text-[#a1a1aa]"
                  onClick={() => setIsProfileModalOpen(true)}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Update Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer"
                  onClick={logout}
                >
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
          marginLeft: open ? "220px" : "75px",
        }}
        transition={{ duration: 0.2 }}
      >
        <Header isSidebarOpen={open} onToggleSidebar={() => setOpen(!open)} />
        <main className="flex-1 flex flex-col p-8">{children}</main>
      </motion.div>
    </div>
  );
};

export default Layout;
