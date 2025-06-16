import { type NextRequest, NextResponse } from "next/server"

// Required for static export
export const dynamic = "force-static"
export const revalidate = false

// Mock data for static build
const mockTags = [
  {
    id: "1",
    name: "Next.js",
    slug: "nextjs",
    description: "The React framework for production",
    color: "#000000",
    _count: {
      posts: 5,
    },
  },
  {
    id: "2",
    name: "SEO",
    slug: "seo",
    description: "Search Engine Optimization techniques and best practices",
    color: "#3B82F6",
    _count: {
      posts: 3,
    },
  },
  {
    id: "3",
    name: "Performance",
    slug: "performance",
    description: "Web performance optimization and Core Web Vitals",
    color: "#10B981",
    _count: {
      posts: 2,
    },
  },
  {
    id: "4",
    name: "Security",
    slug: "security",
    description: "Web security best practices and ethical hacking insights",
    color: "#EF4444",
    _count: {
      posts: 4,
    },
  },
  {
    id: "5",
    name: "Best Practices",
    slug: "best-practices",
    description: "Development best practices and coding standards",
    color: "#8B5CF6",
    _count: {
      posts: 6,
    },
  },
]

export async function GET() {
  try {
    const response = {
      success: true,
      data: mockTags,
      message: `Retrieved ${mockTags.length} tags`,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching tags:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch tags" }, { status: 500 })
  }
}

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
    console.error("Error creating tag:", error)
    return NextResponse.json({ success: false, error: "Failed to create tag" }, { status: 500 })
  }
}
