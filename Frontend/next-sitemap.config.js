/* eslint-disable no-console */
const SITE_URL = "https://sealco-leb.com";
const LOCALES = ["en", "ar"];
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const DYNAMIC_SITEMAP_ENABLED = process.env.SITEMAP_DYNAMIC !== "false";
const FETCH_TIMEOUT_MS = Number(process.env.SITEMAP_FETCH_TIMEOUT_MS || 8000);
const CMS_API_TOKEN =
  process.env.SITEMAP_CMS_API_TOKEN ||
  process.env.NEXT_SITEMAP_CMS_API_TOKEN ||
  process.env.CMS_API_TOKEN ||
  "";
const CMS_API_TOKEN_HEADER = process.env.SITEMAP_CMS_API_HEADER || "Authorization";
const CMS_PUBLIC_SLUGS_ENDPOINT = "/pages/public-slugs";
const CMS_ALIAS_EXCLUDE_WHEN_PAGES_PRESENT = new Set(["/about-us"]);
const CMS_PATH_LASTMODS = new Map();

const STATIC_PUBLIC_ROUTES = [
  "/",
  "/about",
  "/careers-opportunities",
  "/contact",
  "/faq",
  "/highlights",
  "/shop-with-sidebar",
  "/shop-without-sidebar",
  "/validate-lg-product",
];

const EXCLUDED_PATTERNS = [
  "/sitemap.xml",
  "/sitemap-*.xml",
  "/server-sitemap.xml",
  "/server-sitemap-index.xml",
  "/user",
  "/user/*",
  "/en/user",
  "/ar/user",
  "/en/user/*",
  "/ar/user/*",
  "/en/cart",
  "/ar/cart",
  "/en/checkout",
  "/ar/checkout",
  "/en/account",
  "/ar/account",
  "/en/account/*",
  "/ar/account/*",
  "/en/my-account",
  "/ar/my-account",
  "/en/my-account/*",
  "/ar/my-account/*",
  "/en/admin",
  "/ar/admin",
  "/en/admin/*",
  "/ar/admin/*",
  "/en/login",
  "/ar/login",
  "/en/register",
  "/ar/register",
  "/en/signin",
  "/ar/signin",
  "/en/signup",
  "/ar/signup",
  "/en/search",
  "/ar/search",
  "/en/search/*",
  "/ar/search/*",
  "/en/forgot-password",
  "/ar/forgot-password",
  "/en/reset-password",
  "/ar/reset-password",
  "/en/verify-email",
  "/ar/verify-email",
  "/en/resend-verification-email",
  "/ar/resend-verification-email",
  "/en/mail-success",
  "/ar/mail-success",
  "/en/order-confirmation",
  "/ar/order-confirmation",
  "/en/wishlist",
  "/ar/wishlist",
];

const EXCLUDED_ROUTE_RE = /^\/(?:(en|ar)\/)?(user|cart|checkout|account|my-account|admin|login|register|signin|signup|search|forgot-password|reset-password|verify-email|resend-verification-email|mail-success|order-confirmation|wishlist)(\/|$)/i;
const SITEMAP_FILE_RE = /^\/sitemap(?:-\d+)?\.xml$/i;
const EMITTED_LOCS = new Set();
const RESERVED_SECTION_SEGMENTS = new Set([
  "api",
  "_next",
  "_vercel",
  "trpc",
  "pages",
  "blogs",
  "category",
  "lg",
  "shop-details",
  "highlights",
  "cart",
  "checkout",
  "contact",
  "error",
  "faq",
  "forgot-password",
  "mail-success",
  "my-account",
  "order-confirmation",
  "resend-verification-email",
  "reset-password",
  "search",
  "shop-with-sidebar",
  "shop-without-sidebar",
  "signin",
  "signup",
  "validate-lg-product",
  "verify-email",
  "wishlist",
  "careers-opportunities",
  "user",
  "account",
  "admin",
  "login",
  "register",
]);
const CMS_SECTION_ROOT_CACHE = new Map();

function stripQueryAndHash(path) {
  return path.split("?")[0].split("#")[0];
}

function normalizePath(path) {
  if (!path) return "/";

  let normalized = path.trim();
  if (!normalized) return "/";

  if (/^https?:\/\//i.test(normalized)) {
    try {
      const asUrl = new URL(normalized);
      if (asUrl.hostname !== new URL(SITE_URL).hostname) return null;
      normalized = `${asUrl.pathname}${asUrl.search}${asUrl.hash}`;
    } catch {
      return null;
    }
  }

  normalized = stripQueryAndHash(normalized);
  if (!normalized.startsWith("/")) normalized = `/${normalized}`;
  normalized = normalized.replace(/\/{2,}/g, "/");
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  return normalized;
}

function ensureLocalePath(locale, path) {
  const normalized = normalizePath(path);
  if (!normalized) return null;
  if (normalized === "/") return `/${locale}`;
  if (new RegExp(`^/(en|ar)(/|$)`, "i").test(normalized)) return normalized;
  return `/${locale}${normalized}`;
}

function stripLocalePrefix(path) {
  const normalized = normalizePath(path);
  if (!normalized) return null;
  return normalized.replace(/^\/(en|ar)(?=\/|$)/i, "") || "/";
}

function toCanonicalSeoPath(path) {
  const normalized = normalizePath(path);
  if (!normalized) return null;
  return normalized
    .replace(/^\/(en|ar)\/shop-details\//i, "/$1/lg/shop-details/")
    .replace(/^\/(en|ar)\/category\//i, "/$1/lg/category/");
}

function isExcludedPath(path) {
  const normalized = normalizePath(path);
  if (!normalized) return true;
  if (SITEMAP_FILE_RE.test(normalized)) return true;
  return EXCLUDED_ROUTE_RE.test(normalized);
}

function dedupePaths(paths) {
  const unique = new Set();
  for (const path of paths) {
    const normalized = toCanonicalSeoPath(path);
    if (!normalized || isExcludedPath(normalized)) continue;
    unique.add(normalized);
  }
  return Array.from(unique);
}

function canUseDynamicApi() {
  if (!DYNAMIC_SITEMAP_ENABLED) return false;
  if (!API_BASE_URL) return false;

  try {
    const parsed = new URL(API_BASE_URL);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function buildCmsAuthHeaders() {
  if (!CMS_API_TOKEN) return {};
  if (CMS_API_TOKEN_HEADER.toLowerCase() === "authorization") {
    const prefixed = /^bearer\s+/i.test(CMS_API_TOKEN)
      ? CMS_API_TOKEN
      : `Bearer ${CMS_API_TOKEN}`;
    return { [CMS_API_TOKEN_HEADER]: prefixed };
  }
  return { [CMS_API_TOKEN_HEADER]: CMS_API_TOKEN };
}

function resolveCmsPublicSlugsUrl() {
  if (!API_BASE_URL) return null;
  const base = API_BASE_URL.replace(/\/+$/g, "");
  return `${base}${CMS_PUBLIC_SLUGS_ENDPOINT}`;
}

async function fetchJsonWithStatus(url, label, headers = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json", ...headers },
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        data: null,
      };
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error(`Unexpected content type: ${contentType || "unknown"}`);
    }

    return {
      ok: true,
      status: response.status,
      data: await response.json(),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[next-sitemap] Dynamic URL fetch warning (${label}): ${message}`);
    return {
      ok: false,
      status: 0,
      data: null,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchJson(url, label, headers = {}) {
  const result = await fetchJsonWithStatus(url, label, headers);
  if (!result.ok) {
    if (result.status > 0) {
      console.warn(`[next-sitemap] Dynamic URL fetch warning (${label}): HTTP ${result.status}`);
    }
    return null;
  }
  return result.data;
}

function extractCmsItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.items)) return payload.items;
  if (payload && Array.isArray(payload.data)) return payload.data;
  if (payload && Array.isArray(payload.results)) return payload.results;
  return [];
}

function isCmsPagePublished(item) {
  const isPublished = item?.isPublished ?? item?.IsPublished;
  const isDeleted = item?.isDeleted ?? item?.IsDeleted ?? item?.deleted ?? item?.Deleted;
  return isPublished !== false && isDeleted !== true;
}

function getFirstSlugSegment(slug) {
  if (typeof slug !== "string") return "";
  const cleaned = slug.trim().replace(/^\/+|\/+$/g, "");
  if (!cleaned) return "";
  return cleaned.split("/")[0].toLowerCase();
}

function isReservedSectionSlug(slug) {
  const firstSegment = getFirstSlugSegment(slug);
  return firstSegment.length > 0 && RESERVED_SECTION_SEGMENTS.has(firstSegment);
}

function remapLegacyHelpCenterSlug(slug) {
  const cleaned = slug.trim().replace(/^\/+|\/+$/g, "");
  const lower = cleaned.toLowerCase();
  if (lower === "help-center") return "support";
  if (lower.startsWith("help-center/")) {
    return `support/${cleaned.slice("help-center/".length)}`;
  }
  return cleaned;
}

function extractCmsSlug(item) {
  const rawSlug = item?.slug ?? item?.Slug ?? item?.url ?? item?.Url ?? item?.path ?? item?.Path;
  if (typeof rawSlug !== "string") return null;

  const normalized = normalizePath(rawSlug);
  if (!normalized) return null;

  if (/^\/(en|ar)\/pages\/.+$/i.test(normalized)) {
    return normalized.replace(/^\/(en|ar)\/pages\//i, "");
  }

  if (/^\/pages\/.+$/i.test(normalized)) {
    return normalized.slice("/pages/".length);
  }

  if (/^\/(en|ar)\/.+$/i.test(normalized)) {
    return normalized.replace(/^\/(en|ar)\//i, "");
  }

  if (/^\/.+$/i.test(normalized)) {
    return normalized.slice(1);
  }

  return null;
}

function extractCmsUpdatedOn(item) {
  const rawUpdatedOn = item?.updatedOn ?? item?.UpdatedOn;
  if (typeof rawUpdatedOn !== "string" || rawUpdatedOn.trim().length === 0) {
    return undefined;
  }

  const parsed = new Date(rawUpdatedOn);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString();
}

async function isPublishedSectionRootSlug(sectionSlug) {
  const key = sectionSlug.toLowerCase();
  if (CMS_SECTION_ROOT_CACHE.has(key)) {
    return CMS_SECTION_ROOT_CACHE.get(key);
  }

  const page = await fetchJson(
    `${API_BASE_URL}/pages/by-section-slug?section=${encodeURIComponent(sectionSlug)}`,
    `GET /pages/by-section-slug?section=${sectionSlug}`,
  );
  const isPublished = Boolean(page && isCmsPagePublished(page));
  CMS_SECTION_ROOT_CACHE.set(key, isPublished);
  return isPublished;
}

async function mapCmsSlugToLocalizedPaths(slug) {
  if (typeof slug !== "string") return [];

  const normalizedSlug = remapLegacyHelpCenterSlug(slug);
  if (!normalizedSlug) return [];
  if (isReservedSectionSlug(normalizedSlug)) return [];

  if (normalizedSlug.includes("/")) {
    return LOCALES.map((locale) => `/${locale}/${normalizedSlug}`);
  }

  if (await isPublishedSectionRootSlug(normalizedSlug)) {
    return LOCALES.map((locale) => `/${locale}/${normalizedSlug}`);
  }

  return LOCALES.map((locale) => `/${locale}/pages/${normalizedSlug}`);
}

async function collectPublishedCmsPagePaths() {
  const url = resolveCmsPublicSlugsUrl();
  if (!url) return { paths: [], source: null, failed: true };
  const headers = buildCmsAuthHeaders();
  const result = await fetchJsonWithStatus(url, `GET ${url}`, headers);
  if (!result.ok) return { paths: [], source: url, failed: true };

  const items = extractCmsItems(result.data);
  const pathLastmodEntries = new Map();

  for (const item of items) {
    if (!isCmsPagePublished(item)) continue;
    const slug = extractCmsSlug(item);
    if (typeof slug !== "string" || slug.length === 0) continue;
    const lastmod = extractCmsUpdatedOn(item);

    const mappedPaths = await mapCmsSlugToLocalizedPaths(slug);
    for (const candidatePath of mappedPaths) {
      const normalizedPath = toCanonicalSeoPath(candidatePath);
      if (!normalizedPath || isExcludedPath(normalizedPath)) continue;

      if (!pathLastmodEntries.has(normalizedPath)) {
        pathLastmodEntries.set(normalizedPath, lastmod);
        continue;
      }

      const existingLastmod = pathLastmodEntries.get(normalizedPath);
      if (!lastmod) continue;
      if (!existingLastmod || new Date(lastmod).getTime() > new Date(existingLastmod).getTime()) {
        pathLastmodEntries.set(normalizedPath, lastmod);
      }
    }
  }

  const paths = Array.from(pathLastmodEntries.keys());
  for (const [path, lastmod] of pathLastmodEntries.entries()) {
    if (lastmod) {
      CMS_PATH_LASTMODS.set(path, lastmod);
    }
  }

  return { paths, source: url, failed: false };
}

async function collectCmsPathsFromMenuFallback(menuCmsLocalizedPaths) {
  const fallbackPaths = dedupePaths(menuCmsLocalizedPaths);
  if (fallbackPaths.length === 0) return [];

  const slugs = new Set();
  for (const path of fallbackPaths) {
    const withoutLocale = stripLocalePrefix(path);
    if (!withoutLocale) continue;
    const match = withoutLocale.match(/^\/pages\/(.+)$/i);
    if (!match?.[1]) continue;
    slugs.add(match[1]);
  }

  const validSlugs = [];
  for (const slug of slugs) {
    const page = await fetchJson(
      `${API_BASE_URL}/pages/by-slug?slug=${encodeURIComponent(slug)}`,
      `GET /pages/by-slug?slug=${slug}`,
    );
    if (!page) continue;
    if (!isCmsPagePublished(page)) continue;
    validSlugs.push(slug);
  }

  const mappedPaths = [];
  for (const slug of validSlugs) {
    mappedPaths.push(...(await mapCmsSlugToLocalizedPaths(slug)));
  }

  return dedupePaths(mappedPaths);
}

function flattenMenuLinks(items) {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => item?.customLink || item?.CustomLink || "")
    .filter((link) => typeof link === "string" && link.trim().length > 0);
}

function extractCategorySlugFromPath(path) {
  const normalized = normalizePath(path);
  if (!normalized) return null;

  const withoutLocale = normalized.replace(/^\/(en|ar)(\/|$)/i, "/");
  const withLg = withoutLocale.match(/^\/lg\/category\/(.+)$/i);
  if (withLg?.[1]) return `category/${withLg[1]}`;

  const plain = withoutLocale.match(/^\/category\/(.+)$/i);
  if (plain?.[1]) return `category/${plain[1]}`;

  return null;
}

async function collectDynamicPaths() {
  if (!canUseDynamicApi()) {
    if (DYNAMIC_SITEMAP_ENABLED) {
      console.warn("[next-sitemap] Dynamic URLs skipped: NEXT_PUBLIC_API_URL is missing or not https.");
    }
    return [];
  }

  CMS_PATH_LASTMODS.clear();
  CMS_SECTION_ROOT_CACHE.clear();

  const discovered = [];
  const menuDerivedPaths = [];
  const menuCmsPagePaths = [];
  const categorySlugSet = new Set();

  const menus = await fetchJson(`${API_BASE_URL}/menus`, "GET /menus");
  const menuIds = Array.isArray(menus)
    ? menus
        .map((menu) => menu?.id ?? menu?.Id)
        .filter((id) => Number.isInteger(id))
    : [];

  for (const menuId of menuIds) {
    const detail = await fetchJson(`${API_BASE_URL}/menus/${menuId}`, `GET /menus/${menuId}`);
    const links = flattenMenuLinks(detail?.items ?? detail?.Items);

    for (const link of links) {
      for (const locale of LOCALES) {
        const localized = ensureLocalePath(locale, link);
        if (!localized) continue;

        const withoutLocale = stripLocalePrefix(localized);
        if (!withoutLocale) continue;
        if (/^\/pages\/.+$/i.test(withoutLocale)) {
          menuCmsPagePaths.push(localized);
          continue;
        }

        menuDerivedPaths.push(localized);
      }

      const categorySlug = extractCategorySlugFromPath(link);
      if (categorySlug) categorySlugSet.add(categorySlug);
    }
  }

  const cmsPages = await collectPublishedCmsPagePaths();
  if (cmsPages.source) {
    console.warn(`[next-sitemap] CMS slugs source: ${cmsPages.source}`);
  }
  if (cmsPages.failed) {
    console.warn(
      "[next-sitemap] CMS public slugs endpoint unavailable. Falling back to menu-derived /pages/* links only.",
    );
  }

  const cmsPublishedPaths = cmsPages.failed
    ? await collectCmsPathsFromMenuFallback(menuCmsPagePaths)
    : cmsPages.paths;
  const hasPublishedCmsSource = cmsPublishedPaths.length > 0;

  for (const path of menuDerivedPaths) {
    if (hasPublishedCmsSource) {
      const withoutLocale = stripLocalePrefix(path);
      if (withoutLocale && CMS_ALIAS_EXCLUDE_WHEN_PAGES_PRESENT.has(withoutLocale)) {
        continue;
      }
    }
    discovered.push(path);
  }

  discovered.push(...cmsPublishedPaths);

  const categories = await fetchJson(`${API_BASE_URL}/news-categories`, "GET /news-categories");
  if (Array.isArray(categories)) {
    for (const category of categories) {
      const categoryId = category?.id ?? category?.Id;
      if (!Number.isInteger(categoryId)) continue;

      const categoryDetail = await fetchJson(
        `${API_BASE_URL}/news-categories/${categoryId}`,
        `GET /news-categories/${categoryId}`,
      );

      const items = Array.isArray(categoryDetail?.items) ? categoryDetail.items : [];
      for (const item of items) {
        const id = item?.id ?? item?.Id;
        if (!Number.isInteger(id)) continue;

        for (const locale of LOCALES) {
          discovered.push(`/${locale}/highlights/${id}`);
        }
      }
    }
  }

  for (const categorySlug of categorySlugSet) {
    const encodedSlug = encodeURIComponent(categorySlug);
    const category = await fetchJson(
      `${API_BASE_URL}/categories/by-slug?slug=${encodedSlug}`,
      `GET /categories/by-slug?slug=${categorySlug}`,
    );

    const categoryId = category?.id ?? category?.Id;
    if (!Number.isInteger(categoryId)) continue;

    let page = 1;
    const pageSize = 100;
    const maxPages = 40;

    while (page <= maxPages) {
      const productsResponse = await fetchJson(
        `${API_BASE_URL}/categories/${categoryId}/products?page=${page}&pageSize=${pageSize}`,
        `GET /categories/${categoryId}/products?page=${page}&pageSize=${pageSize}`,
      );

      if (!productsResponse || !Array.isArray(productsResponse.items)) break;
      const products = productsResponse.items;
      if (products.length === 0) break;

      for (const product of products) {
        const slug = product?.slug;
        if (typeof slug !== "string" || !slug.trim()) continue;

        for (const locale of LOCALES) {
          discovered.push(`/${locale}/lg/shop-details/${slug}`);
        }
      }

      const totalItems = Number(productsResponse.totalItems || 0);
      const reachedEnd = page * pageSize >= totalItems || products.length < pageSize;
      if (reachedEnd) break;
      page += 1;
    }
  }

  return dedupePaths(discovered);
}

const STATIC_SEO_PATHS = dedupePaths(
  LOCALES.flatMap((locale) => STATIC_PUBLIC_ROUTES.map((route) => ensureLocalePath(locale, route))),
);

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  autoLastmod: true,
  exclude: EXCLUDED_PATTERNS,
  transform: async (config, path) => {
    const canonicalPath = toCanonicalSeoPath(path);
    if (!canonicalPath || isExcludedPath(canonicalPath)) return null;
    if (EMITTED_LOCS.has(canonicalPath)) return null;
    EMITTED_LOCS.add(canonicalPath);

    return {
      loc: canonicalPath,
      changefreq: "daily",
      priority: canonicalPath === "/en" || canonicalPath === "/ar" ? 1.0 : 0.7,
      lastmod:
        CMS_PATH_LASTMODS.get(canonicalPath) ||
        (config.autoLastmod ? new Date().toISOString() : undefined),
    };
  },
  additionalPaths: async (config) => {
    const staticEntries = [];
    for (const path of STATIC_SEO_PATHS) {
      const transformed = await config.transform(config, path);
      if (transformed) staticEntries.push(transformed);
    }

    const dynamicEntries = [];
    const dynamicPaths = await collectDynamicPaths();
    for (const path of dynamicPaths) {
      const transformed = await config.transform(config, path);
      if (transformed) dynamicEntries.push(transformed);
    }

    return [...staticEntries, ...dynamicEntries];
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/en/cart",
          "/ar/cart",
          "/en/checkout",
          "/ar/checkout",
          "/en/account",
          "/ar/account",
          "/en/account/",
          "/ar/account/",
          "/en/my-account",
          "/ar/my-account",
          "/en/my-account/",
          "/ar/my-account/",
          "/en/admin",
          "/ar/admin",
          "/en/admin/",
          "/ar/admin/",
          "/en/login",
          "/ar/login",
          "/en/register",
          "/ar/register",
          "/en/signin",
          "/ar/signin",
          "/en/signup",
          "/ar/signup",
          "/en/search",
          "/ar/search",
          "/user",
          "/user/",
          "/en/user",
          "/ar/user",
          "/en/user/",
          "/ar/user/",
        ],
      },
    ],
  },
};
