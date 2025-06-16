/**
 * Tailwind CSS Configuration for AstroBlog Ω
 *
 * Optimized configuration with custom design tokens and plugins
 */

import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "hsl(var(--foreground))",
            lineHeight: "1.7",
            fontSize: "1rem",
            h1: {
              color: "hsl(var(--foreground))",
              fontWeight: "700",
              fontSize: "2.25rem",
              lineHeight: "2.5rem",
              marginTop: "2rem",
              marginBottom: "1.5rem",
            },
            h2: {
              color: "hsl(var(--foreground))",
              fontWeight: "600",
              fontSize: "1.875rem",
              lineHeight: "2.25rem",
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            h3: {
              color: "hsl(var(--foreground))",
              fontWeight: "600",
              fontSize: "1.5rem",
              lineHeight: "2rem",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
            },
            h4: {
              color: "hsl(var(--foreground))",
              fontWeight: "600",
              fontSize: "1.25rem",
              lineHeight: "1.75rem",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
            },
            p: {
              marginTop: "1rem",
              marginBottom: "1rem",
            },
            a: {
              color: "hsl(var(--primary))",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            strong: {
              color: "hsl(var(--foreground))",
              fontWeight: "600",
            },
            code: {
              color: "hsl(var(--foreground))",
              backgroundColor: "hsl(var(--muted))",
              padding: "0.25rem 0.375rem",
              borderRadius: "0.25rem",
              fontSize: "0.875rem",
              fontWeight: "500",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
              padding: "1rem",
              overflow: "auto",
              fontSize: "0.875rem",
              lineHeight: "1.5",
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              borderRadius: "0",
              fontSize: "inherit",
            },
            blockquote: {
              borderLeft: "4px solid hsl(var(--primary))",
              backgroundColor: "hsl(var(--muted) / 0.5)",
              padding: "0.5rem 1rem",
              margin: "1rem 0",
              fontStyle: "italic",
            },
            ul: {
              paddingLeft: "1.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            },
            ol: {
              paddingLeft: "1.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            },
            li: {
              marginTop: "0.25rem",
              marginBottom: "0.25rem",
            },
            img: {
              borderRadius: "0.5rem",
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            },
            table: {
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid hsl(var(--border))",
            },
            th: {
              backgroundColor: "hsl(var(--muted))",
              padding: "0.75rem 1rem",
              border: "1px solid hsl(var(--border))",
              fontWeight: "600",
              textAlign: "left",
            },
            td: {
              padding: "0.75rem 1rem",
              border: "1px solid hsl(var(--border))",
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config

export default config
