/**
 * 404 Not Found Page
 *
 * Custom 404 page with helpful navigation
 */

import Link from "next/link"
import { Search, Home, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 text-6xl font-bold text-muted-foreground">404</div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription>The page you're looking for doesn't exist or has been moved.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/blog">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Articles
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/tags">
                <Search className="mr-2 h-4 w-4" />
                Explore Tags
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
