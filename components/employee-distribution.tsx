"use client"

import * as React from "react"
import { Label, Pie, PieChart, Cell } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Frame, FramePanel } from "@/components/ui/frame"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

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
    <Frame className="h-full">
      <FramePanel className="flex flex-col h-full p-0 overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/10">
          <div>
            <h3 className="text-sm font-semibold text-foreground/90">
              Employee Distribution
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Workforce breakdown by type
            </p>
          </div>
          
          <ToggleGroup
            value={selected ? [selected] : []}
            onValueChange={(val) => {
              if (val.length > 0) setSelected(val[0])
            }}
            variant="outline"
            className="h-8 shadow-none"
          >
            {chartData.map((d) => (
              <ToggleGroupItem key={d.code} value={d.code} className="text-[10px] h-7 px-2 font-medium">
                {d.code}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-5 lg:p-6">
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
                innerRadius={60}
                strokeWidth={5}
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
                    // Scale outer radius based on selection
                    outerRadius={entry.code === selected ? 94 : 80}
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
                            className="fill-foreground text-3xl font-bold tabular-nums"
                          >
                            {(selectedData?.employees || totalEmployees).toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-[10px] uppercase tracking-widest font-semibold"
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
        </div>
        
        {/* footer/legend */}
        <div className="px-5 py-3 border-t border-border/10 bg-muted/5 grid grid-cols-2 gap-x-4 gap-y-1.5">
          {chartData.map((item) => (
            <div key={item.code} className="flex items-center gap-2 min-w-0">
              <div 
                className="h-1.5 w-1.5 rounded-full shrink-0" 
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-[10px] text-muted-foreground font-medium truncate">
                {item.type}: <span className="text-foreground/70">{item.employees}</span>
              </span>
            </div>
          ))}
        </div>
      </FramePanel>
    </Frame>
  )
}
