import { createFileRoute, Link } from "@tanstack/react-router";
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
import {
  ArrowLeft01Icon,
  Building03Icon,
  Mail01Icon,
  CallIcon,
  Calendar01Icon,
  UserGroupIcon,
  Shield01Icon,
  ChartBarLineIcon,
  PencilEdit02Icon,
} from "@hugeicons/core-free-icons";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { api } from "@/lib/mock-api";
import { DashboardPending } from "@/components/dashboard/dashboard-pending";
import { ErrorComponent } from "@/components/error-component";
import { StatCard } from "@/components/dashboard/stat-card";

export const Route = createFileRoute("/admin/companies/$id")({
  loader: async ({ params }) => {
    const company = await api.getCompany(params.id);
    if (!company) throw new Error("Company not found");
    return company;
  },
  pendingComponent: DashboardPending,
  errorComponent: ErrorComponent,
  component: CompanyDetailsPage,
});

function CompanyDetailsPage() {
  const company = Route.useLoaderData();

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden">
      <DashboardHeader
        category="Tenant Management"
        title={company.name}
        description={`Registry details for TIN: ${company.tin}`}
      >
        <Button
          variant="outline"
          size="lg"
          className="text-[12px] font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
          render={<Link to="/admin/companies" />}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={14} strokeWidth={2} />
          Registry
        </Button>
        <Button size="lg" className="font-bold gap-2">
          <HugeiconsIcon icon={PencilEdit02Icon} size={14} strokeWidth={2} />
          Edit Profile
        </Button>
      </DashboardHeader>

      <div className="flex flex-col gap-6 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Total Staff" value={company.employeeCount} icon={UserGroupIcon} variant="primary" sub="Active headcount" />
          <StatCard label="Registry Status" value={company.status} icon={Shield01Icon} variant={company.status === "active" ? "success" : "destructive"} sub="Platform access" />
          <StatCard label="Growth" value="+12%" icon={ChartBarLineIcon} variant="info" sub="Last 30 days" />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Frame>
              <FramePanel className="p-0 overflow-hidden bg-card">
                <FrameHeader>
                  <FrameTitle>Company Profile</FrameTitle>
                  <FrameDescription>Legal and operational identification</FrameDescription>
                </FrameHeader>
                <FrameContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                  <DetailItem label="Legal Entity" value={company.name} icon={Building03Icon} />
                  <DetailItem label="Tax ID (TIN)" value={company.tin} icon={Shield01Icon} />
                  <DetailItem label="Industry Sector" value={company.sector} icon={ChartBarLineIcon} />
                  <DetailItem label="Registration Date" value={company.registeredAt} icon={Calendar01Icon} />
                  <DetailItem label="Primary Email" value={company.email} icon={Mail01Icon} />
                  <DetailItem label="Contact Phone" value={company.phone} icon={CallIcon} />
                </FrameContent>
              </FramePanel>
            </Frame>
          </div>

          <div className="space-y-6">
            <Frame>
              <FramePanel className="p-6 bg-primary/[0.02] border-primary/10 space-y-4">
                <h4 className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest">Platform Usage</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-foreground/70">Storage Used</span>
                    <span className="text-[13px] font-bold tabular-nums">4.2 GB / 10 GB</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[42%]" />
                  </div>
                  <p className="text-[11px] text-muted-foreground/50 leading-relaxed italic">
                    This company has used 42% of its provisioned cloud document storage.
                  </p>
                </div>
              </FramePanel>
            </Frame>
          </div>
        </div>
      </div>
    </main>
  );
}

function DetailItem({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-muted-foreground/40">
        <HugeiconsIcon icon={Icon} size={14} strokeWidth={2.5} />
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-[14px] font-semibold text-foreground/80 pl-5.5">{value}</p>
    </div>
  );
}
