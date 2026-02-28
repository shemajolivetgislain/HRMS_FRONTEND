import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameContent,
  FrameFooter,
} from "@/components/ui/frame";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Clock01Icon,
  UserGroupIcon,
  MoreHorizontalIcon,
  Calendar03Icon,
  FilterIcon,
  Tick01Icon,
  Location01Icon,
} from "@hugeicons/core-free-icons";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { cn } from "@/lib/utils";

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

// Meaningful color mapping based on event intent
const typeStyles: Record<string, { color: string; label: string }> = {
  Meeting: { color: "oklch(0.55 0.18 250)", label: "Meeting" }, // HR Blue
  Sync: { color: "oklch(0.65 0.12 180)", label: "Sync" }, // Teal
  Interview: { color: "oklch(0.6 0.15 150)", label: "Interview" }, // Emerald
  Break: { color: "oklch(0.55 0.02 250)", label: "Break" }, // Muted
  Workshop: { color: "oklch(0.7 0.15 65)", label: "Workshop" }, // Amber
  Task: { color: "oklch(0.6 0.22 35)", label: "Task" }, // Rose
};

const dayEvents = [
  {
    title: "Morning Standup",
    start: "09:00",
    end: "09:30",
    type: "Sync",
  },
  {
    title: "Product Sync: Q1 Roadmap",
    start: "11:00",
    end: "12:30",
    type: "Meeting",
  },
  {
    title: "Lunch Break",
    start: "13:00",
    end: "14:00",
    type: "Break",
  },
  {
    title: "HR Interview: Senior Lead",
    start: "15:00",
    end: "16:00",
    type: "Interview",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Quarterly Strategy Sync",
    time: "10:00 AM",
    type: "Meeting",
    location: "Conference Room A",
    attendees: ["Sarah Jenkins", "Michael Chen"],
  },
  {
    id: 2,
    title: "Design System Review",
    time: "1:30 PM",
    type: "Workshop",
    location: "Online",
    attendees: ["Emma Davis"],
  },
  {
    id: 3,
    title: "Payroll Approval Deadline",
    time: "4:00 PM",
    type: "Task",
    location: "Dashboard",
    attendees: [],
  },
];

export const Route = createFileRoute("/dashboard/calendar")({
  component: CalendarPage,
});

function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden">
      <DashboardHeader
        category="Schedule"
        title="Calendar"
        description="Coordinate events, meetings, and organizational deadlines"
      >
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-4 rounded-lg text-[12px] font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
        >
          <HugeiconsIcon icon={FilterIcon} size={14} strokeWidth={2} />
          View Filter
        </Button>
        <Button
          size="sm"
          className="h-9 px-4 rounded-lg text-[12px] font-bold shadow-sm gap-2 capitalize"
        >
          <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2} />
          New Event
        </Button>
      </DashboardHeader>

      <div className="flex flex-col xl:flex-row gap-4 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        {/* Main Scheduler Tool */}
        <section className="flex-1 min-w-0">
          <Frame className="group/frame h-full">
            <FramePanel className="p-0 overflow-hidden h-full flex flex-col bg-card">
              <FrameHeader>
                <div>
                  <FrameTitle>Event Scheduler</FrameTitle>
                  <FrameDescription>
                    Active View:{" "}
                    {date?.toLocaleDateString(undefined, {
                      month: "long",
                      year: "numeric",
                    })}
                  </FrameDescription>
                </div>
                <Tabs defaultValue="day" className="h-8">
                  <TabsList className="bg-muted/20 border-border/5 p-0.5 rounded-lg h-full">
                    <TabsTrigger
                      value="day"
                      className="rounded-md px-3 text-[10px] font-bold capitalize tracking-tight data-[state=active]:bg-background data-[state=active]:shadow-xs"
                    >
                      Day
                    </TabsTrigger>
                    <TabsTrigger
                      value="week"
                      className="rounded-md px-3 text-[10px] font-bold capitalize tracking-tight data-[state=active]:bg-background data-[state=active]:shadow-xs"
                    >
                      Week
                    </TabsTrigger>
                    <TabsTrigger
                      value="month"
                      className="rounded-md px-3 text-[10px] font-bold capitalize tracking-tight data-[state=active]:bg-background data-[state=active]:shadow-xs"
                    >
                      Month
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </FrameHeader>

              <FrameContent className="p-0 flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border/5 overflow-hidden">
                {/* Mini Calendar Sidebar */}
                <div className="w-full md:w-[280px] p-6 bg-muted/[0.02] flex-shrink-0 flex flex-col gap-6">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="p-0 rounded-none border-none shadow-none w-full"
                  />

                  <div className="space-y-4 pt-6 border-t border-border/5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/30">
                      Suggested Slots
                    </p>
                    <div className="space-y-2">
                      {["10:00 AM", "2:30 PM", "4:15 PM"].map((slot) => (
                        <button
                          key={slot}
                          className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-muted/5 border border-border/5 hover:border-primary/20 hover:bg-primary/[0.02] transition-all group/slot"
                        >
                          <span className="text-[12px] font-semibold text-foreground/70">
                            {slot}
                          </span>
                          <HugeiconsIcon
                            icon={Add01Icon}
                            size={12}
                            className="text-muted-foreground/30 group-hover/slot:text-primary transition-colors"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Day Agenda Grid */}
                <div className="flex-1 p-0 overflow-y-auto no-scrollbar bg-card/30">
                  <div className="sticky top-0 z-20 px-6 py-3 bg-card/80 backdrop-blur-md border-b border-border/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[15px] font-semibold text-foreground/90">
                        {date?.toLocaleDateString(undefined, {
                          weekday: "long",
                          day: "numeric",
                        })}
                      </span>
                      <Badge
                        variant="success"
                        className="h-5 bg-primary/5 text-primary border-primary/10 rounded-md px-1.5 font-bold text-[9px]"
                      >
                        TODAY
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="rounded-lg h-8 w-8"
                      >
                        <HugeiconsIcon icon={Calendar03Icon} size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="rounded-lg h-8 w-8"
                      >
                        <HugeiconsIcon icon={MoreHorizontalIcon} size={14} />
                      </Button>
                    </div>
                  </div>

                  <div className="relative p-6 min-h-[600px]">
                    {/* Time Lines */}
                    <div className="space-y-[60px]">
                      {timeSlots.map((time) => (
                        <div
                          key={time}
                          className="relative flex items-start gap-4"
                        >
                          <span className="text-[10px] font-bold text-muted-foreground/20 tabular-nums w-10 text-right mt-[-6px]">
                            {time}
                          </span>
                          <div className="flex-1 border-t border-border/5 mt-[2px]" />
                        </div>
                      ))}
                    </div>

                    {/* Refined Event Cards Overlaid */}
                    {dayEvents.map((ev, i) => {
                      const style = typeStyles[ev.type] || typeStyles.Meeting;
                      return (
                        <div
                          key={i}
                          className="absolute left-[72px] right-6 p-3 rounded-lg border border-border/10 shadow-sm flex flex-col justify-between group/devent cursor-pointer hover:bg-white dark:hover:bg-muted/20 transition-all duration-200"
                          style={{
                            top: `${60 + timeSlots.indexOf(ev.start) * 60 + 24}px`,
                            height: `${(timeSlots.indexOf(ev.end) - timeSlots.indexOf(ev.start)) * 60 - 4}px`,
                            background: `color-mix(in srgb, ${style.color} 4%, var(--card))`,
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="w-[3px] h-8 rounded-full shrink-0"
                              style={{ backgroundColor: style.color }}
                            />
                            <div className="min-w-0">
                              <p className="text-[13px] font-semibold text-foreground/90 leading-tight truncate">
                                {ev.title}
                              </p>
                              <p className="text-[10px] font-medium text-muted-foreground/50 mt-1">
                                {ev.start} — {ev.end}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-auto opacity-40 group-hover/devent:opacity-100 transition-opacity">
                            <span
                              className="text-[9px] font-bold uppercase tracking-widest"
                              style={{ color: style.color }}
                            >
                              {style.label}
                            </span>
                            <HugeiconsIcon
                              icon={Tick01Icon}
                              size={12}
                              className="text-muted-foreground/20"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FrameContent>
            </FramePanel>
          </Frame>
        </section>

        {/* Right Side: Event Details & Quick Info */}
        <section className="w-full xl:w-[360px] space-y-4">
          <Frame className="group/frame">
            <FramePanel className="p-0 overflow-hidden bg-card">
              <FrameHeader>
                <div>
                  <FrameTitle>Priority Queue</FrameTitle>
                  <FrameDescription>
                    High importance activities
                  </FrameDescription>
                </div>
              </FrameHeader>
              <FrameContent className="p-0">
                <div className="divide-y divide-border/5">
                  {upcomingEvents.map((event) => {
                    const style = typeStyles[event.type] || typeStyles.Meeting;
                    return (
                      <div
                        key={event.id}
                        className="p-5 hover:bg-muted/5 transition-colors group/event"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                            style={{ background: style.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-foreground/90 leading-tight">
                              {event.title}
                            </p>
                            <div className="flex flex-col gap-2 mt-3">
                              <div className="flex items-center gap-4 text-[11px] font-bold text-muted-foreground/40 capitalize tracking-tight">
                                <span className="flex items-center gap-1.5">
                                  <HugeiconsIcon
                                    icon={Clock01Icon}
                                    size={12}
                                    strokeWidth={2.5}
                                  />
                                  {event.time}
                                </span>
                                {event.location && (
                                  <span className="flex items-center gap-1.5 truncate">
                                    <HugeiconsIcon
                                      icon={Location01Icon}
                                      size={12}
                                      strokeWidth={2.5}
                                    />
                                    {event.location}
                                  </span>
                                )}
                              </div>

                              {event.attendees.length > 0 && (
                                <div className="flex items-center gap-1.5 pt-1">
                                  {event.attendees.map((name, i) => (
                                    <UserAvatar
                                      key={i}
                                      name={name}
                                      size="sm"
                                      className="size-5 border-2 border-card"
                                    />
                                  ))}
                                  <span className="text-[10px] font-bold text-muted-foreground/30 ml-1">
                                    +{event.attendees.length} more
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="rounded-lg opacity-0 group-hover/event:opacity-100 transition-opacity"
                          >
                            <HugeiconsIcon
                              icon={MoreHorizontalIcon}
                              className="size-4 opacity-40"
                            />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </FrameContent>
              <FrameFooter>
                <Button
                  variant="outline"
                  className="w-full h-8 text-[11px] font-bold rounded-lg border-border/40"
                >
                  Full Schedule
                </Button>
              </FrameFooter>
            </FramePanel>
          </Frame>

          {/* Quick Stats/Summary */}
          <Frame>
            <FramePanel className="p-5 flex items-center justify-between bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                  <HugeiconsIcon icon={UserGroupIcon} size={20} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground/80 leading-none mb-1">
                    Availability
                  </p>
                  <p className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest">
                    84% Team Active
                  </p>
                </div>
              </div>
              <Badge variant="success" showDot className="h-5 rounded-md">
                Normal
              </Badge>
            </FramePanel>
          </Frame>
        </section>
      </div>
    </main>
  );
}
