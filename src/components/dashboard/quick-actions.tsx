"use client";

import * as React from "react";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
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
    accent: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
    href: "/dashboard/departments",
  },
  {
    title: "Hire",
    description: "Onboarding",
    icon: UserAdd01Icon,
    accent: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    href: "/dashboard/employees/onboard",
  },
  {
    title: "Applicants",
    description: "Review",
    icon: FolderSecurityIcon,
    accent: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    href: "/dashboard/recruitment",
  },
  {
    title: "Vault",
    description: "Storage",
    icon: Link01Icon,
    accent: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-500/10",
    href: "/dashboard/documents",
  },
];

export const QuickActions = React.memo(function QuickActions() {
  return (
    <Frame className="h-full group/frame">
      <FramePanel className="flex flex-col h-full bg-card overflow-hidden">
        <FrameHeader className="border-b-0 pb-2 px-6 pt-6">
          <div>
            <FrameTitle className="text-sm font-bold text-foreground/90">Quick Actions</FrameTitle>
            <FrameDescription className="text-xs font-medium">Common administrative shortcuts</FrameDescription>
          </div>
        </FrameHeader>

        <FrameContent className="p-6 pt-2">
          <div className="grid grid-cols-2 gap-3">
            {actions.map((action) => (
              <Link
                key={action.title}
                to={action.href as any}
                className={cn(
                  "group/action flex flex-col items-start p-4 rounded-xl border transition-all duration-200",
                  "bg-muted/5 border-border/40 hover:bg-muted/10 hover:border-border/80",
                )}
              >
                <div
                  className={cn(
                    "size-8 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover/action:scale-110",
                    action.bg,
                    action.accent
                  )}
                >
                  <HugeiconsIcon
                    icon={action.icon}
                    strokeWidth={2}
                    size={16}
                  />
                </div>
                
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold text-foreground/90 block leading-tight">
                    {action.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest block">
                    {action.description}
                  </span>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover/action:opacity-100 transition-opacity">
                  <HugeiconsIcon icon={ArrowRight01Icon} size={12} className="text-muted-foreground/40" />
                </div>
              </Link>
            ))}
          </div>
        </FrameContent>
      </FramePanel>
    </Frame>
  );
});
