"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { HugeiconsIcon } from "@hugeicons/react";
import { FilterIcon } from "@hugeicons/core-free-icons";

export function FilterPopover() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-4 rounded-lg text-[12px] font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
          >
            <HugeiconsIcon icon={FilterIcon} size={14} strokeWidth={2} />
            Filter
          </Button>
        }
      />
      <PopoverContent
        align="end"
        className="w-[320px] p-0 overflow-hidden rounded-xl border-border/40 shadow-xl"
      >
        <PopoverHeader className="px-5 py-4 border-b border-border/5 bg-muted/5">
          <PopoverTitle className="text-sm font-semibold tracking-tight">
            Dashboard Filters
          </PopoverTitle>
          <PopoverDescription className="text-[11px] font-medium opacity-50">
            Refine the data displayed across your dashboard
          </PopoverDescription>
        </PopoverHeader>

        <div className="p-5 space-y-6">
          {/* Time Range */}
          <div className="space-y-2.5">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
              Time Range
            </Label>
            <Select defaultValue="this-month">
              <SelectTrigger className="w-full h-9 rounded-lg border-border/40 bg-muted/5">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-quarter">Last Quarter</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Department */}
          <div className="space-y-2.5">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
              Department
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {["Engineering", "Design", "Marketing", "Sales"].map((dept) => (
                <div
                  key={dept}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <Checkbox
                    id={dept}
                    className="size-3.5 rounded-sm border-border/60 data-[state=checked]:bg-primary"
                  />
                  <label
                    htmlFor={dept}
                    className="text-[12px] font-medium text-foreground/70 cursor-pointer group-hover:text-foreground transition-colors"
                  >
                    {dept}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2.5">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
              Employee Status
            </Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-full h-9 rounded-lg border-border/40 bg-muted/5">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Onboarding</SelectItem>
                <SelectItem value="inactive">Offboarded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="px-5 py-3.5 border-t border-border/5 bg-muted/5 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="font-bold text-muted-foreground/60 hover:text-foreground"
          >
            Reset
          </Button>
          <Button
            size="sm"
            className="font-bold shadow-sm"
          >
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
