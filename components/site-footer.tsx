"use client";

import * as React from "react";
import { LampPullCord } from "@/components/lamp-pull-cord";

interface SiteFooterProps {
  footerName: string;
}

export function SiteFooter({ footerName }: SiteFooterProps) {
  return (
    <footer className="showcase-footer" aria-label="Site footer">
      {/* Top section: Horizontal wire and pull-cord bed lamp switch */}
      <div className="relative z-20 mx-auto w-full max-w-screen-sm px-6 pt-10">
        {/* Full-width horizontal line matching the user's sketch */}
        <div className="relative w-full border-t border-foreground/20 dark:border-foreground/25">
          {/* Physical Lamp Pull Cord hanging from the right end */}
          <div className="absolute right-0 top-0">
            <LampPullCord />
          </div>
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
