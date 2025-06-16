"use client"

/**
 * Blog Post Component - Enhanced Version
 *
 * Comprehensive blog post display with SEO optimization and accessibility
 */

import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, Eye, User, Share2, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { formatDate, formatRelativeTime, calculateReadingTime, extractTextFromHtml } from "@/lib/utils"
import { SITE_CONFIG } from "@/lib/constants"

interface BlogPostProps {
  post: {
    id: string
    title: string
    slug: string
    excerpt?: string
    content: string
    status: string
    featured: boolean
    publishedAt: Date | null
    createdAt: Date
    updatedAt: Date
    views: number
    metaTitle?: string
    metaDescription?: string
    ogImage?: string
    keywords: string[]
    author: {
      id: string
      name: string
      username?: string
      image?: string
      bio?: string
    }
    tags: Array<{
      tag: {
        id: string
        name: string
        slug: string
        color: string
      }
    }>
    media: any[]
  }
}

export function BlogPost({ post }: BlogPostProps) {
  const readingTime = calculateReadingTime(extractTextFromHtml(post.content))
  const publishedDate = post.publishedAt || post.createdAt

  const breadcrumbItems = [{ label: "Blog", href: "/blog" }, { label: post.title }]

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt || extractTextFromHtml(post.content).slice(0, 160),
      url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.error("Error sharing:", error)
        // Fallback to copying URL
        await navigator.clipboard.writeText(shareData.url)
      }
    } else {
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(shareData.url)
        // You could show a toast notification here
      } catch (error) {
        console.error("Error copying to clipboard:", error)
      }
    }
  }

  return (
    <article className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Article Header */}
      <header className="mb-8">
        {/* Featured Badge */}
        {post.featured && (
          <div className="mb-4">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              Featured Article
            </Badge>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{post.title}</h1>

        {/* Excerpt */}
        {post.excerpt && <p className="text-xl text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>}

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          {/* Author */}
          <div className="flex items-center gap-2">
            {post.author.image && (
              <Image
                src={post.author.image || "/placeholder.svg"}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <Link
                href={`/author/${post.author.username || post.author.id}`}
                className="hover:text-foreground transition-colors"
              >
                {post.author.name}
              </Link>
            </div>
          </div>

          {/* Published Date */}
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={publishedDate.toISOString()}>{formatDate(publishedDate)}</time>
          </div>

          {/* Reading Time */}
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>

          {/* Views */}
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{post.views.toLocaleString()} views</span>
          </div>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(({ tag }) => (
              <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <Badge
                  variant="outline"
                  style={{ borderColor: tag.color, color: tag.color }}
                  className="hover:bg-accent transition-colors"
                >
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Like
          </Button>
        </div>
      </header>

      <Separator className="mb-8" />

      {/* Article Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:pl-4"
        data-testid="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <Separator className="my-8" />

      {/* Article Footer */}
      <footer className="space-y-6">
        {/* Author Bio */}
        <div className="bg-muted/50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            {post.author.image && (
              <Image
                src={post.author.image || "/placeholder.svg"}
                alt={post.author.name}
                width={64}
                height={64}
                className="rounded-full"
              />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">About {post.author.name}</h3>
              {post.author.bio && <p className="text-muted-foreground mb-3">{post.author.bio}</p>}
              <div className="flex items-center gap-4">
                <Link
                  href={SITE_CONFIG.author.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  GitHub
                </Link>
                <Link
                  href={SITE_CONFIG.author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  X (Twitter)
                </Link>
                <Link
                  href={SITE_CONFIG.author.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  Telegram
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Article Meta */}
        <div className="text-sm text-muted-foreground">
          <p>
            Published on {formatDate(publishedDate)}
            {post.updatedAt.getTime() !== post.createdAt.getTime() && (
              <span> • Updated {formatRelativeTime(post.updatedAt)}</span>
            )}
          </p>
          {post.keywords.length > 0 && <p className="mt-1">Keywords: {post.keywords.join(", ")}</p>}
        </div>
      </footer>
    </article>
  )
}
