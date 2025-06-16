/**
 * SEO Utilities for AstroBlog Ω - Enhanced Version
 *
 * Comprehensive SEO utilities with improved error handling and performance
 */

import type { Metadata } from "next"
import { SITE_CONFIG, SEO_CONFIG } from "./constants"

interface SEOConfig {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  author?: string
  tags?: string[]
  noIndex?: boolean
  canonical?: string
}

/**
 * Generate comprehensive metadata for pages
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    image,
    url,
    type = "website",
    publishedTime,
    modifiedTime,
    author,
    tags = [],
    noIndex = false,
    canonical,
  } = config

  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : SEO_CONFIG.defaultTitle

  const fullDescription = description || SEO_CONFIG.defaultDescription
  const fullUrl = url ? `${SITE_CONFIG.url}${url}` : SITE_CONFIG.url
  const fullImage = image ? `${SITE_CONFIG.url}${image}` : `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,

    // Open Graph
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_US",
      type,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        tags,
      }),
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      site: SEO_CONFIG.twitter.handle,
      creator: SEO_CONFIG.twitter.handle,
      images: [fullImage],
    },

    // Robots
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Canonical URL
    alternates: {
      canonical: canonical || fullUrl,
    },

    // Additional metadata
    keywords: tags.length > 0 ? tags : undefined,
    authors: author ? [{ name: author }] : undefined,
  }

  return metadata
}

/**
 * Generate metadata for blog posts
 */
export function generatePostMetadata(post: {
  title: string
  slug: string
  excerpt?: string
  metaTitle?: string
  metaDescription?: string
  ogImage?: string
  keywords: string[]
  publishedAt: Date | null
  updatedAt: Date
  author: {
    name: string
  }
  tags: Array<{
    tag: {
      name: string
    }
  }>
}): Metadata {
  return generateMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    image: post.ogImage,
    url: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt?.toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
    author: post.author.name,
    tags: [...post.keywords, ...post.tags.map(({ tag }) => tag.name)],
  })
}

/**
 * Generate structured data for blog posts
 */
export function generateStructuredData(post: {
  title: string
  slug: string
  excerpt?: string
  content: string
  publishedAt: Date | null
  updatedAt: Date
  keywords: string[]
  author: {
    name: string
    image?: string
  }
  tags: Array<{
    tag: {
      name: string
    }
  }>
}) {
  const publishedDate = post.publishedAt || post.updatedAt

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.author.image ? `${SITE_CONFIG.url}${post.author.image}` : undefined,
    datePublished: publishedDate.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name,
      image: post.author.image,
      url: SITE_CONFIG.author.social.website,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
    articleSection: post.tags.map(({ tag }) => tag.name).join(", "),
    wordCount: post.content.split(" ").length,
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
  }
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(
  items: Array<{
    name: string
    url?: string
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && {
        item: {
          "@type": "WebPage",
          "@id": `${SITE_CONFIG.url}${item.url}`,
        },
      }),
    })),
  }
}

/**
 * Generate organization structured data
 */
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.url}/logo.png`,
    },
    founder: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.social.website,
    },
    sameAs: [SITE_CONFIG.author.social.github, SITE_CONFIG.author.social.twitter, SITE_CONFIG.author.social.telegram],
  }
}

/**
 * Generate website structured data
 */
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
  }
}
