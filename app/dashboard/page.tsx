"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Building02Icon,
  UserGroupIcon,
  UserCheck01Icon,
  ChartBar,
  ArrowRight01Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back to your HRMS system
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Generate Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Companies"
          value="24"
          icon={<HugeiconsIcon icon={Building02Icon} className="w-6 h-6" />}
          trend={{
            direction: "up",
            percentage: 12,
          }}
          description="Active companies"
        />
        <StatsCard
          title="Total Users"
          value="1,248"
          icon={<HugeiconsIcon icon={UserGroupIcon} className="w-6 h-6" />}
          trend={{
            direction: "up",
            percentage: 8,
          }}
          description="Across all companies"
        />
        <StatsCard
          title="Active Employees"
          value="982"
          icon={<HugeiconsIcon icon={UserCheck01Icon} className="w-6 h-6" />}
          trend={{
            direction: "up",
            percentage: 5,
          }}
          description="This month"
        />
        <StatsCard
          title="System Uptime"
          value="99.8%"
          icon={<HugeiconsIcon icon={ChartBar} className="w-6 h-6" />}
          trend={{
            direction: "up",
            percentage: 0.2,
          }}
          description="30-day average"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">
              Recent Activity
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
              <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "New Company Registered",
                description: "Tech Solutions Inc.",
                time: "2 hours ago",
                icon: Building02Icon,
              },
              {
                title: "User Signup",
                description: "15 new employees added to ABC Corp",
                time: "5 hours ago",
                icon: UserGroupIcon,
              },
              {
                title: "System Update",
                description: "v2.5.0 deployed successfully",
                time: "1 day ago",
                icon: ChartBar,
              },
              {
                title: "Company Suspended",
                description: "XYZ Ltd - Payment overdue",
                time: "2 days ago",
                icon: AlertCircleIcon,
              },
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <HugeiconsIcon icon={Icon} className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">
            System Status
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Database
                </span>
                <StatusBadge status="active" label="Operational" />
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  API Server
                </span>
                <StatusBadge status="active" label="Operational" />
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success rounded-full"
                  style={{ width: "99%" }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  File Storage
                </span>
                <StatusBadge status="active" label="Operational" />
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success rounded-full"
                  style={{ width: "98%" }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Email Service
                </span>
                <StatusBadge status="active" label="Operational" />
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success rounded-full"
                  style={{ width: "97%" }}
                />
              </div>
            </div>

            {/* Alerts */}
            <div className="mt-6 p-3 bg-warning/10 border border-warning/30 rounded-lg">
              <p className="text-xs font-medium text-warning">
                ⚠️ Maintenance scheduled for tomorrow at 2 AM UTC
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Companies */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            Top Companies by Employee Count
          </h2>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
            <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="space-y-3">
          {[
            {
              name: "Tech Innovators Ltd",
              employees: 456,
              status: "active" as const,
            },
            {
              name: "Global Finance Corp",
              employees: 389,
              status: "active" as const,
            },
            {
              name: "Healthcare Plus Inc",
              employees: 278,
              status: "active" as const,
            },
            {
              name: "Retail Solutions LLC",
              employees: 245,
              status: "active" as const,
            },
            {
              name: "Manufacturing Co",
              employees: 198,
              status: "active" as const,
            },
          ].map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {company.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {company.employees} employees
                </p>
              </div>
              <StatusBadge status={company.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
