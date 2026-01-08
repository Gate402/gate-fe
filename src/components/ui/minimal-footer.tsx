import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

export function MinimalFooter() {
  const year = new Date().getFullYear();

  const company = [
    { title: "About", href: "#" },
    { title: "Privacy Policy", href: "#" },
    { title: "Terms of Service", href: "#" },
    { title: "Brand Assets", href: "#" },
  ];

  const resources = [
    { title: "Documentation", href: "#" },
    { title: "API Reference", href: "#" },
    { title: "GitHub", href: "https://github.com/gate402" },
    { title: "x402 Standard", href: "#" },
    { title: "MCP Integration", href: "#" },
  ];

  const socialLinks = [
    { icon: <FacebookIcon className="size-4" />, link: "#" },
    { icon: <GithubIcon className="size-4" />, link: "#" },
    { icon: <InstagramIcon className="size-4" />, link: "#" },
    { icon: <LinkedinIcon className="size-4" />, link: "#" },
    { icon: <TwitterIcon className="size-4" />, link: "#" },
    { icon: <YoutubeIcon className="size-4" />, link: "#" },
  ];

  return (
    <footer className="relative border-t border-[#25f478]/20 bg-[#0f0f11]">
      {/* Glow Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#25f478] to-transparent shadow-[0_0_20px_#25f478]" />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold font-heading text-white">
                Gate<span className="text-[#25f478]">402</span>
              </div>
            </div>
            <p className="text-[#a1a1aa] max-w-sm text-sm leading-relaxed">
              The first autonomous payment gateway for AI agents. Built on the
              open x402 standard to enable machine-to-machine economy.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  className="rounded-lg border border-[#27272a] p-2 text-[#a1a1aa] hover:text-[#25f478] hover:border-[#25f478] hover:bg-[#25f478]/5 transition-all duration-300"
                  target="_blank"
                  rel="noreferrer"
                  href={item.link}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="col-span-1 md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <span className="text-white font-bold mb-4 block">Resources</span>
              <ul className="space-y-3">
                {resources.map(({ href, title }, i) => (
                  <li key={i}>
                    <a
                      className="text-sm text-[#a1a1aa] hover:text-[#25f478] transition-colors duration-200"
                      href={href}
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-white font-bold mb-4 block">Company</span>
              <ul className="space-y-3">
                {company.map(({ href, title }, i) => (
                  <li key={i}>
                    <a
                      className="text-sm text-[#a1a1aa] hover:text-[#25f478] transition-colors duration-200"
                      href={href}
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-[#27272a] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#a1a1aa]/60 text-xs font-mono">
            © {year} Gate402 Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#25f478] animate-pulse" />
            <span className="text-[#25f478] text-xs font-mono uppercase tracking-wider">
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
