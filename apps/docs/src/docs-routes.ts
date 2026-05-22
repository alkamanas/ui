import { blockPageIds, componentIds, docs } from "./docs-data";

export const homeDocId = "home";

const docIds = new Set(docs.map((item) => item.id));
const basePath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "/";

function stripBase(pathname: string) {
  if (basePath === "/") return pathname;
  return pathname.startsWith(basePath) ? pathname.slice(basePath.length) || "/" : pathname;
}

function withBase(path: string) {
  if (basePath === "/") return path;
  return `${basePath}${path}`;
}

function normalizePath(pathname: string) {
  const path = stripBase(pathname).replace(/\/+$/, "");
  return path || "/";
}

export function getDocPath(id: string) {
  if (id === homeDocId) return "/";
  if (id === "blocks") return "/blocks";
  if (blockPageIds.has(id)) return `/blocks#${id}`;
  if (id === "components") return "/components";
  if (componentIds.has(id)) return `/components/${id}`;
  return `/${id}`;
}

export function getDocHref(id: string) {
  return withBase(getDocPath(id));
}

export function getRouteDocIdFromPathname(pathname: string, fallback = homeDocId) {
  const path = normalizePath(pathname);

  if (path === "/") return homeDocId;
  if (path === "/blocks") return "blocks";
  if (path === "/components") return "components";

  if (path.startsWith("/components/")) {
    const id = decodeURIComponent(path.replace(/^\/components\//, ""));
    return componentIds.has(id) ? id : fallback;
  }

  const id = decodeURIComponent(path.replace(/^\//, ""));
  return docIds.has(id) ? id : fallback;
}

export function isDocsPathname(pathname: string) {
  return getRouteDocIdFromPathname(pathname, "__missing__") !== "__missing__";
}

export function getLegacyHashDocId(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return null;
  if (id === homeDocId) return homeDocId;
  return docIds.has(id) || blockPageIds.has(id) ? id : null;
}

export function isHomePath(pathname: string) {
  return normalizePath(pathname) === "/";
}

export function getActiveRouteId(id: string) {
  return blockPageIds.has(id) ? "blocks" : id;
}
