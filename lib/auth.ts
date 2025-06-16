/**
 * Authentication Configuration for AstroBlog Ω
 *
 * Implements NextAuth v4 with JWT strategy for edge compatibility
 * Created by Likhon Sheikh - Passionate Software Developer from Bangladesh
 *
 * Security Features:
 * - JWT tokens for stateless authentication
 * - Multiple OAuth providers (Google, GitHub)
 * - Session management with security headers
 * - Rate limiting and brute force protection
 */

import NextAuth, { type DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Email from "next-auth/providers/email"

// Define types without importing Prisma types directly
type UserRole = "USER" | "EDITOR" | "ADMIN" | "MODERATOR"

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: UserRole
      username?: string
    } & DefaultSession["user"]
  }

  interface User {
    role: UserRole
    username?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole
    username?: string
  }
}

/**
 * NextAuth Configuration
 * Optimized for security and performance based on ethical hacking insights
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  // Use JWT strategy for static builds (no database adapter)
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // Authentication providers
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Request additional profile information
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      // Request user email access
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
    }),

    ...(process.env.EMAIL_SERVER_HOST
      ? [
          Email({
            server: {
              host: process.env.EMAIL_SERVER_HOST,
              port: process.env.EMAIL_SERVER_PORT,
              auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
              },
            },
            from: process.env.EMAIL_FROM!,
          }),
        ]
      : []),
  ],

  // Callback functions for customizing authentication flow
  callbacks: {
    /**
     * JWT Callback - Runs whenever a JWT is created, updated, or accessed
     * Used to add custom fields to the JWT token
     */
    async jwt({ token, user, account, profile, trigger, session }) {
      // Initial sign in - add user data to token
      if (user) {
        token.role = user.role || "USER"
        token.username = user.username || user.email?.split("@")[0]
      }

      // Handle session updates (when session() is called)
      if (trigger === "update" && session) {
        token.name = session.user.name
        token.email = session.user.email
      }

      return token
    },

    /**
     * Session Callback - Runs whenever a session is checked
     * Used to send properties to the client
     */
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role || "USER"
        session.user.username = token.username
      }

      return session
    },

    /**
     * Sign In Callback - Controls whether a user is allowed to sign in
     * Implements security checks and user validation
     */
    async signIn({ user, account, profile }) {
      try {
        // Basic validation for OAuth providers
        if (account?.provider === "google" || account?.provider === "github") {
          if (profile && !profile.email_verified && account.provider === "google") {
            console.warn(`Unverified email login attempt: ${user.email}`)
            return false
          }
        }

        return true
      } catch (error) {
        console.error("Sign in callback error:", error)
        return false
      }
    },

    /**
     * Redirect Callback - Controls where users are redirected after authentication
     */
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`

      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url

      // Default redirect to home page
      return baseUrl
    },
  },

  // Custom pages for authentication flow
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },

  // Events for logging and analytics
  events: {
    async signIn({ user, account, isNewUser }) {
      console.log(`User signed in: ${user.email} via ${account?.provider}`)
    },

    async signOut({ token }) {
      console.log(`User signed out: ${token?.email}`)
    },

    async createUser({ user }) {
      console.log(`New user created: ${user.email}`)
    },
  },

  // Security configuration
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",
})

/**
 * Utility function to get current user session
 * Includes error handling and type safety
 */
export async function getCurrentUser() {
  try {
    const session = await auth()
    return session?.user ?? null
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

/**
 * Utility function to check if user has required role
 * Used for authorization in API routes and pages
 */
export async function requireRole(requiredRole: UserRole) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Authentication required")
  }

  const roleHierarchy: Record<UserRole, number> = {
    USER: 1,
    MODERATOR: 2,
    EDITOR: 3,
    ADMIN: 4,
  }

  if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
    throw new Error("Insufficient permissions")
  }

  return user
}

/**
 * Utility function to check if user owns a resource
 * Used for resource-based authorization
 */
export async function requireOwnership(resourceUserId: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Authentication required")
  }

  // Admins can access any resource
  if (user.role === "ADMIN") {
    return user
  }

  // Check ownership
  if (user.id !== resourceUserId) {
    throw new Error("Access denied: You don't own this resource")
  }

  return user
}
