import type { MetadataRoute } from "next";

// https://lioralabs.io/robots.txt — allow everything, point crawlers at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://lioralabs.io/sitemap.xml",
    host: "https://lioralabs.io",
  };
}
