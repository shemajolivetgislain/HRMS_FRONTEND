"use client";

import * as React from "react";

import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  Building02Icon,
  UserGroupIcon,
  Settings02Icon,
  File02Icon,
  Calendar01Icon,
  Coins01Icon,
  ChartBarLineIcon,
  Plug01Icon,
  HelpCircleIcon,
} from "@hugeicons/core-free-icons";
import { NavMain } from "./nav-main";

const data = {
  user: {
    name: "Admin",
    email: "admin@hrms.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />,
    },
    {
      title: "Employees",
      url: "/dashboard/employees",
      icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />,
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: <HugeiconsIcon icon={File02Icon} strokeWidth={2} />,
    },
    {
      title: "Calendar",
      url: "/dashboard/calendar",
      icon: <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} />,
    },
    {
      title: "Payroll",
      url: "/dashboard/payroll",
      icon: <HugeiconsIcon icon={Coins01Icon} strokeWidth={2} />,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: <HugeiconsIcon icon={ChartBarLineIcon} strokeWidth={2} />,
    },
    {
      title: "Integration",
      url: "/dashboard/integration",
      icon: <HugeiconsIcon icon={Plug01Icon} strokeWidth={2} />,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <HugeiconsIcon icon={Settings02Icon} strokeWidth={2} />,
    },
    {
      title: "Help",
      url: "/dashboard/help",
      icon: <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5! hover:bg-transparent! flex items-center cursor-default">
              <span className="text-xl font-bold tracking-tighter uppercase leading-none text-foreground">
                HRMS
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
