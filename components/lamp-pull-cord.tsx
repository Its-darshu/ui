"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function LampPullCord() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Default resting cord length in pixels
  const REST_LENGTH = 68;
  const MIN_PULL_THRESHOLD = 14;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const animRef = React.useRef<number | null>(null);
  const lastToggleTimeRef = React.useRef(0);

  const [cordPath, setCordPath] = React.useState(`M 0 0 L 0 ${REST_LENGTH}`);
  const [handle, setHandle] = React.useState({ x: 0, y: REST_LENGTH, angle: 0 });

  const stateRef = React.useRef({
    // Handle position in full 360 space relative to anchor (0, 0)
    x: 0,
    y: REST_LENGTH,
    angle: 0,

    // Anchor screen coordinates for unrestricted 360-degree tracking
    anchorScreenX: 0,
    anchorScreenY: 0,

    // Drag tracking
    isDragging: false,
    hasMoved: false,

    // Air draft / wind hover effect
    isHovered: false,
    hoverStrength: 0, // 0 to 1

    // 2D Snap-back spring physics in full 360 plane
    isSnapping: false,
    snapStartTime: 0,
    snapInitialYOffset: 0,
    snapInitialX: 0,
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Strict single theme toggle with debounce guard
  const executeThemeToggle = React.useCallback(() => {
    const now = performance.now();
    if (now - lastToggleTimeRef.current < 500) return;
    lastToggleTimeRef.current = now;

    const currentTheme = resolvedTheme || theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, theme, setTheme]);

  // Generate smooth cord path in full 360-degree coordinates
  const buildPath = React.useCallback(
    (hx: number, hy: number, lateralRipple: number) => {
      const STEPS = 10;
      const pts: { x: number; y: number }[] = [];
      const len = Math.hypot(hx, hy) || 1;

      // Normal perpendicular unit vector to the cord direction for true 360 waves
      const nx = -hy / len;
      const ny = hx / len;

      for (let i = 0; i <= STEPS; i++) {
        const s = i / STEPS;
        const baseX = s * hx;
        const baseY = s * hy;
        // Transverse flutter/ripple strictly perpendicular to current cord angle
        const ripple = lateralRipple * Math.sin(Math.PI * s);
        pts.push({ x: baseX + ripple * nx, y: baseY + ripple * ny });
      }

      let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
      for (let i = 1; i < pts.length - 1; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2;
        const yc = (pts[i].y + pts[i + 1].y) / 2;
        d += ` Q ${pts[i].x.toFixed(2)} ${pts[i].y.toFixed(2)}, ${xc.toFixed(2)} ${yc.toFixed(2)}`;
      }
      const last = pts[pts.length - 1];
      d += ` L ${last.x.toFixed(2)} ${last.y.toFixed(2)}`;

      // Complete 360-degree rotation of tassel pointing along cord vector
      const prev = pts[pts.length - 2];
      const angle = (Math.atan2(last.x - prev.x, last.y - prev.y) * 180) / Math.PI;

      return { path: d, angle };
    },
    []
  );

  // Animation frame loop
  React.useEffect(() => {
    let lastTime = performance.now();

    const update = (now: number) => {
      const dt = Math.min(0.033, (now - lastTime) / 1000);
      lastTime = now;
      const s = stateRef.current;

      // Air breeze hover transition
      if (s.isHovered && !s.isDragging && !s.isSnapping) {
        s.hoverStrength = Math.min(1, s.hoverStrength + dt * 6);
      } else {
        s.hoverStrength = Math.max(0, s.hoverStrength - dt * 4);
      }

      if (s.isSnapping) {
        // Full 2D spring snap back from any 360-degree position
        const t = (now - s.snapStartTime) / 1000;
        const omega = 19; // snap speed
        const zeta = 0.72; // clean single-cushion damping
        const envelope = Math.exp(-zeta * omega * t);

        if (envelope > 0.005) {
          const yOffset = s.snapInitialYOffset * envelope * Math.cos(omega * t);
          s.y = REST_LENGTH + yOffset;
          s.x = s.snapInitialX * envelope * Math.cos(omega * 0.8 * t);

          // Rapid snap recoil ripple
          const snapRipple = 4 * Math.exp(-12 * t) * Math.sin(28 * t);

          const { path, angle } = buildPath(s.x, s.y, snapRipple);
          setCordPath(path);
          setHandle({ x: s.x, y: s.y, angle });
        } else {
          // Settled cleanly at resting position
          s.isSnapping = false;
          s.x = 0;
          s.y = REST_LENGTH;
          const { path, angle } = buildPath(0, REST_LENGTH, 0);
          setCordPath(path);
          setHandle({ x: 0, y: REST_LENGTH, angle });
        }
      } else if (!s.isDragging) {
        // Natural air wind presence when mouse hovers over the cord
        if (s.hoverStrength > 0) {
          const tSec = now * 0.001;
          const breeze =
            (Math.sin(tSec * 8) * 1.8 + Math.cos(tSec * 13) * 1.1) *
            s.hoverStrength;

          const { path, angle } = buildPath(s.x, s.y, breeze);
          setCordPath(path);
          setHandle({ x: s.x, y: s.y, angle: angle + breeze * 2 });
        } else if (s.x === 0 && s.y === REST_LENGTH) {
          // Perfectly still at rest
          const { path, angle } = buildPath(0, REST_LENGTH, 0);
          setCordPath(path);
          setHandle({ x: 0, y: REST_LENGTH, angle });
        }
      }

      animRef.current = requestAnimationFrame(update);
    };

    animRef.current = requestAnimationFrame(update);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [buildPath]);

  // Pointer drag events with complete 360-degree rotation freedom
  const handlePointerDown = (e: React.PointerEvent<SVGGElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const s = stateRef.current;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);

    // Compute anchor screen coordinates
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      s.anchorScreenX = rect.left;
      s.anchorScreenY = rect.top;
    }

    s.isDragging = true;
    s.isSnapping = false;
    s.hasMoved = false;
  };

  const handlePointerMove = (e: React.PointerEvent<SVGGElement>) => {
    const s = stateRef.current;
    if (!s.isDragging) return;

    // Full 2D vector from anchor (0, 0) directly to mouse position (360 degrees)
    let targetX = e.clientX - s.anchorScreenX;
    let targetY = e.clientY - s.anchorScreenY;

    // Calculate radial distance from anchor
    let distance = Math.hypot(targetX, targetY);

    // Keep minimum distance so handle does not overlap center anchor
    const minDistance = 18;
    if (distance < minDistance) {
      const scale = minDistance / (distance || 1);
      targetX *= scale;
      targetY *= scale;
      distance = minDistance;
    }

    // Elastic reach limit (allows pulling far in any direction)
    const maxDistance = 125;
    if (distance > maxDistance) {
      const scale = maxDistance / distance;
      targetX *= scale;
      targetY *= scale;
    }

    if (Math.hypot(targetX - s.x, targetY - s.y) > 3) {
      s.hasMoved = true;
    }

    s.x = targetX;
    s.y = targetY;

    // Direct real-time 360-degree path update
    const { path, angle } = buildPath(s.x, s.y, 0);
    setCordPath(path);
    setHandle({ x: s.x, y: s.y, angle });
  };

  const handlePointerUp = (e: React.PointerEvent<SVGGElement>) => {
    const s = stateRef.current;
    if (!s.isDragging) return;

    try {
      (e.currentTarget as Element).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    s.isDragging = false;
    // Total displacement from resting position (0, REST_LENGTH) in 360 space
    const displacement = Math.hypot(s.x, s.y - REST_LENGTH);

    // Toggle theme once on release if pulled away from rest or tapped
    if (displacement >= MIN_PULL_THRESHOLD || !s.hasMoved) {
      executeThemeToggle();
    }

    // 2D spring recoil snap back from any 360 direction
    s.isSnapping = true;
    s.snapStartTime = performance.now();
    s.snapInitialYOffset = s.y - REST_LENGTH;
    s.snapInitialX = s.x;
  };

  // Hover detection for wind air disturbance effect
  const handleMouseEnter = () => {
    stateRef.current.isHovered = true;
  };

  const handleMouseLeave = () => {
    stateRef.current.isHovered = false;
  };

  if (!mounted) {
    return (
      <div className="relative w-0 h-0">
        <svg className="overflow-visible" style={{ position: "absolute", top: 0, left: 0 }}>
          <circle cx="0" cy="0" r="2.5" className="fill-foreground/25 dark:fill-foreground/30" />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2={REST_LENGTH}
            stroke="currentColor"
            strokeWidth="1.25"
            strokeDasharray="3 3"
            className="text-foreground/25 dark:text-foreground/30"
          />
        </svg>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-0 h-0 select-none">
      <svg
        className="overflow-visible pointer-events-none"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* Invisible air hover detection area around the thread */}
        <rect
          x="-35"
          y="-15"
          width="70"
          height={REST_LENGTH + 35}
          fill="transparent"
          className="pointer-events-auto cursor-grab active:cursor-grabbing"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        {/* Anchor bead matching the horizontal footer wire tone */}
        <circle
          cx="0"
          cy="0"
          r="2.5"
          className="fill-foreground/30 dark:fill-foreground/35 drop-shadow-xs"
        />

        {/* Dotted cord matching the horizontal footer wire color and fine weight */}
        <path
          d={cordPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeDasharray="3 3"
          strokeLinecap="round"
          className="text-foreground/25 dark:text-foreground/30"
        />

        {/* Tassel Bell / Cone Pull Handle with 360-degree rotation */}
        <g
          transform={`translate(${handle.x}, ${handle.y}) rotate(${handle.angle})`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="cursor-grab active:cursor-grabbing pointer-events-auto select-none group"
          role="button"
          tabIndex={0}
          aria-label="Pull lamp cord to switch theme"
        >
          {/* Expanded 360 hit area for effortless grabbing in any direction */}
          <circle cx="0" cy="8" r="26" fill="transparent" />

          {/* Top collar bead */}
          <rect
            x="-2"
            y="0"
            width="4"
            height="2.5"
            rx="0.5"
            className="fill-foreground/40 dark:fill-foreground/45 transition-colors duration-150 group-hover:fill-foreground"
          />

          {/* Cone / Bell tassel handle body */}
          <path
            d="M 0 2.5 L -5.5 14.5 C -5.5 16 -3 17 0 17 C 3 17 5.5 16 5.5 14.5 Z"
            className="fill-foreground/50 dark:fill-foreground/55 transition-colors duration-150 group-hover:fill-foreground drop-shadow-sm"
          />

          {/* Inner 3D depth sheen */}
          <path
            d="M 0 4 L -3 14 C -1.5 14.8 0 15 0 15 Z"
            className="fill-background/25"
          />
        </g>
      </svg>
    </div>
  );
}
