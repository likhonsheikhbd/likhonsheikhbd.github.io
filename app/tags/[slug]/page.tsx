import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Eye, User } from "lucide-react"

interface TagPageProps {
  params: Promise<{ slug: string }>
}

// Mock tags data
const mockTags = [
  {
    id: "1",
    name: "Next.js",
    slug: "nextjs",
    description: "The React framework for production",
    color: "#000000",
    metaTitle: "Next.js Articles - AstroBlog Ω",
    metaDescription: "Explore articles about Next.js development, best practices, and advanced techniques.",
  },
  {
    id: "2",
    name: "SEO",
    slug: "seo",
    description: "Search Engine Optimization techniques and best practices",
    color: "#3B82F6",
    metaTitle: "SEO Articles - AstroBlog Ω",
    metaDescription: "Learn SEO best practices, optimization techniques, and search engine strategies.",
  },
  {
    id: "3",
    name: "Performance",
    slug: "performance",
    description: "Web performance optimization and Core Web Vitals",
    color: "#10B981",
    metaTitle: "Performance Articles - AstroBlog Ω",
    metaDescription: "Discover web performance optimization techniques and Core Web Vitals improvements.",
  },
  {
    id: "4",
    name: "Security",
    slug: "security",
    description: "Web security best practices and ethical hacking insights",
    color: "#EF4444",
    metaTitle: "Security Articles - AstroBlog Ω",
    metaDescription: "Learn web security best practices from an ethical hacker's perspective.",
  },
  {
    id: "5",
    name: "Best Practices",
    slug: "best-practices",
    description: "Development best practices and coding standards",
    color: "#8B5CF6",
    metaTitle: "Best Practices Articles - AstroBlog Ω",
    metaDescription: "Explore development best practices, coding standards, and professional techniques.",
  },
]

// Mock posts for each tag
const mockPostsByTag: Record<string, any[]> = {
  nextjs: [
    {
      id: "1",
      title: "Welcome to AstroBlog Ω",
      slug: "welcome-to-astroblog-omega",
      excerpt: "A modern, SEO-optimized blog platform built with Next.js",
      publishedAt: new Date(),
      views: 0,
      author: { name: "Likhon Sheikh", username: "likhonsheikhbd" },
    },
    {
      id: "2",
      title: "Next.js 15 Performance Optimization Guide",
      slug: "nextjs-15-performance-optimization",
      excerpt: "Learn how to optimize your Next.js 15 application for maximum performance",
      publishedAt: new Date(Date.now() - 86400000),
      views: 150,
      author: { name: "Likhon Sheikh", username: "likhonsheikhbd" },
    },
  ],
  seo: [
    {
      id: "1",
      title: "Welcome to AstroBlog Ω",
      slug: "welcome-to-astroblog-omega",
      excerpt: "A modern, SEO-optimized blog platform built with Next.js",
      publishedAt: new Date(),
      views: 0,
      author: { name: "Likhon Sheikh", username: "likhonsheikhbd" },
    },
  ],
  performance: [
    {
      id: "2",
      title: "Next.js 15 Performance Optimization Guide",
      slug: "nextjs-15-performance-optimization",
      excerpt: "Learn how to optimize your Next.js 15 application for maximum performance",
      publishedAt: new Date(Date.now() - 86400000),
      views: 150,
      author: { name: "Likhon Sheikh", username: "likhonsheikhbd" },
    },
  ],
  security: [
    {
      id: "3",
      title: "Security Best Practices for Web Applications",
      slug: "security-best-practices-web-applications",
      excerpt: "Essential security practices every developer should know",
      publishedAt: new Date(Date.now() - 172800000),
      views: 320,
      author: { name: "Likhon Sheikh", username: "likhonsheikhbd" },
    },
  ],
  "best-practices": [
    {
      id: "3",
      title: "Security Best Practices for Web Applications",
      slug: "security-best-practices-web-applications",
      excerpt: "Essential security practices every developer should know",
      publishedAt: new Date(Date.now() - 172800000),
      views: 320,
      author: { name: "Likhon Sheikh", username: "likhonsheikhbd" },
    },
  ],
}

async function getTag(slug: string) {
  return mockTags.find((tag) => tag.slug === slug) || null
}

async function getPostsByTag(slug: string) {
  return mockPostsByTag[slug] || []
}

export async function generateStaticParams() {
  return mockTags.map((tag) => ({
    slug: tag.slug,
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params
  const tag = await getTag(slug)

  if (!tag) {
    return {
      title: "Tag Not Found",
    }
  }

  return {
    title: tag.metaTitle,
    description: tag.metaDescription,
    openGraph: {
      title: tag.metaTitle,
      description: tag.metaDescription,
      type: "website",
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params
  const tag = await getTag(slug)
  const posts = await getPostsByTag(slug)

  if (!tag) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Tag Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Badge style={{ backgroundColor: tag.color }} className="text-white px-3 py-1">
            {tag.name}
          </Badge>
          <span className="text-muted-foreground">{posts.length} articles</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{tag.name} Articles</h1>
        <p className="text-lg text-muted-foreground">{tag.description}</p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>{post.publishedAt.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No articles found</h2>
          <p className="text-muted-foreground mb-4">There are no articles with the "{tag.name}" tag yet.</p>
          <Link href="/blog" className="text-primary hover:underline">
            Browse all articles
          </Link>
        </div>
      )}

      {/* Back to Tags */}
      <div className="mt-12 text-center">
        <Link href="/tags" className="text-primary hover:underline">
          ← View all tags
        </Link>
      </div>
    </div>
  )
}
