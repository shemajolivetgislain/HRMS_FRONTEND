import { Skeleton } from "@/components/ui/skeleton";
import { Frame, FramePanel } from "@/components/ui/frame";

export function DashboardPending() {
  return (
    <div className="flex flex-col gap-0 overflow-hidden animate-pulse">
      <header className="flex items-end justify-between pt-10 pb-8 px-4 lg:px-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-1" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>
      </header>

      <div className="flex flex-col gap-6 pb-12 px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Frame key={i}>
              <FramePanel className="p-6 space-y-4 bg-card">
                <div className="flex justify-between">
                  <Skeleton className="size-9 rounded-xl" />
                  <Skeleton className="h-5 w-12 rounded-md" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-7 w-16" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </FramePanel>
            </Frame>
          ))}
        </div>

        <Frame>
          <FramePanel className="p-0 bg-card">
            <div className="p-6 border-b border-border/5 flex justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="p-6 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="size-8 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </FramePanel>
        </Frame>
      </div>
    </div>
  );
}
