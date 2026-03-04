import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/mock-api";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
  Building03Icon,
  UserEdit01Icon,
  Shield01Icon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/companies/register")({
  component: RegisterCompanyPage,
});

function RegisterCompanyPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCompanyPassword, setShowCompanyPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  const [formData, setFormData] = useState({
    // company
    name: "",
    sector: "",
    tin: "",
    email: "",
    phone: "",
    logoUrl: "",
    uniquePassword: "",
    // admin
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminPhone: "",
    adminPassword: "",
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // simulate company and admin creation
      await api.addCompany({
        name: formData.name,
        sector: formData.sector,
        tin: formData.tin,
        email: formData.email,
        phone: formData.phone,
        status: "active",
      });

      // in a real app, the admin would be created and linked here
      setIsSuccess(true);
      toast.success("Organization provisioned successfully");
    } catch (err) {
      toast.error("Failed to register company");
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center gap-3 mb-10">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex-1 flex items-center gap-2">
          <div
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-500",
              step === i
                ? "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                : step > i
                  ? "bg-primary/40"
                  : "bg-border/40",
            )}
          />
        </div>
      ))}
    </div>
  );

  if (isSuccess) {
    return (
      <main className="flex flex-1 flex-col gap-0 overflow-hidden h-full">
        <DashboardHeader
          category="administration"
          title="Tenant Provisioned"
          description="The new organization has been successfully registered."
        />
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <Frame className="max-w-md w-full">
            <FramePanel className="bg-card p-10">
              <div className="h-20 w-20 bg-success/10 text-success rounded-2xl flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-500">
                <HugeiconsIcon icon={CheckmarkCircle01Icon} size={40} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-3">Setup Complete</h2>
              <p className="text-sm text-muted-foreground font-medium mb-10 leading-relaxed">
                <span className="text-foreground font-semibold">{formData.name}</span> is now active. The initial administrator account for <span className="text-foreground font-semibold">{formData.adminEmail}</span> has been created.
              </p>
              <Button
                onClick={() => navigate({ to: "/admin/companies" })}
                className="w-full h-11 font-bold rounded-xl"
              >
                Go to Company List
              </Button>
            </FramePanel>
          </Frame>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden h-full">
      <DashboardHeader
        category="administration"
        title="Register New Company"
        description="Provision a new tenant and its initial master administrator."
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate({ to: "/admin/companies" })}
          className="text-xs font-bold gap-2 rounded-lg"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
          Cancel
        </Button>
      </DashboardHeader>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 lg:px-6 pb-20 pt-2">
        <div className="max-w-3xl mx-auto w-full">
          <StepIndicator />

          <Frame>
            <FramePanel className="bg-card">
              <FrameHeader>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <HugeiconsIcon
                      icon={
                        step === 1
                          ? Building03Icon
                          : step === 2
                            ? UserEdit01Icon
                            : Shield01Icon
                      }
                      size={18}
                    />
                  </div>
                  <div>
                    <FrameTitle>
                      {step === 1
                        ? "Organization Profile"
                        : step === 2
                          ? "Initial Administrator"
                          : "Security & Confirmation"}
                    </FrameTitle>
                    <FrameDescription>Step {step} of 3</FrameDescription>
                  </div>
                </div>
              </FrameHeader>

              <FrameContent className="p-8">
                {step === 1 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Legal Entity Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g. Igihe Logistics Inc."
                        className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="tin" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">TIN Number</Label>
                        <Input
                          id="tin"
                          placeholder="9 digits"
                          className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors"
                          value={formData.tin}
                          onChange={(e) => setFormData({ ...formData, tin: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sector" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Sector</Label>
                        <Select
                          value={formData.sector}
                          onValueChange={(val) => setFormData({ ...formData, sector: val || "" })}
                        >
                          <SelectTrigger className="h-11 bg-muted/5 border-border/40 focus:bg-background">
                            <SelectValue placeholder="Select Sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Logistics">Logistics</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Official Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="contact@company.com"
                          className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="+250..."
                          className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="adminFirstName" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">First Name</Label>
                        <Input
                          id="adminFirstName"
                          placeholder="e.g. Jean"
                          className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors"
                          value={formData.adminFirstName}
                          onChange={(e) => setFormData({ ...formData, adminFirstName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adminLastName" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Last Name</Label>
                        <Input
                          id="adminLastName"
                          placeholder="e.g. Paul"
                          className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors"
                          value={formData.adminLastName}
                          onChange={(e) => setFormData({ ...formData, adminLastName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adminEmail" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Work Email (Login Username)</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        placeholder="admin@company.com"
                        className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors"
                        value={formData.adminEmail}
                        onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adminPassword" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Login Password</Label>
                      <div className="relative">
                        <Input
                          id="adminPassword"
                          type={showAdminPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors pr-12"
                          value={formData.adminPassword}
                          onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowAdminPassword(!showAdminPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
                        >
                          <HugeiconsIcon icon={showAdminPassword ? ViewOffIcon : ViewIcon} size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                      <h4 className="text-sm font-bold mb-2">Final Security Step</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Set a unique organization-wide password. This will be required for all staff members during their initial system setup.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="uniquePassword" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Organization Unique Password</Label>
                      <div className="relative">
                        <Input
                          id="uniquePassword"
                          type={showCompanyPassword ? "text" : "password"}
                          placeholder="Master Organization Password"
                          className="h-11 bg-muted/5 border-border/40 focus:bg-background transition-colors pr-12"
                          value={formData.uniquePassword}
                          onChange={(e) => setFormData({ ...formData, uniquePassword: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCompanyPassword(!showCompanyPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
                        >
                          <HugeiconsIcon icon={showCompanyPassword ? ViewOffIcon : ViewIcon} size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="p-4 rounded-xl border border-border/40 bg-muted/5">
                        <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mb-1">Organization</p>
                        <p className="text-sm font-bold">{formData.name || "N/A"}</p>
                      </div>
                      <div className="p-4 rounded-xl border border-border/40 bg-muted/5">
                        <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mb-1">Lead Admin</p>
                        <p className="text-sm font-bold truncate">{formData.adminFirstName} {formData.adminLastName}</p>
                      </div>
                    </div>
                  </div>
                )}
              </FrameContent>

              <FrameFooter className="p-6 bg-muted/5 flex items-center justify-between">
                <Button
                  variant="ghost"
                  disabled={step === 1}
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  className="font-bold text-xs uppercase tracking-widest"
                >
                  Previous
                </Button>
                {step < 3 ? (
                  <Button
                    onClick={() => setStep((s) => Math.min(3, s + 1))}
                    className="font-bold gap-2 px-6 h-10 rounded-xl"
                    disabled={
                      (step === 1 && (!formData.name || !formData.tin || !formData.sector)) ||
                      (step === 2 && (!formData.adminEmail || !formData.adminPassword))
                    }
                  >
                    Next Stage
                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.uniquePassword}
                    className="font-bold gap-2 px-8 h-10 rounded-xl"
                  >
                    {isSubmitting ? "Provisioning..." : "Finalize Setup"}
                    <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} />
                  </Button>
                )}
              </FrameFooter>
            </FramePanel>
          </Frame>
        </div>
      </div>
    </main>
  );
}
