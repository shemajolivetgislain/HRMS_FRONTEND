"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import { Frame, FramePanel } from "@/components/ui/frame";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "An interactive area chart";

const startDate = new Date("2024-01-01");
let baseDesktop = 40;
let baseMobile = 150;

const chartData = Array.from({ length: 180 }).map((_, i) => {
  const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
  baseDesktop += Math.random() * 2 + 0.8;
  baseMobile += Math.random() * 8 + 3.5;
  return {
    date: date.toISOString().split("T")[0],
    desktop: Math.floor(baseDesktop),
    mobile: Math.floor(baseMobile),
  };
});

const chartConfig = {
  visitors: {
    label: "Onboarded Users",
  },
  desktop: {
    label: "Verified Companies",
    color: "var(--primary)",
  },
  mobile: {
    label: "Active Accounts",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export const ChartAreaInteractive = React.memo(function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("180d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("30d");
    }
  }, [isMobile]);

  const filteredData = React.useMemo(() => {
    return chartData.filter((item) => {
      const date = new Date(item.date);
      const referenceDate = new Date("2024-06-28");
      let daysToSubtract = 180;
      if (timeRange === "90d") {
        daysToSubtract = 90;
      } else if (timeRange === "30d") {
        daysToSubtract = 30;
      }
      const start = new Date(referenceDate);
      start.setDate(start.getDate() - daysToSubtract);
      return date >= start;
    });
  }, [timeRange]);

  return (
    <Frame className="h-full w-full relative">
      <FramePanel className="flex flex-col h-full p-5 lg:p-6 pb-2! overflow-hidden bg-card">
        {/* Decorative Grid Background Texture (subtle noise/mesh element) */}
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,transparent_0%,--theme(--color-background)_100%),repeating-linear-gradient(45deg,transparent,transparent_10px,--theme(--color-border)_10px,--theme(--color-border)_11px)] opacity-[0.03] pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center relative z-10 w-full mb-6">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">
              Platform Activity
            </h3>
            <div className="text-2xl font-light tracking-tight text-foreground">
              Growth vs Adoption
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <ToggleGroup
              multiple={false}
              value={timeRange ? [timeRange] : []}
              onValueChange={(value) => {
                setTimeRange(value[0] ?? "180d");
              }}
              variant="outline"
              className="hidden lg:flex"
            >
              <ToggleGroupItem value="180d" className="text-xs">
                6M
              </ToggleGroupItem>
              <ToggleGroupItem value="90d" className="text-xs">
                3M
              </ToggleGroupItem>
              <ToggleGroupItem value="30d" className="text-xs">
                30D
              </ToggleGroupItem>
            </ToggleGroup>
            <Select
              value={timeRange}
              onValueChange={(value) => {
                if (value !== null) {
                  setTimeRange(value);
                }
              }}
            >
              <SelectTrigger
                className="flex w-32 border-none bg-muted/50 text-xs lg:hidden"
                size="sm"
                aria-label="Select time range"
              >
                <SelectValue placeholder="Last 6 months" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="180d" className="rounded-lg text-xs">
                  Last 6 months
                </SelectItem>
                <SelectItem value="90d" className="rounded-lg text-xs">
                  Last 3 months
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg text-xs">
                  Last 30 days
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 w-full relative z-10 mt-auto min-h-[200px]">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-full w-full absolute inset-0 -ml-2"
          >
            <AreaChart
              data={filteredData}
              margin={{ top: 10, left: 0, right: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={1.0}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="mobile"
                type="natural"
                fill="url(#fillMobile)"
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="url(#fillDesktop)"
                stroke="var(--color-desktop)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </FramePanel>
    </Frame>
  );
});
