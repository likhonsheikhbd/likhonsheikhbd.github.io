/**
 * Homepage for AstroBlog Ω - Enhanced Version
 *
 * Optimized homepage with hero section and featured content
 */

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, Twitter, Send, Star, BookOpen, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SITE_CONFIG } from "@/lib/constants"

// Mock featured posts
const featuredPosts = [
  {
    id: "1",
    title: "Welcome to AstroBlog Ω",
    slug: "welcome-to-astroblog-omega",
    excerpt: "A modern, SEO-optimized blog platform built with Next.js, featuring security-first architecture.",
    publishedAt: new Date(),
    readingTime: 5,
    tags: ["Next.js", "SEO", "Welcome"],
  },
  {
    id: "2",
    title: "Next.js 15 Performance Optimization Guide",
    slug: "nextjs-15-performance-optimization",
    excerpt: "Learn how to optimize your Next.js 15 application for maximum performance with Core Web Vitals.",
    publishedAt: new Date(Date.now() - 86400000),
    readingTime: 8,
    tags: ["Next.js", "Performance", "Optimization"],
  },
  {
    id: "3",
    title: "Security Best Practices for Web Applications",
    slug: "security-best-practices-web-applications",
    excerpt:
      "Essential security practices every developer should know, based on real-world ethical hacking experience.",
    publishedAt: new Date(Date.now() - 172800000),
    readingTime: 12,
    tags: ["Security", "Best Practices", "Ethical Hacking"],
  },
]

const features = [
  {
    icon: Shield,
    title: "Security-First Architecture",
    description: "Built with ethical hacking insights and security best practices from the ground up.",
  },
  {
    icon: Zap,
    title: "Performance Optimized",
    description: "Optimized for Core Web Vitals with fast loading times and excellent user experience.",
  },
  {
    icon: BookOpen,
    title: "SEO Excellence",
    description: "Comprehensive search engine optimization with structured data and meta tags.",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <Image
                src="https://bhnrpzuutgpf0gum.public.blob.vercel-storage.com/Untitled%20design-fRJuhvYSvjh8kp6Tk9AQtFPmMTzmyH.png"
                alt="AstroBlog Ω Logo"
                width={80}
                height={80}
                className="rounded-2xl shadow-lg"
                priority
              />
            </div>

            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                AstroBlog Ω
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
              A modern, SEO-optimized blog platform built with Next.js
            </p>

            {/* Description */}
            <p className="mb-10 text-lg text-muted-foreground max-w-2xl mx-auto">
              Featuring security-first architecture, comprehensive search engine optimization, and performance
              optimization. Created by <span className="font-semibold text-foreground">Likhon Sheikh</span>, a
              passionate software developer and ethical hacker from Bangladesh 🇧🇩.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/blog">
                  Explore Articles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link
                  href="https://github.com/likhonsheikhbd/astroblog-omega"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View Source
                </Link>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href={SITE_CONFIG.author.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href={SITE_CONFIG.author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter) Profile"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href={SITE_CONFIG.author.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram Profile"
                >
                  <Send className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Built for Modern Web Development</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Combining cutting-edge technology with security best practices and performance optimization.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Articles</h2>
              <p className="text-muted-foreground">Latest insights on web development, security, and technology</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/blog">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Badge variant="secondary" className="text-xs">
                      Featured
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{post.publishedAt.toLocaleDateString()}</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Image
                src={SITE_CONFIG.author.avatar || "/placeholder.svg"}
                alt={SITE_CONFIG.author.name}
                width={120}
                height={120}
                className="rounded-full mx-auto mb-6 shadow-lg"
              />
              <h2 className="text-3xl font-bold mb-4">About {SITE_CONFIG.author.name}</h2>
              <p className="text-lg text-muted-foreground mb-6">{SITE_CONFIG.author.bio}</p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                With years of experience in software development and ethical hacking, I create secure, performant, and
                SEO-optimized web applications. This blog shares insights, tutorials, and best practices from my journey
                in the world of web development and cybersecurity.
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/about">
                  Learn More About Me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
