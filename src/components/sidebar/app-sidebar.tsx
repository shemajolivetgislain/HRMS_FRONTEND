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
  UserGroupIcon,
  File02Icon,
  Calendar01Icon,
  Coins01Icon,
  ChartBarLineIcon,
  JobShareIcon,
} from "@hugeicons/core-free-icons";
import { NavMain } from "./nav-main";

const defaultData = {
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
      title: "Recruitment",
      url: "/dashboard/recruitment",
      icon: <HugeiconsIcon icon={JobShareIcon} strokeWidth={2} />,
    },
    {
      title: "Document Vault",
      url: "/dashboard/documents",
      icon: <HugeiconsIcon icon={File02Icon} strokeWidth={2} />,
    },
    {
      title: "Leave Management",
      url: "/dashboard/leaves",
      icon: <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} />,
    },
    {
      title: "Performance",
      url: "/dashboard/performance",
      icon: <HugeiconsIcon icon={ChartBarLineIcon} strokeWidth={2} />,
    },
    {
      title: "Payroll",
      url: "/dashboard/payroll",
      icon: <HugeiconsIcon icon={Coins01Icon} strokeWidth={2} />,
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
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: <HugeiconsIcon icon={ChartBarLineIcon} strokeWidth={2} />,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  customNav?: typeof defaultData.navMain;
}

export function AppSidebar({ customNav, ...props }: AppSidebarProps) {
  const navItems = customNav || defaultData.navMain;

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
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={defaultData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
