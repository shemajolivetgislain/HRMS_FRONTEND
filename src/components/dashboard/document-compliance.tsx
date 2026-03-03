"use client";

import * as React from "react";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameContent,
} from "@/components/ui/frame";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { File02Icon, FolderSecurityIcon } from "@hugeicons/core-free-icons";

const docStats = [
  {
    label: "Total Documents",
    value: "248",
    icon: File02Icon,
    variant: "primary",
  },
  {
    label: "Expiring Soon",
    value: "12",
    icon: FolderSecurityIcon,
    variant: "warning",
  },
  {
    label: "Missing Records",
    value: "11",
    icon: File02Icon,
    variant: "destructive",
  },
  {
    label: "Signed Contracts",
    value: "142",
    icon: FolderSecurityIcon,
    variant: "success",
  },
];

export const DocumentCompliance = React.memo(function DocumentCompliance() {
  return (
    <Frame className="h-full group/frame">
      <FramePanel className="flex flex-col h-full overflow-hidden">
        <FrameHeader>
          <div>
            <FrameTitle>Document Vault</FrameTitle>
            <FrameDescription>File health & records state</FrameDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="font-bold capitalize tracking-wider shadow-none hover:bg-muted/50"
          >
            Open Vault
          </Button>
        </FrameHeader>

        <FrameContent className="p-0 flex-1 overflow-auto">
          <div className="grid grid-cols-2 divide-x divide-y divide-border/5">
            {docStats.map((stat, i) => (
              <div
                key={i}
                className="p-6 flex flex-col items-center justify-center text-center gap-3 hover:bg-muted/5 transition-colors group"
              >
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 
                    ${stat.variant === "primary" ? "bg-primary/10 text-primary border-primary/20" : ""}
                    ${stat.variant === "success" ? "bg-success/10 text-success border-success/20" : ""}
                    ${stat.variant === "warning" ? "bg-warning/10 text-warning border-warning/20" : ""}
                    ${stat.variant === "destructive" ? "bg-destructive/10 text-destructive border-destructive/20" : ""}
                  `}
                >
                  <HugeiconsIcon icon={stat.icon} size={20} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground/90 tabular-nums leading-none mb-1">
                    {stat.value}
                  </h3>
                  <div className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FrameContent>
      </FramePanel>
    </Frame>
  );
});
