"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}) {
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className="gap-1.5 mt-2">
          {items.map((item) => {
            const isActive =
              item.url === "/dashboard" || item.url === "/admin"
                ? pathname === item.url
                : pathname === item.url || pathname.startsWith(`${item.url}/`);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  render={<Link to={item.url} />}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group/nav relative",
                    isActive
                      ? "bg-primary/5 text-primary"
                      : "text-muted-foreground/60 hover:bg-muted/40 hover:text-foreground",
                  )}
                >
                  <div
                    className={cn(
                      "transition-colors duration-300",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground/40 group-hover/nav:text-foreground/70",
                    )}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={cn(
                      "text-[13px] font-semibold tracking-tight transition-colors duration-300",
                      isActive ? "text-primary" : "text-inherit",
                    )}
                  >
                    {item.title}
                  </span>

                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-full" />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
