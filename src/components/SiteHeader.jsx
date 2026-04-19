import { useState } from "react";
import SiteLink from "./SiteLink";
import { navItems, siteConfig } from "../data/siteData";

function navLinkClass(isActive) {
  if (isActive) {
    return "rounded-full bg-white/10 px-5 py-2.5 text-white ring-1 ring-primary/30 transition-all duration-300 ease-in-out";
  }

  return "rounded-full px-5 py-2.5 text-slate-300 transition-all duration-300 ease-in-out hover:bg-white/5 hover:text-white";
}

export default function SiteHeader({ currentPath = "/" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full">
      <div className="mx-auto max-w-screen-2xl px-4 pt-0 md:px-8">
        <div className="relative flex items-center justify-between rounded-[0_0_2rem_2rem] border border-white/10 border-t-0 bg-slate-950/55 px-4 py-4 shadow-[0_18px_60px_rgba(2,12,34,0.32)] backdrop-blur-2xl md:px-6">
          <SiteLink
            href="/"
            className="relative z-10 text-2xl font-bold tracking-tighter text-white transition-transform duration-300 hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            {siteConfig.brandName}
          </SiteLink>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 font-['Plus_Jakarta_Sans'] font-medium tracking-tight md:flex">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <SiteLink key={item.path} href={item.path} className={navLinkClass(isActive)}>
                  {item.label}
                </SiteLink>
              );
            })}
          </div>

          <button
            type="button"
            className="rounded-full bg-white/5 p-2 text-white transition-colors hover:bg-white/10 md:hidden"
            aria-label="Toggle Menu"
            onClick={() => setIsOpen((value) => !value)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {isOpen ? (
          <div className="mt-3 rounded-[1.75rem] border border-white/10 bg-slate-950/85 px-4 py-4 backdrop-blur-2xl md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <SiteLink
                    key={item.path}
                    href={item.path}
                    className={navLinkClass(isActive)}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </SiteLink>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
