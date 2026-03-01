import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameContent,
} from "@/components/ui/frame";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Clock01Icon,
  Calendar03Icon,
  FilterIcon,
  Location01Icon,
} from "@hugeicons/core-free-icons";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { ErrorComponent } from "@/components/error-component";
import { cn } from "@/lib/utils";

const upcomingEvents = [
  {
    id: 1,
    title: "Quarterly Strategy Sync",
    time: "10:00 AM",
    type: "Meeting",
    location: "Conference Room A",
    attendees: ["Jean Paul Nkurunziza", "Divine Uwase"],
    color: "var(--chart-1)",
  },
  {
    id: 2,
    title: "Design System Review",
    time: "1:30 PM",
    type: "Workshop",
    location: "Online",
    attendees: ["Emma Davis"],
    color: "var(--chart-2)",
  },
  {
    id: 3,
    title: "Payroll Approval Deadline",
    time: "4:00 PM",
    type: "Task",
    location: "Financial Console",
    attendees: [],
    color: "var(--chart-3)",
  },
  {
    id: 4,
    title: "New Hire Onboarding",
    time: "09:00 AM",
    type: "Onboarding",
    location: "Igihe Logistics",    attendees: ["Moses Mugisha"],
    color: "var(--chart-4)",
  },
];

export const Route = createFileRoute("/dashboard/calendar")({
  errorComponent: ErrorComponent,
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
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="lg"
            className="text-[12px] font-semibold gap-2 capitalize"
          >
            <HugeiconsIcon icon={FilterIcon} size={14} strokeWidth={2} />
            Filter
          </Button>
          <Button
            size="lg"
            className="text-[12px] font-bold gap-2 capitalize"
          >
            <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2} />
            New Event
          </Button>
        </div>
      </DashboardHeader>

      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-6 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        {/* Left: Main Calendar */}
        <section>
          <Frame className="h-full">
            <FramePanel className="p-8 bg-card h-full flex flex-col items-center justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="p-0 border-none shadow-none scale-125"
              />
            </FramePanel>
          </Frame>
        </section>

        {/* Right: Agenda List */}
        <section className="flex flex-col gap-6">
          <Frame className="flex-1">
            <FramePanel className="p-0 overflow-hidden bg-card h-full flex flex-col">
              <FrameHeader>
                <div>
                  <FrameTitle>Today's Agenda</FrameTitle>
                  <FrameDescription>
                    {date?.toLocaleDateString(undefined, {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </FrameDescription>
                </div>
                <Badge variant="success" showDot className="h-5 px-2 text-[9px] font-bold uppercase border-none">
                  Live
                </Badge>
              </FrameHeader>
              <FrameContent className="p-0 flex-1 overflow-y-auto no-scrollbar">
                <div className="divide-y divide-border/5">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-5 hover:bg-muted/5 transition-colors group/event cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="mt-1 size-2 rounded-full shrink-0 shadow-[0_0_8px_var(--color)]"
                          style={{ backgroundColor: event.color, "--color": event.color } as any}
                        />
                        <div className="flex-1 min-w-0 space-y-3">
                          <div>
                            <p className="text-[14px] font-semibold text-foreground/90 leading-tight">
                              {event.title}
                            </p>
                            <p className="text-xs font-bold text-muted-foreground/30 uppercase tracking-widest mt-1">
                              {event.type}
                            </p>
                          </div>
                          
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground/60 capitalize tracking-tight">
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
                                {event.attendees.length > 2 && (
                                  <span className="text-[9px] font-bold text-muted-foreground/30 ml-1">
                                    +{event.attendees.length - 2} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </FrameContent>
            </FramePanel>
          </Frame>

          {/* Quick Stats Summary */}
          <Frame>
            <FramePanel className="p-5 flex items-center justify-between bg-primary/[0.02] border-primary/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                  <HugeiconsIcon icon={Calendar03Icon} size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground/80 leading-none mb-1">
                    Team Availability
                  </p>
                  <p className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest">
                    84% On-Site
                  </p>
                </div>
              </div>
              <Badge variant="info" className="h-5 px-2 rounded-md font-bold text-[9px]">
                STABLE
              </Badge>
            </FramePanel>
          </Frame>
        </section>
      </div>
    </main>
  );
}
