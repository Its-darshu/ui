# Technology Stack Specification (`stack.md`)

This document defines the complete technology stack extracted and reverse-engineered from **[kshv.me](https://www.kshv.me/)**. Every AI agent and developer working on this project must adhere strictly to these frameworks, libraries, tools, and conventions.

---

## 1. Core Framework & Engine

| Component | Choice | Version / Details | Rationale |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js** | Next.js 14/15 (App Router) | High-performance React Server Components (`RSC`), file-based routing, static generation, Turbopack support. |
| **Language** | **TypeScript** | TypeScript 5.x+ | Strict type safety for data models, components, props, and UI states. |
| **Runtime / Bundler** | **Node.js + Turbopack** | Node 20+ / Turbopack | Blazing fast build & HMR times as used on kshv.me (`turbopack-*.js`). |
| **UI Library** | **React** | React 19 / React 18 | Modern React concurrent features, Server Actions, Suspense boundaries. |

---

## 2. Styling & Design System

| Tool | Role | Implementation Details |
| :--- | :--- | :--- |
| **Tailwind CSS** | Atomic CSS Framework | Tailwind v3 / v4 with `@tailwindcss/typography`, custom HSL variable mappings, screen constraints (`max-w-screen-sm` / 640px). |
| **shadcn/ui** | Component Tokens & Primitives | CSS variable system (`hsl(var(--background))`, `hsl(var(--foreground))`, `hsl(var(--muted))`, `hsl(var(--accent))`, `hsl(var(--border))`, `hsl(var(--ring))`). |
| **next-themes** | Dark / Light Mode | `<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>` |
| **clsx & tailwind-merge** | Class Utility | `cn(...)` utility helper to merge and safely override Tailwind classes without specificity conflicts. |
| **class-variance-authority** | Variant Management | `cva(...)` for type-safe button and badge variants. |

---

## 3. Typography & Aesthetics

| Element | Specification | Source / Notes |
| :--- | :--- | :--- |
| **Primary Font** | **Manrope** | Loaded via `next/font/google` (`weights: 400, 500, 600, 700`, `variable: --font-manrope`). Applied to `body`. |
| **Monospace Font** | **JetBrains Mono** or **Geist Mono** | Loaded via `next/font/google` (`variable: --font-mono`) for dates, badges, tags, code snippets, and ASCII glyphs. |
| **Icons** | **Lucide React** (`lucide-react`) | Minimalist stroke icons (Sun, Moon, ArrowUpRight, Copy, Check, Github, Twitter, Mail, Calendar, Compass, etc.). |
| **Noise Texture** | **SVG Fractal Turbulence** | Inline SVG `feTurbulence` with `baseFrequency="0.75"` applied as a pseudo-element overlay with `mix-blend-overlay` and low opacity (5–7%) to give subtle film grain aesthetic. |

---

## 4. Animations & Micro-Interactions

| Layer | Library | Details |
| :--- | :--- | :--- |
| **Motion** | **Framer Motion / Motion** (`framer-motion`) | Staggered entrance animations, fade-ins (`opacity: 0 -> 1, y: 8 -> 0`), spring transitions. |
| **Hover Physics** | **Tailwind Group Hovers** | Diagonal micro-nudges on link hover: `group-hover/link:-translate-y-px group-hover/link:translate-x-px transition-transform duration-150`. |
| **View Transitions** | **CSS View Transitions** | `view-transition-name-root` enabled for smooth page/state transitions. |
| **Top Blur Mask** | **CSS Backdrop Filter + Mask** | Fixed top bar with `backdrop-blur-sm`, `linear-gradient`, and CSS mask gradient so content gently vanishes underneath the status header. |

---

## 5. Feedback & Notifications

| Element | Tool | Configuration |
| :--- | :--- | :--- |
| **Toaster** | **Sonner** (`sonner`) | Positioned at `bottom-center`, `richColors`, rounded styling (`borderRadius: "20px"`), used for "Copied to clipboard" triggers. |

---

## 6. Architecture & Folder Structure

```
├── app/
│   ├── layout.tsx         # Root layout with Manrope font, ThemeProvider, Sonner Toaster, Top Blur
│   ├── page.tsx           # Single-page high-density portfolio
│   └── globals.css        # Tailwind directives, CSS variables (dark/light), noise texture, mask gradients
├── components/
│   ├── theme-provider.tsx # next-themes wrapper
│   ├── mode-toggle.tsx    # Sun / Moon theme toggle button
│   ├── copy-email.tsx     # Interactive email chip with copy-to-clipboard & Sonner toast
│   ├── project-item.tsx   # Project list card with live link arrow and hover nudge
│   ├── timeline.tsx       # Vertical tree timeline with node points and connectors
│   └── top-blur.tsx       # Fixed top blur mask gradient
├── data/
│   └── portfolio.ts       # Centralized typed configuration for bio, socials, projects, career, and education
├── lib/
│   └── utils.ts           # cn helper function (clsx + twMerge)
├── public/                # Static assets, favicons, OG image
└── stack.md / memory.md / key_signature.md # Core project guides
```

---

## 7. Package Dependencies

```json
{
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^1.16.0",
    "next-themes": "^0.4.4",
    "sonner": "^2.0.1",
    "framer-motion": "^12.0.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.0.0",
    "class-variance-authority": "^0.7.1"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^3.4.17",
    "postcss": "^8.5.1",
    "autoprefixer": "^10.4.20"
  }
}
```
