"use client";

import * as React from "react";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameContent,
  FrameFooter,
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

const actions = [
  {
    title: "Add Department",
    description: "Manage org structure",
    icon: Building03Icon,
    accent: "var(--chart-1)",
    href: "/dashboard/settings",
  },
  {
    title: "Register Employee",
    description: "Start new onboarding",
    icon: UserAdd01Icon,
    accent: "var(--chart-2)",
    href: "/dashboard/employees",
  },
  {
    title: "Review Applicants",
    description: "Pending pipeline stages",
    icon: FolderSecurityIcon,
    accent: "var(--chart-3)",
    href: "/dashboard/recruitment",
  },
  {
    title: "Document Vault",
    description: "Manage employee files",
    icon: Link01Icon,
    accent: "var(--chart-4)",
    href: "/dashboard/documents",
  },
];

export const QuickActions = React.memo(function QuickActions() {
  return (
    <Frame className="h-full group/frame">
      <FramePanel className="flex flex-col h-full overflow-hidden">
        <FrameHeader>
          <div>
            <FrameTitle>Quick Actions</FrameTitle>
            <FrameDescription>Common administrative tasks</FrameDescription>
          </div>
        </FrameHeader>

        <FrameContent className="p-0 flex-1">
          <div className="divide-y divide-border/5">
            {actions.map((action) => (
              <Link
                key={action.title}
                to={action.href}
                className="group/btn flex w-full items-center gap-4 px-6 py-4 hover:bg-muted/10 transition-colors text-left"
              >
                <div
                  className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0 transition-[transform,shadow,background-color] duration-300 group-hover/btn:scale-110 group-hover/btn:shadow-[0_0_15px_-3px_rgba(0,0,0,0.1)] group-hover/btn:shadow-inherit"
                  style={{
                    background: `color-mix(in srgb, ${action.accent} 12%, transparent)`,
                  }}
                >
                  <HugeiconsIcon
                    icon={action.icon}
                    strokeWidth={2}
                    size={16}
                    style={{ color: action.accent }}
                  />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <span className="text-sm font-semibold text-foreground/90 leading-tight group-hover/btn:text-foreground transition-colors">
                    {action.title}
                  </span>
                  <span className="text-xs text-muted-foreground/60 font-medium">
                    {action.description}
                  </span>
                </div>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={14}
                  strokeWidth={2.5}
                  className="text-muted-foreground/20 group-hover/btn:text-muted-foreground/60 group-hover/btn:translate-x-0.5 transition-all"
                />
              </Link>
            ))}
          </div>
        </FrameContent>

        <FrameFooter>
          <span className="text-xs text-muted-foreground/40 font-bold capitalize tracking-widest">
            {actions.length} shortcuts available
          </span>
        </FrameFooter>
      </FramePanel>
    </Frame>
  );
});
