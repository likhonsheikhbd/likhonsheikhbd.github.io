import { test, expect } from "@playwright/test"

test.describe("Blog CRUD Operations", () => {
  test.beforeEach(async ({ page }) => {
    // TODO: Set up test authentication
    // await page.goto('/auth/signin')
    // await page.fill('[data-testid="email"]', 'test@example.com')
    // await page.click('[data-testid="signin-button"]')
  })

  test("should create a new blog post", async ({ page }) => {
    await page.goto("/admin/posts/new")

    // Fill out the post form
    await page.fill('[data-testid="post-title"]', "Test Blog Post")
    await page.fill('[data-testid="post-slug"]', "test-blog-post")
    await page.fill('[data-testid="post-excerpt"]', "This is a test excerpt")
    await page.fill('[data-testid="post-content"]', "This is the test content for the blog post.")

    // Set SEO fields
    await page.fill('[data-testid="meta-title"]', "Test Blog Post - SEO Title")
    await page.fill('[data-testid="meta-description"]', "This is a test meta description for SEO.")

    // Submit the form
    await page.click('[data-testid="save-post"]')

    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-message"]')).toContainText("Post created successfully")
  })

  test("should edit an existing blog post", async ({ page }) => {
    // TODO: Create a test post first
    await page.goto("/admin/posts")

    // Click on the first post to edit
    await page.click('[data-testid="edit-post"]:first-child')

    // Update the title
    await page.fill('[data-testid="post-title"]', "Updated Test Blog Post")

    // Save changes
    await page.click('[data-testid="save-post"]')

    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-message"]')).toContainText("Post updated successfully")
  })

  test("should delete a blog post", async ({ page }) => {
    await page.goto("/admin/posts")

    // Click delete on the first post
    await page.click('[data-testid="delete-post"]:first-child')

    // Confirm deletion in modal
    await page.click('[data-testid="confirm-delete"]')

    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-message"]')).toContainText("Post deleted successfully")
  })

  test("should display blog post on public page", async ({ page }) => {
    // Navigate to a published blog post
    await page.goto("/blog/test-blog-post")

    // Verify post content is displayed
    await expect(page.locator("h1")).toContainText("Test Blog Post")
    await expect(page.locator('[data-testid="post-content"]')).toBeVisible()

    // Verify SEO meta tags
    const title = await page.title()
    expect(title).toContain("Test Blog Post")

    const metaDescription = await page.getAttribute('meta[name="description"]', "content")
    expect(metaDescription).toContain("test meta description")
  })

  test("should validate form fields", async ({ page }) => {
    await page.goto("/admin/posts/new")

    // Try to submit empty form
    await page.click('[data-testid="save-post"]')

    // Verify validation errors
    await expect(page.locator('[data-testid="title-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="slug-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="content-error"]')).toBeVisible()
  })
})

test.describe("SEO Features", () => {
  test("should generate proper meta tags", async ({ page }) => {
    await page.goto("/blog/test-post")

    // Check Open Graph tags
    const ogTitle = await page.getAttribute('meta[property="og:title"]', "content")
    const ogDescription = await page.getAttribute('meta[property="og:description"]', "content")
    const ogImage = await page.getAttribute('meta[property="og:image"]', "content")

    expect(ogTitle).toBeTruthy()
    expect(ogDescription).toBeTruthy()
    expect(ogImage).toBeTruthy()

    // Check Twitter Card tags
    const twitterCard = await page.getAttribute('meta[name="twitter:card"]', "content")
    const twitterTitle = await page.getAttribute('meta[name="twitter:title"]', "content")

    expect(twitterCard).toBe("summary_large_image")
    expect(twitterTitle).toBeTruthy()
  })

  test("should include structured data", async ({ page }) => {
    await page.goto("/blog/test-post")

    // Check for JSON-LD structured data
    const structuredData = await page.locator('script[type="application/ld+json"]').textContent()
    expect(structuredData).toBeTruthy()

    const jsonLd = JSON.parse(structuredData!)
    expect(jsonLd["@type"]).toBe("BlogPosting")
    expect(jsonLd.headline).toBeTruthy()
    expect(jsonLd.author).toBeTruthy()
  })
})
