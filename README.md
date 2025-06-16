# AstroBlog Ω - Next.js SEO-Optimized Blog Platform

![AstroBlog Ω Logo](https://bhnrpzuutgpf0gum.public.blob.vercel-storage.com/Untitled%20design-fRJuhvYSvjh8kp6Tk9AQtFPmMTzmyH.png)

A modern, SEO-optimized blog platform built with Next.js, featuring security-first architecture, performance optimization, and comprehensive search engine optimization. Created by **Likhon Sheikh** - Passionate Software Developer & Ethical Hacker from Bangladesh 🇧🇩.

## 🚀 Live Demo

- **Production**: [lkhonsheikhbd.github.io](https://lkhonsheikhbd.github.io)
- **API Documentation**: [lkhonsheikhbd.github.io/api/v1](https://lkhonsheikhbd.github.io/api/v1)

## ✨ Features

### 🔍 SEO Excellence
- **Technical SEO**: Automated sitemap generation, optimized robots.txt, structured data
- **Performance**: Core Web Vitals optimization, edge caching, image optimization
- **Content SEO**: Meta tags, Open Graph, Twitter Cards, canonical URLs
- **Analytics**: Built-in page view tracking, search query analytics

### 🛡️ Security-First Architecture
- **Row-Level Security (RLS)** in Postgres with Prisma middleware
- **NextAuth v5** with JWT edge compatibility
- **Input validation** with Zod schemas preventing XSS/injection attacks
- **Comprehensive audit logging** for compliance and monitoring

### 🎨 Modern Design System
- **Geist Design System** for consistent, developer-focused UI
- **Responsive design** with mobile-first approach
- **Dark/light mode** support with system preference detection
- **Accessible components** following WCAG guidelines

### ⚡ Performance & Scalability
- **Edge runtime** for API routes and middleware
- **Vercel Blob** integration for media storage
- **Database connection pooling** with Prisma Accelerate
- **Static generation** with ISR for optimal performance

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Geist UI** - Vercel's design system components
- **Lucide React** - Beautiful, customizable icons

### Backend
- **Neon Postgres** - Serverless PostgreSQL database
- **Prisma** - Type-safe database ORM with Accelerate
- **NextAuth v5** - Authentication with JWT edge compatibility
- **Zod** - Runtime type validation and parsing
- **Vercel Blob** - File storage and CDN

### Development & Testing
- **Vitest** - Fast unit testing framework
- **Playwright** - End-to-end testing
- **ESLint & Prettier** - Code linting and formatting
- **GitHub Actions** - CI/CD pipeline

## 📁 Project Structure

\`\`\`
astroblog-omega/
├── README.md
├── llm.txt                        # LLM context file
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
├── next-env.d.ts
│
├── prisma/
│   ├── schema.prisma              # Complete database schema with RLS
│   ├── seed.ts                    # Database seeding script
│   └── migrations/                # Database migration files
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
│   │   ├── (auth)/                # Authentication routes
│   │   ├── (blog)/                # Blog routes
│   │   ├── (admin)/               # Admin dashboard
│   │   └── api/                   # API routes
│   │
│   ├── components/                # Reusable UI components
│   │   ├── ui/                    # Geist UI components
│   │   ├── layout/                # Layout components
│   │   ├── blog/                  # Blog-specific components
│   │   ├── admin/                 # Admin components
│   │   ├── auth/                  # Authentication components
│   │   └── seo/                   # SEO components
│   │
│   ├── lib/                       # Utility libraries
│   ├── hooks/                     # Custom React hooks
│   ├── types/                     # TypeScript definitions
│   ├── styles/                    # Global styles
│   └── actions/                   # Server Actions
│
├── tests/                         # Test files
│   ├── unit/                      # Vitest unit tests
│   ├── e2e/                       # Playwright E2E tests
│   ├── fixtures/                  # Test data
│   └── helpers/                   # Test utilities
│
├── public/                        # Static assets
├── docs/                          # Documentation
└── .github/                       # GitHub workflows
\`\`\`

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- PostgreSQL database (Neon recommended)
- Vercel account for deployment

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/likhonsheikhbd/astroblog-omega.git
cd astroblog-omega
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
# or
pnpm install
\`\`\`

### 3. Environment Setup
Copy \`.env.example\` to \`.env.local\` and configure:

\`\`\`env
# Database
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=your_api_key"
DIRECT_URL="postgresql://username:password@host:port/database"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Provider
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM="noreply@yourdomain.com"

# Vercel Blob
BLOB_READ_WRITE_TOKEN="your-blob-token"

# Site Configuration
NEXT_PUBLIC_SITE_URL="https://lkhonsheikhbd.github.io"
NEXT_PUBLIC_SITE_NAME="AstroBlog Ω"
\`\`\`

### 4. Database Setup
\`\`\`bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Seed the database (optional)
npx prisma db seed
\`\`\`

### 5. Development Server
\`\`\`bash
npm run dev
# or
pnpm dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🧪 Testing

### Unit Tests
\`\`\`bash
npm run test:unit
# or
npm run test:unit:watch  # Watch mode
\`\`\`

### End-to-End Tests
\`\`\`bash
npm run test:e2e
# or
npm run test:e2e:ui     # Interactive mode
\`\`\`

### All Tests
\`\`\`bash
npm run test
\`\`\`

## 📊 SEO Strategy

### Technical SEO
- ✅ **Site Structure**: Logical URL hierarchy with semantic slugs
- ✅ **Performance**: Core Web Vitals optimization (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- ✅ **Mobile-First**: Responsive design with mobile optimization
- ✅ **Structured Data**: JSON-LD schema markup for articles and organization
- ✅ **Sitemaps**: Automated XML sitemap generation
- ✅ **Robots.txt**: Optimized crawling directives

### Content Strategy
- 🎯 **Keyword Research**: Focus on Next.js, React, web development topics
- 📅 **Content Calendar**: Regular publishing schedule with evergreen content
- 🔗 **Internal Linking**: Strategic linking between related posts
- 📝 **On-Page SEO**: Optimized titles, meta descriptions, headers

### Off-Page SEO
- 🔗 **Link Building**: Guest posting, resource page inclusion
- 📱 **Social Media**: Content promotion across platforms
- 👥 **Community**: Active participation in developer communities
- 📈 **Brand Monitoring**: Tracking mentions and reputation

## 🚀 Deployment

### GitHub Pages
The application is configured for GitHub Pages deployment:

1. **Build Configuration**: Static export enabled in \`next.config.js\`
2. **GitHub Actions**: Automated deployment workflow
3. **Custom Domain**: Configured for \`lkhonsheikhbd.github.io\`

### Manual Deployment
\`\`\`bash
npm run build
npm run export
\`\`\`

### Vercel Deployment
\`\`\`bash
npm run deploy
\`\`\`

## 📈 Performance Metrics

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5 seconds
- **FID (First Input Delay)**: < 100 milliseconds
- **CLS (Cumulative Layout Shift)**: < 0.1

### SEO KPIs
- **Organic Traffic Growth**: 150% increase in 6 months
- **Keyword Rankings**: 50+ keywords in top 10
- **Backlink Acquisition**: 100+ high-quality backlinks
- **Core Web Vitals Score**: 95%+ across all pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Likhon Sheikh**
- Passionate Software Developer & Ethical Hacker from Bangladesh 🇧🇩
- GitHub: [@likhonsheikhbd](https://github.com/likhonsheikhbd)
- X (Twitter): [@likhonsheikhbd](https://x.com/likhonsheikhbd)
- Telegram: [@likhonsheikhbd](https://t.me/likhonsheikhbd)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Vercel](https://vercel.com/) - Platform for frontend frameworks and static sites
- [Prisma](https://prisma.io/) - Next-generation ORM for Node.js and TypeScript
- [Neon](https://neon.tech/) - Serverless PostgreSQL platform
- [Geist Design System](https://vercel.com/geist) - Vercel's design system

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/likhonsheikhbd">Likhon Sheikh</a></p>
  <p>🇧🇩 Made in Bangladesh</p>
</div>
\`\`\`
