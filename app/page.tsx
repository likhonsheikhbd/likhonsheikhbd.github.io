/**
 * Homepage - Mobile-First, Accessible, SEO-Optimized
 *
 * Comprehensive homepage with advanced SEO, accessibility, and responsive design
 */

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Github, Twitter, Send, Star, Shield, Zap, Smartphone, Eye, Code, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StructuredData } from "@/components/structured-data"
import { SITE_CONFIG } from "@/lib/constants"

// Enhanced metadata for homepage
export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to AstroBlog Ω - A cutting-edge, SEO-optimized blog platform built with Next.js 15. Featuring security-first architecture, performance optimization, and comprehensive accessibility by Likhon Sheikh.",
  keywords: [
    "AstroBlog Omega",
    "Next.js blog platform",
    "SEO optimized blog",
    "Security-first architecture",
    "Performance optimization",
    "Accessibility",
    "Mobile-first design",
    "Likhon Sheikh",
    "Bangladesh developer",
    "Web development blog",
    "Technical blog platform",
    "Modern web development",
    "React blog",
    "TypeScript blog",
  ],
  openGraph: {
    title: "AstroBlog Ω - Modern Next.js Blog Platform by Likhon Sheikh",
    description:
      "A cutting-edge, SEO-optimized blog platform built with Next.js 15, featuring security-first architecture and comprehensive accessibility.",
    images: [
      {
        url: `${SITE_CONFIG.url}/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: "AstroBlog Ω Homepage - Modern Next.js Blog Platform",
      },
    ],
  },
  twitter: {
    title: "AstroBlog Ω - Modern Next.js Blog Platform",
    description: "A cutting-edge, SEO-optimized blog platform built with Next.js 15 by Likhon Sheikh from Bangladesh.",
    images: [`${SITE_CONFIG.url}/og-home.jpg`],
  },
}

// Mock featured posts with enhanced metadata
const featuredPosts = [
  {
    id: "1",
    title: "Welcome to AstroBlog Ω: The Future of Blog Platforms",
    slug: "welcome-to-astroblog-omega",
    excerpt:
      "Discover how AstroBlog Ω revolutionizes blogging with Next.js 15, security-first architecture, and comprehensive SEO optimization.",
    publishedAt: new Date(),
    readingTime: 5,
    tags: ["Next.js", "SEO", "Welcome", "Blog Platform"],
    category: "Platform",
    featured: true,
  },
  {
    id: "2",
    title: "Next.js 15 Performance Optimization: Complete Guide",
    slug: "nextjs-15-performance-optimization",
    excerpt:
      "Master Next.js 15 performance optimization with Core Web Vitals, image optimization, caching strategies, and advanced techniques.",
    publishedAt: new Date(Date.now() - 86400000),
    readingTime: 8,
    tags: ["Next.js", "Performance", "Optimization", "Core Web Vitals"],
    category: "Tutorial",
    featured: true,
  },
  {
    id: "3",
    title: "Web Security Best Practices: An Ethical Hacker's Guide",
    slug: "security-best-practices-web-applications",
    excerpt:
      "Learn essential web security practices from an ethical hacker's perspective, covering authentication, XSS prevention, and more.",
    publishedAt: new Date(Date.now() - 172800000),
    readingTime: 12,
    tags: ["Security", "Best Practices", "Ethical Hacking", "Web Security"],
    category: "Security",
    featured: true,
  },
]

// Enhanced features with icons
const features = [
  {
    icon: Shield,
    title: "Security-First Architecture",
    description: "Built with ethical hacking insights and comprehensive security best practices from the ground up.",
    benefits: ["XSS Protection", "CSRF Prevention", "Secure Headers", "Input Validation"],
  },
  {
    icon: Zap,
    title: "Performance Optimized",
    description: "Optimized for Core Web Vitals with lightning-fast loading times and excellent user experience.",
    benefits: ["Core Web Vitals", "Image Optimization", "Bundle Splitting", "Caching Strategy"],
  },
  {
    icon: Search,
    title: "SEO Excellence",
    description:
      "Comprehensive search engine optimization with structured data, meta tags, and accessibility features.",
    benefits: ["Structured Data", "Meta Optimization", "Sitemap Generation", "Schema Markup"],
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Responsive design that works perfectly on all devices, from mobile phones to desktop computers.",
    benefits: ["Responsive Layout", "Touch Friendly", "Progressive Enhancement", "Adaptive Images"],
  },
  {
    icon: Eye,
    title: "Accessibility Focused",
    description: "WCAG 2.1 AA compliant with comprehensive accessibility features for all users.",
    benefits: ["Screen Reader Support", "Keyboard Navigation", "Color Contrast", "Focus Management"],
  },
  {
    icon: Code,
    title: "Modern Technology",
    description: "Built with Next.js 15, TypeScript, Tailwind CSS, and other cutting-edge web technologies.",
    benefits: ["Next.js 15", "TypeScript", "Tailwind CSS", "Modern APIs"],
  },
]

// Structured data for homepage
const homepageStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AstroBlog Ω - Modern Next.js Blog Platform",
  description:
    "A cutting-edge, SEO-optimized blog platform built with Next.js 15, featuring security-first architecture and comprehensive accessibility.",
  url: SITE_CONFIG.url,
  mainEntity: {
    "@type": "Blog",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.website,
      sameAs: Object.values(SITE_CONFIG.author.social),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: `${SITE_CONFIG.url}/logo.png`,
    },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.url,
      },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <StructuredData data={homepageStructuredData} />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-12 sm:py-16 md:py-20 lg:py-32"
          aria-labelledby="hero-heading"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              {/* Logo */}
              <div className="mb-6 sm:mb-8 flex justify-center">
                <Image
                  src="https://bhnrpzuutgpf0gum.public.blob.vercel-storage.com/Untitled%20design-fRJuhvYSvjh8kp6Tk9AQtFPmMTzmyH.png"
                  alt="AstroBlog Ω Logo - Modern Next.js Blog Platform"
                  width={80}
                  height={80}
                  className="rounded-2xl shadow-lg"
                  priority
                  sizes="(max-width: 768px) 60px, 80px"
                />
              </div>

              {/* Main Heading */}
              <h1
                id="hero-heading"
                className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
              >
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  AstroBlog Ω
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mb-6 sm:mb-8 text-lg sm:text-xl md:text-2xl text-muted-foreground">
                A modern, SEO-optimized blog platform built with Next.js
              </p>

              {/* Description */}
              <p className="mb-8 sm:mb-10 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Featuring security-first architecture, comprehensive search engine optimization, and performance
                optimization. Created by <span className="font-semibold text-foreground">Likhon Sheikh</span>, a
                passionate software developer and ethical hacker from Bangladesh 🇧🇩.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
                <Button asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8">
                  <Link href="/blog/" aria-describedby="explore-articles-desc">
                    Explore Articles
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  </Link>
                </Button>
                <span id="explore-articles-desc" className="sr-only">
                  Browse our collection of technical articles and tutorials
                </span>

                <Button asChild variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8">
                  <Link
                    href="https://github.com/likhonsheikhbd/astroblog-omega"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-describedby="view-source-desc"
                  >
                    <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                    View Source
                  </Link>
                </Button>
                <span id="view-source-desc" className="sr-only">
                  View the source code on GitHub (opens in new tab)
                </span>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-2 sm:gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href={SITE_CONFIG.author.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Likhon Sheikh's GitHub profile (opens in new tab)"
                  >
                    <Github className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href={SITE_CONFIG.author.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Likhon Sheikh's X (Twitter) profile (opens in new tab)"
                  >
                    <Twitter className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href={SITE_CONFIG.author.social.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact Likhon Sheikh on Telegram (opens in new tab)"
                  >
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-muted/30" aria-labelledby="features-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                Built for Modern Web Development
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Combining cutting-edge technology with security best practices and performance optimization.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center border-0 shadow-lg h-full">
                  <CardHeader className="pb-4">
                    <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10">
                      <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm sm:text-base mb-4">{feature.description}</CardDescription>
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center justify-center gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full" aria-hidden="true"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="py-12 sm:py-16 md:py-20" aria-labelledby="featured-posts-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-4">
              <div>
                <h2 id="featured-posts-heading" className="text-2xl sm:text-3xl font-bold mb-2">
                  Featured Articles
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Latest insights on web development, security, and technology
                </p>
              </div>
              <Button asChild variant="outline" className="self-start sm:self-auto">
                <Link href="/blog/" aria-describedby="view-all-desc">
                  View All Articles
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <span id="view-all-desc" className="sr-only">
                Browse all articles in our blog
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" aria-hidden="true" />
                      <Badge variant="secondary" className="text-xs">
                        Featured
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2 text-base sm:text-lg">
                      <Link
                        href={`/blog/${post.slug}/`}
                        className="hover:text-primary transition-colors"
                        aria-describedby={`post-${post.id}-desc`}
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription id={`post-${post.id}-desc`} className="line-clamp-3 text-sm">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                      <time dateTime={post.publishedAt.toISOString()}>{post.publishedAt.toLocaleDateString()}</time>
                      <span>{post.readingTime} min read</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-muted/30" aria-labelledby="about-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6 sm:mb-8">
                <Image
                  src={SITE_CONFIG.author.avatar || "/placeholder.svg"}
                  alt={`${SITE_CONFIG.author.name} - Software Developer and Ethical Hacker from Bangladesh`}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4 sm:mb-6 shadow-lg"
                  sizes="(max-width: 768px) 100px, 120px"
                />
                <h2 id="about-heading" className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                  About {SITE_CONFIG.author.name}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">{SITE_CONFIG.author.bio}</p>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  With years of experience in software development and ethical hacking, I create secure, performant, and
                  SEO-optimized web applications. This blog shares insights, tutorials, and best practices from my
                  journey in the world of web development and cybersecurity.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button asChild className="text-sm sm:text-base">
                  <Link href="/about/" aria-describedby="learn-more-desc">
                    Learn More About Me
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <span id="learn-more-desc" className="sr-only">
                  Read more about Likhon Sheikh's background and experience
                </span>

                <Button asChild variant="outline" className="text-sm sm:text-base">
                  <Link href="/contact/" aria-describedby="contact-desc">
                    Get In Touch
                  </Link>
                </Button>
                <span id="contact-desc" className="sr-only">
                  Contact Likhon Sheikh for collaboration or inquiries
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
