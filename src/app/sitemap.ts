import type { MetadataRoute } from "next";

import { blogPosts, featuredProjects } from "@/lib/data";

const BASE_URL = "https://codeique.studio";
const STATIC_FALLBACK_DATE = "2026-03-01T00:00:00.000Z";
const LEGAL_FALLBACK_DATE = "2026-01-01T00:00:00.000Z";

function parseDate(dateStr: string): string {
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime())
    ? LEGAL_FALLBACK_DATE
    : parsed.toISOString();
}

function parseProjectDate(year: string): string {
  const parsed = new Date(`${year}-11-01T00:00:00.000Z`);
  return isNaN(parsed.getTime())
    ? STATIC_FALLBACK_DATE
    : parsed.toISOString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: STATIC_FALLBACK_DATE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: STATIC_FALLBACK_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/works`, lastModified: STATIC_FALLBACK_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: STATIC_FALLBACK_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: STATIC_FALLBACK_DATE, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE_URL}/privacy`, lastModified: LEGAL_FALLBACK_DATE, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: LEGAL_FALLBACK_DATE, changeFrequency: "yearly", priority: 0.3 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = featuredProjects.map((project) => ({
    url: `${BASE_URL}/works/${project.slug}`,
    lastModified: parseProjectDate(project.year),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: parseDate(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
