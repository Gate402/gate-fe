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
import Header from "./Header";
import { useAuth } from "@/context/AuthContext";

const links = (activeLink: string) => [
  {
    label: "Home",
    href: "/",
    icon: (
      <IconHome
        className={`h-5 w-5 shrink-0 ${
          activeLink === "Home"
            ? "text-primary"
            : "text-neutral-700 dark:text-neutral-200"
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
            ? "text-primary"
            : "text-neutral-700 dark:text-neutral-200"
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
            ? "text-primary"
            : "text-neutral-700 dark:text-neutral-200"
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
            ? "text-primary"
            : "text-neutral-700 dark:text-neutral-200"
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
            ? "text-primary"
            : "text-neutral-700 dark:text-neutral-200"
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
            ? "text-primary"
            : "text-neutral-700 dark:text-neutral-200"
        }`}
      />
    ),
  },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveLink = (pathname: string) => {
    switch (pathname) {
      case "/":
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
  const { user } = useAuth();

  return (
    <div className="flex h-full">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mt-2">
              <div className="h-8 w-8 bg-green-500 rounded-md flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                    fill="#1C1C1C"
                  />
                  <path
                    d="M15.5 10.5C15.5 9.67157 14.8284 9 14 9H10C9.17157 9 8.5 9.67157 8.5 10.5V13.5C8.5 14.3284 9.17157 15 10 15H14C14.8284 15 15.5 14.3284 15.5 13.5V10.5Z"
                    fill="#22C55E"
                  />
                </svg>
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
                        ? "bg-primary/10 rounded-lg px-3 py-2"
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
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
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
