"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  className?: string;
  isFloating?: boolean;
}

export function ModeToggle({ className, isFloating = true }: ModeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const baseClasses = isFloating
    ? "fixed bottom-6 right-6 z-50 size-10 rounded-full border border-border/80 bg-background/80 backdrop-blur-md shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all duration-200 cursor-pointer active:scale-95"
    : "relative size-8 rounded-full border border-border bg-background/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200 cursor-pointer active:scale-95";

  if (!mounted) {
    return (
      <div
        className={cn(
          baseClasses,
          "opacity-60 pointer-events-none",
          className
        )}
      />
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(baseClasses, className)}
      aria-label="Toggle theme"
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
