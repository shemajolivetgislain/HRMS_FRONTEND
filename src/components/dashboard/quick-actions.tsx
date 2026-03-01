"use client";

import * as React from "react";
import { 
  Frame, 
  FramePanel, 
  FrameHeader, 
  FrameTitle, 
  FrameDescription, 
  FrameContent,
  FrameFooter
} from "@/components/ui/frame";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Building03Icon,
  UserAdd01Icon,
  FolderSecurityIcon,
  Link01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

const actions = [
  {
    title: "Register Company",
    description: "Start new tenant onboarding",
    icon: Building03Icon,
    accent: "var(--chart-1)",
  },
  {
    title: "Review Approvals",
    description: "Pending OTP verifications",
    icon: UserAdd01Icon,
    accent: "var(--chart-2)",
  },
  {
    title: "Audit Logs",
    description: "View system security events",
    icon: FolderSecurityIcon,
    accent: "var(--chart-3)",
  },
  {
    title: "Integrations",
    description: "Manage connected services",
    icon: Link01Icon,
    accent: "var(--chart-4)",
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
            {actions.map((action, i) => (
              <button
                key={i}
                type="button"
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
              </button>
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
