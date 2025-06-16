# AstroBlog Ω - Complete Directory Structure

## 📁 Project Architecture

\`\`\`
astroblog-omega/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
├── .env.local
├── .gitignore
├── .eslintrc.json
├── prettier.config.js
├── vitest.config.ts
├── playwright.config.ts
├── lighthouserc.json
│
├── prisma/
│   ├── schema.prisma              # Complete database schema with RLS
│   ├── seed.ts                    # Database seeding script
│   ├── migrations/                # Database migration files
│   └── rls-policies.sql           # Row-Level Security policies
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Root layout with SEO optimization
│   │   ├── page.tsx               # Homepage with hero section
│   │   ├── loading.tsx            # Global loading component
│   │   ├── error.tsx              # Global error boundary
│   │   ├── not-found.tsx          # 404 page
│   │   ├── sitemap.ts             # Dynamic sitemap generation
│   │   ├── robots.ts              # Robots.txt configuration
│   │   ├── manifest.ts            # PWA manifest
│   │   │
│   │   ├── (auth)/                # Authentication routes group
│   │   │   ├── layout.tsx
│   │   │   ├── signin/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   └── verify/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (blog)/                # Public blog routes group
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           # Blog index with pagination
│   │   │   ├── [slug]/
│   │   │   │   ├── page.tsx       # Individual blog post
│   │   │   │   └── opengraph-image.tsx
│   │   │   └── category/
│   │   │       └── [slug]/
│   │   │           └── page.tsx
│   │   │
│   │   ├── (admin)/               # Admin dashboard routes group
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           # Dashboard overview
│   │   │   ├── posts/
│   │   │   │   ├── page.tsx       # Posts management
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx   # Create new post
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx   # View post
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx
│   │   │   ├── media/
│   │   │   │   ├── page.tsx
│   │   │   │   └── upload/
│   │   │   │       └── page.tsx
│   │   │   ├── tags/
│   │   │   │   ├── page.tsx
│   │   │   │   └── new/
│   │   │   │       └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx           # About Likhon Sheikh
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   │
│   │   └── api/                   # API routes
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts
│   │       ├── v1/                # External API endpoints
│   │       │   ├── posts/
│   │       │   │   ├── route.ts
│   │       │   │   └── [id]/
│   │       │   │       └── route.ts
│   │       │   ├── tags/
│   │       │   │   └── route.ts
│   │       │   ├── media/
│   │       │   │   └── route.ts
│   │       │   └── analytics/
│   │       │       └── route.ts
│   │       ├── og/                # Dynamic OG image generation
│   │       │   └── route.tsx
│   │       ├── rss/
│   │       │   └── route.ts
│   │       └── webhooks/
│   │           └── revalidate/
│   │               └── route.ts
│   │
│   ├── components/                # Reusable UI components
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/                # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx         # Footer with GitHub link
│   │   │   ├── Sidebar.tsx
│   │   │   └── Navigation.tsx
│   │   │
│   │   ├── blog/                  # Blog-specific components
│   │   │   ├── PostCard.tsx
│   │   │   ├── PostList.tsx
│   │   │   ├── PostContent.tsx
│   │   │   ├── PostMeta.tsx
│   │   │   ├── TagList.tsx
│   │   │   ├── ShareButtons.tsx
│   │   │   └── RelatedPosts.tsx
│   │   │
│   │   ├── admin/                 # Admin dashboard components
│   │   │   ├── PostEditor.tsx
│   │   │   ├── MediaUploader.tsx
│   │   │   ├── TagManager.tsx
│   │   │   ├── Analytics.tsx
│   │   │   └── UserProfile.tsx
│   │   │
│   │   ├── auth/                  # Authentication components
│   │   │   ├── SignInForm.tsx
│   │   │   ├── SignUpForm.tsx
│   │   │   ├── AuthProvider.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   │
│   │   ├── seo/                   # SEO-specific components
│   │   │   ├── StructuredData.tsx
│   │   │   ├── MetaTags.tsx
│   │   │   ├── Breadcrumbs.tsx
│   │   │   └── SocialShare.tsx
│   │   │
│   │   └── common/                # Common utility components
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── Pagination.tsx
│   │       ├── SearchBox.tsx
│   │       └── ThemeToggle.tsx
│   │
│   ├── lib/                       # Utility libraries and configurations
│   │   ├── auth.ts                # NextAuth configuration
│   │   ├── db.ts                  # Prisma client with middleware
│   │   ├── rls.ts                 # Row-Level Security utilities
│   │   ├── validations.ts         # Zod schemas and DTOs
│   │   ├── seo.ts                 # SEO utilities and metadata
│   │   ├── utils.ts               # General utility functions
│   │   ├── constants.ts           # Application constants
│   │   ├── email.ts               # Email service configuration
│   │   ├── storage.ts             # File storage utilities
│   │   ├── analytics.ts           # Analytics tracking
│   │   └── security.ts            # Security utilities
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── usePosts.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── useAnalytics.ts
│   │
│   ├── types/                     # TypeScript type definitions
│   │   ├── auth.ts
│   │   ├── blog.ts
│   │   ├── api.ts
│   │   ├── seo.ts
│   │   └── global.d.ts
│   │
│   ├── styles/                    # Styling files
│   │   ├── globals.css
│   │   ├── components.css
│   │   └── markdown.css
│   │
│   └── actions/                   # Server Actions
│       ├── auth.ts
│       ├── posts.ts
│       ├── tags.ts
│       ├── media.ts
│       └── analytics.ts
│
├── tests/                         # Test files
│   ├── unit/                      # Vitest unit tests
│   │   ├── lib/
│   │   │   ├── auth.test.ts
│   │   │   ├── validations.test.ts
│   │   │   ├── seo.test.ts
│   │   │   └── utils.test.ts
│   │   ├── components/
│   │   │   ├── Footer.test.tsx
│   │   │   ├── PostCard.test.tsx
│   │   │   └── AuthForm.test.tsx
│   │   └── actions/
│   │       ├── posts.test.ts
│   │       └── auth.test.ts
│   │
│   ├── e2e/                       # Playwright E2E tests
│   │   ├── auth.spec.ts
│   │   ├── blog.spec.ts
│   │   ├── admin.spec.ts
│   │   ├── seo.spec.ts
│   │   └── performance.spec.ts
│   │
│   ├── fixtures/                  # Test data and fixtures
│   │   ├── users.json
│   │   ├── posts.json
│   │   └── tags.json
│   │
│   └── helpers/                   # Test utility functions
│       ├── auth.ts
│       ├── database.ts
│       └── setup.ts
│
├── public/                        # Static assets
│   ├── icons/
│   │   ├── github.svg
│   │   ├── twitter.svg
│   │   ├── linkedin.svg
│   │   └── favicon.ico
│   ├── images/
│   │   ├── og-default.jpg
│   │   ├── logo.png
│   │   ├── likhon-avatar.jpg
│   │   └── hero-bg.jpg
│   ├── robots.txt
│   └── sitemap.xml
│
├── docs/                          # Documentation
│   ├── API.md
│   ├── DEPLOYMENT.md
│   ├── SECURITY.md
│   ├── SEO_STRATEGY.md
│   └── CONTRIBUTING.md
│
└── .github/                       # GitHub workflows and templates
    ├── workflows/
    │   ├── ci.yml
    │   ├── lighthouse.yml
    │   ├── security-scan.yml
    │   └── deploy.yml
    ├── ISSUE_TEMPLATE/
    │   ├── bug_report.md
    │   └── feature_request.md
    └── pull_request_template.md
\`\`\`

## 🏗️ Architecture Highlights

### **Security-First Design** (Inspired by Likhon's Ethical Hacking Background)
- Row-Level Security (RLS) implementation
- Comprehensive input validation with Zod
- Security headers and CSRF protection
- Audit logging for sensitive operations

### **Performance Optimization**
- Server Components for reduced JavaScript bundle
- Edge runtime for API routes
- Optimized database queries with proper indexing
- CDN optimization for static assets

### **SEO Excellence**
- Automated sitemap generation
- Dynamic Open Graph image generation
- Structured data implementation
- Core Web Vitals optimization

### **Developer Experience**
- Comprehensive TypeScript coverage
- Automated testing with Vitest and Playwright
- CI/CD pipeline with GitHub Actions
- Detailed documentation and inline comments
\`\`\`

\`\`\`
