import React from "react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-8", className)}
    >
      <rect
        x="6"
        y="6"
        width="6"
        height="20"
        rx="1.5"
        className="fill-primary"
      />
      <rect
        x="20"
        y="6"
        width="6"
        height="20"
        rx="1.5"
        className="fill-primary/60"
      />
      <rect
        x="12"
        y="13"
        width="8"
        height="6"
        rx="1"
        className="fill-primary/80"
      />
    </svg>
  );
}
