/**
 * Utility Functions for AstroBlog Ω - Enhanced Version
 *
 * Common utility functions with improved error handling and performance
 * Created by Likhon Sheikh - Passionate Software Developer from Bangladesh
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date with error handling
 */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "Unknown date"

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date

    if (isNaN(dateObj.getTime())) {
      return "Invalid date"
    }

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(dateObj)
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid date"
  }
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date | string | null | undefined): string {
  if (!date) return "Unknown time"

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date

    if (isNaN(dateObj.getTime())) {
      return "Invalid time"
    }

    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`

    return `${Math.floor(diffInSeconds / 31536000)} years ago`
  } catch (error) {
    console.error("Error formatting relative time:", error)
    return "Unknown time"
  }
}

/**
 * Calculate reading time based on word count
 */
export function calculateReadingTime(content: string): number {
  if (!content || typeof content !== "string") return 0

  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const readingTime = Math.ceil(words / wordsPerMinute)

  return Math.max(1, readingTime) // Minimum 1 minute
}

/**
 * Extract plain text from HTML content
 */
export function extractTextFromHtml(html: string): string {
  if (!html || typeof html !== "string") return ""

  try {
    // Remove HTML tags and decode entities
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim()
  } catch (error) {
    console.error("Error extracting text from HTML:", error)
    return ""
  }
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  if (!title || typeof title !== "string") return ""

  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || typeof text !== "string") return ""
  if (text.length <= maxLength) return text

  return text.slice(0, maxLength).trim() + "..."
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Safe JSON parse with error handling
 */
export function safeJsonParse<T = any>(json: string, fallback: T): T {
  try {
    return JSON.parse(json)
  } catch (error) {
    console.error("Error parsing JSON:", error)
    return fallback
  }
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  if (typeof num !== "number" || isNaN(num)) return "0"

  return new Intl.NumberFormat("en-US").format(num)
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  if (!name || typeof name !== "string") return "U"

  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Check if code is running on client side
 */
export function isClient(): boolean {
  return typeof window !== "undefined"
}

/**
 * Check if code is running on server side
 */
export function isServer(): boolean {
  return typeof window === "undefined"
}

/**
 * Get random item from array
 */
export function getRandomItem<T>(array: T[]): T | undefined {
  if (!Array.isArray(array) || array.length === 0) return undefined

  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Remove duplicates from array
 */
export function removeDuplicates<T>(array: T[], key?: keyof T): T[] {
  if (!Array.isArray(array)) return []

  if (key) {
    const seen = new Set()
    return array.filter((item) => {
      const value = item[key]
      if (seen.has(value)) return false
      seen.add(value)
      return true
    })
  }

  return [...new Set(array)]
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as unknown as T
  if (typeof obj === "object") {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}
