import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { getAllPosts } from "@/lib/blog";

const SITE = "https://faizanali.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified: new Date(), priority: 1 },
    ...projects.map((p) => ({
      url: `${SITE}/work/${p.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
    { url: `${SITE}/blog`, lastModified: new Date(), priority: 0.7 },
    ...getAllPosts().map((post) => ({
      url: `${SITE}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      priority: 0.6,
    })),
  ];
}
