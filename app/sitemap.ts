import type { MetadataRoute } from "next";

const BASE = "https://lioralabs.io";

// Public, indexable routes. The retired /privacy and /terms pages are left out
// on purpose so crawlers are guided to the current legal pages instead.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/work/adv", priority: 0.8, changeFrequency: "yearly" },
    { path: "/gizlilik", priority: 0.3, changeFrequency: "yearly" },
    { path: "/mesafeli-satis", priority: 0.3, changeFrequency: "yearly" },
    { path: "/iade-sartlari", priority: 0.3, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
