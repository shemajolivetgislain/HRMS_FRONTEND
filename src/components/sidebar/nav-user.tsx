"use client";

import { UserAvatar } from "@/components/dashboard/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MoreVerticalCircle01Icon,
  Logout01Icon,
  Sun01Icon,
  Moon01Icon,
  ComputerIcon,
  Settings02Icon,
  HelpCircleIcon,
  Message01Icon,
} from "@hugeicons/core-free-icons";
import { useTheme } from "next-themes";
import { Link } from "@tanstack/react-router";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { setTheme } = useTheme();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="aria-expanded:bg-muted/50 hover:bg-muted/40 transition-colors duration-200 cursor-pointer rounded-lg"
              />
            }
          >
            <UserAvatar 
              src={user.avatar} 
              name={user.name} 
              size="sm" 
              className="rounded-lg shadow-xs group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="grid flex-1 text-start text-sm leading-tight ml-1">
              <span className="truncate font-semibold tracking-tight text-foreground/90">
                {user.name}
              </span>
              <span className="truncate text-xs font-medium text-muted-foreground/70">
                {user.email}
              </span>
            </div>
            <HugeiconsIcon
              icon={MoreVerticalCircle01Icon}
              strokeWidth={2}
              className="ms-auto size-4 text-muted-foreground/50 group-hover:text-foreground transition-colors"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                  <UserAvatar 
                    src={user.avatar} 
                    name={user.name} 
                    size="sm" 
                  />
                  <div className="grid flex-1 text-start text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem render={<Link to="/dashboard/settings" />}>
                <HugeiconsIcon icon={Settings02Icon} strokeWidth={2} />
                <span>System Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link to="/dashboard/help" />}>
                <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} />
                Help Center
              </DropdownMenuItem>
              <DropdownMenuItem render={<a href="mailto:support@hrms.com?subject=HRMS Feedback" />}>
                <HugeiconsIcon icon={Message01Icon} strokeWidth={2} />
                Send Feedback
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-2 py-1.5 text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">
                Theme
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <HugeiconsIcon icon={Sun01Icon} strokeWidth={2} />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <HugeiconsIcon icon={Moon01Icon} strokeWidth={2} />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <HugeiconsIcon icon={ComputerIcon} strokeWidth={2} />
                System
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10">
              <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
