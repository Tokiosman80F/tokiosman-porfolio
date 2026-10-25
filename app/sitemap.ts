import type { MetadataRoute } from "next";
import { blogHref, posts } from "@/content/blog";
import { servicePageHref, servicePages } from "@/content/service-pages";
import { site } from "@/content/site";

// /sitemap.xml: the home page, every service page, the blog and its posts. The case study pages (/work/…)
// are left out while they hold placeholder content (PRODUCT.md); add them here once they are real projects.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...servicePages.map(servicePageHref), "/blogs"];
  return [
    ...paths.map((path) => ({ url: `${site.url}${path === "/" ? "" : path}` })),
    ...posts.map((p) => ({ url: `${site.url}${blogHref(p)}`, lastModified: p.date })),
  ];
}
