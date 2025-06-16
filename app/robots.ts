import type { MetadataRoute } from "next"

// Required for static export
export const dynamic = "force-static"
export const revalidate = false

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lkhonsheikhbd.github.io"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/auth/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
