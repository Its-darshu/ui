"use client";

import * as React from "react";
import { toast } from "sonner";
import { LampPullCord } from "@/components/lamp-pull-cord";

interface SiteFooterProps {
  footerName: string;
}

export function SiteFooter({ footerName }: SiteFooterProps) {
  const handleNavClick = (sectionName: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info(`${sectionName} section coming soon!`);
  };

  return (
    <footer className="showcase-footer" aria-label="Site footer">
      {/* Top section: Horizontal wire, pull-cord bed lamp switch, and navigation links */}
      <div className="relative z-20 mx-auto w-full max-w-screen-sm px-6 pt-10">
        {/* Full-width horizontal line matching the user's sketch */}
        <div className="relative w-full border-t border-foreground/20 dark:border-foreground/25">
          {/* Physical Lamp Pull Cord hanging from the right end */}
          <div className="absolute right-0 top-0">
            <LampPullCord />
          </div>
        </div>

        {/* Navigation links underneath the line on the left */}
        <div className="flex items-center gap-5 pt-3.5 text-xs font-mono">
          <a
            href="#gallery"
            onClick={handleNavClick("/Galary")}
            className="text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4 decoration-border"
          >
            /Galary
          </a>
        </div>
      </div>

      {/* Ambient Bed Lamp Glow & Big Footer Name */}
      <p
        className="showcase-footer-word pointer-events-none select-none"
        aria-hidden="true"
      >
        {footerName}
      </p>
    </footer>
  );
}
