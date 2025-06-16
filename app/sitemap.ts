import type { MetadataRoute } from "next"

// Required for static export
export const dynamic = "force-static"
export const revalidate = false

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://likhonsheikhbd.github.io"

export default function sitemap(): MetadataRoute.Sitemap {
  // Mock posts for sitemap generation
  const mockPosts = [
    {
      slug: "welcome-to-astroblog-omega",
      updatedAt: new Date(),
      priority: 0.9,
    },
    {
      slug: "nextjs-15-performance-optimization",
      updatedAt: new Date(Date.now() - 86400000),
      priority: 0.8,
    },
    {
      slug: "security-best-practices-web-applications",
      updatedAt: new Date(Date.now() - 172800000),
      priority: 0.8,
    },
  ]

  const mockTags = [
    { slug: "nextjs", updatedAt: new Date(), priority: 0.7 },
    { slug: "seo", updatedAt: new Date(), priority: 0.7 },
    { slug: "performance", updatedAt: new Date(), priority: 0.7 },
    { slug: "security", updatedAt: new Date(), priority: 0.7 },
    { slug: "best-practices", updatedAt: new Date(), priority: 0.6 },
    { slug: "accessibility", updatedAt: new Date(), priority: 0.6 },
    { slug: "mobile-first", updatedAt: new Date(), priority: 0.6 },
  ]

  // Generate post URLs
  const postUrls = mockPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}/`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: post.priority,
  }))

  // Generate tag URLs
  const tagUrls = mockTags.map((tag) => ({
    url: `${siteUrl}/tags/${tag.slug}/`,
    lastModified: tag.updatedAt,
    changeFrequency: "weekly" as const,
    priority: tag.priority,
  }))

  return [
    // Main pages
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tags/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Dynamic pages
    ...postUrls,
    ...tagUrls,
  ]
}
