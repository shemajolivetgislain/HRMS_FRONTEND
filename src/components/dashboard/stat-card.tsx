import React from "react";
import { Frame, FramePanel } from "@/components/ui/frame";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  up?: boolean;
  icon: any;
  variant?: "primary" | "info" | "success" | "warning" | "destructive" | "accent" | "muted";
  sub?: string;
  className?: string;
}

const variantStyles = {
  primary: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  info: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  success: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  destructive: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  accent: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  muted: "bg-muted/10 text-muted-foreground/40 border-border/5",
};

const gradientStyles = {
  primary: "from-blue-500/5 to-transparent",
  info: "from-sky-500/5 to-transparent",
  success: "from-emerald-500/5 to-transparent",
  warning: "from-amber-500/5 to-transparent",
  destructive: "from-rose-500/5 to-transparent",
  accent: "from-indigo-500/5 to-transparent",
  muted: "from-muted/5 to-transparent",
};

export const StatCard = React.memo(function StatCard({
  label,
  value,
  change,
  up = true,
  icon: Icon,
  variant = "primary",
  sub,
  className,
}: StatCardProps) {
  return (
    <Frame className={cn("group/stat h-full", className)}>
      <FramePanel className={cn(
        "p-6 flex flex-col justify-between h-full bg-card shadow-xs relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-100",
        gradientStyles[variant]
      )}>
        <div className="flex items-center justify-between relative z-10">
          <div
            className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center border transition-all duration-500 group-hover/stat:scale-110 group-hover/stat:rotate-3",
              variantStyles[variant]
            )}
          >
            <HugeiconsIcon icon={Icon} size={20} strokeWidth={2} />
          </div>
          {change && (
            <Badge
              variant="muted"
              className={cn(
                "border-none px-2 py-0.5 rounded-lg font-bold text-[10px] uppercase tracking-widest",
                up ? "text-emerald-600 bg-emerald-500/10" : "text-rose-600 bg-rose-500/10"
              )}
            >
              {up ? "+" : ""}{change}
            </Badge>
          )}
        </div>
        
        <div className="mt-6 relative z-10">
          <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] mb-1">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight text-foreground/90 tabular-nums leading-none">
              {value}
            </h3>
          </div>
          {sub && (
            <p className="text-[10px] font-bold text-muted-foreground/30 mt-2 uppercase tracking-wide truncate">
              {sub}
            </p>
          )}
        </div>
      </FramePanel>
    </Frame>
  );
});
