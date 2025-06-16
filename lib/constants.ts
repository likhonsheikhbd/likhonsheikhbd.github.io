/**
 * Application Constants for AstroBlog Ω
 *
 * Centralized configuration and constants
 * Created by Likhon Sheikh - Passionate Software Developer from Bangladesh
 */

export const SITE_CONFIG = {
  name: "AstroBlog Ω",
  description: "A modern, SEO-optimized blog platform built with Next.js",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://likhonsheikhbd.vercel.app",
  ogImage: "/og-default.jpg",
  author: {
    name: "Likhon Sheikh",
    username: "likhonsheikhbd",
    bio: "Passionate Software Developer & Ethical Hacker from Bangladesh 🇧🇩",
    avatar: "https://github.com/likhonsheikhbd.png",
    social: {
      github: "https://github.com/likhonsheikhbd",
      twitter: "https://x.com/likhonsheikhbd",
      telegram: "https://t.me/likhonsheikhbd",
      email: "likhon@astroblog.dev",
      website: "https://likhonsheikh.dev",
    },
  },
} as const

export const API_CONFIG = {
  baseUrl: "/api/v1",
  timeout: 10000,
  retries: 3,
} as const

export const SEO_CONFIG = {
  defaultTitle: "AstroBlog Ω - Next.js Blog Platform",
  titleTemplate: "%s | AstroBlog Ω",
  defaultDescription: "A modern, SEO-optimized blog platform built with Next.js, Prisma, and Vercel.",
  siteUrl: SITE_CONFIG.url,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    handle: "@likhonsheikhbd",
    site: "@likhonsheikhbd",
    cardType: "summary_large_image",
  },
} as const

export const PAGINATION_CONFIG = {
  defaultPageSize: 10,
  maxPageSize: 50,
} as const

export const CACHE_CONFIG = {
  staticPages: 3600, // 1 hour
  dynamicPages: 300, // 5 minutes
  api: 60, // 1 minute
} as const
