import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const clientDistDir = path.join(projectRoot, "dist");
const ssrDistDir = path.join(projectRoot, "dist-ssr");
const manifestPath = path.join(clientDistDir, ".vite", "manifest.json");

function htmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeAssetPath(fromFile, targetFile) {
  const relativePath = path.relative(path.dirname(fromFile), targetFile).replaceAll("\\", "/");
  return relativePath === "" ? "." : relativePath;
}

function ensureTrailingSlash(pathname) {
  if (pathname === "/") {
    return pathname;
  }

  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function getOutputHtmlPath(pathname) {
  if (pathname === "/") {
    return path.join(clientDistDir, "index.html");
  }

  const normalized = ensureTrailingSlash(pathname).replace(/^\/|\/$/g, "");
  return path.join(clientDistDir, normalized, "index.html");
}

function buildMetaTags(seo, structuredData) {
  const tags = [
    `<title>${htmlEscape(seo.title)}</title>`,
    `<meta name="description" content="${htmlEscape(seo.description)}" />`,
    `<meta name="robots" content="${htmlEscape(seo.robots)}" />`,
    `<link rel="canonical" href="${htmlEscape(seo.canonicalUrl)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${htmlEscape(seo.siteName)}" />`,
    `<meta property="og:title" content="${htmlEscape(seo.title)}" />`,
    `<meta property="og:description" content="${htmlEscape(seo.description)}" />`,
    `<meta property="og:url" content="${htmlEscape(seo.canonicalUrl)}" />`,
    `<meta property="og:locale" content="${htmlEscape(seo.locale)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${htmlEscape(seo.title)}" />`,
    `<meta name="twitter:description" content="${htmlEscape(seo.description)}" />`,
    `<meta name="theme-color" content="#07193b" />`,
  ];

  if (seo.socialImageUrl) {
    tags.push(`<meta property="og:image" content="${htmlEscape(seo.socialImageUrl)}" />`);
    tags.push(`<meta name="twitter:image" content="${htmlEscape(seo.socialImageUrl)}" />`);
  }

  for (const item of structuredData) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(item).replaceAll(
        "</script>",
        "<\\/script>",
      )}</script>`,
    );
  }

  return tags.join("\n    ");
}

function buildHtmlDocument({
  appHtml,
  seo,
  structuredData,
  cssFiles,
  entryScript,
  outputHtmlPath,
}) {
  const cssTags = cssFiles
    .map((file) => {
      const href = normalizeAssetPath(outputHtmlPath, path.join(clientDistDir, file));
      return `<link rel="stylesheet" href="${href}" />`;
    })
    .join("\n    ");

  const scriptSrc = normalizeAssetPath(outputHtmlPath, path.join(clientDistDir, entryScript));
  const metaTags = buildMetaTags(seo, structuredData);

  return `<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${metaTags}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
    ${cssTags}
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="${scriptSrc}"></script>
  </body>
</html>
`;
}

function buildSitemap(siteUrl, paths) {
  const normalizedSiteUrl = siteUrl.replace(/\/$/, "");
  const urls = paths
    .map((pathname) => {
      const url = pathname === "/" ? `${normalizedSiteUrl}/` : `${normalizedSiteUrl}${pathname}`;
      return `  <url>\n    <loc>${url}</loc>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function getSsrEntryPath() {
  const files = await fs.readdir(ssrDistDir);
  const entry = files.find((file) => file.endsWith(".js") || file.endsWith(".mjs") || file.endsWith(".cjs"));

  if (!entry) {
    throw new Error("Could not find SSR entry bundle in dist-ssr.");
  }

  return path.join(ssrDistDir, entry);
}

async function run() {
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const manifestEntry = manifest["index.html"] ?? Object.values(manifest).find((item) => item.isEntry);

  if (!manifestEntry?.file) {
    throw new Error("Could not find client entry in Vite manifest.");
  }

  const ssrEntryPath = await getSsrEntryPath();
  const { render, getStaticPaths, getSitemapPaths } = await import(pathToFileURL(ssrEntryPath).href);
  const staticPaths = getStaticPaths();

  for (const pathname of staticPaths) {
    const { appHtml, seo, structuredData } = render(pathname);
    const outputHtmlPath = getOutputHtmlPath(pathname);

    await fs.mkdir(path.dirname(outputHtmlPath), { recursive: true });

    const html = buildHtmlDocument({
      appHtml,
      seo,
      structuredData,
      cssFiles: manifestEntry.css ?? [],
      entryScript: manifestEntry.file,
      outputHtmlPath,
    });

    await fs.writeFile(outputHtmlPath, html, "utf8");
  }

  const sitemapPaths = getSitemapPaths();
  const homePath = sitemapPaths.includes("/") ? sitemapPaths : ["/", ...sitemapPaths];
  const { seo: homeSeo } = render("/");

  await fs.writeFile(
    path.join(clientDistDir, "sitemap.xml"),
    buildSitemap(homeSeo.siteUrl, homePath),
    "utf8",
  );

  await fs.writeFile(
    path.join(clientDistDir, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${homeSeo.siteUrl.replace(/\/$/, "")}/sitemap.xml\n`,
    "utf8",
  );

  const notFoundHtml = buildHtmlDocument({
    ...render("/404/"),
    seo: {
      ...homeSeo,
      title: "Page Not Found - MAIPAL",
      description: "The requested page could not be found.",
      canonicalUrl: `${homeSeo.siteUrl.replace(/\/$/, "")}/404/`,
      socialImageUrl: null,
    },
    structuredData: [],
    cssFiles: manifestEntry.css ?? [],
    entryScript: manifestEntry.file,
    outputHtmlPath: path.join(clientDistDir, "404.html"),
  });

  await fs.writeFile(path.join(clientDistDir, "404.html"), notFoundHtml, "utf8");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
