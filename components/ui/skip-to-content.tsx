/**
 * Skip to Content Component
 *
 * Accessibility component for keyboard navigation
 */

"use client"

import { Button } from "./button"

export function SkipToContent() {
  const handleSkip = () => {
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Button
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50"
      variant="outline"
      size="sm"
    >
      Skip to main content
    </Button>
  )
}
