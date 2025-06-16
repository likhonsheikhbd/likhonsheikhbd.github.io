import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Eye, User, Star } from "lucide-react"

// Mock posts data
const mockPosts = [
  {
    id: "1",
    title: "Welcome to AstroBlog Ω",
    slug: "welcome-to-astroblog-omega",
    excerpt:
      "A modern, SEO-optimized blog platform built with Next.js, featuring security-first architecture and comprehensive search engine optimization.",
    publishedAt: new Date(),
    views: 0,
    featured: true,
    author: {
      name: "Likhon Sheikh",
      username: "likhonsheikhbd",
      image: "https://github.com/likhonsheikhbd.png",
    },
    tags: [
      { name: "Next.js", slug: "nextjs", color: "#000000" },
      { name: "SEO", slug: "seo", color: "#3B82F6" },
      { name: "Welcome", slug: "welcome", color: "#10B981" },
    ],
  },
  {
    id: "2",
    title: "Next.js 15 Performance Optimization Guide",
    slug: "nextjs-15-performance-optimization",
    excerpt:
      "Learn how to optimize your Next.js 15 application for maximum performance with Core Web Vitals, image optimization, and advanced caching strategies.",
    publishedAt: new Date(Date.now() - 86400000),
    views: 150,
    featured: false,
    author: {
      name: "Likhon Sheikh",
      username: "likhonsheikhbd",
      image: "https://github.com/likhonsheikhbd.png",
    },
    tags: [
      { name: "Next.js", slug: "nextjs", color: "#000000" },
      { name: "Performance", slug: "performance", color: "#10B981" },
      { name: "Optimization", slug: "optimization", color: "#F59E0B" },
    ],
  },
  {
    id: "3",
    title: "Security Best Practices for Web Applications",
    slug: "security-best-practices-web-applications",
    excerpt:
      "Essential security practices every developer should know, from input validation to authentication, based on real-world ethical hacking experience.",
    publishedAt: new Date(Date.now() - 172800000),
    views: 320,
    featured: true,
    author: {
      name: "Likhon Sheikh",
      username: "likhonsheikhbd",
      image: "https://github.com/likhonsheikhbd.png",
    },
    tags: [
      { name: "Security", slug: "security", color: "#EF4444" },
      { name: "Best Practices", slug: "best-practices", color: "#8B5CF6" },
      { name: "Ethical Hacking", slug: "ethical-hacking", color: "#DC2626" },
    ],
  },
]

export default function BlogPage() {
  const featuredPosts = mockPosts.filter((post) => post.featured)
  const regularPosts = mockPosts.filter((post) => !post.featured)

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Insights on Next.js development, web security, performance optimization, and modern web development practices
          from Likhon Sheikh.
        </p>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            <h2 className="text-2xl font-semibold">Featured Articles</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Featured
                    </Badge>
                    <div className="flex gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag.slug}
                          variant="outline"
                          style={{ borderColor: tag.color, color: tag.color }}
                          className="text-xs"
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
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
        </section>
      )}

      {/* All Posts */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">All Articles</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex gap-1 mb-2 flex-wrap">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Link key={tag.slug} href={`/tags/${tag.slug}`}>
                      <Badge
                        variant="outline"
                        style={{ borderColor: tag.color, color: tag.color }}
                        className="text-xs hover:bg-accent transition-colors"
                      >
                        {tag.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
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
      </section>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="bg-accent/50 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-2">Want to stay updated?</h3>
          <p className="text-muted-foreground mb-4">
            Follow Likhon Sheikh on social media for the latest updates on web development and security.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="https://github.com/likhonsheikhbd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </Link>
            <Link
              href="https://x.com/likhonsheikhbd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              X (Twitter)
            </Link>
            <Link
              href="https://t.me/likhonsheikhbd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Telegram
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
