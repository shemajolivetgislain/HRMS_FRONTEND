import { createFileRoute } from "@tanstack/react-router";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameContent,
} from "@/components/ui/frame";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Line,
  Area,
  AreaChart,
  YAxis,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Download01Icon,
  Calendar01Icon,
  UserMultiple02Icon,
  Sorting05Icon,
  AiChatIcon,
  ActivityIcon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { cn } from "@/lib/utils";
import { ErrorComponent } from "@/components/error-component";

const growthData = [
  { month: "Jan", headcount: 120, target: 110, attrition: 2 },
  { month: "Feb", headcount: 125, target: 115, attrition: 1 },
  { month: "Mar", headcount: 132, target: 125, attrition: 4 },
  { month: "Apr", headcount: 138, target: 130, attrition: 2 },
  { month: "May", headcount: 143, target: 140, attrition: 3 },
  { month: "Jun", headcount: 155, target: 150, attrition: 1 },
];

const deptData = [
  { dept: "Engineering", happiness: 88, productivity: 92, benchmark: 85 },
  { dept: "Design", happiness: 92, productivity: 85, benchmark: 85 },
  { dept: "Marketing", happiness: 84, productivity: 88, benchmark: 85 },
  { dept: "Sales", happiness: 78, productivity: 94, benchmark: 85 },
  { dept: "HR", happiness: 95, productivity: 90, benchmark: 85 },
];

const chartConfig = {
  headcount: { label: "Total Headcount", color: "var(--primary)" },
  target: { label: "Hiring Target", color: "var(--chart-2)" },
  happiness: { label: "Engagement", color: "var(--chart-1)" },
  productivity: { label: "Efficiency", color: "var(--chart-3)" },
} satisfies ChartConfig;

export const Route = createFileRoute("/dashboard/analytics")({
  errorComponent: ErrorComponent,
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden">
      <DashboardHeader
        category="Insights"
        title="Organization Health"
        description="Data-driven overview of workforce performance and morale"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <HugeiconsIcon icon={Calendar01Icon} />
            H1 2024
          </Button>
          <Button>
            <HugeiconsIcon icon={Download01Icon} />
            Export Data
          </Button>
        </div>
      </DashboardHeader>

      <div className="flex flex-col gap-6 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        {/* Top Intelligence Row */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* AI Insights Card */}
          <Frame className="xl:col-span-1">
            <FramePanel className="p-0 overflow-hidden h-full bg-primary/[0.02] border-primary/10">
              <FrameHeader className="border-b-0">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <HugeiconsIcon icon={AiChatIcon} size={14} />
                  </div>
                  <FrameTitle className="text-primary/80">
                    AI Analysis
                  </FrameTitle>
                </div>
              </FrameHeader>
              <FrameContent className="pt-0">
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-background border border-primary/5 shadow-sm">
                    <p className="text-sm font-medium text-foreground/80 leading-relaxed italic">
                      “Headcount is trending 4% above target. Retention in
                      Engineering has reached an all-time high of 98% this
                      quarter.”
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="success"
                      className="h-5 rounded-md text-xs font-bold"
                    >
                      LATEST UPDATE
                    </Badge>
                    <span className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest">
                      2 hours ago
                    </span>
                  </div>
                </div>
              </FrameContent>
            </FramePanel>
          </Frame>

          {/* Quick Metrics Grid */}
          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <AnalyticsStatCard
              label="Engagement Score"
              value="8.4"
              change="+0.2"
              up={true}
              sub="Vs industry avg (7.8)"
              icon={ActivityIcon}
            />
            <AnalyticsStatCard
              label="Net Hiring"
              value="+35"
              change="+12%"
              up={true}
              sub="Net growth this year"
              icon={UserMultiple02Icon}
            />
            <AnalyticsStatCard
              label="Turnover"
              value="2.1%"
              change="-0.4%"
              up={false}
              sub="15% below target"
              icon={Sorting05Icon}
            />
          </div>
        </section>

        {/* Growth Trends */}
        <section>
          <Frame>
            <FramePanel className="p-0 overflow-hidden bg-card">
              <FrameHeader>
                <div>
                  <FrameTitle>Workforce Trajectory</FrameTitle>
                  <FrameDescription>
                    Comparative analysis of actual growth vs quarterly targets
                  </FrameDescription>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                    <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">
                      Actual Growth
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-chart-2 opacity-50" />
                    <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">
                      Target Baseline
                    </span>
                  </div>
                </div>
              </FrameHeader>
              <FrameContent className="h-[380px] py-8">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <AreaChart
                    data={growthData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="fillPrimary"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--primary)"
                          stopOpacity={0.08}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--primary)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                      strokeOpacity={0.05}
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 10,
                        fill: "hsl(var(--muted-foreground))",
                        fontWeight: 600,
                        opacity: 0.4,
                      }}
                      tickMargin={12}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 10,
                        fill: "hsl(var(--muted-foreground))",
                        fontWeight: 600,
                        opacity: 0.4,
                      }}
                    />
                    <ChartTooltip
                      cursor={{
                        stroke: "var(--primary)",
                        strokeWidth: 1,
                        strokeDasharray: "4 4",
                      }}
                      content={
                        <ChartTooltipContent className="rounded-xl border-border/10 shadow-xl" />
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="headcount"
                      stroke="var(--primary)"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#fillPrimary)"
                      animationDuration={1500}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="var(--chart-2)"
                      strokeWidth={1.5}
                      strokeDasharray="6 6"
                      dot={false}
                      opacity={0.5}
                    />
                  </AreaChart>
                </ChartContainer>
              </FrameContent>
            </FramePanel>
          </Frame>
        </section>

        {/* Benchmarking Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Frame>
            <FramePanel className="p-0 overflow-hidden bg-card">
              <FrameHeader>
                <div>
                  <FrameTitle>Departmental Morale</FrameTitle>
                  <FrameDescription>
                    Benchmarked engagement scores by team
                  </FrameDescription>
                </div>
              </FrameHeader>
              <FrameContent className="h-[320px] py-6">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <BarChart
                    data={deptData}
                    layout="vertical"
                    margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
                    barCategoryGap="25%"
                  >
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis
                      dataKey="dept"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 11,
                        fontWeight: 600,
                        fill: "hsl(var(--foreground))",
                        opacity: 0.6,
                      }}
                      width={100}
                    />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="happiness" radius={[0, 6, 6, 0]}>
                      {deptData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.happiness >= 90
                              ? "var(--primary)"
                              : "var(--chart-1)"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </FrameContent>
            </FramePanel>
          </Frame>

          <Frame>
            <FramePanel className="p-0 overflow-hidden bg-card">
              <FrameHeader>
                <div>
                  <FrameTitle>Output Efficiency</FrameTitle>
                  <FrameDescription>
                    Productivity ratings relative to team capacity
                  </FrameDescription>
                </div>
              </FrameHeader>
              <FrameContent className="h-[320px] py-6">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <BarChart
                    data={deptData}
                    layout="vertical"
                    margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
                    barCategoryGap="25%"
                  >
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis
                      dataKey="dept"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 11,
                        fontWeight: 600,
                        fill: "hsl(var(--foreground))",
                        opacity: 0.6,
                      }}
                      width={100}
                    />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Bar
                      dataKey="productivity"
                      fill="var(--chart-3)"
                      radius={[0, 6, 6, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </FrameContent>
            </FramePanel>
          </Frame>
        </section>
      </div>
    </main>
  );
}

function AnalyticsStatCard({
  label,
  value,
  change,
  up,
  sub,
  icon: Icon,
}: {
  label: string;
  value: string;
  change: string;
  up: boolean;
  sub: string;
  icon: any;
}) {
  return (
    <Frame className="h-full group/stat">
      <FramePanel className="p-5 flex flex-col justify-between h-full bg-card">
        <div className="flex items-center justify-between">
          <div className="h-8 w-8 rounded-lg bg-muted/5 border border-border/5 flex items-center justify-center text-muted-foreground/30 group-hover/stat:text-primary transition-colors">
            <HugeiconsIcon icon={Icon} size={16} />
          </div>
          <Badge
            variant="muted"
            className={cn(
              "border-none px-1.5 py-0.5 rounded-md font-bold",
              up
                ? "text-success bg-success/10"
                : "text-destructive bg-destructive/10",
            )}
          >
            <span className="text-xs">
              {up ? "↑" : "↓"} {change}
            </span>
          </Badge>
        </div>
        <div className="mt-6">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground/90 tabular-nums leading-none">
            {value}
          </h3>
          <p className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest mt-2">
            {label}
          </p>
          <p className="text-xs font-medium text-muted-foreground/30 mt-1 flex items-center gap-1">
            <HugeiconsIcon
              icon={InformationCircleIcon}
              size={10}
              strokeWidth={2.5}
            />
            {sub}
          </p>
        </div>
      </FramePanel>
    </Frame>
  );
}
