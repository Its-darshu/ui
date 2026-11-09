# Portfolio Architecture & Memory Guide (`memory.md`)

This file acts as the permanent brain, memory, and invariant guide for this project. Any AI assistant or developer modifying this repository MUST read and adhere to these guidelines to maintain architectural integrity and design fidelity.

---

## 1. Project Goal & Inspiration
- **Target Site**: [https://www.kshv.me/](https://www.kshv.me/) (Keshav Bagaade - Design Engineer Portfolio).
- **Core Aesthetic**: Minimalist, craft-oriented, high information density, single-column flow, subdued typography, subtle grain, and thoughtful micro-interactions.
- **Audience**: Engineering leaders, design engineers, founders, and peer builders looking for a clean, distraction-free showcase of product craftsmanship.

---

## 2. Immutable Architecture Principles

### A. Centralized Content Architecture (`data/portfolio.ts`)
- **Rule**: NEVER hardcode text, project lists, company roles, social URLs, or bio statements directly inside page components.
- **Why**: The portfolio must remain 100% maintainable. Swapping out projects, tweaking copy, or updating links should only ever require editing `data/portfolio.ts`.
- **Structure**:
  - `personal`: Name, role, location, headline, bio paragraphs, email.
  - `socials`: Twitter/X, GitHub, LinkedIn, CV/Resume.
  - `projects`: Title, description, bullet points, tags, live URL, GitHub URL, badge.
  - `career`: Company, role, period, description, impact bullets.
  - `designWork`: Design experiments, tools, or landing page explorations.
  - `openSource`: PRs, open-source repositories, and contributions.

### B. Layout Boundaries & Vertical Spacing
- The entire page width is strictly constrained to **`max-w-screen-sm` (640px)**.
- **Top Breathing Room**: The page includes a top spacer `<div className="min-h-28 md:min-h-40 w-full" aria-hidden="true" />` so the header has generous whitespace before content starts, matching kshv.me.
- **Footer**: Kept clean and minimal (`© {year} Name · Location`). Framework tags like "Crafted with Next.js" must NEVER be shown.
- **Theme Toggle**: Floating circular button fixed at the bottom-right corner (`fixed bottom-6 right-6 z-50`), NOT positioned inside the top header.
- **Entry Cards**: Projects are styled using the `.entry-card` CSS class (`border border-border/50 bg-muted/35 p-4 rounded-[var(--radius)]`).

### C. Color Token Invariants (HSL CSS Variables)
- Styling MUST utilize semantic CSS variables rather than hardcoded hex codes:
  - Background: `hsl(var(--background))`
  - Foreground: `hsl(var(--foreground))`
  - Muted: `hsl(var(--muted))` and `hsl(var(--muted-foreground))`
  - Border: `hsl(var(--border))`
  - Accent: `hsl(var(--accent))`
- Dark mode is the primary intended viewing mode (`defaultTheme="dark"`), but light mode must remain fully styled and functional.

---

## 3. Micro-Interaction Invariants

1. **Email Copy Action**:
   - The email link is an interactive trigger.
   - On click, it writes the email to `navigator.clipboard` and fires a Sonner toast at `bottom-center` with `"Copied to clipboard"`.
   - It also provides a fallback `mailto:` anchor.

2. **Diagonal Arrow Hover Nudge**:
   - External links and project links feature an upward-right arrow (`ArrowUpRight`).
   - On group hover (`group/link:hover`), the arrow transforms: `translate-x-px -translate-y-px`.
   - Motion is disabled gracefully when `prefers-reduced-motion` is detected.

3. **Smooth Theme Toggle**:
   - The theme toggle features animated Sun and Moon icons with scale and rotation states (`scale-100 rotate-0 dark:scale-0 dark:-rotate-90` vs `scale-0 rotate-90 dark:scale-100 dark:rotate-0`).
   - It must never trigger layout shift or hydration flicker.

4. **Timeline Tree Flow**:
   - Career and experience entries are connected with a continuous vertical line (`w-px bg-border`).
   - Circular milestone nodes (`size-1.5 rounded-full bg-muted-foreground/70`) align with the first line of text.

5. **Top Ambient Blur Mask**:
   - A fixed header gradient sits at `top: 0, left: 0, right: 0, height: 6rem (h-24)`.
   - It uses `backdrop-blur-sm` and a CSS `maskImage: linear-gradient(...)` to smoothly fade scrolling text before it hits the viewport top.

---

## 4. Change Management & Expansion Rules

- **Adding a new section**: Follow the pattern in `page.tsx` — section title in `text-sm font-medium tracking-tight text-foreground` or uppercase muted tag, followed by clean list items with subtle dividers.
- **Adding media / images**: If screenshots or project previews are added, embed them in rounded cards (`rounded-xl border border-border bg-card/50 overflow-hidden`) with responsive aspect ratios.
- **Dependencies**: Keep bundle size minimal. Do not add heavy 3D canvases or unnecessary chart libraries unless requested.
