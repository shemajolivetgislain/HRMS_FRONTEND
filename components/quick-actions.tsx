"use client";

import { Frame, FramePanel } from "@/components/ui/frame";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Building03Icon,
  UserAdd01Icon,
  FolderSecurityIcon,
  Link01Icon,
} from "@hugeicons/core-free-icons";

export function QuickActions() {
  const actions = [
    {
      title: "Register Company",
      description: "Start new tenant onboarding",
      icon: Building03Icon,
    },
    {
      title: "Review Approvals",
      description: "Pending OTP verifications",
      icon: UserAdd01Icon,
    },
    {
      title: "Audit Logs",
      description: "View system security events",
      icon: FolderSecurityIcon,
    },
    {
      title: "Integrations",
      description: "Manage connected services",
      icon: Link01Icon,
    },
  ];

  return (
    <Frame className="h-full">
      <FramePanel className="flex flex-col gap-5 p-5 lg:p-6 h-full">
        <div className="flex items-center justify-between border-b border-border/20 pb-4">
          <h3 className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">
            Quick Actions
          </h3>
        </div>
        <div className="flex flex-col gap-0.5 pt-2">
          {actions.map((action, i) => (
            <button
              key={i}
              className="group flex w-full items-center justify-between rounded-md p-2.5 -mx-2 bg-transparent transition-all hover:bg-muted/30"
            >
              <div className="flex items-center gap-3">
                <HugeiconsIcon
                  icon={action.icon}
                  strokeWidth={1.5}
                  className="size-4 text-muted-foreground group-hover:text-foreground transition-colors"
                />
                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  {action.title}
                </span>
              </div>
              <span className="text-xs text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity">
                {action.description}
              </span>
            </button>
          ))}
        </div>
      </FramePanel>
    </Frame>
  );
}
