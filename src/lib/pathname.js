export function normalizePathname(pathname = "/") {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const cleanPath = pathname.replace(/\/+/g, "/").replace(/\/$/, "");
  return cleanPath === "" ? "/" : `${cleanPath}/`;
}

export function buildCanonicalUrl(siteUrl, pathname) {
  const normalizedSiteUrl = siteUrl.replace(/\/$/, "");
  const normalizedPath = normalizePathname(pathname);

  if (normalizedPath === "/") {
    return `${normalizedSiteUrl}/`;
  }

  return `${normalizedSiteUrl}${normalizedPath}`;
}
