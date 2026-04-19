import { renderToString } from "react-dom/server";
import App from "./App";
import { getSeoData, pageRegistry } from "./pageRegistry";
import { normalizePathname } from "./lib/pathname";
import { siteConfig } from "./data/siteData";

function getStructuredData(pathname) {
  const seo = getSeoData(pathname);

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    sameAs: siteConfig.sameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": seo.schemaType ?? "WebPage",
    name: seo.title,
    description: seo.description,
    url: seo.canonicalUrl,
  };

  return [organization, website, webpage];
}

export function render(pathname = "/") {
  const currentPath = normalizePathname(pathname);
  const seo = getSeoData(currentPath);
  const appHtml = renderToString(<App currentPath={currentPath} />);
  const structuredData = getStructuredData(currentPath);

  return {
    appHtml,
    seo,
    structuredData,
  };
}

export function getStaticPaths() {
  return pageRegistry.map((page) => page.path);
}

export function getSitemapPaths() {
  return pageRegistry
    .filter((page) => page.includeInSitemap !== false)
    .map((page) => page.path);
}
