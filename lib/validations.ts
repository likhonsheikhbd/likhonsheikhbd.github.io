/**
 * Zod Validation Schemas and DTOs for AstroBlog Ω
 *
 * Comprehensive input validation inspired by security best practices
 * Created by Likhon Sheikh - Ethical Hacker & Software Developer from Bangladesh
 *
 * Features:
 * - Strict type validation with Zod
 * - Security-focused input sanitization
 * - SEO-optimized field validation
 * - Comprehensive error messages
 * - No 'any' types - full type safety
 */

import { z } from "zod"
import { UserRole, PostStatus, CommentStatus, LikeType } from "@prisma/client"

// ============================================================================
// UTILITY SCHEMAS AND VALIDATORS
// ============================================================================

/**
 * Common validation patterns used across the application
 * These patterns are based on security best practices and common attack vectors
 */

// Slug validation - SEO friendly URLs
const slugSchema = z
  .string()
  .min(1, "Slug is required")
  .max(200, "Slug must be less than 200 characters")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain only lowercase letters, numbers, and hyphens")
  .refine((slug) => !slug.startsWith("-") && !slug.endsWith("-"), "Slug cannot start or end with a hyphen")

// Email validation with additional security checks
const emailSchema = z
  .string()
  .email("Invalid email address")
  .max(255, "Email must be less than 255 characters")
  .toLowerCase()
  .refine((email) => !email.includes(".."), "Email cannot contain consecutive dots")
  .refine((email) => {
    // Basic check against common disposable email domains
    const disposableDomains = ["10minutemail.com", "tempmail.org", "guerrillamail.com"]
    const domain = email.split("@")[1]
    return !disposableDomains.includes(domain)
  }, "Disposable email addresses are not allowed")

// Password validation for strong security
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be less than 128 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  )

// URL validation with security considerations
const urlSchema = z
  .string()
  .url("Invalid URL format")
  .max(500, "URL must be less than 500 characters")
  .refine((url) => {
    try {
      const parsedUrl = new URL(url)
      // Only allow HTTP and HTTPS protocols
      return ["http:", "https:"].includes(parsedUrl.protocol)
    } catch {
      return false
    }
  }, "Only HTTP and HTTPS URLs are allowed")

// HTML content validation (basic XSS prevention)
const htmlContentSchema = z
  .string()
  .max(50000, "Content must be less than 50,000 characters")
  .refine((content) => {
    // Basic check for potentially dangerous HTML
    const dangerousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi, // Event handlers like onclick, onload, etc.
    ]

    return !dangerousPatterns.some((pattern) => pattern.test(content))
  }, "Content contains potentially dangerous HTML")

// Color hex validation
const colorSchema = z.string().regex(/^#[0-9A-F]{6}$/i, "Color must be a valid hex color (e.g., #FF0000)")

// ============================================================================
// USER MANAGEMENT SCHEMAS
// ============================================================================

/**
 * User registration schema with comprehensive validation
 */
export const CreateUserSchema = z.object({
  email: emailSchema,
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens")
    .optional(),
  password: passwordSchema.optional(), // Optional for OAuth users
  role: z.nativeEnum(UserRole).default(UserRole.USER),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  website: urlSchema.optional(),
  location: z.string().max(100, "Location must be less than 100 characters").optional(),
  twitterHandle: z
    .string()
    .max(15, "Twitter handle must be less than 15 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Twitter handle can only contain letters, numbers, and underscores")
    .optional(),
  githubHandle: z
    .string()
    .max(39, "GitHub handle must be less than 39 characters")
    .regex(/^[a-zA-Z0-9-]+$/, "GitHub handle can only contain letters, numbers, and hyphens")
    .optional(),
  linkedinHandle: z.string().max(100, "LinkedIn handle must be less than 100 characters").optional(),
})

export const UpdateUserSchema = CreateUserSchema.partial().omit({ password: true })

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type CreateUserDTO = z.infer<typeof CreateUserSchema>
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>
export type ChangePasswordDTO = z.infer<typeof ChangePasswordSchema>

// ============================================================================
// BLOG POST SCHEMAS
// ============================================================================

/**
 * Blog post schemas with SEO optimization and security validation
 */
export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .refine((title) => title.trim().length > 0, "Title cannot be empty or contain only whitespace"),
  slug: slugSchema,
  excerpt: z.string().max(500, "Excerpt must be less than 500 characters").optional(),
  content: htmlContentSchema,
  status: z.nativeEnum(PostStatus).default(PostStatus.DRAFT),
  featured: z.boolean().default(false),
  publishedAt: z.date().optional(),
  scheduledAt: z.date().optional(),

  // SEO fields with optimal lengths for search engines
  metaTitle: z.string().max(60, "Meta title must be less than 60 characters for optimal SEO").optional(),
  metaDescription: z
    .string()
    .min(120, "Meta description should be at least 120 characters for better SEO")
    .max(160, "Meta description must be less than 160 characters for optimal SEO")
    .optional(),
  ogImage: urlSchema.optional(),
  ogImageAlt: z.string().max(125, "OG image alt text must be less than 125 characters").optional(),
  keywords: z.array(z.string().min(1).max(50)).max(10, "Maximum 10 keywords allowed").default([]),
  canonicalUrl: urlSchema.optional(),

  // Content metadata
  categoryId: z.string().cuid("Invalid category ID").optional(),
  tagIds: z.array(z.string().cuid("Invalid tag ID")).max(10, "Maximum 10 tags allowed").default([]),

  // Content analysis fields (auto-calculated but can be overridden)
  readingTime: z.number().int().positive().optional(),
  wordCount: z.number().int().positive().optional(),
})

export const UpdatePostSchema = CreatePostSchema.partial()

export const PublishPostSchema = z.object({
  publishedAt: z.date().default(() => new Date()),
  status: z.literal(PostStatus.PUBLISHED),
})

export const SchedulePostSchema = z.object({
  scheduledAt: z.date().min(new Date(), "Scheduled date must be in the future"),
  status: z.literal(PostStatus.SCHEDULED),
})

export type CreatePostDTO = z.infer<typeof CreatePostSchema>
export type UpdatePostDTO = z.infer<typeof UpdatePostSchema>
export type PublishPostDTO = z.infer<typeof PublishPostSchema>
export type SchedulePostDTO = z.infer<typeof SchedulePostSchema>

// ============================================================================
// CATEGORY AND TAG SCHEMAS
// ============================================================================

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required").max(50, "Category name must be less than 50 characters"),
  slug: slugSchema,
  description: z.string().max(200, "Description must be less than 200 characters").optional(),
  color: colorSchema.default("#3B82F6"),
  icon: z.string().max(50, "Icon name must be less than 50 characters").optional(),
  parentId: z.string().cuid("Invalid parent category ID").optional(),
  metaTitle: z.string().max(60, "Meta title must be less than 60 characters").optional(),
  metaDescription: z.string().max(160, "Meta description must be less than 160 characters").optional(),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
})

export const UpdateCategorySchema = CreateCategorySchema.partial()

export const CreateTagSchema = z.object({
  name: z
    .string()
    .min(1, "Tag name is required")
    .max(50, "Tag name must be less than 50 characters")
    .regex(/^[a-zA-Z0-9\s-]+$/, "Tag name can only contain letters, numbers, spaces, and hyphens"),
  slug: slugSchema,
  description: z.string().max(200, "Description must be less than 200 characters").optional(),
  color: colorSchema.default("#3B82F6"),
  metaTitle: z.string().max(60, "Meta title must be less than 60 characters").optional(),
  metaDescription: z.string().max(160, "Meta description must be less than 160 characters").optional(),
  isActive: z.boolean().default(true),
})

export const UpdateTagSchema = CreateTagSchema.partial()

export type CreateCategoryDTO = z.infer<typeof CreateCategorySchema>
export type UpdateCategoryDTO = z.infer<typeof UpdateCategorySchema>
export type CreateTagDTO = z.infer<typeof CreateTagSchema>
export type UpdateTagDTO = z.infer<typeof UpdateTagSchema>

// ============================================================================
// MEDIA MANAGEMENT SCHEMAS
// ============================================================================

export const CreateMediaSchema = z.object({
  filename: z.string().min(1, "Filename is required").max(255, "Filename must be less than 255 characters"),
  originalName: z
    .string()
    .min(1, "Original name is required")
    .max(255, "Original name must be less than 255 characters"),
  url: urlSchema,
  thumbnailUrl: urlSchema.optional(),
  mimeType: z
    .string()
    .min(1, "MIME type is required")
    .max(100, "MIME type must be less than 100 characters")
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9!#$&\-^_]*\/[a-zA-Z0-9][a-zA-Z0-9!#$&\-^_.]*$/, "Invalid MIME type format"),
  size: z
    .number()
    .int()
    .positive("File size must be positive")
    .max(50 * 1024 * 1024, "File size cannot exceed 50MB"), // 50MB limit
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  duration: z.number().int().positive().optional(),
  alt: z.string().max(200, "Alt text must be less than 200 characters").optional(),
  caption: z.string().max(500, "Caption must be less than 500 characters").optional(),
  title: z.string().max(200, "Title must be less than 200 characters").optional(),
  folder: z
    .string()
    .max(100, "Folder name must be less than 100 characters")
    .regex(
      /^[a-zA-Z0-9\-_/]+$/,
      "Folder name can only contain letters, numbers, hyphens, underscores, and forward slashes",
    )
    .optional(),
  tags: z.array(z.string().min(1).max(50)).max(20, "Maximum 20 tags allowed").default([]),
})

export const UpdateMediaSchema = CreateMediaSchema.partial().omit({
  filename: true,
  originalName: true,
  url: true,
  mimeType: true,
  size: true,
})

export type CreateMediaDTO = z.infer<typeof CreateMediaSchema>
export type UpdateMediaDTO = z.infer<typeof UpdateMediaSchema>

// ============================================================================
// COMMENT SYSTEM SCHEMAS
// ============================================================================

export const CreateCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment content is required")
    .max(2000, "Comment must be less than 2000 characters")
    .refine((content) => content.trim().length > 0, "Comment cannot be empty or contain only whitespace"),
  postId: z.string().cuid("Invalid post ID"),
  parentId: z.string().cuid("Invalid parent comment ID").optional(),

  // For anonymous comments (when user is not logged in)
  guestName: z
    .string()
    .min(1, "Name is required for anonymous comments")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes")
    .optional(),
  guestEmail: emailSchema.optional(),
})

export const UpdateCommentSchema = z.object({
  content: z.string().min(1, "Comment content is required").max(2000, "Comment must be less than 2000 characters"),
  status: z.nativeEnum(CommentStatus).optional(),
})

export const ModerateCommentSchema = z.object({
  status: z.nativeEnum(CommentStatus),
  moderationNote: z.string().max(500, "Moderation note must be less than 500 characters").optional(),
})

export type CreateCommentDTO = z.infer<typeof CreateCommentSchema>
export type UpdateCommentDTO = z.infer<typeof UpdateCommentSchema>
export type ModerateCommentDTO = z.infer<typeof ModerateCommentSchema>

// ============================================================================
// ENGAGEMENT SCHEMAS
// ============================================================================

export const CreateLikeSchema = z.object({
  postId: z.string().cuid("Invalid post ID"),
  type: z.nativeEnum(LikeType).default(LikeType.LIKE),
})

export type CreateLikeDTO = z.infer<typeof CreateLikeSchema>

export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}
