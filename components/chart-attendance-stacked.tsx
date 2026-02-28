"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
} from "@/components/ui/frame";

const chartData = [
  { month: "Jan", onTime: 400, late: 80, absent: 20 },
  { month: "Feb", onTime: 420, late: 60, absent: 30 },
  { month: "Mar", onTime: 380, late: 120, absent: 40 },
  { month: "Apr", onTime: 450, late: 50, absent: 10 },
  { month: "May", onTime: 480, late: 40, absent: 15 },
  { month: "Jun", onTime: 430, late: 70, absent: 25 },
  { month: "July", onTime: 430, late: 70, absent: 25 },
  { month: "September", onTime: 430, late: 70, absent: 25 },
  { month: "October", onTime: 430, late: 70, absent: 25 },
  { month: "November", onTime: 430, late: 70, absent: 25 },
  { month: "December", onTime: 430, late: 70, absent: 25 },
];

const chartConfig = {
  onTime: { label: "On time", color: "var(--chart-1)" },
  late: { label: "Late", color: "var(--chart-2)" },
  absent: { label: "Absent", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function ChartAttendanceStacked() {
  return (
    <Frame className="h-full">
      <FramePanel className="flex flex-col h-full p-0 overflow-hidden">
        <FrameHeader className="px-5 py-4 border-b border-border/10 flex-row flex items-center justify-between">
          <div>
            <FrameTitle className="text-sm font-semibold text-foreground/90">
              Attendance Rate
            </FrameTitle>
            <FrameDescription className="text-[11px] mt-0.5">
              Jan – Dec 2024 · monthly breakdown
            </FrameDescription>
          </div>
          <div className="flex gap-3">
            {Object.entries(chartConfig).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ background: cfg.color }}
                />
                <span className="text-[10px] text-muted-foreground font-medium">
                  {cfg.label}
                </span>
              </div>
            ))}
          </div>
        </FrameHeader>

        <div className="flex-1 px-3 pb-3 pt-2 min-h-[240px]">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 0, left: -20, bottom: 0 }}
              barCategoryGap="30%"
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                strokeOpacity={0.4}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickMargin={6}
              />
              <ChartTooltip
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.4, radius: 4 }}
                content={
                  <ChartTooltipContent
                    hideLabel
                    className="rounded-xl shadow-lg"
                  />
                }
              />
              <Bar
                dataKey="onTime"
                stackId="a"
                fill="var(--color-onTime)"
                radius={[0, 0, 3, 3]}
              />
              <Bar
                dataKey="late"
                stackId="a"
                fill="var(--color-late)"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="absent"
                stackId="a"
                fill="var(--color-absent)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </FramePanel>
    </Frame>
  );
}
