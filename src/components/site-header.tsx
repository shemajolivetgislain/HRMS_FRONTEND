"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search02Icon, Notification01Icon } from "@hugeicons/core-free-icons";
import { useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const routeLabels: Record<string, string> = {
  dashboard: "Overview",
  employees: "Employees",
  reports: "Reports",
  calendar: "Calendar",
  payroll: "Payroll",
  analytics: "Analytics",
  recruitment: "Recruitment",
  settings: "Settings",
  help: "Help Center",
};

export function SiteHeader() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  const labels = segments.map((s) => routeLabels[s] || s);
  const currentLabel = labels[labels.length - 1] || "Dashboard";
  const parentLabel = labels.length > 1 ? labels[labels.length - 2] : null;

  return (
    <header className="flex h-(--header-height) w-full shrink-0 items-center justify-between gap-2 border-b border-border/20 bg-background/80 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) sticky top-0 z-50">
      <div className="flex items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ms-1 text-muted-foreground hover:text-foreground transition-colors" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto bg-border/40"
        />
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 text-[13px] font-medium text-muted-foreground/60 tracking-wide">
            {parentLabel && (
              <>
                <span className="hover:text-foreground cursor-pointer transition-colors capitalize">
                  {parentLabel}
                </span>
                <span className="text-border/60">/</span>
              </>
            )}
            <span className="text-foreground tracking-tight capitalize">
              {currentLabel}
            </span>
          </div>
          <div className="sm:hidden text-sm font-semibold tracking-tight text-foreground capitalize">
            {currentLabel}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 lg:px-6">
        <div className="hidden md:flex relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground/50 group-focus-within:text-primary transition-colors">
            <HugeiconsIcon
              icon={Search02Icon}
              className="size-4"
              strokeWidth={2}
            />
          </div>
          <input
            type="text"
            placeholder="Search directory..."
            className="h-9 w-64 rounded-xl border border-border/40 bg-muted/10 pl-9 pr-12 text-sm outline-none transition-all placeholder:text-muted-foreground/50 hover:bg-muted/30 hover:border-border/60 focus:border-primary/30 focus:bg-background focus:ring-4 focus:ring-primary/5"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded-lg border border-border/40 bg-muted/5 px-2 font-sans text-[10px] font-medium text-muted-foreground/70">
              <span className="text-xs leading-none">⌘</span>K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-0.5 pl-2">
          <button className="relative flex size-9 items-center justify-center rounded-xl text-muted-foreground/70 hover:bg-muted/50 hover:text-foreground transition-colors group">
            <HugeiconsIcon
              icon={Notification01Icon}
              className="size-5 group-hover:scale-105 transition-transform"
              strokeWidth={1.5}
            />
            <span className="absolute top-2 right-2.5 size-1.5 rounded-full bg-destructive shadow-[0_0_4px_--theme(--color-destructive)] animate-pulse" />
          </button>
        </div>
      </div>
    </header>
  );
}
