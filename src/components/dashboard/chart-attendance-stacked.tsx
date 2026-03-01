"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import {
  ChartContainer,
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
  FrameContent,
} from "@/components/ui/frame";

const chartData = [
  { month: "Jan", onTime: 400, late: 80, absent: 20 },
  { month: "Feb", onTime: 420, late: 60, absent: 30 },
  { month: "Mar", onTime: 380, late: 120, absent: 40 },
  { month: "Apr", onTime: 450, late: 50, absent: 10 },
  { month: "May", onTime: 480, late: 40, absent: 15 },
  { month: "Jun", onTime: 430, late: 70, absent: 25 },
  { month: "Jul", onTime: 430, late: 70, absent: 25 },
  { month: "Aug", onTime: 410, late: 90, absent: 20 },
  { month: "Sep", onTime: 430, late: 70, absent: 25 },
  { month: "Oct", onTime: 430, late: 70, absent: 25 },
  { month: "Nov", onTime: 430, late: 70, absent: 25 },
  { month: "Dec", onTime: 430, late: 70, absent: 25 },
];

const chartConfig = {
  onTime: { label: "On time", color: "var(--chart-1)" },
  late: { label: "Late", color: "var(--chart-2)" },
  absent: { label: "Absent", color: "var(--chart-3)" },
} satisfies ChartConfig;

export const ChartAttendanceStacked = React.memo(function ChartAttendanceStacked() {
  return (
    <Frame className="h-full group/frame">
      <FramePanel className="flex flex-col h-full overflow-hidden">
        <FrameHeader>
          <div>
            <FrameTitle>Attendance Rate</FrameTitle>
            <FrameDescription>Monthly breakdown for 2024</FrameDescription>
          </div>
          <div className="flex gap-4">
            {Object.entries(chartConfig).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: cfg.color }}
                />
                <span className="text-xs text-muted-foreground/40 font-bold capitalize tracking-widest">
                  {cfg.label}
                </span>
              </div>
            ))}
          </div>
        </FrameHeader>

        <FrameContent className="flex-1 pb-2">
          <ChartContainer config={chartConfig} className="h-full w-full min-h-[240px]">
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 0, left: -24, bottom: 0 }}
              // Fat bars: reduced category gap
              barCategoryGap="20%"
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                strokeOpacity={0.2}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", fontWeight: 600, opacity: 0.5 }}
                tickMargin={10}
              />
              <ChartTooltip
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.2 }}
                content={
                  <ChartTooltipContent
                    hideLabel
                    className="rounded-lg shadow-sm border-border/10"
                  />
                }
              />
              <Bar
                dataKey="onTime"
                stackId="a"
                fill="var(--color-onTime)"
                radius={[0, 0, 4, 4]}
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
        </FrameContent>
      </FramePanel>
    </Frame>
  );
});
