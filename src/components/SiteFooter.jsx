import SiteLink from "./SiteLink";
import { footerLinks, siteConfig } from "../data/siteData";

export default function SiteFooter() {
  return (
    <footer id="footer" className="relative mt-20 w-full">
      <div className="mx-auto max-w-screen-2xl px-4 pb-0 md:px-8">
        <div className="flex flex-col items-center justify-between gap-8 rounded-[2rem_2rem_0_0] border border-b-0 border-white/10 bg-slate-950/55 px-6 py-12 text-sm text-slate-400 shadow-[0_-18px_60px_rgba(2,12,34,0.24)] backdrop-blur-2xl md:flex-row md:px-12">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <SiteLink
              href="/"
              className="text-xl font-bold tracking-tighter text-white transition-transform duration-300 hover:scale-105"
            >
              {siteConfig.brandName}
            </SiteLink>
            <p className="text-center md:text-left">
              {"© 2026 MedAI Policy & Application Lab. All rights reserved."}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {footerLinks.map((link) => (
              <SiteLink
                key={link.label}
                href={link.external ? link.href : link.path}
                external={Boolean(link.external)}
                className="rounded-full px-4 py-2 text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-teal-300"
              >
                {link.label}
              </SiteLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
