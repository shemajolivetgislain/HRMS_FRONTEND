import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Frame, FramePanel } from "@/components/ui/frame";

import data from "../data.json";

export default function CompaniesPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 py-6 md:gap-8 md:py-8">
              <div className="px-4 lg:px-6 mb-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Companies
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage and view all tenant registrations and active companies.
                </p>
              </div>

              <div className="px-4 lg:px-6 pb-12">
                <Frame>
                  <FramePanel className="p-0 sm:p-0 overflow-hidden bg-card">
                    <div className="p-5 lg:p-6 pb-2 border-b border-border/20">
                      <h3 className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground">
                        Company Directory
                      </h3>
                    </div>
                    <div className="p-4 sm:p-6 pt-0 sm:pt-4">
                      <DataTable data={data} />
                    </div>
                  </FramePanel>
                </Frame>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
