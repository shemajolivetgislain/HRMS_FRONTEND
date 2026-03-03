"use client";

import * as React from "react";

import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
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
  Building03Icon,
  Building04Icon,
  GlobeIcon,
} from "@hugeicons/core-free-icons";
import { NavMain } from "./nav-main";
import { CompanySwitcher } from "./company-switcher";
import { Logo } from "@/components/logo";

const defaultData = {
  user: {
    name: "Admin",
    email: "admin@hrms.com",
    avatar: "/avatars/admin.jpg",
  },
  companies: [
    {
      name: "Igihe Logistics",
      logo: Building03Icon,
      plan: "Enterprise",
    },
    {
      name: "Vision Finance",
      logo: Building04Icon,
      plan: "Growth",
    },
    {
      name: "Kivu Heights",
      logo: GlobeIcon,
      plan: "Standard",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />,
    },
    {
      title: "Organization",
      url: "#",
      icon: <HugeiconsIcon icon={Building03Icon} strokeWidth={2} />,
      items: [
        {
          title: "Departments",
          url: "/dashboard/departments",
        },
        {
          title: "Company Settings",
          url: "/dashboard/settings",
        },
      ],
    },
    {
      title: "Workforce",
      url: "#",
      icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />,
      items: [
        {
          title: "All Employees",
          url: "/dashboard/employees",
        },
        {
          title: "Onboarding",
          url: "/dashboard/employees/onboard",
        },
        {
          title: "Resignations",
          url: "/dashboard/employees/resign",
        },
      ],
    },
    {
      title: "Recruitment",
      url: "/dashboard/recruitment",
      icon: <HugeiconsIcon icon={JobShareIcon} strokeWidth={2} />,
    },
    {
      title: "Performance",
      url: "#",
      icon: <HugeiconsIcon icon={ChartBarLineIcon} strokeWidth={2} />,
      items: [
        {
          title: "Staff Appraisals",
          url: "/dashboard/performance",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
      ],
    },
    {
      title: "Payroll",
      url: "/dashboard/payroll",
      icon: <HugeiconsIcon icon={Coins01Icon} strokeWidth={2} />,
    },
    {
      title: "Leave Management",
      url: "/dashboard/leaves",
      icon: <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} />,
    },
    {
      title: "Operations",
      url: "#",
      icon: <HugeiconsIcon icon={File02Icon} strokeWidth={2} />,
      items: [
        {
          title: "Document Vault",
          url: "/dashboard/documents",
        },
        {
          title: "Reports",
          url: "/dashboard/reports",
        },
        {
          title: "Calendar",
          url: "/dashboard/calendar",
        },
      ],
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
      <SidebarHeader className="pt-4 px-2">
        <div className="flex items-center gap-2 px-2 mb-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <Logo className="size-8" />
          <span className="text-xl font-bold tracking-tighter uppercase leading-none text-foreground group-data-[collapsible=icon]:hidden">
            HRMS
          </span>
        </div>
        <CompanySwitcher companies={defaultData.companies} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={defaultData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
