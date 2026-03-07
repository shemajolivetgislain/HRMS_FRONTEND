import {
  AlertCircleIcon,
  Building03Icon,
  Clock01Icon,
  ComputerIcon,
  DatabaseIcon,
  GlobalIcon,
  Layout01Icon,
  Moon01Icon,
  Settings02Icon,
  Shield01Icon,
  Sun01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardPending } from "@/components/dashboard/dashboard-pending";
import { ErrorComponent } from "@/components/error-component";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/settings")({
  errorComponent: ErrorComponent,
  pendingComponent: DashboardPending,
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const { theme, setTheme } = useTheme();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden h-full">
      <DashboardHeader
        category="Platform Console"
        title="Global Settings"
        description="Configure platform-wide parameters and tenant defaults"
      >
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <div className="size-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
          ) : (
            <HugeiconsIcon icon={Tick01Icon} />
          )}
          {isSaving ? "Saving…" : "Save Changes"}
        </Button>
      </DashboardHeader>

      <div className="flex flex-col flex-1 overflow-hidden px-4 lg:px-6 pb-6 h-full">
        <Tabs
          defaultValue="platform"
          orientation="vertical"
          className="flex flex-1 gap-0 border border-border/40 rounded-[20px] bg-card overflow-hidden h-full"
        >
          {/* Sidebar Column */}
          <div className="w-[240px] flex flex-col bg-muted/5 border-r border-border/5">
            <div className="px-6 py-6 border-b border-border/5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/30">
                System Config
              </p>
            </div>

            <TabsList className="flex flex-col h-auto w-full bg-transparent border-none p-2 space-y-0.5 items-stretch justify-start">
              <SettingsTabTrigger
                value="platform"
                icon={Settings02Icon}
                title="Platform"
              />
              <SettingsTabTrigger
                value="tenancy"
                icon={Building03Icon}
                title="Tenancy"
              />
              <SettingsTabTrigger
                value="appearance"
                icon={Layout01Icon}
                title="Appearance"
              />
              <div className="px-4 py-4 mt-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/30">
                  Operations
                </p>
              </div>
              <SettingsTabTrigger
                value="security"
                icon={Shield01Icon}
                title="Security"
              />
              <SettingsTabTrigger
                value="backup"
                icon={DatabaseIcon}
                title="Backup & Data"
              />
              <SettingsTabTrigger
                value="maintenance"
                icon={AlertCircleIcon}
                title="Maintenance"
              />
            </TabsList>
          </div>

          {/* Scrollable Main Area */}
          <div className="flex-1 min-w-0 h-full overflow-y-auto no-scrollbar bg-background/40">
            <div className="max-w-4xl p-10 space-y-12">
              {/* Platform Tab */}
              <TabsContent
                value="platform"
                className="mt-0 space-y-12 animate-in fade-in slide-in-from-right-1 duration-300"
              >
                <section className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground/90">
                      Platform Identity
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground/50">
                      Manage the global brand and support contacts.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    <SettingsField
                      label="System Name"
                      defaultValue="Precision HRMS"
                    />
                    <SettingsField
                      label="Platform URL"
                      defaultValue="https://hrms.precision.rw"
                    />
                    <SettingsField
                      label="Global Support Email"
                      defaultValue="support@precision.rw"
                      type="email"
                    />
                    <SettingsField
                      label="Technical Contact"
                      defaultValue="dev@precision.rw"
                      type="email"
                    />
                  </div>
                </section>
              </TabsContent>

              {/* Tenancy Tab */}
              <TabsContent
                value="tenancy"
                className="mt-0 space-y-12 animate-in fade-in slide-in-from-right-1 duration-300"
              >
                <section className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground/90">
                      Tenant Defaults
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground/50">
                      Set default limits for new company registrations.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    <SettingsField
                      label="Default Storage Quota (GB)"
                      defaultValue="10"
                    />
                    <SettingsField
                      label="Max Employee Limit"
                      defaultValue="500"
                    />
                    <SettingsField
                      label="Trial Period (Days)"
                      defaultValue="30"
                    />
                  </div>
                </section>
                <section className="pt-10 border-t border-border/5 space-y-6">
                  <h3 className="text-lg font-semibold text-foreground/90">
                    Allowed Sectors
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Technology",
                      "Finance",
                      "Healthcare",
                      "Retail",
                      "Agriculture",
                      "Logistics",
                    ].map((s) => (
                      <Badge
                        key={s}
                        variant="muted"
                        className="bg-muted/10 border-border/5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                      >
                        {s}
                      </Badge>
                    ))}
                    <Button
                      variant="ghost"
                      size="xs"
                      className="rounded-full border border-dashed border-border/40 text-muted-foreground/40 hover:text-primary"
                    >
                      Add Sector
                    </Button>
                  </div>
                </section>
              </TabsContent>

              {/* Appearance Tab */}
              <TabsContent
                value="appearance"
                className="mt-0 space-y-8 animate-in fade-in slide-in-from-right-1 duration-300"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground/90">
                    System-Wide Theme
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground/50">
                    Override or set the default theme for all companies.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ThemeCard
                    active={theme === "light"}
                    onClick={() => setTheme("light")}
                    icon={Sun01Icon}
                    title="Light"
                    description="Clean & sharp"
                  />
                  <ThemeCard
                    active={theme === "dark"}
                    onClick={() => setTheme("dark")}
                    icon={Moon01Icon}
                    title="Dark"
                    description="Ink Navy feel"
                  />
                  <ThemeCard
                    active={theme === "system"}
                    onClick={() => setTheme("system")}
                    icon={ComputerIcon}
                    title="System"
                    description="Device default"
                  />
                </div>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent
                value="security"
                className="mt-0 space-y-10 animate-in fade-in slide-in-from-right-1 duration-300"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground/90">
                    Global Security Matrix
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground/50">
                    Enforce security standards across all organizations.
                  </p>
                </div>
                <div className="divide-y divide-border/5 border-y border-border/5">
                  <ToggleRow
                    icon={Shield01Icon}
                    title="Enforce MFA"
                    description="Force all administrative users to use Two-Factor Authentication."
                    defaultChecked
                  />
                  <ToggleRow
                    icon={Clock01Icon}
                    title="Session Timeout"
                    description="Automatically logout users after 30 minutes of inactivity."
                    defaultChecked
                  />
                  <ToggleRow
                    icon={GlobalIcon}
                    title="IP Whitelisting"
                    description="Limit platform access to known office IP ranges."
                  />
                </div>
              </TabsContent>

              {/* Backup Tab */}
              <TabsContent
                value="backup"
                className="mt-0 space-y-10 animate-in fade-in slide-in-from-right-1 duration-300"
              >
                <section className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground/90">
                      Database Backups
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground/50">
                      Configure automated cloud synchronization and recovery.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    <SettingsField
                      label="Backup Frequency"
                      defaultValue="Every 6 Hours"
                      icon={DatabaseIcon}
                    />
                    <SettingsField
                      label="Retention Period"
                      defaultValue="90 Days"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="font-bold text-xs uppercase tracking-widest gap-2"
                  >
                    <HugeiconsIcon icon={DatabaseIcon} size={14} />
                    Run Manual Backup
                  </Button>
                </section>
              </TabsContent>

              {/* Maintenance Tab */}
              <TabsContent
                value="maintenance"
                className="mt-0 space-y-10 animate-in fade-in slide-in-from-right-1 duration-300"
              >
                <section className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground/90">
                      System Announcements
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground/50">
                      Broadcast messages to all companies.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
                        Announcement Text
                      </Label>
                      <Input
                        placeholder="System maintenance scheduled for..."
                        className="h-12 bg-muted/5 border-border/40 focus:bg-background"
                      />
                    </div>
                    <Button className="font-bold text-xs uppercase tracking-widest bg-primary text-primary-foreground">
                      Publish to All
                    </Button>
                  </div>
                </section>
                <section className="pt-10 border-t border-border/5 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-foreground/90 text-destructive">
                        Maintenance Mode
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground/50">
                        Disable platform access for all users during updates.
                      </p>
                    </div>
                    <Switch className="bg-destructive" />
                  </div>
                </section>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </main>
  );
}

function SettingsTabTrigger({
  value,
  icon: Icon,
  title,
}: {
  value: string;
  icon: any;
  title: string;
}) {
  return (
    <TabsTrigger
      value={value}
      className="relative w-full flex items-center justify-start gap-3 px-3 py-2 rounded-md transition-all text-left data-active:bg-primary/10! data-active:text-primary! text-muted-foreground/60 hover:bg-muted/50 hover:text-foreground/80 group overflow-hidden border-none! shadow-none!"
    >
      <HugeiconsIcon
        icon={Icon}
        size={16}
        strokeWidth={2}
        className="group-data-active:text-primary! transition-colors"
      />
      <span className="text-sm font-semibold tracking-tight">{title}</span>
    </TabsTrigger>
  );
}

function SettingsField({
  label,
  defaultValue,
  type = "text",
  prefix,
  icon: Icon,
  className,
}: {
  label: string;
  defaultValue: string;
  type?: string;
  prefix?: string;
  icon?: any;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/40">
        {label}
      </Label>
      <div className="relative group/input">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground/30">
            {prefix}
          </span>
        )}
        <Input
          defaultValue={defaultValue}
          type={type}
          className={cn(
            "h-9 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all text-sm font-medium shadow-none",
            prefix ? "pl-16" : "pl-3",
          )}
        />
        {Icon && (
          <HugeiconsIcon
            icon={Icon}
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/20 group-hover/input:text-muted-foreground/40 transition-colors"
          />
        )}
      </div>
    </div>
  );
}

function ToggleRow({
  icon: Icon,
  title,
  description,
  defaultChecked,
}: {
  icon: any;
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-5 hover:bg-muted/5 transition-all group px-2 -mx-2 rounded-xl">
      <div className="flex items-start gap-4">
        <div className="h-9 w-9 rounded-xl bg-muted/5 border border-border/5 flex items-center justify-center text-muted-foreground/20 group-hover:border-primary/20 group-hover:text-primary transition-all">
          <HugeiconsIcon icon={Icon} size={16} strokeWidth={1.5} />
        </div>
        <div className="space-y-1">
          <p className="text-[14px] font-semibold text-foreground/80">
            {title}
          </p>
          <p className="text-xs font-medium text-muted-foreground/40 max-w-md leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <Switch defaultChecked={defaultChecked} className="scale-[0.75]" />
    </div>
  );
}

function ThemeCard({
  active,
  onClick,
  icon: Icon,
  title,
  description,
}: {
  active: boolean;
  onClick: () => void;
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col gap-4 p-5 rounded-2xl border text-left transition-all duration-300",
        active
          ? "bg-primary/[0.03] border-primary/20 shadow-xs"
          : "bg-muted/5 border-border/5 hover:border-border/20",
      )}
    >
      <div
        className={cn(
          "size-9 rounded-xl flex items-center justify-center border transition-colors",
          active
            ? "bg-primary text-white border-primary"
            : "bg-muted/10 text-muted-foreground/40 border-border/5",
        )}
      >
        <HugeiconsIcon icon={Icon} size={18} strokeWidth={2} />
      </div>
      <div>
        <p
          className={cn(
            "text-sm font-semibold leading-none",
            active ? "text-foreground" : "text-muted-foreground/70",
          )}
        >
          {title}
        </p>
        <p className="text-xs font-medium text-muted-foreground/40 mt-1.5">
          {description}
        </p>
      </div>
    </button>
  );
}
