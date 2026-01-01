import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { IconHome, IconServer, IconKey, IconSettings, IconWebhook, IconHistory } from '@tabler/icons-react';
import Header from './Header';
import { cn } from '@/lib/utils';

const links = (activeLink: string) => [
    {
      label: "Home",
      href: "/",
      icon: (
        <IconHome className={`h-5 w-5 shrink-0 ${activeLink === 'Home' ? 'text-white' : 'text-neutral-700 dark:text-neutral-200'}`} />
      ),
    },
    {
      label: "Gateways",
      href: "/gateways",
      icon: (
        <IconServer className={`h-5 w-5 shrink-0 ${activeLink === 'Gateways' ? 'text-white' : 'text-neutral-700 dark:text-neutral-200'}`} />
      ),
    },
    {
      label: "API Keys",
      href: "/api-keys",
      icon: (
        <IconKey className={`h-5 w-5 shrink-0 ${activeLink === 'API Keys' ? 'text-white' : 'text-neutral-700 dark:text-neutral-200'}`} />
      ),
    },
    {
      label: "Webhooks",
      href: "/webhooks",
      icon: (
        <IconWebhook className={`h-5 w-5 shrink-0 ${activeLink === 'Webhooks' ? 'text-white' : 'text-neutral-700 dark:text-neutral-200'}`} />
      ),
    },
    {
      label: "Transactions",
      href: "/transactions",
      icon: (
        <IconHistory className={`h-5 w-5 shrink-0 ${activeLink === 'Transactions' ? 'text-white' : 'text-neutral-700 dark:text-neutral-200'}`} />
      ),
    },
  ];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveLink = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'Home';
      case '/gateways':
        return 'Gateways';
      case '/api-keys':
        return 'API Keys';
      case '/webhooks':
        return 'Webhooks';
      case '/transactions':
        return 'Transactions';
      default:
        return 'Home';
    }
  };

  const activeLink = getActiveLink(location.pathname);

  return (
    <div className="bg-[#0D1117] text-white flex h-full">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <div className="mt-8 flex flex-col gap-2">
              {links(activeLink).map((link, idx) => (
                <div 
                  onClick={() => navigate(link.href)} 
                  key={idx} 
                  className={cn(
                    'cursor-pointer',
                    activeLink === link.label ? 'bg-green-500 rounded-lg px-3 py-2' : 'px-3 py-2',
                    !open ? "w-full flex justify-center" : "" // Center content when closed
                  )} 
                >
                  <SidebarLink link={link} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Settings",
                href: "#",
                icon: (
                  <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
              }}
            />
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora\nx272727272727",
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
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
