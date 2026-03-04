"use client";

import * as React from "react";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameContent,
} from "@/components/ui/frame";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Building03Icon,
  UserAdd01Icon,
  FolderSecurityIcon,
  Link01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const actions = [
  {
    title: "Departments",
    description: "Structure",
    icon: Building03Icon,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    href: "/dashboard/departments",
  },
  {
    title: "Hire",
    description: "Onboarding",
    icon: UserAdd01Icon,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    href: "/dashboard/employees/onboard",
  },
  {
    title: "Applicants",
    description: "Review",
    icon: FolderSecurityIcon,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    href: "/dashboard/recruitment",
  },
  {
    title: "Vault",
    description: "Storage",
    icon: Link01Icon,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    href: "/dashboard/documents",
  },
];

export const QuickActions = React.memo(function QuickActions() {
  return (
    <Frame className="h-full group/frame">
      <FramePanel className="flex flex-col h-full bg-card overflow-hidden relative">
        {/* Subtle decorative background element */}
        <div className="absolute top-0 right-0 p-1 opacity-[0.03] pointer-events-none rotate-12 translate-x-4 -translate-y-4">
          <HugeiconsIcon icon={Building03Icon} size={120} />
        </div>

        <FrameHeader className="border-b-0 pb-2">
          <div>
            <FrameTitle className="text-xs uppercase tracking-[0.2em] text-muted-foreground/50">Shortcuts</FrameTitle>
            <FrameTitle className="text-lg normal-case mt-1">Quick Actions</FrameTitle>
          </div>
        </FrameHeader>

        <FrameContent className="p-6 pt-2">
          <div className="grid grid-cols-2 gap-3">
            {actions.map((action) => (
              <Link
                key={action.title}
                to={action.href as any}
                className={cn(
                  "group/action flex flex-col items-start p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden",
                  "bg-muted/5 border-border/40 hover:bg-background hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20",
                )}
              >
                <div
                  className={cn(
                    "size-9 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover/action:scale-110 border",
                    action.bg,
                    action.color,
                    action.border
                  )}
                >
                  <HugeiconsIcon
                    icon={action.icon}
                    strokeWidth={2}
                    size={18}
                  />
                </div>
                
                <div className="space-y-0.5 relative z-10">
                  <span className="text-[13px] font-bold text-foreground/90 block leading-tight">
                    {action.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest block">
                    {action.description}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover/action:opacity-100 group-hover/action:translate-x-0 translate-x-2 transition-all duration-300">
                  <HugeiconsIcon icon={ArrowRight01Icon} size={12} className={action.color} />
                </div>
              </Link>
            ))}
          </div>
        </FrameContent>
      </FramePanel>
    </Frame>
  );
});
