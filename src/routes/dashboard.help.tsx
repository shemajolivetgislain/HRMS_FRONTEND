import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameContent,
  FrameFooter,
} from "@/components/ui/frame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Book02Icon,
  Message01Icon,
  ArrowRight01Icon,
  ActivityIcon,
  CodeIcon,
  CallIcon,
  UserGroupIcon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";


const faqs = [
  {
    q: "How do I reset an employee's credentials?",
    a: "Go to the employee's profile and select 'Reset Credentials' from the actions menu.",
  },
  {
    q: "Can I export payroll data to CSV?",
    a: "Yes, use the 'Export' button on the payroll history table to download a CSV file.",
  },
  {
    q: "How do I add a new admin user?",
    a: "Navigate to Settings > Admin Team and click 'Invite Admin'.",
  },
];

export const Route = createFileRoute("/dashboard/help")({
  component: HelpPage,
});

function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden">
      <DashboardHeader
        category="Support"
        title="Help Center"
        description="Access documentation, system status, and technical support"
      >
        <Button
          size="lg"
          className="font-bold shadow-sm capitalize gap-2"
        >
          <HugeiconsIcon icon={Message01Icon} size={14} strokeWidth={2} />
          Live Chat
        </Button>
      </DashboardHeader>

      <div className="flex flex-col gap-6 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        <section>
          <Frame>
            <FramePanel className="p-10 bg-primary/[0.01] border border-primary/5">
              <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground/90">
                    How can we help you today?
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground/50">
                    Search our comprehensive guides, API docs, and community
                    forums.
                  </p>
                </div>
                <div className="relative w-full max-w-lg">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground/30"
                    strokeWidth={2}
                  />
                  <Input
                    placeholder="Search for guides, workflows, or technical docs…"                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 rounded-xl border-border/40 bg-background shadow-sm focus:ring-4 focus:ring-primary/5 transition-all text-sm"
                  />
                </div>
              </div>
            </FramePanel>
          </Frame>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SupportCard
            icon={Book02Icon}
            title="Documentation"
            description="Deep dive into every feature and setting."
            label="Browse Library"
            variant="primary"
          />
          <SupportCard
            icon={CallIcon}
            title="Technical Support"
            description="24/7 priority assistance for your team."
            label="Open Ticket"
            variant="info"
          />
          <SupportCard
            icon={UserGroupIcon}
            title="Community"
            description="Connect with other HR professionals."
            label="Join Forum"
            variant="accent"
          />
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-4">
            <Frame>
              <FramePanel className="p-0 overflow-hidden bg-card">
                <FrameHeader>
                  <FrameTitle>Frequently Asked Questions</FrameTitle>
                </FrameHeader>
                <FrameContent className="p-0">
                  <div className="divide-y divide-border/5">
                    {faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="p-6 hover:bg-muted/5 transition-all group cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className="size-6 rounded-lg bg-muted/5 border border-border/5 flex items-center justify-center text-muted-foreground/30 mt-0.5 shrink-0">
                            <HugeiconsIcon
                              icon={InformationCircleIcon}
                              size={14}
                            />
                          </div>
                          <div className="space-y-2 flex-1">
                            <p className="text-[14px] font-semibold text-foreground/90 group-hover:text-primary transition-colors">
                              {faq.q}
                            </p>
                            <p className="text-xs font-medium text-muted-foreground/60 leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                          <HugeiconsIcon
                            icon={ArrowRight01Icon}
                            size={16}
                            className="text-muted-foreground/20 mt-1"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </FrameContent>
                <FrameFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-bold text-primary hover:bg-primary/5 capitalize"
                  >
                    View all articles
                  </Button>
                </FrameFooter>
              </FramePanel>
            </Frame>
          </div>

          <div className="space-y-4">
            <Frame>
              <FramePanel className="p-0 overflow-hidden bg-card">
                <FrameHeader>
                  <FrameTitle>System Status</FrameTitle>
                  <Badge
                    variant="success"
                    showDot
                    className="h-5 px-2 rounded-md font-bold text-xs uppercase tracking-widest border-none"
                  >
                    Operational
                  </Badge>
                </FrameHeader>
                <FrameContent className="space-y-6">
                  <StatusItem label="Application API" status="99.98% uptime" />
                  <StatusItem label="Database Engine" status="Healthy" />
                  <StatusItem label="Identity Service" status="Stable" />
                </FrameContent>
                <FrameFooter className="bg-muted/5 border-t border-border/5">
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={ActivityIcon}
                      size={14}
                      className="text-muted-foreground/40"
                    />
                    <span className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest">
                      Global Status Page
                    </span>
                  </div>
                </FrameFooter>
              </FramePanel>
            </Frame>

            <Frame>
              <FramePanel className="p-6 bg-primary/[0.02] border border-primary/10 flex flex-col items-center text-center space-y-4">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm shadow-primary/5">
                  <HugeiconsIcon icon={CodeIcon} size={20} />
                </div>
                <div className="space-y-1">
                  <p className="text-[14px] font-semibold text-foreground/90">
                    API Documentation
                  </p>
                  <p className="text-xs font-medium text-muted-foreground/50">
                    Build custom workflows with our GraphQL endpoint.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-primary/20 text-primary font-bold text-xs uppercase tracking-widest bg-transparent"
                >
                  View Reference
                </Button>
              </FramePanel>
            </Frame>
          </div>
        </div>
      </div>
    </main>
  );
}

function SupportCard({
  icon: Icon,
  title,
  description,
  label,
  variant,
}: {
  icon: any;
  title: string;
  description: string;
  label: string;
  variant: "primary" | "info" | "accent";
}) {
  return (
    <Frame className="group/card h-full">
      <FramePanel className="p-6 flex flex-col gap-5 bg-card">
        <div
          className={cn(
            "size-10 rounded-xl flex items-center justify-center border transition-all duration-300",
            variant === "primary" &&
              "bg-primary/5 border-primary/10 text-primary",
            variant === "info" && "bg-info/5 border-info/10 text-info",
            variant === "accent" && "bg-accent/5 border-accent/10 text-accent",
          )}
        >
          <HugeiconsIcon icon={Icon} size={20} strokeWidth={2} />
        </div>
        <div className="space-y-1.5 flex-1">
          <h4 className="text-[15px] font-semibold text-foreground/90 tracking-tight">
            {title}
          </h4>
          <p className="text-xs font-medium text-muted-foreground/50 leading-relaxed">
            {description}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="font-bold text-xs uppercase tracking-widest w-full hover:bg-muted/50"
        >
          {label}
        </Button>
      </FramePanel>
    </Frame>
  );
}

function StatusItem({ label, status }: { label: string; status: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-foreground/60">
        {label}
      </span>
      <span className="text-xs font-bold text-success capitalize">
        {status}
      </span>
    </div>
  );
}
