/**
 * End-to-End Tests for Blog Functionality - AstroBlog Ω
 *
 * Comprehensive E2E test suite for blog operations
 * Created by Likhon Sheikh - Passionate Software Developer from Bangladesh
 *
 * Test Coverage:
 * - Blog post CRUD operations
 * - SEO metadata validation
 * - User interactions and engagement
 * - Performance and accessibility
 * - Security validations
 */

import { test, expect, type Page } from "@playwright/test"

// Test data constants
const TEST_POST = {
  title: "Complete Guide to Next.js SEO Optimization",
  slug: "nextjs-seo-optimization-guide",
  excerpt:
    "Learn how to optimize your Next.js application for search engines with this comprehensive guide covering technical SEO, performance optimization, and best practices.",
  content: `
    <h2>Introduction to Next.js SEO</h2>
    <p>Search Engine Optimization (SEO) is crucial for any web application that wants to be discovered by users through search engines. Next.js provides excellent built-in features for SEO optimization.</p>
    
    <h2>Technical SEO Fundamentals</h2>
    <p>Technical SEO involves optimizing the technical aspects of your website to help search engines crawl, index, and understand your content better.</p>
    
    <h3>Meta Tags and Structured Data</h3>
    <p>Proper meta tags and structured data help search engines understand your content and display rich snippets in search results.</p>
    
    <h3>Performance Optimization</h3>
    <p>Page speed is a crucial ranking factor. Next.js provides several built-in optimizations to improve performance.</p>
    
    <h2>Content Strategy</h2>
    <p>Creating high-quality, relevant content is essential for SEO success. Focus on providing value to your users.</p>
    
    <h2>Conclusion</h2>
    <p>By following these SEO best practices, you can significantly improve your Next.js application's search engine visibility and user experience.</p>
  `,
  metaTitle: "Next.js SEO Guide - Complete Optimization Tutorial",
  metaDescription:
    "Master Next.js SEO with our comprehensive guide. Learn technical SEO, performance optimization, and content strategies to boost your search rankings.",
  keywords: ["Next.js", "SEO", "optimization", "search engines", "web development"],
  category: "Web Development",
  tags: ["Next.js", "SEO", "Performance", "Tutorial"],
}

// Helper functions for test setup
async function loginAsAdmin(page: Page) {
  // TODO: Implement actual login flow
  // For now, we'll mock the authentication state
  await page.goto("/auth/signin")

  // Fill in admin credentials
  await page.fill('[data-testid="email-input"]', "admin@astroblog.dev")
  await page.fill('[data-testid="password-input"]', "AdminPass123!")

  // Submit login form
  await page.click('[data-testid="signin-button"]')

  // Wait for redirect to admin dashboard
  await page.waitForURL("/admin")

  // Verify admin access
  await expect(page.locator('[data-testid="admin-dashboard"]')).toBeVisible()
}

async function createTestPost(page: Page, postData = TEST_POST) {
  await page.goto("/admin/posts/new")

  // Fill in post details
  await page.fill('[data-testid="post-title"]', postData.title)
  await page.fill('[data-testid="post-slug"]', postData.slug)
  await page.fill('[data-testid="post-excerpt"]', postData.excerpt)

  // Fill in content using rich text editor
  await page.fill('[data-testid="post-content"]', postData.content)

  // Fill in SEO fields
  await page.fill('[data-testid="meta-title"]', postData.metaTitle)
  await page.fill('[data-testid="meta-description"]', postData.metaDescription)

  // Add keywords
  for (const keyword of postData.keywords) {
    await page.fill('[data-testid="keyword-input"]', keyword)
    await page.press('[data-testid="keyword-input"]', "Enter")
  }

  // Select category
  await page.selectOption('[data-testid="category-select"]', postData.category)

  // Add tags
  for (const tag of postData.tags) {
    await page.fill('[data-testid="tag-input"]', tag)
    await page.press('[data-testid="tag-input"]', "Enter")
  }

  return postData
}

// Test suite for blog functionality
test.describe("Blog Management", () => {
  test.beforeEach(async ({ page }) => {
    // Set up test environment
    await loginAsAdmin(page)
  })

  test("should create a new blog post with all fields", async ({ page }) => {
    const postData = await createTestPost(page)

    // Save as draft first
    await page.click('[data-testid="save-draft-button"]')

    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-message"]')).toContainText("Post saved as draft")

    // Verify post appears in drafts list
    await page.goto("/admin/posts?status=draft")
    await expect(page.locator(`[data-testid="post-${postData.slug}"]`)).toBeVisible()
    await expect(page.locator(`[data-testid="post-${postData.slug}"] h3`)).toContainText(postData.title)
  })

  test("should publish a blog post and verify public visibility", async ({ page }) => {
    const postData = await createTestPost(page)

    // Publish the post
    await page.click('[data-testid="publish-button"]')

    // Confirm publication in modal
    await page.click('[data-testid="confirm-publish"]')

    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-message"]')).toContainText("Post published successfully")

    // Verify post is publicly accessible
    await page.goto(`/blog/${postData.slug}`)

    // Check post content
    await expect(page.locator("h1")).toContainText(postData.title)
    await expect(page.locator('[data-testid="post-excerpt"]')).toContainText(postData.excerpt)
    await expect(page.locator('[data-testid="post-content"]')).toBeVisible()

    // Verify author information
    await expect(page.locator('[data-testid="post-author"]')).toContainText("Likhon Sheikh")

    // Verify tags are displayed
    for (const tag of postData.tags) {
      await expect(page.locator(`[data-testid="tag-${tag.toLowerCase()}"]`)).toBeVisible()
    }
  })

  test("should edit an existing blog post", async ({ page }) => {
    // First create a post
    const originalPost = await createTestPost(page)
    await page.click('[data-testid="save-draft-button"]')

    // Navigate to edit the post
    await page.goto("/admin/posts")
    await page.click(`[data-testid="edit-post-${originalPost.slug}"]`)

    // Update post content
    const updatedTitle = "Updated: " + originalPost.title
    await page.fill('[data-testid="post-title"]', updatedTitle)

    const updatedExcerpt = "Updated excerpt: " + originalPost.excerpt
    await page.fill('[data-testid="post-excerpt"]', updatedExcerpt)

    // Save changes
    await page.click('[data-testid="save-draft-button"]')

    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-message"]')).toContainText("Post updated successfully")

    // Verify changes are saved
    await page.reload()
    await expect(page.locator('[data-testid="post-title"]')).toHaveValue(updatedTitle)
    await expect(page.locator('[data-testid="post-excerpt"]')).toHaveValue(updatedExcerpt)
  })

  test("should delete a blog post", async ({ page }) => {
    // First create a post
    const postData = await createTestPost(page)
    await page.click('[data-testid="save-draft-button"]')

    // Navigate to posts list
    await page.goto("/admin/posts")

    // Delete the post
    await page.click(`[data-testid="delete-post-${postData.slug}"]`)

    // Confirm deletion in modal
    await page.click('[data-testid="confirm-delete"]')

    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-message"]')).toContainText("Post deleted successfully")

    // Verify post is no longer in the list
    await expect(page.locator(`[data-testid="post-${postData.slug}"]`)).not.toBeVisible()

    // Verify post is not accessible publicly
    await page.goto(`/blog/${postData.slug}`)
    await expect(page.locator("h1")).toContainText("404")
  })

  test("should schedule a blog post for future publication", async ({ page }) => {
    const postData = await createTestPost(page)

    // Set future publication date
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 7) // 7 days from now

    const dateString = futureDate.toISOString().split("T")[0] // YYYY-MM-DD format
    const timeString = "10:00" // 10:00 AM

    await page.fill('[data-testid="scheduled-date"]', dateString)
    await page.fill('[data-testid="scheduled-time"]', timeString)

    // Schedule the post
    await page.click('[data-testid="schedule-button"]')

    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-message"]')).toContainText("Post scheduled successfully")

    // Verify post appears in scheduled list
    await page.goto("/admin/posts?status=scheduled")
    await expect(page.locator(`[data-testid="post-${postData.slug}"]`)).toBeVisible()

    // Verify post is not yet publicly accessible
    await page.goto(`/blog/${postData.slug}`)
    await expect(page.locator("h1")).toContainText("404")
  })
})

test.describe("SEO and Metadata", () => {
  test("should generate proper meta tags for blog posts", async ({ page }) => {
    // Create and publish a test post
    await loginAsAdmin(page)
    const postData = await createTestPost(page)
    await page.click('[data-testid="publish-button"]')
    await page.click('[data-testid="confirm-publish"]')

    // Navigate to the published post
    await page.goto(`/blog/${postData.slug}`)

    // Verify page title
    await expect(page).toHaveTitle(new RegExp(postData.metaTitle))

    // Verify meta description
    const metaDescription = await page.getAttribute('meta[name="description"]', "content")
    expect(metaDescription).toBe(postData.metaDescription)

    // Verify Open Graph tags
    const ogTitle = await page.getAttribute('meta[property="og:title"]', "content")
    const ogDescription = await page.getAttribute('meta[property="og:description"]', "content")
    const ogType = await page.getAttribute('meta[property="og:type"]', "content")
    const ogUrl = await page.getAttribute('meta[property="og:url"]', "content")

    expect(ogTitle).toBe(postData.metaTitle)
    expect(ogDescription).toBe(postData.metaDescription)
    expect(ogType).toBe("article")
    expect(ogUrl).toContain(`/blog/${postData.slug}`)

    // Verify Twitter Card tags
    const twitterCard = await page.getAttribute('meta[name="twitter:card"]', "content")
    const twitterTitle = await page.getAttribute('meta[name="twitter:title"]', "content")
    const twitterDescription = await page.getAttribute('meta[name="twitter:description"]', "content")

    expect(twitterCard).toBe("summary_large_image")
    expect(twitterTitle).toBe(postData.metaTitle)
    expect(twitterDescription).toBe(postData.metaDescription)
  })

  test("should include structured data (JSON-LD) for blog posts", async ({ page }) => {
    // Create and publish a test post
    await loginAsAdmin(page)
    const postData = await createTestPost(page)
    await page.click('[data-testid="publish-button"]')
    await page.click('[data-testid="confirm-publish"]')

    // Navigate to the published post
    await page.goto(`/blog/${postData.slug}`)

    // Check for JSON-LD structured data
    const structuredData = await page.locator('script[type="application/ld+json"]').textContent()
    expect(structuredData).toBeTruthy()

    const jsonLd = JSON.parse(structuredData!)

    // Verify structured data properties
    expect(jsonLd["@context"]).toBe("https://schema.org")
    expect(jsonLd["@type"]).toBe("BlogPosting")
    expect(jsonLd.headline).toBe(postData.title)
    expect(jsonLd.description).toBe(postData.excerpt)
    expect(jsonLd.author).toBeTruthy()
    expect(jsonLd.author["@type"]).toBe("Person")
    expect(jsonLd.author.name).toBe("Likhon Sheikh")
    expect(jsonLd.publisher).toBeTruthy()
    expect(jsonLd.publisher["@type"]).toBe("Organization")
    expect(jsonLd.datePublished).toBeTruthy()
    expect(jsonLd.keywords).toContain("Next.js")
  })

  test("should generate proper breadcrumb navigation", async ({ page }) => {
    // Create and publish a test post
    await loginAsAdmin(page)
    const postData = await createTestPost(page)
    await page.click('[data-testid="publish-button"]')
    await page.click('[data-testid="confirm-publish"]')

    // Navigate to the published post
    await page.goto(`/blog/${postData.slug}`)

    // Verify breadcrumb navigation
    const breadcrumbs = page.locator('[data-testid="breadcrumbs"]')
    await expect(breadcrumbs).toBeVisible()

    // Check breadcrumb links
    await expect(breadcrumbs.locator('a[href="/"]')).toContainText("Home")
    await expect(breadcrumbs.locator('a[href="/blog"]')).toContainText("Blog")
    await expect(breadcrumbs.locator('[aria-current="page"]')).toContainText(postData.title)
  })
})

test.describe("User Engagement", () => {
  test("should allow users to like blog posts", async ({ page }) => {
    // TODO: Implement user authentication for regular users
    // For now, we'll test the like functionality as an admin
    await loginAsAdmin(page)

    // Create and publish a test post
    const postData = await createTestPost(page)
    await page.click('[data-testid="publish-button"]')
    await page.click('[data-testid="confirm-publish"]')

    // Navigate to the published post
    await page.goto(`/blog/${postData.slug}`)

    // Click the like button
    await page.click('[data-testid="like-button"]')

    // Verify like count increased
    await expect(page.locator('[data-testid="like-count"]')).toContainText("1")

    // Verify like button state changed
    await expect(page.locator('[data-testid="like-button"]')).toHaveClass(/liked/)

    // Click again to unlike
    await page.click('[data-testid="like-button"]')

    // Verify like count decreased
    await expect(page.locator('[data-testid="like-count"]')).toContainText("0")
  })

  test("should display related posts", async ({ page }) => {
    // Create multiple posts with similar tags
    await loginAsAdmin(page)

    // Create first post
    const post1 = { ...TEST_POST, slug: "post-1", title: "First Post" }
    await createTestPost(page, post1)
    await page.click('[data-testid="publish-button"]')
    await page.click('[data-testid="confirm-publish"]')

    // Create second post with similar tags
    const post2 = {
      ...TEST_POST,
      slug: "post-2",
      title: "Second Post",
      tags: ["Next.js", "React", "Performance"], // Some overlapping tags
    }
    await page.goto("/admin/posts/new")
    await createTestPost(page, post2)
    await page.click('[data-testid="publish-button"]')
    await page.click('[data-testid="confirm-publish"]')

    // Navigate to first post
    await page.goto(`/blog/${post1.slug}`)

    // Verify related posts section exists
    await expect(page.locator('[data-testid="related-posts"]')).toBeVisible()

    // Verify second post appears in related posts
    await expect(page.locator('[data-testid="related-posts"]')).toContainText(post2.title)
  })

  test("should track page views", async ({ page }) => {
    // Create and publish a test post
    await loginAsAdmin(page)
    const postData = await createTestPost(page)
    await page.click('[data-testid="publish-button"]')
    await page.click('[data-testid="confirm-publish"]')

    // Navigate to the published post multiple times
    await page.goto(`/blog/${postData.slug}`)
    await page.reload()
    await page.reload()

    // Check analytics in admin dashboard
    await page.goto("/admin/analytics")

    // Verify page view tracking
    await expect(page.locator('[data-testid="page-views"]')).toBeVisible()

    // TODO: Verify specific view count for the post
    // This would require implementing the analytics dashboard
  })
})

test.describe("Performance and Accessibility", () => {
  test("should meet Core Web Vitals thresholds", async ({ page }) => {
    // Create and publish a test post
    await loginAsAdmin(page)
    const postData = await createTestPost(page)
    await page.click('[data-testid="publish-button"]')
    await page.click('[data-testid="confirm-publish"]')

    // Navigate to the published post
    await page.goto(`/blog/${postData.slug}`)

    // Measure Core Web Vitals
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const vitals: Record<string, number> = {}

          entries.forEach((entry) => {
            if (entry.entryType === "largest-contentful-paint") {
              vitals.lcp = entry.startTime
            }
            if (entry.entryType === "first-input") {
              vitals.fid = (entry as any).processingStart - entry.startTime
            }
            if (entry.entryType === "layout-shift" && !(entry as any).hadRecentInput) {
              vitals.cls = (vitals.cls || 0) + (entry as any).value
            }
          })

          // Resolve after collecting metrics for a short time
          setTimeout(() => resolve(vitals), 3000)
        })

        observer.observe({ entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"] })
      })
    })

    // Verify Core Web Vitals thresholds
    const vitals = metrics as Record<string, number>

    if (vitals.lcp) {
      expect(vitals.lcp).toBeLessThan(2500) // LCP should be less than 2.5s
    }

    if (vitals.fid) {
      expect(vitals.fid).toBeLessThan(100) // FID should be less than 100ms
    }

    if (vitals.cls) {
      expect(vitals.cls).toBeLessThan(0.1) // CLS should be less than 0.1
    }
  })

  test("should be accessible to screen readers", async ({ page }) => {
    // Create and publish a test post
    await loginAsAdmin(page)
    const postData = await createTestPost(page)
    await page.click('[data-testid="publish-button"]')
    await page.click('[data-testid="confirm-publish"]')

    // Navigate to the published post
    await page.goto(`/blog/${postData.slug}`)

    // Check for proper heading hierarchy
    const h1Count = await page.locator("h1").count()
    expect(h1Count).toBe(1) // Should have exactly one H1

    // Verify main content has proper landmarks
    await expect(page.locator("main")).toBeVisible()
    await expect(page.locator("article")).toBeVisible()

    // Check for alt text on images
    const images = page.locator("img")
    const imageCount = await images.count()

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute("alt")
      expect(alt).toBeTruthy() // All images should have alt text
    }

    // Verify skip links for keyboard navigation
    await expect(page.locator('[data-testid="skip-to-content"]')).toBeVisible()

    // Test keyboard navigation
    await page.keyboard.press("Tab")
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(focusedElement).toBeTruthy()
  })

  test("should load quickly on slow networks", async ({ page, context }) => {
    // Simulate slow 3G network
    await context.route("**/*", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 100)) // Add 100ms delay
      await route.continue()
    })

    // Create and publish a test post
    await loginAsAdmin(page)
    const postData = await createTestPost(page)
    await page.click('[data-testid="publish-button"]')
    await page.click('[data-testid="confirm-publish"]')

    // Measure page load time
    const startTime = Date.now()
    await page.goto(`/blog/${postData.slug}`)
    await page.waitForLoadState("networkidle")
    const loadTime = Date.now() - startTime

    // Verify page loads within reasonable time even on slow network
    expect(loadTime).toBeLessThan(5000) // Should load within 5 seconds

    // Verify content is visible
    await expect(page.locator("h1")).toBeVisible()
    await expect(page.locator('[data-testid="post-content"]')).toBeVisible()
  })
})

test.describe("Security", () => {
  test("should prevent XSS attacks in blog content", async ({ page }) => {
    await loginAsAdmin(page)

    // Attempt to create a post with malicious content
    const maliciousPost = {
      ...TEST_POST,
      title: "Test XSS <script>alert('XSS')</script>",
      content: `
        <p>This is a test post with malicious content:</p>
        <script>alert('XSS Attack!');</script>
        <img src="x" onerror="alert('Image XSS')">
        <div onclick="alert('Click XSS')">Click me</div>
      `,
      slug: "xss-test-post",
    }

    await createTestPost(page, maliciousPost)
    await page.click('[data-testid="save-draft-button"]')

    // Navigate to the post
    await page.goto(`/admin/posts`)
    await page.click(`[data-testid="edit-post-${maliciousPost.slug}"]`)

    // Verify malicious scripts are not executed
    const pageContent = await page.content()
    expect(pageContent).not.toContain("<script>alert")
    expect(pageContent).not.toContain('onerror="alert')
    expect(pageContent).not.toContain('onclick="alert')

    // Verify content is properly sanitized
    await expect(page.locator('[data-testid="post-title"]')).not.toContainText("<script>")
  })

  test("should require authentication for admin operations", async ({ page }) => {
    // Try to access admin pages without authentication
    await page.goto("/admin/posts/new")

    // Should be redirected to login page
    await expect(page).toHaveURL(/\/auth\/signin/)

    // Try to access API endpoints without authentication
    const response = await page.request.post("/api/v1/posts", {
      data: TEST_POST,
    })

    expect(response.status()).toBe(401) // Unauthorized
  })

  test("should validate user permissions for post operations", async ({ page }) => {
    // TODO: Implement test for different user roles
    // This would test that regular users cannot access admin functions
    // and that editors cannot perform admin-only operations

    // For now, we'll test that the admin role works correctly
    await loginAsAdmin(page)
    await page.goto("/admin/posts/new")
    await expect(page.locator('[data-testid="post-form"]')).toBeVisible()
  })
})
