import type { MetadataRoute } from "next"

// Required for static export
export const dynamic = "force-static"
export const revalidate = false

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lkhonsheikhbd.github.io"

export default function sitemap(): MetadataRoute.Sitemap {
  // Mock posts for sitemap generation
  const mockPosts = [
    {
      slug: "welcome-to-astroblog-omega",
      updatedAt: new Date(),
    },
    {
      slug: "nextjs-15-performance-optimization",
      updatedAt: new Date(Date.now() - 86400000),
    },
    {
      slug: "security-best-practices-web-applications",
      updatedAt: new Date(Date.now() - 172800000),
    },
  ]

  const mockTags = [
    { slug: "nextjs", updatedAt: new Date() },
    { slug: "seo", updatedAt: new Date() },
    { slug: "performance", updatedAt: new Date() },
    { slug: "security", updatedAt: new Date() },
    { slug: "best-practices", updatedAt: new Date() },
  ]

  const postUrls = mockPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const tagUrls = mockTags.map((tag) => ({
    url: `${siteUrl}/tags/${tag.slug}`,
    lastModified: tag.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...postUrls,
    ...tagUrls,
  ]
}
