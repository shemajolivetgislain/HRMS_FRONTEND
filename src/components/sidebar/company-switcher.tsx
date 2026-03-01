"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  
  
  
  PlusSignIcon,
  Sorting05Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate, useLocation } from "@tanstack/react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function CompanySwitcher({
  companies,
}: {
  companies: {
    name: string;
    logo: any;
    plan: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  
  const [activeCompany, setActiveCompany] = React.useState(companies[0]);

  const handleCompanySelect = (company: typeof activeCompany) => {
    setActiveCompany(company);
    navigate({ to: "/dashboard" });
  };

  const switchToAdmin = () => {
    navigate({ to: "/admin" });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className={cn(
                  "flex aspect-square size-8 items-center justify-center rounded-lg transition-colors",
                  isAdmin ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                )}>
                  <HugeiconsIcon
                    icon={isAdmin ? Shield01Icon : activeCompany.logo}
                    className="size-4"
                    strokeWidth={2}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-foreground">
                    {isAdmin ? "Platform Admin" : activeCompany.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground/60">
                    {isAdmin ? "Global Control" : activeCompany.plan}
                  </span>
                </div>
                <HugeiconsIcon
                  icon={Sorting05Icon}
                  className="ml-auto size-4 text-muted-foreground/40"
                />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl border-border/40 shadow-xl"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground/40 text-xs font-bold uppercase tracking-widest px-2 py-1.5">
                Platform
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={switchToAdmin}
                className={cn(
                  "gap-2 p-2 rounded-lg mb-1",
                  isAdmin ? "bg-primary/5 text-primary" : "focus:bg-primary/5 focus:text-primary"
                )}
              >
                <div className="flex size-6 items-center justify-center rounded-md border border-border/40 bg-background">
                  <HugeiconsIcon icon={Shield01Icon} className="size-3.5 shrink-0" />
                </div>
                <span className="font-semibold">Platform Console</span>
                <DropdownMenuShortcut className="text-xs opacity-50">⌘A</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator className="bg-border/5" />
            
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground/40 text-xs font-bold uppercase tracking-widest px-2 py-1.5">
                Managed Companies
              </DropdownMenuLabel>
              {companies.map((company, index) => (
                <DropdownMenuItem
                  key={company.name}
                  onClick={() => handleCompanySelect(company)}
                  className={cn(
                    "gap-2 p-2 rounded-lg",
                    !isAdmin && activeCompany.name === company.name ? "bg-primary/5 text-primary" : "focus:bg-primary/5 focus:text-primary"
                  )}
                >
                  <div className="flex size-6 items-center justify-center rounded-md border border-border/40 bg-background">
                    <HugeiconsIcon
                      icon={company.logo}
                      className="size-3.5 shrink-0"
                    />
                  </div>
                  <span className="font-medium">{company.name}</span>
                  <DropdownMenuShortcut className="text-xs opacity-50">
                    ⌘{index + 1}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-border/5" />
            <DropdownMenuItem className="gap-2 p-2 focus:bg-primary/5 focus:text-primary rounded-lg cursor-pointer">
              <div className="flex size-6 items-center justify-center rounded-md border border-dashed border-border/60 bg-transparent">
                <HugeiconsIcon icon={PlusSignIcon} className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium text-xs">
                Onboard Company
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
