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
} from "@hugeicons/core-free-icons";
import { NavMain } from "./nav-main";
import { CompanySwitcher } from "./company-switcher";
import { Logo } from "@/components/logo";

import { useAppSelector } from "@/lib/redux/store";
import { useGetCompaniesQuery } from "@/lib/redux/api";

const navMain = [
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
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  customNav?: typeof navMain;
}

export function AppSidebar({ customNav, ...props }: AppSidebarProps) {
  const { user } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === "ADMIN";

  const { data: companiesData } = useGetCompaniesQuery(undefined, {
    skip: !isAdmin,
  });

  const sidebarCompanies = isAdmin
    ? (companiesData?.items.map((c) => ({
        id: c.id,
        name: c.name,
        logo: Building03Icon,
        plan: "Enterprise",
      })) || [])
    : user?.company
      ? [
          {
            id: user.company.id,
            name: user.company.name,
            logo: Building03Icon,
            plan: "Managed",
          },
        ]
      : [];

  const navItems = customNav || navMain;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pt-4 px-2">
        <div className="flex items-center gap-2 px-2 mb-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <Logo className="size-8" />
          <span className="text-xl font-bold tracking-tighter uppercase leading-none text-foreground group-data-[collapsible=icon]:hidden">
            HRMS
          </span>
        </div>
        {sidebarCompanies.length > 0 && (
          <CompanySwitcher companies={sidebarCompanies as any} />
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser
            user={{
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              image: user.profilePicture || "",
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
