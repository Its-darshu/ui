# Key Signature Design Elements (`key_signature.md`)

This document captures the exact visual styling, tokens, interaction physics, and component specs reverse-engineered from **[kshv.me](https://www.kshv.me/)**. Use this file as the visual design truth.

---

## 1. Color System & Theme Tokens (Exact HSL Values)

### Light Mode (`:root`)
```css
:root {
  --background: 0 0% 98%;           /* #FAFAFA */
  --foreground: 0 0% 1.9%;          /* #050505 */
  --card: 208 100% 97%;
  --card-foreground: 0 0% 3.9%;
  --popover: 208 100% 97%;
  --popover-foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 12%;
  --tertiary: 217 91% 60%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 35.1%;
  --accent: 209 100% 94%;
  --accent-foreground: 0 0% 9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
  --radius: 0.5rem;
}
```

### Dark Mode (`.dark`)
```css
.dark {
  --background: 208 10% 3.9%;      /* #090a0c - deep slate black */
  --foreground: 0 0% 98%;          /* #FAFAFA - clean off-white */
  --card: 0 0% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 0 0% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;
  --secondary: 0 0% 14.9%;
  --secondary-foreground: 0 0% 73.5%;
  --muted: 0 0% 10.9%;
  --muted-foreground: 0 0% 53.5%;  /* #888888 - soft readable gray */
  --accent: 208 25% 15%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 14.9%;            /* #262626 - subtle hairline borders */
  --input: 0 0% 14.9%;
  --ring: 0 0% 83.1%;
}
```

---

## 2. Atmospheric Effects & Texture Overlays

### A. Subtle Film Grain (SVG Fractal Noise)
Injected via CSS `::after` on `body`:
```css
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99;
  opacity: 0.04;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
```

### B. Ambient Top Blur Mask
Fixed on top of viewport to softly melt scrolled items into the background:
```tsx
<div 
  className="fixed top-0 left-0 right-0 h-24 z-50 pointer-events-none blur-gradient-top backdrop-blur-sm"
  style={{
    background: "linear-gradient(180deg, hsl(var(--background) / 0.8) 0, hsl(var(--background) / 0.7) 20%, hsl(var(--background) / 0.5) 40%, hsl(var(--background) / 0.3) 60%, hsl(var(--background) / 0.1) 80%, hsl(var(--background) / 0))",
    maskImage: "linear-gradient(180deg, #000 0, rgba(0, 0, 0, .9) 20%, rgba(0, 0, 0, .8) 40%, rgba(0, 0, 0, .6) 60%, rgba(0, 0, 0, .4) 80%, transparent)"
  }}
/>
```

---

## 3. Typography Hierarchy

- **Main Font**: **Manrope** (`font-sans`), `tracking-tight`.
- **Monospace Font**: JetBrains Mono or Geist Mono (`font-mono`) for dates, badges, commit IDs, and markdown glyphs.
- **Header Title**: `text-lg font-medium tracking-tight text-foreground`
- **Section Titles**: `text-sm font-medium tracking-tight text-foreground`
- **Body Copy**: `text-sm leading-relaxed text-muted-foreground`
- **Link Text**: `text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground underline decoration-border hover:decoration-foreground/50 underline-offset-4`

---

## 4. Component Blueprints

### A. Top Breathing Room & Header
- **Top Spacer**: `<div className="min-h-28 md:min-h-40 w-full" aria-hidden="true" />` gives generous breathing room above the header.
- **Header Line**: `Name / twitter / linkedin / github` with subtle `/` separators.
- **Sub-role**: `Associate UI/UX Designer & Frontend Developer` in `text-xs font-mono text-muted-foreground`.
- **Bio**: Narrative introducing UI/UX design, design systems, and frontend engineering.

### B. Floating Theme Toggle (Bottom-Right)
- Fixed at `fixed bottom-6 right-6 z-50`.
- Circular icon button: `size-10 rounded-full border border-border/80 bg-background/80 backdrop-blur-md shadow-sm`.
- Smooth rotation and scale transition between Sun and Moon.

### C. Entry Card for Projects
```css
.entry-card {
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border) / 0.5);
  background-color: hsl(var(--muted) / 0.35);
  padding: 1rem;
  transition: background-color 150ms ease, border-color 150ms ease;
}
.entry-card:hover {
  border-color: hsl(var(--border) / 0.8);
  background-color: hsl(var(--muted) / 0.5);
}
```

### D. Interactive Email Copy Button
```tsx
<button
  onClick={handleCopy}
  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors underline decoration-border hover:decoration-foreground/50 underline-offset-4 cursor-pointer"
>
  <span>hi@kshv.me</span>
</button>
```
On click:
- `navigator.clipboard.writeText("...")`
- `toast.success("Copied to clipboard", { position: "bottom-center" })`

### C. External Link with Diagonal Arrow
```tsx
<a 
  href={href} 
  target="_blank" 
  rel="noopener noreferrer" 
  className="group/link inline-flex items-center gap-1 font-medium text-foreground hover:underline decoration-border hover:decoration-foreground/50 underline-offset-4"
>
  <span>{title}</span>
  <ArrowUpRight className="size-3.5 text-muted-foreground/80 transition-transform duration-150 group-hover/link:-translate-y-px group-hover/link:translate-x-px" />
</a>
```

### D. Vertical Career Timeline
- Outer wrapper: `flex flex-col`
- Each row:
  - Left indicator: `relative flex w-5 shrink-0 flex-col items-center pt-1.5`
    - Node: `size-1.5 shrink-0 rounded-full bg-muted-foreground/70`
    - Connecting line: `w-px flex-1 bg-border mt-1` (hidden on last item)
  - Right content: `flex flex-1 flex-col gap-1 pb-6`
    - Header: Role + Company name + Date (`font-mono text-xs text-muted-foreground`)
    - Description / Impact: `text-sm text-muted-foreground leading-relaxed`

---

## 5. Viewport & Responsiveness
- Wrapper: `mx-auto flex w-full max-w-screen-sm flex-col gap-8 px-6 py-10 md:py-16`
- Mobile optimized: No horizontal overflow, touch-friendly tap targets (`min-h-[44px]` for buttons, proper spacing).
