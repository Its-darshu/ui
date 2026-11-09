"use client";

import * as React from "react";
import { toast } from "sonner";
import { Check, Copy } from "lucide-react";

interface CopyEmailProps {
  email: string;
}

export function CopyEmail({ email }: CopyEmailProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Copied to clipboard", {
        position: "bottom-center",
        duration: 2200,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy", { position: "bottom-center" });
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="group/email inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-150 underline decoration-border hover:decoration-foreground/50 underline-offset-4 cursor-pointer"
      title="Click to copy email"
    >
      <span>{email}</span>
      {copied ? (
        <Check className="size-3 text-foreground transition-transform scale-110" />
      ) : (
        <Copy className="size-3 opacity-0 group-hover/email:opacity-70 transition-opacity" />
      )}
    </button>
  );
}
