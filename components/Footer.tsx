/**
 * Footer Component for AstroBlog Ω
 *
 * Comprehensive footer with social media links and professional branding
 * Created by Likhon Sheikh - Passionate Software Developer & Ethical Hacker from Bangladesh
 *
 * Features:
 * - GitHub, X (Twitter), and Telegram links
 * - SEO-optimized internal links
 * - Geist Design System compliance
 * - Responsive design with accessibility
 * - Professional branding and attribution
 */

import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Send, Mail, Globe, Shield, Code2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

/**
 * Main Footer component with comprehensive site navigation and social links
 * Highlights Likhon Sheikh's expertise and social media presence
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="https://bhnrpzuutgpf0gum.public.blob.vercel-storage.com/Untitled%20design-fRJuhvYSvjh8kp6Tk9AQtFPmMTzmyH.png"
                alt="AstroBlog Ω Logo"
                width={32}
                height={32}
                className="rounded-md"
              />
              <div>
                <h3 className="text-lg font-bold">AstroBlog Ω</h3>
                <p className="text-xs text-muted-foreground">Next.js Blog Platform</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A modern, SEO-optimized blog platform built with Next.js, Prisma, and Vercel. Crafted with security-first
              principles and performance optimization using the Geist Design System.
            </p>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>Security-first architecture</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Code2 className="h-3 w-3" />
              <span>Open source & deployable</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Blog Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  About Likhon
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/tags"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Tags
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & API */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/api/v1"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  API Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sitemap
                </Link>
              </li>
              <li>
                <Link
                  href="/rss.xml"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RSS Feed
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Connect with Likhon</h4>
            <p className="text-xs text-muted-foreground">
              Passionate Software Developer & Ethical Hacker from Bangladesh 🇧🇩
            </p>

            {/* Social Media Links */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild className="h-9 w-9 p-0 hover:bg-accent">
                <Link
                  href="https://github.com/likhonsheikhbd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile - Likhon Sheikh"
                  className="flex items-center justify-center"
                >
                  <Github className="h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" size="sm" asChild className="h-9 w-9 p-0 hover:bg-accent">
                <Link
                  href="https://x.com/likhonsheikhbd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter) Profile - Likhon Sheikh"
                  className="flex items-center justify-center"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" size="sm" asChild className="h-9 w-9 p-0 hover:bg-accent">
                <Link
                  href="https://t.me/likhonsheikhbd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram Profile - Likhon Sheikh"
                  className="flex items-center justify-center"
                >
                  <Send className="h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" size="sm" asChild className="h-9 w-9 p-0 hover:bg-accent">
                <Link
                  href="mailto:likhon@astroblog.dev"
                  aria-label="Email Likhon Sheikh"
                  className="flex items-center justify-center"
                >
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" size="sm" asChild className="h-9 w-9 p-0 hover:bg-accent">
                <Link
                  href="https://likhonsheikh.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Personal Website - Likhon Sheikh"
                  className="flex items-center justify-center"
                >
                  <Globe className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Newsletter Signup */}
            <div className="pt-2">
              <Button variant="default" size="sm" asChild className="w-full text-xs">
                <Link href="/newsletter">Subscribe to Newsletter</Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright and Attribution */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1">
              © {currentYear} AstroBlog Ω. Built with <Heart className="h-3 w-3 text-red-500 fill-current" /> by{" "}
              <Link
                href="https://github.com/likhonsheikhbd"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline transition-colors duration-200"
              >
                Likhon Sheikh
              </Link>
            </p>
            <p className="text-xs text-muted-foreground mt-1">Software Developer & Ethical Hacker from Bangladesh 🇧🇩</p>
          </div>

          {/* Tech Stack and GitHub Link */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>Powered by Next.js, Prisma & Vercel</span>
            </div>

            <Separator orientation="vertical" className="hidden md:block h-4" />

            {/* Prominent GitHub Repository Link */}
            <Button variant="outline" size="sm" asChild className="text-xs hover:bg-accent">
              <Link
                href="https://github.com/likhonsheikhbd/astroblog-omega"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2"
              >
                <Github className="h-3 w-3" />
                <span>View Source Code</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Additional Attribution */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="text-center">
            <p className="text-xs text-muted-foreground max-w-3xl mx-auto">
              This project showcases modern web development practices, security-first architecture, and SEO optimization
              techniques learned through years of software development and ethical hacking experience. Built with the
              Geist Design System for optimal developer experience.
            </p>
            <div className="flex justify-center items-center space-x-6 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Shield className="h-3 w-3" />
                <span>Security Audited</span>
              </span>
              <span className="flex items-center space-x-1">
                <Code2 className="h-3 w-3" />
                <span>Open Source</span>
              </span>
              <span className="flex items-center space-x-1">
                <Globe className="h-3 w-3" />
                <span>SEO Optimized</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

/**
 * Minimal Footer variant for specific pages where space is limited
 * Maintains essential branding and social links
 */
export function MinimalFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Image
              src="https://bhnrpzuutgpf0gum.public.blob.vercel-storage.com/Untitled%20design-fRJuhvYSvjh8kp6Tk9AQtFPmMTzmyH.png"
              alt="AstroBlog Ω"
              width={20}
              height={20}
              className="rounded"
            />
            <p className="text-sm text-muted-foreground">
              © {currentYear} AstroBlog Ω by{" "}
              <Link
                href="https://github.com/likhonsheikhbd"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-foreground transition-colors duration-200"
              >
                Likhon Sheikh
              </Link>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="https://github.com/likhonsheikhbd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="https://x.com/likhonsheikhbd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="X (Twitter) Profile"
            >
              <Twitter className="h-4 w-4" />
            </Link>
            <Link
              href="https://t.me/likhonsheikhbd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Telegram Profile"
            >
              <Send className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
