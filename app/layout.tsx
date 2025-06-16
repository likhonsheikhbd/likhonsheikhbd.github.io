import type React from "react"
/**
 * Root Layout - Mobile-First, Accessible, SEO-Optimized
 *
 * Comprehensive root layout with advanced SEO, accessibility, and performance features
 */

import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { SkipToContent } from "@/components/ui/skip-to-content"
import { StructuredData } from "@/components/structured-data"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SITE_CONFIG, SEO_CONFIG, SCHEMA_CONFIG } from "@/lib/constants"
import "./globals.css"

// Optimized font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

// Viewport configuration for mobile-first design
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

// Comprehensive metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),

  // Basic metadata
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: SEO_CONFIG.titleTemplate,
  },
  description: SEO_CONFIG.defaultDescription,

  // Keywords and categorization
  keywords: [
    "Next.js blog",
    "React blog platform",
    "TypeScript blog",
    "SEO optimized blog",
    "Web development blog",
    "Security blog",
    "Performance optimization",
    "Accessibility",
    "Mobile-first design",
    "Likhon Sheikh",
    "Bangladesh developer",
    "Ethical hacking",
    "Software development",
    "Modern web development",
    "Blog platform",
    "Technical writing",
    "Programming tutorials",
    "Web security",
    "Frontend development",
    "Backend development",
  ],

  // Author and creator information
  authors: [
    {
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.website,
    },
  ],
  creator: SITE_CONFIG.author.name,
  publisher: SITE_CONFIG.author.name,

  // Content categorization
  category: "Technology",
  classification: "Blog",

  // Language and locale
  language: "en-US",

  // Format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Open Graph metadata
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Modern Next.js Blog Platform`,
        type: "image/jpeg",
      },
      {
        url: `${SITE_CONFIG.url}/og-image-square.jpg`,
        width: 1200,
        height: 1200,
        alt: `${SITE_CONFIG.name} - Square Logo`,
        type: "image/jpeg",
      },
    ],
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    site: SEO_CONFIG.twitter.handle,
    creator: SEO_CONFIG.twitter.handle,
    images: [`${SITE_CONFIG.url}/og-image.jpg`],
  },

  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    bing: process.env.BING_VERIFICATION,
  },

  // Canonical and alternates
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      "en-US": SITE_CONFIG.url,
    },
    types: {
      "application/rss+xml": `${SITE_CONFIG.url}/rss.xml`,
      "application/atom+xml": `${SITE_CONFIG.url}/atom.xml`,
    },
  },

  // App-specific metadata
  applicationName: SITE_CONFIG.name,
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",

  // Apple-specific metadata
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_CONFIG.name,
  },

  // Additional metadata
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
  },

  // Manifest
  manifest: "/manifest.json",

  // Icons
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" }],
  },
    generator: 'v0.dev'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//avatars.githubusercontent.com" />

        {/* Structured Data */}
        <StructuredData data={[SCHEMA_CONFIG.organization, SCHEMA_CONFIG.website]} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {/* Skip to content link for accessibility */}
            <SkipToContent />

            {/* Main layout structure */}
            <div className="relative flex min-h-screen flex-col">
              {/* Navigation */}
              <Navigation />

              {/* Main content */}
              <main id="main-content" className="flex-1" role="main" aria-label="Main content">
                {children}
              </main>

              {/* Footer */}
              <Footer />
            </div>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
