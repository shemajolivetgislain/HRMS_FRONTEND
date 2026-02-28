"use client";

import React from "react";
import Link from "next/link";
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
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Download01Icon,
  MoreHorizontalIcon,
  Calendar01Icon,
  CreditCardIcon,
  Tick01Icon,
  InformationCircleIcon,
  UserGroupIcon,
  Note01Icon,
  Coins01Icon,
  Shield01Icon,
  Agreement01Icon,
} from "@hugeicons/core-free-icons";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { cn } from "@/lib/utils";

export default function PayrollDetailsPage() {
  const data = {
    id: "PAY-001",
    employee: "Ahmed Levin",
    role: "Product Manager",
    department: "Engineering",
    amount: "$8,450.00",
    base: "$7,200.00",
    bonus: "$1,250.00",
    tax: "$1,840.00",
    deductions: "$420.00",
    net: "$6,190.00",
    method: "Bank Transfer",
    account: "Standard Chartered · **** 4291",
    date: "Dec 27, 2023",
    status: "paid",
  };

  const statusVariant = 
    data.status === "paid" ? "success" : 
    data.status === "processing" ? "warning" : 
    "destructive";

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden">
      <DashboardHeader 
        category="Financials" 
        title="Payment Record"
        description={`Transaction reference ${data.id}`}
      >
        <Link href="/dashboard/payroll">
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-4 rounded-lg text-[12px] font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={14} strokeWidth={2} />
            Back
          </Button>
        </Link>
        <Button
          size="sm"
          className="h-9 px-4 rounded-lg text-[12px] font-bold shadow-sm gap-2 capitalize"
        >
          <HugeiconsIcon icon={Download01Icon} size={14} strokeWidth={2} />
          Receipt
        </Button>
      </DashboardHeader>

      <div className="flex flex-col xl:flex-row gap-6 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        {/* Left Side: Summary & Breakdown */}
        <div className="flex-1 space-y-6">
          {/* Identity Header Card */}
          <section>
            <Frame className="border-none bg-transparent p-0">
              <FramePanel className="p-6 bg-card">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <UserAvatar 
                    name={data.employee} 
                    size="lg" 
                    className="w-28 h-28 rounded-2xl shadow-sm border border-border/10" 
                  />
                  <div className="flex-1 text-center md:text-left pt-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-1">
                        <h2 className="text-3xl font-semibold tracking-tight text-foreground/90">
                          {data.employee}
                        </h2>
                        <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                          <Badge variant={statusVariant} showDot className="h-6 px-2.5 rounded-md font-bold text-[9px]">
                            {data.status}
                          </Badge>
                          <span className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest flex items-center gap-1.5 border-l border-border/5 pl-3">
                            <HugeiconsIcon icon={Note01Icon} size={12} strokeWidth={2.5} />
                            {data.role}
                          </span>
                        </div>
                      </div>
                      <div className="text-center md:text-right bg-muted/5 p-4 rounded-2xl border border-border/5 min-w-[160px]">
                        <p className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest mb-1">Net Disbursement</p>
                        <p className="text-2xl font-semibold text-primary tabular-nums tracking-tight">{data.net}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FramePanel>
            </Frame>
          </section>

          {/* Detailed Financial Breakdown */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earnings */}
            <Frame className="h-full">
              <FramePanel className="p-0 overflow-hidden bg-card h-full flex flex-col">
                <FrameHeader className="border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center text-success">
                      <HugeiconsIcon icon={Coins01Icon} size={16} />
                    </div>
                    <FrameTitle>Gross Earnings</FrameTitle>
                  </div>
                </FrameHeader>
                <FrameContent className="flex-1 space-y-5 py-2">
                  <LineItem label="Basic Salary" value={data.base} />
                  <LineItem label="Performance Bonus" value={data.bonus} />
                  <LineItem label="Allowances" value="$0.00" />
                </FrameContent>
                <FrameFooter className="bg-success/[0.02] border-success/5">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold text-success capitalize">Total Gross</span>
                    <span className="text-[14px] font-bold text-success tabular-nums">{data.amount}</span>
                  </div>
                </FrameFooter>
              </FramePanel>
            </Frame>

            {/* Deductions */}
            <Frame className="h-full">
              <FramePanel className="p-0 overflow-hidden bg-card h-full flex flex-col">
                <FrameHeader className="border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive">
                      <HugeiconsIcon icon={Shield01Icon} size={16} />
                    </div>
                    <FrameTitle>Deductions</FrameTitle>
                  </div>
                </FrameHeader>
                <FrameContent className="flex-1 space-y-5 py-2">
                  <LineItem label="Statutory Income Tax" value={data.tax} negative />
                  <LineItem label="Health Insurance" value={data.deductions} negative />
                  <LineItem label="Pension Contribution" value="$0.00" negative />
                </FrameContent>
                <FrameFooter className="bg-destructive/[0.02] border-destructive/5">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold text-destructive capitalize">Total Deductions</span>
                    <span className="text-[14px] font-bold text-destructive tabular-nums">-$2,260.00</span>
                  </div>
                </FrameFooter>
              </FramePanel>
            </Frame>
          </section>
        </div>

        {/* Right Side: Transaction & Lifecycle */}
        <div className="w-full xl:w-[380px] space-y-6">
          <Frame>
            <FramePanel className="p-0 overflow-hidden bg-card">
              <FrameHeader>
                <FrameTitle>Settlement Info</FrameTitle>
              </FrameHeader>
              <FrameContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-xl bg-muted/10 flex items-center justify-center text-muted-foreground/60 shrink-0">
                    <HugeiconsIcon icon={CreditCardIcon} size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest mb-1">Payment Method</p>
                    <p className="text-[13px] font-semibold text-foreground/80">{data.method}</p>
                    <p className="text-[11px] font-medium text-muted-foreground/60 mt-0.5">{data.account}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-xl bg-muted/10 flex items-center justify-center text-muted-foreground/60 shrink-0">
                    <HugeiconsIcon icon={Calendar01Icon} size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest mb-1">Executed On</p>
                    <p className="text-[13px] font-semibold text-foreground/80">{data.date}</p>
                  </div>
                </div>
              </FrameContent>
            </FramePanel>
          </Frame>

          <Frame>
            <FramePanel className="p-0 overflow-hidden bg-card">
              <FrameHeader>
                <FrameTitle>Timeline</FrameTitle>
              </FrameHeader>
              <FrameContent className="p-6">
                <div className="space-y-0">
                  <TimelineStep title="Payment Completed" date="Dec 27, 2023 · 10:45 AM" active completed />
                  <TimelineStep title="Approved by Finance" date="Dec 26, 2023 · 04:12 PM" active completed />
                  <TimelineStep title="Draft Generated" date="Dec 25, 2023 · 09:00 AM" active completed last />
                </div>
              </FrameContent>
              <FrameFooter className="bg-muted/5 border-t border-border/5">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={Agreement01Icon} size={14} className="text-muted-foreground/40" />
                  <span className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest">Audited by System</span>
                </div>
              </FrameFooter>
            </FramePanel>
          </Frame>
        </div>
      </div>
    </main>
  );
}

function LineItem({ label, value, negative }: { label: string; value: string; negative?: boolean }) {
  return (
    <div className="flex items-center justify-between px-1">
      <span className="text-[12px] font-medium text-foreground/60">{label}</span>
      <span className={cn(
        "text-[12px] font-semibold tabular-nums",
        negative ? "text-destructive/80" : "text-foreground/80"
      )}>
        {negative && "- "}{value}
      </span>
    </div>
  );
}

function TimelineStep({ title, date, active, completed, last }: { title: string; date: string; active?: boolean; completed?: boolean; last?: boolean }) {
  return (
    <div className="relative pl-8 pb-8 group/log">
      {!last && <div className="absolute left-[11px] top-4 bottom-0 w-px bg-border/10" />}
      <div className={cn(
        "absolute left-0 top-1 size-[22px] rounded-full border flex items-center justify-center z-10 transition-colors shadow-xs",
        completed ? "bg-success border-success text-success-foreground" : "bg-muted/20 border-border/10 text-muted-foreground/30"
      )}>
        {completed ? <HugeiconsIcon icon={Tick01Icon} size={10} strokeWidth={3} /> : <div className="size-1.5 rounded-full bg-current" />}
      </div>
      <div className="space-y-1 pt-0.5">
        <p className={cn(
          "text-[12px] font-semibold leading-none",
          active ? "text-foreground/80" : "text-muted-foreground/40"
        )}>
          {title}
        </p>
        <p className="text-[10px] font-medium text-muted-foreground/40 mt-1">
          {date}
        </p>
      </div>
    </div>
  );
}
