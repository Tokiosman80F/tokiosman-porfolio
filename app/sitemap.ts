import type { MetadataRoute } from "next";
import { blogHref, posts } from "@/content/blog";
import { caseStudiesLive, projectHref, projects } from "@/content/projects";
import { servicePageHref, servicePages } from "@/content/service-pages";
import { site } from "@/content/site";

// /sitemap.xml: the home page, every service page, the case studies, the blog and its posts.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...servicePages.map(servicePageHref), ...(caseStudiesLive ? ["/work", ...projects.map(projectHref)] : []), "/blogs"];
  return [
    ...paths.map((path) => ({ url: `${site.url}${path === "/" ? "" : path}` })),
    ...posts.map((p) => ({ url: `${site.url}${blogHref(p)}`, lastModified: p.date })),
    ...["/privacy", "/terms"].map((path) => ({ url: `${site.url}${path}`, priority: 0.1 })),
  ];
}
