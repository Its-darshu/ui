export function TopBlur() {
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-24 z-50 pointer-events-none backdrop-blur-sm"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--background) / 0.8) 0%, hsl(var(--background) / 0.7) 20%, hsl(var(--background) / 0.5) 40%, hsl(var(--background) / 0.3) 60%, hsl(var(--background) / 0.1) 80%, hsl(var(--background) / 0) 100%)",
        WebkitMaskImage:
          "linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.9) 20%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.4) 80%, transparent 100%)",
        maskImage:
          "linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.9) 20%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.4) 80%, transparent 100%)",
      }}
    />
  );
}
