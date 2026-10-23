import type { MetadataRoute } from "next";
import { servicePageHref, servicePages } from "@/content/service-pages";
import { site } from "@/content/site";

// /sitemap.xml: the home page and every service page. The case study pages (/work/…) are left out while
// they hold placeholder content (PRODUCT.md); add them here once they are real projects.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...servicePages.map(servicePageHref)];
  return paths.map((path) => ({ url: `${site.url}${path === "/" ? "" : path}` }));
}
