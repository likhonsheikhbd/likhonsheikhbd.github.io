import { PrismaClient } from "@prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Only initialize Prisma in server environment
let db: PrismaClient

if (typeof window === "undefined") {
  try {
    db =
      globalForPrisma.prisma ??
      new PrismaClient({
        log: ["query"],
      }).$extends(withAccelerate())

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = db
    }
  } catch (error) {
    console.warn("Prisma client initialization failed:", error)
    // Create a mock client for static builds
    // Mock database client for static builds
    db = {
      // Mock implementations for type compatibility
      user: {
        findUnique: () => Promise.resolve(null),
        update: () => Promise.resolve(null),
        updateMany: () => Promise.resolve(null),
      },
      auditLog: {
        create: () => Promise.resolve(null),
      },
      session: {
        updateMany: () => Promise.resolve(null),
      },
      account: {
        update: () => Promise.resolve(null),
      },
      post: {
        findMany: () => Promise.resolve([]),
        findUnique: () => Promise.resolve(null),
        count: () => Promise.resolve(0),
        create: () => Promise.resolve(null),
        update: () => Promise.resolve(null),
      },
      tag: {
        findMany: () => Promise.resolve([]),
        findUnique: () => Promise.resolve(null),
        create: () => Promise.resolve(null),
        updateMany: () => Promise.resolve(null),
      },
      // Add $use method for middleware compatibility
      $use: () => {},
    } as any
  }
} else {
  // Client-side mock
  // Mock database client for static builds
  db = {
    // Mock implementations for type compatibility
    user: {
      findUnique: () => Promise.resolve(null),
      update: () => Promise.resolve(null),
      updateMany: () => Promise.resolve(null),
    },
    auditLog: {
      create: () => Promise.resolve(null),
    },
    session: {
      updateMany: () => Promise.resolve(null),
    },
    account: {
      update: () => Promise.resolve(null),
    },
    post: {
      findMany: () => Promise.resolve([]),
      findUnique: () => Promise.resolve(null),
      count: () => Promise.resolve(0),
      create: () => Promise.resolve(null),
      update: () => Promise.resolve(null),
    },
    tag: {
      findMany: () => Promise.resolve([]),
      findUnique: () => Promise.resolve(null),
      create: () => Promise.resolve(null),
      updateMany: () => Promise.resolve(null),
    },
    // Add $use method for middleware compatibility
    $use: () => {},
  } as any
}

// RLS Middleware for Row-Level Security (only if db is properly initialized)
if (db && typeof db.$use === "function") {
  db.$use(async (params, next) => {
    // TODO: Implement RLS based on user context
    // This middleware will enforce row-level security rules

    if (params.model === "Post") {
      // Only allow users to access their own posts in admin context
      if (params.action === "findMany" || params.action === "findFirst") {
        // Add user filter based on session context
        // params.args.where = { ...params.args.where, authorId: userId }
      }
    }

    if (params.model === "Media") {
      // Only allow users to access their own media
      if (params.action === "findMany" || params.action === "findFirst") {
        // Add user filter based on session context
        // params.args.where = { ...params.args.where, uploadedById: userId }
      }
    }

    return next(params)
  })
}

export { db }
