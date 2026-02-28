import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameContent,
  FrameFooter,
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
  Coins01Icon,
  Download01Icon,
  Search01Icon,
  ArrowUpRight01Icon,
  Calendar01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  CreditCardIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { api } from "@/lib/mock-api";

import { DashboardPending } from "@/components/dashboard/dashboard-pending";

export const Route = createFileRoute("/dashboard/payroll/")({
  loader: async () => await api.getPayroll(),
  pendingComponent: DashboardPending,
  component: PayrollPage,
});

function PayrollPage() {
  const payrollData = Route.useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden">
      <DashboardHeader
        category="Financials"
        title="Payroll"
        description="Manage employee disbursements and salary structures"
      >
        <Button
          variant="outline"
          size="lg"
          className="text-[12px] font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
        >
          <HugeiconsIcon icon={Download01Icon} size={14} strokeWidth={2} />
          Statement
        </Button>
        <Button
          size="lg"
          className="text-[12px] font-bold shadow-sm gap-2 capitalize"
        >
          <HugeiconsIcon icon={Coins01Icon} size={14} strokeWidth={2} />
          Run Payroll
        </Button>
      </DashboardHeader>

      <div className="flex flex-col gap-4 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            label="Total Disbursement"
            value="$42,850.00"
            change="+4.2%"
            up={true}
            icon={Coins01Icon}
            variant="primary"
          />
          <StatCard
            label="Pending Approvals"
            value="14"
            change="-2"
            up={false}
            icon={Tick01Icon}
            variant="warning"
          />
          <StatCard
            label="Next Pay Date"
            value="Jan 25"
            icon={Calendar01Icon}
            variant="success"
          />
        </section>

        <section>
          <Frame className="group/frame">
            <FramePanel className="p-0 overflow-hidden bg-card">
              <FrameHeader className="border-b-0 pb-2">
                <div>
                  <FrameTitle>Disbursement History</FrameTitle>
                  <FrameDescription>
                    Complete record of all employee payments
                  </FrameDescription>
                </div>
              </FrameHeader>

              <div className="px-6 pb-5 pt-2 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3 border-b border-border/5">
                <div className="relative">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    className="absolute left-3 top-2.5 size-4 text-muted-foreground/40"
                    strokeWidth={2}
                  />
                  <Input
                    placeholder="Search payee…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-9 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all text-xs"
                  />
                </div>

                <Select defaultValue="dec-2023">
                  <SelectTrigger className="h-9 rounded-lg border-border/40 bg-muted/5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground/40 text-[10px] font-bold uppercase tracking-wider">
                        Month:
                      </span>
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dec-2023" className="text-xs">
                      Dec 2023
                    </SelectItem>
                    <SelectItem value="nov-2023" className="text-xs">
                      Nov 2023
                    </SelectItem>
                    <SelectItem value="oct-2023" className="text-xs">
                      Oct 2023
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger className="h-9 rounded-lg border-border/40 bg-muted/5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground/40 text-[10px] font-bold uppercase tracking-wider">
                        Status:
                      </span>
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="text-xs">
                      All Status
                    </SelectItem>
                    <SelectItem value="paid" className="text-xs">
                      Paid
                    </SelectItem>
                    <SelectItem value="processing" className="text-xs">
                      Processing
                    </SelectItem>
                    <SelectItem value="delayed" className="text-xs">
                      Delayed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <FrameContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/10">
                    <TableRow className="hover:bg-transparent border-border/5">
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest pl-6">
                        Reference
                      </TableHead>
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
                        Employee
                      </TableHead>
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
                        Amount
                      </TableHead>
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
                        Method
                      </TableHead>
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
                        Date
                      </TableHead>
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
                        Status
                      </TableHead>
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest px-2 text-right pr-6">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrollData.map((item) => (
                      <TableRow
                        key={item.id}
                        className="border-border/5 hover:bg-muted/5 transition-colors group"
                      >
                        <TableCell className="pl-6 py-4">
                          <span className="text-[11px] font-bold text-muted-foreground/30 tabular-nums">
                            {item.id}
                          </span>
                        </TableCell>
                        <TableCell className="px-2">
                          <div className="flex items-center gap-3">
                            <UserAvatar name={item.employee} size="sm" />
                            <div>
                              <p className="text-[13px] font-semibold text-foreground/80 leading-none">
                                {item.employee}
                              </p>
                              <p className="text-[11px] font-medium text-muted-foreground/40 mt-1">
                                {item.role}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-2">
                          <span className="text-[13px] font-semibold text-foreground/90 tabular-nums">
                            {formatCurrency(item.amount)}
                          </span>
                        </TableCell>
                        <TableCell className="px-2">
                          <div className="flex items-center gap-2">
                            <HugeiconsIcon
                              icon={CreditCardIcon}
                              size={12}
                              className="text-muted-foreground/30"
                            />
                            <span className="text-[12px] font-medium text-foreground/60">
                              {item.method}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="px-2">
                          <span className="text-[12px] font-bold text-muted-foreground/40 tabular-nums">
                            {formatDate(item.date)}
                          </span>
                        </TableCell>
                        <TableCell className="px-2">
                          <Badge
                            variant={
                              item.status === "paid"
                                ? "success"
                                : item.status === "processing"
                                  ? "warning"
                                  : "destructive"
                            }
                            showDot
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            render={
                              <Link
                                to="/dashboard/payroll/$id"
                                params={{ id: item.id }}
                              />
                            }
                          >
                            <HugeiconsIcon
                              icon={ArrowUpRight01Icon}
                              className="size-4 opacity-40"
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </FrameContent>

              <FrameFooter className="flex items-center justify-between">
                <p className="text-[10px] text-muted-foreground/40 font-bold capitalize tracking-widest">
                  Showing {payrollData.length} of 124 disbursements
                </p>
                <div className="flex items-center gap-1.5">
                  <button 
                    className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground/40 hover:bg-muted/50 transition-colors"
                    aria-label="Previous page"
                  >
                    <HugeiconsIcon
                      icon={ArrowLeft01Icon}
                      size={12}
                      strokeWidth={2.5}
                    />
                  </button>
                  <button 
                    className="h-7 w-7 flex items-center justify-center rounded-md bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold"
                    aria-label="Page 1"
                    aria-current="page"
                  >
                    1
                  </button>
                  <button 
                    className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground/40 hover:bg-muted/50 transition-colors"
                    aria-label="Next page"
                  >
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={12}
                      strokeWidth={2.5}
                    />
                  </button>
                </div>
              </FrameFooter>
            </FramePanel>
          </Frame>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  change,
  up,
  icon: Icon,
  variant,
  sub,
}: {
  label: string;
  value: string;
  change?: string;
  up?: boolean;
  icon: any;
  variant:
    | "primary"
    | "success"
    | "warning"
    | "destructive"
    | "info"
    | "accent";
  sub?: string;
}) {
  return (
    <Frame className="group/frame h-full">
      <FramePanel className="p-5 flex flex-col gap-4 bg-card">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "h-9 w-9 rounded-xl flex items-center justify-center border border-border/10",
              variant === "primary" && "bg-primary/10 text-primary",
              variant === "success" && "bg-success/10 text-success",
              variant === "warning" && "bg-warning/10 text-warning",
              variant === "destructive" && "bg-destructive/10 text-destructive",
              variant === "info" && "bg-info/10 text-info",
              variant === "accent" && "bg-accent/10 text-accent",
            )}
          >
            <HugeiconsIcon icon={Icon} size={18} strokeWidth={2} />
          </div>
          {change ? (
            <Badge
              variant="muted"
              className={cn(
                "border-none px-1.5 py-0.5 rounded-md font-bold",
                up
                  ? "text-success bg-success/10"
                  : "text-destructive bg-destructive/10",
              )}
            >
              <span className="text-[10px]">
                {up ? "↑" : "↓"} {change}
              </span>
            </Badge>
          ) : null}
        </div>
        <div>
          <div className="text-2xl font-semibold tracking-tight text-foreground/90 leading-none mb-1.5 tabular-nums">
            {value}
          </div>
          <div className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest">
            {label}
          </div>
          {sub ? (
            <p className="text-[10px] text-muted-foreground/30 font-medium mt-1 uppercase tracking-tighter">
              {sub}
            </p>
          ) : null}
        </div>
      </FramePanel>
    </Frame>
  );
}
