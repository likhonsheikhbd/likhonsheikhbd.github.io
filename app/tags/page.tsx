import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Hash, FileText } from "lucide-react"

// Mock tags data with post counts
const mockTags = [
  {
    id: "1",
    name: "Next.js",
    slug: "nextjs",
    description: "The React framework for production",
    color: "#000000",
    postCount: 2,
  },
  {
    id: "2",
    name: "SEO",
    slug: "seo",
    description: "Search Engine Optimization techniques and best practices",
    color: "#3B82F6",
    postCount: 1,
  },
  {
    id: "3",
    name: "Performance",
    slug: "performance",
    description: "Web performance optimization and Core Web Vitals",
    color: "#10B981",
    postCount: 1,
  },
  {
    id: "4",
    name: "Security",
    slug: "security",
    description: "Web security best practices and ethical hacking insights",
    color: "#EF4444",
    postCount: 1,
  },
  {
    id: "5",
    name: "Best Practices",
    slug: "best-practices",
    description: "Development best practices and coding standards",
    color: "#8B5CF6",
    postCount: 1,
  },
  {
    id: "6",
    name: "Welcome",
    slug: "welcome",
    description: "Welcome posts and introductions",
    color: "#10B981",
    postCount: 1,
  },
  {
    id: "7",
    name: "Optimization",
    slug: "optimization",
    description: "Code and performance optimization techniques",
    color: "#F59E0B",
    postCount: 1,
  },
  {
    id: "8",
    name: "Ethical Hacking",
    slug: "ethical-hacking",
    description: "Ethical hacking insights and security research",
    color: "#DC2626",
    postCount: 1,
  },
]

export default function TagsPage() {
  // Sort tags by post count (descending) and then by name
  const sortedTags = [...mockTags].sort((a, b) => {
    if (b.postCount !== a.postCount) {
      return b.postCount - a.postCount
    }
    return a.name.localeCompare(b.name)
  })

  const totalPosts = mockTags.reduce((sum, tag) => sum + tag.postCount, 0)

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Hash className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Tags</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore articles by topic. Browse through {mockTags.length} tags covering {totalPosts} articles on web
          development, security, and technology.
        </p>
      </div>

      {/* Tags Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedTags.map((tag) => (
          <Card key={tag.id} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge style={{ backgroundColor: tag.color }} className="text-white px-3 py-1 text-sm font-medium">
                  {tag.name}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>{tag.postCount}</span>
                </div>
              </div>
              <CardTitle className="text-lg">
                <Link
                  href={`/tags/${tag.slug}`}
                  className="hover:text-primary transition-colors"
                  style={{ color: tag.color }}
                >
                  #{tag.slug}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="line-clamp-2 mb-3">{tag.description}</CardDescription>
              <Link
                href={`/tags/${tag.slug}`}
                className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-1"
              >
                View articles
                <span>→</span>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Tags Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Popular Tags</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {sortedTags
            .filter((tag) => tag.postCount > 0)
            .slice(0, 8)
            .map((tag) => (
              <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <Badge
                  variant="outline"
                  style={{ borderColor: tag.color, color: tag.color }}
                  className="px-4 py-2 text-sm hover:bg-accent transition-colors cursor-pointer"
                >
                  {tag.name} ({tag.postCount})
                </Badge>
              </Link>
            ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="bg-accent/50 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-2">Explore More Content</h3>
          <p className="text-muted-foreground mb-4">
            Discover more articles and insights on web development, security, and technology.
          </p>
          <Link href="/blog" className="text-primary hover:underline font-medium">
            Browse all articles →
          </Link>
        </div>
      </div>
    </div>
  )
}
