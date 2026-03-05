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
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-12 px-2 rounded-xl transition-all duration-300"
              >
                <div className={cn(
                  "flex aspect-square size-8 items-center justify-center rounded-xl transition-all duration-500",
                  isAdmin ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" : "bg-primary/10 text-primary"
                )}>
                  <HugeiconsIcon
                    icon={isAdmin ? Shield01Icon : activeCompany.logo}
                    className="size-4"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight ml-1">
                  <span className="truncate font-bold text-foreground/90 tracking-tight">
                    {isAdmin ? "Platform Control" : activeCompany.name}
                  </span>
                  <span className="truncate text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest mt-0.5">
                    {isAdmin ? "System Admin" : activeCompany.plan}
                  </span>
                </div>
                <HugeiconsIcon
                  icon={Sorting05Icon}
                  className="ml-auto size-3.5 text-muted-foreground/30 group-data-[state=open]:rotate-180 transition-transform duration-300"
                />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-64 rounded-2xl border-border/40 shadow-2xl p-2"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={8}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground/40 text-[9px] font-black uppercase tracking-[0.25em] px-3 py-2">
                System Tiers
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={switchToAdmin}
                className={cn(
                  "gap-3 px-2.5 py-1.5 rounded-xl mb-1 cursor-pointer transition-colors font-semibold text-sm",
                  isAdmin ? "bg-primary/5 text-primary" : "focus:bg-primary/5 focus:text-primary"
                )}
              >
                <div className={cn(
                  "flex size-7 items-center justify-center rounded-lg border transition-colors",
                  isAdmin ? "bg-primary/10 border-primary/20 text-primary" : "border-border/40 bg-background"
                )}>
                  <HugeiconsIcon icon={Shield01Icon} className="size-4 shrink-0" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="leading-none">Platform Console</p>
                  <p className="text-[10px] text-muted-foreground/50 font-medium mt-1">Multi-tenant management</p>
                </div>
                <DropdownMenuShortcut className="text-[10px] font-bold opacity-30 tracking-widest">⌘A</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator className="bg-border/5 my-1.5" />
            
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuLabel className="text-muted-foreground/40 text-[9px] font-black uppercase tracking-[0.25em] px-3 py-2">
                Active Organizations
              </DropdownMenuLabel>
              {companies.map((company, index) => (
                <DropdownMenuItem
                  key={company.name}
                  onClick={() => handleCompanySelect(company)}
                  className={cn(
                    "gap-3 px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors font-semibold text-sm",
                    !isAdmin && activeCompany.name === company.name ? "bg-primary/5 text-primary" : "focus:bg-primary/5 focus:text-primary"
                  )}
                >
                  <div className={cn(
                    "flex size-7 items-center justify-center rounded-lg border transition-colors",
                    !isAdmin && activeCompany.name === company.name ? "bg-primary/10 border-primary/20 text-primary" : "border-border/40 bg-background"
                  )}>
                    <HugeiconsIcon
                      icon={company.logo}
                      className="size-4 shrink-0"
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="leading-none">{company.name}</p>
                    <p className="text-[10px] text-muted-foreground/50 font-medium mt-1">{company.plan} Account</p>
                  </div>
                  <DropdownMenuShortcut className="text-[10px] font-bold opacity-30 tracking-widest">
                    ⌘{index + 1}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-border/5 my-1.5" />
            <DropdownMenuItem className="gap-3 px-2.5 py-1.5 focus:bg-primary/5 focus:text-primary rounded-xl cursor-pointer transition-all border border-transparent hover:border-border/40">
              <div className="flex size-7 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/5 group-hover:bg-primary/5 transition-colors">
                <HugeiconsIcon icon={PlusSignIcon} className="size-4 text-muted-foreground/60" />
              </div>
              <div className="font-bold text-[11px] uppercase tracking-widest">
                Onboard Organization
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
