import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { generatePostMetadata, generateStructuredData } from "@/lib/seo"
import { StructuredData } from "@/components/structured-data"
import { BlogPost } from "@/components/blog-post"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Mock posts data for static generation
const mockPosts = [
  {
    id: "1",
    title: "Welcome to AstroBlog Ω",
    slug: "welcome-to-astroblog-omega",
    excerpt:
      "A modern, SEO-optimized blog platform built with Next.js, featuring security-first architecture and comprehensive search engine optimization.",
    content: `
      <div class="prose lg:prose-xl max-w-none">
        <h2>Introduction to AstroBlog Ω</h2>
        <p>Welcome to AstroBlog Ω, a cutting-edge blog platform designed for modern web development. This platform showcases the latest in Next.js development, security best practices, and SEO optimization techniques.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li><strong>Security-First Architecture:</strong> Built with ethical hacking insights and security best practices</li>
          <li><strong>SEO Optimization:</strong> Comprehensive search engine optimization with structured data</li>
          <li><strong>Performance:</strong> Optimized for Core Web Vitals and fast loading times</li>
          <li><strong>Modern Design:</strong> Built with Geist Design System and Tailwind CSS</li>
        </ul>
        
        <h3>Technology Stack</h3>
        <p>This platform is built using cutting-edge technologies:</p>
        <ul>
          <li>Next.js 15 with App Router</li>
          <li>TypeScript for type safety</li>
          <li>Prisma with PostgreSQL</li>
          <li>NextAuth for authentication</li>
          <li>Vercel for deployment</li>
        </ul>
        
        <h3>About the Creator</h3>
        <p>Created by <strong>Likhon Sheikh</strong>, a passionate software developer and ethical hacker from Bangladesh. This project demonstrates modern web development practices combined with security-first principles.</p>
        
        <blockquote>
          <p>"Security and performance should never be an afterthought in web development. They should be built into the foundation of every application."</p>
          <cite>— Likhon Sheikh</cite>
        </blockquote>
      </div>
    `,
    status: "PUBLISHED" as const,
    featured: true,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 0,
    metaTitle: "Welcome to AstroBlog Ω - Next.js Blog Platform",
    metaDescription:
      "Discover AstroBlog Ω, a modern SEO-optimized blog platform built with Next.js, featuring security-first architecture and comprehensive search engine optimization.",
    ogImage: "/og-welcome.jpg",
    keywords: ["Next.js", "Blog Platform", "SEO", "Security", "Web Development"],
    author: {
      id: "author-1",
      name: "Likhon Sheikh",
      username: "likhonsheikhbd",
      image: "https://github.com/likhonsheikhbd.png",
      bio: "Passionate Software Developer & Ethical Hacker from Bangladesh",
    },
    tags: [
      { tag: { id: "1", name: "Next.js", slug: "nextjs", color: "#000000" } },
      { tag: { id: "2", name: "SEO", slug: "seo", color: "#3B82F6" } },
      { tag: { id: "6", name: "Welcome", slug: "welcome", color: "#10B981" } },
    ],
    media: [],
  },
  {
    id: "2",
    title: "Next.js 15 Performance Optimization Guide",
    slug: "nextjs-15-performance-optimization",
    excerpt:
      "Learn how to optimize your Next.js 15 application for maximum performance with Core Web Vitals, image optimization, and advanced caching strategies.",
    content: `
      <div class="prose lg:prose-xl max-w-none">
        <h2>Performance Optimization in Next.js 15</h2>
        <p>Performance is crucial for user experience and SEO rankings. This comprehensive guide covers advanced optimization techniques for Next.js 15 applications.</p>
        
        <h3>Core Web Vitals</h3>
        <p>Google's Core Web Vitals are essential metrics for measuring user experience:</p>
        <ul>
          <li><strong>Largest Contentful Paint (LCP):</strong> Should be under 2.5 seconds</li>
          <li><strong>First Input Delay (FID):</strong> Should be under 100 milliseconds</li>
          <li><strong>Cumulative Layout Shift (CLS):</strong> Should be under 0.1</li>
        </ul>
        
        <h3>Image Optimization</h3>
        <p>Next.js provides excellent image optimization out of the box:</p>
        <pre><code>import Image from 'next/image'

export function OptimizedImage() {
  return (
    &lt;Image
      src="/hero-image.jpg"
      alt="Hero Image"
      width={1200}
      height={630}
      priority
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    /&gt;
  )
}</code></pre>
        
        <h3>Caching Strategies</h3>
        <p>Implement effective caching for better performance:</p>
        <ul>
          <li>Static Generation (SSG) for content that doesn't change often</li>
          <li>Incremental Static Regeneration (ISR) for dynamic content</li>
          <li>Edge caching with Vercel Edge Network</li>
          <li>Browser caching with proper cache headers</li>
        </ul>
        
        <h3>Bundle Optimization</h3>
        <p>Reduce bundle size with these techniques:</p>
        <ul>
          <li>Tree shaking to eliminate unused code</li>
          <li>Code splitting with dynamic imports</li>
          <li>Optimized package imports</li>
          <li>Webpack bundle analyzer for insights</li>
        </ul>
      </div>
    `,
    status: "PUBLISHED" as const,
    featured: false,
    publishedAt: new Date(Date.now() - 86400000),
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
    views: 150,
    metaTitle: "Next.js 15 Performance Optimization - Complete Guide",
    metaDescription:
      "Master Next.js 15 performance optimization with Core Web Vitals, image optimization, caching strategies, and bundle optimization techniques.",
    ogImage: "/og-performance.jpg",
    keywords: ["Next.js", "Performance", "Optimization", "Core Web Vitals", "Caching"],
    author: {
      id: "author-1",
      name: "Likhon Sheikh",
      username: "likhonsheikhbd",
      image: "https://github.com/likhonsheikhbd.png",
      bio: "Passionate Software Developer & Ethical Hacker from Bangladesh",
    },
    tags: [
      { tag: { id: "1", name: "Next.js", slug: "nextjs", color: "#000000" } },
      { tag: { id: "3", name: "Performance", slug: "performance", color: "#10B981" } },
      { tag: { id: "7", name: "Optimization", slug: "optimization", color: "#F59E0B" } },
    ],
    media: [],
  },
  {
    id: "3",
    title: "Security Best Practices for Web Applications",
    slug: "security-best-practices-web-applications",
    excerpt:
      "Essential security practices every developer should know, from input validation to authentication, based on real-world ethical hacking experience.",
    content: `
      <div class="prose lg:prose-xl max-w-none">
        <h2>Web Application Security Fundamentals</h2>
        <p>Security is not optional in modern web development. As an ethical hacker and developer, I've seen firsthand how security vulnerabilities can compromise applications and user data.</p>
        
        <h3>Input Validation and Sanitization</h3>
        <p>Never trust user input. Always validate and sanitize data on both client and server sides:</p>
        <pre><code>import { z } from 'zod'

const userSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().min(1).max(100).regex(/^[a-zA-Z\s'-]+$/),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
})

// Validate input
const result = userSchema.safeParse(userInput)</code></pre>
        
        <h3>Authentication and Authorization</h3>
        <p>Implement robust authentication mechanisms:</p>
        <ul>
          <li><strong>Multi-factor Authentication (MFA):</strong> Add an extra layer of security</li>
          <li><strong>JWT Tokens:</strong> Use secure, stateless authentication</li>
          <li><strong>Role-based Access Control:</strong> Implement proper authorization</li>
          <li><strong>Session Management:</strong> Secure session handling and timeout</li>
        </ul>
        
        <h3>Common Vulnerabilities to Prevent</h3>
        <h4>Cross-Site Scripting (XSS)</h4>
        <p>Prevent XSS attacks by sanitizing HTML content and using Content Security Policy (CSP).</p>
        
        <h4>SQL Injection</h4>
        <p>Use parameterized queries and ORM tools like Prisma to prevent SQL injection attacks.</p>
        
        <h4>Cross-Site Request Forgery (CSRF)</h4>
        <p>Implement CSRF tokens and validate the origin of requests.</p>
        
        <h3>Security Headers</h3>
        <p>Configure essential security headers:</p>
        <pre><code>// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
]</code></pre>
        
        <h3>Ethical Hacking Insights</h3>
        <p>From my experience in ethical hacking, here are key takeaways:</p>
        <ul>
          <li>Regular security audits and penetration testing</li>
          <li>Keep dependencies updated and monitor for vulnerabilities</li>
          <li>Implement proper logging and monitoring</li>
          <li>Follow the principle of least privilege</li>
          <li>Educate your team about security best practices</li>
        </ul>
      </div>
    `,
    status: "PUBLISHED" as const,
    featured: true,
    publishedAt: new Date(Date.now() - 172800000),
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172800000),
    views: 320,
    metaTitle: "Web Security Best Practices - Ethical Hacker's Guide",
    metaDescription:
      "Learn essential web security practices from an ethical hacker's perspective. Covers input validation, authentication, common vulnerabilities, and security headers.",
    ogImage: "/og-security.jpg",
    keywords: ["Web Security", "Ethical Hacking", "Authentication", "XSS", "SQL Injection"],
    author: {
      id: "author-1",
      name: "Likhon Sheikh",
      username: "likhonsheikhbd",
      image: "https://github.com/likhonsheikhbd.png",
      bio: "Passionate Software Developer & Ethical Hacker from Bangladesh",
    },
    tags: [
      { tag: { id: "4", name: "Security", slug: "security", color: "#EF4444" } },
      { tag: { id: "5", name: "Best Practices", slug: "best-practices", color: "#8B5CF6" } },
      { tag: { id: "8", name: "Ethical Hacking", slug: "ethical-hacking", color: "#DC2626" } },
    ],
    media: [],
  },
]

async function getPost(slug: string) {
  const post = mockPosts.find((p) => p.slug === slug)
  return post || null
}

export async function generateStaticParams() {
  // Generate static params for all mock posts
  return mockPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return generatePostMetadata(post)
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const structuredData = generateStructuredData(post)

  return (
    <>
      <StructuredData data={structuredData} />
      <BlogPost post={post} />
    </>
  )
}
