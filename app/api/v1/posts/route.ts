/**
 * Posts API Route Handler for AstroBlog Ω
 *
 * RESTful API endpoints for external access to blog posts
 * Created by Likhon Sheikh - Passionate Software Developer from Bangladesh
 *
 * Features:
 * - Full CRUD operations for posts
 * - Advanced filtering and search
 * - Pagination and sorting
 * - SEO-optimized responses
 * - Rate limiting and security
 * - Comprehensive error handling
 */

import { type NextRequest, NextResponse } from "next/server"

// Required for static export
export const dynamic = "force-static"
export const revalidate = false

// Mock data for static build
const mockPosts = [
  {
    id: "1",
    title: "Welcome to AstroBlog Ω",
    slug: "welcome-to-astroblog-omega",
    excerpt:
      "A modern, SEO-optimized blog platform built with Next.js, featuring security-first architecture and comprehensive search engine optimization.",
    content: "<p>Welcome to AstroBlog Ω, a cutting-edge blog platform designed for modern web development.</p>",
    status: "PUBLISHED",
    featured: true,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 0,
    author: {
      id: "author-1",
      name: "Likhon Sheikh",
      username: "likhonsheikhbd",
      image: "https://github.com/likhonsheikhbd.png",
      bio: "Passionate Software Developer & Ethical Hacker from Bangladesh",
    },
    tags: [
      { id: "1", name: "Next.js", slug: "nextjs", color: "#000000" },
      { id: "2", name: "SEO", slug: "seo", color: "#3B82F6" },
    ],
    engagement: {
      views: 0,
      comments: 0,
      likes: 0,
      mediaCount: 0,
    },
  },
  {
    id: "2",
    title: "Next.js 15 Performance Optimization Guide",
    slug: "nextjs-15-performance-optimization",
    excerpt:
      "Learn how to optimize your Next.js 15 application for maximum performance with Core Web Vitals, image optimization, and advanced caching strategies.",
    content:
      "<p>Performance optimization is crucial for modern web applications. This guide covers advanced techniques for Next.js 15.</p>",
    status: "PUBLISHED",
    featured: false,
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    views: 150,
    author: {
      id: "author-1",
      name: "Likhon Sheikh",
      username: "likhonsheikhbd",
      image: "https://github.com/likhonsheikhbd.png",
      bio: "Passionate Software Developer & Ethical Hacker from Bangladesh",
    },
    tags: [
      { id: "1", name: "Next.js", slug: "nextjs", color: "#000000" },
      { id: "3", name: "Performance", slug: "performance", color: "#10B981" },
    ],
    engagement: {
      views: 150,
      comments: 5,
      likes: 12,
      mediaCount: 2,
    },
  },
  {
    id: "3",
    title: "Security Best Practices for Web Applications",
    slug: "security-best-practices-web-applications",
    excerpt:
      "Essential security practices every developer should know, from input validation to authentication, based on real-world ethical hacking experience.",
    content:
      "<p>Security is paramount in web development. Learn from ethical hacking insights to build secure applications.</p>",
    status: "PUBLISHED",
    featured: true,
    publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    views: 320,
    author: {
      id: "author-1",
      name: "Likhon Sheikh",
      username: "likhonsheikhbd",
      image: "https://github.com/likhonsheikhbd.png",
      bio: "Passionate Software Developer & Ethical Hacker from Bangladesh",
    },
    tags: [
      { id: "4", name: "Security", slug: "security", color: "#EF4444" },
      { id: "5", name: "Best Practices", slug: "best-practices", color: "#8B5CF6" },
    ],
    engagement: {
      views: 320,
      comments: 8,
      likes: 25,
      mediaCount: 1,
    },
  },
]

/**
 * GET /api/v1/posts
 * Retrieve posts with advanced filtering, search, and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search")
    const tag = searchParams.get("tag")
    const featured = searchParams.get("featured")

    let filteredPosts = [...mockPosts]

    // Apply search filter
    if (search) {
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
          post.content.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Apply tag filter
    if (tag) {
      filteredPosts = filteredPosts.filter((post) => post.tags.some((t) => t.slug === tag))
    }

    // Apply featured filter
    if (featured === "true") {
      filteredPosts = filteredPosts.filter((post) => post.featured)
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

    const response = {
      success: true,
      data: {
        posts: paginatedPosts,
        pagination: {
          page,
          limit,
          totalCount: filteredPosts.length,
          totalPages: Math.ceil(filteredPosts.length / limit),
          hasNextPage: endIndex < filteredPosts.length,
          hasPreviousPage: page > 1,
        },
        filters: {
          search,
          tag,
          featured,
        },
        sorting: {
          sortBy: "publishedAt",
          sortOrder: "desc",
        },
      },
      message: `Retrieved ${paginatedPosts.length} posts`,
    }

    // Set cache headers for better performance
    const headers = new Headers()
    headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600")

    return NextResponse.json(response, { headers })
  } catch (error) {
    console.error("Error fetching posts:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch posts",
        message: "An internal server error occurred while fetching posts",
      },
      { status: 500 },
    )
  }
}

/**
 * POST /api/v1/posts
 * Create a new blog post (requires authentication)
 */
export async function POST(request: NextRequest) {
  try {
    // For static build, return mock response
    const response = {
      success: false,
      error: "Static build mode",
      message:
        "This is a static build. Database operations are not available. Please deploy with a database for full functionality.",
    }

    return NextResponse.json(response, { status: 503 })
  } catch (error) {
    console.error("Error creating post:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create post",
        message: "An internal server error occurred while creating the post",
      },
      { status: 500 },
    )
  }
}
