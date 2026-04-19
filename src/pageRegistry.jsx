import BlogPage from "./pages/BlogPage";
import HomePage from "./pages/HomePage";
import PeoplePage from "./pages/PeoplePage";
import ProjectPage from "./pages/ProjectPage";
import ResourcePage from "./pages/ResourcePage";
import TutorialPage from "./pages/TutorialPage";
import { buildCanonicalUrl, normalizePathname } from "./lib/pathname";
import { siteConfig } from "./data/siteData";

export const pageRegistry = [
  {
    key: "home",
    path: "/",
    title: "MAIPAL - MedAI Policy & Application Lab",
    description:
      "MAIPAL bridges policy and practical application through governance research, open-source tooling, and trustworthy digital health implementation.",
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    includeInSitemap: true,
    schemaType: "WebPage",
    component: HomePage,
  },
  {
    key: "project",
    path: "/project/",
    title: "Projects - MAIPAL",
    description:
      "Explore MAIPAL's ongoing work at the intersection of clinical utility, healthcare systems, and ethical AI policy.",
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    includeInSitemap: true,
    schemaType: "CollectionPage",
    component: ProjectPage,
  },
  {
    key: "people",
    path: "/people/",
    title: "Our Team - MAIPAL",
    description:
      "Meet the MAIPAL team and explore current founding roles in policy research and application engineering.",
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    includeInSitemap: true,
    schemaType: "AboutPage",
    component: PeoplePage,
  },
  {
    key: "tutorial",
    path: "/tutorial/",
    title: "Tutorials - MAIPAL",
    description: "Tutorial content from MAIPAL is coming soon. Stay tuned for updates.",
    robots: "noindex,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    includeInSitemap: false,
    schemaType: "CollectionPage",
    component: TutorialPage,
  },
  {
    key: "blog",
    path: "/blog/",
    title: "Blog - MAIPAL",
    description: "Blog content from MAIPAL is coming soon. Stay tuned for updates.",
    robots: "noindex,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    includeInSitemap: false,
    schemaType: "CollectionPage",
    component: BlogPage,
  },
  {
    key: "resource",
    path: "/resource/",
    title: "Resources - MAIPAL",
    description:
      "Resource content from MAIPAL is coming soon. Stay tuned for updates.",
    robots: "noindex,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    includeInSitemap: false,
    schemaType: "CollectionPage",
    component: ResourcePage,
  },
];

export function getPageByPath(pathname) {
  const normalizedPath = normalizePathname(pathname);
  return pageRegistry.find((page) => page.path === normalizedPath) ?? null;
}

export function getSeoData(pathname) {
  const page = getPageByPath(pathname) ?? pageRegistry[0];
  const canonicalUrl = buildCanonicalUrl(siteConfig.siteUrl, page.path);

  return {
    ...page,
    canonicalUrl,
    siteName: siteConfig.brandName,
    siteUrl: siteConfig.siteUrl,
    locale: siteConfig.locale,
    socialImageUrl: siteConfig.defaultSocialImage
      ? buildCanonicalUrl(siteConfig.siteUrl, siteConfig.defaultSocialImage)
      : null,
  };
}
