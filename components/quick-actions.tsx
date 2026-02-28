"use client";

import { Frame, FramePanel } from "@/components/ui/frame";
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

export function QuickActions() {
  return (
    <Frame className="h-full">
      <FramePanel className="flex flex-col h-full p-0 overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/10">
          <div>
            <h3 className="text-sm font-semibold text-foreground/90">
              Quick Actions
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Common admin shortcuts
            </p>
          </div>
        </div>

        {/* action rows */}
        <div className="flex-1 divide-y divide-border/5">
          {actions.map((action, i) => (
            <button
              key={i}
              className="group flex w-full items-center gap-3.5 px-5 py-3.5 hover:bg-muted/10 transition-colors text-left"
            >
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: `color-mix(in srgb, ${action.accent} 12%, transparent)`,
                }}
              >
                <HugeiconsIcon
                  icon={action.icon}
                  strokeWidth={1.5}
                  size={14}
                  style={{ color: action.accent }}
                />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                <span className="text-[13px] font-medium text-foreground/90 leading-tight group-hover:text-foreground transition-colors">
                  {action.title}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {action.description}
                </span>
              </div>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={13}
                strokeWidth={2}
                className="text-muted-foreground/30 group-hover:text-muted-foreground shrink-0 transition-colors"
              />
            </button>
          ))}
        </div>

        {/* footer */}
        <div className="px-5 py-3 border-t border-border/10 bg-muted/5">
          <span className="text-[10px] text-muted-foreground/50 font-medium">
            {actions.length} shortcuts available
          </span>
        </div>
      </FramePanel>
    </Frame>
  );
}
