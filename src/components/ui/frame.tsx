import type * as React from "react";

import { cn } from "@/lib/utils";

function Frame({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-[24px] border border-border/5 bg-muted/10 p-1 group/frame",
        "*:[[data-slot=frame-panel]+[data-slot=frame-panel]]:mt-1",
        className,
      )}
      data-slot="frame"
      {...props}
    />
  );
}

function FramePanel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative rounded-[20px] border border-border/40 bg-card bg-clip-padding p-0 shadow-[0_1px_3px_rgba(0,0,0,0.02)]",
        className,
      )}
      data-slot="frame-panel"
      {...props}
    />
  );
}

function FrameHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      className={cn("flex items-center justify-between px-6 py-5 border-b border-border/5", className)}
      data-slot="frame-panel-header"
      {...props}
    />
  );
}

function FrameTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-[13px] font-semibold text-foreground/80 tracking-tight leading-none capitalize", className)}
      data-slot="frame-panel-title"
      {...props}
    />
  );
}

function FrameDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-[11px] text-muted-foreground/50 font-medium mt-1.5 leading-none tracking-tight", className)}
      data-slot="frame-panel-description"
      {...props}
    />
  );
}

function FrameContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-6 py-5", className)}
      data-slot="frame-panel-content"
      {...props}
    />
  );
}

function FrameFooter({ className, ...props }: React.ComponentProps<"footer">) {
  return (
    <footer
      className={cn("px-6 py-4 border-t border-border/5 bg-muted/5", className)}
      data-slot="frame-panel-footer"
      {...props}
    />
  );
}

export {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameContent,
  FrameFooter,
};
