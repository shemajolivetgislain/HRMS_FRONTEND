"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Frame, 
  FramePanel, 
  FrameHeader, 
  FrameTitle, 
  FrameDescription, 
  FrameContent,
  FrameFooter
} from "@/components/ui/frame";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Download01Icon,
  File02Icon,
  FilterIcon,
  Analytics01Icon,
  Calendar01Icon,
  Clock01Icon,
  UserGroupIcon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

const reports = [
  {
    id: "REP-001",
    name: "Q4 Attendance Summary",
    type: "Attendance",
    date: "Jan 12, 2024",
    status: "ready",
    size: "2.4 MB",
  },
  {
    id: "REP-002",
    name: "Annual Performance Review",
    type: "Performance",
    date: "Jan 10, 2024",
    status: "ready",
    size: "4.1 MB",
  },
  {
    id: "REP-003",
    name: "Monthly Payroll Export",
    type: "Financial",
    date: "Jan 05, 2024",
    status: "processing",
    size: "-",
  },
  {
    id: "REP-004",
    name: "Departmental Growth",
    type: "Analytics",
    date: "Dec 28, 2023",
    status: "ready",
    size: "1.8 MB",
  },
  {
    id: "REP-005",
    name: "Compliance Audit Log",
    type: "System",
    date: "Dec 20, 2023",
    status: "archived",
    size: "5.2 MB",
  },
];

export default function ReportsPage() {
  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden">
      <DashboardHeader 
        category="Intelligence" 
        title="Reports"
        description="Generate and manage organizational data exports"
      >
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-4 rounded-lg text-[12px] font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
        >
          <HugeiconsIcon icon={FilterIcon} size={14} strokeWidth={2} />
          Filter
        </Button>
        <Button
          size="sm"
          className="h-9 px-4 rounded-lg text-[12px] font-bold shadow-sm gap-2 capitalize"
        >
          <HugeiconsIcon
            icon={Analytics01Icon}
            size={14}
            strokeWidth={2}
          />
          Generate New
        </Button>
      </DashboardHeader>

      <div className="flex flex-col gap-4 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        {/* Quick Report Categories */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ReportCategoryCard 
            title="Attendance" 
            count="12 reports" 
            icon={Calendar01Icon} 
            color="var(--chart-1)"
          />
          <ReportCategoryCard 
            title="Financial" 
            count="8 reports" 
            icon={Clock01Icon} 
            color="var(--chart-2)"
          />
          <ReportCategoryCard 
            title="Performance" 
            count="24 reports" 
            icon={UserGroupIcon} 
            color="var(--chart-3)"
          />
          <ReportCategoryCard 
            title="System" 
            count="5 reports" 
            icon={Analytics01Icon} 
            color="var(--chart-4)"
          />
        </section>

        {/* Reports Table */}
        <section>
          <Frame className="group/frame">
            <FramePanel className="p-0 overflow-hidden">
              <FrameHeader>
                <div>
                  <FrameTitle>Recent Generated Reports</FrameTitle>
                  <FrameDescription>Download or manage your most recent data exports</FrameDescription>
                </div>
              </FrameHeader>
              <FrameContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/10">
                    <TableRow className="hover:bg-transparent border-border/5">
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest pl-6">Report Name</TableHead>
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest px-2">Type</TableHead>
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest px-2">Date</TableHead>
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest px-2">Status</TableHead>
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest px-2 text-right pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id} className="border-border/5 hover:bg-muted/5 transition-colors group">
                        <TableCell className="pl-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                              <HugeiconsIcon icon={File02Icon} size={16} />
                            </div>
                            <div>
                              <p className="text-[13px] font-semibold text-foreground/80">{report.name}</p>
                              <p className="text-[11px] font-bold text-muted-foreground/30 tabular-nums uppercase tracking-tight">{report.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-2">
                          <span className="text-[12px] font-medium text-foreground/60">{report.type}</span>
                        </TableCell>
                        <TableCell className="px-2">
                          <span className="text-[12px] font-bold text-muted-foreground/40 tabular-nums">{report.date}</span>
                        </TableCell>
                        <TableCell className="px-2">
                          <Badge 
                            variant={
                              report.status === "ready" ? "success" : 
                              report.status === "processing" ? "warning" : 
                              "secondary"
                            } 
                            showDot
                          >
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex items-center justify-end gap-1">
                            {report.status === "ready" && (
                              <Button variant="ghost" size="icon-sm" className="rounded-lg hover:bg-primary/5 hover:text-primary">
                                <HugeiconsIcon icon={Download01Icon} className="size-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon-sm" className="rounded-lg opacity-50">
                              <HugeiconsIcon icon={MoreHorizontalIcon} className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </FrameContent>
              <FrameFooter>
                <p className="text-[10px] text-muted-foreground/40 font-bold capitalize tracking-widest">
                  Showing latest 5 of 48 reports
                </p>
              </FrameFooter>
            </FramePanel>
          </Frame>
        </section>
      </div>
    </main>
  );
}

function ReportCategoryCard({ title, count, icon: Icon, color }: { title: string; count: string; icon: any; color: string }) {
  return (
    <Frame className="group/frame h-full">
      <FramePanel className="p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div 
            className="h-9 w-9 rounded-xl flex items-center justify-center border border-border/10"
            style={{ background: `color-mix(in srgb, ${color} 8%, transparent)` }}
          >
            <HugeiconsIcon icon={Icon} size={18} style={{ color }} strokeWidth={2} />
          </div>
          <Button variant="ghost" size="icon-sm" className="rounded-lg opacity-0 group-hover/frame:opacity-100 transition-opacity">
            <HugeiconsIcon icon={MoreHorizontalIcon} className="size-4 opacity-40" />
          </Button>
        </div>
        <div>
          <p className="text-[13px] font-semibold text-foreground/80 leading-none mb-1.5">{title}</p>
          <p className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest">{count}</p>
        </div>
      </FramePanel>
    </Frame>
  );
}
