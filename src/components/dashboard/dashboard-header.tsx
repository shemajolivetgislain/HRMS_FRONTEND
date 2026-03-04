"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  category?: string;
  children?: React.ReactNode;
  className?: string;
}

export function DashboardHeader({
  title,
  description,
  category,
  children,
  className,
}: DashboardHeaderProps) {
  return (
    <header className={cn("flex items-end justify-between pt-12 pb-10 px-6 lg:px-8", className)}>
      <div className="flex flex-col gap-2">
        {category ? (
          <p className="text-[10px] font-black text-muted-foreground/40 capitalize tracking-[0.25em] mb-1">
            {category}
          </p>
        ) : null}
        <h1 className="text-3xl font-black tracking-tighter text-foreground/90 leading-tight uppercase">
          {title}
        </h1>
        {description ? (
          <p className="text-sm font-medium text-muted-foreground/50 max-w-2xl leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>

      {children ? (
        <div className="flex items-center gap-3 mb-1">
          {children}
        </div>
      ) : null}
    </header>
  );
}
