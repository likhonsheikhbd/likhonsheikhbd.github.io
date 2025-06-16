/**
 * Site Configuration Constants
 *
 * Centralized configuration for SEO, social media, and site metadata
 */

export const SITE_CONFIG = {
  name: "AstroBlog Ω",
  title: "AstroBlog Ω - Modern Next.js Blog Platform by Likhon Sheikh",
  description:
    "A cutting-edge, SEO-optimized blog platform built with Next.js 15, featuring security-first architecture, performance optimization, and comprehensive accessibility. Created by Likhon Sheikh, a passionate software developer and ethical hacker from Bangladesh.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://likhonsheikhbd.github.io",
  ogImage: "/og-image.jpg",
  favicon: "/favicon.ico",

  // Author information
  author: {
    name: "Likhon Sheikh",
    username: "likhonsheikhbd",
    email: "likhonsheikhbd@gmail.com",
    bio: "Passionate Software Developer & Ethical Hacker from Bangladesh 🇧🇩. Building secure, performant, and accessible web applications with modern technologies.",
    avatar: "https://github.com/likhonsheikhbd.png",
    location: "Dhaka, Bangladesh",
    website: "https://likhonsheikhbd.github.io",

    social: {
      github: "https://github.com/likhonsheikhbd",
      twitter: "https://twitter.com/likhonsheikhbd",
      telegram: "https://t.me/likhonsheikhbd",
      linkedin: "https://linkedin.com/in/likhonsheikhbd",
      website: "https://likhonsheikhbd.github.io",
    },
  },

  // Navigation
  navigation: [
    { name: "Home", href: "/", description: "Welcome to AstroBlog Ω" },
    { name: "Blog", href: "/blog/", description: "Latest articles and tutorials" },
    { name: "Tags", href: "/tags/", description: "Browse articles by topics" },
    { name: "About", href: "/about/", description: "Learn more about Likhon Sheikh" },
    { name: "Contact", href: "/contact/", description: "Get in touch" },
  ],

  // Features
  features: [
    {
      title: "Security-First Architecture",
      description: "Built with ethical hacking insights and comprehensive security best practices from the ground up.",
      icon: "Shield",
    },
    {
      title: "Performance Optimized",
      description: "Optimized for Core Web Vitals with lightning-fast loading times and excellent user experience.",
      icon: "Zap",
    },
    {
      title: "SEO Excellence",
      description:
        "Comprehensive search engine optimization with structured data, meta tags, and accessibility features.",
      icon: "Search",
    },
    {
      title: "Mobile-First Design",
      description: "Responsive design that works perfectly on all devices, from mobile phones to desktop computers.",
      icon: "Smartphone",
    },
    {
      title: "Accessibility Focused",
      description: "WCAG 2.1 AA compliant with comprehensive accessibility features for all users.",
      icon: "Eye",
    },
    {
      title: "Modern Technology",
      description: "Built with Next.js 15, TypeScript, Tailwind CSS, and other cutting-edge web technologies.",
      icon: "Code",
    },
  ],
}

export const SEO_CONFIG = {
  defaultTitle: SITE_CONFIG.title,
  titleTemplate: "%s | AstroBlog Ω",
  defaultDescription: SITE_CONFIG.description,

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },

  // Twitter
  twitter: {
    handle: "@likhonsheikhbd",
    site: "@likhonsheikhbd",
    cardType: "summary_large_image",
  },

  // Additional meta tags
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, viewport-fit=cover",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "default",
    },
    {
      name: "format-detection",
      content: "telephone=no",
    },
    {
      name: "mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "msapplication-config",
      content: "/browserconfig.xml",
    },
    {
      name: "msapplication-TileColor",
      content: "#000000",
    },
    {
      name: "theme-color",
      content: "#000000",
    },
  ],
}

// Schema.org structured data
export const SCHEMA_CONFIG = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    founder: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.website,
    },
    sameAs: Object.values(SITE_CONFIG.author.social),
  },

  website: {
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
  },
}
