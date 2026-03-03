"use client";

import * as React from "react";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameContent,
  FrameFooter,
} from "@/components/ui/frame";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";
import { api } from "@/lib/mock-api";
import type { ApplicantPipelineStage } from "@/types";

export const RecruitmentPipeline = React.memo(function RecruitmentPipeline() {
  const [pipeline, setPipeline] = React.useState<ApplicantPipelineStage[]>([]);

  React.useEffect(() => {
    async function loadData() {
      const data = await api.getRecruitmentPipeline();
      setPipeline(data);
    }
    loadData();
  }, []);

  if (!pipeline.length) return null;

  const maxCount = Math.max(...pipeline.map((s) => s.count));

  return (
    <Frame className="h-full group/frame">
      <FramePanel className="flex flex-col h-full overflow-hidden">
        <FrameHeader>
          <div>
            <FrameTitle>Recruitment Pipeline</FrameTitle>
            <FrameDescription>Active applicants by stage</FrameDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="font-bold capitalize tracking-wider shadow-none hover:bg-muted/50 gap-2"
          >
            <HugeiconsIcon icon={UserAdd01Icon} size={14} />
            View All
          </Button>
        </FrameHeader>

        <FrameContent className="p-0 flex-1 overflow-auto">
          <div className="flex flex-col justify-center px-6 py-4 min-h-[280px]">
            {pipeline.map((stage, i) => (
              <div
                key={stage.stage}
                className="flex flex-col mb-3 last:mb-0 group"
              >
                <div className="flex items-end justify-between mb-1.5">
                  <span className="text-xs font-semibold text-foreground/80 lowercase tracking-widest leading-none">
                    {stage.stage}
                  </span>
                  <span className="text-sm font-bold tabular-nums text-foreground/90 leading-none">
                    {stage.count}
                  </span>
                </div>
                <div className="h-2 w-full bg-muted/20 rounded-full overflow-hidden flex relative">
                  <div
                    className="h-full bg-primary/60 transition-all duration-700 ease-out group-hover:bg-primary"
                    style={{ width: `${(stage.count / maxCount) * 100}%` }}
                  />
                  {i < pipeline.length - 1 && (
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 -translate-x-full h-4 w-px bg-border/20" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </FrameContent>

        <FrameFooter>
          <span className="text-xs text-muted-foreground/40 font-bold capitalize tracking-widest flex items-center gap-2">
            Total Pipeline Volume:{" "}
            <span className="text-foreground/90 tabular-nums">
              {pipeline.reduce((a, b) => a + b.count, 0)}
            </span>
          </span>
        </FrameFooter>
      </FramePanel>
    </Frame>
  );
});
