"use client"

import * as React from "react"
import { Label, Pie, PieChart, Cell } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { 
  Frame, 
  FramePanel, 
  FrameHeader, 
  FrameTitle, 
  FrameDescription,
  FrameContent,
  FrameFooter
} from "@/components/ui/frame"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

const chartData = [
  { type: "Full-time", code: "FT", employees: 275, fill: "var(--color-ft)" },
  { type: "Part-time", code: "PT", employees: 200, fill: "var(--color-pt)" },
  { type: "Contract", code: "CT", employees: 187, fill: "var(--color-ct)" },
  { type: "Intern", code: "IT", employees: 173, fill: "var(--color-it)" },
]

const chartConfig = {
  employees: {
    label: "Employees",
  },
  ft: {
    label: "Full-time",
    color: "var(--chart-1)",
  },
  pt: {
    label: "Part-time",
    color: "var(--chart-2)",
  },
  ct: {
    label: "Contract",
    color: "var(--chart-3)",
  },
  it: {
    label: "Intern",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

export function EmployeeDistribution() {
  const [selected, setSelected] = React.useState<string>("FT")

  const totalEmployees = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.employees, 0)
  }, [])

  return (
    <Frame className="h-full group/frame">
      <FramePanel className="flex flex-col h-full overflow-hidden">
        <FrameHeader className="flex-col items-start gap-4">
          <div className="space-y-1">
            <FrameTitle>Workforce Diversity</FrameTitle>
            <FrameDescription>Employee breakdown by type</FrameDescription>
          </div>
          
          <ToggleGroup
            value={selected ? [selected] : []}
            onValueChange={(val) => {
              if (val.length > 0) setSelected(val[0])
            }}
            variant="outline"
            className="h-8 shadow-none w-full bg-muted/20 border-border/5 p-0.5"
          >
            {chartData.map((d) => (
              <ToggleGroupItem key={d.code} value={d.code} className="flex-1 text-[10px] h-7 px-2 font-semibold capitalize tracking-tight data-[state=on]:bg-background data-[state=on]:shadow-xs">
                {d.code}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </FrameHeader>

        <FrameContent className="flex-1 flex flex-col items-center justify-center py-8">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[220px] w-full"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="employees"
                nameKey="type"
                innerRadius={65}
                strokeWidth={4}
                paddingAngle={2}
                className="outline-none"
                style={{ cursor: "pointer" }}
                onClick={(data) => {
                  if (data && data.code) {
                    setSelected(data.code);
                  }
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.fill}
                    stroke={entry.fill}
                    className="outline-none transition-all duration-300"
                    // Professional scale: very slight
                    outerRadius={entry.code === selected ? 92 : 82}
                  />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      const selectedData = chartData.find(d => d.code === selected)
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-light tracking-tight tabular-nums"
                          >
                            {(selectedData?.employees || totalEmployees).toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground/40 text-[9px] capitalize tracking-widest font-semibold"
                          >
                            {selectedData ? selectedData.type : "Total"}
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </FrameContent>
        
        <FrameFooter className="grid grid-cols-2 gap-x-6 gap-y-2">
          {chartData.map((item) => (
            <div key={item.code} className="flex items-center gap-2.5 min-w-0 group/item cursor-pointer" onClick={() => setSelected(item.code)}>
              <div 
                className={cn(
                  "h-1.5 w-1.5 rounded-full shrink-0 transition-all duration-300",
                  selected === item.code ? "opacity-100 scale-125" : "opacity-20"
                )} 
                style={{ backgroundColor: item.fill }}
              />
              <span className={cn(
                "text-[10px] font-semibold capitalize tracking-tight truncate transition-colors duration-300",
                selected === item.code ? "text-foreground/80" : "text-muted-foreground/30"
              )}>
                {item.type} <span className="ml-1 opacity-40 tabular-nums">{item.employees}</span>
              </span>
            </div>
          ))}
        </FrameFooter>
      </FramePanel>
    </Frame>
  )
}
