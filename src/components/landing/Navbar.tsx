import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu as MenuIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  MenuItem,
  ProductItem,
  HoveredLink,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { DOCS_URL } from "@/lib/constants";

export const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Mobile nav items (fallback)
  const mobileNavItems = ["Services", "Products", "Resources", "Pricing"];

  return (
    <div
      className={`
      fixed inset-x-0 z-50
      transition-all duration-300 ease-in-out
      ${isAtTop ? "top-0" : "top-6"}
    `}
    >
      <div
        className={`
        mx-auto
        transition-all duration-300 ease-in-out
        ${isAtTop ? "max-w-full" : "max-w-5xl"}
      `}
      >
        <Menu
          setActive={setActive}
          className={`
          w-full justify-between px-6 items-center 
          bg-black/80 backdrop-blur-md border border-white/10 
          shadow-2xl shadow-black/50
          transition-all duration-300 ease-in-out
          ${isAtTop ? "py-8 rounded-none" : "py-4 rounded-full"}
        `}
        >
          {/* Logo */}
          {/* <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center transition-colors group-hover:bg-primary/20">
              <Waypoints className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-lg text-white font-serif tracking-tight">
              Gate402
            </span>
          </div> */}
          <a href="/">
            <img
              src="/Logo.png"
              className={cn(isAtTop ? "size-10" : "size-8")}
            />
          </a>

          {/* Desktop Nav with Dropdowns */}
          <div className="hidden md:flex items-center gap-6">
            {/* Services Dropdown */}
            <MenuItem setActive={setActive} active={active} item="Services">
              <div className="grid grid-cols-2 gap-4 p-4">
                <ProductItem
                  title="Payment Proxy"
                  description="Enable HTTP 402 payments for any API endpoint"
                  href="#payment-proxy"
                  src="/brain/payment_proxy_service_1767668733338.png"
                />
                <ProductItem
                  title="Analytics Dashboard"
                  description="Monitor API usage, revenue, and payment metrics"
                  href="#analytics"
                  src="/brain/analytics_dashboard_service_1767668750025.png"
                />
                <ProductItem
                  title="Developer Tools"
                  description="SDKs, webhooks, and integration utilities"
                  href="#developer-tools"
                  src="/brain/developer_tools_service_1767668765985.png"
                />
                <ProductItem
                  title="Gateway Management"
                  description="Configure and manage payment gateways"
                  href="#gateway-management"
                  src="/brain/gateway_management_service_1767668784962.png"
                />
              </div>
            </MenuItem>

            {/* Products Dropdown */}
            <MenuItem setActive={setActive} active={active} item="Products">
              <div className="grid grid-cols-2 gap-4 p-4">
                <ProductItem
                  title="API Monetization"
                  description="Turn your APIs into revenue streams"
                  href="#api-monetization"
                  src="/brain/api_monetization_product_1767668804687.png"
                />
                <ProductItem
                  title="Consultation Booking"
                  description="Pay-per-session consultation platform"
                  href="#consultation-booking"
                  src="/brain/consultation_booking_product_1767668821855.png"
                />
                <ProductItem
                  title="Premium Content Access"
                  description="Gated content with micropayments"
                  href="#premium-content"
                  src="/brain/premium_content_product_1767668839347.png"
                />
                <ProductItem
                  title="Usage-Based Billing"
                  description="Charge users based on actual API usage"
                  href="#usage-billing"
                  src="/brain/usage_billing_product_1767668855502.png"
                />
              </div>
            </MenuItem>

            {/* Resources Dropdown */}
            <MenuItem setActive={setActive} active={active} item="Resources">
              <div className="flex flex-col space-y-3 text-sm p-4">
                <HoveredLink href="/docs">Documentation</HoveredLink>
                <HoveredLink href="/docs/api">API Reference</HoveredLink>
                <HoveredLink href="/guides">Integration Guides</HoveredLink>
                <HoveredLink href="/blog">Blog & Updates</HoveredLink>
                <HoveredLink href="https://github.com/gate402" target="_blank">
                  GitHub
                </HoveredLink>
              </div>
            </MenuItem>

            {/* Pricing - Simple Link */}
            <a
              href="#pricing"
              className="text-sm font-medium text-text-dim hover:text-white transition-colors cursor-pointer"
            >
              Pricing
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-text-dim hover:text-white hover:bg-white/5"
              onClick={() => window.open(DOCS_URL, "_blank")}
            >
              Read Docs
            </Button>
            <Button
              size="sm"
              className="font-semibold bg-primary text-black hover:bg-primary/90"
              onClick={() => navigate("/login")}
            >
              Launch App
            </Button>
          </div>
        </Menu>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-4 right-4 mt-2 p-4 rounded-xl border border-border-dark bg-card-dark shadow-xl flex flex-col gap-4 md:hidden">
            {mobileNavItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-text-dim hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-border-dark">
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  window.open(DOCS_URL, "_blank");
                  setIsMobileMenuOpen(false);
                }}
              >
                Read Docs
              </Button>
              <Button
                className="justify-start bg-primary text-black"
                onClick={() => {
                  navigate("/login");
                  setIsMobileMenuOpen(false);
                }}
              >
                Launch App
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
