import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";

const SITE = "https://faizanali.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified: new Date(), priority: 1 },
    ...projects.map((p) => ({
      url: `${SITE}/work/${p.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}
